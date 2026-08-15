import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuBuilding2, LuLayers, LuFolder } from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { ModuleTree } from "@/components/module-tree";
import { Gallery } from "@/components/gallery";
import { getProject, projects } from "@/data/projects";
import { getTechIcon } from "@/data/skills";
import { getProjectImages } from "@/lib/images";
import { site } from "@/data/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      type: "article",
      title: `${project.title} — ${site.name}`,
      description: project.shortDescription,
      siteName: `${site.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${site.name}`,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = getProjectImages(project.imageFolder);
  const cover = images[0] ?? null;

  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden pt-24 pb-12">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        {cover && (
          <div className="absolute inset-0" aria-hidden>
            <Image
              src={cover.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          </div>
        )}

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <FadeIn>
            <Link
              href="/#projects"
              className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <LuArrowLeft className="size-4" />
              Back to all projects
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{project.category}</Badge>
              <Badge variant="secondary">{project.status}</Badge>
            </div>

            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              {project.title}
            </h1>

            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <LuBuilding2 className="size-4 text-primary" />
                {project.company}
              </span>
              {project.companyType && (
                <span className="inline-flex items-center gap-1.5">
                  <LuLayers className="size-4 text-primary" />
                  {project.companyType}
                </span>
              )}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.shortDescription}
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Tech stack */}
        <FadeIn>
          <div className="rounded-lg border border-border/70 bg-card/50 p-6">
            <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {"// Tech Stack"}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background/60 px-3 py-1.5 text-sm"
                  >
                    {Icon && <Icon className="size-4 text-primary" />}
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          {/* Left: description + highlights + module tree */}
          <div className="space-y-10 lg:col-span-3">
            <FadeIn>
              <div>
                <h2 className="mb-3 font-serif text-2xl font-medium">
                  About this project
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  {project.fullDescription}
                </p>
              </div>
            </FadeIn>

            {project.highlights && project.highlights.length > 0 && (
              <FadeIn delay={0.05}>
                <div>
                  <h2 className="mb-4 font-serif text-2xl font-medium">
                    Key Highlights
                  </h2>
                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 rounded-md border border-border/70 bg-card/40 p-4 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.05}>
              <div className="rounded-lg border border-border/70 bg-card/40 p-6">
                <h2 className="mb-1 flex items-center gap-2 font-serif text-2xl font-medium">
                  <LuFolder className="size-5 text-primary" />
                  Module Tree
                </h2>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {"// Click a module to expand"}
                </p>
                <ModuleTree tree={project.moduleTree} />
              </div>
            </FadeIn>
          </div>

          {/* Right: overview card */}
          <aside className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="rounded-lg border border-border/70 bg-card p-6 lg:sticky lg:top-24">
                <h2 className="mb-5 font-serif text-xl font-medium">
                  Project Overview
                </h2>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Status
                    </dt>
                    <dd className="mt-1 font-medium">{project.status}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Company
                    </dt>
                    <dd className="mt-1 font-medium">{project.company}</dd>
                  </div>
                  {project.companyType && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        Type
                      </dt>
                      <dd className="mt-1 font-medium">{project.companyType}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Category
                    </dt>
                    <dd className="mt-1 font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Screenshots
                    </dt>
                    <dd className="mt-1 font-medium">{images.length}</dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-border/70 pt-5">
                  <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Built with
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>

        {/* Gallery */}
        {images.length > 0 && (
          <FadeIn delay={0.05}>
            <div className="mt-16">
              <Gallery images={images} />
            </div>
          </FadeIn>
        )}
      </div>
    </>
  );
}
