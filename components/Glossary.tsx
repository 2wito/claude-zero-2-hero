"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/lib/glossary";
import { chapters } from "@/lib/syllabus";

const tabs = [
  { id: "all", label: "הכול" },
  { id: "basic", label: "מושגי יסוד" },
  { id: "advanced", label: "מתקדם" },
  { id: "cli", label: "פקודות CLI" },
];

/** Searchable glossary with category filter tabs. */
export function Glossary() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const searchId = useId();

  const q = query.trim().toLowerCase();
  const results = glossary.filter(
    (t) =>
      (tab === "all" || t.category === tab) &&
      (!q || [t.term, t.en ?? "", t.definition].some((s) => s.toLowerCase().includes(q))),
  );

  return (
    <div className="mt-6">
      <label htmlFor={searchId} className="sr-only">
        חיפוש במילון
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-muted" aria-hidden />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חיפוש מושג, למשל טוקן או compact"
          className="w-full rounded-xl border border-line bg-surface py-3 ps-10 pe-4 text-base"
        />
      </div>

      <div role="toolbar" aria-label="סינון לפי קטגוריה" className="mt-3 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              tab === t.id ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {results.length} מושגים
      </p>

      <dl className="mt-2 grid gap-3">
        {results.map((t) => {
          const chapter = chapters.find((c) => c.number === t.chapter);
          return (
            <div key={t.term} className="rounded-xl border border-line bg-surface p-4">
              <dt className="flex flex-wrap items-baseline gap-x-3">
                <span dir="auto" className="text-lg font-bold">
                  {t.term}
                </span>
                {t.en && (
                  <span dir="auto" className="text-sm text-muted">
                    {t.en}
                  </span>
                )}
              </dt>
              <dd className="mt-1.5 leading-7">
                {t.definition}
                {chapter && (
                  <Link href={`/docs/${chapter.slug}`} className="ms-2 text-sm font-medium text-accent hover:underline">
                    פרק {chapter.number}
                  </Link>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      {results.length === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-line p-4">
          לא נמצא מושג כזה. נסו מילה אחרת, או בחרו &quot;הכול&quot;.
        </p>
      )}
    </div>
  );
}
