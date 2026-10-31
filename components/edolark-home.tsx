"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { properties, type Property } from "@/lib/properties";
import { EnquiryModal } from "./enquiry-modal";
import { HeroSearch, type SearchFilters } from "./hero-search";
import { Logo } from "./logo";
import { PropertyCard } from "./property-card";
import { SiteHeader } from "./site-header";

const emptySearch: SearchFilters = { location: "All locations", type: "All types", budget: "Any budget" };
const tabs = ["All", "Villa", "Apartment", "Duplex"];

export function EdolarkHome() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(emptySearch);
  const [showAll, setShowAll] = useState(false);
  const [saved, setSaved] = useState<number[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("edolark-saved");
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSaved(parsed.filter((id): id is number => typeof id === "number"));
        }
      }
    } catch {
      // Saved homes remain available for this session if storage is unavailable.
    }
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const selectedType = searchFilters.type !== "All types" ? searchFilters.type : activeTab;
      const matchesType = selectedType === "All" || property.type === selectedType;
      const matchesLocation = searchFilters.location === "All locations" || property.location.includes(searchFilters.location);
      const matchesBudget =
        searchFilters.budget === "Any budget" ||
        (searchFilters.budget === "Under ₦250m" && property.numericPrice < 250) ||
        (searchFilters.budget === "₦250m – ₦500m" && property.numericPrice >= 250 && property.numericPrice <= 500) ||
        (searchFilters.budget === "Above ₦500m" && property.numericPrice > 500);
      return matchesType && matchesLocation && matchesBudget;
    });
  }, [activeTab, searchFilters]);

  const visibleProperties = showAll ? filteredProperties : filteredProperties.slice(0, 3);

  function handleSearch(filters: SearchFilters) {
    setSearchFilters(filters);
    setActiveTab("All");
    setShowAll(true);
    window.setTimeout(() => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleTab(tab: string) {
    setActiveTab(tab);
    setSearchFilters(emptySearch);
    setShowAll(false);
  }

  function toggleSaved(id: number) {
    setSaved((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try {
        window.localStorage.setItem("edolark-saved", JSON.stringify(next));
      } catch {
        // Ignore storage restrictions; the UI state still updates.
      }
      return next;
    });
  }

  function openProperty(property: Property) {
    setSelectedProperty(property);
    setEnquiryOpen(true);
  }

  const openGeneralEnquiry = useCallback(() => {
    setSelectedProperty(null);
    setEnquiryOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setEnquiryOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader onEnquire={openGeneralEnquiry} />
      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero__image"
            src="/images/hero.jpg"
            alt="Contemporary luxury residence with warm interior lighting"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__veil" />
          <div className="hero__content shell">
            <p className="hero__eyebrow"><span /> Thoughtful homes. Lasting value.</p>
            <h1 id="hero-title">Live <em>beautifully.</em><br />Invest wisely.</h1>
            <p className="hero__intro">Distinctive homes and considered property advice,<br className="desktop-break" /> in Lagos&apos; most desirable neighbourhoods.</p>
            <a className="hero__explore" href="#properties">Explore our residences <span><ArrowDown size={18} /></span></a>
          </div>
          <div className="hero__search shell">
            <HeroSearch onSearch={handleSearch} />
          </div>
          <p className="hero__side-note">CURATED HOMES · LAGOS, NIGERIA</p>
        </section>

        <section className="intro-section shell" aria-labelledby="intro-title">
          <div className="intro-section__label">
            <p className="eyebrow">The EDOLARK approach</p>
            <span className="fine-line" />
          </div>
          <div className="intro-section__content">
            <h2 id="intro-title">Finding a home should feel<br />as good as <em>living in one.</em></h2>
            <div className="intro-section__copy">
              <p>We bring together exceptional properties, local insight and genuinely personal service to make every move feel effortless.</p>
              <a className="text-link" href="#about">Discover our story <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="properties-section" id="properties" aria-labelledby="properties-title">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Handpicked for you</p>
                <h2 id="properties-title">Featured residences</h2>
              </div>
              <div className="property-tabs" role="group" aria-label="Filter by property type">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={activeTab === tab && searchFilters.type === "All types" ? "active" : ""}
                    aria-pressed={activeTab === tab && searchFilters.type === "All types"}
                    onClick={() => handleTab(tab)}
                  >
                    {tab === "All" ? "All homes" : `${tab}s`}
                  </button>
                ))}
              </div>
            </div>
            <p className="sr-only" role="status" aria-live="polite">{filteredProperties.length} properties found</p>
            {visibleProperties.length > 0 ? (
              <div className="property-grid">
                {visibleProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} saved={saved.includes(property.id)} onSave={toggleSaved} onOpen={openProperty} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <Home size={34} strokeWidth={1.3} />
                <h3>No exact matches, yet.</h3>
                <p>Try a different location or budget, or let us find the right home for you.</p>
                <button className="button button--dark" type="button" onClick={() => { setSearchFilters(emptySearch); setActiveTab("All"); }}>Clear all filters</button>
              </div>
            )}
            {filteredProperties.length > 3 && (
              <div className="properties-more">
                <button className="button button--outline" type="button" onClick={() => setShowAll((visible) => !visible)}>
                  {showAll ? "Show fewer homes" : `View all ${filteredProperties.length} residences`}
                  {showAll ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-section__image">
            <Image
              src="/images/about.jpg"
              alt="Elegant, light-filled living space with natural textures"
              fill
              sizes="(max-width: 850px) 100vw, 50vw"
            />
            <div className="about-section__image-note"><span>E</span><p>Spaces with soul.<br />Service with substance.</p></div>
          </div>
          <div className="about-section__content">
            <p className="eyebrow eyebrow--light">More than a property company</p>
            <h2 id="about-title">We see the person<br />behind every <em>move.</em></h2>
            <p className="about-section__lead">A home is never just a transaction. It is where life unfolds, where memories settle, and where your future takes shape.</p>
            <p>That is why we take the time to understand what matters to you—then pair honest advice with a carefully curated portfolio to help you move with confidence.</p>
            <ul className="about-values">
              <li><Check size={17} />Carefully verified opportunities</li>
              <li><Check size={17} />Clear, straightforward guidance</li>
              <li><Check size={17} />Support from first viewing to keys in hand</li>
            </ul>
            <button className="text-link text-link--light" type="button" onClick={openGeneralEnquiry}>Meet your property advisor <ArrowUpRight size={18} /></button>
          </div>
        </section>

        <section className="services-section shell" id="services" aria-labelledby="services-title">
          <div className="services-section__heading">
            <div>
              <p className="eyebrow">Considered at every step</p>
              <h2 id="services-title">Expertise that feels personal.</h2>
            </div>
            <p>Whatever your next move looks like, our experience and attention to detail make it simpler.</p>
          </div>
          <div className="services-grid">
            <article className="service-card">
              <div className="service-card__top"><span>01</span><KeyRound size={29} strokeWidth={1.25} /></div>
              <h3>Buy a home</h3>
              <p>From first shortlist to final signature, we help you find a home that fits your life—not just your checklist.</p>
              <a href="#properties" aria-label="Explore homes to buy">Explore residences <ArrowUpRight size={17} /></a>
            </article>
            <article className="service-card service-card--accent">
              <div className="service-card__top"><span>02</span><Building2 size={29} strokeWidth={1.25} /></div>
              <h3>Sell with us</h3>
              <p>Thoughtful positioning, qualified buyers and skilled negotiation, all focused on achieving the right result.</p>
              <button type="button" onClick={openGeneralEnquiry}>Request a valuation <ArrowUpRight size={17} /></button>
            </article>
            <article className="service-card">
              <div className="service-card__top"><span>03</span><ShieldCheck size={29} strokeWidth={1.25} /></div>
              <h3>Invest wisely</h3>
              <p>Local intelligence and carefully assessed opportunities to help you build a property portfolio with purpose.</p>
              <button type="button" onClick={openGeneralEnquiry}>Speak to an advisor <ArrowUpRight size={17} /></button>
            </article>
          </div>
        </section>

        <section className="promise-section" aria-label="Our commitment">
          <Image
            src="/images/promise.jpg"
            alt="Warm contemporary home interior"
            fill
            sizes="100vw"
          />
          <div className="promise-section__overlay" />
          <div className="promise-section__content shell">
            <p className="eyebrow eyebrow--light">Our promise to you</p>
            <blockquote>“The right home changes<br />more than your <em>address.</em>”</blockquote>
            <button className="round-link" type="button" onClick={openGeneralEnquiry} aria-label="Start your property journey">
              <span>Start your<br />journey</span><ArrowUpRight size={24} strokeWidth={1.3} />
            </button>
          </div>
        </section>

        <section className="contact-section shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-section__mark" aria-hidden="true">E</div>
          <div className="contact-section__content">
            <p className="eyebrow">Your next chapter starts here</p>
            <h2 id="contact-title">Let&apos;s find a place<br />you&apos;ll love to call <em>home.</em></h2>
          </div>
          <div className="contact-section__action">
            <p>Tell us what you are looking for.<br />We&apos;ll take it from there.</p>
            <button className="button button--dark" type="button" onClick={openGeneralEnquiry}>Book a consultation <ArrowUpRight size={18} /></button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <div className="footer-main">
            <div className="footer-brand">
              <Logo light />
              <p>Exceptional homes.<br />Enduring value.</p>
            </div>
            <div className="footer-column">
              <p className="footer-heading">Explore</p>
              <a href="#properties">Properties</a>
              <a href="#about">About us</a>
              <a href="#services">Our services</a>
              <button type="button" onClick={openGeneralEnquiry}>Contact us</button>
            </div>
            <div className="footer-column footer-contact">
              <p className="footer-heading">Get in touch</p>
              <a href="mailto:hello@edolark.com"><Mail size={16} />hello@edolark.com</a>
              <a href="tel:+2348100000000"><Phone size={16} />+234 810 000 0000</a>
              <p><MapPin size={16} />Lagos, Nigeria</p>
            </div>
            <div className="footer-note">
              <p>Looking for something particular?</p>
              <button className="text-link text-link--light" type="button" onClick={openGeneralEnquiry}>Tell us what you need <ArrowUpRight size={17} /></button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EDOLARK. All rights reserved.</p>
            <p>Real estate, reimagined.</p>
            <a href="#top">Back to top <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </footer>
      {enquiryOpen && <EnquiryModal property={selectedProperty} onClose={closeEnquiry} />}
    </>
  );
}
