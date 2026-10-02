"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Copy, Send, Mail, Phone, UserPlus, ChevronLeft } from "lucide-react";
import { business } from "@/lib/business";
export type CardAction = "website" | "email" | "phone" | null;
export default function CardActions({type,onClose}:{type:CardAction;onClose:()=>void}) {
 const dialog=useRef<HTMLDialogElement>(null);
 const [subscribe,setSubscribe]=useState(false),[pending,setPending]=useState(false);
 const [message,setMessage]=useState(""),[copied,setCopied]=useState(false),[manual,setManual]=useState(false);
 const [viewport,setViewport]=useState("phone");
 useEffect(()=>{if(type){dialog.current?.showModal();}else{dialog.current?.close();}},[type]);
 function close(){onClose();setSubscribe(false);setMessage("");setCopied(false);setManual(false);}
 async function copy(){try{await navigator.clipboard.writeText(business.email);setCopied(true);setManual(false);}catch{setManual(true);}}
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(pending)return;
  const form=event.currentTarget,data=new FormData(form);if(data.get("bot-field"))return;
  setPending(true);setMessage("");
  try{const response=await fetch("/__forms.html",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams([...data].map(([key,value])=>[key,String(value)])).toString(),signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw new Error("Request failed");
   setMessage("Thank you — your subscription request has been received.");form.reset();
  }catch{setMessage("We couldn’t save your request. Please try again or email us directly.");}finally{setPending(false);}
 }
 return <dialog ref={dialog} className={`un-action-dialog ${type==="website"?"un-website-dialog":""}`} aria-label={type==="website"?"Preview the wedigitlize website":type==="phone"?"Contact options":"Email options"} onClose={close} onClick={e=>{if(e.target===e.currentTarget)close();}}>
  <header><span>{type==="website"?"EXPLORE OUR STUDIO":"LET’S CONNECT"}</span><button aria-label="Close contact options" onClick={close}><X size={22}/></button></header>
  {type==="website"?<><div className="un-website-title"><h2>A little look<br/>at what’s next.</h2><a href="/" target="_blank" rel="noopener noreferrer">Open website<ArrowUpRight size={17}/></a></div><div className="un-website-controls" role="group" aria-label="Website preview viewport"><button onClick={()=>setViewport("phone")} aria-pressed={viewport==="phone"}>Phone</button><button onClick={()=>setViewport("desktop")} aria-pressed={viewport==="desktop"}>Desktop</button></div><div className="un-website-frame" data-mode={viewport}>{type==="website"&&<iframe src="/" title="wedigitlize website preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" allow="clipboard-write"/>}</div></>
  :type==="phone"?<><h2>Your next project<br/>starts here.</h2><p>{business.phoneLabel}</p><div className="un-action-options"><a href={`tel:${business.phone}`}><Phone size={20}/><span>Call our studio<small>Speak with us directly</small></span><ArrowUpRight size={16}/></a><a href="/wedigitlize.vcf" download="wedigitlize.vcf"><UserPlus size={20}/><span>Save to contacts<small>Logo, contact details and our services</small></span><ArrowUpRight size={16}/></a></div><p className="un-action-note">Open the downloaded contact and choose Add or Save on your phone. Contact photos and search behaviour depend on your contacts app.</p></>
  :subscribe?<><button className="un-action-back" onClick={()=>{setSubscribe(false);setMessage("");}}><ChevronLeft size={16}/>Email options</button><h2>Stay in the loop.</h2><p>Occasional studio updates, new work and ideas for your business.</p><form name="studio-updates" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} className="un-subscribe-form"><input type="hidden" name="form-name" value="studio-updates"/><input type="hidden" name="subject" value="wedigitlize studio updates subscription"/><input type="hidden" name="source" value="Digital business card"/><input type="hidden" name="consent-version" value="Studio updates opt-in v1 — 2026-10-03"/><p hidden><label>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@yourbusiness.com" required maxLength={254}/></label><label className="un-subscribe-consent"><input type="checkbox" name="consent" value="I agree to receive occasional wedigitlize studio updates by email." required/><span>I’d like occasional wedigitlize updates by email. I can unsubscribe by emailing the studio.</span></label><button className="wd-button" disabled={pending}>{pending?"Saving your request…":"Subscribe to studio updates"}<Mail size={17}/></button><p className="un-action-note">Read our <Link href="/privacy-policy">privacy notice</Link>. We use your email for the updates you’ve requested.</p><p role="status" aria-live="polite">{message}</p></form></>
  :<><h2>Good ideas<br/>start a conversation.</h2><p>{business.email}</p><div className="un-action-options"><button onClick={copy}><Copy size={20}/><span>{copied?"Email copied":"Copy email address"}<small>{copied?"Ready to paste wherever you need it":"Keep our address handy"}</small></span></button><a href={`mailto:${business.email}?subject=${encodeURIComponent("Let’s discuss a project")}`}><Send size={20}/><span>Send an email<small>Open your preferred email app</small></span><ArrowUpRight size={16}/></a><button onClick={()=>setSubscribe(true)}><Mail size={20}/><span>Subscribe to studio updates<small>New work and useful ideas, occasionally</small></span><ArrowUpRight size={16}/></button></div><p role="status" aria-live="polite">{copied?"Email address copied.":""}</p>{manual&&<label className="un-action-manual">Copy our email<input readOnly value={business.email} onFocus={e=>e.currentTarget.select()}/></label>}</>}
 </dialog>;
}
