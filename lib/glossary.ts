export type GlossaryTerm = {
  term: string;
  en?: string;
  category: "basic" | "advanced" | "cli";
  definition: string;
  chapter: number;
};

export const glossary: GlossaryTerm[] = [
  // Basic
  { term: "טוקן", en: "Token", category: "basic", chapter: 12, definition: "יחידת המדידה של מודלי שפה: חתיכת טקסט קטנה, בערך חלק של מילה. כל מה ש-Claude קורא וכותב נמדד בטוקנים, וזה קובע מהירות, עלות וכמה מידע נכנס לחלון ההקשר. בעברית מילה צורכת בדרך כלל יותר טוקנים מאשר באנגלית." },
  { term: "חלון הקשר", en: "Context Window", category: "basic", chapter: 12, definition: "כל מה ש-Claude \"רואה\" ברגע נתון: הוראות, CLAUDE.md, ההודעות, וכל קובץ ופלט שנקראו. הוא גדול (מאות אלפי טוקנים, ובחלק מהמודלים מיליון) אבל מתמלא, וכשהוא מלא הביצועים יורדים ו-Claude Code מסכם אוטומטית." },
  { term: "CLAUDE.md", category: "basic", chapter: 4, definition: "קובץ הוראות קבועות שנטען בתחילת כל שיחה: מטרת הפרויקט, כללי עבודה, פקודות בדיקה. כדאי שיהיה קצר (פחות מ-200 שורות) וספציפי. זו הנחיה, לא נעילה." },
  { term: "פרומפט", en: "Prompt", category: "basic", chapter: 4, definition: "הבקשה שכותבים ל-Claude. בקשה טובה עומדת בכלל הזהב: ספציפיות, הקשר, צעד אחר צעד ואימות." },
  { term: "סוכן", en: "Agent", category: "basic", chapter: 1, definition: "בינה מלאכותית שלא רק עונה אלא פועלת בלולאה: קוראת, מחליטה, עושה ובודקת, עד שהמשימה גמורה. Claude Code הוא סוכן." },
  { term: "טרמינל", en: "Terminal", category: "basic", chapter: 3, definition: "חלון שבו כותבים פקודות למחשב. ב-Windows: PowerShell או CMD. ב-Mac וב-Linux: Terminal." },
  { term: "בקשת אישור", en: "Permission prompt", category: "basic", chapter: 3, definition: "הרגע שבו Claude עוצר ושואל לפני עריכת קובץ או הרצת פקודה. קוראים מה הוא מתכוון לעשות לפני שמאשרים." },
  { term: "שמירה ב-Git", en: "Commit", category: "basic", chapter: 8, definition: "נקודת שמירה של כל הפרויקט, עם הודעה שמתארת מה השתנה. אפשר תמיד לחזור אליה." },
  { term: "Pull Request", en: "PR", category: "basic", chapter: 8, definition: "הצעה רשמית לאחד ענף לתוך main ב-GitHub, עם תיאור, רשימת שינויים ומקום לסקירה לפני המיזוג." },
  // Advanced
  { term: "MCP", en: "Model Context Protocol", category: "advanced", chapter: 10, definition: "תקן פתוח לחיבור Claude לכלים ולמקורות מידע חיצוניים, כמו Notion, מסדי נתונים ומערכות משימות. מחברים עם claude mcp add, ומחברים רק שרתים ממקור מוכר." },
  { term: "סוכן משנה", en: "Sub-agent", category: "advanced", chapter: 12, definition: "עוזר ש-Claude מפעיל למשימה מוגדרת, עם חלון הקשר, הוראות וכלים משלו. מחזיר רק סיכום, וכך שומר על השיחה הראשית נקייה. מגדירים ב-.claude/agents." },
  { term: "מצב אוטומטי", en: "Auto mode", category: "advanced", chapter: 3, definition: "מצב הרשאות שבו Claude עובד בלי לשאול, ומודל בטיחות נפרד בודק כל פעולה ברקע וחוסם פעולות מסוכנות, כמו force push. בגרסאות עדכניות זה מצב ההתחלה. מחליפים עם Shift+Tab." },
  { term: "Prompt Caching", en: "זיכרון מטמון", category: "advanced", chapter: 12, definition: "בכל הודעה כל השיחה נשלחת מחדש, אבל השרת זוכר לזמן קצר מה כבר עיבד, וקורא את ההתחלה הזהה מהמטמון במחיר נמוך בהרבה. החלפת מודל או סיכום באמצע משימה שוברים את המטמון." },
  { term: ".claudeignore", category: "advanced", chapter: 10, definition: "מיתוס נפוץ: לפי התיעוד הרשמי, לקובץ הזה אין שום השפעה. כדי למנוע מ-Claude לקרוא קבצים, משתמשים בחוקי Read ב-deny בקובץ .claude/settings.json, למשל Read(./.env)." },
  { term: "Skill", en: "מיומנות", category: "advanced", chapter: 11, definition: "מתכון עבודה כתוב בתיקייה עם קובץ SKILL.md. רק השם והתיאור נטענים מראש, והתוכן נטען כשצריך. Claude מפעיל לבד לפי התיאור, או שאתם מפעילים עם /שם." },
  { term: "Hook", category: "advanced", chapter: 10, definition: "סקריפט שרץ אוטומטית בנקודה מסוימת בעבודה של Claude, למשל לפני כל פקודה. בניגוד ל-CLAUDE.md, הוא נאכף בכל פעם." },
  { term: "חוקי הרשאות", en: "Permission rules", category: "advanced", chapter: 8, definition: "חוקי allow, ask ו-deny ב-.claude/settings.json שקובעים מה Claude Code מאפשר, שואל או חוסם, בכל מצב הרשאות. למשל deny ל-Bash(git push --force *)." },
  { term: "Worktree", category: "advanced", chapter: 13, definition: "עותק נפרד של הפרויקט על ענף משלו, כדי שכמה סשנים יעבדו במקביל בלי להתנגש." },
  { term: "סשן ענן", en: "Cloud session", category: "advanced", chapter: 13, definition: "Claude Code שרץ על מחשב וירטואלי של Anthropic ומוריד את הקוד מ-GitHub. ממשיך לרוץ גם כשהמחשב שלכם כבוי." },
  // CLI
  { term: "/compact", category: "cli", chapter: 3, definition: "מסכם את השיחה כדי לפנות מקום בחלון ההקשר, וממשיך באותה משימה. אפשר לכתוב אחריו מה לשמור. הכי טוב בהפסקות טבעיות." },
  { term: "/clear", category: "cli", chapter: 3, definition: "מתחיל שיחה חדשה ונקייה. הקבצים לא נמחקים. משתמשים בו בין משימות שלא קשורות." },
  { term: "/context", category: "cli", chapter: 10, definition: "מראה מה תופס מקום בחלון ההקשר כרגע, לפי קטגוריות." },
  { term: "/usage", category: "cli", chapter: 10, definition: "מראה שימוש, עלויות ומגבלות מנוי, כולל שורת Prompt cache והמלצות לחיסכון." },
  { term: "/rewind", category: "cli", chapter: 7, definition: "חוזר לנקודה קודמת בשיחה ובקבצים (גם Esc פעמיים). לא מבטל פקודות טרמינל או שינויים שעשיתם בעצמכם." },
  { term: "/init", category: "cli", chapter: 4, definition: "יוצר CLAUDE.md התחלתי לפי מה ש-Claude מבין מהפרויקט." },
  { term: "/memory", category: "cli", chapter: 10, definition: "פותח את קובצי CLAUDE.md ואת הזיכרון האוטומטי לעריכה." },
  { term: "/mcp", category: "cli", chapter: 10, definition: "מציג שרתי MCP, מצב החיבור שלהם, ומאפשר להתחבר אליהם או לכבות אותם." },
  { term: "/code-review", category: "cli", chapter: 8, definition: "סוקר את השינויים הנוכחיים ומחפש באגים, בסוכן נפרד. אפשר גם לפי מספר PR." },
  { term: "claude -c", category: "cli", chapter: 3, definition: "ממשיך את השיחה האחרונה בתיקייה הנוכחית." },
  { term: "claude --teleport", category: "cli", chapter: 13, definition: "מושך סשן ענן לטרמינל, כולל הענף והשיחה. דורש מצב Git נקי ואותו מאגר." },
  { term: "claude --chrome", category: "cli", chapter: 13, definition: "מפעיל את Claude Code עם חיבור לתוסף Chrome, כדי שיוכל לבדוק אתרים בדפדפן אמיתי." },
  { term: "Shift + Tab", category: "cli", chapter: 3, definition: "מחליף מצב הרשאות: ידני, אישור עריכות, תכנון ואוטומטי." },
  { term: "@קובץ", category: "cli", chapter: 4, definition: "מצרף קובץ לבקשה, עם השלמה אוטומטית. חוסך ל-Claude חיפוש." },
  { term: "!פקודה", category: "cli", chapter: 4, definition: "מריץ פקודת טרמינל ישירות מתוך Claude Code, והפלט נכנס לשיחה." },
];
