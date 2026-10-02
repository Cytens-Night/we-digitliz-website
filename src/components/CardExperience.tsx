"use client";
import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Phone, Mail, Globe, UserPlus, Share2, MessageCircle } from "lucide-react";
import { FiInstagram as Instagram } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import { business, projects, whatsappUrl } from "@/lib/business";
export default function CardExperience() {
  const [message, setMessage] = useState("");
  const [showLink, setShowLink] = useState(false);
  async function shareCard() {
    setMessage("");
    setShowLink(false);
    try {
      if (navigator.share) {
        await navigator.share({ title: "wedigitlize — Digital studio", text: "Websites, apps, branding and digital experiences.", url: business.cardUrl });
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(business.cardUrl);
        setMessage("Card link copied. Paste it wherever you’d like to share it.");
        return;
      }
      setShowLink(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setShowLink(true);
      setMessage("You can copy the card link below.");
    }
  }
  return <main id="main-content" className="wd-card-page"><div className="wd-card-shell"><Link href="/" className="wd-card-home">Visit wedigitlize.com</Link><div className="wd-business-card">
    <div className="wd-card-identity"><Logo className="wd-card-logo"/><p className="wd-eyebrow">Design. Build. Connect.</p><h1>wedigitlize<span>.</span></h1><p>Websites, apps, branding<br />and digital experiences.</p><span className="wd-card-location">London · Working worldwide</span></div>
    <div className="wd-card-actions"><a href={whatsappUrl("Hello wedigitlize, I found your digital card and would like to discuss a project.")} className="wd-button" target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/>Chat on WhatsApp</a><div className="wd-card-action-grid"><a href={`tel:${business.phone}`}><Phone size={20}/><span>Call us</span></a><a href={`mailto:${business.email}`}><Mail size={20}/><span>Email us</span></a><Link href="/"><Globe size={20}/><span>Website</span></Link><a href={business.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={20}/><span>Instagram</span></a></div><a className="wd-button wd-button-outline" href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={19}/>Save contact</a><button onClick={shareCard} className="wd-button wd-button-outline"><Share2 size={18}/>Share this card</button></div>
    <div className="wd-card-status" role="status" aria-live="polite">{message}</div>{showLink && <label className="wd-share-fallback">Card link<input readOnly value={business.cardUrl} onFocus={event => event.currentTarget.select()} /></label>}
    <details className="wd-card-qr"><summary>Show QR code to share</summary><div><QRCodeSVG value={business.cardUrl} size={180} bgColor="#ffffff" fgColor="#101218" level="M" marginSize={4} title="QR code linking to the wedigitlize digital business card"/><p>Scan to open this card.</p></div></details>
    <section className="wd-card-services"><h2>What can we make for you?</h2><p>Websites · Digital cards · Apps · Branding<br/>Social content · E-commerce · Automation</p><div><Link href="/#services">Explore services</Link><Link href="/#pricing">View pricing</Link></div></section>
    <section className="wd-card-work"><h2>A little of our work.</h2>{projects.slice(0,2).map(project => <Link key={project.id} href={`/projects#${project.id}`}><strong>{project.name}</strong><span>{project.type}</span></Link>)}</section><Link href="/#contact" className="wd-button">Start a project</Link>
  </div><p className="wd-card-contact-details">{business.phoneLabel}<br/><a href={`mailto:${business.email}`}>{business.email}</a></p><div className="wd-card-legal"><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Project terms</Link></div></div></main>;
}
