const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const types = {
  '.html': 'text/html',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p.endsWith('/')) p += '/index.html';
  const f = path.join(root, p.replace(/^\//, ''));
  if (!f.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(f, (e, d) => {
    if (e) {
      res.writeHead(404).end('Not found: ' + p);
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    res.end(d);
  });
});

const PORT = 4173;
server.listen(PORT, '127.0.0.1', () => {
  console.log('Preview started on http://127.0.0.1:' + PORT);
});
server.on('error', e => console.error('Server error:', e));