'use strict';
/* Reads the logs the scenarios wrote (the JSON verdict at the end of each) and prints one compact table.
   Usage: node summarize.js /tmp/lt/*.log */
const fs = require('fs'), path = require('path');
const rows = [];
for (const f of process.argv.slice(2)) {
  const t = fs.readFileSync(f, 'utf8'), i = t.indexOf('\n{'); if (i < 0) { rows.push({ name: path.basename(f, '.log'), err: 'no verdict' }); continue; }
  let j; try { j = JSON.parse(t.slice(i)); } catch (e) { rows.push({ name: path.basename(f, '.log'), err: 'bad json' }); continue; }
  const L = j.latencyMs, P = j.people, R = j.room, S = j.server;
  rows.push({
    name: path.basename(f, '.log'), users: j.users, cap: (j.adaptive ? '≤' : '=') + j.cap, seats: j.seats, sec: j.seconds,
    rps: `${j.reqPerSecAvg}/${j.reqPerSecPeak}`, err: j.errors + j.timeouts,
    cpu: S.cpuPeakPctOfOneCore + '%', ram: S.ramPeakMB + 'MB', lag: `${S.loopLagP99Ms}/${S.loopLagMaxMs}ms`, outMB: S.bytesOutMB,
    lat99: ['join', 'status', 'seats', 'hold', 'pay'].map((k) => L[k].p99).join('/'),
    sold: `${R.sold}/${R.seats}`, orders: P.boughtOrders, clash: P.clashes, noSeat: P.noSeatsFound, soldOutTold: P.toldSoldOut, payLate: P.payTooLate,
    maxInside: R.maxActive, waitAvg: P.avgWaitSec, waitMax: P.maxWaitSec, audit: j.audit && j.audit.ok ? 'ok' : 'PROBLEM ' + JSON.stringify((j.audit || {}).problems || []).slice(0, 80), done: j.finishedAll,
  });
}
console.table(rows);
