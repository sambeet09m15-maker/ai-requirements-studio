import { NextResponse } from "next/server";
import { getRatingsSummary } from "@/lib/redis";

// Public, unauthenticated route — see middleware.ts, which explicitly excludes
// this path from Clerk's auth.protect().
export const runtime = "nodejs";

export async function GET() {
  const summary = await getRatingsSummary();
  return NextResponse.json(summary);
}
