"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BellRing, Check, CheckCircle2, ChefHat, ChevronDown, ChevronRight, CircleHelp, Clock3, Coffee, CreditCard, Gift, Globe2, Heart, LayoutDashboard, Menu as MenuIcon, MessageCircleHeart, Minus, Plus, QrCode, ReceiptText, Search, Send, ShieldAlert, ShieldCheck, ShoppingBag, Sparkles, TrendingUp, UtensilsCrossed, WalletCards, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import "./style.css";

type View = "host" | "menu" | "kitchen" | "owner";
type TicketStatus = "New" | "Preparing" | "Ready" | "Served";
type ChatMessage = { role: "assistant" | "user"; text: string; danger?: boolean };
type Dish = { id: number; name: string; category: string; price: number; description: string; icon: string; colour: string; label?: string };
type Ticket = { id: number; table: string; items: string[]; total: number; status: TicketStatus };
const dishes: Dish[] = [
 { id: 1, name: "Anatolian mixed grill", category: "Mains", price: 24.50, description: "A generous selection inspired by traditional charcoal cooking.", icon: "🍢", colour: "ember", label: "Guest favourite" },
 { id: 2, name: "Chicken shish", category: "Mains", price: 17.50, description: "Smoky skewers with peppers and fragrant herbs.", icon: "🍗", colour: "gold", label: "Our pick" },
 { id: 3, name: "Hummus & warm flatbread", category: "Starters", price: 7.50, description: "Creamy chickpeas with an olive oil finish.", icon: "🥙", colour: "sage" },
 { id: 4, name: "Crispy halloumi", category: "Starters", price: 8.50, description: "Golden bites with a bright herb accompaniment.", icon: "🧀", colour: "peach" },
 { id: 5, name: "Pistachio baklava", category: "Desserts", price: 7, description: "Layers of delicate pastry and sweet syrup.", icon: "🍯", colour: "olive" },
 { id: 6, name: "Mint lemonade", category: "Drinks", price: 4.50, description: "Citrus, fresh mint and a refreshing finish.", icon: "🍋", colour: "lime" },
];
const seedTickets: Ticket[] = [
 { id: 1042, table: "03", items: ["Chicken shish × 2", "Mint lemonade × 2"], total: 44, status: "Preparing" },
 { id: 1043, table: "12", items: ["Anatolian mixed grill × 1", "Hummus & warm flatbread × 1"], total: 32, status: "New" },
 { id: 1041, table: "08", items: ["Pistachio baklava × 2"], total: 14, status: "Ready" },
];
const money = (n: number) => "£" + n.toFixed(2);
const steps: TicketStatus[] = ["New", "Preparing", "Ready", "Served"];
const featureCards = [
 { icon: MessageCircleHeart, label: "01 / Guest care", title: "A host, not a chatbot.", text: "Warm conversation, suggestions, helpful answers and thoughtful moments, any time a guest needs them." },
 { icon: QrCode, label: "02 / Ordering", title: "Every table, connected.", text: "A QR-powered menu, customisable orders and seamless communication without another app to download." },
 { icon: ChefHat, label: "03 / Operations", title: "Beautifully organised kitchens.", text: "Kitchen tickets flow straight to the correct station, with priorities and status updates." },
 { icon: CreditCard, label: "04 / Payments", title: "The effortless last impression.", text: "Offer digital payment, bill splitting, tips and receipts through an approved payment provider." },
 { icon: LayoutDashboard, label: "05 / Insights", title: "Every decision, clearer.", text: "Track orders, peak hours, popular dishes and service flow from a connected owner workspace." },
 { icon: Gift, label: "06 / Loyalty", title: "Give them a reason to return.", text: "Remember preferences with consent, celebrate milestones and offer personalised rewards." },
];
const faqs = [
 ["Does the AI host replace waiters?", "No. It handles repetitive questions, menu exploration and service routing while staff remain responsible for personal hospitality, order checks and food safety."],
 ["Can the host answer questions about allergies?", "It can display restaurant-verified written ingredient and allergen information. When an allergy, cross-contact question or uncertainty arises, it must ask a trained team member to confirm and must never guess."],
 ["Can guests pay on their phones?", "Yes, as a production integration with an approved merchant payment provider. This public demo deliberately does not take payments."],
 ["Does it work with any restaurant POS?", "Not automatically. We assess the POS API, supported payment devices, permissions and reconciliation before quoting the integration."],
 ["Can it speak more than one language?", "Yes. The production host can support multilingual conversation and translated menu explanations, with verified allergen text and clear human escalation."],
 ["Is this Likya's official system?", "No. This is an independent illustrative concept by WeDigitlize, inspired by a restaurant experience. Sample dishes, prices and claims are not Likya's approved menu."],
];

function replyTo(text: string) {
 const q = text.toLowerCase();
 if (/allerg|gluten|sesame|nut |nuts|peanut|dairy|lactose|celiac|coeliac|egg|mustard|shellfish|intoleran|cross.contamin|safe to eat/.test(q)) return { danger: true, text: "Thank you for telling me — your safety comes first. I can't confirm a dish is safe from this example menu or rule out cross-contact. I'll flag your dietary question to a trained staff member to check the restaurant's current ingredient and allergen records before you order. Would you like assistance at your table?" };
 if (/joke|laugh|funny|cheer/.test(q)) return { text: "Of course! Why did the tomato blush? Because it saw the salad dressing. 🍅 For a better punchline, I recommend dessert." };
 if (/combo|pair|together|for two|sharing|date|romantic/.test(q)) return { text: "For a cosy meal for two, try two chicken shish dishes, one hummus to share and two mint lemonades. In this sample menu that's £51.00 in total. Want me to add a starter or suggest dessert? Prices are illustrative." };
 if (/how|cook|grill|prepar|quality|source|fresh|ingredient|where/.test(q)) return { text: "Our demo draws inspiration from Anatolian charcoal-grilled cooking: a tradition known for smoky flavours and food shared at the table. For the real restaurant, preparation methods, ingredient sourcing and quality claims would come directly from its verified kitchen records. Want to hear about a particular dish?" };
 if (/light|vegetarian|vegan|healthy|small/.test(q)) return { text: "Fancy something lighter? Hummus and a fresh lemonade could make a lovely start. This is an illustrative menu, so I won't assume anything is vegetarian, vegan or suitable for a specific diet until staff confirm ingredients." };
 if (/spic|hot|mild|kid|child|family/.test(q)) return { text: "We can help you find something everyone enjoys. In a real restaurant, I'd check the verified spice level, portion sizes and children's options first. Would you prefer mild, smoky or a little adventurous?" };
 if (/dessert|sweet|after/.test(q)) return { text: "A sweet finish? Our sample pistachio baklava is a lovely one to explore. It may contain relevant allergens, so please check the restaurant's verified information with staff if needed." };
 if (/bill|pay|split|card|tip/.test(q)) return { text: "When connected to a payment provider, you could pay on your phone, split the bill or request a traditional bill from staff. The showcase is a demo only, so no money can be taken here." };
 if (/help|human|waiter|water|service|staff/.test(q)) return { text: "Absolutely. Tap 'Call a team member' below and I'll add a demo assistance request for your table. You're always welcome to speak with our team in person." };
 if (/recommend|hungry|popular|best|suggest|special|order/.test(q)) return { text: "If you're hungry, I'd start with our sample Anatolian mixed grill — bold, smoky and made for a satisfying meal. For something to share, add hummus and warm flatbread. Would you like a drink pairing or something lighter?" };
 if (/hello|hey|hi|thank|thanks/.test(q)) return { text: "It's lovely to have you here! 🌿 Tell me what you're in the mood for, or ask me anything about the menu. I can also tell a questionable food joke." };
 return { text: "I'd love to help with that! I can suggest pairings, explain the sample menu, talk about cooking traditions or arrange help from staff. For anything specific to ingredients or safety, a team member will confirm." };
}

export default function AutoRestaurantExperience() {
 const [active, setActive] = useState<View>("host");
 const [table, setTable] = useState("07");
 const [cart, setCart] = useState<Record<number, number>>({});
 const [category, setCategory] = useState("All");
 const [search, setSearch] = useState("");
 const [tickets, setTickets] = useState<Ticket[]>(seedTickets);
 const [calls, setCalls] = useState(0);
 const [chat, setChat] = useState<ChatMessage[]>([
  { role: "assistant", text: "Welcome to your table! 🌿 I'm your digital host. Feeling adventurous, looking for a sharing feast or just browsing? I'm here if you need anything." }
 ]);
 const [input, setInput] = useState("");
 const [notice, setNotice] = useState("");
 const [cartOpen, setCartOpen] = useState(false);
 const [qrOpen, setQrOpen] = useState(false);
 const [minutes, setMinutes] = useState(3);
 const [orders, setOrders] = useState(80);
 const [expanded, setExpanded] = useState<number | null>(0);
 const [navOpen, setNavOpen] = useState(false);
 useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  const t = query.get("table");
  if (t && /^\d{1,3}$/.test(t)) setTable(t.padStart(2, "0"));
 }, []);
 useEffect(() => {
  if (!notice) return;
  const timer = window.setTimeout(() => setNotice(""), 4000);
  return () => window.clearTimeout(timer);
 }, [notice]);
 const itemCount = Object.values(cart).reduce((a,b) => a + b, 0);
 const subtotal = dishes.reduce((acc,d) => acc + (cart[d.id] || 0) * d.price, 0);
 const displayed = useMemo(() => dishes.filter(d => (category === "All" || d.category === category) && (d.name + d.description).toLowerCase().includes(search.toLowerCase())), [category, search]);
 const liveTickets = tickets.filter(t => t.status !== "Served");
 const maxTicket = Math.max(...tickets.map(t => t.id));
 const sendChat = (value?: string) => {
  const message = (value ?? input).trim();
  if (!message) return;
  const response = replyTo(message);
  setChat(prev => [...prev, { role: "user", text: message }, { role: "assistant", text: response.text, danger: response.danger }]);
  setInput("");
 };
 const add = (id: number, delta: number) => setCart(previous => ({ ...previous, [id]: Math.max(0, (previous[id] ?? 0) + delta) }));
 const openDemo = (target: View) => {
  setActive(target);
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
 };
 const sendOrder = () => {
  if (itemCount < 1) return;
  const id = maxTicket + 1;
  setTickets(prev => [{ id, table, items: dishes.filter(d => cart[d.id]).map(d => d.name + " × " + cart[d.id]), total: subtotal, status: "New" }, ...prev]);
  setCart({});
  setCartOpen(false);
  setNotice("Demo order #" + id + " added to the kitchen board");
  setActive("kitchen");
 };
 const requestStaff = () => { setCalls(v => v + 1); setNotice("Demo assistance request sent from table " + table); };
 const advance = (id: number) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status: steps[Math.min(steps.indexOf(t.status) + 1, steps.length - 1)] } : t));
 const shareUrl = "https://wedigitlize.com/autorestaurant?table=" + table;
 const hours = Math.round(orders * minutes * 26 / 60);

 return <div className="ar-site" id="main-content">
  <div className="ar-topline"><span className="ar-dot" /> A NEW KIND OF RESTAURANT EXPERIENCE <span>AN INDEPENDENT CONCEPT BY WEDIGITLIZE <ArrowUpRight size={13} /></span></div>
  <header className="ar-header">
   <div className="ar-container ar-header-inner">
    <a className="ar-logo" href="/"><span className="ar-logo-symbol"><UtensilsCrossed size={22}/></span><span>auto<span className="ar-logo-accent">restaurant</span><b>.</b><small>BY WEDIGITLIZE</small></span></a>
    <nav className={navOpen ? "ar-nav open" : "ar-nav"}>
     <a href="#experience" onClick={() => setNavOpen(false)}>The experience</a><a href="#demo" onClick={() => setNavOpen(false)}>Interactive demo</a><a href="#platform" onClick={() => setNavOpen(false)}>Platform</a><a href="#plans" onClick={() => setNavOpen(false)}>Investment</a>
    </nav>
    <a className="ar-main-button ar-nav-cta" href="mailto:info@wedigitlize.com?subject=AutoRestaurant%20discovery%20call">Let's talk <ArrowUpRight size={16}/></a>
    <button className="ar-menu-toggle" aria-label="Toggle navigation" onClick={() => setNavOpen(v => !v)}>{navOpen ? <X/> : <MenuIcon/>}</button>
   </div>
  </header>
  <main>
   <section className="ar-hero ar-container">
    <div className="ar-hero-copy">
     <div className="ar-overline"><span className="ar-small-line"/> THE FUTURE OF HOSPITALITY FEELS HUMAN</div>
     <h1>Hospitality,<br/><em>beautifully</em><br/>handled<span className="ar-green-dot">.</span></h1>
     <p>Meet the digital host that knows your menu, delights your guests, and keeps the whole restaurant beautifully in sync.</p>
     <div className="ar-hero-buttons"><button className="ar-main-button ar-lime" onClick={() => openDemo("host")}>Meet the digital host <ArrowUpRight size={18}/></button><a href="#experience" className="ar-inline-link">Discover the experience <ArrowRight size={17}/></a></div>
     <div className="ar-hero-foot"><div className="ar-hero-tiny-icons"><span>✦</span><span>♧</span><span>✧</span></div><div><strong>More than a QR code.</strong><small>One considered journey from hello to goodbye.</small></div></div>
    </div>
    <div className="ar-hero-visual">
     <div className="ar-hero-background"></div>
     <div className="ar-photo-label"><span className="ar-dot"/> EXAMPLE GUEST JOURNEY <span>01 / 04</span></div>
     <div className="ar-floating-message">
      <div className="ar-floating-avatar"><Sparkles size={21}/></div>
      <div><small>YOUR DIGITAL HOST</small><p>“I have the perfect sharing suggestion for you. Shall we build a little feast?” <span>✦</span></p></div>
     </div>
     <div className="ar-visual-bottom"><span>YOUR TABLE, YOUR WAY</span><span className="ar-visual-circle"><ArrowUpRight size={25}/></span></div>
    </div>
   </section>
   <section className="ar-marquee"><div className="ar-container ar-marquee-inner"><span><Sparkles size={17}/> CONVERSATIONAL HOSPITALITY</span><span><QrCode size={17}/> SMART TABLE ORDERING</span><span><ChefHat size={18}/> CONNECTED KITCHENS</span><span><Heart size={17}/> MEMORABLE MOMENTS</span></div></section>

   <section className="ar-intro ar-container" id="experience">
    <div><div className="ar-overline">01 — THE IDEA</div><h2>Make every guest feel <em>looked after.</em></h2></div>
    <div className="ar-intro-right"><p>Technology should never get in the way of a wonderful meal. It should quietly make the experience better — with thoughtful suggestions, clear answers, smooth ordering and a real human always close by.</p><div className="ar-intro-signoff"><span className="ar-star">✳</span><span>Less admin. More attention. Better hospitality.</span></div></div>
   </section>

   <section className="ar-demo-section" id="demo">
    <div className="ar-container">
     <div className="ar-demo-heading"><div><div className="ar-overline ar-light-overline">02 — EXPERIENCE IT YOURSELF</div><h2>Don't just imagine it.<br/><em>Try it.</em></h2><p>A hands-on concept you can explore. Place an order, chat with the host, see it in the kitchen and manage the flow.</p></div><div className="ar-demo-pill"><span className="ar-dot"/> INTERACTIVE CONCEPT <span>NOT A LIVE RESTAURANT</span></div></div>
     <div className="ar-demo-shell">
      <div className="ar-demo-tabs"><div className="ar-demo-tab-group">
       {([{id:"host",name:"Digital host",icon:MessageCircleHeart},{id:"menu",name:"Guest menu",icon:UtensilsCrossed},{id:"kitchen",name:"Kitchen",icon:ChefHat},{id:"owner",name:"Owner view",icon:LayoutDashboard}] as const).map(t => <button key={t.id} className={active === t.id ? "active" : ""} onClick={() => setActive(t.id)}><t.icon size={17}/><span>{t.name}</span></button>)}
      </div><div className="ar-demo-status"><span className="ar-dot"/> DEMO MODE</div></div>
      <div className="ar-demo-content">
       <div className="ar-demo-side">
        <div className="ar-side-label">YOUR EXPERIENCE</div><h3>{active === "host" ? "A warmer welcome." : active === "menu" ? "Made to order." : active === "kitchen" ? "A calmer kitchen." : "The bigger picture."}</h3>
        <p>{active === "host" ? "Your always-available companion can recommend, explain and entertain, while knowing when a real team member is essential." : active === "menu" ? "Choose your favourites, build a cart, and watch the order travel to the kitchen." : active === "kitchen" ? "Track each order as it moves from new to preparing, ready and served." : "See how orders and service requests come together in one clean workspace."}</p>
        <div className="ar-side-divider"></div>
        <div className="ar-side-step"><span>01</span><div><strong>Open the experience</strong><small>No account or app required</small></div><CheckCircle2 size={18}/></div>
        <div className="ar-side-step"><span>02</span><div><strong>Make it your own</strong><small>Ask questions or add dishes</small></div><CheckCircle2 size={18}/></div>
        <div className="ar-side-step"><span>03</span><div><strong>See the entire flow</strong><small>From guest to front of house</small></div><CheckCircle2 size={18}/></div>
        <div className="ar-side-footer"><ShieldCheck size={17}/> Illustrative data only. No payments or restaurant orders are sent.</div>
       </div>
       <div className="ar-demo-window">
        {active === "host" && <div className="ar-chat-view">
         <div className="ar-customer-bar"><div><span className="ar-mini-eyebrow">THE RESTAURANT EXPERIENCE</span><h4>LIKYA <span>CONCEPT</span></h4></div><span className="ar-table-pill">TABLE {table}</span></div>
         <div className="ar-chat-head"><div className="ar-assistant-icon"><Sparkles size={23}/></div><div><h5>Your digital host <span className="ar-online-dot"/></h5><p>Here to make your visit wonderful</p></div><button onClick={requestStaff} className="ar-call-staff"><BellRing size={16}/> Call a team member</button></div>
         <div className="ar-chat-messages" aria-live="polite">{chat.map((m,i) => <div key={i} className={"ar-message " + (m.role === "user" ? "ar-user-message" : "ar-host-message")}>{m.role === "assistant" && <div className="ar-message-avatar">✳</div>}<div className={m.danger ? "ar-chat-bubble ar-bubble-danger" : "ar-chat-bubble"}>{m.danger && <ShieldAlert size={17}/>}<span>{m.text}</span></div></div>)}</div>
         <div className="ar-suggested-prompts">{["Recommend a meal for two","I have a nut allergy","How is it prepared?","Tell me a joke"].map(q => <button key={q} onClick={() => sendChat(q)}>{q} <ArrowUpRight size={12}/></button>)}</div>
         <form className="ar-chat-input" onSubmit={e => {e.preventDefault();sendChat();}}><input aria-label="Ask the digital host" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about your visit…" maxLength={300}/><button aria-label="Send message" disabled={!input.trim()}><Send size={17}/></button></form>
         <div className="ar-chat-disclaimer">Scripted concept responses. Allergy requests are always escalated to staff. Sample menu only.</div>
        </div>}
        {active === "menu" && <div className="ar-menu-view">
         <div className="ar-customer-bar"><div><span className="ar-mini-eyebrow">THE RESTAURANT EXPERIENCE</span><h4>LIKYA <span>CONCEPT</span></h4></div><span className="ar-table-pill">TABLE {table}</span></div>
         <div className="ar-menu-intro"><div><span className="ar-mini-eyebrow">MAKE YOURSELF AT HOME</span><h3>A little something <em>delicious.</em></h3><p>Thoughtful choices, inspired by Anatolian dining.</p></div><div className="ar-menu-lemon">✻</div></div>
         <div className="ar-search-box"><Search size={16}/><input aria-label="Search sample dishes" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find something lovely…"/></div>
         <div className="ar-category-row">{["All","Mains","Starters","Desserts","Drinks"].map(c => <button className={category === c ? "active" : ""} key={c} onClick={() => setCategory(c)}>{c}</button>)}</div>
         <div className="ar-dishes">{displayed.map(d => <article className="ar-dish" key={d.id}><div className={"ar-dish-art " + d.colour}>{d.icon}</div><div className="ar-dish-info">{d.label && <span className="ar-dish-label">{d.label}</span>}<strong>{d.name}</strong><p>{d.description}</p><b>{money(d.price)}</b></div><div className="ar-add-controls">{cart[d.id] ? <><button aria-label={"Remove " + d.name} onClick={() => add(d.id,-1)}><Minus size={14}/></button><span>{cart[d.id]}</span></> : null}<button aria-label={"Add " + d.name} onClick={() => add(d.id,1)}><Plus size={17}/></button></div></article>)}</div>
         {displayed.length === 0 && <p className="ar-empty">No sample dishes found. Try another category.</p>}
         <div className="ar-menu-cart-bar"><div><ShoppingBag size={19}/><span><strong>{itemCount} item{itemCount === 1 ? "" : "s"}</strong><small>{money(subtotal)} subtotal</small></span></div><button onClick={() => setCartOpen(true)} disabled={!itemCount}>View order <ArrowRight size={17}/></button></div>
        </div>}
        {active === "kitchen" && <div className="ar-kitchen-view"><div className="ar-workspace-header"><div><span className="ar-mini-eyebrow">BACK OF HOUSE / DEMO</span><h3>Kitchen display</h3><p>Every order. Right where it belongs.</p></div><div className="ar-workspace-live"><span className="ar-dot"/> Kitchen online</div></div>
         <div className="ar-workspace-stats"><div><span>Active tickets</span><strong>{liveTickets.length}</strong></div><div><span>New</span><strong>{tickets.filter(t=>t.status === "New").length}</strong></div><div><span>Ready</span><strong>{tickets.filter(t=>t.status === "Ready").length}</strong></div></div>
         <div className="ar-tickets">{tickets.slice(0,8).map(t=><article className="ar-ticket" key={t.id}><div className="ar-ticket-top"><span>TABLE {t.table} <small>#{t.id}</small></span><span className={"ar-ticket-status status-" + t.status.toLowerCase()}>{t.status}</span></div><div className="ar-ticket-items">{t.items.map((item,i) => <div key={i}>• {item}</div>)}</div><div className="ar-ticket-bottom"><strong>{money(t.total)}</strong><button onClick={()=>advance(t.id)} disabled={t.status==="Served"}>{t.status==="New"?"Start preparing":t.status==="Preparing"?"Mark ready":t.status==="Ready"?"Mark served":"Completed"} <ChevronRight size={15}/></button></div></article>)}</div>
         <p className="ar-workspace-note">Demo orders only. Updates are kept in this browser session, not synced to devices.</p>
        </div>}
        {active === "owner" && <div className="ar-owner-view"><div className="ar-workspace-header"><div><span className="ar-mini-eyebrow">RESTAURANT MANAGER / DEMO</span><h3>Your restaurant, at a glance.</h3><p>All the moving parts. One thoughtful view.</p></div><div className="ar-workspace-live"><span className="ar-dot"/> Demo dashboard</div></div>
         <div className="ar-owner-stats"><div><span>Demo tickets</span><strong>{tickets.length}</strong><small>Current browser session</small></div><div><span>Demo revenue</span><strong>{money(tickets.reduce((sum,t)=>sum+t.total,0))}</strong><small>Not actual payments</small></div><div><span>Calls for service</span><strong>{calls}</strong><small>Assistance requests</small></div></div>
         <div className="ar-manager-layout"><div className="ar-manager-panel"><h4>Order journey <span>Live in this demo</span></h4>{steps.map(status=><div className="ar-status-row" key={status}><span><span className={"ar-status-icon "+status.toLowerCase()}/> {status}</span><strong>{tickets.filter(t=>t.status===status).length}</strong></div>)}</div><div className="ar-manager-panel ar-manager-notices"><h4>Service centre</h4><div className="ar-manager-bell"><BellRing size={23}/></div><strong>{calls ? calls + " guest request" + (calls>1?"s":"") : "All clear for now"}</strong><p>{calls ? "Demo guest assistance requests are waiting for a team member." : "When a guest needs a hand, requests appear here."}</p><button onClick={()=>setCalls(0)} disabled={!calls}>Clear demo requests <Check size={15}/></button></div></div>
         <p className="ar-workspace-note">Production analytics connect to verified orders and payments; the figures here are sample data.</p>
        </div>}
       </div>
      </div>
      <div className="ar-demo-bottom"><span><span className="ar-dot"/> THIS IS A FRONTEND PRODUCT PROTOTYPE</span><div><button onClick={()=>setQrOpen(true)}><QrCode size={17}/> View table QR code</button><button onClick={()=>openDemo(active==="host"?"menu":active==="menu"?"kitchen":active==="kitchen"?"owner":"host")}>Next experience <ArrowRight size={16}/></button></div></div>
     </div>
    </div>
   </section>

   <section className="ar-feature-section ar-container" id="platform"><div className="ar-section-head"><div><div className="ar-overline">03 — ONE CONNECTED ECOSYSTEM</div><h2>A little less busy.<br/><em>A lot more brilliant.</em></h2></div><p>Thoughtful tools that make service feel effortless, for the people enjoying it and the people making it happen.</p></div>
    <div className="ar-features">{featureCards.map((f,i)=><article key={f.title} className={"ar-feature ar-feature-"+i}><div className="ar-feature-top"><span>{f.label}</span><f.icon size={26}/></div><div><h3>{f.title}</h3><p>{f.text}</p></div><div className="ar-feature-arrow"><ArrowUpRight size={20}/></div></article>)}</div>
   </section>

   <section className="ar-concierge-section"><div className="ar-container ar-concierge-grid"><div className="ar-concierge-art"><div className="ar-concierge-light">✺</div><div className="ar-concierge-quote"><span>✳ YOUR DIGITAL HOST</span><p>“Shall I recommend something delicious, tell you a story behind the dish, or summon a real human?”</p><div><span>Always warm.</span><span>Never guessing.</span></div></div></div><div className="ar-concierge-copy"><div className="ar-overline">04 — THE CONCIERGE DIFFERENCE</div><h2>Intelligent,<br/><em>with a personal touch.</em></h2><p>Not another robotic menu. Your restaurant's own personality — in every recommendation, interaction and thoughtfully timed moment.</p><div className="ar-concierge-lines"><div><Sparkles size={18}/><span>Tailored meal and combo recommendations</span></div><div><Coffee size={18}/><span>Cooking stories, pairings and friendly conversation</span></div><div><Globe2 size={18}/><span>Multi-language guest assistance</span></div><div><ShieldCheck size={18}/><span>Verified allergen information with human escalation</span></div><div><Heart size={18}/><span>Occasions, birthdays and delightful extras</span></div></div><button className="ar-main-button" onClick={()=>openDemo("host")}>Have a conversation <ArrowUpRight size={18}/></button></div></div></section>

   <section className="ar-flow ar-container"><div className="ar-section-head"><div><div className="ar-overline">05 — ONE HARMONIOUS FLOW</div><h2>From hello<br/><em>to see you soon.</em></h2></div><p>One experience brings everyone together, without forcing customers to change how they like to dine.</p></div><div className="ar-flow-grid">{[
    ["01","Scan & settle in","A secure table QR opens a personal welcome."],
    ["02","Ask & discover","Chat about cravings, ingredients and perfect pairings."],
    ["03","Order with ease","Send a checked order to the kitchen in seconds."],
    ["04","Keep in sync","Staff follow preparations and service requests."],
    ["05","Pay your way","Optional pay-at-table and bill splitting in production."],
    ["06","Come back soon","Opt-in rewards, feedback and personal touches."],
   ].map(([number,title,desc])=><div key={number}><span>{number}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>

   <section className="ar-savings"><div className="ar-container ar-savings-grid"><div><div className="ar-overline ar-light-overline">06 — THE BUSINESS CASE</div><h2>Give time back to <em>hospitality.</em></h2><p>What would fewer repetitive ordering and administration tasks mean for your team? Explore a planning illustration — not a promise of staff cuts or guaranteed savings.</p><div className="ar-calc-input"><label htmlFor="ar-orders">Orders per day <b>{orders}</b></label><input id="ar-orders" type="range" min="20" max="300" step="10" value={orders} onChange={e=>setOrders(Number(e.target.value))}/><div><span>20 orders</span><span>300 orders</span></div></div><div className="ar-calc-input"><label htmlFor="ar-minutes">Minutes of repetitive handling potentially avoided <b>{minutes}</b></label><input id="ar-minutes" type="range" min="1" max="6" step=".5" value={minutes} onChange={e=>setMinutes(Number(e.target.value))}/><div><span>1 min / order</span><span>6 min / order</span></div></div></div><div className="ar-calc-result"><span>ILLUSTRATIVE TEAM CAPACITY / MONTH</span><strong>{hours}<small> hrs</small></strong><h3>Potential time redirected<br/>to your guests.</h3><p>Assumes {orders} orders/day × {minutes} minutes/order × 26 operating days. This estimates potential handling time, not payroll savings; results depend on adoption, service model and staffing.</p><div className="ar-result-bottom"><CheckCircle2 size={18}/> Model the possibilities, validate in a real pilot.</div></div></div></section>

   <section className="ar-plans ar-container" id="plans"><div className="ar-section-head"><div><div className="ar-overline">07 — BUILT AROUND YOUR BUSINESS</div><h2>Start considered.<br/><em>Grow beautifully.</em></h2></div><p>Indicative budgets for UK restaurant projects. Final pricing depends on integrations, scope, hardware and service levels.</p></div><div className="ar-plan-grid">
    <article className="ar-plan"><div className="ar-plan-top"><span>ESSENTIALS</span><h3>A beautiful beginning.</h3><p>Digital menu and effortless guest discovery.</p></div><div className="ar-plan-price">£1,800–£3,000 <small>setup estimate</small></div><p className="ar-plan-month">Typically £59–£149/month + external fees</p><ul><li><Check size={16}/> Branded QR table menu</li><li><Check size={16}/> Dish management and availability</li><li><Check size={16}/> Mobile-first experience</li><li><Check size={16}/> Basic analytics and hosting</li></ul><a href="mailto:info@wedigitlize.com?subject=AutoRestaurant%20Essentials">Discuss Essentials <ArrowUpRight size={17}/></a></article>
    <article className="ar-plan ar-featured-plan"><div className="ar-plan-featured">MOST COMPREHENSIVE STARTING POINT</div><div className="ar-plan-top"><span>CONNECTED</span><h3>Service, in perfect sync.</h3><p>Full table ordering and kitchen workflow.</p></div><div className="ar-plan-price">£4,000–£8,000 <small>setup estimate</small></div><p className="ar-plan-month">Typically £149–£399/month + external fees</p><ul><li><Check size={16}/> Everything in Essentials</li><li><Check size={16}/> Ordering and kitchen tickets</li><li><Check size={16}/> Staff service requests</li><li><Check size={16}/> Owner insights dashboard</li><li><Check size={16}/> Optional payment integration</li></ul><a href="mailto:info@wedigitlize.com?subject=AutoRestaurant%20Connected">Discuss Connected <ArrowUpRight size={17}/></a></article>
    <article className="ar-plan"><div className="ar-plan-top"><span>SIGNATURE</span><h3>Intelligent by design.</h3><p>Your AI digital host, tailored to your brand.</p></div><div className="ar-plan-price">From £10,000 <small>bespoke setup</small></div><p className="ar-plan-month">Typically from £399/month + AI usage</p><ul><li><Check size={16}/> Everything in Connected</li><li><Check size={16}/> Grounded conversational host</li><li><Check size={16}/> Approved menu knowledge base</li><li><Check size={16}/> Multi-language concierge</li><li><Check size={16}/> POS / loyalty options by scope</li></ul><a href="mailto:info@wedigitlize.com?subject=AutoRestaurant%20Signature">Design my solution <ArrowUpRight size={17}/></a></article>
   </div><p className="ar-plan-note">Planning estimates, not fixed quotations. VAT (if applicable), payment processing, hardware, POS licensing, AI tokens, onboarding and third-party software are excluded unless agreed.</p></section>

   <section className="ar-safety ar-container"><div className="ar-safety-card"><div><ShieldAlert size={29}/><span>THE RESPONSIBLE DIFFERENCE</span><h2>Confidence comes<br/>from knowing <em>when to ask.</em></h2></div><div><p>We would build the production host around a controlled restaurant knowledge base. It must never improvise ingredient lists, allergy safety guarantees, availability, cooking methods or supplier claims.</p><ul><li>Restaurant-approved menus and the full 14-allergen matrix</li><li>Visible written allergen information and explicit handoff to trained staff</li><li>Manager-controlled menus, versioning and order confirmation</li><li>Security, GDPR, transparent marketing consent and accessible ordering</li></ul><a href="https://www.gov.uk/government/publications/allergen-information-for-non-prepacked-foods-best-practice" target="_blank" rel="noreferrer">Food Standards Agency guidance <ArrowUpRight size={16}/></a></div></div></section>

   <section className="ar-faq ar-container"><div><div className="ar-overline">08 — GOOD QUESTIONS</div><h2>Let's clear<br/><em>things up.</em></h2></div><div className="ar-faq-items">{faqs.map(([q,a],i)=><div className="ar-faq-item" key={q}><button onClick={()=>setExpanded(expanded===i?null:i)} aria-expanded={expanded===i}><span>{q}</span>{expanded===i?<Minus size={18}/>:<Plus size={18}/>}</button>{expanded===i&&<p>{a}</p>}</div>)}</div></section>

   <section className="ar-cta"><div className="ar-container ar-cta-inner"><div><div className="ar-overline ar-light-overline">LET'S MAKE SOMETHING EXTRAORDINARY</div><h2>Good food deserves<br/><em>great technology.</em></h2><p>Let's design a restaurant experience that guests love and teams genuinely enjoy using.</p><a href="mailto:info@wedigitlize.com?subject=Let%27s%20build%20my%20AutoRestaurant" className="ar-main-button ar-lime">Let's build your experience <ArrowUpRight size={19}/></a></div><div className="ar-cta-decoration"><span>✳</span><div>HOSPITALITY.<br/>REIMAGINED.</div></div></div></section>
  </main>
  <footer className="ar-footer"><div className="ar-container"><div><a className="ar-footer-logo" href="/">wedigitlize<span>.</span></a><p>Making digital feel wonderfully human.</p></div><div><a href="/">Back to our studio <ArrowUpRight size={15}/></a><a href="mailto:info@wedigitlize.com">info@wedigitlize.com <ArrowUpRight size={15}/></a></div></div><div className="ar-container ar-footer-bottom"><span>© {new Date().getFullYear()} WeDigitlize. Independent demonstration.</span><span>Likya concept reference is illustrative, not affiliated or endorsed. Prices and menu items are samples.</span></div></footer>
  {notice && <div className="ar-toast" role="status"><CheckCircle2 size={18}/>{notice}<button aria-label="Dismiss notification" onClick={()=>setNotice("")}><X size={16}/></button></div>}
  {cartOpen && <div className="ar-overlay" onClick={()=>setCartOpen(false)}><div className="ar-drawer" role="dialog" aria-modal="true" aria-label="Your demo order" onClick={e=>e.stopPropagation()}><div className="ar-drawer-title"><div><span className="ar-mini-eyebrow">TABLE {table}</span><h3>Your order</h3></div><button aria-label="Close basket" onClick={()=>setCartOpen(false)}><X/></button></div>{dishes.filter(d=>cart[d.id]).map(d=><div className="ar-drawer-item" key={d.id}><span className="ar-drawer-emoji">{d.icon}</span><div><strong>{d.name}</strong><small>{cart[d.id]} × {money(d.price)}</small></div><div><button aria-label={"Remove " + d.name} onClick={()=>add(d.id,-1)}><Minus size={14}/></button><button aria-label={"Add " + d.name} onClick={()=>add(d.id,1)}><Plus size={14}/></button></div></div>)}<div className="ar-drawer-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p className="ar-drawer-warning">Sample dishes and pricing only. No real order or payment is submitted.</p><button className="ar-main-button ar-lime ar-drawer-submit" disabled={!itemCount} onClick={sendOrder}>Send demo order to kitchen <ArrowRight size={18}/></button></div></div>}
  {qrOpen && <div className="ar-overlay" onClick={()=>setQrOpen(false)}><div className="ar-qr-modal" role="dialog" aria-modal="true" aria-label="Table QR demonstration" onClick={e=>e.stopPropagation()}><button className="ar-close-qr" aria-label="Close QR" onClick={()=>setQrOpen(false)}><X/></button><span className="ar-mini-eyebrow">SCAN TO OPEN THE GUEST EXPERIENCE</span><h3>One little scan.<br/><em>A lovely welcome.</em></h3><div className="ar-qr-image"><QRCodeSVG value={shareUrl} size={208} includeMargin /></div><label htmlFor="ar-table-select">Try a table number</label><select id="ar-table-select" value={table} onChange={e=>setTable(e.target.value)}>{Array.from({length:20},(_,i)=><option key={i} value={String(i+1).padStart(2,"0")}>Table {String(i+1).padStart(2,"0")}</option>)}</select><p>This sample QR links to the public showcase with the selected table number. Production QR codes would use signed, validated table sessions.</p><button className="ar-main-button ar-lime" onClick={()=>{setQrOpen(false);openDemo("host");}}>Experience table {table} <ArrowRight size={17}/></button></div></div>}
 </div>;
}
