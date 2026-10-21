export type Chapter = {
  number: number;
  slug: string;
  title: string;
  summary: string;
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
    | "Calculator";
};

export const chapters: Chapter[] = [
  {
    number: 1,
    slug: "01-introduction",
    title: "היכרות עם Claude Code",
    summary: "מה זה בכלל, במה זה שונה מצ'אט רגיל, ולמה כולם מדברים על זה.",
    icon: "BookOpen",
  },
  {
    number: 2,
    slug: "02-installation",
    title: "התקנה והגדרה",
    summary: "התקנה צעד אחר צעד ב-Windows, ב-macOS וב-Linux, כולל התחברות לחשבון.",
    icon: "Download",
  },
  {
    number: 3,
    slug: "03-first-run",
    title: "השיחה הראשונה והפקודות הבסיסיות",
    summary: "פותחים סשן ראשון, מאשרים שינויים בבטחה, ומכירים את הפקודות שתשתמשו בהן כל יום.",
    icon: "MessageSquare",
  },
  {
    number: 4,
    slug: "04-prompting-guide",
    title: "איך לבקש נכון",
    summary: "ניסוח בקשות שמביאות תוצאות טובות, ומצב תכנון למשימות גדולות.",
    icon: "Lightbulb",
  },
  {
    number: 5,
    slug: "05-cursor-integration",
    title: "שילוב כוחות: Cursor + Claude Code",
    summary: "עורך קוד מצד אחד, Claude בטרמינל מהצד השני: רואים כל שינוי בזמן אמת ועובדים בלי להתנגש.",
    icon: "Columns2",
  },
  {
    number: 6,
    slug: "06-first-project",
    title: "פרויקט מעשי ראשון: בונים אתר מאפס",
    summary: "בונים יחד אתר מתכונים שלם עם Next.js: מתיקייה ריקה ועד אתר שעובר בדיקות ומוכן לעלות לאוויר.",
    icon: "Hammer",
  },
  {
    number: 7,
    slug: "07-debugging",
    title: "איתור ותיקון באגים",
    summary: "מעבירים ל-Claude הודעות שגיאה, מוצאים את שורש הבעיה, מתקנים שגיאות בנייה, וחוזרים אחורה כשתיקון הזיק.",
    icon: "Bug",
  },
  {
    number: 8,
    slug: "08-git-integration",
    title: "ניהול גרסאות, Git ו-GitHub",
    summary: "ענפים, הודעות שמירה מסודרות ו-Pull Requests עם Claude, וחגורות בטיחות שמגינות על הקוד.",
    icon: "GitBranch",
  },
  {
    number: 9,
    slug: "09-deployment",
    title: "העלאת האתר לאוויר ב-Vercel",
    summary: "מחברים את GitHub ל-Vercel, מגדירים משתני סביבה ודומיין משלכם, ובודקים את האתר באוויר.",
    icon: "Globe",
  },
  {
    number: 10,
    slug: "10-pro-tips",
    title: "טיפים של אלופים וקיצורי דרך",
    summary: "חוסכים בטוקנים ובעלויות, משדרגים את CLAUDE.md, מחברים כלים עם MCP, ומסכמים את הקורס.",
    icon: "Rocket",
  },
  {
    number: 11,
    slug: "11-skills",
    title: "Skills ואוטומציה",
    summary: "כותבים מתכוני עבודה ש-Claude מפעיל לבד או בפקודה: פרמטרים, מידע חי מהפרויקט והרשאות.",
    icon: "Sparkles",
  },
  {
    number: 12,
    slug: "12-agents",
    title: "סוכנים וסוכני משנה",
    summary: "סוכני משנה במקביל וברקע, טוקנים, חלון הקשר ו-Prompt Caching, ו-README שנכתב לבד.",
    icon: "Bot",
  },
  {
    number: 13,
    slug: "13-platforms-and-apps",
    title: "הפלטפורמות של Claude",
    summary: "טרמינל, אפליקציית Desktop, Web, מובייל ותוסף Chrome: מתי להשתמש בכל אחד, ואיך מעבירים סשנים ביניהם.",
    icon: "MonitorSmartphone",
  },
  {
    number: 14,
    slug: "14-templates-library",
    title: "ספריית תבניות מוכנות",
    summary: "סוכנים, פקודות ו-Skills מהקהילה: מה כל אחד עושה, פקודת התקנה, בקשה מוכנה ודוגמה לתוצאה.",
    icon: "Library",
  },
  {
    number: 15,
    slug: "15-glossary",
    title: "מילון מושגים ודף עזר",
    summary: "כל המושגים והפקודות מהקורס במקום אחד, עם חיפוש וסינון לפי נושא.",
    icon: "BookMarked",
  },
  {
    number: 16,
    slug: "16-tools",
    title: "כלים אינטראקטיביים",
    summary: "בונה בקשות ו-Skills, ומחשבון טוקנים שמראה כמה חוסכים עם /compact וקריאה ממוקדת.",
    icon: "Calculator",
  },
];
