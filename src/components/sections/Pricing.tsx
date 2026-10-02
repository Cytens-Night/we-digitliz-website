"use client";
import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { money, packages, serviceOptions, type ServiceOption, whatsappUrl } from "@/lib/business";
export default function Pricing() {
  const [mode, setMode] = useState<"packages" | "custom">("packages");
  const [selected, setSelected] = useState<string[]>([]);
  const items = serviceOptions.filter(item => selected.includes(item.id));
  const upfront = items.reduce((sum, item) => sum + item.price, 0);
  const monthly = items.reduce((sum, item) => sum + item.monthly, 0);
  const hasQuotedItems = items.some(item => item.quoteOnly);
  function toggle(item: ServiceOption) {
    setSelected(current => current.includes(item.id) ? current.filter(id => id !== item.id) : [...current.filter(id => !item.group || serviceOptions.find(option => option.id === id)?.group !== item.group), item.id]);
  }
  const brief = ["Hello wedigitlize, I would like a quote for:", ...items.map(item => `• ${item.title}: ${item.quoteOnly ? "quote required" : `${money(item.price)} setup${item.monthly ? ` + ${money(item.monthly)}/month` : ""}`}`), `Indicative setup subtotal: ${money(upfront)}${hasQuotedItems ? " + quoted services" : ""}`, `Monthly subtotal: ${money(monthly)}${hasQuotedItems ? " + any agreed recurring services" : ""}`, "Please confirm the scope, total price and delivery schedule."].join("\n");
  return <section id="pricing" className="wd-section wd-pricing"><div className="wd-shell">
    <div className="wd-section-heading"><div><p className="wd-eyebrow">Straightforward starting points</p><h2>Your next move.<br />Clearly scoped.</h2></div><p>Start with a package or put together a brief. We confirm the full scope and final quote before work begins.</p></div>
    <div className="wd-switch" role="group" aria-label="Pricing view"><button aria-pressed={mode === "packages"} onClick={() => setMode("packages")}>Website packages</button><button aria-pressed={mode === "custom"} onClick={() => setMode("custom")}>Build your brief</button></div>
    {mode === "packages" ? <div className="wd-package-grid">{packages.map(pack => <article className={`wd-package ${pack.recommended ? "wd-package-recommended" : ""}`} key={pack.id}>
      <div className="wd-package-label">{pack.recommended ? "A connected starting point" : "Website package"}</div><h3>{pack.name}</h3><p>{pack.description}</p><div className="wd-price"><small>From</small><strong>{money(pack.price)}</strong><span>one-off project</span></div>
      <ul>{pack.features.map(feature => <li key={feature}><Check size={17}/><span>{feature}</span></li>)}</ul><a className={`wd-button ${pack.recommended ? "" : "wd-button-outline"}`} href={whatsappUrl(`Hello wedigitlize, I’m interested in the ${pack.name} package, advertised from ${money(pack.price)}. Please confirm the scope and final quote.`)} target="_blank" rel="noopener noreferrer">Discuss {pack.name}</a>
    </article>)}</div> : <div className="wd-builder"><div>{Array.from(new Set(serviceOptions.map(item => item.category))).map(category => <fieldset className="wd-builder-group" key={category}><legend>{category}</legend>{serviceOptions.filter(item => item.category === category).map(item => <label className={`wd-option ${selected.includes(item.id) ? "wd-option-selected" : ""}`} key={item.id}><input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item)}/><span><strong>{item.title}</strong><small>{item.description}</small></span><span className="wd-option-price">{item.quoteOnly ? "Quoted" : <>{item.price ? `From ${money(item.price)}` : ""}{item.monthly ? `${item.price ? " + " : "From "}${money(item.monthly)}/mo` : ""}</>}</span></label>)}</fieldset>)}</div>
      <aside className="wd-brief-summary" aria-label="Your project brief"><h3>Your project brief</h3><p>Select the services you need. Website sizes and digital card types replace each other.</p>{items.length ? <ul>{items.map(item => <li key={item.id}><span>{item.title}</span><button aria-label={`Remove ${item.title}`} onClick={() => toggle(item)}>Remove</button></li>)}</ul> : <div className="wd-brief-empty">Your selected services will appear here.</div>}<div className="wd-subtotal" aria-live="polite"><span>Indicative setup subtotal</span><strong>{money(upfront)}</strong>{hasQuotedItems && <small>Plus services requiring a quote</small>}<span>Monthly subtotal</span><strong>{money(monthly)}<small> / month</small></strong></div>{items.length ? <a className="wd-button" href={whatsappUrl(brief)} target="_blank" rel="noopener noreferrer">Discuss this brief on WhatsApp</a> : <button className="wd-button" disabled>Select a service to continue</button>}<Link href="/#contact" className="wd-text-link">Prefer an enquiry form?</Link><button className="wd-reset" disabled={!items.length} onClick={() => setSelected([])}>Clear selections</button></aside>
    </div>}
    <p className="wd-pricing-note">Prices in GBP are starting estimates. The written quote confirms any applicable tax, payment milestones, delivery dates and revision limits. Hosting, domains, paid tools, advertising spend and app store fees are quoted separately. Ongoing support has an agreed allowance. Enterprise includes mobile discovery; a complete native app is quoted separately.</p>
    <div className="wd-faq"><h3>A few useful answers.</h3>{[
      ["What happens after I enquire?", "We review your goals and ask any useful questions, then provide a written scope and quote. Sending an enquiry does not commit you to a purchase."],
      ["Can you improve an existing website?", "Yes. We can review an existing site, fix problems and improve its design, content, performance and enquiry flow. The quote reflects what the existing project needs."],
      ["What do I need to provide?", "Your business details, existing brand assets, page content and access to any agreed accounts. We identify missing items during discovery and can quote for content or branding help."],
      ["Do you offer ongoing support?", "Yes. Website care starts from £50 per month for a defined scope. Larger changes, new features and external service fees are agreed separately."],
    ].map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
  </div></section>;
}
