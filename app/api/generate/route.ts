import { NextResponse } from "next/server";
import { generateRequirements, type GeneratePayload } from "@/lib/llm";
import { checkDailyLimit, consumeDailyRun } from "@/lib/limits";

export async function POST(request: Request) {
  const body = (await request.json()) as GeneratePayload;

  if (!body.requirement?.trim()) {
    return NextResponse.json({ error: "Requirement is required." }, { status: 400 });
  }

  const limit = await checkDailyLimit();
  if (!limit.ok) {
    return NextResponse.json({ error: "limit", message: limit.message }, { status: 429 });
  }

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const requirements = await generateRequirements(body);
      const runsLeft = await consumeDailyRun();
      return NextResponse.json({ requirements, runsLeft });
    } catch (error) {
      if (attempt === 2) {
        const message = error instanceof Error ? error.message : "Unknown generation error.";
        return NextResponse.json(
          { error: `The AI response could not be parsed after two attempts. ${message}` },
          { status: 502 },
        );
      }
    }
  }
}
