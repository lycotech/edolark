import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { company, credentials, expertise, portfolioStates, projects, services, values } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import { Counter, Magnetic, Parallax, Reveal, ScrollFill, SplitText } from "@/components/motion";
import { ValuesTabs } from "@/components/values-tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: `Edolark Limited is a Nigerian real estate, construction and property development company — incorporated ${company.incorporated}, ${company.rcNumber}. Building Excellence. Creating Value. Shaping the Future.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const years = new Date().getFullYear() - 2013;

  return (
    <>
      <PageHero
        title={"About\n*Edolark Limited*"}
        subtitle="Who we are"
        image="/img/ivan-henao-04rZ7R1fKhY-unsplash.jpg"
        intro="Building Excellence. Creating Value. Shaping the Future."
      />

      <section className="story section shell" aria-labelledby="about-story-title">
        <div className="story__grid">
          <div className="story__body">
            <SplitText id="about-story-title" text={"Building excellence. *Creating value.*"} />
            <ScrollFill
              className="story__lead"
              text="Edolark Limited is a Nigerian real estate, construction and property development company committed to delivering innovative, sustainable and value-driven solutions across the built environment."
            />
            <div className="story__cols">
              <Reveal>
                <p>Incorporated on {company.incorporated} and registered under the Corporate Affairs Commission of the Federal Republic of Nigeria, in accordance with the Companies and Allied Matters Act, with Registration Number {company.rcNumber}, Edolark has established its presence in the industry through its commitment to quality workmanship, professional excellence and client satisfaction.</p>
              </Reveal>
              <Reveal delay={120}>
                <p>Our expertise spans residential and commercial property development, building construction, civil engineering, architectural design coordination, project management and general contracting. We approach every assignment with a clear understanding that each client, project and development opportunity comes with unique requirements — which drives our ability to develop practical, innovative and commercially viable solutions that deliver enduring value.</p>
              </Reveal>
              <Reveal>
                <p>We believe that successful projects are built on more than technical competence. They require integrity, collaboration, attention to detail and an unwavering commitment to excellence. We therefore invest the time, knowledge and resources necessary to understand our clients&apos; objectives, assess project requirements and deliver solutions that align with their expectations.</p>
              </Reveal>
              <Reveal delay={120}>
                <p>Whether delivering a residential apartment, developing a commercial office complex, executing road infrastructure works or undertaking specialised projects such as controlled demolition, we bring together professional expertise, modern construction knowledge and a results-oriented approach to every engagement.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-label="Our philosophy">
        <Parallax className="band__media" speed={0.2}>
          <Image src="/projects/medina-gbagada/19.jpeg" alt="" fill sizes="100vw" />
        </Parallax>
        <div className="band__veil" />
        <div className="band__quote shell">
          <SplitText
            as="p"
            text={"We do not simply build structures; we create *lasting value,* develop opportunities and shape environments where people and businesses can thrive."}
          />
        </div>
      </section>

      <section className="expertise section shell" aria-labelledby="expertise-title">
        <div className="expertise__grid">
          <div>
            <Reveal><p className="eyebrow">Our expertise</p></Reveal>
            <SplitText id="expertise-title" text={"What we bring\nto every *assignment.*"} />
            <Reveal delay={150}>
              <p className="expertise__note">Our relationships with clients, employees, consultants, contractors and vendors are founded on mutual respect, transparency and professionalism.</p>
            </Reveal>
          </div>
          <ul className="expertise__list">
            {expertise.map((item, i) => (
              <li key={item}>
                <Reveal delay={i * 70}>
                  <span>{item}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="numbers shell" aria-label="Edolark in numbers">
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
          <SplitText id="values-title" text={"Vision, mission\n*& ultimate goal*"} />
          <Reveal delay={150}>
            <ValuesTabs values={values} />
          </Reveal>
        </div>
      </section>

      <section className="approach section shell" aria-labelledby="approach-title">
        <div className="approach__grid">
          <div>
            <Reveal><p className="eyebrow">Registered &amp; accountable</p></Reveal>
            <SplitText id="approach-title" text={"A company you can\n*stand behind.*"} />
          </div>
          <div className="approach__copy">
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
