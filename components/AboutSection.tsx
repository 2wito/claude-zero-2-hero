import { Briefcase, GraduationCap, Layers, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const EMAIL = "hello@claude-code-hebrew.com";
const LINKEDIN = "https://www.linkedin.com/in/itay-twito/";

const stack = ["Next.js", "Supabase", "Tailwind CSS", "Claude Code", "Cursor"];

// ⁦…⁩ isolate Latin terms like "B.Sc." so their punctuation doesn't flip inside Hebrew text.
const copy = {
  he: {
    title: "קצת עליי",
    name: "איתי טויטו",
    altName: "Itay Twito",
    highlights: [
      { Icon: GraduationCap, text: "בוגר ⁦B.Sc.⁩ במדעי המחשב, ממוצע 96 ורשימת דיקן" },
      { Icon: Briefcase, text: "עובד בסטארטאפ בתל אביב" },
      { Icon: Layers, text: "מפתח Full-stack שבונה אפליקציות ווב מודרניות" },
    ],
    stackLabel: "הסטאק שלי",
    story: [
      "אני חי ונושם פיתוח עכשווי, וכלי Agentic Coding כמו Claude Code ו-Cursor הפכו לחלק מרכזי ב-Workflow היומיומי שלי.",
      "אחרי שבניתי עשרות פרויקטים ומערכות, החלטתי לרכז את כל הידע צעד-אחר-צעד ב'מדריך ל-⁦Claude Code⁩ בעברית' – משאב חינמי ומקיף שנועד לעזור גם למתחילים מאפס וגם למתכנתים מנוסים להרים פרויקטים במהירות שיא.",
    ],
    signoff: "מוזמנים לעיין, ליצור ולשתף פידבק!",
    links: { email: "אימייל", linkedin: "LinkedIn" },
  },
  en: {
    title: "About me",
    name: "Itay Twito",
    altName: "איתי טויטו",
    highlights: [
      { Icon: GraduationCap, text: "B.Sc. in Computer Science, GPA 96, Dean's List" },
      { Icon: Briefcase, text: "Working at a startup in Tel Aviv" },
      { Icon: Layers, text: "Full-stack developer building modern web apps" },
    ],
    stackLabel: "My stack",
    story: [
      "I live and breathe modern development, and agentic coding tools like Claude Code and Cursor have become a core part of my daily workflow.",
      "After building dozens of projects and systems, I decided to gather everything I know, step by step, into this Claude Code guide: a free, comprehensive resource that helps both complete beginners and experienced developers ship projects at record speed.",
    ],
    signoff: "Take a look, build something, and share your feedback!",
    links: { email: "Email", linkedin: "LinkedIn" },
  },
};

// Lucide no longer ships brand logos, so the LinkedIn mark is drawn inline.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function AboutSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const links = [
    { href: `mailto:${EMAIL}`, label: t.links.email, detail: EMAIL, Icon: Mail },
    { href: LINKEDIN, label: t.links.linkedin, detail: "itay-twito", Icon: LinkedinIcon, external: true },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 id="about-title" className="font-display text-3xl leading-tight sm:text-4xl">
          {t.title}
        </h2>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <div className="flex items-center gap-4">
              <div
                className="grid size-16 shrink-0 place-items-center rounded-full bg-accent font-display text-xl text-accent-ink"
                aria-hidden
              >
                IT
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold">{t.name}</p>
                <p className="text-muted" lang={locale === "he" ? "en" : "he"}>
                  {t.altName}
                </p>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {t.highlights.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 leading-7">
                  <Icon className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted">{t.stackLabel}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {stack.map((tool) => (
                <li
                  key={tool}
                  dir="ltr"
                  className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-sm text-ink"
                >
                  {tool}
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-1 border-t border-line pt-5">
              {links.map(({ href, label, detail, Icon, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-2"
                  >
                    <Icon className="size-5 shrink-0 text-accent" />
                    <span className="font-medium">{label}</span>
                    <span dir="ltr" className="ms-auto min-w-0 text-sm text-muted [overflow-wrap:anywhere]">
                      {detail}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-2xl space-y-5 text-lg leading-8">
            {t.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="border-s-2 border-accent ps-4 font-medium">{t.signoff}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
