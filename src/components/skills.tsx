import { LuHammer } from "react-icons/lu";

import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { skillGroups, currentlyBuilding } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-[-160px] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            index={2}
            eyebrow="Skills"
            title="Technologies I work with"
            description="A toolkit sharpened across two years of building production systems end-to-end."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const GroupIcon = group.icon;
            return (
              <FadeIn key={group.title} delay={gi * 0.07}>
                <div className="group flex h-full flex-col rounded-lg border border-border/70 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-md border border-border bg-accent/60 text-primary transition-transform group-hover:scale-110">
                      <GroupIcon className="size-5" />
                    </div>
                    <h3 className="font-serif text-lg font-medium">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Currently building banner */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-col gap-5 rounded-lg border border-primary/30 bg-primary/5 p-7 sm:flex-row sm:items-center">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-card text-primary">
              <LuHammer className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-medium">
                {currentlyBuilding.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {currentlyBuilding.description}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {currentlyBuilding.tech.map((TechIcon, i) => (
                <div
                  key={i}
                  className="flex size-9 items-center justify-center rounded-md border border-border/70 bg-card text-muted-foreground"
                >
                  <TechIcon className="size-4.5" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
