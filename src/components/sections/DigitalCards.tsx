import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/business";
export default function DigitalCards() {
  return <section id="portfolio" className="wd-section"><div className="wd-shell"><div className="wd-section-heading"><div><p className="wd-eyebrow">Selected work</p><h2>Built to feel<br />like your brand.</h2></div><Link href="/projects" className="wd-text-link">View all projects</Link></div><div className="wd-work-grid">{projects.slice(0,2).map((project) => <article className="wd-work" key={project.id}><Link href={`/projects#${project.id}`} className="wd-work-image"><Image src={project.image} alt={`${project.name} website project by wedigitlize`} width={1363} height={936} sizes="(max-width: 700px) 100vw, 50vw" /></Link><div className="wd-work-caption"><h3>{project.name}</h3><p>{project.type}</p></div></article>)}</div></div></section>;
}
