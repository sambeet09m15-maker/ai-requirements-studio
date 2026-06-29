"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DocumentType } from "@/lib/llm";

export const documentTypes: DocumentType[] = ["Quick User Story", "Standard Requirements Doc", "Full Requirements Package"];

export function DocumentTypeSelect({ value, onChange }: { value: DocumentType; onChange: (value: DocumentType) => void }) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as DocumentType)}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {documentTypes.map((type) => (
          <SelectItem key={type} value={type}>{type}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
