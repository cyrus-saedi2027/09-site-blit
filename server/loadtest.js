'use strict';
/* The load test: starts the reference server, sends N virtual buyers at it (in several processes so the sender is not the limit),
   prints a line every few seconds and, at the end, the verdict: speed, delays, memory, the CPU of the server, and the checks that
   matter (no seat sold twice, never more people inside than allowed, nobody lost).
   Env: USERS (50000) RAMP (seconds the crowd takes to arrive, 10) CAP (500) SEATS (3000) ADAPTIVE (1) SCALE (1) MAXSEC (240) GENS (3) ABANDON (0.08) PAYFAIL (0.07) */
const { spawn, fork } = require('child_process'), http = require('http'), path = require('path');
const E = process.env, N = +E.USERS || 50000, GENS = +E.GENS || 3, MAXSEC = +E.MAXSEC || 240, PORT = 8100 + Math.floor(Math.random() * 800);
const cfg = { users: Math.floor(N / GENS), ramp: +E.RAMP || 10, scale: +E.SCALE || 1, abandon: E.ABANDON ? +E.ABANDON : 0.08, payFail: E.PAYFAIL ? +E.PAYFAIL : 0.07, e: 'big-show', s: 'night-1', host: '127.0.0.1', port: PORT, sockets: +E.SOCKETS || 300, maxSec: MAXSEC };
const srv = spawn('node', [path.join(__dirname, 'server.js')], { env: { ...E, PORT: String(PORT), CAP: E.CAP || '500', SEATS: E.SEATS || '3000', TIME_SCALE: String(cfg.scale), ADAPTIVE: E.ADAPTIVE === '0' ? '0' : '1' }, stdio: ['ignore', 'pipe', 'inherit'] });
const get = (p) => new Promise((ok) => http.get({ host: '127.0.0.1', port: PORT, path: p, agent: false }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => { try { ok(JSON.parse(d)); } catch (e) { ok(null); } }); }).on('error', () => ok(null)));
const pct = (h, p) => { let t = 0; for (const v of h) t += v; let a = 0; for (let i = 0; i < h.length; i++) { a += h[i]; if (a >= t * p) return i; } return 0; };
srv.stdout.once('data', async (d) => {
  console.log(String(d).trim()); console.log(`${GENS * cfg.users} virtual buyers arrive within ${cfg.ramp} s; cap ${E.CAP || 500}${E.ADAPTIVE === '0' ? ' fixed' : ' adaptive'}; ${E.SEATS || 3000} seats; time ×${cfg.scale}; up to ${MAXSEC} s\n`);
  const t0 = Date.now(), gens = [], res = [], last = []; let prev = { t: 0, reqs: 0, cpu: 0 }, peak = { rss: 0, lag99: 0, lagMax: 0, rps: 0, waiting: 0, inside: 0, cpu: 0 };
  for (let g = 0; g < GENS; g++) { const c = fork(path.join(__dirname, 'loadgen.js'), { env: { ...E, GEN: JSON.stringify({ ...cfg }) } }); gens.push(c); c.on('message', (m) => { if (m.k === 'tick') last[g] = m; else { res[g] = m; } }); }
  const lines = []; const sampler = setInterval(async () => {
    const st = await get(`/api/stats?e=${cfg.e}&s=${cfg.s}`); if (!st || !st.room) return; const now = (Date.now() - t0) / 1000, R = st.room, P = st.proc;
    const rps = (st.req.total - prev.reqs) / Math.max(0.5, now - prev.t), cpu = ((P.cpuUserMs + P.cpuSysMs) - prev.cpu) / 10 / Math.max(0.5, now - prev.t);   // % of one core
    prev = { t: now, reqs: st.req.total, cpu: P.cpuUserMs + P.cpuSysMs };
    if (now < 7) { console.log(`${String(Math.round(now)).padStart(4)} s · (starting)`); return; }
    peak.rss = Math.max(peak.rss, P.rss); peak.lag99 = Math.max(peak.lag99, P.lagP99); peak.lagMax = Math.max(peak.lagMax, P.lagMax); peak.rps = Math.max(peak.rps, rps); peak.waiting = Math.max(peak.waiting, R.waiting); peak.inside = Math.max(peak.inside, R.inside); peak.cpu = Math.max(peak.cpu, cpu);
    const l = `${String(Math.round(now)).padStart(4)} s · waiting ${String(R.waiting).padStart(6)} · inside ${String(R.inside).padStart(4)}/${String(R.cap).padStart(4)} · held ${String(R.held).padStart(4)} · sold ${String(R.sold).padStart(5)}/${R.seats} · ${String(Math.round(rps)).padStart(6)} req/s · server CPU ${String(Math.round(cpu)).padStart(3)}% · RAM ${Math.round(P.rss / 1e6)} MB · loop lag p99 ${P.lagP99} ms`; console.log(l);
    if (R.sold >= R.seats && !st.__soldAt) st.__soldAt = now;
  }, 5000);
  await new Promise((ok) => { let n = 0; gens.forEach((c) => c.on('exit', () => { if (++n === gens.length) ok(); })); });
  clearInterval(sampler);
  const st = await get(`/api/stats?e=${cfg.e}&s=${cfg.s}`), au = await get(`/api/audit?e=${cfg.e}&s=${cfg.s}`), el = (Date.now() - t0) / 1000;
  const sum = (k) => res.reduce((a, r) => a + (r ? r.c[k] : 0), 0), hist = (k) => { const h = new Uint32Array(6000); res.forEach((r) => { if (r) r.H[k].forEach((v, i) => { h[i] += v; }); }); return h; };
  const gcpu = res.reduce((a, r) => a + (r ? r.cpu : 0), 0) / 1000;
  const out = { seconds: Math.round(el), users: GENS * cfg.users, cap: +(E.CAP || 500), adaptive: E.ADAPTIVE !== '0', seats: +(E.SEATS || 3000), scale: cfg.scale,
    requests: sum('reqs'), reqPerSecAvg: Math.round(sum('reqs') / el), reqPerSecPeak: Math.round(peak.rps), errors: sum('errors'), timeouts: sum('timeouts'),
    latencyMs: Object.fromEntries(['join', 'status', 'seats', 'hold', 'pay'].map((k) => { const h = hist(k); return [k, { p50: pct(h, .5), p95: pct(h, .95), p99: pct(h, .99) }]; })),
    server: { cpuPeakPctOfOneCore: Math.round(peak.cpu), cpuSecondsTotal: Math.round((st.proc.cpuUserMs + st.proc.cpuSysMs) / 1000), ramPeakMB: Math.round(peak.rss / 1e6), loopLagP99Ms: peak.lag99, loopLagMaxMs: peak.lagMax, bytesOutMB: +(sum('bytes') / 1e6).toFixed(1) },
    senderCpuSeconds: Math.round(gcpu),
    people: { joined: sum('joined'), boughtOrders: sum('bought'), boughtSeats: sum('boughtSeats'), toldSoldOut: sum('soldoutTold'), leftWhileWaiting: sum('abandonedWaiting'), leftBeforePaying: sum('left'), clashes: sum('clash'), rejoin: sum('rejoin'), noSeatsFound: sum('noHold'), payTooLate: sum('payLate'), maxWaitSec: Math.round(Math.max(0, ...res.map((r) => (r ? r.c.maxWait : 0))) / 1000), avgWaitSec: Math.round(sum('waitSum') / Math.max(1, sum('waited')) / 1000) },
    room: st.room, audit: au, finishedAll: res.every((r) => r && r.finished) };
  console.log('\n' + JSON.stringify(out, null, 1)); srv.kill(); process.exit(0);
});
