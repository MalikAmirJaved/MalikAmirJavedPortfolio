"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getTechIcon } from "@/data/skills";
import type { Project } from "@/data/projects";

const MAX_TECH = 5;

type ProjectCardProps = {
  project: Project;
  coverImage?: { src: string; alt: string } | null;
  index: number;
};

function statusInfo(status: string) {
  const isLive = status.startsWith("Live");
  const isProgress = status.startsWith("In Progress");
  const period = status.includes("—") ? status.split("—")[1]?.trim() ?? "" : "";
  return { isLive, isProgress, period, label: isLive ? "Live" : "In Progress" };
}

export function ProjectCard({ project, coverImage, index }: ProjectCardProps) {
  const { isLive, period, label } = statusInfo(project.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative border-b border-border/60 last:border-b-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="-mx-2 grid grid-cols-[2.5rem_1fr] items-start gap-3 rounded-md px-2 py-6 transition-colors duration-300 hover:bg-accent/40 sm:-mx-4 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6 sm:px-4 sm:py-8"
      >
        {/* Index */}
        <span className="font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-primary sm:text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-serif text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-2xl lg:text-3xl">
              {project.title}
            </h3>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest",
                isLive ? "text-emerald-500" : "text-amber-500"
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isLive ? "animate-pulse bg-emerald-400" : "bg-amber-400"
                )}
              />
              {label}
            </span>
          </div>

          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {project.category}
            {period && <> · {period}</>}
          </p>

          <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>

          {/* Tech chips — 3 on mobile, up to 5 on tablet/desktop */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1 sm:mt-4 sm:gap-1.5">
            {project.tech.slice(0, MAX_TECH).map((tech, i) => {
              const Icon = getTechIcon(tech);
              return (
                <span
                  key={tech}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px]",
                    i >= 3 && "hidden sm:inline-flex"
                  )}
                >
                  {Icon && <Icon className="size-2.5 text-primary/70 sm:size-3" />}
                  {tech}
                </span>
              );
            })}
            {project.tech.length > 3 && (
              <span className="font-mono text-[9px] text-muted-foreground sm:hidden">
                +{project.tech.length - 3}
              </span>
            )}
            {project.tech.length > MAX_TECH && (
              <span className="hidden font-mono text-[9px] text-muted-foreground sm:inline">
                +{project.tech.length - MAX_TECH}
              </span>
            )}
          </div>

          {/* Mobile thumbnail */}
          {coverImage && (
            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-md border border-border/60 sm:hidden">
              <Image
                src={coverImage.src}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 90vw"
                className="object-cover object-top"
              />
            </div>
          )}
        </div>

        {/* Thumbnail + arrow (tablet/desktop) */}
        <div className="hidden flex-col items-end gap-3 sm:flex">
          <div className="relative h-24 w-36 overflow-hidden rounded-md border border-border/70 opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-primary/10 lg:h-28 lg:w-44">
            {coverImage ? (
              <Image
                src={coverImage.src}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 144px, 176px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/60 to-card px-2 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {project.shortTitle ?? project.title}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <LuArrowUpRight className="size-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            View case study
            <LuArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex items-center gap-6 border-b border-border/60 py-8">
      <Skeleton className="h-4 w-8" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
