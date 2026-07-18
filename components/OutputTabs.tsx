"use client";

import { FileText } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { TraceabilityMatrix } from "@/components/TraceabilityMatrix";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DocumentType, RequirementsResult } from "@/lib/llm";

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
  error,
  limitReached,
  documentType,
  activeTab,
  compactMode,
  onTabChange,
  onRegenerate,
}: {
  result: RequirementsResult | null;
  error: string;
  limitReached?: boolean;
  documentType?: DocumentType;
  activeTab?: string;
  compactMode: boolean;
  onTabChange: (value: string) => void;
  onRegenerate: (section: keyof RequirementsResult, documentType: DocumentType) => void;
}) {
  if (limitReached) {
    return (
      <div className="rounded-lg border border-teal-200 bg-teal-50 p-5 text-center text-sm text-teal-900 shadow-sm">
        <p className="font-semibold">You&apos;ve used today&apos;s 10 free runs — come back tomorrow!</p>
        <p className="mt-1 text-teal-700">Your daily practice quota resets at midnight UTC.</p>
      </div>
    );
  }

  if (error) {
    return <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-lg border p-4 text-sm shadow-lg">{error}</div>;
  }

  if (!result) {
    return (
      <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
        <CardContent className="flex min-h-96 flex-col items-center justify-center gap-4 text-center text-slate-500">
          <div className="flex size-16 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
            <FileText className="size-8" />
          </div>
          <p className="max-w-md text-sm leading-6">Generated sections will appear here as polished tabs after you submit a requirement.</p>
        </CardContent>
      </Card>
    );
  }

  const entries = Object.entries(result).filter(([, value]) => value !== undefined) as [keyof RequirementsResult, unknown][];
  const selectedDocumentType: DocumentType = documentType ?? "Full Requirements Package";
  const isFull = selectedDocumentType === "Full Requirements Package";
  const currentTab = activeTab && (activeTab === "traceability" || entries.some(([key]) => key === activeTab)) ? activeTab : entries[0]?.[0];

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <div className="mb-4 overflow-x-auto rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
        <TabsList className="flex h-10 w-max min-w-full justify-start gap-2 bg-transparent p-0">
        {entries.map(([key]) => (
          <TabsTrigger key={key} value={key} className="h-8 flex-none border border-slate-200 bg-slate-50 px-3 text-slate-700 shadow-none data-active:border-indigo-600 data-active:bg-indigo-600 data-active:text-white">
            {sectionLabels[key]}
          </TabsTrigger>
        ))}
        {isFull ? (
          <TabsTrigger value="traceability" className="h-8 flex-none border border-slate-200 bg-emerald-50 px-3 text-emerald-800 shadow-none data-active:border-emerald-600 data-active:bg-emerald-600 data-active:text-white">
            Traceability Matrix
          </TabsTrigger>
        ) : null}
        </TabsList>
      </div>
      {entries.map(([key, value]) => (
        <TabsContent key={key} value={key}>
          <SectionCard title={sectionLabels[key]} section={key} content={value} documentType={selectedDocumentType} compactMode={compactMode} onRegenerate={onRegenerate} />
        </TabsContent>
      ))}
      {isFull ? (
        <TabsContent value="traceability">
          <TraceabilityMatrix result={result} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
