"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { useProgress } from "@/components/ProgressTracker";
import { useLocale } from "@/components/use-locale";
import { docHref } from "@/lib/i18n";
import { chapters, chapterText } from "@/lib/syllabus";
import { ui } from "@/lib/ui";

export function DocsSidebar() {
  const pathname = usePathname();
  const progress = useProgress();
  const locale = useLocale();
  const t = ui[locale];

  const list = (
    <ol className="space-y-0.5">
      {chapters.map((chapter) => {
        const href = docHref(locale, chapter.slug);
        const active = pathname === href;
        const done = progress?.completed.includes(chapter.slug) ?? false;
        return (
          <li key={chapter.slug}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex gap-3 rounded-lg px-3 py-2 text-sm ${
                active ? "bg-surface-2 font-medium text-ink" : "text-muted hover:bg-surface-2/60 hover:text-ink"
              }`}
            >
              <span className={`w-5 tabular-nums ${active ? "text-accent" : ""}`}>{chapter.number}</span>
              <span className="flex-1">{chapterText(chapter, locale).title}</span>
              {done && (
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                  <span className="sr-only">{t.progress.completed}</span>
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label={t.sidebar.aria}>
      <details className="rounded-xl border border-line bg-surface p-2 lg:hidden">
        <summary className="cursor-pointer px-3 py-2 font-medium">{t.sidebar.all}</summary>
        <div className="mt-2">{list}</div>
      </details>
      <div className="sticky top-24 hidden lg:block">{list}</div>
    </nav>
  );
}
