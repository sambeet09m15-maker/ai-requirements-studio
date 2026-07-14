"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, CheckCircle2, CircleHelp, Clock3, FileCheck2, FileText, Info, Layers3, Network, ScanSearch, Settings2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { RequirementForm } from "@/components/RequirementForm";
import { OutputTabs } from "@/components/OutputTabs";
import { Loader } from "@/components/Loader";
import { KnowledgeArtifacts } from "@/components/KnowledgeArtifacts";
import { HistoryPanel } from "@/components/HistoryPanel";
import { OnboardingTour, replayTour } from "@/components/OnboardingTour";
import { WorkspaceList } from "@/components/WorkspaceList";
import { saveHistoryEntry, type AnalysisHistoryEntry } from "@/lib/historyStorage";
import { DEFAULT_WORKSPACE } from "@/lib/workspaceStorage";
import type { DocumentType, GeneratePayload, RequirementsResult } from "@/lib/llm";

export default function Home() {
  const [result, setResult] = useState<RequirementsResult | null>(null);
  const [lastPayload, setLastPayload] = useState<GeneratePayload | null>(null);
  const [activeTab, setActiveTab] = useState<string | undefined>();
  const [compactMode, setCompactMode] = useState(false);
  const [showGuidance, setShowGuidance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(DEFAULT_WORKSPACE);
  const [restoredPayload, setRestoredPayload] = useState<GeneratePayload | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  function selectWorkspaceTab() {
    setActiveTab(undefined);
    outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (!aboutOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (aboutRef.current?.contains(event.target as Node)) return;
      setAboutOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [aboutOpen]);

  async function generate(payload: GeneratePayload) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Generation failed.");
      }
      setLastPayload(payload);
      setResult(data.requirements);
      setSelectedWorkspace(payload.workspace || DEFAULT_WORKSPACE);
      saveHistoryEntry({ payload, result: data.requirements });
      setActiveTab(Object.keys(data.requirements || {})[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  function loadHistory(entry: AnalysisHistoryEntry) {
    setRestoredPayload(entry.payload);
    setLastPayload(entry.payload);
    setResult(entry.result);
    setSelectedWorkspace(entry.payload.workspace || DEFAULT_WORKSPACE);
    setActiveTab(Object.keys(entry.result || {})[0]);
    outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleWorkspaceRemoved(workspace: string) {
    if (selectedWorkspace === workspace) {
      setSelectedWorkspace(DEFAULT_WORKSPACE);
    }
  }

  async function regenerateSection(section: keyof RequirementsResult, documentType: DocumentType) {
    const current = result;
    if (!current || !lastPayload) return;
    setError("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requirement: `${lastPayload.requirement}\n\nRegenerate only this section from the existing requirements package: ${section}. Existing package: ${JSON.stringify(current)}`,
          domain: lastPayload.domain,
          projectType: lastPayload.projectType,
          documentType,
          section,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Regeneration failed.");
      }
      setResult({ ...current, [section]: data.requirements[section] });
      setActiveTab(section);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Regeneration failed.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb]">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="bg-sidebar text-sidebar-foreground border-sidebar-border border-r px-5 py-6 shadow-2xl shadow-indigo-950/15">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center overflow-hidden rounded-md bg-white shadow-lg shadow-cyan-500/20">
              <Image src="/ba-knowledge-hub-logo.png" alt="BA Knowledge Hub logo" width={48} height={48} className="size-12 object-cover" priority />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">BA Copilot</h1>
            </div>
          </div>
          <nav className="mt-9 space-y-1 text-sm">
            <button
              type="button"
              onClick={selectWorkspaceTab}
              className="flex w-full items-center gap-2 rounded-md bg-sidebar-accent px-3 py-2 text-left font-medium text-sidebar-accent-foreground shadow-sm transition"
            >
              <FileText className="size-4" />
              Requirements
            </button>
            <button
              id="history-nav"
              type="button"
              onClick={() => document.getElementById("history-panel")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-medium text-cyan-100/75 transition hover:bg-white/10 hover:text-white"
            >
              <Clock3 className="size-4" />
              History
            </button>
          </nav>
          <div className="mt-8 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-cyan-50/85">
            <div className="mb-2 flex items-center gap-2 font-medium text-white">
              <Layers3 className="size-4 text-cyan-200" />
              Document Modes
            </div>
            <p className="leading-6">Quick stories, standard docs, or a full requirements package with traceability review.</p>
          </div>
          <div id="preferences" className="mt-4 scroll-mt-5 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-cyan-50/85">
            <div className="mb-3 flex items-center gap-2 font-medium text-white">
              <Settings2 className="size-4 text-cyan-200" />
              Preferences
            </div>
            <label className="flex items-center justify-between gap-3 py-2">
              Compact output
              <input type="checkbox" checked={compactMode} onChange={(event) => setCompactMode(event.target.checked)} className="size-4 accent-cyan-300" />
            </label>
            <label className="flex items-center justify-between gap-3 py-2">
              Field guidance
              <input type="checkbox" checked={showGuidance} onChange={(event) => setShowGuidance(event.target.checked)} className="size-4 accent-cyan-300" />
            </label>
            <button type="button" onClick={replayTour} className="mt-2 text-left text-xs font-medium text-cyan-100 underline-offset-4 hover:text-white hover:underline">
              Replay tour
            </button>
          </div>
          <WorkspaceList selected={selectedWorkspace} onSelect={setSelectedWorkspace} onRemove={handleWorkspaceRemoved} />
          <div id="history" className="scroll-mt-5">
            <HistoryPanel onLoad={loadHistory} />
          </div>
        </aside>

        <section className="px-4 py-5 sm:px-7 lg:px-9">
          <div className="mx-auto max-w-7xl">
            <header className="mb-5 rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <a href="#overview" className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
                    <Image src="/ba-knowledge-hub-logo.png" alt="BA Knowledge Hub logo" width={44} height={44} className="size-11 object-cover" priority />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-slate-950">BA Copilot</span>
                  </span>
                </a>
                <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
                  <button type="button" onClick={() => setAboutOpen(true)} className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">About Application</button>
                  <a href="#knowledge-artifacts" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">Knowledge Artifacts</a>
                  <a href="#requirements" className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">Requirements</a>
                  <a href="#requirements" className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-white shadow-sm transition hover:bg-blue-800">
                    Start Analysis
                    <ArrowRight className="size-4" />
                  </a>
                  <a href="/profile" style={{ color: "#0d9488", fontSize: "13px", marginRight: "12px", textDecoration: "none" }}>Profile</a>
                  <UserButton />
                </nav>
              </div>
            </header>
            {aboutOpen ? (
              <div ref={aboutRef} id="about-application" className="mb-5 scroll-mt-5 rounded-lg border border-blue-100 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
                <div className="mb-2 flex items-center gap-2 font-semibold text-slate-950">
                  <Info className="size-4 text-blue-700" />
                  About Application
                </div>
                <p>
                  BA Copilot helps business analysts turn raw business input into structured requirements, supporting documents,
                  traceability mapping, and reusable BA knowledge artifacts in one focused workspace.
                </p>
              </div>
            ) : null}

            <div id="overview" className="mb-5 scroll-mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="grid min-h-[230px] lg:grid-cols-[1.2fr_0.8fr]">
                <div className="flex flex-col justify-between gap-5 bg-[#10213f] p-5 text-white sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50 ring-1 ring-white/15">
                      <FileCheck2 className="size-4" />
                      Enterprise requirements workspace
                    </span>
                    {result ? (
                      <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50 ring-1 ring-white/15">
                        <CheckCircle2 className="size-4 text-emerald-300" />
                        {lastPayload?.documentType}
                      </span>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Business Analysis Documentation</p>
                    <h2 className="max-w-3xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">Generate structured requirements from raw business input.</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-blue-50/85">Create stakeholder-ready requirements, review traceability, and keep core BA concepts close to the work surface.</p>
                    <div className="mt-4 grid gap-2 text-xs text-blue-50/85 sm:grid-cols-3">
                      <Link href="/requirement-autopsy" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/10 transition hover:bg-white/15">
                        <ScanSearch className="size-4" />
                        Requirement Autopsy
                      </Link>
                      <Link href="/concept-map" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/10 transition hover:bg-white/15">
                        <Network className="size-4" />
                        Concept Map
                      </Link>
                      <Link href="/situation-guide" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 ring-1 ring-white/10 transition hover:bg-white/15">
                        <CircleHelp className="size-4" />
                        Situation Guide
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex min-h-[210px] items-center justify-center bg-slate-50 p-5">
                  <Image src="/ba-knowledge-hub-logo.png" alt="BA Knowledge Hub insights and documentation" width={430} height={280} className="h-auto max-h-48 w-full max-w-md object-contain" priority />
                </div>
              </div>
            </div>
            <div id="knowledge-artifacts" className="mb-5 scroll-mt-5">
              <KnowledgeArtifacts />
            </div>
            <div className="grid gap-5 xl:grid-cols-[390px_1fr]">
              <div id="requirements" className="scroll-mt-5 space-y-5">
                <RequirementForm key={restoredPayload ? `${restoredPayload.requirement}-${restoredPayload.documentType}-${restoredPayload.workspace}` : "new-analysis"} onGenerate={generate} loading={loading} showGuidance={showGuidance} restoredPayload={restoredPayload} />
              </div>
              <div id="output-tabs" ref={outputRef} className="min-w-0 scroll-mt-5">
                {loading ? (
                  <Loader />
                ) : (
                  <OutputTabs
                    result={result}
                    error={error}
                    documentType={lastPayload?.documentType}
                    activeTab={activeTab}
                    compactMode={compactMode}
                    onTabChange={setActiveTab}
                    onRegenerate={regenerateSection}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <OnboardingTour />
      <Toaster />
    </main>
  );
}
