import type { GeneratePayload, RequirementsResult } from "@/lib/llm";
import { DEFAULT_WORKSPACE, normalizeWorkspaceName } from "@/lib/workspaceStorage";

export const HISTORY_STORAGE_KEY = "ba-ai-studio-history";

// History lives in localStorage, which is scoped per browser origin, not
// per signed-in user — without a per-user key, every account in the same
// browser reads and writes the exact same saved-analysis list. userId
// (Clerk's user.id, or "anonymous" when signed out) namespaces the key so
// accounts never see each other's history.
function historyKey(userId: string) {
  return `${HISTORY_STORAGE_KEY}:${userId}`;
}

export type AnalysisHistoryEntry = {
  id: string;
  timestamp: string;
  payload: GeneratePayload;
  result: RequirementsResult;
};

export function readHistory(userId: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  if (!storage) return [];

  try {
    const parsed = JSON.parse(storage.getItem(historyKey(userId)) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((entry): entry is AnalysisHistoryEntry => Boolean(entry?.id && entry?.timestamp && entry?.payload && entry?.result));
  } catch {
    return [];
  }
}

export function saveHistoryEntry(userId: string, entry: Omit<AnalysisHistoryEntry, "id" | "timestamp">, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  const nextEntry: AnalysisHistoryEntry = {
    ...entry,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
    timestamp: new Date().toISOString(),
    payload: {
      ...entry.payload,
      workspace: normalizeWorkspaceName(entry.payload.workspace || DEFAULT_WORKSPACE),
    },
  };
  storage?.setItem(historyKey(userId), JSON.stringify([nextEntry, ...readHistory(userId, storage)]));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-history-changed"));
  return nextEntry;
}

export function deleteHistoryEntry(userId: string, id: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  storage?.setItem(historyKey(userId), JSON.stringify(readHistory(userId, storage).filter((entry) => entry.id !== id)));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-history-changed"));
}

export function clearHistory(userId: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  storage?.removeItem(historyKey(userId));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-history-changed"));
}

export function groupHistoryByWorkspace(entries: AnalysisHistoryEntry[]) {
  return entries.reduce<Record<string, AnalysisHistoryEntry[]>>((groups, entry) => {
    const workspace = normalizeWorkspaceName(entry.payload.workspace || DEFAULT_WORKSPACE);
    return { ...groups, [workspace]: [...(groups[workspace] || []), entry] };
  }, {});
}
