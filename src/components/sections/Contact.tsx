"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { business, whatsappUrl } from "@/lib/business";
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const pending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("sending");
    const body = new URLSearchParams();
    new FormData(event.currentTarget).forEach((value,key) => { if (typeof value === "string") body.append(key,value); });
    try {
      const response = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString(), signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      formRef.current?.reset();
    } catch { setStatus("error"); } finally { pending.current = false; }
  }
  return <section id="contact" className="wd-section wd-contact"><div className="wd-shell wd-contact-grid"><div><p className="wd-eyebrow">Let’s make it happen</p><h2>Tell us what<br />you have in mind.</h2><p className="wd-lead">A new business, a better website or an idea for an app. Share a little about your project and we’ll take it from there.</p><a className="wd-contact-email" href={`mailto:${business.email}`}>{business.email}</a><a href={`tel:${business.phone}`}>{business.phoneLabel}</a><div className="wd-actions"><a className="wd-button wd-button-outline" href={whatsappUrl("Hello wedigitlize, I’d like to discuss a project.")} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></div><p>London · Working worldwide</p></div>
    <form ref={formRef} name="project-enquiry" method="POST" action="/__forms.html" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit} className="wd-contact-form">
      <input type="hidden" name="form-name" value="project-enquiry"/><input type="hidden" name="subject" value="New wedigitlize project enquiry"/><div hidden><label>Leave this blank<input name="bot-field" autoComplete="off" tabIndex={-1}/></label></div>
      <div className="wd-form-row"><label htmlFor="enquiry-name">Your name<input id="enquiry-name" name="name" required autoComplete="name" maxLength={100} placeholder="Your name"/></label><label htmlFor="enquiry-email">Email address<input id="enquiry-email" name="email" required type="email" autoComplete="email" maxLength={254} placeholder="you@company.com"/></label></div>
      <label htmlFor="enquiry-company">Business name <span>(optional)</span><input id="enquiry-company" name="company" autoComplete="organization" maxLength={150} placeholder="Your business"/></label>
      <div className="wd-form-row"><label htmlFor="enquiry-service">What do you need?<select id="enquiry-service" name="service" defaultValue="" required><option value="" disabled>Select a service</option>{["Website / landing page","Digital business card","Branding & design","Web app / mobile app","E-commerce / booking","Social media & content","Automation / integrations","Improve an existing site","Not sure yet"].map(s => <option key={s}>{s}</option>)}</select></label><label htmlFor="enquiry-budget">Project budget <span>(optional)</span><select id="enquiry-budget" name="budget" defaultValue="Not decided"><option>Not decided</option><option>Under £1,000</option><option>£1,000–£3,000</option><option>£3,000–£6,000</option><option>£6,000+</option></select></label></div>
      <label htmlFor="enquiry-message">A little about your project<textarea id="enquiry-message" name="message" required minLength={10} maxLength={5000} rows={5} placeholder="What are you hoping to create or improve?"/></label>
      <p className="wd-form-note">We use these details to respond to your enquiry. Read our <Link href="/privacy-policy">privacy notice</Link>.</p>
      <div aria-live="polite" aria-atomic="true">{status === "success" && <p className="wd-form-success" role="status">Thank you — your enquiry has been received. We’ll contact you using the email you provided.</p>}{status === "error" && <p className="wd-form-error" role="alert">We couldn’t confirm your enquiry was received. Your details are still here. Please try again or contact us by email or WhatsApp.</p>}</div>
      <button className="wd-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending your enquiry…" : "Send your enquiry"}</button>
    </form></div></section>;
}
