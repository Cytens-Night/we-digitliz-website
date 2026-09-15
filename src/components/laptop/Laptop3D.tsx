"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Globe, Mail, MessageSquare, Download, QrCode, ArrowLeft, Briefcase, ExternalLink, Smartphone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import ActionDrawer, { DrawerType } from "./ActionDrawer";
import ToastContainer from "@/components/ui/ToastContainer";

export default function Laptop3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Stage 1: Laptop opens (0% to 30% scroll)
  const lidRotateX = useTransform(scrollYProgress, [0, 0.3], [-179.5, -90]);
  
  // Stage 2: Laptop rotates to face camera perfectly flat (30% to 50% scroll)
  // Originally it sits at rotateX: 60deg. We rotate base to 90deg, which means the lid (at -90deg) becomes 0deg relative to camera!
  const baseRotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], [65, 65, 90]);
  
  // Stage 3: Laptop scales up massively to fill screen (50% to 80% scroll)
  // We scale it so the screen covers the viewport. 
  // We also translate Y to keep the screen centered as it scales.
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.8, 0.8, 6]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 0.8], [20, 20, 150]); // Push down so screen centers

  // Stage 4: UI fades in inside the screen (80% to 100% scroll)
  const uiOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.5]); // Logo glow turns on as lid opens

  // States for interactive UI
  const [isScreenFlipped, setIsScreenFlipped] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [drawerType, setDrawerType] = useState<DrawerType>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
      } catch (err) {
        console.error("Install prompt failed:", err);
      }
      setDeferredPrompt(null);
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        showToast("To install on iOS: tap Share and select 'Add to Home Screen'.");
      } else {
        showToast("Tap your browser's menu and select 'Install App'.");
      }
    }
  };

  const phone = "+447000000000";
  const email = "info@wedigitlize.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard!");
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:We Digitlize\nORG:We Digitlize\nTEL:${phone}\nEMAIL:${email}\nURL:https://wedigitlize.com\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedigitlize.vcf';
    a.click();
    window.URL.revokeObjectURL(url);
    showToast("Contact downloaded!");
  };

  return (
    // The tall container that allows scrolling
    <div ref={containerRef} className="w-full h-[400vh] bg-[#020202]">
      
      {/* The Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden perspective-[1500px]">
        
        {/* Helper text indicating to scroll */}
        <motion.div 
           className="absolute bottom-12 text-white/40 text-sm tracking-widest uppercase font-bold z-0 flex flex-col items-center gap-2"
           style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
           Scroll Down
           <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

        {/* ====================
            THE LAPTOP ASSEMBLY
            ==================== */}
        <motion.div 
          className="relative w-[340px] h-[220px] sm:w-[500px] sm:h-[320px] lg:w-[800px] lg:h-[500px] transform-style-3d z-10"
          style={{ 
            rotateX: baseRotateX,
            scale,
            y: translateY
          }}
        >
          {/* THE BASE (KEYBOARD) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1d21] to-[#121315] rounded-b-[2.5rem] border-b-[8px] border-r-[3px] border-l-[3px] border-[#0a0a0c] shadow-[0_40px_100px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] transform-style-3d rounded-t-xl flex flex-col items-center p-4">
             {/* Realistic Keyboard Well */}
             <div className="w-[92%] h-[58%] bg-[#0a0a0c] rounded-lg shadow-[inset_0_5px_15px_rgba(0,0,0,1)] mt-[3%] p-1 sm:p-2 grid grid-cols-12 gap-0.5 sm:gap-1">
                {Array.from({ length: 65 }).map((_, i) => {
                   const colSpan = i === 60 ? 'col-span-5' : i === 42 || i === 54 ? 'col-span-2' : 'col-span-1';
                   return (
                     <div key={i} className={`${colSpan} bg-[#1a1b1e] rounded-sm sm:rounded-md shadow-[0_2px_0_#050505,inset_0_1px_0_rgba(255,255,255,0.05)] border border-white/5`} />
                   )
                })}
             </div>
             {/* Huge Glass Trackpad */}
             <div className="w-[40%] h-[32%] bg-gradient-to-b from-[#18191c] to-[#121315] rounded-lg sm:rounded-xl mt-auto mb-2 sm:mb-4 border border-white/5 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.05)]" />
             {/* Thumb Groove */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-2 sm:h-3 bg-[#050505] rounded-t-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)]" />
          </div>

          {/* THE LID (SCREEN) */}
          <motion.div
            className="absolute bottom-full left-0 w-full h-full transform-style-3d origin-bottom"
            style={{ rotateX: lidRotateX }}
          >
             {/* BACK OF LID (Logo Side) */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#151619] to-[#1a1b1e] rounded-t-[2.5rem] border-t-[4px] border-l-2 border-r-2 border-b-2 border-[#2a2b30] transform-style-3d rotate-y-180 translate-z-[2px] flex items-center justify-center shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] backface-hidden">
                 <div className="relative rotate-180">
                   <Logo className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                   {/* Glow appears when lid opens */}
                   <motion.div 
                     style={{ opacity: glowOpacity }}
                     className="absolute inset-0 bg-white blur-2xl" 
                   />
                 </div>
             </div>

             {/* FRONT OF LID (Screen Side) */}
             <div className="absolute inset-0 bg-black rounded-t-[2.5rem] overflow-hidden flex flex-col border-[4px] sm:border-[8px] border-[#0a0a0a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] translate-z-[2px] backface-hidden">
                 
                 {/* Premium Glass Display Area */}
                 <div className="flex-1 relative bg-[#050505] overflow-hidden flex flex-col perspective-[1000px]">
                    {/* Screen Glare reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-50" />
                    
                    {/* THE "OS" UI CONTENT */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full transform-style-3d"
                      animate={{ rotateY: isScreenFlipped ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 60, damping: 15 }}
                      style={{ opacity: uiOpacity }}
                    >
                       {/* FRONT UI */}
                       <div className="absolute inset-0 w-full h-full flex flex-col backface-hidden overflow-hidden">
                          
                          {/* Top Status Bar (fake OS bar) */}
                          <div className="w-full h-6 bg-black/50 backdrop-blur-md flex items-center justify-between px-4 text-[6px] sm:text-[10px] text-white/50 border-b border-white/5">
                             <div className="flex gap-2 items-center">
                               <Logo className="w-3 h-3 text-white" />
                               <span>We Digitlize OS</span>
                             </div>
                             <div className="flex gap-4">
                               <span>100% Battery</span>
                               <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             </div>
                          </div>

                          {/* Desktop Background / Content Wrapper */}
                          <div className="flex-1 w-full bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15)_0%,transparent_50%)] p-2 sm:p-4 overflow-y-auto no-scrollbar relative flex flex-col">
                             
                             {/* Floating Dashboard Container */}
                             <div className="w-full max-w-[800px] mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 flex-1 flex flex-col shadow-2xl">
                                
                                {/* Header */}
                                <div className="flex justify-between items-start mb-6 sm:mb-8">
                                   <div>
                                     <h1 className="text-sm sm:text-2xl lg:text-4xl font-display font-bold text-white mb-1 tracking-tight">We Digitlize</h1>
                                     <p className="text-primary text-[8px] sm:text-sm font-medium">Digital Dominance Architecture</p>
                                   </div>
                                   <div className="flex gap-1 sm:gap-2">
                                      <button onClick={() => setIsScreenFlipped(true)} className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="QR Code">
                                         <QrCode className="w-3 h-3 sm:w-5 sm:h-5" />
                                      </button>
                                      <button onClick={handleInstallClick} className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="Install App">
                                         <Download className="w-3 h-3 sm:w-5 sm:h-5" />
                                      </button>
                                   </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
                                   <button onClick={() => setDrawerType('phone')} className="flex flex-col items-center justify-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-2 sm:p-4 transition-colors">
                                      <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                         <MessageSquare className="w-3 h-3 sm:w-5 sm:h-5" />
                                      </div>
                                      <span className="text-white font-medium text-[6px] sm:text-xs">WhatsApp</span>
                                   </button>
                                   <button onClick={() => setDrawerType('email')} className="flex flex-col items-center justify-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-2 sm:p-4 transition-colors">
                                      <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                         <Mail className="w-3 h-3 sm:w-5 sm:h-5" />
                                      </div>
                                      <span className="text-white font-medium text-[6px] sm:text-xs">Email</span>
                                   </button>
                                   <button onClick={handleSaveContact} className="flex flex-col items-center justify-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-2 sm:p-4 transition-colors">
                                      <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-white/20 text-white flex items-center justify-center">
                                         <Download className="w-3 h-3 sm:w-5 sm:h-5" />
                                      </div>
                                      <span className="text-white font-medium text-[6px] sm:text-xs">Save VCF</span>
                                   </button>
                                   <Link href="/" className="flex flex-col items-center justify-center gap-1 sm:gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-2 sm:p-4 transition-colors">
                                      <div className="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-white/20 text-white flex items-center justify-center">
                                         <Globe className="w-3 h-3 sm:w-5 sm:h-5" />
                                      </div>
                                      <span className="text-white font-medium text-[6px] sm:text-xs">Website</span>
                                   </Link>
                                </div>

                                {/* Portfolio Section */}
                                <div className="mb-2 sm:mb-4 flex items-center justify-between">
                                  <h3 className="text-white font-display font-bold text-[10px] sm:text-lg flex items-center gap-2">
                                    <Briefcase className="text-primary w-3 h-3 sm:w-5 sm:h-5" /> Past Dominance
                                  </h3>
                                </div>
                                <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                                  {[
                                    { title: "Shakur Fragrances", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
                                    { title: "Cytens Night", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
                                    { title: "Furqan Sweets", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600&auto=format&fit=crop" }
                                  ].map((item, i) => (
                                    <div key={i} className="snap-center shrink-0 w-[120px] sm:w-[240px] bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-colors">
                                      <div className="h-[70px] sm:h-[140px] overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                      </div>
                                      <div className="p-2 sm:p-4">
                                        <h4 className="text-white font-bold text-[8px] sm:text-sm">{item.title}</h4>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                             </div>
                          </div>
                       </div>

                       {/* BACK FACE (QR Code) */}
                       <div className="absolute inset-0 w-full h-full flex flex-col bg-black backface-hidden rotate-y-180 items-center justify-center p-4 sm:p-8">
                          <button onClick={() => setIsScreenFlipped(false)} className="absolute top-4 left-4 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                             <ArrowLeft className="w-3 h-3 sm:w-5 sm:h-5" />
                          </button>
                          
                          <h2 className="text-lg sm:text-4xl font-display font-bold text-white mb-2">Scan to Connect</h2>
                          <p className="text-white/60 text-[10px] sm:text-sm mb-4 sm:mb-8 text-center max-w-[250px]">Share this digital card instantly.</p>
                          
                          <div className="p-2 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
                             <QRCodeSVG 
                                value="https://wedigitlize.com/card" 
                                size={120}
                                fgColor="#000000"
                                bgColor="#ffffff"
                                level="H"
                                imageSettings={{ src: "/favicon.svg", excavate: true, height: 24, width: 24 }}
                                style={{ width: '100%', height: 'auto', maxWidth: '200px' }}
                             />
                          </div>
                       </div>
                    </motion.div>
                 </div>
             </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Drawers and Modals (Rendered outside the 3D context for stability) */}
      <ActionDrawer 
        type={drawerType}
        onClose={() => setDrawerType(null)}
        phone={phone}
        email={email}
        onSaveContact={handleSaveContact}
        onCopyEmail={handleCopyEmail}
        showToast={showToast}
      />
      
      <ToastContainer message={toastMsg} />
    </div>
  );
}
