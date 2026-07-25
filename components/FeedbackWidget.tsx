"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const MAX_COMMENT_LENGTH = 500;

type Source = "demo" | "dashboard";

export function FeedbackWidget({ source, variant = "light" }: { source: Source; variant?: "light" | "dark" }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === "dark";

  async function submit() {
    if (rating < 1) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment: comment.trim(), source }),
      });
      if (!response.ok) {
        setError("Could not send feedback right now. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Could not send feedback right now. Please try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          padding: "14px 16px",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: 600,
          background: isDark ? "rgba(13,148,136,0.1)" : "#f0fdfa",
          border: isDark ? "1px solid rgba(13,148,136,0.3)" : "1px solid #99f6e4",
          color: isDark ? "#5eead4" : "#0f766e",
        }}
      >
        Thanks for your feedback!
      </div>
    );
  }

  const activeStars = hoverRating || rating;

  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: "10px",
        background: isDark ? "rgba(255,255,255,0.04)" : "#f8fafc",
        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
      }}
    >
      <p
        style={{
          fontSize: "12.5px",
          fontWeight: 600,
          marginBottom: "8px",
          color: isDark ? "rgba(255,255,255,0.8)" : "#334155",
        }}
      >
        How was this result?
      </p>

      <div style={{ display: "flex", gap: "4px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`Rate ${value} star${value === 1 ? "" : "s"}`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(0)}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", lineHeight: 0 }}
          >
            <Star
              size={22}
              fill={value <= activeStars ? "#f59e0b" : "none"}
              color={value <= activeStars ? "#f59e0b" : isDark ? "rgba(255,255,255,0.3)" : "#cbd5e1"}
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value.slice(0, MAX_COMMENT_LENGTH))}
        placeholder="Optional - tell us what worked or what didn't"
        rows={2}
        maxLength={MAX_COMMENT_LENGTH}
        className="w-full"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
          border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "8px 10px",
          fontSize: "12.5px",
          color: isDark ? "white" : "#0f172a",
          resize: "vertical",
          outline: "none",
        }}
      />

      {error ? (
        <p style={{ fontSize: "11px", color: "#f87171", marginTop: "6px" }}>{error}</p>
      ) : null}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <button
          type="button"
          onClick={submit}
          disabled={rating < 1 || submitting}
          style={{
            background: rating < 1 || submitting ? (isDark ? "rgba(13,148,136,0.4)" : "#99f6e4") : "#0d9488",
            color: "white",
            fontSize: "12.5px",
            fontWeight: 600,
            padding: "7px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: rating < 1 || submitting ? "default" : "pointer",
          }}
        >
          {submitting ? "Sending..." : "Submit feedback"}
        </button>
      </div>
    </div>
  );
}
