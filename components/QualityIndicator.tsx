"use client";

import { useEffect, useRef, useState } from "react";

type QualityCriterionStatus = "present" | "partial" | "missing";
type QualityCriterion = { name: string; status: QualityCriterionStatus; note: string };
type QualityResult = { score: number; criteria: QualityCriterion[] };

const STATUS_STYLES: Record<QualityCriterionStatus, { bg: string; text: string; symbol: string; suffix: string }> = {
  present: { bg: "bg-emerald-50", text: "text-emerald-700", symbol: "✓", suffix: "" },
  partial: { bg: "bg-amber-50", text: "text-amber-700", symbol: "△", suffix: "?" },
  missing: { bg: "bg-red-50", text: "text-red-700", symbol: "✗", suffix: "?" },
};

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
}

export function QualityIndicator({ requirement }: { requirement: string }) {
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
          if (data.error || !Array.isArray(data.criteria)) {
            setHidden(true);
            setResult(null);
            return;
          }
          setHidden(false);
          setResult({ score: data.score, criteria: data.criteria });
          setHasLoadedOnce(true);
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

  const { score, criteria } = result;
  const total = criteria.length;
  const present = criteria.filter((c) => c.status === "present").length;
  const partial = criteria.filter((c) => c.status === "partial").length;
  const green = Math.round((present / total) * 5);
  let amber = Math.round((partial / total) * 5);
  if (green + amber > 5) amber = 5 - green;
  const red = 5 - green - amber;
  const dots = [
    ...Array.from({ length: green }, () => "#16a34a"),
    ...Array.from({ length: amber }, () => "#d97706"),
    ...Array.from({ length: red }, () => "#dc2626"),
  ];

  const gapCriteria = criteria.filter((c) => c.status !== "present");

  return (
    <div className={`rounded-md border border-slate-200 bg-slate-50 p-3 transition-opacity ${loading ? "opacity-60" : "opacity-100"}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">Requirement Quality</span>
        <div className="flex items-center gap-1.5">
          {dots.map((color, i) => (
            <span key={i} className="inline-block size-[9px] rounded-full" style={{ background: color }} />
          ))}
          <span className={`ml-1 text-xs font-semibold ${scoreColor(score)}`}>{score}%</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {criteria.map((c) => {
          const style = STATUS_STYLES[c.status];
          return (
            <span key={c.name} className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${style.bg} ${style.text}`}>
              {style.symbol} {c.name}
              {style.suffix}
            </span>
          );
        })}
      </div>

      {gapCriteria.length ? (
        <div className="mt-2 space-y-0.5">
          {gapCriteria.map((c) => (
            <p key={c.name} className="text-[11px] leading-4 text-slate-500">
              {c.name}: {c.note}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
