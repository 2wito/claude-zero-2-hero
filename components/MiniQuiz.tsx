"use client";

import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { recordAnswer } from "@/lib/progress";
import { useUi } from "@/components/use-locale";

export type QuizQuestion = {
  q: string;
  options: { text: string; why: string }[];
  answer: number;
};

/** Multiple-choice quiz with instant feedback. A wrong answer explains why and lets the reader try again. */
export function MiniQuiz({ questions }: { questions: QuizQuestion[] }) {
  return (
    <div className="mt-6 space-y-5">
      {questions.map((question, i) => (
        <QuizCard key={i} index={i} total={questions.length} question={question} />
      ))}
    </div>
  );
}

function QuizCard({ index, total, question }: { index: number; total: number; question: QuizQuestion }) {
  const [picked, setPicked] = useState<number | null>(null);
  const slug = usePathname().split("/").pop() ?? "";

  function pick(i: number) {
    setPicked(i);
    recordAnswer(slug, index, total, i === question.answer);
  }
  const baseId = useId();
  const t = useUi().quiz;
  const correct = picked === question.answer;

  return (
    <section
      aria-labelledby={`${baseId}-q`}
      className={`rounded-xl border p-4 sm:p-5 ${
        picked === null ? "border-line bg-surface" : correct ? "border-accent/50 bg-accent/[0.07]" : "border-sun/50 bg-sun/[0.07]"
      }`}
    >
      <p id={`${baseId}-q`} className="font-bold leading-7">
        <span className="text-accent tabular-nums">{index + 1}. </span>
        {question.q}
      </p>
      <div role="radiogroup" aria-labelledby={`${baseId}-q`} className="mt-3 grid gap-2">
        {question.options.map((option, i) => {
          const selected = picked === i;
          const showCorrect = correct && i === question.answer;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={correct}
              onClick={() => pick(i)}
              className={`rounded-lg border px-4 py-2.5 text-start leading-7 disabled:cursor-default ${
                showCorrect
                  ? "border-accent bg-accent/15 font-medium"
                  : selected
                    ? "border-sun bg-sun/10"
                    : "border-line bg-bg hover:border-accent"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="min-h-0">
        {picked !== null && (
          <p className="mt-3 leading-7">
            <span className="font-bold">{correct ? t.correct : t.wrong}</span>
            {question.options[picked].why}
          </p>
        )}
      </div>
    </section>
  );
}
