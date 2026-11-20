'use strict';
/* One process of the load test: `users` virtual people, each a small state machine that does what a real buyer's browser would do:
   join the line → ask «am I in?» when the server says → look at the seats → choose 1–4 seats (the crowd likes the front: most picks are
   in the first third of the hall, to make seats clash) → pay (or leave). Times are divided by TIME_SCALE. Results go to the parent. */
const http = require('http');
const A = JSON.parse(process.env.GEN), S = A.scale, rnd = Math.random;
const E = process.env, LOOKMIN = E.LOOKMIN != null ? +E.LOOKMIN : 2, LOOKMAX = E.LOOKMAX != null ? +E.LOOKMAX : 8, FLEX = E.FLEX === '1', KEEPALIVE = E.KEEPALIVE === '1', VANISH = E.VANISH != null ? +E.VANISH : 0;   // (see the README of the load test: the realistic mode is LOOKMIN=0 LOOKMAX=2 FLEX=1 KEEPALIVE=1 VANISH=0.5)
const agent = new http.Agent({ keepAlive: true, maxSockets: A.sockets, keepAliveMsecs: 10000 });
const H = { join: new Uint32Array(6000), status: new Uint32Array(6000), seats: new Uint32Array(6000), hold: new Uint32Array(6000), pay: new Uint32Array(6000) };
const C = { users: 0, joined: 0, errors: 0, timeouts: 0, rejoin: 0, abandonedWaiting: 0, soldoutTold: 0, bought: 0, boughtSeats: 0, payLate: 0, noHold: 0, moved: 0, clash: 0, retries: 0, left: 0, reqs: 0, bytes: 0, maxWait: 0, waitSum: 0, waited: 0, fifoBad: 0 };
const sleep = (ms) => new Promise((r) => setTimeout(r, Math.max(0, ms)));
const req = (kind, method, path, body) => new Promise((res) => {
  const t0 = process.hrtime.bigint(); C.reqs++;
  const r = http.request({ agent, host: A.host, port: A.port, method, path, headers: body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {}, timeout: 15000 }, (rs) => {
    const ch = []; rs.on('data', (c) => ch.push(c)); rs.on('end', () => { const b = Buffer.concat(ch); C.bytes += b.length + 220; const ms = Number(process.hrtime.bigint() - t0) / 1e6; H[kind][Math.min(5999, Math.round(ms))]++; let j = null; if (kind !== 'seats') { try { j = JSON.parse(b.toString()); } catch (e) { /* not json */ } } res({ code: rs.statusCode, j, b }); });
  });
  r.on('timeout', () => { C.timeouts++; r.destroy(); }); r.on('error', () => { C.errors++; res({ code: 0, j: null }); });
  if (body) r.write(body); r.end();
});
const pickSeats = (map, n) => {   // the crowd's taste: two in three picks from the front third
  const N = map.length, out = new Set(), start = rnd() < 0.66 ? Math.floor(rnd() * N * 0.33) : Math.floor(rnd() * N);
  for (let k = 0; k < N && out.size < n; k++) { const i = (start + k) % N; if (map[i] === 0) out.add(i); }
  return [...out];
};
async function user(i) {
  C.users++; await sleep(rnd() * A.ramp * 1000);
  const quit = rnd() < A.abandon ? Date.now() + (4 + rnd() * 50) * 1000 / S : Infinity;
  let j = null, tries = 0; while (!j || !j.t) { const r = await req('join', 'POST', `/api/q/join?e=${A.e}&s=${A.s}`); j = r.j; if (j && j.s === 'soldout') { C.soldoutTold++; return; } if (!j || !j.t) { if (++tries > 6) return; await sleep(500); } }
  C.joined++; let tok = j.t, wait0 = Date.now(), st = j;
  for (;;) {
    if (st.s === 'in') break;
    if (st.s === 'soldout') { C.soldoutTold++; return; }
    if (st.s === 'gone') { C.rejoin++; const r = await req('join', 'POST', `/api/q/join?e=${A.e}&s=${A.s}`); if (!r.j || !r.j.t) return; tok = r.j.t; st = r.j; continue; }
    await sleep(st.poll || 3000);
    if (Date.now() > quit) { C.abandonedWaiting++; return; }
    const r = await req('status', 'GET', `/api/q/status?t=${tok}`); if (!r.j) continue; st = r.j;
  }
  const w = Date.now() - wait0; C.waited++; C.waitSum += w; if (w > C.maxWait) C.maxWait = w;
  await sleep((3 + rnd() * 7) * 1000 / S);
  let held = false;
  for (let a = 0; a < 5 && !held; a++) {
    const m = await req('seats', 'GET', `/api/seats?t=${tok}`); if (m.code !== 200) break;
    const map = new Uint8Array(m.b); await sleep((LOOKMIN + rnd() * (LOOKMAX - LOOKMIN)) * 1000 / S);   // the person looks at the map and decides: it is already old when they press (the real page refreshes the map every ~2 s)
    const want = pickSeats(map, 1 + Math.floor(rnd() * 4)); if (!want.length) { await sleep(2000 / S); continue; }
    const r = await req('hold', 'POST', `/api/hold?t=${tok}`, JSON.stringify({ seats: want, flex: FLEX }));
    if (r.code === 200) { held = (r.j && r.j.seats ? r.j.seats.length : want.length); C.moved += (r.j && r.j.moved) || 0; } else if (r.code === 409) { C.clash++; C.retries++; await sleep((0.8 + rnd()) * 1000 / S); } else break;
  }
  if (!held) { C.noHold++; await req('status', 'POST', `/api/leave?t=${tok}`); return; }
  const payAt = Date.now() + (15 + rnd() * 35) * 1000 / S, vanish = rnd() < A.payFail && rnd() < VANISH;
  while (Date.now() < payAt) { await sleep(Math.min(2000 / S, payAt - Date.now())); if (KEEPALIVE && !vanish && Date.now() < payAt) await req('seats', 'GET', `/api/seats?t=${tok}`); else if (vanish) { C.left++; return; } }   // (the page keeps asking for the map while the person pays; one who closes the tab just stops)
  if (rnd() < A.payFail) { C.left++; await req('status', 'POST', `/api/leave?t=${tok}`); return; }
  const p = await req('pay', 'POST', `/api/pay?t=${tok}`);
  if (p.code === 200) { C.bought++; C.boughtSeats += held; } else C.payLate++;
}
(async () => {
  const all = []; for (let i = 0; i < A.users; i++) all.push(user(i));
  const cpu0 = process.cpuUsage(); let done = false;
  Promise.all(all).then(() => { done = true; });
  const tick = setInterval(() => process.send({ k: 'tick', c: C, cpu: (process.cpuUsage(cpu0).user + process.cpuUsage(cpu0).system) / 1000 }), 2000);
  const t0 = Date.now(); while (!done && Date.now() - t0 < A.maxSec * 1000) await sleep(250);
  clearInterval(tick); process.send({ k: 'end', c: C, H: Object.fromEntries(Object.keys(H).map((k) => [k, Array.from(H[k])])), finished: done, cpu: (process.cpuUsage(cpu0).user + process.cpuUsage(cpu0).system) / 1000 }, () => process.exit(0));
})();
