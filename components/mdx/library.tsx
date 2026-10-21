"use client";

import { useState } from "react";

const filters = [
  { id: "all", label: "הכול" },
  { id: "agent", label: "סוכנים" },
  { id: "command", label: "פקודות" },
  { id: "skill", label: "Skills" },
  { id: "tool", label: "כלי עזר" },
];

/**
 * Filterable list of LibraryItem cards. Filtering is done with a data attribute and CSS
 * (see globals.css), so the server-rendered items don't need to be inspected here.
 */
export function Library({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("all");

  return (
    <div className="mt-8">
      <div role="toolbar" aria-label="סינון לפי סוג" className="flex flex-wrap gap-2">
        {filters.map((f) => (
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
