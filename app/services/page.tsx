import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { approach } from "@/lib/data";
import { getEquipment, getServices } from "@/lib/content";
import { PageHero } from "@/components/page-hero";
import { Magnetic, Reveal, SplitText } from "@/components/motion";
import { ServicesList } from "@/components/services-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our services",
  description: "Edolark Limited's services — real estate development, property sales and acquisition, construction and civil engineering, architectural design, project management, joint ventures, renovation and investment advisory in Nigeria.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const [services, equipment] = await Promise.all([getServices(), getEquipment()]);
  return (
    <>
      <PageHero
        title={"Our\n*services*"}
        subtitle="What we do"
        image="/img/ben-allan-BIeC4YK2MTA-unsplash.jpg"
        intro="Real estate, construction and property solutions — from land acquisition to a finished, lasting development."
      />

      <section className="services-page section shell" aria-labelledby="services-list-title">
        <div className="services-page__grid">
          <div className="services-page__intro">
            <Reveal><p className="eyebrow">Real estate &amp; construction expertise</p></Reveal>
            <SplitText id="services-list-title" text={"Everything you need to acquire, design, build and *grow.*"} />
            <Reveal delay={150}><p>{approach.text}</p></Reveal>
          </div>
          <Reveal delay={100}>
            <ServicesList services={services} />
          </Reveal>
        </div>
      </section>

      <section className="equip section section--sand" aria-labelledby="svc-equip-title">
        <div className="shell">
          <div className="section-head">
            <div>
              <Reveal><p className="eyebrow" id="svc-equip-title">Our equipment</p></Reveal>
            </div>
          </div>
          <div className="equip__grid">
            {equipment.map((item, i) => (
              <Reveal key={item.name} delay={(i % 4) * 80} className="equip__item">
                <p className="equip__name">{item.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section section--dark grain" aria-label="Get started">
        <div className="shell cta__inner">
          <Reveal><p className="eyebrow eyebrow--light">Get started</p></Reveal>
          <SplitText as="h2" className="cta__title" text={"Not sure which service *fits* your project?"} />
          <Reveal delay={200} className="cta__actions">
            <Magnetic>
              <Link className="btn btn--red btn--lg" href="/contact">
                Talk to us <ArrowUpRight size={20} />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
