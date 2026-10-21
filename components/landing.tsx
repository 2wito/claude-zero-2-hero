import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  Bot,
  Bug,
  Calculator,
  Columns2,
  Download,
  FileCode2,
  GitBranch,
  Globe,
  GraduationCap,
  Hammer,
  Heart,
  Library,
  Lightbulb,
  MessageSquare,
  MessagesSquare,
  MonitorSmartphone,
  Rocket,
  Sparkles,
  SquareTerminal,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AboutSection } from "@/components/AboutSection";
import { HeroTerminal } from "@/components/hero-terminal";
import { OsTabs } from "@/components/os-tabs";
import { docHref, type Locale } from "@/lib/i18n";
import { chapters, chapterText, type Chapter } from "@/lib/syllabus";

const chapterIcons: Record<Chapter["icon"], LucideIcon> = {
  BookOpen,
  Download,
  MessageSquare,
  Lightbulb,
  Bug,
  Hammer,
  Columns2,
  GitBranch,
  Globe,
  Rocket,
  Sparkles,
  Bot,
  MonitorSmartphone,
  Library,
  BookMarked,
  Calculator,
  MessagesSquare,
};

const copy = {
  he: {
    hero: {
      title: (
        <>
          ללמוד <span className="whitespace-nowrap">Claude Code</span>{" "}
          <span className="whitespace-nowrap">מ-Zero ל-Hero</span>
        </>
      ),
      body: "מדריך בעברית פשוטה, מהפעם הראשונה שפותחים טרמינל ועד שבונים אתרים וכלים בעזרת בינה מלאכותית. לא צריך לדעת לתכנת. צריך רק סקרנות.",
      start: "להתחיל ללמוד",
      all: "לראות את כל הפרקים",
      meta: (n: number) => `${n} פרקים, הוראות לכל מערכת הפעלה, ועבודה משולבת עם Cursor.`,
    },
    features: {
      title: "למה Claude Code משנה את כללי המשחק",
      body: "צ'אט רגיל נותן לכם קוד להעתיק. Claude Code עובד בתוך התיקייה שלכם: קורא קבצים, כותב אותם, מריץ פקודות ומתקן את עצמו, ואתם מאשרים כל שינוי.",
      ask: {
        title: "מבקשים בעברית, מקבלים עבודה גמורה",
        items: [
          "מתארים מה רוצים במילים שלכם, בלי לדעת שום שפת תכנות.",
          "Claude מתכנן, יוצר ועורך קבצים בפרויקט האמיתי, לא בחלון צ'אט.",
          "כשמשהו נשבר, הוא קורא את הודעת השגיאה ומתקן לבד.",
        ],
      },
      cursor: {
        title: "יד ביד עם Cursor",
        body: "העורך מצד אחד, Claude בטרמינל מהצד השני. רואים כל שינוי מופיע בקבצים בזמן אמת, ומחליטים מה נשאר.",
      },
      os: { title: "עובד על כל מחשב", body: "לכל שלב יש הוראות נפרדות ל-Windows, ל-Mac ול-Linux. ככה נראית ההתקנה:" },
    },
    syllabus: {
      title: (n: number) => `${n} פרקים, צעד אחר צעד`,
      body: (core: number, bonus: number) =>
        `${core} פרקי המסלול הבסיסי בונים זה על זה. ${bonus} פרקי ההעשרה מעמיקים, ובסוף יש מילון, ספריית בקשות וכלים אינטראקטיביים.`,
      start: "להתחיל מפרק 1",
      core: "המסלול הבסיסי",
      bonus: "פרקי העשרה למתקדמים",
      resources: "עזרים וכלים",
    },
    audience: {
      title: "כתבנו את זה בשבילכם",
      items: [
        {
          title: "מתחילים מאפס",
          body: "אף פעם לא פתחתם טרמינל? מצוין. מתחילים מהבסיס: מה זה החלון השחור עם הטקסט, איך מקלידים בו את הפקודה הראשונה, ולמה אי אפשר באמת לקלקל משהו.",
          path: "מומלץ להתחיל: פרקים 1 עד 4",
        },
        {
          title: "חברים שכבר כותבים קוד",
          body: "כבר עובדים עם Cursor או VS Code? הפרקים על CLAUDE.md, MCP וזרימת העבודה המשולבת יחסכו לכם שעות בכל שבוע, ויראו לכם איפה Claude באמת חזק.",
          path: "מומלץ לקפוץ: פרקים 4 ו-5, ואז 7 עד 9",
        },
        {
          title: "המשפחה",
          body: "רוצים אתר לעסק, כלי קטן לסדר קבצים או אפליקציה מרעיון שמסתובב לכם בראש? כל פרק כתוב בשפה של בני אדם, עם דוגמאות מהחיים ולא ממדעי המחשב.",
          path: "מומלץ ללכת לפי הסדר, פרק בכל ערב",
        },
      ],
    },
    cta: { title: "הפרק הראשון לוקח 15 דקות", body: "בסופו תבינו מה Claude Code יודע לעשות, ותדעו אם זה בשבילכם.", start: "להתחיל ללמוד" },
    footer: ["נכתב באהבה לחברים ולמשפחה.", "מדריך קהילתי, לא תיעוד רשמי של Anthropic."],
  },
  en: {
    hero: {
      title: (
        <>
          Learn <span className="whitespace-nowrap">Claude Code</span>{" "}
          from <span className="whitespace-nowrap">Zero to Hero</span>
        </>
      ),
      body: "A plain-language guide, from the first time you open a terminal to building websites and tools with AI. No coding experience needed. Just curiosity.",
      start: "Start learning",
      all: "See all chapters",
      meta: (n: number) => `${n} chapters, instructions for every operating system, and a Cursor workflow.`,
    },
    features: {
      title: "Why Claude Code changes the game",
      body: "A regular chat hands you code to copy. Claude Code works inside your folder: it reads files, writes them, runs commands and fixes its own mistakes, and you approve every change.",
      ask: {
        title: "Ask in plain words, get finished work",
        items: [
          "Describe what you want in your own words, no programming language required.",
          "Claude plans, creates and edits files in your real project, not in a chat window.",
          "When something breaks, it reads the error message and fixes it.",
        ],
      },
      cursor: {
        title: "Hand in hand with Cursor",
        body: "The editor on one side, Claude in the terminal on the other. Watch every change land in your files in real time, and decide what stays.",
      },
      os: { title: "Works on any computer", body: "Every step has separate instructions for Windows, Mac and Linux. Here's the install:" },
    },
    syllabus: {
      title: (n: number) => `${n} chapters, step by step`,
      body: (core: number, bonus: number) =>
        `The ${core} core chapters build on each other. ${bonus} advanced chapters go deeper, followed by a glossary, a prompt library and interactive tools.`,
      start: "Start with chapter 1",
      core: "Core path",
      bonus: "Advanced chapters",
      resources: "Resources & tools",
    },
    audience: {
      title: "Written for you",
      items: [
        {
          title: "Complete beginners",
          body: "Never opened a terminal? Perfect. We start from the basics: what that black window with text is, how to type your first command, and why you can't really break anything.",
          path: "Start with chapters 1–4",
        },
        {
          title: "Friends who already code",
          body: "Already using Cursor or VS Code? The chapters on CLAUDE.md, MCP and the combined workflow will save you hours every week, and show you where Claude really shines.",
          path: "Jump to chapters 4 and 5, then 7–9",
        },
        {
          title: "Family",
          body: "Want a site for a business, a small tool to tidy files, or an app from an idea you can't shake? Every chapter is written for humans, with real-life examples, not computer science.",
          path: "Go in order, one chapter an evening",
        },
      ],
    },
    cta: { title: "The first chapter takes 15 minutes", body: "By the end you'll know what Claude Code can do, and whether it's for you.", start: "Start learning" },
    footer: ["Written with love for friends and family.", "A community guide, not official Anthropic documentation."],
  },
};

type Copy = (typeof copy)["he"];

export function Landing({ locale }: { locale: Locale }) {
  const c = copy[locale] as Copy;
  const Forward = locale === "en" ? ArrowRight : ArrowLeft;
  const first = docHref(locale, chapters[0].slug);

  return (
    <main>
      <Hero c={c} first={first} Forward={Forward} />
      <Features c={c} />
      <Syllabus c={c} locale={locale} first={first} Forward={Forward} />
      <Audience c={c} />
      <AboutSection locale={locale} />
      <ClosingCta c={c} first={first} Forward={Forward} />
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>{c.footer[0]}</p>
          <p>{c.footer[1]}</p>
        </div>
      </footer>
    </main>
  );
}

type Nav = { c: Copy; first: string; Forward: LucideIcon };

function Hero({ c, first, Forward }: Nav) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24">
      <div>
        <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-balance min-[400px]:text-5xl sm:text-6xl lg:text-7xl">
          {c.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{c.hero.body}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={first}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-accent-ink hover:opacity-90"
          >
            {c.hero.start}
            <Forward className="size-4" aria-hidden />
          </Link>
          <a href="#syllabus" className="rounded-full px-5 py-3.5 font-medium text-ink hover:bg-surface-2">
            {c.hero.all}
          </a>
        </div>
        <p className="mt-8 text-sm text-muted">{c.hero.meta(chapters.length)}</p>
      </div>
      <HeroTerminal />
    </section>
  );
}

function Features({ c }: { c: Copy }) {
  const f = c.features;
  return (
    <section aria-labelledby="features-title" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="features-title" className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
          {f.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{f.body}</p>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-line bg-bg p-7">
            <FileCode2 className="size-7 text-accent" aria-hidden />
            <h3 className="mt-5 text-xl font-bold">{f.ask.title}</h3>
            <ul className="mt-4 space-y-3 leading-7 text-muted">
              {f.ask.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-line bg-bg p-7">
            <Columns2 className="size-7 text-accent" aria-hidden />
            <h3 className="mt-5 text-xl font-bold">{f.cursor.title}</h3>
            <p className="mt-4 leading-7 text-muted">{f.cursor.body}</p>
            <div className="mt-6 grid grid-cols-[1fr_1.2fr] gap-2 text-[11px]" dir="ltr" aria-hidden>
              <div className="rounded-lg border border-line bg-surface p-2.5 font-mono text-muted">
                <div className="mb-2 text-[10px]">page.tsx</div>
                <div className="h-1.5 w-4/5 rounded bg-line" />
                <div className="mt-1.5 h-1.5 w-3/5 rounded bg-accent/50" />
                <div className="mt-1.5 h-1.5 w-2/3 rounded bg-accent/50" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded bg-line" />
              </div>
              <div className="rounded-lg bg-term p-2.5 font-mono text-term-ink">
                <div className="text-[10px] text-term-dim">claude</div>
                <div className="mt-2">
                  <span className="text-sun">●</span> Edit page.tsx
                </div>
                <div className="mt-1 text-term-dim">+2 lines</div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-line bg-bg p-7">
            <SquareTerminal className="size-7 text-accent" aria-hidden />
            <h3 className="mt-5 text-xl font-bold">{f.os.title}</h3>
            <p className="mt-4 mb-6 leading-7 text-muted">{f.os.body}</p>
            <OsTabs />
          </article>
        </div>
      </div>
    </section>
  );
}

function Syllabus({ c, locale, first, Forward }: Nav & { locale: Locale }) {
  const s = c.syllabus;
  const core = chapters.filter((chapter) => chapter.number <= 10);
  const bonus = chapters.filter((chapter) => chapter.number > 10 && chapter.number <= 14);
  const resources = chapters.filter((chapter) => chapter.number > 14);

  return (
    <section id="syllabus" aria-labelledby="syllabus-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="syllabus-title" className="font-display text-3xl leading-tight sm:text-4xl">
              {s.title(chapters.length)}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">{s.body(core.length, bonus.length)}</p>
          </div>
          <Link href={first} className="inline-flex items-center gap-2 font-medium text-accent hover:underline">
            {s.start}
            <Forward className="size-4" aria-hidden />
          </Link>
        </div>

        <h3 className="mt-12 text-lg font-bold">{s.core}</h3>
        <ChapterGrid items={core} locale={locale} className="mt-4 lg:grid-cols-5" />

        <h3 className="mt-12 text-lg font-bold">{s.bonus}</h3>
        <ChapterGrid items={bonus} locale={locale} className="mt-4 lg:grid-cols-4" />

        <h3 className="mt-12 text-lg font-bold">{s.resources}</h3>
        <ChapterGrid items={resources} locale={locale} className="mt-4 lg:grid-cols-3" />
      </div>
    </section>
  );
}

function ChapterGrid({ items, locale, className }: { items: Chapter[]; locale: Locale; className: string }) {
  return (
    <ol className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 ${className}`}>
      {items.map((chapter) => {
        const Icon = chapterIcons[chapter.icon];
        const text = chapterText(chapter, locale);
        return (
          <li key={chapter.slug} className="bg-surface">
            <Link
              href={docHref(locale, chapter.slug)}
              className="group flex h-full flex-col p-6 hover:bg-surface-2 focus-visible:-outline-offset-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-accent tabular-nums">{chapter.number}</span>
                <Icon className="size-5 text-muted group-hover:text-accent" aria-hidden />
              </div>
              <h4 className="mt-5 font-bold leading-snug">{text.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{text.summary}</p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

const audienceIcons = [GraduationCap, Users, Heart];

function Audience({ c }: { c: Copy }) {
  return (
    <section id="audience" aria-labelledby="audience-title" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="audience-title" className="font-display text-3xl leading-tight sm:text-4xl">
          {c.audience.title}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {c.audience.items.map(({ title, body, path }, i) => {
            const Icon = audienceIcons[i];
            return (
              <div key={title} className="border-t-2 border-accent pt-6">
                <Icon className="size-6 text-accent" aria-hidden />
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{body}</p>
                <p className="mt-4 text-sm font-medium">{path}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCta({ c, first, Forward }: Nav) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-3xl bg-term px-8 py-12 text-term-ink sm:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{c.cta.title}</h2>
          <p className="mt-3 max-w-lg leading-7 text-term-ink/75">{c.cta.body}</p>
        </div>
        <Link
          href={first}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-medium text-[#1d1503] hover:opacity-90"
        >
          {c.cta.start}
          <Forward className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
