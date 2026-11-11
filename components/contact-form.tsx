"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { company } from "@/lib/data";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // spam bot
    setSending(true);
    setError(false);
    try {
      const payload = { ...data, _subject: `New website enquiry from ${data.name}`, _replyto: data.email, _template: "table", _captcha: "false" };
      const email = fetch(`https://formsubmit.co/ajax/${company.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      }).then((response) => response.ok);
      const store = fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => Boolean(result.stored));
      const [emailed, stored] = await Promise.allSettled([email, store]);
      const ok = (outcome: PromiseSettledResult<boolean>) => outcome.status === "fulfilled" && outcome.value;
      if (!ok(emailed) && !ok(stored)) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
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
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
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
      {error && (
        <p className="form__error" role="alert">
          Sorry, your message could not be sent. Please try again or email us at {company.email}.
        </p>
      )}
      <button className="btn btn--red form__submit" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"} <ArrowRight size={18} />
      </button>
      <small>By submitting, you agree to be contacted about your enquiry.</small>
    </form>
  );
}
