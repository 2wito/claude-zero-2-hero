import { RootShell } from "@/components/root-shell";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata("en");

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
