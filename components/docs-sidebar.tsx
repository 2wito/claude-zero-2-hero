"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chapters } from "@/lib/syllabus";

export function DocsSidebar() {
  const pathname = usePathname();

  const list = (
    <ol className="space-y-0.5">
      {chapters.map((chapter) => {
        const href = `/docs/${chapter.slug}`;
        const active = pathname === href;
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
              {chapter.title}
            </Link>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label="פרקי המדריך">
      <details className="rounded-xl border border-line bg-surface p-2 lg:hidden">
        <summary className="cursor-pointer px-3 py-2 font-medium">כל הפרקים</summary>
        <div className="mt-2">{list}</div>
      </details>
      <div className="sticky top-24 hidden lg:block">{list}</div>
    </nav>
  );
}
