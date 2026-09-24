const fs = require('fs');
const path = require('path');

const files = [
  'src/components/sections/Hero.tsx',
  'src/components/sections/Showcase.tsx',
  'src/components/sections/Features.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/DigitalCards.tsx',
  'src/components/sections/Industries.tsx',
  'src/components/sections/Process.tsx',
  'src/components/sections/Pricing.tsx',
  'src/components/sections/ClientTestimonials.tsx',
  'src/components/sections/Footer.tsx',
  'src/components/layout/Navbar.tsx',
  'src/app/layout.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip hardcoded backgrounds
  content = content.replace(/bg-\[#f5f5f7\] dark:bg-\[#0a0a0a\]/g, 'bg-background transition-colors duration-1000');
  content = content.replace(/bg-white dark:bg-\[#161a22\]/g, 'bg-card transition-colors duration-1000');
  content = content.replace(/bg-\[#f5f5f7\]/g, 'bg-background transition-colors duration-1000'); // catch stragglers

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
