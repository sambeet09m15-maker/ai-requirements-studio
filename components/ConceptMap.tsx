"use client";

import { useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { conceptMapCategories, conceptMapEdges, conceptMapNodes, sdlcPhases } from "@/lib/knowledge-hub-enrichment";

type ConceptNode = (typeof conceptMapNodes)[number];

// ---------------------------------------------------------------------------
// Category color theme — single source of truth for node/legend styling.
// Light tints (bg ~50, text ~700-800, border ~300) per the design standard.
// ---------------------------------------------------------------------------
type CategoryTheme = { bg: string; bgHover: string; text: string; border: string; dot: string };

const CATEGORY_THEME: Record<string, CategoryTheme> = {
  methodology: { bg: "bg-blue-50", bgHover: "hover:bg-blue-100", text: "text-blue-800", border: "border-blue-300", dot: "bg-blue-600" },
  roles: { bg: "bg-purple-50", bgHover: "hover:bg-purple-100", text: "text-purple-800", border: "border-purple-300", dot: "bg-purple-600" },
  discovery: { bg: "bg-orange-50", bgHover: "hover:bg-orange-100", text: "text-orange-800", border: "border-orange-300", dot: "bg-orange-600" },
  artifacts: { bg: "bg-teal-50", bgHover: "hover:bg-teal-100", text: "text-teal-800", border: "border-teal-300", dot: "bg-teal-600" },
  techniques: { bg: "bg-amber-50", bgHover: "hover:bg-amber-100", text: "text-amber-800", border: "border-amber-300", dot: "bg-amber-600" },
  ceremonies: { bg: "bg-pink-50", bgHover: "hover:bg-pink-100", text: "text-pink-800", border: "border-pink-300", dot: "bg-pink-600" },
  testing: { bg: "bg-green-50", bgHover: "hover:bg-green-100", text: "text-green-800", border: "border-green-300", dot: "bg-green-600" },
  design: { bg: "bg-indigo-50", bgHover: "hover:bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300", dot: "bg-indigo-600" },
  deployment: { bg: "bg-red-50", bgHover: "hover:bg-red-100", text: "text-red-800", border: "border-red-300", dot: "bg-red-600" },
  production: { bg: "bg-gray-50", bgHover: "hover:bg-gray-100", text: "text-gray-800", border: "border-gray-300", dot: "bg-gray-600" },
};
const DEFAULT_THEME: CategoryTheme = { bg: "bg-slate-50", bgHover: "hover:bg-slate-100", text: "text-slate-800", border: "border-slate-300", dot: "bg-slate-500" };

function themeFor(category: string): CategoryTheme {
  return CATEGORY_THEME[category] ?? DEFAULT_THEME;
}

// Section header dot color. Independent of node category theme — most phases
// map cleanly to a dominant category color; mixed-category phases use a
// neutral slate dot rather than implying a category that doesn't fit.
const PHASE_DOT: Record<string, string> = {
  planning: "bg-slate-400",
  discovery: "bg-orange-600",
  design: "bg-indigo-600",
  development: "bg-slate-400",
  testing: "bg-green-600",
  deployment: "bg-red-600",
  production: "bg-gray-600",
};

const TREE_NODE_IDS = new Set(["sdlc", "agile", "waterfall", "hybrid", "scrum", "kanban"]);
const hierarchyEdges = new Set(["sdlc-agile", "sdlc-waterfall", "sdlc-hybrid", "agile-scrum", "agile-kanban"]);

// ---------------------------------------------------------------------------
// Shared node renderer
// ---------------------------------------------------------------------------
function ConceptNodeButton({
  node,
  isSelected,
  onSelect,
}: {
  node: ConceptNode;
  isSelected: boolean;
  onSelect: (node: ConceptNode) => void;
}) {
  const theme = themeFor(node.category);
  return (
    <button
      type="button"
      onClick={() => onSelect(node)}
      className={`flex h-[34px] w-full items-center justify-center rounded-md border px-2 text-center text-[11px] font-medium leading-tight transition ${theme.bg} ${theme.bgHover} ${theme.text} ${theme.border} ${
        isSelected ? "ring-2 ring-slate-950 ring-offset-1" : ""
      }`}
    >
      <span className="line-clamp-2">{node.label}</span>
    </button>
  );
}

function SectionHeader({ label, dotClass }: { label: string; dotClass: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span className={`size-2 shrink-0 rounded-full ${dotClass}`} />
      <span className="whitespace-nowrap text-xs font-medium tracking-wide text-slate-500">{label}</span>
      <span className="h-px w-full bg-slate-200" />
    </div>
  );
}

function NodeGrid({
  nodes,
  selectedId,
  onSelect,
}: {
  nodes: ConceptNode[];
  selectedId?: string;
  onSelect: (node: ConceptNode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {nodes.map((node) => (
        <ConceptNodeButton key={node.id} node={node} isSelected={selectedId === node.id} onSelect={onSelect} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Methodology tree — the one part that keeps SVG, since it needs arbitrary
// connecting lines between nodes. Same node standard, thin muted lines.
// ---------------------------------------------------------------------------
// Fixed pixel positions (not derived from the data file's responsive x/y*10
// scale) so foreignObject dimensions map 1:1 to real CSS pixels — an SVG
// that scales via viewBox would make a fixed foreignObject height render at
// a different number of ACTUAL pixels depending on container width, breaking
// the "identical 34px height" rule. Box centers, in pixels:
const TREE_LAYOUT: Record<string, { x: number; y: number }> = {
  sdlc: { x: 155, y: 25 },
  agile: { x: 79, y: 75 },
  waterfall: { x: 155, y: 75 },
  hybrid: { x: 231, y: 75 },
  scrum: { x: 79, y: 125 },
  kanban: { x: 155, y: 125 },
};
// Kept narrow enough to fit inside a mobile-width content column without
// horizontal overflow — this is a fixed-pixel SVG (see note below), so its
// width can't reflow the way the CSS grid sections do.
const TREE_WIDTH = 310;
const TREE_HEIGHT = 150;
const TREE_NODE_WIDTH = 64;
const TREE_NODE_HEIGHT = 34;

function MethodologyTree({
  nodes,
  selectedId,
  onSelect,
}: {
  nodes: ConceptNode[];
  selectedId?: string;
  onSelect: (node: ConceptNode) => void;
}) {
  const edges = conceptMapEdges.filter((edge) => hierarchyEdges.has(`${edge.from}-${edge.to}`));

  return (
    <svg
      width={TREE_WIDTH}
      height={TREE_HEIGHT}
      viewBox={`0 0 ${TREE_WIDTH} ${TREE_HEIGHT}`}
      role="img"
      aria-label="Methodology hierarchy: SDLC, Agile, Waterfall, Hybrid, Scrum, Kanban"
    >
      <defs>
        <marker id="tree-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M 0 0 L 7 3.5 L 0 7 z" fill="#94A3B8" />
        </marker>
      </defs>
      {edges.map((edge) => {
        const from = TREE_LAYOUT[edge.from];
        const to = TREE_LAYOUT[edge.to];
        if (!from || !to) return null;
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#94A3B8"
            strokeWidth="1"
            markerEnd="url(#tree-arrow)"
          />
        );
      })}
      {nodes.map((node) => {
        const position = TREE_LAYOUT[node.id];
        if (!position) return null;
        const theme = themeFor(node.category);
        const isSelected = selectedId === node.id;
        return (
          <foreignObject
            key={node.id}
            x={position.x - TREE_NODE_WIDTH / 2}
            y={position.y - TREE_NODE_HEIGHT / 2}
            width={TREE_NODE_WIDTH}
            height={TREE_NODE_HEIGHT}
          >
            <button
              type="button"
              onClick={() => onSelect(node)}
              className={`flex h-[34px] w-full items-center justify-center rounded-md border px-2 text-center text-[11px] font-medium leading-tight transition ${theme.bg} ${theme.bgHover} ${theme.text} ${theme.border} ${
                isSelected ? "ring-2 ring-slate-950 ring-offset-1" : ""
              }`}
              style={{ fontFamily: "system-ui" }}
            >
              <span className="line-clamp-2">{node.label}</span>
            </button>
          </foreignObject>
        );
      })}
    </svg>
  );
}

export function ConceptMap() {
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(conceptMapNodes[0] ?? null);
  const [zoom, setZoom] = useState(1);
  const panelDescription = selectedNode?.description;

  function updateZoom(nextZoom: number) {
    setZoom(Math.min(2, Math.max(0.5, Number(nextZoom.toFixed(2)))));
  }

  const [hierarchyPhase, ...gridPhases] = sdlcPhases;
  const treeNodes = conceptMapNodes.filter((node) => TREE_NODE_IDS.has(node.id));
  const rolesNodes = conceptMapNodes.filter(
    (node) => !TREE_NODE_IDS.has(node.id) && node.y >= hierarchyPhase.yStart && node.y <= hierarchyPhase.yEnd
  );

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

        <div className="max-h-[80vh] overflow-auto rounded-lg border border-slate-100 bg-slate-50 p-4">
          <div className="origin-top-left" style={{ transform: `scale(${zoom})` }}>
            <div className="flex flex-col gap-[18px]">
              <div>
                <SectionHeader label={conceptMapCategories.methodology.label} dotClass={CATEGORY_THEME.methodology.dot} />
                <MethodologyTree nodes={treeNodes} selectedId={selectedNode?.id} onSelect={setSelectedNode} />
              </div>
              <div>
                <SectionHeader label={conceptMapCategories.roles.label} dotClass={CATEGORY_THEME.roles.dot} />
                <NodeGrid nodes={rolesNodes} selectedId={selectedNode?.id} onSelect={setSelectedNode} />
              </div>
              {gridPhases.map((phase) => {
                const nodes = conceptMapNodes.filter((node) => node.y >= phase.yStart && node.y <= phase.yEnd);
                return (
                  <div key={phase.id}>
                    <SectionHeader label={phase.label} dotClass={PHASE_DOT[phase.id] ?? "bg-slate-400"} />
                    <NodeGrid nodes={nodes} selectedId={selectedNode?.id} onSelect={setSelectedNode} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-3 border-t border-slate-200 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(conceptMapCategories).map(([key, category]) => {
                const theme = themeFor(key);
                return (
                  <span
                    key={key}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-medium ${theme.bg} ${theme.text}`}
                  >
                    <span className={`size-1.5 rounded-full ${theme.dot}`} />
                    {category.label}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-slate-400">Click any node to learn more · Phases flow top to bottom</p>
          </div>
        </div>
      </section>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {selectedNode ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Selected Concept</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{selectedNode.label}</h2>
            <div
              className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${themeFor(selectedNode.category).bg} ${themeFor(selectedNode.category).text}`}
            >
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
