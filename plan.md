# Portfolio Redesign Plan — Merged Design System

**Goal:** Merge the design DNA of three reference sites into one distinctive. Deep analysis below, followed by the merged design system and a phased implementation plan against the existing Next.js codebase.

**References analyzed (live, from their deployed CSS):**

1. **Project Go** — `project-go-theme.pages.dev` (Astro, productized-service theme)
2. **Sidrano** — `sidrano-astro-tailwind.vercel.app` (Astro + Tailwind, creative studio template)
3. **Grafio** — `grafio-theme.domidex01.workers.dev` (Astro 7 + Tailwind v4, editorial dev portfolio)

---

## Part 1 — Site-by-Site Deep Analysis

### 1. Project Go — "Warm Paper + Acid" product theme

**Color system** (3-token philosophy — extremely disciplined):

| Token       | Value       | Role                                                                                     |
| ----------- | ----------- | ---------------------------------------------------------------------------------------- |
| `--ink`   | `#171714` | warm near-black — text, dark sections                                                   |
| `--paper` | `#f6f6f2` | warm off-white — canvas, light sections                                                 |
| `--acid`  | `#c8ff46` | acid lime — the*only* accent, used sparingly (labels, buttons, highlights, underline) |

- Light-first but uses ink blocks as contrast sections (duality, not just light/dark mode).
- Nearly monochrome with ONE electric accent. No gradient noise.

**Typography:**

- Sans: **Geist Variable** (body + display), Mono: **JetBrains Mono Variable** (labels, numbers).
- Weights are *heavy*: 610 body, 650/750/850 headlines. `h1` = 4.75rem, weight 850, `line-height: 1`, `max-width: 11ch`.
- Headlines have tight negative tracking: `-0.045em` to `-0.055em`.
- Small mono eyebrows/labels (`0.65–0.78rem`) above big type.

**Signature style elements:**

- **Hard-shadow buttons** with a press-down effect: `box-shadow: 1px 2px 0 var(--paper); transform: translate(3px,3px)` on hover → `translate(4px,4px)` on active. Chunky, tactile, neo-brutalist-leaning.
- **Marquee ticker** strips ("overwhelm__ticker").
- Mono eyebrows, guarantee/status badges, pill tags.
- Radii: small cards `0.35–0.6rem`, cards `0.8–1rem`, pills `999px`.

**Feel:** confident, product-marketing, "we ship" energy. Very high-contrast typography.

---

### 2. Sidrano — "Black + Red Monospace" studio theme

**Color system:**

| Token              | Value       | Role                                     |
| ------------------ | ----------- | ---------------------------------------- |
| `--sd-black`     | `#000000` | canvas                                   |
| `--sd-black-200` | `#121212` | elevated surface                         |
| `--sd-grey-200`  | `#2a2a2a` | cards/borders                            |
| `--sd-grey`      | `#cecece` | secondary text                           |
| `--sd-white`     | `#ffffff` | text                                     |
| `--sd-accent`    | `#b92516` | **crimson red** — the only accent |

- Strictly dark-first. Monochrome + one warm accent. `--sd-white-30: #ffffff26` for hairline borders/overlays.

**Typography:**

- Display: **Chivo Mono** (monospace used as the display face — very distinctive), Body: **Inter**.
- **Massive display scale** — responsive steps: h1 `54 → 72 → 120 → 210px`, with tracking tightening to match: `-4px → -12px` at the largest. h2 up to `90px`.
- Section headers paired with small Japanese annotation + numbered labels (e.g. `//003- (ビジュアル系)`).
- Container: `1310px`. Radii: `999px` pills, `10–20px` cards.

**Signature style elements:**

- Numbered editorial section labels (`//001-` … `//011-`).
- **Marquee loops** (`--animate-marquee-left/right`) — repeated word/logo strips.
- Animated stat counters (`98% client satisfaction`, `15M+ users`, `300+ projects`).
- Badge spin animation, pill CTAs, testimonial carousel.
- Global spacing is generous and consistent: section gaps `80–150px` desktop.

**Feel:** bold agency/studio energy, loud type, rhythmic motion.

---

### 3. Grafio — "Editorial Monochrome Serif" dev portfolio

**Color system** (full shadcn-style semantic scale — closest to our current setup):

| Token (dark)           | Value (Tailwind neutral)    | Role              |
| ---------------------- | --------------------------- | ----------------- |
| `--background`       | `neutral-950` `#0a0a0a` | near-black canvas |
| `--foreground`       | `neutral-100` `#f5f5f5` | text              |
| `--card`             | `neutral-900` `#171717` | cards             |
| `--muted-foreground` | `neutral-400` `#a3a3a3` | secondary text    |
| `--border`           | `neutral-800` `#262626` | hairline borders  |
| `--radius`           | `0.5rem`                  | subtle            |

- **Truly monochrome — zero accent color.** Contrast comes from type scale, weight contrast, and borders.
- Light mode defined on the same tokens (background `neutral-50`, etc.) + `.dark` variant — exactly our architecture.
- Borders are crisp 1px hairlines (`--border`) — *not* glass/blur.

**Typography:**

- Display: **Source Serif 4 Variable** (editorial serif), Body: **Source Sans 3 Variable**.
- Headings in serif at **normal weight** (`font-weight: normal`) with `line-height: 1` — restraint, not boldness, carries the design.
- `.display-heading` in `neutral-700` (slightly muted vs. pure white) — elegant.
- h1/h2 scale steps up to `text-6xl`; type used at book-editorial sizes, not poster sizes.

**Signature style elements:**

- **Editorial project list** — numbered rows (`Project / 01` … `Project / 06`) instead of a card grid.
- Numbered process section ("Step 01 — Conversation … 04 — Launch & Beyond").
- FAQ **accordion**, testimonial slider, magnetic buttons, page transitions, scroll-reveal text.
- Theme toggle (dark/light). Dev-y artifacts: `{ /* USER STORY */ }` comments visible in markup, clock/time in hero.

**Feel:** sophisticated, quiet, editorial — "I sweat the details." Best-in-class restraint.

---

### Part 2 — Side-by-Side Comparison

| Dimension         | Project Go                                  | Sidrano                                 | Grafio                                    |
| ----------------- | ------------------------------------------- | --------------------------------------- | ----------------------------------------- |
| Base canvas       | warm paper`#f6f6f2`                       | pure black                              | near-black`#0a0a0a`                     |
| Accent            | acid lime`#c8ff46`                        | crimson`#b92516`                      | none                                      |
| Display font      | Geist (850 heavy)                           | Chivo Mono                              | Source Serif 4 (normal)                   |
| Body font         | Geist                                       | Inter                                   | Source Sans 3                             |
| Mono font         | JetBrains Mono                              | Chivo Mono (as display)                 | (system)                                  |
| Type energy       | huge + heavy                                | enormous + tight-tracked                | editorial + restrained                    |
| Signature         | hard-shadow buttons, marquee, mono eyebrows | numbered labels, marquee, stat counters | numbered project rows, process, accordion |
| Surface treatment | solid ink/paper blocks                      | solid + hairlines                       | hairline borders, no glass                |
| Radius            | 0.35–1rem + pills                          | 999px pills, 10–20px cards             | 0.5rem                                    |
| Motion            | marquee, press effects                      | marquee, spin, counters                 | scroll-reveal, page transitions, magnetic |

**What each contributes to the merge:**

- **Grafio** → the canvas, the editorial restraint, the semantic token architecture, the numbered project rows, the "details matter" credibility (perfect for a developer portfolio).
- **Project Go** → the acid accent, the chunky hard-shadow CTA, the mono eyebrows/labels, the marquee ticker, the heavy display weights.
- **Sidrano** → the numbered section labels (`// 01 —`), the poster-scale display type, the animated stat counters, the marquee energy.

---

## Part 3 — The Merged Design System

### Concept: "Editorial Systems Engineer"

A dark, near-black, editorial portfolio where **serif voice + mono annotations + one electric accent** tell a story of a developer who cares about both craft (design) and rigor (systems). Quiet enough to feel premium, loud enough at the moment of impact (hero, CTAs, numbers).

### 3.1 Color palette (dark-first, replaces current navy/cyan)

```css
/* Canvas — from Grafio */
--background:        #0a0a0a;   /* neutral-950 */
--foreground:        #f5f5f5;   /* neutral-100 */
--card:              #131313;   /* elevated surface */
--card-foreground:   #f5f5f5;
--muted:             #171717;
--muted-foreground:  #a3a3a3;   /* neutral-400 — secondary text */
--border:            #262626;   /* neutral-800 hairlines */
--input:             #262626;

/* Accent — from Project Go (acid lime) */
--primary:           #c8ff46;   /* acid */
--primary-foreground:#171714;   /* ink on acid */
--ring:              #c8ff46;

/* Light mode (same tokens, flipped) */
--background:        #fafafa;   /* neutral-50 */
--foreground:        #171717;
--card:              #ffffff;
--border:            #d4d4d4;
--primary:           #171714;   /* ink becomes the accent in light mode */
--primary-foreground:#c8ff46;
```

> ⚠️ **Decision point (flag for Amir):** the merge's signature move is the acid-lime accent (`#c8ff46`) on near-black — it's what makes the merged theme feel like Project Go. **Alternative:** Sidrano's crimson `#b92516` (warmer, more studio). Cyan/blue is dropped. This is a one-line change (`--primary`), so we can lock it after seeing it live.
> Keep the existing dot-grid → replace with **plain canvas + hairline borders** (Grafio-style). Glassmorphism is dropped except a *hint* of blur in the sticky navbar.

### 3.2 Typography — three-voice system

| Voice                       | Font                             | Use                                                                                                                              |
| --------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Serif (voice)**     | Source Serif 4 Variable          | H1/H2 display headlines — editorial, normal→600 weight,`line-height: 1`, tight tracking `-0.02em → -0.04em`               |
| **Sans (function)**   | Geist Variable (already bundled) | Body, UI, cards, buttons — weights 400/500/600                                                                                  |
| **Mono (annotation)** | JetBrains Mono (or Geist Mono)   | Eyebrows, section labels, dates, numbers, tags, code-ish details —`0.7–0.8rem`, uppercase, `letter-spacing: 0.08em`, muted |

**Merged display scale (poster type, Sidrano-inspired, tempered for a dev portfolio):**

- Hero h1: `clamp(2.75rem, 8vw, 7rem)` serif, weight 500–600, `line-height: 0.98`, tracking `-0.03em`. *Not* 210px — big enough to command, small enough to stay professional.
- Section h2: `clamp(2rem, 4.5vw, 4rem)` serif.
- Eyebrow above every section, mono: `// 01 — Work`.

### 3.3 Style guide (merged)

- **Section labels** (Sidrano): numbered mono eyebrow `// 01 — <name>` + optional small annotation.
- **CTA buttons** (Project Go): chunky, `radius: 0.5rem` (or pill for secondary), **hard offset shadow** (`box-shadow: 3px 3px 0 var(--primary)` on hover, translate on active press). Primary = acid on ink; ghost = hairline border + mono label.
- **Project display** (Grafio): numbered editorial rows on the home page (`/01 ClickMaster ERP` → hover reveals description + tech), full cards kept on the detail pages. Filter tabs stay.
- **Marquee** (Project Go + Sidrano): a slow word-strip between Hero and About ("React · Django · Next.js · PostgreSQL · …") with mono type.
- **Stat counters** (Sidrano): animate up on scroll into view (already have 5/2+/3+/1 data).
- **Process/Accordion** (Grafio): module tree accordion restyled with mono headers + hairlines.
- **Radii:** base `0.5rem` (Grafio), pills `999px` for tags/avatars.
- **Borders over glass:** 1px `--border` hairlines everywhere; navbar keeps a translucent blur.
- **Motion:** keep Framer Motion scroll reveals; add page-transition-esque reveals, keep typing effect in hero (restyled in mono or serif-italic).
- **Theme:** dark-first default, light mode on the same tokens (current toggle stays).

---

## Part 4 — Implementation Plan (existing Next.js codebase)

Current stack: Next.js 16.3.1, Tailwind v4 (CSS-first config in `globals.css`), shadcn-style tokens already in place, Framer Motion, next-themes, react-icons. Content + routes stay unchanged — this is a **theming + component restyle**, not a rebuild.

### Phase 1 — Tokens & fonts

- [X] `src/app/layout.tsx`: add `next/font/google` **Source Serif 4** (variable). Keep Geist Sans + Mono. Expose `--font-serif`.
- [X] `src/app/globals.css`: replace color tokens (3.1 table), set `--radius: 0.5rem`, add `--font-serif` to `@theme inline`, remove `.text-gradient` cyan + `.glass` heavy blur (replace with hairline `.border-default` helper + slim navbar blur). Keep dot-grid only as an ultra-subtle option; default canvas plain.
- [X] Add utilities: `.font-serif` display class, `.eyebrow` (mono, uppercase, tracked), hard-shadow button tokens, marquee keyframes.

### Phase 2 — Shared components

- [X] `button.tsx`: add `hard` variant — solid acid/ink + offset shadow + press-down transform.
- [X] `section-heading.tsx`: render `// 0X — Label` mono eyebrow + serif title (needs section index or explicit number).
- [X] New `marquee.tsx`: slow infinite word strip (pause on reduced motion).
- [X] `badge.tsx`: mono, hairline-bordered tags.

### Phase 3 — Home page restyle

- [X] `hero.tsx`: giant serif headline, mono eyebrow, typing line restyled, hard-shadow CTAs, acid "Open to Opportunities" badge; floating tech badges keep but restyled flat/hairline.
- [X] Insert `marquee` between Hero and About.
- [X] `about.tsx`: serif pull-quote, hairline stats with animated counters (Sidrano).
- [X] `skills.tsx`: mono eyebrows per group, hairline cards, acid icon badges.
- [X] `projects.tsx` / `project-card.tsx`: **editorial numbered rows** (Grafio) on desktop with hover reveal; filter tabs restyled as pill/underline tabs; mobile falls back to stacked rows.
- [X] `experience.tsx`: timeline with mono dates, hairline connectors.
- [X] `contact.tsx`: hard-shadow submit, mono labels, pill channel cards.
- [X] `navbar.tsx` + `footer.tsx`: hairline border, mono logo mark `AJ`, slim blur.

### Phase 4 — Project detail pages

- [X] `src/app/projects/[slug]/page.tsx`: serif title, mono metadata rows (status/company/stack), hard-shadow "View Live / GitHub" CTA.
- [X] `module-tree.tsx`: mono accordion headers, hairline dividers.
- [X] `gallery.tsx`: hairline frames, mono counters (`04 / 12`).

### Phase 5 — Verify

- [X] `npm run build` + `npm run lint` clean.
- [X] Spot-check dark + light modes, all 6 project pages, mobile nav.

**Out of scope (keep as-is):** content/data (`src/data/`), routes, SEO metadata, resume.pdf, image handling.

---

## Part 5 — Reference source of truth

- Project Go tokens/fonts: `--ink #171714`, `--paper #f6f6f2`, `--acid #c8ff46`, Geist Variable + JetBrains Mono Variable, hero `4.75rem/850/lh:1`, hard-shadow button transform.
- Sidrano tokens: `--sd-accent #b92516`, Chivo Mono display, h1 up to 210px with tracking `-12px`, numbered `//00N-` labels, marquee + stat counters.
- Grafio tokens: neutral-950 canvas, semantic shadcn scale, `--radius .5rem`, Source Serif 4 (normal weight, lh 1), numbered project rows, hairline borders.

---

# Part 6 — Responsive Polish + Hero Redesign

**Goal:** make every breakpoint (phone → tablet → laptop → desktop/wide) feel intentional, and redesign the hero from the centered poster into an editorial split layout that stays strong from 320px to 4K.

## 6.1 Responsiveness audit (done — findings)

| # | Issue                                                                                                                                                                    | Where              | Severity    |
| - | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----------- |
| 1 | Typing line has**fixed `h-8`** — long phrase (`Django & React Specialist`, 25 chars) overflows/wraps and breaks layout on ≤360px phones                      | hero               | 🔴 real bug |
| 2 | Badges are`whitespace-nowrap` + `overflow-hidden` — long skill names (`.NET 10 / Avalonia (C#)…`, `English (Professional)`) get **clipped**, not wrapped | ui/badge → skills | 🔴 real bug |
| 3 | Module-tree deep indent (`depth × 1.1rem`, ERP tree is 4 levels) squeezes names to a sliver on narrow phones                                                          | module-tree        | 🟡 polish   |
| 4 | Contact channels stack full-width in a single column below`lg` — long vertical scroll on tablet portrait                                                              | contact            | 🟡 polish   |
| 5 | Sections use`py-20 sm:py-28` — no further step for laptop/desktop (24″+ looks cramped)                                                                               | all sections       | 🟡 polish   |
| 6 | Hero/detail-hero/not-found use`min-h-screen` — mobile URL-bar jump; should be `min-h-svh`                                                                           | hero, detail, 404  | 🟢 minor    |
| 7 | Hero is centered + generic; no visual anchor on mobile (floaters are`lg`-only)                                                                                         | hero               | 🔵 redesign |

**Kept (verified fine):** navbar desktop links fit at `md` (768px) — ≈594px used of 736px; mobile menu locks body scroll; gallery grid `2/3/4` cols + lightbox `92vw`; experience timeline stacks cleanly below `sm`; marquee `w-max` scrolls without wrap; project rows `grid-cols-[2.75rem_1fr]` scale down; containers `max-w-6xl` center correctly on 4K.

## 6.2 Hero redesign — "Editorial split"

- **Desktop (`lg`+):** two-column grid (`7/5`). Left = text column, **left-aligned** (editorial, not centered): availability badge → mono role line → giant serif H1 (`text-[2.6rem] sm:text-6xl xl:text-7xl`) → responsive typing line → tagline → CTAs → socials. Right = a **terminal/status card** (window chrome + `$ whoami / $ location / $ status / $ stack / $ current_build` mono lines) with 6 floating tech badges orbiting it.
- **Mobile/tablet:** same text column stacked (CTAs full-width), terminal card below, then a **static wrapping tech-chip row** (replaces the invisible floaters). No absolute-positioned clutter.
- **Typing line fix:** fluid `min-h-6 sm:min-h-8`, `whitespace-nowrap`, `text-[15px] sm:text-xl lg:text-2xl` — longest phrase = ~252px at 15px mono, fits 288px content width on a 320px phone.
- **Scroll cue:** animated mono `scroll` indicator at bottom, `lg`-only.
- **Viewport:** `min-h-svh` instead of `min-h-screen`.

## 6.3 Other fixes

- Badge: drop `whitespace-nowrap` + `overflow-hidden` so long labels wrap instead of clipping.
- Module tree: cap indent at `3.3rem` (`min(depth × 1.1, 3.3)rem`).
- Contact: channel cards become `sm:grid-cols-2` on tablet, back to single column at `lg` (availability box spans full row).
- Sections: add `lg:py-32` step (About / Skills / Projects / Experience / Contact).
- Detail hero: `min-h-[420px] sm:min-h-[480px]`; not-found `min-h-svh`.

## 6.4 Breakpoint map (source of truth)

| Breakpoint        | Devices                        | Hero behavior                                                           | Nav           |
| ----------------- | ------------------------------ | ----------------------------------------------------------------------- | ------------- |
| `< 640` (base)  | phones 320–374                | stacked, CTAs full-width, chips row                                     | hamburger     |
| `sm` 640        | phones 375–767                | stacked, 2-col contact channels                                         | hamburger     |
| `md` 768–1023  | tablet portrait / small laptop | stacked hero (terminal card visible), desktop nav links                 | desktop links |
| `lg` 1024–1279 | tablet landscape / laptop      | **split hero + floaters + scroll cue**, all section grids `lg:` | desktop links |
| `xl` 1280–1535 | laptop / desktop               | hero H1 up to`7xl`                                                    | desktop links |
| `≥1536` (2xl)  | desktop / 4K                   | centered`max-w-6xl`, poster type                                      | desktop links |
