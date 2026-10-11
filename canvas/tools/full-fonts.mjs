import {chromium} from './node_modules/playwright/index.mjs';
import fs from 'node:fs';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04/fonts/full';fs.mkdirSync(root,{recursive:true});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const context=await browser.newContext();
 const files=[['Manrope-Variable.ttf','manrope/Manrope%5Bwght%5D.ttf'],['Inter-Variable.ttf','inter/Inter%5Bopsz%2Cwght%5D.ttf'],...['Regular','Medium','SemiBold','Bold'].map(s=>['IBMPlexSansArabic-'+s+'.ttf','ibmplexsansarabic/IBMPlexSansArabic-'+s+'.ttf'])];
 for(const [name,url] of files){const r=await context.request.get('https://raw.githubusercontent.com/google/fonts/main/ofl/'+url);if(!r.ok())throw new Error('Font download '+r.status());fs.writeFileSync(root+'/'+name,await r.body());}
 console.log('Saved '+files.length+' complete font files');
}finally{await browser.close()}
