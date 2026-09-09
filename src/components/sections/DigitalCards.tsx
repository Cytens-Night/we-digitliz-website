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
             {PROJECTS.map((project) => {
               const isActive = activeId === project.id;
               return (
                 <div 
                   key={project.id}
                   onClick={() => setActiveId(project.id)}
                   className={`
                     relative p-6 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden group
                     ${isActive ? 'border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'border-transparent hover:bg-white/5'}
                     border
                   `}
                 >
                    {/* Active Indicator Glow */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-project-glow"
                        className="absolute inset-0 bg-white/10"
                      />
                    )}
                    
                    <div className="relative z-10">
                       <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                            {project.name}
                          </h3>
                          {project.type === 'mobile' ? <Smartphone className={isActive ? 'text-white' : 'text-white/30'} size={20} /> : <Monitor className={isActive ? 'text-white' : 'text-white/30'} size={20} />}
                       </div>
                       
                       <AnimatePresence>
                         {isActive && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             className="overflow-hidden"
                           >
                              <p className="text-white/70 text-sm mt-3 mb-4 leading-relaxed">
                                {project.desc}
                              </p>
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-white font-bold text-sm hover:underline drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                              >
                                Visit Live Site <ExternalLink size={16} />
                              </a>
                           </motion.div>
                         )}
                       </AnimatePresence>
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
                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="relative w-[340px] md:w-[375px] h-[720px] md:h-[812px] bg-[#111] rounded-[3rem] p-4 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                 >
                    {/* Dynamic Island */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
                    
                    <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-[#161a22]">
                       <img 
                         src={activeProject.image} 
                         alt={activeProject.name}
                         className="absolute inset-0 w-full h-full object-cover z-10"
                       />
                    </div>
                 </motion.div>
               ) : (
                 // DESKTOP DEVICE MOCKUP
                 <motion.div 
                   key={`desktop-${activeProject.id}`}
                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: -20 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="relative w-full max-w-[900px] aspect-video bg-[#111] rounded-2xl p-2 md:p-4 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                 >
                    {/* Mac-style Window Controls */}
                    <div className="absolute top-4 left-6 flex gap-2 z-20">
                       <div className="w-3 h-3 rounded-full bg-white/20" />
                       <div className="w-3 h-3 rounded-full bg-white/20" />
                       <div className="w-3 h-3 rounded-full bg-white/20" />
                    </div>
                    
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#161a22] mt-6 md:mt-8 border border-white/10">
                       <img 
                         src={activeProject.image} 
                         alt={activeProject.name}
                         className="absolute inset-0 w-full h-full object-cover z-10"
                       />
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
