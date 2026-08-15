"use client";

import { motion } from "framer-motion";
import { LuArrowRight, LuDownload, LuMapPin } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTypingEffect } from "@/components/typing-effect";
import { site } from "@/data/site";
import { techIcons } from "@/data/skills";

const floatingTech = [
  "Django",
  "React",
  "Next",
  "Node",
  "PostgreSQL",
  "MongoDB",
  ".NET",
];

const floatPositions = [
  { top: "8%", left: "5%", delay: 0 },
  { top: "22%", left: "88%", delay: 1.2 },
  { top: "58%", left: "6%", delay: 0.6 },
  { top: "70%", left: "85%", delay: 1.8 },
  { top: "38%", left: "92%", delay: 2.4 },
  { top: "12%", left: "78%", delay: 0.3 },
  { top: "82%", left: "20%", delay: 1.5 },
];

export function Hero() {
  const typed = useTypingEffect(site.typingPhrases);

  return (
    <section
      id="home"
      className="bg-grid relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Radial glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-120px] bottom-[-120px] h-[380px] w-[380px] rounded-full bg-sky-600/10 blur-3xl"
      />

      {/* Floating tech badges (desktop) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {floatingTech.map((name, i) => {
          const Icon = techIcons[name];
          const pos = floatPositions[i % floatPositions.length];
          return (
            <motion.div
              key={name}
              className="absolute flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur"
              style={pos as React.CSSProperties}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.5 + pos.delay * 0.2 },
                scale: { duration: 0.8, delay: 0.5 + pos.delay * 0.2 },
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                },
              }}
            >
              {Icon && <Icon className="size-3.5 text-cyan-500" />}
              {name}
            </motion.div>
          );
        })}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="cyan" className="mb-5 gap-2 px-3.5 py-1.5 text-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {site.openToWork ? "Open to Opportunities" : "Available"}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">Amir Javed</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-4 flex h-8 items-center justify-center gap-2 font-mono text-lg text-cyan-600 dark:text-cyan-400 sm:text-2xl"
          >
            <span className="text-muted-foreground">&gt;_</span>
            <span>{typed}</span>
            <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-cyan-500 sm:h-7" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {site.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <a href="#projects">
                View My Work
                <LuArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={site.resumeUrl} download>
                <LuDownload className="size-4" />
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <FaGithub className="size-4" />
              {site.githubHandle}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <LuMapPin className="size-4" />
              {site.location}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
