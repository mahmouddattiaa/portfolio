import fs from 'node:fs';
import sharp from 'sharp';
import {chromium} from './node_modules/playwright/index.mjs';
import {parseFigFile} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/fig/index.js';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
const master=JSON.parse(fs.readFileSync(root+'/documents/Kepler-Dev-Current-Site.fig.manifest.json'));
const standalone=[];
for(const entry of master.pages){
 const b=fs.readFileSync(root+'/documents/'+entry.slug+'.fig'),g=await parseFigFile(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));
 if(g.getPages().length!==1)throw new Error('Standalone page count: '+entry.slug);
 const page=g.getPages()[0],boards=g.getChildren(page.id).filter(n=>n.type==='FRAME'&&[1440,390].includes(n.width));
 if(boards.length!==2)throw new Error('Standalone board count: '+entry.slug);
 for(const board of boards)if(g.getChildren(board.id).length!==1)throw new Error('Detached board content: '+entry.slug+' '+board.name);
 let missing=0;function inspect(id){for(const n of g.getChildren(id)){for(const f of n.fills)if(f.imageHash&&!g.images.has(f.imageHash))missing++;inspect(n.id);}}inspect(page.id);
 if(missing)throw new Error('Missing embedded images: '+entry.slug+' '+missing);
 standalone.push({slug:entry.slug,pages:1,boards:2,embeddedImages:g.images.size});
}
const app=[];const qa=JSON.parse(fs.readFileSync(root+'/review/qa-report.json'));
for(const row of qa.rows){
 const a=await sharp(root+'/captures/'+row.slug+'-'+row.width+'/app-render.png').removeAlpha().raw().toBuffer({resolveWithObject:true});
 const b=await sharp(row.canvas).resize(a.info.width,a.info.height,{fit:'fill'}).removeAlpha().raw().toBuffer();let sum=0;
 for(let i=0;i<b.length;i++)sum+=Math.abs(a.data[i]-b[i]);
 const difference=Math.round(sum/b.length/255*10000)/100;
 app.push({slug:row.slug,width:row.width,differencePercent:difference});
 if(difference>4)throw new Error('Editor/headless rendering discrepancy: '+JSON.stringify(app.at(-1)));
}
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const viewer=[];
try{const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:3101',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('#page').options.length===14);
 for(const row of qa.rows){await page.selectOption('#page',row.slug);await page.selectOption('#width',String(row.width));await page.locator('#reference').evaluate(i=>i.decode());await page.locator('#canvas').evaluate(i=>i.decode());viewer.push({slug:row.slug,width:row.width,imagesLoaded:true});}
 await page.selectOption('#page','home');await page.selectOption('#width','1440');await page.click('#mode');await page.locator('#reference').evaluate(i=>i.decode());await page.locator('#canvas').evaluate(i=>i.decode());await page.screenshot({path:root+'/review/viewer-desktop.png',fullPage:false});
 await page.selectOption('#width','390');await page.locator('#reference').evaluate(i=>i.decode());await page.locator('#canvas').evaluate(i=>i.decode());await page.screenshot({path:root+'/review/viewer-mobile.png',fullPage:false});
 if(errors.length)throw new Error('Viewer errors: '+errors.join(';'));
}finally{await browser.close();}
fs.writeFileSync(root+'/review/final-checks.json',JSON.stringify({standalone,app,viewer},null,2));
console.log('Verified '+standalone.length+' standalone FIGs, '+app.length+' editor render comparisons and '+viewer.length+' viewer selections.');
