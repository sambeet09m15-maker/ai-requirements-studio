import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RequirementsResult } from "@/lib/llm";

function text(value: unknown) {
  if (!value) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "given" in value && "when" in value && "then" in value) {
    const item = value as { given: string; when: string; then: string };
    return `Given ${item.given}; When ${item.when}; Then ${item.then}`;
  }
  return String(value);
}

export function TraceabilityMatrix({ result }: { result: RequirementsResult }) {
  const rows = result.userStories?.length ? result.userStories : ["—"];

  return (
    <Card className="rounded-lg border-white/80 bg-white/90 shadow-xl shadow-emerald-100/70 backdrop-blur">
      <CardHeader>
        <CardTitle>Traceability Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
              <tr>
                <th className="p-3 font-semibold">User Story</th>
                <th className="p-3 font-semibold">Related Acceptance Criteria</th>
                <th className="p-3 font-semibold">Related Test Scenario</th>
                <th className="p-3 font-semibold">Related Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((story, index) => (
                <tr key={`${story}-${index}`} className="align-top">
                  <td className="p-3 text-slate-800">{text(story)}</td>
                  <td className="p-3 text-slate-700">{text(result.acceptanceCriteria?.[index])}</td>
                  <td className="p-3 text-slate-700">{text(result.testScenarios?.[index])}</td>
                  <td className="p-3 text-slate-700">{text(result.risks?.[index])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
