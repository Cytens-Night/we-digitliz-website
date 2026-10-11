"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Concept = "build" | "brand" | "universe";
type Act = { title: string; accent: string; kicker: string; detail: string };
const DURATION = 15;
const CONCEPTS: Record<Concept, { name: string; description: string; footer: string; acts: Act[] }> = {
  build: {
    name: "01 / The Build",
    description: "A digital wireframe becomes a real website, then expands into a connected device experience.",
    footer: "WEBSITES · WEB APPS · MOBILE APPS",
    acts: [
      { kicker: "EVERY PROJECT BEGINS SOMEWHERE", title: "FROM THE", accent: "FIRST IDEA.", detail: "A thought becomes a blueprint." },
      { kicker: "CRAFTED WITH PURPOSE", title: "TO REAL", accent: "EXPERIENCES.", detail: "Beautiful interfaces, built to work." },
      { kicker: "DIGITAL, EVERYWHERE", title: "EVERY", accent: "SCREEN.", detail: "Websites, responsive platforms and apps." },
      { kicker: "WEDIGITLIZE — DESIGN. BUILD. CONNECT.", title: "DESIGNED TO", accent: "PERFORM.", detail: "Visit wedigitlize.com" },
    ],
  },
  brand: {
    name: "02 / Brand Power",
    description: "The original WeDigitlize emblem reveals a complete brand world and a digital business card.",
    footer: "BRANDING · IDENTITY · DIGITAL BUSINESS CARDS",
    acts: [
      { kicker: "BEYOND THE ORDINARY", title: "MORE THAN", accent: "A LOGO.", detail: "Your brand is your first impression." },
      { kicker: "THE POWER OF VISUAL IDENTITY", title: "EVERY", accent: "DETAIL.", detail: "Shape, colour, type and personality." },
      { kicker: "CONNECT IN A NEW WAY", title: "ONE TAP.", accent: "REAL IMPACT.", detail: "Digital business cards with purpose." },
      { kicker: "WEDIGITLIZE — DESIGN. BUILD. CONNECT.", title: "BE", accent: "REMEMBERED.", detail: "Visit wedigitlize.com" },
    ],
  },
  universe: {
    name: "03 / Everything Digital",
    description: "Six interconnected services orbit the studio identity while actual portfolio projects appear.",
    footer: "DESIGN · DEVELOPMENT · BRANDING · MARKETING",
    acts: [
      { kicker: "WELCOME TO YOUR CREATIVE PARTNER", title: "ONE", accent: "AGENCY.", detail: "Your ideas, connected." },
      { kicker: "FROM STRATEGY TO DELIVERY", title: "EVERYTHING", accent: "DIGITAL.", detail: "Your digital presence, together." },
      { kicker: "EXPLORE OUR PROJECTS", title: "BUILT FOR", accent: "REAL BRANDS.", detail: "Furqan Sweets · Marshalos · Shakur Fragrances" },
      { kicker: "WEDIGITLIZE — DESIGN. BUILD. CONNECT.", title: "LET'S BUILD", accent: "WHAT'S NEXT.", detail: "Visit wedigitlize.com" },
    ],
  },
};
const SERVICES = [
  { icon: "⌘", name: "WEBSITES", caption: "Custom-built experiences" },
  { icon: "◈", name: "BRANDING", caption: "Memorable identity systems" },
  { icon: "▣", name: "MOBILE APPS", caption: "Apps that feel effortless" },
  { icon: "✧", name: "SOCIAL CONTENT", caption: "Creative campaigns" },
  { icon: "▤", name: "DIGITAL CARDS", caption: "A better first impression" },
  { icon: "↗", name: "WEB APPS", caption: "Smart digital systems" },
];
const PROJECTS = [
  { name: "Marshalos", category: "Digital platform", image: "/work/marshalos.jpg" },
  { name: "Shakur Fragrances", category: "Premium digital identity", image: "/work/shakur.jpg" },
  { name: "Furqan Sweets", category: "Commerce experience", image: "/work/furqan.jpg" },
];
function bound(x: number) { return Math.max(0, Math.min(1, x)); }
function ease(x: number) { const p = bound(x); return p * p * (3 - 2 * p); }
function rise(t: number, a: number, b: number) { return ease((t - a) / (b - a)); }
function visible(t: number, a: number, b: number, c: number, d: number) {
  return rise(t, a, b) * (1 - rise(t, c, d));
}
function timecode(t: number) {
  return "00:" + String(Math.floor(t)).padStart(2, "0");
}
const MOTES = Array.from({ length: 32 }, (_, i) => ({
  x: 5 + ((i * 47.73) % 88),
  y: 8 + ((i * 23.21) % 80),
  size: i % 7 === 0 ? 3 : 1,
  delay: -(i % 9) * 0.37,
}));

function Wireframe({ opacity, t }: { opacity: number; t: number }) {
  return (
    <div className="wdc-wireframe" style={{ opacity, transform: "perspective(720px) rotateY(" + (-23 + t * 3) + "deg) rotateX(9deg) translateY(" + (10 - t * 5) + "px)" }}>
      <div className="wdc-wire-top"><i /><i /><i /><span>DESIGN / STRUCTURE / PURPOSE</span></div>
      <div className="wdc-wire-nav" />
      <div className="wdc-wire-hero"><span /><strong /><span /><span /></div>
      <div className="wdc-wire-cards"><i /><i /><i /></div>
      <div className="wdc-wire-button" />
      <div className="wdc-wire-caption">INTERFACE SYSTEM INITIALISING</div>
    </div>
  );
}
function ProjectBrowser({ time, image, name, className = "" }: { time: number; image: string; name: string; className?: string }) {
  const spin = -15 + 5 * Math.sin(time * 0.6);
  return (
    <div className={"wdc-browser " + className} style={{ transform: "perspective(760px) rotateY(" + spin + "deg) rotateX(6deg) rotateZ(-2deg) translateY(" + (4 * Math.sin(time * 1.2)) + "px)" }}>
      <div className="wdc-browser-bar"><span className="wdc-window-dots"><i /><i /><i /></span><span>{name.toUpperCase()} / FEATURED PROJECT</span><span>↗</span></div>
      <div className="wdc-browser-shot"><img src={image} alt={"Actual WeDigitlize portfolio artwork for " + name} /></div>
      <div className="wdc-browser-bottom"><span>DESIGN <b>+</b> DEVELOPMENT</span><span>WEDIGITLIZE / SELECTED WORK</span></div>
    </div>
  );
}
function Phone({ time, image, name }: { time: number; image: string; name: string }) {
  return (
    <div className="wdc-phone" style={{ transform: "perspective(600px) rotateY(" + (-17 - 5 * Math.sin(time)) + "deg) rotateZ(7deg) translateY(" + (6 * Math.cos(time)) + "px)" }}>
      <div className="wdc-phone-notch" />
      <div className="wdc-phone-bar"><span>{name}</span><span>☰</span></div>
      <img src={image} alt={"WeDigitlize portfolio project: " + name} />
      <div className="wdc-phone-bottom">EXPLORE PROJECT <span>↗</span></div>
    </div>
  );
}
function BuildScene({ time }: { time: number }) {
  const wf = visible(time, 0, 0.7, 3.0, 4.1);
  const primary = visible(time, 2.6, 4, 11, 12.1);
  const extra = visible(time, 6.3, 7.9, 10.9, 11.9);
  return (
    <div className="wdc-build-world">
      <div className="wdc-orbit wdc-orbit-a" /><div className="wdc-orbit wdc-orbit-b" />
      <Wireframe t={time} opacity={wf} />
      <div className="wdc-work-system" style={{ opacity: primary }}>
        <ProjectBrowser time={time} image="/work/marshalos.jpg" name="Marshalos" />
        <div className="wdc-floating-label wdc-label-a" style={{ opacity: rise(time, 3.7, 5.4) }}>UI / UX <span>✦</span></div>
        <div className="wdc-floating-label wdc-label-b" style={{ opacity: extra }}>RESPONSIVE <span>↗</span></div>
        <div className="wdc-second-device" style={{ opacity: extra }}><Phone time={time} image="/work/shakur.jpg" name="Shakur" /></div>
        <div className="wdc-third-device" style={{ opacity: extra }}>
          <div className="wdc-tablet"><img src="/work/furqan.jpg" alt="Furqan Sweets portfolio project" /><span>FURQAN SWEETS / COMMERCE</span></div>
        </div>
        <div className="wdc-project-label" style={{ opacity: rise(time, 4.2, 5.4) }}>REAL PORTFOLIO PROJECTS <span>01 — 03</span></div>
      </div>
    </div>
  );
}
function BrandScene({ time }: { time: number }) {
  const sculpture = visible(time, 0, 0.9, 5.3, 6.4);
  const identity = visible(time, 3.3, 4.9, 10.9, 12);
  const card = visible(time, 7, 8.3, 11.1, 12);
  return (
    <div className="wdc-brand-world">
      <div className="wdc-brand-monogram" style={{ opacity: sculpture, transform: "perspective(800px) rotateY(" + (-33 + time * 18) + "deg) rotateX(11deg) rotateZ(-7deg) scale(" + (0.85 + rise(time, 0, 3) * 0.24) + ")" }}>
        <div className="wdc-logo-disc"><img src="/logo-white.svg" alt="WeDigitlize official mark" /></div><div className="wdc-monogram-light" />
      </div>
      <div className="wdc-brand-kit" style={{ opacity: identity }}>
        <div className="wdc-identity-card wdc-identity-a"><span>01 / IDENTITY</span><img src="/logo-white.svg" alt="" /><strong>BRANDS THAT MEAN MORE.</strong></div>
        <div className="wdc-identity-card wdc-identity-b"><img src="/work/shakur.jpg" alt="Shakur Fragrances project artwork" /><span>SHAKUR FRAGRANCES / SELECTED WORK</span></div>
        <div className="wdc-swatch-row"><i /><i /><i /><i /></div>
      </div>
      <div className="wdc-card-phone" style={{ opacity: card, transform: "perspective(680px) rotateY(" + (-19 + Math.sin(time) * 6) + "deg) rotateZ(7deg) translateY(" + (Math.sin(time * 1.4) * 7) + "px)" }}>
        <div className="wdc-phone-notch" />
        <div className="wdc-digital-mark"><img src="/logo-white.svg" alt="WeDigitlize" /></div>
        <h3>WeDigitlize</h3><p>Digital design studio</p>
        <div className="wdc-contact-row"><span>CALL</span><span>EMAIL</span><span>WEB</span></div>
        <div className="wdc-save-contact">DIGITAL BUSINESS CARD <span>↗</span></div>
        <div className="wdc-mini-card"><span>DESIGNED TO CONNECT</span><strong>01 / 01</strong></div>
      </div>
    </div>
  );
}
function UniverseScene({ time }: { time: number }) {
  const globe = visible(time, 0, 0.8, 11.2, 12.2);
  const cards = visible(time, 2.7, 4.3, 10.9, 12);
  const gallery = visible(time, 6.1, 7.5, 10.8, 11.9);
  return (
    <div className="wdc-universe-world">
      <div className="wdc-universe-halo" style={{ opacity: globe, transform: "rotateX(70deg) rotateZ(" + (time * 14) + "deg)" }} />
      <div className="wdc-universe-core" style={{ opacity: globe }}><img src="/logo-white.svg" alt="WeDigitlize original icon" /><span>DESIGN. BUILD. CONNECT.</span></div>
      <div className="wdc-service-grid" style={{ opacity: cards }}>
        {SERVICES.map((service, i) => <div className={"wdc-service-chip wdc-chip-" + i} key={service.name} style={{ transform: "translateY(" + (4 * Math.sin(time + i)) + "px) rotate(" + ((i % 2 ? 1 : -1) * 5) + "deg)" }}><div>{service.icon}</div><strong>{service.name}</strong><small>{service.caption}</small></div>)}
      </div>
      <div className="wdc-portfolio-carousel" style={{ opacity: gallery }}>
        {PROJECTS.map((p, i) => <div className={"wdc-project-tile wdc-tile-" + i} key={p.name}><img src={p.image} alt={"Real WeDigitlize project visual: " + p.name} /><span>{p.name}<small>{p.category}</small></span></div>)}
      </div>
    </div>
  );
}

export default function CampaignStudio() {
  const [concept, setConcept] = useState<Concept>("build");
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [loop, setLoop] = useState(true);
  const latest = useRef(0);
  useEffect(() => {
    if (!playing) return;
    let last: number | undefined;
    let raf = 0;
    const tick = (now: number) => {
      if (last === undefined) last = now;
      const delta = Math.min((now - last) / 1000, 0.12);
      last = now;
      const next = latest.current + delta;
      if (next >= DURATION) {
        latest.current = loop ? next % DURATION : DURATION;
        setTime(latest.current);
        if (!loop) { setPlaying(false); return; }
      } else {
        latest.current = next;
        setTime(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, loop]);
  const changeConcept = useCallback((c: Concept) => {
    setConcept(c); latest.current = 0; setTime(0); setPlaying(true);
  }, []);
  const seek = useCallback((v: number) => {
    latest.current = v; setTime(v);
  }, []);
  const replay = useCallback(() => {
    latest.current = 0; setTime(0); setPlaying(true);
  }, []);
  const item = CONCEPTS[concept];
  const currentAct = time < 3 ? 0 : time < 6.5 ? 1 : time < 11.7 ? 2 : 3;
  const headlineOpacities = [
    visible(time, 0, 0.55, 2.5, 3.4),
    visible(time, 2.75, 3.7, 6.1, 7.1),
    visible(time, 6.55, 7.55, 10.6, 11.9),
    rise(time, 11.9, 12.6),
  ];
  return (
    <div className="wdc-root">
      <header className="wdc-toolbar">
        <a className="wdc-header-brand" href="https://wedigitlize.com" target="_blank" rel="noreferrer"><img src="/logo-white.svg" alt="" /><span>wedigitlize<small>CAMPAIGN / MOTION STUDIO 02</small></span></a>
        <div className="wdc-switcher" role="group" aria-label="Choose commercial">
          {(["build", "brand", "universe"] as Concept[]).map(c => <button key={c} type="button" aria-pressed={c === concept} className={c === concept ? "wdc-selected" : ""} onClick={() => changeConcept(c)}>{CONCEPTS[c].name}</button>)}
        </div>
        <span className="wdc-preview-label">DEVELOPMENT PREVIEW <i /></span>
      </header>
      <div className="wdc-workspace">
        <div className="wdc-film-wrap">
          <div className="wdc-film" aria-label={item.description}>
            <div className="wdc-film-aurora" />
            <div className="wdc-film-grid" />
            <div className="wdc-film-ring" />
            <div className="wdc-particles" aria-hidden="true">{MOTES.map((m, i) => <i key={i} style={{ left: m.x + "%", top: m.y + "%", width: m.size + "px", height: m.size + "px", animationDelay: m.delay + "s" }} />)}</div>
            <div className="wdc-film-top"><span><i /> WEDIGITLIZE / DIGITAL STUDIO</span><span>0{currentAct + 1} / 04</span></div>
            <div className="wdc-film-overline"><span>DESIGN · BUILD · CONNECT</span><img src="/logo-white.svg" alt="" /></div>
            <div className="wdc-headline-stack" aria-live="off">
              {item.acts.map((act, i) => <div className="wdc-headline-act" key={act.title} style={{ opacity: headlineOpacities[i], transform: "translateY(" + ((1 - headlineOpacities[i]) * 18) + "px)" }}>
                <p>{act.kicker}</p><h1>{act.title}<br /><em>{act.accent}</em></h1><span>{act.detail}</span>
              </div>)}
            </div>
            <div className="wdc-film-visual">
              {concept === "build" && <BuildScene time={time} />}
              {concept === "brand" && <BrandScene time={time} />}
              {concept === "universe" && <UniverseScene time={time} />}
            </div>
            <div className="wdc-final-lockup" style={{ opacity: rise(time, 11.85, 12.65), pointerEvents: time > 12.4 ? "auto" : "none" }}>
              <div className="wdc-final-halo" />
              <img src="/logo-white.svg" alt="WeDigitlize" />
              <strong>wedigitlize<span>.</span></strong>
              <p>DESIGNED TO IMPRESS. BUILT TO PERFORM.</p>
              <a href="https://wedigitlize.com" target="_blank" rel="noreferrer">VISIT WEDIGITLIZE.COM <span>↗</span></a>
            </div>
            <div className="wdc-film-bottom"><span>{item.footer}</span><div className="wdc-film-progress"><div style={{ width: (100 * time / DURATION) + "%" }} /></div><small>WEDIGITLIZE / CREATIVE STUDIO <span>© 2026</span></small></div>
            <div className="wdc-vignette" />
          </div>
        </div>
        <aside className="wdc-panel">
          <div className="wdc-eyebrow">INTERACTIVE DIRECTOR&apos;S PREVIEW <span>9:16</span></div>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <div className="wdc-play-row">
            <button type="button" className="wdc-play" onClick={() => setPlaying(v => !v)}>{playing ? "Ⅱ Pause" : "▶ Play"}</button>
            <button type="button" onClick={replay}>↺ Replay</button>
            <span>{timecode(time)} / 00:15</span>
          </div>
          <label htmlFor="wdc-scrub">SCRUB THE ANIMATION</label>
          <input id="wdc-scrub" type="range" min={0} max={DURATION} step={0.05} value={time} onChange={e => { setPlaying(false); seek(Number(e.target.value)); }} aria-label="Animation time in seconds" />
          <div className="wdc-cues">{item.acts.map((a, i) => <button type="button" onClick={() => { setPlaying(false); seek([0, 3, 6.8, 12.1][i]); }} key={a.kicker} className={i === currentAct ? "wdc-cue-active" : ""}><span>{["00:00", "00:03", "00:07", "00:12"][i]}</span><span>{a.title} {a.accent}</span></button>)}</div>
          <label className="wdc-loop"><input type="checkbox" checked={loop} onChange={e => setLoop(e.target.checked)} /> Loop preview</label>
          <div className="wdc-panel-note"><b>REAL PORTFOLIO ASSETS</b><span>Portfolio artwork from the current WeDigitlize repository: Furqan Sweets, Marshalos and Shakur Fragrances. Device surfaces and the digital business card are creative presentations, not verified live app screens.</span></div>
          <a className="wdc-external" href="https://wedigitlize.com" target="_blank" rel="noreferrer">Visit the live WeDigitlize website ↗</a>
        </aside>
      </div>
    </div>
  );
}
