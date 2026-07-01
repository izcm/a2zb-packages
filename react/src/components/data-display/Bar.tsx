export function Bar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="h-px w-full bg-white/8 rounded-full overflow-hidden">
      <div
        className="h-full bg-accent rounded-full transition-all duration-700"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
