import { RootShell } from "@/components/root-shell";
import { rootMetadata } from "@/lib/seo";

export const metadata = rootMetadata("he");

export default function HebrewRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="he">{children}</RootShell>;
}
