import type { Metadata } from "next";
import { ChapterPage, chapterMetadata } from "@/components/chapter-page";
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
  return <ChapterPage slug={(await params).slug} locale="he" />;
}
