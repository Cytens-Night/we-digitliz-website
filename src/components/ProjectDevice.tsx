"use client";
import { useEffect, useRef, useState } from "react";
import { Maximize2, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
export default function ProjectDevice({ name, url, mobile=false }: { name:string; url:string; mobile?:boolean }) {
 const screen=useRef<HTMLDivElement>(null);
 const [previewScale,setPreviewScale]=useState(mobile?.78:.5);
 const stage=useRef<HTMLDivElement>(null), dialog=useRef<HTMLDialogElement>(null);
 const [previewMode,setPreviewMode]=useState(mobile?"phone":"desktop");
 const [visible,setVisible]=useState(false),[expanded,setExpanded]=useState(false);
 useEffect(()=>{
  const element=stage.current;if(!element)return;
  const observer=new IntersectionObserver(entries=>setVisible(entries.some(entry=>entry.isIntersecting)),{rootMargin:"220px",threshold:0});
  observer.observe(element);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  const element=screen.current;if(!element)return;
  const observer=new ResizeObserver(entries=>setPreviewScale(entries[0].contentRect.width/(mobile?390:1280)));
  observer.observe(element);return()=>observer.disconnect();
 },[mobile]);
 function open(){setExpanded(true);dialog.current?.showModal();}
 function close(){dialog.current?.close();setExpanded(false);}
 const sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads";
 return <div ref={stage} className="un-device-stage">
   <div className={`un-device ${mobile?"un-device-phone":"un-device-monitor"}`}><div ref={screen} className="un-device-screen">{visible&&!expanded?<iframe src={url} title={`${name} live ${mobile?"phone":"desktop"} preview`} style={{transform:`scale(${previewScale})`}} loading="lazy" sandbox={sandbox} referrerPolicy="strict-origin-when-cross-origin" tabIndex={-1}/>:<div className="un-device-loading"><Logo className="un-nav-logo"/><span>{name}<br/>Live project preview</span></div>}</div></div>
   {!mobile&&<div className="un-device-stand" aria-hidden="true"/>}
   <div className="un-device-caption"><span>Live project · {mobile?"Phone":"Desktop"} view</span><button onClick={open}><Maximize2 size={14}/>Interact with preview</button></div>
   <dialog ref={dialog} className="un-live-dialog" aria-label={`Interactive ${name} project preview`} onClose={()=>setExpanded(false)} onClick={event=>{if(event.target===event.currentTarget)close();}}><div className="un-live-toolbar"><strong>{name}</strong><div className="un-preview-modes" role="group" aria-label="Preview viewport"><button aria-pressed={previewMode==="phone"} onClick={()=>setPreviewMode("phone")}>Phone</button><button aria-pressed={previewMode==="desktop"} onClick={()=>setPreviewMode("desktop")}>Desktop</button></div><a href={url} target="_blank" rel="noopener noreferrer">Open live site<ArrowUpRight size={13}/></a><button aria-label="Close live preview" onClick={close}><X size={23}/></button></div>{expanded&&<div className="un-live-viewport" data-mode={previewMode}><iframe src={url} title={`${name} interactive live project`} sandbox={sandbox} allow="clipboard-write; fullscreen" referrerPolicy="strict-origin-when-cross-origin"/></div>}</dialog>
 </div>;
}
