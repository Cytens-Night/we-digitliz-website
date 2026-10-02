import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { business } from "@/lib/business";
export default function Footer() {
  return <footer className="wd-footer"><div className="wd-shell"><div className="wd-footer-grid">
    <div><Link href="/" className="wd-brand"><Logo className="wd-logo" /><span>wedigitlize.</span></Link><p>Thoughtful design. Purposeful technology.<br />Built around your business.</p><a href={`mailto:${business.email}`}>{business.email}</a></div>
    <div><h3>Explore</h3><Link href="/projects">Our work</Link><Link href="/#services">Services</Link><Link href="/#pricing">Pricing</Link><Link href="/card">Digital business card</Link></div>
    <div><h3>Let’s connect</h3><Link href="/#contact">Start a project</Link><a href={`tel:${business.phone}`}>{business.phoneLabel}</a><a href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><span>London · Working worldwide</span></div>
  </div><div className="wd-footer-bottom"><span>© {new Date().getFullYear()} wedigitlize · WEDIGITLIZE LTD · Company no. 17465598</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Project terms</Link><Link href="/cookies">Cookies</Link></div></div></div></footer>;
}
