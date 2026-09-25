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
        <g className="splash-path">
          <path d="M176.1,39.44c3.59-.07,6.78.91,9.97,2.68,17.71-8.17,36.54-12.05,56.19-10.08-2.2-5.32-4.39-10.84-8.51-14.93-7.04-6.99-16.03-11.02-25.56-13.63-26.98-7.4-58.15-2.28-83.61,9.04-4.86,2.16-10.8,5.73-10.56,9.24.26,3.94,9.49,7.57,15.27,8.18l18.62,1.98c13.66,1.45,16.85,7.75,28.2,7.52ZM354.19,31.88l-12.06,6.27c-4.39,2.25-9,3.83-13.81,4.37l15.45-9.76c4.56-2.88,8.74-5.17,14.79-4.82-.81-10.2-4.05-21.06-13.55-24.13-8.94-2.88-18.56-4.28-28.09-2.9-11.07,1.6-21.12,7.6-27.63,16.35l-8.85,11.91c-3.26,4.39-8.03,7.25-13.04,10,18.41,9.01,31.47,24.19,37.69,42.99,4.16-9.4,10.67-15.84,19.68-19.29,7.94-3.79,14.98-8.31,20.89-14.76,4.11-4.91,7.76-9.95,8.53-16.24ZM114.49,111.2c-9.44,14.46-13.66,31.2-14.93,48.18-.8,19.82,3.52,38.69,13.88,55.83,36.53,9.07,77.45,5.42,112.46-8.77,30.46-12.68,56.85-34.59,70.09-65.16,6.41-14.81,8.98-30.38,6.53-46.48-6.9-45.3-51.56-66.74-93.96-54.97,17.07-.42,33.03,1.47,47.75,9.47,28.35,15.41,38.91,44.23,29.13,75.24-5.25,16.66-15.06,30.63-27.75,42.53-34.44,32.29-89.67,43.29-135.55,33.38l-7.25-14.67c-9.09-24.25-8.48-49.2-.4-74.57ZM274.49,71.97c-13.17-18.61-35.98-27.3-58.32-26.99l-7.8,15.22,28.75,15.01c12.51-1.9,24.45-3.01,37.36-3.24ZM202.76,59.36l7-14.06c-22.05,1.98-42.56,10.81-58.96,24.99l20.21,1.66c10.28-4.96,20.81-8.9,31.75-12.59ZM230.24,105.32l3.64-26.15-29.2-14.99c-10.95,3.53-20.55,7.22-30.6,12.17l-4.1,22.61c10.82,4.86,20.38,9.91,30.11,15.86l30.15-9.51ZM139.62,114.92l25.1-16.06,3.92-22.1c-8.26-1.39-15.86-1.75-23.98-.8-11.5,10.67-19.92,23.55-25.18,38.91l20.13.05ZM272.24,140.63c12.01-19.49,16.27-44.44,5.24-63.51-13.22-.21-25.73.94-38.48,2.89l-3.76,26.6c13.24,10.32,25.47,21.18,36.99,34.01ZM324.5,233.85c3.42-1.83,6.27-4.51,8.69-7.79,21.08-28.62,32.91-68.34,18.38-101.98-7.61-17.6-23.95-28.98-43.64-29.6,2.12,15.33,0,29.79-4.94,44,5.48,2.27,7.09,7.11,6.53,12.4-1.42,8.25-1.12,16.16,1.7,24.04,2.99,8.34,4.08,16.83,4.03,25.69l-.08,16.4c-.05,9.02,3.41,20,9.34,16.83ZM196.41,147.56l1.07-28.21c-9.65-6.01-19.37-11.06-29.95-16.11l-25.23,15.99-1.08,26.87,24.69,14.04,30.49-12.58ZM260.85,156.44l8.74-11.23-14.87-15.44-23.2-19.54-29,9.23-1.11,29.15c9.6,10.74,18.38,21.18,26.76,32.9,12.07-6.63,23.34-14.55,32.69-25.07ZM136.25,146.03l.89-25.97-19.25-.15c-4.35,13.35-5.6,27.42-3.66,42.17l22.02-16.05ZM165.78,198.49c.07-12.12-.69-22.88-2.39-33.85l-24.39-13.94c-8.62,5.11-16.59,10.7-23.69,17.76,2.04,10.02,5.14,18.81,10.29,27.46,13.18,2.83,26.13,3.5,40.19,2.58ZM223.45,183.75c-8.37-11.52-16.47-21.38-25.13-31.11l-29.73,12.18c1.48,11.26,2.15,21.84,2.29,33.32,18.46-2.06,36.08-6.19,52.58-14.39ZM94.86,208.97l5.86-7.53c-3.86-11.4-6.02-22.81-6.49-35.06-17.66,10.12-34.45,23.5-37.91,44.14-.12,2.52.45,5.03,2.3,6.26,1.31.87,4.27,1.17,5.86.46,13.56-6.11,20.33,4.65,30.38-8.26ZM140.71,271.6c-.83,5.45,3.02,9.69,8.42,9.51,3.18-.11,6.44-1.32,9.47-2.64,22.45-11.64,32.48-32.73,36.46-57.16-14.88,2.88-28.56,4.07-43.13,3.96-2.04,5.45-6.18,8.61-9.9,12.18-5.83,5.6-6.6,13.39-3.1,20.11,2.26,4.35,2.55,9,1.79,14.04Z"/>
          <path d="M55.81,103.72c2.49-4.88,5.29-8.8,8.3-13.56-3.96-.42-7.76-1.28-10.88-4.69l4.32-1.69c-6.13.21-11.34-1.83-15.4-6.15l5.16-1.13c-7.13-1.03-13.34-3.6-17.7-9.31l7.2-.27c-10.08-2.65-15.99-6.04-22.46-14.9l9.68,1.57-3.58-1.9c-8.89-4.1-15.76-11.76-18-21.56,3.67,2.2,6.59,4.34,10.46,5.57C2.46,28.02-2.26,15.4,1.04,2.89c3.1,4.66,5.82,8.4,9.55,11.93,13.2,12.53,31.62,20.69,48.05,28.77,9.7,4.77,20.07,10.2,26.3,18.89,5.1,7.11,6.55,16.03,2.96,24.09-1.69,3.8-4.28,7.04-7.23,9.95l-11.85,11.66c-14.11,13.89-18.65,33.74-19.47,53.08-.45,10.56-3.21,21.66-14.33,24.81,2.41-28.7,7.68-56.65,20.8-82.35ZM53.29,49.17c-3.29-3.81-7.08-5.83-10.87-8.29l-16.75-9.18c-8.14-4.46-14.96-10.19-21.32-17.06,1.1,7.81,5.81,13.61,11.74,18.13,6.09,4.24,12.78,6.98,19.76,9.67l17.46,6.73ZM58.53,58.02c-4.98-4.36-10.75-6.77-16.84-8.61l-16.11-4.85c-5.44-1.64-10.31-3.75-15.69-6.38,11.12,15.44,32.17,13.86,48.64,19.85ZM62.42,65.29c-2.91-2-5.62-3.06-8.55-4.15-10.04-2.45-20.06-2.37-30.54-4.4,3.65,3.28,8.05,4.81,12.78,5.99,4.81.67,9.51,1.1,14.41,1.29l11.9,1.28ZM60.2,72.28l6.36-.35c-4.1-2.28-8.9-2.9-13.71-2.7l-15.39.65c3.78,2.08,7.62,3.43,11.86,3.15l10.88-.74ZM62.47,79.58l7.56-2.18c-3.58-1.36-7.24-1.22-10.73-.45l-9.68,2.15c4.18,2.1,8.46,1.73,12.84.47ZM67.98,85.63l6.24-2.85c-2.03-.59-4.35-.75-6.23,0l-7.85,3.1c2.63,1.4,5.29.93,7.83-.24Z"/>
          <path d="M57.79,170.87c-1.99,2.55-4.45,4.3-7.88,5.08,1.48-4.92,2.28-9.73,2.52-15,.61-13.6,2.55-29.27,11.26-39.97-2,6.43-3.67,12.22-3.58,18.58,1.98-5.25,4.99-9.22,9.06-12.76,4.11-3.37,8.65-5.86,13.6-7.95,12.37-5.3,23.39-11.34,29.07-24.08,5.43-12.17,3.13-23.06,5.74-30.36,2.84-7.94,9.26-13.23,17.55-15.67l-4.48-2.33,3.25-2.97-6.44-4.42c-6.18-3.38-13.38-1.99-18,3.22-6.52,7.35-5.58,21.05-17.45,27.38-2.72-9.94-13.49-19.11-22.46-23.72l-16.96-8.7c-2.47-4.48-3.44-9.58-3.24-14.59,2.09,2.96,3.87,5.38,6.35,7.59-4.93-9.45-6.29-17.17-1.48-27.18,3.76,12.23,9.84,20.91,18.35,29.79l10.65,11.13c4.01,4.19,7.03,8.64,9.5,14.19,2-3.6,2.96-7.16,4.06-11,1.84-6.41,5.84-12.17,11.9-15.15,8.57-4.22,18.61-2.26,25.82,3.71,6.06,5.02,5.55,3.94,14.52,4.12,8,.15,15.76.65,23.57,2.23,3.96.8,7.61,1.91,11.02,4.12h-19.16c-7.78-.01-15.42,1.07-22.89,3.34-5.37,1.62-9.08,6.1-11.65,10.84-1.98,3.66-2.71,7.57-3.1,11.73l-1.07,11.43c-2.86,20.27-16.87,33.05-35.56,39.85l-10.18,3.71c-10.08,3.67-12.96,11.09-10.44,21.55,1.44,6-.4,11.78-6.2,14.91l-.13-7.2-.21-13.84c-2.12,5.11-2.85,10.54-2.45,16.14.31,4.31-.32,8.47-2.78,12.27ZM149.45,44.3c8.06-.64,15.46-.22,23.38-.02-10.8-2.2-21.86-2.15-32.93-1.79l-3.99,2.89,13.53-1.07Z"/>
          <circle cx="122.17" cy="43.97" r="3.58"/>
          <path d="M53.29,49.17l-17.46-6.73c-6.98-2.69-13.67-5.43-19.76-9.67-5.93-4.52-10.63-10.32-11.74-18.13,6.36,6.87,13.18,12.59,21.32,17.06l16.75,9.18c3.79,2.46,7.58,4.48,10.87,8.29Z"/>
          <path d="M58.53,58.02c-16.47-5.98-37.52-4.41-48.64-19.85,5.38,2.63,10.24,4.74,15.69,6.38l16.11,4.85c6.09,1.84,11.86,4.25,16.84,8.61Z"/>
          <path d="M62.42,65.29l-11.9-1.28c-4.9-.19-9.6-.62-14.41-1.29-4.73-1.17-9.12-2.71-12.78-5.99,10.48,2.03,20.5,1.95,30.54,4.4,2.93,1.09,5.64,2.15,8.55,4.15Z"/>
          <path d="M60.2,72.28l-10.88.74c-4.24.29-8.08-1.07-11.86-3.15l15.39-.65c4.82-.2,9.62.41,13.71,2.7l-6.36.35Z"/>
          <path d="M62.47,79.58c-4.39,1.26-8.67,1.63-12.84-.47l9.68-2.15c3.49-.78,7.15-.92,10.73.45l-7.56,2.18Z"/>
          <path d="M67.98,85.63c-2.55,1.17-5.21,1.64-7.83.24l7.85-3.1c1.88-.74,4.2-.58,6.23,0l-6.24,2.85Z"/>
          <path d="M149.45,44.3l-13.53,1.07,3.99-2.89c11.06-.36,22.13-.4,32.93,1.79-7.92-.2-15.33-.62-23.38.02Z"/>
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
                            imageSettings={{ src: "/favicon.svg", x: undefined, y: undefined, height: 35, width: 35, excavate: true }}
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
