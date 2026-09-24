"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, CreditCard, Folder, LayoutGrid, GitMerge, Mail, X, Menu } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Industries", href: "/#industries", icon: Briefcase },
  { name: "Services", href: "/#services", icon: LayoutGrid },
  { name: "Process", href: "/#process", icon: GitMerge },
  { name: "Investment", href: "/#pricing", icon: CreditCard },
  { name: "Projects", href: "/projects", icon: Folder },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname === "/projects") {
      setActiveTab("Projects");
      return;
    }

    const sections = [
      { id: "industries", name: "Industries" },
      { id: "services", name: "Services" },
      { id: "process", name: "Process" },
      { id: "pricing", name: "Investment" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let currentActive = null;

      if (window.scrollY < 100) {
        setActiveTab("Home");
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.id === entry.target.id);
          if (section) {
            currentActive = section.name;
          }
        }
      });

      if (currentActive) {
        setActiveTab(currentActive);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveTab("Home");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* =========================================
          TOP NAVBAR (Desktop)
          ========================================= */}
      <nav className="hidden md:flex fixed top-4 inset-x-0 z-50 justify-center pointer-events-none">
        <div className="bg-[#1d1d1f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-full px-4 py-2.5 flex items-center gap-4 pointer-events-auto transition-all duration-300 ease-in-out border-b border-white/5">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 mr-2 group" onClick={() => setActiveTab("Home")}>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform border border-white/10">
              <Logo className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-sm tracking-wide text-white whitespace-nowrap">
              wedigitlize
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`relative flex items-center px-4 py-2 rounded-full transition-colors duration-300 text-xs font-bold tracking-wider uppercase ${isActive ? 'text-[#1d1d1f]' : 'text-white/70 hover:text-white'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="topbar-active"
                      className="absolute inset-0 bg-white rounded-full pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="ml-2">
            <Link
              href="/#contact"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center px-5 py-2.5 rounded-full bg-primary hover:bg-white text-white hover:text-black transition-all duration-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,122,255,0.4)]"
            >
              Start Project
            </Link>
          </div>
        </div>
      </nav>

      {/* =========================================
          MOBILE BOTTOM GLASS DOCK
          ========================================= */}
      <div className="md:hidden fixed z-[999] inset-x-0 flex justify-center pointer-events-none" style={{ bottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <div className="bg-[#1d1d1f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-full px-6 py-3 flex items-center justify-between gap-8 max-w-[320px] w-[90%] relative pointer-events-auto mx-auto">
          
          {/* Main Logo Button (Triggers unique side menu) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform relative"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                 <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                   <X size={18} />
                 </motion.div>
              ) : (
                 <motion.div key="logo" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                   <Logo className="w-5 h-5 text-white" />
                 </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="/projects" 
              onClick={() => setActiveTab("Projects")}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === "Projects" ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              <Folder size={20} />
            </Link>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-all"
            >
              <FiInstagram size={20} />
            </a>

            <Link 
              href="/#contact"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-all"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================
          UNIQUE MOBILE SIDE MENU (Drawer with staggered animation)
          ========================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 z-[50] bg-black/40 backdrop-blur-md"
            />
            
            {/* Side Menu Panel */}
            <motion.div
              initial={{ x: "-100%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }}
              animate={{ x: 0, borderTopRightRadius: "0%", borderBottomRightRadius: "0%" }}
              exit={{ x: "-100%", borderTopRightRadius: "50%", borderBottomRightRadius: "50%" }}
              transition={{ type: "spring", damping: 22, stiffness: 150 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[75vw] max-w-sm bg-[#0a0a0a] border-r border-white/10 z-[55] shadow-[20px_0_40px_rgba(0,0,0,0.5)] flex flex-col p-8 pt-24 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 left-0 w-full h-64 bg-[#007AFF]/20 blur-[100px] pointer-events-none" />

              <div className="flex flex-col gap-2 relative z-10">
                {navLinks.map((link, index) => {
                  const isActive = activeTab === link.name;
                  const Icon = link.icon;
                  
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveTab(link.name);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`group flex items-center gap-4 py-4 px-4 rounded-2xl transition-all ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
                      >
                        <div className={`p-2 rounded-full ${isActive ? 'bg-[#007AFF] text-white' : 'bg-white/5 text-white/50 group-hover:text-white group-hover:bg-white/10'}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`text-xl tracking-tight font-display font-bold ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div 
                className="mt-auto pt-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (pathname === "/") {
                      e.preventDefault();
                      setTimeout(() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#007AFF] text-white font-bold tracking-widest uppercase text-xs active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,122,255,0.4)]"
                >
                  <Mail size={16} />
                  Initiate Project
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
