import { LuBuilding2, LuMapPin, LuRocket, LuGraduationCap } from "react-icons/lu";

import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";
import { site } from "@/data/site";

const highlights = [
  {
    icon: LuRocket,
    title: "From Intern to Developer",
    description:
      "Started as a software intern and was promoted to Full-time Junior Developer within 5 months.",
  },
  {
    icon: LuBuilding2,
    title: "Production Systems",
    description:
      "Architect and maintain live multi-tenant ERP, CRM, hospital and engineering systems at ClickMasters.",
  },
  {
    icon: LuMapPin,
    title: "Based in Pakistan",
    description: `Working from ${site.location} — building for clients globally.`,
  },
  {
    icon: LuGraduationCap,
    title: "2 Years of Experience",
    description:
      "Progressive full-stack experience across web, real-time APIs, and desktop engineering.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            eyebrow="About Me"
            title="Full-stack engineer turning complex problems into shipped products"
            description="I build scalable, production-grade systems — from real-time APIs and multi-tenant dashboards to cross-platform desktop agents."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <FadeIn className="lg:col-span-1" delay={0.05}>
            <div className="glass flex h-full flex-col justify-between rounded-2xl p-7">
              <div>
                <h3 className="text-xl font-semibold">{site.name}</h3>
                <p className="mt-1 text-sm text-cyan-600 dark:text-cyan-400">
                  {site.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  I&apos;m a full-stack developer with a proven track record of
                  shipping and maintaining live production systems. My work
                  spans the entire stack — Django REST Framework and Node.js
                  backends, real-time WebSocket services, React/Next.js
                  frontends, and desktop applications in Electron and .NET.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {site.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/60 bg-background/60 p-4 text-center"
                  >
                    <div className="text-2xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.1 + i * 0.08}>
                  <div className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/15 to-cyan-600/15 text-cyan-500 transition-transform group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>
                    <h4 className="text-base font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
