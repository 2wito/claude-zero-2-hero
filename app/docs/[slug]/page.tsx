import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { chapterContent } from "@/lib/content";
import { chapters } from "@/lib/syllabus";
import { CompleteButton } from "@/components/ProgressTracker";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((c) => c.slug === slug);
  return chapter ? { title: `פרק ${chapter.number}: ${chapter.title}`, description: chapter.summary } : {};
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const chapter = chapters[index];
  const prev = chapters[index - 1];
  const next = chapters[index + 1];

  const load = chapterContent[slug];
  const Content = load ? (await load()).default : null;

  return (
    <>
      <p className="font-display text-lg text-accent">פרק {chapter.number}</p>
      {Content ? (
        <div className="mt-2">
          <Content />
        </div>
      ) : (
        <>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{chapter.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{chapter.summary}</p>
          <div className="mt-10 rounded-xl border border-dashed border-line p-6">
            <p className="leading-7">הפרק הזה עדיין בכתיבה. בינתיים אפשר להתחיל מההתחלה.</p>
          </div>
        </>
      )}

      {Content && chapter.number <= 14 && <CompleteButton slug={chapter.slug} />}

      <nav aria-label="ניווט בין פרקים" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="group rounded-xl border border-line p-4 hover:border-accent">
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <ArrowRight className="size-4" aria-hidden />
              הפרק הקודם
            </span>
            <span className="mt-1 block font-bold group-hover:text-accent">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/docs/${next.slug}`}
            className="group rounded-xl border border-line p-4 text-end hover:border-accent"
          >
            <span className="flex items-center justify-end gap-1.5 text-sm text-muted">
              הפרק הבא
              <ArrowLeft className="size-4" aria-hidden />
            </span>
            <span className="mt-1 block font-bold group-hover:text-accent">{next.title}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
