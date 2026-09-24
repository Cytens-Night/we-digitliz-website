"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Stethoscope, Utensils, Building2, Briefcase, ArrowRight } from "lucide-react";

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
  },
  {
    id: "health",
    number: "02",
    title: "Healthcare",
    description: "HIPAA-compliant patient portals, automated appointment scheduling, and secure telehealth infrastructures designed for modern medical practices.",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "hospitality",
    number: "03",
    title: "Hospitality & Food",
    description: "QR-code ordering systems, automated kitchen routing, and digital loyalty programs that reduce wait times and skyrocket customer retention.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "realestate",
    number: "04",
    title: "Real Estate",
    description: "Immersive 3D property tours, automated lead assignment, and unified broker dashboards that close deals faster than ever before.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "corporate",
    number: "05",
    title: "Corporate & SaaS",
    description: "B2B client portals, automated invoicing flows, and bespoke CRM integrations that eliminate manual data entry from your daily operations.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
  }
];

// ==========================================
// CARD COMPONENT (Scroll Animation Logic)
// ==========================================

const Card = ({ industry, index, total }: { industry: any, index: number, total: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track this specific card's progress relative to the viewport
  const { scrollYProgress: exitProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // As the user scrolls past the stuck card, it scales down and fades out smoothly
  const scale = useTransform(exitProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(exitProgress, [0, 1], [1, 0.4]);

  // Calculate dynamic sticky top position so cards stack like a deck
  const topOffset = `calc(12vh + ${index * 30}px)`;

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        scale, 
        opacity,
        top: topOffset
      }}
      className={`md:sticky md:h-[75vh] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center bg-[#161a22] relative group ${index === total - 1 ? 'md:mb-0' : 'md:mb-[60vh]'} mb-12`}
    >
      {/* Background Image with Parallax/Hover */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50 mix-blend-overlay transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${industry.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
      
      {/* Main Content */}
      <div className="relative z-10 p-8 md:p-16 lg:p-24 flex flex-col justify-end w-full h-full">
         <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
               <industry.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight">
               {industry.title}
            </h3>
         </div>
         <p className="text-white/70 text-lg md:text-2xl lg:text-3xl max-w-4xl leading-relaxed mb-10 md:mb-12 font-medium">
            {industry.description}
         </p>
         <button className="inline-flex items-center justify-center gap-4 px-6 md:px-8 py-3 md:py-4 w-full md:w-max rounded-full bg-white text-black font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-[#007AFF] hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
           View Case Studies <ArrowRight size={18} />
         </button>
      </div>

      {/* Giant Number Watermark */}
      <div className="hidden md:block absolute top-12 right-16 font-display font-bold text-[12rem] leading-none text-white/[0.03] select-none pointer-events-none">
        {industry.number}
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN SECTION
// ==========================================

export default function Industries() {
  return (
    <section id="industries" className="relative bg-[#0a0a0a] py-24 md:py-40">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#007AFF]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white text-sm font-semibold mb-6 md:mb-8 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]"
        >
           Custom Solutions
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.05] tracking-tight"
        >
          Architectures tailored <br/> for <span className="text-white/40">every sector.</span>
        </motion.h3>
      </div>

      {/* Stacking Cards Container */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 pb-12 md:pb-32">
        {industries.map((industry, index) => (
          <Card 
            key={industry.id} 
            industry={industry} 
            index={index} 
            total={industries.length} 
          />
        ))}
      </div>
    </section>
  );
}
