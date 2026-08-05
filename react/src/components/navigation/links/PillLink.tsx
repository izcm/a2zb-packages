import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn.js";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Tailwind text-color class (drives the currentColor-based border/background), e.g. "text-accent". */
  color?: string;
};

export const PillLink = ({ color = "text-accent", className, children, ...props }: Props) => (
  <a
    {...props}
    className={cn(
      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
      "border border-current/30 bg-current/6 cursor-pointer no-underline",
      "transition-all hover:bg-current/14 hover:border-current/55 hover:shadow-[0_0_12px_color-mix(in_oklab,currentColor_20%,transparent)]",
      color,
      className,
    )}
  >
    {children}
  </a>
);
