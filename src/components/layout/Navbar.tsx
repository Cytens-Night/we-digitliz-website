"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowRight, Home, Briefcase, CreditCard, FolderStar } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const desktopNavLinks = [
  { name: "Services", href: "/#services" },
  { name: "Industries", href: "/#industries" },
  { name: "Investment", href: "/#pricing" },
  { name: "Process", href: "/#process" },
  { name: "Works", href: "/works" },
];

const mobileNavLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Sectors", href: "/#industries", icon: Briefcase },
  { name: "Pricing", href: "/#pricing", icon: CreditCard },
  { name: "Works", href: "/works", icon: FolderStar },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<string>("Home");

  // Determine active mobile tab based on pathname and hash (rough estimation for visual feedback)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (pathname === "/works") setActiveMobileTab("Works");
      else if (hash.includes("pricing")) setActiveMobileTab("Pricing");
      else if (hash.includes("industries")) setActiveMobileTab("Sectors");
      else setActiveMobileTab("Home");
    }
  }, [pathname]);

  // Hide top nav on scroll down (desktop mainly, but applies globally), show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Reveal top navbar when scrolling completely stops
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > 50) setHidden(false);
      }, 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* =========================================
          TOP NAVBAR (Desktop & Mobile Header)
          ========================================= */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-150%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 px-4 md:px-0 ${scrolled ? 'pt-4' : 'pt-6'}`}
      >
        <div className={`
          flex items-center justify-between transition-all duration-500 rounded-full relative
          ${scrolled 
            ? "w-full md:w-[750px] lg:w-[850px] bg-[#f5f5f7]/80 backdrop-blur-xl border border-black/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] px-4 py-2" 
            : "w-full md:w-[850px] lg:w-[1000px] bg-transparent border-transparent px-2 py-4"}
        `}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-10 px-2 relative" onClick={() => setActiveMobileTab("Home")}>
            <div className="w-8 h-8 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center group-hover:border-black/20 transition-colors">
              <Logo className="w-5 h-5 text-[#1d1d1f] group-hover:text-[#1d1d1f] transition-colors" />
            </div>
            <span className="font-display font-bold text-lg tracking-wide text-[#1d1d1f]">We Digitliz</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 z-10">
            <AnimatePresence>
              {desktopNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-5 py-2.5 text-sm font-medium text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors"
                >
                  <span className="relative z-10">{link.name}</span>
                  {hoveredLink === link.name && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-black/10 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA Button (Desktop & Mobile) */}
          <div className="z-10 pl-4">
            <Link
              href="/#contact"
              className="group relative px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-primary hover:bg-black/5 text-[#1d1d1f] font-bold text-xs md:text-sm shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Start <span className="hidden sm:inline">Project</span></span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div className="absolute inset-0 bg-[#1d1d1f] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          </div>
        </div>
      </motion.nav>


      {/* =========================================
          MOBILE BOTTOM APP DOCK (Mobile Only)
          ========================================= */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
         <div className="bg-[#1d1d1f]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
           {mobileNavLinks.map((link) => {
             const isActive = activeMobileTab === link.name;
             const Icon = link.icon;
             
             return (
               <Link 
                 key={link.name} 
                 href={link.href}
                 onClick={() => setActiveMobileTab(link.name)}
                 className={`relative flex flex-col items-center justify-center w-full py-2 gap-1 rounded-2xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
               >
                 {isActive && (
                   <motion.div 
                     layoutId="mobile-dock-active"
                     className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                 )}
                 <Icon size={20} className="relative z-10" />
                 <span className="text-[10px] font-bold tracking-wider relative z-10">{link.name}</span>
               </Link>
             )
           })}
         </div>
      </div>
    </>
  );
}
