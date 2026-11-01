import Link from "next/link";
import { ArrowUpRight, Building2, Home, KeyRound, Megaphone, ShieldCheck, TrendingUp } from "lucide-react";
import { services } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our services",
  description: "Explore Edolark Ltd's real estate services — residential sales, property development, investment advisory, project marketing and property management in Lagos.",
  alternates: { canonical: "/services" },
};

const icons = [Home, Building2, TrendingUp, Megaphone, ShieldCheck];

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Our services" subtitle="How we help" image="/VIEW 4.png" />

      <section className="services-page shell" aria-labelledby="services-list-title">
        <div className="services-page__intro">
          <p className="eyebrow">End-to-end real estate support</p>
          <h2 id="services-list-title">Everything you need to buy, build or invest in Lagos property.</h2>
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
          <h2>Not sure which service fits your goal?</h2>
          <p>Book a free consultation and we will point you in the right direction.</p>
          <Link className="button button--dark" href="/contact">Book a consultation <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
