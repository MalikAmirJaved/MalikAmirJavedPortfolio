"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import {
  LuArrowRight,
  LuDownload,
  LuMail,
  LuPhone,
} from "react-icons/lu";
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

type FloatPos = CSSProperties & { delay: number };

const floatPositions: FloatPos[] = [
  { top: "-5%", right: "18%", delay: 0 }, // Next
  { top: "22%", left: "-6%", delay: 0.6 }, // Django
  { top: "45%", right: "-7%", delay: 1.2 }, // React
  { bottom: "30%", left: "-7%", delay: 1.8 }, // Node
  { bottom: "-6%", left: "22%", delay: 2.4 }, // PostgreSQL
  { bottom: "3%", right: "20%", delay: 3 }, // MongoDB
];

const terminalLines = [
  { cmd: "whoami", out: "Amir Javed — Full Stack Developer" },
  { cmd: "location", out: "Muzaffarabad, AJK, Pakistan" },
  { cmd: "status", out: "Open to opportunities", status: true },
  { cmd: "stack", out: "Django · React · Next · Node" },
  { cmd: "current_build", out: "Alpha AI Tracker @ ClickMasters", cursor: true },
];

export function Hero() {
  const typed = useTypingEffect(site.typingPhrases);

  return (
    <section
      id="home"
      className="bg-grid relative flex min-h-svh items-center overflow-hidden pt-28 pb-28 lg:pt-32"
    >
      {/* Radial glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-140px] bottom-[-120px] h-[380px] w-[380px] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Left: text column (editorial, left-aligned) ---- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="accent" className="gap-2 px-3.5 py-1.5 text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                {site.openToWork ? "Open to Opportunities" : "Available"}
              </Badge>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs"
            >
              {site.role} — {site.location}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-serif text-[2.6rem] leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl xl:text-7xl"
            >
              Hi, I&apos;m <span className="text-gradient italic">Amir Javed</span>
            </motion.h1>

            {/* Typing line — fluid height, nowrap, scales down on phones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-5 flex min-h-6 items-center gap-2 font-mono text-[15px] whitespace-nowrap text-primary sm:min-h-8 sm:text-xl lg:text-2xl"
            >
              <span className="text-muted-foreground">&gt;_</span>
              <span>{typed}</span>
              <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-primary sm:h-5 lg:h-6" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
            >
              <Button size="lg" asChild className="w-full sm:w-auto">
                <a href="#projects">
                  View My Work
                  <LuArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
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
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground"
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
                <LuMail className="size-4" />
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <LuPhone className="size-4" />
                {site.phone}
              </a>
            </motion.div>
          </div>

          {/* ---- Right: terminal card + floating badges (desktop) ---- */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mx-auto w-full max-w-md"
            >
              {/* Status label above card */}
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>{"// system_status"}</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  online
                </span>
              </div>

              <div className="relative rounded-lg border border-border/70 bg-card/90 shadow-[8px_8px_0_0_var(--hard-shadow)] backdrop-blur">
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5">
                  <div className="flex gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-[#e05252]/80" />
                    <span className="size-2.5 rounded-full bg-[#eab308]/80" />
                    <span className="size-2.5 rounded-full bg-[#22c55e]/80" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                    amir@dev — ~/portfolio
                  </span>
                </div>

                {/* Terminal body */}
                <div className="space-y-4 p-5 sm:p-6">
                  {terminalLines.map((line) => (
                    <div key={line.cmd}>
                      <div className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                        $ {line.cmd}
                      </div>
                      <div className="mt-1.5 flex items-start gap-2 font-mono text-sm sm:text-[15px]">
                        {line.status ? (
                          <span className="relative mt-1 flex size-2 shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                          </span>
                        ) : (
                          <span className="mt-0.5 shrink-0 text-primary">▸</span>
                        )}
                        <span className="min-w-0 leading-relaxed text-foreground">
                          {line.out}
                        </span>
                        {line.cursor && (
                          <span className="mt-0.5 inline-block h-4 w-[2px] shrink-0 animate-pulse bg-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating tech badges (desktop only) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden lg:block"
            >
              {floatingTech.slice(0, floatPositions.length).map((name, i) => {
                const Icon = techIcons[name];
                const pos = floatPositions[i];
                return (
                  <motion.div
                    key={name}
                    className="absolute flex items-center gap-1.5 rounded-full border border-border/70 bg-card/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground shadow-sm backdrop-blur"
                    style={pos}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{
                      opacity: { duration: 0.8, delay: 0.8 + pos.delay * 0.2 },
                      scale: { duration: 0.8, delay: 0.8 + pos.delay * 0.2 },
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: pos.delay,
                      },
                    }}
                  >
                    {Icon && <Icon className="size-3 text-primary" />}
                    {name}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile/tablet tech chips (static, no absolute positioning) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 lg:hidden"
        >
          {floatingTech.map((name) => {
            const Icon = techIcons[name];
            return (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {Icon && <Icon className="size-3 text-primary" />}
                {name}
              </span>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll cue (desktop) */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-primary to-transparent"
        />
      </div>
    </section>
  );
}
