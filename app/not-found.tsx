"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/use-locale";
import { docHref, homeHref } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export default function NotFound() {
  const locale = useLocale();
  const t = ui[locale].notFound;
  const Forward = locale === "en" ? ArrowRight : ArrowLeft;

  // The 404 is rendered under the root (Hebrew) metadata, so fix the tab title on English paths.
  useEffect(() => {
    if (locale === "en") document.title = "Page not found | Claude Code: From Zero to Hero";
  }, [locale]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-muted" dir="ltr">
        $ cd page-that-does-not-exist
      </p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t.title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted">{t.body}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href={docHref(locale, "01-introduction")}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink hover:opacity-90"
        >
          {t.first}
          <Forward className="size-4" aria-hidden />
        </Link>
        <Link href={homeHref(locale)} className="rounded-full px-5 py-3 font-medium hover:bg-surface-2">
          {t.home}
        </Link>
      </div>
    </main>
  );
}
