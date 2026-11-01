"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";

const links = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

export function SiteHeader({ onEnquire }: { onEnquire?: () => void }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className={`site-header ${scrolled || menuOpen ? "site-header--solid" : ""}`}>
      <div className="site-header__inner shell">
        <Logo light={!scrolled && !menuOpen} onClick={() => setMenuOpen(false)} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(link.href) ? "active" : ""}>
              {link.label}
            </Link>
          ))}
        </nav>
        {onEnquire ? (
          <button className="header-enquire" type="button" onClick={onEnquire}>
            Let&apos;s talk <ArrowUpRight size={17} strokeWidth={1.8} />
          </button>
        ) : (
          <Link className="header-enquire" href="/contact">
            Contact us <ArrowUpRight size={17} strokeWidth={1.8} />
          </Link>
        )}
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="shell" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} tabIndex={menuOpen ? undefined : -1} className={isActive(link.href) ? "active" : ""} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{link.label}<ArrowUpRight size={20} />
            </Link>
          ))}
          {onEnquire ? (
            <button type="button" tabIndex={menuOpen ? undefined : -1} onClick={() => { setMenuOpen(false); onEnquire(); }}>
              Talk to us <ArrowUpRight size={19} />
            </button>
          ) : (
            <Link href="/contact" tabIndex={menuOpen ? undefined : -1} onClick={() => setMenuOpen(false)}>
              Contact us <ArrowUpRight size={19} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
