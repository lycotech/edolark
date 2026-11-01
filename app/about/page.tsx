import Image from "next/image";
import { Check, MapPin, Phone, Mail } from "lucide-react";
import { company } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: "Learn about Edolark Ltd — a Lagos real estate company committed to quality homes, transparent service and lasting value in Nigeria.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Edolark Ltd" subtitle="Who we are" image="/VIEW 1.png" />

      <section className="about-page shell" aria-labelledby="about-story-title">
        <div className="about-page__intro">
          <p className="eyebrow">Our story</p>
          <h2 id="about-story-title">Quality homes. Trusted guidance. Lasting value.</h2>
          <p>Edolark Ltd is a Lagos-based real estate company that designs, builds and sells residential properties people are proud to live in. From first-time buyers to experienced investors, we help clients make confident property decisions in one of Africa&apos;s most dynamic cities.</p>
          <p>Every Edolark development is shaped by a simple belief: a home should be more than an address. It should be safe, well-built, thoughtfully planned and located where life is easier.</p>
        </div>
        <div className="about-page__image">
          <Image src={encodeURI("/VIEW 3.png")} alt="Modern Edolark residential building" fill sizes="(max-width: 850px) 100vw, 50vw" />
        </div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <div className="shell">
          <p className="eyebrow">What drives us</p>
          <h2 id="values-title">Our values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3><Check size={20} />Quality</h3>
              <p>We use reliable materials, skilled craftsmen and rigorous supervision so every home stands the test of time.</p>
            </div>
            <div className="value-card">
              <h3><Check size={20} />Integrity</h3>
              <p>Clear information, honest pricing and no hidden surprises — that is how we build trust with every client.</p>
            </div>
            <div className="value-card">
              <h3><Check size={20} />Accessibility</h3>
              <p>We create homes across a range of budgets without compromising on safety, comfort or design.</p>
            </div>
            <div className="value-card">
              <h3><Check size={20} />Community</h3>
              <p>Our developments are designed to become neighbourhoods — secure, connected and pleasant places to live.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-strip shell" aria-labelledby="office-title">
        <div className="contact-strip__info">
          <p className="eyebrow">Visit us</p>
          <h2 id="office-title">Our office</h2>
          <p><MapPin size={18} />{company.address.join(", ")}</p>
          <p><Phone size={18} />{company.phone}</p>
          <p><Mail size={18} />{company.email}</p>
          <SocialLinks />
        </div>
        <div className="contact-strip__cta">
          <p>Have a question about buying, selling or investing?</p>
          <a className="button button--dark" href={`tel:${company.rawPhone}`}>Call us now</a>
        </div>
      </section>
    </>
  );
}
