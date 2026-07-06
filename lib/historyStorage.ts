import type { GeneratePayload, RequirementsResult } from "@/lib/llm";
import { DEFAULT_WORKSPACE, normalizeWorkspaceName } from "@/lib/workspaceStorage";

export const HISTORY_STORAGE_KEY = "ba-ai-studio-history";

export type AnalysisHistoryEntry = {
  id: string;
  timestamp: string;
  payload: GeneratePayload;
  result: RequirementsResult;
};

export function readHistory(storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  if (!storage) return [];

  try {
    const parsed = JSON.parse(storage.getItem(HISTORY_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is AnalysisHistoryEntry => Boolean(entry?.id && entry?.timestamp && entry?.payload && entry?.result));
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: Omit<AnalysisHistoryEntry, "id" | "timestamp">, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  const nextEntry: AnalysisHistoryEntry = {
    ...entry,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
    timestamp: new Date().toISOString(),
    payload: {
      ...entry.payload,
      workspace: normalizeWorkspaceName(entry.payload.workspace || DEFAULT_WORKSPACE),
    },
  };
  storage?.setItem(HISTORY_STORAGE_KEY, JSON.stringify([nextEntry, ...readHistory(storage)]));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-history-changed"));
  return nextEntry;
}

export function deleteHistoryEntry(id: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  storage?.setItem(HISTORY_STORAGE_KEY, JSON.stringify(readHistory(storage).filter((entry) => entry.id !== id)));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-history-changed"));
}

export function clearHistory(storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  storage?.removeItem(HISTORY_STORAGE_KEY);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-history-changed"));
}

export function groupHistoryByWorkspace(entries: AnalysisHistoryEntry[]) {
  return entries.reduce<Record<string, AnalysisHistoryEntry[]>>((groups, entry) => {
    const workspace = normalizeWorkspaceName(entry.payload.workspace || DEFAULT_WORKSPACE);
    return { ...groups, [workspace]: [...(groups[workspace] || []), entry] };
  }, {});
}
