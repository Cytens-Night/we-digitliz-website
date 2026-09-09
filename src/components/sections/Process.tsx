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
    <section id="process" ref={sectionRef} className="py-32 bg-[#000000] relative overflow-hidden border-t border-white/10">
      
      {/* Brutalist Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-transparent text-white text-xs font-bold mb-6 border border-white/20 uppercase tracking-[0.2em]">
             Our Process
          </div>
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight tracking-tighter">
            WE EXECUTE WITH <br/> <span className="text-white/40">PRECISION.</span>
          </h3>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative pb-20">
          
          {/* Background Track Line (Dim) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          {/* Foreground Animated Line (Solid White) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[1px] bg-white -translate-x-1/2 origin-top z-0"
          />

          {/* The "Comet" Head */}
          <motion.div
            style={{ top: cometY }}
            className="absolute left-6 md:left-1/2 w-3 h-12 bg-white -translate-x-1/2 -translate-y-full blur-[1px] shadow-[0_0_20px_5px_rgba(255,255,255,0.8)] z-10"
          />

          {/* Steps */}
          <div className="flex flex-col gap-24 md:gap-40 relative z-20">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0 flex flex-col group cursor-default relative">
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20%" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`
                        relative z-10 bg-transparent p-0 lg:p-4
                        transition-all duration-500 group-hover:-translate-y-2
                        ${isEven ? "md:text-right" : "md:text-left"}
                      `}
                    >
                      <span className="text-white/40 font-mono text-xs tracking-[0.3em] font-bold mb-4 block uppercase">Phase {step.num}</span>
                      <h4 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6 group-hover:text-white/70 transition-colors duration-500 tracking-tight">
                        {step.title}
                      </h4>
                      <p className="text-white/60 leading-relaxed text-lg lg:text-xl">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Central Node (Activation Ring) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center mt-6 md:mt-0">
                    {/* The Core Node */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0, backgroundColor: "#000000", borderColor: "rgba(255,255,255,0.1)" }}
                      whileInView={{ 
                        scale: [0, 1.2, 1], 
                        opacity: 1, 
                        backgroundColor: ["#ffffff", "#ffffff"],
                        borderColor: ["rgba(255,255,255,1)", "rgba(255,255,255,1)"] 
                      }}
                      viewport={{ once: true, margin: "-50%" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-4 h-4 md:w-6 md:h-6 rounded-none rotate-45 border-2 z-30 relative"
                    />
                    
                    {/* The Explosive Ripple */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [1, 4], opacity: [1, 0] }}
                      viewport={{ once: true, margin: "-50%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="absolute w-4 h-4 md:w-6 md:h-6 rounded-none rotate-45 bg-white z-20 pointer-events-none"
                    />
                  </div>

                  {/* Empty Spacer to push the card to one side */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
