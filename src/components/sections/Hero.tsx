"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Globe, Smartphone, Zap, Palette, ArrowRight, BarChart3 } from "lucide-react";

// --- MAGNETIC BUTTON ---
function MagneticButton({ children, className, href }: { children: React.ReactNode, className?: string, href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rx = useSpring(x, springConfig);
  const ry = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set((mouseX / width) * 40);
    y.set((mouseY / height) * 40);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: rx, y: ry }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const words = ["Web Experiences.", "Mobile Apps.", "Automated Systems.", "Brand Identities."];

const services = [
  { icon: Globe, label: "Web", desc: "High-performance sites" },
  { icon: Smartphone, label: "Apps", desc: "iOS & Android" },
  { icon: Zap, label: "Automation", desc: "Seamless workflows" },
  { icon: BarChart3, label: "Marketing", desc: "SEO & Social Growth" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] md:h-auto md:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#f5f5f7]">
      
      {/* Clean Ambient Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:pl-24 flex flex-col items-center text-center pt-24 pb-12 md:py-0">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 px-5 py-2 rounded-full bg-white text-[#1d1d1f] text-xs font-bold tracking-widest uppercase border border-black/10 shadow-sm flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Premium Digital Agency
        </motion.div>
        
        {/* Massive Dynamic Typography */}
        <div className="text-[8.5vw] sm:text-5xl md:text-6xl lg:text-[6rem] font-display font-bold text-[#1d1d1f] mb-8 max-w-5xl tracking-tight flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            We engineer
          </motion.div>
          <div className="h-[1.2em] relative w-full flex justify-center mt-1 md:mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -40, rotateX: 90 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-primary whitespace-nowrap drop-shadow-sm pb-2"
                style={{ transformOrigin: "50% 50% -50px" }}
              >
                {words[index]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-xl text-[#3c3c43] font-medium max-w-2xl mb-10 md:mb-14 leading-relaxed px-4"
        >
          End-to-end digital transformation. From breathtaking web experiences to seamless backend automation, we engineer growth for brands that refuse to settle.
        </motion.p>

        {/* Bento Service Dock - 2x2 Grid on Mobile, Row on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-2 sm:gap-4 mb-10 md:mb-16 w-full max-w-4xl px-2 sm:px-6 md:px-0"
        >
          {services.map((service, i) => (
            <motion.div 
              key={service.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-white/80 backdrop-blur-xl border border-black/5 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md active:scale-95 md:active:scale-100 hover:scale-[1.03] transition-all cursor-default md:w-auto"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center border border-black/5 shrink-0 shadow-inner">
                <service.icon size={18} className="text-[#1d1d1f] sm:w-5 sm:h-5" />
              </div>
              <div className="text-left pr-2">
                <div className="text-xs sm:text-sm font-bold text-[#1d1d1f] tracking-tight">{service.label}</div>
                <div className="text-[10px] sm:text-xs text-[#3c3c43] leading-tight mt-0.5">{service.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <MagneticButton
            href="#contact"
            className="w-full sm:w-auto px-10 py-4 sm:py-5 rounded-full bg-[#1d1d1f] text-white hover:bg-black font-bold hover:scale-105 transition-all flex items-center justify-center text-sm md:text-base uppercase tracking-wider shadow-[0_10px_20px_rgba(0,0,0,0.15)] gap-2 group"
          >
            Start Your Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          
          <MagneticButton
            href="#services"
            className="w-full sm:w-auto px-10 py-4 sm:py-5 rounded-full bg-white text-[#1d1d1f] font-bold hover:bg-gray-50 transition-all flex items-center justify-center text-sm md:text-base uppercase tracking-wider border border-black/10 shadow-sm"
          >
            Explore Services
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
