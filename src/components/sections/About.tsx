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
    <section ref={targetRef} id="about" className="relative h-[400vh] bg-[#f5f5f7]">
      
      {/* The sticky viewport container that locks the screen */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background ambient glow that persists through the scroll */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/5 blur-[200px] rounded-full pointer-events-none" />

        {/* The horizontal moving track */}
        <motion.div style={{ x }} className="flex w-[400vw] h-full items-center relative z-10 px-[10vw]">
          
          {/* Slide 1: Introduction */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col justify-center pr-20 md:pr-40 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/5 text-[#3c3c43] text-xs font-bold mb-10 border border-black/10 uppercase tracking-widest w-max shadow-[0_0_20px_rgba(0,0,0,0.05)]"
            >
              About The Agency
            </motion.div>
            
            <h3 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold text-[#1d1d1f] mb-8 leading-[1.1]">
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
              className="text-2xl md:text-4xl text-[#1d1d1f] max-w-4xl leading-tight font-medium"
            >
              We engineer entire <span className="font-bold underline decoration-[3px] underline-offset-8">digital ecosystems.</span> From raw infrastructure to stunning user interfaces.
            </motion.p>
          </div>

          {/* Slide 2: Bespoke Architecture */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pr-20 md:pr-40">
            <div className="w-full lg:w-1/2">
              <div className="w-20 h-20 rounded-3xl bg-black/5 flex items-center justify-center mb-8 border border-black/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <Cpu size={40} className="text-[#1d1d1f]" />
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-bold text-[#1d1d1f] mb-8 leading-[1.1]">
                Bespoke <br/> <span className="text-[#1d1d1f]">Architecture.</span>
              </h3>
              <p className="text-xl md:text-2xl text-[#3c3c43] max-w-xl leading-relaxed">
                We completely abandon clunky templates and generic platforms. Every system we build is architected from the ground up to solve your specific scaling bottlenecks.
              </p>
            </div>
            {/* Visual Graphic */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] bg-[#ffffff] rounded-[3rem] border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden relative flex items-center justify-center">
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0066cc_1px,transparent_1px),linear-gradient(to_bottom,#0066cc_1px,transparent_1px)] bg-[size:4rem_4rem]" />
               <div className="absolute w-[80%] h-[80%] border border-black/20 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute w-[60%] h-[60%] border-t border-r border-black/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               <div className="w-24 h-24 bg-[#f5f5f7] rounded-full border border-black/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)] z-10">
                 <div className="w-8 h-8 bg-primary rounded-full animate-pulse blur-sm" />
               </div>
            </div>
          </div>

          {/* Slide 3: Rapid Execution */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pr-20 md:pr-40">
            <div className="w-full lg:w-1/2">
              <div className="w-20 h-20 rounded-3xl bg-black/5 flex items-center justify-center mb-8 border border-black/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                <Code2 size={40} className="text-[#1d1d1f]" />
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-bold text-[#1d1d1f] mb-8 leading-[1.1]">
                Rapid <br/> Execution.
              </h3>
              <p className="text-xl md:text-2xl text-[#3c3c43] max-w-xl leading-relaxed">
                Time is money. Our agile methodologies and proprietary codebase allow us to execute complex SaaS builds and enterprise sites in a fraction of the traditional timeline.
              </p>
            </div>
            {/* Visual Graphic */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] bg-white rounded-[3rem] border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col justify-center p-12 relative overflow-hidden">
                <div className="text-[#3c3c43] font-mono text-sm mb-4">system.compile()</div>
                <div className="w-full h-6 bg-[#f5f5f7] rounded-full overflow-hidden mb-6 border border-black/10 shadow-inner relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#1d1d1f]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between font-mono text-sm font-bold">
                  <span className="text-[#3c3c43]">Injecting dependencies...</span>
                  <span className="text-[#1d1d1f]">100% OK</span>
                </div>
            </div>
          </div>

          {/* Slide 4: Data Driven */}
          <div className="w-[100vw] flex-shrink-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 pr-20 md:pr-40">
            <div className="w-full lg:w-1/2">
              <div className="w-20 h-20 rounded-3xl bg-black/5 flex items-center justify-center mb-8 border border-black/10 shadow-lg">
                <Network size={40} className="text-[#1d1d1f]/80" />
              </div>
              <h3 className="text-5xl md:text-7xl font-display font-bold text-[#1d1d1f] mb-8 leading-[1.1]">
                Data-Driven <br/> Decisions.
              </h3>
              <p className="text-xl md:text-2xl text-[#3c3c43] max-w-xl leading-relaxed">
                We don't guess. We integrate deep analytics and telemetry into every platform, ensuring every design and engineering decision is backed by cold, hard data.
              </p>
            </div>
            {/* Visual Graphic */}
            <div className="w-full lg:w-1/2 h-[40vh] lg:h-[60vh] bg-[#ffffff] rounded-[3rem] border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-end justify-center gap-4 p-12 lg:p-20 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-50" />
               {[40, 70, 50, 90, 60, 100, 80].map((h, i) => (
                 <motion.div 
                   key={i}
                   className="flex-1 bg-black/5 rounded-t-xl border-t-2 border-black/20 relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.1)]"
                   initial={{ height: 0 }}
                   whileInView={{ height: `${h}%` }}
                   viewport={{ once: false, margin: "-100px" }}
                   transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                 >
                   <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent" />
                 </motion.div>
               ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
