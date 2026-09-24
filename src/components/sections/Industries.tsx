"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ShoppingBag, Stethoscope, Utensils, Building2, Briefcase, ArrowRight } from "lucide-react";

// ==========================================
// MASSIVE SCALED MOTION GRAPHICS
// ==========================================

const RetailGraphic = () => (
  <div className="flex items-end gap-4 h-full w-full justify-center opacity-80">
     {[40, 70, 50, 100, 80].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1, ease: "easeOut" }}
          className="w-12 sm:w-16 bg-white/10 rounded-t-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20 border-b-0"
        />
     ))}
  </div>
);

const HealthGraphic = () => (
  <div className="h-full w-full flex items-center justify-center opacity-80">
    <svg viewBox="0 0 100 30" className="w-full h-auto max-w-[300px] stroke-white fill-none stroke-[2px] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
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
  <div className="h-full w-full relative overflow-hidden flex items-end justify-center opacity-80 pb-10">
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
      className="w-48 h-56 bg-white/5 border border-white/20 rounded-t-[2rem] p-6 flex flex-col gap-4 shadow-[0_-10px_40px_rgba(255,255,255,0.05)] backdrop-blur-md"
    >
      <div className="w-full h-3 bg-white/40 rounded-full" />
      <div className="w-3/4 h-3 bg-white/20 rounded-full" />
      <div className="w-1/2 h-3 bg-white/20 rounded-full" />
      <div className="mt-auto w-full h-16 bg-white/10 rounded-xl" />
    </motion.div>
  </div>
);

const RealEstateGraphic = () => (
  <div className="h-full w-full flex items-center justify-center opacity-80">
    <svg viewBox="0 0 50 50" className="w-64 h-64 stroke-white fill-none stroke-[1.5px] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
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
  <div className="h-[250px] w-full max-w-[300px] relative border border-white/10 rounded-[2rem] bg-white/5 overflow-hidden opacity-80">
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
    Graphic: RetailGraphic,
  },
  {
    id: "health",
    number: "02",
    title: "Healthcare",
    description: "HIPAA-compliant patient portals, automated appointment scheduling, and secure telehealth infrastructures designed for modern medical practices.",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
    Graphic: HealthGraphic,
  },
  {
    id: "hospitality",
    number: "03",
    title: "Hospitality & Food",
    description: "QR-code ordering systems, automated kitchen routing, and digital loyalty programs that reduce wait times and skyrocket customer retention.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200",
    Graphic: HospitalityGraphic,
  },
  {
    id: "realestate",
    number: "04",
    title: "Real Estate",
    description: "Immersive 3D property tours, automated lead assignment, and unified broker dashboards that close deals faster than ever before.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    Graphic: RealEstateGraphic,
  },
  {
    id: "corporate",
    number: "05",
    title: "Corporate & SaaS",
    description: "B2B client portals, automated invoicing flows, and bespoke CRM integrations that eliminate manual data entry from your daily operations.",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    Graphic: CorporateGraphic,
  }
];

// ==========================================
// CARD COMPONENT (Scroll + Mouse Animation Logic)
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

  // --- Mouse Parallax Animation ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized coordinates (-1 to 1)
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    
    // Multiply by a factor for the pixel sway
    setMousePos({ x: x * 25, y: y * 25 });
  };

  const Graphic = industry.Graphic;

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        scale, 
        opacity,
        top: topOffset
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className={`md:sticky md:h-[75vh] w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between bg-[#161a22] relative group ${index === total - 1 ? 'md:mb-0' : 'md:mb-[60vh]'} mb-12`}
    >
      {/* Background Image with Parallax/Hover */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 md:opacity-50 mix-blend-overlay transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${industry.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30 md:bg-gradient-to-r md:from-[#0a0a0a] md:via-[#0a0a0a]/80 md:to-[#0a0a0a]/30" />
      
      {/* Main Content (Left) */}
      <div className="relative z-20 p-8 md:p-16 lg:p-24 flex flex-col justify-end md:justify-center w-full md:w-1/2 h-full order-2 md:order-1">
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

      {/* Motion Graphic (Right) with Mouse Parallax */}
      <div className="relative z-10 w-full md:w-1/2 h-[30vh] md:h-full flex items-center justify-center p-8 md:p-16 order-1 md:order-2 overflow-hidden md:overflow-visible">
         <motion.div 
           animate={{ 
             x: isHovered ? mousePos.x : 0, 
             y: isHovered ? mousePos.y : 0,
             rotateY: isHovered ? mousePos.x * 0.5 : 0,
             rotateX: isHovered ? -mousePos.y * 0.5 : 0
           }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
           className="w-full h-full max-w-[400px] flex items-center justify-center transform-style-3d drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]"
         >
           <Graphic />
         </motion.div>
      </div>

      {/* Giant Number Watermark */}
      <div className="hidden md:block absolute top-12 right-16 font-display font-bold text-[12rem] leading-none text-white/[0.03] select-none pointer-events-none z-0">
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
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 pb-12 md:pb-32">
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
