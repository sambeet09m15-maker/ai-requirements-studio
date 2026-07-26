import { createClient, type RedisClientType } from "redis";
import { MIN_RATINGS_TO_SHOW } from "@/lib/limits";

// Public aggregate rating keys — sum and count only, written in
// app/api/feedback/route.ts and read in app/api/ratings-summary/route.ts.
// Individual comments are never stored here.
export const RATINGS_SUM_KEY = "ratings:sum";
export const RATINGS_COUNT_KEY = "ratings:count";

// A dead/unreachable Redis must never hang a request — the homepage and the
// feedback route both need to fail fast and fall back gracefully instead of
// leaving a page load stuck. Every call into Redis below is wrapped in this.
const COMMAND_TIMEOUT_MS = 2000;

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`[redis] ${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (err) => { clearTimeout(timer); reject(err); },
    );
  });
}

// Cached across warm serverless invocations so we don't open a new TCP
// connection to Redis Cloud on every request. `connectPromise` also
// de-dupes concurrent cold-start calls into a single connect() attempt.
let client: RedisClientType | null = null;
let connectPromise: Promise<RedisClientType> | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (client && client.isReady) return client;

  if (!connectPromise) {
    const url = process.env.REDIS_URL;
    if (!url) {
      throw new Error("REDIS_URL is not set");
    }
    const newClient: RedisClientType = createClient({
      url,
      socket: {
        connectTimeout: COMMAND_TIMEOUT_MS,
        // Don't let node-redis retry reconnecting in the background — a
        // serverless function instance is short-lived, and an indefinite
        // retry loop just holds a dead socket open. A fresh call after a
        // failure creates a fresh client instead (see 'error'/'end' below).
        reconnectStrategy: false,
      },
    });
    newClient.on("error", (err) => {
      console.error("[redis] client error", err);
      client = null;
    });
    newClient.on("end", () => {
      client = null;
    });
    connectPromise = withTimeout(newClient.connect(), COMMAND_TIMEOUT_MS, "connect")
      .then(() => {
        client = newClient;
        return newClient;
      })
      .finally(() => {
        connectPromise = null;
      });
  }

  return connectPromise;
}

// A command timeout doesn't necessarily fire the socket's 'error'/'end'
// events (the connection can look alive while a specific command is stuck),
// so the next call would otherwise keep reusing — and re-timing-out on — the
// same wedged client. Force it to reconnect fresh next time.
function discardClient() {
  const stale = client;
  client = null;
  stale?.destroy();
}

export type RatingsSummary = { average: number; count: number; showBadge: boolean };

// Shared by app/api/ratings-summary/route.ts (public JSON endpoint) and
// components/RatingBadge.tsx (server component reading Redis directly) so
// the average/showBadge computation lives in exactly one place.
export async function getRatingsSummary(): Promise<RatingsSummary> {
  try {
    const redis = await getRedisClient();
    const [sumRaw, countRaw] = await withTimeout(
      redis.mGet([RATINGS_SUM_KEY, RATINGS_COUNT_KEY]),
      COMMAND_TIMEOUT_MS,
      "mGet ratings summary",
    );

    const sum = Number(sumRaw ?? 0) || 0;
    const count = Number(countRaw ?? 0) || 0;
    const average = count > 0 ? Math.round((sum / count) * 10) / 10 : 0;

    return { average, count, showBadge: count >= MIN_RATINGS_TO_SHOW };
  } catch (err) {
    console.error("[ratings-summary] Redis read failed", err);
    discardClient();
    return { average: 0, count: 0, showBadge: false };
  }
}

// Called from app/api/feedback/route.ts for every valid submission. Resilient
// the same way the Resend send in that route is: a Redis failure is logged
// but never breaks the user-facing success response.
export async function incrementRatingCounters(rating: number): Promise<void> {
  try {
    const redis = await getRedisClient();
    await withTimeout(redis.incrBy(RATINGS_SUM_KEY, rating), COMMAND_TIMEOUT_MS, "incrBy ratings:sum");
    await withTimeout(redis.incrBy(RATINGS_COUNT_KEY, 1), COMMAND_TIMEOUT_MS, "incrBy ratings:count");
  } catch (err) {
    console.error("[feedback] Redis rating increment failed", err);
    discardClient();
  }
}
