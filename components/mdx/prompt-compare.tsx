"use client";

import { Check, X } from "lucide-react";
import { useUi } from "@/components/use-locale";
import { CopyButton } from "@/components/copy-button";

/** A weak prompt next to a strong rewrite of it, with an optional note on what changed. */
export function PromptCompare({ bad, good, why }: { bad: string; good: string; why?: string }) {
  const t = useUi().compare;
  return (
    <figure className="mt-6">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-4">
          <p className="flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-red-400">
            <X className="size-4" aria-hidden />
            {t.weak}
          </p>
          <p className="mt-2 leading-7 text-muted">{bad}</p>
        </div>
        <div className="rounded-xl border border-accent/40 bg-accent/[0.07] p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-sm font-bold text-accent">
              <Check className="size-4" aria-hidden />
              {t.strong}
            </p>
            <CopyButton text={good} className="-my-1 text-muted hover:bg-surface-2 hover:text-ink" />
          </div>
          <p className="mt-2 leading-7">{good}</p>
        </div>
      </div>
      {why && <figcaption className="mt-2 text-base leading-7 text-muted">{why}</figcaption>}
    </figure>
  );
}
