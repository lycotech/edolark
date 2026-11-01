import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, ArrowUpRight, Check, Home } from "lucide-react";
import { company, projects } from "@/lib/data";
import { ProjectGallery } from "@/components/project-gallery";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.summary} ${project.type} at ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      images: [{ url: encodeURI(project.gallery[0]), alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="project-detail-hero shell" aria-labelledby="project-title">
        <div className="project-detail-hero__top">
          <p className="eyebrow">{project.status}</p>
          <h1 id="project-title">{project.title}</h1>
          <p className="project-detail-hero__location"><MapPin size={16} />{project.location}</p>
        </div>
        <ProjectGallery photos={project.gallery} title={project.title} />
      </section>

      <section className="project-detail-body shell" aria-label="Project details">
        <div className="project-detail-body__main">
          <h2>About this development</h2>
          <p className="lead">{project.summary}</p>
          <p>{project.description}</p>

          <h3>What you get</h3>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}><Check size={18} />{feature}</li>
            ))}
          </ul>

          <h3>Location highlights</h3>
          <ul className="feature-list">
            {project.amenities.map((amenity) => (
              <li key={amenity}><Home size={18} />{amenity}</li>
            ))}
          </ul>
        </div>

        <aside className="project-detail-body__sidebar">
          <div className="project-info-box">
            <p className="project-info-box__label">Property type</p>
            <p className="project-info-box__value">{project.type}</p>
            <p className="project-info-box__label">Unit options</p>
            <p className="project-info-box__value">{project.units}</p>
            <p className="project-info-box__label">Status</p>
            <p className="project-info-box__value">{project.status}</p>
            {project.contacts && (
              <>
                <p className="project-info-box__label">Project hotline</p>
                {project.contacts.map((contact) => (
                  <a key={contact} className="project-info-box__phone" href={`tel:${contact.replace(/\s/g, "")}`}>
                    <Phone size={16} />{contact}
                  </a>
                ))}
              </>
            )}
            <Link className="button button--dark" href="/contact">Enquire now <ArrowUpRight size={18} /></Link>
          </div>
        </aside>
      </section>
    </>
  );
}
