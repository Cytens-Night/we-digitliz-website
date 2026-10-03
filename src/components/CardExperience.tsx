"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Globe, Phone, Mail, UserPlus, Share2, QrCode, ArrowLeft, Smartphone, Zap, Palette, MessageCircle, ArrowUpRight, CircuitBoard, X } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import { business, whatsappUrl } from "@/lib/business";
import CardActions, { type CardAction } from "@/components/CardActions";
import CardIntro from "@/components/CardIntro";
import "@/app/card/refined-card.css";

const services = [
  { id: "web", title: "Web experiences", icon: Globe, detail: "Distinctive websites, online stores and digital business cards. Clear journeys, responsive layouts and a design that feels like your brand.", scope: "Websites · E-commerce · Digital cards" },
  { id: "apps", title: "Mobile & web apps", icon: Smartphone, detail: "Apps, portals and dashboards shaped around the people who use them. We agree the user journeys, integrations and release scope before building.", scope: "iOS & Android · Portals · SaaS" },
  { id: "automation", title: "Connected systems", icon: Zap, detail: "Bring your tools together and simplify repetitive work. Enquiry flows, CRM integrations and carefully scoped business automations.", scope: "Integrations · Workflows · Business tools" },
  { id: "brand", title: "Brand identity", icon: Palette, detail: "A recognisable identity, from your logo and typography to the details across your website, social content and printed materials.", scope: "Logos · Brand guidelines · Social content" },
];
const qrTargets = [
  { title: "Share this card", label: "Card", url: business.cardUrl, description: "One scan. Every way to connect." },
  { title: "Follow our work", label: "Instagram", url: business.instagram, description: "See our latest work and studio updates." },
  { title: "Explore our studio", label: "Website", url: business.url, description: "Discover our projects and services." },
];

export default function CardExperience() {
  const [action, setAction] = useState<CardAction | null>(null);
  const [showServices, setShowServices] = useState(false);
  const [service, setService] = useState<typeof services[number] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [turning, setTurning] = useState(false);
  const [circuit, setCircuit] = useState(false);
  const [qr, setQr] = useState(0);
  const [status, setStatus] = useState("");
  const [manualLink, setManualLink] = useState(false);
  const qrGallery = useRef<HTMLDivElement>(null);
  const qrContent = useRef<HTMLDivElement>(null);
  const servicePane = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<string>("");
  const frontScreen = useRef<HTMLDivElement>(null);
  const servicesBack = useRef<HTMLButtonElement>(null);
  const qrBack = useRef<HTMLButtonElement>(null);
  const qrTrigger = useRef<HTMLButtonElement>(null);
  const restoreQrFocus = useRef(false);
  const reduced = useReducedMotion();

  function openAction(type: CardAction, trigger: HTMLElement) {
    returnFocus.current = trigger.dataset.cardAction || "";
    setAction(type);
  }
  function closeView() {
    setAction(null); setShowServices(false); setService(null);
    requestAnimationFrame(() => frontScreen.current?.querySelector<HTMLElement>(`[data-card-action="${returnFocus.current}"]`)?.focus({ preventScroll: true }));
  }
  function openServices(trigger: HTMLElement) {
    returnFocus.current = trigger.dataset.cardAction || "";
    setShowServices(true);
  }
  function flip(value: boolean) {
    if (turning) return;
    setTurning(!reduced);
    restoreQrFocus.current = !value;
    setStatus(""); setManualLink(false); setFlipped(value);
  }

  useEffect(() => {
    if (showServices) {
      servicePane.current?.scrollTo({ top: 0, behavior: "auto" });
      servicesBack.current?.focus({ preventScroll: true });
    }
  }, [showServices, service]);
  useEffect(() => {
    if (turning) return;
    if (!flipped) {
      if (restoreQrFocus.current) {
        qrTrigger.current?.focus({ preventScroll: true });
        restoreQrFocus.current = false;
      }
      return;
    }
    qrContent.current?.scrollTo({ top: 0, behavior: "auto" });
    qrBack.current?.focus({ preventScroll: true });
  }, [flipped, turning]);
  useEffect(() => {
    if (!turning) return;
    const timer = setTimeout(() => setTurning(false), 850);
    return () => clearTimeout(timer);
  }, [turning]);
  useEffect(() => {
    if (!status || manualLink) return;
    const timer = setTimeout(() => setStatus(""), 4500);
    return () => clearTimeout(timer);
  }, [status, manualLink]);
  useEffect(() => {
    const gallery = qrGallery.current;
    if (!gallery) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setQr(Number((entry.target as HTMLElement).dataset.index));
    }, { root: gallery, threshold: .65 });
    for (const slide of gallery.children) observer.observe(slide);
    return () => observer.disconnect();
  }, []);

  async function share() {
    setStatus(""); setManualLink(false);
    try {
      if (navigator.share) {
        await navigator.share({ title: "wedigitlize — Design. Build. Connect.", text: "Websites, apps, branding and digital experiences.", url: business.cardUrl });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(business.cardUrl);
        setStatus("Card link copied. Ready to share.");
      } else setManualLink(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setManualLink(true);
    }
  }
  function selectQr(index: number) {
    setQr(index);
    const gallery = qrGallery.current;
    if (gallery) gallery.scrollTo({ left: index * gallery.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }

  const feedback = (status || manualLink) && <div className="un-card-feedback" role="status" aria-live="polite">
    <button aria-label="Dismiss sharing message" onClick={() => { setStatus(""); setManualLink(false); }}><X size={16}/></button>
    {status}
    {manualLink && <label>Copy this card link<input readOnly value={business.cardUrl} onFocus={event => event.currentTarget.select()}/></label>}
  </div>;

  return <main id="main-content" className="unique-card" onKeyDown={event => {
    if (event.key !== "Escape") return;
    if (flipped) flip(false);
    else if (showServices && service) setService(null);
    else if (showServices || action) closeView();
  }}>
    <CardIntro/>
    <div className="un-card-ambience" aria-hidden="true"><div className="un-card-grid"/><div className="un-card-glow un-card-glow-blue"/><div className="un-card-glow un-card-glow-violet"/></div>
    <section className="un-card-scene" aria-label="wedigitlize interactive 3D business card">
      <div className="un-phone-shell">
        <div className="un-phone-parallax" data-screen-open={!!action || showServices || flipped}>
          <div className="perfume-body-container">
            <div className={`phone-body ${flipped ? "flipped" : ""}`} inert={turning} aria-busy={turning}>
              <div className={`phone-front ${circuit ? "un-circuit-on" : ""}`} inert={flipped} aria-hidden={flipped || turning}>
                <div className="circuit-board-bg" aria-hidden="true"/>
                <div className="dynamic-island" aria-hidden="true"><i/><i/></div>
                <div ref={frontScreen} className="phone-screen">
                  {action ? <CardActions key={action} type={action} onClose={closeView}/> : showServices ? <section className="un-card-view" aria-labelledby="un-service-title">
                    <header className="un-view-toolbar"><button ref={servicesBack} onClick={() => service ? setService(null) : closeView()} aria-label={service ? "Back to services" : "Back to card"}><ArrowLeft size={18}/><span>{service ? "Services" : "Back"}</span></button><Logo className="un-view-logo"/></header>
                    <div ref={servicePane} className="un-card-pane">
                      <div className="un-view-heading"><span className="un-card-eyebrow">WHAT WE CREATE</span><h2 id="un-service-title">{service ? service.title : "Your next chapter,\ndigitally crafted."}</h2><p>{service ? service.detail : "From a first website to connected business tools. Tap a service to explore."}</p></div>
                      {service ? <><div className="un-service-symbol"><service.icon size={34}/></div><p className="un-service-scope">{service.scope}</p><a href={whatsappUrl(`Hello wedigitlize, I’d like to discuss ${service.title}.`)} className="un-card-button un-card-primary" target="_blank" rel="noopener noreferrer">Discuss your project<ArrowUpRight size={17}/></a><p className="un-action-note">We confirm the scope, price and delivery plan before work begins.</p></> : <div className="un-phone-service-grid">{services.map(item => <button key={item.id} onClick={() => setService(item)}><span className="un-service-icon"><item.icon size={20}/></span><span>{item.title}<small>{item.scope}</small></span><ArrowUpRight size={15}/></button>)}</div>}
                    </div>
                  </section> : <>
                    <header className="un-phone-toolbar"><button className="un-icon-button" aria-label="Toggle circuit detail" aria-pressed={circuit} onClick={() => setCircuit(!circuit)}><CircuitBoard size={18}/></button><button ref={qrTrigger} className="un-icon-button" aria-label="Flip card to QR codes" onClick={() => flip(true)}><QrCode size={19}/></button></header>
                    <div className="un-card-pane un-profile-pane">
                      <div className="un-phone-brand"><div className="un-phone-mark"><Logo className="un-phone-logo"/></div><span className="un-card-eyebrow">YOUR DIGITAL STUDIO</span><h1>wedigitlize</h1><p>Websites. Apps. Branding.<br/>Built around your business.</p></div>
                      <div className="un-phone-links">
                        <a href={whatsappUrl("Hello wedigitlize, I found your digital card and would like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="un-card-button un-card-primary"><MessageCircle size={18}/><span>Let’s talk on WhatsApp</span><ArrowUpRight size={15}/></a>
                        <button data-card-action="website" onClick={event => openAction("website", event.currentTarget)} className="un-card-button"><Globe size={18}/><span>Preview our website</span><ArrowUpRight size={15}/></button>
                        <button data-card-action="phone" onClick={event => openAction("phone", event.currentTarget)} className="un-card-button"><Phone size={18}/><span>Contact options</span><ArrowUpRight size={15}/></button>
                        <button data-card-action="email" onClick={event => openAction("email", event.currentTarget)} className="un-card-button"><Mail size={18}/><span>Email & updates</span><ArrowUpRight size={15}/></button>
                      </div>
                      <button data-card-action="services" className="un-phone-explore" onClick={event => openServices(event.currentTarget)}><span>Explore our services</span><ArrowUpRight size={15}/></button>
                      <p className="un-card-location">London studio · Working worldwide</p>
                    </div>
                    <nav className="un-phone-dock" aria-label="Quick contact actions">
                      <a href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit wedigitlize on Instagram"><FiInstagram size={19}/><span>Instagram</span></a>
                      <a href="/wedigitlize.vcf" download="wedigitlize.vcf" aria-label="Save contact"><UserPlus size={20}/><span>Save contact</span></a>
                      <button aria-label="Share this card" onClick={share}><Share2 size={19}/><span>Share card</span></button>
                    </nav>
                  </>}
                  {feedback}
                  <div className="un-home-indicator" aria-hidden="true"/>
                </div>
              </div>
              <div className="phone-back" inert={!flipped} aria-hidden={!flipped || turning}>
                <div className="camera-bump" aria-hidden="true"><i/><i/><i/><b/></div>
                <button ref={qrBack} className="un-icon-button un-qr-back" onClick={() => flip(false)} aria-label="Return to the front of the card"><ArrowLeft size={19}/></button>
                <div ref={qrContent} className="un-qr-content">
                  <div className="un-qr-heading"><Logo className="un-view-logo"/><h2>Scan. Connect. Explore.</h2><p>Swipe or choose where to go.</p></div>
                  <div className="un-qr-gallery" ref={qrGallery} aria-label="Scrollable QR code gallery" tabIndex={0}>{qrTargets.map((target, index) => <section className="un-qr-slide" key={target.label} data-index={index} aria-label={target.label}><div className="un-phone-qr-code"><QRCodeSVG value={target.url} size={180} marginSize={4} level="M" title={`QR code for ${target.label}`}/></div><h3>{target.title}</h3><p>{target.description}</p></section>)}</div>
                  <div className="un-qr-tabs" role="group" aria-label="QR destination">{qrTargets.map((target, index) => <button key={target.label} aria-pressed={qr === index} onClick={() => selectQr(index)}>{target.label}</button>)}</div>
                  <a className="un-card-button un-card-primary" href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={18}/><span>Save our contact</span></a>
                  <button className="un-card-button" onClick={share}><Share2 size={18}/><span>Share this card</span></button>
                  <p className="un-phone-url">wedigitlize.com/card</p>
                </div>
                {feedback}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>;
}
