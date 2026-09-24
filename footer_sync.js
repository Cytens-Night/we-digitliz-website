const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/components/layout/Footer.tsx');
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/bg-\[#f5f5f7\]/g, 'bg-background transition-colors duration-1000');
c = c.replace(/text-\[#1d1d1f\]/g, 'text-[#1d1d1f] dark:text-white');
c = c.replace(/text-\[#3c3c43\]/g, 'text-[#3c3c43] dark:text-white/70');
c = c.replace(/hover:text-\[#1d1d1f\]/g, 'hover:text-[#1d1d1f] dark:hover:text-white');
c = c.replace(/bg-black\/5/g, 'bg-black/5 dark:bg-white/10');
c = c.replace(/border-black\/5(?!0)/g, 'border-black/5 dark:border-white/5');
c = c.replace(/border-black\/10/g, 'border-black/10 dark:border-white/10');
c = c.replace(/hover:bg-black hover:text-white/g, 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black');

fs.writeFileSync(p, c, 'utf8');
console.log('Fixed Footer');
