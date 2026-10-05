// Локальный предпросмотр собранного сайта так же, как на GitHub Pages:
//   node tools/build.mjs && node tools/serve.mjs
// Откройте http://localhost:4173/Pelotrum/

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, dirname, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/content.mjs';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '_site');
const BASE = new URL(site.url).pathname;
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8'
};

async function find(path) {
  const file = join(OUT, normalize(path).replace(/^([/\\])+/, ''));
  if (!file.startsWith(OUT)) return null;
  try {
    const s = await stat(file);
    return s.isDirectory() ? find(join(path, 'index.html')) : file;
  } catch { return null; }
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!url.startsWith(BASE)) { res.writeHead(302, { Location: BASE }); return res.end(); }
  if (url + '/' === BASE) { res.writeHead(301, { Location: BASE }); return res.end(); }
  const file = await find(url.slice(BASE.length));
  const target = file || join(OUT, '404.html');
  res.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(target)] || 'application/octet-stream' });
  res.end(await readFile(target));
}).listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}`));
