const fs = require('fs');
const path = require('path');

const fixContact = () => {
  const p = path.join(__dirname, 'src/components/sections/Contact.tsx');
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  
  // Fix text colors
  c = c.replace(/text-\[#1d1d1f\]/g, 'text-[#1d1d1f] dark:text-white');
  c = c.replace(/text-\[#3c3c43\]/g, 'text-[#3c3c43] dark:text-white/70');
  
  // Fix button that got messed up (bg-[#1d1d1f] text-black dark:text-white)
  c = c.replace(/bg-\[#1d1d1f\] text-black dark:text-white/g, 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black');
  
  // Fix input backgrounds
  c = c.replace(/focus:bg-white/g, 'focus:bg-card');
  
  // Fix hover states
  c = c.replace(/hover:text-black\/50/g, 'hover:text-black/50 dark:hover:text-white/50');
  c = c.replace(/text-black\/30/g, 'text-black/30 dark:text-white/30');
  
  // Fix mobile form close button
  c = c.replace(/text-black\/50 hover:text-black/g, 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white');
  
  // Fix pure white elements that were bg-white instead of bg-card
  c = c.replace(/bg-white rounded-\[2\.5rem\]/g, 'bg-card rounded-[2.5rem]');
  c = c.replace(/bg-white group-hover:w-12/g, 'bg-white dark:bg-black group-hover:w-12');
  
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed Contact.tsx');
};

const fixServices = () => {
  const p = path.join(__dirname, 'src/components/sections/Services.tsx');
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  
  // Fix bg-white
  c = c.replace(/bg-white rounded-3xl/g, 'bg-card rounded-3xl');
  
  // Fix text-black/20
  c = c.replace(/text-black\/20/g, 'text-black/20 dark:text-white/20');
  
  // Fix other text elements if any
  c = c.replace(/text-\[#1d1d1f\]/g, 'text-[#1d1d1f] dark:text-white');
  c = c.replace(/text-black(?![\/\w])/g, 'text-black dark:text-white');
  c = c.replace(/border-black\/5(?!0)/g, 'border-black/5 dark:border-white/5');
  
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed Services.tsx');
};

fixContact();
fixServices();
