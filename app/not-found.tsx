import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-sm text-muted" dir="ltr">
        $ cd page-that-does-not-exist
      </p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">הדף לא נמצא</h1>
      <p className="mt-5 text-lg leading-8 text-muted">
        הכתובת לא קיימת, או שהפרק עבר מקום. אפשר לחזור לדף הבית, או להתחיל מהפרק הראשון.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/docs/01-introduction"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-ink hover:opacity-90"
        >
          לפרק הראשון
          <ArrowLeft className="size-4" aria-hidden />
        </Link>
        <Link href="/" className="rounded-full px-5 py-3 font-medium hover:bg-surface-2">
          לדף הבית
        </Link>
      </div>
    </main>
  );
}
