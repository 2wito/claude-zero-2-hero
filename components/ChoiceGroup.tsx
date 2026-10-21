"use client";

import { useId } from "react";

type Option = { id: string; label: string };

const pill = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm ${
    active ? "border-accent bg-accent text-accent-ink" : "border-line text-ink hover:border-accent"
  }`;

/** Single-choice pill group (radio semantics). */
export function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <p id={id} className="text-sm font-bold">
        {label}
      </p>
      <div role="radiogroup" aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={value === o.id}
            onClick={() => onChange(o.id)}
            className={pill(value === o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Multi-choice pill group (checkbox semantics). */
export function ToggleGroup({
  label,
  options,
  values,
  onToggle,
}: {
  label: string;
  options: Option[];
  values: string[];
  onToggle: (id: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <p id={id} className="text-sm font-bold">
        {label}
      </p>
      <div role="group" aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = values.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => onToggle(o.id)}
              className={pill(on)}
            >
              {on ? "✓ " : "+ "}
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
