"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, X } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useState } from "react";

export default function Contact() {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  return (
    <section id="contact" className="py-16 md:py-32 bg-[#ffffff] relative overflow-hidden border-t border-black/10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Desktop Animated Header */}
        <div className="hidden md:block mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3c3c43] dark:text-white/70 mb-6 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-black/20" />
            Initiate Project
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl lg:text-[9rem] font-display font-bold text-[#1d1d1f] dark:text-white leading-[0.9] tracking-tight md:tracking-tighter"
          >
            LET'S <br /> COLLABORATE.
          </motion.h2>
        </div>

        {/* Mobile Animated Header */}
        <div className="md:hidden mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3c3c43] dark:text-white/70 mb-6 flex items-center gap-4"
          >
            <div className="w-8 h-px bg-black/20" />
            Initiate Project
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-display font-bold text-[#1d1d1f] dark:text-white leading-[0.9] tracking-tight"
          >
            LET'S <br /> COLLABORATE.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1">
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3c3c43] dark:text-white/70 mb-4">Direct Inquiry</h4>
                <a href="mailto:info@wedigitlize.com" className="text-2xl md:text-3xl font-display font-medium text-[#1d1d1f] dark:text-white hover:text-black/50 dark:hover:text-white/50 transition-colors">
                  info@wedigitlize.com
                </a>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3c3c43] dark:text-white/70 mb-4">Global Headquarters</h4>
                <p className="text-xl font-medium text-[#1d1d1f] dark:text-white">
                  Remote / Distributed<br/>
                  Worldwide
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3c3c43] dark:text-white/70 mb-4">Socials</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Twitter / X', href: '#', icon: FaXTwitter },
                    { name: 'LinkedIn', href: '#', icon: FaLinkedin },
                    { name: 'Instagram', href: 'https://www.instagram.com/wedigitlize', icon: FaInstagram }
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#1d1d1f] dark:text-white hover:text-black/50 dark:hover:text-white/50 transition-colors flex items-center gap-3 group w-max">
                        <Icon className="w-5 h-5 text-[#1d1d1f] dark:text-white group-hover:text-black/50 dark:hover:text-white/50 transition-colors" />
                        {social.name} <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Form Column - Animated for Desktop */}
          <div className="hidden md:block lg:col-span-8 order-1 lg:order-2">
            <motion.form 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="space-y-12" 
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] dark:text-white placeholder-transparent focus:outline-none focus:border-black peer transition-colors"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] dark:text-white/70 transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 dark:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f] dark:text-white">
                    What is your name?
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] dark:text-white placeholder-transparent focus:outline-none focus:border-black peer transition-colors"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] dark:text-white/70 transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 dark:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f] dark:text-white">
                    What is your email?
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  id="company"
                  className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] dark:text-white placeholder-transparent focus:outline-none focus:border-black peer transition-colors"
                  placeholder="Company"
                />
                <label htmlFor="company" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] dark:text-white/70 transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 dark:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f] dark:text-white">
                  Company / Organization (Optional)
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] dark:text-white placeholder-transparent focus:outline-none focus:border-black peer transition-colors resize-none"
                  placeholder="Message"
                />
                <label htmlFor="message" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] dark:text-white/70 transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 dark:text-white/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f] dark:text-white">
                  Tell us about your project
                </label>
              </div>

              <button className="w-full md:w-auto mt-8 px-12 py-6 bg-[#1d1d1f] dark:bg-white text-white dark:text-black font-bold tracking-widest uppercase text-sm hover:bg-background transition-colors duration-1000 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-4 group">
                Submit Inquiry
                <div className="w-8 h-px bg-white dark:bg-black group-hover:w-12 transition-all" />
              </button>
            </motion.form>
          </div>

          {/* Form Column - Ultra Compact Mobile Drawer */}
          <div className="md:hidden lg:col-span-8 order-1 lg:order-2 flex flex-col items-center">
            
            <AnimatePresence mode="wait">
              {!isMobileFormOpen ? (
                <motion.button
                  key="open-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileFormOpen(true)}
                  className="w-full max-w-[300px] bg-[#1d1d1f] dark:bg-white text-white dark:text-black rounded-full py-5 flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.15)] mt-8 relative overflow-hidden group border border-black/10"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-black/20 dark:bg-white/20 rounded-full blur-xl pointer-events-none"
                  />
                  <MessageSquare size={18} className="text-black dark:text-white relative z-10" />
                  <span className="font-bold text-sm tracking-widest uppercase relative z-10">Start a Project</span>
                </motion.button>
              ) : (
                <motion.form 
                  key="contact-form"
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full bg-card rounded-[2.5rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col gap-6 mt-8 relative overflow-hidden" 
                  onSubmit={(e) => { e.preventDefault(); setIsMobileFormOpen(false); }}
                >
                  <button 
                    type="button"
                    onClick={() => setIsMobileFormOpen(false)}
                    className="absolute top-6 right-6 w-8 h-8 bg-background transition-colors duration-1000 rounded-full flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 transition-colors"
                  >
                    <X size={16} />
                  </button>
                  
                  <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-white mb-2 tracking-tight pr-10">Let's build something.</h3>
                  
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-background transition-colors duration-1000 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium text-[#1d1d1f] dark:text-white placeholder-[#8a8d91] focus:outline-none focus:bg-card focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all"
                        placeholder="Your Name"
                      />
                    </div>

                    <div className="relative">
                      <input 
                        type="email" 
                        required
                        className="w-full bg-background transition-colors duration-1000 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium text-[#1d1d1f] dark:text-white placeholder-[#8a8d91] focus:outline-none focus:bg-card focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all"
                        placeholder="Email Address"
                      />
                    </div>

                    <div className="relative">
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-background transition-colors duration-1000 border border-transparent rounded-2xl px-5 py-4 text-sm font-medium text-[#1d1d1f] dark:text-white placeholder-[#8a8d91] focus:outline-none focus:bg-card focus:border-[#007AFF] focus:ring-4 focus:ring-[#007AFF]/10 transition-all resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                  </div>

                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full mt-2 px-8 py-4 bg-[#007AFF] text-black dark:text-white font-bold text-sm rounded-2xl shadow-[0_10px_20px_rgba(0,122,255,0.2)] flex items-center justify-center gap-3"
                  >
                    Send Message <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
