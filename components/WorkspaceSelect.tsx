"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DEFAULT_WORKSPACE, readWorkspaces, saveWorkspace } from "@/lib/workspaceStorage";

const NEW_WORKSPACE_VALUE = "__new_workspace__";

export function WorkspaceSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
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

  function handleChange(nextValue: string | null) {
    if (!nextValue) return;

    if (nextValue === NEW_WORKSPACE_VALUE) {
      const name = window.prompt("Enter Workspace name");
      if (!name) return;

      const saved = saveWorkspace(name);
      setWorkspaces(saved.workspaces);
      onChange(saved.selected);
      return;
    }

    onChange(nextValue);
  }

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="h-9 w-full border-slate-200 bg-slate-50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((workspace) => (
          <SelectItem key={workspace} value={workspace}>
            {workspace}
          </SelectItem>
        ))}
        <SelectItem value={NEW_WORKSPACE_VALUE}>+ New Workspace</SelectItem>
      </SelectContent>
    </Select>
  );
}
