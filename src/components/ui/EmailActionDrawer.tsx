import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Send, ArrowLeft, Mail, ChevronRight, Check } from 'lucide-react';

interface EmailActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onCopy: () => void;
}

type ViewState = 'options' | 'subscribe';

export default function EmailActionDrawer({ isOpen, onClose, email, onCopy }: EmailActionDrawerProps) {
  const [view, setView] = useState<ViewState>('options');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset view when closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setView('options');
        setEmailInput('');
        setIsSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-white/10 rounded-t-3xl z-[210] flex flex-col overflow-hidden"
            style={{ 
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 122, 255, 0.2)',
              maxHeight: '90%'
            }}
          >
            {/* Drag Handle */}
            <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing" onClick={onClose}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            <div className="px-6 pb-8 relative min-h-[300px]">
              <AnimatePresence mode="wait">
                {view === 'options' ? (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                  >
                    <h3 className="text-xl font-display font-semibold text-white text-center mb-6">
                      Get In Touch
                    </h3>

                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => {
                          onCopy();
                          onClose();
                        }}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                      >
                        <Copy size={18} className="text-[#007AFF]" />
                        Copy Email Address
                      </button>

                      <a 
                        href={`mailto:${email}`}
                        onClick={onClose}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                      >
                        <Send size={18} className="text-[#8b5cf6]" />
                        Send an Email
                      </a>

                      <button 
                        onClick={() => setView('subscribe')}
                        className="w-full flex items-center justify-between px-6 py-4 mt-2 rounded-2xl bg-gradient-to-r from-[#007AFF]/20 to-[#8b5cf6]/20 border border-white/10 text-white font-semibold hover:border-white/20 hover:from-[#007AFF]/30 hover:to-[#8b5cf6]/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Mail size={18} className="text-white" />
                          Join VIP Mailing List
                        </div>
                        <ChevronRight size={18} className="text-white/50 group-hover:text-white transition-colors group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="subscribe"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                  >
                    <button 
                      onClick={() => setView('options')}
                      className="absolute top-0 left-0 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <h3 className="text-xl font-display font-semibold text-white text-center mt-8 mb-2 bg-gradient-to-r from-[#007AFF] to-[#8b5cf6] bg-clip-text text-transparent">
                      VIP Mailing List
                    </h3>
                    
                    <p className="text-center text-white/50 text-sm mb-8 px-4">
                      Get exclusive access to new digital architectures, premium systems, and special offers.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-4 mt-auto">
                      <div className="relative">
                        <input 
                          type="email" 
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#007AFF]/50 focus:ring-1 focus:ring-[#007AFF]/50 transition-all"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting || isSuccess}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#007AFF] to-[#8b5cf6] text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(0,122,255,0.4)] transition-all disabled:opacity-70 disabled:hover:shadow-none flex items-center justify-center gap-2 relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : isSuccess ? (
                          <>
                            <Check size={20} className="text-white" />
                            Subscribed!
                          </>
                        ) : (
                          'Subscribe'
                        )}
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full skeleton-shimmer" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
