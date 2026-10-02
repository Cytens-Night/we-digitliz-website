import {readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const logo=await sharp(await readFile('public/logo-white.svg')).resize(224,96).png().toBuffer();
const photo=await sharp({create:{width:320,height:320,channels:3,background:'#090c12'}}).composite([{input:logo,gravity:'centre'}]).jpeg({quality:90}).toBuffer();
await writeFile('public/contact-logo.jpg',photo);
const escape=text=>text.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
const lines=[
 'BEGIN:VCARD','VERSION:3.0','N:wedigitlize;;;;','FN:wedigitlize',
 'NICKNAME:We Digitlize,Wedigitlize digital studio',
 'ORG:WEDIGITLIZE LTD','TITLE:Websites Apps Branding and Digital Experiences',
 'TEL;TYPE=WORK,VOICE,CELL:+447584296946',
 'EMAIL;TYPE=WORK,INTERNET:info@wedigitlize.com',
 'URL;TYPE=WORK:https://wedigitlize.com',
 'URL:https://wedigitlize.com/card',
 'X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/wedigitlize/',
 'CATEGORIES:Website design,Web development,Mobile apps,Branding,Digital business cards,E-commerce,Automation,SEO',
 'NOTE:'+escape('wedigitlize — Design. Build. Connect.\nWebsites, website design, web development, landing pages, e-commerce, online stores, mobile apps, iOS, Android, web apps, portals, SaaS, branding, brand identity, logos, digital business cards, CRM integrations, automation, SEO, search optimisation and website care.\nWebsite: https://wedigitlize.com\nDigital card: https://wedigitlize.com/card\nInstagram: https://www.instagram.com/wedigitlize/\nEmail: info@wedigitlize.com\nPhone: +44 7584 296946'),
 'PHOTO;ENCODING=b;TYPE=JPEG:'+photo.toString('base64'),
 'END:VCARD'
];
function fold(line){let out='',chunk='',size=0;for(const char of line){const bytes=Buffer.byteLength(char);if(size+bytes>75){out+=chunk+'\r\n';chunk=' ';size=1;}chunk+=char;size+=bytes;}return out+chunk;}
await writeFile('public/wedigitlize.vcf',lines.map(fold).join('\r\n')+'\r\n');
console.log('Generated branded contact with embedded JPEG, keywords and folded UTF-8 lines.');
