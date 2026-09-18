"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Star } from "lucide-react";

const CLIENTS = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    type: "Digital Business Card & E-Commerce", 
    year: "2024",
    url: "https://card.shakurfragrances.co.uk/",
    testimonial: '"We Digitlize built us a breathtaking digital presence. Our sales doubled in the first month."',
    stars: 5,
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    type: "High-Performance Storefront", 
    year: "2024",
    url: "https://furqansweets.co.uk/",
    testimonial: '"The speed and design of our new storefront is unmatched. Highly recommended digital agency!"',
    stars: 5,
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    type: "Premium Brand Architecture", 
    year: "2024",
    url: "https://hesori.com",
    testimonial: '"A seamless, premium experience from start to finish. They truly understand luxury brand architecture."',
    stars: 5,
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    type: "Complete Digital Transformation", 
    year: "2023",
    url: "https://marshalos.co.uk",
    testimonial: '"Absolute perfection. They completely transformed our digital ecosystem and streamlined our workflows."',
    stars: 5,
  }
];

export default function DigitalCards() {
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

        {/* ==============================================
            DESKTOP LAYOUT (Animated Grid)
            ============================================== */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
           {CLIENTS.map((client, index) => (
             <motion.div 
               key={client.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               className="group relative h-[400px] lg:h-[450px] rounded-[2rem] overflow-hidden bg-white border border-white/10 flex flex-col justify-end p-8 hover:border-white/30 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
             >
                {/* Live Iframe Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <iframe 
                    src={client.url}
                    style={{ width: '300%', height: '300%', transform: 'scale(0.334)', transformOrigin: 'top left' }}
                    className="border-none opacity-80"
                    scrolling="no"
                    tabIndex={-1}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-black/30 transition-opacity duration-500 z-0" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/30 transition-colors duration-700 mix-blend-overlay z-0" />
                
                <div className="absolute top-8 right-8 flex gap-3 z-20">
                  <a 
                    href={client.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="relative z-10 w-full flex flex-col items-start mt-auto">
                   <div className="mb-4 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">
                     {client.year}
                   </div>
                   
                   <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                     {client.name}
                   </h3>
                   
                   <div className="flex gap-1 text-[#007AFF] mb-3">
                     {[...Array(client.stars)].map((_, i) => (
                       <Star key={i} size={14} fill="currentColor" />
                     ))}
                   </div>
                   
                   <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-3 drop-shadow-md">
                     {client.type}
                   </p>
                   
                   <p className="text-white text-sm font-medium tracking-wide mb-6 italic leading-relaxed border-l-2 border-[#007AFF] pl-3 drop-shadow-md">
                     {client.testimonial}
                   </p>
                   
                   <a 
                     href={client.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                   >
                     <ExternalLink size={16} /> Visit Website
                   </a>
                </div>

             </motion.div>
           ))}
        </div>

        {/* ==============================================
            MOBILE LAYOUT (Native App Horizontal Carousel)
            ============================================== */}
        <div 
          className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 gap-4 pb-8"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
           {CLIENTS.map((client, index) => (
             <motion.div 
               key={client.id}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               whileTap={{ scale: 0.96 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="relative h-[420px] w-[85vw] max-w-[320px] shrink-0 snap-center rounded-[2rem] overflow-hidden border border-white/10 flex flex-col justify-end p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group bg-white"
             >
                {/* Live Iframe Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <iframe 
                    src={client.url}
                    style={{ width: '400%', height: '400%', transform: 'scale(0.25)', transformOrigin: 'top left' }}
                    className="border-none opacity-80"
                    scrolling="no"
                    tabIndex={-1}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-black/30 z-0" />
                <div className="absolute inset-0 bg-black/40 mix-blend-overlay z-0" />

                <div className="absolute top-6 right-6 flex gap-3 z-20">
                  <a 
                     href={client.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors shadow-sm"
                  >
                     <ExternalLink size={16} />
                  </a>
                </div>

                <div className="relative z-10 w-full flex flex-col items-start mt-auto">
                   <div className="mb-3 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-sm">
                     {client.year}
                   </div>
                   
                   <h3 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">
                     {client.name}
                   </h3>
                   
                   <div className="flex gap-1 text-[#007AFF] mb-2 drop-shadow-sm">
                     {[...Array(client.stars)].map((_, i) => (
                       <Star key={i} size={12} fill="currentColor" />
                     ))}
                   </div>
                   
                   <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase mb-3 drop-shadow-md">
                     {client.type}
                   </p>
                   
                   <p className="text-white text-xs font-medium tracking-wide mb-5 italic leading-relaxed border-l-2 border-[#007AFF] pl-3 drop-shadow-md">
                     {client.testimonial}
                   </p>
                   
                   <motion.a 
                     whileTap={{ scale: 0.95 }}
                     href={client.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black font-bold text-[10px] tracking-widest uppercase w-full shadow-[0_10px_20px_rgba(255,255,255,0.1)] hover:bg-[#007AFF] hover:text-white transition-colors"
                   >
                     <ExternalLink size={14} /> Visit Website
                   </motion.a>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
