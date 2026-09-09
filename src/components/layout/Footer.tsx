import Link from "next/link";
import { Globe, Mail, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <Logo className="w-8 h-8 text-white group-hover:text-white transition-colors" />
              <span className="font-display font-bold text-2xl tracking-wide text-white">We Digitliz</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              We digitliz your world so you can still lead in confidence. Building automated systems and premium online presences.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all">
                <Phone className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white hover:text-black transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Automated Systems</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Web Presence</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Brand Redesign</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">App Development</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Industries</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Retail & E-Commerce</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Healthcare</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Real Estate</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Creative Agencies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/#about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#process" className="text-sm text-white/60 hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/works" className="text-sm text-white/60 hover:text-white transition-colors">Works / Portfolio</Link></li>
              <li><Link href="/#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} We Digitliz. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/40">
            Made with <Logo className="w-4 h-4 text-white" /> by We Digitliz
          </div>
        </div>
      </div>
    </footer>
  );
}
