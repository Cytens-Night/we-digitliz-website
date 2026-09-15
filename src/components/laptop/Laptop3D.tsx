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
  const baseRotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], [65, 65, 90]);
  
  // Stage 3: Laptop flies up and fades out (50% to 65% scroll)
  const laptopScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const laptopTranslateY = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.65], [20, 20, 0, -800]);
  const laptopOpacity = useTransform(scrollYProgress, [0.5, 0.65], [1, 0]);

  // Stage 4: Business Card UI slides up and fades in (60% to 80% scroll)
  const uiTranslateY = useTransform(scrollYProgress, [0.6, 0.8], [400, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 0.5]); 

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
            scale: laptopScale,
            y: laptopTranslateY,
            opacity: laptopOpacity
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
             <div className="absolute inset-0 bg-gradient-to-t from-[#151619] to-[#1a1b1e] rounded-t-[2.5rem] border-t-[4px] border-l-2 border-r-2 border-b-2 border-[#2a2b30] flex items-center justify-center shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden]">
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
             <div className="absolute inset-0 bg-black rounded-t-[2.5rem] overflow-hidden flex flex-col border-[4px] sm:border-[8px] border-[#0a0a0a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] [transform:translateZ(1px)] [backface-visibility:hidden]">
                 {/* Premium Glass Display Area */}
                 <div className="flex-1 relative bg-[#050505] overflow-hidden flex flex-col perspective-[1000px]">
                    {/* Screen Glare reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-50" />
                    {/* Fake Desktop Wallpaper */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
                 </div>
             </div>
          </motion.div>
        </motion.div>

        {/* ====================
            THE BUSINESS CARD UI
            ==================== */}
        <motion.div 
          className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          style={{ 
            opacity: uiOpacity,
            y: uiTranslateY
          }}
        >
          {/* This wrapper re-enables pointer events only when visible */}
          <div className="w-full h-[90vh] sm:h-[80vh] max-w-[500px] pointer-events-auto flex flex-col perspective-[1000px] mt-8 sm:mt-0">
             
             <motion.div 
               className="flex-1 w-full h-full [transform-style:preserve-3d] relative"
               animate={{ rotateY: isScreenFlipped ? 180 : 0 }}
               transition={{ type: "spring", stiffness: 60, damping: 15 }}
             >
                {/* FRONT FACE (Main UI) */}
                <div className="absolute inset-0 w-full h-full flex flex-col [backface-visibility:hidden] overflow-hidden [transform:translateZ(1px)] bg-[#050505]">
                   {/* Top Status Bar (fake OS bar) */}
                   <div className="w-full h-8 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 text-[10px] sm:text-xs text-white/50 border-b border-white/5 shrink-0">
                      <div className="flex gap-2 items-center">
                        <Logo className="w-3 h-3 text-white" />
                        <span>We Digitlize</span>
                      </div>
                      <div className="flex gap-4">
                        <span>100%</span>
                        <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                   </div>

                   {/* Desktop Background / Content Wrapper */}
                   <div className="flex-1 w-full bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15)_0%,transparent_50%)] p-4 sm:p-6 overflow-y-auto no-scrollbar relative flex flex-col">
                      
                      {/* Dashboard Content */}
                      <div className="w-full bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col shadow-2xl">
                         
                         {/* Header */}
                         <div className="flex justify-between items-start mb-8">
                            <div>
                              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1 tracking-tight">We Digitlize</h1>
                              <p className="text-primary text-xs sm:text-sm font-medium">Digital Dominance Architecture</p>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => setIsScreenFlipped(true)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="QR Code">
                                  <QrCode className="w-5 h-5" />
                               </button>
                               <button onClick={handleInstallClick} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="Install App">
                                  <Download className="w-5 h-5" />
                               </button>
                            </div>
                         </div>

                         {/* Quick Actions */}
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
                            <button onClick={() => setDrawerType('phone')} className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-colors">
                               <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                  <MessageSquare className="w-5 h-5" />
                               </div>
                               <span className="text-white font-medium text-xs">WhatsApp</span>
                            </button>
                            <button onClick={() => setDrawerType('email')} className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-colors">
                               <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                  <Mail className="w-5 h-5" />
                               </div>
                               <span className="text-white font-medium text-xs">Email</span>
                            </button>
                            <button onClick={handleSaveContact} className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-colors">
                               <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center">
                                  <Download className="w-5 h-5" />
                               </div>
                               <span className="text-white font-medium text-xs">Save VCF</span>
                            </button>
                            <Link href="/" className="flex flex-col items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-colors">
                               <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center">
                                  <Globe className="w-5 h-5" />
                               </div>
                               <span className="text-white font-medium text-xs">Website</span>
                            </Link>
                         </div>

                         {/* Portfolio Section */}
                         <div className="mb-4 flex items-center justify-between">
                           <h3 className="text-white font-display font-bold text-sm sm:text-base flex items-center gap-2">
                             <Briefcase className="text-primary w-4 h-4" /> Past Dominance
                           </h3>
                         </div>
                         <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                           {[
                             { title: "Shakur Fragrances", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" },
                             { title: "Cytens Night", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
                             { title: "Furqan Sweets", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600&auto=format&fit=crop" }
                           ].map((item, i) => (
                             <div key={i} className="snap-center shrink-0 w-[200px] sm:w-[240px] bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-colors">
                               <div className="h-[120px] sm:h-[140px] overflow-hidden relative">
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                 <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                               </div>
                               <div className="p-4">
                                 <h4 className="text-white font-bold text-xs sm:text-sm">{item.title}</h4>
                               </div>
                             </div>
                           ))}
                         </div>
                      </div>
                   </div>
                </div>

                {/* BACK FACE (QR Code) */}
                <div className="absolute inset-0 w-full h-full flex flex-col bg-black items-center justify-center p-8 [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden]">
                   <button onClick={() => setIsScreenFlipped(false)} className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
                      <ArrowLeft className="w-5 h-5" />
                   </button>
                   
                   <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">Scan to Connect</h2>
                   <p className="text-white/60 text-sm mb-8 text-center max-w-[250px]">Share this digital card instantly.</p>
                   
                   <div className="p-6 bg-white rounded-2xl shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
                      <QRCodeSVG 
                         value="https://wedigitlize.com/card" 
                         size={180}
                         fgColor="#000000"
                         bgColor="#ffffff"
                         level="H"
                         imageSettings={{ src: "/favicon.svg", excavate: true, height: 40, width: 40 }}
                         style={{ width: '100%', height: 'auto', maxWidth: '240px' }}
                      />
                   </div>
                </div>
             </motion.div>
          </div>
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
