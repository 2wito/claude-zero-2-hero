"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/components/use-locale";
import { docHref } from "@/lib/i18n";
import { glossary } from "@/lib/glossary";
import { glossaryEn } from "@/lib/glossary-en";
import { chapters } from "@/lib/syllabus";
import { ui } from "@/lib/ui";

const tabIds = ["all", "basic", "advanced", "cli"] as const;

/** Searchable glossary with category filter tabs. */
export function Glossary() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const searchId = useId();
  const locale = useLocale();
  const t = ui[locale].glossary;
  const terms = locale === "en" ? glossaryEn : glossary;
  const tabs = tabIds.map((id) => ({ id, label: t.tabs[id] }));

  const q = query.trim().toLowerCase();
  const results = terms.filter(
    (term) =>
      (tab === "all" || term.category === tab) &&
      (!q || [term.term, term.en ?? "", term.definition].some((s) => s.toLowerCase().includes(q))),
  );

  return (
    <div className="mt-6">
      <label htmlFor={searchId} className="sr-only">
        {t.search}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-muted" aria-hidden />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-xl border border-line bg-surface py-3 ps-10 pe-4 text-base"
        />
      </div>

      <div role="toolbar" aria-label={t.filterLabel} className="mt-3 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              tab === item.id ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {t.count(results.length)}
      </p>

      <dl className="mt-2 grid gap-3">
        {results.map((term) => {
          const chapter = chapters.find((c) => c.number === term.chapter);
          return (
            <div key={term.term} className="rounded-xl border border-line bg-surface p-4">
              <dt className="flex flex-wrap items-baseline gap-x-3">
                <span dir="auto" className="text-lg font-bold">
                  {term.term}
                </span>
                {term.en && (
                  <span dir="auto" className="text-sm text-muted">
                    {term.en}
                  </span>
                )}
              </dt>
              <dd className="mt-1.5 leading-7">
                {term.definition}
                {chapter && (
                  <Link href={docHref(locale, chapter.slug)} className="ms-2 text-sm font-medium text-accent hover:underline">
                    {t.chapter} {chapter.number}
                  </Link>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      {results.length === 0 && (
        <p className="mt-4 rounded-xl border border-dashed border-line p-4">
          {t.empty}
        </p>
      )}
    </div>
  );
}
