import type { Metadata } from "next";
import { docHref, homeHref, type Locale } from "@/lib/i18n";
import { chapters, chapterText } from "@/lib/syllabus";
import { ogAlt, ogSize } from "@/lib/og";
import { ui } from "@/lib/ui";

export const SITE_URL = "https://www.claude-code-hebrew.com";

const AUTHOR = { "@type": "Person", name: "Itay Twito", url: "https://www.linkedin.com/in/itay-twito/" };

export const site = {
  he: {
    name: "קלוד קוד בעברית",
    homeTitle: "מדריך Claude Code בעברית: ללמוד קלוד קוד מ-Zero ל-Hero",
    description:
      "מדריך חינמי בעברית פשוטה ל-Claude Code (קלוד קוד): התקנה, פקודות בסיס, עבודה עם Cursor ו-Git, העלאת אתר לאוויר וטיפים מתקדמים. מתאים גם למי שמעולם לא פתח טרמינל.",
    ogLocale: "he_IL",
    altOgLocale: "en_US",
  },
  en: {
    name: "Claude Code: From Zero to Hero",
    homeTitle: "Claude Code: From Zero to Hero, a Free Beginner's Guide",
    description:
      "A free, plain-language guide to Claude Code: installing it, core commands, working with Cursor and Git, deploying a site, and advanced tips. No coding experience needed.",
    ogLocale: "en_US",
    altOgLocale: "he_IL",
  },
} as const;

/** Defaults for a language's root layout. Pages set their own canonical, hreflang and social cards. */
export function rootMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site[locale].homeTitle, template: `%s | ${site[locale].name}` },
    description: site[locale].description,
  };
}

type PageMeta = {
  locale: Locale;
  /** Full title as shown in search results and social cards. */
  title: string;
  description: string;
  paths: { he: string; en: string };
  type: "website" | "article";
};

function pageMetadata({ locale, title, description, paths, type }: PageMeta): Metadata {
  const image = { url: `/og/${locale}`, ...ogSize, alt: ogAlt[locale], type: "image/png" };
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: paths[locale],
      languages: { he: paths.he, en: paths.en, "x-default": paths.he },
    },
    openGraph: {
      type,
      url: paths[locale],
      title,
      description,
      siteName: site[locale].name,
      locale: site[locale].ogLocale,
      alternateLocale: site[locale].altOgLocale,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function homeMetadata(locale: Locale): Metadata {
  return pageMetadata({
    locale,
    title: site[locale].homeTitle,
    description: site[locale].description,
    paths: { he: homeHref("he"), en: homeHref("en") },
    type: "website",
  });
}

export function chapterMetadata(slug: string, locale: Locale): Metadata {
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) return {};
  const text = chapterText(chapter, locale);
  return pageMetadata({
    locale,
    title: `${ui[locale].chapter.label} ${chapter.number}: ${text.title} | ${site[locale].name}`,
    description: text.summary,
    paths: { he: docHref("he", slug), en: docHref("en", slug) },
    type: "article",
  });
}

const abs = (path: string) => new URL(path, SITE_URL).toString();

export function homeJsonLd(locale: Locale) {
  const url = abs(homeHref(locale));
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site[locale].name,
      url,
      inLanguage: locale,
      description: site[locale].description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: site[locale].homeTitle,
      description: site[locale].description,
      url,
      inLanguage: locale,
      isAccessibleForFree: true,
      provider: AUTHOR,
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", inLanguage: locale },
      offers: { "@type": "Offer", price: 0, priceCurrency: "ILS", category: "Free" },
    },
  ];
}

export function chapterJsonLd(slug: string, locale: Locale) {
  const chapter = chapters.find((c) => c.slug === slug);
  if (!chapter) return [];
  const text = chapterText(chapter, locale);
  const url = abs(docHref(locale, slug));
  const headline = `${ui[locale].chapter.label} ${chapter.number}: ${text.title}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description: text.summary,
      url,
      mainEntityOfPage: url,
      inLanguage: locale,
      author: AUTHOR,
      isPartOf: { "@type": "WebSite", name: site[locale].name, url: abs(homeHref(locale)) },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site[locale].name, item: abs(homeHref(locale)) },
        { "@type": "ListItem", position: 2, name: headline, item: url },
      ],
    },
  ];
}
