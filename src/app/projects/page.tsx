"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone, Monitor } from "lucide-react";
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
    device: "mobile",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    url: "https://furqansweets.co.uk/", 
    type: "E-Commerce Architecture", 
    desc: "A high-performance e-commerce storefront optimized for conversion and rapid load times.",
    year: "2024",
    device: "desktop",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    url: "https://hesori.com", 
    type: "Agency Platform", 
    desc: "A sleek, modern web architecture showcasing premium brand identity and dynamic layouts.",
    year: "2024",
    device: "desktop",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    url: "https://marshalos.co.uk", 
    type: "Dashboard & UI", 
    desc: "A complete digital transformation delivering seamless user experience and robust functionality.",
    year: "2023",
    device: "desktop",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
  },
  { 
    id: "furqan-sweets-card", 
    name: "Furqan Sweets Card", 
    url: "https://furqansweets.co.uk/card", 
    type: "Digital Business Card", 
    desc: "A sleek, NFC-enabled digital business card engineered for rapid networking and brand impact.",
    year: "2024",
    device: "mobile",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function ProjectsPage() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen text-[#1d1d1f] selection:bg-[#007AFF] selection:text-white">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-32 overflow-hidden">
        {/* Clean Header */}
        <section className="max-w-[1400px] mx-auto px-6 mb-16 md:mb-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-8 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-black/20" />
            Our Portfolio
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
            className="mt-8 md:mt-16 text-lg md:text-2xl text-[#3c3c43] max-w-2xl font-medium leading-relaxed"
          >
            A curated selection of digital ecosystems, high-performance platforms, and cutting-edge architectures engineered by our team. Live and functional.
          </motion.p>
        </section>

        {/* ==============================================
            DESKTOP LAYOUT (Bento Grid)
            ============================================== */}
        <section className="hidden lg:grid grid-cols-2 gap-8 px-12 max-w-[1400px] mx-auto">
          {PROJECTS.map((project, index) => {
             const isLarge = index === 0 || index === 3;
             
             return (
               <motion.div 
                 key={project.id}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-10%" }}
                 transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                 className={`group relative rounded-[2rem] overflow-hidden bg-white border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 ${isLarge ? 'col-span-2 aspect-[21/9]' : 'col-span-1 aspect-square'}`}
               >
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                 
                 <img 
                   src={project.image} 
                   alt={project.name} 
                   className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                 />

                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />

                 <div className="absolute inset-0 z-30 p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-white/10">
                        {project.year}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/80 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 flex items-center gap-2">
                        {project.device === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}
                        {project.device}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
                      {project.name}
                    </h3>
                    
                    <p className="text-white/70 text-lg max-w-xl mb-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {project.desc}
                    </p>

                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 w-fit text-white font-bold uppercase tracking-widest text-xs bg-[#007AFF] px-6 py-3 rounded-full hover:bg-[#0056b3] transition-colors transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-100"
                    >
                      Live Preview <ArrowUpRight size={16} />
                    </a>
                 </div>
               </motion.div>
             );
          })}
        </section>

        {/* ==============================================
            MOBILE LAYOUT (Vertical Native Stack)
            ============================================== */}
        <section className="lg:hidden flex flex-col gap-6 px-6 w-full">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full flex flex-col bg-white rounded-[2rem] p-6 sm:p-8 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group"
            >
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                 <img 
                   src={project.image} 
                   alt={project.name} 
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-white border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-black/40">
                      {project.year}
                    </span>
                 </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-[#1d1d1f] mb-1 tracking-tight">
                {project.name}
              </h3>
              
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#007AFF] mb-4">
                {project.type}
              </p>
              
              <p className="text-[#3c3c43] text-sm leading-relaxed mb-8">
                {project.desc}
              </p>

              <a 
                href={project.url} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-4 bg-[#f5f5f7] text-[#1d1d1f] font-bold text-[10px] tracking-widest uppercase rounded-2xl flex items-center justify-center gap-3 hover:bg-[#007AFF] hover:text-white transition-colors mt-auto"
              >
                Live Preview <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </section>

        {/* CTA Footer */}
        <section className="max-w-[1400px] mx-auto px-6 mt-24 md:mt-40 relative z-10">
          <div className="py-16 md:py-24 border-t border-b border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 bg-white rounded-3xl px-8 shadow-sm">
            <div>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-[#1d1d1f] tracking-tight mb-3">
                Let's build your next architecture.
              </h3>
              <p className="text-[#3c3c43] text-lg">Stop relying on templates. Go bespoke.</p>
            </div>
            <Link href="/#contact" className="px-8 py-4 bg-[#007AFF] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#0056b3] hover:scale-105 transition-all flex items-center gap-3 rounded-full shrink-0">
              Initiate Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
