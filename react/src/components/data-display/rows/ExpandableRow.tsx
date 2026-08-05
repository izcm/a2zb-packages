import { ReactNode, useState } from "react";

import { ImageRow } from "../../media/ImageRow.js";
import { DotList } from "../DotList.js";

type Props<T> = {
  image: string;
  /** Full title, e.g. shown on wider screens. */
  title: ReactNode;
  /** Shown in place of `title` on narrow screens (e.g. a shorter id-based label). */
  compactTitle?: ReactNode;
  subtitle?: ReactNode;
  tags?: T[];
  getTagValue?: (tag: T) => ReactNode;
  imageBadge?: ReactNode;
  endContent?: ReactNode;
  /** Rendered in a collapsible panel below the row, toggled by a "view more" button. */
  detailsPane?: ReactNode;
  imageSize?: number;
  className?: string;
};

export function ExpandableRow<T>({
  image,
  title,
  compactTitle,
  subtitle,
  tags,
  getTagValue,
  imageBadge,
  endContent,
  detailsPane,
  imageSize = 64,
  className,
}: Props<T>) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`flex flex-col gap-1 md:pb-0 pb-1 cursor-pointer ${className ?? ""}`}>
      <ImageRow
        image={image}
        title={
          <div className="flex items-center justify-between gap-2 w-full">
            <span className="truncate">
              {compactTitle && <span className="sm:hidden">{compactTitle}</span>}
              <span className={compactTitle ? "hidden sm:inline" : undefined}>{title}</span>
            </span>
          </div>
        }
        subtitle={subtitle}
        imageSize={imageSize}
        imageBadge={imageBadge}
        endContent={endContent}
        className="md:min-h-[64px] [&_[data-slot=title]]:text-base md:[&_[data-slot=image]]:!w-[50px] md:[&_[data-slot=image]]:!h-[50px]"
      />

      {tags && getTagValue && (
        <div className="md:hidden px-2">
          <DotList items={tags} getValue={getTagValue} className="text-xs font-medium text-subtle" />
        </div>
      )}

      {detailsPane && (
        <div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="btn py-0 text-xs text-accent/80 underline underline-offset-2"
          >
            {expanded ? "hide details" : "view more"}
          </button>

          {expanded && <div className="card mx-1 mt-1">{detailsPane}</div>}
        </div>
      )}
    </div>
  );
}
