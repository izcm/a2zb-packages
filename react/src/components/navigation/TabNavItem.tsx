import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn.js";

type TabNavItemProps = Omit<HTMLAttributes<HTMLSpanElement>, "className"> & {
  label: () => ReactNode;
  active: boolean;
  className: (active: boolean) => string;
};

export function TabNavItem({
  label,
  active,
  className,
  ...spanProps
}: TabNavItemProps) {
  return (
    <span
      {...spanProps}
      className={cn(
        "flex-1 py-2 text-center transition-colors duration-200",
        active
          ? "border-b-2 border-accent/60 text-accent"
          : "border-soft hover:border-accent/30 text-muted",
        className?.(active),
      )}
    >
      {label()}
    </span>
  );
}
