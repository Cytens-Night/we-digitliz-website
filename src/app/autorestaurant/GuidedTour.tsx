"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bell, Check, CheckCircle2,
  ChefHat, Clock3, CreditCard, GlassWater, Globe2, HeartHandshake,
  Info, LayoutDashboard, MapPinned, MessageCircleHeart, Minus,
  MousePointerClick, QrCode, ShieldAlert, ShieldCheck, ShoppingBag,
  SlidersHorizontal, Sparkles, TrendingUp, Users, UtensilsCrossed,
  WalletCards, X
} from "lucide-react";
import "./tour.css";

type DemoView = "host" | "menu" | "guide" | "kitchen" | "owner";
type Audience = "Owner" | "Manager" | "Service team";
type Plan = "Essentials" | "Connected" | "Signature";
const steps = [
  { eyebrow:"THE BIG PICTURE", title:"Picture a restaurant that feels one step ahead.", short:"The promise", tag:"01" },
  { eyebrow:"THE GUEST EXPERIENCE", title:"Every guest gets a warm welcome.", short:"Guest care", tag:"02" },
  { eyebrow:"THE MENU EXPERIENCE", title:"Fewer decisions. Better choices.", short:"Ordering", tag:"03" },
  { eyebrow:"THE OPERATIONS EXPERIENCE", title:"From order to kitchen. Without the back-and-forth.", short:"Your team", tag:"04" },
  { eyebrow:"THOUGHTFUL BY DESIGN", title:"A more welcoming experience, for more people.", short:"Inclusion", tag:"05" },
  { eyebrow:"THE MARKET LANDSCAPE", title:"Know what exists — and where bespoke helps.", short:"Compare", tag:"06" },
  { eyebrow:"THE BUSINESS CASE", title:"Put your own numbers into the story.", short:"Your numbers", tag:"07" },
  { eyebrow:"THE INVESTMENT", title:"Exactly what you're paying for.", short:"Pricing", tag:"08" },
  { eyebrow:"THE NEXT CHAPTER", title:"Your restaurant. Your hospitality. Beautifully connected.", short:"Next steps", tag:"09" },
] as const;

const providerData = [
  { name:"Square for Restaurants", price:"Free £0 / Plus £69 per month", good:"Established restaurant POS, payments and kitchen tools.", note:"Strong fit for restaurants primarily seeking established POS and operational tooling.", url:"https://squareup.com/gb/en/point-of-sale/restaurants/pricing" },
  { name:"Flipdish", price:"Online ordering from £49 per month*", good:"Branded web ordering, takeaway and POS offerings.", note:"Strong fit for restaurants prioritising online ordering and direct-sales channels.", url:"https://www.flipdish.com/gb/online-ordering" },
  { name:"sunday", price:"Standard £149 / Premium £199 per month", good:"QR payment, ordering, loyalty and guest-engagement options.", note:"Strong fit for venues upgrading payment and table-side service.", url:"https://sundayapp.com/en-gb/pricing/" },
  { name:"me&u", price:"Contact sales for pricing", good:"QR ordering, AI-driven menu personalisation, allergen preferences and POS links.", note:"Strong fit for venues seeking an established AI-supported ordering platform.", url:"https://www.meandu.com/gb/serve/order-pay" },
] as const;

const plans: Record<Plan, { setup:number; monthly:number; headline:string; inclusions:string[]; exclusions:string }> = {
  Essentials:{ setup:2400, monthly:99, headline:"A polished digital front door", inclusions:["Branded, responsive QR menu","Menu and availability editor","Basic customer insights","Hosting and routine maintenance scope"], exclusions:"No kitchen integration, AI host or live payment unless added separately." },
  Connected:{ setup:6000, monthly:249, headline:"One connected service workflow", inclusions:["Everything in Essentials","Guest ordering and kitchen screen","Table-side staff requests","Manager view and onboarding","Payment integration scoping"], exclusions:"Actual payment-provider fees and complex POS licences/integration work quoted separately." },
  Signature:{ setup:12000, monthly:499, headline:"A considered digital concierge", inclusions:["Everything in Connected","Grounded conversational restaurant host","Verified-knowledge review process","Multilingual and preference-led journeys","Bespoke experience and integration planning"], exclusions:"AI usage, specialist integrations, hardware and dedicated support terms are quoted separately." }
};
const currency = (n: number) => n.toLocaleString("en-GB",{ style:"currency",currency:"GBP",maximumFractionDigits:0 });
const roleBenefit: Record<Audience,string> = {
  Owner:"A distinct brand experience with clearer ways to assess service capacity and investment.",
  Manager:"Better visibility into tables, kitchen work and requests — so fewer things depend on chasing people.",
  "Service team":"Fewer repetitive questions and clearer handoffs, with more time to look after guests."
};

export default function GuidedTour({ onOpenDemo }:{ onOpenDemo:(view:DemoView)=>void }) {
 const [step,setStep] = useState(0);
 const [role,setRole] = useState<Audience>("Owner");
 const [interest,setInterest] = useState<"For two"|"Something light"|"Surprise me">("For two");
 const [allergens,setAllergens] = useState<string[]>([]);
 const [menuMode,setMenuMode] = useState<"At the table"|"Preorder"|"Takeaway extra">("At the table");
 const [status,setStatus] = useState<"Received"|"Preparing"|"Ready">("Received");
 const [highContrast,setHighContrast] = useState(false);
 const [largeText,setLargeText] = useState(false);
 const [serviceRequested,setServiceRequested] = useState(false);
 const [orders,setOrders] = useState(80);
 const [minutes,setMinutes] = useState(2);
 const [contribution,setContribution] = useState(0.35);
 const [plan,setPlan] = useState<Plan>("Connected");
 const [expandedProvider,setExpandedProvider] = useState<string|null>("Square for Restaurants");
 const [started,setStarted] = useState(false);
 const advance = (next:number) => { setStep(Math.max(0,Math.min(next,steps.length-1))); setStarted(true); };
 const serviceHours = orders * minutes * 26 / 60;
 const illustrationContribution = orders * contribution * 26;
 const potentialAfterSubscription = illustrationContribution - plans[plan].monthly;
 const payback = potentialAfterSubscription > 0 ? plans[plan].setup/potentialAfterSubscription : null;
 const summary = useMemo(() => [
   "Hello WeDigitlize,",
   "I'd like to discuss AutoRestaurant for my venue.",
   "My perspective: " + role,
   "Package of interest: " + plan,
   "Indicative setup example: " + currency(plans[plan].setup),
   "Indicative platform/month: " + currency(plans[plan].monthly),
   "Approximate daily orders: " + orders,
   "Please send a tailored proposal including integrations, actual monthly running costs and a pilot plan."
 ].join("\n"),[role,plan,orders]);
 const mailto = "mailto:info@wedigitlize.com?subject="+encodeURIComponent("AutoRestaurant — tailored restaurant proposal")+"&body="+encodeURIComponent(summary);
 const demoView:Record<number,DemoView> = {0:"host",1:"host",2:"menu",3:"kitchen",4:"guide",6:"owner",7:"owner",8:"host"};
 const x = steps[step];
 const filteredDishes = [
  {name:"Hummus & flatbread",price:7.5,tag:["Sesame","Gluten"],icon:"🥙"},
  {name:"Chicken shish",price:17.5,tag:[],icon:"🍗"},
  {name:"Halloumi bites",price:8.5,tag:["Milk"],icon:"🧀"},
  {name:"Baklava",price:7,tag:["Nuts","Gluten"],icon:"🍯"}
 ].filter(d=>!d.tag.some(t=>allergens.includes(t)));
 const progress = ((step + 1)/steps.length)*100;
 const stage = () => {
 switch(step) {
 case 0: return <div className="art-stage art-stage-opening">
   <div className="art-stage-eyebrow"><span className="art-twink">✳</span> ONE CONNECTED EXPERIENCE</div>
   <div className="art-mini-journey">
    {[
      {icon:QrCode,label:"Before the visit",detail:"Preview, reserve & preorder"},
      {icon:MessageCircleHeart,label:"At the table",detail:"Warm, personal guidance"},
      {icon:UtensilsCrossed,label:"At the menu",detail:"Thoughtful ordering"},
      {icon:ChefHat,label:"Behind the scenes",detail:"Kitchen & service in sync"},
      {icon:HeartHandshake,label:"After the meal",detail:"A reason to return"}
    ].map((p,i)=><div className="art-journey-stop" key={p.label}><div className="art-journey-icon"><p.icon size={20}/></div><div><span>0{i+1} / {p.label}</span><strong>{p.detail}</strong></div>{i<4&&<ArrowRight size={17}/>}</div>)}
   </div>
   <div className="art-spotlight"><span>THE DIFFERENCE</span><strong>You're not buying a QR code. You're building a more thoughtful service.</strong></div>
 </div>;
 case 1: return <div className="art-stage art-stage-guest">
   <div className="art-phone" aria-label="Illustrative guest digital-host conversation"><div className="art-phone-top"><div className="art-phone-mark">✳</div><div><b>Welcome to your table</b><span>Your digital host • demo</span></div><div className="art-mini-online"/></div>
    <div className="art-phone-welcome"><span>✦</span><strong>Good evening! What sounds lovely?</strong><p>No app. No account. Just a little help when you want it.</p></div>
    <div className="art-intent-options">{(["For two","Something light","Surprise me"] as const).map(s=><button key={s} className={interest===s?"is-selected":""} onClick={()=>setInterest(s)}>{s}</button>)}</div>
    <div className="art-phone-reply"><span className="art-reply-spark">✳</span>{interest==="For two"?"A shared meal sounds lovely. Shall I suggest a mixed-grill-style feast and two refreshing drinks?":interest==="Something light"?"Let's begin with a lighter option. I'll show you the verified menu choices so you can decide.": "I could surprise you with a popular house favourite — or you can take your time exploring everything."}</div>
    <button className="art-phone-link" onClick={()=>onOpenDemo("host")}>Talk to the example host <ArrowUpRight size={16}/></button>
   </div>
   <aside className="art-stage-sidecard"><span>THE HOSPITALITY EFFECT</span><h4>Guided, never pushed.</h4><p>A short suggestion when it's useful. The complete menu and a real team member always remain available.</p><div className="art-tag-row"><span><Check size={13}/> Helpful recommendations</span><span><Check size={13}/> Human handoff</span><span><Check size={13}/> Conversation with personality</span></div></aside>
 </div>;
 case 2:return <div className="art-stage art-stage-menu">
   <div className="art-stage-toolbar"><div><span className="art-small-upper">ILLUSTRATIVE GUEST MENU</span><h4>Explore your way.</h4></div><ShoppingBag size={25}/></div>
   <div className="art-filter-intro"><ShieldAlert size={17}/><div><strong>Choose allergens to avoid</strong><small>The menu hides listed ingredients; this never confirms a dish is allergy-safe.</small></div></div>
   <div className="art-allergen-options">{["Sesame","Milk","Nuts","Gluten"].map(name=><button key={name} aria-pressed={allergens.includes(name)} className={allergens.includes(name)?"is-selected":""} onClick={()=>setAllergens(p=>p.includes(name)?p.filter(i=>i!==name):[...p,name])}>{allergens.includes(name)?"✓ ":""}{name}</button>)}</div>
   <div className="art-preview-dishes">{filteredDishes.map(d=><div key={d.name}><span>{d.icon}</span><div><strong>{d.name}</strong><small>Declared in sample: {d.tag.join(", ")||"none listed (unverified)"}</small></div><b>£{d.price.toFixed(2)}</b></div>)}</div>
   {filteredDishes.length===0&&<p className="art-empty">No matching dishes. Ask trained staff for help choosing.</p>}
   <div className="art-menu-footer"><div className="art-mode-picker">{(["At the table","Preorder","Takeaway extra"] as const).map(m=><button key={m} className={menuMode===m?"is-selected":""} onClick={()=>setMenuMode(m)}>{m}</button>)}</div><p>{menuMode==="At the table"?"Guests order from their seats without losing control.":menuMode==="Preorder"?"Schedule an arrival and pay in advance in the production system.":"Offer a dessert or meal to take home without restarting checkout."}</p></div>
   <div className="art-safety-note"><ShieldCheck size={16}/> With an allergy, trained staff must check current ingredients and cross-contact before any real order or payment.</div>
 </div>;
 case 3:return <div className="art-stage art-stage-operations">
   <div className="art-work-top"><div><span>SIMULATED KITCHEN TICKET</span><h4>Order #1048 · Table 07</h4></div><span className="art-live-indicator">DEMO FLOW</span></div>
   <div className="art-kitchen-progress">{(["Received","Preparing","Ready"] as const).map((s,i)=><div key={s} className={["Received","Preparing","Ready"].indexOf(status)>=i?"is-done":""}><span>{["Received","Preparing","Ready"].indexOf(status)>i?<Check size={15}/>:i+1}</span><small>{s}</small></div>)}</div>
   <div className="art-kitchen-ticket"><div><span>1×</span> Chicken shish</div><div><span>2×</span> Mint lemonade</div><div><span>1×</span> Halloumi bites</div><small>Restaurant-approved tickets would include modifiers, staff notes and dietary alerts.</small></div>
   <div className="art-stage-actions"><button onClick={()=>setStatus(status==="Received"?"Preparing":status==="Preparing"?"Ready":"Received")}>{status==="Received"?"Start preparing":status==="Preparing"?"Mark ready":"Reset example ticket"} <ArrowRight size={16}/></button><button onClick={()=>setServiceRequested(v=>!v)}><Bell size={16}/>{serviceRequested?"Clear request":"Simulate table request"}</button></div>
   <div className="art-service-alert"><div><Bell size={18}/><span><strong>Front-of-house queue</strong><small>{serviceRequested?"Table 07 is requesting assistance · Example notification":"No active requests in this illustration"}</small></span></div><span>{serviceRequested?"1 waiting":"All clear"}</span></div>
   <div className="art-ops-caption">Less relaying handwritten tickets and chasing order status. The actual production system requires durable real-time sync and POS compatibility checks.</div>
 </div>;
 case 4:return <div className={"art-stage art-stage-access "+(highContrast?"art-stage-contrast ":"")+(largeText?"art-stage-large":"")}>
   <div className="art-stage-toolbar"><div><span className="art-small-upper">GUEST CONTROLS</span><h4>Comfort is personal.</h4></div><HeartHandshake size={25}/></div>
   <p>Offer a calm interface with clear, accessible controls. Let people choose their experience rather than make assumptions about them.</p>
   <div className="art-a11y-controls"><button aria-pressed={largeText} className={largeText?"is-selected":""} onClick={()=>setLargeText(v=>!v)}>A+ Larger type</button><button aria-pressed={highContrast} className={highContrast?"is-selected":""} onClick={()=>setHighContrast(v=>!v)}>◐ High contrast</button></div>
   <div className="art-a11y-example"><strong>Find your way, comfortably.</strong><p>A simple, restaurant-verified way to reach facilities — with personal assistance on request.</p><div className="art-a11y-directions"><div><span className="art-map-you">YOU</span><span className="art-map-track"/><span className="art-map-wc">WC</span></div><p>Example directions only — not a surveyed accessible route.</p></div></div>
   <button className="art-a11y-assist" onClick={()=>onOpenDemo("guide")}>Explore the facilities example <ArrowUpRight size={16}/></button>
   <div className="art-safety-note"><Info size={16}/> Guest-assisted ordering must remain available for visitors without a phone or who prefer to speak with someone.</div>
 </div>;
 case 5:return <div className="art-stage art-stage-market">
   <div className="art-market-head"><span>CHECKED 8 OCT 2026 • PUBLISHED UK VENDOR PAGES</span><h4>Compare what matters.</h4><p>These are different product categories and service scopes. A custom guest layer is not necessarily a cheaper alternative to a mature POS.</p></div>
   <div className="art-provider-list">{providerData.map(p=><div key={p.name} className="art-provider"><button onClick={()=>setExpandedProvider(expandedProvider===p.name?null:p.name)} aria-expanded={expandedProvider===p.name}><span><strong>{p.name}</strong><small>{p.price}</small></span><span>{expandedProvider===p.name?<Minus size={15}/>:<ArrowRight size={15}/>}</span></button>{expandedProvider===p.name&&<div><p><b>Offers:</b> {p.good}</p><p><b>Good choice when:</b> {p.note}</p><a href={p.url} target="_blank" rel="noopener noreferrer">See provider's website <ArrowUpRight size={14}/></a></div>}</div>)}</div>
   <div className="art-market-difference"><span><Sparkles size={18}/> WHERE WEDIGITLIZE FITS</span><p>We design the <b>restaurant-specific experience</b> around its identity, guest journeys, verified information and chosen integrations. Existing software may remain part of the solution.</p></div>
   <p className="art-market-fine">*Flipdish £49/month is its website-only online ordering offer when billed annually; monthly billing is listed at £69. Square fees are per location for Plus. Pricing and conditions can change; confirm quotes and VAT directly.</p>
 </div>;
 case 6:return <div className="art-stage art-stage-maths">
   <div className="art-stage-toolbar"><div><span className="art-small-upper">INTERACTIVE PLANNING SCENARIO</span><h4>Your numbers. Your assumptions.</h4></div><TrendingUp size={26}/></div>
   <div className="art-range-row"><label htmlFor="art-orders">Orders / day <b>{orders}</b></label><input id="art-orders" type="range" min="20" max="250" step="10" value={orders} onChange={e=>setOrders(Number(e.target.value))}/><span>20–250 orders a day</span></div>
   <div className="art-range-row"><label htmlFor="art-minutes">Minutes of routine handling / order <b>{minutes}</b></label><input id="art-minutes" type="range" min="0" max="6" step=".5" value={minutes} onChange={e=>setMinutes(Number(e.target.value))}/><span>Assumed staff time potentially redirected, not reduced paid hours</span></div>
   <div className="art-range-row"><label htmlFor="art-uplift">Assumed extra gross contribution / order <b>£{contribution.toFixed(2)}</b></label><input id="art-uplift" type="range" min="0" max="1.5" step=".05" value={contribution} onChange={e=>setContribution(Number(e.target.value))}/><span>Hypothetical, after ingredient cost but before fees and other costs</span></div>
   <div className="art-calculator-select"><label htmlFor="art-package">Compare with example package</label><select id="art-package" value={plan} onChange={e=>setPlan(e.target.value as Plan)}>{(Object.keys(plans) as Plan[]).map(p=><option key={p}>{p}</option>)}</select></div>
   <div className="art-number-results"><div><small>Potential guest-facing time / month</small><strong>{serviceHours.toFixed(0)} <span>hrs</span></strong></div><div><small>Hypothetical added gross contribution / month</small><strong>{currency(illustrationContribution)}</strong></div><div><small>After example platform subscription only</small><strong>{potentialAfterSubscription<0?"−":""}{currency(Math.abs(potentialAfterSubscription))}</strong></div></div>
   <div className="art-estimate-caption">{payback?<>Illustrative setup recovery: <b>{payback.toFixed(1)} months</b> at these assumptions.</>:<>At these assumptions, additional contribution does not exceed the sample monthly subscription.</>} <span>Excludes processing fees, AI usage, maintenance variations, hardware, integration fees, taxes and the actual operational impact. Not a forecast, promise or staffing reduction.</span></div>
 </div>;
 case 7:return <div className="art-stage art-stage-pricing">
   <div className="art-stage-toolbar"><div><span className="art-small-upper">TRANSPARENT SCOPE AND ESTIMATES</span><h4>Choose the right starting point.</h4></div><WalletCards size={25}/></div>
   <div className="art-package-list">{(Object.keys(plans) as Plan[]).map(k=><button key={k} className={"art-package "+(plan===k?"is-selected":"")} aria-pressed={plan===k} onClick={()=>setPlan(k)}><span><span className="art-package-radio"/><strong>{k}</strong><small>{plans[k].headline}</small></span><span><b>From {currency(plans[k].setup)}</b><small>{currency(plans[k].monthly)}/month example</small></span></button>)}</div>
   <div className="art-pricing-detail"><div><span>WHAT THE {plan.toUpperCase()} EXAMPLE INCLUDES</span><strong>{plans[plan].headline}</strong></div><ul>{plans[plan].inclusions.map(q=><li key={q}><Check size={15}/>{q}</li>)}</ul><div className="art-pricing-excludes"><Info size={17}/><p>{plans[plan].exclusions}</p></div></div>
   <p className="art-pricing-fine">Planning estimates, not fixed offers. UK VAT where applicable, card processing, tablets/printers, payment/POS providers, usage-based AI and any enhanced support are additional unless explicitly included in your contract. Discovery determines final scope.</p>
 </div>;
 default:return <div className="art-stage art-stage-finish">
  <div className="art-finish-icon"><CheckCircle2 size={40}/></div>
  <span className="art-small-upper">YOUR SHORT TOUR IS COMPLETE</span>
  <h4>Now imagine this with<br/><em>your restaurant's name on it.</em></h4>
  <p>You're not committing to new hardware, a staffing plan, or a replacement POS. Start by finding the parts that improve your particular service.</p>
  <div className="art-personal-note"><span>YOUR TOUR SNAPSHOT</span><div><span>Perspective</span><b>{role}</b></div><div><span>Package to discuss</span><b>{plan}</b></div><div><span>Example investment</span><b>{currency(plans[plan].setup)} + {currency(plans[plan].monthly)}/mo</b></div><small>Exact pricing follows restaurant discovery and integration checks.</small></div>
  <a href={mailto} className="art-send-proposal">Request a tailored proposal <ArrowUpRight size={19}/></a>
  <button className="art-replay" onClick={()=>{setStep(0);setStarted(false)}}>Explore the tour again <ArrowRight size={15}/></button>
 </div>;
 }
 };
 const roleTitle = role==="Owner"?"A stronger business without losing the personal touch.":role==="Manager"?"A clearer shift and fewer missed handoffs.":"Less admin. More time for real hospitality.";
 const narrative = [
  { problem:"Great service can depend on remembering a hundred little details.", outcome:"Bring the guest journey, order flow, service and follow-up into one thoughtfully designed experience.", removed:"Repeatedly explaining where to find the menu, who to ask and how to get help.", kept:"Your personality, service standards and people." },
  { problem:"Staff are often answering the same menu questions while looking after a busy dining room.", outcome:"Let guests ask a friendly host for suggestions, explanations or light conversation — or simply browse freely.", removed:"Some routine menu questions and avoidable waiting for basic information.", kept:"Personal recommendations, attentive staff and allergy decisions." },
  { problem:"A paper or static QR menu doesn't help guests discover what actually suits them.", outcome:"Make food discovery clearer with optional filters, gentle suggestions and preordering or take-home extras.", removed:"Repeat menu browsing, some extra trips for simple add-ons and confusion about order choices.", kept:"Clear autonomy and staff-verified allergy decisions." },
  { problem:"An order shouldn't have to be repeated from guest, to waiter, to another team member, to the kitchen.", outcome:"Make the handoffs visible, ticketed and traceable to the right people.", removed:"Some duplicated transcription, avoidable status checking and forgotten service requests.", kept:"Human service and real operational control." },
  { problem:"A polished system that doesn't work comfortably for everyone isn't a premium experience.", outcome:"Give guests obvious choices for text size, clarity, pace, language and human help.", removed:"Some friction from tiny text, confusing interfaces and unclear facility directions.", kept:"Choice, dignity, accessibility and staff-assisted alternatives." },
  { problem:"Restaurant systems are not all the same product — and the lowest monthly fee may serve a different need.", outcome:"Choose an established POS when that solves the problem, then decide whether a bespoke guest layer is worth adding.", removed:"Unnecessary software overlap and misleading like-for-like comparisons.", kept:"A transparent decision based on actual needs and integration capability." },
  { problem:"Owners deserve more than unproven 'save 30%' promises.", outcome:"Model a possible impact from transparent, editable assumptions, then test it with real restaurant data.", removed:"Vague ROI claims that cannot be checked.", kept:"Practical business judgment and measured pilots." },
  { problem:"An impressive demo means very little if the ongoing fees or integrations are unclear.", outcome:"See illustrative setup, monthly software cost, deliverables and excluded third-party expenses.", removed:"Ambiguous package promises and hidden assumptions.", kept:"A scoped quotation and agreed acceptance tests." },
  { problem:"Every restaurant has different seating, ordering patterns, guest expectations and existing systems.", outcome:"Start with a short discovery, select a pilot, and roll out only what has proven value.", removed:"The need to explain the whole platform in a sales meeting before exploring what matters.", kept:"Control of scope, timing, budget and staff procedures." }
 ];
 const current = narrative[step];
 const nextLabel = step===0?"Show me the guest experience":step===steps.length-2?"Let's bring it together":"Continue the story";
 return <section className="art-root" id="walkthrough" aria-labelledby="art-walk-title">
   <div className="ar-container">
    <div className="art-introduction"><div><span className="ar-overline">A SELF-GUIDED PRODUCT EXPERIENCE</span><h2 id="art-walk-title">See what changes.<br/><em>Without a sales pitch.</em></h2><p>Experience the entire story in about three to five minutes. Tap your way from the first welcome to the business case — at your own pace.</p></div><div className="art-intro-mark"><span>09</span><small>SHORT CHAPTERS<br/>ONE CLEAR PICTURE</small></div></div>
    <div className="art-wizard">
     <div className="art-wizard-head"><div className="art-wizard-label"><span className="art-pulse"/><b>THE RESTAURANT EXPERIENCE</b><span>• INTERACTIVE GUIDED TOUR</span></div><button className="art-wizard-skip" onClick={()=>advance(steps.length-1)}>Skip to proposal <ArrowUpRight size={14}/></button></div>
     <div className="art-wizard-progress" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step+1} aria-label="Tour progress"><span style={{width:progress+"%"}}/></div>
     <div className="art-wizard-layout">
      <div className="art-story">
       <div className="art-chapter-index"><span>{x.tag} / 09</span><span>{x.eyebrow}</span></div>
       <h3>{x.title}</h3>
       <p className="art-story-problem">{current.problem}</p>
       {step===0&&<div className="art-role-panel"><span>YOUR PERSPECTIVE</span><div>{(["Owner","Manager","Service team"] as const).map(r=><button className={role===r?"is-selected":""} key={r} onClick={()=>setRole(r)} aria-pressed={role===r}>{r}</button>)}</div><p>{roleTitle}</p></div>}
       {step!==0&&<div className="art-story-outcome"><span><Sparkles size={14}/> THE BETTER EXPERIENCE</span><p>{current.outcome}</p></div>}
       <div className="art-story-impact"><span><CheckCircle2 size={15}/> HELPS REDUCE</span><p>{current.removed}</p><span><HeartHandshake size={15}/> STILL ESSENTIAL</span><p>{current.kept}</p></div>
       <div className="art-story-insight"><span>WHY THIS MATTERS TO A {role.toUpperCase()}</span><p>{roleBenefit[role]}</p></div>
      </div>
      <div className="art-story-stage">
       <div className="art-stage-top"><span><span className="art-stage-dot"/> EXPERIENCE {x.tag}</span><span>INTERACTIVE EXAMPLE — NOT LIVE RESTAURANT DATA</span></div>
       {stage()}
      </div>
     </div>
     <div className="art-wizard-footer"><div className="art-wizard-steps">{steps.map((s,i)=><button key={s.short} className={step===i?"is-active":i<step?"is-complete":""} title={s.short} aria-label={"Go to chapter "+(i+1)+": "+s.short} aria-current={step===i?"step":undefined} onClick={()=>advance(i)}>{i<step?<Check size={13}/>:i+1}</button>)}</div><div className="art-wizard-nav">{step>0&&<button className="art-wizard-back" onClick={()=>advance(step-1)}><ArrowLeft size={16}/> Previous</button>}{step<steps.length-1?<button className="art-wizard-next" onClick={()=>advance(step+1)}>{nextLabel}<ArrowRight size={17}/></button>:<a className="art-wizard-next" href={mailto}>Send enquiry <ArrowUpRight size={17}/></a>}</div></div>
    </div>
    <div className="art-underfoot"><div><div className="art-underfoot-icon"><MousePointerClick size={21}/></div><div><strong>Want to try the real interface?</strong><p>The guided story is separate from the fully interactive guest and kitchen prototype.</p></div></div><button onClick={()=>onOpenDemo(demoView[step]||"host")}>Open the hands-on demo <ArrowUpRight size={17}/></button></div>
    <div className="art-owner-reasons"><div><span>WHAT YOU GAIN</span><h3>Premium service is the result.<br/><em>Thoughtful automation is the method.</em></h3></div><div><div><strong>Guests</strong><p>Feel welcomed, informed and in control.</p></div><div><strong>Your team</strong><p>See fewer repetitive handoffs and clearer queues.</p></div><div><strong>Your business</strong><p>Gets a tailored journey and measurable operational insight.</p></div></div></div>
   </div>
 </section>;
}
