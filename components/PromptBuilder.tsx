"use client";

import { useState } from "react";
import { ChoiceGroup, ToggleGroup } from "@/components/ChoiceGroup";
import { CopyButton } from "@/components/copy-button";

const tasks = [
  { id: "feature", label: "בניית פיצ'ר", slug: "build-feature", en: "Build a new feature" },
  { id: "debug", label: "תיקון באג", slug: "debug-error", en: "Find and fix the root cause of a bug" },
  { id: "review", label: "סקירת קוד", slug: "review-changes", en: "Review the current branch against main" },
  { id: "tests", label: "כתיבת בדיקות", slug: "write-tests", en: "Write automated tests for a file" },
  { id: "skill", label: "יצירת Skill", slug: "create-skill", en: "Create a new Claude Code skill" },
];

const stacks = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "html", label: "HTML + Tailwind" },
];

const levels = [
  { id: "min", label: "מינימליסטי" },
  { id: "std", label: "רגיל" },
  { id: "deep", label: "ארכיטקטוני מעמיק" },
];

const extraOptions = [
  { id: "tests", label: "בדיקות אוטומטיות" },
  { id: "commit", label: "שמירה ב-Git" },
  { id: "rule", label: "כלל ל-CLAUDE.md" },
];

const formats = [
  { id: "terminal", label: "בקשה לטרמינל" },
  { id: "skill", label: "קובץ SKILL.md" },
];

const taskLine: Record<string, string> = {
  feature: "תבנה פיצ'ר חדש: [תארו מה הפיצ'ר עושה ולמי].",
  debug: "יש באג: [מה עשיתי, מה ציפיתי שיקרה, ומה קרה בפועל]. השגיאה המלאה: [הדבקה].",
  review: "תסקור את השינויים בענף הנוכחי לעומת main.",
  tests: "תכתוב בדיקות אוטומטיות ל-[קובץ או פונקציה], כולל מקרי קצה.",
  skill: "תיצור Skill חדש בתיקייה .claude/skills בשם [שם], שעושה: [תיאור התהליך].",
};

const taskRule: Record<string, string> = {
  feature: "תעבוד לפי המבנה והסגנון הקיימים בפרויקט.",
  debug: "תתקן את שורש הבעיה. בלי try/catch שבולע שגיאות, בלי ts-ignore ובלי לכבות בדיקות.",
  review: "אל תתקן כלום. תדווח לפי חומרה, עם קובץ ושורה לכל ממצא.",
  tests: "אם בדיקה נכשלת, אל תחליש אותה. תגיד לי אם הבעיה בקוד או בבדיקה.",
  skill: "תכתוב תיאור (description) שיגרום ל-Claude להפעיל אותו בזמן הנכון, ותסביר לי כל שדה בכותרת.",
};

const levelLine: Record<string, string> = {
  min: "תעשה את השינוי הקטן ביותר שפותר את המשימה, בלי שינויים נוספים.",
  std: "קודם תסביר בקצרה מה אתה מתכנן, ואז תבצע.",
  deep: "קודם תחקור את הקוד הרלוונטי (אפשר עם סוכני משנה), תציג תוכנית בשלבים עם סיכונים וחלופות, ותחכה לאישור שלי לפני שאתה כותב קוד.",
};

const extraLine: Record<string, string> = {
  tests: "תוסיף או תעדכן בדיקות אוטומטיות, ותריץ אותן.",
  commit: "בסוף תשמור ב-git עם הודעה ברורה באנגלית. אל תדחוף.",
  rule: "אם למדת משהו שכדאי לזכור לפעם הבאה, תציע כלל קצר להוסיף ל-CLAUDE.md.",
};

const verifyCommand: Record<string, string> = {
  next: "npm run build",
  react: "npm run build",
  node: "npm test",
  python: "pytest",
  html: "לפתוח את הדף בדפדפן ולבדוק שאין שגיאות בקונסול",
};

function buildPrompt(task: string, stack: string, level: string, extras: string[]) {
  const stackLabel = stacks.find((s) => s.id === stack)!.label;
  const lines = [
    taskLine[task],
    `הפרויקט כתוב ב-${stackLabel}.`,
    taskRule[task],
    levelLine[level],
    ...extras.filter((e) => !(task === "review" && e !== "rule")).map((e) => extraLine[e]),
    task === "review" ? "" : `בסוף תוודא שהכול עובד (${verifyCommand[stack]}), ותדווח לי בעברית מה עשית.`,
  ];
  return lines.filter(Boolean).join("\n");
}

function buildSkill(task: string, stack: string, level: string, extras: string[]) {
  const t = tasks.find((x) => x.id === task)!;
  const stackLabel = stacks.find((s) => s.id === stack)!.label;
  const allowed = [
    stack === "python" ? "Bash(pytest *)" : stack === "html" ? "" : `Bash(${verifyCommand[stack]})`,
    extras.includes("commit") && task !== "review" ? "Bash(git add *) Bash(git commit *)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const frontmatter = [
    "---",
    `name: ${t.slug}`,
    `description: ${t.en} in this ${stackLabel} project. Use when the user asks to ${t.en.toLowerCase()}.`,
    "argument-hint: [details]",
    task === "review" ? "disallowed-tools: Edit Write" : "",
    allowed ? `allowed-tools: ${allowed}` : "",
    "---",
  ].filter(Boolean);

  const body = buildPrompt(task, stack, level, extras)
    .replace(/\[[^\]]+\]/, "$ARGUMENTS")
    .split("\n")
    .map((line, i) => `${i + 1}. ${line}`);

  return [...frontmatter, "", ...body].join("\n");
}

/** Interactive builder that turns a few choices into a ready prompt or SKILL.md file. */
export function PromptBuilder() {
  const [task, setTask] = useState("feature");
  const [stack, setStack] = useState("next");
  const [level, setLevel] = useState("std");
  const [extras, setExtras] = useState<string[]>(["tests"]);
  const [format, setFormat] = useState("terminal");

  const toggle = (id: string) => setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const output = format === "terminal" ? buildPrompt(task, stack, level, extras) : buildSkill(task, stack, level, extras);
  const isSkill = format === "skill";

  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-5">
        <ChoiceGroup label="1. סוג המשימה" options={tasks} value={task} onChange={setTask} />
        <ChoiceGroup label="2. טכנולוגיה" options={stacks} value={stack} onChange={setStack} />
        <ChoiceGroup label="3. רמת פירוט" options={levels} value={level} onChange={setLevel} />
        <ToggleGroup label="4. תוספות" options={extraOptions} values={extras} onToggle={toggle} />
        <ChoiceGroup label="5. פורמט" options={formats} value={format} onChange={setFormat} />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-term text-term-ink">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 ps-4 pe-2">
          <span className="text-xs text-term-dim">
            {isSkill ? `.claude/skills/${tasks.find((t) => t.id === task)!.slug}/SKILL.md` : "בקשה מוכנה להדבקה ב-Claude Code"}
          </span>
          <CopyButton text={output} className="text-term-ink hover:bg-white/10" />
        </div>
        <pre
          dir={isSkill ? "ltr" : "rtl"}
          aria-live="polite"
          className="code-body overflow-x-auto px-4 py-3 font-mono text-[13px] leading-7 whitespace-pre-wrap"
        >
          {output.split("\n").map((line, i) => (
            <span key={i} data-line className="block">
              {line || " "}
            </span>
          ))}
        </pre>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">
        החליפו את מה שבסוגריים המרובעים בפרטים שלכם.
        {isSkill && " ב-Skill, המקום הזה הוחלף ב-$ARGUMENTS, כך שמה שתכתבו אחרי שם הפקודה ייכנס לשם."}
      </p>
    </div>
  );
}
