import { auth, clerkClient } from "@clerk/nextjs/server";

// DAILY_LIMIT is the single place to change the shared daily AI-run quota
// for signed-in users. It applies across EVERY authed route that calls
// OpenAI — quality analyses and document generations draw from the same
// counter (see checkDailyLimit / consumeDailyRun below).
export const DAILY_LIMIT = 10;

// DEMO_LIMIT documents the existing cookie-based homepage demo limit,
// enforced separately in app/api/demo-quality/route.ts for signed-out
// visitors. Kept here for visibility only — this module doesn't use it.
export const DEMO_LIMIT = 3;

type UsageMetadata = { usageDate?: string; usageCount?: number };

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

export type UsageCheck = { ok: true; runsLeft: number } | { ok: false; message: string };

/**
 * Checks whether the signed-in user has quota left today, WITHOUT consuming
 * it. Call this BEFORE making the OpenAI call so a limited user never
 * triggers a paid model call.
 */
export async function checkDailyLimit(): Promise<UsageCheck> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, message: "Sign in required." };
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const usage = (user.privateMetadata as UsageMetadata) ?? {};
  const usageCount = usage.usageDate === todayKey() ? (usage.usageCount ?? 0) : 0;

  if (usageCount >= DAILY_LIMIT) {
    return { ok: false, message: "You've used today's 10 free runs — come back tomorrow!" };
  }

  return { ok: true, runsLeft: DAILY_LIMIT - usageCount };
}

/**
 * Increments today's usage count for the signed-in user. Call this ONLY
 * after a successful OpenAI call — a failed call must not consume quota.
 * Returns the runs left after incrementing (0 if not signed in).
 *
 * Best-effort, not atomic: two concurrent requests could both read the same
 * pre-increment count and both write back +1, under-counting by one in a
 * rare race. Acceptable here given the low stakes (a fair-use nudge, not a
 * billing meter) and the "no new database" constraint — Clerk metadata has
 * no atomic increment primitive to lean on instead.
 */
export async function consumeDailyRun(): Promise<number> {
  const { userId } = await auth();
  if (!userId) return 0;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const usage = (user.privateMetadata as UsageMetadata) ?? {};
  const today = todayKey();
  const nextCount = usage.usageDate === today ? (usage.usageCount ?? 0) + 1 : 1;

  await client.users.updateUserMetadata(userId, {
    privateMetadata: { usageDate: today, usageCount: nextCount },
  });

  return Math.max(0, DAILY_LIMIT - nextCount);
}
