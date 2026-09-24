"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const CLIENTS = [
  { 
    id: "shakur", 
    name: "SHAKUR", 
    type: "Digital Business Card & E-Commerce", 
    year: "2026",
    testimonial: '"wedigitlize built us a breathtaking digital presence. Our sales doubled in the first month. The attention to detail is truly unmatched in the industry."',
    stars: 5,
    gradient: "from-[#FFD700]/20 via-[#FF8C00]/10 to-transparent",
    logoStyle: "font-serif tracking-[0.3em] uppercase text-xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FF8C00]"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    type: "High-Performance Storefront", 
    year: "2026",
    testimonial: '"The speed and design of our new storefront is flawless. They elevated our brand identity to a level we didn\'t know was possible."',
    stars: 5,
    gradient: "from-[#007AFF]/20 via-[#00B4DB]/10 to-transparent",
    logoStyle: "font-display tracking-tight text-2xl md:text-4xl font-black text-black drop-shadow-[0_0_15px_rgba(0,122,255,0.5)]"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    type: "Premium Brand Architecture", 
    year: "2026",
    testimonial: '"A seamless, premium experience from start to finish. They completely understand luxury brand architecture and delivered absolute perfection."',
    stars: 5,
    gradient: "from-[#FF0080]/20 via-[#7928CA]/10 to-transparent",
    logoStyle: "font-sans tracking-[0.4em] uppercase text-xl md:text-2xl font-light text-black"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    type: "Complete Digital Transformation", 
    year: "2026",
    testimonial: '"Absolute perfection. They completely transformed our digital ecosystem, streamlined our workflows, and provided a stunning visual identity."',
    stars: 5,
    gradient: "from-[#00DFD8]/20 via-[#007AFF]/10 to-transparent",
    logoStyle: "font-display tracking-widest uppercase text-2xl md:text-3xl font-bold italic text-black"
  }
];

export default function DigitalCards() {
  return (
    <section id="portfolio" className="relative bg-white text-black py-24 md:py-32 overflow-hidden border-t border-black/15">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-black/10 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center gap-6">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/10 text-black/90 text-xs font-bold border border-black/15 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.05)]">
              Client Testimonials
           </div>
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-black max-w-4xl tracking-tight leading-[1.1]">
             What our clients <br/> <span className="text-black/80">say about us.</span>
           </h2>
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
               className="group relative h-[400px] lg:h-[450px] rounded-[2rem] overflow-hidden bg-[#f5f5f7] border border-black/15 flex flex-col p-8 hover:border-black/20 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_rgba(0,122,255,0.15)]"
             >
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />
                
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none mix-blend-overlay" />
                
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-black/5 group-hover:text-black/70 transition-colors duration-500 z-10">
                  <Quote size={80} strokeWidth={1} />
                </div>

                <div className="relative z-10 w-full flex flex-col h-full">
                   {/* Logo / Brand Name */}
                   <div className="mb-auto mt-4">
                     <span className={client.logoStyle}>
                       {client.name}
                     </span>
                   </div>
                   
                   {/* Stars */}
                   <div className="flex gap-1.5 text-[#007AFF] mb-6">
                     {[...Array(client.stars)].map((_, i) => (
                       <motion.div 
                         key={i}
                         initial={{ scale: 1 }}
                         whileHover={{ scale: 1.2, rotate: 180 }}
                         transition={{ duration: 0.3 }}
                       >
                         <Star size={20} fill="currentColor" />
                       </motion.div>
                     ))}
                   </div>
                   
                   {/* Testimonial */}
                   <p className="text-xl lg:text-2xl font-display font-medium text-black/90 leading-relaxed mb-8 drop-shadow-md pr-8 group-hover:text-black transition-colors duration-300">
                     {client.testimonial}
                   </p>
                   
                   {/* Footer info */}
                   <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/15">
                     <p className="text-black/70 text-xs font-bold tracking-widest uppercase">
                       {client.type}
                     </p>
                     <div className="px-3 py-1 bg-black/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-black/80">
                       {client.year}
                     </div>
                   </div>
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
               whileTap={{ scale: 0.98 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="relative h-[450px] w-[85vw] max-w-[340px] shrink-0 snap-center rounded-[2rem] overflow-hidden bg-[#f5f5f7] border border-black/15 flex flex-col p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group"
             >
                {/* Dynamic Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient} opacity-50 z-0`} />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none mix-blend-overlay" />
                
                <div className="absolute top-6 right-6 text-black/70 z-10">
                  <Quote size={60} strokeWidth={1} />
                </div>

                <div className="relative z-10 w-full flex flex-col h-full">
                   <div className="mb-auto mt-2">
                     <span className={client.logoStyle}>
                       {client.name}
                     </span>
                   </div>
                   
                   <div className="flex gap-1.5 text-[#007AFF] mb-6">
                     {[...Array(client.stars)].map((_, i) => (
                       <Star key={i} size={16} fill="currentColor" />
                     ))}
                   </div>
                   
                   <p className="text-lg font-display font-medium text-black/90 leading-relaxed mb-6 drop-shadow-md pr-4">
                     {client.testimonial}
                   </p>
                   
                   <div className="flex flex-col gap-3 mt-auto pt-5 border-t border-black/15">
                     <p className="text-black/80 text-[10px] font-bold tracking-widest uppercase">
                       {client.type}
                     </p>
                     <div className="w-max px-3 py-1 bg-black/10 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-black/70">
                       {client.year}
                     </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
