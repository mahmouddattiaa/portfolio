import { chromium } from './node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
const routes=['/','/work','/services','/mahmoud','/contact','/privacy','/ar','/work/hs-vpn','/work/glitre-loyalty-platform','/work/glitre-loyalty-platform/customer-app','/work/glitre-loyalty-platform/worker-app','/work/glitre-loyalty-platform/manager'];
const only=process.argv[2];
const state=process.argv[3];
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const records=[];
try{
for(const route of routes.filter(r=>!only||r===only)){
 for(const width of [1440,390]){
  const slug=(route==='/'?'home':route.slice(1).replaceAll('/','--'))+(state?'--state-'+state:'');
  const out=path.join(root,'captures',slug+'-'+width);
  fs.mkdirSync(out,{recursive:true});
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1,reducedMotion:'reduce',isMobile:width<768});
  const response=await page.goto('http://127.0.0.1:3100'+route,{waitUntil:'networkidle',timeout:90000});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(600);
  for(let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=650){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(90);}
  await page.waitForTimeout(800);
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(700);
  if(state==='navigation'&&width===390){await page.getByRole('button',{name:'Open navigation menu'}).click();await page.waitForTimeout(500);}
  if(state==='faq'){await page.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true)});await page.waitForTimeout(300);}
  await page.addStyleTag({content:'nextjs-portal{display:none!important} *,*::before,*::after{caret-color:transparent!important}'});
  await page.screenshot({path:out+'/reference.png',fullPage:true,animations:'disabled'});
  const data=await page.evaluate(()=>{
   let sequence=0;
   const rect=o=>({x:o.x+scrollX,y:o.y+scrollY,width:o.width,height:o.height});
   const relevantPseudo=(el,p)=>{const s=getComputedStyle(el,p);return s.display!=='none'&&s.content!=='none'&&s.content!=='normal'&&(s.backgroundImage!=='none'||s.backgroundColor!=='rgba(0, 0, 0, 0)'||parseFloat(s.borderTopWidth)>0)};
   const visible=el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();const closed=el.closest('details:not([open])');return !(closed&&el!==closed&&!closed.querySelector('summary')?.contains(el))&&!['SCRIPT','STYLE','LINK','META','NOSCRIPT','NEXTJS-PORTAL'].includes(el.tagName.toUpperCase())&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity)>0&&r.width>0&&r.height>0};
   const textLines=(node,style)=>{
    const text=node.textContent||'';
    if(!text.trim())return [];
    const range=document.createRange(),lines=[];
    for(let i=0;i<text.length;i++){
     range.setStart(node,i);range.setEnd(node,i+1);
     const r=range.getBoundingClientRect();if(!r.height)continue;
     let line=lines.find(l=>Math.abs(l.y-(r.y+scrollY))<2);
     if(!line){line={text:'',x:r.x+scrollX,y:r.y+scrollY,width:0,height:r.height,left:r.x,right:r.right};lines.push(line);}
     line.text+=text[i];line.left=Math.min(line.left,r.x);line.right=Math.max(line.right,r.right);line.x=line.left+scrollX;line.width=line.right-line.left;
    }
    return lines.map(l=>{let t=l.text.replace(/\s+/g,' ');if(style.textTransform==='uppercase')t=t.toUpperCase();if(style.textTransform==='lowercase')t=t.toLowerCase();return {...l,text:t};}).filter(l=>l.text.trim());
   };
   const walk=el=>{
    if(!visible(el))return null;
    const s=getComputedStyle(el),r=el.getBoundingClientRect(),id=String(++sequence);
    el.setAttribute('data-canvas-capture',id);
    const media=['IMG','SVG','VIDEO','CANVAS'].includes(el.tagName.toUpperCase())||(s.maskImage!=='none'&&!el.textContent.trim());
    const node={id,tag:el.tagName,name:(el.getAttribute('aria-label')||el.id||el.className?.baseVal||el.className||el.tagName).toString().slice(0,120),...rect(r),background:s.backgroundColor,backgroundImage:s.backgroundImage,color:s.color,opacity:Number(s.opacity),borderRadius:[s.borderTopLeftRadius,s.borderTopRightRadius,s.borderBottomRightRadius,s.borderBottomLeftRadius].map(parseFloat),borders:['Top','Right','Bottom','Left'].map(side=>({width:parseFloat(s['border'+side+'Width']),color:s['border'+side+'Color'],style:s['border'+side+'Style']})),shadow:s.boxShadow,clip:s.overflowX==='hidden'&&s.overflowY==='hidden',z:parseInt(s.zIndex)||0,position:s.position,media,needsBackground:!media&&(s.backgroundImage!=='none'||relevantPseudo(el,'::before')||relevantPseudo(el,'::after')),font:{family:s.fontFamily,size:parseFloat(s.fontSize),weight:parseInt(s.fontWeight)||400,lineHeight:parseFloat(s.lineHeight)||parseFloat(s.fontSize)*1.2,letterSpacing:parseFloat(s.letterSpacing)||0,italic:s.fontStyle==='italic',direction:s.direction,decoration:s.textDecorationLine},texts:[],children:[]};
    if(media)return node;
    node.needsBackground ||= s.boxShadow!=='none'||(parseFloat(s.borderTopLeftRadius)>0&&parseFloat(s.borderTopWidth)>0);
    node.hasAfter=relevantPseudo(el,'::after');
    node.backdrop=s.backdropFilter!=='none'&&node.name.includes('header-inner');
    if(['INPUT','TEXTAREA','SELECT'].includes(el.tagName)){
     const value=el.tagName==='SELECT'?el.selectedOptions[0]?.text:el.value||el.getAttribute('placeholder');
     if(value){const placeholder=!el.value&&el.hasAttribute('placeholder');node.texts.push({text:value,x:r.x+scrollX+parseFloat(s.paddingLeft)+parseFloat(s.borderLeftWidth),y:r.y+scrollY+(r.height-parseFloat(s.fontSize))/2,width:r.width-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight)-24,height:parseFloat(s.fontSize)*1.2});if(placeholder)node.color=getComputedStyle(el,'::placeholder').color;}
     if(el.type==='checkbox'){node.media=true;return node;}
     if(el.tagName==='SELECT')node.needsBackground=true;
    }
    for(const child of el.childNodes){
     if(child.nodeType===Node.TEXT_NODE)node.texts.push(...textLines(child,s));
     else if(child.nodeType===Node.ELEMENT_NODE){const n=walk(child);if(n)node.children.push(n);}
    }
    node.children.sort((a,b)=>a.z-b.z);
    return node;
   };
   const fontFaces=[];function inspectRules(rules){for(const rule of rules){if(rule.type===CSSRule.FONT_FACE_RULE)fontFaces.push({family:rule.style.getPropertyValue('font-family'),src:rule.style.getPropertyValue('src')});else if(rule.cssRules)inspectRules(rule.cssRules)}}for(const sheet of document.styleSheets)try{inspectRules(sheet.cssRules)}catch{}
   return {url:location.href,title:document.title,width:innerWidth,height:document.documentElement.scrollHeight,background:getComputedStyle(document.body).backgroundColor,tree:walk(document.body),links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h?.startsWith('/')),fontFaces,fonts:[...document.fonts].map(f=>({family:f.family,weight:f.weight,status:f.status})),states:[...document.querySelectorAll('button,summary,input,textarea,select')].filter(visible).map(e=>({tag:e.tagName,text:(e.innerText||e.getAttribute('aria-label')||e.getAttribute('placeholder')||'').slice(0,150),type:e.getAttribute('type')}))};
  });
  let mediaCount=0;
  const assetPage=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const walkAssets=async node=>{
   if(!node)return;
   if((node.media||node.needsBackground)&&node.width>0&&node.height>0&&node.width<10000&&node.height<16000){
    const el=page.locator('[data-canvas-capture="'+node.id+'"]');
    const filename='asset-'+node.id+'.png';
    try{
     const makeIsolated=async afterOnly=>el.evaluate((el,{backgroundOnly,afterOnly})=>{
      const css=s=>Array.from(s).map(k=>k+':'+s.getPropertyValue(k)+';').join('');
      const s=getComputedStyle(el),r=el.getBoundingClientRect();
      const clone=el.cloneNode(true);
      clone.id='isolated-asset';clone.removeAttribute('class');
      clone.style.cssText=css(s);
      if(el.tagName==='IMG'){clone.src=el.currentSrc;clone.removeAttribute('srcset');clone.removeAttribute('sizes');clone.loading='eager';}
      {
       const source=[el,...el.querySelectorAll('*')],dest=[clone,...clone.querySelectorAll('*')];
       source.forEach((e,i)=>{dest[i].style.cssText=css(getComputedStyle(e));if(backgroundOnly&&i>0)dest[i].style.setProperty('visibility','hidden','important');if(e.tagName==='IMG'){dest[i].src=e.currentSrc;dest[i].removeAttribute('srcset');dest[i].removeAttribute('sizes');dest[i].loading='eager';}});
      }
      if(el.tagName==='CANVAS'){const img=document.createElement('img');img.src=el.toDataURL();img.style.cssText=clone.style.cssText;return {html:img.outerHTML,css:'',padding:0,width:r.width,height:r.height};}
      if(el.tagName==='VIDEO'&&el.poster){const img=document.createElement('img');img.src=el.poster;clone.replaceChildren(img);img.style.cssText='width:100%;height:100%;object-fit:'+s.objectFit;}
      if(backgroundOnly){clone.style.setProperty('color','transparent','important');clone.style.setProperty('-webkit-text-fill-color','transparent','important');if(['INPUT','TEXTAREA'].includes(el.tagName)){clone.value='';clone.removeAttribute('placeholder');}}
      if(backgroundOnly&&el.tagName==='SELECT'){clone.replaceChildren(document.createElement('option'));clone.style.setProperty('color',s.color,'important');clone.style.removeProperty('-webkit-text-fill-color');}
      const blur=Number(s.filter.match(/blur\(([\d.]+)px\)/)?.[1]||0);
      const pseudoPadding=Math.max(0,...['::before','::after'].flatMap(p=>{const ps=getComputedStyle(el,p);return ['left','right','top','bottom'].map(k=>-(parseFloat(ps[k])||0));}));
      const padding=Math.ceil(Math.max(s.boxShadow==='none'?0:32,blur*3,pseudoPadding));
      Object.assign(clone.style,{position:'absolute',left:padding+'px',top:padding+'px',margin:'0',width:r.width+'px',height:r.height+'px',boxSizing:'border-box',transform:'none',translate:'none',rotate:'none',scale:'none',opacity:'1',visibility:'visible',animation:'none',transition:'none',zIndex:'auto'});
      clone.style.cssText+=';left:'+padding+'px!important;top:'+padding+'px!important;right:auto!important;bottom:auto!important;width:'+r.width+'px!important;height:'+r.height+'px!important;';
      if(afterOnly)clone.style.cssText+=';background:transparent!important;border-color:transparent!important;box-shadow:none!important;';
      let pseudo='';
      for(const p of ['::before','::after']){const ps=getComputedStyle(el,p);if(backgroundOnly&&((afterOnly&&p==='::before')||(!afterOnly&&p==='::after')))pseudo+='#isolated-asset'+p+'{display:none!important;}';else if(ps.content!=='none'&&ps.content!=='normal')pseudo+='#isolated-asset'+p+'{'+css(ps)+'-webkit-text-fill-color:initial;}';}
      return {html:clone.outerHTML,css:pseudo,padding,width:r.width,height:r.height};
     },{backgroundOnly:node.needsBackground,afterOnly});
     const isolated=await makeIsolated(false);
     await assetPage.setViewportSize({width:Math.ceil(isolated.width+isolated.padding*2),height:Math.ceil(isolated.height+isolated.padding*2)});
     await assetPage.setContent('<html><head><style>html,body{margin:0;background:transparent;}'+isolated.css+'</style></head><body>'+isolated.html+'</body></html>',{waitUntil:'networkidle'});
     await assetPage.screenshot({path:out+'/'+filename,omitBackground:true,animations:'disabled',timeout:15000});
     node.assetPadding=isolated.padding;
     node.asset=filename;mediaCount++;
     if(node.hasAfter){const after=await makeIsolated(true);await assetPage.setContent('<html><head><style>html,body{margin:0;background:transparent;}'+after.css+'</style></head><body>'+after.html+'</body></html>',{waitUntil:'networkidle'});node.afterAsset='asset-'+node.id+'-after.png';await assetPage.screenshot({path:out+'/'+node.afterAsset,omitBackground:true,animations:'disabled'});mediaCount++;}
     if(node.backdrop){
      // Glass needs the actual underlying scene. Hide only its foreground controls.
      await el.evaluate(e=>{e.__captureStyles=[e,...e.querySelectorAll('*')].map(n=>[n,n.getAttribute('style')]);for(const n of e.querySelectorAll('*'))n.style.setProperty('visibility','hidden','important');e.style.setProperty('color','transparent','important');});
      try{node.backdropAsset='asset-'+node.id+'-glass.png';await el.screenshot({path:out+'/'+node.backdropAsset,animations:'disabled'});mediaCount++;}
      finally{await el.evaluate(e=>{for(const [n,s] of e.__captureStyles){s===null?n.removeAttribute('style'):n.setAttribute('style',s);}delete e.__captureStyles;});}
     }
    }catch(error){node.assetError=error.message.slice(0,180);}
   }
   for(const child of node.children)await walkAssets(child);
  };
  await walkAssets(data.tree);
  await assetPage.close();
  fs.mkdirSync(root+'/fonts',{recursive:true});
  for(const face of data.fontFaces){const url=face.src.match(/url\(["']?([^\)"']+)/)?.[1];if(!url?.includes('.woff2'))continue;const absolute=new URL(url,page.url()).href,filename=path.basename(new URL(absolute).pathname);if(!fs.existsSync(root+'/fonts/'+filename)){const response=await page.request.get(absolute);if(response.ok())fs.writeFileSync(root+'/fonts/'+filename,await response.body());}}
  fs.writeFileSync(out+'/layout.json',JSON.stringify(data));
  const record={route,width,status:response?.status(),height:data.height,title:data.title,assets:mediaCount,out};
  records.push(record);
  console.log(JSON.stringify(record));
  await page.close();
 }
}
fs.writeFileSync(root+'/captures/manifest'+(only?'-'+(only==='/'?'home':only.replaceAll('/','--')):'')+(state?'--state-'+state:'')+'.json',JSON.stringify(records,null,2));
}finally{await browser.close();}
