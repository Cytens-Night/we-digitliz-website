import { Globe, Smartphone, Palette, CreditCard, Workflow, ShoppingBag, Megaphone, LifeBuoy } from "lucide-react";
const services = [
  [Globe,"Websites & landing pages","Clear, responsive websites that make it easy to understand your business and get in touch.","Business websites · Landing pages · Search foundations"],
  [Smartphone,"Web apps & mobile apps","Portals, dashboards and iOS or Android experiences shaped around real user needs.","SaaS products · Client portals · Mobile apps"],
  [Palette,"Brand identity & design","A recognisable identity, from the logo and typography to the details that hold it together.","Logos · Brand guidelines · Print & packaging"],
  [CreditCard,"Digital business cards","A branded link for your contacts, services, products and social channels, ready to share by QR.","Contact saving · QR sharing · Product showcases"],
  [ShoppingBag,"E-commerce & booking","Product browsing and booking journeys with the integrations your business needs.","Online stores · Catalogues · Booking flows"],
  [Workflow,"Automation & integrations","Connect your tools and reduce repetitive work with carefully scoped business systems.","CRM workflows · APIs · AI-assisted tools"],
  [Megaphone,"Social media & content","A consistent visual presence with content designed around your services and audience.","Content planning · Post design · Reels & campaigns"],
  [LifeBuoy,"Website care & optimisation","Keep your digital presence useful with updates, performance checks and agreed support.","Maintenance · Search setup · Ongoing improvements"],
] as const;
export default function Services() {
  return <section id="services" className="wd-section wd-services"><div className="wd-shell"><div className="wd-section-heading"><div><p className="wd-eyebrow">What we do</p><h2>Everything your next<br />chapter needs.</h2></div><p>Choose one service or bring the whole project together. We define the right scope with you.</p></div><div className="wd-service-grid">{services.map(([Icon,title,description,detail],i) => <article className="wd-service" key={title}><div className="wd-service-top"><Icon size={26}/><span>0{i+1}</span></div><h3>{title}</h3><p>{description}</p><div className="wd-service-detail">{detail}</div></article>)}</div></div></section>;
}
