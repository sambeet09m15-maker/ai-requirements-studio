"use client";

import { useEffect, useRef, useState } from "react";

type QualityTag = { label: string; ok: boolean };
type QualityResult = { score: number; tags: QualityTag[] };

function scoreTextColor(score: number) {
  if (score >= 70) return "text-emerald-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
}

function scoreBarColor(score: number) {
  if (score >= 70) return "#16a34a";
  if (score >= 40) return "#d97706";
  return "#dc2626";
}

export function QualityIndicator({ requirement, onUsage }: { requirement: string; onUsage?: (runsLeft: number) => void }) {
  const [result, setResult] = useState<QualityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      fetch("/api/quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirement }),
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          if (controller.signal.aborted) return;
          if (data.error || !Array.isArray(data.tags)) {
            setHidden(true);
            setResult(null);
            return;
          }
          setHidden(false);
          setResult({ score: data.score, tags: data.tags });
          setHasLoadedOnce(true);
          if (typeof data.runsLeft === "number") onUsage?.(data.runsLeft);
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setHidden(true);
          setResult(null);
        })
        .finally(() => {
          if (controller.signal.aborted) return;
          setLoading(false);
        });
    }, 800);

    return () => clearTimeout(timeout);
  }, [requirement]);

  if (hidden && !result) return null;
  if (!result) {
    if (loading && !hasLoadedOnce) {
      return <p className="text-xs text-slate-400">Analysing…</p>;
    }
    return null;
  }

  const { score, tags } = result;

  return (
    <div className={`rounded-md border border-slate-200 bg-slate-50 p-3 transition-opacity ${loading ? "opacity-60" : "opacity-100"}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">Requirement Quality</span>
        <span className={`text-xs font-semibold ${scoreTextColor(score)}`}>{score}%</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: scoreBarColor(score) }} />
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span
            key={`${tag.label}-${i}`}
            className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${tag.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
          >
            {tag.ok ? "✓" : "✗"} {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
}
