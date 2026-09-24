"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Check, Plus, Minus, ArrowRight, PackageOpen, Rocket, Crown, Cpu, Box, Sparkles, Layers, Laptop, Smartphone } from "lucide-react";

// --- ANIMATED NUMBER COUNTER ---
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => `£${Math.round(current).toLocaleString()}`);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

// --- DATA ---
const bundledPackages = [
  {
    id: "bundle-starter",
    title: "Starter",
    desc: "The perfect foundation for a new business ready to launch their digital presence.",
    priceLabel: "£780",
    icon: PackageOpen,
    features: ["3-Page Website", "Logo and Branding", "Mobile Responsive", "Basic SEO Optimization"]
  },
  {
    id: "bundle-pro",
    title: "Professional",
    desc: "A complete digital dominance suite designed for rapidly growing brands.",
    priceLabel: "£1,799",
    icon: Rocket,
    isPopular: true,
    features: ["5-Page Corporate Website", "Interactive Digital Card", "Advanced SEO & Marketing", "Premium Micro-Animations"]
  },
  {
    id: "bundle-enterprise",
    title: "Enterprise",
    desc: "Full-scale custom architecture and automated systems for industry leaders.",
    priceLabel: "£5,460",
    icon: Crown,
    features: ["10-Page Enterprise Platform", "6 Digital Product Cards", "Custom CRM Integration", "Native Mobile Capabilities"]
  }
];

const CUSTOM_ITEMS = [
  { id: 'web-1', category: 'Core Architecture', title: '1 Page Landing', price: 200, monthly: 0, icon: Sparkles },
  { id: 'web-3', category: 'Core Architecture', title: '3 Page Website', price: 600, monthly: 0, icon: Layers },
  { id: 'web-5', category: 'Core Architecture', title: '5 Page Corporate', price: 950, monthly: 0, icon: Laptop },
  { id: 'web-10', category: 'Core Architecture', title: '10 Page Enterprise', price: 1980, monthly: 0, icon: Cpu },
  
  { id: 'dc-1', category: 'Digital Cards', title: 'Basic Digital Card', price: 350, monthly: 0, icon: Smartphone },
  { id: 'dc-4', category: 'Digital Cards', title: '4 Product Catalog', price: 500, monthly: 0, icon: Box },
  { id: 'dc-6', category: 'Digital Cards', title: '6 Product Catalog', price: 800, monthly: 0, icon: Layers },

  { id: 'br-logo', category: 'Branding', title: 'Logo & Identity', price: 180, monthly: 0 },
  { id: 'br-icons', category: 'Branding', title: 'Custom Icons', price: 250, monthly: 0 },
  
  { id: 'mk-seo', category: 'Marketing', title: 'SEO & Marketing', price: 499, monthly: 50 },
  { id: 'mk-maint', category: 'Marketing', title: 'Website Maintenance', price: 0, monthly: 50 },

  { id: 'adv-crm', category: 'Advanced Systems', title: 'Custom CRM', price: 500, monthly: 0 },
  { id: 'adv-pwa', category: 'Advanced Systems', title: 'Progressive Web App', price: 800, monthly: 0 },
  { id: 'adv-app', category: 'Advanced Systems', title: 'Native iOS/Android', price: 2500, monthly: 0 },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'custom'>('prebuilt');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const totalUpfront = selectedItems.reduce((acc, id) => {
    const item = CUSTOM_ITEMS.find(i => i.id === id);
    return acc + (item?.price || 0);
  }, 0);

  const totalMonthly = selectedItems.reduce((acc, id) => {
    const item = CUSTOM_ITEMS.find(i => i.id === id);
    return acc + (item?.monthly || 0);
  }, 0);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCustomDeploy = () => {
    if (selectedItems.length === 0) return;
    const itemsList = selectedItems.map(id => {
      const item = CUSTOM_ITEMS.find(i => i.id === id);
      return `- ${item?.title} (£${item?.price}${item?.monthly ? ` + £${item.monthly}/mo` : ''})`;
    }).join('%0A');
    const message = `Hello wedigitlize! I would like to deploy the following custom architecture:%0A%0A${itemsList}%0A%0ATotal Upfront: £${totalUpfront}%0ATotal Monthly: £${totalMonthly}`;
    window.open(`https://wa.me/447584296946?text=${message}`, '_blank');
  };

  const handleBundleDeploy = (bundle: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello wedigitlize! I am interested in the ${bundle.title} Package for ${bundle.priceLabel}.`;
    window.open(`https://wa.me/447584296946?text=${message}`, '_blank');
  };

  const categories = Array.from(new Set(CUSTOM_ITEMS.map(i => i.category)));

  return (
    <section id="pricing" className="py-24 md:py-32 bg-background transition-colors duration-1000 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Unified Header */}
        <div className="mb-12 flex flex-col items-center text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white text-sm font-semibold mb-6 border border-black/20 dark:border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]"
           >
              Investment
           </motion.div>
           <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-black dark:text-white leading-tight tracking-tight mb-6"
           >
             Select Your <span className="text-black/80 dark:text-white/80">Architecture.</span>
           </motion.h3>
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-black/80 dark:text-white/80 max-w-2xl text-lg md:text-xl font-medium"
           >
             Choose a complete, done-for-you digital dominance suite, or use our builder to engineer a bespoke custom architecture.
           </motion.p>
        </div>

        {/* Unified Toggle Tabs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-20 bg-card transition-colors duration-1000 p-2 rounded-full border border-black/15 dark:border-white/15 shadow-2xl flex items-center relative w-full max-w-[400px] mx-auto"
        >
          {/* Active Tab Background Indicator */}
          <div 
            className="absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-full bg-card transition-colors duration-1000 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md"
            style={{ left: activeTab === 'prebuilt' ? '8px' : 'calc(50% + 0px)' }}
          />
          
          <button 
            onClick={() => setActiveTab('prebuilt')}
            className={`relative z-10 flex-1 py-3.5 text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === 'prebuilt' ? 'text-black dark:text-white' : 'text-black/80 dark:text-white/80 hover:text-black dark:text-white'}`}
          >
            Pre-built Suites
          </button>
          <button 
            onClick={() => setActiveTab('custom')}
            className={`relative z-10 flex-1 py-3.5 text-xs lg:text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === 'custom' ? 'text-black dark:text-white' : 'text-black/80 dark:text-white/80 hover:text-black dark:text-white'}`}
          >
            Custom Builder
          </button>
        </motion.div>

        {/* Content Area */}
        <div className="w-full">
          {activeTab === 'prebuilt' ? (
            /* ==========================================
               PREBUILT PACKAGES (SIDE BY SIDE GRID)
               ========================================== */
            <motion.div 
              key="prebuilt"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto"
            >
               {bundledPackages.map((bundle, index) => {
                 const Icon = bundle.icon;

                 return (
                   <motion.div 
                     key={bundle.id}
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: index * 0.1 }}
                     className={`
                       relative w-full rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col h-full group
                       ${bundle.isPopular 
                          ? 'bg-card transition-colors duration-1000 border-2 border-primary shadow-[0_20px_60px_-15px_rgba(0,122,255,0.4)] lg:-translate-y-4' 
                          : 'bg-card transition-colors duration-1000 border border-black/15 dark:border-white/15 hover:border-black/20 dark:border-white/20 hover:bg-card transition-colors duration-1000 shadow-2xl'}
                     `}
                   >
                     {/* Popular Badge */}
                     {bundle.isPopular && (
                       <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-400 via-primary to-blue-400" />
                     )}
                     
                     <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${bundle.isPopular ? 'bg-primary/10 border-primary/20' : 'bg-black/10 dark:bg-white/10 border-black/15 dark:border-white/15'}`}>
                              <Icon size={24} className={bundle.isPopular ? 'text-primary' : 'text-black dark:text-white'} />
                           </div>
                           {bundle.isPopular && (
                             <span className="px-4 py-1.5 bg-primary text-black dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                               Most Popular
                             </span>
                           )}
                        </div>

                        <h4 className="text-3xl font-display font-bold text-black dark:text-white mb-4">{bundle.title}</h4>
                        <p className="text-black/70 dark:text-white/70 text-sm font-medium mb-10 flex-1 leading-relaxed">
                          {bundle.desc}
                        </p>

                        <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-black/15 dark:border-white/15">
                          <span className="text-5xl font-display font-bold text-black dark:text-white tracking-tight">{bundle.priceLabel}</span>
                          <span className="text-black/80 dark:text-white/80 text-sm font-bold tracking-widest uppercase">/One Off</span>
                        </div>

                        {/* Features */}
                        <div className="flex flex-col gap-5 mb-12">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-black/70 dark:text-white/70 mb-2">
                             Included Architecture
                          </p>
                          {bundle.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${bundle.isPopular ? 'bg-primary/20' : 'bg-black/10 dark:bg-white/10'}`}>
                                <Check size={14} className={bundle.isPopular ? 'text-primary' : 'text-black dark:text-white'} />
                              </div>
                              <span className="font-semibold text-sm text-black/80 dark:text-white/80">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button 
                          onClick={(e) => handleBundleDeploy(bundle, e)} 
                          className={`mt-auto w-full py-4 rounded-xl font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95
                            ${bundle.isPopular 
                              ? 'bg-primary text-white hover:bg-[#005bb5] hover:shadow-[0_0_30px_rgba(0,122,255,0.4)]' 
                              : 'bg-black dark:bg-white text-white dark:text-black hover:bg-card transition-colors duration-1000 hover:text-black dark:text-white border border-transparent hover:border-black/20 dark:border-white/20'}`}
                        >
                          Deploy Architecture <ArrowRight size={16} />
                        </button>
                     </div>
                   </motion.div>
                 )
               })}
            </motion.div>
          ) : (
            /* ==========================================
               MAGIC DRAG & DROP CUSTOM BUILDER
               ========================================== */
            <motion.div 
              key="custom"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-start relative w-full max-w-7xl mx-auto"
            >
               
               {/* RIGHT COLUMN (Mobile: Top) - AVAILABLE MODULES */}
               <div className="w-full lg:w-7/12 flex flex-col gap-4">
                  {categories.map(category => (
                    <div key={category} className="bg-black/[0.04] dark:bg-white/[0.04] border border-black/15 dark:border-white/15 rounded-2xl p-4">
                       <h5 className="text-[10px] font-bold text-black/80 dark:text-white/80 mb-3 uppercase tracking-widest">
                         {category}
                       </h5>
                       <div className="flex flex-wrap gap-2">
                         {CUSTOM_ITEMS.filter(i => i.category === category).map(item => {
                            const isSelected = selectedItems.includes(item.id);
                            if (isSelected) return null;
                            
                            return (
                              <motion.div 
                                layoutId={`item-${item.id}`}
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className="bg-card transition-colors duration-1000 border border-black/20 dark:border-white/20 pl-3 pr-2 py-1.5 rounded-full flex items-center gap-3 cursor-pointer hover:border-black/20 dark:border-white/20 hover:bg-background transition-colors duration-1000 transition-all shadow-sm active:scale-95 group w-max"
                              >
                                <span className="font-bold text-black dark:text-white text-xs whitespace-nowrap">{item.title}</span>
                                <span className="text-[10px] text-black/70 dark:text-white/70 font-mono font-semibold whitespace-nowrap">
                                  {item.price > 0 && `£${item.price}`}
                                  {item.monthly > 0 && ` (+£${item.monthly}/mo)`}
                                </span>
                                <div className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-black/70 dark:text-white/70 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors ml-1">
                                  <Plus size={10} strokeWidth={3} />
                                </div>
                              </motion.div>
                            )
                         })}
                       </div>
                    </div>
                  ))}
               </div>

               {/* LEFT COLUMN (Mobile: Bottom) - THE BLUEPRINT CART */}
               <div className="w-full lg:w-5/12 relative lg:sticky lg:top-32 z-20">
                  <div className="w-full min-h-[350px] lg:min-h-[450px] rounded-[2.5rem] bg-card transition-colors duration-1000 border border-black/15 dark:border-white/15 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] p-5 md:p-6 flex flex-col relative overflow-hidden">
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex items-center justify-between border-b border-black/15 dark:border-white/15 pb-4 mb-4">
                        <h4 className="text-xl font-display font-bold text-black dark:text-white tracking-wide">Your Architecture</h4>
                        <span className="px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-xs font-bold text-black dark:text-white">
                          {selectedItems.length} Modules
                        </span>
                      </div>

                      {/* Selected Items List */}
                      <div className="flex-1 flex flex-wrap content-start gap-2 min-h-[150px] lg:min-h-[200px]">
                         <AnimatePresence>
                           {selectedItems.length === 0 && (
                             <motion.div 
                               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                               className="w-full h-full flex flex-col items-center justify-center text-center px-4 py-8"
                             >
                                <div className="w-12 h-12 rounded-full border border-dashed border-black/20 dark:border-white/20 flex items-center justify-center mb-4">
                                  <Plus size={20} className="text-black/80 dark:text-white/80" />
                                </div>
                                <p className="text-black/80 dark:text-white/80 font-medium text-xs md:text-sm leading-relaxed max-w-[250px]">Select modules from the left to begin constructing your architecture.</p>
                             </motion.div>
                           )}
                         </AnimatePresence>

                         {selectedItems.map(id => {
                           const item = CUSTOM_ITEMS.find(i => i.id === id)!;
                           return (
                             <motion.div 
                               layoutId={`item-${item.id}`}
                               key={item.id}
                               onClick={() => toggleItem(item.id)}
                               className="bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-full flex items-center gap-3 cursor-pointer group shadow-lg hover:shadow-xl active:scale-95 transition-all h-max"
                             >
                               <div className="flex flex-col">
                                 <span className="font-bold text-xs">{item.title}</span>
                                 <span className="text-[9px] text-black/80 dark:text-white/80 font-mono font-bold uppercase tracking-wider">
                                   {item.price > 0 && `£${item.price} `}
                                   {item.monthly > 0 && `(+£${item.monthly}/mo)`}
                                 </span>
                               </div>
                               <div className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors shrink-0">
                                 <Minus size={12} />
                               </div>
                             </motion.div>
                           )
                         })}
                      </div>

                      {/* Integrated Estimator */}
                      <div className="mt-8 pt-6 border-t border-black/15 dark:border-white/15 flex flex-col gap-8">
                         <div className="flex justify-between items-end bg-black/10 dark:bg-white/10 p-6 rounded-2xl border border-black/15 dark:border-white/15">
                           <div>
                             <span className="block text-black/80 dark:text-white/80 text-[10px] tracking-widest uppercase mb-1 font-bold">Est. Upfront</span>
                             <span className="text-3xl md:text-4xl font-display font-bold text-black dark:text-white">
                               <AnimatedNumber value={totalUpfront} />
                             </span>
                           </div>
                           <div className="text-right">
                             <span className="block text-black/80 dark:text-white/80 text-[10px] tracking-widest uppercase mb-1 font-bold">Est. Monthly</span>
                             <span className="text-xl md:text-2xl font-display font-bold text-black dark:text-white">
                               <AnimatedNumber value={totalMonthly} /><span className="text-xs md:text-sm text-black/80 dark:text-white/80 font-medium">/mo</span>
                             </span>
                           </div>
                         </div>
                         <button 
                           onClick={handleCustomDeploy}
                           className="w-full py-4 md:py-5 rounded-xl font-bold bg-primary text-white hover:bg-[#005bb5] transition-colors shadow-[0_0_20px_rgba(0,122,255,0.4)] flex items-center justify-center gap-3 text-sm md:text-base"
                         >
                           Deploy Custom Architecture <ArrowRight size={18} />
                         </button>
                      </div>
                    </div>
                  </div>
               </div>

            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
