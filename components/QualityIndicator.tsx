"use client";

import { useEffect, useRef, useState } from "react";

type QualityTag = { label: string; ok: boolean };
type QualityResult = { score: number; tags: QualityTag[] };
type Status = "idle" | "loading" | "ok" | "limit" | "error";

const LIMIT_MESSAGE = "You've used today's 10 free runs — come back tomorrow!";
const GENERIC_ERROR_MESSAGE = "Could not check quality right now — you can still submit for generation.";

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
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<QualityResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStatus("loading");
      fetch("/api/quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirement }),
        signal: controller.signal,
      })
        .then(async (response) => {
          if (controller.signal.aborted) return;
          const data = await response.json().catch(() => null);

          if (response.status === 429) {
            setStatus("limit");
            setResult(null);
            setMessage(data?.message || LIMIT_MESSAGE);
            onUsage?.(0);
            return;
          }

          if (!response.ok || !data || data.error || !Array.isArray(data.tags)) {
            setStatus("error");
            setResult(null);
            setMessage(GENERIC_ERROR_MESSAGE);
            return;
          }

          setStatus("ok");
          setResult({ score: data.score, tags: data.tags });
          if (typeof data.runsLeft === "number") onUsage?.(data.runsLeft);
        })
        .catch(() => {
          if (controller.signal.aborted) return;
          setStatus("error");
          setResult(null);
          setMessage(GENERIC_ERROR_MESSAGE);
        });
    }, 800);

    return () => clearTimeout(timeout);
  }, [requirement, onUsage]);

  if (status === "idle") return null;

  if (status === "loading" && !result) {
    return <p className="text-xs text-slate-400">Analysing…</p>;
  }

  if (status === "limit") {
    return (
      <div className="rounded-md border border-teal-200 bg-teal-50 p-3 text-xs text-teal-900">
        <p className="font-semibold">{message}</p>
      </div>
    );
  }

  if (status === "error") {
    return <p className="text-xs text-red-600">{message}</p>;
  }

  if (!result) return null;

  const { score, tags } = result;

  return (
    <div className={`rounded-md border border-slate-200 bg-slate-50 p-3 transition-opacity ${status === "loading" ? "opacity-60" : "opacity-100"}`}>
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
