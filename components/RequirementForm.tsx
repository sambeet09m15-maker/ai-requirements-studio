"use client";

import { useState } from "react";
import { SearchCheck, WandSparkles } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { DomainSelect } from "@/components/DomainSelect";
import { DocumentTypeSelect } from "@/components/DocumentTypeSelect";
import { ProjectTypeSelect } from "@/components/ProjectTypeSelect";
import { WorkspaceSelect } from "@/components/WorkspaceSelect";
import { DEFAULT_WORKSPACE } from "@/lib/workspaceStorage";
import type { DocumentType, Domain, GeneratePayload, ProjectType } from "@/lib/llm";
import type { RequirementQuality } from "@/lib/llm";

export function RequirementForm({
  onGenerate,
  loading,
  showGuidance,
  restoredPayload,
}: {
  onGenerate: (payload: GeneratePayload) => void;
  loading: boolean;
  showGuidance: boolean;
  restoredPayload: GeneratePayload | null;
}) {
  const [requirement, setRequirement] = useState(restoredPayload?.requirement || "");
  const [workspace, setWorkspace] = useState(restoredPayload?.workspace || DEFAULT_WORKSPACE);
  const [domain, setDomain] = useState<Domain>(restoredPayload?.domain || "Generic");
  const [projectType, setProjectType] = useState<ProjectType>(restoredPayload?.projectType || "New Feature");
  const [documentType, setDocumentType] = useState<DocumentType>(restoredPayload?.documentType || "Full Requirements Package");
  const [quality, setQuality] = useState<RequirementQuality | null>(null);
  const [qualityLoading, setQualityLoading] = useState(false);
  const [qualityError, setQualityError] = useState("");
  const { isSignedIn } = useUser();

  async function checkQuality() {
    if (!requirement.trim()) return;
    setQualityLoading(true);
    setQualityError("");
    try {
      const response = await fetch("/api/quality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirement }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Quality check failed.");
      setQuality(data.quality);
    } catch (error) {
      setQualityError(error instanceof Error ? error.message : "Quality check failed.");
    } finally {
      setQualityLoading(false);
    }
  }

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">Input Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Raw business requirement</label>
          {quality ? (
            <div className="rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-950">
              <div className="font-medium">{quality.label}</div>
              {quality.suggestions.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-blue-900">
                  {quality.suggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
          {qualityError ? <p className="rounded-md border border-amber-200 bg-amber-50 p-2 text-xs text-amber-900">{qualityError}</p> : null}
          <Textarea
            className="min-h-44 resize-none border-slate-200 bg-slate-50 focus-visible:ring-indigo-300"
            value={requirement}
            onChange={(event) => setRequirement(event.target.value)}
            placeholder="Paste the requirement here..."
          />
          {showGuidance ? (
            <p className="text-xs leading-5 text-slate-500">Include the user goal, business rule, system action, or known constraint. Rough notes are fine.</p>
          ) : null}
        </div>
        <div className="grid gap-4">
          <div id="workspace-field" className="space-y-2 rounded-md border border-slate-100 bg-slate-50/60 p-3">
            <label className="text-sm font-medium">Workspace</label>
            <WorkspaceSelect value={workspace} onChange={setWorkspace} />
            {showGuidance ? (
              <p className="text-xs leading-5 text-slate-500">Use a Workspace to group related analyses. Leave it as Unassigned if grouping is not needed.</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Domain</label>
            <DomainSelect value={domain} onChange={setDomain} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Type</label>
            <ProjectTypeSelect value={projectType} onChange={setProjectType} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Type</label>
            <DocumentTypeSelect value={documentType} onChange={setDocumentType} />
            {showGuidance ? (
              <p className="text-xs leading-5 text-slate-500">
                Quick creates stories and criteria. Standard adds summary and requirements. Full adds risks, assumptions, scenarios, questions, and traceability.
              </p>
            ) : null}
          </div>
        </div>
        {isSignedIn ? (
          <Button
            id="generate-button"
            className="h-10 w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-200 hover:from-indigo-500 hover:to-cyan-500"
            disabled={loading || !requirement.trim()}
            onClick={() => onGenerate({ requirement, workspace, domain, projectType, documentType })}
          >
            <WandSparkles className="size-4" />
            {loading ? "Generating" : "Generate"}
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button
              id="generate-button"
              type="button"
              className="h-10 w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-200 hover:from-indigo-500 hover:to-cyan-500"
            >
              <WandSparkles className="size-4" />
              Sign in to Generate — it&apos;s free
            </Button>
          </SignInButton>
        )}
        <Button type="button" variant="outline" className="h-10 w-full" disabled={qualityLoading || !requirement.trim()} onClick={checkQuality}>
          <SearchCheck className="size-4" />
          {qualityLoading ? "Checking" : "Check Quality"}
        </Button>
      </CardContent>
    </Card>
  );
}
