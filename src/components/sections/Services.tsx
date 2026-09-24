"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MonitorSmartphone, LayoutTemplate, PenTool, BarChart3, CloudLightning, ShieldCheck, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Automated Systems",
    description: "From intelligent cashier systems to custom internal tooling, we automate workflows to save you time and money.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1 md:row-span-2",
    bgPattern: "",
  },
  {
    icon: LayoutTemplate,
    title: "Web Presence",
    description: "Cinematic, high-performance websites built with cutting-edge architectures like Next.js and Framer Motion.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    bgPattern: "",
  },
  {
    icon: PenTool,
    title: "Brand Redesign",
    description: "New logos, fresh colors, stronger identities.",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    bgPattern: "",
  },
  {
    icon: BarChart3,
    title: "Lead Gen",
    description: "Data-driven strategies for client acquisition.",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
    bgPattern: "",
  },
  {
    icon: CloudLightning,
    title: "App Development",
    description: "Have a business idea? We walk through it with you and bring it to life with scalable cloud architecture.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    bgPattern: "",
  },
  {
    icon: ShieldCheck,
    title: "System Integration",
    description: "Seamlessly connect your disparate systems into one unified, secure ecosystem.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    bgPattern: "",
  },
];

// 3D Tilt Card Component
function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse position to rotation degrees (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Dynamic glare effect based on mouse position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative perspective-[2000px] ${className}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full bg-card hover:bg-background border border-black/5 dark:border-white/5 transition-colors duration-500 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group"
      >
        
        {/* The Card Content */}
        {children}

        {/* 3D Dynamic Glare Effect removed per instructions */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 mix-blend-overlay"
          style={{
            background: `transparent`,
            left: glareX,
            top: glareY,
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%'
          }}
        />

        {/* Hover Border Glow */}
        <div className="absolute inset-0 border-2 border-black/20 group-hover:border-black/20 transition-colors duration-700 rounded-[2rem] pointer-events-none z-40" />

      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-32 bg-background transition-colors duration-1000 relative overflow-hidden">
      
      {/* Decorative blurred blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-black/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 text-[#1d1d1f] dark:text-white text-sm font-bold mb-6 border border-black/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]"
          >
             Core Capabilities
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#1d1d1f] dark:text-white mb-6 leading-[1.1] tracking-tight md:tracking-normal"
          >
            Comprehensive solutions for <br/> <span className="text-[#1d1d1f] dark:text-white">modern enterprises.</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#3c3c43] dark:text-white/70 max-w-2xl mx-auto"
          >
            wedigitlize your world so you can scale in confidence. From full-scale automations and custom SaaS to stunning brand aesthetics.
          </motion.p>
        </div>

        {/* ==============================================
            DESKTOP LAYOUT (Complex Asymmetrical 3D Grid)
            ============================================== */}
        <div className="hidden md:grid grid-cols-4 grid-rows-3 gap-6 auto-rows-[minmax(220px,auto)] perspective-[2000px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHero = index === 0;
            
            return (
              <TiltCard 
                key={index} 
                delay={index * 0.1}
                className={`${service.colSpan} ${service.rowSpan}`}
              >
                <div className={`absolute inset-0 ${service.bgPattern} opacity-50 z-0`} />
                
                <div 
                  className={`relative z-10 h-full flex flex-col justify-between ${isHero ? 'p-12' : 'p-8'}`}
                  style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                >
                  <div className={`
                    rounded-2xl flex items-center justify-center border transition-all duration-700 shadow-xl
                    ${isHero ? 'w-24 h-24 bg-black/5 border-black/10 mb-8' : 'w-16 h-16 bg-black/5 border-black/10 mb-6'}
                    group-hover:bg-black/5 group-hover:border-black/20 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,0,0,0.2)]
                  `}>
                    <Icon className={`${isHero ? 'w-12 h-12' : 'w-8 h-8'} text-[#1d1d1f] dark:text-white/70 group-hover:text-[#1d1d1f] dark:text-white transition-colors duration-500`} />
                  </div>
                  
                  <div style={{ transform: "translateZ(40px)" }}>
                    <h4 className={`${isHero ? 'text-4xl lg:text-5xl' : 'text-2xl'} font-display font-bold text-[#1d1d1f] dark:text-white mb-4 group-hover:text-primary transition-colors`}>
                      {service.title}
                    </h4>
                    <p className={`text-[#3c3c43] dark:text-white/70 leading-relaxed ${isHero ? 'text-lg max-w-md' : 'text-sm'}`}>
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0" style={{ transform: "translateZ(20px)" }}>
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-[#1d1d1f] dark:text-white backdrop-blur-md">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* ==============================================
            MOBILE NATIVE APP LAYOUT (Native iOS-Style List)
            ============================================== */}
        <div className="md:hidden flex flex-col gap-3 px-2">
          <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isLast = index === services.length - 1;
              return (
                <div 
                  key={index} 
                  className={`flex items-center p-4 active:bg-black/5 transition-colors cursor-pointer ${!isLast ? 'border-b border-black/5 dark:border-white/5' : ''}`}
                >
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-[#007AFF]" />
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-0.5 truncate">
                      {service.title}
                    </h4>
                    <p className="text-[11px] text-[#8a8d91] line-clamp-1">
                      {service.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-black/20 dark:text-white/20 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
