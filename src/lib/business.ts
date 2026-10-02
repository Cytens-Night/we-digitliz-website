export const business = {
  name: "wedigitlize",
  email: "info@wedigitlize.com",
  phone: "+447584296946",
  phoneLabel: "+44 7584 296946",
  url: "https://wedigitlize.com",
  cardUrl: "https://wedigitlize.com/card",
  instagram: "https://www.instagram.com/wedigitlize/",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const projects = [
  { id: "shakur", name: "Shakur Fragrances", type: "Interactive digital business card", url: "https://card.shakurfragrances.co.uk/", image: "/work/shakur.jpg", description: "A distinctive black-and-gold experience that brings the fragrance collection, contact details and social links into one place.", features: ["Interactive product collection", "Contact saving & QR sharing", "Brand-led visual design"] },
  { id: "furqan", name: "Furqan Sweets", type: "Retail website & product catalogue", url: "https://furqansweets.co.uk/", image: "/work/furqan.jpg", description: "A bilingual storefront for Somali sweets, with product browsing, bulk-order information and clear routes to contact the bakery.", features: ["English & Somali content", "Product catalogue", "Bulk-order enquiries"] },
  { id: "hesori", name: "Hesori", type: "Brand website", url: "https://hesori.com", image: "", description: "A website project focused on presenting a clear brand identity and a considered digital presence.", features: ["Brand presentation", "Responsive layouts", "Website design"] },
  { id: "marshalos", name: "Marshalos", type: "Website & interface design", url: "https://marshalos.co.uk", image: "", description: "Website and interface work built around a consistent visual identity and an approachable customer experience.", features: ["Interface design", "Brand consistency", "Responsive development"] },
  { id: "furqan-card", name: "Furqan Sweets Card", type: "Digital business card", url: "https://furqansweets.co.uk/card", image: "", description: "A branded digital introduction for Furqan Sweets, bringing the bakery’s contact details and online presence together.", features: ["Branded contact experience", "Mobile presentation", "Quick business connections"] },
  { id: "studio-card", name: "wedigitlize Studio Card", type: "Interactive 3D business card", url: business.cardUrl, image: "", description: "Our own digital card, built around a 3D phone, an orbit of services and a flip-to-QR experience. Explore the studio and connect in one place.", features: ["Interactive service orbit", "Contact download & card sharing", "3D phone & QR destinations"] },
];

export const packages = [
  { id: "starter", name: "Starter", price: 780, description: "A considered first presence for a new business.", features: ["Up to 3 website pages", "Logo & starter brand styling", "Responsive design", "Page titles & basic search setup", "Contact form", "2 rounds of design revisions"] },
  { id: "professional", name: "Professional", price: 1799, description: "A connected website and digital card for a growing brand.", features: ["Up to 5 website pages", "Branded digital business card", "Search-ready page structure", "Contact form & social links", "Refined interactions", "2 rounds of design revisions"], recommended: true },
  { id: "enterprise", name: "Enterprise", price: 5460, description: "A starting scope for businesses with more complex needs.", features: ["Up to 10 website pages", "Product card catalogue (up to 6)", "One agreed CRM integration", "Web app / mobile discovery", "User flows & interactive prototype", "Testing & launch handover"] },
];

export type ServiceOption = { id: string; category: string; title: string; description: string; price: number; monthly: number; group?: string; quoteOnly?: boolean };
export const serviceOptions: ServiceOption[] = [
  { id: "web-1", category: "Websites", title: "Landing page", description: "One focused page with an enquiry action.", price: 200, monthly: 0, group: "website" },
  { id: "web-3", category: "Websites", title: "3-page website", description: "A compact business website.", price: 600, monthly: 0, group: "website" },
  { id: "web-5", category: "Websites", title: "5-page website", description: "More room for services and your work.", price: 950, monthly: 0, group: "website" },
  { id: "web-10", category: "Websites", title: "10-page website", description: "An expanded business presence.", price: 1980, monthly: 0, group: "website" },
  { id: "dc-1", category: "Digital cards", title: "Digital business card", description: "Contact links, QR sharing and contact download.", price: 350, monthly: 0, group: "card" },
  { id: "dc-4", category: "Digital cards", title: "4-product digital catalogue", description: "A card with up to four product showcases.", price: 500, monthly: 0, group: "card" },
  { id: "dc-6", category: "Digital cards", title: "6-product digital catalogue", description: "A card with up to six product showcases.", price: 800, monthly: 0, group: "card" },
  { id: "br-logo", category: "Brand & content", title: "Logo & starter identity", description: "Logo, colours and type direction.", price: 180, monthly: 0 },
  { id: "br-icons", category: "Brand & content", title: "Custom icon set", description: "A small, agreed set of brand icons.", price: 250, monthly: 0 },
  { id: "social", category: "Brand & content", title: "Social content & management", description: "A content plan, design and management scoped to your channels.", price: 0, monthly: 0, quoteOnly: true },
  { id: "print", category: "Brand & content", title: "Flyers & print design", description: "Campaign layouts prepared for your printer.", price: 0, monthly: 0, quoteOnly: true },
  { id: "mk-seo", category: "Ongoing support", title: "Search setup & support", description: "Initial optimisation plus an agreed monthly scope.", price: 499, monthly: 50 },
  { id: "mk-maint", category: "Ongoing support", title: "Website care", description: "Routine updates and checks within an agreed support allowance.", price: 0, monthly: 50 },
  { id: "crm", category: "Apps & systems", title: "CRM & workflow integration", description: "Connect enquiries, customer records and business tools.", price: 0, monthly: 0, quoteOnly: true },
  { id: "pwa", category: "Apps & systems", title: "Web app / SaaS", description: "Dashboards, portals and product workflows.", price: 0, monthly: 0, quoteOnly: true },
  { id: "native", category: "Apps & systems", title: "iOS & Android app", description: "Design and development with an agreed release scope.", price: 0, monthly: 0, quoteOnly: true },
  { id: "commerce", category: "Apps & systems", title: "E-commerce & booking", description: "A store or booking flow matched to your operations.", price: 0, monthly: 0, quoteOnly: true },
  { id: "automation", category: "Apps & systems", title: "AI & business automation", description: "Useful automations with clear controls and integrations.", price: 0, monthly: 0, quoteOnly: true },
];

export const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);
