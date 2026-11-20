'use strict';
/* ════════════════════════════════════════════════════════════════
   The waiting room and the seat desk of ONE session of ONE show (reference implementation; the real shop's server keeps the same rules).

   The line is a counter: every person who joins gets the next ticket number; nobody else is stored but «when did this ticket last show a sign
   of life» (4 bytes). The people inside the buying step are a small Map (at most `cap` of them); the people let in, in the order of the
   numbers, each with `holdMs` to choose and pay; a ticket that has not been seen for `staleMs` (the person left) is skipped, so a gone
   person never holds a place. The seats are a byte each (free, held, sold) and a choice of seats is all or nothing, so no seat is ever
   held or sold twice. When the hall is sold out everyone still waiting is told at once.
   `cap` shrinks as the seats run out (adaptive): the people inside may hold at most `share` of the free seats, or the hall would be
   «all held» by people who then fail to pay.
   ════════════════════════════════════════════════════════════════ */
class Room {
  constructor(o = {}) {
    Object.assign(this, { capMax: 500, adaptive: true, share: 0.35, avgSeats: 2.4, minCap: 8, holdMs: 600e3, claimMs: 45e3, staleMs: 40e3, nSeats: 1000, maxPerOrder: 8 }, o);
    this.t0 = Date.now(); this.next = 1; this.admitted = 0;
    this.seen = new Uint32Array(1 << 16);       // seconds (since t0, plus one) of the last sign of life of each ticket
    this.active = new Map();                    // ticket → { claimed, until }
    this.state = new Uint8Array(this.nSeats);   // 0 free · 1 held · 2 sold
    this.owner = new Int32Array(this.nSeats);   // the ticket that holds or owns the seat
    this.holds = new Map();                     // ticket → { seats }
    this.sold = 0; this.heldN = 0; this.orders = 0;
    this.st = { joined: 0, admitted: 0, skipped: 0, finished: 0, expired: 0, maxActive: 0, conflicts: 0, holds: 0, pays: 0 };
    this.rec = []; this.recI = 0;               // when people were let in (for the speed shown to the line)
  }
  cap() { return this.adaptive ? Math.max(this.minCap, Math.min(this.capMax, Math.floor(((this.nSeats - this.sold) * this.share) / this.avgSeats))) : this.capMax; }
  soldOut() { return this.sold >= this.nSeats; }
  secNow() { return Math.floor((Date.now() - this.t0) / 1000) + 1; }
  touch(t) { if (t >= this.seen.length) { const n = new Uint32Array(Math.max(this.seen.length * 2, t + 1)); n.set(this.seen); this.seen = n; } this.seen[t] = this.secNow(); }
  join() { const t = this.next++; this.st.joined++; this.touch(t); this.pump(); return t; }
  // let the next people in, in the order of their numbers, while there is room
  pump() {
    if (this.soldOut()) return;
    const cap = this.cap(), now = Date.now(), sec = this.secNow();
    while (this.active.size < cap && this.admitted < this.next - 1) {
      const t = ++this.admitted;
      if ((sec - this.seen[t]) * 1000 > this.staleMs) { this.st.skipped++; continue; }   // gone
      this.active.set(t, { claimed: false, until: now + this.claimMs });
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
    if (a) { if (!a.claimed) { a.claimed = true; a.until = Date.now() + this.holdMs; } return { s: 'in', left: a.until - Date.now(), cap: this.cap() }; }
    if (this.soldOut()) return { s: 'soldout' };
    if (t <= this.admitted) return { s: 'gone' };
    const ahead = t - this.admitted - 1;
    return { s: 'wait', ahead, eta: Math.round(ahead / this.rate()), total: this.next - 1 - this.admitted };
  }
  // all or nothing: the new choice replaces the old one of the same ticket
  hold(t, seats) {
    const a = this.active.get(t); if (!a || !a.claimed) return { ok: false, e: 'nopass' };
    if (!Array.isArray(seats) || !seats.length || seats.length > this.maxPerOrder) return { ok: false, e: 'count' };
    const u = [...new Set(seats)]; if (u.some((i) => !Number.isInteger(i) || i < 0 || i >= this.nSeats)) return { ok: false, e: 'seat' };
    this.release(t);
    const bad = u.filter((i) => this.state[i] !== 0);
    if (bad.length) { this.st.conflicts++; return { ok: false, e: 'taken', bad }; }
    for (const i of u) { this.state[i] = 1; this.owner[i] = t; }
    this.heldN += u.length; this.holds.set(t, { seats: u }); this.st.holds++;
    return { ok: true, left: a.until - Date.now() };
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
    for (const [t, a] of this.active) if (a.until < now) { this.active.delete(t); this.release(t); this.st.expired++; }
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
