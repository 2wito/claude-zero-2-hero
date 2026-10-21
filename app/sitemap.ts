import type { MetadataRoute } from "next";
import { chapters } from "@/lib/syllabus";

const SITE_URL = "https://www.claude-code-hebrew.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...chapters.map((chapter) => ({
      url: `${SITE_URL}/docs/${chapter.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/en`, changeFrequency: "weekly", priority: 0.9 },
    ...chapters.map((chapter) => ({
      url: `${SITE_URL}/en/docs/${chapter.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
