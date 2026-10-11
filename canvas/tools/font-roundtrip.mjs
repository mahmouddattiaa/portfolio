import fs from 'node:fs';
import {parseFigFile} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/fig/index.js';
const b=fs.readFileSync('/home/kepler/Desktop/portfolio-canvas-2026-10-04/documents/home.fig');
const g=await parseFigFile(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength));
function walk(id){for(const n of g.getChildren(id)){if(n.type==='TEXT'&&n.fontFamily==='Manrope'&&n.fontWeight===500)console.log(JSON.stringify({text:n.text,fontWeight:n.fontWeight,fontVariations:n.fontVariations,source:n.source.fig.rawNodeFields.fontVariations,fontName:n.source.fig.rawNodeFields.fontName}));else if(n.type!=='TEXT')walk(n.id);}}
walk(g.getPages()[0].id);
