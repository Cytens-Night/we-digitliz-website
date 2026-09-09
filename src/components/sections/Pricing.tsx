"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { Check, Plus, Layers, Laptop, Cpu, Sparkles, Smartphone, Box, Shield, Zap, Megaphone, Share2, PackageOpen, Rocket, Crown } from "lucide-react";

// --- INVENTORY DATA EXTRACTED FROM HTML ---
const websitePackages = [
  { id: 'web-1', title: '1 Page', desc: 'A stunning, high-impact landing page.', price: 200, icon: Sparkles },
  { id: 'web-3', title: '3 Pages', desc: 'Perfect for small businesses.', price: 600, icon: Layers },
  { id: 'web-5', title: '5 Pages', desc: 'Our most popular corporate package.', price: 950, icon: Laptop, isPopular: true },
  { id: 'web-10', title: '10 Pages', desc: 'Full-scale enterprise architecture.', price: 1980, icon: Cpu },
];

const digitalCards = [
  { id: 'dc-1', title: 'Basic', desc: 'Essential digital networking profile.', price: 350, icon: Smartphone },
  { id: 'dc-4', title: '4 Products', desc: 'Showcase up to 4 core products.', price: 500, icon: Box },
  { id: 'dc-6', title: '6 Products', desc: 'Full premium catalog integration.', price: 800, icon: Layers },
];

const addonCategories = [
  {
    category: "Branding & Print",
    items: [
      { id: 'br-logo', title: 'Logo and Branding', desc: 'Complete identity suite.', upfront: 180, monthly: 0 },
      { id: 'br-icons', title: 'Custom Iconography Pack', desc: 'Bespoke UI icons.', upfront: 250, monthly: 0 },
      { id: 'br-print', title: 'Physical Cards & Flyers', desc: 'Requires custom quote.', upfront: 0, monthly: 0, isQuote: true },
    ]
  },
  {
    category: "Physical Networking Assets",
    items: [
      { id: 'phys-g-review', title: 'Custom Google Review Cards', desc: 'NFC tap-to-review cards.', upfront: 50, monthly: 0 },
      { id: 'phys-social', title: 'Custom Social Media Cards', desc: 'NFC tap-to-follow cards.', upfront: 50, monthly: 0 },
      { id: 'phys-stand', title: 'NFC Display Stands', desc: 'Acrylic countertop displays.', upfront: 50, monthly: 0 },
    ]
  },
  {
    category: "Marketing & Maintenance",
    items: [
      { id: 'mk-seo', title: 'SEO & Digital Marketing', desc: '+ £50/mo for 1 post every 2 weeks.', upfront: 499, monthly: 50 },
      { id: 'mk-maint', title: 'Website Maintenance', desc: 'Security, backups, updates.', upfront: 0, monthly: 50 },
    ]
  },
  {
    category: "Advanced Solutions",
    items: [
      { id: 'adv-crm', title: 'Custom CRM Integration', desc: 'Hubspot, Salesforce, etc.', upfront: 500, monthly: 0 },
      { id: 'adv-email', title: 'Custom Email Flow Setup', desc: 'Automated retention flows.', upfront: 300, monthly: 0 },
      { id: 'adv-pwa', title: 'Progressive Web App Upgrade', desc: 'Installable mobile web experience.', upfront: 800, monthly: 0 },
      { id: 'adv-app', title: 'Custom Mobile App (iOS/Android)', desc: 'Native app store deployment.', upfront: 2500, monthly: 0 },
    ]
  }
];

// --- BUNDLED PACKAGES ---
const bundledPackages = [
  {
    id: "bundle-starter",
    title: "Starter Package",
    desc: "The perfect foundation for a new business ready to launch.",
    icon: PackageOpen,
    priceLabel: "£780",
    features: [
      "3-Page Website",
      "Logo and Branding",
      "Mobile Responsive Design",
      "Basic SEO Setup"
    ],
    config: {
      web: "web-3", // 600
      dc: null,
      addons: ["br-logo"] // 180
    }
  },
  {
    id: "bundle-pro",
    title: "Pro Package",
    desc: "A complete digital dominance suite for growing brands.",
    icon: Rocket,
    priceLabel: "£1,799",
    isPopular: true,
    features: [
      "5-Page Corporate Website",
      "Basic Digital Business Card",
      "SEO & Digital Marketing",
      "Advanced Animations"
    ],
    config: {
      web: "web-5", // 950
      dc: "dc-1", // 350
      addons: ["mk-seo"] // 499 upfront + 50/mo
    }
  },
  {
    id: "bundle-enterprise",
    title: "Enterprise Package",
    desc: "Full-scale custom architecture with native mobile deployment.",
    icon: Crown,
    priceLabel: "£5,460",
    features: [
      "10-Page Enterprise Website",
      "6 Product Digital Cards",
      "Logo and Branding",
      "Custom CRM Integration",
      "Custom Mobile App (iOS/Android)"
    ],
    config: {
      web: "web-10", // 1980
      dc: "dc-6", // 800
      addons: ["br-logo", "adv-crm", "adv-app"] // 180 + 500 + 2500 = 3180
    }
  }
];

// --- 3D TILT CARD COMPONENT ---
function PricingTiltCard({ children, isSelected, onClick, className = "" }: { children: React.ReactNode, isSelected: boolean, onClick: () => void, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className={`relative perspective-[2000px] w-full h-full ${className}`}>
      <motion.div
        ref={ref}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`
          relative w-full h-full rounded-3xl cursor-pointer group
          transition-transform duration-300
          ${isSelected ? 'scale-105 z-20' : 'scale-100 z-10 hover:-translate-y-2'}
        `}
      >
        {/* Animated Spinning Border (Active State) */}
        {isSelected && (
          <div className="absolute -inset-[2px] rounded-[1.6rem] overflow-hidden z-0">
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#0066cc_360deg)]"
             />
          </div>
        )}

        {/* Card Content Container */}
        <div className={`
          relative w-full h-full rounded-3xl p-6 lg:p-8 overflow-hidden flex flex-col
          ${isSelected ? 'bg-[#fafafa]' : 'bg-[#0a0a0a] hover:bg-[#fafafa] border border-white/10'}
        `}>
          
          {/* Base Inner Border for active state to mask the spinning background */}
          {isSelected && (
            <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none z-10 bg-[#0a0a0a]/90 backdrop-blur-xl" />
          )}

          {/* Actual Children Content */}
          <div className="relative z-20 flex flex-col h-full flex-grow" style={{ transform: "translateZ(30px)" }}>
            {children}
          </div>

          {/* 3D Dynamic Glare Effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 mix-blend-overlay rounded-3xl"
            style={{
              background: `radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              left: glareX,
              top: glareY,
              transform: 'translate(-50%, -50%)',
              width: '200%',
              height: '200%'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// --- ANIMATED NUMBER COUNTER ---
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => `£${Math.round(current).toLocaleString()}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

export default function Pricing() {
  const [selectedWeb, setSelectedWeb] = useState<string | null>("web-5");
  const [selectedDC, setSelectedDC] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  // Calculate Totals
  let totalUpfront = 0;
  let totalMonthly = 0;
  let selectedCount = 0;

  if (selectedWeb) {
    const pkg = websitePackages.find(p => p.id === selectedWeb);
    if (pkg) { totalUpfront += pkg.price; selectedCount++; }
  }

  if (selectedDC) {
    const pkg = digitalCards.find(p => p.id === selectedDC);
    if (pkg) { totalUpfront += pkg.price; selectedCount++; }
  }

  selectedAddons.forEach(id => {
    addonCategories.forEach(cat => {
      const addon = cat.items.find(item => item.id === id);
      if (addon) {
        totalUpfront += addon.upfront;
        totalMonthly += addon.monthly;
        selectedCount++;
      }
    });
  });

  const toggleAddon = (id: string) => {
    setSelectedBundle(null);
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleWeb = (id: string) => {
    setSelectedBundle(null);
    setSelectedWeb(prev => prev === id ? null : id);
  };

  const toggleDC = (id: string) => {
    setSelectedBundle(null);
    setSelectedDC(prev => prev === id ? null : id);
  };

  const applyBundle = (bundleId: string) => {
    const bundle = bundledPackages.find(b => b.id === bundleId);
    if (!bundle) return;
    
    setSelectedBundle(bundle.id);
    setSelectedWeb(bundle.config.web);
    setSelectedDC(bundle.config.dc);
    setSelectedAddons(bundle.config.addons);

    // Smooth scroll down to the customizer so they can see the magic auto-fill
    const customizerEl = document.getElementById('custom-builder');
    if (customizerEl) {
      customizerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="pricing" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 pb-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest">
             Investment
          </div>
          <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Pre-built <span className="text-white">Packages.</span>
          </h3>
          <p className="text-lg text-white/60 mb-12">
            Select a complete, done-for-you digital dominance suite, or scroll down to build a custom bespoke architecture.
          </p>
        </div>

        {/* --- THE BUNDLED PACKAGES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {bundledPackages.map((bundle) => {
            const isSelected = selectedBundle === bundle.id;
            const Icon = bundle.icon;
            
            return (
              <PricingTiltCard key={bundle.id} isSelected={isSelected} onClick={() => applyBundle(bundle.id)}>
                 {bundle.isPopular && (
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#1d1d1f] rounded-full text-xs font-bold text-white tracking-widest uppercase shadow-lg whitespace-nowrap">
                     Most Popular
                   </div>
                 )}
                 
                 <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white/5 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-white/10 text-white/60'}`}>
                      <Icon size={28} />
                    </div>
                    {isSelected && (
                      <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }} className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                        <Check size={18} className="text-white" />
                      </motion.div>
                    )}
                 </div>
                 
                 <h5 className="text-3xl font-bold text-white mb-3">{bundle.title}</h5>
                 <div className="text-4xl font-display font-bold text-white mb-4 text-white">
                   {bundle.priceLabel}
                 </div>
                 <p className="text-white/60 text-sm mb-6">{bundle.desc}</p>
                 
                 <ul className="space-y-3 mb-8 flex-grow">
                   {bundle.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                       <Check size={16} className="text-white shrink-0 mt-0.5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-full" />
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
                 
                 <button 
                   onClick={() => applyBundle(bundle.id)}
                   className={`w-full py-4 rounded-xl font-bold transition-all mt-auto flex items-center justify-center gap-2 ${isSelected ? 'bg-primary text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-white/10 text-white hover:bg-white/20'}`}
                 >
                   {isSelected ? (
                     <>
                       <Check size={18} /> Selected
                     </>
                   ) : "Select Package"}
                 </button>
              </PricingTiltCard>
            )
          })}
        </div>

        {/* --- DIVIDER --- */}
        <div id="custom-builder" className="relative flex items-center justify-center mb-24 pt-12">
          <div className="absolute w-full h-px bg-[#1d1d1f]" />
          <div className="bg-[#0a0a0a] px-6 py-2 relative z-10 border border-white/10 rounded-full text-sm font-bold tracking-widest uppercase text-white/60 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            Or Build Custom Architecture
          </div>
        </div>

        {/* 1. CORE WEBSITES */}
        <div className="mb-24">
           <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
             <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold shadow-[0_0_20px_rgba(0,0,0,0.2)]">1</span>
             Core Websites
           </h4>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {websitePackages.map((pkg) => {
               const isSelected = selectedWeb === pkg.id;
               const Icon = pkg.icon;
               
               return (
                 <PricingTiltCard key={pkg.id} isSelected={isSelected} onClick={() => toggleWeb(pkg.id)}>
                    <div className="flex justify-between items-start mb-6">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white/5 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-white/10 text-white/60'}`}>
                         <Icon size={20} />
                       </div>
                       {isSelected && (
                         <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                           <Check size={14} className="text-white" />
                         </motion.div>
                       )}
                    </div>
                    
                    <h5 className="text-xl font-bold text-white mb-2">{pkg.title}</h5>
                    <div className="text-2xl font-display font-bold text-white mb-4">
                      £{pkg.price.toLocaleString()}
                    </div>
                    <p className="text-white/60 text-sm mt-auto">{pkg.desc}</p>
                 </PricingTiltCard>
               )
             })}
           </div>
        </div>

        {/* 2. DIGITAL BUSINESS CARDS */}
        <div className="mb-24">
           <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
             <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold shadow-[0_0_20px_rgba(0,0,0,0.2)]">2</span>
             Digital Business Cards
           </h4>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {digitalCards.map((pkg) => {
               const isSelected = selectedDC === pkg.id;
               const Icon = pkg.icon;
               
               return (
                 <PricingTiltCard key={pkg.id} isSelected={isSelected} onClick={() => toggleDC(pkg.id)}>
                    <div className="flex justify-between items-start mb-6">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white/5 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-white/10 text-white/60'}`}>
                         <Icon size={20} />
                       </div>
                       {isSelected && (
                         <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring" }} className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                           <Check size={14} className="text-white" />
                         </motion.div>
                       )}
                    </div>
                    
                    <h5 className="text-xl font-bold text-white mb-2">{pkg.title}</h5>
                    <div className="text-2xl font-display font-bold text-white mb-4">
                      £{pkg.price.toLocaleString()}
                    </div>
                    <p className="text-white/60 text-sm mt-auto">{pkg.desc}</p>
                 </PricingTiltCard>
               )
             })}
           </div>
        </div>

        {/* 3-6. ADDONS GRID */}
        <div className="mb-12">
           <h4 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
             <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold border border-white/20">3</span>
             Mix & Match Add-ons
           </h4>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {addonCategories.map((category, catIdx) => (
                <div key={catIdx} className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/5">
                  <h5 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-white">{category.category}</h5>
                  <div className="space-y-3">
                    {category.items.map((addon) => {
                      const isSelected = selectedAddons.includes(addon.id);
                      return (
                        <motion.div 
                          key={addon.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => toggleAddon(addon.id)}
                          className={`
                            relative p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-4 overflow-hidden group
                            ${isSelected ? 'bg-white/5 border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-[#0a0a0a] border-white/5 hover:bg-white/10 hover:border-white/20'}
                            border
                          `}
                        >
                            {/* Active Glow Background */}
                            {isSelected && (
                              <motion.div 
                                layoutId="addon-glow"
                                className="absolute inset-0 bg-[#1d1d1f] pointer-events-none" 
                              />
                            )}

                            <motion.div 
                              layout
                              className={`w-6 h-6 shrink-0 rounded flex items-center justify-center transition-colors z-10 ${isSelected ? 'bg-primary shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'bg-white/10 group-hover:bg-white/20'}`}
                            >
                              {isSelected ? <Check size={12} className="text-white" /> : <Plus size={12} className="text-white/60 group-hover:text-white" />}
                            </motion.div>
                            
                            <div className="flex-1 z-10">
                              <div className="flex justify-between items-start md:items-center flex-col md:flex-row mb-1 gap-1 md:gap-0">
                                <h6 className="font-bold text-white text-sm">{addon.title}</h6>
                                
                                {/* Pricing Logic */}
                                <div className="flex gap-2">
                                  {addon.isQuote ? (
                                    <span className="text-white font-mono text-xs font-bold bg-white/5 px-2 py-0.5 rounded">Custom Quote</span>
                                  ) : (
                                    <>
                                      {addon.upfront > 0 && (
                                        <span className={`font-bold font-mono text-sm transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>+£{addon.upfront}</span>
                                      )}
                                      {addon.monthly > 0 && (
                                        <span className={`font-bold font-mono text-sm transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>+£{addon.monthly}/mo</span>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                              <p className="text-white/60 text-xs">{addon.desc}</p>
                            </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
             ))}
           </div>
        </div>

      </div>

      {/* FLOATING ESTIMATOR BAR */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 pointer-events-none flex justify-center">
        <motion.div 
           initial={{ y: 100, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1, type: "spring", bounce: 0.4 }}
           className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-4 md:px-8 md:py-4 rounded-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row items-center gap-4 lg:gap-8 pointer-events-auto max-w-[95vw] lg:max-w-none"
        >
           <div className="flex items-center justify-between w-full lg:w-auto gap-4 lg:gap-8">
             <div className="flex gap-4 lg:gap-8 items-center">
               <div className="hidden lg:block">
                 <span className="block text-white/60 text-[10px] tracking-widest uppercase mb-1">
                   {selectedBundle ? "Active Package" : "Selections"}
                 </span>
                 <span className="text-white font-bold flex items-center gap-2 text-sm">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   {selectedBundle ? bundledPackages.find(b => b.id === selectedBundle)?.title : `${selectedCount} Items`}
                 </span>
               </div>
               <div className="w-px h-8 bg-white/10 hidden lg:block" />
               <div>
                 <span className="block text-white/60 text-[10px] tracking-widest uppercase mb-1">Est. Upfront</span>
                 <span className="text-2xl md:text-3xl font-display font-bold text-white">
                   <AnimatedNumber value={totalUpfront} />
                 </span>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div>
                 <span className="block text-white/60 text-[10px] tracking-widest uppercase mb-1">Est. Monthly</span>
                 <span className="text-xl md:text-2xl font-display font-bold text-white flex items-baseline gap-1">
                   <AnimatedNumber value={totalMonthly} /><span className="text-sm text-white/50">/mo</span>
                 </span>
               </div>
             </div>
           </div>
           
           <div className="w-full lg:w-auto flex justify-stretch lg:justify-end shrink-0 mt-2 lg:mt-0 lg:ml-4">
             <a href="#contact" className="w-full lg:w-auto text-center px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all">
               Start Project
             </a>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
