"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Domain } from "@/lib/llm";

export const domains: Domain[] = ["Generic", "Healthcare", "Finance & Banking", "Retail & E-commerce", "Logistics & Supply Chain", "Technology & SaaS"];

export function DomainSelect({ value, onChange }: { value: Domain; onChange: (value: Domain) => void }) {
  return (
    <Select value={value} onValueChange={(next) => onChange(next as Domain)}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {domains.map((domain) => (
          <SelectItem key={domain} value={domain}>{domain}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
