import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn.js";

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

export const TextLink = ({ className, children, ...props }: Props) => (
  <a
    {...props}
    className={cn(
      "text-sm text-neutral-400 no-underline transition-colors hover:text-white",
      className,
    )}
  >
    {children}
  </a>
);
