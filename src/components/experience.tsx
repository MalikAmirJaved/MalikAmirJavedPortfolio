import { LuBriefcase, LuGraduationCap } from "react-icons/lu";

import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  icon: typeof LuBriefcase;
  points: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Junior Developer",
    company: "ClickMasters Digital Marketing Agency",
    period: "May 2024 – Present",
    location: "Pakistan",
    current: true,
    icon: LuBriefcase,
    points: [
      "Architect and maintain five live production systems: ClickMaster ERP, Nexus CRM, HMS, Matric Engineering, ZAMR Engineering",
      "Build RESTful and real-time APIs using Django REST Framework with Daphne, WebSockets, and Redis",
      "Develop React/Next.js frontends with TypeScript, Redux Toolkit, TanStack Query, Tailwind CSS, Shadcn UI",
      "Implement Node.js/Express backends with Socket.IO for real-time data; MongoDB and PostgreSQL as databases",
      "Handle full Linux server deployment (Nginx, no CI/CD)",
      "Built cross-platform desktop application features using Electron.js",
      "Currently engineering Alpha AI Tracker — a cross-platform desktop monitoring agent in .NET 10 / Avalonia (C#) with a Go REST API backend",
    ],
  },
  {
    role: "Software Development Intern",
    company: "ClickMasters Digital Marketing Agency",
    period: "Dec 2023 – Apr 2024",
    location: "Pakistan",
    icon: LuGraduationCap,
    points: [
      "Gained hands-on experience in full-stack web development under senior developer mentorship",
      "Contributed to React frontends and Node.js/Express API development",
      "Promoted to Junior Developer after demonstrating strong technical aptitude within 5 months",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            index={4}
            eyebrow="Experience"
            title="My journey so far"
            description="From intern to junior developer — building production systems used by real clients."
          />
        </FadeIn>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:left-1/2"
          />

          <div className="space-y-12">
            {experiences.map((item, i) => {
              const Icon = item.icon;
              const leftSide = i % 2 === 0;
              return (
                <FadeIn key={item.role} delay={i * 0.1}>
                  <div
                    className={`relative flex flex-col gap-4 pl-12 sm:w-1/2 sm:pl-0 ${
                      leftSide
                        ? "sm:pr-12 sm:text-right"
                        : "sm:ml-auto sm:pl-12"
                    }`}
                  >
                    {/* Node */}
                    <div
                      className={`absolute top-1 left-4 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-background shadow-md sm:left-auto ${
                        leftSide
                          ? "sm:right-0 sm:translate-x-1/2"
                          : "sm:left-0 sm:-translate-x-1/2"
                      }`}
                    >
                      <Icon className="size-4 text-primary" />
                    </div>

                    <div className="rounded-lg border border-border/70 bg-card p-6">
                      <div
                        className={`flex flex-wrap items-center gap-2 ${
                          leftSide ? "sm:justify-end" : ""
                        }`}
                      >
                        {item.current && <Badge variant="accent">Current</Badge>}
                        <span className="font-mono text-xs text-muted-foreground">
                          {item.period}
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg font-medium">
                        {item.role}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-primary">
                        {item.company} · {item.location}
                      </p>
                      <ul
                        className={`mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground ${
                          leftSide ? "sm:[direction:rtl] sm:[&>*]:[direction:ltr]" : ""
                        }`}
                      >
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2 sm:justify-start">
                            <span
                              className={`mt-1.5 size-1.5 shrink-0 rounded-full bg-primary ${
                                leftSide ? "sm:order-2" : ""
                              }`}
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
