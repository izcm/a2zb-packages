import { cn } from "@/lib/utils/cn";

type Props = {
  label?: string;
  className?: string;
};

export const LiveBadge = ({ label = "LIVE", className }: Props) => (
  <span className={cn("inline-flex items-baseline gap-1.5 text-xs font-medium text-gold", className)}>
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5C518] opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
    </span>
    {label}
  </span>
);
