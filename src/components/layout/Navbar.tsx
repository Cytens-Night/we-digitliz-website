"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, CreditCard, Folder, LayoutGrid, GitMerge, Mail } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/#services", icon: LayoutGrid },
  { name: "Industries", href: "/#industries", icon: Briefcase },
  { name: "Process", href: "/#process", icon: GitMerge },
  { name: "Investment", href: "/#pricing", icon: CreditCard },
  { name: "Projects", href: "/works", icon: Folder },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Home");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (pathname === "/works") setActiveTab("Projects");
      else if (hash.includes("services")) setActiveTab("Services");
      else if (hash.includes("industries")) setActiveTab("Industries");
      else if (hash.includes("process")) setActiveTab("Process");
      else if (hash.includes("pricing")) setActiveTab("Investment");
      else setActiveTab("Home");
    }
  }, [pathname]);

  return (
    <>
      {/* =========================================
          LEFT SIDEBAR (Desktop)
          ========================================= */}
      <nav className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-[#1d1d1f]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-[2rem] py-4 px-2 flex flex-col gap-2 transition-all duration-300 ease-in-out w-14 hover:w-48 group overflow-hidden items-start">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 px-2 mb-4 w-full" onClick={() => setActiveTab("Home")}>
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
              className="relative flex items-center gap-4 px-2 py-2.5 rounded-2xl transition-colors duration-300 w-full bg-white/5 hover:bg-white/15 border border-white/10 group/btn"
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
          MOBILE BOTTOM APP DOCK (Mobile Only)
          ========================================= */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
         <div className="bg-[#1d1d1f]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
           {navLinks.slice(0, 4).map((link) => {
             const isActive = activeTab === link.name;
             const Icon = link.icon;
             
             return (
               <Link 
                 key={link.name} 
                 href={link.href}
                 onClick={() => setActiveTab(link.name)}
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
