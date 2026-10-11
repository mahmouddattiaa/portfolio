import {chromium} from './node_modules/playwright/index.mjs';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{const page=await browser.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});await page.goto('http://127.0.0.1:3100/ar',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');const doc=await cdp.send('DOM.getDocument');const rows=[];
 for(const selector of ['#arabic-hero-title','.atelier-hero-lead','.atelier-primary-action','#arabic-capabilities-heading','#arabic-approach-heading','.locale-trigger']){const node=await cdp.send('DOM.querySelector',{nodeId:doc.root.nodeId,selector});if(!node.nodeId){rows.push({selector,missing:true});continue;}const fonts=await cdp.send('CSS.getPlatformFontsForNode',{nodeId:node.nodeId});rows.push({selector,fonts:fonts.fonts});}
 fs.writeFileSync('/home/kepler/Desktop/portfolio-canvas-2026-10-04/review/browser-fonts.json',JSON.stringify(rows,null,2));console.log(JSON.stringify(rows));
}finally{await browser.close();}
