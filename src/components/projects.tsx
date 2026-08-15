"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuLayoutGrid } from "react-icons/lu";

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
        className="pointer-events-none absolute top-0 right-[-160px] h-[400px] w-[400px] rounded-full bg-sky-500/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
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
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                  active === tab
                    ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-600 shadow-sm dark:text-cyan-400"
                    : "border-border/70 bg-card/50 text-muted-foreground hover:border-cyan-500/30 hover:text-foreground"
                )}
              >
                {tab === "All" && <LuLayoutGrid className="size-3.5" />}
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
