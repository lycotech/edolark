import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact Edolark Ltd in Lagos. Visit our office at 1 Ogunyemi Street, Pedro, Gbagada, or reach us by phone, WhatsApp, Instagram or email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" subtitle="Get in touch" image="/VIEW 7.png" />
      <section className="contact-page shell" aria-labelledby="contact-title">
        <div className="contact-page__info">
          <p className="eyebrow">Start a conversation</p>
          <h2 id="contact-title">Let&apos;s talk about your next home.</h2>
          <p>Visit our office, call, message or fill the form — an Edolark advisor will respond as soon as possible.</p>

          <div className="contact-page__details">
            <p><MapPin size={18} />{company.address.join(", ")}</p>
            <a href={`tel:${company.rawPhone}`}><Phone size={18} />{company.phone}</a>
            <a href={`mailto:${company.email}`}><Mail size={18} />{company.email}</a>
          </div>

          <SocialLinks />

          <div className="contact-page__actions">
            <a className="button button--dark" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowUpRight size={18} /></a>
            <Link className="button button--outline" href="/projects">View projects <ArrowUpRight size={18} /></Link>
          </div>
        </div>
        <div className="contact-page__form">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
