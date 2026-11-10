"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <svg viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M14 27l8 8 16-17" />
        </svg>
        <p className="eyebrow">Message received</p>
        <h2>Thank you. We&apos;ll be in <em>touch.</em></h2>
        <p>An EDOLARK advisor will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <div className="field">
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder=" " required />
          <label htmlFor="contact-name">Full name</label>
          <span className="field__bar" />
        </div>
        <div className="field">
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder=" " required />
          <label htmlFor="contact-phone">Phone number</label>
          <span className="field__bar" />
        </div>
      </div>
      <div className="field">
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder=" " required />
        <label htmlFor="contact-email">Email address</label>
        <span className="field__bar" />
      </div>
      <div className="field field--select">
        <select id="contact-interest" name="interest" defaultValue="">
          <option value="" disabled>Select an option</option>
          <option value="buy">Buying a home</option>
          <option value="sell">Selling a property</option>
          <option value="invest">Investment opportunities</option>
          <option value="build">Design &amp; construction</option>
          <option value="project">A specific project</option>
          <option value="other">Something else</option>
        </select>
        <label htmlFor="contact-interest">I am interested in</label>
        <span className="field__bar" />
      </div>
      <div className="field">
        <textarea id="contact-message" name="message" rows={4} placeholder=" " />
        <label htmlFor="contact-message">How can we help?</label>
        <span className="field__bar" />
      </div>
      <button className="btn btn--red form__submit" type="submit">
        Send message <ArrowRight size={18} />
      </button>
      <small>By submitting, you agree to be contacted about your enquiry.</small>
    </form>
  );
}
