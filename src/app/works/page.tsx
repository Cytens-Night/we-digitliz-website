"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const PROJECTS = [
  { 
    id: "shakur", 
    name: "Shakur Fragrances", 
    url: "https://card.shakurfragrances.co.uk/", 
    type: "Digital Business Card / E-Commerce", 
    desc: "A premium 3D digital business card featuring native e-commerce and offline NFC integration.",
    image: "/images/shakur_mobile.jpg",
    year: "2024"
  },
  { 
    id: "furqan-sweets", 
    name: "Furqan Sweets", 
    url: "https://furqansweets.co.uk/", 
    type: "E-Commerce Architecture", 
    desc: "A high-performance e-commerce storefront optimized for conversion and rapid load times.",
    image: "/images/furqan_desktop.jpg",
    year: "2024"
  },
  { 
    id: "hesori", 
    name: "Hesori", 
    url: "https://hesori.com", 
    type: "Agency Platform", 
    desc: "A sleek, modern web architecture showcasing premium brand identity and dynamic layouts.",
    image: "/images/hesori_desktop.jpg",
    year: "2024"
  },
  { 
    id: "marshalos", 
    name: "Marshalos", 
    url: "https://marshalos.co.uk", 
    type: "Dashboard & UI", 
    desc: "A complete digital transformation delivering seamless user experience and robust functionality.",
    image: "/images/marshalos_desktop.jpg",
    year: "2023"
  }
];

export default function WorksPage() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-32">
        {/* Massive Brutalist Header */}
        <section className="max-w-[1400px] mx-auto px-6 mb-16 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3c3c43] mb-6 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-black/20" />
            The Archive
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "circOut" }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-display font-bold text-[#1d1d1f] leading-[0.9] tracking-tight md:tracking-tighter"
          >
            SELECTED <br /> WORKS.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-xl text-[#3c3c43] max-w-2xl font-medium"
          >
            A curated selection of digital ecosystems, high-performance platforms, and cutting-edge architectures engineered by our team.
          </motion.p>
        </section>

        {/* Project Grid */}
        <section className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-24">
            {PROJECTS.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="group relative"
              >
                {/* Image Container */}
                <a href={project.url} target="_blank" rel="noreferrer" className="block relative w-full aspect-[4/3] bg-black/5 overflow-hidden mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <iframe 
                      src={project.url} 
                      title={project.name}
                      className="w-full h-full border-none pointer-events-none bg-white"
                    />
                  </motion.div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </a>

                {/* Metadata */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-[#1d1d1f] mb-3">
                      {project.name}
                    </h3>
                    <p className="text-sm font-bold tracking-[0.2em] uppercase text-[#3c3c43]">
                      {project.type}
                    </p>
                  </div>
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d1d1f] py-1 px-3 border border-black/10 rounded-full">
                    {project.year}
                  </div>
                </div>
                <p className="mt-6 text-[#3c3c43] text-lg max-w-md leading-relaxed">
                  {project.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="max-w-[1400px] mx-auto px-6 mt-20 md:mt-40">
          <div className="py-10 md:py-20 border-t border-b border-black/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#1d1d1f]">
              Ready to start?
            </h3>
            <Link href="/#contact" className="px-10 py-5 bg-[#1d1d1f] text-white font-bold text-xs tracking-widest uppercase hover:bg-black hover:scale-105 transition-all flex items-center gap-4 group shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
              Initiate Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
