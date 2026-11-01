import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/data";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo light />
            <p>Exceptional homes.<br />Lasting value.</p>
          </div>
          <div className="footer-column">
            <p className="footer-heading">Explore</p>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/team">Team</Link>
            <Link href="/contact">Contact us</Link>
          </div>
          <div className="footer-column footer-contact">
            <p className="footer-heading">Get in touch</p>
            <a href={`mailto:${company.email}`}><Mail size={16} />{company.email}</a>
            <a href={`tel:${company.rawPhone}`}><Phone size={16} />{company.phone}</a>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>Instagram</a>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>WhatsApp</a>
            <p><MapPin size={16} />{company.address.join(", ")}</p>
          </div>
          <div className="footer-note">
            <p>Ready to buy, sell or invest in Lagos real estate?</p>
            <Link className="text-link text-link--light" href="/contact">Start a conversation <ArrowUpRight size={17} /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>{company.slogan}</p>
          <Link href="#top">Back to top <ArrowUpRight size={15} /></Link>
        </div>
      </div>
    </footer>
  );
}
