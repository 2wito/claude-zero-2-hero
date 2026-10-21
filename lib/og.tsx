import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n";

export const ogSize = { width: 1200, height: 630 };

const colors = { bg: "#0b1916", term: "#06110f", ink: "#e3eeea", muted: "#9cb4ac", accent: "#3cc4b3", sun: "#f5c15a", line: "#24403a" };

const text = {
  he: { tagline: "קלוד קוד בעברית", sub: "מדריך חינמי, מהטרמינל הראשון ועד אתר באוויר" },
  en: { tagline: "From Zero to Hero", sub: "A free, plain-language guide for beginners" },
};

export const ogAlt = {
  he: "מדריך Claude Code בעברית: קלוד קוד מ-Zero ל-Hero",
  en: "Claude Code: From Zero to Hero, a free beginner's guide",
};

// The image renderer has no bidi support and draws Hebrew left to right, so each
// all-Hebrew line is reversed here to come out in the right visual order.
const visual = (s: string, locale: Locale) => (locale === "he" ? [...s].reverse().join("") : s);

/** Fetches just the glyphs we need from Google Fonts, as TTF (the renderer can't read woff2). */
async function googleFont(family: string, chars: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(chars)}`)
  ).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Could not load font ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export async function renderOgImage(locale: Locale) {
  const t = text[locale];
  const domain = "claude-code-hebrew.com";
  const display = `Claude Code${t.tagline}`;
  const body = `$ claude${t.sub}${domain}`;
  const align = locale === "he" ? "flex-end" : "flex-start";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: align,
          padding: "72px 80px",
          background: colors.bg,
          color: colors.ink,
          fontFamily: "Plex",
          borderBottom: `12px solid ${colors.accent}`,
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            borderRadius: 14,
            background: colors.term,
            border: `2px solid ${colors.line}`,
            color: colors.sun,
            fontSize: 30,
          }}
        >
          $ claude
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: align }}>
          <div style={{ fontFamily: "Secular", fontSize: 128, lineHeight: 1 }}>Claude Code</div>
          <div style={{ fontFamily: "Secular", fontSize: 72, color: colors.accent, marginTop: 18, whiteSpace: "nowrap" }}>
            {visual(t.tagline, locale)}
          </div>
          <div style={{ fontSize: 36, color: colors.muted, marginTop: 22, whiteSpace: "nowrap" }}>
            {visual(t.sub, locale)}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: colors.muted }}>{domain}</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Secular", data: await googleFont("Secular+One", display), weight: 400 },
        { name: "Plex", data: await googleFont("IBM+Plex+Sans+Hebrew:wght@500", body), weight: 500 },
      ],
    },
  );
}
