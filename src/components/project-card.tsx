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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[4px_4px_0_0_var(--hard-shadow)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60">
          {coverImage ? (
            <Image
              src={coverImage.src}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/60 to-card px-4 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {project.shortTitle ?? project.title}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
            <LuArrowUpRight className="size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          {/* Index badge */}
          <span className="absolute top-3 left-3 rounded-md border border-border/60 bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {project.category}
              {period && (
                <span className="text-muted-foreground/60"> · {period}</span>
              )}
            </span>
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest",
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

          <h3 className="mt-3 font-serif text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>

          {/* Tech chips — 3 on mobile, up to 5 on tablet/desktop */}
          <div className="mt-4 flex flex-wrap items-center gap-1 sm:gap-1.5">
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

          {/* Footer — pinned to the card bottom */}
          <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-primary">
              View case study
              <LuArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border/70">
      <Skeleton className="aspect-[16/9] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1.5 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
