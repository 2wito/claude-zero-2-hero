import type { Metadata } from "next";
import { NotFoundView } from "@/components/not-found-view";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: ui.he.notFound.title, robots: { index: false } };

export default function NotFound() {
  return <NotFoundView locale="he" />;
}
