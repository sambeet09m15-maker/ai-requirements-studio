"use client";

import { useState } from "react";
import { BarChart3, FileText, Sparkles } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { RequirementForm } from "@/components/RequirementForm";
import { OutputTabs } from "@/components/OutputTabs";
import { Loader } from "@/components/Loader";
import type { CoverageIssue, DocumentType, GeneratePayload, RequirementsResult } from "@/lib/llm";

export default function Home() {
  const [result, setResult] = useState<RequirementsResult | null>(null);
  const [coverage, setCoverage] = useState<CoverageIssue[]>([]);
  const [lastPayload, setLastPayload] = useState<GeneratePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      setCoverage(data.coverageReport || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setLoading(false);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Regeneration failed.");
    }
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-border bg-background/95 border-r px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md">
              <Sparkles className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Business Analyst</p>
              <h1 className="text-lg font-semibold">AI Studio</h1>
            </div>
          </div>
          <nav className="mt-10 space-y-1 text-sm">
            <div className="bg-muted text-foreground flex items-center gap-2 rounded-md px-3 py-2 font-medium">
              <FileText className="size-4" />
              Requirements
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-md px-3 py-2">
              <BarChart3 className="size-4" />
              Coverage
            </div>
          </nav>
        </aside>

        <section className="px-5 py-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-2">
              <p className="text-muted-foreground text-sm">Stateless AI documentation workspace</p>
              <h2 className="text-3xl font-semibold tracking-normal">Generate structured requirements from raw business input.</h2>
            </div>
            <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
              <RequirementForm onGenerate={generate} loading={loading} />
              <div className="min-w-0">
                {loading ? (
                  <Loader />
                ) : (
                  <OutputTabs
                    result={result}
                    coverage={coverage}
                    error={error}
                    onRegenerate={regenerateSection}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Toaster />
    </main>
  );
}
