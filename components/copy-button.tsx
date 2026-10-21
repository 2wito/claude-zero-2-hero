"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({
  text,
  getText,
  className = "",
}: {
  text?: string;
  getText?: () => string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(getText ? getText() : (text ?? ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "הועתק" : "העתקה ללוח"}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${className}`}
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{copied ? "הועתק" : "העתקה"}</span>
    </button>
  );
}
