"use client";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Folder, Mail, Smartphone, Sun, Home, ArrowUpRight } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import { business } from "@/lib/business";
const links = [["About","/#about"],["Work","/#portfolio"],["Services","/#services"],["Process","/#process"],["Pricing","/#pricing"],["Projects","/projects"],["Card","/card"]];
export default function Navbar() {
 const drawer=useRef<HTMLDialogElement>(null);
 const {resolvedTheme,setTheme}=useTheme();
 const pathname=usePathname();
 const close=()=>drawer.current?.close();
 const themeButton=<button className="un-theme" aria-label="Switch between light and dark theme" title="Switch theme" onClick={()=>setTheme(["dark","theme-night","theme-sunset"].includes(resolvedTheme??"dark") ? "light" : "dark")}><Sun size={18}/></button>;
 return <><nav className="un-glass-nav" aria-label="Main navigation"><Link href="/" className="un-nav-brand" aria-label="wedigitlize home"><Logo className="un-nav-logo"/><span>wedigitlize</span></Link><div className="un-nav-links">{links.map(([name,href])=><Link key={name} href={href} aria-current={pathname===href ? "page" : undefined}>{name}</Link>)}</div>{themeButton}<Link href="/#contact" className="un-nav-contact">Let’s talk <ArrowUpRight size={15}/></Link></nav>
 <aside className="un-edge-nav" aria-label="Quick navigation"><button aria-label="Show quick navigation" className="un-edge-handle"><Menu size={18}/></button><div><Link href="/" className="un-nav-brand"><Logo className="un-nav-logo"/><span>wedigitlize</span></Link>{links.map(([name,href])=><Link href={href} key={name}>{name}<ArrowUpRight size={15}/></Link>)}<Link href="/#contact">Start a project<Mail size={17}/></Link></div></aside>
 <nav className="un-mobile-dock" aria-label="Mobile navigation"><button aria-label="Open navigation menu" aria-haspopup="dialog" onClick={()=>drawer.current?.showModal()}><Logo className="un-nav-logo"/></button><Link href="/projects" aria-label="Explore projects"><Folder size={21}/><span>Work</span></Link><Link href="/card" aria-label="Open digital card"><Smartphone size={21}/><span>Card</span></Link><Link href="/#contact" aria-label="Start a project"><Mail size={21}/><span>Contact</span></Link></nav>
 <dialog ref={drawer} className="un-mobile-drawer" aria-labelledby="un-menu-title" onClick={e=>{if(e.target===e.currentTarget)close();}}><div className="un-drawer-head"><h2 id="un-menu-title">Explore wedigitlize.</h2><button aria-label="Close navigation" onClick={close}><X size={23}/></button></div><Link href="/" onClick={close}><Home size={20}/>Home</Link>{links.map(([name,href])=><Link key={name} href={href} onClick={close}>{name}<ArrowUpRight size={18}/></Link>)}<a href={business.instagram} target="_blank" rel="noopener noreferrer"><FiInstagram/>Instagram</a><div className="un-drawer-footer">{themeButton}<Link href="/#contact" onClick={close}>Start a project</Link></div></dialog></>;
}
