import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Section number rendered as "// 01" before the eyebrow */
  index?: number;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <span className="mb-4 inline-flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-primary">{"//"}</span>
          {index !== undefined && (
            <span className="text-primary">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <span>{eyebrow}</span>
          <span className="hidden h-px w-8 bg-border sm:block" />
        </span>
      )}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
