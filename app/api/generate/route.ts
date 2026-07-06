import { NextResponse } from "next/server";
import { generateRequirements, type GeneratePayload } from "@/lib/llm";

export async function POST(request: Request) {
  const body = (await request.json()) as GeneratePayload;

  if (!body.requirement?.trim()) {
    return NextResponse.json({ error: "Requirement is required." }, { status: 400 });
  }

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const requirements = await generateRequirements(body);
      return NextResponse.json({ requirements });
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
