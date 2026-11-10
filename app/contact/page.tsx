import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/data";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal, SplitText } from "@/components/motion";
import { SocialLinks } from "@/components/social-links";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Contact Edolark Ltd in Lagos. Visit our office at 1 Ogunyemi Street, Pedro, Gbagada, or reach us by phone, WhatsApp, Instagram or email.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cards = [
    { icon: Phone, label: "Call us", value: company.phone, href: `tel:${company.rawPhone}` },
    { icon: Mail, label: "Email us", value: company.email, href: `mailto:${company.email}` },
    { icon: ArrowUpRight, label: "WhatsApp", value: "Chat with an advisor", href: `https://wa.me/${company.whatsapp}`, external: true },
  ];

  return (
    <>
      <PageHero
        title={"Contact\n*us*"}
        subtitle="Get in touch"
        image="/img/pexels-ansar-muhammad-380085065-27604148.jpg"
      />
      <section className="contact-page section shell" aria-labelledby="contact-title">
        <div className="contact-page__info">
          <Reveal><p className="eyebrow">Start a conversation</p></Reveal>
          <SplitText id="contact-title" text={"Let's talk about\nyour next *project.*"} />
          <Reveal delay={150}>
            <p className="contact-page__lead">Visit our office, call, message or fill in the form — an Edolark advisor will respond as soon as possible.</p>
          </Reveal>

          <div className="contact-cards">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 90}>
                <a
                  className="ccard"
                  href={card.href}
                  {...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="ccard__icon"><card.icon size={20} strokeWidth={1.4} /></span>
                  <span>
                    <span className="ccard__label">{card.label}</span>
                    <span className="ccard__value">{card.value}</span>
                  </span>
                  <ArrowUpRight className="ccard__arrow" size={20} strokeWidth={1.3} />
                </a>
              </Reveal>
            ))}
            <Reveal delay={270}>
              <div className="ccard ccard--static">
                <span className="ccard__icon"><MapPin size={20} strokeWidth={1.4} /></span>
                <span>
                  <span className="ccard__label">Visit us</span>
                  <span className="ccard__value">{company.address.join(", ")}</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}><SocialLinks /></Reveal>
          <Reveal delay={350}>
            <Link className="link-arrow" href="/projects">
              View our projects <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>

        <Reveal variant="left" className="contact-page__form">
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
