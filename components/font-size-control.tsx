"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { FONT_SCALE_KEY, fontScales } from "@/lib/i18n";
import { useUi } from "@/components/use-locale";

/** Text-size picker. Scales the root font size, so every rem-based size on the site grows with it. */
export function FontSizeControl() {
  const t = useUi().fontSize;
  const [scale, setScale] = useState<string>(fontScales[0]);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FONT_SCALE_KEY);
      if (saved && (fontScales as readonly string[]).includes(saved)) setScale(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  function choose(value: string) {
    setScale(value);
    document.documentElement.style.fontSize = value === fontScales[0] ? "" : value;
    try {
      if (value === fontScales[0]) localStorage.removeItem(FONT_SCALE_KEY);
      else localStorage.setItem(FONT_SCALE_KEY, value);
    } catch {}
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={t.button}
        title={t.button}
        onClick={() => setOpen((o) => !o)}
        className="grid h-10 min-w-10 place-items-center rounded-full border border-line px-2 font-bold text-ink hover:bg-surface-2"
      >
        <span aria-hidden className="leading-none">
          <span className="text-xs">A</span>
          <span className="text-base">A</span>
        </span>
      </button>
      {open && (
        <div
          id={menuId}
          role="radiogroup"
          aria-label={t.button}
          className="absolute end-0 top-12 z-50 w-48 rounded-xl border border-line bg-surface p-1.5 shadow-lg"
        >
          {fontScales.map((value, i) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={scale === value}
              onClick={() => choose(value)}
              className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start hover:bg-surface-2"
            >
              <span style={{ fontSize: `${1 + i * 0.2}rem` }}>{t.options[i]}</span>
              {scale === value && <Check className="size-4 text-accent" aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
