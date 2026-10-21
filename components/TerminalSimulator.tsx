"use client";

import { useEffect, useId, useRef, useState } from "react";

type Line = { kind: "in" | "out" | "ok" | "dim" | "warn"; text: string };

const WELCOME: Line[] = [
  { kind: "dim", text: "סימולציה של טרמינל. שום דבר לא רץ באמת, ושום קובץ לא משתנה." },
  { kind: "dim", text: "התחילו עם: claude, ואז נסו /help" },
];

const SHELL_HELP: Line[] = [
  { kind: "out", text: "פקודות טרמינל בסימולציה:" },
  { kind: "out", text: "  claude                 הפעלת Claude Code" },
  { kind: "out", text: '  claude "משימה"         הפעלה עם משימה מוכנה' },
  { kind: "out", text: "  claude -c              המשך השיחה האחרונה" },
  { kind: "out", text: "  ls / pwd / cd          פקודות טרמינל בסיסיות" },
  { kind: "out", text: "  clear                  ניקוי המסך" },
];

const CLAUDE_HELP: Line[] = [
  { kind: "out", text: "פקודות בתוך Claude Code (חלקי):" },
  { kind: "out", text: "  /help      הרשימה הזאת" },
  { kind: "out", text: "  /clear     שיחה חדשה. הקבצים לא נמחקים" },
  { kind: "out", text: "  /compact   סיכום השיחה כדי לפנות מקום" },
  { kind: "out", text: "  /context   מה תופס מקום בחלון ההקשר" },
  { kind: "out", text: "  /usage     שימוש ומגבלות" },
  { kind: "out", text: "  /exit      יציאה לטרמינל" },
  { kind: "dim", text: "או פשוט כתבו בקשה בעברית." },
];

function runTask(task: string): Line[] {
  return [
    { kind: "dim", text: `● מתכנן: "${task}"` },
    { kind: "dim", text: "● Read app/page.tsx" },
    { kind: "warn", text: "? Claude רוצה ליצור את components/Card.tsx. לאשר? (בסימולציה: אושר)" },
    { kind: "ok", text: "✓ נוצר components/Card.tsx (+24 שורות)" },
    { kind: "ok", text: "✓ עודכן app/page.tsx (+3 שורות)" },
    { kind: "out", text: "סיימתי. הוספתי רכיב כרטיס והצגתי אותו בדף הבית. כדאי לבדוק בדפדפן." },
  ];
}

const suggestions = ["claude", "/help", 'claude "build a card"', "תוסיף כפתור מצב כהה", "/context", "/compact", "/clear", "/exit"];

/** Simulated terminal for practicing Claude Code commands safely in the browser. */
export function TerminalSimulator() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [inClaude, setInClaude] = useState(false);
  const [contextPct, setContextPct] = useState(8);
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const prompt: Line = { kind: "in", text: `${inClaude ? ">" : "$"} ${cmd}` };
    let out: Line[] = [];
    let next = inClaude;

    if (!inClaude) {
      const task = cmd.match(/^claude\s+"(.+)"$/);
      if (cmd === "clear") {
        setLines([]);
        return;
      } else if (cmd === "help") out = SHELL_HELP;
      else if (task) {
        next = true;
        out = [{ kind: "ok", text: "✻ Claude Code (סימולציה)" }, ...runTask(task[1])];
        setContextPct(14);
      } else if (cmd === "claude" || cmd === "claude -c") {
        next = true;
        out = [
          { kind: "ok", text: "✻ Welcome to Claude Code (סימולציה)" },
          { kind: "dim", text: "cwd: ~/my-project · מצב: manual" },
          { kind: "dim", text: cmd === "claude -c" ? "ממשיך את השיחה האחרונה." : "כתבו בקשה, או /help." },
        ];
      } else if (cmd === "ls") out = [{ kind: "out", text: "app/  components/  package.json  CLAUDE.md" }];
      else if (cmd === "pwd") out = [{ kind: "out", text: "/home/you/my-project" }];
      else if (cmd.startsWith("cd")) out = [{ kind: "dim", text: "(בסימולציה נשארים בתיקייה my-project)" }];
      else if (cmd.startsWith("/"))
        out = [{ kind: "warn", text: "פקודות שמתחילות ב-/ עובדות רק בתוך Claude Code. הקלידו קודם claude" }];
      else out = [{ kind: "warn", text: `הפקודה לא מוכרת בסימולציה: ${cmd}. נסו help` }];
    } else {
      if (cmd === "/help") out = CLAUDE_HELP;
      else if (cmd === "/clear") {
        setContextPct(8);
        setLines([{ kind: "dim", text: "(השיחה נוקתה. הקבצים במקומם.)" }]);
        return;
      } else if (cmd === "/compact") {
        out = [
          { kind: "dim", text: "● מסכם את השיחה..." },
          { kind: "ok", text: `✓ סוכם. חלון ההקשר ירד מ-${contextPct}% ל-${Math.min(contextPct, 10)}%` },
        ];
        setContextPct((p) => Math.min(p, 10));
      } else if (cmd === "/context") {
        const filled = Math.round(contextPct / 5);
        out = [
          { kind: "out", text: `חלון ההקשר: ${"█".repeat(filled)}${"░".repeat(20 - filled)} ${contextPct}%` },
          { kind: "dim", text: "  הוראות מערכת ו-CLAUDE.md, ההודעות שלכם, וקבצים שנקראו" },
        ];
      } else if (cmd === "/usage") out = [{ kind: "out", text: "בסימולציה אין שימוש אמיתי. בחשבון שלכם, /usage מציג מגבלות ועלויות." }];
      else if (cmd === "/exit") {
        next = false;
        out = [{ kind: "dim", text: "יצאתם מ-Claude Code. חזרה לטרמינל הרגיל." }];
      } else if (cmd.startsWith("/")) out = [{ kind: "warn", text: `הפקודה ${cmd} לא קיימת בסימולציה. נסו /help` }];
      else {
        out = runTask(cmd);
        setContextPct((p) => Math.min(95, p + 9));
      }
    }

    setInClaude(next);
    setLines((prev) => [...prev, prompt, ...out]);
    setHistory((h) => [...h, cmd]);
    setHistIndex(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(i);
      setInput(history[i]);
    }
  }

  const color: Record<Line["kind"], string> = {
    in: "text-term-ink",
    out: "text-term-ink/85",
    ok: "text-accent",
    dim: "text-term-dim",
    warn: "text-sun",
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-2xl bg-term text-term-ink ring-1 ring-black/10 dark:ring-white/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5" dir="ltr">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ms-3 font-mono text-xs text-term-dim">{inClaude ? "claude — my-project" : "~/my-project"}</span>
        </div>
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-label="פלט הטרמינל"
          dir="ltr"
          className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
        >
          {lines.map((l, i) => (
            <p key={i} dir="auto" className={`whitespace-pre-wrap ${color[l.kind]}`} style={{ unicodeBidi: "plaintext" }}>
              {l.text}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2" dir="ltr">
          <label htmlFor={inputId} className="font-mono text-sun">
            {inClaude ? ">" : "$"}
            <span className="sr-only">{inClaude ? "בקשה ל-Claude" : "פקודת טרמינל"}</span>
          </label>
          <input
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            dir="auto"
            autoComplete="off"
            spellCheck={false}
            placeholder={inClaude ? "כתבו בקשה או /help" : "הקלידו claude"}
            className="flex-1 bg-transparent font-mono text-sm text-term-ink placeholder:text-term-dim focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="פקודות לדוגמה">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => run(s)}
            dir="auto"
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted hover:border-accent hover:text-ink"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
