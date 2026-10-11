import fs from 'node:fs';
import sharp from 'sharp';
import {parseFigFile} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/fig/index.js';
import {headlessRenderNodes} from '/home/kepler/.local/lib/node_modules/@open-pencil/mcp/node_modules/@open-pencil/core/dist/io/formats/raster/index.js';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
const file=process.argv[2]||root+'/documents/Kepler-Dev-Current-Site.fig';
const buffer=fs.readFileSync(file);
const graph=await parseFigFile(buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength));
const manifest=JSON.parse(fs.readFileSync(file+'.manifest.json'));
fs.mkdirSync(root+'/review',{recursive:true});
const report=[];
const target=process.argv[3];
for(const entry of manifest.pages.filter(p=>!target||p.slug===target)){
 const page=graph.getPages().find(p=>p.name.endsWith(' · '+entry.title));
 for(const frameInfo of entry.frames){
  const frame=graph.getChildren(page.id).find(n=>n.type==='FRAME'&&n.width===frameInfo.width),dir=root+'/captures/'+entry.slug+'-'+frame.width;
  const data=JSON.parse(fs.readFileSync(dir+'/layout.json'));
  const expected=[];const assets=[];const expectedWeights=[];
  function inspect(n){if((n.width<=1&&n.height<=1)||n.name.split(/\s+/).includes('sr-only'))return;expected.push(...n.texts.map(l=>l.text));expectedWeights.push(...n.texts.map(l=>n.font.weight));if(n.assetError)assets.push(n.assetError);n.children.forEach(inspect);}
  inspect(data.tree);
  const descend=id=>graph.getChildren(id).flatMap(n=>[n,...descend(n.id)]);
  const actual=descend(frame.id).filter(n=>n.type==='TEXT').map(n=>n.text);
  const nativeWeights=descend(frame.id).filter(n=>n.type==='TEXT').map(n=>n.fontVariations.find(v=>v.axis==='wght')?.value??n.fontWeight);
  const sort=a=>a.slice().sort().join('\n');
  if(sort(expected)!==sort(actual))throw new Error('Text mismatch: '+entry.slug+' '+frame.width);
  const weightsExact=sort(expectedWeights)===sort(nativeWeights);
  if(!weightsExact)console.log('Font weights changed in FIG: '+entry.slug+' '+frame.width+' expected '+JSON.stringify([...new Set(expectedWeights)])+' actual '+JSON.stringify([...new Set(nativeWeights)]));
  if(assets.length)throw new Error('Asset errors: '+entry.slug+': '+assets.join(';'));
  const bytes=await headlessRenderNodes(graph,page.id,[frame.id],{scale:1,format:'PNG'});
  if(!bytes)throw new Error('No render: '+entry.slug);
  const output=dir+'/canvas.png';fs.writeFileSync(output,bytes);
  const reference=sharp(dir+'/reference.png'),rendered=sharp(bytes);
  const a=await reference.removeAlpha().raw().toBuffer({resolveWithObject:true});
  const b=await rendered.resize(a.info.width,a.info.height,{fit:'fill'}).removeAlpha().raw().toBuffer({resolveWithObject:true});
  let total=0,changed=0;const bands=[];
  for(let y=0;y<a.info.height;y+=900){let sum=0,count=0;for(let j=y*a.info.width*3;j<Math.min(a.data.length,(y+900)*a.info.width*3);j+=3){let d=0;for(let c=0;c<3;c++)d+=Math.abs(a.data[j+c]-b.data[j+c]);sum+=d;count+=3;if(d>90)changed++;}total+=sum;bands.push({y,errorPercent:Math.round(sum/count/255*10000)/100});}
  const errorPercent=Math.round(total/a.data.length/255*10000)/100;
  for(const y of [0,...bands.slice().sort((x,y)=>y.errorPercent-x.errorPercent).slice(0,2).map(x=>x.y)]){
   const height=Math.min(900,a.info.height-y);
   const left=await sharp(dir+'/reference.png').extract({left:0,top:y,width:a.info.width,height}).png().toBuffer();
   const right=await sharp(bytes).resize(a.info.width,a.info.height,{fit:'fill'}).extract({left:0,top:y,width:a.info.width,height}).png().toBuffer();
   await sharp({create:{width:a.info.width*2,height,channels:4,background:'#ddd'}}).composite([{input:left,left:0,top:0},{input:right,left:a.info.width,top:0}]).png().toFile(root+'/review/'+entry.slug+'-'+frame.width+'-y'+y+'.png');
  }
  const row={slug:entry.slug,title:entry.title,pageId:page.id,frameId:frame.id,width:frame.width,height:frame.height,textLayers:actual.length,textExact:true,weightsExact,assetErrors:assets.length,errorPercent,changedPixelPercent:Math.round(changed/(a.info.width*a.info.height)*10000)/100,worstBands:bands.sort((x,y)=>y.errorPercent-x.errorPercent).slice(0,3),reference:dir+'/reference.png',canvas:output};
  report.push(row);console.log(JSON.stringify({slug:row.slug,width:row.width,text:row.textLayers,errorPercent,worst:row.worstBands[0]}));
 }
}
const previous=target&&fs.existsSync(root+'/review/qa-report.json')?JSON.parse(fs.readFileSync(root+'/review/qa-report.json')).rows.filter(r=>r.slug!==target):[];
fs.writeFileSync(root+'/review/qa-report.json',JSON.stringify({date:'2026-10-04',file,rows:[...previous,...report]},null,2));
console.log('Verified '+report.length+' boards; report: '+root+'/review/qa-report.json');
