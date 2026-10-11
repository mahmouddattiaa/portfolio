import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root='/home/kepler/Desktop/portfolio-canvas-2026-10-04';
http.createServer((req,res)=>{
 try{const relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(relative==='/'?'/review/index.html':relative));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}const ext=path.extname(file);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.json':'application/json','.png':'image/png','.fig':'application/octet-stream'})[ext]||'application/octet-stream');fs.createReadStream(file).on('error',()=>{res.writeHead(404);res.end('Not found');}).pipe(res);}catch{res.writeHead(400);res.end();}
}).listen(3101,'127.0.0.1',()=>console.log('Canvas review: http://127.0.0.1:3101'));
