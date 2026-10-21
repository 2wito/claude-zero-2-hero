"use client";

import { useEffect } from "react";
import { dir } from "@/lib/i18n";
import { useLocale } from "@/components/use-locale";

/** Keeps <html lang/dir> in sync when navigating between the Hebrew and English sites. */
export function HtmlLocaleSync() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir(locale);
  }, [locale]);
  return null;
}
