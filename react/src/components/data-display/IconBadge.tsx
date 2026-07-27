import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type IconBadgeItem = {
  label: string;
  icon?: ReactNode;
  className?: string;
};

export const IconBadge = ({ label, icon, className }: IconBadgeItem) => (
  <div className={cn("flex flex-col items-center gap-2", className)}>
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border border-soft/16">
      {icon ?? <span className="text-lg font-semibold text-white">{label[0].toUpperCase()}</span>}
    </div>

    <span className="text-xs text-neutral-400">{label}</span>
  </div>
);
