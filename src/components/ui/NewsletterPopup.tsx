"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ArrowRight } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const pathname = usePathname();

  // Don't render on business card page
  if (pathname?.startsWith('/card')) {
    return null;
  }

  useEffect(() => {
    // Check if user has already dismissed or signed up
    const hasSeenPopup = localStorage.getItem('newsletter_popup_seen');
    if (!hasSeenPopup) {
      // Show after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter_popup_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 px-6 sm:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.4
            }}
            className="relative w-full max-w-[420px] bg-white/90 dark:bg-[#1d1d1f]/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 z-10"
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 md:p-10 relative z-10 text-center">
              <div className="w-16 h-16 mx-auto bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/10 dark:shadow-white/10">
                <Mail className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-display font-bold text-[#1d1d1f] dark:text-white mb-3 tracking-tight">
                Join our newsletter
              </h3>
              
              <p className="text-[#3c3c43] dark:text-white/70 mb-8 leading-relaxed text-sm">
                Get weekly insights on digital transformation, automation strategies, and exclusive offers to grow your business.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    disabled={status !== 'idle'}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#1d1d1f] dark:text-white placeholder-black/40 dark:placeholder-white/40 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all disabled:opacity-50 text-sm"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="w-full relative overflow-hidden group bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl px-5 py-4 transition-transform active:scale-[0.98] disabled:opacity-80 flex items-center justify-center gap-2 text-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'idle' && (
                      <>
                        Subscribe Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    {status === 'loading' && (
                      <div className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                    )}
                    {status === 'success' && (
                      "You're in!"
                    )}
                  </span>
                  
                  {/* Hover effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
              </form>
              
              <p className="text-xs text-[#3c3c43]/60 dark:text-white/40 mt-6">
                By subscribing, you agree to our <a href="/privacy-policy" className="underline hover:text-[#1d1d1f] dark:hover:text-white transition-colors">Privacy Policy</a>. No spam, ever.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
