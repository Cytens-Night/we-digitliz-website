import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return <section className="wd-hero"><div className="wd-shell wd-hero-grid">
    <div className="wd-hero-copy"><p className="wd-eyebrow">Independent digital studio · London</p><h1>Make your next<br />digital move<br /><span>remarkable.</span></h1><p className="wd-lead">Websites, apps, branding and digital experiences. Designed with care. Built for the way your business works.</p><div className="wd-actions"><Link className="wd-button" href="/#contact">Start your project</Link><Link className="wd-button wd-button-outline" href="/projects">Explore our work</Link></div><p className="wd-hero-note">From the first idea to the final handover.</p></div>
    <div className="wd-featured"><div className="wd-featured-top"><span>Selected work / 01</span><span>Digital experiences</span></div><Link href="/projects#shakur" className="wd-featured-image"><Image src="/work/shakur.jpg" alt="Shakur Fragrances interactive digital card and fragrance collection, designed by wedigitlize" width={1363} height={936} priority sizes="(max-width: 850px) 100vw, 50vw" /></Link><div className="wd-featured-bottom"><div><h2>Shakur Fragrances</h2><p>A new way to connect.</p></div><Link href="/projects#shakur">View project</Link></div></div>
  </div><div className="wd-shell wd-capability-strip"><span>Websites & e-commerce</span><span>Apps & systems</span><span>Branding & design</span><span>Content & digital cards</span></div></section>;
}
