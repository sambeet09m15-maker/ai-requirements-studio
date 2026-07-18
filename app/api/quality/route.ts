import { NextResponse } from "next/server";
import { analyzeRequirementQuality } from "@/lib/quality";
import { checkDailyLimit, consumeDailyRun } from "@/lib/limits";

export async function POST(request: Request) {
  const body = (await request.json()) as { requirement?: string };
  const requirement = body.requirement;

  if (!requirement?.trim()) {
    return NextResponse.json({ error: "Requirement is required." }, { status: 400 });
  }
  if (requirement.length > 2000) {
    return NextResponse.json({ error: "Requirement is too long." }, { status: 400 });
  }

  const limit = await checkDailyLimit();
  if (!limit.ok) {
    return NextResponse.json({ error: "limit", message: limit.message }, { status: 429 });
  }

  try {
    const { type, score, tags } = await analyzeRequirementQuality(requirement);

    if (!tags.length) {
      return NextResponse.json({ error: "analysis_failed" }, { status: 200 });
    }

    const runsLeft = await consumeDailyRun();
    return NextResponse.json({ type, score, tags, runsLeft });
  } catch {
    return NextResponse.json({ error: "analysis_failed" }, { status: 200 });
  }
}
