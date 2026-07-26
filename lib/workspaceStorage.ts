export const DEFAULT_WORKSPACE = "Unassigned";
export const WORKSPACE_STORAGE_KEY = "ba-ai-studio-workspaces";

// Workspaces live in localStorage, which is scoped per browser origin, not
// per signed-in user — without a per-user key, every account in the same
// browser reads and writes the exact same list. userId (Clerk's user.id,
// or "anonymous" when signed out) namespaces the key so accounts never see
// each other's workspaces.
function workspaceKey(userId: string) {
  return `${WORKSPACE_STORAGE_KEY}:${userId}`;
}

export function normalizeWorkspaceName(name: string) {
  const trimmed = name.trim();
  return trimmed || DEFAULT_WORKSPACE;
}

export function readWorkspaces(userId: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  if (!storage) return [DEFAULT_WORKSPACE];

  try {
    const parsed = JSON.parse(storage.getItem(workspaceKey(userId)) || "[]");
    const names = Array.isArray(parsed) ? parsed.map((item) => normalizeWorkspaceName(String(item))) : [];
    return Array.from(new Set([DEFAULT_WORKSPACE, ...names]));
  } catch {
    return [DEFAULT_WORKSPACE];
  }
}

export function saveWorkspace(userId: string, name: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  const normalized = normalizeWorkspaceName(name);
  const workspaces = Array.from(new Set([...readWorkspaces(userId, storage), normalized]));
  storage?.setItem(workspaceKey(userId), JSON.stringify(workspaces.filter((workspace) => workspace !== DEFAULT_WORKSPACE)));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-workspaces-changed"));
  return { selected: normalized, workspaces };
}

export function removeWorkspace(userId: string, name: string, storage: Storage | undefined = typeof window !== "undefined" ? window.localStorage : undefined) {
  const normalized = normalizeWorkspaceName(name);
  const workspaces = readWorkspaces(userId, storage).filter((workspace) => workspace !== normalized && workspace !== DEFAULT_WORKSPACE);
  storage?.setItem(workspaceKey(userId), JSON.stringify(workspaces));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ba-workspaces-changed"));
  return [DEFAULT_WORKSPACE, ...workspaces];
}
