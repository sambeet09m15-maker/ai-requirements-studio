"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { groupHistoryByWorkspace, readHistory, type AnalysisHistoryEntry } from "@/lib/historyStorage";

export function HistoryPanel({ onLoad }: { onLoad: (entry: AnalysisHistoryEntry) => void }) {
  const [entries, setEntries] = useState<AnalysisHistoryEntry[]>([]);
  const [selectedEntryId, setSelectedEntryId] = useState("");
  const groups = groupHistoryByWorkspace(entries);

  useEffect(() => {
    function refresh() {
      const nextEntries = readHistory();
      setEntries(nextEntries);
      setSelectedEntryId((current) => (current && nextEntries.some((entry) => entry.id === current) ? current : ""));
    }

    refresh();
    window.addEventListener("ba-history-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ba-history-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function handleLoad(entryId: string | null) {
    if (!entryId) return;
    const entry = entries.find((historyEntry) => historyEntry.id === entryId);
    if (!entry) return;

    setSelectedEntryId(entryId);
    onLoad(entry);
  }

  return (
    <div id="history-panel" className="mt-4 scroll-mt-5 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-cyan-50/85">
      <div className="mb-3 flex items-center gap-2 font-medium text-white">
        <Clock3 className="size-4 text-cyan-200" />
        <h2 className="truncate">Saved Analysis History</h2>
      </div>
      {entries.length ? (
        <Select value={selectedEntryId} onValueChange={handleLoad}>
          <SelectTrigger className="h-9 w-full border-white/15 bg-white text-slate-900 hover:bg-cyan-50">
            <SelectValue placeholder="Select workspace" />
          </SelectTrigger>
          <SelectContent align="start" className="max-h-80">
            {Object.entries(groups).map(([workspace, workspaceEntries]) => (
              <SelectGroup key={workspace}>
                <SelectLabel>{workspace}</SelectLabel>
                {workspaceEntries.map((entry) => (
                  <SelectItem key={entry.id} value={entry.id}>
                    {entry.payload.workspace || workspace}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <p className="text-xs leading-5 text-cyan-50/70">Generated analyses will be saved here automatically.</p>
      )}
    </div>
  );
}
