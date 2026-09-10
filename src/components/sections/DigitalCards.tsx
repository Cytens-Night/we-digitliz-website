"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CLIENTS = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    type: "Digital Business Card & E-Commerce", 
    year: "2024",
    url: "https://card.shakurfragrances.co.uk/"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    type: "High-Performance Storefront", 
    year: "2024",
    url: "https://furqansweets.co.uk/"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    type: "Premium Brand Architecture", 
    year: "2024",
    url: "https://hesori.com"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    type: "Complete Digital Transformation", 
    year: "2023",
    url: "https://marshalos.co.uk"
  }
];

export default function DigitalCards() {
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

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           {CLIENTS.map((client, index) => (
             <a href={client.url} target="_blank" rel="noreferrer" key={client.id}>
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 0.6, delay: index * 0.1 }}
                 className="group relative h-[300px] md:h-[400px] rounded-3xl bg-[#161a22] overflow-hidden border border-white/10 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
               >
                 {/* Reveal Live Iframe on Hover */}
                 <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none">
                    <iframe 
                      src={client.url}
                      title={client.name}
                      className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] bg-white scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                    />
                    {/* Dark gradient overlay to ensure text remains perfectly readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                 </div>

                 {/* Default Dark Background pattern */}
                 <div className="absolute inset-0 z-0 opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

                 {/* Content overlay */}
                 <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-10">
                    <div className="flex justify-between items-start">
                       <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 border border-white/10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
                         {client.year}
                       </span>
                       <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                          <ArrowUpRight size={18} className="text-white" />
                       </div>
                    </div>

                    <div>
                       <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                         {client.name}
                       </h3>
                       <p className="text-white/50 group-hover:text-white/80 transition-colors duration-500 text-sm md:text-base font-medium tracking-wide">
                         {client.type}
                       </p>
                    </div>
                 </div>
               </motion.div>
             </a>
           ))}
        </div>

      </div>
    </section>
  );
}
