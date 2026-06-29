import { CheckCircle2, CircleAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CoverageIssue } from "@/lib/llm";

export function CoverageReport({ issues }: { issues: CoverageIssue[] }) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle>Gap & Consistency Checker</CardTitle>
      </CardHeader>
      <CardContent>
        {issues.length ? (
          <ul className="space-y-3">
            {issues.map((issue, index) => (
              <li key={`${issue.item}-${index}`} className="border-border flex gap-3 rounded-md border p-3 text-sm">
                <CircleAlert className="text-destructive mt-0.5 size-4 shrink-0" />
                <span><strong>{issue.item}:</strong> {issue.issue}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <CheckCircle2 className="size-4" />
            Looks consistent. No major coverage gaps were found.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
