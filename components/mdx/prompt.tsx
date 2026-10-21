import { CopyButton } from "@/components/copy-button";

/** A request typed to Claude, shown RTL so Hebrew prompts read naturally. */
export function Prompt({ children }: { children: string }) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl bg-term px-4 py-3 text-term-ink ring-1 ring-black/5 dark:ring-white/10">
      <span aria-hidden className="pt-0.5 font-mono text-sun">
        &gt;
      </span>
      <p className="min-w-0 flex-1 leading-7 [overflow-wrap:anywhere]">{children}</p>
      <CopyButton text={children} className="text-term-dim hover:bg-white/10 hover:text-term-ink" />
    </div>
  );
}
