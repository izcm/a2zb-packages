import { useId, type ReactNode } from "react";

type Breakpoint = { cols: number; minWidth?: number; maxWidth?: number };

function splitForOverflow<T>(items: T[], cols: number) {
  const hidden = items.length > cols ? items.length % cols : 0;
  const visible = items.slice(0, items.length - hidden);
  const visibleWithSlotForOverflow = hidden > 0 ? visible.slice(0, visible.length - 1) : visible;
  const hiddenCount = hidden > 0 ? hidden + 1 : hidden;
  return { visibleWithSlotForOverflow, hidden, hiddenCount };
}

type Props<T> = {
  items: T[];
  breakpoints: Breakpoint[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  /** Renders the "+N others" overflow slot; receives the hidden items and their count. */
  renderOverflow: (hiddenItems: T[], hiddenCount: number) => ReactNode;
};

/** Renders one grid per breakpoint (toggled via CSS media queries), collapsing overflow items into a trailing slot. */
export function ResponsiveOverflowGrid<T>({
  items,
  breakpoints,
  getKey,
  renderItem,
  renderOverflow,
}: Props<T>) {
  const groupClass = `overflow-grid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  const css = [
    `.${groupClass} { display: none; }`,
    ...breakpoints.map((bp, i) => {
      const conditions = [
        bp.minWidth && `(min-width:${bp.minWidth}px)`,
        bp.maxWidth && `(max-width:${bp.maxWidth}px)`,
      ]
        .filter(Boolean)
        .join(" and ");
      const rule = `.${groupClass}[data-variant="${i}"] { display: grid; }`;
      return conditions ? `@media ${conditions} { ${rule} }` : rule;
    }),
  ].join("\n");

  return (
    <>
      <style>{css}</style>
      {breakpoints.map((bp, i) => {
        const { visibleWithSlotForOverflow, hidden, hiddenCount } = splitForOverflow(
          items,
          bp.cols,
        );

        return (
          <div
            key={i}
            data-variant={i}
            className={`${groupClass} gap-4`}
            style={{ gridTemplateColumns: `repeat(${bp.cols}, minmax(0, 1fr))` }}
          >
            {visibleWithSlotForOverflow.map((item) => (
              <div key={getKey(item)}>{renderItem(item)}</div>
            ))}
            {hidden > 0 &&
              renderOverflow(items.slice(visibleWithSlotForOverflow.length), hiddenCount)}
          </div>
        );
      })}
    </>
  );
}
