"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuArrowRight, LuFolder } from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
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
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
        aria-label={`View ${project.title} details`}
      >
        {coverImage ? (
          <Image
            src={coverImage.src}
            alt={coverImage.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority={index < 3}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <LuFolder className="size-10" />
              <span className="text-sm font-medium">{project.title}</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {project.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold transition-colors group-hover:text-cyan-500">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => {
            const Icon = getTechIcon(tech);
            return (
              <span
                key={tech}
                title={tech}
                className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-background/60 text-muted-foreground"
              >
                {Icon && <Icon className="size-3.5" />}
              </span>
            );
          })}
          {project.tech.length > 4 && (
            <span className="flex items-center rounded-md border border-border/60 bg-background/60 px-1.5 text-[10px] text-muted-foreground">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
          <Badge variant="cyan">{project.status}</Badge>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 transition-colors hover:text-cyan-500 dark:text-cyan-400"
          >
            View Details
            <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="mt-2 flex gap-1.5">
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
        </div>
      </div>
    </div>
  );
}
