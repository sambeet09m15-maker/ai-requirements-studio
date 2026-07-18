import { NextRequest, NextResponse } from "next/server";
import { analyzeRequirementQuality, streamRequirementRewrite } from "@/lib/quality";

// Public, unauthenticated route — see middleware.ts, which explicitly excludes
// this path from Clerk's auth.protect().
export const runtime = "nodejs";

// The two-step analysis (Step A + Step B) plus the streamed rewrite can take
// several seconds end-to-end. Vercel's default function duration is too short
// for that on some plans, which silently truncates the stream mid-response —
// give it real headroom.
export const maxDuration = 30;

const MAX_FREE_RUNS = 3;
const MAX_LENGTH = 500;
const COOKIE_NAME = "demo_runs";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  let body: { requirement?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body", message: "Invalid request." }, { status: 400 });
  }

  const requirement = (body.requirement ?? "").trim();
  if (!requirement) {
    return NextResponse.json({ error: "empty", message: "Please enter a requirement." }, { status: 400 });
  }
  if (requirement.length > MAX_LENGTH) {
    return NextResponse.json(
      { error: "too_long", message: `Keep it under ${MAX_LENGTH} characters.` },
      { status: 400 }
    );
  }

  // Best-effort demo protection via an httpOnly cookie counter. This is NOT
  // bulletproof — a visitor can clear cookies or open a private window to
  // reset it — but that's acceptable here because max_tokens is capped, so
  // the worst case is a small number of cheap extra calls, not a real cost risk.
  const currentRuns = Number(request.cookies.get(COOKIE_NAME)?.value ?? "0") || 0;
  if (currentRuns >= MAX_FREE_RUNS) {
    return NextResponse.json(
      { error: "limit", message: "Free runs used — sign up to continue" },
      { status: 429 }
    );
  }

  let analysis;
  try {
    analysis = await analyzeRequirementQuality(requirement);
  } catch (err) {
    console.error("[demo-quality] analysis failed", err);
    return NextResponse.json(
      { error: "analysis_failed", message: "Something went wrong analyzing that. Please try again." },
      { status: 500 }
    );
  }

  if (!analysis.tags.length) {
    return NextResponse.json(
      { error: "analysis_failed", message: "Something went wrong analyzing that. Please try again." },
      { status: 500 }
    );
  }

  let rewriteStream;
  try {
    rewriteStream = await streamRequirementRewrite(requirement);
  } catch (err) {
    console.error("[demo-quality] rewrite call failed to start", err);
    return NextResponse.json(
      { error: "analysis_failed", message: "Something went wrong generating a rewrite. Please try again." },
      { status: 500 }
    );
  }

  // Only now — once the OpenAI call has actually started streaming — do we
  // count this as a used run. A validation failure or an OpenAI error above
  // never consumes one of the visitor's 3 free runs.
  const runsLeft = MAX_FREE_RUNS - (currentRuns + 1);
  const header =
    JSON.stringify({
      score: analysis.score,
      tags: analysis.tags,
      runsLeft,
      type: analysis.type,
    }) + "\n";

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(header));
      try {
        for await (const chunk of rewriteStream) {
          const token = chunk.choices[0]?.delta?.content ?? "";
          if (token) controller.enqueue(encoder.encode(token));
        }
      } catch (err) {
        console.error("[demo-quality] rewrite stream interrupted", err);
        controller.enqueue(encoder.encode("\n\n(The rewrite stopped early — please try again.)"));
      } finally {
        controller.close();
      }
    },
  });

  const response = new NextResponse(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
  response.cookies.set(COOKIE_NAME, String(currentRuns + 1), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
