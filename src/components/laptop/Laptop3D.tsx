"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import Logo from "@/components/ui/Logo";
import { ArrowRight, Globe, Mail, MessageSquare, Download, QrCode, ArrowLeft, Briefcase } from "lucide-react";
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
                  We Digitlize
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
                        <span>We Digitlize</span>
                      </div>
                      <div className="flex gap-4">
                        <span>100%</span>
                        <span>09:41</span>
                      </div>
                   </div>

                   {/* Desktop Background / Content Wrapper */}
                   <div className="flex-1 w-full flex overflow-hidden relative">
                   <div className="flex-1 w-full bg-white p-4 sm:p-6 overflow-y-auto no-scrollbar relative flex flex-col">
                      
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
