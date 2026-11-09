import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, Check, Home as HomeIcon, KeyRound, ShieldCheck } from "lucide-react";
import { company, projects, services } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = projects[0];

  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <Image
          className="hero__image"
          src={encodeURI("/img/pexels-ansar-muhammad-380085065-27604148.jpg")}
          alt="Modern residential architecture"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero__veil" />
        <div className="hero__content shell">
          <p className="hero__eyebrow"><span /> {company.slogan}</p>
          <h1 id="hero-title">Quality homes.<br />Lasting value.</h1>
          <p className="hero__intro">Design, construction and general contract services for residential, commercial and civil projects across Nigeria.</p>
          <Link className="hero__explore" href="/projects">
            Explore our projects <span><ArrowDown size={18} /></span>
          </Link>
        </div>
        <p className="hero__side-note">EDOLARK LTD · LAGOS, NIGERIA</p>
      </section>

      <section className="intro-section shell" aria-labelledby="intro-title">
        <div className="intro-section__label">
          <p className="eyebrow">Why Edolark</p>
          <span className="fine-line" />
        </div>
        <div className="intro-section__content">
          <h2 id="intro-title">Building homes you&apos;re proud<br />to call <em>yours.</em></h2>
          <div className="intro-section__copy">
            <p>Edolark Limited is a Lagos-based design, construction and general contract outfit delivering quality workmanship for residential, commercial and civil projects.</p>
            <Link className="text-link" href="/about">More about us <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="properties-section" id="projects" aria-labelledby="home-projects-title">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured developments</p>
              <h2 id="home-projects-title">Our projects</h2>
            </div>
            <Link className="button button--outline" href="/projects">All projects <ArrowRight size={18} /></Link>
          </div>
          <div className="project-grid project-grid--home">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-section shell" id="services" aria-labelledby="home-services-title">
        <div className="services-section__heading">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 id="home-services-title">Expertise that feels personal.</h2>
          </div>
          <Link className="button button--outline" href="/services">All services <ArrowRight size={18} /></Link>
        </div>
        <div className="services-grid services-grid--home">
          {services.slice(0, 3).map((service, index) => {
            const icons = [KeyRound, Building2, ShieldCheck];
            const Icon = icons[index] || HomeIcon;
            return (
              <article className="service-card" key={service.title}>
                <div className="service-card__top"><span>0{index + 1}</span><Icon size={29} strokeWidth={1.25} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="promise-section" aria-label="Featured project">
        <Image
          src={encodeURI("/VIEW 2.png")}
          alt="USI-ADERUN & ANNIE COURT exterior"
          fill
          sizes="100vw"
        />
        <div className="promise-section__overlay" />
        <div className="promise-section__content shell">
          <p className="eyebrow eyebrow--light">Now selling</p>
          <blockquote>{featured.summary}</blockquote>
          <p className="promise-section__detail">{featured.type} at {featured.location}</p>
          <Link className="round-link" href={`/projects/${featured.slug}`}>
            <span>View<br />project</span><ArrowUpRight size={24} strokeWidth={1.3} />
          </Link>
        </div>
      </section>

      <section className="contact-section shell" id="contact" aria-labelledby="home-contact-title">
        <div className="contact-section__mark" aria-hidden="true">E</div>
        <div className="contact-section__content">
          <p className="eyebrow">Start your journey</p>
          <h2 id="home-contact-title">Let&apos;s find a place<br />you&apos;ll love to call <em>home.</em></h2>
          <SocialLinks />
        </div>
        <div className="contact-section__action">
          <p>Ready to buy, sell or invest in Lagos real estate?<br />Reach out today.</p>
          <Link className="button button--dark" href="/contact">Contact us <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
