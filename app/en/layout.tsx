import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude Code: From Zero to Hero",
  description:
    "A plain-language guide to Claude Code: from the first time you open a terminal to building websites and tools with AI.",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
