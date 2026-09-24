const fs = require('fs');
const path = require('path');

const files = [
  'src/components/sections/Contact.tsx',
  'src/components/sections/Services.tsx',
  'src/components/sections/Footer.tsx' // in case I missed it
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip hardcoded backgrounds first (like refactor_bg.js)
  content = content.replace(/bg-\[#f5f5f7\] dark:bg-\[#0a0a0a\]/g, 'bg-background transition-colors duration-1000');
  content = content.replace(/bg-white dark:bg-\[#161a22\]/g, 'bg-card transition-colors duration-1000');
  content = content.replace(/bg-\[#f5f5f7\](?![\/\w])/g, 'bg-background transition-colors duration-1000');
  
  // Actually, wait, they might be using dark theme originally (like bg-black or bg-[#000000])
  content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-background transition-colors duration-1000');
  content = content.replace(/bg-\[#000000\]/g, 'bg-background transition-colors duration-1000');
  content = content.replace(/bg-black(?![\/\w])/g, 'bg-background transition-colors duration-1000');
  content = content.replace(/bg-\[#111\]/g, 'bg-card transition-colors duration-1000');
  content = content.replace(/bg-\[#161a22\]/g, 'bg-card transition-colors duration-1000');
  
  const replace = (regex, replacement) => {
    content = content.replace(regex, replacement);
  };

  // If they were originally dark mode, they probably use text-white and text-white/x.
  // We want to map text-white to text-foreground, or to text-black dark:text-white!
  // If they are dark mode, text-white is default text.
  
  // Let's just do a smart mapping for typical dark mode components to support our new system:
  // text-white -> text-foreground
  // text-white/X -> text-foreground/X
  replace(/text-white\/90/g, 'text-black/90 dark:text-white/90');
  replace(/text-white\/80/g, 'text-black/80 dark:text-white/80');
  replace(/text-white\/70/g, 'text-black/70 dark:text-white/70');
  replace(/text-white\/60/g, 'text-black/60 dark:text-white/60');
  replace(/text-white\/50/g, 'text-black/50 dark:text-white/50');
  replace(/text-white\/40/g, 'text-black/40 dark:text-white/40');
  replace(/text-white\/30/g, 'text-black/30 dark:text-white/30');
  replace(/text-white\/20/g, 'text-black/20 dark:text-white/20');
  replace(/text-white\/10/g, 'text-black/10 dark:text-white/10');
  replace(/text-white(?![\/\w])/g, 'text-black dark:text-white');

  // Backgrounds with opacity (if dark mode originally, bg-white/X was used)
  replace(/bg-white\/20/g, 'bg-black/20 dark:bg-white/20');
  replace(/bg-white\/10/g, 'bg-black/10 dark:bg-white/10');
  replace(/bg-white\/5(?!0)/g, 'bg-black/5 dark:bg-white/5');
  
  // Borders
  replace(/border-white\/30/g, 'border-black/30 dark:border-white/30');
  replace(/border-white\/20/g, 'border-black/20 dark:border-white/20');
  replace(/border-white\/15/g, 'border-black/15 dark:border-white/15');
  replace(/border-white\/10/g, 'border-black/10 dark:border-white/10');
  replace(/border-white\/5(?!0)/g, 'border-black/5 dark:border-white/5');
  replace(/border-white(?![\/\w])/g, 'border-black dark:border-white');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
