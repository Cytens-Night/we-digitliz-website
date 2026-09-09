import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import DigitalCards from "@/components/sections/DigitalCards";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Navbar />
      
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-[#3c3c43]">Loading Experience...</div>}>
        <Hero />
      </Suspense>

      <About />
      <DigitalCards />
      <Industries />
      <Services />
      <Process />
      <Pricing />
      <Contact />
      <Footer /> 
    </main>
  );
}
