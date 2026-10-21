import type { MetadataRoute } from "next";
import { docHref, homeHref } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { chapters } from "@/lib/syllabus";

const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** One entry per page and language, each listing its counterpart (hreflang). */
function entries(paths: { he: string; en: string }, changeFrequency: "weekly" | "monthly", priority: number) {
  const languages = { he: url(paths.he), en: url(paths.en) };
  return (["he", "en"] as const).map((locale) => ({
    url: url(paths[locale]),
    changeFrequency,
    priority: locale === "he" ? priority : priority - 0.1,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries({ he: homeHref("he"), en: homeHref("en") }, "weekly", 1),
    ...chapters.flatMap((chapter) =>
      entries({ he: docHref("he", chapter.slug), en: docHref("en", chapter.slug) }, "monthly", 0.8),
    ),
  ];
}
