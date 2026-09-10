import Link from "next/link";
import { Globe, Mail, MessageCircle, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] pt-20 pb-10 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <Logo className="w-8 h-8 text-[#1d1d1f] group-hover:text-[#1d1d1f] transition-colors" />
              <span className="font-display font-bold text-2xl tracking-wide text-[#1d1d1f]">We Digitlize</span>
            </Link>
            <p className="text-[#3c3c43] text-sm leading-relaxed mb-6">
              We digitlize your world so you can still lead in confidence. Building automated systems and premium online presences.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#3c3c43] hover:bg-primary hover:text-[#1d1d1f] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/wedigitlize" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#3c3c43] hover:bg-primary hover:text-[#1d1d1f] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#3c3c43] hover:bg-primary hover:text-[#1d1d1f] transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#3c3c43] hover:bg-primary hover:text-[#1d1d1f] transition-all">
                <Phone className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#3c3c43] hover:bg-primary hover:text-[#1d1d1f] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Automated Systems</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Web Presence</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Brand Redesign</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">App Development</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold mb-6">Industries</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Retail & E-Commerce</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Healthcare</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Real Estate</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Creative Agencies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1d1d1f] font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/#about" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">About Us</Link></li>
              <li><Link href="/#process" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Our Process</Link></li>
              <li><Link href="/works" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Works / Portfolio</Link></li>
              <li><Link href="/#contact" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm text-[#3c3c43] hover:text-[#1d1d1f] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[#3c3c43] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} We Digitlize. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#3c3c43]">
            Made with <Logo className="w-4 h-4 text-[#1d1d1f]" /> by We Digitlize
          </div>
        </div>
      </div>
    </footer>
  );
}
