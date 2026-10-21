"use client";

import { useId, useState } from "react";
import { ChoiceGroup, ToggleGroup } from "@/components/ChoiceGroup";
import { CopyButton } from "@/components/copy-button";
import { useLocale } from "@/components/use-locale";

const stacks = [
  { id: "next", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "html", label: "HTML + Tailwind" },
];

const excludePaths: Record<string, string[]> = {
  env: ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"],
  keys: ["Read(./**/*.pem)", "Read(./**/*.key)"],
  data: ["Read(./data/backups/**)", "Read(./exports/**)"],
  build: ["Read(./.next/**)", "Read(./dist/**)", "Read(./build/**)"],
};

const text = {
  he: {
    defaultName: "האתר המשפחתי",
    fallbackName: "הפרויקט שלי",
    nameLabel: "שם הפרויקט",
    stackLabel: "טכנולוגיה",
    uiLabel: "ממשק",
    rulesLabel: "כללי עבודה",
    excludeLabel: "קבצים ש-Claude לא יקרא",
    sections: { stack: "## טכנולוגיות ופקודות", ui: "## ממשק", rules: "## כללי עבודה", compact: "## הוראות לסיכום" },
    compactLine: "- בסיכום שיחה, תמיד תשמור את רשימת הקבצים ששינינו ואת הבאגים שעוד פתוחים.",
    stackLines: {
      next: ["- Next.js (App Router), TypeScript, Tailwind CSS.", "- פיתוח: npm run dev. בדיקה לפני סיום: npm run build."],
      react: ["- React, TypeScript.", "- פיתוח: npm run dev. בדיקה לפני סיום: npm run build."],
      node: ["- Node.js, TypeScript.", "- בדיקות: npm test. להריץ לפני כל שמירה."],
      python: ["- Python 3.", "- בדיקות: pytest. להריץ לפני כל שמירה."],
      html: ["- HTML ו-Tailwind CSS, בלי framework.", "- בדיקה: לפתוח בדפדפן ולוודא שאין שגיאות בקונסול."],
    },
    rules: {
      language: ["תשובות בעברית", "- תענה לי בעברית ובשפה פשוטה. מונחים טכניים באנגלית, עם הסבר קצר."],
      plan: ["תוכנית לפני שינוי גדול", "- לפני שינוי שנוגע ביותר משלושה קבצים, תציג תוכנית ותחכה לאישור."],
      deps: ["בלי ספריות חדשות בלי אישור", "- אל תוסיף ספריות חדשות בלי לשאול אותי קודם."],
      git: ["כללי Git בטוחים", "- אף פעם לא git push --force ולא push ישירות ל-main. הודעות commit באנגלית."],
      tests: ["בדיקות לכל שינוי", "- כל שינוי בלוגיקה מגיע עם בדיקה. אם בדיקה נכשלת, לא מחלישים אותה."],
    },
    ui: {
      rtl: ["עברית ו-RTL", "- כל הממשק בעברית ומימין לשמאל (RTL). משתמשים ב-ms/me/ps/pe ולא ב-ml/mr/pl/pr."],
      a11y: ["נגישות למבוגרים", "- טקסט בגודל 18px לפחות, כפתורים עם טקסט ולא רק אייקון, ניגודיות AA."],
      mobile: ["מותאם לטלפון", "- כל דף צריך לעבוד על מסך ברוחב 375px."],
    },
    excludes: { env: "קובצי .env וסודות", keys: "מפתחות ותעודות", data: "גיבויים ונתונים אישיים", build: "תיקיות בנייה" },
    outInstructions: "הוראות",
    outBlocks: "חסימות",
    why: "למה לא .claudeignore? לפי התיעוד הרשמי, לקובץ כזה אין השפעה. חוקי Read ב-deny הם הדרך שבאמת חוסמת קריאה (פרק 10).",
  },
  en: {
    defaultName: "Family Recipe Site",
    fallbackName: "My project",
    nameLabel: "Project name",
    stackLabel: "Tech stack",
    uiLabel: "Interface",
    rulesLabel: "Working rules",
    excludeLabel: "Files Claude won't read",
    sections: { stack: "## Stack & commands", ui: "## Interface", rules: "## Working rules", compact: "## Compaction instructions" },
    compactLine: "- When compacting, always keep the list of files we changed and any open bugs.",
    stackLines: {
      next: ["- Next.js (App Router), TypeScript, Tailwind CSS.", "- Dev: npm run dev. Before finishing: npm run build."],
      react: ["- React, TypeScript.", "- Dev: npm run dev. Before finishing: npm run build."],
      node: ["- Node.js, TypeScript.", "- Tests: npm test. Run before every commit."],
      python: ["- Python 3.", "- Tests: pytest. Run before every commit."],
      html: ["- HTML and Tailwind CSS, no framework.", "- Check: open in a browser and make sure the console has no errors."],
    },
    rules: {
      language: ["Plain-language answers", "- Answer in plain language. Briefly explain technical terms the first time."],
      plan: ["Plan before big changes", "- Before a change touching more than three files, show a plan and wait for approval."],
      deps: ["No new libraries without asking", "- Don't add new libraries without asking me first."],
      git: ["Safe Git rules", "- Never git push --force and never push directly to main. Commit messages in English."],
      tests: ["Tests for every change", "- Every logic change comes with a test. If a test fails, don't weaken it."],
    },
    ui: {
      rtl: ["RTL support", "- The UI supports right-to-left languages. Use ms/me/ps/pe instead of ml/mr/pl/pr."],
      a11y: ["Accessible for older users", "- Text at least 18px, buttons with text labels not just icons, AA contrast."],
      mobile: ["Mobile-friendly", "- Every page must work on a 375px-wide screen."],
    },
    excludes: { env: ".env files & secrets", keys: "Keys & certificates", data: "Backups & personal data", build: "Build folders" },
    outInstructions: "Instructions",
    outBlocks: "Blocks",
    why: "Why not .claudeignore? According to the official docs, that file has no effect. Read rules under deny are what actually block reading (chapter 10).",
  },
};

type Text = (typeof text)["he"];

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

const pairOptions = (map: Record<string, string[]>) => Object.entries(map).map(([id, [label]]) => ({ id, label }));

/** Builds a starter CLAUDE.md and a .claude/settings.json that blocks reading sensitive files. */
export function ClaudeConfigGenerator() {
  const t = text[useLocale()] as Text;
  const [name, setName] = useState(t.defaultName);
  const [stack, setStack] = useState("next");
  const [ruleIds, setRuleIds] = useState(["language", "plan", "git"]);
  const [ui, setUi] = useState(["rtl", "mobile"]);
  const [ex, setEx] = useState(["env", "keys"]);
  const nameId = useId();

  const toggle = (set: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
    set((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const rules = t.rules as Record<string, string[]>;
  const uiMap = t.ui as Record<string, string[]>;
  const claudeMd = [
    `# ${name || t.fallbackName}`,
    "",
    t.sections.stack,
    ...t.stackLines[stack as keyof Text["stackLines"]],
    ...(ui.length ? ["", t.sections.ui, ...ui.map((u) => uiMap[u][1])] : []),
    ...(ruleIds.length ? ["", t.sections.rules, ...ruleIds.map((r) => rules[r][1])] : []),
    "",
    t.sections.compact,
    t.compactLine,
  ].join("\n");

  const deny = Object.keys(excludePaths)
    .filter((id) => ex.includes(id))
    .flatMap((id) => excludePaths[id]);
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
            {t.nameLabel}
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2"
          />
        </div>
        <ChoiceGroup label={t.stackLabel} options={stacks} value={stack} onChange={setStack} />
        <ToggleGroup label={t.uiLabel} options={pairOptions(uiMap)} values={ui} onToggle={toggle(setUi)} />
        <ToggleGroup label={t.rulesLabel} options={pairOptions(rules)} values={ruleIds} onToggle={toggle(setRuleIds)} />
        <ToggleGroup
          label={t.excludeLabel}
          options={Object.entries(t.excludes).map(([id, label]) => ({ id, label }))}
          values={ex}
          onToggle={toggle(setEx)}
        />
      </div>
      <div className="mt-6 grid gap-4" aria-live="polite">
        <Output title={t.outInstructions} path="CLAUDE.md" content={claudeMd} />
        <Output title={t.outBlocks} path=".claude/settings.json" content={settings} />
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{t.why}</p>
    </div>
  );
}
