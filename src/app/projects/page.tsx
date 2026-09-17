"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

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

export default function ProjectsPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-32">
        {/* Massive Brutalist Header */}
        <section className="max-w-[1400px] mx-auto px-6 mb-16 md:mb-40 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />
          
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
            PROJECTS.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 md:mt-16 text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed"
          >
            A curated selection of digital ecosystems, high-performance platforms, and cutting-edge architectures engineered by our team. Live and functional.
          </motion.p>
        </section>

        {/* ==============================================
            UNIFIED LAYOUT (Live 3D Iframes - Optimized for Mobile & Desktop)
            ============================================== */}
        <section className="px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col gap-32 md:gap-64">
          {PROJECTS.map((project, index) => {
             const isEven = index % 2 === 0;
             const isMobile = project.device === 'mobile';
             
             return (
               <div key={project.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}>
                 
                 {/* Text Content */}
                 <div className="w-full lg:w-5/12 order-2 lg:order-none z-20 relative">
                   <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                   >
                     <div className="flex items-center gap-4 mb-6">
                       <span className="text-[#007AFF] font-mono text-xl md:text-2xl font-bold">0{index + 1}</span>
                       <div className="h-px w-16 bg-white/20" />
                       <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 border border-[#007AFF]/30 bg-[#007AFF]/10 px-3 py-1 rounded-full">
                         {project.year}
                       </span>
                     </div>
                     
                     <h3 className="text-4xl md:text-6xl font-display font-bold mb-2 md:mb-4 tracking-tight">
                       {project.name}
                     </h3>
                     
                     <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#007AFF] mb-6 md:mb-8">
                       {project.type}
                     </p>
                     
                     <p className="text-white/70 text-lg md:text-xl max-w-md leading-relaxed mb-8 md:mb-10">
                       {project.desc}
                     </p>

                     <a 
                       href={project.url} 
                       target="_blank" 
                       rel="noreferrer"
                       className="inline-flex items-center justify-center lg:justify-start gap-4 text-white font-bold uppercase tracking-widest text-xs border border-[#007AFF] bg-[#007AFF]/10 hover:bg-[#007AFF] px-8 py-4 rounded-full transition-all w-full lg:w-auto"
                     >
                       Explore Live Environment <ArrowUpRight size={16} />
                     </a>
                   </motion.div>
                 </div>

                 {/* Visual Mockup (Iframes scaled for mobile) */}
                 <div className="w-full lg:w-7/12 flex justify-center order-1 lg:order-none pointer-events-none relative z-10">
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full relative flex justify-center"
                   >
                     {isMobile ? (
                       // Mobile Isometric Presentation
                       <div className="relative w-full max-w-[280px] md:max-w-[400px] aspect-[1/2] perspective-[2000px] scale-90 md:scale-100">
                         <div className="absolute inset-0 bg-[#007AFF]/20 blur-[60px] md:blur-[100px] rounded-full" />
                         <motion.div 
                           whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
                           transition={{ duration: 0.6, ease: "easeOut" }}
                           className="relative w-full h-full bg-[#111] rounded-[2.5rem] md:rounded-[3.5rem] p-3 md:p-4 shadow-[0_0_0_2px_#333,0_0_0_8px_#111,0_20px_40px_rgba(0,0,0,0.8)] border border-[#222] rotate-y-[-10deg] md:rotate-y-[-15deg] rotate-x-[5deg] origin-center transform-style-3d lg:group-hover:rotate-y-[-5deg]"
                         >
                           {/* Hardware */}
                           <div className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 w-24 md:w-32 h-6 md:h-9 bg-black rounded-full z-20" />
                           <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] md:rounded-[3.5rem] pointer-events-none z-30" />
                           
                           {/* Screen */}
                           <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#161a22]">
                              <iframe 
                                src={project.url} 
                                title={project.name}
                                className="absolute inset-0 w-full h-full z-10 bg-white pointer-events-none"
                              />
                           </div>
                         </motion.div>
                       </div>
                     ) : (
                       // Desktop Pro Presentation
                       <div className="relative w-full max-w-[800px] md:max-w-[1000px] perspective-[2000px] scale-[0.6] sm:scale-[0.8] md:scale-100 mt-12 md:mt-0">
                         <div className="absolute inset-0 bg-[#007AFF]/20 blur-[80px] md:blur-[120px] rounded-full" />
                         <motion.div 
                           whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                           transition={{ duration: 0.6, ease: "easeOut" }}
                           className="relative w-full flex flex-col items-center rotate-y-[-5deg] rotate-x-[5deg] origin-center transform-style-3d lg:group-hover:rotate-y-[-2deg]"
                         >
                            {/* Screen */}
                            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-t-xl md:rounded-t-2xl p-2 md:p-3 border-t border-l border-r border-[#333] shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10">
                               <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 bg-[#222] rounded-full z-20" />
                               
                               <div className="relative w-full h-full rounded-md md:rounded-lg overflow-hidden bg-[#161a22] border border-[#222]">
                                  <iframe 
                                    src={project.url} 
                                    title={project.name}
                                    className="absolute inset-0 w-full h-full z-10 bg-white pointer-events-none scale-[0.8] md:scale-100 origin-top-left"
                                    style={{ width: '125%', height: '125%' }} 
                                  />
                               </div>
                               
                               <div className="absolute bottom-0 left-0 w-full h-3 md:h-6 bg-[#111] rounded-b-xl md:rounded-b-2xl border-b border-[#333]" />
                            </div>

                            {/* Stand */}
                            <div className="relative z-0">
                              <div className="w-16 md:w-32 h-8 md:h-16 bg-[#222] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-x border-[#333]" />
                              <div className="w-32 md:w-64 h-1.5 md:h-3 bg-[#222] rounded-t-sm md:rounded-t-md shadow-2xl relative">
                                 <div className="absolute inset-x-0 bottom-0 h-0.5 md:h-1 bg-black rounded-b-sm md:rounded-b-md" />
                              </div>
                            </div>
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
        <section className="max-w-[1400px] mx-auto px-6 mt-32 md:mt-64 relative z-20">
          <div className="py-20 md:py-32 border-t border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-4">
                Let's build your <br className="hidden md:block" /> next architecture.
              </h3>
              <p className="text-[#007AFF] font-bold tracking-widest text-sm uppercase">Stop relying on templates. Go bespoke.</p>
            </div>
            <Link href="/#contact" className="px-12 py-6 bg-[#007AFF] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#0056b3] hover:scale-105 transition-all flex items-center justify-center gap-4 group shadow-[0_0_40px_rgba(0,122,255,0.4)] rounded-full w-full md:w-auto">
              Initiate Project
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#007AFF] group-hover:rotate-45 transition-transform">
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
