"use client";

import { Children, isValidElement, useEffect, useId, useState } from "react";

const STORAGE_PREFIX = "tabs:";
const SYNC_EVENT = "tabs-sync";

/**
 * Tabbed content. Children are <Tab> elements, matched to `items` by order.
 * Tabs that share a `groupId` stay in sync across the page and are remembered between visits,
 * so picking "Windows" once applies to every OS tab group.
 */
export function Tabs({
  items,
  groupId,
  children,
}: {
  items: string[];
  groupId?: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const panels = Children.toArray(children).filter(isValidElement);

  useEffect(() => {
    if (!groupId) return;
    const apply = (label: string | null) => {
      const index = label ? items.indexOf(label) : -1;
      if (index >= 0) setActive(index);
    };
    try {
      apply(localStorage.getItem(STORAGE_PREFIX + groupId));
    } catch {}
    const onSync = (e: Event) => {
      const { group, label } = (e as CustomEvent<{ group: string; label: string }>).detail;
      if (group === groupId) apply(label);
    };
    window.addEventListener(SYNC_EVENT, onSync);
    return () => window.removeEventListener(SYNC_EVENT, onSync);
  }, [groupId, items]);

  function select(index: number) {
    setActive(index);
    if (!groupId) return;
    try {
      localStorage.setItem(STORAGE_PREFIX + groupId, items[index]);
    } catch {}
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { group: groupId, label: items[index] } }));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    // RTL: the left arrow moves to the next tab.
    const step = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + items.length) % items.length;
    select(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div className="mt-6">
      <div role="tablist" onKeyDown={onKeyDown} className="flex flex-wrap gap-1 rounded-xl bg-surface-2 p-1">
        {items.map((label, i) => (
          <button
            key={label}
            id={`${baseId}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm whitespace-nowrap ${
              i === active ? "bg-surface font-medium text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div
          key={i}
          id={`${baseId}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          className="[&>*:first-child]:mt-3"
        >
          {panel}
        </div>
      ))}
    </div>
  );
}

export function Tab({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
