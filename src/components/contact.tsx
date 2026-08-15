"use client";

import { useState, type FormEvent } from "react";
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuSend,
  LuCheck,
  LuExternalLink,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";

import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const contactChannels = [
  {
    icon: LuMail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: LuPhone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: site.githubHandle,
    href: site.github,
    external: true,
  },
  {
    icon: LuMapPin,
    label: "Location",
    value: site.location,
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <SectionHeading
            index={5}
            eyebrow="Contact"
            title="Let's build something together"
            description="Whether you have a project in mind, a role to fill, or just want to say hi — my inbox is open."
          />
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Contact channels */}
          <FadeIn className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <>
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-accent/60 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {channel.label}
                      </div>
                      <div className="truncate text-sm font-medium">
                        {channel.value}
                      </div>
                    </div>
                    {channel.external && (
                      <LuExternalLink className="ml-auto size-4 text-muted-foreground" />
                    )}
                  </>
                );

                const classes =
                  "flex items-center gap-4 rounded-lg border border-border/70 bg-card/50 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40";

                return channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className={classes}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={channel.label} className={classes}>
                    {content}
                  </div>
                );
              })}

              <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 p-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    Currently open to opportunities
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Looking for full-stack, React/Next.js, Django or desktop
                  engineering roles. Let&apos;s talk.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="glass flex h-full flex-col gap-5 rounded-lg p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-md border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full resize-none rounded-md border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  Submitting opens your email client with the message
                  pre-filled — no data leaves your device.
                </p>
                <Button type="submit" size="lg" className="min-w-36">
                  {sent ? (
                    <>
                      <LuCheck className="size-4" />
                      Opening mail app…
                    </>
                  ) : (
                    <>
                      <LuSend className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
