"use client";

import { Bot, SquareSlash, Sparkles, Wrench, type LucideIcon } from "lucide-react";
import { useUi } from "@/components/use-locale";

const icons: Record<"agent" | "command" | "skill" | "tool", LucideIcon> = {
  agent: Bot,
  command: SquareSlash,
  skill: Sparkles,
  tool: Wrench,
};

/** One entry in the templates library: what it is, when to use it, then its code blocks as children. */
export function LibraryItem({
  type,
  title,
  name,
  when,
  children,
}: {
  type: keyof typeof icons;
  title: string;
  name: string;
  when: string;
  children: React.ReactNode;
}) {
  const t = useUi().library;
  const Icon = icons[type];
  const label = t.types[type];
  return (
    <section data-type={type} className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-medium text-accent">
          <Icon className="size-3.5" aria-hidden />
          {label}
        </span>
        <code dir="ltr" className="min-w-0 font-mono text-sm text-muted [overflow-wrap:anywhere]">
          {name}
        </code>
      </div>
      <h3 className="mt-3 text-xl font-bold">{title}</h3>
      <p className="mt-2 leading-7 text-muted">
        <span className="font-medium text-ink">{t.when}</span>
        {when}
      </p>
      <div className="[&>*:first-child]:mt-4">{children}</div>
    </section>
  );
}
