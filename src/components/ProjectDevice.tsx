"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

const phoneSizes = {
  compact: { width: 320, height: 568 },
  standard: { width: 390, height: 844 },
  large: { width: 430, height: 932 },
};

export default function ProjectDevice({ name, url, mobile = false, previewImage }: { name: string; url: string; mobile?: boolean; previewImage?: string }) {
  const screen = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [previewScale, setPreviewScale] = useState(mobile ? .78 : .5);
  const [previewMode, setPreviewMode] = useState(mobile ? "phone" : "desktop");
  const [phoneSize, setPhoneSize] = useState<keyof typeof phoneSizes>("standard");
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)), { rootMargin: "220px", threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = screen.current;
    if (!element) return;
    const observer = new ResizeObserver(entries => setPreviewScale(entries[0].contentRect.width / (mobile ? 390 : 1280)));
    observer.observe(element);
    return () => observer.disconnect();
  }, [mobile]);

  function open() { setExpanded(true); dialog.current?.showModal(); }
  function close() { dialog.current?.close(); setExpanded(false); }
  const sandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads";
  const size = phoneSizes[phoneSize];

  return <div ref={stage} className="un-device-stage">
    <div className={`un-device ${mobile ? "un-device-phone" : "un-device-monitor"}`}><div ref={screen} className="un-device-screen">
      {previewImage ? <Image src={previewImage} alt={`${name} website preview`} fill sizes="(max-width: 850px) 88vw, 48vw" className="un-device-image"/> : visible && !expanded ? <iframe src={url} title={`${name} live ${mobile ? "phone" : "desktop"} preview`} style={{ transform: `scale(${previewScale})` }} loading="lazy" sandbox={sandbox} referrerPolicy="strict-origin-when-cross-origin" tabIndex={-1}/> : <div className="un-device-loading"><Logo className="un-nav-logo"/><span>{name}<br/>Live project preview</span></div>}
    </div></div>
    {!mobile && <div className="un-device-stand" aria-hidden="true"/>}
    <div className="un-device-caption"><span>{previewImage ? "Project preview" : "Live project"} · {mobile ? "Phone" : "Desktop"} view</span>{previewImage ? <a href={url} target="_blank" rel="noopener noreferrer">Open live site<ArrowUpRight size={14}/></a> : <button onClick={open}><Maximize2 size={14}/>Interact with preview</button>}</div>
    {!previewImage && <dialog ref={dialog} className="un-live-dialog" aria-label={`Interactive ${name} project preview`} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="un-live-toolbar"><strong>{name}</strong><div className="un-preview-modes" role="group" aria-label="Preview viewport"><button aria-pressed={previewMode === "phone"} onClick={() => setPreviewMode("phone")}>Phone</button><button aria-pressed={previewMode === "desktop"} onClick={() => setPreviewMode("desktop")}>Desktop</button></div>
        {previewMode === "phone" && <select className="un-preview-size" aria-label="Phone preview size" value={phoneSize} onChange={event => setPhoneSize(event.target.value as keyof typeof phoneSizes)}><option value="compact">Compact · 320 × 568</option><option value="standard">Standard · 390 × 844</option><option value="large">Large · 430 × 932</option></select>}
        <a href={url} target="_blank" rel="noopener noreferrer">Open live site<ArrowUpRight size={13}/></a><button aria-label="Close live preview" onClick={close}><X size={23}/></button>
      </div>
      {expanded && <div className="un-live-viewport" data-mode={previewMode}><iframe src={url} title={`${name} interactive live project`} style={previewMode === "phone" ? { width: size.width, height: `min(100%, ${size.height}px)` } : undefined} sandbox={sandbox} allow="clipboard-write; fullscreen" referrerPolicy="strict-origin-when-cross-origin"/></div>}
    </dialog>}
  </div>;
}
