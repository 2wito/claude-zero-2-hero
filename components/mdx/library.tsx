"use client";

import { useState } from "react";

import { useUi } from "@/components/use-locale";

const filterIds = ["all", "agent", "command", "skill", "tool"] as const;

/**
 * Filterable list of LibraryItem cards. Filtering is done with a data attribute and CSS
 * (see globals.css), so the server-rendered items don't need to be inspected here.
 */
export function Library({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("all");
  const t = useUi().library;

  return (
    <div className="mt-8">
      <div role="toolbar" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
        {filterIds.map((id) => ({ id, label: t.filters[id] })).map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              filter === f.id
                ? "border-accent bg-accent text-accent-ink"
                : "border-line text-muted hover:border-accent hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div data-library-filter={filter} className="library mt-2">
        {children}
      </div>
    </div>
  );
}
