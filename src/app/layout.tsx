import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./studio.css";
import { business } from "@/lib/business";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: "wedigitlize | Websites, Apps & Branding", template: "%s | wedigitlize" },
  description: "London digital studio creating custom websites, apps, branding, social content and digital business cards. Explore our work and discuss your project.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_GB", siteName: "wedigitlize", title: "wedigitlize — Design. Build. Connect.", description: "Websites, apps, branding and digital experiences built around your business.", url: business.url, images: [{ url: "/social-preview.png", width: 1200, height: 630, alt: "wedigitlize digital studio" }] },
  twitter: { card: "summary_large_image" },
  manifest: "/manifest.json",
};
export const viewport: Viewport = { themeColor: "#101218" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
 const schema = { "@context": "https://schema.org", "@type": "Organization", name: business.name, url: business.url, email: business.email, telephone: business.phone, logo: `${business.url}/logo-black.svg` };
 return <html lang="en" className={`${inter.variable} ${outfit.variable}`}><body><a className="wd-skip" href="#main-content">Skip to content</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}/></body></html>;
}
