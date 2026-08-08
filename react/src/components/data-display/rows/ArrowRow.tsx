import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils/cn.js";

export const defaultArrowClasses = {
  base: "rounded-lg bg-surface border border-soft transition cursor-pointer",
  hover: "hover:bg-accent/10",
  selected: "bg-accent/25",
};

type ArrowRowProps = {
  isSelected: boolean;
  onSelect: () => void;
  onEnter?: () => void;
  children: ReactNode;
  className?: string;
  dataId?: string;
  dataTestId?: string;
  bare?: boolean;
  focusOnMount?: boolean;
};

export function ArrowRow({
  isSelected,
  onSelect,
  onEnter,
  children,
  className,
  dataId,
  dataTestId,
  bare: bareRow,
  focusOnMount = true,
}: ArrowRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const li = ref.current;
    if (!li) return;

    li.querySelectorAll<HTMLElement>(
      "a, button, input, select, textarea, [tabindex]",
    ).forEach((el) => {
      el.tabIndex = isSelected ? 0 : -1;
    });

    if (isSelected && (focusOnMount || !isInitialMount.current)) {
      li.focus();
    }
    isInitialMount.current = false;
  }, [isSelected, focusOnMount]);

  const appliedClasses = bareRow
    ? className
    : cn(
        defaultArrowClasses.base,
        !isSelected && defaultArrowClasses.hover,
        isSelected && defaultArrowClasses.selected,
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
        if (e.key === "Enter" && onEnter) {
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
