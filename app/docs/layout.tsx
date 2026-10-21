import { DocsSidebar } from "@/components/docs-sidebar";
import { ProgressBar } from "@/components/ProgressTracker";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
      <DocsSidebar />
      <article className="min-w-0 max-w-3xl pb-24">
        <ProgressBar />
        {children}
      </article>
    </div>
  );
}
