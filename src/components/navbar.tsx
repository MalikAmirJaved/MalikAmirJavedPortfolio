"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuMenu,
  LuX,
  LuDownload,
  LuArrowRight,
  LuMail,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

// Anchors are prefixed with "/" so they work from any page (detail pages
// navigate to the home page and scroll; on home it's a same-page smooth scroll).
const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu; the scroll-lock effect releases body overflow on re-render.
  const closeMenu = () => {
    setOpen(false);
  };

  // Menu links: native hash jumps are silently swallowed when the body is
  // scroll-locked and the menu is exiting, so scroll manually instead.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // On detail pages the target section only exists on the home page — let
    // the browser do the full navigation to /#section (works natively).
    if (window.location.pathname !== "/") {
      closeMenu();
      return;
    }
    e.preventDefault();
    closeMenu();
    const id = href.replace("/#", "");
    // Wait for the menu exit animation + scroll unlock, then scroll manually.
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      history.replaceState(null, "", href);
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 260);
  };

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close automatically when resizing up to desktop (prevents stuck body lock)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
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
              href={link.href}
              className="rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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
          <>
            {/* Backdrop — clicking anywhere outside the panel closes the menu */}
            <motion.button
              key="menu-backdrop"
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-20 bg-black/50 backdrop-blur-[2px] md:hidden"
            />

            {/* Panel */}
            <motion.div
              key="menu-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="relative z-30 overflow-hidden border-t border-border/60 md:hidden"
            >
              <div className="glass border-b border-border/60">
                <nav
                  aria-label="Mobile navigation"
                  className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-5 sm:px-6"
                >
                  <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {"// Navigation"}
                  </p>

                  <div className="flex flex-col">
                    {navLinks.map((link, i) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="group flex items-center justify-between rounded-lg border-b border-border/40 px-2 py-3.5 transition-colors last:border-b-0 hover:bg-accent/60 active:bg-accent"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span className="font-mono text-xs text-primary">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate font-serif text-lg font-medium">
                            {link.label}
                          </span>
                        </span>
                        <LuArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-4 border-t border-border/60 pt-5">
                    <div className="flex items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      <a
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                      >
                        <FaGithub className="size-4" />
                        GitHub
                      </a>
                      <a
                        href={`mailto:${site.email}`}
                        onClick={closeMenu}
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                      >
                        <LuMail className="size-4" />
                        Email
                      </a>
                    </div>

                    <a
                      href={site.resumeUrl}
                      download
                      onClick={closeMenu}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[2px_2px_0_0_var(--hard-shadow)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                      <LuDownload className="size-4" />
                      Download CV
                    </a>
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
