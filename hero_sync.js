const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/components/sections/Hero.tsx');
let c = fs.readFileSync(p, 'utf8');

// Fix badge text
c = c.replace(/text-\[#1d1d1f\] text-xs font-bold/g, 'text-[#1d1d1f] dark:text-white text-xs font-bold');

// Fix icons in cards
c = c.replace(/className="text-\[#1d1d1f\] sm:w-5 sm:h-5"/g, 'className="text-[#1d1d1f] dark:text-white sm:w-5 sm:h-5"');

// Fix labels in cards
c = c.replace(/text-\[#1d1d1f\] tracking-tight/g, 'text-[#1d1d1f] dark:text-white tracking-tight');

// Fix descriptions in cards
c = c.replace(/text-\[#3c3c43\] leading-tight/g, 'text-[#3c3c43] dark:text-white/70 leading-tight');

// Fix primary button
c = c.replace(/bg-\[#1d1d1f\] text-white hover:bg-black/g, 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200');

// Fix secondary button
c = c.replace(/text-\[#1d1d1f\] font-bold hover:bg-gray-50/g, 'text-[#1d1d1f] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/10');

fs.writeFileSync(p, c, 'utf8');
console.log('Fixed Hero');
