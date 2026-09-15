import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4173;
const MIME = { '.html': 'text/html', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const file = path.join(ROOT, 'index.html');
      // splice only the slide content into the on-disk file: CSS/JS always
      // come from disk, so a stale browser tab can't clobber editor upgrades
      const posted = body.match(/<section[\s\S]*<\/section>/);
      const current = fs.readFileSync(file, 'utf8');
      if (!posted || !/<section[\s\S]*<\/section>/.test(current)) {
        res.writeHead(400).end('no sections found');
        return;
      }
      fs.copyFileSync(file, file + '.bak');
      fs.writeFileSync(file, current.replace(/<section[\s\S]*<\/section>/, posted[0]));
      res.writeHead(200).end('saved');
      console.log(`[${new Date().toLocaleTimeString()}] saved slides into index.html (${(posted[0].length / 1024).toFixed(0)} KB content)`);
    });
    return;
  }
  const rel = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(ROOT, rel === '/' ? 'index.html' : rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Deck editor running at ${url} — Save writes straight to index.html`);
  if (process.platform === 'win32') exec(`start ${url}`);
});
