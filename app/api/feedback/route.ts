import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/brand";
import { incrementRatingCounters } from "@/lib/redis";

// Public, unauthenticated route — see middleware.ts, which explicitly excludes
// this path from Clerk's auth.protect().
export const runtime = "nodejs";

const MAX_COMMENT_LENGTH = 500;
const MAX_DAILY_SUBMISSIONS = 5;
const COOKIE_NAME = "feedback_runs";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day

type Source = "demo" | "dashboard";

function isValidSource(value: unknown): value is Source {
  return value === "demo" || value === "dashboard";
}

export async function POST(request: NextRequest) {
  let body: { rating?: number; comment?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const rating = body.rating;
  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "invalid_rating" }, { status: 400 });
  }
  if (!isValidSource(body.source)) {
    return NextResponse.json({ error: "invalid_source" }, { status: 400 });
  }

  const comment = (body.comment ?? "").trim().slice(0, MAX_COMMENT_LENGTH);
  const source = body.source;

  // Best-effort spam guard via an httpOnly cookie counter, independent of the
  // homepage demo's "demo_runs" cookie and Clerk's usage-limit metadata. Not
  // bulletproof — a visitor can clear cookies or use a private window — but
  // feedback submissions are low-cost and this only needs to deter abuse, not
  // stop it outright.
  const currentSubmissions = Number(request.cookies.get(COOKIE_NAME)?.value ?? "0") || 0;
  if (currentSubmissions >= MAX_DAILY_SUBMISSIONS) {
    return NextResponse.json({ error: "limit" }, { status: 429 });
  }

  // Public aggregate rating data — sum and count only, never the comment —
  // stored in Redis so the homepage can show a real, live average. Resilient
  // the same way the Resend send below is: a Redis failure is logged but
  // never breaks the user-facing success response.
  await incrementRatingCounters(rating);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[feedback] RESEND_API_KEY is not set — skipping email send");
  } else {
    try {
      const resend = new Resend(apiKey);
      const timestamp = new Date().toISOString();
      await resend.emails.send({
        from: "BA Copilot Feedback <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        subject: `New BA Copilot feedback - ${rating} star (${source})`,
        text: [
          `Rating: ${rating} star${rating === 1 ? "" : "s"}`,
          `Comment: ${comment || "No comment provided"}`,
          `Source: ${source}`,
          `Timestamp: ${timestamp}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[feedback] Resend email failed to send", err);
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, String(currentSubmissions + 1), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
