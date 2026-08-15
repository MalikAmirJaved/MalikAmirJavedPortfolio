const words = [
  "React",
  "Next.js",
  "Django",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  ".NET",
  "Go",
  "Electron",
  "Tailwind",
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border/60 py-4"
    >
      <div className="flex w-max animate-marquee gap-8 motion-reduce:animate-none">
        {row.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            {word}
            <span className="text-primary">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}
