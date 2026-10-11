import {chromium} from './node_modules/playwright/index.mjs';
import fs from 'node:fs';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04/fonts/full';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{const context=await browser.newContext();await Promise.all(['manrope','inter','ibmplexsansarabic'].map(async family=>{const r=await context.request.get('https://raw.githubusercontent.com/google/fonts/main/ofl/'+family+'/OFL.txt');if(!r.ok())throw new Error('License download failed '+family);fs.writeFileSync(root+'/'+family+'-OFL.txt',await r.body());}));console.log('Saved 3 font licenses in '+root);}finally{await browser.close();}
