"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LuMenu, LuX, LuDownload } from "react-icons/lu";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground shadow-[2px_2px_0_0_var(--hard-shadow)] transition-transform group-hover:scale-105">
            AJ
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Amir Javed
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}            className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <a
            href={site.resumeUrl}
            download
            className="hidden items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-[2px_2px_0_0_var(--hard-shadow)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_var(--hard-shadow)] md:inline-flex"
          >
            <LuDownload className="size-4" />
            CV
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          >
            {open ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="glass overflow-hidden border-t border-border/60 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.resumeUrl}
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2.5 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[2px_2px_0_0_var(--hard-shadow)]"
              >
                <LuDownload className="size-4" />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
