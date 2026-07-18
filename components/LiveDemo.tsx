"use client";

import { useEffect, useRef, useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight, Check, X } from "lucide-react";

type Tag = { label: string; ok: boolean };
type DemoHeader = { score: number; tags: Tag[]; runsLeft: number };

const EXAMPLE_REQUIREMENT = "The system should notify users quickly when an order fails.";
const MAX_LENGTH = 500;

function scoreColor(score: number) {
  if (score >= 70) return "#16a34a";
  if (score >= 40) return "#d97706";
  return "#dc2626";
}

export function LiveDemo() {
  const [requirement, setRequirement] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);

  const [score, setScore] = useState<number | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [rewrite, setRewrite] = useState("");
  const [runsLeft, setRunsLeft] = useState<number | null>(null);

  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  function animateScore(target: number) {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const duration = 900;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      setDisplayScore(Math.round(progress * target));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      }
    }
    animationRef.current = requestAnimationFrame(tick);
  }

  function resetResult() {
    setScore(null);
    setDisplayScore(0);
    setTags(null);
    setRewrite("");
  }

  async function analyze() {
    const trimmed = requirement.trim();
    if (!trimmed) {
      setError("Please enter a requirement first.");
      return;
    }

    setError(null);
    resetResult();
    setLoading(true);
    setStreaming(false);

    try {
      const response = await fetch("/api/demo-quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirement: trimmed }),
      });

      if (response.status === 429) {
        setLoading(false);
        setLimitReached(true);
        return;
      }

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        setError(data?.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setStreaming(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let headerParsed = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        if (!headerParsed) {
          const newlineIndex = buffer.indexOf("\n");
          if (newlineIndex === -1) continue;

          const headerLine = buffer.slice(0, newlineIndex);
          const rest = buffer.slice(newlineIndex + 1);
          headerParsed = true;
          buffer = "";

          try {
            const parsed = JSON.parse(headerLine) as DemoHeader;
            setScore(parsed.score);
            animateScore(parsed.score);
            setTags(parsed.tags);
            setRunsLeft(parsed.runsLeft);
          } catch {
            setError("Something went wrong. Please try again.");
            setStreaming(false);
            return;
          }

          if (rest) setRewrite((prev) => prev + rest);
        } else {
          setRewrite((prev) => prev + buffer);
          buffer = "";
        }
      }

      setStreaming(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      setStreaming(false);
    }
  }

  function useExample() {
    setRequirement(EXAMPLE_REQUIREMENT);
    setError(null);
  }

  const hasResult = score !== null && tags !== null;

  if (limitReached) {
    return (
      <div
        style={{
          background: "rgba(10,18,35,0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          boxShadow: "0 0 0 1px rgba(13,148,136,0.15), 0 24px 60px rgba(0,0,0,0.6)",
          maxWidth: "500px",
          width: "100%",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "8px" }}>
          You&apos;ve used your 3 free runs
        </p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "20px" }}>
          Sign up free to keep analysing requirements and unlock the full BA package —
          user stories, acceptance criteria, BRD, risks and test scenarios.
        </p>
        <SignUpButton mode="modal">
          <button
            style={{
              background: "#0d9488",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              padding: "11px 22px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up Free →
          </button>
        </SignUpButton>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(10,18,35,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 0 1px rgba(13,148,136,0.15), 0 24px 60px rgba(0,0,0,0.6)",
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          padding: "7px 13px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span style={{ fontSize: "9.9px", color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "1px" }}>
          LIVE DEMO
        </span>
        {runsLeft !== null ? (
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{runsLeft} free runs left</span>
        ) : null}
      </div>

      <div style={{ padding: "14px 16px" }}>
        <textarea
          value={requirement}
          onChange={(event) => setRequirement(event.target.value.slice(0, MAX_LENGTH))}
          placeholder="Paste any requirement — e.g. 'The system should notify users quickly when an order fails.'"
          rows={3}
          disabled={loading || streaming}
          className="w-full"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "10px 12px",
            fontSize: "13px",
            color: "white",
            resize: "vertical",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            onClick={useExample}
            disabled={loading || streaming}
            style={{ fontSize: "11.5px", color: "#5eead4", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Try an example
          </button>
          <button
            type="button"
            onClick={analyze}
            disabled={loading || streaming}
            style={{
              background: loading || streaming ? "rgba(13,148,136,0.5)" : "#0d9488",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              padding: "9px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: loading || streaming ? "default" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {loading ? "Analysing…" : streaming ? "Streaming…" : "Analyze my requirement"}
          </button>
        </div>

        {error ? <p style={{ fontSize: "11.5px", color: "#f87171", marginTop: "8px" }}>{error}</p> : null}

        {hasResult ? (
          <div style={{ marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1, height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${displayScore}%`,
                    background: scoreColor(score ?? 0),
                    transition: "width 80ms linear",
                    borderRadius: "3px",
                  }}
                />
              </div>
              <span style={{ fontSize: "15px", fontWeight: 700, color: scoreColor(score ?? 0), minWidth: "38px", textAlign: "right" }}>
                {displayScore}%
              </span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
              {tags?.map((tag, i) => (
                <span
                  key={`${tag.label}-${i}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: tag.ok ? "rgba(22,163,74,0.15)" : "rgba(220,38,38,0.15)",
                    color: tag.ok ? "#4ade80" : "#f87171",
                  }}
                >
                  {tag.ok ? <Check size={11} /> : <X size={11} />}
                  {tag.label}
                </span>
              ))}
            </div>

            <div style={{ marginTop: "12px" }}>
              <div style={{ fontSize: "9.9px", color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "0.5px", marginBottom: "5px" }}>
                AI-SUGGESTED REWRITE
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, minHeight: "20px" }}>
                {rewrite}
                {streaming ? <span style={{ opacity: 0.5 }}>▍</span> : null}
              </div>
            </div>

            {!streaming ? (
              <div
                style={{
                  marginTop: "16px",
                  background: "rgba(13,148,136,0.08)",
                  border: "1px solid rgba(13,148,136,0.25)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: "4px" }}>
                  Unlock the full package
                </p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: "10px" }}>
                  User stories, acceptance criteria, BRD, risks and test scenarios — generated from this same requirement.
                </p>
                <SignUpButton mode="modal">
                  <button
                    style={{
                      background: "#0d9488",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "8px 14px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Sign Up Free <ArrowRight size={13} />
                  </button>
                </SignUpButton>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
