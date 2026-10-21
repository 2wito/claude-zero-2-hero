"use client";

import { useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { promptHub } from "@/lib/prompt-hub";

/** Card library of everyday prompts, filtered by category. */
export function PromptHub() {
  const [category, setCategory] = useState("all");
  const visible = promptHub.filter((c) => category === "all" || c.id === category);
  const total = visible.reduce((n, c) => n + c.prompts.length, 0);

  return (
    <div className="mt-6">
      <div role="toolbar" aria-label="סינון לפי קטגוריה" className="flex flex-wrap gap-2">
        {[{ id: "all", label: "הכול" }, ...promptHub].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              category === c.id ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {total} בקשות
      </p>

      {visible.map((c) => (
        <section key={c.id} aria-label={c.label} className="mt-6">
          <h3 className="text-lg font-bold">{c.label}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {c.prompts.map((p) => (
              <article key={p.title} className="flex flex-col rounded-xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold leading-7">{p.title}</h4>
                  <CopyButton text={p.prompt} className="-mt-1 text-muted hover:bg-surface-2 hover:text-ink" />
                </div>
                <p className="mt-2 flex-1 rounded-lg bg-term px-3 py-2 text-sm leading-7 text-term-ink">{p.prompt}</p>
                {p.tip && <p className="mt-2 text-sm text-muted">💡 {p.tip}</p>}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
