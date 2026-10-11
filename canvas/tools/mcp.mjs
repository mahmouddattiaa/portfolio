import { spawn } from 'node:child_process';
import fs from 'node:fs';
const [method='tools/list', argumentFile, resultFile] = process.argv.slice(2);
const child=spawn('/home/kepler/.local/bin/openpencil-mcp',[],{env:{...process.env,OPENPENCIL_MCP_ROOT:'/home/kepler/Desktop/portfolio-canvas-2026-10-04',OPENPENCIL_MCP_DISCOVERY_PATH:'/run/user/1000/openpencil/mcp.json'},stdio:['pipe','pipe','pipe']});
let buffer='', sequence=0;
const pending=new Map();
child.stdout.on('data',data=>{
 buffer+=data;
 let index;
 while((index=buffer.indexOf('\n'))>=0){
  const line=buffer.slice(0,index);buffer=buffer.slice(index+1);
  try{const message=JSON.parse(line);if(pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result);}}catch{}
 }
});
const send=(method,params)=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');});
const timeout=setTimeout(()=>{console.error('MCP timeout');child.kill();process.exit(1);},180000);
try{
 await send('initialize',{protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'portfolio-canvas',version:'1.0'}});
 child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
 const args=argumentFile?JSON.parse(fs.readFileSync(argumentFile,'utf8')):{};
 const result=await send(method,args);
 if(resultFile){fs.writeFileSync(resultFile,JSON.stringify(result,null,2));console.log('Result saved: '+resultFile);}
 else console.log(JSON.stringify(result));
 if(result.isError)process.exitCode=1;
}catch(error){console.error(error.message);process.exitCode=1;}
finally{clearTimeout(timeout);child.kill();}
