const fs = require('fs');
const path = require('path');

const files = [
  'src/components/sections/About.tsx',
  'src/components/sections/DigitalCards.tsx',
  'src/components/sections/Industries.tsx',
  'src/components/sections/Process.tsx',
  'src/components/sections/Pricing.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Text opacities bump for better contrast
  content = content.replace(/text-black\/10/g, 'text-black/30');
  content = content.replace(/text-black\/20/g, 'text-black/40');
  content = content.replace(/text-black\/30/g, 'text-black/50');
  content = content.replace(/text-black\/40/g, 'text-black/60');
  content = content.replace(/text-black\/50/g, 'text-black/70');
  content = content.replace(/text-black\/60/g, 'text-black/80');
  
  // Specific watermark tweaks (don't want them too dark, but a bit more visible)
  content = content.replace(/text-black\/\[0\.03\]/g, 'text-black/[0.05]');

  // Border opacities bump
  content = content.replace(/border-black\/5(?!0)/g, 'border-black/15');
  content = content.replace(/border-black\/10/g, 'border-black/20');
  
  // Background opacities bump
  content = content.replace(/bg-black\/5(?!0)/g, 'bg-black/10');
  content = content.replace(/bg-black\/\[0\.02\]/g, 'bg-black/[0.04]');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
