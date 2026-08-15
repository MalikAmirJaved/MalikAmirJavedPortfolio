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

  const liveCount = projects.filter((p) => p.status.startsWith("Live")).length;
  const progressCount = projects.length - liveCount;

  const countFor = (tab: string) =>
    tab === "All"
      ? projects.length
      : projects.filter((p: Project) => p.tags.includes(tab as never)).length;

  return (
    <section id="projects" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
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

        {/* Toolbar: filter tabs + status readout */}
        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 border-y border-border/60 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center justify-center gap-1 sm:justify-start sm:gap-1.5"
            >
              {filterTabs.map((tab) => {
                const isActive = active === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActive(tab)}
                    className={cn(
                      "relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 sm:px-4 sm:py-1.5 sm:text-[11px]",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-tab"
                        className="absolute inset-0 rounded-full bg-primary shadow-[2px_2px_0_0_var(--hard-shadow)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                    <span
                      className={cn(
                        "relative z-10 text-[8px] sm:text-[9px]",
                        isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"
                      )}
                    >
                      {String(countFor(tab)).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-right sm:text-[10px]">
              {liveCount} live · {progressCount} in progress
            </span>
          </div>
        </FadeIn>

        {/* Responsive card grid — 1 col mobile / 2 tablet / 3 desktop */}
        <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-16 text-center font-mono text-sm text-muted-foreground"
              >
                No projects in this category yet.
              </motion.p>
            ) : (
              filtered.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  coverImage={covers[project.slug] ?? null}
                  index={i}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        <FadeIn delay={0.15}>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-primary">{"//"}</span>
            click any project for the full case study
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
