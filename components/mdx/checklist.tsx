"use client";

import { Check } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useUi } from "@/components/use-locale";

const STORAGE_PREFIX = "checklist:";

/** Tickable checklist. Progress is remembered per `id` in this browser, so readers can come back to it. */
export function Checklist({ id, title, items }: { id: string; title?: string; items: string[] }) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));
  const baseId = useId();
  const t = useUi().checklist;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_PREFIX + id) ?? "null");
      if (Array.isArray(saved) && saved.length === items.length) setDone(saved);
    } catch {}
  }, [id, items.length]);

  function toggle(index: number) {
    setDone((prev) => {
      const next = prev.map((v, i) => (i === index ? !v : v));
      try {
        localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const count = done.filter(Boolean).length;
  const complete = count === items.length;

  return (
    <section
      aria-label={title ?? t.title}
      className={`mt-6 rounded-xl border p-4 sm:p-5 ${complete ? "border-accent/50 bg-accent/[0.07]" : "border-line bg-surface"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-bold">{title ?? t.title}</p>
        <p className={`text-sm tabular-nums ${complete ? "font-medium text-accent" : "text-muted"}`} aria-live="polite">
          {complete ? t.done : `${count} ${t.of} ${items.length}`}
        </p>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((item, i) => {
          const inputId = `${baseId}-${i}`;
          return (
            <li key={i}>
              <label
                htmlFor={inputId}
                className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-surface-2/70"
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={done[i]}
                  onChange={() => toggle(i)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-1 grid size-5 shrink-0 place-items-center rounded-md border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${
                    done[i] ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg"
                  }`}
                >
                  {done[i] && <Check className="size-3.5" strokeWidth={3} />}
                </span>
                <span className={`min-w-0 leading-7 [overflow-wrap:anywhere] ${done[i] ? "text-muted line-through decoration-muted/60" : ""}`}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
