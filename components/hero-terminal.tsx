"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/use-locale";

type Line = { kind: "cmd" | "ask" | "step" | "done"; text: string };

const scripts: Record<"he" | "en", Line[]> = {
  he: [
    { kind: "cmd", text: "claude" },
    { kind: "ask", text: "תבנה לי אתר פשוט למתכונים של סבתא, עם עמוד לכל מתכון" },
    { kind: "step", text: "קורא את recipes.md ומבין את המבנה" },
    { kind: "step", text: "יוצר app/page.tsx עם רשימת המתכונים" },
    { kind: "step", text: "יוצר app/recipes/[slug]/page.tsx" },
    { kind: "step", text: "מוסיף 12 מתכונים ותמונות" },
    { kind: "done", text: "מוכן. הריצו npm run dev ופתחו localhost:3000" },
  ],
  en: [
    { kind: "cmd", text: "claude" },
    { kind: "ask", text: "Build me a simple site for grandma's recipes, with a page for each recipe" },
    { kind: "step", text: "Reading recipes.md to understand the structure" },
    { kind: "step", text: "Creating app/page.tsx with the recipe list" },
    { kind: "step", text: "Creating app/recipes/[slug]/page.tsx" },
    { kind: "step", text: "Adding 12 recipes and photos" },
    { kind: "done", text: "Done. Run npm run dev and open localhost:3000" },
  ],
};

const ariaLabels = {
  he: { demo: "הדגמה: מבקשים מ-Claude Code בעברית לבנות אתר מתכונים, והוא יוצר את הקבצים", replay: "הפעלה מחדש של ההדגמה" },
  en: { demo: "Demo: asking Claude Code in plain English to build a recipe site, and it creates the files", replay: "Replay the demo" },
};

const TYPE_MS = 38;
const STEP_MS = 650;

export function HeroTerminal() {
  const locale = useLocale();
  const script = scripts[locale];
  const aria = ariaLabels[locale];
  // Number of fully shown lines, plus how many chars of the line being typed.
  const [shown, setShown] = useState(0);
  const [chars, setChars] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(script.length);
      return;
    }
    setShown(0);
    setChars(0);
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= script.length) return;
      const current = script[line];
      const typed = current.kind === "cmd" || current.kind === "ask";
      if (typed && char < current.text.length) {
        char += 1;
        setChars(char);
        timer = setTimeout(tick, TYPE_MS);
        return;
      }
      line += 1;
      char = 0;
      setShown(line);
      setChars(0);
      timer = setTimeout(tick, typed ? 500 : STEP_MS);
    };

    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [run, script]);

  const finished = shown >= script.length;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-term text-term-ink shadow-[0_30px_60px_-30px_rgba(6,32,28,0.6)] ring-1 ring-black/10 dark:ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3" dir="ltr">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ms-3 font-mono text-xs text-term-dim">~/grandma-recipes</span>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          disabled={!finished}
          aria-label={aria.replay}
          className="ms-auto rounded p-1 text-term-dim hover:text-term-ink disabled:opacity-0"
        >
          <RotateCcw className="size-3.5" />
        </button>
      </div>
      <div
        dir="ltr"
        aria-label={aria.demo}
        className="min-h-[300px] space-y-2 px-5 py-5 text-left font-mono text-[13px] leading-relaxed sm:min-h-[320px] sm:text-sm"
      >
        {script.map((line, i) => {
          if (i > shown) return null;
          const typing = i === shown;
          if (typing && !(line.kind === "cmd" || line.kind === "ask")) return null;
          const text = typing ? line.text.slice(0, chars) : line.text;
          const cursor = typing || (finished && i === script.length - 1);
          return <TerminalLine key={i} line={line} text={text} cursor={cursor} />;
        })}
      </div>
    </div>
  );
}

function TerminalLine({ line, text, cursor }: { line: Line; text: string; cursor: boolean }) {
  const caret = cursor ? <span className="cursor-blink ms-0.5 inline-block h-[1.1em] w-2 translate-y-[3px] bg-sun" /> : null;

  if (line.kind === "cmd") {
    return (
      <p>
        <span className="text-accent">$</span> {text}
        {caret}
      </p>
    );
  }
  if (line.kind === "ask") {
    return (
      <div className="flex gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="text-sun">&gt;</span>
        <p dir="auto" className="flex-1 text-start font-sans" style={{ unicodeBidi: "plaintext" }}>
          {text}
          {caret}
        </p>
      </div>
    );
  }
  return (
    <p className="flex gap-2">
      <span className={line.kind === "done" ? "text-accent" : "text-term-dim"}>{line.kind === "done" ? "✓" : "●"}</span>
      <span dir="auto" className={`font-sans ${line.kind === "done" ? "text-term-ink" : "text-term-ink/80"}`}>
        {text}
        {caret}
      </span>
    </p>
  );
}
