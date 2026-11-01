/* ==========================================================================
   Widget 03 · Revenue Analytics (monthly)
   Exchange-app Widget Lab · vanilla JS + GSAP 3.13 (global `gsap`)

   Units: the card is 700 × 431 u (the shot's card, rectified flat) inside a
   760 × 560 u stage that leaves room for the 3D tilt and the floor light.
   At rest the card keeps the shot's angle: rotateZ(-3.1°) rotateX(9.4°)
   rotateY(21.75°), worked out from the shot's vanishing points.

   Motion map
   · intro    the card swings in from depth, a light traces the border all the
              way round, the floor lights up, the header fades up, the total
              spins, the grid and axes come in, the line draws with a glowing
              head, the dots pop as it passes, the end marker blooms
   · face     pointer over the card: it turns to face you, follows the pointer
              a little, and the border brightens where the pointer is
   · scrub    pointer / touch / arrow keys pick a day: a glowing dot rides the
              curve, a guide drops to the axis, a glass tooltip follows with
              the day, value and change; the day's label lights
   · menus    "This Month" (zooms to the last 7 days and back), "Apr 2025"
              (another month: the curve morphs, numbers roll), "⋯" (compare
              with the previous month as a dashed ghost line, data points)
   · idle     a light runs round the border, a pulse runs along the line into
              the end marker, the marker breathes, the floor light breathes
   · live     today's revenue keeps ticking up
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab) { console.warn('[widget 03] lab.js is missing'); return; }

  /* ───────────────────────────── design constants ───────────────────────────── */
  const SW = 760, SH = 560;                 // stage
  const CW = 700, CH = 431, CX = 30, CY = 34; // card size and its place in the stage
  const RADIUS = 28;
  const X_FIRST = 103, X_LAST = 593, X_START = 58;   // first day, last day, left end of the line
  const Y_TOP = 180.5, PER_M = 133.33;               // $1.6M at y 180.5, 133.33 u per $1M
  const BASE_Y = 367;                                // chart baseline
  const yOf = v => Y_TOP + (1.6 - v) * PER_M;
  const REST = { z: -3.1, x: 9.4, y: 21.75 };        // the shot's angle
  const PERSP = 2140;                                // ≈ the shot's focal length, in card units

  // April 2025, traced from the shot ($M per day); day 0 is 31 March
  const APRIL = [0.403, 0.501, 0.576, 0.647, 0.692, 0.704, 0.683, 0.632, 0.583, 0.557, 0.560, 0.591, 0.662, 0.745,
    0.839, 0.944, 1.041, 1.131, 1.187, 1.195, 1.139, 1.041, 0.962, 0.944, 0.966, 1.056, 1.169, 1.304, 1.431, 1.529, 1.570];
  function synth(seed, n, start, end) {        // another month with the same feel
    let s = seed;
    const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const p = [rnd() * 6.28, rnd() * 6.28, rnd() * 6.28];
    const out = [];
    for (let d = 0; d <= n; d++) {
      const t = d / n;
      const v = start + (end - start) * (t * t * .55 + t * .45)
        + Math.sin(t * Math.PI * 2.1 + p[0]) * .16 + Math.sin(t * Math.PI * 4.3 + p[1]) * .07 + Math.sin(t * Math.PI * 7.7 + p[2]) * .025;
      out.push(Math.round(Math.min(1.58, Math.max(.26, v)) * 1000) / 1000);
    }
    return out;
  }
  const MONTHS = [
    { label: 'Jan 2025', short: 'Jan', days: 31, total: 1086420, prev: 1012300, vals: synth(11, 31, .36, 1.2) },
    { label: 'Feb 2025', short: 'Feb', days: 28, total: 1124760, prev: 1086420, vals: synth(23, 28, .42, 1.3) },
    { label: 'Mar 2025', short: 'Mar', days: 31, total: 1183400, prev: 1124760, vals: synth(37, 31, .38, 1.36) },
    { label: 'Apr 2025', short: 'Apr', days: 30, total: 1429550, prev: 1183400, vals: APRIL },
  ];
  const DEFAULT_MONTH = 3;
  const DOT_DAYS = [5, 10, 15, 20, 25];
  const Y_LABELS = [['$1.6M', 1.6], ['$1.2M', 1.2], ['$0.8M', 0.8], ['$0.4M', 0.4]];

  /* ───────────────────────────── helpers ───────────────────────────── */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const r2 = n => Math.round(n * 100) / 100;
  const mkSpring = (v, k, c) => ({ v, t: v, vel: 0, k, c });
  function stepSpring(s, dt) {
    const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
    for (let i = 0; i < n; i++) { s.vel += (-s.k * (s.v - s.t) - s.c * s.vel) * h; s.v += s.vel * h; }
  }
  const comma = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const pct = p => Math.abs(p).toFixed(1) + '%';

  /* monotone cubic through (x, y) knots (flat at peaks and troughs) */
  function tangents(xs, ys) {
    const n = xs.length, m = new Array(n).fill(0);
    for (let i = 1; i < n - 1; i++) {
      const h0 = xs[i] - xs[i - 1], h1 = xs[i + 1] - xs[i];
      const s0 = (ys[i] - ys[i - 1]) / h0, s1 = (ys[i + 1] - ys[i]) / h1;
      const p = (s0 * h1 + s1 * h0) / (h0 + h1);
      m[i] = (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), .5 * Math.abs(p)) || 0;
    }
    if (n > 1) { m[0] = (ys[1] - ys[0]) / (xs[1] - xs[0]) * .5; m[n - 1] = (ys[n - 1] - ys[n - 2]) / (xs[n - 1] - xs[n - 2]) * .6; }
    return m;
  }
  function buildCurve(xs, ys) {
    const m = tangents(xs, ys);
    let d = `M${r2(xs[0])},${r2(ys[0])}`;
    for (let i = 0; i < xs.length - 1; i++) {
      const dx = xs[i + 1] - xs[i];
      d += `C${r2(xs[i] + dx / 3)},${r2(ys[i] + m[i] * dx / 3)} ${r2(xs[i + 1] - dx / 3)},${r2(ys[i + 1] - m[i + 1] * dx / 3)} ${r2(xs[i + 1])},${r2(ys[i + 1])}`;
    }
    return { d, xs, ys, m };
  }
  function yAtCurve(c, x) {
    const xs = c.xs, n = xs.length;
    if (x <= xs[0]) return c.ys[0];
    if (x >= xs[n - 1]) return c.ys[n - 1];
    let i = 0;
    while (x > xs[i + 1]) i++;
    const dx = xs[i + 1] - xs[i], t = (x - xs[i]) / dx, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * c.ys[i] + (t3 - 2 * t2 + t) * dx * c.m[i] + (-2 * t3 + 3 * t2) * c.ys[i + 1] + (t3 - t2) * dx * c.m[i + 1];
  }

  /* ───────────────────────────── rolling digits ───────────────────────────── */
  const STRIP = Array.from({ length: 60 }, (_, i) => i % 10).join('\n');
  const RESTI = 20, PADX = .1;
  const isDigit = ch => ch >= '0' && ch <= '9';
  function measurer(el) {
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:pre;font-size:100px;line-height:1;pointer-events:none';
    // letter-spacing inherits as a fixed length, so rescale it to the probe's 100px
    const cs = getComputedStyle(el), ls = parseFloat(cs.letterSpacing) || 0, fs = parseFloat(cs.fontSize) || 1;
    probe.style.letterSpacing = (ls / fs * 100).toFixed(3) + 'px';
    el.appendChild(probe);
    const w = t => { probe.textContent = t; return probe.getBoundingClientRect().width / 100; };
    const adv = {}, kern = {};
    return { adv: ch => adv[ch] ?? (adv[ch] = w(ch)), kern: (a, b) => kern[a + b] ?? (kern[a + b] = w(a + b) - w(a) - w(b)) };
  }
  class Odo {
    constructor(el) { this.el = el; this.cells = []; this.text = ''; this.m = null; el.setAttribute('aria-hidden', 'true'); }
    metrics() { return this.m || (this.m = measurer(this.el)); }
    remeasure() { this.m = null; this.cells.forEach((c, i) => { c.w = this.widthFor(this.text, i); this.paint(c); }); }
    make(ch) {
      const el = document.createElement('span'); el.className = 'odo-c';
      const s = document.createElement('span'); s.className = 'odo-s'; el.appendChild(s);
      const c = { el, s, ch: null, idx: 0, w: 0, o: 1, kind: '' };
      this.kind(c, ch);
      return c;
    }
    kind(c, ch) {
      const k = isDigit(ch) ? 'd' : 'g';
      if (c.kind !== k) {
        gsap.killTweensOf(c.s); gsap.set(c.s, { clearProps: 'transform,opacity' }); c.s.style.transform = '';
        c.kind = k; c.s.textContent = k === 'd' ? STRIP : ch;
        c.el.classList.toggle('is-glyph', k === 'g');
        c.idx = k === 'd' ? RESTI + +ch : 0;
      } else if (k === 'g') c.s.textContent = ch;
      c.ch = ch;
    }
    paint(c) {
      c.el.style.width = Math.max(0, c.w + PADX * 2).toFixed(4) + 'em';
      c.el.style.opacity = c.o;
      if (c.kind === 'd') c.s.style.transform = `translate3d(0,${(-c.idx * 1.2).toFixed(4)}em,0)`;
    }
    widthFor(text, i) { const m = this.metrics(); return m.adv(text[i]) + (i + 1 < text.length ? m.kern(text[i], text[i + 1]) : 0); }
    set(text, o = {}) {
      if (text === this.text && !o.fromZero && !o.force) return;
      const dur = o.dur ?? .85, stagger = o.stagger ?? .04, instant = o.instant || Lab.reduced;
      const old = this.cells, n = text.length, diff = n - old.length;
      let cells;
      if (diff < 0) { old.slice(0, -diff).forEach(c => this.exit(c, instant)); cells = old.slice(-diff); }
      else {
        const fresh = [];
        for (let i = 0; i < diff; i++) fresh.push(this.make(text[i]));
        const first = old[0] ? old[0].el : null;
        fresh.forEach(c => { this.el.insertBefore(c.el, first); c.w = -PADX * 2; c.o = 0; c.isNew = true; });
        cells = fresh.concat(old);
      }
      cells.forEach((c, i) => {
        const ch = text[i];
        const delay = instant ? 0 : (o.order === 'ltr' ? i : (n - 1 - i)) * stagger;
        const w = this.widthFor(text, i);
        gsap.killTweensOf(c);
        if (instant) { this.kind(c, ch); c.w = w; c.o = 1; c.isNew = false; if (c.kind === 'd') c.idx = RESTI + +ch; this.paint(c); return; }
        const was = c.ch;
        if (isDigit(ch) && c.kind === 'd' && !c.isNew) {
          const d = +ch;
          let start = c.idx, target = RESTI + d;
          if (o.fromZero) { start = 0; target = RESTI + d + 10 * Math.min(3, o.spin ?? 2); }
          else {
            const dir = o.dir || (target >= start ? 1 : -1);
            if (dir > 0) { while (target <= start && target + 10 < 60) target += 10; }
            else { while (target >= start && target - 10 >= 0) target -= 10; }
            if (target === start && was !== ch) target += dir > 0 ? 10 : -10;
          }
          c.idx = start; c.ch = ch;
          gsap.to(c, { idx: target, w, o: 1, duration: dur, delay, ease: o.ease || 'expo.out',
            onUpdate: () => this.paint(c), onComplete: () => { c.idx = RESTI + d; this.paint(c); } });
        } else {
          const dir = o.dir || 1;
          if (was !== ch || c.isNew) {
            this.kind(c, ch);
            if (c.kind === 'd') {
              const d = +ch;
              c.idx = o.fromZero ? 0 : RESTI + d - 3 * dir;
              gsap.to(c, { idx: o.fromZero ? RESTI + d + 10 * Math.min(3, o.spin ?? 2) : RESTI + d, duration: dur, delay, ease: 'expo.out',
                onUpdate: () => this.paint(c), onComplete: () => { c.idx = RESTI + d; this.paint(c); } });
            } else gsap.fromTo(c.s, { yPercent: 70 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur * .7, delay, ease: 'expo.out' });
          }
          c.isNew = false;
          gsap.to(c, { w, o: 1, duration: dur * .8, delay, ease: 'expo.out', onUpdate: () => this.paint(c) });
        }
      });
      this.cells = cells; this.text = text;
    }
    exit(c, instant) {
      gsap.killTweensOf(c);
      if (instant) { c.el.remove(); return; }
      gsap.to(c, { w: -PADX * 2, o: 0, duration: .45, ease: 'expo.out', onUpdate: () => this.paint(c), onComplete: () => c.el.remove() });
    }
  }

  /* ───────────────────────────── markup ───────────────────────────── */
  const CHEV = '<svg class="w03-chev" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3 4.6 6 7.6 9 4.6"/></svg>';
  function roundRect(x, y, w, h, r) {
    return `M${x + r},${y}H${x + w - r}A${r},${r} 0 0 1 ${x + w},${y + r}V${y + h - r}A${r},${r} 0 0 1 ${x + w - r},${y + h}H${x + r}A${r},${r} 0 0 1 ${x},${y + h - r}V${y + r}A${r},${r} 0 0 1 ${x + r},${y}Z`;
  }
  function template(u) {
    const grid = Y_LABELS.map(([, v]) => `<line x1="${X_START}" x2="${X_LAST + 8}" y1="${r2(yOf(v))}" y2="${r2(yOf(v))}"/>`).join('');
    const ylab = Y_LABELS.map(([t, v]) => `<span style="top:calc(${r2(yOf(v))} * var(--u))">${t}</span>`).join('');
    const rim = roundRect(1, 1, CW - 2, CH - 2, RADIUS - 1);
    return `<div class="w03-stage">
  <div class="w03-floor" aria-hidden="true"><i></i></div>
  <div class="w03-intro">
    <div class="w03-tilt">
      <div class="w03-halo" aria-hidden="true"></div>
      <div class="w03-card">
        <div class="w03-gloss" aria-hidden="true"></div>
        <svg class="w03-chart" viewBox="0 0 ${CW} ${CH}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="${u}-fill" gradientUnits="userSpaceOnUse" x1="0" y1="${Y_TOP}" x2="0" y2="${BASE_Y}">
              <stop offset="0" stop-color="#6b4be3" stop-opacity=".92"/><stop offset=".42" stop-color="#3a2596" stop-opacity=".86"/>
              <stop offset=".78" stop-color="#1b1160" stop-opacity=".78"/><stop offset="1" stop-color="#0e0a36" stop-opacity=".55"/>
            </linearGradient>
            <linearGradient id="${u}-fade" gradientUnits="userSpaceOnUse" x1="${X_START}" y1="0" x2="${X_START + 120}" y2="0">
              <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff"/>
            </linearGradient>
            <mask id="${u}-m" maskUnits="userSpaceOnUse" x="0" y="0" width="${CW}" height="${CH}"><rect width="${CW}" height="${CH}" fill="url(#${u}-fade)"/></mask>
            <clipPath id="${u}-area"><path class="js-areaclip"/></clipPath>
            <clipPath id="${u}-view"><rect class="js-view" x="${X_START - 4}" y="0" width="${X_LAST - X_START + 12}" height="${CH}"/></clipPath>
            <filter id="${u}-b4" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="3.2"/></filter>
            <filter id="${u}-b10" x="-10%" y="-60%" width="120%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
            <linearGradient id="${u}-drop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ddff" stop-opacity=".85"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient>
            <linearGradient id="${u}-guide" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9caff" stop-opacity=".9"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient>
          </defs>
          <g class="w03-grid">${grid}<line class="w03-base" x1="${X_START - 6}" x2="${X_LAST + 8}" y1="${BASE_Y}" y2="${BASE_Y}"/></g>
          <g clip-path="url(#${u}-view)">
            <g mask="url(#${u}-m)">
              <path class="js-area" fill="url(#${u}-fill)"/>
              <g clip-path="url(#${u}-area)"><path class="js-hug" fill="none" stroke="#7c5cff" stroke-width="54" stroke-linejoin="round" opacity=".55" filter="url(#${u}-b10)"/></g>
              <path class="js-ghost w03-ghost" fill="none"/>
              <path class="js-glow2" fill="none" stroke="#8b5cf6" stroke-width="20" stroke-linecap="round" opacity=".55" filter="url(#${u}-b10)"/>
              <path class="js-glow1" fill="none" stroke="#c2adff" stroke-width="6.5" stroke-linecap="round" opacity=".8" filter="url(#${u}-b4)"/>
              <path class="js-line" fill="none" stroke="#ebe2ff" stroke-width="2.2" stroke-linecap="round"/>
              <path class="js-pulse" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0"/>
            </g>
            <rect class="js-drop" width="2" fill="url(#${u}-drop)"/>
            <g class="js-dots w03-dots"></g>
          </g>
          <line class="js-guide" x1="0" x2="0" y1="0" y2="${BASE_Y}" stroke="url(#${u}-guide)" stroke-width="1.6" opacity="0"/>
          <g class="js-end"><circle class="js-endhalo" r="7" fill="none" stroke="#c4b0ff" stroke-width="2" opacity="0"/><circle r="9" fill="#a78bfa" opacity=".35" filter="url(#${u}-b4)"/><circle r="6.4" fill="#0d0a2a" stroke="#e5dcff" stroke-width="2.2"/><circle r="3.4" fill="#fff"/></g>
          <g class="js-probe" opacity="0"><circle r="11" fill="#a78bfa" opacity=".4" filter="url(#${u}-b4)"/><circle r="5.2" fill="#fff" stroke="#b9a2ff" stroke-width="2.4"/></g>
        </svg>
        <div class="w03-head">
          <div class="w03-title">Revenue Analytics</div>
          <button class="w03-range js-range" type="button" aria-haspopup="menu" aria-expanded="false"><span class="js-range-t">This Month</span>${CHEV}</button>
          <div class="w03-total"><span class="w03-odo js-total"></span></div>
          <div class="w03-badge"><span class="w03-arrow js-arrow">↑</span><span class="w03-odo js-pct"></span><span class="w03-vs js-vs">vs last month</span></div>
          <button class="w03-pill js-month" type="button" aria-haspopup="menu" aria-expanded="false"><span class="js-month-t">Apr 2025</span>${CHEV}</button>
          <button class="w03-more js-more" type="button" aria-label="Chart options" aria-haspopup="menu" aria-expanded="false"><i></i><i></i><i></i></button>
        </div>
        <div class="w03-ylab" aria-hidden="true">${ylab}</div>
        <div class="w03-xlab js-xlab" aria-hidden="true"></div>
        <div class="w03-tip" aria-hidden="true"><div class="w03-tip-in"><span class="js-tip-d">15 Apr</span><b class="js-tip-v">$1.04M</b><em class="js-tip-c">+5.4%</em></div></div>
        <div class="w03-scrub" tabindex="0" role="slider" aria-label="Day"></div>
        <div class="w03-menu js-menu-range" role="menu" aria-label="Range">
          <button type="button" role="menuitemradio" aria-checked="true" data-range="month">This Month</button>
          <button type="button" role="menuitemradio" aria-checked="false" data-range="week">Last 7 Days</button>
        </div>
        <div class="w03-menu js-menu-month" role="menu" aria-label="Month">
          ${MONTHS.map((m, i) => `<button type="button" role="menuitemradio" aria-checked="${i === DEFAULT_MONTH}" data-month="${i}">${m.label}</button>`).join('')}
        </div>
        <div class="w03-menu js-menu-more" role="menu" aria-label="Chart options">
          <button type="button" role="menuitemcheckbox" aria-checked="false" data-opt="compare"><span class="js-cmp-t">Compare with Mar</span><i class="w03-switch"></i></button>
          <button type="button" role="menuitemcheckbox" aria-checked="true" data-opt="dots"><span>Data points</span><i class="w03-switch"></i></button>
        </div>
      </div>
      <svg class="w03-rim" viewBox="0 0 ${CW} ${CH}" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="${u}-rim" gradientUnits="userSpaceOnUse" x1="0" y1="${CH}" x2="${CW}" y2="0">
            <stop offset="0" stop-color="#d9ccff"/><stop offset=".3" stop-color="#9d83f5"/><stop offset=".62" stop-color="#6e5bc4" stop-opacity=".85"/><stop offset=".86" stop-color="#5a4aa8" stop-opacity=".7"/><stop offset="1" stop-color="#cfc2ff"/>
          </linearGradient>
          <radialGradient class="js-spot" id="${u}-spot" gradientUnits="userSpaceOnUse" cx="${CW / 2}" cy="${CH / 2}" r="190">
            <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
          </radialGradient>
          <filter id="${u}-rb" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter>
        </defs>
        <path class="js-rimglow" d="${rim}" fill="none" stroke="url(#${u}-rim)" stroke-width="9" opacity=".85" filter="url(#${u}-rb)"/>
        <path class="js-rimline" d="${rim}" fill="none" stroke="url(#${u}-rim)" stroke-width="2" pathLength="1000"/>
        <path class="js-rimspot" d="${rim}" fill="none" stroke="url(#${u}-spot)" stroke-width="2.4" opacity="0"/>
        <path class="js-comet" d="${rim}" fill="none" stroke="#f4efff" stroke-width="2.6" stroke-linecap="round" pathLength="1000" stroke-dasharray="70 930" opacity="0"/>
      </svg>
    </div>
  </div>
  <p class="w03-sr js-live" aria-live="polite"></p>
</div>`;
  }

  /* ───────────────────────────── the widget ───────────────────────────── */
  let counter = 0;

  function mount(host) {
    const u = `w03x${++counter}`;
    host.classList.add('w03');
    host.setAttribute('dir', 'ltr');
    host.setAttribute('lang', 'en');
    host.innerHTML = template(u);
    const $ = s => host.querySelector(s), $$ = s => Array.from(host.querySelectorAll(s));
    const el = {
      stage: $('.w03-stage'), floor: $('.w03-floor'), intro: $('.w03-intro'), tilt: $('.w03-tilt'), card: $('.w03-card'), halo: $('.w03-halo'), gloss: $('.w03-gloss'),
      area: $('.js-area'), areaClip: $('.js-areaclip'), hug: $('.js-hug'), ghost: $('.js-ghost'), glow1: $('.js-glow1'), glow2: $('.js-glow2'),
      line: $('.js-line'), pulse: $('.js-pulse'), drop: $('.js-drop'), dots: $('.js-dots'), guide: $('.js-guide'), end: $('.js-end'), endHalo: $('.js-endhalo'),
      probe: $('.js-probe'), view: $('.js-view'), gridLines: $$('.w03-grid line'),
      title: $('.w03-title'), range: $('.js-range'), rangeT: $('.js-range-t'), total: $('.w03-total'), badge: $('.w03-badge'), arrow: $('.js-arrow'), vs: $('.js-vs'),
      month: $('.js-month'), monthT: $('.js-month-t'), more: $('.js-more'), ylab: $$('.w03-ylab span'), xlab: $('.js-xlab'),
      tip: $('.w03-tip'), tipIn: $('.w03-tip-in'), tipD: $('.js-tip-d'), tipV: $('.js-tip-v'), tipC: $('.js-tip-c'), scrub: $('.w03-scrub'),
      menus: { range: $('.js-menu-range'), month: $('.js-menu-month'), more: $('.js-menu-more') }, cmpT: $('.js-cmp-t'),
      rimLine: $('.js-rimline'), rimGlow: $('.js-rimglow'), rimSpot: $('.js-rimspot'), spot: $('.js-spot'), comet: $('.js-comet'), live: $('.js-live'),
    };
    const odo = { total: new Odo($('.js-total')), pct: new Odo($('.js-pct')) };

    const S = {
      t: 0, unit: 1, running: false, idle: 1, draw: 1, dotsIn: 1, endIn: 1,
      month: DEFAULT_MONTH, range: 'month', compare: false, showDots: true, live: false, liveT: 0, extra: 0,
      pick: null, pressed: false, keyFocus: false, menu: null,
      ptr: { inside: false, mouse: false, nx: 0, ny: 0, x: -999, y: -999 },
      face: mkSpring(0, 90, 16), rz: mkSpring(0, 110, 17), rx: mkSpring(0, 110, 17), ry: mkSpring(0, 110, 17),
      probeX: mkSpring(X_LAST, 230, 24), tipX: mkSpring(X_LAST, 150, 19), tipRot: mkSpring(0, 210, 13), probeO: mkSpring(0, 160, 22), bump: mkSpring(0, 380, 14),
      comet: { next: 3.5, run: -1 }, pulse: { next: 2.2, run: -1 }, rest: 1,
    };
    // shown data: the window (days) and values are tweened, the path is rebuilt from them
    const V = { w0: 1, w1: 30, mix: 1 };
    let fromVals = MONTHS[DEFAULT_MONTH].vals.slice(), toVals = fromVals.slice();
    let curve = null, dirty = true, lineLen = 0;

    function curVals() { return toVals.map((v, i) => lerp(fromVals[i] ?? v, v, V.mix)); }
    function dayToX(d) { return X_FIRST + (d - V.w0) * (X_LAST - X_FIRST) / (V.w1 - V.w0); }
    function xToDay(x) { return V.w0 + (x - X_FIRST) * (V.w1 - V.w0) / (X_LAST - X_FIRST); }
    function rebuild() {
      const vals = curVals(), n = vals.length - 1;
      const lead = xToDay(X_START);
      const xs = [], ysArr = [];
      // a point at the left end (fades out): the day under it, or a little below day 0
      const at = d => { const i = Math.floor(d), f = d - i; return lerp(vals[clamp(i, 0, n)], vals[clamp(i + 1, 0, n)], f); };
      xs.push(X_START); ysArr.push(yOf(lead <= 0 ? Math.max(.24, vals[0] - .1) : at(lead)));
      for (let d = 0; d <= n; d++) {
        const x = dayToX(d);
        if (x <= X_START + .5) continue;
        xs.push(x); ysArr.push(yOf(vals[d]));
      }
      curve = buildCurve(xs, ysArr);
      const last = xs[xs.length - 1];
      el.line.setAttribute('d', curve.d); el.glow1.setAttribute('d', curve.d); el.glow2.setAttribute('d', curve.d); el.pulse.setAttribute('d', curve.d); el.hug.setAttribute('d', curve.d);
      const area = `${curve.d}L${r2(last)},${BASE_Y}L${X_START},${BASE_Y}Z`;
      el.area.setAttribute('d', area); el.areaClip.setAttribute('d', area);
      lineLen = el.line.getTotalLength();
      // end marker and its light down to the axis
      const ey = curve.ys[curve.ys.length - 1];
      el.end.setAttribute('transform', `translate(${r2(last)} ${r2(ey)}) scale(${r2(S.endIn * (1 + S.bump.v * .06))})`);
      el.drop.setAttribute('x', r2(last - 1)); el.drop.setAttribute('y', r2(ey + 6)); el.drop.setAttribute('height', r2(Math.max(0, BASE_Y - ey - 6)));
      // data points
      el.dots.replaceChildren(...DOT_DAYS.filter(d => d <= n).map(d => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const x = dayToX(d);
        c.setAttribute('cx', r2(x)); c.setAttribute('cy', r2(yAtCurve(curve, x))); c.setAttribute('r', '2.2');
        c.setAttribute('opacity', x < X_START + 8 ? 0 : (S.showDots ? 1 : 0) * clamp((S.draw * (X_LAST - X_START) + X_START - x) / 30, 0, 1));
        return c;
      }));
      dirty = false;
    }

    function ghostPath() {   // the previous month, in the current window
      const prev = MONTHS[(S.month + 3) % 4].vals, n = prev.length - 1;
      const xs = [], ysArr = [];
      for (let d = 0; d <= n; d++) {
        const dd = d * (MONTHS[S.month].days / MONTHS[(S.month + 3) % 4].days);   // stretch to this month's length
        const x = dayToX(dd);
        if (x < X_START - 20 || x > X_LAST + 2) continue;
        xs.push(x); ysArr.push(yOf(prev[d] * .86));
      }
      return xs.length > 1 ? buildCurve(xs, ysArr).d : '';
    }

    /* ── labels and numbers ── */
    function xLabels() {
      const m = MONTHS[S.month], n = m.days;
      const days = S.range === 'week' ? Array.from({ length: 7 }, (_, i) => n - 6 + i) : [1, 8, 15, 22, n];
      el.xlab.replaceChildren(...days.map((d, i) => {
        const s = document.createElement('span');
        s.textContent = `${d} ${m.short}`;
        s.dataset.day = d;
        s.style.left = `calc(${r2(dayToXFinal(d))} * var(--u))`;
        if (i === days.length - 1 && S.range === 'month') s.classList.add('is-last');
        return s;
      }));
    }
    function dayToXFinal(d) {   // the label place once the current window tween settles
      const m = MONTHS[S.month], w0 = S.range === 'week' ? m.days - 6 : 1, w1 = m.days;
      return X_FIRST + (d - w0) * (X_LAST - X_FIRST) / (w1 - w0);
    }
    function totals() {
      const m = MONTHS[S.month], vals = toVals, n = m.days;
      const sum = a => a.reduce((s, v) => s + v, 0);
      if (S.range === 'month') return { now: m.total + S.extra, prev: m.prev, vs: 'vs last month' };
      const all = sum(vals.slice(1)), last7 = sum(vals.slice(n - 6)), prev7 = sum(vals.slice(n - 13, n - 6));
      return { now: Math.round(m.total * last7 / all) + S.extra, prev: Math.round(m.total * prev7 / all), vs: 'vs previous 7 days' };
    }
    function syncNumbers(o = {}) {
      const t = totals(), change = (t.now / t.prev - 1) * 100, up = change >= 0;
      odo.total.set('$' + comma(t.now), { dir: o.dir || 1, dur: o.dur ?? .9, stagger: .035, instant: o.instant });
      odo.pct.set(pct(change), { dir: up ? 1 : -1, dur: .8, instant: o.instant });
      el.arrow.textContent = up ? '↑' : '↓';
      host.classList.toggle('is-down', !up);
      if (el.vs.textContent !== t.vs) el.vs.textContent = t.vs;
      el.monthT.textContent = MONTHS[S.month].label;
      el.rangeT.textContent = S.range === 'week' ? 'Last 7 Days' : 'This Month';
      el.cmpT.textContent = `Compare with ${MONTHS[(S.month + 3) % 4].short}`;
      el.live.textContent = `${S.range === 'week' ? 'Last 7 days' : MONTHS[S.month].label}: $${comma(t.now)}, ${up ? 'up' : 'down'} ${pct(change)} ${t.vs}.`;
    }

    /* ── data changes ── */
    function setWindow(o = {}) {
      const n = MONTHS[S.month].days;
      const w0 = S.range === 'week' ? n - 6 : 1, w1 = n;
      gsap.killTweensOf(V, 'w0,w1');
      if (Lab.reduced || o.instant) { V.w0 = w0; V.w1 = w1; dirty = true; }
      else gsap.to(V, { w0, w1, duration: o.dur ?? 1.1, ease: 'expo.inOut', onUpdate: () => { dirty = true; } });
    }
    function switchMonth(i) {
      if (i === S.month) return;
      const prevTotal = totals().now;
      fromVals = curVals();
      const next = MONTHS[i].vals.slice();
      while (fromVals.length < next.length) fromVals.push(fromVals[fromVals.length - 1]);
      fromVals.length = next.length;
      toVals = next; S.month = i; S.extra = 0; setPick(null);
      V.mix = 0;
      gsap.killTweensOf(V, 'mix');
      if (Lab.reduced) V.mix = 1;
      else gsap.to(V, { mix: 1, duration: 1.2, ease: 'elastic.out(1, .7)', onUpdate: () => { dirty = true; } });
      setWindow();
      xLabels(); fadeXLabels();
      syncNumbers({ dir: Math.sign(totals().now - prevTotal) || 1 });
      if (S.compare) drawGhost(true);
      dirty = true;
      el.menus.month.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.month === i)));
      if (!Lab.reduced) gsap.fromTo(el.monthT, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out' });
    }
    function switchRange(r) {
      if (r === S.range) return;
      const prevTotal = totals().now;
      S.range = r; setPick(null);
      setWindow({ dur: 1.15 });
      xLabels(); fadeXLabels();
      syncNumbers({ dir: Math.sign(totals().now - prevTotal) || 1 });
      if (S.compare) drawGhost(true);
      el.menus.range.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.range === r)));
      if (!Lab.reduced) gsap.fromTo(el.rangeT, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out' });
    }
    function fadeXLabels() {
      if (Lab.reduced) return;
      gsap.fromTo(el.xlab.children, { opacity: 0, y: 6 * S.unit }, { opacity: 1, y: 0, duration: .6, ease: 'expo.out', stagger: .04, delay: .25 });
    }
    function drawGhost(on) {
      el.ghost.setAttribute('d', ghostPath());
      const L = el.ghost.getTotalLength ? el.ghost.getTotalLength() : 0;
      gsap.killTweensOf(el.ghost);
      if (Lab.reduced) { el.ghost.style.opacity = on ? 1 : 0; return; }
      if (on) gsap.fromTo(el.ghost, { strokeDashoffset: 0, opacity: 0, attr: { 'stroke-dasharray': `0 ${L + 10}` } }, { opacity: 1, attr: { 'stroke-dasharray': `${L} 0` }, duration: 1.1, ease: 'power2.out', onComplete: () => el.ghost.setAttribute('stroke-dasharray', '5 5') });
      else gsap.to(el.ghost, { opacity: 0, duration: .35, ease: 'power1.in' });
    }
    function toggleCompare() {
      S.compare = !S.compare;
      el.menus.more.querySelector('[data-opt="compare"]').setAttribute('aria-checked', String(S.compare));
      drawGhost(S.compare);
    }
    function toggleDots() {
      S.showDots = !S.showDots;
      el.menus.more.querySelector('[data-opt="dots"]').setAttribute('aria-checked', String(S.showDots));
      dirty = true;
    }

    /* ── menus ── */
    const triggers = { range: el.range, month: el.month, more: el.more };
    function openMenu(name) {
      if (S.menu === name) { closeMenu(true); return; }
      if (S.menu) closeMenu(false);
      S.menu = name; setPick(null);
      host.classList.add('is-menu');
      const m = el.menus[name], items = m.querySelectorAll('button');
      triggers[name].setAttribute('aria-expanded', 'true');
      gsap.killTweensOf([m, ...items]);
      gsap.set(m, { visibility: 'visible' });
      if (Lab.reduced) { gsap.set(m, { opacity: 1, scale: 1, y: 0 }); gsap.set(items, { opacity: 1, x: 0 }); }
      else {
        gsap.fromTo(m, { opacity: 0, scale: .86, y: -6 * S.unit }, { opacity: 1, scale: 1, y: 0, duration: .42, ease: 'back.out(1.7)' });
        gsap.fromTo(items, { opacity: 0, y: -4 * S.unit }, { opacity: 1, y: 0, duration: .35, ease: 'expo.out', stagger: .04, delay: .05 });
      }
      const checked = m.querySelector('[aria-checked="true"]') || items[0];
      checked.focus({ preventScroll: true });
    }
    function closeMenu(refocus) {
      const name = S.menu;
      if (!name) return;
      S.menu = null;
      host.classList.remove('is-menu');
      const m = el.menus[name];
      triggers[name].setAttribute('aria-expanded', 'false');
      gsap.killTweensOf(m);
      gsap.to(m, { opacity: 0, scale: .92, y: -4 * S.unit, duration: Lab.reduced ? 0 : .2, ease: 'power3.in', onComplete: () => gsap.set(m, { visibility: 'hidden' }) });
      if (refocus) triggers[name].focus({ preventScroll: true });
    }
    Object.entries(triggers).forEach(([name, b]) => b.addEventListener('click', e => { e.stopPropagation(); openMenu(name); }));
    Object.values(el.menus).forEach(m => {
      m.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.range) switchRange(b.dataset.range);
        else if (b.dataset.month) switchMonth(+b.dataset.month);
        else if (b.dataset.opt === 'compare') toggleCompare();
        else if (b.dataset.opt === 'dots') toggleDots();
        setTimeout(() => closeMenu(e.detail === 0), 180);
      });
      m.addEventListener('keydown', e => {
        const list = Array.from(m.querySelectorAll('button')), i = list.indexOf(document.activeElement);
        if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
        else if (e.key === 'Tab') closeMenu(false);
      });
    });
    document.addEventListener('pointerdown', e => {
      if (!S.menu) return;
      if (!el.menus[S.menu].contains(e.target) && !triggers[S.menu].contains(e.target)) closeMenu(false);
    });

    /* ── pointer ── */
    let rect = null;
    const stageRect = () => rect || (rect = el.stage.getBoundingClientRect());
    const dropRect = () => { rect = null; };
    addEventListener('scroll', dropRect, { passive: true, capture: true });
    addEventListener('resize', dropRect, { passive: true });
    host.addEventListener('pointerenter', dropRect);
    host.addEventListener('pointermove', e => {
      const r = stageRect();
      S.ptr.inside = true; S.ptr.mouse = e.pointerType !== 'touch';
      S.ptr.nx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      S.ptr.ny = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      // the card faces the viewer while hovered, so stage units are a fair guess of card units
      S.ptr.x = (e.clientX - r.left) / r.width * SW - CX;
      S.ptr.y = (e.clientY - r.top) / r.height * SH - CY;
    });
    host.addEventListener('pointerleave', () => { S.ptr.inside = false; });

    // chart scrub (the hit area is in the card, so its own rect gives day positions)
    const dayAt = e => {
      const r = el.scrub.getBoundingClientRect();
      const x = (X_START - 10) + (e.clientX - r.left) / r.width * (X_LAST - X_START + 26);
      return clamp(Math.round(xToDay(x)), Math.max(1, Math.ceil(V.w0 - .01)), MONTHS[S.month].days);
    };
    let leaveTimer = 0;
    el.scrub.addEventListener('pointerdown', e => {
      if (S.menu) { closeMenu(false); return; }
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      clearTimeout(leaveTimer); S.pressed = true; el.scrub.setPointerCapture(e.pointerId); setPick(dayAt(e));
    });
    el.scrub.addEventListener('pointermove', e => { if (S.menu) return; if (e.pointerType === 'mouse' || S.pressed) { clearTimeout(leaveTimer); setPick(dayAt(e)); } });
    el.scrub.addEventListener('pointerup', e => { S.pressed = false; if (e.pointerType !== 'mouse') { leaveTimer = setTimeout(() => setPick(null), 1400); } });
    el.scrub.addEventListener('pointercancel', () => { S.pressed = false; setPick(null); });
    el.scrub.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !S.pressed) { clearTimeout(leaveTimer); leaveTimer = setTimeout(() => setPick(null), 350); } });   // touch: pointerup decides
    el.scrub.addEventListener('keydown', e => {
      const n = MONTHS[S.month].days, lo = Math.max(1, Math.ceil(V.w0 - .01)), cur = S.pick ?? n;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPick(Math.max(lo, cur - 1)); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPick(Math.min(n, cur + 1)); }
      else if (e.key === 'Home') { e.preventDefault(); setPick(lo); }
      else if (e.key === 'End') { e.preventDefault(); setPick(n); }
      else if (e.key === 'Escape') setPick(null);
    });
    el.scrub.addEventListener('focus', () => { S.keyFocus = el.scrub.matches(':focus-visible'); });
    el.scrub.addEventListener('blur', () => { S.keyFocus = false; setPick(null); });

    function setPick(d) {
      if (d === S.pick) return;
      const was = S.pick;
      S.pick = d;
      if (d === null) { S.probeO.t = 0; paintXLabels(); return; }
      S.probeO.t = 1;
      if (was === null) { S.probeX.v = S.probeX.t = dayToX(d); S.tipX.v = dayToX(d); }
      S.probeX.t = dayToX(d);
      if (!Lab.reduced) S.bump.vel += 5;
      const m = MONTHS[S.month], vals = curVals(), v = vals[d], p = vals[d - 1] ?? v, ch = (v / p - 1) * 100;
      el.tipD.textContent = `${d} ${m.short}`;
      el.tipV.textContent = `$${v.toFixed(2)}M`;
      el.tipC.textContent = `${ch >= 0 ? '+' : '−'}${Math.abs(ch).toFixed(1)}%`;
      el.tipC.classList.toggle('is-down', ch < 0);
      el.scrub.setAttribute('aria-valuenow', String(d));
      el.scrub.setAttribute('aria-valuetext', `${d} ${m.short}: $${v.toFixed(2)} million, ${ch >= 0 ? 'up' : 'down'} ${Math.abs(ch).toFixed(1)}% on the day before`);
      paintXLabels();
    }
    function paintXLabels() {
      Array.from(el.xlab.children).forEach(s => s.classList.toggle('is-on', S.pick !== null && Math.abs(+s.dataset.day - S.pick) < .5));
    }

    /* ── live ── */
    function liveStep() {
      const n = toVals.length - 1;
      toVals = toVals.slice(); fromVals = toVals.slice();
      toVals[n] = Math.min(1.6, toVals[n] + .004 + Math.random() * .012);
      V.mix = 1;
      S.extra += Math.round(600 + Math.random() * 2600);
      dirty = true;
      syncNumbers({ dir: 1, dur: .8 });
      if (!Lab.reduced) S.bump.vel += 9;
    }

    /* ── frame ── */
    const written = new WeakMap();
    function put(node, tf) { if (written.get(node) !== tf) { node.style.transform = tf; written.set(node, tf); } }

    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const reduced = Lab.reduced, idle = reduced ? 0 : S.idle, k = S.unit, p = S.ptr;
      const engaged = (p.inside && !reduced) || S.menu || S.keyFocus || S.pressed;
      // at rest the card keeps the shot's angle; hovered, it turns to face you and follows the pointer a little
      S.face.t = engaged ? 1 : 0;
      stepSpring(S.face, dt);
      const f = clamp(S.face.v, 0, 1.2), mouse = p.inside && p.mouse && !reduced && !S.menu;
      S.rz.t = REST.z * (1 - f) * S.rest;
      S.rx.t = REST.x * (1 - f) * S.rest + (mouse ? -p.ny * 4 : 0);
      S.ry.t = REST.y * (1 - f) * S.rest + (mouse ? p.nx * 6 : 0);
      [S.rz, S.rx, S.ry, S.probeX, S.tipX, S.probeO, S.bump].forEach(s => stepSpring(s, dt));
      S.tipX.t = S.probeX.v;
      S.tipRot.t = clamp((S.probeX.v - S.tipX.v) * .3, -12, 12);
      stepSpring(S.tipRot, dt);

      put(el.tilt, `perspective(${(PERSP * k).toFixed(0)}px) rotateZ(${S.rz.v.toFixed(3)}deg) rotateX(${S.rx.v.toFixed(3)}deg) rotateY(${S.ry.v.toFixed(3)}deg)`);
      // the gloss slides with the turn, the floor light brightens as the card faces you
      put(el.gloss, `translate3d(${(-S.ry.v * 4 * k).toFixed(1)}px,0,0)`);
      const breathe = 1 + idle * Math.sin(S.t * 1.3) * .05;
      put(el.floor, `translateX(-50%) scale(${(breathe * (1 + f * .08)).toFixed(4)}, ${(breathe).toFixed(4)})`);
      el.floor.style.opacity = (.82 + f * .18).toFixed(3);

      if (dirty) rebuild();
      else if (S.bump.v > .01 || S.bump.v < -.01 || S.endIn < 1) {
        const ey = curve.ys[curve.ys.length - 1], ex = curve.xs[curve.xs.length - 1];
        el.end.setAttribute('transform', `translate(${r2(ex)} ${r2(ey)}) scale(${r2(S.endIn * (1 + S.bump.v * .06))})`);
      }

      // border light under the pointer
      if (p.inside && !reduced) {
        el.spot.setAttribute('cx', r2(p.x)); el.spot.setAttribute('cy', r2(p.y));
        el.rimSpot.setAttribute('opacity', (f * .9).toFixed(3));
      } else el.rimSpot.setAttribute('opacity', '0');

      // probe, guide and tooltip
      const po = clamp(S.probeO.v, 0, 1);
      if (po > .005) {
        const px = S.probeX.v, py = yAtCurve(curve, px);
        el.probe.setAttribute('transform', `translate(${r2(px)} ${r2(py)}) scale(${r2(1 + S.bump.v * .05)})`);
        el.probe.setAttribute('opacity', po.toFixed(3));
        el.guide.setAttribute('x1', r2(px)); el.guide.setAttribute('x2', r2(px)); el.guide.setAttribute('y1', r2(py + 6));
        el.guide.setAttribute('opacity', (po * .9).toFixed(3));
        const tx = clamp(S.tipX.v, 120, CW - 150), ty = Math.max(70, yAtCurve(curve, S.tipX.v) - 22);
        put(el.tip, `translate3d(${(tx * k).toFixed(2)}px,${(ty * k).toFixed(2)}px,0) rotate(${S.tipRot.v.toFixed(2)}deg) scale(${(.85 + .15 * po).toFixed(3)})`);
        el.tip.style.opacity = po.toFixed(3);
      } else if (el.tip.style.opacity !== '0') {
        el.probe.setAttribute('opacity', '0'); el.guide.setAttribute('opacity', '0'); el.tip.style.opacity = '0';
      }

      // the end marker breathes
      const hp = (S.t % 2.4) / 2.4;
      el.endHalo.setAttribute('r', r2(7 + hp * 16));
      el.endHalo.setAttribute('opacity', (idle * S.endIn * .55 * (1 - hp)).toFixed(3));

      renderComet(dt, idle);
      renderPulse(dt, idle);

      if (S.live && !reduced) { S.liveT -= dt; if (S.liveT <= 0) { S.liveT = 2.2; liveStep(); } }
    }

    function renderComet(dt, idle) {
      const C = S.comet;
      if (idle <= 0) { if (C.run >= 0) { C.run = -1; el.comet.setAttribute('opacity', '0'); } return; }
      if (C.run < 0) { C.next -= dt; if (C.next > 0) return; C.run = 0; }
      C.run += dt / 2.6;
      const e = C.run < .5 ? 2 * C.run * C.run : 1 - Math.pow(-2 * C.run + 2, 2) / 2;
      el.comet.setAttribute('stroke-dashoffset', (-(e * 1000) + 1000 * .14).toFixed(1));
      el.comet.setAttribute('opacity', (Math.min(1, C.run * 8, (1 - C.run) * 8) * .9).toFixed(3));
      if (C.run >= 1) { C.run = -1; C.next = 4.5 + Math.random() * 3; el.comet.setAttribute('opacity', '0'); }
    }
    function renderPulse(dt, idle) {
      const P = S.pulse;
      if (idle <= 0 || S.draw < 1) { if (P.run >= 0) { P.run = -1; el.pulse.setAttribute('opacity', '0'); } return; }
      if (P.run < 0) { P.next -= dt; if (P.next > 0) return; P.run = 0; }
      P.run += dt / 1.6;
      const e = P.run < .5 ? 2 * P.run * P.run : 1 - Math.pow(-2 * P.run + 2, 2) / 2, seg = 60;
      el.pulse.style.strokeDasharray = `${seg} ${lineLen + seg * 2}`;
      el.pulse.style.strokeDashoffset = (-(e * (lineLen + seg) - seg)).toFixed(1);
      el.pulse.setAttribute('opacity', (Math.min(1, P.run * 6, (1 - P.run) * 6) * .75).toFixed(3));
      if (P.run >= 1) {
        P.run = -1; P.next = 3.6 + Math.random() * 2.4; el.pulse.setAttribute('opacity', '0');
        if (!Lab.reduced) S.bump.vel += 7;
      }
    }

    /* ── intro ── */
    let introTl = null;
    function resetRest() {
      gsap.killTweensOf(V); gsap.killTweensOf(S);
      S.month = DEFAULT_MONTH; S.range = 'month'; S.compare = false; S.showDots = true; S.extra = 0; S.pick = null;
      fromVals = MONTHS[DEFAULT_MONTH].vals.slice(); toVals = fromVals.slice();
      V.w0 = 1; V.w1 = MONTHS[DEFAULT_MONTH].days; V.mix = 1;
      el.menus.range.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.range === 'month')));
      el.menus.month.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.month === DEFAULT_MONTH)));
      el.menus.more.querySelector('[data-opt="compare"]').setAttribute('aria-checked', 'false');
      el.menus.more.querySelector('[data-opt="dots"]').setAttribute('aria-checked', 'true');
      el.ghost.style.opacity = 0;
      if (S.menu) closeMenu(false);
      xLabels();
      dirty = true;
    }
    function applyDraw() {
      const L = lineLen || el.line.getTotalLength();
      const vis = Math.max(.01, L * S.draw);
      [el.line, el.glow1, el.glow2].forEach(pth => { pth.style.strokeDasharray = S.draw >= 1 ? '' : `${vis} ${L + 20}`; });
      const head = S.draw > 0 && S.draw < 1 ? el.line.getPointAtLength(vis) : null;
      el.view.setAttribute('width', S.draw >= 1 ? X_LAST - X_START + 12 : Math.max(0, (head ? head.x : X_START) - X_START + 8));
      if (head) { el.probe.setAttribute('transform', `translate(${r2(head.x)} ${r2(head.y)})`); el.probe.setAttribute('opacity', '.9'); }
      dirty = true;
    }
    function finalState() {
      S.draw = 1; S.dotsIn = 1; S.endIn = 1; S.idle = 1; S.rest = 1;
      gsap.set([el.intro, el.title, el.range, el.total, el.badge, el.month, el.more, el.floor, el.halo, el.rimGlow, ...el.ylab, ...el.gridLines], { clearProps: 'opacity,visibility,transform' });
      gsap.set(el.rimLine, { attr: { 'stroke-dashoffset': 0, 'stroke-dasharray': 'none' } });
      el.intro.style.visibility = 'visible';
      applyDraw();
      el.probe.setAttribute('opacity', '0');
      syncNumbers({ instant: true });
    }
    function intro() {
      if (introTl) introTl.kill();
      resetRest(); rebuild();
      if (Lab.reduced) { finalState(); gsap.fromTo(el.intro, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5 }); return; }
      S.draw = 0; S.endIn = 0; S.idle = 0;
      odo.total.set('$0,000,000', { instant: true, force: true });
      odo.pct.set('0.0%', { instant: true, force: true });
      applyDraw();
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; S.draw = 1; S.idle = 1; S.endIn = 1; applyDraw(); el.probe.setAttribute('opacity', '0'); } });
      tl.fromTo(el.intro, { autoAlpha: 0, scale: .82, yPercent: 6 }, { autoAlpha: 1, scale: 1, yPercent: 0, duration: 1.5, ease: 'expo.out' }, 0);
      tl.fromTo(S, { rest: 2.1 }, { rest: 1, duration: 1.7, ease: 'expo.out' }, 0);
      tl.fromTo(el.floor, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power2.out' }, .2);
      tl.fromTo(el.halo, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, .3);
      tl.fromTo(el.rimLine, { attr: { 'stroke-dasharray': '0 1000', 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dasharray': '1000 0' }, duration: 1.5, ease: 'power2.inOut' }, .15);
      tl.fromTo(el.rimGlow, { opacity: 0 }, { opacity: .85, duration: 1, ease: 'power1.out' }, .9);
      tl.fromTo([el.title, el.range], { autoAlpha: 0, y: 10 * S.unit }, { autoAlpha: 1, y: 0, duration: .8, ease: 'expo.out', stagger: .08 }, .45);
      tl.fromTo([el.month, el.more], { autoAlpha: 0, y: -8 * S.unit }, { autoAlpha: 1, y: 0, duration: .7, ease: 'expo.out', stagger: .08 }, .55);
      tl.fromTo(el.total, { autoAlpha: 0, y: 8 * S.unit }, { autoAlpha: 1, y: 0, duration: .8, ease: 'expo.out' }, .62);
      tl.call(() => odo.total.set('$' + comma(MONTHS[DEFAULT_MONTH].total), { fromZero: true, spin: 2, dur: 1.6, stagger: .06, order: 'ltr' }), null, .64);
      tl.fromTo(el.badge, { autoAlpha: 0, scale: .7, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'back.out(2)' }, .82);
      tl.call(() => odo.pct.set(pct((MONTHS[DEFAULT_MONTH].total / MONTHS[DEFAULT_MONTH].prev - 1) * 100), { fromZero: true, spin: 1, dur: 1.1, stagger: .06, order: 'ltr' }), null, .86);
      tl.fromTo(el.arrow, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .6, ease: 'back.out(3)' }, 1);
      tl.fromTo(el.gridLines, { opacity: 0, attr: { x2: X_START } }, { opacity: 1, attr: { x2: X_LAST + 8 }, duration: 1, ease: 'expo.out', stagger: .06 }, .75);
      tl.fromTo(el.ylab, { autoAlpha: 0, x: 8 * S.unit }, { autoAlpha: 1, x: 0, duration: .7, ease: 'expo.out', stagger: .06 }, .85);
      tl.fromTo(el.xlab.children, { autoAlpha: 0, y: 8 * S.unit }, { autoAlpha: 1, y: 0, duration: .7, ease: 'expo.out', stagger: .06 }, .95);
      tl.to(S, { draw: 1, duration: 1.45, ease: 'power2.inOut', onUpdate: applyDraw }, 1.0);
      tl.to(S, { endIn: 1, duration: .8, ease: 'elastic.out(1, .45)', onUpdate: () => { dirty = true; } }, 2.4);
      tl.call(() => { el.probe.setAttribute('opacity', '0'); }, null, 2.45);
      tl.to(S, { idle: 1, duration: 1.2, ease: 'sine.inOut' }, 2.6);
      tl.call(() => syncNumbers({ instant: true }), null, 3.4);
    }

    /* ── lifecycle ── */
    function resize() { const w = el.stage.clientWidth; if (w) S.unit = w / SW; }
    new ResizeObserver(() => { dropRect(); resize(); }).observe(el.stage);
    resize();
    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }

    Object.values(el.menus).forEach(m => gsap.set(m, { visibility: 'hidden', opacity: 0 }));
    resetRest(); rebuild(); finalState();
    if (!Lab.still) el.intro.style.visibility = 'hidden';
    start();
    Lab.fonts.then(() => Object.values(odo).forEach(o => o.remeasure()));

    return {
      id: 3,
      intro: () => { el.intro.style.visibility = ''; intro(); },
      replay: () => { el.intro.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; S.liveT = .5; },
      setVisible(v) { if (v) start(); else stop(); },
      _state: S, setPick, switchMonth, switchRange, toggleCompare, toggleDots, openMenu, closeMenu,
    };
  }

  Lab.register({ id: 3, slug: 'revenue', mount });
})();
