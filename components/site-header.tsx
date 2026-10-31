"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./logo";

const links = [
  { label: "Properties", href: "#properties" },
  { label: "About us", href: "#about" },
  { label: "Our services", href: "#services" },
];

export function SiteHeader({ onEnquire }: { onEnquire: () => void }) {
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

  return (
    <header className={`site-header ${scrolled || menuOpen ? "site-header--solid" : ""}`}>
      <div className="site-header__inner shell">
        <Logo light={!scrolled && !menuOpen} onClick={() => setMenuOpen(false)} />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button className="header-enquire" type="button" onClick={onEnquire}>
          Let&apos;s talk <ArrowUpRight size={17} strokeWidth={1.8} />
        </button>
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
            <a key={link.href} href={link.href} tabIndex={menuOpen ? undefined : -1} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{link.label}<ArrowUpRight size={20} />
            </a>
          ))}
          <button type="button" tabIndex={menuOpen ? undefined : -1} onClick={() => { setMenuOpen(false); onEnquire(); }}>
            Book a consultation <ArrowUpRight size={19} />
          </button>
        </nav>
      </div>
    </header>
  );
}
