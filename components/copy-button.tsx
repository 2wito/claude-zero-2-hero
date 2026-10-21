"use client";

import { Check, Copy, X } from "lucide-react";
import { useState } from "react";

// navigator.clipboard only exists in secure contexts (https, localhost). Fall back to a hidden
// textarea + execCommand so copying still works on e.g. a LAN address over http.
async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

export function CopyButton({
  text,
  getText,
  className = "",
}: {
  text?: string;
  getText?: () => string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    const ok = await writeClipboard(getText ? getText() : (text ?? ""));
    setStatus(ok ? "copied" : "failed");
    setTimeout(() => setStatus("idle"), 1800);
  }

  const label = status === "copied" ? "הועתק" : status === "failed" ? "לא הועתק" : "העתקה";

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={status === "idle" ? "העתקה ללוח" : label}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium ${className}`}
    >
      {status === "copied" ? (
        <Check className="size-3.5" aria-hidden />
      ) : status === "failed" ? (
        <X className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      <span aria-live="polite">{label}</span>
    </button>
  );
}
