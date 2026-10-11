import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
const run=(name,args,label)=>{
 const argumentFile=root+'/tools/review-call.json',resultFile=root+'/review/mcp-'+label+'.json';
 fs.writeFileSync(argumentFile,JSON.stringify({name,arguments:args}));
 const result=spawnSync(process.execPath,[root+'/tools/mcp.mjs','tools/call',argumentFile,resultFile],{encoding:'utf8',timeout:190000});
 if(result.status!==0)throw new Error(name+' failed: '+result.stderr.slice(0,200));
 const response=JSON.parse(fs.readFileSync(resultFile));
 if(response.isError)throw new Error(name+' failed: '+JSON.stringify(response.content).slice(0,400));
 const text=response.content.filter(c=>c.type==='text').map(c=>c.text).join('\n');
 try{return JSON.parse(text);}catch{return {text};}
};
const manifest=JSON.parse(fs.readFileSync(root+'/documents/Kepler-Dev-Current-Site.fig.manifest.json'));
const proofs=[];
const target=process.argv[2];
for(const entry of manifest.pages.filter(p=>!target||p.slug===target)){
 const snapshot=root+'/review/editor-input-'+entry.slug+'.fig';fs.copyFileSync(root+'/documents/'+entry.slug+'.fig',snapshot);
 const opened=run('open_file',{path:snapshot},entry.slug+'-opened');
 const documentId=opened.target.documentId;
 const pages=run('list_pages',{document_id:documentId},entry.slug+'-pages');
 const livePages=Array.isArray(pages)?pages:pages.pages;
 const page=livePages[0];
 const tree=run('get_page_tree',{depth:1,document_id:documentId,page_id:page.id},entry.slug+'-tree');
 const fonts=run('get_font_status',{document_id:documentId,page_id:page.id},entry.slug+'-fonts');
 if(!fonts.faithful)throw new Error('Font substitution: '+entry.slug);
 for(const frame of entry.frames){
  const liveFrame=tree.children.find(n=>n.type==='FRAME'&&n.w===frame.width);
  run('export_image',{document_id:documentId,page_id:page.id,ids:[liveFrame.id],path:root+'/captures/'+entry.slug+'-'+frame.width+'/app-render.png',maxEdge:4096,scale:1},entry.slug+'-'+frame.width+'-export');
  proofs.push({slug:entry.slug,pageId:page.id,frameId:liveFrame.id,width:frame.width,fontFaithful:fonts.faithful,exported:true});
  console.log('Editor checked '+entry.slug+' '+frame.width);
 }
 run('close_file',{document_id:documentId,unsaved:'save'},entry.slug+'-closed');
}
const opened=run('open_file',{path:root+'/documents/Kepler-Dev-Current-Site-Review.fig'},'opened');
const documentId=opened.target.documentId;
const pages=run('list_pages',{document_id:documentId},'pages');
const livePages=Array.isArray(pages)?pages:pages.pages;
run('switch_page',{document_id:documentId,page:livePages[0].id},'selected-home');
run('viewport_set',{document_id:documentId,page_id:livePages[0].id,x:995,y:700,zoom:.48},'viewport');
const previous=target&&fs.existsSync(root+'/review/editor-verification.json')?JSON.parse(fs.readFileSync(root+'/review/editor-verification.json')).proofs.filter(r=>r.slug!==target):[];
fs.writeFileSync(root+'/review/editor-verification.json',JSON.stringify({documentId,proofs:[...previous,...proofs]},null,2));
console.log('Verified '+proofs.length+' editor boards; master left open for Mahmoud.');
