import { Info, Lightbulb, NotebookPen, TriangleAlert } from "lucide-react";

const variants = {
  note: { icon: NotebookPen, label: "הערה", className: "border-line bg-surface-2/60", iconClass: "text-muted" },
  info: { icon: Info, label: "מידע", className: "border-accent/40 bg-accent/10", iconClass: "text-accent" },
  tip: { icon: Lightbulb, label: "טיפ", className: "border-sun/50 bg-sun/10", iconClass: "text-sun" },
  warning: {
    icon: TriangleAlert,
    label: "שימו לב",
    className: "border-red-500/40 bg-red-500/10",
    iconClass: "text-red-600 dark:text-red-400",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof variants;
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, label, className, iconClass } = variants[type];
  return (
    <aside className={`mt-6 flex gap-3 rounded-xl border p-4 ${className}`}>
      <Icon className={`mt-1 size-5 shrink-0 ${iconClass}`} aria-hidden />
      <div className="min-w-0 flex-1 leading-7 [&>*:first-child]:mt-0 [&_p]:text-base [&_li]:text-base">
        <p className="font-bold">{title ?? label}</p>
        {children}
      </div>
    </aside>
  );
}
