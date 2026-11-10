import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, feature = false }: { project: Project; feature?: boolean }) {
  const cover = project.gallery[0];
  const href = `/projects/${project.slug}`;

  return (
    <article className={`pcard${feature ? " pcard--feature" : ""}`} data-cursor="View">
      <Link href={href} className="pcard__media" aria-label={project.title}>
        {cover ? (
          <Image
            src={encodeURI(cover)}
            alt={project.title}
            fill
            sizes={feature ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"}
          />
        ) : (
          <span className="pcard__placeholder">
            <Image src="/edolark-logo-light.png" alt="" width={120} height={138} />
          </span>
        )}
        <span className="pcard__shade" />
        <span className={`pcard__status pcard__status--${project.status.replace(/\s+/g, "-").toLowerCase()}`}>
          {project.status}
        </span>
        <span className="pcard__arrow" aria-hidden="true">
          <ArrowUpRight size={22} strokeWidth={1.4} />
        </span>
      </Link>
      <div className="pcard__body">
        <p className="pcard__loc"><MapPin size={14} />{project.location}</p>
        <h3><Link href={href}>{project.title}</Link></h3>
        <p className="pcard__type">{project.type}</p>
      </div>
    </article>
  );
}
