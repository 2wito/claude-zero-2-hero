import { Code, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const EMAIL = "hello@claude-code-hebrew.com";
const LINKEDIN = "https://www.linkedin.com/in/itay-twito-2083812b9/";
const REPO = "https://github.com/2wito/claude-zero-2-hero";

const copy = {
  he: {
    title: "קצת עליי 🚀",
    name: "איתי טויטו",
    altName: "Itay Twito",
    facts: ["בן 26", "⁦B.Sc.⁩ במדעי המחשב", "סטארטאפ בתל אביב"],
    paragraphs: [
      "אני בעל תואר ראשון במדעי המחשב (⁦B.Sc.⁩), עובד בסטארטאפ בתל אביב, ובונה אתרים, אפליקציות והמון פרויקטי צד – לחברים, למשפחה, בעבודה ובחיים הפרטיים לכיף.",
      "הרבה חברים ואנשים מהעבודה ראו שאני שולט טוב ובקיא ב-Claude Code ובכל העדכונים החמים שלו וביקשו את עזרתי. לאחר עשרות אתרים, אפליקציות ופרויקטים שבניתי, החלטתי להעביר את המידע שצברתי (בעזרת האינטרנט כמובן ובעזרת Claude בעצמו) וליצור את 'המדריך לטרמפיסט בגלקסיית ⁦Claude Code⁩'.",
      "המדריך מקיף ונועד גם למי שלא נגע בחיים שלו בקוד או בטרמינל, וגם למתכנתים שרוצים להתפתח, לשמור על הכישורים שלהם ולהיות מעודכנים בכל העדכונים החדשים שיוצאים בקצב מטורף. המדריך הוא חינמי לחלוטין ומוקדש באהבה לחברים, למשפחה ולקהל הרחב.",
    ],
    signoff: "אם אהבתם ונהניתם אשמח לשמוע, ואם יש הצעות שיפור וייעול – כמובן שאשמח לקבל וללמוד! תהנו ותיצרו! ✨",
    links: { email: "אימייל", linkedin: "LinkedIn", code: "קוד המקור" },
  },
  en: {
    title: "About me 🚀",
    name: "Itay Twito",
    altName: "איתי טויטו",
    facts: ["26", "B.Sc. in Computer Science", "Tel Aviv startup"],
    paragraphs: [
      "I have a B.Sc. in Computer Science, work at a startup in Tel Aviv, and build websites, apps and lots of side projects: for friends, for family, at work, and just for fun.",
      "Many friends and colleagues noticed I know Claude Code well and keep up with its latest updates, and asked for my help. After building dozens of sites, apps and projects, I decided to pass on what I'd learned (with help from the internet, of course, and from Claude itself) and create “The Hitchhiker's Guide to the Claude Code Galaxy”.",
      "The guide is comprehensive. It's for people who have never touched code or a terminal, and for developers who want to grow, keep their skills sharp and stay on top of updates that ship at a crazy pace. It's completely free, and dedicated with love to friends, family and everyone else.",
    ],
    signoff: "If you enjoyed it, I'd love to hear from you, and if you have ideas for improvements, I'll gladly take them and learn! Enjoy, and go build! ✨",
    links: { email: "Email", linkedin: "LinkedIn", code: "Source code" },
  },
};

function LinkedinIcon({ className }: { className?: string }) {
  // Lucide no longer ships brand logos, so this is the LinkedIn mark drawn inline.
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
    { href: REPO, label: t.links.code, detail: "GitHub", Icon: Code, external: true },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-20 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 rounded-3xl border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
        <div>
          <div
            className="grid size-20 place-items-center rounded-full bg-accent font-display text-2xl text-accent-ink"
            aria-hidden
          >
            IT
          </div>
          <h2 id="about-title" className="mt-6 font-display text-3xl leading-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-xl font-bold">{t.name}</p>
          <p className="text-muted" lang={locale === "he" ? "en" : "he"}>
            {t.altName}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            {t.facts.map((fact) => (
              <li key={fact} className="rounded-full bg-surface-2 px-3 py-1">
                {fact}
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-2">
            {links.map(({ href, label, detail, Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-2"
                >
                  <Icon className="size-5 shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block font-medium">{label}</span>
                    <span dir="ltr" className="block text-sm text-muted [overflow-wrap:anywhere]">
                      {detail}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-2xl space-y-5 text-lg leading-8">
          {t.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="border-s-2 border-accent ps-4 font-medium">{t.signoff}</p>
        </div>
      </div>
    </section>
  );
}
