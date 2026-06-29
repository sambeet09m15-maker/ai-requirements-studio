"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProjectType } from "@/lib/llm";

export const projectTypes: ProjectType[] = ["New Feature", "System Migration", "Process Automation", "Compliance & Regulatory", "Integration Project"];

export function ProjectTypeSelect({ value, onChange }: { value: ProjectType; onChange: (value: ProjectType) => void }) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as ProjectType)}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {projectTypes.map((type) => (
          <SelectItem key={type} value={type}>{type}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
