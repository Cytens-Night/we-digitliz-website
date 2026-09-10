"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-32 bg-[#ffffff] relative overflow-hidden border-t border-black/10">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Huge Brutalist Header */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3c3c43] mb-6 flex items-center gap-4"
          >
            <div className="w-12 h-px bg-black/20" />
            Initiate Project
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl lg:text-[9rem] font-display font-bold text-[#1d1d1f] leading-[0.9] tracking-tight md:tracking-tighter"
          >
            LET'S <br /> COLLABORATE.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-4 flex flex-col justify-between order-2 lg:order-1">
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3c3c43] mb-4">Direct Inquiry</h4>
                <a href="mailto:info@wedigitlize.com" className="text-2xl md:text-3xl font-display font-medium text-[#1d1d1f] hover:text-black/50 transition-colors">
                  info@wedigitlize.com
                </a>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3c3c43] mb-4">Global Headquarters</h4>
                <p className="text-xl font-medium text-[#1d1d1f]">
                  Remote / Distributed<br/>
                  Worldwide
                </p>
              </div>

              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3c3c43] mb-4">Socials</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { name: 'Twitter / X', href: '#' },
                    { name: 'LinkedIn', href: '#' },
                    { name: 'Instagram', href: 'https://www.instagram.com/wedigitlize' }
                  ].map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#1d1d1f] hover:text-black/50 transition-colors flex items-center gap-2 group w-max">
                      {social.name} <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Form Column */}
          <div className="lg:col-span-8 order-1 lg:order-2">
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
                    className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] placeholder-transparent focus:outline-none focus:border-black peer transition-colors"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f]">
                    What is your name?
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] placeholder-transparent focus:outline-none focus:border-black peer transition-colors"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f]">
                    What is your email?
                  </label>
                </div>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  id="company"
                  className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] placeholder-transparent focus:outline-none focus:border-black peer transition-colors"
                  placeholder="Company"
                />
                <label htmlFor="company" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f]">
                  Company / Organization (Optional)
                </label>
              </div>

              <div className="relative group">
                <textarea 
                  id="message"
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-black/20 py-4 text-xl md:text-3xl font-display text-[#1d1d1f] placeholder-transparent focus:outline-none focus:border-black peer transition-colors resize-none"
                  placeholder="Message"
                />
                <label htmlFor="message" className="absolute left-0 -top-6 text-[10px] font-bold tracking-widest uppercase text-[#3c3c43] transition-all peer-placeholder-shown:text-base md:peer-placeholder-shown:text-xl peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-4 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:text-[#1d1d1f]">
                  Tell us about your project
                </label>
              </div>

              <button className="w-full md:w-auto mt-8 px-12 py-6 bg-[#1d1d1f] text-white font-bold tracking-widest uppercase text-sm hover:bg-black hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-4 group">
                Submit Inquiry
                <div className="w-8 h-px bg-white group-hover:w-12 transition-all" />
              </button>
            </motion.form>
          </div>

        </div>
      </div>
    </section>
  );
}
