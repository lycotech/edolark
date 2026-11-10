import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Check, HardHat, Leaf, Settings, Truck, Wrench } from "lucide-react";
import { approach, company, credentials, equipment, portfolioStates, projects, services, welcomeMessage } from "@/lib/data";
import { HeroSlider } from "@/components/hero-slider";
import { HorizontalShowcase } from "@/components/horizontal-showcase";
import { Counter, Magnetic, Parallax, Reveal, ScrollFill, SplitText } from "@/components/motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const slides = [
  { src: "/img/maverick-frame-7s8ab4twHcI-unsplash.jpg", alt: "Modern residential architecture with a pool" },
  { src: "/img/pexels-ansar-muhammad-380085065-27604148.jpg", alt: "Contemporary stone and timber facade" },
  { src: "/projects/medina-gbagada/19.jpeg", alt: "Completed semi-detached homes at Medina Estate, Gbagada" },
];

const serviceIcons = [Building2, Wrench, HardHat, Settings, Leaf, Truck];

const showcaseSlugs = [
  "usi-aderun-annie-court-yaba",
  "medina-estate-gbagada",
  "dawaki-abuja",
  "omole-phase-2",
  "alara-street-sabo",
  "palms-gardens-osogbo",
];

export default function Home() {
  const featured = projects[0];
  const showcase = showcaseSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => !!p && p.gallery.length > 0);
  const years = new Date().getFullYear() - 2013;

  const stats = [
    { value: years, suffix: "+", label: "Years in business", note: "Incorporated 2013" },
    { value: projects.length, suffix: "", label: "Projects in our portfolio", note: "Present & past" },
    { value: portfolioStates(), suffix: "", label: "States served", note: "Lagos to Abuja" },
    { value: services.length, suffix: "", label: "Core services", note: "Design to maintenance" },
  ];

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero grain" id="top" aria-labelledby="hero-title">
        <HeroSlider slides={slides} />
        <div className="hero__veil" />
        <div className="hero__content shell">
          <p className="eyebrow eyebrow--light hero__eyebrow">
            <span className="eyebrow__line" /> {company.slogan}
          </p>
          <SplitText as="h1" id="hero-title" hero delay={250} className="hero__title" text={"Quality homes.\n*Lasting value.*"} />
          <Reveal className="hero__foot" delay={900}>
            <p>Design, construction and general contract services for residential, commercial and civil projects across Nigeria.</p>
            <div className="hero__ctas">
              <Magnetic>
                <Link className="btn btn--red" href="/projects">
                  View our projects <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link className="btn btn--ghost" href="/contact">
                  Start a project
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <div className="hero__tag" aria-hidden="true">EDOLARK LTD · LAGOS, NIGERIA</div>
        <div className="phero__scroll hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((n) => (
            <div className="marquee__group" key={n}>
              {services.map((service) => (
                <span key={service.title}>
                  {service.title}
                  <i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- STATEMENT + STATS ---------------- */}
      <section className="statement shell" aria-labelledby="statement-label">
        <Reveal>
          <p className="eyebrow" id="statement-label">Who we are</p>
        </Reveal>
        <ScrollFill
          className="statement__text"
          text="Edolark Limited is a Lagos-based design, construction and general contract outfit delivering quality workmanship for residential, commercial and civil projects — built on trust, delivered on time."
        />
        <Reveal>
          <Link className="link-arrow" href="/about">
            More about us <ArrowUpRight size={18} />
          </Link>
        </Reveal>

        <div className="stats">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="stats__item">
              <p className="stats__value"><Counter to={stat.value} suffix={stat.suffix} /></p>
              <p className="stats__label">{stat.label}</p>
              <p className="stats__note">{stat.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- HORIZONTAL PROJECTS ---------------- */}
      <HorizontalShowcase projects={showcase} />

      {/* ---------------- SERVICES ---------------- */}
      <section className="services section" aria-labelledby="home-services-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <Reveal><p className="eyebrow">What we do</p></Reveal>
              <SplitText id="home-services-title" text={"Expertise that\n*feels personal.*"} />
            </div>
            <Reveal delay={150}>
              <Link className="btn btn--dark" href="/services">
                All services <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
          <div className="services__grid">
            {services.map((service, i) => {
              const Icon = serviceIcons[i] ?? Building2;
              return (
                <Reveal key={service.title} delay={(i % 3) * 100} className="scard-wrap">
                  <article className="scard">
                    <span className="scard__icon"><Icon size={30} strokeWidth={1.1} /></span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="scard__arrow"><ArrowUpRight size={22} strokeWidth={1.3} /></span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- WELCOME + APPROACH ---------------- */}
      <section className="welcome section section--dark" aria-labelledby="welcome-title">
        <div className="shell welcome__grid">
          <Reveal variant="clip" className="welcome__media">
            <Parallax speed={0.1}>
              <Image src="/projects/shared/interior-1.jpg" alt="Finished interior by Edolark" fill sizes="(max-width: 900px) 100vw, 45vw" />
            </Parallax>
          </Reveal>
          <div className="welcome__copy">
            <Reveal><p className="eyebrow eyebrow--light">Welcome</p></Reveal>
            <SplitText id="welcome-title" text={"Dedicated to your\n*project's success.*"} />
            <Reveal delay={150}><p className="welcome__lead">{welcomeMessage}</p></Reveal>
            <Reveal delay={250} className="welcome__approach">
              <h3>{approach.title}</h3>
              <p>{approach.text}</p>
            </Reveal>
            <ul className="ticks">
              {credentials.map((item, i) => (
                <li key={item}>
                  <Reveal delay={300 + i * 80}>
                    <span><Check size={16} /></span>
                    {item}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- EQUIPMENT ---------------- */}
      <section className="equip section" aria-labelledby="equip-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <Reveal><p className="eyebrow">Our equipment</p></Reveal>
              <SplitText id="equip-title" text={"Equipped to\n*deliver on site.*"} />
            </div>
            <Reveal delay={150}>
              <p className="section-head__note">The plant, formwork and measuring tools we bring to every site.</p>
            </Reveal>
          </div>
          <div className="equip__grid">
            {equipment.map((item, i) => (
              <Reveal key={item.name} delay={(i % 4) * 80} className="equip__item">
                <p className="equip__qty">{item.quantity}</p>
                <p className="equip__name">{item.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FEATURED / NOW SELLING ---------------- */}
      <section className="feature grain" aria-label="Featured project">
        <Parallax className="feature__media" speed={0.2}>
          <Image src={encodeURI(featured.gallery[0])} alt={`${featured.title} exterior`} fill sizes="100vw" />
        </Parallax>
        <div className="feature__veil" />
        <div className="feature__content shell">
          <Reveal><p className="eyebrow eyebrow--light">Now selling</p></Reveal>
          <SplitText as="h2" className="feature__title" text={"Your dream home awaits\nin *Yaba, Lagos.*"} />
          <Reveal delay={250}>
            <p className="feature__detail">{featured.title} — {featured.location}</p>
          </Reveal>
          <Reveal delay={350}>
            <Magnetic>
              <Link className="round-cta" href={`/projects/${featured.slug}`} data-cursor="Open">
                <span>View<br />project</span>
                <ArrowUpRight size={26} strokeWidth={1.2} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="cta section section--dark grain" aria-labelledby="cta-title">
        <div className="shell cta__inner">
          <Reveal><p className="eyebrow eyebrow--light">Start your journey</p></Reveal>
          <SplitText as="h2" id="cta-title" className="cta__title" text={"Let's find a place you'll love to call *home.*"} />
          <Reveal delay={200} className="cta__actions">
            <Magnetic>
              <Link className="btn btn--red btn--lg" href="/contact">
                Contact us <ArrowUpRight size={20} />
              </Link>
            </Magnetic>
            <a className="btn btn--ghost btn--lg" href={`tel:${company.rawPhone}`}>{company.phone}</a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
