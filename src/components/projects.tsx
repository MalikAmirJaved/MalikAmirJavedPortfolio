"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import { projects, filterTabs, type Project } from "@/data/projects";
import type { ProjectImage } from "@/lib/images";

type ProjectsSectionProps = {
  covers: Record<string, ProjectImage | null>;
};

export function ProjectsSection({ covers }: ProjectsSectionProps) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p: Project) => p.tags.includes(active as never));
  }, [active]);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-[-160px] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            index={3}
            eyebrow="Projects"
            title="Things I've built and shipped"
            description="Live production systems, enterprise platforms, and a cross-platform desktop agent — all maintained end-to-end."
          />
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all",
                  active === tab
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/70 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Editorial row list */}
        <motion.div layout className="mt-10 border-t border-border/60">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                coverImage={covers[project.slug] ?? null}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
