import Link from "next/link";
import { chapters } from "@/lib/syllabus";

/** One card per chapter with its key takeaway, linking back to the chapter. */
export function RecapCards({ takeaways }: { takeaways: Record<number, string> }) {
  return (
    <ol className="mt-6 grid gap-3 sm:grid-cols-2">
      {chapters
        .filter((chapter) => takeaways[chapter.number])
        .map((chapter) => (
          <li key={chapter.slug}>
            <Link
              href={`/docs/${chapter.slug}`}
              className="group flex h-full gap-4 rounded-xl border border-line bg-surface p-4 hover:border-accent"
            >
              <span className="font-display text-3xl leading-none text-accent tabular-nums">{chapter.number}</span>
              <span className="min-w-0">
                <span className="block font-bold leading-snug group-hover:text-accent">{chapter.title}</span>
                <span className="mt-1.5 block text-base leading-7 text-muted">{takeaways[chapter.number]}</span>
              </span>
            </Link>
          </li>
        ))}
    </ol>
  );
}
