import { projects } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { Reveal, SplitText } from "@/components/motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "View present and past Edolark Ltd projects — residential developments, remodels, civil works and demolition across Nigeria.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title={"Present &\n*past projects*"}
        subtitle="Our portfolio"
        image="/img/maverick-frame-7s8ab4twHcI-unsplash.jpg"
      />
      <section className="projects-page section shell" aria-labelledby="projects-list-title">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">Portfolio</p></Reveal>
            <SplitText id="projects-list-title" text={"Developments built\n*with care.*"} />
          </div>
          <Reveal delay={150}>
            <p className="section-head__note">{projects.length} projects across residential, remodelling, civil and demolition works.</p>
          </Reveal>
        </div>
        <ProjectsExplorer projects={projects} />
      </section>
    </>
  );
}
