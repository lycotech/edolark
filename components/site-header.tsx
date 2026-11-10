"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/data";
import { Logo } from "./logo";
import { Magnetic } from "./motion";
import { SocialLinks } from "./social-links";

const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Contact us", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-menu" : ""}`}>
        <div className="header__inner shell">
          <Logo onClick={() => setOpen(false)} />

          <nav className="header__nav" aria-label="Main navigation">
            {links.slice(0, 5).map((link) => (
              <Link key={link.href} href={link.href} className={isActive(link.href) ? "is-active" : ""}>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="header__actions">
            <Magnetic>
              <Link className="btn btn--red btn--sm header__cta" href="/contact">
                Let&apos;s talk <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <button
              className={`burger${open ? " is-open" : ""}`}
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="burger__label">{open ? "Close" : "Menu"}</span>
              <span className="burger__lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <div className="menu__inner shell">
          <nav className="menu__links" aria-label="Mobile navigation">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "is-active" : ""}
                style={{ "--i": i } as CSSProperties}
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={28} strokeWidth={1.2} />
              </Link>
            ))}
          </nav>
          <div className="menu__aside">
            <p className="eyebrow">Get in touch</p>
            <a href={`tel:${company.rawPhone}`}><Phone size={16} />{company.phone}</a>
            <a href={`mailto:${company.email}`}><Mail size={16} />{company.email}</a>
            <p><MapPin size={16} />{company.address.join(", ")}</p>
            <SocialLinks light />
          </div>
        </div>
      </div>
    </>
  );
}
