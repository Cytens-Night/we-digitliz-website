import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectDevice from "@/components/ProjectDevice";
import { projects } from "@/lib/business";
export const metadata: Metadata={title:"Projects",description:"Explore live wedigitlize projects inside interactive 3D phone and desktop previews.",alternates:{canonical:"/projects"}};
export default function ProjectsPage(){return <><Navbar/><main id="main-content" className="un-projects"><header className="un-archive-heading"><p className="wd-eyebrow">THE ARCHIVE / SELECTED WORK</p><h1>PROJECTS.</h1><p>Distinctive identities. Useful digital experiences. Explore our live work inside the device previews, or open a project to see it in full.</p></header><section className="un-archive-list" aria-label="Live project collection">{projects.map((project,index)=><article id={project.id} key={project.id} className="un-project-row"><div className="un-project-copy"><p className="wd-eyebrow">0{index+1} / {project.type}</p><h2>{project.name}</h2><p>{project.description}</p><ul>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul><a className="wd-button wd-button-outline" href={project.url} target="_blank" rel="noopener noreferrer">Explore the live project<ArrowUpRight size={17}/></a></div><ProjectDevice name={project.name} url={project.url} mobile={project.id==="shakur"||project.id.includes("card")}/></article>)}</section><section className="un-project-cta"><h2>Let’s build your<br/>next digital experience.</h2><Link className="wd-button" href="/#contact">Start a project<ArrowUpRight size={18}/></Link></section></main><Footer/></>;}
