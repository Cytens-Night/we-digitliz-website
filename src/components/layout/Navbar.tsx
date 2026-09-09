"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Industries", href: "/#industries" },
  { name: "Investment", href: "/#pricing" },
  { name: "Process", href: "/#process" },
  { name: "Works", href: "/works" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Hide nav on scroll down, show on scroll up, AND show when scrolling stops
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide when scrolling down past 150px
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false); // Show when scrolling up
    }
    
    setScrolled(latest > 50);
  });

  // Reveal navbar when scrolling completely stops
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear the previous timeout
      clearTimeout(timeoutId);
      
      // Set a new timeout to detect when scrolling stops
      timeoutId = setTimeout(() => {
        // If we've scrolled past the top, reveal the nav
        if (window.scrollY > 50) {
          setHidden(false);
        }
      }, 150); // Reduced from 400ms to 150ms for much faster response
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Buttery smooth custom easing
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 px-4 md:px-0 ${scrolled ? 'pt-4' : 'pt-6'}`}
    >
      <div className={`
        flex items-center justify-between transition-all duration-500 rounded-full relative
        ${scrolled 
          ? "w-full md:w-[750px] lg:w-[850px] bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] px-4 py-2" 
          : "w-full md:w-[850px] lg:w-[1000px] bg-transparent border-transparent px-2 py-4"}
      `}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group z-10 px-2 relative">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
            <Logo className="w-5 h-5 text-white group-hover:text-white transition-colors" />
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-white">We Digitliz</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 z-10">
          <AnimatePresence>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <span className="relative z-10">{link.name}</span>
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-white/10 rounded-full"
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

        {/* Desktop CTA */}
        <div className="hidden md:block z-10 pl-4">
          <Link
            href="/#contact"
            className="group relative px-6 py-2.5 rounded-full bg-white hover:bg-white/90 text-black font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">Start Project</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <motion.div 
              className="absolute inset-0 bg-white -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" 
            />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-10 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[80px] left-4 right-4 bg-[#111111] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] rounded-2xl py-6 px-6 md:hidden flex flex-col gap-2 z-40 overflow-hidden"
          >
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] -z-10" />
            
            {navLinks.map((link, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
              >
                <Link
                  href={link.href}
                  className="block text-xl font-display font-bold text-white/80 hover:text-white py-3 border-b border-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/#contact"
                className="w-full py-4 rounded-xl bg-white text-black text-center font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Project <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
