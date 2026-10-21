"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { chapters } from "@/lib/syllabus";
import { readProgress, resetProgress, setCompleted, subscribe, type Progress } from "@/lib/progress";

/** Chapters that count toward course progress (resource pages like the glossary don't). */
export const trackedChapters = chapters.filter((c) => c.number <= 14);

export function useProgress(): Progress | null {
  const [progress, setProgress] = useState<Progress | null>(null);
  useEffect(() => {
    const load = () => setProgress(readProgress());
    load();
    return subscribe(load);
  }, []);
  return progress;
}

/** Progress bar shown at the top of every docs page. */
export function ProgressBar() {
  const progress = useProgress();
  const done = progress ? trackedChapters.filter((c) => progress.completed.includes(c.slug)).length : 0;
  const total = trackedChapters.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="mb-8 rounded-xl border border-line bg-surface px-4 py-3">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium">ההתקדמות שלכם בקורס</span>
        <span className="flex items-center gap-3">
          <span className="tabular-nums text-muted">
            {done} מתוך {total} פרקים
          </span>
          {done > 0 && (
            <button
              type="button"
              onClick={() => resetProgress()}
              className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted hover:text-ink"
            >
              <RotateCcw className="size-3" aria-hidden />
              איפוס
            </button>
          )}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="התקדמות בקורס"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2"
      >
        <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** "Mark as done" toggle at the end of a chapter, with the chapter's quiz score. */
export function CompleteButton({ slug }: { slug: string }) {
  const progress = useProgress();
  const done = progress?.completed.includes(slug) ?? false;
  const quiz = progress?.quizzes[slug];
  const score = quiz ? quiz.firstTry.filter((v) => v === true).length : null;

  return (
    <div className="mt-12 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-surface p-4">
      <button
        type="button"
        aria-pressed={done}
        onClick={() => setCompleted(slug, !done)}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium ${
          done ? "bg-accent text-accent-ink" : "border border-accent text-accent hover:bg-accent/10"
        }`}
      >
        <Check className="size-4" aria-hidden />
        {done ? "הפרק הושלם" : "סמנו את הפרק כהושלם"}
      </button>
      <p className="text-sm text-muted" aria-live="polite">
        {quiz && score !== null
          ? `בחידון: ${score} מתוך ${quiz.firstTry.length} נכונות בניסיון הראשון.`
          : "פתרון כל שאלות החידון מסמן את הפרק כהושלם אוטומטית."}
      </p>
    </div>
  );
}
