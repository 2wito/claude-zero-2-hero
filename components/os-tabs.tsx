"use client";

import { useState } from "react";
import { CopyButton } from "./copy-button";

const systems = [
  {
    id: "windows",
    label: "Windows",
    shell: "PowerShell",
    command: "irm https://claude.ai/install.ps1 | iex",
  },
  {
    id: "mac",
    label: "macOS",
    shell: "Terminal",
    command: "curl -fsSL https://claude.ai/install.sh | bash",
  },
  {
    id: "linux",
    label: "Linux",
    shell: "Bash",
    command: "curl -fsSL https://claude.ai/install.sh | bash",
  },
];

export function OsTabs() {
  const [active, setActive] = useState(systems[0].id);
  const current = systems.find((s) => s.id === active)!;

  return (
    <div>
      <div role="tablist" aria-label="Operating system" className="flex gap-1 rounded-full bg-surface-2 p-1">
        {systems.map((s) => (
          <button
            key={s.id}
            role="tab"
            type="button"
            id={`tab-${s.id}`}
            aria-selected={s.id === active}
            aria-controls="os-panel"
            onClick={() => setActive(s.id)}
            className={`min-w-0 flex-1 rounded-full px-2 py-1.5 text-sm sm:px-3 ${
              s.id === active ? "bg-surface font-medium text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div
        id="os-panel"
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="mt-3 overflow-hidden rounded-xl bg-term text-term-ink"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
          <span className="text-xs text-term-dim">{current.shell}</span>
          <CopyButton text={current.command} className="text-term-ink hover:bg-white/10" />
        </div>
        <pre dir="ltr" className="whitespace-pre-wrap break-all px-4 py-3 text-left font-mono text-[13px] leading-relaxed">
          <code>
            <span className="text-term-dim select-none">$ </span>
            {current.command}
          </code>
        </pre>
      </div>
    </div>
  );
}
