import type { ComponentType } from "react";

import { cn } from "@/lib/utils/cn.js";

export type ActionBarItem = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

type Props = {
  items: ActionBarItem[];
  /** "compact" renders circular icon-only buttons; "labeled" renders a row of icon + text buttons. */
  variant?: "compact" | "labeled";
  className?: string;
};

export function ActionBar({ items, variant = "labeled", className }: Props) {
  const itemClasses =
    variant === "compact"
      ? "w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-soft hover:scale-108 transition-transform flex items-center justify-center shrink-0"
      : "btn btn-ghost flex items-center justify-center gap-3 w-full sm:w-auto py-3 px-6";
  const iconClasses = variant === "compact" ? "" : "w-4 h-4 opacity-80";

  return (
    <div
      className={cn(
        variant === "compact"
          ? "flex gap-4 shrink-0"
          : "flex flex-col sm:flex-row gap-3 sm:gap-4",
        className,
      )}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        const classes = cn(
          itemClasses,
          item.onClick && "cursor-pointer",
          item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        );

        return item.onClick ? (
          <button key={i} disabled={item.disabled} onClick={item.onClick} className={classes}>
            <Icon className={iconClasses} />
            {variant === "labeled" && <span>{item.label}</span>}
          </button>
        ) : (
          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className={classes}>
            <Icon className={iconClasses} />
            {variant === "labeled" && <span>{item.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
