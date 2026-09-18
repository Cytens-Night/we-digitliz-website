"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Globe, Phone, UserPlus, Folder, LayoutGrid, Linkedin, MessageCircle, ArrowUpRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { FiInstagram } from "react-icons/fi";

export default function CardPage() {
  const [toast, setToast] = useState<string | null>(null);

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Digitliz;We;;;
FN:We Digitliz
ORG:We Digitliz
TITLE:Premium Digital Agency
TEL;TYPE=WORK,VOICE:+44 123 456 7890
EMAIL;TYPE=PREF,INTERNET:hello@wedigitliz.com
URL:https://wedigitliz.com
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "we-digitliz.vcf";
    a.click();
    URL.revokeObjectURL(url);
    
    setToast("Contact Saved!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="min-h-[100dvh] w-full bg-[#0a0a0a] flex items-center justify-center relative overflow-x-hidden selection:bg-primary/30 selection:text-white">
      
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
            <span className="font-display font-bold tracking-widest text-2xl text-white uppercase">We Digitliz</span>
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

        {/* Main Card Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 pt-16 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
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
            <a href="tel:+441234567890" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={12} className="text-[#007AFF]" />
              +44 123 456 7890
            </a>
            <div className="w-px h-3 bg-white/20" />
            <a href="https://wedigitliz.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Globe size={12} className="text-[#007AFF]" />
              wedigitliz.com
            </a>
          </div>

          {/* Primary Action Button */}
          <button 
            onClick={handleSaveContact}
            className="w-full py-4 rounded-full bg-gradient-to-r from-[#007AFF] to-[#0056b3] text-white font-bold tracking-widest text-xs flex items-center justify-center gap-3 uppercase shadow-[0_0_30px_rgba(0,122,255,0.3)] hover:shadow-[0_0_40px_rgba(0,122,255,0.5)] transition-all active:scale-95 mb-4 group cursor-pointer"
          >
            <UserPlus size={16} className="group-hover:scale-110 transition-transform" />
            Save Contact
          </button>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <a 
              href="mailto:hello@wedigitliz.com"
              className="py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-widest text-[10px] flex items-center justify-center gap-2 uppercase transition-all active:scale-95"
            >
              <Mail size={14} className="text-white/70" />
              Email
            </a>
            <a 
              href="https://wedigitliz.com"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-widest text-[10px] flex items-center justify-center gap-2 uppercase transition-all active:scale-95"
            >
              <Globe size={14} className="text-white/70" />
              Website
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
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
        </motion.div>

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
            <Linkedin size={16} />
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
