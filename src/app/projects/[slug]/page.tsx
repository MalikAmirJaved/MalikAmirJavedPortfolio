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
          className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
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
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LuArrowLeft className="size-4" />
              Back to all projects
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan">{project.category}</Badge>
              <Badge variant="secondary">{project.status}</Badge>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <LuBuilding2 className="size-4" />
                {project.company}
              </span>
              {project.companyType && (
                <span className="inline-flex items-center gap-1.5">
                  <LuLayers className="size-4" />
                  {project.companyType}
                </span>
              )}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.shortDescription}
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Tech stack */}
        <FadeIn>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.tech.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm"
                  >
                    {Icon && <Icon className="size-4 text-cyan-500" />}
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
                <h2 className="mb-3 text-xl font-semibold">
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
                  <h2 className="mb-4 text-xl font-semibold">Key Highlights</h2>
                  <ul className="space-y-3">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 rounded-xl border border-border/60 bg-card/40 p-4 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-500" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            <FadeIn delay={0.05}>
              <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
                <h2 className="mb-1 flex items-center gap-2 text-xl font-semibold">
                  <LuFolder className="size-5 text-cyan-500" />
                  Module Tree
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Click a module to expand its sub-modules.
                </p>
                <ModuleTree tree={project.moduleTree} />
              </div>
            </FadeIn>
          </div>

          {/* Right: overview card */}
          <aside className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
                <h2 className="mb-5 text-lg font-semibold">Project Overview</h2>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                      Status
                    </dt>
                    <dd className="mt-1 font-medium">{project.status}</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                      Company
                    </dt>
                    <dd className="mt-1 font-medium">{project.company}</dd>
                  </div>
                  {project.companyType && (
                    <div>
                      <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                        Type
                      </dt>
                      <dd className="mt-1 font-medium">{project.companyType}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                      Category
                    </dt>
                    <dd className="mt-1 font-medium">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs tracking-wide text-muted-foreground uppercase">
                      Screenshots
                    </dt>
                    <dd className="mt-1 font-medium">{images.length}</dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-border/60 pt-5">
                  <h3 className="mb-3 text-sm font-semibold">Built with</h3>
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
