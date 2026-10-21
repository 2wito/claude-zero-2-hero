"use client";

import { useId, useState } from "react";
import { ChoiceGroup, ToggleGroup } from "@/components/ChoiceGroup";
import { CopyButton } from "@/components/copy-button";

const stacks = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "html", label: "HTML + Tailwind" },
];

const stackLines: Record<string, string[]> = {
  next: ["- Next.js (App Router), TypeScript, Tailwind CSS.", "- פיתוח: npm run dev. בדיקה לפני סיום: npm run build."],
  react: ["- React, TypeScript.", "- פיתוח: npm run dev. בדיקה לפני סיום: npm run build."],
  node: ["- Node.js, TypeScript.", "- בדיקות: npm test. להריץ לפני כל שמירה."],
  python: ["- Python 3.", "- בדיקות: pytest. להריץ לפני כל שמירה."],
  html: ["- HTML ו-Tailwind CSS, בלי framework.", "- בדיקה: לפתוח בדפדפן ולוודא שאין שגיאות בקונסול."],
};

const rules = [
  { id: "hebrew", label: "תשובות בעברית" },
  { id: "plan", label: "תוכנית לפני שינוי גדול" },
  { id: "deps", label: "בלי ספריות חדשות בלי אישור" },
  { id: "git", label: "כללי Git בטוחים" },
  { id: "tests", label: "בדיקות לכל שינוי" },
];

const ruleLines: Record<string, string> = {
  hebrew: "- תענה לי בעברית ובשפה פשוטה. מונחים טכניים באנגלית, עם הסבר קצר.",
  plan: "- לפני שינוי שנוגע ביותר משלושה קבצים, תציג תוכנית ותחכה לאישור.",
  deps: "- אל תוסיף ספריות חדשות בלי לשאול אותי קודם.",
  git: "- אף פעם לא git push --force ולא push ישירות ל-main. הודעות commit באנגלית.",
  tests: "- כל שינוי בלוגיקה מגיע עם בדיקה. אם בדיקה נכשלת, לא מחלישים אותה.",
};

const uiOptions = [
  { id: "rtl", label: "עברית ו-RTL" },
  { id: "a11y", label: "נגישות למבוגרים" },
  { id: "mobile", label: "מותאם לטלפון" },
];

const uiLines: Record<string, string> = {
  rtl: "- כל הממשק בעברית ומימין לשמאל (RTL). משתמשים ב-ms/me/ps/pe ולא ב-ml/mr/pl/pr.",
  a11y: "- טקסט בגודל 18px לפחות, כפתורים עם טקסט ולא רק אייקון, ניגודיות AA.",
  mobile: "- כל דף צריך לעבוד על מסך ברוחב 375px.",
};

const excludes = [
  { id: "env", label: "קובצי .env וסודות", paths: ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"] },
  { id: "keys", label: "מפתחות ותעודות", paths: ["Read(./**/*.pem)", "Read(./**/*.key)"] },
  { id: "data", label: "גיבויים ונתונים אישיים", paths: ["Read(./data/backups/**)", "Read(./exports/**)"] },
  { id: "build", label: "תיקיות בנייה", paths: ["Read(./.next/**)", "Read(./dist/**)", "Read(./build/**)"] },
];

function Output({ title, path, content }: { title: string; path: string; content: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-term text-term-ink">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 ps-4 pe-2">
        <span className="text-xs text-term-dim">
          {title}: <span dir="ltr">{path}</span>
        </span>
        <CopyButton text={content} className="text-term-ink hover:bg-white/10" />
      </div>
      <pre dir="ltr" className="code-body max-h-80 overflow-auto px-4 py-3 font-mono text-[13px] leading-6 whitespace-pre-wrap">
        {content.split("\n").map((line, i) => (
          <span key={i} data-line className="block">
            {line || " "}
          </span>
        ))}
      </pre>
    </div>
  );
}

/** Builds a starter CLAUDE.md and a .claude/settings.json that blocks reading sensitive files. */
export function ClaudeConfigGenerator() {
  const [name, setName] = useState("האתר המשפחתי");
  const [stack, setStack] = useState("next");
  const [ruleIds, setRuleIds] = useState(["hebrew", "plan", "git"]);
  const [ui, setUi] = useState(["rtl", "mobile"]);
  const [ex, setEx] = useState(["env", "keys"]);
  const nameId = useId();

  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
    set((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const claudeMd = [
    `# ${name || "הפרויקט שלי"}`,
    "",
    "## טכנולוגיות ופקודות",
    ...stackLines[stack],
    ...(ui.length ? ["", "## ממשק", ...ui.map((u) => uiLines[u])] : []),
    ...(ruleIds.length ? ["", "## כללי עבודה", ...ruleIds.map((r) => ruleLines[r])] : []),
    "",
    "## הוראות לסיכום",
    "- בסיכום שיחה, תמיד תשמור את רשימת הקבצים ששינינו ואת הבאגים שעוד פתוחים.",
  ].join("\n");

  const deny = excludes.filter((e) => ex.includes(e.id)).flatMap((e) => e.paths);
  const settings = JSON.stringify(
    {
      permissions: {
        deny: [...deny, ...(ruleIds.includes("git") ? ["Bash(git push --force *)", "Bash(git push -f *)"] : [])],
        ...(ruleIds.includes("git") ? { ask: ["Bash(git push *)"] } : {}),
      },
    },
    null,
    2,
  );

  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-5">
        <div>
          <label htmlFor={nameId} className="text-sm font-bold">
            שם הפרויקט
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2"
          />
        </div>
        <ChoiceGroup label="טכנולוגיה" options={stacks} value={stack} onChange={setStack} />
        <ToggleGroup label="ממשק" options={uiOptions} values={ui} onToggle={toggle(setUi)} />
        <ToggleGroup label="כללי עבודה" options={rules} values={ruleIds} onToggle={toggle(setRuleIds)} />
        <ToggleGroup label="קבצים ש-Claude לא יקרא" options={excludes} values={ex} onToggle={toggle(setEx)} />
      </div>
      <div className="mt-6 grid gap-4" aria-live="polite">
        <Output title="הוראות" path="CLAUDE.md" content={claudeMd} />
        <Output title="חסימות" path=".claude/settings.json" content={settings} />
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">
        למה לא <span dir="ltr">.claudeignore</span>? לפי התיעוד הרשמי, לקובץ כזה אין השפעה. חוקי <code dir="ltr">Read</code> ב-
        <code dir="ltr">deny</code> הם הדרך שבאמת חוסמת קריאה (פרק 10).
      </p>
    </div>
  );
}
