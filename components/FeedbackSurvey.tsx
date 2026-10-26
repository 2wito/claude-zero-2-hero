"use client";

import { useId, useState, type FormEvent } from "react";
import { ChoiceGroup } from "@/components/ChoiceGroup";
import { useLocale } from "@/components/use-locale";

// Responses go to Formspree, which emails them and keeps them in its dashboard (formspree.io/forms).
const FORMSPREE_ID = "";

const scale = ["1", "2", "3", "4", "5"].map((id) => ({ id, label: id }));

const copy = {
  he: {
    ratingsHint: "1 = גרוע, 5 = מצוין",
    ratings: { ui: "עיצוב ונוחות האתר", hebrew: "איכות העברית וההסברים", overall: "הקורס באופן כללי" },
    level: { label: "רמת הקושי", options: { easy: "קל מדי", right: "בדיוק בשבילי", hard: "קשה מדי" } },
    built: {
      label: "בניתם פרויקט משלכם בעקבות הקורס?",
      options: { yes: "כן!", progress: "באמצע", planning: "עוד לא, אבל מתכננ/ת", no: "לא" },
    },
    texts: {
      liked: "מה אהבתם?",
      disliked: "מה לא אהבתם, או מה היה חסר?",
      more: "שאלות, רעיונות, או כמה מילים חופשיות",
      project: "ספרו על הפרויקט (קישור אם יש)",
    },
    contact: "שם או אימייל (לא חובה, רק אם תרצו שאחזור אליכם)",
    submit: "שליחה",
    sending: "שולח…",
    empty: "מלאו לפחות דירוג אחד או כמה מילים לפני השליחה.",
    error: "השליחה נכשלה. נסו שוב בעוד רגע.",
    thanks: "תודה רבה! 💚 המשוב התקבל ויעזור לשפר את המדריך.",
  },
  en: {
    ratingsHint: "1 = poor, 5 = excellent",
    ratings: { ui: "Site design & usability", hebrew: "Quality of the language & explanations", overall: "The course overall" },
    level: { label: "Difficulty", options: { easy: "Too easy", right: "Just right", hard: "Too hard" } },
    built: {
      label: "Did you build a project of your own after the course?",
      options: { yes: "Yes!", progress: "In progress", planning: "Not yet, but planning to", no: "No" },
    },
    texts: {
      liked: "What did you like?",
      disliked: "What didn't you like, or what was missing?",
      more: "Questions, ideas, or a few free words",
      project: "Tell me about the project (a link if you have one)",
    },
    contact: "Name or email (optional, only if you'd like a reply)",
    submit: "Send",
    sending: "Sending…",
    empty: "Fill in at least one rating or a few words before sending.",
    error: "Sending failed. Please try again in a moment.",
    thanks: "Thank you! 💚 Your feedback was received and will help improve the guide.",
  },
};

type Status = "idle" | "sending" | "sent" | "error" | "empty";

const toOptions = (map: Record<string, string>) => Object.entries(map).map(([id, label]) => ({ id, label }));

/** End-of-course survey: ratings, difficulty, whether they built something, and free text. */
export function FeedbackSurvey() {
  const locale = useLocale();
  const t = copy[locale];
  const baseId = useId();
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const choose = (key: string) => (id: string) => setChoices((c) => ({ ...c, [key]: id }));
  const write = (key: string, value: string) => setTexts((x) => ({ ...x, [key]: value }));
  const builtSomething = choices.built === "yes" || choices.built === "progress";

  async function submit(e: FormEvent) {
    e.preventDefault();
    const filled = Object.fromEntries(Object.entries(texts).filter(([, v]) => v.trim()));
    if (!Object.keys(choices).length && !Object.keys(filled).length) return setStatus("empty");
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ locale, ...choices, ...filled }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="mt-6 rounded-2xl border border-accent/50 bg-accent/[0.07] p-6 text-lg leading-8">
        {t.thanks}
      </p>
    );
  }

  const field = (key: keyof typeof t.texts) => (
    <div key={key}>
      <label htmlFor={`${baseId}-${key}`} className="text-sm font-bold">
        {t.texts[key]}
      </label>
      <textarea
        id={`${baseId}-${key}`}
        rows={3}
        value={texts[key] ?? ""}
        onChange={(e) => write(key, e.target.value)}
        className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2 leading-7"
      />
    </div>
  );

  return (
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="grid gap-6">
        <p className="text-sm text-muted">{t.ratingsHint}</p>
        {(Object.keys(t.ratings) as (keyof typeof t.ratings)[]).map((key) => (
          <ChoiceGroup key={key} label={t.ratings[key]} options={scale} value={choices[key] ?? ""} onChange={choose(key)} />
        ))}
        <ChoiceGroup label={t.level.label} options={toOptions(t.level.options)} value={choices.level ?? ""} onChange={choose("level")} />
        <ChoiceGroup label={t.built.label} options={toOptions(t.built.options)} value={choices.built ?? ""} onChange={choose("built")} />
        {builtSomething && field("project")}
        {field("liked")}
        {field("disliked")}
        {field("more")}
        <div>
          <label htmlFor={`${baseId}-contact`} className="text-sm font-bold">
            {t.contact}
          </label>
          <input
            id={`${baseId}-contact`}
            value={texts.contact ?? ""}
            onChange={(e) => write("contact", e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-6 py-2.5 font-medium text-accent-ink hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
          {(status === "error" || status === "empty") && (
            <p role="alert" className="text-sm text-sun">
              {status === "error" ? t.error : t.empty}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
