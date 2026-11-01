"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success form-success--boxed" role="status">
        <span><Check size={28} /></span>
        <p className="eyebrow">Message received</p>
        <h2>Thank you. We&apos;ll be in touch.</h2>
        <p>An EDOLARK advisor will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form className="enquiry-form enquiry-form--page" onSubmit={submit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Full name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-phone">Phone number</label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="+234 000 000 0000" required />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </div>
      <div className="form-field">
        <label htmlFor="contact-interest">I am interested in</label>
        <select id="contact-interest" name="interest" defaultValue="">
          <option value="" disabled>Select an option</option>
          <option value="buy">Buying a home</option>
          <option value="sell">Selling a property</option>
          <option value="invest">Investment opportunities</option>
          <option value="project">A specific project</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">How can we help?</label>
        <textarea id="contact-message" name="message" rows={4} placeholder="Tell us what you're looking for..." />
      </div>
      <button className="button button--dark form-submit" type="submit">Send message <ArrowRight size={18} /></button>
      <small>By submitting, you agree to be contacted about your enquiry.</small>
    </form>
  );
}
