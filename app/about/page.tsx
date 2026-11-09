import { Check, MapPin, Phone, Mail } from "lucide-react";
import { company } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: `Edolark Limited — incorporated ${company.incorporated}, ${company.rcNumber}. A design, construction and general contract outfit delivering quality workmanship across Nigeria.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Edolark Limited" subtitle="Who we are" image="/img/ivan-henao-04rZ7R1fKhY-unsplash.jpg" />

      <section className="about-page shell" aria-labelledby="about-story-title">
        <div className="about-page__intro">
          <p className="eyebrow">Our story</p>
          <h2 id="about-story-title">A design, construction and general contract outfit built on trust.</h2>
          <p>Edolark Limited was incorporated on the <strong>{company.incorporated}</strong> and registered in line with the Corporate Affairs Commission Act, 1990 of the Federal Republic of Nigeria with Company Registration Number <strong>{company.rcNumber}</strong>.</p>
          <p>Our expertise and approach deliver enduring results, true to each client&apos;s specific situation. We are a design, construction and general contract outfit committed to quality workmanship, customer service and the highest level of professionalism in our relationships with customers, employees and vendors.</p>
          <p>Whether the project is a residential apartment, an office complex, a road works package or a controlled demolition, we invest sufficient time to understand client needs and apply our state-of-the-art knowledge to deliver applicable, creative resolutions.</p>
        </div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <div className="shell">
          <p className="eyebrow">What drives us</p>
          <h2 id="values-title">Mission, vision & values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3><Check size={20} />Mission</h3>
              <p>To provide quality workmanship and customer service, and to maintain the highest level of professionalism in our relationships with customers, employees and vendors.</p>
            </div>
            <div className="value-card">
              <h3><Check size={20} />Vision</h3>
              <p>To be a leading source of professional construction services and project management by combining rare professional skills with quality materials to offer excellent engineering structures at reasonable cost and in the earliest possible time.</p>
            </div>
            <div className="value-card">
              <h3><Check size={20} />Goals</h3>
              <p>To provide a full range of construction products and services to a wide customer base, grow our business across market sectors, and deliver high-quality projects safely, professionally and on time.</p>
            </div>
            <div className="value-card">
              <h3><Check size={20} />Our people</h3>
              <p>Our people are our real asset. With positive attitudes, respect and fairness to all clients, we follow company standards and systems and endeavour to exceed expectations.</p>
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
          <p>Have a question about a project or service?</p>
          <a className="button button--dark" href={`tel:${company.rawPhone}`}>Call us now</a>
        </div>
      </section>
    </>
  );
}
