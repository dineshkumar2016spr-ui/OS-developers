const http = require('http');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const types = {
  '.html': 'text/html',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p.endsWith('/')) p += '/index.html';
  const f = path.join(root, p.replace(/^\./, ''));
  if (!f.startsWith(root)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(f, (e, d) => {
    if (e) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    res.end(d);
  });
});

server.listen(4174, '127.0.0.1', () => {
  console.log('Preview PID: ' + process.pid);
  console.log('Preview: http://127.0.0.1:4174');
});

server.on('error', e => console.error(e));