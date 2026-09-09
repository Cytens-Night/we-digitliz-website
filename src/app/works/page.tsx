"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRef } from "react";

const PROJECTS = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    url: "https://card.shakurfragrances.co.uk/", 
    type: "Digital Business Card", 
    desc: "A premium 3D digital business card featuring native e-commerce and offline NFC integration.",
    year: "2024",
    device: "mobile"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    url: "https://furqansweets.co.uk/", 
    type: "E-Commerce Architecture", 
    desc: "A high-performance e-commerce storefront optimized for conversion and rapid load times.",
    year: "2024",
    device: "desktop"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    url: "https://hesori.com", 
    type: "Agency Platform", 
    desc: "A sleek, modern web architecture showcasing premium brand identity and dynamic layouts.",
    year: "2024",
    device: "desktop"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    url: "https://marshalos.co.uk", 
    type: "Dashboard & UI", 
    desc: "A complete digital transformation delivering seamless user experience and robust functionality.",
    year: "2023",
    device: "desktop"
  },
  { 
    id: "furqan-sweets-card", 
    name: "Furqan Sweets Card", 
    url: "https://furqansweets.co.uk/card", 
    type: "Digital Business Card", 
    desc: "A sleek, NFC-enabled digital business card engineered for rapid networking and brand impact.",
    year: "2024",
    device: "mobile"
  }
];

export default function WorksPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-32 overflow-hidden">
        {/* Massive Brutalist Header */}
        <section className="max-w-[1400px] mx-auto px-6 mb-24 md:mb-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-8 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-white/20" />
            The Archive
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "circOut" }}
            className="text-6xl md:text-8xl lg:text-[11rem] font-display font-bold leading-[0.85] tracking-tighter"
          >
            SELECTED <br /> <span className="text-white/30">WORKS.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed"
          >
            A curated selection of digital ecosystems, high-performance platforms, and cutting-edge architectures engineered by our team. Live and functional.
          </motion.p>
        </section>

        {/* Project Layout */}
        <section className="px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col gap-32 md:gap-64">
          {PROJECTS.map((project, index) => {
             const isEven = index % 2 === 0;
             const isMobile = project.device === 'mobile';
             
             return (
               <div key={project.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
                 
                 {/* Text Content */}
                 <div className="w-full lg:w-5/12">
                   <motion.div 
                     initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-20%" }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                   >
                     <div className="flex items-center gap-4 mb-6">
                       <span className="text-white/30 font-mono text-2xl font-bold">0{index + 1}</span>
                       <div className="h-px w-16 bg-white/20" />
                       <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 border border-white/10 px-3 py-1 rounded-full">
                         {project.year}
                       </span>
                     </div>
                     
                     <h3 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
                       {project.name}
                     </h3>
                     
                     <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/40 mb-8">
                       {project.type}
                     </p>
                     
                     <p className="text-white/70 text-lg md:text-xl max-w-md leading-relaxed mb-10">
                       {project.desc}
                     </p>

                     <a 
                       href={project.url} 
                       target="_blank" 
                       rel="noreferrer"
                       className="inline-flex items-center gap-4 text-white font-bold uppercase tracking-widest text-xs border-b border-white pb-2 hover:gap-6 transition-all"
                     >
                       Explore Live Environment <ArrowUpRight size={16} />
                     </a>
                   </motion.div>
                 </div>

                 {/* Visual Mockup */}
                 <div className="w-full lg:w-7/12 flex justify-center">
                   <motion.div
                     initial={{ opacity: 0, y: 100, scale: 0.95 }}
                     whileInView={{ opacity: 1, y: 0, scale: 1 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full relative"
                   >
                     {isMobile ? (
                       // Mobile Isometric Presentation
                       <div className="relative w-full max-w-[400px] aspect-[1/2] mx-auto perspective-[2000px]">
                         <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full" />
                         <motion.div 
                           whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
                           transition={{ duration: 0.6, ease: "easeOut" }}
                           className="relative w-full h-full bg-[#111] rounded-[3.5rem] p-4 shadow-[0_0_0_2px_#333,0_0_0_8px_#111,0_40px_80px_rgba(0,0,0,0.8)] border border-[#222] rotate-y-[-15deg] rotate-x-[5deg] origin-center cursor-pointer transform-style-3d group-hover:rotate-y-[-5deg]"
                         >
                           {/* Hardware */}
                           <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-full z-20" />
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[3.5rem] pointer-events-none z-30" />
                           
                           {/* Screen */}
                           <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#161a22]">
                              <iframe 
                                src={project.url} 
                                title={project.name}
                                className="absolute inset-0 w-full h-full z-10 bg-white pointer-events-none"
                              />
                           </div>
                           
                           <a href={project.url} target="_blank" rel="noreferrer" className="absolute inset-0 z-40" aria-label={`Visit ${project.name}`} />
                         </motion.div>
                       </div>
                     ) : (
                       // Desktop Pro Presentation
                       <div className="relative w-full max-w-[1000px] mx-auto perspective-[2000px]">
                         <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full" />
                         <motion.div 
                           whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                           transition={{ duration: 0.6, ease: "easeOut" }}
                           className="relative w-full flex flex-col items-center rotate-y-[-5deg] rotate-x-[5deg] origin-center cursor-pointer transform-style-3d group-hover:rotate-y-[-2deg]"
                         >
                            {/* Screen */}
                            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-t-2xl p-2 md:p-3 border-t border-l border-r border-[#333] shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-10">
                               <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-20" />
                               
                               <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#161a22] border border-[#222]">
                                  <iframe 
                                    src={project.url} 
                                    title={project.name}
                                    className="absolute inset-0 w-full h-full z-10 bg-white pointer-events-none"
                                  />
                               </div>
                               
                               <div className="absolute bottom-0 left-0 w-full h-4 md:h-6 bg-[#111] rounded-b-2xl border-b border-[#333]" />
                            </div>

                            {/* Stand */}
                            <div className="relative z-0">
                              <div className="w-24 md:w-32 h-12 md:h-16 bg-gradient-to-b from-[#2a2a2a] to-[#111] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-x border-[#333]" />
                              <div className="w-48 md:w-64 h-2 md:h-3 bg-gradient-to-r from-[#222] via-[#333] to-[#222] rounded-t-md shadow-2xl relative">
                                 <div className="absolute inset-x-0 bottom-0 h-1 bg-black rounded-b-md" />
                              </div>
                            </div>
                            
                            <a href={project.url} target="_blank" rel="noreferrer" className="absolute inset-0 z-40" aria-label={`Visit ${project.name}`} />
                         </motion.div>
                       </div>
                     )}
                   </motion.div>
                 </div>
               </div>
             );
          })}
        </section>

        {/* CTA Footer */}
        <section className="max-w-[1400px] mx-auto px-6 mt-32 md:mt-64 relative z-10">
          <div className="py-20 md:py-32 border-t border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-4">
                Let's build your <br/> next architecture.
              </h3>
              <p className="text-white/50 text-xl">Stop relying on templates. Go bespoke.</p>
            </div>
            <Link href="/#contact" className="px-12 py-6 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-[#f5f5f7] hover:scale-105 transition-all flex items-center gap-4 group shadow-[0_0_40px_rgba(255,255,255,0.2)] rounded-full">
              Initiate Project
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
