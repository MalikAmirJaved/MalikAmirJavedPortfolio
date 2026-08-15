# Amir Javed — Portfolio

Professional full-stack developer portfolio for **Amir Javed**, Full Stack Junior
Developer at ClickMasters Digital Marketing Agency (Muzaffarabad, AJK, Pakistan).

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **shadcn/ui** style components (Radix primitives + CVA)
- **next-themes** (dark/light mode, dark-first)
- **react-icons**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start dev server               |
| `npm run build`   | Production build               |
| `npm run start`   | Serve production build         |
| `npm run lint`    | ESLint                         |

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout, metadata, theme provider
    page.tsx              # Home: Hero → About → Skills → Projects → Experience → Contact
    globals.css           # Tailwind v4 theme (dark-first, cyan accent, grid pattern)
    projects/[slug]/      # Project detail pages (module tree + gallery)
    not-found.tsx         # 404 page
  components/             # Sections + UI components
  data/                   # site.ts, skills.ts, projects.ts (all content lives here)
  lib/                    # utils (cn), images (folder scanning)
public/
  resume.pdf              # Replace with your real CV
  erp/ hms/ matrics/ nexus/ zamr/   # Project screenshots
```

## Content

All portfolio content (bio, skills, projects with full module trees, experience)
lives in `src/data/`. To update a project, edit `src/data/projects.ts` and add
screenshots to the matching folder under `public/` (e.g. `/erp/` for ClickMaster
ERP). Screenshots are auto-detected at build time — no manual image list needed.
If a folder is missing, the site falls back to a gradient placeholder card.

## Deploy

Deploy-ready with no environment secrets required. The contact form uses a
`mailto:` fallback — no backend needed. To switch to Formspree later, update
`src/components/contact.tsx`.

Replace `public/resume.pdf` with the real resume to enable the "Download CV"
button.
