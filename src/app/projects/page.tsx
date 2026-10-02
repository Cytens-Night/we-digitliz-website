import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { projects } from "@/lib/business";
export const metadata: Metadata = { title: "Selected work", description: "Explore wedigitlize projects, including Shakur Fragrances and Furqan Sweets.", alternates: { canonical: "/projects" } };
export default function ProjectsPage() {
 return <><Navbar/><main id="main-content" className="wd-project-page wd-shell"><p className="wd-eyebrow">The portfolio</p><h1>Real brands.<br /><span>Considered experiences.</span></h1><p className="wd-lead">A selection of our website, interface and digital card work. Explore the details and visit each project.</p><div className="wd-project-list">{projects.map((p,i)=><article id={p.id} key={p.id} className="wd-project-detail"><div className="wd-project-visual">{p.image ? <Image src={p.image} alt={`${p.name} project screenshot`} width={1363} height={936} sizes="(max-width: 850px) 100vw, 60vw"/> : <div className="wd-project-type"><span>0{i+1} / Website project</span><strong>{p.name}</strong><p>{p.type}</p></div>}</div><div><p className="wd-eyebrow">0{i+1} / {p.type}</p><h2>{p.name}</h2><p>{p.description}</p><ul>{p.features.map(f=><li key={f}>{f}</li>)}</ul><a className="wd-button wd-button-outline" href={p.url} target="_blank" rel="noopener noreferrer">Visit project</a></div></article>)}</div><section className="wd-project-cta"><h2>Something like this.<br />Made for you.</h2><Link href="/#contact" className="wd-button">Discuss your project</Link></section></main><Footer/></>;
}
