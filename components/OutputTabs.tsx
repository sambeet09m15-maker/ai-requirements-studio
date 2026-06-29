"use client";

import { FileText } from "lucide-react";
import { CoverageReport } from "@/components/CoverageReport";
import { SectionCard } from "@/components/SectionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CoverageIssue, DocumentType, RequirementsResult } from "@/lib/llm";

const sectionLabels: Record<keyof RequirementsResult, string> = {
  executiveSummary: "Executive Summary",
  userStories: "User Stories",
  acceptanceCriteria: "Acceptance Criteria",
  functionalRequirements: "Functional Requirements",
  nonFunctionalRequirements: "Non-Functional Requirements",
  risks: "Risks",
  assumptions: "Assumptions",
  edgeCases: "Edge Cases",
  testScenarios: "Test Scenarios",
  stakeholderQuestions: "Stakeholder Questions",
};

export function OutputTabs({
  result,
  coverage,
  error,
  onRegenerate,
}: {
  result: RequirementsResult | null;
  coverage: CoverageIssue[];
  error: string;
  onRegenerate: (section: keyof RequirementsResult, documentType: DocumentType) => void;
}) {
  if (error) {
    return <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border p-4 text-sm">{error}</div>;
  }

  if (!result) {
    return (
      <Card className="rounded-lg">
        <CardContent className="text-muted-foreground flex min-h-96 flex-col items-center justify-center gap-3 text-center">
          <FileText className="size-10" />
          <p className="max-w-md text-sm">Generated sections will appear here as tabs after you submit a requirement.</p>
        </CardContent>
      </Card>
    );
  }

  const entries = Object.entries(result).filter(([, value]) => value !== undefined) as [keyof RequirementsResult, unknown][];
  const isFull = entries.length >= 10;
  const documentType: DocumentType = isFull ? "Full Requirements Package" : entries.length > 2 ? "Standard Requirements Doc" : "Quick User Story";

  return (
    <Tabs defaultValue={entries[0]?.[0]} className="w-full">
      <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
        {entries.map(([key]) => (
          <TabsTrigger key={key} value={key} className="bg-background border-border border">
            {sectionLabels[key]}
          </TabsTrigger>
        ))}
        {isFull ? (
          <TabsTrigger value="coverage" className="bg-background border-border border">
            Coverage Report
          </TabsTrigger>
        ) : null}
      </TabsList>
      {entries.map(([key, value]) => (
        <TabsContent key={key} value={key}>
          <SectionCard title={sectionLabels[key]} section={key} content={value} documentType={documentType} onRegenerate={onRegenerate} />
        </TabsContent>
      ))}
      {isFull ? (
        <TabsContent value="coverage">
          <CoverageReport issues={coverage} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
