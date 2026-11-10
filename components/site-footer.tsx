import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/data";
import { Logo } from "./logo";
import { Magnetic, Reveal } from "./motion";
import { SocialLinks } from "./social-links";

export function SiteFooter() {
  return (
    <footer className="footer grain">
      <div className="shell">
        <Reveal className="footer__cta">
          <p className="eyebrow eyebrow--light">Have a project in mind?</p>
          <Link className="footer__big" href="/contact" data-cursor="Talk">
            <span>Let&apos;s build</span>
            <span>something <em>lasting.</em></span>
            <i aria-hidden="true"><ArrowUpRight size={56} strokeWidth={1} /></i>
          </Link>
        </Reveal>

        <div className="footer__grid">
          <div className="footer__brand">
            <Logo />
            <p>{company.slogan}</p>
            <SocialLinks light />
          </div>
          <div className="footer__col">
            <p className="footer__head">Explore</p>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/team">Team</Link>
            <Link href="/contact">Contact us</Link>
          </div>
          <div className="footer__col">
            <p className="footer__head">Contact</p>
            <a href={`mailto:${company.email}`}><Mail size={15} />{company.email}</a>
            <a href={`tel:${company.rawPhone}`}><Phone size={15} />{company.phone}</a>
            <p><MapPin size={15} />{company.address.join(", ")}</p>
          </div>
          <div className="footer__col footer__col--cta">
            <p className="footer__head">Start today</p>
            <Magnetic>
              <a className="btn btn--red" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp <ArrowUpRight size={18} />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="footer__mark" aria-hidden="true">EDOLARK</div>

      <div className="shell footer__bottom">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved. {company.rcNumber}.</p>
        <p>{company.slogan}</p>
      </div>
    </footer>
  );
}
