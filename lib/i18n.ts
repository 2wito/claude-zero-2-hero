export type Locale = "he" | "en";

// Hebrew lives at the root (/, /docs/...), English under /en (/en, /en/docs/...).
export const isEnglishPath = (path: string) => path === "/en" || path.startsWith("/en/");
export const localeFromPath = (path: string): Locale => (isEnglishPath(path) ? "en" : "he");

export const homeHref = (locale: Locale) => (locale === "en" ? "/en" : "/");
export const docHref = (locale: Locale, slug: string) => (locale === "en" ? `/en/docs/${slug}` : `/docs/${slug}`);

/** The same page in the other language. */
export function switchLocalePath(path: string, to: Locale) {
  const bare = isEnglishPath(path) ? path.slice(3) || "/" : path;
  if (to === "he") return bare;
  return bare === "/" ? "/en" : `/en${bare}`;
}

export const dir = (locale: Locale) => (locale === "en" ? "ltr" : "rtl");

export const FONT_SCALE_KEY = "font-scale";
export const fontScales = ["100%", "118.75%", "137.5%"] as const;

/** Runs in <head> before the page paints and restores the saved font size, so the text doesn't jump after load. */
export const bootScript = `try{var s=localStorage.getItem('${FONT_SCALE_KEY}');if(s)document.documentElement.style.fontSize=s}catch(e){}`;
