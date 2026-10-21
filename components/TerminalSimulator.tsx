"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/use-locale";

type Line = { kind: "in" | "out" | "ok" | "dim" | "warn"; text: string };

const text = {
  he: {
    welcome: ["סימולציה של טרמינל. שום דבר לא רץ באמת, ושום קובץ לא משתנה.", "התחילו עם: claude, ואז נסו /help"],
    shellHelp: [
      "פקודות טרמינל בסימולציה:",
      "  claude                 הפעלת Claude Code",
      '  claude "משימה"         הפעלה עם משימה מוכנה',
      "  claude -c              המשך השיחה האחרונה",
      "  ls / pwd / cd          פקודות טרמינל בסיסיות",
      "  clear                  ניקוי המסך",
    ],
    claudeHelp: [
      "פקודות בתוך Claude Code (חלקי):",
      "  /help      הרשימה הזאת",
      "  /clear     שיחה חדשה. הקבצים לא נמחקים",
      "  /compact   סיכום השיחה כדי לפנות מקום",
      "  /context   מה תופס מקום בחלון ההקשר",
      "  /usage     שימוש ומגבלות",
      "  /exit      יציאה לטרמינל",
    ],
    claudeHelpHint: "או פשוט כתבו בקשה בעברית.",
    planning: (task: string) => `● מתכנן: "${task}"`,
    approve: "? Claude רוצה ליצור את components/Card.tsx. לאשר? (בסימולציה: אושר)",
    created: "✓ נוצר components/Card.tsx (+24 שורות)",
    updated: "✓ עודכן app/page.tsx (+3 שורות)",
    finished: "סיימתי. הוספתי רכיב כרטיס והצגתי אותו בדף הבית. כדאי לבדוק בדפדפן.",
    banner: "✻ Claude Code (סימולציה)",
    welcomeBanner: "✻ Welcome to Claude Code (סימולציה)",
    cwd: "cwd: ~/my-project · מצב: manual",
    continued: "ממשיך את השיחה האחרונה.",
    startHint: "כתבו בקשה, או /help.",
    cd: "(בסימולציה נשארים בתיקייה my-project)",
    slashOutside: "פקודות שמתחילות ב-/ עובדות רק בתוך Claude Code. הקלידו קודם claude",
    unknownShell: (cmd: string) => `הפקודה לא מוכרת בסימולציה: ${cmd}. נסו help`,
    cleared: "(השיחה נוקתה. הקבצים במקומם.)",
    compacting: "● מסכם את השיחה...",
    compacted: (from: number, to: number) => `✓ סוכם. חלון ההקשר ירד מ-${from}% ל-${to}%`,
    context: "חלון ההקשר:",
    contextHint: "  הוראות מערכת ו-CLAUDE.md, ההודעות שלכם, וקבצים שנקראו",
    usage: "בסימולציה אין שימוש אמיתי. בחשבון שלכם, /usage מציג מגבלות ועלויות.",
    exit: "יצאתם מ-Claude Code. חזרה לטרמינל הרגיל.",
    unknownSlash: (cmd: string) => `הפקודה ${cmd} לא קיימת בסימולציה. נסו /help`,
    logLabel: "פלט הטרמינל",
    inputClaude: "בקשה ל-Claude",
    inputShell: "פקודת טרמינל",
    placeholderClaude: "כתבו בקשה או /help",
    placeholderShell: "הקלידו claude",
    examples: "פקודות לדוגמה",
    sampleTask: "תוסיף כפתור מצב כהה",
  },
  en: {
    welcome: ["A simulated terminal. Nothing really runs, and no files change.", "Start with: claude, then try /help"],
    shellHelp: [
      "Terminal commands in the simulator:",
      "  claude                 Start Claude Code",
      '  claude "task"          Start with a task',
      "  claude -c              Continue the last conversation",
      "  ls / pwd / cd          Basic terminal commands",
      "  clear                  Clear the screen",
    ],
    claudeHelp: [
      "Commands inside Claude Code (partial):",
      "  /help      This list",
      "  /clear     New conversation. Files are not deleted",
      "  /compact   Summarize the conversation to free space",
      "  /context   What's using the context window",
      "  /usage     Usage and limits",
      "  /exit      Back to the terminal",
    ],
    claudeHelpHint: "Or just type a request in plain English.",
    planning: (task: string) => `● Planning: "${task}"`,
    approve: "? Claude wants to create components/Card.tsx. Approve? (simulated: approved)",
    created: "✓ Created components/Card.tsx (+24 lines)",
    updated: "✓ Updated app/page.tsx (+3 lines)",
    finished: "Done. I added a card component and showed it on the home page. Worth checking in the browser.",
    banner: "✻ Claude Code (simulated)",
    welcomeBanner: "✻ Welcome to Claude Code (simulated)",
    cwd: "cwd: ~/my-project · mode: manual",
    continued: "Continuing the last conversation.",
    startHint: "Type a request, or /help.",
    cd: "(In the simulator you stay in my-project)",
    slashOutside: "Commands starting with / only work inside Claude Code. Type claude first",
    unknownShell: (cmd: string) => `Unknown command in the simulator: ${cmd}. Try help`,
    cleared: "(Conversation cleared. Your files are untouched.)",
    compacting: "● Summarizing the conversation...",
    compacted: (from: number, to: number) => `✓ Compacted. Context window went from ${from}% to ${to}%`,
    context: "Context window:",
    contextHint: "  System instructions and CLAUDE.md, your messages, and files read",
    usage: "There's no real usage in the simulator. In your account, /usage shows limits and costs.",
    exit: "You left Claude Code. Back to the regular terminal.",
    unknownSlash: (cmd: string) => `${cmd} doesn't exist in the simulator. Try /help`,
    logLabel: "Terminal output",
    inputClaude: "Request to Claude",
    inputShell: "Terminal command",
    placeholderClaude: "Type a request or /help",
    placeholderShell: "Type claude",
    examples: "Example commands",
    sampleTask: "add a dark mode toggle",
  },
};

type Text = (typeof text)["he"];

const lines = (kind: Line["kind"], items: string[]): Line[] => items.map((t) => ({ kind, text: t }));

function runTask(t: Text, task: string): Line[] {
  return [
    { kind: "dim", text: t.planning(task) },
    { kind: "dim", text: "● Read app/page.tsx" },
    { kind: "warn", text: t.approve },
    { kind: "ok", text: t.created },
    { kind: "ok", text: t.updated },
    { kind: "out", text: t.finished },
  ];
}

/** Simulated terminal for practicing Claude Code commands safely in the browser. */
export function TerminalSimulator() {
  const t = text[useLocale()] as Text;
  const [output, setOutput] = useState<Line[]>(() => lines("dim", t.welcome));
  const [input, setInput] = useState("");
  const [inClaude, setInClaude] = useState(false);
  const [contextPct, setContextPct] = useState(8);
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const suggestions = ["claude", "/help", 'claude "build a card"', t.sampleTask, "/context", "/compact", "/clear", "/exit"];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [output]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    const prompt: Line = { kind: "in", text: `${inClaude ? ">" : "$"} ${cmd}` };
    let out: Line[] = [];
    let next = inClaude;

    if (!inClaude) {
      const task = cmd.match(/^claude\s+"(.+)"$/);
      if (cmd === "clear") {
        setOutput([]);
        return;
      } else if (cmd === "help") out = lines("out", t.shellHelp);
      else if (task) {
        next = true;
        out = [{ kind: "ok", text: t.banner }, ...runTask(t, task[1])];
        setContextPct(14);
      } else if (cmd === "claude" || cmd === "claude -c") {
        next = true;
        out = [
          { kind: "ok", text: t.welcomeBanner },
          { kind: "dim", text: t.cwd },
          { kind: "dim", text: cmd === "claude -c" ? t.continued : t.startHint },
        ];
      } else if (cmd === "ls") out = [{ kind: "out", text: "app/  components/  package.json  CLAUDE.md" }];
      else if (cmd === "pwd") out = [{ kind: "out", text: "/home/you/my-project" }];
      else if (cmd.startsWith("cd")) out = [{ kind: "dim", text: t.cd }];
      else if (cmd.startsWith("/")) out = [{ kind: "warn", text: t.slashOutside }];
      else out = [{ kind: "warn", text: t.unknownShell(cmd) }];
    } else {
      if (cmd === "/help") out = [...lines("out", t.claudeHelp), { kind: "dim", text: t.claudeHelpHint }];
      else if (cmd === "/clear") {
        setContextPct(8);
        setOutput([{ kind: "dim", text: t.cleared }]);
        return;
      } else if (cmd === "/compact") {
        out = [
          { kind: "dim", text: t.compacting },
          { kind: "ok", text: t.compacted(contextPct, Math.min(contextPct, 10)) },
        ];
        setContextPct((p) => Math.min(p, 10));
      } else if (cmd === "/context") {
        const filled = Math.round(contextPct / 5);
        out = [
          { kind: "out", text: `${t.context} ${"█".repeat(filled)}${"░".repeat(20 - filled)} ${contextPct}%` },
          { kind: "dim", text: t.contextHint },
        ];
      } else if (cmd === "/usage") out = [{ kind: "out", text: t.usage }];
      else if (cmd === "/exit") {
        next = false;
        out = [{ kind: "dim", text: t.exit }];
      } else if (cmd.startsWith("/")) out = [{ kind: "warn", text: t.unknownSlash(cmd) }];
      else {
        out = runTask(t, cmd);
        setContextPct((p) => Math.min(95, p + 9));
      }
    }

    setInClaude(next);
    setOutput((prev) => [...prev, prompt, ...out]);
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
          aria-label={t.logLabel}
          dir="ltr"
          className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
        >
          {output.map((l, i) => (
            <p key={i} dir="auto" className={`whitespace-pre-wrap ${color[l.kind]}`} style={{ unicodeBidi: "plaintext" }}>
              {l.text}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2" dir="ltr">
          <label htmlFor={inputId} className="font-mono text-sun">
            {inClaude ? ">" : "$"}
            <span className="sr-only">{inClaude ? t.inputClaude : t.inputShell}</span>
          </label>
          <input
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            dir="auto"
            autoComplete="off"
            spellCheck={false}
            placeholder={inClaude ? t.placeholderClaude : t.placeholderShell}
            className="flex-1 bg-transparent font-mono text-sm text-term-ink placeholder:text-term-dim focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" aria-label={t.examples}>
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
