"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Cpu, Network } from "lucide-react";

export default function About() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this massive container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Transform vertical scroll (0 to 1) into horizontal translation (0% to -75%)
  // We use -75% because we have 4 distinct "slides" occupying 100vw each.
  // Translating by -75% slides exactly to the beginning of the 4th slide.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="about" className="relative bg-[#f5f5f7] dark:bg-[#0a0a0a]">
      
      {/* =========================================
          DESKTOP LAYOUT (Horizontal Scroll Automation)
          ========================================= */}
      <div ref={targetRef} className="hidden md:block relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          {/* Background ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/10 dark:bg-white/10 blur-[200px] rounded-full pointer-events-none" />

          {/* The horizontal moving track */}
          <motion.div style={{ x }} className="flex w-[400vw] h-full items-center relative z-10">
            
            {/* Slide 1: Introduction */}
            <div className="w-[100vw] h-full flex-shrink-0 flex flex-col justify-center px-[5vw] lg:px-[10vw] relative overflow-hidden">
              <div className="max-w-7xl mx-auto w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 text-xs font-bold mb-10 border border-black/15 dark:border-white/15 uppercase tracking-widest w-max shadow-[0_0_20px_rgba(0,0,0,0.05)]"
              >
                About The Agency
              </motion.div>
              
              <h3 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-black dark:text-white mb-6 md:mb-8 leading-[1.05]">
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
                    className="text-black/70 dark:text-white/70"
                  >
                    websites.
                  </motion.span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 0.4, ease: "circOut" }}
                    className="absolute top-1/2 left-[-5%] right-[-5%] h-[8px] md:h-[12px] bg-white dark:bg-[#161a22] origin-left -translate-y-1/2 rotate-[-2deg]"
                  />
                </span>
              </h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-lg md:text-2xl lg:text-3xl text-black dark:text-white max-w-4xl leading-tight font-medium"
              >
                We engineer entire <span className="font-bold underline decoration-2 md:decoration-[3px] underline-offset-4 md:underline-offset-8">digital ecosystems.</span> From raw infrastructure to stunning user interfaces.
              </motion.p>
              </div>
            </div>

            {/* Slide 2: Bespoke Architecture */}
            <div className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center px-[5vw] lg:px-[10vw]">
              <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="w-full lg:w-1/2">
                <div className="w-20 h-20 rounded-3xl bg-black/10 dark:bg-white/10 flex items-center justify-center mb-8 border border-black/20 dark:border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                  <Cpu size={40} className="text-black dark:text-white" />
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-black dark:text-white mb-6 leading-[1.1]">
                  Bespoke <br/> <span className="text-black dark:text-white">Architecture.</span>
                </h3>
                <p className="text-base md:text-xl text-black/80 dark:text-white/80 max-w-xl leading-relaxed">
                  We completely abandon clunky templates and generic platforms. Every system we build is architected from the ground up to solve your specific scaling bottlenecks.
                </p>
              </div>
              <div className="w-full lg:w-1/2 h-[35vh] lg:h-[50vh] bg-[#f5f5f7] dark:bg-[#0a0a0a] rounded-[3rem] border border-black/15 dark:border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden relative flex items-center justify-center group shrink-0">
                 {/* Grid Pattern with solid opacity instead of gradient mask */}
                 <div 
                   className="absolute inset-0 opacity-10 bg-[size:2rem_2rem]" 
                   style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgMGg0MHYxSDB6TTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI5LCAyOSwgMzEsIDEpIi8+PC9zdmc+')" }}
                 />
                 
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] lg:w-[70%] aspect-square border border-black/15 dark:border-white/15 rounded-full border-dashed" />
                 <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[60%] lg:w-[50%] aspect-square border border-black/15 dark:border-white/15 rounded-full" />
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[40%] lg:w-[30%] aspect-square border-t border-b border-black/20 dark:border-white/20 rounded-full" />
                 
                 <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-[#f5f5f7] dark:bg-[#0a0a0a] rounded-xl border border-black/20 dark:border-white/20 flex items-center justify-center shadow-xl rotate-45 z-10 group-hover:scale-110 transition-transform duration-500">
                   <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white dark:bg-[#161a22] rounded-lg animate-pulse -rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                     <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white dark:bg-[#161a22] rounded-full" />
                   </div>
                 </div>

                 {[0, 90, 180, 270].map((deg, i) => (
                   <motion.div 
                     key={i}
                     className="absolute w-6 h-6 lg:w-8 lg:h-8 bg-white dark:bg-[#161a22] border border-black/15 dark:border-white/15 rounded-full shadow-lg z-20"
                     initial={{ rotate: deg, x: 100 }}
                     animate={{ rotate: deg + 360, x: 100 }}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     style={{ transformOrigin: "0 0" }}
                   >
                     <div className="w-full h-full flex items-center justify-center">
                       <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-black/50 rounded-full" />
                     </div>
                   </motion.div>
                 ))}
                 
                 <motion.div 
                   initial={{ top: "-10%" }}
                   className="absolute left-0 right-0 h-[1px] bg-white/30 z-30"
                 />
              </div>
              </div>
            </div>

            {/* Slide 3: Rapid Execution */}
            <div className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center px-[5vw] lg:px-[10vw]">
              <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="w-full lg:w-1/2">
                <div className="w-20 h-20 rounded-3xl bg-black/10 dark:bg-white/10 flex items-center justify-center mb-8 border border-black/20 dark:border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                  <Code2 size={40} className="text-black dark:text-white" />
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-black dark:text-white mb-6 leading-[1.1]">
                  Rapid <br/> Execution.
                </h3>
                <p className="text-base md:text-xl text-black/80 dark:text-white/80 max-w-xl leading-relaxed">
                  Time is money. Our agile methodologies and proprietary codebase allow us to execute complex SaaS builds and enterprise sites in a fraction of the traditional timeline.
                </p>
              </div>
              <div className="w-full lg:w-1/2 h-[35vh] lg:h-[50vh] bg-white dark:bg-[#161a22] rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex flex-col p-6 md:p-10 relative overflow-hidden text-black dark:text-white font-mono text-xs md:text-sm border border-black dark:border-white/20 shrink-0">
                  <div className="flex gap-2 mb-6 opacity-50 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-black/10 dark:bg-white/10" />
                  </div>

                  <div className="flex-1 overflow-hidden relative z-10 opacity-70">
                    <motion.div 
                      initial={{ y: 0 }}
                      animate={{ y: "-50%" }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 top-0 flex flex-col gap-3 text-black/80 dark:text-white/80"
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
                  
                  <div className="mt-4 pt-6 border-t border-black/15 dark:border-white/15 relative z-10">
                    <div className="text-black/80 dark:text-white/80 mb-3 font-bold tracking-widest text-[10px]">DEPLOYMENT PROTOCOL</div>
                    <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-4 relative">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-white dark:bg-[#161a22] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, ease: "circOut", repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                    <div className="flex justify-between font-bold text-[10px] uppercase tracking-widest">
                      <motion.span 
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-black dark:text-white flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-white dark:bg-[#161a22] shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        SYS_READY
                      </motion.span>
                      <span className="text-black/80 dark:text-white/80">100% SECURE</span>
                    </div>
                  </div>
              </div>
              </div>
            </div>

            {/* Slide 4: Data Driven */}
            <div className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center px-[5vw] lg:px-[10vw]">
              <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div className="w-full lg:w-1/2">
                <div className="w-20 h-20 rounded-3xl bg-black/10 dark:bg-white/10 flex items-center justify-center mb-8 border border-black/15 dark:border-white/15 shadow-lg">
                  <Network size={40} className="text-black/80 dark:text-white/80" />
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-black dark:text-white mb-6 leading-[1.1]">
                  Data-Driven <br/> Decisions.
                </h3>
                <p className="text-base md:text-xl text-black/80 dark:text-white/80 max-w-xl leading-relaxed">
                  We don't guess. We integrate deep analytics and telemetry into every platform, ensuring every design and engineering decision is backed by cold, hard data.
                </p>
              </div>
              <div className="w-full lg:w-1/2 h-[35vh] lg:h-[50vh] bg-[#f5f5f7] dark:bg-[#0a0a0a] rounded-[3rem] border border-black/15 dark:border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.1)] p-6 md:p-10 relative overflow-hidden flex flex-col justify-between group shrink-0">
                 <div className="flex justify-between items-center mb-8 relative z-10">
                   <div>
                     <div className="text-[10px] font-bold tracking-widest uppercase text-black/80 dark:text-white/80 mb-1">Real-time Telemetry</div>
                     <div className="text-4xl md:text-5xl font-display font-bold text-black dark:text-white flex items-baseline gap-2">
                       +240<span className="text-2xl text-black/80 dark:text-white/80">.5%</span>
                     </div>
                   </div>
                   <div className="w-12 h-12 rounded-full border-[3px] border-[#1d1d1f]/10 border-t-[#1d1d1f] flex items-center justify-center relative animate-spin duration-3000">
                      <div className="w-2 h-2 bg-white dark:bg-[#161a22] rounded-full absolute top-[-2.5px] left-1/2 -translate-x-1/2" />
                   </div>
                 </div>

                 <div className="flex-1 relative w-full h-full flex items-end">
                   <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                     {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white dark:bg-[#161a22]" />)}
                   </div>
                   
                   <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full absolute inset-0 drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] overflow-visible">
                     <motion.path 
                       d="M 0 50 L 0 40 Q 20 40, 40 20 T 70 25 T 100 5 L 100 50 Z"
                       fill="#1d1d1f"
                       fillOpacity="0.1"
                       animate={{ opacity: [0.3, 0.8, 0.3] }}
                       transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                     />
                     
                     <motion.path 
                       d="M 0 40 Q 20 40, 40 20 T 70 25 T 100 5"
                       fill="none"
                       stroke="#1d1d1f"
                       strokeWidth="1.5"
                       strokeLinecap="round"
                     />
                     
                     <motion.circle cx="40" cy="20" r="1.5" fill="#ffffff" stroke="#1d1d1f" strokeWidth="0.5" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                     <motion.circle cx="70" cy="25" r="1.5" fill="#ffffff" stroke="#1d1d1f" strokeWidth="0.5" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }} />
                     <motion.circle cx="100" cy="5" r="2" fill="#1d1d1f" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
                   </svg>
                 </div>
              </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* =========================================
          MOBILE NATIVE APP LAYOUT (Light Mode + Animated)
          ========================================= */}
      <div className="md:hidden w-full py-16 relative z-10 overflow-hidden bg-[#f5f5f7] dark:bg-[#0a0a0a]">
        
        <div className="px-6 mb-8 flex justify-center">
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#161a22] text-black/80 dark:text-white/80 text-[10px] font-bold border border-black/15 dark:border-white/15 uppercase tracking-widest w-max shadow-sm"
          >
            About The Agency
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-12 w-full gap-4 items-stretch" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
          
          {/* Slide 1: Introduction */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="w-[85vw] max-w-[340px] shrink-0 snap-center flex flex-col bg-white dark:bg-[#161a22] rounded-[2rem] p-8 border border-black/15 dark:border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.06)] justify-center relative overflow-hidden group"
          >
            {/* Animated subtle gradient orb */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
            />
            
            <h3 className="text-4xl leading-tight font-display font-bold text-[#1d1d1f] mb-6 relative z-10">
              <span className="block">We don't build</span>
              <span className="relative inline-block mt-1">
                <span className="text-black/70 dark:text-white/70">websites.</span>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "circOut" }}
                  className="absolute top-1/2 left-[-5%] right-[-5%] h-[4px] bg-[#007AFF] origin-left -translate-y-1/2 rotate-[-2deg]" 
                />
              </span>
            </h3>
            
            <p className="text-base text-[#3c3c43] max-w-sm leading-relaxed font-medium relative z-10">
              We engineer entire <span className="font-bold underline decoration-2 underline-offset-4 decoration-[#007AFF] text-[#1d1d1f]">digital ecosystems.</span> From raw infrastructure to stunning user interfaces.
            </p>
          </motion.div>

          {/* Slide 2: Bespoke Architecture */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="w-[85vw] max-w-[340px] shrink-0 snap-center flex flex-col bg-white dark:bg-[#161a22] rounded-[2rem] p-8 border border-black/15 dark:border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.06)] justify-center relative overflow-hidden"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"
            />

            <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0a] flex items-center justify-center mb-6 border border-black/15 dark:border-white/15 relative z-10">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <Cpu size={24} className="text-[#1d1d1f]" />
              </motion.div>
            </div>
            <h3 className="text-3xl font-display font-bold text-[#1d1d1f] mb-4 leading-tight relative z-10">
              Bespoke <br/> Architecture.
            </h3>
            <p className="text-sm text-[#3c3c43] leading-relaxed mb-6 relative z-10">
              We completely abandon clunky templates and generic platforms. Every system we build is architected from the ground up to solve your specific scaling bottlenecks.
            </p>
            
            <div className="w-full h-24 bg-[#f5f5f7] dark:bg-[#0a0a0a] rounded-xl border border-black/15 dark:border-white/15 relative flex items-center justify-center overflow-hidden z-10">
               {/* Animated rings */}
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[80%] aspect-square border border-black/20 dark:border-white/20 rounded-full border-dashed" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[50%] aspect-square border border-black/15 dark:border-white/15 rounded-full" />
               <div className="relative w-8 h-8 bg-white dark:bg-[#161a22] rounded-lg border border-black/20 dark:border-white/20 flex items-center justify-center rotate-45 z-10 shadow-sm">
                 <div className="w-2 h-2 bg-[#007AFF] rounded-full animate-pulse" />
               </div>
            </div>
          </motion.div>

          {/* Slide 3: Rapid Execution */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="w-[85vw] max-w-[340px] shrink-0 snap-center flex flex-col bg-white dark:bg-[#161a22] rounded-[2rem] p-8 border border-black/15 dark:border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.06)] justify-center relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0a] flex items-center justify-center mb-6 border border-black/15 dark:border-white/15">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <Code2 size={24} className="text-[#1d1d1f]" />
              </motion.div>
            </div>
            <h3 className="text-3xl font-display font-bold text-[#1d1d1f] mb-4 leading-tight">
              Rapid <br/> Execution.
            </h3>
            <p className="text-sm text-[#3c3c43] leading-relaxed">
              Time is money. Our agile methodologies and proprietary codebase allow us to execute complex SaaS builds and enterprise sites in a fraction of the traditional timeline.
            </p>
          </motion.div>

          {/* Slide 4: Data Driven */}
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="w-[85vw] max-w-[340px] shrink-0 snap-center flex flex-col bg-white dark:bg-[#161a22] rounded-[2rem] p-8 border border-black/15 dark:border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.06)] justify-center relative overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#f5f5f7] dark:bg-[#0a0a0a] flex items-center justify-center mb-6 border border-black/15 dark:border-white/15">
              <Network size={24} className="text-[#1d1d1f]" />
            </div>
            <h3 className="text-3xl font-display font-bold text-[#1d1d1f] mb-4 leading-tight">
              Data-Driven <br/> Decisions.
            </h3>
            <p className="text-sm text-[#3c3c43] leading-relaxed">
              We don't guess. We integrate deep analytics and telemetry into every platform, ensuring every design and engineering decision is backed by cold, hard data.
            </p>
          </motion.div>

        </div>

        {/* Animated Scroll Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-2">
           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-black/40" />
           <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10" />
           <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10" />
           <div className="w-1.5 h-1.5 rounded-full bg-black/10 dark:bg-white/10" />
        </div>

      </div>
    </section>
  );
}
