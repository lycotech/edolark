import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Banknote, Briefcase, Calendar, Check, MapPin } from "lucide-react";
import { company, projects } from "@/lib/data";
import { ProjectGallery } from "@/components/project-gallery";
import { Magnetic, Reveal, SplitText } from "@/components/motion";
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
      images: project.gallery[0] ? [{ url: encodeURI(project.gallery[0]), alt: project.title }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Briefcase, label: "Type", value: project.type },
    project.completedYear ? { icon: Calendar, label: "Completed", value: project.completedYear } : null,
    project.client ? { icon: Briefcase, label: "Client", value: project.client } : null,
    project.contractSum ? { icon: Banknote, label: "Contract value", value: project.contractSum } : null,
  ].filter((f): f is NonNullable<typeof f> => f !== null);

  return (
    <>
      <section className="pd-hero grain" aria-labelledby="project-title">
        <div className="pd-hero__grid" aria-hidden="true" />
        <div className="shell pd-hero__inner">
          <Reveal>
            <p className="eyebrow eyebrow--light">
              <span className={`dot dot--${project.status.replace(/\s+/g, "-").toLowerCase()}`} />
              {project.status}
              {project.completedYear ? ` · ${project.completedYear}` : ""}
            </p>
          </Reveal>
          <SplitText as="h1" id="project-title" hero delay={150} text={project.title} />
          <Reveal delay={450}>
            <p className="pd-hero__loc"><MapPin size={18} />{project.location}</p>
          </Reveal>
        </div>
      </section>

      <section className="pd-gallery shell" aria-label="Project photos">
        {project.gallery.length > 0 ? (
          <Reveal variant="scale">
            <ProjectGallery photos={project.gallery} title={project.title} />
          </Reveal>
        ) : (
          <div className="pd-placeholder">
            <Image src="/edolark-logo-light.png" alt={project.title} width={140} height={161} />
            <p>Project photography coming soon</p>
          </div>
        )}
      </section>

      <section className="pd-body section shell" aria-label="Project details">
        <div className="pd-body__main">
          <Reveal><p className="eyebrow">About this project</p></Reveal>
          <Reveal delay={80}><p className="pd-body__lead">{project.summary}</p></Reveal>
          <Reveal delay={160}><p className="pd-body__text">{project.description}</p></Reveal>

          <Reveal delay={200}><h2 className="pd-body__sub">Project scope</h2></Reveal>
          <ul className="pd-features">
            {project.features.map((feature, i) => (
              <li key={feature}>
                <Reveal delay={i * 70}>
                  <span><Check size={16} /></span>
                  {feature}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <aside className="pd-body__aside">
          <Reveal variant="left">
            <div className="pd-card">
              <p className="pd-card__title">Project facts</p>
              <dl>
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt><fact.icon size={15} />{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
                <div>
                  <dt><Check size={15} />Status</dt>
                  <dd>{project.status}</dd>
                </div>
              </dl>
              <Magnetic className="pd-card__cta">
                <Link className="btn btn--red" href="/contact">
                  Enquire now <ArrowUpRight size={18} />
                </Link>
              </Magnetic>
              <a className="pd-card__wa" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
                Or chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </aside>
      </section>

      <section className="nextp grain" aria-label="Next project">
        <Link href={`/projects/${next.slug}`} className="nextp__link" data-cursor="Next">
          <span className="nextp__label">Next project</span>
          <span className="nextp__title">{next.title}</span>
          <span className="nextp__meta">{next.location}</span>
          <span className="nextp__arrow"><ArrowRight size={48} strokeWidth={1} /></span>
        </Link>
      </section>
    </>
  );
}
