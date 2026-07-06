"use client";

import { Check, Copy, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DocumentType, RequirementsResult } from "@/lib/llm";

function stringifyContent(content: unknown) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((item) => (typeof item === "string" ? `- ${item}` : `- Given ${item.given}\n  When ${item.when}\n  Then ${item.then}`)).join("\n\n");
  }
  return "";
}

export function SectionCard({
  title,
  section,
  content,
  documentType,
  compactMode,
  onRegenerate,
}: {
  title: string;
  section: keyof RequirementsResult;
  content: unknown;
  documentType: DocumentType;
  compactMode: boolean;
  onRegenerate: (section: keyof RequirementsResult, documentType: DocumentType) => void;
}) {
  const [copied, setCopied] = useState(false);
  const text = stringifyContent(content);

  async function copyText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1200);
  }

  function downloadText() {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${section}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-base text-slate-950">{title}</CardTitle>
          <p className="mt-1 text-xs text-slate-500">{documentType}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyText} aria-label={`Copy ${title}`}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={() => onRegenerate(section, documentType)} aria-label={`Regenerate ${title}`}>
            <RefreshCcw className="size-4" />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={downloadText} aria-label={`Download ${title}`}>
            <Download className="size-4" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className={`whitespace-pre-wrap rounded-md border border-slate-100 bg-slate-50 font-sans text-sm text-slate-700 ${compactMode ? "p-3 leading-5" : "p-4 leading-6"}`}>{text}</pre>
      </CardContent>
    </Card>
  );
}
