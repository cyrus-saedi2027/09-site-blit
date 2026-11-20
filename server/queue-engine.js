'use strict';
/* ════════════════════════════════════════════════════════════════
   The waiting room and the seat desk of ONE session of ONE show (reference implementation; the real shop's server keeps the same rules).

   The line is a counter: every person who joins gets the next ticket number; nobody else is stored but «when did this ticket last show a sign
   of life» (4 bytes). The people inside the buying step are a small Map (at most `cap` of them); the people let in, in the order of the
   numbers, each with `holdMs` to choose and pay; a ticket that has not been seen for `staleMs` (the person left) is skipped, so a gone
   person never holds a place. The seats are a byte each (free, held, sold) and a choice of seats is all or nothing, so no seat is ever
   held or sold twice. When the hall is sold out everyone still waiting is told at once.
   The room is `cap` people at most. Adaptive: the people who are still LOOKING for seats may be at most `share` of the free (not sold, not held) seats
   divided by the seats a person takes, or they would fight over the same seats; people who already hold seats or are paying do not count.
   ════════════════════════════════════════════════════════════════ */
class Room {
  constructor(o = {}) {
    Object.assign(this, { capMax: 500, adaptive: true, share: 0.35, avgSeats: 2.4, minCap: 8, holdMs: 600e3, claimMs: 45e3, staleMs: 60e3, insideStaleMs: 180e3, lateMs: 30 * 60e3, payMs: 15 * 60e3, nSeats: 1000, maxPerOrder: 8 }, o);
    this.t0 = Date.now(); this.next = 1; this.admitted = 0;
    this.seen = new Uint32Array(1 << 16);       // seconds (since t0, plus one) of the last sign of life of each ticket
    this.active = new Map();                    // ticket → { claimed, until }
    this.state = new Uint8Array(this.nSeats);   // 0 free · 1 held · 2 sold
    this.owner = new Int32Array(this.nSeats);   // the ticket that holds or owns the seat
    this.holds = new Map();                     // ticket → { seats }
    this.sold = 0; this.heldN = 0; this.orders = 0;
    this.st = { joined: 0, admitted: 0, skipped: 0, finished: 0, expired: 0, maxActive: 0, conflicts: 0, holds: 0, pays: 0 };
    this.late = new Map();                      // tickets that were skipped (the page was asleep) → when; they keep their right to come back first, for lateMs
    this.prio = []; this.prioSet = new Set();   // the ones who came back, in the order they came: let in before anybody new
    this.rec = []; this.recI = 0;               // when people were let in (for the speed shown to the line)
  }
  cap() { return this.capMax; }   // the room: the most people in the buying step at once (looking for seats, holding seats, paying)
  // how many may be LOOKING for seats at the same time: not more than the free seats can serve (a person who holds seats or is at the bank's page does not count: he is not in anybody's way)
  avail() { return this.nSeats - this.sold - this.heldN; }
  seekCap() {
    if (!this.adaptive) return this.capMax;
    const av = this.avail(); if (av <= 0) return 0;
    return Math.max(Math.min(av, 6), Math.min(this.capMax, Math.floor((av * this.share) / this.avgSeats)));
  }
  seekers() { return this.active.size - this.holds.size; }
  soldOut() { return this.sold >= this.nSeats; }
  secNow() { return Math.floor((Date.now() - this.t0) / 1000) + 1; }
  touch(t) { if (t >= this.seen.length) { const n = new Uint32Array(Math.max(this.seen.length * 2, t + 1)); n.set(this.seen); this.seen = n; } this.seen[t] = this.secNow(); }
  join() { const t = this.next++; this.st.joined++; this.touch(t); this.pump(); return t; }
  // let the next people in, in the order of their numbers, while there is room
  pump() {
    if (this.soldOut()) return;
    const cap = this.cap(), now = Date.now(), sec = this.secNow();
    while (this.active.size < cap && this.seekers() < this.seekCap() && (this.prio.length || this.admitted < this.next - 1)) {
      if (this.prio.length) {   // someone whose page had been asleep and is back: first
        const b = this.prio.shift(); this.prioSet.delete(b); if (!this.late.has(b) || this.active.has(b)) continue;
        this.late.delete(b); this.active.set(b, { claimed: false, until: now + this.claimMs, seen: now }); this.st.admitted++; this.st.returned = (this.st.returned || 0) + 1; if (this.active.size > this.st.maxActive) this.st.maxActive = this.active.size; continue;
      }
      const t = ++this.admitted;
      if ((sec - this.seen[t]) * 1000 > this.staleMs) { this.st.skipped++; this.late.set(t, now); continue; }   // not asking for a minute: skipped, but he keeps the right to come back first
      this.active.set(t, { claimed: false, until: now + this.claimMs, seen: now });
      this.st.admitted++; if (this.active.size > this.st.maxActive) this.st.maxActive = this.active.size;
      this.rec.push(now);
    }
  }
  rate() {   // people let in per second, over the last minute
    const now = Date.now(); while (this.recI < this.rec.length && now - this.rec[this.recI] > 60e3) this.recI++;
    if (this.recI > 5000) { this.rec = this.rec.slice(this.recI); this.recI = 0; }
    const n = this.rec.length - this.recI; if (n < 5) return Math.max(0.2, this.cap() / (this.holdMs / 1000 * 0.5));
    return Math.max(0.2, n / Math.min(60, (now - this.rec[this.recI]) / 1000 + 1));
  }
  status(t) {
    if (!(t >= 1 && t < this.next)) return { s: 'bad' };
    this.touch(t);
    const a = this.active.get(t);
    const inRes = (x) => { x.seen = Date.now(); if (!x.claimed) { x.claimed = true; x.until = x.seen + this.holdMs; } return { s: 'in', left: x.until - Date.now(), cap: this.cap(), inside: this.active.size }; };
    if (a) return inRes(a);
    if (this.soldOut()) return { s: 'soldout' };
    if (this.late.has(t)) {   // the page was asleep and he was skipped: he is back, he goes in before the new ones
      if (!this.prioSet.has(t)) { this.prio.push(t); this.prioSet.add(t); this.pump(); const a2 = this.active.get(t); if (a2) return inRes(a2); }
      const ahead = Math.max(0, this.prio.indexOf(t));
      return { s: 'wait', ahead, eta: Math.round((ahead + 1) / this.rate()), total: this.next - 1 - this.admitted + this.prio.length, inside: this.active.size, cap: this.cap(), back: true };
    }
    if (t <= this.admitted) return { s: 'gone' };
    const ahead = t - this.admitted - 1;
    return { s: 'wait', ahead, eta: Math.round(ahead / this.rate()), total: this.next - 1 - this.admitted, inside: this.active.size, cap: this.cap() };
  }
  // all or nothing: the new choice replaces the old one of the same ticket
  // he pressed «pay» and goes to the bank: for payMs nothing is taken from him, whatever the page does (a phone that sleeps, a bank page that takes minutes)
  beginPay(t) { const a = this.active.get(t), h = this.holds.get(t); if (!a || !h) return { ok: false, e: 'nohold' }; a.paying = true; a.seen = Date.now(); a.until = a.seen + this.payMs; return { ok: true, left: this.payMs }; }
  // a sign of life of a person inside (the buying page asks for the map every second or two): one who closed the tab is let go after insideStaleMs, with his seats
  ping(t) { const a = this.active.get(t); if (a) a.seen = Date.now(); }
  // flex: a seat that was taken a moment ago is swapped for the nearest free one (the person is told, there is no error); only when there is nothing free is it refused.
  // (here «nearest» is the nearest index; the real shop must look for the nearest free seat OF THE SAME PRICE CLASS and ask the person when there is none)
  hold(t, seats, flex) {
    const a = this.active.get(t); if (!a || !a.claimed) return { ok: false, e: 'nopass' };
    if (!Array.isArray(seats) || !seats.length || seats.length > this.maxPerOrder) return { ok: false, e: 'count' };
    const u = [...new Set(seats)]; if (u.some((i) => !Number.isInteger(i) || i < 0 || i >= this.nSeats)) return { ok: false, e: 'seat' };
    this.release(t);
    a.seen = Date.now();
    const bad = u.filter((i) => this.state[i] !== 0); let moved = 0;
    if (bad.length) {
      this.st.conflicts++;
      if (!flex) return { ok: false, e: 'taken', bad };
      const take = new Set(u.filter((i) => this.state[i] === 0)), got = [...take];
      for (const i of bad) { let f = -1; for (let d = 1; d <= this.nSeats && f < 0; d++) for (const j of [i + d, i - d]) if (j >= 0 && j < this.nSeats && this.state[j] === 0 && !take.has(j)) { f = j; break; } if (f < 0) { if (this.nSeats - this.sold - this.heldN >= 20) this.st.refusedWhileFree = (this.st.refusedWhileFree || 0) + 1; return { ok: false, e: 'taken', bad }; } take.add(f); got.push(f); moved++; }
      u.length = 0; u.push(...got.sort((x, y) => x - y)); this.st.swapped = (this.st.swapped || 0) + moved;
    }
    for (const i of u) { this.state[i] = 1; this.owner[i] = t; }
    this.heldN += u.length; this.holds.set(t, { seats: u }); this.st.holds++;
    return { ok: true, left: a.until - Date.now(), seats: u, moved };
  }
  release(t) {
    const h = this.holds.get(t); if (!h) return;
    for (const i of h.seats) if (this.state[i] === 1 && this.owner[i] === t) { this.state[i] = 0; this.owner[i] = 0; this.heldN--; }
    this.holds.delete(t);
  }
  pay(t) {
    const a = this.active.get(t), h = this.holds.get(t);
    if (!a || !h) return { ok: false, e: 'nohold' }; if (a.until < Date.now()) return { ok: false, e: 'late' };
    for (const i of h.seats) this.state[i] = 2;
    this.sold += h.seats.length; this.heldN -= h.seats.length; this.holds.delete(t); this.st.pays++; this.orders++;
    this.finish(t); return { ok: true, n: h.seats.length, order: this.orders };
  }
  finish(t) { if (this.active.delete(t)) this.st.finished++; this.release(t); this.pump(); }
  tick() {   // places and holds that ran out of time go back
    const now = Date.now();
    for (const [t, a] of this.active) {
      const gone = !a.paying && a.claimed && now - a.seen > this.insideStaleMs, unclaimed = !a.claimed && a.until < now;
      if (a.until < now || gone) { this.active.delete(t); this.release(t); this.st.expired++; if (gone) this.st.vanished = (this.st.vanished || 0) + 1; if (gone || unclaimed) this.late.set(t, now); }
    }
    for (const [t, at] of this.late) if (now - at > this.lateMs) this.late.delete(t);
    this.pump();
  }
  audit() {
    const p = []; let sold = 0, held = 0;
    for (let i = 0; i < this.nSeats; i++) { if (this.state[i] === 2) { sold++; if (!this.owner[i]) p.push(`seat ${i} sold with no owner`); } else if (this.state[i] === 1) { held++; if (!this.holds.has(this.owner[i])) p.push(`seat ${i} held by a ticket with no hold`); } }
    if (sold !== this.sold) p.push(`sold ${this.sold} ≠ counted ${sold}`); if (held !== this.heldN) p.push(`held ${this.heldN} ≠ counted ${held}`);
    let hs = 0; for (const h of this.holds.values()) hs += h.seats.length; if (hs !== held) p.push(`holds cover ${hs} seats, ${held} are held`);
    if (this.st.maxActive > this.capMax) p.push(`more people inside (${this.st.maxActive}) than the most (${this.capMax})`);
    if (this.active.size > this.capMax) p.push('too many inside now');
    return { ok: !p.length, problems: p.slice(0, 8), sold, held };
  }
  stats() { return { next: this.next - 1, admitted: this.admitted, waiting: Math.max(0, this.next - 1 - this.admitted), inside: this.active.size, cap: this.cap(), capMax: this.capMax, sold: this.sold, held: this.heldN, free: this.nSeats - this.sold - this.heldN, seats: this.nSeats, orders: this.orders, ...this.st }; }
}
module.exports = { Room };
