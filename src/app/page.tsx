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
  return <><Navbar/><main id="main-content"><Hero/><About/><DigitalCards/><Services/><Industries/><Process/><Pricing/><Contact/></main><Footer/></>;
}
