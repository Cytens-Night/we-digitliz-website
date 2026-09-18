"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Globe, Phone, UserPlus, Folder, LayoutGrid, MessageCircle, ArrowUpRight, QrCode, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { FiInstagram, FiLinkedin } from "react-icons/fi";

export default function CardPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // Simulate a quick loading sequence for effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:wedigitlize;;;;
FN:wedigitlize
ORG:wedigitlize
TITLE:Premium Digital Agency
NOTE:Keywords: Website Development, Web Design, Social Media Marketing, Content Creation, Logo Design, Brand Identity, SEO, Search Engine Optimization, App Development, SaaS, Automated Systems, Digital Transformation, Lead Generation, Software Engineering.
TEL;TYPE=WORK,VOICE:+447584296946
EMAIL;TYPE=PREF,INTERNET:info@wedigitlize.com
URL:https://wedigitlize.com
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedigitlize.vcf";
    a.click();
    URL.revokeObjectURL(url);
    
    setToast("Contact Saved!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="min-h-[100dvh] w-full bg-[#0a0a0a] flex items-center justify-center relative overflow-x-hidden selection:bg-primary/30 selection:text-white">
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#007AFF] blur-[50px] opacity-20 rounded-full" />
              <Logo className="w-16 h-16 text-white relative z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgMGg0MHYxSDB6TTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpIi8+PC9zdmc+')] bg-[size:30px_30px]" />
        
        {/* Glow Orbs */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-[#007AFF]/15 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-[#8b5cf6]/15 blur-[120px] rounded-full" 
        />
      </div>

      {/* Card Container (Mobile dimensions on desktop, full width on mobile) */}
      <div className="w-full max-w-[440px] min-h-[100dvh] sm:min-h-0 sm:h-auto sm:my-12 relative z-10 flex flex-col pt-12 pb-10 px-6 overflow-hidden">
        
        {/* Top Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-3 mb-8"
        >
          <div className="flex items-center gap-3">
            <Logo className="w-6 h-6 text-white" />
            <span className="font-display font-bold tracking-widest text-2xl text-white uppercase">wedigitlize</span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold">Premium Digital Agency</span>
        </motion.div>

        {/* Tech Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative mb-16 flex justify-center items-center"
        >
          <div className="w-3 h-3 rotate-45 border border-white/30 bg-[#0a0a0a] z-10 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#007AFF] rounded-full shadow-[0_0_10px_#007AFF]" />
          </div>
        </motion.div>

        {/* Main Card Content - 3D Perspective Container */}
        <div style={{ perspective: "1500px" }} className="w-full relative z-20">
          <motion.div 
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="transform-style-3d relative w-full"
          >
            {/* ================= FRONT FACE ================= */}
            <div className="backface-hidden relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 pt-16 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-10 w-full">
              
              {/* QR Code Flip Button (Top Right) */}
              <button 
                onClick={() => setIsFlipped(true)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors z-30 shadow-sm border border-white/10"
                aria-label="Show QR Code"
              >
                <QrCode size={18} />
              </button>

              {/* Overlapping Profile Picture/Logo */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#0a0a0a] border border-white/10 shadow-[0_0_40px_rgba(0,122,255,0.2)] flex items-center justify-center p-1 z-20">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#007AFF]/20 to-[#8b5cf6]/20 flex items-center justify-center overflow-hidden border border-white/5">
                  <Logo className="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </div>
              </div>

              {/* Titles */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-display font-bold text-white mb-2 tracking-wide uppercase">Digital Dominance</h1>
                <p className="text-xs text-white/50 tracking-widest font-bold uppercase">Engineering Ecosystems</p>
              </div>

              {/* Contact Text Row */}
              <div className="flex justify-center items-center gap-6 mb-8 text-xs font-mono text-white/70">
                <a href="tel:+447584296946" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} className="text-white/50" />
                  +44 7584 296946
                </a>
                <div className="w-px h-3 bg-white/20" />
                <a href="https://wedigitlize.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe size={12} className="text-[#007AFF]" />
                  wedigitlize.com
                </a>
              </div>

              {/* Primary Action Button */}
              <button 
                onClick={handleSaveContact}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#007AFF] to-[#0056b3] text-white font-bold tracking-widest text-xs flex items-center justify-center gap-3 uppercase shadow-[0_0_30px_rgba(0,122,255,0.3)] hover:shadow-[0_0_40px_rgba(0,122,255,0.5)] transition-all active:scale-95 mb-4 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <UserPlus size={16} className="group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Save Contact</span>
              </button>

              {/* Secondary Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <a 
                  href="mailto:info@wedigitlize.com"
                  className="py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-widest text-[10px] flex items-center justify-center gap-2 uppercase transition-all active:scale-95"
                >
                  <Mail size={14} className="text-white/70" />
                  Email
                </a>
                <a 
                  href="https://wedigitlize.com"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-widest text-[10px] flex items-center justify-center gap-2 uppercase transition-all active:scale-95"
                >
                  <Globe size={14} className="text-white/70" />
                  Website
                </a>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <Link 
                  href="/projects"
                  className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-colors h-28"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Folder size={24} className="text-white/80 group-hover:text-white transition-colors relative z-10 group-hover:scale-110 duration-300" />
                  <span className="text-[9px] font-bold tracking-widest text-white/60 group-hover:text-white uppercase relative z-10 text-center">
                    Explore<br/>Projects
                  </span>
                  <ArrowUpRight size={12} className="absolute top-2 right-2 text-white/20 group-hover:text-white/60" />
                </Link>

                <Link 
                  href="/#services"
                  className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 p-4 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-colors h-28"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <LayoutGrid size={24} className="text-white/80 group-hover:text-white transition-colors relative z-10 group-hover:scale-110 duration-300" />
                  <span className="text-[9px] font-bold tracking-widest text-white/60 group-hover:text-white uppercase relative z-10 text-center">
                    Our<br/>Services
                  </span>
                  <ArrowUpRight size={12} className="absolute top-2 right-2 text-white/20 group-hover:text-white/60" />
                </Link>
              </div>
            </div>

            {/* ================= BACK FACE (QR CODE) ================= */}
            <div 
              className="backface-hidden absolute inset-0 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-0 w-full h-full"
              style={{ transform: "rotateY(180deg)" }}
            >
              {/* Flip back button */}
              <button 
                onClick={() => setIsFlipped(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors border border-white/10"
                aria-label="Back to front"
              >
                <X size={18} />
              </button>
              
              <div className="flex flex-col items-center justify-center w-full mt-4">
                <h2 className="text-xl font-display font-bold text-white mb-2 uppercase tracking-widest">Share Card</h2>
                <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] mb-8 text-center max-w-[200px]">Scan to download contact details instantly.</p>
                
                {/* QR Code Container */}
                <div className="p-4 bg-white rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  <QRCodeSVG 
                    value="https://wedigitlize.com/card" 
                    size={180}
                    level="H"
                    includeMargin={true}
                    fgColor="#0a0a0a"
                    bgColor="#ffffff"
                    imageSettings={{
                      src: "/favicon.svg", // This uses the existing solid logo
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
                
                <button 
                  onClick={() => setIsFlipped(false)}
                  className="mt-10 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors border border-white/10"
                >
                  Return
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Socials */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center gap-6 mt-10"
        >
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110">
            <FiInstagram size={16} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110">
            <FiLinkedin size={16} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110">
            <MessageCircle size={16} />
          </a>
        </motion.div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-[#007AFF] rounded-full" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
