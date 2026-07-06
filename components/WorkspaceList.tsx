"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DEFAULT_WORKSPACE, readWorkspaces, removeWorkspace } from "@/lib/workspaceStorage";

export function WorkspaceList({ selected, onSelect, onRemove }: { selected: string; onSelect: (workspace: string) => void; onRemove: (workspace: string) => void }) {
  const [workspaces, setWorkspaces] = useState<string[]>([DEFAULT_WORKSPACE]);

  useEffect(() => {
    function refresh() {
      setWorkspaces(readWorkspaces());
    }

    refresh();
    window.addEventListener("ba-workspaces-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("ba-workspaces-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function handleRemove(workspace: string) {
    if (workspace === DEFAULT_WORKSPACE) return;
    if (!window.confirm(`Remove Workspace "${workspace}" from the list?`)) return;

    const updated = removeWorkspace(workspace);
    setWorkspaces(updated);
    onRemove(workspace);
  }

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-white/10 p-4 text-sm text-cyan-50/85">
      <h2 className="mb-3 font-medium text-white">Workspaces</h2>
      <div className="space-y-2">
        {workspaces.map((workspace) => (
          <div key={workspace} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(workspace)}
              className={`min-w-0 flex-1 truncate rounded-md px-2 py-1.5 text-left text-xs transition ${
                selected === workspace ? "bg-cyan-300/20 text-white ring-1 ring-cyan-200/30" : "text-cyan-50/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {workspace}
            </button>
            {workspace !== DEFAULT_WORKSPACE ? (
              <Button type="button" variant="ghost" size="icon-xs" onClick={() => handleRemove(workspace)} aria-label={`Remove ${workspace} Workspace`} className="text-cyan-50/75 hover:bg-white/10 hover:text-white">
                <Trash2 className="size-3" />
              </Button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
