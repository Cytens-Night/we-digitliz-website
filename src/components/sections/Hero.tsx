"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { ArrowRight, BarChart3, Globe, ShieldCheck, Zap, Heart, MessageCircle, Share2, QrCode, Phone, Mail, Search, Smartphone } from "lucide-react";

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

// --- FLOATING SERVICE MOCKUPS COLLAGE ---
function ServiceMockupsCollage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D rotation of the entire scene
  const rx = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const ry = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });
  
  // Parallax translation for individual UI cards (creates massive depth)
  const tx1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-60, 60]), { stiffness: 100, damping: 30 });
  const ty1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-60, 60]), { stiffness: 100, damping: 30 });

  const tx2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50]), { stiffness: 100, damping: 30 });
  const ty2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [50, -50]), { stiffness: 100, damping: 30 });

  const tx3 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { stiffness: 100, damping: 30 });
  const ty3 = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), { stiffness: 100, damping: 30 });

  const tx4 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 30 });
  const ty4 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 30 });

  const tx5 = useSpring(useTransform(mouseX, [-0.5, 0.5], [60, -60]), { stiffness: 100, damping: 30 });
  const ty5 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-60, 60]), { stiffness: 100, damping: 30 });

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
      
      {/* Central Glows */}
      <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />

      <motion.div 
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-[1500px] h-[1000px] flex items-center justify-center"
      >
        
        {/* 1. Social Media Post (Top Left) */}
        <motion.div 
          style={{ x: tx1, y: ty1, translateZ: 150 }}
          className="hidden lg:flex absolute top-[10%] left-[5%] flex-col gap-2"
        >
          {/* Label */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-black/10 text-[10px] font-bold uppercase tracking-wider text-primary self-start ml-4 flex items-center gap-2">
            <Heart size={12} /> Social Media Marketing
          </div>
          {/* Post Card */}
          <div className="w-64 bg-white/80 backdrop-blur-2xl border border-black/10 rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col gap-3">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
                   <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                     <span className="font-bold text-[10px] text-primary">WD</span>
                   </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1d1d1f]">We Digitlize</div>
                  <div className="text-[9px] text-gray-500">Sponsored</div>
                </div>
             </div>
             <div className="w-full h-32 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-inner overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <Globe className="w-10 h-10 text-white/80 relative z-10" />
             </div>
             <div className="flex gap-4 text-[#1d1d1f]/60 px-1">
               <Heart className="w-4 h-4 hover:text-red-500 transition-colors cursor-pointer pointer-events-auto" />
               <MessageCircle className="w-4 h-4 hover:text-blue-500 transition-colors cursor-pointer pointer-events-auto" />
               <Share2 className="w-4 h-4 hover:text-green-500 transition-colors cursor-pointer pointer-events-auto" />
             </div>
             <div className="text-[10px] text-[#1d1d1f]/80 px-1">
               <span className="font-bold">We Digitlize</span> transforming brands online 🚀
             </div>
          </div>
        </motion.div>

        {/* 2. Digital Business Card (Top Right) */}
        <motion.div 
          style={{ x: tx2, y: ty2, translateZ: 250 }}
          className="hidden md:flex absolute top-[15%] right-[2%] flex-col items-end gap-2"
        >
          {/* Label */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-black/10 text-[10px] font-bold uppercase tracking-wider text-accent mr-4 flex items-center gap-2">
            <QrCode size={12} /> Digital Business Card
          </div>
          {/* Card */}
          <div className="w-72 h-44 bg-gradient-to-br from-[#1d1d1f] to-[#2c2c30] rounded-[2rem] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform pointer-events-auto cursor-pointer">
             {/* Glass shine */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
             
             <div className="relative z-10 flex justify-between items-start w-full">
               <div className="flex flex-col">
                 <span className="text-white font-display font-bold text-xl tracking-tight">John Doe</span>
                 <span className="text-white/60 text-[10px] uppercase tracking-widest mt-0.5">Marketing Director</span>
               </div>
               <div className="w-12 h-12 bg-white/5 rounded-xl backdrop-blur-sm flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                 <QrCode className="w-7 h-7 text-white" />
               </div>
             </div>
             
             <div className="relative z-10 flex gap-2 w-full">
               <div className="flex-1 bg-white/5 hover:bg-white/15 transition-colors rounded-xl py-2 flex items-center justify-center border border-white/10">
                 <Phone className="w-4 h-4 text-white"/>
               </div>
               <div className="flex-1 bg-white/5 hover:bg-white/15 transition-colors rounded-xl py-2 flex items-center justify-center border border-white/10">
                 <Mail className="w-4 h-4 text-white"/>
               </div>
               <div className="flex-1 bg-white/5 hover:bg-white/15 transition-colors rounded-xl py-2 flex items-center justify-center border border-white/10">
                 <Globe className="w-4 h-4 text-white"/>
               </div>
             </div>
          </div>
        </motion.div>

        {/* 3. SEO Graphic (Middle Left) */}
        <motion.div 
          style={{ x: tx3, y: ty3, translateZ: 200 }}
          className="hidden xl:flex absolute top-[50%] left-[2%] flex-col gap-2"
        >
          {/* Label */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-black/10 text-[10px] font-bold uppercase tracking-wider text-emerald-600 self-start ml-4 flex items-center gap-2">
            <Search size={12} /> Search Engine Optimization
          </div>
          {/* SEO Card */}
          <div className="w-64 bg-white/80 backdrop-blur-2xl border border-black/10 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
             <div className="w-full bg-[#f5f5f7] rounded-full h-9 flex items-center px-3 gap-2 border border-black/5 mb-5 shadow-inner">
               <Search className="w-3.5 h-3.5 text-gray-400" />
               <div className="text-xs text-[#1d1d1f] font-medium flex-1 whitespace-nowrap overflow-hidden border-r-2 border-primary pr-1 animate-pulse">
                 We Digitlize services
               </div>
             </div>
             
             <div className="flex justify-between items-end mb-4">
               <div>
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Search Rank</div>
                 <div className="bg-emerald-100 text-emerald-700 text-sm font-black px-3 py-1 rounded-lg border border-emerald-200 inline-block">
                   #1
                 </div>
               </div>
               <div className="text-right">
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Traffic</div>
                 <div className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                   +420% <BarChart3 size={12} />
                 </div>
               </div>
             </div>

             {/* Chart bars */}
             <div className="flex items-end gap-1.5 h-16 w-full">
               {[20, 30, 25, 45, 60, 75, 100].map((h, i) => (
                 <motion.div 
                   key={i} 
                   initial={{height:0}} 
                   animate={{height:`${h}%`}} 
                   transition={{duration: 1, delay: i*0.1}} 
                   className={`w-full rounded-t-sm ${i === 6 ? 'bg-gradient-to-t from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gray-200'}`} 
                 />
               ))}
             </div>
          </div>
        </motion.div>

        {/* 4. Laptop Chrome Page (Bottom Left) */}
        <motion.div 
          style={{ x: tx4, y: ty4, translateZ: 300 }}
          className="hidden md:flex absolute bottom-[10%] left-[15%] lg:left-[20%] flex-col gap-2"
        >
          {/* Label */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-black/10 text-[10px] font-bold uppercase tracking-wider text-blue-600 self-start ml-4 flex items-center gap-2">
            <Globe size={12} /> Web Development
          </div>
          {/* Browser Window */}
          <div className="w-80 md:w-96 bg-white/90 backdrop-blur-2xl border border-black/10 rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.2)] overflow-hidden">
             {/* Toolbar */}
             <div className="bg-[#f5f5f7] h-9 flex items-center px-3 border-b border-black/5 gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto w-2/3 h-6 bg-white rounded-md border border-black/5 flex items-center justify-center text-[10px] text-[#1d1d1f]/60 font-medium shadow-sm">
                  wedigitlize.com
                </div>
                <div className="w-8" /> {/* Spacer */}
             </div>
             {/* Page Content */}
             <div className="h-48 bg-white p-4 flex flex-col gap-3 relative overflow-hidden">
                {/* Mock Hero */}
                <div className="w-full h-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 flex flex-col items-center justify-center gap-2">
                  <div className="w-1/2 h-3 bg-blue-600/20 rounded-full" />
                  <div className="w-1/3 h-2 bg-blue-600/10 rounded-full" />
                </div>
                {/* Mock Grid */}
                <div className="flex gap-3">
                  <div className="flex-1 h-16 bg-gray-50 rounded-lg border border-gray-100" />
                  <div className="flex-1 h-16 bg-gray-50 rounded-lg border border-gray-100" />
                  <div className="flex-1 h-16 bg-gray-50 rounded-lg border border-gray-100" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* 5. Mobile Phone App (Bottom Right) */}
        <motion.div 
          style={{ x: tx5, y: ty5, translateZ: 350 }}
          className="hidden lg:flex absolute bottom-[5%] right-[10%] flex-col items-end gap-2"
        >
          {/* Label */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-black/10 text-[10px] font-bold uppercase tracking-wider text-purple-600 mr-4 flex items-center gap-2">
            <Smartphone size={12} /> App Development
          </div>
          {/* Phone Body */}
          <div className="w-56 h-96 bg-[#1d1d1f] rounded-[2.5rem] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-gray-800 relative">
             {/* Screen */}
             <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative border border-white/10">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1d1d1f] rounded-b-2xl z-20 flex justify-center items-center">
                  <div className="w-2 h-2 rounded-full bg-black/50 border border-white/10 ml-8" />
                </div>
                
                {/* App UI */}
                <div className="pt-10 px-4 pb-4 h-full flex flex-col gap-4 bg-gray-50">
                   {/* App Header */}
                   <div className="flex justify-between items-center px-1">
                     <div className="w-8 h-8 rounded-full bg-gray-200" />
                     <div className="w-6 h-6 rounded-md bg-gray-200" />
                   </div>
                   
                   {/* App Hero Card */}
                   <div className="w-full h-28 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg p-4 text-white flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4" />
                     <div className="w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                       <Zap size={14} className="text-white" />
                     </div>
                     <div>
                       <div className="w-2/3 h-2.5 bg-white/80 rounded-full mb-1.5" />
                       <div className="w-1/3 h-2 bg-white/40 rounded-full" />
                     </div>
                   </div>
                   
                   {/* App Quick Actions */}
                   <div className="flex gap-3 justify-between">
                     <div className="flex-1 aspect-square rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors cursor-pointer pointer-events-auto">
                       <Smartphone className="w-5 h-5 text-purple-500" />
                       <div className="w-6 h-1 bg-gray-200 rounded-full mt-1" />
                     </div>
                     <div className="flex-1 aspect-square rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors cursor-pointer pointer-events-auto">
                       <Globe className="w-5 h-5 text-indigo-500" />
                       <div className="w-6 h-1 bg-gray-200 rounded-full mt-1" />
                     </div>
                     <div className="flex-1 aspect-square rounded-2xl bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors cursor-pointer pointer-events-auto">
                       <BarChart3 className="w-5 h-5 text-pink-500" />
                       <div className="w-6 h-1 bg-gray-200 rounded-full mt-1" />
                     </div>
                   </div>
                   
                   {/* App List */}
                   <div className="w-full flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 p-3">
                     <div className="w-full h-8 bg-gray-50 rounded-lg" />
                     <div className="w-full h-8 bg-gray-50 rounded-lg" />
                     <div className="w-full h-8 bg-gray-50 rounded-lg" />
                   </div>
                </div>
             </div>
          </div>
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
    transition: { delay: custom * 0.1 + 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
  })
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#f5f5f7]">
      
      {/* 3D Floating UI Parallax Environment */}
      <ServiceMockupsCollage />

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
        <div className="text-[2.75rem] leading-[1.05] md:text-7xl lg:text-[5.5rem] font-display font-bold text-[#1d1d1f] mb-8 max-w-5xl flex flex-col items-center tracking-tight md:tracking-normal">
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
