import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CompleteButton } from "@/components/ProgressTracker";
import { chapterContent } from "@/lib/content";
import { docHref, type Locale } from "@/lib/i18n";
import { chapters, chapterText } from "@/lib/syllabus";
import { ui } from "@/lib/ui";

/** A chapter in either language: its MDX content (or a placeholder), the done button, and prev/next links. */
export async function ChapterPage({ slug, locale }: { slug: string; locale: Locale }) {
  const index = chapters.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const t = ui[locale].chapter;
  const chapter = chapters[index];
  const text = chapterText(chapter, locale);
  const prev = chapters[index - 1];
  const next = chapters[index + 1];
  // Back/forward arrows follow reading direction.
  const Back = locale === "en" ? ArrowLeft : ArrowRight;
  const Forward = locale === "en" ? ArrowRight : ArrowLeft;

  const load = chapterContent[locale][slug];
  const Content = load ? (await load()).default : null;

  return (
    <>
      <p className="font-display text-lg text-accent">
        {t.label} {chapter.number}
      </p>
      {Content ? (
        <div className="mt-2">
          <Content />
        </div>
      ) : (
        <>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{text.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{text.summary}</p>
          <div className="mt-10 rounded-xl border border-dashed border-line p-6">
            <p className="leading-7">{t.placeholder}</p>
          </div>
        </>
      )}

      {Content && chapter.number <= 14 && <CompleteButton slug={chapter.slug} />}

      <nav aria-label={t.navAria} className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={docHref(locale, prev.slug)} className="group rounded-xl border border-line p-4 hover:border-accent">
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <Back className="size-4" aria-hidden />
              {t.prev}
            </span>
            <span className="mt-1 block font-bold group-hover:text-accent">{chapterText(prev, locale).title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={docHref(locale, next.slug)}
            className="group rounded-xl border border-line p-4 text-end hover:border-accent"
          >
            <span className="flex items-center justify-end gap-1.5 text-sm text-muted">
              {t.next}
              <Forward className="size-4" aria-hidden />
            </span>
            <span className="mt-1 block font-bold group-hover:text-accent">{chapterText(next, locale).title}</span>
          </Link>
        )}
      </nav>
    </>
  );
}
