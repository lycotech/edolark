import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} className="project-card__image">
        <Image
          src={encodeURI(project.gallery[0])}
          alt={project.title}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
        />
        <span className={`project-card__status project-card__status--${project.status.replace(/\s+/g, "-").toLowerCase()}`}>
          {project.status}
        </span>
      </Link>
      <div className="project-card__body">
        <p className="project-card__location"><MapPin size={14} />{project.location}</p>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-card__type">{project.type}</p>
        <p className="project-card__summary">{project.summary}</p>
        <Link className="project-card__link" href={`/projects/${project.slug}`}>
          View project <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
