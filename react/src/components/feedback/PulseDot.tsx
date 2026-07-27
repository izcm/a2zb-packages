export const PulseDot = ({ active }: { active: boolean }) => (
  <span className="relative inline-flex h-2.5 w-2.5">
    {active && (
      <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 animate-ping" />
    )}
    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${active ? "bg-accent" : "bg-soft"}`} />
  </span>
);
