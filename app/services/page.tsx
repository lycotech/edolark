import Link from "next/link";
import { ArrowUpRight, Building2, HardHat, Home, Leaf, Settings, Truck, Wrench } from "lucide-react";
import { services } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our services",
  description: "Explore Edolark Limited's construction and project services — building design, renovation, project management, maintenance, landscaping and procurement in Nigeria.",
  alternates: { canonical: "/services" },
};

const icons = [Building2, Wrench, HardHat, Settings, Leaf, Truck];

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our services" subtitle="What we do" image="/img/ben-allan-BIeC4YK2MTA-unsplash.jpg" />

      <section className="services-page shell" aria-labelledby="services-list-title">
        <div className="services-page__intro">
          <p className="eyebrow">End-to-end construction expertise</p>
          <h2 id="services-list-title">Everything you need to design, build and maintain quality structures.</h2>
        </div>
        <div className="services-list">
          {services.map((service, index) => {
            const Icon = icons[index] || Home;
            return (
              <article className="service-row" key={service.title}>
                <div className="service-row__number">0{index + 1}</div>
                <div className="service-row__icon"><Icon size={32} strokeWidth={1.25} /></div>
                <div className="service-row__body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cta-banner" aria-label="Get started">
        <div className="shell">
          <h2>Not sure which service fits your project?</h2>
          <p>Book a free consultation and we will point you in the right direction.</p>
          <Link className="button button--dark" href="/contact">Book a consultation <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
