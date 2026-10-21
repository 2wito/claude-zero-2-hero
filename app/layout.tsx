import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Hebrew, Secular_One } from "next/font/google";
import { HtmlLocaleSync } from "@/components/html-locale-sync";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { bootScript } from "@/lib/i18n";
import "./globals.css";

const plex = IBM_Plex_Sans_Hebrew({
  variable: "--font-plex",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
});

const secular = Secular_One({
  variable: "--font-secular",
  subsets: ["hebrew", "latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.claude-code-hebrew.com"),
  title: "Claude Code בעברית: מ-Zero ל-Hero",
  description:
    "מדריך בעברית פשוטה ללמוד Claude Code: מהפעם הראשונה שפותחים טרמינל ועד בניית אתרים וכלים עם בינה מלאכותית.",
  openGraph: {
    siteName: "Claude Code בעברית",
    locale: "he_IL",
    type: "website",
  },
};

// Hebrew is the default. English pages (/en/...) get lang="en" dir="ltr" from bootScript before paint,
// and HtmlLocaleSync keeps it right on client-side navigation.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className={`${plex.variable} ${secular.variable} ${plexMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <HtmlLocaleSync />
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
