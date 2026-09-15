"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Globe, Mail, MessageSquare, Download, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Laptop3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  
  // Mouse tracking for parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
      smoothX.set(x);
      smoothY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [smoothX, smoothY]);

  // When opening, trigger boot sequence
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsBooted(true), 1500); // 1.5s boot time
      return () => clearTimeout(timer);
    } else {
      setIsBooted(false);
    }
  }, [isOpen]);

  // Rotations based on mouse + base orientation
  // Base orientation: laptop sits flat-ish, we look down at it.
  const rotateX = useTransform(smoothY, [-1, 1], [65, 55]);
  const rotateZ = useTransform(smoothX, [-1, 1], [-10, 10]);

  // Lid rotation: closed = -179.5deg (folded over base), open = -90deg (upright)
  const lidRotateX = isOpen ? -90 : -179.5;

  return (
    <div className="w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden perspective-[2000px] relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      {/* The Laptop Assembly */}
      <motion.div 
        className="relative w-[300px] h-[188px] sm:w-[480px] sm:h-[300px] lg:w-[720px] lg:h-[450px] transform-style-3d cursor-pointer"
        animate={{ y: isOpen ? 60 : 20 }}
        transition={{ type: "spring", stiffness: 40, damping: 15 }}
        style={{ 
          rotateX,
          rotateZ,
        }}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        
        {/* ====================
            THE BASE (KEYBOARD)
            ==================== */}
        <div className="absolute inset-0 bg-[#151515] rounded-b-[2rem] border-b-[10px] border-r-[4px] border-l-[4px] border-[#0a0a0a] shadow-[0_30px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] transform-style-3d rounded-t-lg flex flex-col items-center p-3 sm:p-6">
           
           {/* Keyboard Area */}
           <div className="w-[90%] h-[55%] bg-[#0f0f10] rounded-xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] mt-[4%] p-1.5 sm:p-2.5 grid grid-cols-12 gap-0.5 sm:gap-1.5 border border-white/5">
              {/* Fake Keycaps */}
              {Array.from({ length: 60 }).map((_, i) => {
                 const colSpan = i === 56 ? 'col-span-5' : i === 41 || i === 54 ? 'col-span-2' : 'col-span-1';
                 return (
                   <div key={i} className={`${colSpan} bg-[#1a1b1e] rounded-sm sm:rounded-md shadow-[0_2px_0_#0a0a0a,inset_0_1px_0_rgba(255,255,255,0.05)] border border-white/5`} />
                 )
              })}
           </div>

           {/* Trackpad */}
           <div className="w-[35%] h-[28%] bg-[#121212] rounded-md sm:rounded-lg mt-auto mb-1 sm:mb-2 border border-white/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]" />

           {/* Thumb Groove */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-2 sm:h-3 bg-[#050505] rounded-t-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)]" />
        </div>

        {/* ====================
            THE LID (SCREEN)
            ==================== */}
        <motion.div
          className="absolute bottom-full left-0 w-full h-full transform-style-3d origin-bottom"
          initial={false}
          animate={{ rotateX: lidRotateX }}
          transition={{ type: "spring", stiffness: 40, damping: 15, mass: 1.5 }}
        >
           {/* BACK OF LID (Logo Side) */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#1a1b1e] to-[#0f1012] rounded-t-[2rem] border-t-[6px] border-l-4 border-r-4 border-b-2 border-[#151619] transform-style-3d rotate-y-180 translate-z-[2px] flex items-center justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] backface-hidden">
               {/* Glowing Logo */}
               <div className="relative rotate-180">
                 <Logo className="w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-white opacity-80 transition-opacity duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                 {/* Glow effect when on */}
                 <div className={`absolute inset-0 bg-white blur-xl transition-opacity duration-1000 ${isOpen ? 'opacity-40' : 'opacity-0'}`} />
               </div>
           </div>

           {/* FRONT OF LID (Screen Side) */}
           <div className="absolute inset-0 bg-black rounded-t-[2rem] overflow-hidden flex flex-col border-[6px] md:border-8 border-[#111] shadow-inner translate-z-[2px] backface-hidden">
               
               {/* The Bezel (Webcam / Logo) */}
               <div className="h-6 sm:h-8 w-full bg-[#111] flex items-center justify-center border-b border-white/5 relative z-20">
                  <Logo className="w-3 h-3 sm:w-4 sm:h-4 text-white/50" />
                  <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 1s delay-1s' }} />
               </div>

               {/* The Display (Glass Screen) */}
               <div className="flex-1 relative bg-[#0a0a0a] overflow-hidden flex flex-col">
                  {/* Screen Glare */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-50" />
                  
                  {/* Boot Sequence */}
                  <AnimatePresence>
                    {isOpen && !isBooted && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black z-40"
                      >
                         <Logo className="w-12 h-12 text-white mb-8 animate-pulse" />
                         <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.4, ease: "easeInOut" }}
                              className="h-full bg-white rounded-full"
                            />
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* UI CONTENT - DIGITAL BUSINESS CARD */}
                  <div className={`flex-1 flex flex-col p-4 sm:p-8 md:p-12 transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
                     
                     {/* UI Header */}
                     <div className="flex justify-between items-start mb-auto">
                        <div>
                          <h1 className="text-xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-1 sm:mb-2 tracking-tight drop-shadow-md">We Digitlize</h1>
                          <p className="text-white/70 text-[10px] sm:text-sm lg:text-base font-medium tracking-wide">Digital Dominance Architecture</p>
                        </div>
                        <div className="flex gap-2">
                           <a href="https://instagram.com/wedigitlize" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                              <FaInstagram size={14} />
                           </a>
                           <a href="https://x.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                              <FaXTwitter size={14} />
                           </a>
                           <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                              <FaLinkedin size={14} />
                           </a>
                        </div>
                     </div>

                     {/* Action Grid */}
                     <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-6 sm:mt-10">
                        <Link href="/" className="group bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded-xl p-3 sm:p-5 transition-all backdrop-blur-md shadow-lg">
                           <Globe className="text-white mb-2 sm:mb-4 w-5 h-5 sm:w-7 sm:h-7" />
                           <h3 className="text-white font-bold text-xs sm:text-base mb-1">Visit Website</h3>
                           <p className="text-white/40 text-[9px] sm:text-[11px]">wedigitlize.com</p>
                        </Link>
                        
                        <a href="https://wa.me/447000000000?text=Hello%20We%20Digitlize!%20I%20want%20to%20build%20a%20project." target="_blank" rel="noreferrer" className="group bg-primary/10 border border-primary/30 hover:border-primary hover:bg-primary/20 rounded-xl p-3 sm:p-5 transition-all backdrop-blur-md shadow-lg">
                           <MessageSquare className="text-primary mb-2 sm:mb-4 w-5 h-5 sm:w-7 sm:h-7" />
                           <h3 className="text-white font-bold text-xs sm:text-base mb-1">WhatsApp</h3>
                           <p className="text-white/40 text-[9px] sm:text-[11px]">Direct message</p>
                        </a>
                        
                        <a href="mailto:info@wedigitlize.com" className="group bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded-xl p-3 sm:p-5 transition-all backdrop-blur-md shadow-lg">
                           <Mail className="text-white mb-2 sm:mb-4 w-5 h-5 sm:w-7 sm:h-7" />
                           <h3 className="text-white font-bold text-xs sm:text-base mb-1">Email Us</h3>
                           <p className="text-white/40 text-[9px] sm:text-[11px]">info@wedigitlize.com</p>
                        </a>
                        
                        <button className="group bg-white text-black hover:bg-gray-200 rounded-xl p-3 sm:p-5 transition-all flex flex-col items-start shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                           <Download className="text-black mb-2 sm:mb-4 w-5 h-5 sm:w-7 sm:h-7" />
                           <h3 className="font-bold text-xs sm:text-base mb-1">Save Contact</h3>
                           <p className="text-black/60 text-[9px] sm:text-[11px]">Download .vcf</p>
                        </button>
                     </div>

                  </div>
               </div>
           </div>
        </motion.div>

      </motion.div>

      {/* Global Close Button (if open) */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setIsOpen(false)}
            className="absolute bottom-8 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-colors z-50 shadow-2xl"
          >
            Close Laptop
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Helper text when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 text-white/40 text-sm tracking-widest uppercase font-bold animate-pulse"
          >
            Click to Open
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
