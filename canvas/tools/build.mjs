import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {SceneGraph} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/scene-graph/dist/index.js';
import {exportFigFile,parseFigFile} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/fig/index.js';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
const target=process.argv[2];
const names={'home':'Home','work':'Work','services':'Services','mahmoud':'Founder','contact':'Contact','privacy':'Privacy','ar':'Arabic home','work--hs-vpn':'HS VPN case study','work--glitre-loyalty-platform':'Glitre case study','work--glitre-loyalty-platform--customer-app':'Glitre · Customer app','work--glitre-loyalty-platform--worker-app':'Glitre · Worker app','work--glitre-loyalty-platform--manager':'Glitre · Manager dashboard','home--state-navigation':'State · Mobile navigation','home--state-faq':'State · Expanded FAQ'};
const graph=new SceneGraph();graph.deleteNode(graph.getPages()[0].id);
const color=s=>{const n=s?.match(/[\d.]+/g)?.map(Number);return n?.length>=3?{r:n[0]/255,g:n[1]/255,b:n[2]/255,a:n[3]??1}:{r:0,g:0,b:0,a:0};};
const hex=s=>({r:parseInt(s.slice(1,3),16)/255,g:parseInt(s.slice(3,5),16)/255,b:parseInt(s.slice(5,7),16)/255,a:1});
const fill=c=>({type:'SOLID',color:{...c,a:1},opacity:c.a,visible:true});
const layerName=n=>({BODY:'Page content',MAIN:'Main content',HEADER:'Floating navigation',FOOTER:'Footer'})[n.tag]||(n.name.includes('header-inner')?'Navigation background and controls':n.tag.toLowerCase()+' · '+n.name);
const text=(parent,name,value,x,y,width,size=16,paint='#202826')=>graph.createNode('TEXT',parent,{name,text:value,x,y,width,height:size*1.7,fontFamily:'Inter',fontSize:size,fontWeight:400,fills:[fill(hex(paint))],textAutoResize:'HEIGHT'});
function imageFill(file){const data=fs.readFileSync(file),hash=crypto.createHash('sha1').update(data).digest('hex');graph.images.set(hash,new Uint8Array(data));return {type:'IMAGE',color:{r:1,g:1,b:1,a:1},opacity:1,visible:true,imageHash:hash,imageScaleMode:'FILL'};}
function draw(node,parent,parentX,parentY,directory){
 if((node.width<=1&&node.height<=1)||node.name.split(/\s+/).includes('sr-only'))return null;
 const fills=[];const bg=color(node.background);if(bg.a>0&&!node.asset)fills.push(fill(bg));
 if(node.asset&&!node.assetPadding)fills.push(imageFill(path.join(directory,node.asset)));
 const frame=graph.createNode('FRAME',parent,{name:layerName(node),x:node.x-parentX,y:node.y-parentY,width:Math.max(node.width,.1),height:Math.max(node.height,.1),fills,strokes:[],opacity:node.opacity,clipsContent:node.clip,cornerRadius:node.borderRadius[0]||0,independentCorners:!node.borderRadius.every(v=>v===node.borderRadius[0]),topLeftRadius:node.borderRadius[0]||0,topRightRadius:node.borderRadius[1]||0,bottomRightRadius:node.borderRadius[2]||0,bottomLeftRadius:node.borderRadius[3]||0,layoutMode:'NONE',expanded:false});
 if(node.assetPadding){const p=node.assetPadding;graph.createNode('FRAME',frame.id,{name:'Isolated decoration',x:-p,y:-p,width:node.width+2*p,height:node.height+2*p,fills:[imageFill(path.join(directory,node.asset))],strokes:[],clipsContent:false,expanded:false});}
 if(node.backdropAsset)graph.createNode('FRAME',frame.id,{name:'Glass backdrop · captured blur',x:0,y:0,width:node.width,height:node.height,fills:[imageFill(path.join(directory,node.backdropAsset))],strokes:[],clipsContent:false,expanded:false});
 if(!node.asset){
  for(const [i,border] of node.borders.entries())if(border.width>0&&border.style!=='none'&&color(border.color).a>0){
   const b=border.width;const rect=i===0?{x:0,y:0,width:node.width,height:b}:i===1?{x:node.width-b,y:0,width:b,height:node.height}:i===2?{x:0,y:node.height-b,width:node.width,height:b}:{x:0,y:0,width:b,height:node.height};
   graph.createNode('RECTANGLE',frame.id,{name:['Top','Right','Bottom','Left'][i]+' divider',...rect,fills:[fill(color(border.color))],strokes:[]});
  }
 }
 for(const line of node.texts){
  const rtl=node.font.direction==='rtl',extra=Math.max(24,node.font.size*.8);
  graph.createNode('TEXT',frame.id,{name:line.text.trim().slice(0,70),text:line.text,x:line.x-node.x-(rtl?extra:0),y:line.y-node.y,width:Math.max(line.width+extra,1),height:line.height,fontFamily:/[\u0600-\u06ff]/.test(line.text)?(node.font.family.includes('IBM')?'IBM Plex Sans Arabic':'Noto Sans Arabic'):node.font.family.split(',')[0].replaceAll('"','').trim(),fontSize:node.font.size,fontWeight:node.font.weight,fontVariations:[{axis:'wght',value:node.font.weight}],italic:node.font.italic,fills:[fill(color(node.color))],strokes:[],lineHeight:node.font.lineHeight,letterSpacing:node.font.letterSpacing,textDirection:rtl?'RTL':'LTR',textAlignHorizontal:'LEFT',textAlignVertical:'CENTER',textAutoResize:'NONE',textDecoration:node.font.decoration.includes('underline')?'UNDERLINE':node.font.decoration.includes('line-through')?'STRIKETHROUGH':'NONE'});
 }
 for(const child of node.children)draw(child,frame.id,node.x,node.y,directory);
 if(node.afterAsset){const p=node.assetPadding||0;graph.createNode('FRAME',frame.id,{name:'Foreground decoration',x:-p,y:-p,width:node.width+2*p,height:node.height+2*p,fills:[imageFill(path.join(directory,node.afterAsset))],strokes:[],clipsContent:false,expanded:false});}
 return frame;
}
const entries=[];
for(const [slug,title] of Object.entries(names)){
 if(target&&slug!==target)continue;
 if(!fs.existsSync(root+'/captures/'+slug+'-1440/layout.json')||!fs.existsSync(root+'/captures/'+slug+'-390/layout.json'))continue;
 const page=graph.addPage(String(Object.keys(names).indexOf(slug)+1).padStart(2,'0')+' · '+title);
 text(page.id,'Page title',title+' — current site',0,-140,1600,36,'#EEE7DE');
 text(page.id,'Desktop label','DESKTOP · 1440 PX',0,-60,1440,16,'#D4A47A');
 text(page.id,'Mobile label','MOBILE · 390 PX',1600,-60,600,16,'#D4A47A');
 const frames=[];
 for(const width of [1440,390]){
  const dir=root+'/captures/'+slug+'-'+width,data=JSON.parse(fs.readFileSync(dir+'/layout.json','utf8'));
  const frame=graph.createNode('FRAME',page.id,{name:title+' · '+(width===1440?'Desktop 1440':'Mobile 390'),x:width===1440?0:1600,y:0,width,height:data.height,fills:[fill(color(data.background))],strokes:[],clipsContent:true,layoutMode:'NONE',expanded:false});
  draw(data.tree,frame.id,0,0,dir);
  const descendants=id=>graph.getChildren(id).flatMap(n=>[n,...descendants(n.id)]);
  frames.push({id:frame.id,width,height:data.height,textLayers:descendants(frame.id).filter(n=>n.type==='TEXT').length});
 }
 const note=graph.createNode('FRAME',page.id,{name:'Review notes',x:2180,y:0,width:640,height:650,fills:[fill(hex('#EEE7DE'))],strokes:[],expanded:false});
 text(note.id,'Review heading','AS BUILT · READY FOR PERSONAL REVIEW',32,28,580,19,'#8F5327');
 const desktop=JSON.parse(fs.readFileSync(root+'/captures/'+slug+'-1440/layout.json','utf8'));
 text(note.id,'Route', 'Route: '+new URL(desktop.url).pathname+(slug.includes('--state-')?' · '+slug.split('--state-')[1]+' state':''),32,84,580,20);
 const controls=[...new Set(desktop.states.map(s=>s.text).filter(Boolean))];
 text(note.id,'Reference and behavior','Reference: local checkout, 4 October 2026.\n\nEditable text and grouped layout layers preserve the current rendered positions. Photos, icons and complex decorative backgrounds are embedded image assets.\n\nDesktop and mobile capture the current responsive layouts at 1440 px and 390 px. Scroll reveals are captured in their settled state. Live clocks are frozen at capture time.\n\nControls on this page: '+(controls.slice(0,12).join(' · ')||'standard navigation')+'.\n\nReview status: awaiting Mahmoud. Browser behavior remains implemented in the existing website.',32,135,576,16);
 entries.push({slug,title,pageId:page.id,frames});
 console.log('Built '+title+' with '+frames.length+' boards');
}
fs.mkdirSync(root+'/documents',{recursive:true});
const file=root+'/documents/'+(target?target:'Kepler-Dev-Current-Site')+'.fig';
const bytes=await exportFigFile(graph,undefined,undefined,undefined,false);
fs.writeFileSync(file,bytes);
const readBack=await parseFigFile(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
for(const [i,entry] of entries.entries()){const page=readBack.getPages()[i];entry.pageName=page.name;entry.pageId=page.source.id;for(const frame of entry.frames)frame.id=readBack.getChildren(page.id).find(n=>n.type==='FRAME'&&n.width===frame.width).source.id;}
fs.writeFileSync(file+'.manifest.json',JSON.stringify({file,created:'2026-10-04',pages:entries,nodeCount:graph.nodes.size,textLayerCount:[...graph.nodes.values()].filter(n=>n.type==='TEXT').length,imageCount:graph.images.size},null,2));
if(!target)for(const entry of entries){
 // Build each standalone from the source geometry. Pruning pages from a lazy
 // imported graph can detach a board's content during FIG reserialization.
 const result=spawnSync(process.execPath,[root+'/tools/build.mjs',entry.slug],{encoding:'utf8'});
 if(result.status!==0)throw new Error('Standalone build failed: '+entry.slug+' '+result.stderr);
}
console.log(JSON.stringify({file,bytes:bytes.length,pages:entries.length,nodes:graph.nodes.size,images:graph.images.size}));
