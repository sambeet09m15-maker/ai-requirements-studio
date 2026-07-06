export const DEFAULT_WORKSPACE = "Unassigned";
export const WORKSPACE_STORAGE_KEY = "ba-ai-studio-workspaces";

export function normalizeWorkspaceName(name: string) {
  const trimmed = name.trim();
  return trimmed || DEFAULT_WORKSPACE;
}

export function readWorkspaces(storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  if (!storage) return [DEFAULT_WORKSPACE];

  try {
    const parsed = JSON.parse(storage.getItem(WORKSPACE_STORAGE_KEY) || "[]");
    const names = Array.isArray(parsed) ? parsed.map((item) => normalizeWorkspaceName(String(item))) : [];
    return Array.from(new Set([DEFAULT_WORKSPACE, ...names]));
  } catch {
    return [DEFAULT_WORKSPACE];
  }
}

export function saveWorkspace(name: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  const normalized = normalizeWorkspaceName(name);
  const workspaces = Array.from(new Set([...readWorkspaces(storage), normalized]));
  storage?.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspaces.filter((workspace) => workspace !== DEFAULT_WORKSPACE)));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-workspaces-changed"));
  return { selected: normalized, workspaces };
}

export function removeWorkspace(name: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  const normalized = normalizeWorkspaceName(name);
  const workspaces = readWorkspaces(storage).filter((workspace) => workspace !== normalized && workspace !== DEFAULT_WORKSPACE);
  storage?.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(workspaces));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-workspaces-changed"));
  return [DEFAULT_WORKSPACE, ...workspaces];
}
