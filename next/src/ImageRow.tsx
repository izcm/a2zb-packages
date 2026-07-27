import Image from "next/image";
import { ReactNode } from "react";

// keep in sync with @a2zb/react's ImageRow (plain <img> variant)

type Props = {
  image: string;
  title: ReactNode;
  subtitle?: ReactNode;
  endContent?: ReactNode;
  imageBadge?: ReactNode;
  imageSize?: number;
  className?: string;
};

export function ImageRow({
  image,
  title,
  subtitle,
  endContent,
  imageBadge,
  imageSize = 50,
  className = "",
}: Props) {
  return (
    <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 py-1 px-2 ${className}`}>
      <div data-slot="image-wrap" className="relative shrink-0">
        <Image
          data-slot="image"
          src={image}
          alt={typeof title === "string" ? title : ""}
          width={imageSize}
          height={imageSize}
          className="rounded object-cover"
        />
        {imageBadge}
      </div>

      <div className="flex flex-col justify-center text-start min-w-0">
        <span data-slot="title" className="text-sm font-semibold truncate">
          {title}
        </span>
        <span data-slot="subtitle" className="text-xs text-muted inline-block">
          {subtitle}
        </span>
      </div>

      {endContent}
    </div>
  );
}
