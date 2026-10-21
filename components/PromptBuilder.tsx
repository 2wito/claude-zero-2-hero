"use client";

import { useState } from "react";
import { ChoiceGroup, ToggleGroup } from "@/components/ChoiceGroup";
import { CopyButton } from "@/components/copy-button";
import { useLocale } from "@/components/use-locale";

const slugs: Record<string, string> = {
  feature: "build-feature",
  debug: "debug-error",
  review: "review-changes",
  tests: "write-tests",
  skill: "create-skill",
};

const descriptions: Record<string, string> = {
  feature: "Build a new feature",
  debug: "Find and fix the root cause of a bug",
  review: "Review the current branch against main",
  tests: "Write automated tests for a file",
  skill: "Create a new Claude Code skill",
};

const stacks = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "html", label: "HTML + Tailwind" },
];

const text = {
  he: {
    labels: ["1. סוג המשימה", "2. טכנולוגיה", "3. רמת פירוט", "4. תוספות", "5. פורמט"],
    tasks: { feature: "בניית פיצ'ר", debug: "תיקון באג", review: "סקירת קוד", tests: "כתיבת בדיקות", skill: "יצירת Skill" },
    levels: { min: "מינימליסטי", std: "רגיל", deep: "ארכיטקטוני מעמיק" },
    extras: { tests: "בדיקות אוטומטיות", commit: "שמירה ב-Git", rule: "כלל ל-CLAUDE.md" },
    formats: { terminal: "בקשה לטרמינל", skill: "קובץ SKILL.md" },
    taskLine: {
      feature: "תבנה פיצ'ר חדש: [תארו מה הפיצ'ר עושה ולמי].",
      debug: "יש באג: [מה עשיתי, מה ציפיתי שיקרה, ומה קרה בפועל]. השגיאה המלאה: [הדבקה].",
      review: "תסקור את השינויים בענף הנוכחי לעומת main.",
      tests: "תכתוב בדיקות אוטומטיות ל-[קובץ או פונקציה], כולל מקרי קצה.",
      skill: "תיצור Skill חדש בתיקייה .claude/skills בשם [שם], שעושה: [תיאור התהליך].",
    },
    taskRule: {
      feature: "תעבוד לפי המבנה והסגנון הקיימים בפרויקט.",
      debug: "תתקן את שורש הבעיה. בלי try/catch שבולע שגיאות, בלי ts-ignore ובלי לכבות בדיקות.",
      review: "אל תתקן כלום. תדווח לפי חומרה, עם קובץ ושורה לכל ממצא.",
      tests: "אם בדיקה נכשלת, אל תחליש אותה. תגיד לי אם הבעיה בקוד או בבדיקה.",
      skill: "תכתוב תיאור (description) שיגרום ל-Claude להפעיל אותו בזמן הנכון, ותסביר לי כל שדה בכותרת.",
    },
    levelLine: {
      min: "תעשה את השינוי הקטן ביותר שפותר את המשימה, בלי שינויים נוספים.",
      std: "קודם תסביר בקצרה מה אתה מתכנן, ואז תבצע.",
      deep: "קודם תחקור את הקוד הרלוונטי (אפשר עם סוכני משנה), תציג תוכנית בשלבים עם סיכונים וחלופות, ותחכה לאישור שלי לפני שאתה כותב קוד.",
    },
    extraLine: {
      tests: "תוסיף או תעדכן בדיקות אוטומטיות, ותריץ אותן.",
      commit: "בסוף תשמור ב-git עם הודעה ברורה באנגלית. אל תדחוף.",
      rule: "אם למדת משהו שכדאי לזכור לפעם הבאה, תציע כלל קצר להוסיף ל-CLAUDE.md.",
    },
    stack: (s: string) => `הפרויקט כתוב ב-${s}.`,
    verify: (cmd: string) => `בסוף תוודא שהכול עובד (${cmd}), ותדווח לי בעברית מה עשית.`,
    htmlCheck: "לפתוח את הדף בדפדפן ולבדוק שאין שגיאות בקונסול",
    terminalTitle: "בקשה מוכנה להדבקה ב-Claude Code",
    note: "החליפו את מה שבסוגריים המרובעים בפרטים שלכם.",
    skillNote: " ב-Skill, המקום הזה הוחלף ב-$ARGUMENTS, כך שמה שתכתבו אחרי שם הפקודה ייכנס לשם.",
  },
  en: {
    labels: ["1. Task type", "2. Tech stack", "3. Detail level", "4. Extras", "5. Format"],
    tasks: { feature: "Build a feature", debug: "Fix a bug", review: "Code review", tests: "Write tests", skill: "Create a Skill" },
    levels: { min: "Minimal", std: "Standard", deep: "Deep architectural" },
    extras: { tests: "Automated tests", commit: "Git commit", rule: "CLAUDE.md rule" },
    formats: { terminal: "Terminal prompt", skill: "SKILL.md file" },
    taskLine: {
      feature: "Build a new feature: [describe what it does and for whom].",
      debug: "There's a bug: [what I did, what I expected, and what actually happened]. Full error: [paste].",
      review: "Review the changes on the current branch against main.",
      tests: "Write automated tests for [file or function], including edge cases.",
      skill: "Create a new Skill in .claude/skills called [name] that does: [describe the process].",
    },
    taskRule: {
      feature: "Follow the project's existing structure and style.",
      debug: "Fix the root cause. No try/catch that swallows errors, no ts-ignore, and no disabling checks.",
      review: "Don't fix anything. Report by severity, with a file and line for each finding.",
      tests: "If a test fails, don't weaken it. Tell me whether the problem is in the code or the test.",
      skill: "Write a description that makes Claude use it at the right moment, and explain each frontmatter field to me.",
    },
    levelLine: {
      min: "Make the smallest change that solves the task, nothing more.",
      std: "First explain briefly what you plan to do, then do it.",
      deep: "First investigate the relevant code (sub-agents are fine), present a step-by-step plan with risks and alternatives, and wait for my approval before writing code.",
    },
    extraLine: {
      tests: "Add or update automated tests, and run them.",
      commit: "At the end, commit to git with a clear message. Don't push.",
      rule: "If you learned something worth remembering next time, suggest a short rule for CLAUDE.md.",
    },
    stack: (s: string) => `The project uses ${s}.`,
    verify: (cmd: string) => `At the end, make sure everything works (${cmd}) and tell me what you did.`,
    htmlCheck: "open the page in a browser and check the console for errors",
    terminalTitle: "Ready to paste into Claude Code",
    note: "Replace the parts in square brackets with your own details.",
    skillNote: " In the Skill, that spot became $ARGUMENTS, so whatever you type after the command name goes there.",
  },
};

type Text = (typeof text)["he"];

const verifyCommand = (stack: string, t: Text) =>
  ({ next: "npm run build", react: "npm run build", node: "npm test", python: "pytest", html: t.htmlCheck })[stack]!;

function buildPrompt(t: Text, task: string, stack: string, level: string, extras: string[]) {
  const stackLabel = stacks.find((s) => s.id === stack)!.label;
  const key = task as keyof Text["taskLine"];
  const lines = [
    t.taskLine[key],
    t.stack(stackLabel),
    t.taskRule[key],
    t.levelLine[level as keyof Text["levelLine"]],
    ...extras.filter((e) => !(task === "review" && e !== "rule")).map((e) => t.extraLine[e as keyof Text["extraLine"]]),
    task === "review" ? "" : t.verify(verifyCommand(stack, t)),
  ];
  return lines.filter(Boolean).join("\n");
}

function buildSkill(t: Text, task: string, stack: string, level: string, extras: string[]) {
  const stackLabel = stacks.find((s) => s.id === stack)!.label;
  const allowed = [
    stack === "python" ? "Bash(pytest *)" : stack === "html" ? "" : `Bash(${verifyCommand(stack, t)})`,
    extras.includes("commit") && task !== "review" ? "Bash(git add *) Bash(git commit *)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const frontmatter = [
    "---",
    `name: ${slugs[task]}`,
    `description: ${descriptions[task]} in this ${stackLabel} project. Use when the user asks to ${descriptions[task].toLowerCase()}.`,
    "argument-hint: [details]",
    task === "review" ? "disallowed-tools: Edit Write" : "",
    allowed ? `allowed-tools: ${allowed}` : "",
    "---",
  ].filter(Boolean);

  const body = buildPrompt(t, task, stack, level, extras)
    .replace(/\[[^\]]+\]/, "$ARGUMENTS")
    .split("\n")
    .map((line, i) => `${i + 1}. ${line}`);

  return [...frontmatter, "", ...body].join("\n");
}

const options = <K extends string>(labels: Record<K, string>) =>
  (Object.keys(labels) as K[]).map((id) => ({ id, label: labels[id] }));

/** Interactive builder that turns a few choices into a ready prompt or SKILL.md file. */
export function PromptBuilder() {
  const locale = useLocale();
  const t = text[locale] as Text;
  const [task, setTask] = useState("feature");
  const [stack, setStack] = useState("next");
  const [level, setLevel] = useState("std");
  const [extras, setExtras] = useState<string[]>(["tests"]);
  const [format, setFormat] = useState("terminal");

  const toggle = (id: string) => setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isSkill = format === "skill";
  const output = isSkill ? buildSkill(t, task, stack, level, extras) : buildPrompt(t, task, stack, level, extras);

  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-5">
        <ChoiceGroup label={t.labels[0]} options={options(t.tasks)} value={task} onChange={setTask} />
        <ChoiceGroup label={t.labels[1]} options={stacks} value={stack} onChange={setStack} />
        <ChoiceGroup label={t.labels[2]} options={options(t.levels)} value={level} onChange={setLevel} />
        <ToggleGroup label={t.labels[3]} options={options(t.extras)} values={extras} onToggle={toggle} />
        <ChoiceGroup label={t.labels[4]} options={options(t.formats)} value={format} onChange={setFormat} />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl bg-term text-term-ink">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 ps-4 pe-2">
          <span className="text-xs text-term-dim">{isSkill ? `.claude/skills/${slugs[task]}/SKILL.md` : t.terminalTitle}</span>
          <CopyButton text={output} className="text-term-ink hover:bg-white/10" />
        </div>
        <pre
          dir={isSkill || locale === "en" ? "ltr" : "rtl"}
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
        {t.note}
        {isSkill && t.skillNote}
      </p>
    </div>
  );
}
