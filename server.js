const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 5173;
const BASE_DIR = __dirname;
const COUNT_FILE = path.join(BASE_DIR, 'src', 'data', 'visitor_count.json');

const MIME_MAP = {
    '.html': 'text/html; charset=utf-8',
    '.htm': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function getLocalCount() {
    try {
        if (fs.existsSync(COUNT_FILE)) {
            const data = JSON.parse(fs.readFileSync(COUNT_FILE, 'utf8'));
            return data.count || 2845;
        }
    } catch (e) {
        console.error('Error reading count file:', e);
    }
    return 2845;
}

function setLocalCount(cnt) {
    try {
        fs.writeFileSync(COUNT_FILE, JSON.stringify({ count: cnt, updated: new Date().toISOString() }, null, 2));
    } catch (e) {
        console.error('Error saving count file:', e);
    }
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // API Endpoint: /api/visitor-count
    if (pathname === '/api/visitor-count') {
        const isHit = parsedUrl.searchParams.get('hit') === '1';
        let currentCount = getLocalCount();

        if (isHit) {
            currentCount++;
            setLocalCount(currentCount);
        }

        // Try hitting hits.sh if online to keep synchronized
        const fetchHits = https.get('https://hits.sh/11science.vercel.app.svg', (hitRes) => {
            let svg = '';
            hitRes.on('data', chunk => svg += chunk);
            hitRes.on('end', () => {
                const match = svg.match(/hits:\s*([\d,]+)/i);
                if (match && match[1]) {
                    const onlineCount = parseInt(match[1].replace(/,/g, ''), 10);
                    if (!isNaN(onlineCount) && onlineCount > 0) {
                        setLocalCount(onlineCount);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ count: onlineCount, status: 'ok', source: 'hits.sh' }));
                        return;
                    }
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ count: currentCount, status: 'ok', source: 'local' }));
            });
        });

        fetchHits.on('error', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ count: currentCount, status: 'ok', source: 'local' }));
        });

        fetchHits.setTimeout(2000, () => {
            fetchHits.abort();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ count: currentCount, status: 'ok', source: 'local' }));
        });

        return;
    }

    // Static file serving
    let filePath = pathname === '/' ? '/index.html' : pathname;
    let safePath = path.normalize(path.join(BASE_DIR, filePath));

    // Prevent directory traversal
    if (!safePath.startsWith(BASE_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(safePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }

        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_MAP[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(safePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`SERVER_RUNNING_ON_PORT_${PORT}`);
});
