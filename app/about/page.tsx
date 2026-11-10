import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { approach, company, credentials, portfolioStates, projects, services, values, welcomeMessage } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import { Counter, Magnetic, Parallax, Reveal, ScrollFill, SplitText } from "@/components/motion";
import { ValuesTabs } from "@/components/values-tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: `Edolark Limited — incorporated ${company.incorporated}, ${company.rcNumber}. A design, construction and general contract outfit delivering quality workmanship across Nigeria.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const years = new Date().getFullYear() - 2013;

  return (
    <>
      <PageHero title={"About\n*Edolark Limited*"} subtitle="Who we are" image="/img/ivan-henao-04rZ7R1fKhY-unsplash.jpg" />

      <section className="story section shell" aria-labelledby="about-story-title">
        <div className="story__grid">
          <div className="story__label">
            <Reveal><p className="eyebrow">Our story</p></Reveal>
          </div>
          <div className="story__body">
            <SplitText id="about-story-title" text={"A design, construction and general contract outfit *built on trust.*"} />
            <ScrollFill
              className="story__lead"
              text={`Edolark Limited was incorporated on the ${company.incorporated} and registered in line with the Corporate Affairs Commission Act, 1990 of the Federal Republic of Nigeria with Company Registration Number ${company.rcNumber}.`}
            />
            <div className="story__cols">
              <Reveal>
                <p>Our expertise and approach deliver enduring results, true to each client&apos;s specific situation. We are a design, construction and general contract outfit committed to quality workmanship, customer service and the highest level of professionalism in our relationships with customers, employees and vendors.</p>
              </Reveal>
              <Reveal delay={120}>
                <p>Whether the project is a residential apartment, an office complex, a road works package or a controlled demolition, we invest sufficient time to understand client needs and apply our state-of-the-art knowledge to deliver applicable, creative resolutions.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-hidden="true">
        <Parallax className="band__media" speed={0.2}>
          <Image src="/projects/medina-gbagada/19.jpeg" alt="" fill sizes="100vw" />
        </Parallax>
        <div className="band__veil" />
      </section>

      <section className="numbers section shell" aria-label="Edolark in numbers">
        <div className="stats stats--light">
          {[
            { value: years, suffix: "+", label: "Years in business" },
            { value: projects.length, suffix: "", label: "Projects in our portfolio" },
            { value: portfolioStates(), suffix: "", label: "States served" },
            { value: services.length, suffix: "", label: "Core services" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="stats__item">
              <p className="stats__value"><Counter to={stat.value} suffix={stat.suffix} /></p>
              <p className="stats__label">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="values section section--dark" aria-labelledby="values-title">
        <div className="shell">
          <Reveal><p className="eyebrow eyebrow--light">What drives us</p></Reveal>
          <SplitText id="values-title" text={"Mission, vision\n*& values*"} />
          <Reveal delay={150}>
            <ValuesTabs values={values} />
          </Reveal>
        </div>
      </section>

      <section className="approach section shell" aria-labelledby="approach-title">
        <div className="approach__grid">
          <div>
            <Reveal><p className="eyebrow">{approach.title}</p></Reveal>
            <SplitText id="approach-title" text={"Dedicated to your\n*project's success.*"} />
          </div>
          <div className="approach__copy">
            <Reveal><p className="approach__lead">{welcomeMessage}</p></Reveal>
            <Reveal delay={120}><p>{approach.text}</p></Reveal>
            <ul className="credlist">
              {credentials.map((item, i) => (
                <li key={item}>
                  <Reveal delay={i * 80}>{item}</Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="office section section--sand" aria-labelledby="office-title">
        <div className="shell office__grid">
          <div>
            <Reveal><p className="eyebrow">Visit us</p></Reveal>
            <SplitText id="office-title" text={"Our *office*"} />
            <Reveal delay={150} className="office__lines">
              <p><MapPin size={18} />{company.address.join(", ")}</p>
              <p><Phone size={18} />{company.phone}</p>
              <p><Mail size={18} />{company.email}</p>
            </Reveal>
            <Reveal delay={250}><SocialLinks /></Reveal>
          </div>
          <Reveal delay={150} className="office__cta">
            <p>Have a question about a project or service?</p>
            <Magnetic>
              <a className="btn btn--dark btn--lg" href={`tel:${company.rawPhone}`}>Call us now</a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
