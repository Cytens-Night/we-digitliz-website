"use client";

import React, { useEffect, useState } from "react";
import Laptop3D from "@/components/laptop/Laptop3D";
import Image from "next/image";
import data from "./data.json";

export default function LaptopCardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Laptop3D>
      {/* FURQAN SWEETS INTERNAL UI */}
      <div className="w-full min-h-screen bg-[#fffdfa] text-slate-800 font-sans selection:bg-amber-200">
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={`/furqan-assets/furqansweets_logo.svg`} 
              alt="Furqan Sweets Logo" 
              className="w-10 h-10"
            />
            <span className="font-bold text-lg text-amber-900">{data.siteSettings.storeName}</span>
          </div>
          <a href={data.siteSettings.phoneTel} className="bg-amber-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/30">
            Order Now
          </a>
        </nav>

        {/* Hero Section */}
        <section className="relative px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-2 border border-amber-200">
              London's Finest
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-amber-950 leading-tight">
              {data.siteSettings.heroTitle}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-amber-700">
              {data.siteSettings.heroTitleSomali}
            </h2>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              {data.siteSettings.heroSubtitle} <br/>
              <span className="opacity-80 italic">{data.siteSettings.heroSubtitleSomali}</span>
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-amber-400 rounded-full blur-[100px] opacity-20"></div>
            <img 
              src="/furqan-assets/halwa_main.png" 
              alt="Delicious Somali Halwa" 
              className="w-full max-w-lg mx-auto relative z-10 drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
            />
          </div>
        </section>

        {/* Heritage Section */}
        <section className="bg-amber-950 text-amber-50 py-20 px-6 relative overflow-hidden">
          <img src="/furqan-assets/halwa_texture.png" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" alt="" />
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
            <h3 className="text-4xl md:text-5xl font-bold">{data.siteSettings.storyTitle}</h3>
            <p className="text-xl leading-relaxed text-amber-200/90 max-w-2xl mx-auto">
              {data.siteSettings.storyText}
            </p>
            <p className="text-lg italic text-amber-200/60 max-w-2xl mx-auto">
              {data.siteSettings.storyTextSomali}
            </p>
          </div>
        </section>

        {/* Halwa Variants Grid */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-amber-950 mb-16">Signature Halwa</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.halwaVariants.map((variant: any) => (
              <div key={variant.id} className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xl shadow-amber-900/5 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="aspect-square w-full rounded-2xl bg-amber-50 mb-6 flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-200 opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl" />
                  <img src={`/furqan-assets/${variant.image.split('/').pop()}`} alt={variant.name} className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="text-2xl font-bold text-amber-900 mb-1">{variant.name}</h4>
                <p className="text-amber-700/70 text-sm mb-4 font-medium">{variant.somali}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-amber-600">£{variant.price} <span className="text-sm text-slate-400 font-normal">/ {variant.unit}</span></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bulk Orders Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-amber-50 to-orange-50 border-y border-amber-100">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/5 h-64 md:h-auto bg-amber-100 p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[url('/furqan-assets/halwa_texture.png')] opacity-10 mix-blend-multiply" />
              <img src="/furqan-assets/square_bucket_halwa.png" alt="Bulk Order" className="relative z-10 w-full max-w-[250px] drop-shadow-2xl" />
            </div>
            <div className="w-full md:w-3/5 p-10 md:p-16 space-y-6">
              <div className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-amber-200">
                Bulk Orders
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-amber-950">{data.siteSettings.bulkTitle}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{data.siteSettings.bulkDesc}</p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100">
                  <div className="text-sm text-amber-700 font-bold mb-1">Base Size</div>
                  <div className="text-2xl font-black text-amber-950">{data.siteSettings.bulkWeight}</div>
                </div>
                <div className="bg-amber-50 px-6 py-4 rounded-2xl border border-amber-100">
                  <div className="text-sm text-amber-700 font-bold mb-1">Price</div>
                  <div className="text-2xl font-black text-amber-950">{data.siteSettings.bulkPrice}</div>
                </div>
              </div>
              
              <a href={data.siteSettings.phoneTel} className="mt-4 block w-full text-center bg-amber-950 text-amber-50 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-xl shadow-amber-900/20">
                {data.siteSettings.bulkCallBtnText}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-amber-950 text-amber-50 py-12 px-6 text-center">
          <img src="/furqan-assets/furqansweets_logo.svg" className="w-16 h-16 mx-auto mb-6 brightness-0 invert opacity-50" alt="" />
          <p className="opacity-60 mb-2">© {new Date().getFullYear()} {data.siteSettings.storeName}. All rights reserved.</p>
          <p className="opacity-40 text-sm">Powered by We Digitliz</p>
        </footer>
      </div>
    </Laptop3D>
  );
}
