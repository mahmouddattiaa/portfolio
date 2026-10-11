import fs from 'node:fs';
import {parseFigFile} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/fig/index.js';
import {headlessRenderNodes} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/raster/index.js';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04',b=fs.readFileSync(root+'/documents/ar.fig');const g=await parseFigFile(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));
const page=g.getPages()[0],frame=g.getChildren(page.id).find(n=>n.type==='FRAME'&&n.width===390);
const descend=id=>g.getChildren(id).flatMap(n=>[n,...descend(n.id)]);
let i=0;for(const n of descend(frame.id).filter(n=>n.type==='TEXT'&&['فكر واضح.','نتعاون مع فرق','ابدأ الحديث معنا'].some(s=>n.text.includes(s)))){console.log(JSON.stringify(n,(k,v)=>['source','children','styleRuns'].includes(k)?undefined:v).slice(0,2000));const png=await headlessRenderNodes(g,page.id,[n.id],{scale:1,format:'PNG'});fs.writeFileSync(root+'/review/ar-debug-'+i+++'.png',png);}
