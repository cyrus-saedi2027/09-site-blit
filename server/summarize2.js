'use strict';
// The realistic runs, one line each (what the owner asked: is every seat sold, did anybody meet an error while seats were free, how long did the whole sale take)
const fs = require('fs'), path = require('path');
for (const f of process.argv.slice(2)) {
  const t = fs.readFileSync(f, 'utf8'), i = t.indexOf('\n{'); if (i < 0) { console.log(path.basename(f), 'no verdict'); continue; }
  const j = JSON.parse(t.slice(i)), P = j.people, R = j.room, S = j.server, L = j.latencyMs;
  console.log(`${path.basename(f, '.log').padEnd(18)} people ${String(j.users).padStart(6)} · seats ${String(R.seats).padStart(5)} sold ${String(R.sold).padStart(5)} (${R.sold === R.seats ? 'ALL' : 'NOT all'}) in ${String(j.seconds).padStart(3)} s(×4 → ${Math.round(j.seconds * 4 / 60)} min real) · seat taken-by-another ${String(R.conflicts).padStart(5)} → neighbour ${String(P.movedToNeighbour).padStart(5)} · refused while ≥20 free: ${R.refusedWhileFree || 0} · refused at the very end: ${P.clashes} · found-no-seat ${P.noSeatsFound} · told sold-out ${P.toldSoldOut} · errors ${j.errors + j.timeouts} · audit ${j.audit.ok ? 'ok' : 'PROBLEM'} · CPU peak ${S.cpuPeakPctOfOneCore}% RAM ${S.ramPeakMB} MB lag p99 ${S.loopLagP99Ms} ms · latency p99 join/status/seats/hold/pay ${['join', 'status', 'seats', 'hold', 'pay'].map((k) => L[k].p99).join('/')} ms · vanished ${R.vanished || 0} · max inside ${R.maxActive}`);
}
