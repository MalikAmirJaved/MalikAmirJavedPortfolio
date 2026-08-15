"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

import { Skeleton } from "@/components/ui/skeleton";
import { getTechIcon } from "@/data/skills";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  coverImage?: { src: string; alt: string } | null;
  index: number;
};

export function ProjectCard({ project, coverImage, index }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative border-b border-border/60 last:border-b-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="grid grid-cols-[2.75rem_1fr] items-center gap-3 rounded-md px-2 py-7 transition-colors hover:bg-accent/30 sm:grid-cols-[4rem_1fr_auto] sm:gap-6 sm:px-4 sm:py-9 -mx-2 sm:-mx-4"
      >
        {/* Index */}
        <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary sm:text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-serif text-xl font-medium tracking-tight transition-colors group-hover:text-primary sm:text-2xl lg:text-3xl">
              {project.title}
            </h3>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {project.category}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {project.tech.slice(0, 6).map((tech) => {
              const Icon = getTechIcon(tech);
              return (
                <span
                  key={tech}
                  title={tech}
                  className="flex size-7 items-center justify-center rounded-md border border-border/70 bg-background/60 text-muted-foreground"
                >
                  {Icon && <Icon className="size-3.5" />}
                </span>
              );
            })}
            {project.tech.length > 6 && (
              <span className="font-mono text-[10px] text-muted-foreground">
                +{project.tech.length - 6}
              </span>
            )}
          </div>
        </div>

        {/* Hover thumbnail + arrow */}
        <div className="hidden items-center gap-4 sm:flex">
          {coverImage && (
            <div className="relative h-20 w-32 overflow-hidden rounded-md border border-border/70 opacity-0 transition-all duration-300 group-hover:opacity-100 lg:h-24 lg:w-40">
              <Image
                src={coverImage.src}
                alt={project.title}
                fill
                sizes="160px"
                className="object-cover object-top"
              />
            </div>
          )}
          <LuArrowRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex items-center gap-6 border-b border-border/60 py-9">
      <Skeleton className="h-4 w-8" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
        </div>
      </div>
    </div>
  );
}
