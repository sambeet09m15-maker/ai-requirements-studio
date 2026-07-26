import { getRatingsSummary } from "@/lib/redis";

// Server component — reads the live rating aggregate directly from Redis.
// Renders nothing at all (no placeholder, no "coming soon") until the
// sample size crosses MIN_RATINGS_TO_SHOW, per lib/limits.ts.
export async function RatingBadge() {
  const { average, count, showBadge } = await getRatingsSummary();
  if (!showBadge) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "rgba(13,148,136,0.12)",
        border: "1px solid rgba(13,148,136,0.35)",
        borderRadius: "999px",
        padding: "5px 12px",
        fontSize: "11.5px",
        color: "#5eead4",
        fontWeight: 500,
      }}
    >
      ★ {average} ({count} ratings)
    </span>
  );
}
