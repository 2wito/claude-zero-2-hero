"use client";

import { useId, useState } from "react";
import { ChoiceGroup } from "@/components/ChoiceGroup";

// Rough rules of thumb, stated in the UI. Real counts depend on language, code style and model.
const TOKENS_PER_LINE = 10;
const BASE_CONTEXT = 15_000; // system prompt, tools, CLAUDE.md
const GROWTH_PER_MESSAGE = 2_000; // your message, Claude's reply, tool output
const COMPACT_EVERY = 20;
const SUMMARY_TOKENS = 4_000;

const presets = [
  { id: "small", label: "דף נחיתה", files: 15, lines: 80 },
  { id: "medium", label: "אתר כמו אתר המתכונים", files: 60, lines: 120 },
  { id: "large", label: "אפליקציה גדולה", files: 800, lines: 200 },
];

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${Math.round(n / 1_000)}K` : `${Math.round(n)}`;

function sessionInput(messages: number, readTokens: number, compact: boolean) {
  let total = 0;
  for (let i = 1; i <= messages; i++) {
    const conversation = compact
      ? (i > COMPACT_EVERY ? SUMMARY_TOKENS : 0) + GROWTH_PER_MESSAGE * (((i - 1) % COMPACT_EVERY) + 1)
      : GROWTH_PER_MESSAGE * i;
    total += BASE_CONTEXT + readTokens + conversation;
  }
  return total;
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold">
          {label}
        </label>
        <span className="font-mono text-sm tabular-nums text-accent" dir="ltr">
          {value.toLocaleString("he-IL")}
          {suffix}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--accent)]"
      />
    </div>
  );
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-mono tabular-nums" dir="ltr">
          {fmt(value)}
        </span>
      </div>
      <div className="mt-1 h-3 overflow-hidden rounded-full bg-surface-2" aria-hidden>
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.max(pct, 1)}%` }} />
      </div>
    </div>
  );
}

/** Interactive estimate of how much of a project fits in context and what a session costs in tokens. */
export function TokenCalculator() {
  const [preset, setPreset] = useState("medium");
  const [files, setFiles] = useState(60);
  const [lines, setLines] = useState(120);
  const [readPct, setReadPct] = useState(30);
  const [messages, setMessages] = useState(40);
  const [excludePct, setExcludePct] = useState(20);
  const [price, setPrice] = useState(3);
  const priceId = useId();

  const pickPreset = (id: string) => {
    const p = presets.find((x) => x.id === id)!;
    setPreset(id);
    setFiles(p.files);
    setLines(p.lines);
  };

  const projectTokens = files * lines * TOKENS_PER_LINE;
  const readPlain = projectTokens * (readPct / 100);
  const readOptimized = readPlain * (1 - excludePct / 100);
  const plain = sessionInput(messages, readPlain, false);
  const optimized = sessionInput(messages, readOptimized, true);
  const saving = plain > 0 ? Math.round((1 - optimized / plain) * 100) : 0;
  const peakPlain = BASE_CONTEXT + readPlain + GROWTH_PER_MESSAGE * messages;
  const cost = (tokens: number) => ((tokens / 1_000_000) * price).toFixed(2);

  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <ChoiceGroup
        label="גודל הפרויקט"
        options={presets}
        value={preset}
        onChange={pickPreset}
      />

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Slider label="מספר קבצים" value={files} min={1} max={2000} onChange={(v) => { setFiles(v); setPreset(""); }} />
        <Slider label="שורות בממוצע לקובץ" value={lines} min={10} max={1000} step={10} onChange={(v) => { setLines(v); setPreset(""); }} />
        <Slider label="כמה מהפרויקט Claude קורא בסשן" value={readPct} min={5} max={100} step={5} suffix="%" onChange={setReadPct} />
        <Slider label="הודעות בסשן" value={messages} min={5} max={200} step={5} onChange={setMessages} />
        <Slider label="קבצים שמוחרגים מקריאה" value={excludePct} min={0} max={60} step={5} suffix="%" onChange={setExcludePct} />
        <div>
          <label htmlFor={priceId} className="text-sm font-bold">
            מחיר ל-1M טוקנים של קלט ($, לדוגמה)
          </label>
          <input
            id={priceId}
            type="number"
            min={0}
            step={0.5}
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
            dir="ltr"
            className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-1.5 font-mono"
          />
        </div>
      </div>

      <div aria-live="polite" className="mt-6 grid gap-4 rounded-xl bg-bg p-4">
        <p className="leading-7">
          כל הפרויקט שווה בערך <strong dir="ltr">{fmt(projectTokens)}</strong> טוקנים.{" "}
          {projectTokens <= 200_000
            ? "הוא נכנס כולו לחלון הקשר רגיל, אבל זה לא אומר שכדאי לקרוא את כולו."
            : projectTokens <= 1_000_000
              ? "הוא גדול מחלון הקשר רגיל, ונכנס רק לחלון של מיליון טוקנים. כאן חשוב לקרוא רק מה שצריך."
              : "הוא גדול אפילו מחלון של מיליון טוקנים. Claude יכול לעבוד רק על חלקים ממנו בכל פעם."}
        </p>
        <Bar label="הפרויקט כולו" value={projectTokens} max={1_000_000} tone="bg-sun" />
        <Bar label="שיא ההקשר בסשן, בלי אופטימיזציה" value={peakPlain} max={1_000_000} tone="bg-red-500/70" />
        <p className="text-sm text-muted">הסרגלים יחסיים לחלון של מיליון טוקנים.</p>
        {peakPlain > 200_000 && (
          <p className="text-sm">
            ⚠ ההקשר עובר 200K טוקנים. בחלון רגיל, Claude Code יסכם את השיחה אוטומטית לפני שיגיע לשם.
          </p>
        )}

        <div className="grid gap-3 border-t border-line pt-4 sm:grid-cols-3">
          <Stat label="קלט מצטבר, בלי אופטימיזציה" value={fmt(plain)} sub={`≈ $${cost(plain)}`} />
          <Stat label={`עם /compact כל ${COMPACT_EVERY} הודעות + החרגת קבצים`} value={fmt(optimized)} sub={`≈ $${cost(optimized)}`} />
          <Stat label="חיסכון" value={`${saving}%`} sub="בטוקנים של קלט" highlight />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">
        הערכה גסה בלבד: כ-{TOKENS_PER_LINE} טוקנים לשורת קוד, {fmt(BASE_CONTEXT)} טוקנים של הקשר בסיסי, ו-
        {fmt(GROWTH_PER_MESSAGE)} טוקנים שנוספים בכל הודעה. המחשבון לא מחשב Prompt Caching, שמוזיל משמעותית את החלק
        שחוזר על עצמו. במנוי, העלות היא חלק ממגבלת השימוש ולא חיוב נפרד. מחירים עדכניים: claude.com/pricing.
      </p>
    </div>
  );
}

function Stat({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 font-display text-3xl tabular-nums ${highlight ? "text-accent" : ""}`} dir="ltr">
        {value}
      </p>
      <p className="text-sm text-muted" dir="ltr">
        {sub}
      </p>
    </div>
  );
}
