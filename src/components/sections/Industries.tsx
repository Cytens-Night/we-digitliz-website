"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Stethoscope, Utensils, Building2, Briefcase, ArrowRight } from "lucide-react";

// ==========================================
// BESPOKE SVG MOTION GRAPHICS
// ==========================================

const RetailGraphic = () => (
  <div className="flex items-end gap-2 h-16 mt-4 w-full max-w-[200px]">
     {[40, 70, 50, 100, 80].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1, ease: "easeOut" }}
          className="flex-1 bg-black/5 rounded-t-md shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        />
     ))}
  </div>
);

const HealthGraphic = () => (
  <div className="h-16 mt-4 w-full max-w-[200px] flex items-center">
    <svg viewBox="0 0 100 30" className="w-full h-full stroke-primary fill-none stroke-[3px] drop-shadow-[0_0_20px_rgba(0,0,0,0.2)]">
       <motion.path 
         d="M0 15 L20 15 L25 5 L35 25 L45 5 L50 15 L100 15"
         initial={{ pathLength: 0, opacity: 0 }}
         animate={{ pathLength: 1, opacity: 1 }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         strokeLinecap="round"
         strokeLinejoin="round"
       />
    </svg>
  </div>
);

const HospitalityGraphic = () => (
  <div className="h-16 mt-4 w-full max-w-[200px] relative overflow-hidden flex items-end">
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
      className="w-16 h-20 bg-black/10 border border-black/20 rounded-t-xl mx-auto p-3 flex flex-col gap-2 shadow-[0_-5px_20px_rgba(255,255,255,0.1)]"
    >
      <div className="w-full h-1.5 bg-white/40 rounded-full" />
      <div className="w-3/4 h-1.5 bg-black/20 rounded-full" />
      <div className="w-1/2 h-1.5 bg-black/20 rounded-full" />
    </motion.div>
  </div>
);

const RealEstateGraphic = () => (
  <div className="h-16 mt-4 w-full max-w-[200px] flex items-center">
    <svg viewBox="0 0 50 50" className="w-16 h-16 stroke-primary fill-none stroke-[2px] drop-shadow-[0_0_20px_rgba(0,0,0,0.2)]">
       <motion.path 
         d="M25 5 L5 20 L5 45 L45 45 L45 20 Z M20 45 L20 30 L30 30 L30 45"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: 1 }}
         transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
         strokeLinecap="round"
         strokeLinejoin="round"
       />
    </svg>
  </div>
);

const CorporateGraphic = () => (
  <div className="h-16 mt-4 w-full max-w-[200px] relative">
     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-2 left-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#0066cc]" />
     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute bottom-2 left-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#0066cc]" />
     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#0066cc]" />
     
     <svg className="absolute inset-0 w-full h-full stroke-primary/50 stroke-[2px] fill-none">
       <motion.path 
         d="M22 14 L95 44 L180 22"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: 1 }}
         transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
       />
     </svg>
  </div>
);

// ==========================================
// DATA
// ==========================================

const industries = [
  {
    id: "retail",
    number: "01",
    title: "Retail & E-Commerce",
    description: "We build high-converting, native shopping experiences that keep your customers locked in your brand's ecosystem without relying on clunky third-party checkout redirects.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    Graphic: RetailGraphic
  },
  {
    id: "healthcare",
    number: "02",
    title: "Healthcare",
    description: "Secure, HIPAA-compliant patient portals and automated booking systems designed to reduce administrative overhead and improve patient experience.",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    Graphic: HealthGraphic
  },
  {
    id: "hospitality",
    number: "03",
    title: "Hospitality",
    description: "From custom restaurant ordering systems to boutique hotel reservation platforms, we engineer digital hospitality that rivals your physical service.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
    Graphic: HospitalityGraphic
  },
  {
    id: "realestate",
    number: "04",
    title: "Real Estate",
    description: "Immersive 3D property tours, automated lead generation drawers, and CRM integrations that turn passive browsers into scheduled viewings.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    Graphic: RealEstateGraphic
  },
  {
    id: "corporate",
    number: "05",
    title: "Corporate Services",
    description: "Bespoke internal tooling, automated workflows, and modern intranet architectures that shatter bottlenecks and scale with your enterprise.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    Graphic: CorporateGraphic
  },
];

export default function Industries() {
  const [activeId, setActiveId] = useState(industries[0].id);

  return (
    <section id="industries" className="py-32 bg-[#f5f5f7] overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-[#1d1d1f] text-sm font-semibold mb-6 border border-black/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]">
               Custom Solutions
            </div>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#1d1d1f] leading-tight">
              Architectures tailored <br/> for <span className="text-[#1d1d1f]">every sector.</span>
            </h3>
          </div>
          <p className="text-[#3c3c43] max-w-md pb-2 text-lg md:text-xl">
            We don't build generic websites. We engineer bespoke, automated digital systems that solve the specific bottlenecks of your industry.
          </p>
        </div>

        {/* The Expandable Flex Accordion */}
        <div className="flex flex-col lg:flex-row w-full h-[900px] lg:h-[650px] gap-4">
          {industries.map((industry) => {
            const isActive = activeId === industry.id;
            const Graphic = industry.Graphic;
            
            return (
              <div 
                key={industry.id}
                onMouseEnter={() => setActiveId(industry.id)}
                className={`
                  relative rounded-[2.5rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group border border-black/5 hover:border-black/10
                  ${isActive ? 'flex-[4] lg:flex-[5] bg-[#fafafa] shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'flex-[1] lg:flex-[1] bg-[#ffffff]'}
                `}
              >
                {/* Background Image with Parallax & Grayscale Toggle */}
                <div 
                  className={`
                    absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ease-out
                    ${isActive ? 'scale-105 grayscale-0 opacity-40' : 'scale-100 grayscale opacity-20 group-hover:opacity-30'}
                  `}
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className={`absolute inset-0 bg-[#1d1d1f] transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-100'}`} />
                
                {/* Index Number */}
                <div className={`
                  absolute top-8 right-8 font-display font-bold text-5xl transition-all duration-700
                  ${isActive ? 'text-black/40 scale-110' : 'text-black/5 scale-100'}
                `}>
                  {industry.number}
                </div>

                {/* Content Container */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col justify-end h-full">
                   
                   <div className={`transition-all duration-700 transform ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                      
                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 mb-4">
                         <div className={`
                            shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border transition-all duration-700 
                            ${isActive ? 'bg-black/5 border-black/20 text-[#1d1d1f] shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-black/5 border-black/10 text-[#3c3c43] group-hover:text-[#1d1d1f]'}
                         `}>
                            <industry.icon size={24} />
                         </div>
                         
                         <h3 className={`
                            font-display font-bold transition-all duration-700 whitespace-nowrap
                            ${isActive ? 'text-3xl lg:text-4xl text-[#1d1d1f] opacity-100' : 'text-xl text-[#3c3c43] lg:opacity-0 lg:-translate-x-4 lg:absolute lg:pointer-events-none'}
                         `}>
                            {industry.title}
                         </h3>
                       </div>
                      
                      {/* Expanding Details & Motion Graphics */}
                      <div className={`
                         overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col
                         ${isActive ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}
                      `}>
                         
                         <p className="text-[#1d1d1f]/70 mb-8 max-w-md text-lg leading-relaxed">
                            {industry.description}
                         </p>

                         {/* NATIVE SVG MOTION GRAPHIC */}
                         <div className="mb-10">
                            <Graphic />
                         </div>

                         <div>
                           <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                             View Case Studies <ArrowRight size={18} />
                           </button>
                         </div>
                      </div>

                   </div>
                </div>

                {/* Vertical Text for Inactive State (Desktop Only) */}
                {!isActive && (
                  <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
                     <h3 className="text-xl font-display font-bold text-black/50 whitespace-nowrap -rotate-90 tracking-widest uppercase">
                        {industry.title}
                     </h3>
                  </div>
                )}
                
              </div>
            )
          })}
        </div>

      </div>
    </section>
  );
}
