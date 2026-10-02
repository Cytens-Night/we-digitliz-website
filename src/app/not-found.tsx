import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default function NotFound() { return <><Navbar/><main id="main-content" className="wd-shell wd-legal-page"><p className="wd-eyebrow">404 / Page not found</p><h1>Let’s get you back.</h1><p>This page may have moved. You can explore our work or start from the homepage.</p><div className="wd-actions"><Link className="wd-button" href="/">Visit the homepage</Link><Link className="wd-button wd-button-outline" href="/projects">Explore our work</Link></div></main><Footer/></>; }
