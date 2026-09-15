import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Zap, Target, LineChart, Code } from 'lucide-react';

export interface ServiceData {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  link: string;
  color: string;
}

export const services: ServiceData[] = [
  {
    id: 1,
    title: "Web Architecture",
    icon: <Code size={32} />,
    description: "Custom-coded, high-performance web applications built from scratch using React, Next.js, and modern architectures.",
    features: ["Server-Side Rendering", "Custom 3D Experiences", "API Integrations", "Database Architecture"],
    link: "/works",
    color: "#3b82f6" // Blue
  },
  {
    id: 2,
    title: "AI Automation",
    icon: <Zap size={32} />,
    description: "Intelligent systems that automate your workflows, saving thousands of hours and eliminating human error.",
    features: ["Custom LLM Integration", "Automated Workflows", "Customer Support Bots", "Data Extraction"],
    link: "/works",
    color: "#8b5cf6" // Purple
  },
  {
    id: 3,
    title: "Brand Dominance",
    icon: <Target size={32} />,
    description: "Complete visual identities engineered to command attention and position your brand as the absolute premium choice.",
    features: ["Logo & Identity Systems", "Premium UI/UX Design", "Copywriting", "Motion Graphics"],
    link: "/works",
    color: "#ec4899" // Pink
  },
  {
    id: 4,
    title: "SEO Scaling",
    icon: <LineChart size={32} />,
    description: "Data-driven search engine optimization strategies that guarantee your dominance at the top of Google rankings.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Analytics Tracking"],
    link: "/works",
    color: "#10b981" // Green
  }
];

interface CinematicModalProps {
  activeId: number | null;
  onClose: () => void;
}

export default function CinematicModal({ activeId, onClose }: CinematicModalProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const service = services.find(s => s.id === activeId);

  const handleClose = () => {
    setIsFlipped(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {activeId && service && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 pointer-events-none perspective-[2000px]">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: isFlipped ? 180 : 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-[400px] aspect-[3/4] sm:aspect-square sm:max-w-[600px] transform-style-3d pointer-events-auto"
            >
              
              {/* FRONT FACE */}
              <div className="absolute inset-0 bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex flex-col backface-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <button onClick={handleClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
                
                <div 
                  className="flex-1 flex flex-col items-center justify-center relative overflow-hidden"
                  style={{ background: `radial-gradient(circle at center, ${service.color}30 0%, #111 70%)` }}
                >
                   <motion.div 
                     initial={{ scale: 0, rotate: -45 }}
                     animate={{ scale: 1, rotate: 0 }}
                     transition={{ delay: 0.2, type: "spring" }}
                     className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl"
                     style={{ color: service.color, boxShadow: `0 0 50px ${service.color}40` }}
                   >
                     {service.icon}
                   </motion.div>
                   <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mt-8 mb-2 tracking-tight">{service.title}</h2>
                </div>
                
                <div className="p-6 bg-[#0a0a0a] border-t border-white/5">
                  <button 
                    onClick={() => setIsFlipped(true)}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                  >
                    View System Specs <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* BACK FACE */}
              <div className="absolute inset-0 bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex flex-col backface-hidden rotate-y-180 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <button onClick={() => setIsFlipped(false)} className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
                
                <div className="p-8 pt-16 flex-1 flex flex-col">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit" style={{ backgroundColor: `${service.color}20`, color: service.color, border: `1px solid ${service.color}40` }}>
                    System Architecture
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">{service.title}</h2>
                  <p className="text-white/60 text-sm sm:text-base mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <h3 className="text-white font-bold mb-4">Core Components</h3>
                  <div className="grid grid-cols-2 gap-3 mb-auto">
                    {service.features.map((feature, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3 text-xs sm:text-sm text-white/80 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 bg-[#0a0a0a] border-t border-white/5 flex gap-4">
                   <a 
                     href={service.link}
                     className="flex-1 bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                   >
                     Deploy System
                   </a>
                </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
