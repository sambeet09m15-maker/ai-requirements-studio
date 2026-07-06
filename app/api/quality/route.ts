import { NextResponse } from "next/server";
import { checkRequirementQuality } from "@/lib/llm";

export async function POST(request: Request) {
  const body = (await request.json()) as { requirement?: string };

  if (!body.requirement?.trim()) {
    return NextResponse.json({ error: "Requirement is required." }, { status: 400 });
  }

  try {
    const quality = await checkRequirementQuality(body.requirement);
    return NextResponse.json({ quality });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown quality check error.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
