"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import Link from "next/link";

const CLIENTS = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    type: "Digital Business Card & E-Commerce", 
    year: "2024",
    url: "https://card.shakurfragrances.co.uk/",
    desc: "A premium 3D digital business card featuring native e-commerce and offline NFC integration."
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    type: "High-Performance Storefront", 
    year: "2024",
    url: "https://furqansweets.co.uk/",
    desc: "A high-performance e-commerce storefront optimized for conversion and rapid load times."
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    type: "Premium Brand Architecture", 
    year: "2024",
    url: "https://hesori.com",
    desc: "A sleek, modern web architecture showcasing premium brand identity and dynamic layouts."
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    type: "Complete Digital Transformation", 
    year: "2023",
    url: "https://marshalos.co.uk",
    desc: "A complete digital transformation delivering seamless user experience and robust functionality."
  }
];

export default function DigitalCards() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="portfolio" className="relative bg-[#0f1115] text-white py-16 md:py-32 overflow-hidden border-t border-white/10">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                 <Briefcase size={16} /> Some of our clients
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-2xl tracking-tight">
                Architectures built <br/> <span className="text-white/40">for scale.</span>
              </h2>
           </div>
           <Link 
             href="/works"
             className="inline-flex items-center gap-4 text-white/60 hover:text-white font-bold uppercase tracking-widest text-xs border-b border-white/30 hover:border-white pb-2 hover:gap-6 transition-all"
           >
             View All Works <ArrowUpRight size={16} />
           </Link>
        </div>

        {/* Dynamic Accordion Showcase */}
        <div className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-2 md:gap-4">
           {CLIENTS.map((client, index) => {
             const isActive = activeIndex === index;
             
             return (
               <motion.div 
                 key={client.id}
                 layout
                 onClick={() => setActiveIndex(index)}
                 onMouseEnter={() => setActiveIndex(index)}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ 
                   layout: { type: "spring", stiffness: 300, damping: 30 },
                   opacity: { duration: 0.6, delay: index * 0.1 }
                 }}
                 className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.2)] bg-[#161a22] border border-white/10 flex flex-col justify-end
                   ${isActive ? 'flex-[4] md:flex-[5]' : 'flex-[1]'}
                 `}
               >
                 {/* Live Iframe Background (Always present, but opaque when active) */}
                 <div className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <iframe 
                      src={client.url}
                      title={client.name}
                      className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] bg-white scale-100"
                    />
                    {/* Dark gradient overlay to ensure text remains perfectly readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
                 </div>

                 {/* Default Dark Background pattern (Visible when NOT active) */}
                 <div className={`absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] ${isActive ? 'opacity-0' : 'opacity-100'}`} />

                 {/* Content Container */}
                 <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-8">
                    
                    {/* Top Index & Year */}
                    <div className="flex justify-between items-start">
                       <span className={`font-mono text-sm font-bold transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30'}`}>
                         0{index + 1}
                       </span>
                       <AnimatePresence>
                         {isActive && (
                           <motion.span 
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, x: 20 }}
                             className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 border border-white/10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md"
                           >
                             {client.year}
                           </motion.span>
                         )}
                       </AnimatePresence>
                    </div>

                    {/* Bottom Title & Details */}
                    <div className="w-full">
                       {/* Unexpanded Vertical Title (Desktop Only) */}
                       <div className={`absolute bottom-8 left-8 right-8 transition-opacity duration-500 md:block hidden ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                         <h3 className="text-2xl font-display font-bold text-white whitespace-nowrap transform -rotate-90 origin-left translate-y-full w-max text-white/50">
                           {client.name}
                         </h3>
                       </div>

                       {/* Unexpanded Horizontal Title (Mobile Only) */}
                       <div className={`absolute bottom-6 left-6 transition-opacity duration-500 md:hidden ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                         <h3 className="text-xl font-display font-bold text-white/50">
                           {client.name}
                         </h3>
                       </div>

                       {/* Expanded Details */}
                       <AnimatePresence>
                         {isActive && (
                           <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: 20 }}
                             transition={{ duration: 0.4, delay: 0.2 }}
                             className="w-full max-w-xl"
                           >
                             <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
                               {client.name}
                             </h3>
                             <p className="text-white/80 text-sm md:text-base font-medium tracking-wide mb-4">
                               {client.type}
                             </p>
                             <p className="text-white/50 text-sm md:text-base leading-relaxed hidden md:block mb-8">
                               {client.desc}
                             </p>
                             
                             <a 
                               href={client.url} 
                               target="_blank" 
                               rel="noreferrer"
                               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
                             >
                               View Live Site <ArrowUpRight size={14} />
                             </a>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                 </div>
               </motion.div>
             )
           })}
        </div>

      </div>
    </section>
  );
}
