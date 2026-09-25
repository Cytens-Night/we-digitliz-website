"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, CreditCard, Folder, LayoutGrid, GitMerge, Mail, X, Menu, Info, Star } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/#about", icon: Info },
  { name: "Clients", href: "/#portfolio", icon: Star },
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
  const [isTopNavVisible, setIsTopNavVisible] = useState(false);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- MOUSE & SCROLL EVENT LISTENERS (ALWAYS ACTIVE) ---
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      // Don't auto-reset active tab to Home if on projects page
      if (window.scrollY < 100 && pathname !== "/projects") {
        setActiveTab("Home");
      }
      
      if (window.scrollY < 100) {
        if (window.innerWidth >= 768) setIsTopNavVisible(true);
      } else {
        if (window.innerWidth >= 768) {
          if (window.scrollY < lastScrollY) {
            setIsTopNavVisible(true);
          } else {
            setIsTopNavVisible(false);
          }
        }
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;

      // Top nav trigger
      if (e.clientY < 60) {
        setIsTopNavVisible(true);
      } else if (e.clientY > 150) {
        setIsTopNavVisible(false);
      }

      // Side nav trigger
      if (e.clientX < 40) {
        setIsSideNavVisible(true);
      } else if (e.clientX > 250) {
        setIsSideNavVisible(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- INTERSECTION OBSERVER (HOME PAGE ONLY) ---
    let observer: IntersectionObserver | null = null;
    
    if (pathname === "/projects") {
      setActiveTab("Projects");
    } else {
      const sections = [
        { id: "about", name: "About" },
        { id: "portfolio", name: "Clients" },
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

      observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && observer) observer.observe(el);
      });
    }

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
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

  // Remove the body push effect because it created a weird white background gap
  // The user requested it to just slide out cleanly over the content like the top nav

  return (
    <>
      {/* =========================================
          TOP NAVBAR (Desktop)
          ========================================= */}
      <nav 
        className={`hidden md:flex fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${isTopNavVisible && !isSideNavVisible ? 'top-6' : '-top-full'}`}
      >
        <div className="bg-[#1d1d1f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-full px-6 py-3 flex items-center justify-between gap-2 lg:gap-6 w-max">
          <Link href="/" className="flex items-center gap-2 pr-6 border-r border-white/10" onClick={() => setActiveTab("Home")}>
            <Logo className="w-5 h-5 text-white" />
            <span className="font-display font-bold text-xs tracking-wide text-white">wedigitlize</span>
          </Link>

          <div className="flex items-center gap-1 lg:gap-2">
            {navLinks.filter(l => l.name !== "Home").map((link) => {
              const isActive = activeTab === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setActiveTab(link.name);
                    if (pathname === "/" && link.href.startsWith("/#")) {
                      e.preventDefault();
                      const targetId = link.href.substring(2);
                      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full transition-colors duration-300 text-xs font-bold tracking-wider ${isActive ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================================
          LEFT SIDEBAR (Desktop)
          ========================================= */}
      <nav 
        className={`hidden md:flex fixed top-4 bottom-4 z-50 transition-all duration-500 ease-in-out ${isSideNavVisible ? 'left-4' : '-left-[120%]'}`}
      >
        <div className="bg-[#1d1d1f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[2rem] py-6 px-4 flex flex-col gap-2 w-52 items-start h-full">
          
          <Link href="/" className="flex items-center gap-4 px-2 mb-8 w-full" onClick={() => setActiveTab("Home")}>
            <div className="w-6 h-6 shrink-0 flex items-center justify-center">
              <Logo className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-sm tracking-wide text-white">
              wedigitlize
            </span>
          </Link>

          <div className="flex flex-col gap-2 w-full relative">
            {navLinks.filter(link => link.name !== "Home").map((link) => {
              const isActive = activeTab === link.name;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setActiveTab(link.name);
                    if (pathname === "/" && link.href.startsWith("/#")) {
                      e.preventDefault();
                      const targetId = link.href.substring(2);
                      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`relative flex items-center gap-4 px-3 py-3 rounded-2xl transition-colors duration-300 w-full ${isActive ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-bold tracking-wider">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto w-full pt-4">
            <Link
              href="/#contact"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl transition-colors duration-300 w-full bg-card transition-colors duration-1000 text-black dark:text-white hover:bg-[#007AFF] hover:text-white group/btn"
            >
              <span className="text-xs font-bold tracking-wider">
                Contact Us
              </span>
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
              className="md:hidden fixed top-0 left-0 bottom-0 w-[75vw] max-w-sm bg-background transition-colors duration-1000 border-r border-white/10 z-[55] shadow-[20px_0_40px_rgba(0,0,0,0.5)] flex flex-col p-8 pt-24 overflow-hidden"
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
