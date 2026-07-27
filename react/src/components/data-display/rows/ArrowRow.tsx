import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn";

type ArrowRowProps = {
  isSelected: boolean;
  onSelect: () => void;
  onEnter?: () => void;
  children: ReactNode;
  className?: string;
  dataId?: string;
  dataTestId?: string;
};

export function ArrowRow({
  isSelected,
  onSelect,
  onEnter,
  children,
  className,
  dataId,
  dataTestId,
}: ArrowRowProps) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected) {
      ref.current?.focus();
    }
  }, [isSelected]);

  const appliedClasses = cn(
    "hover:bg-white/10 rounded-lg bg-surface border border-soft",
    isSelected && "bg-accent/25",
    className,
  );

  return (
    <li
      ref={ref}
      data-id={dataId}
      data-testid={dataTestId}
      tabIndex={isSelected ? 0 : -1}
      onClick={onEnter ?? onSelect}
      onKeyDown={(e) => {
        if (!onEnter) return;
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter();
        }
      }}
      className={appliedClasses}
    >
      {children}
    </li>
  );
}
