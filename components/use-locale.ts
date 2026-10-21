"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, type Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export function useLocale(): Locale {
  return localeFromPath(usePathname() ?? "/");
}

export function useUi() {
  return ui[useLocale()];
}
