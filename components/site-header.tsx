"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, SquareTerminal } from "lucide-react";
import { docHref, homeHref, switchLocalePath } from "@/lib/i18n";
import { FontSizeControl } from "./font-size-control";
import { ThemeToggle } from "./theme-toggle";
import { useLocale, useUi } from "./use-locale";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = useUi();
  const home = homeHref(locale);
  const other = locale === "he" ? "en" : "he";

  return (
    <header className="@container sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      {/* Breakpoints are container queries in rem, so items drop out earlier when the text size is enlarged. */}
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href={home} aria-label={t.brand.name} className="flex items-center gap-2 font-display text-lg">
          <SquareTerminal className="size-6 shrink-0 text-accent" aria-hidden />
          <span className="hidden whitespace-nowrap @min-[25rem]:inline">
            {t.brand.name} <span className="hidden text-muted @min-[40rem]:inline">{t.brand.suffix}</span>
          </span>
        </Link>
        <nav className="ms-auto flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href={`${home}#syllabus`}
            className="hidden rounded-full px-3 py-2 text-muted hover:text-ink @min-[56rem]:block"
          >
            {t.nav.syllabus}
          </Link>
          <Link
            href={`${home}#audience`}
            className="hidden rounded-full px-3 py-2 text-muted hover:text-ink @min-[56rem]:block"
          >
            {t.nav.audience}
          </Link>
          <Link
            href={`${home}#about`}
            className="hidden rounded-full px-3 py-2 text-muted hover:text-ink @min-[56rem]:block"
          >
            {t.nav.about}
          </Link>
          <Link
            href={docHref(locale, "01-introduction")}
            className="hidden rounded-full px-3 py-2 font-medium text-accent hover:bg-surface-2 @min-[40rem]:block"
          >
            {t.nav.guide}
          </Link>
          <Link
            href={switchLocalePath(pathname, other)}
            hrefLang={other}
            lang={other}
            aria-label={t.language.aria}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-line px-3 font-medium hover:bg-surface-2"
          >
            <Languages className="hidden size-4 @min-[40rem]:block" aria-hidden />
            {t.language.label}
          </Link>
          <FontSizeControl />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
