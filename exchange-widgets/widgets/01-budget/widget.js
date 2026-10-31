/* ==========================================================================
   Widget 01 · Budget (weekly chart)
   Exchange-app Widget Lab · vanilla JS + GSAP 3.13 (global `gsap`)

   Units: everything is laid out in the reference image's pixels. The card is
   931 × 981 u and sits in a 1021 × 1071 u tray. CSS scales 1u with the
   container width (--u); JS converts with `unit` (px per u).

   Motion map
   · intro   tray rises, digits spin up, bills fly in, dividers grow, the line
             draws itself with a light at its tip, marker pops, tooltip drops
   · scrub   pointer / touch / arrow keys pick a day: the marker rides the
             line on a spring, the tooltip swings after it, every number rolls,
             the day's column lights up. Click or release pins the day.
   · cash    drag and fling the front bill (or tap it): +$100 from the chosen
             day onwards. The stack cycles and the chart springs up.
   · tilt    the pointer tilts the card in 3D; bills parallax at their depth
   · idle    bills float, sparkles drift up and dodge the pointer, a light
             pulse runs along the line and pings the arrow, the marker breathes
   · badge   tap to switch the change between $ and %
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab) { console.warn('[widget 01] lab.js is missing'); return; }

  /* ───────────────────────────── design constants ───────────────────────────── */
  const TRAY_W = 1021, PAD = 45, CARD_W = 931, CARD_H = 981;
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const COL0 = 93.7, COLW = 106.667;                       // day columns
  const LABEL_X = DAYS.map((_, i) => COL0 + COLW * (i + 0.5));
  const VX = [190, 299, 407, 495, 623, 731, 844];          // end-of-day points
  const OPEN_X = 89;                                       // week opening point
  const REF = Object.freeze({ open: 433, values: Object.freeze([433, 610, 610, 750, 750, 654, 898]), day: 3 });
  const BASE = 30739 - 750;                                // budget = BASE + level
  const MAP = { lo: 433, hi: 910, yLo: 793, yHi: 480 };    // value → y at rest
  const FILL_BOTTOM = 874, CORNER = 22, DEPOSIT = 100;
  const INK = '#1117B0';
  const TIP_LIFT = 31;                                     // marker centre → nib tip

  // sparkles inside the fill (from the reference) and their strength
  const DOTS = [[287, 708], [318, 708], [352, 708], [302, 734], [347, 757], [330, 783], [393, 777], [414, 700], [472, 798],
    [479, 696], [492, 721], [510, 693], [524, 771], [533, 616], [539, 745], [543, 693], [555, 768], [558, 718], [563, 668],
    [574, 741], [589, 714], [596, 613], [609, 638], [624, 661], [642, 634], [655, 661], [674, 638]];
  const DOT_A = [.55, 1, 1, .9, 1, .9, .9, 1, .8, 1, 1, 1, .9, .85, 1, 1, .9, 1, 1, .9, 1, .9, 1, 1, 1, 1, .55];

  // bills: one outline (the front bill), the stack fans around (134, 524)
  const BILL = {
    box: { x: 400, y: 215, w: 500, h: 360 },
    path: 'M452,364Q452,349 466,349C560,345 660,330 726.4,274Q737.1,265 746.1,275.7L838.1,385.7Q845.8,394.9 836,401.8C737.7,470.6 616,496.5 466,501Q452,501.4 452,488Z',
    top: 'M466,349C560,345 660,330 726.4,274',
    holes: [[494, 388, 21], [635.5, 402.5, 56], [786.5, 385.5, 20.5]],
  };
  const SLOTS = [
    { x: -71.1, y: -149.5, rot: -19.2, fog: 1, fogX: 503, shade: .022, z: 2, depth: .45 },   // back
    { x: -36.9, y: -102.0, rot: -11.7, fog: 1, fogX: 474, shade: .012, z: 3, depth: .75 },   // middle
    { x: 0, y: 0, rot: 0, fog: 0, fogX: 474, shade: 0, z: 4, depth: 1.1 },                   // front
  ];

  /* ───────────────────────────── small helpers ───────────────────────────── */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const r1 = n => Math.round(n * 10) / 10;
  const group = n => String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const money = n => '$' + group(n);
  const signedMoney = n => (n < 0 ? '− $' : '+ $') + group(n);
  const signedPct = (n, base) => (n < 0 ? '− ' : '+ ') + (Math.abs(n) / base * 100).toFixed(2).replace('.', ',') + '%';
  const mkSpring = (v, k, c) => ({ v, t: v, vel: 0, k, c });
  function stepSpring(s, dt) {
    const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
    for (let i = 0; i < n; i++) { s.vel += (-s.k * (s.v - s.t) - s.c * s.vel) * h; s.v += s.vel * h; }
  }
  const settled = (s, e = .01) => Math.abs(s.v - s.t) < e && Math.abs(s.vel) < e;

  /* ───────────────────────────── odometer (rolling digits) ───────────────────────────── */
  const STRIP = Array.from({ length: 60 }, (_, i) => i % 10).join('\n');   // six sets of 0–9
  const REST = 20;                                                        // rest index = REST + digit
  const PADX = 0.1;                                                        // overhang room per cell (em)
  const isDigit = ch => ch >= '0' && ch <= '9';

  function measurer(el) {
    const cs = getComputedStyle(el);
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = `${cs.fontWeight} 100px ${cs.fontFamily}`;
    const adv = {}, kern = {};
    return {
      adv: ch => adv[ch] ?? (adv[ch] = ctx.measureText(ch).width / 100),
      kern: (a, b) => {
        const k = a + b;
        return kern[k] ?? (kern[k] = (ctx.measureText(k).width - ctx.measureText(a).width - ctx.measureText(b).width) / 100);
      },
    };
  }

  class Odo {
    constructor(el) { this.el = el; this.cells = []; this.text = ''; this.m = null; el.setAttribute('aria-hidden', 'true'); }
    metrics() { return this.m || (this.m = measurer(this.el)); }
    remeasure() { this.m = null; this.relayout(); }
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
        gsap.killTweensOf(c.s);
        gsap.set(c.s, { clearProps: 'transform,opacity' });
        c.s.style.transform = '';
        c.kind = k; c.s.textContent = k === 'd' ? STRIP : ch;
        c.el.classList.toggle('is-glyph', k === 'g');
        c.idx = k === 'd' ? REST + +ch : 0;
      } else if (k === 'g') c.s.textContent = ch;
      c.ch = ch;
    }
    paint(c) {
      c.el.style.width = (c.w + PADX * 2).toFixed(4) + 'em';
      c.el.style.opacity = c.o;
      if (c.kind === 'd') c.s.style.transform = `translate3d(0,${(-c.idx * 1.2).toFixed(4)}em,0)`;
    }
    widthFor(text, i) {
      const m = this.metrics(), ch = text[i], nx = text[i + 1];
      return m.adv(ch) + (nx ? m.kern(ch, nx) : 0);
    }
    relayout() { this.cells.forEach((c, i) => { c.w = this.widthFor(this.text, i); this.paint(c); }); }
    /* opts: dir (+1 up / -1 down / 0 nearest), dur, stagger, spin (extra turns),
       fromZero (start every digit at 0), order ('ltr' | 'rtl'), instant */
    set(text, o = {}) {
      if (text === this.text && !o.fromZero && !o.force) return;
      const dur = o.dur ?? .9, stagger = o.stagger ?? .045, instant = o.instant || Lab.reduced;
      const old = this.cells, n = text.length, diff = n - old.length;
      let cells;
      if (diff < 0) {
        old.slice(0, -diff).forEach(c => this.exit(c, instant));
        cells = old.slice(-diff);
      } else {
        const fresh = [];
        for (let i = 0; i < diff; i++) fresh.push(this.make(text[i]));
        const first = old[0] ? old[0].el : null;
        fresh.forEach(c => { this.el.insertBefore(c.el, first); c.w = 0; c.o = 0; c.isNew = true; });
        cells = fresh.concat(old);
      }
      cells.forEach((c, i) => {
        const ch = text[i];
        const delay = instant ? 0 : (o.order === 'ltr' ? i : (n - 1 - i)) * stagger;
        const w = this.widthFor(text, i);
        gsap.killTweensOf(c);
        if (instant) {
          this.kind(c, ch); c.w = w; c.o = 1; c.isNew = false;
          if (c.kind === 'd') c.idx = REST + +ch;
          this.paint(c); return;
        }
        const was = c.ch, wasKind = c.kind;
        if (isDigit(ch) && wasKind === 'd' && !c.isNew) {
          // roll the strip
          const d = +ch;
          let start = c.idx, target = REST + d;
          if (o.fromZero) { start = d === 0 && !o.spin ? REST : 0; target = REST + d + 10 * Math.min(3, o.spin ?? 2); }
          else {
            const dir = o.dir || (target >= start ? 1 : -1);
            if (dir > 0) { while (target <= start && target + 10 < 60) target += 10; }
            else { while (target >= start && target - 10 >= 0) target -= 10; }
            if (target === start && was !== ch) target += dir > 0 ? 10 : -10;
            if (o.spin) target = clamp(target + (dir > 0 ? 10 : -10) * o.spin, 0, 59);
          }
          c.idx = start; c.ch = ch;
          gsap.to(c, {
            idx: target, w, o: 1, duration: dur + (o.fromZero ? (o.order === 'ltr' ? 0 : 0) : 0), delay, ease: o.ease || 'expo.out',
            onUpdate: () => this.paint(c),
            onComplete: () => { c.idx = REST + d; this.paint(c); },
          });
        } else {
          // glyph swap (or a new cell): slide the new glyph in
          const dir = o.dir || 1;
          if (was !== ch || c.isNew) {
            this.kind(c, ch);
            if (c.kind === 'd') {
              const d = +ch;
              c.idx = o.fromZero ? 0 : REST + d - (c.isNew ? 3 * dir : 0);
              gsap.to(c, { idx: o.fromZero ? REST + d + 10 * Math.min(3, o.spin ?? 2) : REST + d, duration: dur, delay, ease: 'expo.out', onUpdate: () => this.paint(c), onComplete: () => { c.idx = REST + d; this.paint(c); } });
            } else {
              gsap.fromTo(c.s, { yPercent: 70 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur * .7, delay, ease: 'expo.out' });
            }
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
      gsap.to(c, { w: 0, o: 0, duration: .45, ease: 'expo.out', onUpdate: () => this.paint(c), onComplete: () => c.el.remove() });
    }
  }

  /* ───────────────────────────── chart geometry ───────────────────────────── */
  function yOf(v, lo, hi) { return MAP.yLo - (v - lo) * (MAP.yLo - MAP.yHi) / (hi - lo); }

  function geometry(D) {
    const pts = [[OPEN_X, yOf(D.o, D.lo, D.hi)]];
    for (let i = 0; i < 7; i++) pts.push([VX[i], yOf(D['v' + i], D.lo, D.hi)]);
    const pieces = [];
    let d = `M${r1(pts[0][0])},${r1(pts[0][1])}`, cur = pts[0];
    for (let i = 1; i < pts.length - 1; i++) {
      const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
      const l1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]) || 1, l2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]) || 1;
      const r = Math.min(CORNER, l1 * .45, l2 * .45);
      const a = [p1[0] + (p0[0] - p1[0]) * r / l1, p1[1] + (p0[1] - p1[1]) * r / l1];
      const b = [p1[0] + (p2[0] - p1[0]) * r / l2, p1[1] + (p2[1] - p1[1]) * r / l2];
      pieces.push({ q: false, a: cur, b: a }, { q: true, a, c: p1, b });
      d += `L${r1(a[0])},${r1(a[1])}Q${r1(p1[0])},${r1(p1[1])} ${r1(b[0])},${r1(b[1])}`;
      cur = b;
    }
    const last = pts[pts.length - 1];
    pieces.push({ q: false, a: cur, b: last });
    d += `L${r1(last[0])},${r1(last[1])}`;
    const area = `${d}L${r1(last[0] - 3)},${FILL_BOTTOM}L${OPEN_X},${FILL_BOTTOM}Z`;
    return { pts, pieces, line: d, area };
  }

  function yAt(geo, x) {
    const P = geo.pieces;
    if (x <= P[0].a[0]) return P[0].a[1];
    for (const p of P) {
      const x0 = p.a[0], x2 = p.b[0];
      if (x > x2 + 1e-6) continue;
      if (!p.q) return p.a[1] + (p.b[1] - p.a[1]) * ((x - x0) / ((x2 - x0) || 1));
      const A = x0 - 2 * p.c[0] + x2, B = 2 * (p.c[0] - x0), C = x0 - x;
      let t;
      if (Math.abs(A) < 1e-6) t = -C / B;
      else {
        const s = Math.sqrt(Math.max(0, B * B - 4 * A * C));
        t = (-B + s) / (2 * A);
        if (t < -1e-6 || t > 1 + 1e-6) t = (-B - s) / (2 * A);
      }
      t = clamp(t, 0, 1);
      const mt = 1 - t;
      return mt * mt * p.a[1] + 2 * mt * t * p.c[1] + t * t * p.b[1];
    }
    return P[P.length - 1].b[1];
  }

  function arrowPath(pts, k) {
    const [x1, y1] = pts[pts.length - 2], [x2, y2] = pts[pts.length - 1];
    const back = Math.atan2(y1 - y2, x1 - x2), L = 33 * k, s = 43 * Math.PI / 180;
    return `M${r1(x2 + Math.cos(back + s) * L)},${r1(y2 + Math.sin(back + s) * L)}L${r1(x2)},${r1(y2)}L${r1(x2 + Math.cos(back - s) * L)},${r1(y2 + Math.sin(back - s) * L)}`;
  }

  /* ───────────────────────────── markup ───────────────────────────── */
  function billSVG(u) {
    const B = BILL.box;
    return `<svg class="w01-bill-svg" viewBox="${B.x} ${B.y} ${B.w} ${B.h}" aria-hidden="true" focusable="false">
  <defs>
    <path id="${u}-p" d="${BILL.path}"/>
    <clipPath id="${u}-c"><use href="#${u}-p"/></clipPath>
    <linearGradient id="${u}-f" gradientUnits="userSpaceOnUse" x1="805" y1="380" x2="470" y2="482">
      <stop offset="0" stop-color="#e2e2e4"/><stop offset=".45" stop-color="#ececee"/><stop offset="1" stop-color="#fafafb"/>
    </linearGradient>
    <radialGradient id="${u}-h" cx=".5" cy=".62" r=".62">
      <stop offset="0" stop-color="#dddde0"/><stop offset=".82" stop-color="#d9d9dc"/><stop offset="1" stop-color="#cdcdd1"/>
    </radialGradient>
    <linearGradient class="js-fogg" id="${u}-g" gradientUnits="userSpaceOnUse" x1="462" y1="0" x2="550" y2="0">
      <stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </linearGradient>
    <mask id="${u}-m" maskUnits="userSpaceOnUse" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}">
      <rect x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" fill="#fff"/>
      <rect class="js-fog" x="${B.x}" y="${B.y}" width="${B.w}" height="${B.h}" fill="url(#${u}-g)" opacity="0"/>
    </mask>
    <filter id="${u}-s1" x="-20%" y="-30%" width="140%" height="170%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="${u}-s2" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  <g mask="url(#${u}-m)">
    <use href="#${u}-p" transform="translate(6 16)" fill="#1a1d44" opacity=".075" filter="url(#${u}-s1)"/>
    <use href="#${u}-p" transform="translate(0 3)" fill="#000" opacity=".11" filter="url(#${u}-s2)"/>
    <use href="#${u}-p" transform="translate(1.6 3.6)" fill="#cfcfd4"/>
    <use class="w01-bill-face" href="#${u}-p" fill="url(#${u}-f)"/>
    ${BILL.holes.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${u}-h)"/>`).join('')}
    <g clip-path="url(#${u}-c)"><path d="${BILL.top}" fill="none" stroke="#fff" stroke-width="5" opacity=".95"/></g>
    <use class="js-shade" href="#${u}-p" fill="#2a2d55" opacity="0"/>
  </g>
</svg>`;
  }

  function svgA(u) {
    const divs = Array.from({ length: 6 }, (_, k) => {
      const x = r1(COL0 + COLW * (k + 1));
      return `<line x1="${x}" y1="470" x2="${x}" y2="${FILL_BOTTOM}"/>`;
    }).join('');
    return `<svg class="w01-svg w01-svg-a" viewBox="0 0 ${CARD_W} ${CARD_H}" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="${u}-fill" gradientUnits="userSpaceOnUse" x1="0" y1="480" x2="0" y2="${FILL_BOTTOM}">
      <stop offset="0" stop-color="#6067ee"/><stop offset=".3" stop-color="#7279f1"/><stop offset=".56" stop-color="#959af4"/>
      <stop offset=".76" stop-color="#c3c6f8"/><stop offset=".9" stop-color="#e9eafd"/><stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <linearGradient id="${u}-ink" gradientUnits="userSpaceOnUse" x1="${OPEN_X}" y1="0" x2="214" y2="0">
      <stop offset="0" stop-color="${INK}" stop-opacity="0"/><stop offset=".25" stop-color="${INK}" stop-opacity=".05"/>
      <stop offset=".55" stop-color="${INK}" stop-opacity=".28"/><stop offset=".8" stop-color="${INK}" stop-opacity=".68"/><stop offset="1" stop-color="${INK}"/>
    </linearGradient>
    <linearGradient id="${u}-div" gradientUnits="userSpaceOnUse" x1="0" y1="585" x2="0" y2="860">
      <stop offset="0" stop-color="${INK}" stop-opacity=".5"/><stop offset=".2" stop-color="${INK}" stop-opacity=".86"/>
      <stop offset=".36" stop-color="${INK}" stop-opacity=".84"/><stop offset=".58" stop-color="${INK}" stop-opacity=".4"/>
      <stop offset=".74" stop-color="${INK}" stop-opacity=".15"/><stop offset="1" stop-color="${INK}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${u}-fx" gradientUnits="userSpaceOnUse" x1="${OPEN_X}" y1="0" x2="248" y2="0">
      <stop offset="0" stop-color="#141414"/><stop offset=".3" stop-color="#666"/><stop offset=".66" stop-color="#d2d2d2"/><stop offset="1" stop-color="#fff"/>
    </linearGradient>
    <mask id="${u}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${CARD_W}" height="${CARD_H}">
      <rect width="${CARD_W}" height="${CARD_H}" fill="url(#${u}-fx)"/>
    </mask>
    <linearGradient id="${u}-sheen" gradientUnits="userSpaceOnUse" x1="690" y1="0" x2="846" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".46"/>
    </linearGradient>
    <filter id="${u}-blur" x="-15%" y="-40%" width="130%" height="180%"><feGaussianBlur stdDeviation="17"/></filter>
    <clipPath id="${u}-clip"><path class="js-clip"/></clipPath>
    <clipPath id="${u}-rev"><rect class="js-rev" x="0" y="380" width="${CARD_W}" height="560"/></clipPath>
  </defs>
  <g clip-path="url(#${u}-rev)">
    <g mask="url(#${u}-mask)">
      <path class="js-area" fill="url(#${u}-fill)"/>
      <g clip-path="url(#${u}-clip)">
        <path class="js-hug" fill="none" stroke="#3a41db" stroke-width="64" stroke-linejoin="round" filter="url(#${u}-blur)" opacity=".62"/>
        <rect x="690" y="440" width="160" height="440" fill="url(#${u}-sheen)"/>
        <g class="js-divs" stroke="url(#${u}-div)" stroke-width="2.5">${divs}</g>
      </g>
    </g>
  </g>
  <path class="js-line" fill="none" stroke="url(#${u}-ink)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="js-arrow" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  }

  function svgB(u) {
    return `<svg class="w01-svg w01-svg-b" viewBox="0 0 ${CARD_W} ${CARD_H}" aria-hidden="true" focusable="false">
  <defs>
    <clipPath id="${u}-clipb"><path class="js-clipb"/></clipPath>
    <clipPath id="${u}-revb"><rect class="js-revb" x="0" y="380" width="${CARD_W}" height="560"/></clipPath>
    <radialGradient id="${u}-spot"><stop offset="0" stop-color="#fff" stop-opacity=".36"/><stop offset=".55" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="${u}-col" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".36"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#${u}-revb)"><g clip-path="url(#${u}-clipb)">
    <ellipse class="js-spot" cx="0" cy="0" rx="118" ry="96" fill="url(#${u}-spot)"/>
    <rect class="js-col" x="0" y="440" width="${COLW}" height="440" fill="url(#${u}-col)" opacity="0"/>
    <g class="js-dots" fill="#fff"></g>
  </g></g>
</svg>`;
  }

  function svgC() {
    const labels = DAYS.map((d, i) => `<text x="${r1(LABEL_X[i])}" y="890.7">${d}</text>`).join('');
    return `<svg class="w01-svg w01-svg-c" viewBox="0 0 ${CARD_W} ${CARD_H}" aria-hidden="true" focusable="false">
  <g class="js-comet" opacity="0">
    <path class="js-comet-glow" fill="none" stroke="#a9adff" stroke-width="15" stroke-linecap="round" opacity=".32"/>
    <path class="js-comet-core" fill="none" stroke="#f1f2ff" stroke-width="3.4" stroke-linecap="round"/>
  </g>
  <circle class="js-ping" r="8" fill="none" stroke="${INK}" stroke-width="3" opacity="0"/>
  <g class="js-mpos"><g class="js-mpop">
    <circle class="js-halo" r="14.5" fill="none" stroke="${INK}" stroke-width="3" opacity="0"/>
    <circle class="js-ripple" r="14.5" fill="none" stroke="${INK}" stroke-width="4" opacity="0"/>
    <circle class="js-dot" r="14.5" fill="#fff" stroke="${INK}" stroke-width="8"/>
  </g></g>
  <g class="w01-days">${labels}</g>
</svg>`;
  }

  const TREND = `<svg class="w01-trend" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path class="w01-trend-ax" d="M3.4 3.2v17.4h17.4"/>
  <g class="w01-trend-zz"><path d="M7.6 14.6l3.7-3.7 3.1 3.1 5.5-5.6"/><path d="M15.2 8.4h4.7v4.7"/></g>
</svg>`;

  function template(u) {
    const bills = [0, 1, 2, 3].map(i => `<div class="w01-bill" data-i="${i}">${billSVG(`${u}-b${i}`)}</div>`).join('');
    return `<div class="w01-stage">
  <div class="w01-intro">
    <div class="w01-shadow"></div>
    <div class="w01-tilt">
      <div class="w01-tray"></div>
      <div class="w01-card">${svgA(u)}${svgB(u)}${svgC()}</div>
      <div class="w01-frame w01-bills">${bills}</div>
      <div class="w01-frame w01-head">
        <div class="w01-label">Budget</div>
        <div class="w01-total"><span class="w01-odo js-total"></span></div>
        <button class="w01-badge" type="button"><span class="w01-badge-in"><span class="w01-odo js-badge"></span>${TREND}</span></button>
      </div>
      <div class="w01-frame w01-tips"><div class="w01-tip"><div class="w01-tip-in">
        <div class="w01-tip-glow"></div>
        <div class="w01-tip-pill"><span class="w01-odo js-tip"></span></div>
        <div class="w01-tip-nib"></div>
      </div></div></div>
      <div class="w01-frame w01-hits">
        <div class="w01-scrub" tabindex="0" role="slider" aria-label="Day of the week" aria-valuemin="0" aria-valuemax="6"></div>
        <button class="w01-cash" type="button" aria-label="Add $100 to the budget"></button>
      </div>
      <div class="w01-frame w01-fx"></div>
    </div>
  </div>
  <p class="w01-sr js-live" aria-live="polite"></p>
</div>`;
  }

  /* ───────────────────────────── the widget ───────────────────────────── */
  let counter = 0;

  function mount(host) {
    const u = `w01x${++counter}`;
    host.classList.add('w01');
    host.setAttribute('dir', 'ltr');
    host.setAttribute('lang', 'en');
    host.innerHTML = template(u);

    const $ = sel => host.querySelector(sel);
    const $$ = sel => Array.from(host.querySelectorAll(sel));
    const el = {
      stage: $('.w01-stage'), intro: $('.w01-intro'), tilt: $('.w01-tilt'), shadow: $('.w01-shadow'), card: $('.w01-card'),
      area: $('.js-area'), clip: $('.js-clip'), hug: $('.js-hug'), line: $('.js-line'), arrow: $('.js-arrow'),
      rev: $('.js-rev'), revb: $('.js-revb'), clipb: $('.js-clipb'), divs: $$('.js-divs line'),
      col: $('.js-col'), spot: $('.js-spot'), dots: $('.js-dots'),
      comet: $('.js-comet'), cometGlow: $('.js-comet-glow'), cometCore: $('.js-comet-core'), ping: $('.js-ping'),
      mpos: $('.js-mpos'), mpop: $('.js-mpop'), halo: $('.js-halo'), ripple: $('.js-ripple'),
      days: $$('.w01-days text'),
      bills: $$('.w01-bill'), head: $('.w01-head'), label: $('.w01-label'), total: $('.w01-total'),
      badge: $('.w01-badge'), badgeIn: $('.w01-badge-in'), trendZZ: $('.w01-trend-zz'), trendAx: $('.w01-trend-ax'),
      tip: $('.w01-tip'), tipIn: $('.w01-tip-in'), tipGlow: $('.w01-tip-glow'),
      scrub: $('.w01-scrub'), cash: $('.w01-cash'), fx: $('.w01-fx'), live: $('.js-live'),
    };

    const odo = { total: new Odo($('.js-total')), badge: new Odo($('.js-badge')), tip: new Odo($('.js-tip')) };

    /* ── state ── */
    const S = {
      t: 0, unit: 1, visible: true, running: false, idle: 1, dotsIn: 1, draw: 1, arrowK: 1,
      pinned: REF.day, hover: null, pressed: false, keyFocus: false, interact: spr(0, 140, 22),
      pct: false, live: false, liveTimer: 0, introDone: true, comet: { next: 2.6, run: -1 },
      ptr: { inside: false, mouse: false, nx: 0, ny: 0, x: -999, y: -999 },
      tiltX: spr(0, 110, 17), tiltY: spr(0, 110, 17), parX: spr(0, 90, 16), parY: spr(0, 90, 16),
      marker: spr(VX[REF.day], 230, 23), tipX: spr(VX[REF.day], 150, 19), tipRot: spr(0, 210, 13),
      bump: spr(0, 380, 14), col: spr(COL0 + COLW * REF.day, 260, 26), fan: spr(0, 160, 18),
      drag: null, flying: 0, lastShow: REF.day, lastTotal: BASE + REF.values[REF.day],
    };
    function spr(v, k, c) { return mkSpring(v, k, c); }

    const D = { o: REF.open, lo: MAP.lo, hi: MAP.hi };          // displayed data (tweened)
    REF.values.forEach((v, i) => { D['v' + i] = v; });
    const T = { open: REF.open, v: REF.values.slice() };          // target data
    let geo = geometry(D), geoDirty = true, lineLen = 0;

    /* ── sparkles ── */
    const dots = DOTS.map(([x, y], i) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', '3.3');
      el.dots.appendChild(c);
      return { c, x, y, x0: x, y0: y, a: DOT_A[i], ph: Math.random() * 6.28, sp: 4 + Math.random() * 7, sw: 1.5 + Math.random() * 2.5,
        delay: Math.random() * .6, ox: 0, oy: 0, vx: 0, vy: 0, life: 1, born: 0 };
    });

    /* ── bills ── */
    const bills = el.bills.map((b, i) => ({
      el: b, i, slot: i < 3 ? i : -1, fog: b.querySelector('.js-fog'), shade: b.querySelector('.js-shade'),
      face: b.querySelector('.w01-bill-face'), fogg: b.querySelector('.js-fogg'),
      pose: { x: 0, y: 0, rot: 0, rx: 0, ry: 0, s: 1, o: i < 3 ? 1 : 0, fog: 0, fogX: 462, shade: 0 },
      drag: { x: 0, y: 0, rot: 0 }, fl: { ph: Math.random() * 6.28, per: 5.4 + i * .8 }, z: 0, last: '',
    }));
    function slotPose(k) { const s = SLOTS[k]; return { x: s.x, y: s.y, rot: s.rot, rx: 0, ry: 0, s: 1, o: 1, fog: s.fog, fogX: s.fogX, shade: s.shade }; }
    function placeBills() {
      bills.forEach(b => {
        gsap.killTweensOf(b.pose); gsap.killTweensOf(b.drag);
        b.drag.x = b.drag.y = b.drag.rot = 0;
        if (b.slot >= 0) Object.assign(b.pose, slotPose(b.slot));
        else Object.assign(b.pose, slotPose(0), { o: 0 });
        b.z = b.slot >= 0 ? SLOTS[b.slot].z : 1;
      });
      S.flying = 0;
    }
    const front = () => bills.find(b => b.slot === 2);

    /* ── data & numbers ── */
    const showDay = () => (S.hover ?? S.pinned);

    function syncNumbers(o = {}) {
      const d = showDay(), v = T.v[d];
      const total = BASE + v, delta = v - T.open;
      const dir = Math.sign(total - S.lastTotal) || 1;
      odo.total.set(money(total), { dir, dur: o.dur ?? .95, stagger: .05, instant: o.instant });
      odo.badge.set(S.pct ? signedPct(delta, BASE + T.open) : signedMoney(delta), { dir, dur: o.dur ?? .85, instant: o.instant });
      odo.tip.set(money(v), { dir, dur: o.dur ?? .8, instant: o.instant });
      S.lastTotal = total;
      const down = delta < 0;
      if (down !== S.trendDown) {
        S.trendDown = down;
        gsap.to(el.trendZZ, { scaleY: down ? -1 : 1, duration: o.instant || Lab.reduced ? 0 : .6, ease: 'back.out(2.5)', svgOrigin: '13.7 11.5' });
      }
      el.badge.setAttribute('aria-label', `Change since Sunday: ${signedMoney(delta).replace('−', 'minus')}. Tap to show ${S.pct ? 'dollars' : 'percent'}.`);
      el.scrub.setAttribute('aria-valuenow', String(d));
      el.scrub.setAttribute('aria-valuetext', `${DAYS[d]}: ${money(v)}, budget ${money(total)}`);
      el.live.textContent = `${DAYS[d]} ${money(v)}. Budget ${money(total)}.`;
    }

    function domainFor(open, v) {
      const mn = Math.min(open, ...v), mx = Math.max(...v);
      return { lo: mn < MAP.lo ? mn - 12 : MAP.lo, hi: mx > MAP.hi ? mx + 14 : MAP.hi };
    }

    function morphTo(open, v, o = {}) {
      T.open = open; T.v = v.slice();
      const dom = domainFor(open, v);
      const to = { o: open, lo: dom.lo, hi: dom.hi };
      v.forEach((x, i) => { to['v' + i] = x; });
      gsap.killTweensOf(D);
      if (Lab.reduced || o.instant) { Object.assign(D, to); geoDirty = true; }
      else gsap.to(D, { ...to, duration: o.dur ?? 1.1, ease: o.ease || 'elastic.out(1, 0.55)', onUpdate: () => { geoDirty = true; } });
      geoDirty = true;
      syncNumbers();
    }

    /* ── day selection ── */
    function setShow(prev) {
      const d = showDay();
      if (d === prev) return;
      S.marker.t = VX[d];
      S.col.t = COL0 + COLW * d;
      if (!Lab.reduced) S.bump.vel += 7;
      syncNumbers();
      paintDays();
    }
    function paintDays() {
      const d = showDay(), on = S.interact.t > .5;
      el.days.forEach((t, i) => t.classList.toggle('is-on', on && i === d));
    }
    function setHover(day) {
      const prev = showDay();
      S.hover = day;
      setShow(prev);
    }
    function pin(day) {
      const prev = showDay();
      S.pinned = clamp(day, 0, 6); S.hover = null;
      setShow(prev);
    }

    /* ── geometry → DOM ── */
    function applyGeometry() {
      geo = geometry(D);
      el.area.setAttribute('d', geo.area);
      el.clip.setAttribute('d', geo.area);
      el.clipb.setAttribute('d', geo.area);
      el.hug.setAttribute('d', geo.line);
      el.line.setAttribute('d', geo.line);
      el.cometGlow.setAttribute('d', geo.line);
      el.cometCore.setAttribute('d', geo.line);
      el.arrow.setAttribute('d', arrowPath(geo.pts, S.arrowK));
      el.arrow.style.opacity = S.arrowK > .02 ? 1 : 0;
      lineLen = el.line.getTotalLength();
      if (S.draw < 1) applyDraw();
      geoDirty = false;
    }

    function applyDraw() {
      const L = lineLen || el.line.getTotalLength();
      if (S.draw >= 1) {
        el.line.style.strokeDasharray = ''; el.line.style.strokeDashoffset = '';
        el.rev.setAttribute('width', CARD_W); el.revb.setAttribute('width', CARD_W);
        return;
      }
      el.line.style.strokeDasharray = `${L} ${L + 10}`;
      el.line.style.strokeDashoffset = String(L * (1 - S.draw));
      const head = S.draw > 0 ? el.line.getPointAtLength(L * S.draw) : { x: OPEN_X, y: 0 };
      const w = Math.max(0, head.x + 4);
      el.rev.setAttribute('width', w); el.revb.setAttribute('width', w);
      // a light rides the tip while the line draws
      if (S.draw > 0 && S.draw < 1) {
        el.comet.setAttribute('opacity', '1');
        const seg = 70;
        [el.cometGlow, el.cometCore].forEach(p => {
          p.style.strokeDasharray = `${seg} ${L + seg}`;
          p.style.strokeDashoffset = String(-(L * S.draw - seg));
        });
      }
    }

    /* ── per-frame render ── */
    const written = new WeakMap();
    function put(node, tf) { if (written.get(node) !== tf) { node.style.transform = tf; written.set(node, tf); } }
    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const still = Lab.reduced;
      const idle = still ? 0 : S.idle;

      // interaction level (column light, label emphasis)
      S.interact.t = (S.hover !== null || S.pressed || S.keyFocus) ? 1 : 0;
      stepSpring(S.interact, dt);
      if ((S.interact.t > .5) !== S.wasInteract) { S.wasInteract = S.interact.t > .5; paintDays(); }

      // tilt + parallax targets
      const p = S.ptr;
      const tiltOn = p.inside && p.mouse && !still && !S.drag;
      const damp = (S.hover !== null || S.pressed) ? .35 : 1;
      S.tiltX.t = tiltOn ? -p.ny * 5.5 * damp : 0;
      S.tiltY.t = tiltOn ? p.nx * 7 * damp : 0;
      S.parX.t = (p.inside && p.mouse && !still) ? p.nx : 0;
      S.parY.t = (p.inside && p.mouse && !still) ? p.ny : 0;
      S.fan.t = (!still && !S.drag && p.inside && p.mouse && p.x > 430 && p.x < 870 && p.y > 70 && p.y < 505) ? 1 : 0;
      S.tipX.t = S.marker.v;            // the tooltip chases the marker, a beat behind
      [S.tiltX, S.tiltY, S.parX, S.parY, S.fan, S.marker, S.tipX, S.bump, S.col].forEach(s => stepSpring(s, dt));
      // the tooltip leans into its lag like a flag on a stick
      S.tipRot.t = clamp((S.marker.v - S.tipX.v) * .28 + S.tipX.vel * .004, -16, 16);
      stepSpring(S.tipRot, dt);

      if (geoDirty) applyGeometry();
      const k = S.unit;

      // card tilt + floor shadow
      put(el.tilt, `perspective(${(2600 * k).toFixed(1)}px) rotateX(${S.tiltX.v.toFixed(3)}deg) rotateY(${S.tiltY.v.toFixed(3)}deg)`);
      put(el.shadow, `translate3d(${(-S.tiltY.v * 6 * k).toFixed(2)}px,${(S.tiltX.v * 5 * k).toFixed(2)}px,0) scale(${(1 + Math.abs(S.tiltY.v) * .004).toFixed(4)})`);

      // marker rides the line
      const mx = S.marker.v, my = yAt(geo, mx);
      const breathe = idle * (Math.sin(S.t * 2.4) * .025);
      el.mpos.setAttribute('transform', `translate(${r1(mx)} ${r1(my)}) scale(${(1 + S.bump.v * .06 + breathe).toFixed(4)})`);
      // halo pulse every 2.6 s
      const hp = (S.t % 2.6) / 2.6;
      el.halo.setAttribute('r', r1(14.5 + hp * 26));
      el.halo.setAttribute('opacity', (idle * .32 * (1 - hp) * (hp > .02 ? 1 : 0)).toFixed(3));

      // tooltip
      const tx = S.tipX.v, ty = yAt(geo, tx) - TIP_LIFT;
      put(el.tip, `translate3d(${(tx * k).toFixed(2)}px,${(ty * k).toFixed(2)}px,0) rotate(${S.tipRot.v.toFixed(2)}deg)`);
      const gl = 1 + idle * Math.sin(S.t * 1.8) * .06;
      put(el.tipGlow, `translate(-50%,-50%) scale(${gl.toFixed(3)})`);

      // the fill brightens under the marker
      el.spot.setAttribute('transform', `translate(${r1(mx)} ${r1(my + 34)})`);
      // column light
      el.col.setAttribute('x', r1(S.col.v));
      el.col.setAttribute('opacity', (S.interact.v * .95).toFixed(3));

      // bills
      renderBills(dt, idle);

      // sparkles
      renderDots(dt, idle);

      // a light pulse along the line every few seconds
      if (S.draw >= 1) renderComet(dt, idle);

      // live data
      if (S.live && !still) {
        S.liveTimer -= dt;
        if (S.liveTimer <= 0) { S.liveTimer = 2.4; liveStep(); }
      }
    }

    function renderBills(dt, idle) {
      const k = S.unit, fan = S.fan.v;
      bills.forEach(b => {
        const P = b.pose, slot = b.slot;
        const depth = slot >= 0 ? SLOTS[slot].depth : .45;
        const fl = idle * Math.sin(S.t * (6.283 / b.fl.per) + b.fl.ph);
        const fr = idle * Math.sin(S.t * (6.283 / (b.fl.per * 1.3)) + b.fl.ph * 1.7);
        // fan out on hover: spread the rotation and lift the front bill
        const spread = slot >= 0 ? (slot - 2) * 4.2 * fan : 0;
        const lift = slot === 2 ? -10 * fan : slot === 1 ? -4 * fan : 0;
        const x = P.x + b.drag.x + S.parX.v * 16 * depth + fr * 3;
        const y = P.y + b.drag.y + S.parY.v * 11 * depth + fl * 5.5 + lift;
        const rot = P.rot + b.drag.rot + spread + fr * .9;
        const rx = P.rx - S.parY.v * 9 * depth;
        const ry = P.ry + S.parX.v * 12 * depth;
        const tf = `perspective(${(1500 * k).toFixed(1)}px) translate3d(${(x * k).toFixed(2)}px,${(y * k).toFixed(2)}px,0) rotate(${rot.toFixed(3)}deg) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${(P.s * (1 + (slot === 2 ? .02 * fan : 0))).toFixed(4)})`;
        if (tf !== b.last) { b.el.style.transform = tf; b.last = tf; }
        const o = P.o.toFixed(3);
        if (o !== b.lastO) { b.el.style.opacity = o; b.lastO = o; }
        const z = String(b.z);
        if (z !== b.lastZ) { b.el.style.zIndex = z; b.lastZ = z; }
        const fog = P.fog.toFixed(3);
        if (fog !== b.lastFog) { b.fog.setAttribute('opacity', fog); b.lastFog = fog; }
        const fx = P.fogX.toFixed(1);
        if (fx !== b.lastFx) { b.fogg.setAttribute('x1', fx); b.fogg.setAttribute('x2', (P.fogX + 88).toFixed(1)); b.lastFx = fx; }
        const sh = P.shade.toFixed(3);
        if (sh !== b.lastSh) { b.shade.setAttribute('opacity', sh); b.lastSh = sh; }
      });
    }

    function renderDots(dt, idle) {
      const p = S.ptr, near = p.inside && !Lab.reduced;
      dots.forEach((d, i) => {
        if (idle > 0) {
          d.y -= d.sp * dt * idle;
          d.x = d.x0 + Math.sin(S.t * .7 + d.ph) * d.sw * idle;
          const top = yAt(geo, d.x) + 10;
          if (d.y < top) {               // reached the line: respawn low in the fill
            d.x0 = 250 + Math.random() * 520; d.x = d.x0;
            d.y = 790 + Math.random() * 60; d.born = S.t; d.sp = 4 + Math.random() * 8;
          }
        }
        // dodge the pointer
        let tx = 0, ty = 0;
        if (near) {
          const dx = d.x - p.x, dy = d.y - p.y, dist = Math.hypot(dx, dy);
          if (dist < 90 && dist > .01) { const f = (90 - dist) / 90; tx = dx / dist * f * 46; ty = dy / dist * f * 46; }
        }
        d.vx += ((tx - d.ox) * 140 - d.vx * 16) * dt; d.ox += d.vx * dt;
        d.vy += ((ty - d.oy) * 140 - d.vy * 16) * dt; d.oy += d.vy * dt;
        const born = clamp((S.t - d.born) / .8, 0, 1);
        const tw = idle > 0 ? .72 + .28 * Math.sin(S.t * 2.2 + d.ph * 3) : 1;
        const intro = clamp((S.dotsIn - d.delay * .6) / .4, 0, 1);
        const o = d.a * tw * born * intro;
        d.c.setAttribute('transform', `translate(${r1(d.x + d.ox)} ${r1(d.y + d.oy)})`);
        d.c.setAttribute('opacity', o.toFixed(3));
      });
    }

    function renderComet(dt, idle) {
      const C = S.comet;
      if (idle <= 0) { if (C.run >= 0) { C.run = -1; el.comet.setAttribute('opacity', '0'); } return; }
      if (C.run < 0) {
        C.next -= dt;
        if (C.next <= 0) { C.run = 0; }
        else return;
      }
      C.run += dt / 1.5;
      const L = lineLen, seg = 80;
      const e = C.run < .5 ? 2 * C.run * C.run : 1 - Math.pow(-2 * C.run + 2, 2) / 2;   // easeInOutQuad
      const head = e * (L + seg);
      [el.cometGlow, el.cometCore].forEach(pth => {
        pth.style.strokeDasharray = `${seg} ${L + seg * 2}`;
        pth.style.strokeDashoffset = String(-(head - seg));
      });
      el.comet.setAttribute('opacity', String(clamp(C.run * 6, 0, 1) * idle));
      if (C.run >= 1) {
        C.run = -1; C.next = 3.2 + Math.random() * 2;
        el.comet.setAttribute('opacity', '0');
        pingTip();
      }
    }

    function pingTip() {
      const tip = geo.pts[geo.pts.length - 1];
      gsap.killTweensOf(el.ping);
      el.ping.setAttribute('cx', r1(tip[0])); el.ping.setAttribute('cy', r1(tip[1]));
      gsap.fromTo(el.ping, { attr: { r: 6 }, opacity: .55 }, { attr: { r: 30 }, opacity: 0, duration: .9, ease: 'power2.out' });
    }

    /* ── live data ── */
    function liveStep() {
      const v = T.v.map((x, i) => clamp(Math.round(x + (Math.random() - .45) * (i === 6 ? 70 : 46)), 300, 1500));
      morphTo(T.open, v, { dur: 1.2, ease: 'expo.out' });
    }

    /* ── cash: drag, fling, deposit ── */
    function toUnits(px) { return px / (S.unit || 1); }

    // the stage rect only changes on scroll / resize, so read it once and reuse it
    let rect = null;
    const stageRect = () => rect || (rect = el.stage.getBoundingClientRect());
    const dropRect = () => { rect = null; };
    addEventListener('scroll', dropRect, { passive: true, capture: true });
    addEventListener('resize', dropRect, { passive: true });
    function cardPoint(e) {
      const r = stageRect();
      return { x: (e.clientX - r.left) / r.width * TRAY_W - PAD, y: (e.clientY - r.top) / r.height * (CARD_H + PAD * 2) - PAD };
    }

    function onBillDown(e) {
      const b = front();
      if (!b || S.flying || S.drag) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();
      el.cash.setPointerCapture(e.pointerId);
      gsap.killTweensOf(b.drag);
      const now = performance.now();
      S.drag = { b, id: e.pointerId, x0: e.clientX, y0: e.clientY, lx: e.clientX, ly: e.clientY, lt: now, vx: 0, vy: 0, moved: false, t0: now };
      b.z = 9;
      host.classList.add('is-grabbing');
    }
    function onBillMove(e) {
      const g = S.drag;
      if (!g || e.pointerId !== g.id) return;
      const now = performance.now(), dtm = Math.max(1, now - g.lt);
      const dxp = e.clientX - g.x0, dyp = e.clientY - g.y0;
      if (!g.moved && Math.hypot(dxp, dyp) > 6) g.moved = true;
      const ivx = toUnits(e.clientX - g.lx) / dtm * 1000, ivy = toUnits(e.clientY - g.ly) / dtm * 1000;
      g.vx = lerp(g.vx, ivx, .35); g.vy = lerp(g.vy, ivy, .35);
      g.lx = e.clientX; g.ly = e.clientY; g.lt = now;
      const b = g.b;
      b.drag.x = toUnits(dxp); b.drag.y = toUnits(dyp);
      b.drag.rot = clamp(b.drag.x * .05 + g.vx * .004, -28, 28);
      b.pose.rx = clamp(-g.vy * .012, -24, 24); b.pose.ry = clamp(g.vx * .016, -30, 30);
    }
    function onBillUp(e) {
      const g = S.drag;
      if (!g || e.pointerId !== g.id) return;
      S.drag = null;
      host.classList.remove('is-grabbing');
      const b = g.b, dist = Math.hypot(b.drag.x, b.drag.y), speed = Math.hypot(g.vx, g.vy);
      if (!g.moved) { fling(b, null); return; }
      if (speed > 900 || dist > 170) fling(b, { vx: g.vx, vy: g.vy });
      else {
        b.z = SLOTS[2].z;
        gsap.to(b.drag, { x: 0, y: 0, rot: 0, duration: .9, ease: 'elastic.out(1, .45)' });
        gsap.to(b.pose, { rx: 0, ry: 0, duration: .8, ease: 'elastic.out(1, .5)' });
      }
    }

    function fling(b, v) {
      if (S.flying) return;
      S.flying = 1;
      const reduced = Lab.reduced;
      v = v || { vx: 1500, vy: -1250 };
      const sp = Math.hypot(v.vx, v.vy) || 1;
      if (sp < 1300) { v.vx *= 1300 / sp; v.vy *= 1300 / sp; }
      // fold the drag into the pose so the tween starts where the finger left it
      const P = b.pose;
      P.x += b.drag.x; P.y += b.drag.y; P.rot += b.drag.rot;
      b.drag.x = b.drag.y = b.drag.rot = 0;
      b.slot = 'fly'; b.z = 9;
      const from = { x: P.x, y: P.y };
      gsap.killTweensOf(P);
      if (reduced) gsap.to(P, { o: 0, duration: .25, onComplete: () => recycle(b) });
      else {
        const tl = gsap.timeline({ onComplete: () => recycle(b) });
        tl.to(P, { x: P.x + v.vx * .42, y: P.y + v.vy * .42 + 60, duration: .85, ease: 'power2.out' }, 0)
          .to(P, { rot: P.rot + v.vx * .03 + 30, rx: P.rx + 55, ry: P.ry - 70, s: .82, duration: .85, ease: 'power1.out' }, 0)
          .to(P, { o: 0, duration: .32, ease: 'power1.in' }, .45);
      }
      // the others move up a slot, a fresh bill slides in at the back
      bills.forEach(o => {
        if (o === b) return;
        if (o.slot === 1 || o.slot === 0) {
          o.slot += 1;
          o.z = SLOTS[o.slot].z;
          gsap.to(o.pose, { ...slotPose(o.slot), duration: reduced ? 0 : .8, ease: 'back.out(1.25)', delay: reduced ? 0 : (o.slot === 2 ? .04 : .1) });
        } else if (o.slot === -1) {
          o.slot = 0; o.z = SLOTS[0].z;
          Object.assign(o.pose, slotPose(0), { x: SLOTS[0].x - 50, y: SLOTS[0].y - 80, rot: SLOTS[0].rot - 9, s: .9, o: 0 });
          gsap.to(o.pose, { ...slotPose(0), duration: reduced ? 0 : .9, ease: 'expo.out', delay: reduced ? 0 : .22 });
        }
      });
      // +$100 travels from the bill to the total, then lands
      const cx = BILL.box.x + BILL.box.w / 2 + from.x, cy = BILL.box.y + BILL.box.h / 2 + from.y;
      flyChip(cx, cy, () => deposit());
      pulseCash();
    }

    function recycle(b) {
      b.slot = -1; b.z = 1;
      Object.assign(b.pose, slotPose(0), { o: 0 });
      S.flying = 0;
    }

    function deposit() {
      const from = S.pinned;
      const v = T.v.map((x, i) => (i >= from ? x + DEPOSIT : x));
      morphTo(T.open, v, { dur: 1.25, ease: 'elastic.out(1, 0.5)' });
      burst(250, 280, 14);
      if (!Lab.reduced) {
        gsap.fromTo(el.total, { scale: 1 }, { scale: 1.045, duration: .16, yoyo: true, repeat: 1, ease: 'power2.out', transformOrigin: '0% 60%' });
        gsap.fromTo(el.badgeIn, { scale: 1 }, { scale: 1.08, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out', delay: .05 });
        gsap.fromTo(el.tipIn, { y: 0 }, { y: -10 * S.unit, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out', delay: .08 });
        S.bump.vel += 10;
        // sparkles get a kick upwards
        dots.forEach(d => { d.vy -= 140 + Math.random() * 160; });
      }
    }

    function pulseCash() {
      if (Lab.reduced) return;
      S.comet.next = 0.35;
    }

    function flyChip(x, y, done) {
      if (Lab.reduced) { done(); return; }
      const k = S.unit;
      const chip = document.createElement('div');
      chip.className = 'w01-chip';
      chip.textContent = '+$' + DEPOSIT;
      el.fx.appendChild(chip);
      const tx = 262, ty = 272;     // lands on the total
      gsap.set(chip, { x: x * k, y: y * k, xPercent: -50, yPercent: -50, scale: .4, opacity: 0 });
      const tl = gsap.timeline({ onComplete: () => chip.remove() });
      tl.to(chip, { scale: 1.08, opacity: 1, duration: .28, ease: 'back.out(3)' })
        .to(chip, { x: tx * k, duration: .62, ease: 'power2.inOut' }, .18)
        .to(chip, { y: (Math.min(y, ty) - 120) * k, duration: .3, ease: 'power2.out' }, .18)
        .to(chip, { y: ty * k, duration: .32, ease: 'power2.in' }, .48)
        .to(chip, { scale: .5, opacity: 0, duration: .2, ease: 'power2.in', onStart: done }, .74);
    }

    function burst(x, y, n) {
      if (Lab.reduced) return;
      const k = S.unit;
      for (let i = 0; i < n; i++) {
        const s = document.createElement('i');
        s.className = 'w01-spark' + (i % 3 === 0 ? ' is-star' : '');
        el.fx.appendChild(s);
        const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 110;
        gsap.set(s, { x: x * k, y: y * k, xPercent: -50, yPercent: -50, scale: 0, rotation: Math.random() * 90 });
        gsap.timeline({ onComplete: () => s.remove() })
          .to(s, { x: (x + Math.cos(a) * r) * k, y: (y + Math.sin(a) * r * .7) * k, scale: .6 + Math.random() * .7, rotation: '+=120', duration: .7 + Math.random() * .3, ease: 'expo.out' })
          .to(s, { opacity: 0, scale: 0, duration: .35, ease: 'power1.in' }, '-=.35');
      }
    }

    /* ── pointer plumbing ── */
    host.addEventListener('pointerenter', dropRect);
    host.addEventListener('pointermove', e => {
      const r = stageRect();
      S.ptr.inside = true;
      S.ptr.mouse = e.pointerType !== 'touch';
      S.ptr.nx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      S.ptr.ny = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      const c = cardPoint(e); S.ptr.x = c.x; S.ptr.y = c.y;
      if (S.drag) onBillMove(e);
    });
    host.addEventListener('pointerleave', () => { S.ptr.inside = false; S.ptr.x = S.ptr.y = -999; });

    // chart scrub
    let leaveTimer = 0;
    const dayAt = e => clamp(Math.floor((cardPoint(e).x - COL0) / COLW), 0, 6);
    el.scrub.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      clearTimeout(leaveTimer);
      S.pressed = true;
      el.scrub.setPointerCapture(e.pointerId);
      setHover(dayAt(e));
    });
    el.scrub.addEventListener('pointermove', e => {
      if (e.pointerType === 'mouse' || S.pressed) { clearTimeout(leaveTimer); setHover(dayAt(e)); }
    });
    const release = e => {
      if (!S.pressed) return;
      S.pressed = false;
      pin(S.hover ?? S.pinned);
      if (e && e.pointerType === 'mouse') S.hover = S.pinned;
    };
    el.scrub.addEventListener('pointerup', release);
    el.scrub.addEventListener('pointercancel', () => { S.pressed = false; setHover(null); });
    el.scrub.addEventListener('pointerleave', () => {
      if (S.pressed) return;
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => setHover(null), 420);
    });
    el.scrub.addEventListener('keydown', e => {
      const map = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 };
      if (e.key in map) { e.preventDefault(); pin(S.pinned + map[e.key]); }
      else if (e.key === 'Home') { e.preventDefault(); pin(0); }
      else if (e.key === 'End') { e.preventDefault(); pin(6); }
    });
    el.scrub.addEventListener('focus', () => { if (el.scrub.matches(':focus-visible')) { S.keyFocus = true; } });
    el.scrub.addEventListener('blur', () => { S.keyFocus = false; });

    // bills: pointer drag on the stack, Enter / Space on the focused stack
    el.cash.addEventListener('pointerdown', onBillDown);
    el.cash.addEventListener('pointerup', onBillUp);
    el.cash.addEventListener('pointercancel', e => { if (S.drag && e.pointerId === S.drag.id) onBillUp(e); });
    el.cash.addEventListener('lostpointercapture', e => { if (S.drag && e.pointerId === S.drag.id) onBillUp(e); });
    el.cash.addEventListener('click', e => { if (e.detail === 0) { const b = front(); if (b) fling(b, null); } });

    // badge: $ ↔ %
    el.badge.addEventListener('click', () => {
      S.pct = !S.pct;
      if (!Lab.reduced) gsap.fromTo(el.badgeIn, { rotationX: 0 }, { rotationX: 360, duration: .7, ease: 'back.out(1.6)', transformPerspective: 400 * S.unit });
      syncNumbers();
    });

    /* ── intro ── */
    let introTl = null;
    function resetRest() {
      gsap.killTweensOf(D);
      Object.assign(D, { o: REF.open, lo: MAP.lo, hi: MAP.hi });
      REF.values.forEach((v, i) => { D['v' + i] = v; });
      T.open = REF.open; T.v = REF.values.slice();
      S.pinned = REF.day; S.hover = null; S.pct = false; S.live = S.live && true;
      S.marker.v = S.marker.t = S.tipX.v = S.tipX.t = VX[REF.day]; S.marker.vel = S.tipX.vel = 0;
      S.col.v = S.col.t = COL0 + COLW * REF.day;
      S.lastTotal = BASE + REF.values[REF.day];
      bills.forEach((b, i) => { b.slot = i < 3 ? i : -1; });
      placeBills();
      dots.forEach(d => { d.x0 = d.x = d.ix ?? d.x0; d.y = d.iy ?? d.y0; d.born = -10; d.ox = d.oy = d.vx = d.vy = 0; });
      geoDirty = true;
    }
    dots.forEach(d => { d.ix = d.x0; d.iy = d.y0; d.born = -10; });

    function finalState() {
      S.draw = 1; S.arrowK = 1; S.dotsIn = 1; S.idle = 1;
      gsap.set([el.intro, el.label, el.total, el.badgeIn, el.tipIn], { clearProps: 'all' });
      gsap.set(el.mpop, { scale: 1, svgOrigin: '0 0' });
      gsap.set(el.divs, { clearProps: 'transform' });
      gsap.set(el.days, { clearProps: 'all' });
      gsap.set([el.trendAx, ...el.trendZZ.children], { clearProps: 'strokeDasharray,strokeDashoffset' });
      el.intro.style.visibility = 'visible';
      applyDraw();
      syncNumbers({ instant: true });
    }

    function intro() {
      if (introTl) introTl.kill();
      resetRest();
      S.introDone = false;
      if (Lab.reduced) {
        finalState();
        gsap.fromTo(el.intro, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: 'power1.out' });
        S.introDone = true;
        return;
      }
      S.draw = 0; S.arrowK = 0; S.dotsIn = 0; S.idle = 0;
      S.trendDown = false;
      gsap.set(el.trendZZ, { scaleY: 1, svgOrigin: '13.7 11.5' });
      odo.total.set('$00.000', { instant: true, force: true });
      odo.badge.set('+ $000', { instant: true, force: true });
      odo.tip.set('$000', { instant: true, force: true });
      geoDirty = true; applyGeometry();
      // bills start off-card, high and to the right
      bills.forEach(b => { if (b.slot >= 0) Object.assign(b.pose, slotPose(b.slot), { x: SLOTS[b.slot].x + 330, y: SLOTS[b.slot].y - 380, rot: SLOTS[b.slot].rot + 48, rx: 58, ry: -46, s: .62, o: 0 }); });

      const tl = introTl = gsap.timeline({ onComplete: () => {
        S.introDone = true; introTl = null;
        S.draw = 1; S.arrowK = 1; S.dotsIn = 1; S.idle = 1;
        el.comet.setAttribute('opacity', '0');
        applyDraw(); geoDirty = true;
      } });
      tl.fromTo(el.intro, { autoAlpha: 0, yPercent: 8, scale: .9, rotationX: 16, transformPerspective: 1400, transformOrigin: '50% 100%' },
        { autoAlpha: 1, yPercent: 0, scale: 1, rotationX: 0, duration: 1.3, ease: 'expo.out' }, 0);
      tl.fromTo(el.label, { autoAlpha: 0, yPercent: 70 }, { autoAlpha: 1, yPercent: 0, duration: .8, ease: 'expo.out' }, .2);
      tl.fromTo(el.total, { autoAlpha: 0, yPercent: 18 }, { autoAlpha: 1, yPercent: 0, duration: .9, ease: 'expo.out' }, .26);
      tl.call(() => odo.total.set(money(BASE + REF.values[REF.day]), { fromZero: true, spin: 3, dur: 1.9, stagger: .085, order: 'ltr', ease: 'expo.out' }), null, .3);
      tl.fromTo(el.badgeIn, { autoAlpha: 0, scale: .55, transformOrigin: '0% 50%' }, { autoAlpha: 1, scale: 1, duration: .75, ease: 'back.out(2.2)' }, .62);
      tl.call(() => odo.badge.set(signedMoney(REF.values[REF.day] - REF.open), { fromZero: true, spin: 2, dur: 1.4, stagger: .08, order: 'ltr' }), null, .66);
      tl.fromTo([el.trendAx, ...el.trendZZ.children], { strokeDasharray: 40, strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut', stagger: .12 }, .8);
      bills.forEach(b => {
        if (b.slot < 0) return;
        tl.to(b.pose, { ...slotPose(b.slot), duration: 1.35, ease: 'expo.out' }, .24 + b.slot * .13);
      });
      tl.fromTo(el.divs, { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1, ease: 'expo.out', stagger: .05 }, .6);
      tl.fromTo(el.days, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .8, ease: 'expo.out', stagger: .045 }, .55);
      tl.to(S, { draw: 1, duration: 1.25, ease: 'power2.inOut', onUpdate: applyDraw, onComplete: () => { el.comet.setAttribute('opacity', '0'); applyDraw(); } }, .78);
      tl.to(S, { arrowK: 1, duration: .5, ease: 'back.out(3.2)', onUpdate: () => { geoDirty = true; } }, 1.92);
      tl.call(pingTip, null, 2.0);
      tl.fromTo(el.mpop, { scale: 0, svgOrigin: '0 0' }, { scale: 1, duration: .8, ease: 'elastic.out(1, .48)' }, 1.5);
      tl.fromTo(el.ripple, { attr: { r: 14.5 }, opacity: .5 }, { attr: { r: 56 }, opacity: 0, duration: 1, ease: 'power2.out' }, 1.56);
      tl.fromTo(el.tipIn, { autoAlpha: 0, y: -40 * S.unit, scale: .45 }, { autoAlpha: 1, y: 0, scale: 1, duration: .7, ease: 'back.out(2.4)' }, 1.66);
      tl.call(() => odo.tip.set(money(REF.values[REF.day]), { fromZero: true, spin: 1, dur: 1.05, stagger: .07, order: 'ltr' }), null, 1.68);
      tl.to(S, { dotsIn: 1, duration: 1, ease: 'power1.out' }, 1.75);
      tl.to(S, { idle: 1, duration: 1.4, ease: 'sine.inOut' }, 2.1);
      tl.call(() => { syncNumbers({ instant: true }); }, null, 3.4);
    }

    /* ── lifecycle ── */
    function resize() {
      const w = el.stage.clientWidth;
      if (!w) return;
      S.unit = w / TRAY_W;
      host.style.setProperty('--w01-px', S.unit.toFixed(5));
      bills.forEach(b => { b.last = ''; });
    }
    const ro = new ResizeObserver(() => { dropRect(); resize(); });
    ro.observe(el.stage);
    resize();

    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }

    // first paint: rest state, numbers final (the lab calls intro() when the stage is seen)
    resetRest();
    applyGeometry();
    finalState();
    if (!Lab.still) { el.intro.style.visibility = 'hidden'; }
    start();

    Lab.fonts.then(() => {
      Object.values(odo).forEach(o => o.remeasure());
    });

    const api = {
      id: 1,
      intro: () => { el.intro.style.visibility = ''; intro(); },
      replay: () => { el.intro.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; S.liveTimer = .6; if (!on) morphTo(REF.open, T.v, { dur: .6, ease: 'expo.out' }); },
      setVisible(v) { S.visible = v; if (v) start(); else stop(); },
      showFinal() { if (introTl) introTl.kill(); introTl = null; resetRest(); applyGeometry(); finalState(); },
      // test hooks
      _state: S, _data: T, _intro: () => introTl, deposit: () => { const b = front(); if (b) fling(b, null); }, pin, setHover,
    };
    return api;
  }

  Lab.register({ id: 1, slug: 'budget', mount });
})();
