'use strict';
/* The reference server: the waiting room + seat desk API of the shop (Node, no packages) and, for a test, the site's files.
   Env: PORT (8080) · CAP (most people inside the buying step, 500) · ADAPTIVE (1) · SEATS (3000) · MINCAP (8: the room never shrinks below this) · SHARE (0.35) · HOLD_S (600) · CLAIM_S (45) · STALE_S (40) · TIME_SCALE (1: 10 makes every time ten times shorter, for tests) · ROOT (the site's folder) */
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib'), crypto = require('crypto');
const { Room } = require('./queue-engine');
const E = process.env, SCALE = +E.TIME_SCALE || 1, PORT = +E.PORT || 8080, ROOT = path.resolve(E.ROOT || path.join(__dirname, '..', 'ui-reference', '01-hero', 'v9'));
const SECRET = E.SECRET ? Buffer.from(E.SECRET) : crypto.randomBytes(32);
const cfg = { capMax: +E.CAP || 500, adaptive: E.ADAPTIVE !== '0', nSeats: +E.SEATS || 3000, minCap: +E.MINCAP || 8, share: +E.SHARE || 0.35, holdMs: (+E.HOLD_S || 600) * 1000 / SCALE, claimMs: (+E.CLAIM_S || 45) * 1000 / SCALE, staleMs: (+E.STALE_S || 60) * 1000 / SCALE, insideStaleMs: (+E.INSIDE_STALE_S || 180) * 1000 / SCALE, lateMs: (+E.LATE_S || 1800) * 1000 / SCALE, payMs: (+E.PAY_S || 900) * 1000 / SCALE };
const rooms = new Map();
const room = (e, s, make) => { const k = `${e}|${s}`; let r = rooms.get(k); if (!r && make) rooms.set(k, r = new Room(cfg)); return r; };
// the ticket: «show.session.number.signature» (nothing is stored for it but 4 bytes in the room)
const sig = (m) => crypto.createHmac('sha256', SECRET).update(m).digest('base64url').slice(0, 16);
const mint = (e, s, t) => { const m = `${e}.${s}.${t}`; return `${m}.${sig(m)}`; };
const open = (tok) => {
  if (typeof tok !== 'string') return null; const p = tok.split('.'); if (p.length !== 4) return null;
  const m = `${p[0]}.${p[1]}.${p[2]}`, a = Buffer.from(sig(m)), b = Buffer.from(p[3]); if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const r = room(p[0], p[1], false); return r ? { r, t: +p[2] } : null;
};
// how long a waiting person should wait before asking again: far from the door, long; near, short (with a little jitter so nobody asks all together)
const poll = (ahead) => Math.round((ahead < 20 ? 1000 : ahead < 200 ? 2500 : ahead < 2000 ? 5000 : ahead < 20000 ? 9000 : 15000) / SCALE * (0.8 + Math.random() * 0.4));
const count = { total: 0 }, bump = (k) => { count.total++; count[k] = (count[k] || 0) + 1; };
// the loop's delay (the honest sign of an overloaded server)
const lag = new Uint32Array(2000); let lagLast = process.hrtime.bigint(), lagMax = 0;
const lagTimer = () => setInterval(() => { const n = process.hrtime.bigint(), d = Math.max(0, Number(n - lagLast) / 1e6 - 100); lagLast = n; lag[Math.min(1999, Math.round(d))]++; if (d > lagMax) lagMax = d; }, 100).unref();
const pct = (h, p) => { let tot = 0; for (const v of h) tot += v; let a = 0; for (let i = 0; i < h.length; i++) { a += h[i]; if (a >= tot * p) return i; } return 0; };
setInterval(() => { for (const r of rooms.values()) r.tick(); }, Math.max(100, 1000 / SCALE)).unref();

const json = (res, code, o) => { const b = JSON.stringify(o); res.writeHead(code, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(b), 'Cache-Control': 'no-store' }); res.end(b); };
const body = (req, cb) => { let d = ''; req.on('data', (c) => { d += c; if (d.length > 4096) req.destroy(); }); req.on('end', () => { try { cb(d ? JSON.parse(d) : {}); } catch (e) { cb(null); } }); };
const api = (req, res, p, q) => {
  const g = (k) => { const m = new RegExp(`[?&]${k}=([^&]*)`).exec(q); return m ? decodeURIComponent(m[1]) : ''; };
  if (p === '/api/q/join' && req.method === 'POST') {
    bump('join'); const e = g('e'), s = g('s'); if (!/^[\w-]{1,60}$/.test(e) || !/^[\w-]{1,60}$/.test(s)) return json(res, 400, { e: 'id' });
    const r = room(e, s, true); if (r.soldOut()) return json(res, 200, { s: 'soldout' });
    const t = r.join(), st = r.status(t); return json(res, 200, { t: mint(e, s, t), ...st, poll: poll(st.ahead || 0) });
  }
  if (p === '/api/q/status') { bump('status'); const k = open(g('t')); if (!k) return json(res, 400, { s: 'bad' }); const st = k.r.status(k.t); if (st.s === 'wait') st.poll = poll(st.ahead); return json(res, 200, st); }
  if (p === '/api/seats') { bump('seats'); const k = open(g('t')); if (!k) return json(res, 400, { s: 'bad' }); k.r.ping(k.t); res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Length': k.r.nSeats, 'Cache-Control': 'no-store' }); return res.end(Buffer.from(k.r.state.buffer, k.r.state.byteOffset, k.r.nSeats)); }
  if (p === '/api/hold' && req.method === 'POST') { bump('hold'); const k = open(g('t')); if (!k) return json(res, 400, { s: 'bad' }); return body(req, (b) => { if (!b) return json(res, 400, { e: 'json' }); const r = k.r.hold(k.t, b.seats, b.flex !== false); return json(res, r.ok ? 200 : r.e === 'taken' ? 409 : 403, r); }); }
  if (p === '/api/pay/start' && req.method === 'POST') { bump('paystart'); const k = open(g('t')); if (!k) return json(res, 400, { s: 'bad' }); const r = k.r.beginPay(k.t); return json(res, r.ok ? 200 : 403, r); }
  if (p === '/api/pay' && req.method === 'POST') { bump('pay'); const k = open(g('t')); if (!k) return json(res, 400, { s: 'bad' }); const r = k.r.pay(k.t); return json(res, r.ok ? 200 : 403, r); }
  if (p === '/api/leave' && req.method === 'POST') { bump('leave'); const k = open(g('t')); if (!k) return json(res, 400, { s: 'bad' }); k.r.finish(k.t); return json(res, 200, { ok: true }); }
  if (p === '/api/stats') { const r = room(g('e'), g('s'), false), c = process.cpuUsage(), m = process.memoryUsage(); return json(res, 200, { room: r ? r.stats() : null, rooms: rooms.size, proc: { rss: m.rss, heap: m.heapUsed, cpuUserMs: c.user / 1000, cpuSysMs: c.system / 1000, lagP50: pct(lag, 0.5), lagP99: pct(lag, 0.99), lagMax: Math.round(lagMax), conns: server.listenerCount ? undefined : undefined }, req: count, cfg }); }
  if (p === '/api/audit') { const r = room(g('e'), g('s'), false); return json(res, 200, r ? r.audit() : { ok: false, problems: ['no room'] }); }
  return json(res, 404, { e: 'no' });
};
// the site's files, for a test (a real shop puts nginx or a CDN in front of them)
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.md': 'text/plain; charset=utf-8' };
const files = new Map();
const serve = (req, res, p, base = ROOT) => {
  bump('static'); let f = path.join(base, p === '/' ? 'index.html' : decodeURIComponent(p)); if (!f.startsWith(base)) { res.writeHead(403); return res.end(); }
  let c = files.get(f);
  if (!c) { try { const raw = fs.readFileSync(f), ext = path.extname(f), text = /html|js|css|json|svg|md/.test(ext); c = { raw, gz: text ? zlib.gzipSync(raw, { level: 9 }) : null, br: text ? zlib.brotliCompressSync(raw) : null, type: MIME[ext] || 'application/octet-stream', etag: `"${crypto.createHash('md5').update(raw).digest('hex').slice(0, 16)}"`, immutable: /\.(webp|png|jpg)$/.test(ext) }; files.set(f, c); } catch (e) { res.writeHead(404); return res.end('no'); } }
  if (req.headers['if-none-match'] === c.etag) { res.writeHead(304); return res.end(); }
  const ae = req.headers['accept-encoding'] || '', enc = c.br && /\bbr\b/.test(ae) ? 'br' : c.gz && /gzip/.test(ae) ? 'gzip' : '', b = enc === 'br' ? c.br : enc === 'gzip' ? c.gz : c.raw;
  const h = { 'Content-Type': c.type, 'Content-Length': b.length, ETag: c.etag, 'Cache-Control': c.immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=300', Vary: 'Accept-Encoding' }; if (enc) h['Content-Encoding'] = enc;
  res.writeHead(200, h); res.end(b);
};
const server = http.createServer((req, res) => {
  const u = req.url, i = u.indexOf('?'), p = i < 0 ? u : u.slice(0, i), q = i < 0 ? '' : u.slice(i);
  if (p.startsWith('/api/')) return api(req, res, p, q);
  if (p === '/wait') return serve(req, res, '/wait.html', path.join(__dirname, 'public'));   // the tiny waiting page (about 2 KB on the wire): people in the line never download the big site
  return serve(req, res, p);
});
server.keepAliveTimeout = 15000; server.headersTimeout = 20000;
// compress the front page once before the first visitor (a real shop does it at build time or lets nginx do it)
try { serve({ headers: { 'accept-encoding': 'br, gzip' } }, { writeHead() {}, end() {} }, '/'); } catch (e) { /* no site folder: only the API */ }
server.listen(PORT, '0.0.0.0', () => { lagLast = process.hrtime.bigint(); lagTimer(); console.log(`reference server on :${PORT} · cap ${cfg.capMax}${cfg.adaptive ? ' (adaptive)' : ''} · ${cfg.nSeats} seats · time ×${SCALE}`); });
module.exports = { server, rooms };
