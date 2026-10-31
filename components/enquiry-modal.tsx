"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Bath, BedDouble, Check, MapPin, Scan, X } from "lucide-react";
import type { Property } from "@/lib/properties";

type EnquiryModalProps = {
  property: Property | null;
  onClose: () => void;
};

export function EnquiryModal({ property, onClose }: EnquiryModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section ref={dialogRef} className={`enquiry-modal ${property ? "enquiry-modal--property" : ""}`} role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
        <button ref={closeRef} className="modal-close" type="button" aria-label="Close enquiry" onClick={onClose}>
          <X size={22} />
        </button>
        {property && (
          <div className="enquiry-modal__property">
            <div className="enquiry-modal__image">
              <Image src={property.image} alt={property.name} fill sizes="(max-width: 800px) 100vw, 45vw" />
            </div>
            <div className="enquiry-modal__property-copy">
              <p><MapPin size={14} />{property.location}</p>
              <h3>{property.name}</h3>
              <strong>{property.price}</strong>
              <div>
                <span><BedDouble size={16} />{property.beds} Beds</span>
                <span><Bath size={16} />{property.baths} Baths</span>
                <span><Scan size={16} />{property.area}</span>
              </div>
            </div>
          </div>
        )}
        <div className="enquiry-modal__form-wrap">
          {submitted ? (
            <div className="form-success" role="status">
              <span><Check size={28} /></span>
              <p className="eyebrow">Enquiry received</p>
              <h2 id="enquiry-title">Thank you. We&apos;ll be in touch.</h2>
              <p>An EDOLARK property advisor will contact you shortly to discuss {property ? property.name : "your property goals"}.</p>
              <button className="button button--dark" type="button" onClick={onClose}>Back to exploring <ArrowRight size={17} /></button>
            </div>
          ) : (
            <>
              <p className="eyebrow">A conversation, not a commitment</p>
              <h2 id="enquiry-title">{property ? "Make this home yours." : "Let's find your place."}</h2>
              <p className="modal-intro">Share your details and one of our property advisors will get in touch.</p>
              <form className="enquiry-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="enquiry-name">Full name</label>
                    <input id="enquiry-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="enquiry-phone">Phone number</label>
                    <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="+234 000 000 0000" required />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-email">Email address</label>
                  <input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </div>
                <div className="form-field">
                  <label htmlFor="enquiry-message">How can we help?</label>
                  <textarea id="enquiry-message" name="message" rows={3} defaultValue={property ? `I'm interested in ${property.name}. Please contact me with more details.` : ""} placeholder="Tell us what you're looking for..." />
                </div>
                <button className="button button--dark form-submit" type="submit">Send enquiry <ArrowRight size={18} /></button>
                <small>By submitting, you agree to be contacted about your enquiry.</small>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
