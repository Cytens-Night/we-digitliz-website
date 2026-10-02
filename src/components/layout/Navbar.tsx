"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
const links = [["Work", "/#portfolio"], ["Services", "/#services"], ["Process", "/#process"], ["Pricing", "/#pricing"], ["Digital card", "/card"]];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="wd-nav"><div className="wd-shell wd-nav-inner">
    <Link href="/" className="wd-brand" aria-label="wedigitlize home" onClick={() => setOpen(false)}><Logo className="wd-logo" /><span>wedigitlize<span className="wd-brand-dot">.</span></span></Link>
    <nav className="wd-desktop-nav" aria-label="Main navigation">{links.map(([name, href]) => <Link key={name} href={href}>{name}</Link>)}</nav>
    <Link className="wd-button wd-nav-cta" href="/#contact">Start a project</Link>
    <button className="wd-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div>{open && <nav id="mobile-navigation" className="wd-mobile-nav" aria-label="Mobile navigation">{[...links, ["Start a project", "/#contact"]].map(([name, href]) => <Link key={name} href={href} onClick={() => setOpen(false)}>{name}</Link>)}</nav>}</header>;
}
