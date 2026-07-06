"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { conceptMapCategories, conceptMapEdges, conceptMapNodes, sdlcPhases } from "@/lib/knowledge-hub-enrichment";

type ConceptNode = (typeof conceptMapNodes)[number];

const phaseColors: Record<string, string> = {
  hierarchy: "#0D9488",
  planning: "#B45309",
  discovery: "#1D4ED8",
  design: "#4338CA",
  development: "#0F766E",
  testing: "#065F46",
  deployment: "#C2410C",
  production: "#374151",
};

const hierarchyEdges = new Set(["sdlc-agile", "sdlc-waterfall", "sdlc-hybrid", "agile-scrum", "agile-kanban"]);

function nodeColor(node: ConceptNode) {
  const overrides: Record<string, string> = {
    agile: "#1D4ED8",
    waterfall: "#6D28D9",
    hybrid: "#9A3412",
    scrum: "#15803D",
    kanban: "#9D174D",
    sdlc: "#0D9488",
    scrum_master: "#5B21B6",
    developer: "#5B21B6",
    tester: "#5B21B6",
    uat_approval: "#0D9488",
    training_plan: "#0F766E",
  };

  return overrides[node.id] || conceptMapCategories[node.category]?.color || "#334155";
}

function nodeWidth(label: string) {
  return Math.min(200, Math.max(60, label.length * 8.5 + 24));
}

export function ConceptMap() {
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(conceptMapNodes[0] ?? null);
  const [zoom, setZoom] = useState(1);
  const nodesById = useMemo(() => new Map(conceptMapNodes.map((node) => [node.id, node])), []);
  const panelDescription = selectedNode?.description;

  function updateZoom(nextZoom: number) {
    setZoom(Math.min(2, Math.max(0.5, Number(nextZoom.toFixed(2)))));
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-950">Business Analysis Concept Network</h2>
            <p className="mt-1 text-sm text-slate-500">Click a concept to inspect how it fits into the BA discipline.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon-sm" onClick={() => updateZoom(zoom - 0.1)} aria-label="Zoom out">
              <Minus className="size-4" />
            </Button>
            <span className="min-w-12 text-center text-sm font-medium text-slate-600">{Math.round(zoom * 100)}%</span>
            <Button type="button" variant="outline" size="icon-sm" onClick={() => updateZoom(zoom + 0.1)} aria-label="Zoom in">
              <Plus className="size-4" />
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setZoom(1)}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </div>
        <div className="h-[680px] overflow-auto rounded-lg border border-slate-100 bg-slate-50">
          <svg viewBox="0 0 1000 1100" className="min-h-[970px] min-w-[850px] origin-top-left" style={{ transform: `scale(${zoom})` }} role="img" aria-label="BA concept map">
            <defs>
              <marker id="concept-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#475569" />
              </marker>
            </defs>
            {sdlcPhases.map((phase) => {
              const y = phase.yStart * 10;

              return (
                <g key={phase.id}>
                  <rect x="0" y={y} width="1000" height="16" rx="4" fill={phaseColors[phase.id] || "#475569"} />
                  <text x="10" y={y + 11} fontSize="11" fill="white" fontWeight="600">
                    {phase.label}
                  </text>
                  <line x1="0" y1={phase.yEnd * 10} x2="1000" y2={phase.yEnd * 10} stroke="#E2E8F0" strokeWidth="0.5" />
                </g>
              );
            })}
            {conceptMapEdges.filter((edge) => hierarchyEdges.has(`${edge.from}-${edge.to}`)).map((edge) => {
              const from = nodesById.get(edge.from);
              const to = nodesById.get(edge.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x * 10}
                  y1={from.y * 10}
                  x2={to.x * 10}
                  y2={to.y * 10}
                  stroke="#475569"
                  strokeWidth="1.2"
                  markerEnd="url(#concept-arrow)"
                />
              );
            })}
            {conceptMapNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const width = nodeWidth(node.label);
              return (
                <foreignObject key={node.id} x={node.x * 10 - width / 2} y={node.y * 10 - 14} width={width} height="28">
                  <button
                    type="button"
                    onClick={() => setSelectedNode(node)}
                    className={`flex h-full w-full items-center justify-center rounded-md border px-2 text-center text-[11px] font-medium leading-tight text-white shadow-sm ring-offset-2 transition hover:brightness-110 ${
                      isSelected ? "ring-2 ring-slate-950" : "ring-1 ring-white/50"
                    }`}
                    style={{ backgroundColor: nodeColor(node), borderColor: "rgb(15 23 42 / 0.25)", fontFamily: "system-ui" }}
                  >
                    {node.label}
                  </button>
                </foreignObject>
              );
            })}
          </svg>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(conceptMapCategories).map(([key, category]) => (
            <span key={key} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: category.color }} />
              {category.label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">Click any node to learn more · Phases flow top to bottom</p>
      </section>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {selectedNode ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Selected Concept</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{selectedNode.label}</h2>
            <div className="mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold text-white" style={{ backgroundColor: nodeColor(selectedNode) }}>
              {conceptMapCategories[selectedNode.category]?.label || selectedNode.category}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{panelDescription}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Select a concept to view details.</p>
        )}
      </aside>
    </div>
  );
}
