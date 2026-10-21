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

/**
 * Runs in <head> before the page paints: sets lang/dir for English pages and restores the
 * saved font size, so neither the layout direction nor the text size jumps after load.
 */
export const bootScript = `try{var p=location.pathname,d=document.documentElement;if(p==='/en'||p.indexOf('/en/')===0){d.lang='en';d.dir='ltr'}var s=localStorage.getItem('${FONT_SCALE_KEY}');if(s)d.style.fontSize=s}catch(e){}`;
