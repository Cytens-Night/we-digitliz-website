const fs = require('fs');
const path = require('path');

const files = [
  'src/components/sections/Industries.tsx',
  'src/components/sections/Process.tsx',
  'src/components/sections/Pricing.tsx',
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Specific replaces for things missed
  
  // Process.tsx lines
  content = content.replace(/bg-black -translate-x-1\/2/g, 'bg-black dark:bg-white -translate-x-1/2');
  content = content.replace(/rotate-45 bg-black z-20/g, 'rotate-45 bg-black dark:bg-white z-20');
  
  // Industries.tsx dots
  content = content.replace(/bg-black shadow-\[0_0_20px_rgba\(0,0,0,0\.5\)\]/g, 'bg-black dark:bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.5)]');
  
  // Buttons / Badges
  content = content.replace(/bg-black text-white/g, 'bg-black dark:bg-white text-white dark:text-black');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
