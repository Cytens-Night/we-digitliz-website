"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Smartphone, Monitor, Briefcase } from "lucide-react";

type Project = {
  id: string;
  name: string;
  url: string;
  type: 'mobile' | 'desktop';
  desc: string;
  image: string;
};

const PROJECTS: Project[] = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    url: "https://card.shakurfragrances.co.uk/", 
    type: "mobile", 
    desc: "A premium 3D digital business card featuring native e-commerce and offline NFC integration.",
    image: "/images/shakur_mobile.jpg"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    url: "https://furqansweets.co.uk/", 
    type: "desktop", 
    desc: "A high-performance e-commerce storefront optimized for conversion and rapid load times.",
    image: "/images/furqan_desktop.jpg"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    url: "https://hesori.com", 
    type: "desktop", 
    desc: "A sleek, modern web architecture showcasing premium brand identity and dynamic layouts.",
    image: "/images/hesori_desktop.jpg"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    url: "https://marshalos.co.uk", 
    type: "desktop", 
    desc: "A complete digital transformation delivering seamless user experience and robust functionality.",
    image: "/images/marshalos_desktop.jpg"
  }
];

export default function DigitalCards() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const activeProject = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  return (
    <section id="portfolio" className="relative bg-[#0f1115] text-white py-16 md:py-32 overflow-hidden border-t border-white/10">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                 <Briefcase size={16} /> Selected Works
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-2xl tracking-tight">
                The Caliber of <br/> <span className="text-white/40">Our Deliverables.</span>
              </h2>
           </div>
           <p className="text-white/60 max-w-md text-lg">
              Explore the live architectures we've engineered for our clients. No mockups. No placeholders. Just fully functional, premium web applications.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ========================================
              LEFT COLUMN: PROJECT SELECTOR
              ======================================== */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
             {PROJECTS.map((project, index) => {
               const isActive = activeId === project.id;
               return (
                 <div 
                   key={project.id}
                   onClick={() => setActiveId(project.id)}
                   className={`
                     relative p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden group
                     ${isActive ? 'bg-[#1a1c23] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10' : 'bg-transparent border border-transparent hover:bg-white/5'}
                   `}
                 >
                    {/* Active Indicator Line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-white transition-transform duration-500 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-50 group-hover:bg-white/30'}`} />
                    
                    <div className="relative z-10 flex gap-4">
                       <div className={`font-mono text-sm font-bold mt-1 transition-colors ${isActive ? 'text-white' : 'text-white/30'}`}>
                         0{index + 1}
                       </div>
                       <div className="flex-1">
                         <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-2xl md:text-3xl font-display font-bold transition-colors ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                              {project.name}
                            </h3>
                            {project.type === 'mobile' ? <Smartphone className={isActive ? 'text-white' : 'text-white/30'} size={24} /> : <Monitor className={isActive ? 'text-white' : 'text-white/30'} size={24} />}
                         </div>
                         
                         <AnimatePresence>
                           {isActive && (
                             <motion.div 
                               initial={{ opacity: 0, height: 0 }}
                               animate={{ opacity: 1, height: 'auto' }}
                               exit={{ opacity: 0, height: 0 }}
                               className="overflow-hidden"
                             >
                                <p className="text-white/60 text-base mt-3 mb-6 leading-relaxed pr-4">
                                  {project.desc}
                                </p>
                                <a 
                                  href={project.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                                >
                                  View Live <ExternalLink size={14} />
                                </a>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                    </div>
                 </div>
               )
             })}
          </div>

          {/* ========================================
              RIGHT COLUMN: LIVE DYNAMIC MOCKUP
              ======================================== */}
          <div className="w-full lg:w-2/3 flex items-center justify-center min-h-[450px] md:min-h-[600px] lg:min-h-[800px] relative">
             <AnimatePresence mode="wait">
               
               {activeProject.type === 'mobile' ? (
                 // MOBILE DEVICE MOCKUP
                 <motion.div 
                   key={`mobile-${activeProject.id}`}
                   initial={{ opacity: 0, x: 100, rotateY: 20 }}
                   animate={{ opacity: 1, x: 0, rotateY: 0 }}
                   exit={{ opacity: 0, x: -100, rotateY: -20 }}
                   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                   className="relative w-[340px] md:w-[375px] h-[720px] md:h-[812px] bg-black rounded-[3.5rem] p-3 shadow-[0_0_0_2px_#333,0_0_0_8px_#111,0_30px_60px_rgba(0,0,0,0.8)] border border-[#222]"
                   style={{ perspective: 1000 }}
                 >
                    {/* Hardware Buttons */}
                    <div className="absolute top-32 -left-4 w-[6px] h-8 bg-[#222] rounded-l-md shadow-inner" />
                    <div className="absolute top-48 -left-4 w-[6px] h-14 bg-[#222] rounded-l-md shadow-inner" />
                    <div className="absolute top-64 -left-4 w-[6px] h-14 bg-[#222] rounded-l-md shadow-inner" />
                    <div className="absolute top-48 -right-4 w-[6px] h-20 bg-[#222] rounded-r-md shadow-inner" />
                    
                    {/* Glare effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[3.5rem] pointer-events-none z-30" />

                    {/* Dynamic Island */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-full z-20 flex items-center justify-between px-3">
                      <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
                      <div className="w-2.5 h-2.5 bg-[#0a0a0a] rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
                    </div>
                    
                    {/* Screen */}
                    <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-[#161a22] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                       <iframe 
                         src={activeProject.url} 
                         title={activeProject.name}
                         className="absolute inset-0 w-full h-full z-10 bg-white"
                       />
                    </div>
                 </motion.div>
               ) : (
                 // DESKTOP DEVICE MOCKUP
                 <motion.div 
                   key={`desktop-${activeProject.id}`}
                   initial={{ opacity: 0, y: 40, rotateX: 10 }}
                   animate={{ opacity: 1, y: 0, rotateX: 0 }}
                   exit={{ opacity: 0, y: -40, rotateX: -10 }}
                   transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                   className="relative w-full max-w-[900px] flex flex-col items-center"
                   style={{ perspective: 1000 }}
                 >
                    {/* Screen Display */}
                    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-t-2xl p-2 md:p-3 border-t border-l border-r border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10">
                       
                       {/* Camera Notch/Bezel Center */}
                       <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#222] rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
                       
                       {/* Screen Content */}
                       <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#161a22] border border-[#222]">
                          <iframe 
                            src={activeProject.url} 
                            title={activeProject.name}
                            className="absolute inset-0 w-full h-full z-10 bg-white"
                          />
                       </div>
                       
                       {/* Apple-style Chin */}
                       <div className="absolute bottom-0 left-0 w-full h-4 bg-[#111] rounded-b-2xl border-b border-[#333]" />
                    </div>

                    {/* Pro Stand */}
                    <div className="relative z-0">
                      {/* Neck */}
                      <div className="w-32 h-16 bg-gradient-to-b from-[#2a2a2a] to-[#111] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border-x border-[#333]" />
                      {/* Base */}
                      <div className="w-64 h-3 bg-gradient-to-r from-[#222] via-[#333] to-[#222] rounded-t-md shadow-2xl relative">
                         <div className="absolute inset-x-0 bottom-0 h-1 bg-black rounded-b-md" />
                      </div>
                    </div>
                 </motion.div>
               )}

             </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
