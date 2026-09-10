"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Stethoscope, Utensils, Building2, Briefcase, ArrowRight } from "lucide-react";

// ==========================================
// MASSIVE SCALED MOTION GRAPHICS
// ==========================================

const RetailGraphic = () => (
  <div className="flex items-end gap-4 h-64 w-full">
     {[40, 70, 50, 100, 80].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1, ease: "easeOut" }}
          className="flex-1 bg-white/10 rounded-t-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20 border-b-0"
        />
     ))}
  </div>
);

const HealthGraphic = () => (
  <div className="h-64 w-full flex items-center">
    <svg viewBox="0 0 100 30" className="w-full h-full stroke-white fill-none stroke-[2px] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
       <motion.path 
         d="M0 15 L20 15 L25 5 L35 25 L45 5 L50 15 L100 15"
         initial={{ pathLength: 0, opacity: 0 }}
         animate={{ pathLength: 1, opacity: 1 }}
         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         strokeLinecap="round"
         strokeLinejoin="round"
       />
       <motion.circle cx="35" cy="25" r="1.5" fill="white" stroke="none" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
    </svg>
  </div>
);

const HospitalityGraphic = () => (
  <div className="h-64 w-full relative overflow-hidden flex items-end justify-center">
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
      className="w-40 h-48 bg-white/5 border border-white/20 rounded-t-[2rem] p-6 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(255,255,255,0.05)] backdrop-blur-md"
    >
      <div className="w-full h-2 bg-white/40 rounded-full" />
      <div className="w-3/4 h-2 bg-white/20 rounded-full" />
      <div className="w-1/2 h-2 bg-white/20 rounded-full" />
      <div className="mt-auto w-full h-12 bg-white/10 rounded-xl" />
    </motion.div>
  </div>
);

const RealEstateGraphic = () => (
  <div className="h-64 w-full flex items-center justify-center">
    <svg viewBox="0 0 50 50" className="w-48 h-48 stroke-white fill-none stroke-[1.5px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
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
  <div className="h-64 w-full relative border border-white/10 rounded-[2rem] bg-white/5 overflow-hidden">
     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-10 left-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute bottom-10 left-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="absolute top-16 right-16 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
     
     <svg className="absolute inset-0 w-full h-full stroke-white/30 stroke-[2px] fill-none">
       <motion.path 
         d="M40 40 L160 210 L300 100"
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

  const activeIndustry = industries.find(i => i.id === activeId) || industries[0];
  const ActiveGraphic = activeIndustry.Graphic;

  return (
    <section id="industries" className="py-24 md:py-32 bg-[#0a0a0a] relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* ==============================================
            LEFT: STICKY HEADER & DYNAMIC GRAPHIC
            ============================================== */}
        <div className="w-full lg:w-5/12 sticky top-24 lg:top-32 z-20 flex flex-col gap-8">
           
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                 Custom Solutions
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight">
                Architectures tailored <br/> for <span className="text-white/40">every sector.</span>
              </h3>
           </div>
           
           <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-md">
             We don't build generic websites. We engineer bespoke, automated digital systems that solve the specific bottlenecks of your industry.
           </p>

           {/* Dynamic Graphic Viewport */}
           <div className="w-full h-80 rounded-[2.5rem] bg-[#161a22] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] p-8 relative flex items-center justify-center overflow-hidden">
             
             {/* Crosshair grid overlay */}
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
             
             <AnimatePresence mode="wait">
               <motion.div 
                 key={activeId}
                 initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                 transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full relative z-10"
               >
                 <ActiveGraphic />
               </motion.div>
             </AnimatePresence>
           </div>
        </div>

        {/* ==============================================
            RIGHT: SCROLLING INDUSTRY CARDS
            ============================================== */}
        <div className="w-full lg:w-7/12 flex flex-col gap-8 lg:gap-32 lg:pt-32 pb-32">
           {industries.map((industry) => (
             <motion.div 
               key={industry.id}
               onViewportEnter={() => setActiveId(industry.id)}
               viewport={{ margin: "-40% 0px -40% 0px" }} // Triggers when element crosses the middle of the screen
               className="w-full relative rounded-[2.5rem] overflow-hidden bg-[#161a22] border border-white/10 shadow-2xl group flex flex-col justify-end min-h-[400px] lg:min-h-[500px] p-8 lg:p-12"
             >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-30 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${industry.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                
                {/* Index Number */}
                <div className="absolute top-8 right-8 font-display font-bold text-6xl text-white/10">
                  {industry.number}
                </div>

                {/* Content Container */}
                <div className="relative z-10">
                   
                   <div className="flex items-center gap-6 mb-6">
                      <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                         <industry.icon size={28} />
                      </div>
                      <h3 className="text-3xl lg:text-5xl font-display font-bold text-white tracking-tight">
                         {industry.title}
                      </h3>
                   </div>
                   
                   <p className="text-white/70 max-w-lg text-lg leading-relaxed mb-10">
                      {industry.description}
                   </p>

                   <button className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-widest uppercase hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                     View Case Studies <ArrowRight size={18} />
                   </button>
                   
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
}
