"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Network } from "lucide-react";

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this massive container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll (0 to 1) into horizontal translation (0% to -75%)
  // We use -75% because we have 4 distinct "slides" occupying 100vw each.
  // Translating by -75% slides exactly to the beginning of the 4th slide.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    // The massive height container that enables long scrolling
    <section ref={targetRef} id="about" className="relative h-[400vh] bg-[#0a0a0a]">
      
      {/* The sticky viewport container that locks the screen */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background ambient glow that persists through the scroll */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[200px] rounded-full pointer-events-none" />

        {/* The horizontal moving track */}
        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center relative z-10 px-[10vw]">
          
          {/* Slide 1: Introduction */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center pr-10 md:pr-40 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 text-white/60 text-xs font-bold mb-10 border border-white/10 uppercase tracking-widest w-max shadow-[0_0_20px_rgba(0,0,0,0.05)]"
            >
              About The Agency
            </motion.div>
            
            <h3 className="text-5xl md:text-8xl lg:text-[7rem] font-display font-bold text-white mb-8 leading-[1.1]">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="block"
              >
                We don't build
              </motion.span>
              <span className="relative inline-block mt-2">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-black/20"
                >
                  websites.
                </motion.span>
                {/* Aggressive Strikethrough Line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.4, ease: "circOut" }}
                  className="absolute top-1/2 left-[-5%] right-[-5%] h-[8px] md:h-[12px] bg-[#1d1d1f] origin-left -translate-y-1/2 rotate-[-2deg]"
                />
              </span>
            </h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-2xl md:text-4xl text-white max-w-4xl leading-tight font-medium"
            >
              We engineer entire <span className="font-bold underline decoration-[3px] underline-offset-8">digital ecosystems.</span> From raw infrastructure to stunning user interfaces.
            </motion.p>
          </div>

          {/* Slide 2: Bespoke Architecture */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pr-10 md:pr-40">
            <div className="w-full lg:w-1/2">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <Cpu size={40} className="text-white" />
              </div>
              <h3 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                Bespoke <br/> <span className="text-white">Architecture.</span>
              </h3>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed">
                We completely abandon clunky templates and generic platforms. Every system we build is architected from the ground up to solve your specific scaling bottlenecks.
              </p>
            </div>
            {/* Visual Graphic: Architecture Network */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] bg-[#0a0a0a] rounded-[3rem] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden relative flex items-center justify-center group">
               {/* Dot Grid Background */}
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1d1d1f_1px,transparent_1px),linear-gradient(to_bottom,#1d1d1f_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
               
               {/* Concentric rotating rings */}
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] lg:w-[70%] aspect-square border border-white/10 rounded-full border-dashed" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] lg:w-[50%] aspect-square border border-black/15 rounded-full" />
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[40%] lg:w-[30%] aspect-square border-t border-b border-white/20 rounded-full" />
               
               {/* Center Node */}
               <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-[#0a0a0a] rounded-xl border border-white/20 flex items-center justify-center shadow-xl rotate-45 z-10 group-hover:scale-110 transition-transform duration-500">
                 <div className="w-6 h-6 lg:w-8 lg:h-8 bg-[#1d1d1f] rounded-lg animate-pulse -rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                   <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full" />
                 </div>
               </div>

               {/* Satellite Nodes */}
               {[0, 90, 180, 270].map((deg, i) => (
                 <motion.div 
                   key={i}
                   className="absolute w-6 h-6 lg:w-8 lg:h-8 bg-white border border-white/10 rounded-full shadow-lg z-20"
                   initial={{ rotate: deg, x: 100 }}
                   animate={{ rotate: deg + 360, x: 100 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   style={{ transformOrigin: "0 0" }} // Make them orbit the center
                 >
                   <div className="w-full h-full flex items-center justify-center">
                     <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[#1d1d1f]/50 rounded-full" />
                   </div>
                 </motion.div>
               ))}
               
               {/* Scanner line */}
               <motion.div 
                 initial={{ top: "-10%" }}
                 animate={{ top: "110%" }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#1d1d1f]/30 to-transparent shadow-[0_0_15px_rgba(0,0,0,0.2)] z-30"
               />
            </div>
          </div>

          {/* Slide 3: Rapid Execution */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pr-10 md:pr-40">
            <div className="w-full lg:w-1/2">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <Code2 size={40} className="text-white" />
              </div>
              <h3 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                Rapid <br/> Execution.
              </h3>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed">
                Time is money. Our agile methodologies and proprietary codebase allow us to execute complex SaaS builds and enterprise sites in a fraction of the traditional timeline.
              </p>
            </div>
            {/* Visual Graphic: Code Execution Terminal */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] bg-[#1d1d1f] rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex flex-col p-6 md:p-10 relative overflow-hidden text-white font-mono text-xs md:text-sm border border-black">
                
                {/* Window Controls */}
                <div className="flex gap-2 mb-6 opacity-50 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>

                {/* Code Scroll */}
                <div className="flex-1 overflow-hidden relative z-10" style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}>
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: "-50%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 top-0 flex flex-col gap-3 text-white/40"
                  >
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="opacity-30 shrink-0">{(101 + i).toString()}</span>
                        <span className="truncate">
                          {i % 4 === 0 ? "import { injectEngine } from '@core/automation';" : 
                           i % 4 === 1 ? "await system.compile({ target: 'production' });" :
                           i % 4 === 2 ? "const process = new ParallelThread(1024);" :
                           "return Response.json({ status: 200, latency: '12ms' });"}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </div>
                
                {/* Bottom Status Bar */}
                <div className="mt-4 pt-6 border-t border-white/10 relative z-10">
                  <div className="text-white/60 mb-3 font-bold tracking-widest text-[10px]">DEPLOYMENT PROTOCOL</div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                    />
                  </div>
                  <div className="flex justify-between font-bold text-[10px] uppercase tracking-widest">
                    <motion.span 
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-white flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      SYS_READY
                    </motion.span>
                    <span className="text-white/40">100% SECURE</span>
                  </div>
                </div>
            </div>
          </div>

          {/* Slide 4: Data Driven */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pr-10 md:pr-40">
            <div className="w-full lg:w-1/2">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-lg">
                <Network size={40} className="text-white/80" />
              </div>
              <h3 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                Data-Driven <br/> Decisions.
              </h3>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed">
                We don't guess. We integrate deep analytics and telemetry into every platform, ensuring every design and engineering decision is backed by cold, hard data.
              </p>
            </div>
            {/* Visual Graphic: Data Dashboard */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] bg-[#0a0a0a] rounded-[3rem] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between group">
               
               {/* Header */}
               <div className="flex justify-between items-center mb-8 relative z-10">
                 <div>
                   <div className="text-[10px] font-bold tracking-widest uppercase text-white/60 mb-1">Real-time Telemetry</div>
                   <div className="text-4xl md:text-5xl font-display font-bold text-white flex items-baseline gap-2">
                     +240<span className="text-2xl text-white/60">.5%</span>
                   </div>
                 </div>
                 <div className="w-12 h-12 rounded-full border-[3px] border-[#1d1d1f]/10 border-t-[#1d1d1f] flex items-center justify-center relative animate-spin duration-3000">
                    <div className="w-2 h-2 bg-[#1d1d1f] rounded-full absolute top-[-2.5px] left-1/2 -translate-x-1/2" />
                 </div>
               </div>

               {/* Line Chart */}
               <div className="flex-1 relative w-full h-full flex items-end">
                 {/* Grid lines */}
                 <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                   {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-[#1d1d1f]" />)}
                 </div>
                 
                 {/* Animated SVG Line */}
                 <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full absolute inset-0 drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] overflow-visible">
                   {/* Gradient Fill under line */}
                   <motion.path 
                     d="M 0 50 L 0 40 Q 20 40, 40 20 T 70 25 T 100 5 L 100 50 Z"
                     fill="url(#chartGradient)"
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     viewport={{ once: false, margin: "-100px" }}
                     transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                   />
                   
                   <motion.path 
                     d="M 0 40 Q 20 40, 40 20 T 70 25 T 100 5"
                     fill="none"
                     stroke="#1d1d1f"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     initial={{ pathLength: 0, opacity: 0 }}
                     whileInView={{ pathLength: 1, opacity: 1 }}
                     viewport={{ once: false, margin: "-100px" }}
                     transition={{ duration: 1.5, ease: "easeInOut" }}
                   />
                   
                   {/* Data points */}
                   <motion.circle cx="40" cy="20" r="1.5" fill="#ffffff" stroke="#1d1d1f" strokeWidth="0.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.6 }} />
                   <motion.circle cx="70" cy="25" r="1.5" fill="#ffffff" stroke="#1d1d1f" strokeWidth="0.5" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.0 }} />
                   <motion.circle cx="100" cy="5" r="2" fill="#1d1d1f" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5 }} />

                   <defs>
                     <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                       <stop offset="0%" stopColor="#1d1d1f" stopOpacity="0.1" />
                       <stop offset="100%" stopColor="#1d1d1f" stopOpacity="0" />
                     </linearGradient>
                   </defs>
                 </svg>
               </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
