import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
 return <><Navbar/><main id="main-content" className="wd-shell wd-legal-page"><p className="wd-eyebrow">wedigitlize</p><h1>{title}</h1><p>Updated 2 October 2026</p>{children}</main><Footer/></>;
}
