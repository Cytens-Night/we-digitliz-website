import React, { useState, useEffect } from 'react';
import { Copy, Send, PhoneCall, UserPlus, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type DrawerType = 'phone' | 'email' | null;

interface ActionDrawerProps {
  type: DrawerType;
  onClose: () => void;
  phone: string;
  email: string;
  onSaveContact: () => void;
  onCopyEmail: () => void;
  showToast: (msg: string) => void;
}

export default function ActionDrawer({ type, onClose, phone, email, onSaveContact, onCopyEmail, showToast }: ActionDrawerProps) {
  const [isVIPMode, setIsVIPMode] = useState(false);
  const [vipEmail, setVipEmail] = useState("");

  useEffect(() => {
    if (!type) setIsVIPMode(false);
  }, [type]);

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vipEmail) {
      showToast("Welcome to the VIP List!");
      setVipEmail("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {type && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full max-h-[80vh] bg-[#111] border-t border-white/10 rounded-t-3xl z-[101] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Handle */}
            <div className="w-full flex justify-center pt-4 pb-2 cursor-pointer" onClick={onClose}>
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            <div className="px-6 pb-12 pt-4 relative flex-1 overflow-y-auto">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-6 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>

              {type === 'phone' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                  <h3 className="text-xl font-display font-bold text-white mb-2">Contact Us</h3>
                  
                  <a href={`tel:${phone}`} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <PhoneCall size={20} />
                    </div>
                    <div>
                      <div className="font-bold">Call Now</div>
                      <div className="text-sm text-white/50">{phone}</div>
                    </div>
                  </a>
                  
                  <button onClick={() => { onSaveContact(); onClose(); }} className="flex items-center gap-4 bg-primary hover:bg-primary/90 p-4 rounded-xl text-black font-bold transition-colors shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                      <UserPlus size={20} />
                    </div>
                    <div className="flex-1 text-left">Save to Contacts</div>
                  </button>
                </motion.div>
              )}

              {type === 'email' && !isVIPMode && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                  <h3 className="text-xl font-display font-bold text-white mb-2">Email Us</h3>
                  
                  <button onClick={() => { onCopyEmail(); onClose(); }} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Copy size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold">Copy Email</div>
                      <div className="text-sm text-white/50">{email}</div>
                    </div>
                  </button>
                  
                  <a href={`mailto:${email}`} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Send size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold">Send Email</div>
                      <div className="text-sm text-white/50">Open default mail app</div>
                    </div>
                  </a>
                  
                  <button onClick={() => setIsVIPMode(true)} className="flex items-center gap-4 bg-primary hover:bg-primary/90 p-4 rounded-xl text-black font-bold transition-colors shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] mt-2">
                    <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div className="flex-1 text-left">Join VIP Mailing List</div>
                  </button>
                </motion.div>
              )}

              {type === 'email' && isVIPMode && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                  <button className="text-white/50 hover:text-white text-sm flex items-center gap-2 mb-2 w-fit transition-colors" onClick={() => setIsVIPMode(false)}>
                    &larr; Back
                  </button>
                  <h3 className="text-xl font-display font-bold text-white">VIP Mailing List</h3>
                  <p className="text-sm text-white/60 mb-2">Get exclusive access to our newest systems, automation templates, and digital dominance guides.</p>
                  
                  <form onSubmit={handleVipSubmit} className="flex flex-col gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={vipEmail}
                      onChange={(e) => setVipEmail(e.target.value)}
                      required
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold p-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
                      Subscribe Now
                    </button>
                  </form>
                </motion.div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
