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
  'src/components/layout/Navbar.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip files that might already be converted or if we don't want to double convert
  // But let's just do a smart regex replacement that ignores if dark: is already there

  const replace = (regex, replacement) => {
    content = content.replace(regex, replacement);
  };

  // Text
  replace(/(?<!dark:)text-black\/90/g, 'text-black/90 dark:text-white/90');
  replace(/(?<!dark:)text-black\/80/g, 'text-black/80 dark:text-white/80');
  replace(/(?<!dark:)text-black\/70/g, 'text-black/70 dark:text-white/70');
  replace(/(?<!dark:)text-black\/60/g, 'text-black/60 dark:text-white/60');
  replace(/(?<!dark:)text-black\/50/g, 'text-black/50 dark:text-white/50');
  replace(/(?<!dark:)text-black\/40/g, 'text-black/40 dark:text-white/40');
  replace(/(?<!dark:)text-black\/30/g, 'text-black/30 dark:text-white/30');
  replace(/(?<!dark:)text-black\/20/g, 'text-black/20 dark:text-white/20');
  replace(/(?<!dark:)text-black\/10/g, 'text-black/10 dark:text-white/10');
  replace(/(?<!dark:)text-black\/\[0\.04\]/g, 'text-black/[0.04] dark:text-white/[0.04]');
  replace(/(?<!dark:)text-black\/\[0\.05\]/g, 'text-black/[0.05] dark:text-white/[0.05]');
  
  // Note: we have to be careful with 'text-black' so we don't match 'text-black/50' again
  replace(/(?<!dark:)text-black(?![\/\w])/g, 'text-black dark:text-white');

  // Backgrounds
  replace(/(?<!dark:)bg-\[#f5f5f7\]/g, 'bg-[#f5f5f7] dark:bg-[#0a0a0a]');
  replace(/(?<!dark:)bg-\[#0a0a0a\]/g, 'bg-[#f5f5f7] dark:bg-[#0a0a0a]'); // catch any old ones
  replace(/(?<!dark:)bg-white\/80/g, 'bg-white/80 dark:bg-black/80');
  replace(/(?<!dark:)bg-white\/50/g, 'bg-white/50 dark:bg-black/50');
  replace(/(?<!dark:)bg-white(?![\/\w])/g, 'bg-white dark:bg-[#161a22]'); // Standard card background
  
  // Actually, wait, some bg-black are used in dark theme! If we have bg-black, it should be bg-black dark:bg-white? No, if it's bg-black currently, maybe it's meant to be white on light theme!
  // e.g., the "cart" tags are bg-black text-white. In dark mode they should be bg-white text-black? 
  // Let's just leave bg-black alone unless it's a specific opacity.
  replace(/(?<!dark:)bg-black\/20/g, 'bg-black/20 dark:bg-white/20');
  replace(/(?<!dark:)bg-black\/15/g, 'bg-black/15 dark:bg-white/15');
  replace(/(?<!dark:)bg-black\/10/g, 'bg-black/10 dark:bg-white/10');
  replace(/(?<!dark:)bg-black\/5(?!0)/g, 'bg-black/5 dark:bg-white/5');
  replace(/(?<!dark:)bg-black\/\[0\.04\]/g, 'bg-black/[0.04] dark:bg-white/[0.04]');
  replace(/(?<!dark:)bg-black\/\[0\.02\]/g, 'bg-black/[0.02] dark:bg-white/[0.02]');
  
  // Borders
  replace(/(?<!dark:)border-black\/30/g, 'border-black/30 dark:border-white/30');
  replace(/(?<!dark:)border-black\/20/g, 'border-black/20 dark:border-white/20');
  replace(/(?<!dark:)border-black\/15/g, 'border-black/15 dark:border-white/15');
  replace(/(?<!dark:)border-black\/10/g, 'border-black/10 dark:border-white/10');
  replace(/(?<!dark:)border-black\/5(?!0)/g, 'border-black/5 dark:border-white/5');
  replace(/(?<!dark:)border-black(?![\/\w])/g, 'border-black dark:border-white/20');
  
  // SVG Graphics in Industries
  replace(/stroke-black(?![\/\w])/g, 'stroke-black dark:stroke-white');
  replace(/fill="black"/g, 'fill="black" className="dark:fill-white"'); // rough hack for fill, but it's better to use classes
  replace(/fill-black/g, 'fill-black dark:fill-white');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
