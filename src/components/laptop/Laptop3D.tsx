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

  // Lid rotation: closed = 180deg (flat against base), open = 90deg (upright)
  const lidRotateX = isOpen ? 90 : 179.5; // Slightly off 180 to avoid clipping

  return (
    <div className="w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden perspective-[2000px] relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      {/* The Laptop Assembly */}
      <motion.div 
        className="relative w-[300px] h-[220px] sm:w-[500px] sm:h-[350px] md:w-[700px] md:h-[480px] lg:w-[900px] lg:h-[600px] transform-style-3d cursor-pointer"
        style={{ 
          rotateX,
          rotateZ,
        }}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        
        {/* ====================
            THE BASE (KEYBOARD)
            ==================== */}
        <div className="absolute inset-0 bg-[#1a1b1e] rounded-b-[2rem] border-b-8 border-r-4 border-l-4 border-[#0f1012] shadow-2xl transform-style-3d rounded-t-lg flex flex-col items-center p-4 sm:p-8">
           
           {/* Keyboard Area */}
           <div className="w-[90%] h-[55%] bg-[#121315] rounded-xl shadow-inner mt-[5%] p-2 grid grid-cols-12 gap-1 md:gap-2">
              {/* Fake Keycaps */}
              {Array.from({ length: 60 }).map((_, i) => {
                 // Make some keys wider (spacebar, shift)
                 const colSpan = i === 56 ? 'col-span-5' : i === 41 || i === 54 ? 'col-span-2' : 'col-span-1';
                 return (
                   <div key={i} className={`${colSpan} bg-[#1e1f23] rounded-md shadow-[0_2px_0_#111] border border-white/5 opacity-80`} />
                 )
              })}
           </div>

           {/* Trackpad */}
           <div className="w-[30%] h-[25%] bg-[#18191c] rounded-lg mt-auto mb-2 border border-black/40 shadow-inner" />

           {/* Thumb Groove */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-[#0a0b0c] rounded-t-full shadow-inner" />
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
           <div className="absolute inset-0 bg-[#1e1f23] rounded-t-[2rem] border-t-[6px] border-l-4 border-r-4 border-b-2 border-[#151619] transform-style-3d rotate-y-180 translate-z-[1px] flex items-center justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
               {/* Glowing Logo */}
               <div className="relative">
                 <Logo className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white opacity-80 transition-opacity duration-500" />
                 {/* Glow effect when on */}
                 <div className={`absolute inset-0 bg-white blur-xl transition-opacity duration-1000 ${isOpen ? 'opacity-30' : 'opacity-0'}`} />
               </div>
           </div>

           {/* FRONT OF LID (Screen Side) */}
           <div className="absolute inset-0 bg-black rounded-t-[2rem] overflow-hidden flex flex-col border-[6px] md:border-8 border-[#111] shadow-inner translate-z-[-1px]">
               
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
                          <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">We Digitlize</h1>
                          <p className="text-white/60 text-xs sm:text-sm md:text-lg font-medium tracking-wide">Digital Dominance Architecture</p>
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
                     <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-8 sm:mt-12">
                        <Link href="/" className="group bg-white/5 border border-white/10 hover:border-white/30 rounded-xl p-4 sm:p-6 transition-all backdrop-blur-md">
                           <Globe className="text-white mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8" />
                           <h3 className="text-white font-bold text-sm sm:text-lg mb-1">Visit Website</h3>
                           <p className="text-white/40 text-[10px] sm:text-xs">wedigitlize.com</p>
                        </Link>
                        
                        <a href="https://wa.me/447000000000?text=Hello%20We%20Digitlize!%20I%20want%20to%20build%20a%20project." target="_blank" rel="noreferrer" className="group bg-primary/10 border border-primary/30 hover:border-primary rounded-xl p-4 sm:p-6 transition-all backdrop-blur-md">
                           <MessageSquare className="text-primary mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8" />
                           <h3 className="text-white font-bold text-sm sm:text-lg mb-1">WhatsApp</h3>
                           <p className="text-white/40 text-[10px] sm:text-xs">Direct message</p>
                        </a>
                        
                        <a href="mailto:info@wedigitlize.com" className="group bg-white/5 border border-white/10 hover:border-white/30 rounded-xl p-4 sm:p-6 transition-all backdrop-blur-md">
                           <Mail className="text-white mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8" />
                           <h3 className="text-white font-bold text-sm sm:text-lg mb-1">Email Us</h3>
                           <p className="text-white/40 text-[10px] sm:text-xs">info@wedigitlize.com</p>
                        </a>
                        
                        <button className="group bg-white text-black hover:bg-gray-200 rounded-xl p-4 sm:p-6 transition-all flex flex-col items-start shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                           <Download className="text-black mb-3 sm:mb-4 w-6 h-6 sm:w-8 sm:h-8" />
                           <h3 className="font-bold text-sm sm:text-lg mb-1">Save Contact</h3>
                           <p className="text-black/60 text-[10px] sm:text-xs">Download .vcf</p>
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
