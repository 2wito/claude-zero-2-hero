import { renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

// A fixed address (/og/he, /og/en) so every page can reference the same social image.
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOgImage(locale === "en" ? "en" : "he");
}
