import type { Metadata } from "next";
import { ChapterPage } from "@/components/chapter-page";
import { JsonLd } from "@/components/json-ld";
import { chapterJsonLd, chapterMetadata } from "@/lib/seo";
import { chapters } from "@/lib/syllabus";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return chapterMetadata((await params).slug, "he");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <JsonLd data={chapterJsonLd(slug, "he")} />
      <ChapterPage slug={slug} locale="he" />
    </>
  );
}
