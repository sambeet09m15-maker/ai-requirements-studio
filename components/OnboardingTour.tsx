"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const TOUR_STORAGE_KEY = "ba-ai-studio-tour-seen";

const steps = [
  { target: "requirements", title: "Input Panel", body: "Paste the raw requirement here, then choose Workspace, Domain, Project Type, and Document Type." },
  { target: "workspace-field", title: "Workspace selector", body: "Use this dropdown to select a Workspace or create a new one." },
  { target: "generate-button", title: "Generate", body: "Generate runs the normal documentation flow. Quality checks are separate and optional." },
  { target: "output-tabs", title: "Output tabs", body: "Generated sections and the Traceability Matrix appear here." },
  { target: "history-panel", title: "History", body: "Saved analyses are grouped by Workspace and can be reloaded any time." },
  { target: "glossary-search", title: "Glossary search", body: "Search BA terms instantly without an AI call." },
];

export function replayTour() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("ba-replay-tour"));
}

export function OnboardingTour() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const step = steps[index];

  useEffect(() => {
    function start() {
      setIndex(0);
      setOpen(true);
    }

    if (!localStorage.getItem(TOUR_STORAGE_KEY)) start();
    window.addEventListener("ba-replay-tour", start);
    return () => window.removeEventListener("ba-replay-tour", start);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.getElementById(step.target)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [open, step.target]);

  function close() {
    localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(360px,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white p-4 shadow-2xl">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">Step {index + 1} of {steps.length}</div>
      <h2 className="mt-2 text-base font-semibold text-slate-950">{step.title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
      <div className="mt-4 flex justify-between gap-2">
        <Button type="button" variant="ghost" size="sm" onClick={close}>Skip</Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>Back</Button>
          <Button type="button" size="sm" onClick={() => (index === steps.length - 1 ? close() : setIndex(index + 1))}>
            {index === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
