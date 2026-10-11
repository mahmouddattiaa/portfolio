import fs from 'node:fs';
import sharp from 'sharp';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
for(const name of fs.readdirSync(root+'/captures')){const file=root+'/captures/'+name+'/reference.png';if(!fs.existsSync(file))continue;const width=Number(name.split('-').at(-1)),b=fs.readFileSync(file),imageWidth=b.readUInt32BE(16);if(imageWidth>width){fs.writeFileSync(file.replace('reference.png','reference-overflow.png'),b);const cropped=await sharp(b).extract({left:0,top:0,width,height:b.readUInt32BE(20)}).png().toBuffer();fs.writeFileSync(file,cropped);console.log('Cropped horizontal overflow to viewport: '+name+' '+imageWidth+' → '+width);}}
