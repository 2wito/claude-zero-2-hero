import Link from "next/link";
import {
  ArrowLeft,
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
import { HeroTerminal } from "@/components/hero-terminal";
import { OsTabs } from "@/components/os-tabs";
import { chapters, type Chapter } from "@/lib/syllabus";

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

const FIRST_CHAPTER = `/docs/${chapters[0].slug}`;

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Syllabus />
      <Audience />
      <ClosingCta />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24">
      <div>
        <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          ללמוד <span className="whitespace-nowrap">Claude Code</span>{" "}
          <span className="whitespace-nowrap">מ-Zero ל-Hero</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          מדריך בעברית פשוטה, מהפעם הראשונה שפותחים טרמינל ועד שבונים אתרים וכלים בעזרת בינה מלאכותית. לא צריך לדעת
          לתכנת. צריך רק סקרנות.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={FIRST_CHAPTER}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-accent-ink hover:opacity-90"
          >
            להתחיל ללמוד
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <a href="#syllabus" className="rounded-full px-5 py-3.5 font-medium text-ink hover:bg-surface-2">
            לראות את כל הפרקים
          </a>
        </div>
        <p className="mt-8 text-sm text-muted">17 פרקים, הוראות לכל מערכת הפעלה, ועבודה משולבת עם Cursor.</p>
      </div>
      <HeroTerminal />
    </section>
  );
}

function Features() {
  return (
    <section aria-labelledby="features-title" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="features-title" className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
          למה Claude Code משנה את כללי המשחק
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          צ&apos;אט רגיל נותן לכם קוד להעתיק. Claude Code עובד בתוך התיקייה שלכם: קורא קבצים, כותב אותם, מריץ פקודות
          ומתקן את עצמו, ואתם מאשרים כל שינוי.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-line bg-bg p-7 lg:col-span-1">
            <FileCode2 className="size-7 text-accent" aria-hidden />
            <h3 className="mt-5 text-xl font-bold">מבקשים בעברית, מקבלים עבודה גמורה</h3>
            <ul className="mt-4 space-y-3 leading-7 text-muted">
              <li>מתארים מה רוצים במילים שלכם, בלי לדעת שום שפת תכנות.</li>
              <li>Claude מתכנן, יוצר ועורך קבצים בפרויקט האמיתי, לא בחלון צ&apos;אט.</li>
              <li>כשמשהו נשבר, הוא קורא את הודעת השגיאה ומתקן לבד.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-line bg-bg p-7">
            <Columns2 className="size-7 text-accent" aria-hidden />
            <h3 className="mt-5 text-xl font-bold">יד ביד עם Cursor</h3>
            <p className="mt-4 leading-7 text-muted">
              העורך מצד אחד, Claude בטרמינל מהצד השני. רואים כל שינוי מופיע בקבצים בזמן אמת, ומחליטים מה נשאר.
            </p>
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
            <h3 className="mt-5 text-xl font-bold">עובד על כל מחשב</h3>
            <p className="mt-4 mb-6 leading-7 text-muted">
              לכל שלב יש הוראות נפרדות ל-Windows, ל-Mac ול-Linux. ככה נראית ההתקנה:
            </p>
            <OsTabs />
          </article>
        </div>
      </div>
    </section>
  );
}

function Syllabus() {
  const core = chapters.filter((chapter) => chapter.number <= 10);
  const bonus = chapters.filter((chapter) => chapter.number > 10 && chapter.number <= 14);
  const resources = chapters.filter((chapter) => chapter.number > 14);

  return (
    <section id="syllabus" aria-labelledby="syllabus-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="syllabus-title" className="font-display text-3xl leading-tight sm:text-4xl">
              {chapters.length} פרקים, צעד אחר צעד
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
              {core.length} פרקי המסלול הבסיסי בונים זה על זה. {bonus.length} פרקי ההעשרה מעמיקים, ובסוף יש מילון, ספריית בקשות
              וכלים אינטראקטיביים.
            </p>
          </div>
          <Link href={FIRST_CHAPTER} className="inline-flex items-center gap-2 font-medium text-accent hover:underline">
            להתחיל מפרק 1
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
        </div>

        <h3 className="mt-12 text-lg font-bold">המסלול הבסיסי</h3>
        <ChapterGrid items={core} className="mt-4 lg:grid-cols-5" />

        <h3 className="mt-12 text-lg font-bold">פרקי העשרה למתקדמים</h3>
        <ChapterGrid items={bonus} className="mt-4 lg:grid-cols-4" />

        <h3 className="mt-12 text-lg font-bold">עזרים וכלים</h3>
        <ChapterGrid items={resources} className="mt-4 lg:grid-cols-3" />
      </div>
    </section>
  );
}

function ChapterGrid({ items, className }: { items: typeof chapters; className: string }) {
  return (
    <ol className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 ${className}`}>
      {items.map((chapter) => {
        const Icon = chapterIcons[chapter.icon];
        return (
          <li key={chapter.slug} className="bg-surface">
            <Link
              href={`/docs/${chapter.slug}`}
              className="group flex h-full flex-col p-6 hover:bg-surface-2 focus-visible:-outline-offset-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-accent tabular-nums">{chapter.number}</span>
                <Icon className="size-5 text-muted group-hover:text-accent" aria-hidden />
              </div>
              <h4 className="mt-5 font-bold leading-snug">{chapter.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{chapter.summary}</p>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

const audiences = [
  {
    icon: GraduationCap,
    title: "מתחילים מאפס",
    body: "אף פעם לא פתחתם טרמינל? מצוין. מתחילים מהבסיס: מה זה החלון השחור עם הטקסט, איך מקלידים בו את הפקודה הראשונה, ולמה אי אפשר באמת לקלקל משהו.",
    path: "מומלץ להתחיל: פרקים 1 עד 4",
  },
  {
    icon: Users,
    title: "חברים שכבר כותבים קוד",
    body: "כבר עובדים עם Cursor או VS Code? הפרקים על CLAUDE.md, MCP וזרימת העבודה המשולבת יחסכו לכם שעות בכל שבוע, ויראו לכם איפה Claude באמת חזק.",
    path: "מומלץ לקפוץ: פרקים 4 ו-5, ואז 7 עד 9",
  },
  {
    icon: Heart,
    title: "המשפחה",
    body: "רוצים אתר לעסק, כלי קטן לסדר קבצים או אפליקציה מרעיון שמסתובב לכם בראש? כל פרק כתוב בשפה של בני אדם, עם דוגמאות מהחיים ולא ממדעי המחשב.",
    path: "מומלץ ללכת לפי הסדר, פרק בכל ערב",
  },
];

function Audience() {
  return (
    <section id="audience" aria-labelledby="audience-title" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="audience-title" className="font-display text-3xl leading-tight sm:text-4xl">
          כתבנו את זה בשבילכם
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {audiences.map(({ icon: Icon, title, body, path }) => (
            <div key={title} className="border-t-2 border-accent pt-6">
              <Icon className="size-6 text-accent" aria-hidden />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{body}</p>
              <p className="mt-4 text-sm font-medium">{path}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-3xl bg-term px-8 py-12 text-term-ink sm:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">הפרק הראשון לוקח 15 דקות</h2>
          <p className="mt-3 max-w-lg leading-7 text-term-ink/75">
            בסופו תבינו מה Claude Code יודע לעשות, ותדעו אם זה בשבילכם.
          </p>
        </div>
        <Link
          href={FIRST_CHAPTER}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-medium text-[#1d1503] hover:opacity-90"
        >
          להתחיל ללמוד
          <ArrowLeft className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>נכתב באהבה לחברים ולמשפחה.</p>
        <p>מדריך קהילתי, לא תיעוד רשמי של Anthropic.</p>
      </div>
    </footer>
  );
}
