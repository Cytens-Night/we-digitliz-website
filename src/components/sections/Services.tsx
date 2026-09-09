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
    bgPattern: "bg-[linear-gradient(to_right,#0066cc15_1px,transparent_1px),linear-gradient(to_bottom,#0066cc15_1px,transparent_1px)] bg-[size:24px_24px]",
  },
  {
    icon: LayoutTemplate,
    title: "Web Presence",
    description: "Cinematic, high-performance websites built with cutting-edge architectures like Next.js and Framer Motion.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    bgPattern: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent",
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
    bgPattern: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "System Integration",
    description: "Seamlessly connect your disparate systems into one unified, secure ecosystem.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
    bgPattern: "bg-[linear-gradient(45deg,#0066cc10_25%,transparent_25%,transparent_50%,#0066cc10_50%,#0066cc10_75%,transparent_75%,transparent_100%)] bg-[length:24px_24px]",
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
        className="relative w-full h-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-500 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer group"
      >
        
        {/* The Card Content */}
        {children}

        {/* 3D Dynamic Glare Effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 50%)`,
            left: glareX,
            top: glareY,
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%'
          }}
        />

        {/* Hover Border Glow */}
        <div className="absolute inset-0 border-2 border-white/20 group-hover:border-white/30 transition-colors duration-700 rounded-[2rem] pointer-events-none z-40" />

      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Decorative blurred blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 text-white text-sm font-bold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
             Core Capabilities
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight md:tracking-normal mix-blend-screen"
          >
            Comprehensive solutions for <br/> <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">modern enterprises.</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            We digitliz your world so you can scale in confidence. From full-scale automations and custom SaaS to stunning brand aesthetics.
          </motion.p>
        </div>

        {/* ASYMMETRICAL BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[minmax(220px,auto)] perspective-[2000px]">
          {services.map((service, index) => {
            const Icon = service.icon;
            // The large hero tile (Automated Systems) needs more padding and larger text
            const isHero = index === 0;
            
            return (
              <TiltCard 
                key={index} 
                delay={index * 0.1}
                className={`${service.colSpan} ${service.rowSpan}`}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 ${service.bgPattern} opacity-50 z-0`} />
                
                {/* Content translated aggressively forward in 3D space */}
                <div 
                  className={`relative z-10 h-full flex flex-col justify-between ${isHero ? 'p-6 md:p-12' : 'p-6 md:p-8'}`}
                  style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
                >
                  <div className={`
                    rounded-2xl flex items-center justify-center border transition-all duration-700 shadow-xl
                    ${isHero ? 'w-24 h-24 bg-white/5 border-white/10 mb-8' : 'w-16 h-16 bg-white/5 border-white/10 mb-6'}
                    group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
                  `}>
                    <Icon className={`${isHero ? 'w-12 h-12' : 'w-8 h-8'} text-white/70 group-hover:text-white transition-colors duration-500`} />
                  </div>
                  
                  <div style={{ transform: "translateZ(40px)" }}>
                    <h4 className={`${isHero ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl font-bold'} font-display font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all`}>
                      {service.title}
                    </h4>
                    <p className={`text-white/60 leading-relaxed ${isHero ? 'text-lg max-w-md' : 'text-sm'}`}>
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Subtle Interactive Element */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0" style={{ transform: "translateZ(20px)" }}>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
