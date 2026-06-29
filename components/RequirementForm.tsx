"use client";

import { useState } from "react";
import { WandSparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { DomainSelect } from "@/components/DomainSelect";
import { DocumentTypeSelect } from "@/components/DocumentTypeSelect";
import { ProjectTypeSelect } from "@/components/ProjectTypeSelect";
import type { DocumentType, Domain, GeneratePayload, ProjectType } from "@/lib/llm";

export function RequirementForm({ onGenerate, loading }: { onGenerate: (payload: GeneratePayload) => void; loading: boolean }) {
  const [requirement, setRequirement] = useState("");
  const [domain, setDomain] = useState<Domain>("Generic");
  const [projectType, setProjectType] = useState<ProjectType>("New Feature");
  const [documentType, setDocumentType] = useState<DocumentType>("Full Requirements Package");

  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Input Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Raw business requirement</label>
          <Textarea
            className="min-h-44 resize-none"
            value={requirement}
            onChange={(event) => setRequirement(event.target.value)}
            placeholder="Paste the requirement here..."
          />
        </div>
        <div className="grid gap-4">
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
          </div>
        </div>
        <Button
          className="w-full"
          disabled={loading || !requirement.trim()}
          onClick={() => onGenerate({ requirement, domain, projectType, documentType })}
        >
          <WandSparkles className="size-4" />
          {loading ? "Generating" : "Generate"}
        </Button>
      </CardContent>
    </Card>
  );
}
