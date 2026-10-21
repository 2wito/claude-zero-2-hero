import type { Locale } from "@/lib/i18n";

export type Chapter = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  en: { title: string; summary: string };
  icon:
    | "BookOpen"
    | "Download"
    | "MessageSquare"
    | "Lightbulb"
    | "Bug"
    | "Hammer"
    | "Columns2"
    | "GitBranch"
    | "Globe"
    | "Rocket"
    | "Sparkles"
    | "Bot"
    | "MonitorSmartphone"
    | "Library"
    | "BookMarked"
    | "Calculator"
    | "MessagesSquare";
};

export const chapters: Chapter[] = [
  {
    number: 1,
    slug: "01-introduction",
    title: "היכרות עם Claude Code",
    summary: "מה זה בכלל, במה זה שונה מצ'אט רגיל, ולמה כולם מדברים על זה.",
    en: { title: "Meet Claude Code", summary: "What it is, how it differs from a regular chat, and why everyone is talking about it." },
    icon: "BookOpen",
  },
  {
    number: 2,
    slug: "02-installation",
    title: "התקנה והגדרה",
    summary: "התקנה צעד אחר צעד ב-Windows, ב-macOS וב-Linux, כולל התחברות לחשבון.",
    en: { title: "Installation & Setup", summary: "Step-by-step install on Windows, macOS and Linux, including signing in to your account." },
    icon: "Download",
  },
  {
    number: 3,
    slug: "03-first-run",
    title: "השיחה הראשונה והפקודות הבסיסיות",
    summary: "פותחים סשן ראשון, מאשרים שינויים בבטחה, ומכירים את הפקודות שתשתמשו בהן כל יום.",
    en: { title: "Your First Session & Basic Commands", summary: "Open your first session, approve changes safely, and learn the commands you'll use every day." },
    icon: "MessageSquare",
  },
  {
    number: 4,
    slug: "04-prompting-guide",
    title: "איך לבקש נכון",
    summary: "ניסוח בקשות שמביאות תוצאות טובות, ומצב תכנון למשימות גדולות.",
    en: { title: "How to Ask Well", summary: "Writing prompts that get great results, and plan mode for big tasks." },
    icon: "Lightbulb",
  },
  {
    number: 5,
    slug: "05-cursor-integration",
    title: "שילוב כוחות: Cursor + Claude Code",
    summary: "עורך קוד מצד אחד, Claude בטרמינל מהצד השני: רואים כל שינוי בזמן אמת ועובדים בלי להתנגש.",
    en: { title: "Joining Forces: Cursor + Claude Code", summary: "Code editor on one side, Claude in the terminal on the other: see every change live without conflicts." },
    icon: "Columns2",
  },
  {
    number: 6,
    slug: "06-first-project",
    title: "פרויקט מעשי ראשון: בונים אתר מאפס",
    summary: "בונים יחד אתר מתכונים שלם עם Next.js: מתיקייה ריקה ועד אתר שעובר בדיקות ומוכן לעלות לאוויר.",
    en: { title: "First Hands-On Project: A Site From Scratch", summary: "Build a complete recipe site with Next.js together: from an empty folder to a site that passes checks and is ready to launch." },
    icon: "Hammer",
  },
  {
    number: 7,
    slug: "07-debugging",
    title: "איתור ותיקון באגים",
    summary: "מעבירים ל-Claude הודעות שגיאה, מוצאים את שורש הבעיה, מתקנים שגיאות בנייה, וחוזרים אחורה כשתיקון הזיק.",
    en: { title: "Finding & Fixing Bugs", summary: "Hand error messages to Claude, find the root cause, fix build errors, and roll back when a fix backfires." },
    icon: "Bug",
  },
  {
    number: 8,
    slug: "08-git-integration",
    title: "ניהול גרסאות, Git ו-GitHub",
    summary: "ענפים, הודעות שמירה מסודרות ו-Pull Requests עם Claude, וחגורות בטיחות שמגינות על הקוד.",
    en: { title: "Version Control, Git & GitHub", summary: "Branches, clean commit messages and Pull Requests with Claude, plus seatbelts that protect your code." },
    icon: "GitBranch",
  },
  {
    number: 9,
    slug: "09-deployment",
    title: "העלאת האתר לאוויר ב-Vercel",
    summary: "מחברים את GitHub ל-Vercel, מגדירים משתני סביבה ודומיין משלכם, ובודקים את האתר באוויר.",
    en: { title: "Going Live on Vercel", summary: "Connect GitHub to Vercel, set environment variables and your own domain, and test the live site." },
    icon: "Globe",
  },
  {
    number: 10,
    slug: "10-pro-tips",
    title: "טיפים של אלופים וקיצורי דרך",
    summary: "חוסכים בטוקנים ובעלויות, משדרגים את CLAUDE.md, מחברים כלים עם MCP, ומסכמים את הקורס.",
    en: { title: "Pro Tips & Shortcuts", summary: "Save tokens and money, level up CLAUDE.md, connect tools with MCP, and wrap up the course." },
    icon: "Rocket",
  },
  {
    number: 11,
    slug: "11-skills",
    title: "Skills ואוטומציה",
    summary: "כותבים מתכוני עבודה ש-Claude מפעיל לבד או בפקודה: פרמטרים, מידע חי מהפרויקט והרשאות.",
    en: { title: "Skills & Automation", summary: "Write work recipes Claude runs on its own or on command: arguments, live project context and permissions." },
    icon: "Sparkles",
  },
  {
    number: 12,
    slug: "12-agents",
    title: "סוכנים וסוכני משנה",
    summary: "סוכני משנה במקביל וברקע, טוקנים, חלון הקשר ו-Prompt Caching, ו-README שנכתב לבד.",
    en: { title: "Agents & Sub-agents", summary: "Parallel and background sub-agents, tokens, the context window and prompt caching, and a README that writes itself." },
    icon: "Bot",
  },
  {
    number: 13,
    slug: "13-platforms-and-apps",
    title: "הפלטפורמות של Claude",
    summary: "טרמינל, אפליקציית Desktop, Web, מובייל ותוסף Chrome: מתי להשתמש בכל אחד, ואיך מעבירים סשנים ביניהם.",
    en: { title: "Claude's Platforms", summary: "Terminal, Desktop app, web, mobile and the Chrome extension: when to use each, and how to move sessions between them." },
    icon: "MonitorSmartphone",
  },
  {
    number: 14,
    slug: "14-templates-library",
    title: "ספריית תבניות מוכנות",
    summary: "סוכנים, פקודות ו-Skills מהקהילה: מה כל אחד עושה, פקודת התקנה, בקשה מוכנה ודוגמה לתוצאה.",
    en: { title: "Ready-Made Templates Library", summary: "Community agents, commands and Skills: what each does, an install command, a ready prompt and sample output." },
    icon: "Library",
  },
  {
    number: 15,
    slug: "15-glossary",
    title: "מילון מושגים ודף עזר",
    summary: "כל המושגים והפקודות מהקורס במקום אחד, עם חיפוש וסינון לפי נושא.",
    en: { title: "Glossary & Cheat Sheet", summary: "Every term and command from the course in one place, with search and topic filters." },
    icon: "BookMarked",
  },
  {
    number: 16,
    slug: "16-prompt-hub",
    title: "ספריית בקשות יומיומיות",
    summary: "בקשות מוכנות להעתקה לפי נושא: דיבאג, ריפקטורינג, Git ו-PR, בדיקות, ו-RTL.",
    en: { title: "Everyday Prompt Library", summary: "Copy-ready prompts by topic: debugging, refactoring, Git & PRs, testing, and RTL." },
    icon: "MessagesSquare",
  },
  {
    number: 17,
    slug: "17-tools",
    title: "כלים אינטראקטיביים",
    summary: "סימולטור טרמינל, מחולל CLAUDE.md, בונה בקשות ו-Skills, ומחשבון טוקנים.",
    en: { title: "Interactive Tools", summary: "Terminal simulator, CLAUDE.md generator, prompt & Skill builder, and a token calculator." },
    icon: "Calculator",
  },
];


/** Title and summary of a chapter in the given language. */
export function chapterText(chapter: Chapter, locale: Locale) {
  return locale === "en" ? chapter.en : { title: chapter.title, summary: chapter.summary };
}
