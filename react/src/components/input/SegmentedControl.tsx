import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn.js";

export type SegmentedControlOption<T extends string> = {
  label: ReactNode;
  value: T;
};

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly SegmentedControlOption<T>[];
  className?: string;
};

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  className,
}: Props<T>) {
  return (
    <div className={cn("flex border border-soft rounded-lg overflow-hidden", className)}>
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 py-2 text-sm transition-colors cursor-pointer",
              active
                ? "bg-primary text-surface font-medium"
                : "text-muted hover:text-primary hover:bg-surface/30",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
