import { FaGithub } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

import { site } from "@/data/site";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">
            AJ
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            © {site.copyrightYear} {site.name}
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
          >
            <FaGithub className="size-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
          >
            <LuMail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
