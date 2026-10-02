"use client";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Globe, Phone, Mail, UserPlus, Share2, QrCode, X, Smartphone, Zap, Palette, LayoutGrid, MessageCircle, ArrowUpRight, CircuitBoard } from "lucide-react";
import { FiInstagram } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import { business, whatsappUrl } from "@/lib/business";
import CardActions, { type CardAction } from "@/components/CardActions";
import CardIntro from "@/components/CardIntro";
import "@/app/card/card.css";
import "@/app/card/refined-card.css";
const services=[
 {id:"web",title:"Web experiences",icon:Globe,detail:"Distinctive websites, landing pages and digital business cards. Clear journeys, responsive layouts and a design that feels like your brand.",scope:"Websites · E-commerce · Digital cards"},
 {id:"apps",title:"Mobile & web apps",icon:Smartphone,detail:"Apps, portals and dashboards designed around the people who use them. We agree the user journeys, integrations and release scope before building.",scope:"iOS & Android · Portals · SaaS"},
 {id:"automation",title:"Connected systems",icon:Zap,detail:"Bring your tools together and simplify repetitive work. Enquiry flows, CRM integrations and carefully scoped business automations.",scope:"Integrations · Workflows · Business tools"},
 {id:"brand",title:"Brand identity",icon:Palette,detail:"A recognisable identity, from your logo and typography to the details across your website, content and printed materials.",scope:"Logos · Brand guidelines · Social content"},
];
const qrTargets=[{title:"Share this card",label:"Card",url:business.cardUrl,description:"Scan to connect with wedigitlize."},{title:"Follow our work",label:"Instagram",url:business.instagram,description:"Scan to see our latest work on Instagram."},{title:"Explore our studio",label:"Website",url:business.url,description:"Scan to explore our work and services."}];
export default function CardExperience(){
 const [action,setAction]=useState<CardAction>(null);
 const qrGallery=useRef<HTMLDivElement>(null);
 const [exploded,setExploded]=useState(false);
 const [flipped,setFlipped]=useState(false);
 const [circuit,setCircuit]=useState(false);
 const [qr,setQr]=useState(0);
 const [status,setStatus]=useState("");
 const [manualLink,setManualLink]=useState(false);
 const [service,setService]=useState<typeof services[number]|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 const reduced=useReducedMotion();
 const mx=useMotionValue(0),my=useMotionValue(0);
 const rx=useSpring(my,{stiffness:110,damping:25}),ry=useSpring(mx,{stiffness:110,damping:25});
 function tilt(event:PointerEvent<HTMLDivElement>){
  if(reduced || event.pointerType!=="mouse" || (event.target instanceof Element && event.target.closest("button,a")))return;
  const box=event.currentTarget.getBoundingClientRect();mx.set(((event.clientX-box.left)/box.width-.5)*7);my.set(-((event.clientY-box.top)/box.height-.5)*5);
 }
 async function share(){
  setStatus("");setManualLink(false);
  try{if(navigator.share){await navigator.share({title:"wedigitlize — Design. Build. Connect.",text:"Websites, apps, branding and digital experiences.",url:business.cardUrl});return;}
   if(navigator.clipboard){await navigator.clipboard.writeText(business.cardUrl);setStatus("Card link copied — ready to share.");return;}setManualLink(true);
  }catch(error){if(error instanceof DOMException && error.name==="AbortError")return;setManualLink(true);setStatus("Copy the card link below to share it.");}
 }
 function openService(item:typeof services[number]){setService(item);dialog.current?.showModal();}
 const closeDialog=()=>dialog.current?.close();
 function selectQr(index:number){setQr(index);const gallery=qrGallery.current;const slide=gallery?.children[index] as HTMLElement|undefined;if(gallery&&slide)gallery.scrollTo({left:slide.offsetLeft,behavior:reduced?"instant":"smooth"});}
 useEffect(()=>{const gallery=qrGallery.current;if(!gallery)return;const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setQr(Number((entry.target as HTMLElement).dataset.index));},{root:gallery,threshold:.65});for(const slide of gallery.children)observer.observe(slide);return()=>observer.disconnect();},[]);
 return <main id="main-content" className="unique-card"><CardIntro/><header className="un-card-header"><Link href="/" aria-label="Visit the wedigitlize website"><Logo className="un-card-header-logo"/><span>wedigitlize</span><ArrowUpRight size={16}/></Link><span>Design. Build. Connect.</span></header>
 <section className={`portfolio-container explode-layout un-card-scene ${exploded?"scene-active":""}`} aria-label="Interactive digital business card">
  <div className="bg-ambience" aria-hidden="true"><div className="bg-pattern"/><div className="glow-orb-1"/><div className="glow-orb-2"/></div>
  <div className="un-card-scene-hint"><span>YOUR DIGITAL CONNECTION</span><p>One card. A whole world of possibilities.</p></div>
  <div className={`center-bottle ${exploded?"shrunk":""}`}>
   <div className={`un-phone-shell ${exploded?"un-shell-active":""}`}>
      <div className={`un-side-controls ${flipped?"un-controls-hidden":""}`} inert={flipped} aria-hidden={flipped}>
       <button className="un-side-key un-side-services" aria-label={exploded?"Collapse service orbit":"Reveal service orbit"} aria-expanded={exploded} aria-controls="un-service-orbit" onClick={()=>setExploded(!exploded)}><LayoutGrid size={18}/><span>Services</span></button>
       <button className="un-side-key un-side-share" aria-label="Share the digital card" onClick={share}><Share2 size={18}/><span>Share card</span></button>
       <a className="un-side-key un-side-save" aria-label="Download the wedigitlize contact" href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={18}/><span>Save contact</span></a>
      </div>
      <button className={`sim-tray-trigger ${exploded?"active-sim-tray":""}`} aria-label={exploded?"Close services SIM tray":"Open services SIM tray"} aria-expanded={exploded} aria-controls="un-service-orbit" onClick={()=>setExploded(!exploded)}><span className="sim-pinhole"/><span className="easter-egg-text">SERVICES</span></button>
   <motion.div className="un-phone-parallax" onPointerMove={tilt} onPointerLeave={()=>{mx.set(0);my.set(0);}} style={{rotateX:rx,rotateY:ry}}>
    <div className={`perfume-body-container ${exploded?"active":""}`}>
     <div className={`phone-body ${flipped?"flipped":""}`}>
      <div className={`phone-front ${circuit?"un-circuit-on":""}`} inert={flipped} aria-hidden={flipped}>
       <div className="circuit-board-bg" aria-hidden="true"/><div className="dynamic-island" aria-hidden="true"><div className="dynamic-island-lens"/><div className="dynamic-island-sensor"/></div>
       <div className="phone-screen">
        <button className="icon-btn un-phone-circuit" aria-label="Toggle circuit detail" aria-pressed={circuit} onClick={()=>setCircuit(!circuit)}><CircuitBoard size={18}/></button>
        <button className="icon-btn un-phone-qr" aria-label="Flip card to QR codes" onClick={()=>setFlipped(true)}><QrCode size={19}/></button>
        <div className="un-phone-brand"><div className="un-phone-mark"><Logo className="un-phone-logo"/></div><h1>wedigitlize</h1><span>YOUR DIGITAL STUDIO</span><p>Websites. Apps. Branding.<br/>Made for your next chapter.</p></div>
        <div className="un-phone-links"><a href={whatsappUrl("Hello wedigitlize, I found your digital card and would like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="neon-button un-phone-primary"><MessageCircle size={17}/>Let’s talk on WhatsApp</a><button onClick={()=>setAction("website")} className="neon-button"><Globe size={17}/>Preview our website<ArrowUpRight size={13}/></button><button onClick={()=>setAction("phone")} className="neon-button"><Phone size={17}/>Contact options</button><button onClick={()=>setAction("email")} className="neon-button"><Mail size={17}/>Email & studio updates</button></div>
        <div className="un-phone-dock"><a href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit wedigitlize on Instagram"><FiInstagram size={20}/></a><a href="/wedigitlize.vcf" download="wedigitlize.vcf" aria-label="Save contact"><UserPlus size={20}/></a><button aria-label="Share this card" onClick={share}><Share2 size={20}/></button></div>
        <button className="un-phone-explore" onClick={()=>setExploded(!exploded)} aria-expanded={exploded} aria-controls="un-service-orbit">{exploded?"Close our service orbit":"Reveal our service orbit"}<ArrowUpRight size={14}/></button>
       </div>
      </div>
      <div className="phone-back" inert={!flipped} aria-hidden={!flipped}>
       <div className="camera-bump" aria-hidden="true"><div className="camera-lens lens-1"/><div className="camera-lens lens-2"/><div className="camera-lens lens-3"/><div className="camera-flash"/><div className="camera-lidar"/></div>
       <button onClick={()=>setFlipped(false)} className="icon-btn un-phone-qr" aria-label="Return to the front of the card"><X size={20}/></button>
       <div className="un-qr-content"><Logo className="un-phone-logo"/><h2>Scan. Connect. Explore.</h2><p>Swipe through our QR codes, or choose a destination below.</p><div className="un-qr-gallery" ref={qrGallery} aria-label="Scrollable QR code gallery">{qrTargets.map((target,i)=><section className="un-qr-slide" key={target.label} data-index={i} aria-label={target.label}><div className="un-phone-qr-code"><QRCodeSVG value={target.url} size={170} marginSize={4} level="M" title={`QR code for ${target.label}`}/></div><h3>{target.title}</h3><p>{target.description}</p></section>)}</div><div className="un-qr-tabs" role="group" aria-label="QR destination">{qrTargets.map((target,i)=><button key={target.label} aria-pressed={qr===i} onClick={()=>selectQr(i)}>{target.label}</button>)}</div><a className="neon-button un-phone-primary" href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={18}/>Save our contact</a><button className="neon-button" onClick={share}><Share2 size={18}/>Share this card</button><p className="un-phone-url">wedigitlize.com/card</p></div>
      </div>
     </div>
    </div>
   </motion.div>
   </div>
   <div id="un-service-orbit" className={`un-service-orbit ${exploded?"orbit-open":""}`} inert={!exploded} aria-hidden={!exploded}>{services.map((item,index)=>{const angle=index*Math.PI/2-Math.PI/2;return <button key={item.id} className={`mockup-bubble ${exploded?"exploded":""}`} style={{"--target-x":`${Math.cos(angle)*400}px`,"--target-y":`${Math.sin(angle)*400}px`,"--target-z":"0px"} as CSSProperties} onClick={()=>openService(item)}><item.icon size={30}/><span>{item.title}</span><small>Explore <ArrowUpRight size={12}/></small></button>;})}</div>
  </div>
 </section>
 <footer className="un-card-footer"><div className="un-card-shortcuts"><button onClick={()=>setExploded(!exploded)}><LayoutGrid size={17}/>{exploded?"Close services":"Explore services"}</button><a href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={17}/>Save contact</a><button onClick={share}><Share2 size={17}/>Share card</button></div><div className="un-card-status" role="status" aria-live="polite">{status}</div>{manualLink&&<label className="un-card-manual">Card link<input readOnly value={business.cardUrl} onFocus={e=>e.currentTarget.select()}/></label>}<p><a href={`tel:${business.phone}`}>{business.phoneLabel}</a><span> · </span><a href={`mailto:${business.email}`}>{business.email}</a></p><div><Link href="/projects">Our work</Link><Link href="/#pricing">Pricing</Link><Link href="/privacy-policy">Privacy</Link></div></footer>
 <dialog ref={dialog} className="un-service-dialog" aria-labelledby="un-service-title" onClick={e=>{if(e.target===e.currentTarget)closeDialog();}}><button className="un-service-close" aria-label="Close service details" onClick={closeDialog}><X size={24}/></button><span className="wd-eyebrow">WHAT WE CREATE</span><h2 id="un-service-title">{service?.title??"Explore our services"}</h2><p>{service?.detail}</p><span className="un-service-scope">{service?.scope}</span><div className="un-service-cta"><a href={whatsappUrl(`Hello wedigitlize, I’d like to discuss ${service?.title??"a project"}.`)} className="wd-button" target="_blank" rel="noopener noreferrer">Discuss your project<ArrowUpRight size={16}/></a><Link href="/projects" className="wd-text-link">Explore our work</Link></div><p className="un-service-quote">We confirm the scope, price and delivery plan before work begins.</p></dialog>
 <CardActions type={action} onClose={()=>setAction(null)}/>
 </main>;
}
