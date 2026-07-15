import { NextResponse } from "next/server";
import { checkRequirementQualityCriteria, type QualityCriterionStatus } from "@/lib/llm";

const VALID_STATUSES: QualityCriterionStatus[] = ["present", "partial", "missing"];

type QualityCriterion = { name: string; status: QualityCriterionStatus; note: string };

function isValidCriterion(item: unknown): item is { name: string; status: QualityCriterionStatus; note?: string } {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Record<string, unknown>;
  return (
    typeof candidate.name === "string" &&
    candidate.name.trim().length > 0 &&
    typeof candidate.status === "string" &&
    VALID_STATUSES.includes(candidate.status as QualityCriterionStatus)
  );
}

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
    const { criteria: rawCriteria } = await checkRequirementQualityCriteria(requirement);

    if (!Array.isArray(rawCriteria) || rawCriteria.length < 4 || rawCriteria.length > 7 || !rawCriteria.every(isValidCriterion)) {
      return NextResponse.json({ error: "analysis_failed" }, { status: 200 });
    }

    const criteria: QualityCriterion[] = rawCriteria.map((item) => ({
      name: String(item.name),
      status: item.status as QualityCriterionStatus,
      note: typeof item.note === "string" ? item.note : "",
    }));

    const points = criteria.reduce((sum, c) => sum + (c.status === "present" ? 1 : c.status === "partial" ? 0.5 : 0), 0);
    const score = Math.round(((points / criteria.length) * 100) / 5) * 5;

    return NextResponse.json({ score, criteria });
  } catch {
    return NextResponse.json({ error: "analysis_failed" }, { status: 200 });
  }
}
