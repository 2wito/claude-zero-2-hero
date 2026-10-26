<div dir="rtl">

# Claude Code בעברית: מ-Zero ל-Hero

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

מדריך אינטראקטיבי בעברית ללמוד את **Claude Code**, סוכן התכנות של Anthropic שעובד בטרמינל, מהצעד הראשון ועד בניית אתרים והעלאתם לאוויר. המדריך נכתב בשפה פשוטה, לחברים ולמשפחה, ולא דורש ידע מוקדם בתכנות.

**🌐 לאתר החי:** [claude-code-hebrew.com](https://www.claude-code-hebrew.com) · [English README](README.md)

## מה יש במדריך

18 פרקים, צעד אחר צעד:

| # | פרק |
| --- | --- |
| 1 | מה זה Claude Code, ולמה זה משנה את המשחק |
| 2 | התקנה והגדרה ב-Windows, ב-macOS וב-Linux |
| 3 | השיחה הראשונה והפקודות הבסיסיות |
| 4 | איך לבקש נכון: הנדסת פרומפטים ו-CLAUDE.md |
| 5 | שילוב כוחות: Cursor + Claude Code |
| 6 | פרויקט מעשי ראשון: בונים אתר מאפס |
| 7 | איתור ותיקון באגים |
| 8 | ניהול גרסאות, Git ו-GitHub |
| 9 | העלאת האתר לאוויר ב-Vercel |
| 10 | טיפים של אלופים וקיצורי דרך |
| 11 | יכולות מותאמות אישית (Skills) ואוטומציה |
| 12 | סוכנים חכמים (Agents & Sub-agents) ותכנון מתקדם |
| 13 | האקוסיסטם של Claude: Desktop, Chrome, Web ומובייל |
| 14 | ספריית תבניות: סוכנים, פקודות ו-Skills מוכנים |
| 15 | מילון מושגים ודף עזר, עם חיפוש |
| 16 | ספריית בקשות יומיומיות |
| 17 | כלים אינטראקטיביים: סימולטור טרמינל, מחולל CLAUDE.md, בונה בקשות ומחשבון טוקנים |
| 18 | סיימתם! משוב וקרדיטים |

**מה מיוחד בו:**

- **מימין לשמאל מההתחלה**: הממשק, הניווט והטיפוגרפיה בנויים לעברית.
- **לשוניות לפי מערכת הפעלה**: הוראות נפרדות ל-PowerShell, ל-CMD ול-macOS/Linux. הבחירה נשמרת ומסתנכרנת בכל העמוד.
- **בלוקי קוד עם העתקה בלחיצה**, צביעת תחביר ותוויות ברורות.
- **בקשות מוכנות בעברית** להעתקה, והשוואות בין "בקשה חלשה" ל"בקשה חזקה".
- **רשימות בדיקה אינטראקטיביות** שזוכרות את ההתקדמות שלכם.
- **מצב כהה ומצב בהיר.**
- **גרסה באנגלית**: כל האתר זמין גם באנגלית, משמאל לימין, בכתובת `/en`. כפתור בחלק העליון של המסך עובר בין השפות ושומר על אותו פרק.
- **בחירת גודל גופן**: הכפתור **AA** בכותרת מגדיל את כל הטקסט באתר (רגיל, גדול, גדול מאוד). הבחירה נשמרת בדפדפן ונטענת עוד לפני שהדף מוצג.

## הרצה מקומית

**דרישות:** [Node.js](https://nodejs.org) בגרסת LTS (‏20 ומעלה) ו-[Git](https://git-scm.com).

1. מורידים את הפרויקט:

</div>

```bash
git clone https://github.com/2wito/claude-zero-2-hero.git
cd claude-zero-2-hero
```

<div dir="rtl">

2. מתקינים את החבילות:

</div>

```bash
npm install
```

<div dir="rtl">

3. מפעילים את שרת הפיתוח:

</div>

```bash
npm run dev
```

<div dir="rtl">

4. פותחים בדפדפן את [http://localhost:3000](http://localhost:3000).

### פקודות נוספות

| פקודה | מה היא עושה |
| --- | --- |
| `npm run dev` | שרת פיתוח עם רענון אוטומטי |
| `npm run build` | בנייה לייצור. כדאי להריץ לפני כל דחיפה |
| `npm run start` | הרצת גרסת הייצור אחרי `build` |
| `npm run lint` | בדיקת הקוד עם ESLint |

## מבנה הפרויקט

</div>

```text
claude-zero-2-hero/
├── app/                    # דפים וניתוב (Next.js App Router)
│   ├── page.tsx            # דף הנחיתה בעברית
│   ├── layout.tsx          # מסגרת האתר: שפה וכיוון, גודל גופן, גופנים ומצב כהה
│   ├── en/                 # הגרסה האנגלית: /en ו-/en/docs/[slug]
│   ├── globals.css         # צבעים, משתני עיצוב ועיצוב בלוקי קוד
│   └── docs/
│       ├── layout.tsx      # מסגרת המדריך עם תפריט הצד
│       └── [slug]/page.tsx # דף פרק: טוען את קובץ ה-MDX המתאים
├── content/docs/           # תוכן הפרקים, קובץ MDX לכל פרק
├── content/docs-en/        # אותם פרקים באנגלית, באותם שמות קבצים
├── components/             # רכיבי ממשק: כותרת, החלפת ערכת צבע, טרמינל בדף הבית
│   └── mdx/                # רכיבים לשימוש בתוך הפרקים
├── lib/
│   ├── syllabus.ts         # רשימת הפרקים: מספר, כתובת, כותרת, תקציר ואייקון
│   ├── content.ts          # מיפוי בין שפה וכתובת של פרק לקובץ ה-MDX שלו
│   ├── i18n.ts             # שפות, כתובות, מעבר בין שפות וגודל גופן
│   └── ui.ts               # כל הטקסטים של הממשק, בעברית ובאנגלית
├── mdx-components.tsx      # עיצוב אלמנטים של Markdown ורישום הרכיבים ל-MDX
├── sources/                # מקורות המידע: references.md ו-advanced_references.md
└── CLAUDE.md               # הנחיות הפרויקט ל-Claude Code
```

<div dir="rtl">

### רכיבים זמינים בתוך MDX

| רכיב | שימוש |
| --- | --- |
| `<Callout type="note \| info \| tip \| warning">` | תיבת הערה, מידע, טיפ או אזהרה |
| `<Tabs groupId="os" items={[...]}>` + `<Tab>` | לשוניות, שמסתנכרנות בין קבוצות עם אותו `groupId` |
| `<Prompt>` | בקשה בעברית ל-Claude, עם כפתור העתקה |
| `<PromptCompare bad="..." good="..." why="..." />` | בקשה חלשה מול בקשה חזקה |
| `<Checklist id="..." items={[...]} />` | רשימת בדיקה שזוכרת את ההתקדמות |
| `<RecapCards takeaways={{...}} />` | כרטיסי סיכום עם קישור לכל פרק |
| `<Library>` + `<LibraryItem type="agent \| command \| skill \| tool" ...>` | ספריית רכיבים עם סינון לפי סוג |
| `<MiniQuiz questions={[...]} />` | חידון בסוף פרק, שמעדכן את מעקב ההתקדמות |
| `<PromptBuilder />`, `<TokenCalculator />`, `<TerminalSimulator />`, `<ClaudeConfigGenerator />` | הכלים האינטראקטיביים (עמוד 17) |
| `<Glossary />`, `<PromptHub />` | המילון וספריית הבקשות (עמודים 15 ו-16) |

בלוקי קוד מקבלים צביעת תחביר אוטומטית. כדי להוסיף תווית, כותבים `title` אחרי שם השפה, למשל ` ```bash title="macOS / Linux" `.

### הוספת פרק חדש

1. יוצרים קובץ `content/docs/NN-slug.mdx`.
2. מוסיפים את הפרק ל-`lib/syllabus.ts`, כדי שיופיע בתפריט ובדף הבית.
3. מוסיפים שורה ל-`lib/content.ts`, כדי שהדף יטען את הקובץ. פרק שרשום בסילבוס בלי קובץ מציג דף "בכתיבה".
4. לגרסה האנגלית: יוצרים `content/docs-en/NN-slug.mdx` עם אותו שם קובץ, מוסיפים כותרת ותקציר בשדה `en` ב-`lib/syllabus.ts`, ושורה במפה `en` ב-`lib/content.ts`. כדאי לשמור על אותם `id` ברשימות הבדיקה, כדי שההתקדמות תישמר בשתי השפות.

## טכנולוגיות

- [Next.js 15](https://nextjs.org) עם App Router
- [Tailwind CSS 4](https://tailwindcss.com)
- [MDX](https://mdxjs.com) עם [rehype-pretty-code](https://rehype-pretty.pages.dev) ו-[Shiki](https://shiki.style) לצביעת תחביר
- [Lucide](https://lucide.dev) לאייקונים
- [next-themes](https://github.com/pacocoursey/next-themes) למצב כהה ומצב בהיר
- [Vercel](https://vercel.com) לאחסון

## מקורות ותודות

התוכן מבוסס על [התיעוד הרשמי של Claude Code](https://code.claude.com/docs/en/overview), ושואב השראה מהמדריכים של הקהילה: [claudehero.com](https://claudehero.com), [zero2claude.dev](https://zero2claude.dev) ו-[claude-world.com](https://claude-world.com/articles/claude-code-complete-guide-2026/). הרשימה המלאה נמצאת ב-[`sources/references.md`](sources/references.md).

## הבהרה

זהו **מדריך קהילתי ולא רשמי**. הוא לא קשור ל-Anthropic או ל-Cursor, ולא נתמך או מאושר על ידן. Claude ו-Claude Code הם סימנים מסחריים של Anthropic, ו-Cursor הוא סימן מסחרי של Anysphere. Claude Code מתעדכן לעתים קרובות, ולכן חלק מהפרטים במדריך עלולים להשתנות. במקרה של סתירה, התיעוד הרשמי הוא הקובע.

</div>
