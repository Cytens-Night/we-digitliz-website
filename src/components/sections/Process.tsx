"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your established workflows, keep what works, and identify exactly what needs to be modernized.",
  },
  {
    num: "02",
    title: "Design & Prototyping",
    desc: "Crafting revolutionary ideas and innovative new aesthetics tailored precisely for your target demographic.",
  },
  {
    num: "03",
    title: "Development & Engineering",
    desc: "Building the automated systems and seamless online presence with cutting-edge tech like Next.js and Three.js.",
  },
  {
    num: "04",
    title: "Launch & Lead Generation",
    desc: "Deploying your solution and leveraging our vast network and data-driven strategies to drive immediate growth.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the container for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // The glowing line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // The comet head position
  const cometY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={sectionRef} className="py-16 md:py-32 bg-[#f5f5f7] relative overflow-hidden border-t border-black/15">
      
      {/* Brutalist Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-black/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/10 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-32">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-transparent text-black text-xs font-bold mb-6 border border-black/20 uppercase tracking-[0.2em]">
             Our Process
          </div>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-black mb-6 leading-tight tracking-tight md:tracking-tighter">
            WE EXECUTE WITH <br/> <span className="text-black/80">PRECISION.</span>
          </h3>
        </div>

        {/* ==============================================
            DESKTOP LAYOUT (Vertical Animated Timeline)
            ============================================== */}
        <div ref={containerRef} className="relative pb-20 hidden md:block">
          
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2" />
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-[1px] bg-black -translate-x-1/2 origin-top z-0"
          />
          <motion.div
            style={{ top: cometY }}
            className="absolute left-1/2 w-3 h-12 bg-black -translate-x-1/2 -translate-y-full blur-[1px] shadow-[0_0_20px_5px_rgba(0,0,0,0.8)] z-10"
          />

          <div className="flex flex-col gap-40 relative z-20">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`flex items-center w-full ${isEven ? "flex-row-reverse" : ""}`}>
                  
                  <div className="w-[45%] flex flex-col group cursor-default relative">
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`
                        relative z-10 bg-transparent p-4
                        transition-all duration-500 group-hover:-translate-y-2
                        ${isEven ? "text-right" : "text-left"}
                      `}
                    >
                      <span className="text-black/80 font-mono text-xs tracking-[0.3em] font-bold mb-4 block uppercase">Phase {step.num}</span>
                      <h4 className="text-5xl font-display font-bold text-black mb-6 group-hover:text-black/70 transition-colors duration-500 tracking-tight">
                        {step.title}
                      </h4>
                      <p className="text-black/80 leading-relaxed text-xl">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0, backgroundColor: "#ffffff", borderColor: "rgba(0,0,0,0.1)" }}
                      whileInView={{ 
                        scale: [0, 1.2, 1], 
                        opacity: 1, 
                        backgroundColor: ["#000000", "#000000"],
                        borderColor: ["rgba(0,0,0,1)", "rgba(0,0,0,1)"] 
                      }}
                      viewport={{ once: true, margin: "-50%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-6 h-6 rounded-none rotate-45 border-2 z-30 relative"
                    />
                    
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [1, 4], opacity: [1, 0] }}
                      viewport={{ once: true, margin: "-50%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute w-6 h-6 rounded-none rotate-45 bg-black z-20 pointer-events-none"
                    />
                  </div>

                  <div className="w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* ==============================================
            MOBILE NATIVE APP LAYOUT (iOS Style List)
            ============================================== */}
        <div className="flex md:hidden flex-col gap-4 px-2 pb-12">
          {steps.map((step, index) => (
             <motion.div 
               key={index} 
               initial={{ opacity: 0, y: 30, scale: 0.95 }}
               whileInView={{ opacity: 1, y: 0, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
               className="bg-[#f5f5f7] rounded-2xl p-6 flex flex-col gap-2 border border-black/15 active:scale-[0.98] transition-transform shadow-lg relative overflow-hidden"
             >
               {/* Subtle background number watermark */}
               <div className="absolute -right-4 -bottom-8 font-display font-bold text-8xl text-black/[0.05] pointer-events-none">
                 {step.num}
               </div>

               <div className="flex items-center justify-between mb-2 relative z-10">
                 <span className="text-[#0a84ff] font-bold text-[10px] tracking-widest uppercase">Phase {step.num}</span>
               </div>
               <h4 className="text-2xl font-display font-bold text-black tracking-tight relative z-10 leading-tight mb-2">
                 {step.title}
               </h4>
               <p className="text-black/80 text-sm leading-relaxed relative z-10">
                 {step.desc}
               </p>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
