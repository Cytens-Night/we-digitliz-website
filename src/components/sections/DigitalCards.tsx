"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Briefcase, Eye, X, ExternalLink } from "lucide-react";

const CLIENTS = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    type: "Digital Business Card & E-Commerce", 
    year: "2024",
    url: "https://card.shakurfragrances.co.uk/",
    desc: "A premium 3D digital business card featuring native e-commerce and offline NFC integration.",
    gradient: "from-amber-500/20 via-orange-900/20 to-black"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    type: "High-Performance Storefront", 
    year: "2024",
    url: "https://furqansweets.co.uk/",
    desc: "A high-performance e-commerce storefront optimized for conversion and rapid load times.",
    gradient: "from-pink-500/20 via-rose-900/20 to-black"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    type: "Premium Brand Architecture", 
    year: "2024",
    url: "https://hesori.com",
    desc: "A sleek, modern web architecture showcasing premium brand identity and dynamic layouts.",
    gradient: "from-blue-500/20 via-indigo-900/20 to-black"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    type: "Complete Digital Transformation", 
    year: "2023",
    url: "https://marshalos.co.uk",
    desc: "A complete digital transformation delivering seamless user experience and robust functionality.",
    gradient: "from-emerald-500/20 via-teal-900/20 to-black"
  }
];

// Prevents background scrolling when modal is open
function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isLocked]);
}

export default function DigitalCards() {
  const [activePreview, setActivePreview] = useState<typeof CLIENTS[0] | null>(null);

  useLockBodyScroll(activePreview !== null);

  return (
    <section id="portfolio" className="relative bg-[#0a0a0a] text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                 <Briefcase size={16} /> Some of our clients
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white max-w-3xl tracking-tight leading-[1.1]">
                Architectures built <br/> <span className="text-white/40">for scale.</span>
              </h2>
           </div>
        </div>

        {/* Minimalist Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
           {CLIENTS.map((client, index) => (
             <motion.div 
               key={client.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               className="group relative h-[400px] lg:h-[450px] rounded-[2rem] overflow-hidden bg-[#111318] border border-white/10 flex flex-col justify-end p-8 hover:border-white/30 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
             >
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />
                
                {/* Top Right Actions */}
                <div className="absolute top-8 right-8 flex gap-3">
                  <a 
                    href={client.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col items-start">
                   <div className="mb-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
                     {client.year}
                   </div>
                   
                   <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                     {client.name}
                   </h3>
                   
                   <p className="text-white/60 text-sm md:text-base font-medium tracking-wide mb-6">
                     {client.type}
                   </p>
                   
                   <button 
                     onClick={() => setActivePreview(client)}
                     className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                   >
                     <Eye size={16} /> Live Preview
                   </button>
                </div>

             </motion.div>
           ))}
        </div>

      </div>

      {/* ==========================================
          FULL SCREEN LIVE PREVIEW MODAL
          ========================================== */}
      <AnimatePresence>
        {activePreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-7xl h-full max-h-[900px] bg-[#0a0a0a] rounded-[2rem] border border-white/20 shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col"
            >
              
              {/* Modal Header Bar */}
              <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="px-4 py-1.5 bg-white/5 rounded-md border border-white/10 text-xs font-mono text-white/50 flex items-center gap-2">
                    <span className="text-green-400">https://</span>
                    <span className="text-white/80">{activePreview.url.replace('https://', '')}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActivePreview(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 w-full bg-white relative">
                {/* Loading indicator that shows behind the iframe before it loads */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-black/50">
                  <div className="w-8 h-8 border-4 border-black/10 border-t-black/50 rounded-full animate-spin" />
                  <span className="text-xs font-bold tracking-widest uppercase">Initializing Live Instance</span>
                </div>
                
                <iframe 
                  src={activePreview.url}
                  className="absolute inset-0 w-full h-full border-none z-10 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="fullscreen"
                />
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
