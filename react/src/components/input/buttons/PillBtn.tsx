import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn.js";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
};

export function PillBtn({ color, className, style, children, ...props }: Props) {
  return (
    <button
      style={{ color, ...style }}
      className={cn(
        "flex items-center gap-2 rounded-full border border-current px-3 py-1 text-xs cursor-pointer transition-all duration-150",
        "hover:bg-current/10",
        "active:scale-[0.97]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
