#!/usr/bin/env node
/**
 * Clean OpenPencil MCP bridge for Kepler Dev Stage 3 (Role 2C).
 * Connects via stdio to /home/kepler/.local/bin/openpencil-mcp with
 * OPENPENCIL_MCP_ROOT=/home/kepler/Desktop/Kepler/Projects/portfolio.
 *
 * Usage:
 *   node op_mcp.mjs <tool_name> '<json_args>'
 *   node op_mcp.mjs <tool_name> --file /tmp/args.json
 *   node op_mcp.mjs --image-fill <node_id> <rel_public_path> [FILL|FIT] [doc_id] [page_id]
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = '/home/kepler/Desktop/Kepler/Projects/portfolio';
const MCP_BIN = '/home/kepler/.local/bin/openpencil-mcp';
const DISCOVERY = '/run/user/1000/openpencil/mcp.json';

function parseCli(argv) {
  if (argv[0] === '--image-fill') {
    const [, nodeId, imgRel, scaleMode = 'FIT', docId, pageId] = argv;
    if (!nodeId || !imgRel) {
      throw new Error('Usage: op_mcp.mjs --image-fill <node_id> <rel_or_abs_image_path> [FILL|FIT] [doc_id] [page_id]');
    }
    const imgPath = path.isAbsolute(imgRel) ? imgRel : path.join(REPO_ROOT, imgRel.replace(/^\/+/, ''));
    const b64 = fs.readFileSync(imgPath).toString('base64');
    const args = { id: nodeId, image_data: b64, scale_mode: scaleMode };
    if (docId) args.document_id = docId;
    if (pageId) args.page_id = pageId;
    return { tool: 'set_image_fill', args };
  }

  const tool = argv[0];
  if (!tool) throw new Error('Missing OpenPencil tool name');
  let raw = '{}';
  if (argv[1] === '--file') {
    raw = fs.readFileSync(argv[2], 'utf8');
  } else if (argv[1]) {
    raw = argv[1];
  }
  return { tool, args: JSON.parse(raw) };
}

async function main() {
  const { tool, args } = parseCli(process.argv.slice(2));
  const child = spawn(MCP_BIN, [], {
    env: {
      ...process.env,
      OPENPENCIL_MCP_ROOT: REPO_ROOT,
      OPENPENCIL_MCP_DISCOVERY_PATH: DISCOVERY,
    },
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  let buffer = '';
  let seq = 0;
  const pending = new Map();

  child.stdout.on('data', (chunk) => {
    buffer += chunk;
    let idx;
    while ((idx = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (pending.has(msg.id)) {
          const { resolve, reject } = pending.get(msg.id);
          pending.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      } catch {
        // Ignore non-JSON stderr/banner lines
      }
    }
  });

  let stderrBuf = '';
  child.stderr.on('data', (d) => { stderrBuf += d.toString(); });

  const send = (method, params) =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    });

  const timer = setTimeout(() => {
    console.error('OpenPencil MCP timeout after 120s');
    child.kill();
    process.exit(1);
  }, 120000);

  try {
    await send('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'kepler-op-bridge', version: '1.0' },
    });
    child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
    const result = await send('tools/call', { name: tool, arguments: args });
    console.log(JSON.stringify(result, null, 2));
    if (result?.isError) process.exitCode = 1;
  } catch (err) {
    console.error('MCP Error:', err.message);
    if (stderrBuf) console.error(stderrBuf);
    process.exitCode = 1;
  } finally {
    clearTimeout(timer);
    child.kill();
  }
}

main();
