"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
export default function CardIntro(){
 const [visible,setVisible]=useState(true);
 useEffect(()=>{const timer=setTimeout(()=>setVisible(false),1400);return()=>clearTimeout(timer);},[]);
 if(!visible)return null;
 return <div className="un-card-intro"><div aria-hidden="true" className="un-intro-brand"><div className="un-intro-halo"/><Logo className="un-intro-logo"/><span>wedigitlize</span><small>DESIGN. BUILD. CONNECT.</small><i/></div><button onClick={()=>setVisible(false)}>Skip intro<Arrow/></button></div>;
}
function Arrow(){return <span aria-hidden="true">↗</span>;}
