import { NextResponse } from "next/server";
import { analyzeRequirementQuality } from "@/lib/quality";

export async function POST(request: Request) {
  const body = (await request.json()) as { requirement?: string };
  const requirement = body.requirement;

  if (!requirement?.trim()) {
    return NextResponse.json({ error: "Requirement is required." }, { status: 400 });
  }
  if (requirement.length > 2000) {
    return NextResponse.json({ error: "Requirement is too long." }, { status: 400 });
  }

  try {
    const { score, criteria } = await analyzeRequirementQuality(requirement);

    if (criteria.length < 1 || criteria.length > 7) {
      return NextResponse.json({ error: "analysis_failed" }, { status: 200 });
    }

    return NextResponse.json({ score, criteria });
  } catch {
    return NextResponse.json({ error: "analysis_failed" }, { status: 200 });
  }
}
