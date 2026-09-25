"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Globe, Mail, MessageSquare, Download, QrCode, ArrowLeft, Briefcase, Phone } from "lucide-react";
import { FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import ActionDrawer, { DrawerType } from "./ActionDrawer";
import ToastContainer from "@/components/ui/ToastContainer";

// The 3D MacBook Model Component (Procedural to avoid 404s)
function Macbook({ scrollYProgress }: { scrollYProgress: any }) {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current || !lid.current) return;
    const progress = scrollYProgress.get();

    // 1. Laptop opens (0% to 30% scroll)
    const closedAngle = Math.PI / 2; // Folded down flat
    const openAngle = -0.2; // Opened past 90 degrees
    let currentLidAngle = closedAngle;
    if (progress < 0.3) {
      currentLidAngle = closedAngle - (progress / 0.3) * (closedAngle - openAngle);
    } else {
      currentLidAngle = openAngle;
    }
    lid.current.rotation.x = currentLidAngle;

    // 2. Base rotates to face camera (30% to 50% scroll)
    const startBaseX = Math.PI / 6;
    const endBaseX = Math.PI / 2; // Flat facing camera
    let currentBaseX = startBaseX;
    if (progress > 0.3 && progress <= 0.5) {
      currentBaseX = startBaseX + ((progress - 0.3) / 0.2) * (endBaseX - startBaseX);
    } else if (progress > 0.5) {
      currentBaseX = endBaseX;
    }
    group.current.rotation.x = currentBaseX;

    // 3. Scale and slide out (50% to 65% scroll)
    let currentY = -1; // Base position
    let currentScale = 1;
    if (progress > 0.5 && progress <= 0.65) {
      const p = (progress - 0.5) / 0.15;
      currentScale = 1 + p * 0.5;
      currentY = -1 + p * 10; // Slide up off screen
    } else if (progress > 0.65) {
      currentScale = 1.5;
      currentY = 9;
    }
    
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, currentY, 0.1);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, currentScale, 0.1));
  });

  return (
    <group ref={group} position={[0, -1, 0]} rotation={[Math.PI / 6, 0, 0]}>
      {/* Base Chassis */}
      <group position={[0, -0.1, 1.5]}>
        {/* Main Body */}
        <RoundedBox args={[4.5, 0.15, 3]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial metalness={0.9} roughness={0.3} color="#b0b0b0" />
        </RoundedBox>
        
        {/* Keyboard Indent */}
        <RoundedBox args={[4.1, 0.05, 1.4]} radius={0.02} smoothness={2} position={[0, 0.06, -0.6]}>
          <meshPhysicalMaterial color="#111111" metalness={0.2} roughness={0.8} />
        </RoundedBox>
        
        {/* Trackpad */}
        <RoundedBox args={[1.5, 0.02, 0.9]} radius={0.02} smoothness={2} position={[0, 0.07, 0.8]}>
          <meshPhysicalMaterial metalness={0.8} roughness={0.4} color="#a0a0a0" />
        </RoundedBox>
      </group>

      {/* Hinge & Lid Group */}
      <group position={[0, -0.05, 0]}>
        {/* The hinge cylinder */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 4.2, 32]} />
          <meshPhysicalMaterial metalness={0.9} roughness={0.4} color="#222222" />
        </mesh>

        {/* The Lid, rotates around the hinge */}
        <group ref={lid} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 1.5, 0]}>
            {/* Screen Back (Aluminum) */}
            <RoundedBox args={[4.5, 3, 0.1]} radius={0.05} smoothness={4} position={[0, 0, -0.05]}>
              <meshPhysicalMaterial metalness={0.9} roughness={0.3} color="#b0b0b0" />
            </RoundedBox>

            {/* Glowing Brand Logo on the Back */}
            <Html 
              transform 
              position={[0, 0, -0.105]} 
              rotation={[0, Math.PI, 0]} 
              scale={0.15}
            >
              <div className="flex flex-col items-center justify-center pointer-events-none drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                <Logo className="w-24 h-24 text-white mb-2" />
                <span className="font-display font-bold text-2xl tracking-[0.2em] uppercase text-white">
                  wedigitlize
                </span>
              </div>
            </Html>
            
            {/* Screen Glass (Black Bezel) */}
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[4.45, 2.95]} />
              <meshPhysicalMaterial color="#050505" metalness={0.8} roughness={0.1} clearcoat={1} clearcoatRoughness={0.1} />
            </mesh>
            
            {/* Inner Screen Area */}
            <mesh position={[0, 0, 0.02]}>
              <planeGeometry args={[4.2, 2.7]} />
              <meshPhysicalMaterial color="#000000" metalness={0.1} roughness={0.4} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function Laptop3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Stage 4: Business Card UI slides up and fades in (60% to 80% scroll)
  const uiTranslateY = useTransform(scrollYProgress, [0.6, 0.8], [400, 0]);
  const uiOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  // States for interactive UI
  const [isScreenFlipped, setIsScreenFlipped] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [drawerType, setDrawerType] = useState<DrawerType>(null);
  const deferredPromptRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPromptRef.current = e;
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPromptRef.current) {
      try {
        deferredPromptRef.current.prompt();
        await deferredPromptRef.current.userChoice;
      } catch (err) {
        console.error("Install prompt failed:", err);
      }
      deferredPromptRef.current = null;
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        showToast("To install on iOS: tap Share and select 'Add to Home Screen'.");
      } else {
        showToast("Tap your browser's menu and select 'Install App'.");
      }
    }
  };

  const phone = "+447584296946";
  const email = "info@wedigitlize.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    showToast("Email copied to clipboard!");
  };

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:wedigitlize\nORG:wedigitlize\nTEL:${phone}\nEMAIL:${email}\nURL:https://wedigitlize.com\nEND:VCARD`;
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
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Helper text indicating to scroll */}
        <motion.div 
           className="absolute bottom-12 text-white/40 text-sm tracking-widest uppercase font-bold z-0 flex flex-col items-center gap-2"
           style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
           {/* Center notch/camera area */}
           <div className="w-px h-8 bg-white/20" />
        </motion.div>

        {/* ====================
            THE TRUE WEBGL LAPTOP
            ==================== */}
        <div className="absolute inset-0 z-10 pointer-events-none">
           <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
              <Environment preset="city" />
              <Macbook scrollYProgress={scrollYProgress} />
              <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
           </Canvas>
        </div>

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
                        <span>wedigitlize</span>
                      </div>
                      <div className="flex gap-4">
                        <span>100%</span>
                        <span>09:41</span>
                      </div>
                   </div>

                   {/* Desktop Background / Content Wrapper (Front Face) */}
                   <div className="flex-1 w-full bg-gradient-to-br from-[#111] to-[#050505] p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden">
                      {/* Noise Texture */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
                      
                      {/* Top Action Buttons */}
                      <button onClick={handleInstallClick} className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-all hover:scale-110" title="Install App">
                         <Download className="w-6 h-6" />
                      </button>
                      <button onClick={() => setIsScreenFlipped(true)} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-all hover:scale-110" title="QR Code">
                         <QrCode className="w-6 h-6" />
                      </button>

                      {/* Header Logo Graphic */}
                      <div className="mt-8 mb-8 flex flex-col items-center justify-center relative z-10 w-full">
                         {/* We Digitliz Glowing Logo Text */}
                         <div className="text-4xl sm:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                           WEDIGITLIZE
                         </div>
                         <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
                         <p className="text-primary tracking-[0.3em] uppercase text-[9px] sm:text-[10px] mt-3 font-bold">Digital Architecture</p>
                      </div>

                      {/* Stacked Neon Buttons */}
                      <div className="w-full flex flex-col gap-4 relative z-10 max-w-[280px] mx-auto mb-10">
                         <a 
                           href="https://wedigitlize.com" 
                           target="_blank" 
                           rel="noreferrer"
                           className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] backdrop-blur-md group"
                         >
                            <Globe className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> Visit Website
                         </a>
                         
                         <button 
                           onClick={() => setDrawerType('phone')}
                           className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] backdrop-blur-md group"
                         >
                            <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> View Contact Options
                         </button>

                         <button 
                           onClick={() => setDrawerType('email')}
                           className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] backdrop-blur-md group"
                         >
                            <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> hello@wedigitliz.com
                         </button>
                      </div>

                      {/* Social Dock */}
                      <div className="flex gap-6 relative z-10 mt-auto">
                         <a href="https://instagram.com/wedigitliz" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]">
                           <FiInstagram className="w-5 h-5" />
                         </a>
                         <a href="https://twitter.com/wedigitliz" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]">
                           <FiTwitter className="w-5 h-5" />
                         </a>
                         <a href="https://linkedin.com/company/wedigitliz" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]">
                           <FiLinkedin className="w-5 h-5" />
                         </a>
                      </div>
                   </div>
                </div>

                {/* BACK FACE (QR Code) */}
                <div className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-br from-[#111] to-[#050505] items-center justify-between p-8 [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden]">
                   <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
                   
                   <button onClick={() => setIsScreenFlipped(false)} className="absolute top-6 left-6 z-20 text-white/50 hover:text-white transition-all hover:scale-110" title="Go Back">
                      <ArrowLeft className="w-6 h-6" />
                   </button>
                   
                   <h3 className="text-2xl sm:text-3xl font-display font-bold text-primary mb-4 mt-12 tracking-tight">Scan to Connect</h3>
                   
                   <div className="p-6 bg-gradient-to-br from-[#2a2a2a] to-black rounded-3xl border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_0_15px_rgba(var(--primary-rgb),0.15)] mb-8 relative z-10">
                      <div className="p-2 bg-white rounded-xl">
                         <QRCodeSVG 
                            value="https://wedigitlize.com/card" 
                            size={160}
                            fgColor="#000000"
                            bgColor="#ffffff"
                            level="H"
                            imageSettings={{ src: "/favicon.svg", excavate: true, height: 35, width: 35 }}
                         />
                      </div>
                   </div>
                   
                   <p className="text-white/50 text-xs sm:text-sm text-center max-w-[200px] mb-8 relative z-10">
                      Share this digital business card seamlessly with a quick scan.
                   </p>

                   <button onClick={handleSaveContact} className="w-full max-w-[280px] flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] backdrop-blur-md relative z-10 group">
                      <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> Save Contact
                   </button>
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
