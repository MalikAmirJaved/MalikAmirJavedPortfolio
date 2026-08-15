import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { ProjectsSection } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { BackToTop } from "@/components/back-to-top";
import { getProjectImages } from "@/lib/images";
import { projects } from "@/data/projects";

export default function Home() {
  // Resolve a cover image for each project (server-side, at build time)
  const covers = Object.fromEntries(
    projects.map((p) => {
      const images = getProjectImages(p.imageFolder);
      return [p.slug, images[0] ?? null];
    })
  );

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <ProjectsSection covers={covers} />
      <Experience />
      <Contact />
      <BackToTop />
    </>
  );
}
