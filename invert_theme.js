const fs = require('fs');
const path = require('path');

const files = [
  'src/components/sections/Pricing.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Backgrounds
  content = content.replace(/bg-\[#000000\]/g, 'bg-white'); // Main section bg (wait, Pricing is bg-[#000000]?)
  // Actually, let's just make sure we replace the main section bg. Let me check the file first to be safe, but typically it's bg-[#0a0a0a] or bg-[#000000]
  content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-[#f5f5f7]');
  content = content.replace(/bg-\[#161a22\]/g, 'bg-white'); // card bg
  content = content.replace(/bg-\[#111\]/g, 'bg-white'); // other card bg

  // Text colors
  content = content.replace(/text-white\/90/g, 'text-black/90');
  content = content.replace(/text-white\/80/g, 'text-black/80');
  content = content.replace(/text-white\/70/g, 'text-black/70');
  content = content.replace(/text-white\/60/g, 'text-black/60');
  content = content.replace(/text-white\/50/g, 'text-black/50');
  content = content.replace(/text-white\/40/g, 'text-black/40');
  content = content.replace(/text-white\/30/g, 'text-black/30');
  content = content.replace(/text-white\/20/g, 'text-black/20');
  content = content.replace(/text-white\/10/g, 'text-black/10');
  content = content.replace(/text-white/g, 'text-black');
  
  // Specific cart button adjustments:
  // "bg-white text-black" (the items in the cart) -> "bg-black text-white"
  content = content.replace(/bg-white text-black/g, 'bg-black text-white');

  // Borders
  content = content.replace(/border-white\/30/g, 'border-black/20');
  content = content.replace(/border-white\/20/g, 'border-black/10');
  content = content.replace(/border-white\/10/g, 'border-black/5');
  content = content.replace(/border-white\/5/g, 'border-black/5');
  content = content.replace(/border-white/g, 'border-black');

  // Backgrounds with opacity
  content = content.replace(/bg-white\/20/g, 'bg-black/10');
  content = content.replace(/bg-white\/10/g, 'bg-black/5');
  content = content.replace(/bg-white\/5/g, 'bg-black/5');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
