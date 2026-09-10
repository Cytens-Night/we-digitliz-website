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
    desc: "The perfect foundation for a new business ready to launch.",
    priceLabel: "£780",
    icon: PackageOpen,
    features: ["3-Page Website", "Logo and Branding", "Mobile Responsive", "Basic SEO"]
  },
  {
    id: "bundle-pro",
    title: "Pro",
    desc: "A complete digital dominance suite for growing brands.",
    priceLabel: "£1,799",
    icon: Rocket,
    isPopular: true,
    features: ["5-Page Corporate Website", "Digital Business Card", "SEO & Marketing", "Advanced Animations"]
  },
  {
    id: "bundle-enterprise",
    title: "Enterprise",
    desc: "Full-scale custom architecture with native mobile deployment.",
    priceLabel: "£5,460",
    icon: Crown,
    features: ["10-Page Enterprise Website", "6 Product Digital Cards", "CRM Integration", "Custom Mobile App"]
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

  { id: 'adv-crm', category: 'Advanced', title: 'Custom CRM', price: 500, monthly: 0 },
  { id: 'adv-pwa', category: 'Advanced', title: 'Progressive Web App', price: 800, monthly: 0 },
  { id: 'adv-app', category: 'Advanced', title: 'Native iOS/Android', price: 2500, monthly: 0 },
];

export default function Pricing() {
  const [hoveredBundle, setHoveredBundle] = useState<string | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
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

    const message = `Hello We Digitlize! I would like to deploy the following custom architecture:%0A%0A${itemsList}%0A%0ATotal Upfront: £${totalUpfront}%0ATotal Monthly: £${totalMonthly}`;
    window.open(`https://wa.me/447000000000?text=${message}`, '_blank');
  };

  const handleBundleDeploy = (bundle: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello We Digitlize! I am interested in the ${bundle.title} Package for ${bundle.priceLabel}.`;
    window.open(`https://wa.me/447000000000?text=${message}`, '_blank');
  };

  const categories = Array.from(new Set(CUSTOM_ITEMS.map(i => i.category)));

  return (
    <section id="pricing" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                 Investment
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight tracking-tight">
                Pre-built <span className="text-white/40">Packages.</span>
              </h3>
           </div>
           <p className="text-white/60 max-w-md pb-2 text-lg md:text-xl">
             Select a complete, done-for-you digital dominance suite, or scroll down to build a custom bespoke architecture.
           </p>
        </div>

        {/* ==========================================
            MONOLITHIC BUNDLE ROWS
            ========================================== */}
        <div className="flex flex-col gap-4 mb-40">
           {bundledPackages.map((bundle, index) => {
             const isHovered = hoveredBundle === bundle.id;
             const isSelected = selectedBundle === bundle.id;
             const Icon = bundle.icon;

             return (
               <motion.div 
                 key={bundle.id}
                 layout
                 onMouseEnter={() => setHoveredBundle(bundle.id)}
                 onMouseLeave={() => setHoveredBundle(null)}
                 onClick={() => setSelectedBundle(bundle.id)}
                 className={`
                   relative w-full rounded-[2rem] overflow-hidden cursor-pointer transition-colors duration-500 border group
                   ${isSelected ? 'bg-white text-black border-white' : 'bg-[#161a22] text-white border-white/10 hover:border-white/30'}
                 `}
               >
                 <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    
                    <div className="flex items-center gap-8 flex-1">
                       <div className={`text-4xl font-display font-bold opacity-20 ${isSelected ? 'text-black' : 'text-white'}`}>
                         0{index + 1}
                       </div>
                       <div>
                         <div className="flex items-center gap-4 mb-2">
                           <Icon size={24} className={isSelected ? 'text-black' : 'text-white'} />
                           <h4 className="text-3xl md:text-4xl font-display font-bold">{bundle.title}</h4>
                           {bundle.isPopular && (
                             <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full ml-2 shadow-[0_0_20px_rgba(0,102,204,0.5)]">
                               Most Popular
                             </span>
                           )}
                         </div>
                         <p className={`text-sm md:text-base font-medium max-w-md ${isSelected ? 'text-black/70' : 'text-white/50'}`}>
                           {bundle.desc}
                         </p>
                       </div>
                    </div>

                    <div className="flex items-center gap-12 lg:w-1/3 justify-between lg:justify-end w-full lg:w-auto">
                       <div className="text-4xl md:text-5xl font-display font-bold">
                         {bundle.priceLabel}
                       </div>
                       
                       <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-black border-black text-white' : 'border-white/20 group-hover:border-white'}`}>
                          {isSelected ? <Check size={20} /> : <ArrowRight size={20} />}
                       </div>
                    </div>
                 </div>

                 {/* Expanding Features Section */}
                 <AnimatePresence>
                   {(isHovered || isSelected) && (
                     <motion.div 
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                       className="overflow-hidden"
                     >
                        <div className={`px-8 lg:px-10 pb-8 pt-4 border-t ${isSelected ? 'border-black/10' : 'border-white/10'}`}>
                          <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${isSelected ? 'text-black/40' : 'text-white/30'}`}>
                             Included Architecture
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {bundle.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <Check size={18} className={isSelected ? 'text-primary' : 'text-primary'} />
                                <span className={`font-bold text-sm ${isSelected ? 'text-black/80' : 'text-white/80'}`}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 flex justify-end">
                            <button 
                              onClick={(e) => handleBundleDeploy(bundle, e)} 
                              className={`px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2 ${isSelected ? 'bg-primary text-white' : 'bg-primary text-white'}`}
                            >
                              Deploy via WhatsApp <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
             )
           })}
        </div>


        {/* ==========================================
            MAGIC DRAG & DROP CUSTOM BUILDER
            ========================================== */}
        <div id="custom-builder" className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white text-sm font-semibold mb-6 border border-white/20 uppercase tracking-widest shadow-[0_0_20px_rgba(0,0,0,0.2)]">
                 Custom Builder
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white leading-tight tracking-tight">
                Architect <br/> <span className="text-white/40">Your Own.</span>
              </h3>
           </div>
           <p className="text-white/60 max-w-md pb-2 text-lg md:text-xl">
             Select the modules you need. Watch your bespoke architecture assemble in real-time.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
           
           {/* LEFT COLUMN: THE BLUEPRINT CART */}
           <div className="w-full lg:w-5/12 sticky top-24 z-20">
              <div className="w-full min-h-[600px] rounded-[2.5rem] bg-[#161a22] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] p-8 flex flex-col relative overflow-hidden">
                
                {/* Blueprint Background Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                    <h4 className="text-xl font-bold text-white tracking-wide">Your Architecture</h4>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/70">
                      {selectedItems.length} Modules
                    </span>
                  </div>

                  {/* Selected Items List */}
                  <div className="flex-1 flex flex-col gap-3 min-h-[300px]">
                     <AnimatePresence>
                       {selectedItems.length === 0 && (
                         <motion.div 
                           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                           className="flex-1 flex flex-col items-center justify-center text-center px-8"
                         >
                            <div className="w-16 h-16 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4">
                              <Plus size={24} className="text-white/20" />
                            </div>
                            <p className="text-white/40 font-medium">Select modules from the right to begin constructing your architecture.</p>
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
                           className="bg-white text-black p-4 rounded-2xl flex items-center justify-between cursor-pointer group shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
                         >
                           <div>
                             <h6 className="font-bold text-sm">{item.title}</h6>
                             <div className="text-xs text-black/60 font-mono mt-1 font-bold">
                               {item.price > 0 && `£${item.price} `}
                               {item.monthly > 0 && `(+£${item.monthly}/mo)`}
                             </div>
                           </div>
                           <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                             <Minus size={14} />
                           </div>
                         </motion.div>
                       )
                     })}
                  </div>

                  {/* Integrated Estimator */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-6">
                     <div className="flex justify-between items-end">
                       <div>
                         <span className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">Est. Upfront</span>
                         <span className="text-4xl font-display font-bold text-white">
                           <AnimatedNumber value={totalUpfront} />
                         </span>
                       </div>
                       <div className="text-right">
                         <span className="block text-white/40 text-[10px] tracking-widest uppercase mb-1">Est. Monthly</span>
                         <span className="text-2xl font-display font-bold text-white">
                           <AnimatedNumber value={totalMonthly} /><span className="text-sm text-white/40">/mo</span>
                         </span>
                       </div>
                     </div>
                     <button 
                       onClick={handleCustomDeploy}
                       className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,102,204,0.4)] flex items-center justify-center gap-2"
                     >
                       Deploy via WhatsApp <ArrowRight size={18} />
                     </button>
                  </div>
                </div>
              </div>
           </div>

           {/* RIGHT COLUMN: AVAILABLE MODULES */}
           <div className="w-full lg:w-7/12 flex flex-col gap-16">
              {categories.map(category => (
                <div key={category}>
                   <h5 className="text-sm font-bold text-white/50 mb-6 uppercase tracking-widest flex items-center gap-4">
                     {category} <div className="h-px bg-white/10 flex-1" />
                   </h5>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {CUSTOM_ITEMS.filter(i => i.category === category).map(item => {
                        const isSelected = selectedItems.includes(item.id);
                        if (isSelected) return <div key={item.id} className="h-[88px]" />; // Placeholder to maintain grid
                        
                        return (
                          <motion.div 
                            layoutId={`item-${item.id}`}
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className="bg-[#111] border border-white/10 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-white/30 hover:bg-[#161a22] transition-colors"
                          >
                            <div>
                              <h6 className="font-bold text-white text-sm">{item.title}</h6>
                              <div className="text-xs text-white/50 font-mono mt-1">
                                {item.price > 0 && `£${item.price} `}
                                {item.monthly > 0 && `(+£${item.monthly}/mo)`}
                              </div>
                            </div>
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50">
                              <Plus size={14} />
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
    </section>
  );
}
