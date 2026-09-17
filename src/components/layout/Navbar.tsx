"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, CreditCard, Folder, LayoutGrid, GitMerge, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Industries", href: "/#industries", icon: Briefcase },
  { name: "Services", href: "/#services", icon: LayoutGrid },
  { name: "Process", href: "/#process", icon: GitMerge },
  { name: "Investment", href: "/#pricing", icon: CreditCard },
  { name: "Projects", href: "/works", icon: Folder },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Home");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname === "/works") {
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
      rootMargin: "-30% 0px -70% 0px", // Triggers when section is in top 30% of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let currentActive = null;

      // Check if we are at the very top of the page
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

    // Handle scroll to top explicitly
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
          NATIVE APP BOTTOM NAVIGATION (Fiverr Style - Scrollable)
          ========================================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-[#161a22] border-t border-white/5 pb-[env(safe-area-inset-bottom,16px)]">
         <div className="flex items-center overflow-x-auto hide-scrollbars w-full h-16 px-2 snap-x">
           {navLinks.map((link) => {
             const isActive = activeTab === link.name;
             const Icon = link.icon;
             
             return (
               <Link 
                 key={link.name} 
                 href={link.href}
                 onClick={() => setActiveTab(link.name)}
                 className={`shrink-0 w-[20vw] min-w-[72px] snap-center flex flex-col items-center justify-center h-full gap-1 transition-colors duration-200 active:scale-95 ${isActive ? 'text-primary' : 'text-[#8a8d91] hover:text-white'}`}
               >
                 <Icon 
                   size={22} 
                   strokeWidth={isActive ? 2.5 : 2} 
                   className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'scale-100'}`} 
                 />
                 <span className={`text-[10px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${isActive ? 'opacity-100 font-bold' : 'opacity-80'}`}>
                   {link.name}
                 </span>
               </Link>
             )
           })}
         </div>
      </div>
    </>
  );
}
