'use strict';
// THE SINGLE-SEAT RULE for the real shop (the site has the same text inside parts9/buy.js; this file is made from it by tools/af-orphan-sync.py: edit there, not here).
// Use it where a hold is asked for: build the runs of the hall's plan once (orphanRuns(plan): plan.secs[].seats with row/n/x/y or rid/ci), then for every hold request
//   const lonely = orphanCheck(plan, new Set(seatKeysOfTheRequest), cfg)   // cfg from orphanCfg(settings): mode 'block' | 'warn' | 'off', last = 3
// and in mode 'block' refuse a hold that leaves a lonely seat (unless the hall has `cfg.last` free seats or fewer). `plan.by` is a Map of key -> seat { key, st }.
/* orphan:begin ─ the single-seat rule. Pure (no page): the same text is server/orphan.js, made by tools/af-orphan-sync.py.
   A buyer's choice must not leave ONE free seat alone in its row (between his seats, a sold / held / not-for-sale seat, an aisle or the end of the row)
   because nobody can buy a single seat later. Only seats the choice has just made lonely count (a seat that was alone before is not his fault). */
// the runs: each list is the seats of one row that touch each other, in order. An aisle, a row label or the row's end cuts a run.
// Boxes, tables and areas sold by number have no rows: no run.
function orphanRuns(L) {
  const runs = [];
  for (const z of L.secs) {
    const k = z.sec.k;
    if (z.sec.sym || !z.seats.length) continue;
    if (k === 'grid') {   // a real plan: a run of seat cells of one row has an id (rid); the cell index (ci) orders it
      const by = new Map();
      for (const p of z.seats) { if (p.rid == null) continue; let g = by.get(p.rid); if (!g) by.set(p.rid, g = []); g.push(p); }
      for (const g of by.values()) { g.sort((a, b) => a.ci - b.ci); if (g.length > 1) runs.push(g); }
    } else if (k === 'fan' || k === 'rect') {   // a designed plan: a row is the seats with one `row`, in the order of `n`; a gap wider than one seat is an aisle
      const by = new Map();
      for (const p of z.seats) { let g = by.get(p.row); if (!g) by.set(p.row, g = []); g.push(p); }
      for (const g of by.values()) {
        g.sort((a, b) => a.n - b.n);
        const d = []; for (let i = 1; i < g.length; i++) d.push(Math.hypot(g[i].x - g[i - 1].x, g[i].y - g[i - 1].y));
        const pitch = d.length ? Math.min(...d) : 0; let cur = [g[0]];
        for (let i = 1; i < g.length; i++) { if (d[i - 1] > pitch * 1.5) { if (cur.length > 1) runs.push(cur); cur = []; } cur.push(g[i]); }
        if (cur.length > 1) runs.push(cur);
      }
    }
  }
  return runs;
}
// the seats that the choice `sel` (a Set of keys) leaves alone. Seat: { key, st: 'free' | 'sold' | 'held' | 'off' }
function orphanSeats(runs, sel) {
  const out = [], free = (p) => !!p && p.st === 'free' && !sel.has(p.key);
  for (const run of runs) {
    for (let i = 0; i < run.length; i++) {
      const p = run[i]; if (!free(p)) continue;
      const a = i > 0 ? run[i - 1] : null, b = i < run.length - 1 ? run[i + 1] : null;
      if (free(a) || free(b)) continue;   // a free neighbour: not alone (two together can still be sold)
      if ((a && sel.has(a.key)) || (b && sel.has(b.key))) out.push(p);   // alone, and a seat of his is next to it
    }
  }
  return out;
}
// how many seats of the whole hall are free (the rule is off when only the last few are left)
const orphanFree = (L) => { let n = 0; for (const p of L.by.values()) if (p.st === 'free') n++; return n; };
// the setting: mode off | warn | block (default), and «last»: with this many seats or fewer left in the whole hall the rule is off
function orphanCfg(raw) { const c = raw || {}; return { mode: ['off', 'warn', 'block'].includes(c.mode) ? c.mode : 'block', last: Number.isFinite(+c.last) && c.last !== '' && c.last != null ? Math.max(0, Math.min(50, Math.round(+c.last))) : 3 }; }
// the whole check for a plan and a choice: the lonely seats (an empty list when the rule is off or the hall is almost sold out)
function orphanCheck(L, sel, cfg) {
  if (!cfg || cfg.mode === 'off' || !sel.size) return [];
  if (orphanFree(L) <= cfg.last) return [];
  return orphanSeats(L.runs || (L.runs = orphanRuns(L)), sel);
}
/* orphan:end */
module.exports = { orphanRuns, orphanSeats, orphanFree, orphanCfg, orphanCheck };
