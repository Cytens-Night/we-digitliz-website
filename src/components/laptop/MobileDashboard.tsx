import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, MessageSquare, Download, QrCode, ArrowRight, Smartphone, ExternalLink, ChevronRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

// Mock Portfolio Data
const portfolio = [
  {
    id: 1,
    title: "Shakur Fragrances",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    link: "https://shakurfragrances.co.uk"
  },
  {
    id: 2,
    title: "Cytens Night",
    category: "Brand Architecture",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    link: "https://wedigitlize.com/works"
  },
  {
    id: 3,
    title: "Furqan Sweets",
    category: "Local Business System",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=600&auto=format&fit=crop",
    link: "https://furqansweets.co.uk"
  }
];

interface MobileDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDrawer: (type: 'phone' | 'email') => void;
  onSaveContact: () => void;
  onInstall: () => void;
}

export default function MobileDashboard({ isOpen, onClose, onOpenDrawer, onSaveContact, onInstall }: MobileDashboardProps) {
  const [showQR, setShowQR] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
          className="fixed bottom-0 left-0 w-full h-[70vh] md:h-[100vh] md:w-[400px] md:right-0 md:left-auto bg-[#0a0a0c]/90 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/10 rounded-t-3xl md:rounded-none z-[100] shadow-[0_-30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
        >
          {/* Draggable Handle (Mobile only) */}
          <div className="w-full flex justify-center pt-4 pb-2 md:hidden cursor-pointer" onClick={onClose}>
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 no-scrollbar">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-white tracking-tight">We Digitlize</h2>
                <p className="text-primary text-sm font-medium">Digital Dominance Architecture</p>
              </div>
              <button 
                onClick={() => setShowQR(!showQR)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md"
              >
                <QrCode size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showQR ? (
                <motion.div 
                  key="qr"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-black border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center mb-8"
                >
                  <h3 className="text-xl font-bold text-white mb-2">Scan to Connect</h3>
                  <p className="text-white/50 text-sm text-center mb-6">Share this card instantly.</p>
                  <div className="p-4 bg-white rounded-2xl">
                    <QRCodeSVG 
                      value="https://wedigitlize.com/card" 
                      size={200} 
                      level="H"
                      imageSettings={{ src: "/favicon.svg", excavate: true, height: 40, width: 40 }}
                    />
                  </div>
                  <button onClick={() => setShowQR(false)} className="mt-8 text-white/50 hover:text-white">
                    Close QR Code
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  
                  {/* Quick Actions Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <button onClick={() => onOpenDrawer('phone')} className="flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all">
                      <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <MessageSquare size={20} />
                      </div>
                      <span className="text-white font-medium text-sm">WhatsApp</span>
                    </button>
                    
                    <button onClick={() => onOpenDrawer('email')} className="flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all">
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Mail size={20} />
                      </div>
                      <span className="text-white font-medium text-sm">Email Us</span>
                    </button>
                    
                    <button onClick={onSaveContact} className="flex flex-col items-center justify-center gap-3 bg-white hover:bg-gray-200 rounded-2xl p-4 transition-all">
                      <div className="w-12 h-12 rounded-full bg-black/10 text-black flex items-center justify-center">
                        <Download size={20} />
                      </div>
                      <span className="text-black font-bold text-sm">Save Contact</span>
                    </button>
                    
                    <Link href="/" className="flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all">
                      <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center">
                        <Globe size={20} />
                      </div>
                      <span className="text-white font-medium text-sm">Website</span>
                    </Link>
                  </div>

                  {/* PWA Install Banner */}
                  <div onClick={onInstall} className="w-full bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex items-center justify-between cursor-pointer hover:bg-primary/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-black">
                        <Smartphone size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Install App</h4>
                        <p className="text-white/60 text-xs">Add to Home Screen</p>
                      </div>
                    </div>
                    <ChevronRight className="text-primary" />
                  </div>

                  {/* Portfolio Section */}
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-white font-display font-bold text-lg flex items-center gap-2">
                      <Briefcase size={18} className="text-primary" /> Past Dominance
                    </h3>
                    <Link href="/works" className="text-primary text-xs hover:underline">View All</Link>
                  </div>
                  
                  {/* Horizontal Scroll Carousel */}
                  <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
                    {portfolio.map((item) => (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noreferrer"
                        key={item.id} 
                        className="snap-center shrink-0 w-[240px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/50 transition-colors"
                      >
                        <div className="h-[140px] overflow-hidden relative">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <ExternalLink size={14} />
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                          <p className="text-white/50 text-xs">{item.category}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
