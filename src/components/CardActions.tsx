"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Copy, Send, Mail, Phone, UserPlus } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { business } from "@/lib/business";

export type CardAction = "website" | "email" | "phone";

/** Every action is a view inside the phone, rather than a page-level modal. */
export default function CardActions({ type, onClose }: { type: CardAction; onClose: () => void }) {
  const back = useRef<HTMLButtonElement>(null);
  const [subscribe, setSubscribe] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => { back.current?.focus({ preventScroll: true }); }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(business.email);
      setCopied(true);
      setManual(false);
    } catch {
      setManual(true);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("bot-field")) return;
    setPending(true);
    setMessage("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams([...data].map(([key, value]) => [key, String(value)])).toString(),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Request failed");
      setMessage("Thank you — your subscription request has been received.");
      form.reset();
    } catch {
      setMessage("We couldn’t save your request. Try again or email the studio.");
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  }

  function goBack() {
    if (subscribe) { setSubscribe(false); setMessage(""); }
    else onClose();
  }

  return <section className={`un-card-view ${type === "website" ? "un-website-view" : ""}`} aria-labelledby="un-action-title" onKeyDown={event => {
    if (event.key === "Escape") { event.stopPropagation(); goBack(); }
  }}>
    <header className="un-view-toolbar">
      <button ref={back} onClick={goBack} aria-label={subscribe ? "Back to email options" : "Back to card"}><ArrowLeft size={18}/><span>{subscribe ? "Email" : "Back"}</span></button>
      <Logo className="un-view-logo"/>
    </header>
    {type === "website" ? <>
      <div className="un-view-heading"><span className="un-card-eyebrow">THE DIGITAL STUDIO</span><h2 id="un-action-title">Explore our world.</h2><p>A live look at our work and services.</p></div>
      <div className="un-website-frame"><iframe src="/" title="wedigitlize website preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" allow="clipboard-write"/></div>
      <a className="un-card-button un-card-primary" href="/" target="_blank" rel="noopener noreferrer">Open full website<ArrowUpRight size={17}/></a>
    </> : <div className="un-card-pane">
      {type === "phone" ? <>
        <div className="un-view-heading"><span className="un-card-eyebrow">LET’S CONNECT</span><h2 id="un-action-title">Your next project<br/>starts here.</h2><p>{business.phoneLabel}</p></div>
        <div className="un-action-options">
          <a href={`tel:${business.phone}`}><Phone size={19}/><span>Call the studio<small>Speak with us directly</small></span><ArrowUpRight size={15}/></a>
          <a href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={19}/><span>Save our contact<small>Logo, details and service keywords</small></span><ArrowUpRight size={15}/></a>
        </div>
        <div className="un-contact-preview"><Image src="/contact-logo.jpg" width={48} height={48} alt="wedigitlize contact logo" unoptimized/><div><strong>wedigitlize</strong><span>WEDIGITLIZE LTD</span></div></div>
        <p className="un-action-note">Open the downloaded contact and choose Add or Save on your phone. Our services are included in its notes so you can find us again.</p>
        <p className="un-action-note">Contact photos and keyword search depend on your contacts app.</p>
      </> : subscribe ? <>
        <div className="un-view-heading"><span className="un-card-eyebrow">STUDIO UPDATES</span><h2 id="un-action-title">Stay in the loop.</h2><p>New work and useful ideas for your business, occasionally.</p></div>
        <form name="studio-updates" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="un-subscribe-form">
          <input type="hidden" name="form-name" value="studio-updates"/>
          <input type="hidden" name="subject" value="wedigitlize studio updates subscription"/>
          <input type="hidden" name="source" value="Digital business card"/>
          <input type="hidden" name="consent-version" value="Studio updates opt-in v1 — 2026-10-03"/>
          <p hidden><label>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
          <label>Email address<input name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@yourbusiness.com" required maxLength={254}/></label>
          <label className="un-subscribe-consent"><input type="checkbox" name="consent" value="I agree to receive occasional wedigitlize studio updates by email." required/><span>I’d like occasional wedigitlize updates by email. I can unsubscribe by emailing the studio.</span></label>
          <button className="un-card-button un-card-primary" disabled={pending}>{pending ? "Saving…" : "Subscribe"}<Mail size={17}/></button>
          <p className="un-action-note">Read our <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">privacy notice</a>. We use your email for the updates you’ve requested.</p>
          <p className="un-form-status" role="status" aria-live="polite">{message}</p>
        </form>
      </> : <>
        <div className="un-view-heading"><span className="un-card-eyebrow">LET’S CONNECT</span><h2 id="un-action-title">Good ideas start<br/>a conversation.</h2><p>{business.email}</p></div>
        <div className="un-action-options">
          <button onClick={copyEmail}><Copy size={19}/><span>{copied ? "Email copied" : "Copy email address"}<small>{copied ? "Ready to paste" : "Keep our address handy"}</small></span></button>
          <a href={`mailto:${business.email}?subject=${encodeURIComponent("Let’s discuss a project")}`}><Send size={19}/><span>Send an email<small>Open your email app</small></span><ArrowUpRight size={15}/></a>
          <button onClick={() => setSubscribe(true)}><Mail size={19}/><span>Subscribe to updates<small>Our latest work and studio news</small></span><ArrowUpRight size={15}/></button>
        </div>
        <p className="un-form-status" role="status" aria-live="polite">{copied ? "Email address copied." : ""}</p>
        {manual && <label className="un-action-manual">Copy our email<input readOnly value={business.email} onFocus={event => event.currentTarget.select()}/></label>}
      </>}
    </div>}
  </section>;
}
