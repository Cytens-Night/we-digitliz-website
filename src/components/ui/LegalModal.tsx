"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: LegalTab;
}

export default function LegalModal({ isOpen, onClose, defaultTab = 'privacy' }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(defaultTab);

  // Update active tab if defaultTab changes when opening
  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-10 sm:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-full bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header & Tabs */}
            <div className="flex flex-col border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <div className="flex justify-between items-center p-6 pb-2">
                <h2 className="text-2xl font-display font-bold text-[#1d1d1f] dark:text-white">Legal Information</h2>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-[#3c3c43] dark:text-white/70 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex gap-1 px-6 overflow-x-auto no-scrollbar">
                {(['privacy', 'terms', 'cookies'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab 
                        ? 'border-[#007AFF] text-[#007AFF] dark:text-[#007AFF]' 
                        : 'border-transparent text-[#3c3c43] dark:text-white/50 hover:text-[#1d1d1f] dark:hover:text-white hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    {tab === 'privacy' && 'Data Protection & Privacy'}
                    {tab === 'terms' && 'Terms of Service'}
                    {tab === 'cookies' && 'Cookie Policy'}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <div className="space-y-8 text-[#3c3c43] dark:text-white/70 leading-relaxed">
                
                {activeTab === 'privacy' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <p className="mb-4 text-sm opacity-70">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
                    <p>Welcome to wedigitlize ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.</p>
                    
                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">1. Information We Collect</h3>
                    <p>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services.</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Personal Information Provided by You:</strong> We collect names, phone numbers, email addresses, contact preferences, and other similar information.</li>
                      <li><strong>Information Automatically Collected:</strong> We automatically collect certain information when you visit, use, or navigate the Website (such as IP address, browser type).</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">2. How We Use Your Information</h3>
                    <p>We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li>Facilitate account creation and logon process.</li>
                      <li>Send you marketing and promotional communications.</li>
                      <li>Fulfill and manage your orders and requests.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">3. Data Protection</h3>
                    <p>We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
                  </motion.div>
                )}

                {activeTab === 'terms' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <p className="mb-4 text-sm opacity-70">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
                    <p>These Terms of Service ("Terms") constitute a legally binding agreement made between you and WEDIGITLIZE LTD concerning your access to and use of our website and services.</p>
                    
                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">1. Agreement to Terms</h3>
                    <p>By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree, you must discontinue use immediately.</p>

                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">2. Intellectual Property Rights</h3>
                    <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us.</p>

                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">3. Governing Law</h3>
                    <p>These Terms shall be governed by and defined following the laws of the United Kingdom. WEDIGITLIZE LTD and yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction.</p>
                  </motion.div>
                )}

                {activeTab === 'cookies' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <p className="mb-4 text-sm opacity-70">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
                    <p>This Cookie Policy explains how WEDIGITLIZE LTD uses cookies and similar technologies to recognize you when you visit our website.</p>
                    
                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">1. What are cookies?</h3>
                    <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work efficiently and provide reporting information.</p>

                    <h3 className="text-xl font-semibold text-[#1d1d1f] dark:text-white mt-8 mb-4">2. Types of cookies we use</h3>
                    <ul className="list-disc pl-6 space-y-2 mt-4">
                      <li><strong>Essential Cookies:</strong> Strictly necessary to provide you with services available through our website.</li>
                      <li><strong>Performance & Functionality Cookies:</strong> Used to enhance the performance and functionality of our website but are non-essential to their use.</li>
                      <li><strong>Analytics Cookies:</strong> Collect information that is used in aggregate form to help us understand how our website is being used.</li>
                    </ul>
                  </motion.div>
                )}
                
              </div>
            </div>
            
            {/* Footer with Contact Info */}
            <div className="p-6 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <p className="text-sm text-[#3c3c43] dark:text-white/70">
                Questions? Contact us at <a href="mailto:info@wedigitlize.com" className="text-[#007AFF] hover:underline">info@wedigitlize.com</a><br/>
                <span className="opacity-75">WEDIGITLIZE LTD | Company number 17465598 | United Kingdom</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
