"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, CreditCard, Folder, LayoutGrid, GitMerge, Mail, X, Menu } from "lucide-react";
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
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* =========================================
          LEFT SIDEBAR (Desktop)
          ========================================= */}
      <nav className="hidden md:flex fixed left-4 top-4 bottom-4 z-50">
        <div className="bg-[#1d1d1f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[2rem] py-6 px-2 flex flex-col gap-2 transition-all duration-300 ease-in-out w-14 hover:w-48 group overflow-hidden items-start h-full">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 px-2 mb-8 w-full" onClick={() => setActiveTab("Home")}>
            <div className="w-6 h-6 shrink-0 flex items-center justify-center">
              <Logo className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-sm tracking-wide text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              We Digitlize
            </span>
          </Link>

          {/* Links */}
          <div className="flex flex-col gap-2 w-full relative">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`relative flex items-center gap-4 px-2 py-2.5 rounded-2xl transition-colors duration-300 w-full ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-white/10 rounded-2xl pointer-events-none"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="w-6 h-6 shrink-0 flex items-center justify-center relative z-10">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-bold tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-auto w-full pt-4">
            <Link
              href="/#contact"
              className="relative flex items-center gap-4 px-2 py-2.5 rounded-2xl transition-colors duration-300 w-full hover:bg-white/10 group/btn"
            >
              <div className="w-6 h-6 shrink-0 flex items-center justify-center relative z-10">
                <Mail size={16} className="text-white" />
              </div>
              <span className="text-xs font-bold tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 text-white">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* =========================================
          MOBILE FLOATING LOGO BUTTON
          ========================================= */}
      <div className="md:hidden fixed top-6 right-6 z-[60]">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex items-center justify-center text-black active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? (
             <X size={20} />
          ) : (
             <Logo className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* =========================================
          MOBILE SIDE MENU (Drawer)
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
              className="md:hidden fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm"
            />
            
            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-white z-[55] shadow-[-20px_0_40px_rgba(0,0,0,0.1)] flex flex-col p-8 pt-24"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const isActive = activeTab === link.name;
                  const Icon = link.icon;
                  
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setActiveTab(link.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-4 py-3 border-b border-black/5 transition-colors ${isActive ? 'text-primary font-bold' : 'text-black/70 hover:text-black'}`}
                    >
                      <Icon size={20} className={isActive ? 'text-primary' : 'text-black/50'} />
                      <span className="text-lg tracking-tight">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-black text-white font-bold tracking-wide active:scale-95 transition-transform"
                >
                  <Mail size={18} />
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
