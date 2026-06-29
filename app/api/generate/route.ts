import { NextResponse } from "next/server";
import { checkCoverage, generateRequirements, type GeneratePayload } from "@/lib/llm";

export async function POST(request: Request) {
  const body = (await request.json()) as GeneratePayload;

  if (!body.requirement?.trim()) {
    return NextResponse.json({ error: "Requirement is required." }, { status: 400 });
  }

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const requirements = await generateRequirements(body);
      const coverageReport =
        body.documentType === "Full Requirements Package" && !body.section
          ? await checkCoverage(requirements)
          : [];
      return NextResponse.json({ requirements, coverageReport });
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
