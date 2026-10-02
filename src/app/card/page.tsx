"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Globe, Phone, UserPlus, Folder, LayoutGrid, ArrowUpRight, QrCode, X, Download, Smartphone, Zap, Palette, Copy, Rss, Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Logo from '@/components/ui/Logo';
import EmailActionDrawer from '@/components/ui/EmailActionDrawer';
import Link from 'next/link';
import { FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";
import './card.css';

// ----------------------------------------------------------------------
// SPLASH SCREEN COMPONENT
// ----------------------------------------------------------------------
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const [readyToTap, setReadyToTap] = useState(false);

  useEffect(() => {
    // For We Digitliz, we'll just wait for the animation to finish, then require a tap,
    // or just automatically fade out after 2.5 seconds.
    const timer = setTimeout(() => {
      setReadyToTap(true);
      // Auto fade out after 3 seconds if not tapped
      setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setShow(false);
          onComplete();
        }, 500);
      }, 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleTap = () => {
    if (!readyToTap) return;
    setFading(true);
    setTimeout(() => {
      setShow(false);
      onComplete();
    }, 500);
  };

  if (!show) return null;

  return (
    <div className={`splash-container ${fading ? 'fade-out' : ''} ${readyToTap ? 'clickable' : ''}`} onClick={handleTap}>
      <svg viewBox="0 0 440 130" style={{ width: '80%', maxWidth: '300px', overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradSplash" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007AFF" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#007AFF" />
          </linearGradient>
        </defs>
        <g className="splash-path" transform="scale(0.38) translate(20, 60)">
          <path d="M267.05,174.36l30.5-26.66,69.1-60.87-17.31-18.92c-7.93-8.67-16.89-15.81-26.84-22.05-11.41-7.07-23.68-11.07-37.09-11.68-12.81-.49-23.9-6.2-32.4-15.7L239.32.22,317.66,0c34.38-.35,65.08,17.83,79.63,48.93,15.25,32.6,10.39,70.36-13.98,97.24-16.07,17.72-38.1,27.71-62.13,28.22l-54.12-.03Z"/>
          <path d="M260.78,151.76c-12,10.44-24.92,21.84-40.94,21.76-12.73-.41-23.05-7.73-29.43-18.49l-26.9-45.37L99.99,3.76l52.53.02c13.04,0,23.86,7.53,31.3,17.93l76.96,130.05Z"/>
          <path d="M145.03,157.34c-2.82,3.66-6.49,6.1-10.07,8.55-6.31,3.88-13.44,5.18-20.69,4.25-11.63-1.5-19.64-9.03-25.47-18.68L0,4.36l51.85.14c13.52.04,25.35,7.55,32.59,18.6l72.1,119.3-11.51,14.93Z"/>
          <path d="M314.41,94.91l-37.08,22.57c-2.25,1.37-5.6.86-7.77-.4-1.87-1.08-3.57-3.58-3.57-6.45l.06-47.68c0-2.51,2.41-4.71,4-5.47,2.22-1.06,5.57-1.16,7.77.21l38,23.7c2.4,1.5,3.29,4.63,3.05,7.21s-1.81,4.71-4.46,6.32Z"/>
        </g>
        
        <line className="splash-line" x1="170" y1="108" x2="210" y2="108" />
        <text className="splash-text" textAnchor="end" x="425" y="115">WE DIGITLIZE</text>
      </svg>
      {readyToTap && <div className="tap-to-enter">Tap to Enter</div>}
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN CARD PAGE
// ----------------------------------------------------------------------

const services = [
  { id: 1, title: "Web Experiences", icon: Globe, stat: "15+ Launched" },
  { id: 2, title: "Mobile Apps", icon: Smartphone, stat: "99% Uptime" },
  { id: 3, title: "Automation", icon: Zap, stat: "10x Faster" },
  { id: 4, title: "Brand Identity", icon: Palette, stat: "Premium" },
];

export default function CardPage() {
  const [splashDone, setSplashDone] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isExploded, setIsExploded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [radius, setRadius] = useState(380);
  const [scale, setScale] = useState(1);
  const deferredPromptRef = useRef<any>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [showWebsitePreview, setShowWebsitePreview] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isHapticPulse, setIsHapticPulse] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isXRayMode, setIsXRayMode] = useState(false);

  const phone = "+447584296946";
  const email = "info@wedigitlize.com";

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ x, y });
  };

  const handleVolumeClick = () => {
    setIsHapticPulse(true);
    setTimeout(() => setIsHapticPulse(false), 300);
  };

  const handleXRayToggle = () => setIsXRayMode(!isXRayMode);

  const playSpatialAudio = (x: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      
      if (ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        const panValue = Math.max(-1, Math.min(1, x / 400));
        panner.pan.value = panValue;
        osc.connect(panner);
        panner.connect(gain);
      } else {
        osc.connect(gain);
      }
      
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.log("Audio skipped", e);
    }
  };

  const handleBubbleClick = (id: number) => {
    if (!document.startViewTransition) {
      setSelectedProject(id);
      return;
    }
    document.startViewTransition(() => {
      setSelectedProject(id);
    });
  };

  useEffect(() => {
    // Intentionally blank. SIM tray click will trigger the explosion.
  }, [splashDone]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const currentRadius = isMobile ? 240 : 380;
      setRadius(currentRadius);
      
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      
      // Calculate total required width and height including bubbles
      const bubbleSize = isMobile ? 100 : 160;
      const sceneWidth = (currentRadius + bubbleSize / 2) * 2;
      const sceneHeight = Math.max(740, (currentRadius + bubbleSize / 2) * 2);
      
      // Fit within 90% of screen width and 85% of screen height
      const heightScale = (vh * 0.85) / sceneHeight;
      const widthScale = (vw * 0.90) / sceneWidth;
      
      setScale(Math.min(heightScale, widthScale, 1.2));
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPromptRef.current = e;
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsAppInstalled(true);
    }
    
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      deferredPromptRef.current = null;
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (deferredPromptRef.current) {
      try {
        await deferredPromptRef.current.prompt();
        await deferredPromptRef.current.userChoice;
      } catch (err) {
        console.error("Install prompt failed:", err);
      }
      deferredPromptRef.current = null;
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        alert("To install the App on iOS:\n\n1. Tap the Share button at the bottom of Safari.\n2. Scroll down and select 'Add to Home Screen'.");
      } else {
        alert("To install the App:\n\nTap your browser's menu (three dots) and select 'Install App' or 'Add to Home Screen'.");
      }
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.offsetWidth;
      const newSlide = Math.round(scrollPosition / width);
      setActiveSlide(newSlide);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard!");
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:wedigitlize;;;;\nFN:wedigitlize\nORG:wedigitlize\nTITLE:Premium Digital Agency\nTEL;TYPE=WORK,VOICE:${phone}\nEMAIL;TYPE=PREF,INTERNET:${email}\nURL:https://wedigitlize.com\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedigitlize.vcf";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Contact Saved!");
  };

  return (
    <main 
      className="min-h-[100dvh] w-full bg-[#0a0a0a] selection:bg-primary/30 selection:text-white"
      onMouseMove={handleMouseMove}
    >
      
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      <div 
        className="portfolio-container explode-layout"
        role="region"
        aria-label="Interactive Portfolio Showcase"
        style={{
          transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
        } as React.CSSProperties}
      >
        
        {/* SVG Filters */}
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <filter id="plasma">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -3" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" />
          </filter>
        </svg>

        {/* Background Ambience */}
        <div className="bg-ambience" aria-hidden="true">
          <div className="bg-pattern" />
          <div 
            className="orb-wrapper orb-1-wrapper"
            style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0)` }}
          >
            <div className="glow-orb-1" />
          </div>
          <div 
            className="orb-wrapper orb-2-wrapper"
            style={{ transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 40}px, 0)` }}
          >
            <div className="glow-orb-2" />
          </div>
        </div>

        {/* Central Card Setup */}
        <div 
          className={`center-bottle ${isExploded ? 'shrunk' : ''}`}
          style={{ '--dynamic-scale': scale } as React.CSSProperties}
        >
          
          {/* The Body Container (tilted in CSS) */}
          <div className={`perfume-body-container ${isExploded ? 'active' : ''}`}>
             <div className={`phone-body ${isFlipped ? 'flipped' : ''}`}>
                
                {/* Hardware Buttons (Left) */}
                <div 
                  className={`hardware-button silent-switch cursor-pointer ${isXRayMode ? 'toggled' : ''}`} 
                  onClick={handleXRayToggle} 
                  title="Toggle X-Ray Mode"
                />
                <div className="hardware-button volume-up cursor-pointer" onClick={handleVolumeClick} />
                <div className="hardware-button volume-down cursor-pointer" onClick={handleVolumeClick} />

                {/* Hardware Buttons (Right) */}
                <div className="hardware-button power-button" />
                
                {/* Ejecting SIM Tray */}
                <button 
                  className={`sim-tray-trigger ${isExploded ? 'active-sim-tray' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setIsExploded(!isExploded); }}
                  aria-label="Toggle SIM Tray"
                >
                  <div className="sim-pinhole" />
                  {isExploded && <span className="easter-egg-text">SERVICES</span>}
                </button>
                
                {/* ================= FRONT FACE (SCREEN) ================= */}
                <div className={`phone-front ${isXRayMode ? 'x-ray-mode' : ''}`}>
                  <div className="circuit-board-bg" />
                  {/* Dynamic Island Notch */}
                  <div className={`dynamic-island ${hoveredService ? 'expanded' : ''}`}>
                    {hoveredService ? (
                      <div className="flex items-center justify-between w-full px-3 h-full text-white text-[10px] sm:text-xs">
                        <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{services.find(s => s.id === hoveredService)?.title}</span>
                        <span className="text-primary font-bold whitespace-nowrap ml-2">{services.find(s => s.id === hoveredService)?.stat}</span>
                      </div>
                    ) : (
                      <>
                        <div className="dynamic-island-lens" />
                        <div className="dynamic-island-sensor" />
                      </>
                    )}
                  </div>

                  <div 
                    className={`phone-screen ${isHapticPulse ? 'haptic-pulse' : ''}`}
                    style={{
                      '--glare-x': `${mousePos.x * 100}%`,
                      '--glare-y': `${mousePos.y * 100}%`,
                    } as React.CSSProperties}
                  >
                    {/* Floating Action Buttons Top */}
                    <button 
                      onClick={() => setIsFlipped(true)}
                      className="icon-btn"
                      style={{ top: '1.5rem', right: '1.5rem' }}
                      aria-label="Show QR Code"
                    >
                      <QrCode size={18} />
                    </button>

                    {!isAppInstalled ? (
                      <button 
                        onClick={handleInstallClick}
                        className="icon-btn"
                        style={{ top: '1.5rem', left: '1.5rem' }}
                        aria-label="Install App"
                      >
                        <Download size={18} />
                      </button>
                    ) : (
                      <div 
                        className="icon-btn opacity-50 cursor-default"
                        style={{ top: '1.5rem', left: '1.5rem' }}
                        title="App Installed"
                      >
                        <Check size={18} />
                      </div>
                    )}

                    {/* Header / Brand */}
                    <div className="flex flex-col items-center justify-center gap-3 mt-10 mb-2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF]/20 to-[#8b5cf6]/20 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,122,255,0.3)]">
                        <Logo className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-display font-bold tracking-widest text-2xl text-white uppercase mt-2">wedigitlize</span>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#007AFF] font-bold">Premium Digital Agency</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col gap-3 mt-6">
                      <div 
                        className="website-preview-container"
                        onMouseEnter={() => setShowWebsitePreview(true)}
                        onMouseLeave={() => setShowWebsitePreview(false)}
                        onTouchStart={() => setShowWebsitePreview(true)}
                        onTouchEnd={() => setShowWebsitePreview(false)}
                      >
                        <a href="https://wedigitlize.com" target="_blank" rel="noreferrer" className="neon-button w-full">
                          <Globe size={16} /> Visit Website
                        </a>
                        
                        {/* Floating Video Preview */}
                        <div className={`website-preview-popover ${showWebsitePreview ? 'active' : ''} overflow-hidden`}>
                          <iframe 
                            src="/" 
                            className="preview-iframe"
                            style={{
                              width: '1040px',
                              height: '640px',
                              border: 'none',
                              pointerEvents: 'none',
                              transform: 'scale(0.25)',
                              transformOrigin: 'top left',
                              borderRadius: '56px' /* 14px / 0.25 */
                            }}
                          />
                        </div>
                      </div>
                      <a href={`tel:${phone}`} className="neon-button">
                        <Phone size={16} /> {phone}
                      </a>
                      
                      {/* Email Action Button */}
                      <div className="relative w-full z-20">
                        <button onClick={() => setShowEmailMenu(true)} className="neon-button w-full">
                          <Mail size={16} /> Email Us
                        </button>
                      </div>
                    </div>
                    
                    {/* Social Dock */}
                    <div className="flex gap-6 mt-auto pb-4">
                      <a href="https://instagram.com/wedigitliz" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/70 hover:text-[#007AFF] hover:border-[#007AFF] hover:bg-[#007AFF]/10 transition-all hover:-translate-y-1">
                        <FiInstagram size={20} />
                      </a>
                      <a href="https://twitter.com/wedigitliz" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/70 hover:text-[#007AFF] hover:border-[#007AFF] hover:bg-[#007AFF]/10 transition-all hover:-translate-y-1">
                        <FiTwitter size={20} />
                      </a>
                      <a href="https://linkedin.com/company/wedigitliz" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/70 hover:text-[#007AFF] hover:border-[#007AFF] hover:bg-[#007AFF]/10 transition-all hover:-translate-y-1">
                        <FiLinkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* ================= BACK FACE (CHASSIS) ================= */}
                <div className="phone-back">
                  
                  {/* Camera Bump */}
                  <div className="camera-bump">
                    <div className="camera-lens lens-1" />
                    <div className="camera-lens lens-2" />
                    <div className="camera-lens lens-3" />
                    <div className="camera-flash" />
                    <div className="camera-lidar" />
                  </div>

                  <button 
                    onClick={() => setIsFlipped(false)}
                    className="icon-btn"
                    style={{ top: '1.5rem', right: '1.5rem' }}
                    aria-label="Close QR Code"
                  >
                    <X size={18} />
                  </button>
                  
                  <div className="flex flex-col items-center justify-center h-full w-full pt-16">
                    {/* Dynamic Header */}
                    <div className="h-[60px] flex flex-col justify-center items-center px-4 w-full">
                      <h3 className="text-xl font-display font-bold text-white mb-1 uppercase tracking-widest text-center transition-all">
                        {activeSlide === 0 ? "Share Card" : activeSlide === 1 ? "Instagram" : "Review Us"}
                      </h3>
                      <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] text-center max-w-[220px] transition-all">
                        {activeSlide === 0 ? "Scan to download contact details." : activeSlide === 1 ? "Scan to follow our latest updates." : "Scan to leave us a review."}
                      </p>
                    </div>

                    {/* QR Code Viewer (Fade In/Out) */}
                    <div className="relative w-full h-[190px] flex items-center justify-center mt-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSlide}
                          initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                          transition={{ duration: 0.25 }}
                          className="absolute p-4 bg-white rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                          <QRCodeSVG 
                            value={activeSlide === 0 ? "https://wedigitlize.com/card" : activeSlide === 1 ? "https://instagram.com/wedigitliz" : "https://g.page/r/placeholder"} 
                            size={150} fgColor="#0a0a0a" bgColor="#ffffff" level="H"
                            imageSettings={{ src: "/logo-black.svg", x: undefined, y: undefined, height: 35, width: 35, excavate: true }}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Segmented Control Navigation */}
                    <div className="flex items-center gap-1 mt-6 mb-8 bg-white/5 p-1 rounded-full backdrop-blur-md border border-white/10">
                      <button 
                        onClick={() => setActiveSlide(0)} 
                        className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeSlide === 0 ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                      >
                        Contact
                      </button>
                      <button 
                        onClick={() => setActiveSlide(1)} 
                        className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeSlide === 1 ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                      >
                        Social
                      </button>
                      <button 
                        onClick={() => setActiveSlide(2)} 
                        className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 ${activeSlide === 2 ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                      >
                        Review
                      </button>
                    </div>

                    {/* (Replaced by segmented controls) */}
                    
                    {/* Dynamic Action Button */}
                    <div className="h-12 w-full flex justify-center px-8 relative">
                      <div className={`absolute w-full px-8 transition-all duration-300 ${activeSlide === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                        <button onClick={handleSaveContact} className="w-full bg-[#007AFF] text-white py-3 rounded-full font-display font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(0,122,255,0.4)] hover:shadow-[0_0_30px_rgba(0,122,255,0.6)] transition-all flex items-center justify-center gap-2">
                          <UserPlus size={16} /> SAVE CONTACT
                        </button>
                      </div>
                      
                      <div className={`absolute w-full px-8 transition-all duration-300 ${activeSlide === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                        <a href="https://instagram.com/wedigitliz" target="_blank" rel="noreferrer" className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white py-3 rounded-full font-display font-semibold text-sm tracking-wide shadow-[0_0_20px_rgba(225,48,108,0.4)] hover:shadow-[0_0_30px_rgba(225,48,108,0.6)] transition-all flex items-center justify-center gap-2">
                          <FiInstagram size={16} /> FOLLOW US
                        </a>
                      </div>
                      
                      <div className={`absolute w-full px-8 transition-all duration-300 ${activeSlide === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                        <a href="https://g.page/r/placeholder" target="_blank" rel="noreferrer" className="w-full bg-white text-[#0a0a0a] py-3 rounded-full font-display font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all flex items-center justify-center gap-2">
                          <Star size={16} className="fill-[#FBBC05] text-[#FBBC05]" /> LEAVE A REVIEW
                        </a>
                      </div>
                    </div>

                    <EmailActionDrawer 
                      isOpen={showEmailMenu}
                      onClose={() => setShowEmailMenu(false)}
                      email="info@wedigitlize.com"
                      onCopy={() => {
                        navigator.clipboard.writeText('info@wedigitlize.com');
                        showToast("Email copied to clipboard!");
                      }}
                    />
                  </div>
                </div>
             </div>
          </div>

          {/* Orbiting Service Bubbles */}
          {services.map((service, index) => {
            const angle = (index / services.length) * 2 * Math.PI - Math.PI / 2;
            const baseX = Math.cos(angle) * radius;
            let baseY = Math.sin(angle) * radius;
            
            // Magnetic cursor math
            let offsetX = 0;
            let offsetY = 0;
            if (typeof window !== 'undefined' && isExploded) {
              const cursorX = mousePos.x * (window.innerWidth / 2);
              const cursorY = mousePos.y * (window.innerHeight / 2);
              const dx = cursorX - baseX;
              const dy = cursorY - baseY;
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < 200) {
                offsetX = dx * 0.15;
                offsetY = dy * 0.15;
              }
            }
            
            const finalX = baseX + offsetX;
            const finalY = baseY + offsetY;

            // Provide different depths to bubbles: some in front, some behind
            const zValues = [-150, 100, -80, 150];
            const z = isExploded ? zValues[index] : 0;

            return (
              <button 
                key={service.id} 
                className={`mockup-bubble ${isExploded ? 'exploded' : 'invisible pointer-events-none'}`}
                onMouseEnter={() => {
                  setHoveredService(service.id);
                  playSpatialAudio(finalX);
                }}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => handleBubbleClick(service.id)}
                style={{ 
                  '--target-x': `${finalX}px`,
                  '--target-y': `${finalY}px`,
                  '--target-z': `${z}px`,
                  transitionDelay: `${index * 0.1}s`,
                  viewTransitionName: selectedProject === service.id ? 'project-title' : 'none'
                } as React.CSSProperties}
                aria-label={service.title}
              >
                <service.icon size={32} />
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>
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

      {/* View Transition Project Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[999] bg-[#050505] text-white overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8 pt-20">
            <button 
              className="absolute top-8 left-8 text-white/50 hover:text-white"
              onClick={() => {
                if (document.startViewTransition) {
                  document.startViewTransition(() => setSelectedProject(null));
                } else {
                  setSelectedProject(null);
                }
              }}
            >
              <X size={32} />
            </button>
            <h1 className="text-5xl font-bold mb-4" style={{ viewTransitionName: 'project-title' }}>
              {services.find(s => s.id === selectedProject)?.title}
            </h1>
            <p className="text-xl text-white/60 mb-12">Detailed case studies and interactive galleries coming soon.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl aspect-video animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
