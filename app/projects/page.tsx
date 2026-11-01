import { projects } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "View present and past Edolark Ltd residential projects in Lagos, including USI-ADERUN & ANNIE COURT in Yaba.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero title="Present & past projects" subtitle="Our portfolio" image="/VIEW 5.png" />
      <section className="projects-page shell" aria-labelledby="projects-list-title">
        <div className="projects-page__intro">
          <p className="eyebrow">Portfolio</p>
          <h2 id="projects-list-title">Developments built with care.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
