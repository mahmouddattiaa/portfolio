import {chromium} from './node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const dir='/home/kepler/Desktop/portfolio-canvas-2026-10-04/fonts';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();await page.goto('http://127.0.0.1:3100/contact',{waitUntil:'networkidle'});
 const faces=await page.evaluate(()=>{const out=[];function walk(rules,base){for(const r of rules){if(r.type===CSSRule.FONT_FACE_RULE){const raw=r.style.getPropertyValue('src').match(/url\(["']?([^\)"']+)/)?.[1];if(raw)out.push({family:r.style.getPropertyValue('font-family'),url:new URL(raw,base).href});}else if(r.cssRules)walk(r.cssRules,base)}}for(const sheet of document.styleSheets)try{walk(sheet.cssRules,sheet.href||location.href)}catch{}return out});
 for(const face of faces){const filename=path.basename(new URL(face.url).pathname);if(!filename.endsWith('.woff2'))continue;const response=await page.request.get(face.url);if(!response.ok())throw new Error('Font download '+response.status()+' '+face.url);fs.writeFileSync(dir+'/'+filename,await response.body());}
 fs.writeFileSync(dir+'/manifest.json',JSON.stringify(faces,null,2));console.log('Saved '+faces.length+' site font sources');
}finally{await browser.close()}
