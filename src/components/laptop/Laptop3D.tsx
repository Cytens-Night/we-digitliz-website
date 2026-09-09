"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Laptop3DProps {
  children: React.ReactNode;
}

export default function Laptop3D({ children }: Laptop3DProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);

  // Auto-open sequence
  useEffect(() => {
    // Wait a second, then open lid
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    // Wait for lid to open fully, then zoom camera into screen
    const zoomTimer = setTimeout(() => {
      setZoomedIn(true);
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(zoomTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      
      {/* 3D Scene Wrapper */}
      <motion.div 
        className="relative flex items-center justify-center w-full h-full"
        style={{ perspective: "2000px" }}
        animate={{
          scale: zoomedIn ? 2.5 : 1, // Zoom in massively so the screen fills viewport
          y: zoomedIn ? 150 : 0,    // Shift down so screen stays centered
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* The entire laptop assembly */}
        <motion.div
          className="relative w-[800px] h-[500px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: zoomedIn ? 0 : 20, // Tilt the whole assembly slightly for isometric view when not zoomed
            rotateY: zoomedIn ? 0 : -10,
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* Laptop Lid (Screen) */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-full origin-bottom"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotateX: 90 }} // 90 degrees = closed flat against base
            animate={{ rotateX: isOpen ? 0 : 90 }} // 0 degrees = fully open vertical
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Screen Bezel / Shell (Front of lid) */}
            <div 
              className="absolute inset-0 bg-black rounded-t-[20px] border-[12px] border-black flex flex-col shadow-2xl"
              style={{ transform: "translateZ(1px)" }}
            >
              {/* Webcam dot */}
              <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
              
              {/* The Actual Display (Inner Content) */}
              <div className="relative flex-1 bg-white overflow-hidden overflow-y-auto custom-scrollbar rounded-sm">
                {children}
              </div>
            </div>

            {/* Back of Lid (Apple Logo side) */}
            <div 
              className="absolute inset-0 bg-[#2a2a2a] rounded-[20px] flex items-center justify-center border border-white/10"
              style={{ transform: "translateZ(-1px) rotateY(180deg)" }}
            >
              {/* Glowing Logo */}
              <div className="w-20 h-20 rounded-full bg-white/10 blur-xl absolute" />
              <div className="text-white/30 text-3xl font-display font-bold">WD</div>
            </div>
          </motion.div>

          {/* Laptop Base (Keyboard side) */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[400px] bg-[#222] rounded-[20px] origin-top border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
            style={{ 
              transform: "rotateX(90deg) translateY(200px) translateZ(-200px)", // Lay flat horizontally
              transformStyle: "preserve-3d"
            }}
          >
            {/* Keyboard Indentation */}
            <div className="absolute top-10 left-10 right-10 bottom-32 bg-[#1a1a1a] rounded-lg shadow-inner flex flex-wrap gap-1 p-2">
              {/* Dummy keyboard keys effect */}
              <div className="w-full h-full grid grid-cols-12 grid-rows-6 gap-1 opacity-20">
                {Array.from({ length: 72 }).map((_, i) => (
                  <div key={i} className="bg-black rounded-sm border border-white/5" />
                ))}
              </div>
            </div>
            
            {/* Trackpad */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[30%] h-[20%] bg-[#1a1a1a] rounded-xl border border-white/5 shadow-inner" />
          </div>

        </motion.div>
      </motion.div>
      
      {/* Skip Intro Button */}
      <AnimatePresence>
        {!zoomedIn && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              setZoomedIn(true);
            }}
            className="absolute bottom-10 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/20 transition-all font-mono text-sm tracking-widest z-50 border border-white/10"
          >
            [ SKIP SEQUENCE ]
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
