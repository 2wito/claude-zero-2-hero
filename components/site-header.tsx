import Link from "next/link";
import { SquareTerminal } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg">
          <SquareTerminal className="size-6 text-accent" aria-hidden />
          <span>
            Claude Code <span className="text-muted">בעברית</span>
          </span>
        </Link>
        <nav className="ms-auto flex items-center gap-1 text-sm sm:gap-2">
          <Link href="/#syllabus" className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:block">
            סילבוס
          </Link>
          <Link href="/#audience" className="hidden rounded-full px-3 py-2 text-muted hover:text-ink sm:block">
            למי זה מתאים
          </Link>
          <Link
            href="/docs/01-introduction"
            className="rounded-full px-3 py-2 font-medium text-accent hover:bg-surface-2"
          >
            למדריך
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
