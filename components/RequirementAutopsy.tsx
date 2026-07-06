"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, ClipboardCheck, Table2 } from "lucide-react";
import { requirementAutopsy } from "@/lib/knowledge-hub-enrichment";

type StepKey = "quality" | "gap" | "moscow" | "story" | "criteria" | "raci" | "uat";

function StepSection({
  id,
  title,
  subtitle,
  open,
  onToggle,
  children,
}: {
  id: StepKey;
  title: string;
  subtitle: string;
  open: boolean;
  onToggle: (id: StepKey) => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={() => onToggle(id)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span>
          <span className="block text-base font-semibold text-slate-950">{title}</span>
          <span className="mt-1 block text-sm text-slate-500">{subtitle}</span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? <div className="border-t border-slate-100 px-5 py-5">{children}</div> : null}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function RequirementAutopsy() {
  const [openStep, setOpenStep] = useState<StepKey | null>(null);

  function toggleStep(step: StepKey) {
    setOpenStep(openStep === step ? null : step);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-800 ring-1 ring-cyan-100">
          <span>{requirementAutopsy.icon}</span>
          {requirementAutopsy.domain}
        </div>
        <h2 className="text-base font-semibold text-slate-950">The Raw Requirement</h2>
        <blockquote className="mt-3 rounded-md border-l-4 border-blue-600 bg-blue-50 p-4 text-sm italic leading-6 text-slate-800">
          {requirementAutopsy.rawRequirement}
        </blockquote>
        <p className="mt-4 text-sm leading-6 text-slate-600">Below, we break this requirement apart using every core BA technique — exactly as you would in a real project.</p>
      </section>

      <StepSection id="quality" title={requirementAutopsy.qualityCheck.title} subtitle={requirementAutopsy.qualityCheck.subtitle} open={openStep === "quality"} onToggle={toggleStep}>
        <div className="mb-5 rounded-md border border-emerald-100 bg-emerald-50 p-4">
          <h3 className="text-sm font-semibold text-emerald-950">Improved requirement</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-900">{requirementAutopsy.qualityCheck.improvedRequirement}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {requirementAutopsy.qualityCheck.vagueTerms.map((term) => (
            <article key={term.term} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-slate-950">{term.term}</h3>
              <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-amber-950">
                  <AlertTriangle className="size-4" />
                  Problem
                </div>
                <p className="text-sm leading-6 text-amber-900">{term.problem}</p>
              </div>
              <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-emerald-950">
                  <CheckCircle2 className="size-4" />
                  Fix
                </div>
                <p className="text-sm leading-6 text-emerald-900">{term.fix}</p>
              </div>
            </article>
          ))}
        </div>
      </StepSection>

      <StepSection id="gap" title={requirementAutopsy.gapAnalysis.title} subtitle={requirementAutopsy.gapAnalysis.subtitle} open={openStep === "gap"} onToggle={toggleStep}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-3 text-base font-semibold text-slate-950">Current State</h3>
            <BulletList items={requirementAutopsy.gapAnalysis.currentState} />
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <h3 className="mb-3 text-base font-semibold text-blue-950">Desired State</h3>
            <BulletList items={requirementAutopsy.gapAnalysis.desiredState} />
          </div>
        </div>
        <div className="mt-4 rounded-md border-l-4 border-indigo-600 bg-indigo-50 p-4 text-sm leading-6 text-indigo-950">{requirementAutopsy.gapAnalysis.gap}</div>
      </StepSection>

      <StepSection id="moscow" title={requirementAutopsy.moscow.title} subtitle={requirementAutopsy.moscow.subtitle} open={openStep === "moscow"} onToggle={toggleStep}>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Must Have", requirementAutopsy.moscow.mustHave, "border-red-200 bg-red-50 text-red-950"],
            ["Should Have", requirementAutopsy.moscow.shouldHave, "border-amber-200 bg-amber-50 text-amber-950"],
            ["Could Have", requirementAutopsy.moscow.couldHave, "border-blue-200 bg-blue-50 text-blue-950"],
            ["Won't Have", requirementAutopsy.moscow.wontHave, "border-slate-200 bg-slate-50 text-slate-700"],
          ].map(([label, items, className]) => (
            <div key={label as string} className={`rounded-lg border p-4 ${className as string}`}>
              <h3 className="mb-3 text-base font-semibold">{label as string}</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
                {(items as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </StepSection>

      <StepSection id="story" title={requirementAutopsy.userStory.title} subtitle={requirementAutopsy.userStory.subtitle} open={openStep === "story"} onToggle={toggleStep}>
        <blockquote className="rounded-md border-l-4 border-violet-600 bg-violet-50 p-4 text-base font-medium leading-7 text-violet-950">
          {requirementAutopsy.userStory.primaryStory.text}
        </blockquote>
        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-3 py-2 font-semibold">Letter</th>
                <th className="px-3 py-2 font-semibold">Word</th>
                <th className="px-3 py-2 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {requirementAutopsy.userStory.primaryStory.investCheck.map((row) => (
                <tr key={row.letter} className="border-t border-slate-100">
                  <td className="px-3 py-3 font-semibold text-slate-950">{row.letter}</td>
                  <td className="px-3 py-3 text-slate-700">{row.word}</td>
                  <td className="px-3 py-3 text-slate-600">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-5 text-base font-semibold text-slate-950">How this story breaks into sprint-sized pieces.</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
          {requirementAutopsy.userStory.splitStories.map((story) => (
            <li key={story}>{story}</li>
          ))}
        </ol>
      </StepSection>

      <StepSection id="criteria" title={requirementAutopsy.acceptanceCriteria.title} subtitle={requirementAutopsy.acceptanceCriteria.subtitle} open={openStep === "criteria"} onToggle={toggleStep}>
        <div className="grid gap-4">
          {requirementAutopsy.acceptanceCriteria.criteria.map((criterion) => (
            <article key={criterion.id} className="rounded-lg border border-blue-100 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-slate-950">{criterion.id}: {criterion.title}</h3>
              <div className="mt-3 grid gap-2">
                {[
                  ["Given", criterion.given],
                  ["When", criterion.when],
                  ["Then", criterion.then],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-slate-100 bg-slate-50 p-3 text-sm leading-6">
                    <span className="font-semibold text-blue-700">{label}: </span>
                    <span className="text-slate-700">{value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </StepSection>

      <StepSection id="raci" title={requirementAutopsy.raci.title} subtitle={requirementAutopsy.raci.subtitle} open={openStep === "raci"} onToggle={toggleStep}>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-800">
              <tr>
                {["Task", "Responsible", "Accountable", "Consulted", "Informed"].map((heading) => (
                  <th key={heading} className="px-3 py-3 font-semibold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requirementAutopsy.raci.tasks.map((task, index) => (
                <tr key={task.task} className={`border-t border-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <td className="px-3 py-3 font-medium text-slate-950">{task.task}</td>
                  <td className="px-3 py-3 text-slate-700">{task.responsible}</td>
                  <td className="px-3 py-3 text-slate-700">{task.accountable}</td>
                  <td className="px-3 py-3 text-slate-700">{task.consulted}</td>
                  <td className="px-3 py-3 text-slate-700">{task.informed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </StepSection>

      <StepSection id="uat" title={requirementAutopsy.uat.title} subtitle={requirementAutopsy.uat.subtitle} open={openStep === "uat"} onToggle={toggleStep}>
        <div className="grid gap-4 md:grid-cols-2">
          {requirementAutopsy.uat.scenarios.map((scenario) => (
            <article key={scenario.id} className="rounded-lg border border-teal-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-teal-800">
                <ClipboardCheck className="size-4" />
                <h3 className="font-semibold">{scenario.id}: {scenario.scenario}</h3>
              </div>
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {scenario.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <div className="mt-4 rounded-md border border-teal-200 bg-teal-50 p-3 text-sm leading-6 text-teal-950">
                <div className="mb-1 flex items-center gap-2 font-semibold">
                  <Table2 className="size-4" />
                  Expected result
                </div>
                {scenario.expectedResult}
              </div>
            </article>
          ))}
        </div>
      </StepSection>
    </div>
  );
}
