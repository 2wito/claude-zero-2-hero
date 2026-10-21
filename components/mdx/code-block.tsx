"use client";

import { useRef } from "react";
import { CopyButton } from "@/components/copy-button";

const languageLabels: Record<string, string> = {
  bash: "Terminal",
  sh: "Terminal",
  zsh: "Terminal",
  powershell: "PowerShell",
  bat: "CMD",
  json: "JSON",
  text: "",
  plaintext: "",
};

export function CodeBlock({
  title,
  language,
  children,
}: {
  title?: React.ReactNode;
  language?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const label = title ?? (language ? (languageLabels[language] ?? language) : "");

  return (
    <div className="mt-5 overflow-hidden rounded-xl bg-term text-term-ink ring-1 ring-black/5 dark:ring-white/10">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 ps-4 pe-2">
        <span className="truncate text-xs text-term-dim">{label}</span>
        <CopyButton getText={() => ref.current?.innerText.trim() ?? ""} className="text-term-ink hover:bg-white/10" />
      </div>
      <div ref={ref} dir="ltr" className="code-body overflow-x-auto text-left">
        {children}
      </div>
    </div>
  );
}
