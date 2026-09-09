"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight, BarChart3, Globe, ShieldCheck, Zap } from "lucide-react";

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

// --- FLOATING DASHBOARD 3D UI ---
function FloatingDashboard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D rotation of the entire scene
  const rx = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const ry = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });
  
  // Parallax translation for individual UI cards (creates massive depth)
  const tx1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), { stiffness: 100, damping: 30 });
  const ty1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-50, 50]), { stiffness: 100, damping: 30 });

  const tx2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, -40]), { stiffness: 100, damping: 30 });
  const ty2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), { stiffness: 100, damping: 30 });

  const tx3 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 30 });
  const ty3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none" style={{ perspective: "2000px" }}>
      
      {/* Central Emerald Glow */}
      <div className="absolute w-[800px] h-[800px] bg-black/5 rounded-full blur-[120px]" />

      <motion.div 
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[1400px] h-[900px] flex items-center justify-center"
      >
        {/* Card 1: Analytics / Traffic (Top Right - Pushed out) */}
        <motion.div 
          style={{ x: tx1, y: ty1, translateZ: 150 }}
          className="absolute top-[5%] md:top-[10%] right-[-10%] md:right-[2%] lg:right-[5%] w-64 md:w-80 bg-[#ffffff]/80 backdrop-blur-2xl border border-black/10 rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center text-[#1d1d1f] border border-black/20">
                <BarChart3 size={24} />
              </div>
              <div>
                <div className="text-[#1d1d1f] text-sm font-bold">Global Traffic</div>
                <div className="text-[#1d1d1f] text-xs font-mono mt-1">+124.5% Surge</div>
              </div>
            </div>
          </div>
          {/* Mock Chart Animation */}
          <div className="flex items-end gap-2 h-24 w-full">
            {[40, 70, 50, 100, 80, 60, 90].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2, ease: "easeInOut" }}
                className="flex-1 bg-[#1d1d1f] rounded-t-sm shadow-[0_0_20px_rgba(0,0,0,0.2)]"
              />
            ))}
          </div>
        </motion.div>

        {/* Card 2: Server Architecture (Bottom Left - Pushed out) */}
        <motion.div 
          style={{ x: tx2, y: ty2, translateZ: 250 }}
          className="absolute bottom-[5%] md:bottom-[15%] left-[-10%] md:left-[2%] lg:left-[5%] w-72 md:w-80 bg-[#ffffff]/80 backdrop-blur-2xl border border-black/10 rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        >
          <div className="flex justify-between items-center mb-6 border-b border-black/10 pb-4">
            <div className="text-[#1d1d1f] font-bold text-sm">System Architecture</div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_10px_#ff2d55]"></span>
              </span>
              <span className="text-[#3c3c43] text-[10px] uppercase tracking-widest font-bold">Live</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { icon: Globe, label: "Edge Routing", val: "99.99%", color: "text-[#1d1d1f]" },
              { icon: Zap, label: "Compute Cluster", val: "Optimized", color: "text-[#1d1d1f]" },
              { icon: ShieldCheck, label: "Security Layer", val: "Active", color: "text-[#1d1d1f]" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-[#f5f5f7]/80 rounded-xl p-3 border border-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center">
                    <item.icon size={14} className="text-[#3c3c43]" />
                  </div>
                  <span className="text-[#1d1d1f]/80 text-xs font-medium">{item.label}</span>
                </div>
                <span className={`${item.color} text-[10px] font-mono font-bold tracking-wider`}>{item.val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 3: Floating Status Pill (Top Left - Pushed out) */}
        <motion.div 
          style={{ x: tx3, y: ty3, translateZ: 100 }}
          className="absolute top-[20%] md:top-[25%] left-[-5%] md:left-[5%] lg:left-[15%] px-5 py-3 bg-[#ffffff]/90 backdrop-blur-xl border border-black/20 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-3"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#0066cc]" />
          <span className="text-[#1d1d1f] text-[10px] font-bold uppercase tracking-widest">Deployment Successful</span>
        </motion.div>

      </motion.div>

      {/* Extreme Radial Mask to protect the center text */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,245,247,0.85)_0%,rgba(245,245,247,0.4)_40%,transparent_70%)] pointer-events-none" />
    </div>
  );
}

// --- CINEMATIC TEXT REVEAL ---
const revealVariants = {
  hidden: { y: "120%", rotate: 5, opacity: 0 },
  visible: (custom: number) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { delay: custom * 0.1 + 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f7]">
      
      {/* 3D Floating UI Parallax Environment */}
      <FloatingDashboard />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center mt-24 pointer-events-none">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 px-5 py-2 rounded-full bg-[#ffffff]/80 backdrop-blur-xl text-[#1d1d1f] text-xs md:text-sm font-bold tracking-widest uppercase border border-black/20 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        >
          Next-Generation Digital Infrastructure
        </motion.div>
        
        {/* Cinematic Typography */}
        <div className="text-4xl md:text-7xl lg:text-[5.5rem] font-display font-bold text-[#1d1d1f] mb-8 leading-[1.1] max-w-5xl flex flex-col items-center tracking-tight md:tracking-normal">
          <div className="overflow-hidden py-2">
            <motion.div custom={0} initial="hidden" animate="visible" variants={revealVariants}>
              We <span className="text-[#1d1d1f] drop-shadow-[0_0_20px_rgba(0,0,0,0.2)]">Digitliz</span> Your World.
            </motion.div>
          </div>
          <div className="overflow-hidden py-2">
            <motion.div custom={1} initial="hidden" animate="visible" variants={revealVariants} className="text-[#1d1d1f]/90">
              Architecture for the Future.
            </motion.div>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#3c3c43] font-medium max-w-2xl mb-12 leading-relaxed"
        >
          We engineer bespoke digital ecosystems, automated systems, and breathtaking web experiences for brands that refuse to settle for average.
        </motion.p>

        {/* Actions (Pointer events enabled here) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
        >
          <MagneticButton
            href="#contact"
            className="px-10 py-5 rounded-full bg-[#1d1d1f] text-white hover:bg-black font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center text-sm md:text-base uppercase tracking-wider group shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          >
            Start Your Transformation
          </MagneticButton>
          
          <MagneticButton
            href="#services"
            className="px-10 py-5 rounded-full bg-white text-[#1d1d1f] font-bold hover:bg-white hover:border-black/30 transition-all flex items-center justify-center text-sm md:text-base uppercase tracking-wider border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
          >
            View Our Capabilities
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  );
}
