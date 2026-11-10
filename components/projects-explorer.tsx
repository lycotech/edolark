"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/data";
import { ProjectCard } from "./project-card";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");

  const statuses = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.status)));
    return ["All", ...list];
  }, [projects]);

  const visible = filter === "All" ? projects : projects.filter((p) => p.status === filter);
  const count = (status: string) => (status === "All" ? projects.length : projects.filter((p) => p.status === status).length);

  return (
    <div className="explorer">
      <div className="explorer__filters" role="tablist" aria-label="Filter projects by status">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            role="tab"
            aria-selected={filter === status}
            className={filter === status ? "is-active" : ""}
            onClick={() => setFilter(status)}
          >
            {status}
            <sup>{count(status)}</sup>
          </button>
        ))}
      </div>
      <div className="explorer__grid" key={filter}>
        {visible.map((project, i) => (
          <div className="explorer__item" key={project.slug} style={{ animationDelay: `${i * 70}ms` }}>
            <ProjectCard project={project} feature={filter === "All" && i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
