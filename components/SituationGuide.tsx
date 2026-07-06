"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, X } from "lucide-react";
import { situationGuide } from "@/lib/knowledge-hub-enrichment";

type SituationCategory = (typeof situationGuide)[number];
type Situation = SituationCategory["situations"][number] & {
  category: string;
  categoryIcon: string;
};

function flattenSituations(): Situation[] {
  return situationGuide.flatMap((category) =>
    category.situations.map((situation) => ({
      ...situation,
      category: category.category,
      categoryIcon: category.categoryIcon,
    })),
  );
}

function SituationCard({ situation }: { situation: Situation }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 inline-flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-100">
        <span>{situation.categoryIcon}</span>
        {situation.category}
      </div>
      <h3 className="text-lg font-semibold leading-7 text-slate-950">{situation.question}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{situation.quickAnswer}</p>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mt-4 flex w-full items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
      >
        Step-by-step
        <ChevronDown className={`size-4 shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-700">
          {situation.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}

      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Related concepts</div>
        <div className="flex flex-wrap gap-2">
          {situation.relatedConcepts.map((concept) => (
            <Link
              key={concept}
              href="/#knowledge-artifacts"
              className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100"
            >
              {concept}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}

export function SituationGuide() {
  const [search, setSearch] = useState("");
  const allSituations = useMemo(() => flattenSituations(), []);
  const normalizedSearch = search.trim().toLowerCase();
  const matchingSituations = useMemo(() => {
    if (!normalizedSearch) return allSituations;
    return allSituations.filter((situation) => {
      const searchable = [situation.question, situation.quickAnswer, ...situation.steps].join(" ").toLowerCase();
      return searchable.includes(normalizedSearch);
    });
  }, [allSituations, normalizedSearch]);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Situation library</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {allSituations.length} situations across {situationGuide.length} categories
            </p>
          </div>
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search situations, answers, or steps"
              className="h-11 w-full rounded-md border border-slate-200 bg-white pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {normalizedSearch ? (
        <section className="space-y-4">
          {matchingSituations.length ? (
            matchingSituations.map((situation) => <SituationCard key={situation.id} situation={situation} />)
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-sm leading-6 text-slate-600">No situations found for that search. Try different words, or browse by category below.</p>
              <button type="button" onClick={() => setSearch("")} className="mt-4 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800">
                Clear search
              </button>
            </div>
          )}
        </section>
      ) : (
        <div className="space-y-5">
          {situationGuide.map((category) => (
            <section key={category.category} className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
                <span className="flex size-10 items-center justify-center rounded-md bg-blue-50 text-lg">{category.categoryIcon}</span>
                <h2 className="text-lg font-semibold text-slate-950">{category.category}</h2>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {category.situations.map((situation) => (
                  <SituationCard
                    key={situation.id}
                    situation={{
                      ...situation,
                      category: category.category,
                      categoryIcon: category.categoryIcon,
                    }}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
