import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wedigitlize | Digital Transformation Agency",
  description: "We build automated systems, premium online presences, and custom applications to elevate your business.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#f5f5f7] text-foreground`}
      >
        <main className="w-full relative max-w-[100vw] overflow-x-clip md:overflow-visible">
          {children}
        </main>
      </body>
    </html>
  );
}
