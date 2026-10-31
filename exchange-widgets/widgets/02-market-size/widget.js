/* ==========================================================================
   Widget 02 · Market Size (quarterly)
   Exchange-app Widget Lab · vanilla JS + GSAP 3.13 (global `gsap`)

   Units: the card is 500 × 203 u, 1u = 1px of the reference shot.
   CSS scales 1u with the container width (--u); JS converts with `unit`.

   Motion map
   · intro    the card rises, the blue light switches on from the corner,
              "$12B" spins up, the subtitle wipes in, the white line draws to
              today, the dashed rule drops, the marker pops, the grey
              forecast draws on, the tooltip rises
   · scrub    pointer / touch / arrow keys pick a quarter: the marker rides
              the curve on a spring and the white/grey split follows it, the
              tooltip leans after it and turns red or green, every number
              rolls, a quarter tag appears under the rule. Release: back to today.
   · light    the pointer lights the card's rim and glass, the blue light
              leans toward it, the card tilts in 3D
   · menu     ⋮ morphs into ×: quarterly / yearly (the curve morphs) and the
              forecast on / off (the grey line draws or retracts)
   · idle     the light breathes and drifts, a glow runs along the line into
              the marker, the marker breathes, the dashes flow down
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab) { console.warn('[widget 02] lab.js is missing'); return; }

  /* ───────────────────────────── design constants ───────────────────────────── */
  const CW = 500, CH = 203;
  const VX = [222, 273, 316.5, 369, 394.5, 413.3, 467, 518];   // points; 0 and 7 sit outside the card
  const Y_MIN = 214, Y_MAX = 92.8;                               // lowest value → 214, highest → 92.8
  const PICK = [1, 2, 3, 4, 5, 6];                               // points you can scrub to
  const TIP_LIFT = 26;                                           // marker centre → nib tip
  const LINE_W = 6.2;
  const SETS = {
    quarter: {
      unit: 'quarter',
      labels: ['Q3 ’25', 'Q4 ’25', 'Q1 ’26', 'Q2 ’26', 'Q3 ’26', 'Q4 ’26', 'Q1 ’27', 'Q2 ’27'],
      values: [10.8, 11.92, 11.43, 12.3, 12.0, 11.82, 12.7, 11.87],
      now: 4,
    },
    year: {
      unit: 'year',
      labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
      values: [36.2, 40.8, 38.9, 44.6, 43.1, 47.9, 46.8, 51.2],
      now: 5,
    },
  };
  const TONE = { down: 'is-down', up: 'is-up' };

  /* ───────────────────────────── helpers ───────────────────────────── */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const r2 = n => Math.round(n * 100) / 100;
  const mkSpring = (v, k, c) => ({ v, t: v, vel: 0, k, c });
  function stepSpring(s, dt) {
    const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
    for (let i = 0; i < n; i++) { s.vel += (-s.k * (s.v - s.t) - s.c * s.vel) * h; s.v += s.vel * h; }
  }
  const pctText = p => (p < 0 ? '-' : '+') + Math.abs(p).toFixed(1) + '%';

  /* monotone cubic (flat at every peak and trough, no overshoot) */
  function tangents(xs, ys) {
    const n = xs.length, m = new Array(n).fill(0);
    for (let i = 1; i < n - 1; i++) {
      const h0 = xs[i] - xs[i - 1], h1 = xs[i + 1] - xs[i];
      const s0 = (ys[i] - ys[i - 1]) / h0, s1 = (ys[i + 1] - ys[i]) / h1;
      const p = (s0 * h1 + s1 * h0) / (h0 + h1);
      m[i] = (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), .5 * Math.abs(p)) || 0;
    }
    return m;   // the two outside points stay flat (they are troughs below the card)
  }
  function curve(ys) {
    const m = tangents(VX, ys);
    let d = `M${r2(VX[0])},${r2(ys[0])}`;
    for (let i = 0; i < VX.length - 1; i++) {
      const dx = VX[i + 1] - VX[i];
      d += `C${r2(VX[i] + dx / 3)},${r2(ys[i] + m[i] * dx / 3)} ${r2(VX[i + 1] - dx / 3)},${r2(ys[i + 1] - m[i + 1] * dx / 3)} ${r2(VX[i + 1])},${r2(ys[i + 1])}`;
    }
    return { d, m, ys };
  }
  function yAt(c, x) {
    const n = VX.length;
    if (x <= VX[0]) return c.ys[0];
    if (x >= VX[n - 1]) return c.ys[n - 1];
    let i = 0;
    while (x > VX[i + 1]) i++;
    const dx = VX[i + 1] - VX[i], t = (x - VX[i]) / dx, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * c.ys[i] + (t3 - 2 * t2 + t) * dx * c.m[i] + (-2 * t3 + 3 * t2) * c.ys[i + 1] + (t3 - t2) * dx * c.m[i + 1];
  }

  /* ───────────────────────────── rolling digits ───────────────────────────── */
  const STRIP = Array.from({ length: 60 }, (_, i) => i % 10).join('\n');
  const REST = 20, PADX = .1;
  const isDigit = ch => ch >= '0' && ch <= '9';
  function measurer(el) {
    // a hidden probe inside the odometer inherits family, weight, tracking and features (cv01)
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:pre;font-size:100px;line-height:1;pointer-events:none';
    el.appendChild(probe);
    const w = t => { probe.textContent = t; return probe.getBoundingClientRect().width / 100; };
    const adv = {}, kern = {};
    return {
      adv: ch => adv[ch] ?? (adv[ch] = w(ch)),
      kern: (a, b) => kern[a + b] ?? (kern[a + b] = w(a + b) - w(a) - w(b)),
    };
  }
  class Odo {
    constructor(el) { this.el = el; this.cells = []; this.text = ''; this.hide = new Set(); this.m = null; this.target = 0; el.setAttribute('aria-hidden', 'true'); }
    metrics() { return this.m || (this.m = measurer(this.el)); }
    remeasure() {
      this.m = null;
      this.cells.forEach((c, i) => { c.w = this.widthFor(this.text, i, this.hide); this.paint(c); });
      this.target = this.cells.reduce((sum, c, i) => sum + Math.max(0, this.widthFor(this.text, i, this.hide)), 0);
    }
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
        c.idx = k === 'd' ? REST + +ch : 0;
      } else if (k === 'g') c.s.textContent = ch;
      c.ch = ch;
    }
    paint(c) {
      c.el.style.width = Math.max(0, c.w + PADX * 2).toFixed(4) + 'em';
      c.el.style.opacity = c.o;
      if (c.kind === 'd') c.s.style.transform = `translate3d(0,${(-c.idx * 1.2).toFixed(4)}em,0)`;
    }
    widthFor(text, i, hide) {
      if (hide.has(i)) return -PADX * 2;
      const m = this.metrics();
      let j = i + 1;
      while (j < text.length && hide.has(j)) j++;
      return m.adv(text[i]) + (j < text.length ? m.kern(text[i], text[j]) : 0);
    }
    /* opts: dir, dur, stagger, fromZero, spin, order ('ltr'|'rtl'), instant, hide (Set of indices) */
    set(text, o = {}) {
      const hide = o.hide || new Set();
      const same = text === this.text && [...hide].join() === [...this.hide].join();
      if (same && !o.fromZero && !o.force) return;
      const dur = o.dur ?? .85, stagger = o.stagger ?? .045, instant = o.instant || Lab.reduced;
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
        const ch = text[i], hidden = hide.has(i);
        const delay = instant ? 0 : (o.order === 'ltr' ? i : (n - 1 - i)) * stagger;
        const w = this.widthFor(text, i, hide), op = hidden ? 0 : 1;
        gsap.killTweensOf(c);
        if (instant) {
          this.kind(c, ch); c.w = w; c.o = op; c.isNew = false;
          if (c.kind === 'd') c.idx = REST + +ch;
          this.paint(c); return;
        }
        const was = c.ch;
        if (isDigit(ch) && c.kind === 'd' && !c.isNew) {
          const d = +ch;
          let start = c.idx, target = REST + d;
          if (o.fromZero) { start = 0; target = REST + d + 10 * Math.min(3, o.spin ?? 2); }
          else {
            const dir = o.dir || (target >= start ? 1 : -1);
            if (dir > 0) { while (target <= start && target + 10 < 60) target += 10; }
            else { while (target >= start && target - 10 >= 0) target -= 10; }
            if (target === start && was !== ch) target += dir > 0 ? 10 : -10;
          }
          c.idx = start; c.ch = ch;
          gsap.to(c, { idx: target, w, o: op, duration: dur, delay, ease: o.ease || 'expo.out',
            onUpdate: () => this.paint(c), onComplete: () => { c.idx = REST + d; this.paint(c); } });
        } else {
          const dir = o.dir || 1;
          if (was !== ch || c.isNew) {
            this.kind(c, ch);
            if (c.kind === 'd') {
              const d = +ch;
              c.idx = o.fromZero ? 0 : REST + d - 3 * dir;
              gsap.to(c, { idx: o.fromZero ? REST + d + 10 * Math.min(3, o.spin ?? 2) : REST + d, duration: dur, delay, ease: 'expo.out',
                onUpdate: () => this.paint(c), onComplete: () => { c.idx = REST + d; this.paint(c); } });
            } else gsap.fromTo(c.s, { yPercent: 70 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur * .7, delay, ease: 'expo.out' });
          }
          c.isNew = false;
          gsap.to(c, { w, o: op, duration: dur * .8, delay, ease: 'expo.out', onUpdate: () => this.paint(c) });
        }
      });
      this.cells = cells; this.text = text; this.hide = hide;
      this.target = cells.reduce((sum, c, i) => sum + Math.max(0, this.widthFor(text, i, hide)), 0);
    }
    exit(c, instant) {
      gsap.killTweensOf(c);
      if (instant) { c.el.remove(); return; }
      gsap.to(c, { w: -PADX * 2, o: 0, duration: .45, ease: 'expo.out', onUpdate: () => this.paint(c), onComplete: () => c.el.remove() });
    }
  }

  /* ───────────────────────────── markup ───────────────────────────── */
  function template(u) {
    return `<div class="w02-stage">
  <div class="w02-intro">
    <div class="w02-tilt">
      <div class="w02-card">
        <div class="w02-glow" aria-hidden="true"><i class="g-a"></i><i class="g-b"></i><i class="g-c"></i></div>
        <svg class="w02-svg" viewBox="0 0 ${CW} ${CH}" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="${u}-l"><rect class="js-cl" x="-20" y="-20" width="414.5" height="${CH + 40}"/></clipPath>
            <clipPath id="${u}-r"><rect class="js-cr" x="394.5" y="-20" width="200" height="${CH + 40}"/></clipPath>
            <linearGradient class="js-shade" id="${u}-s" gradientUnits="userSpaceOnUse" x1="225" y1="0" x2="394.5" y2="0">
              <stop offset="0" stop-color="#05061c" stop-opacity="0"/><stop offset=".5" stop-color="#05061c" stop-opacity=".42"/><stop offset="1" stop-color="#05061c" stop-opacity=".92"/>
            </linearGradient>
          </defs>
          <path class="js-area" clip-path="url(#${u}-l)" fill="url(#${u}-s)"/>
          <path class="js-grey w02-grey" clip-path="url(#${u}-r)" fill="none" stroke-width="${LINE_W}" stroke-linecap="round"/>
          <line class="js-dash w02-dash" x1="394.5" x2="394.5" y1="148" y2="${CH + 4}"/>
          <path class="js-glint" clip-path="url(#${u}-l)" fill="none" stroke="#9cbcff" stroke-width="16" stroke-linecap="round" opacity="0"/>
          <path class="js-white" clip-path="url(#${u}-l)" fill="none" stroke="#fbfcff" stroke-width="${LINE_W}" stroke-linecap="round"/>
        </svg>
        <div class="w02-sheen" aria-hidden="true"></div>
        <div class="w02-label">Market Size</div>
        <div class="w02-value"><span class="w02-odo js-val"></span></div>
        <p class="w02-sub"><b><span class="w02-odo js-subpct"></span> <span class="w02-word js-word">decrease</span></b> from the previous <span class="js-unit">quarter</span>.</p>
        <div class="w02-marker" aria-hidden="true"><i class="w02-halo"></i><i class="w02-ripple"></i></div>
        <div class="w02-tip" aria-hidden="true"><div class="w02-tip-in"><div class="w02-tip-pill"><span class="w02-odo js-tip"></span></div><i class="w02-tip-nib"></i></div></div>
        <div class="w02-chip" aria-hidden="true"><span class="js-chip">Q3 ’26</span></div>
        <div class="w02-scrub" tabindex="0" role="slider" aria-label="Quarter" aria-valuemin="1" aria-valuemax="6"></div>
        <button class="w02-kebab" type="button" aria-label="Chart options" aria-haspopup="menu" aria-expanded="false"><i></i><i></i><i></i></button>
        <div class="w02-menu" role="menu" aria-label="Chart options">
          <button type="button" role="menuitemradio" aria-checked="true" data-set="quarter"><i class="w02-check"></i>Quarterly</button>
          <button type="button" role="menuitemradio" aria-checked="false" data-set="year"><i class="w02-check"></i>Yearly</button>
          <hr>
          <button type="button" role="menuitemcheckbox" aria-checked="true" data-forecast><span>Forecast</span><i class="w02-switch"></i></button>
        </div>
      </div>
      <div class="w02-rim" aria-hidden="true"></div>
    </div>
  </div>
  <p class="w02-sr js-live" aria-live="polite"></p>
</div>`;
  }

  /* ───────────────────────────── the widget ───────────────────────────── */
  let counter = 0;

  function mount(host) {
    const u = `w02x${++counter}`;
    host.classList.add('w02');
    host.setAttribute('dir', 'ltr');
    host.setAttribute('lang', 'en');
    host.innerHTML = template(u);
    const $ = s => host.querySelector(s), $$ = s => Array.from(host.querySelectorAll(s));
    const el = {
      stage: $('.w02-stage'), intro: $('.w02-intro'), tilt: $('.w02-tilt'), card: $('.w02-card'), rim: $('.w02-rim'),
      glow: $('.w02-glow'), gA: $('.g-a'), gB: $('.g-b'), gC: $('.g-c'), sheen: $('.w02-sheen'),
      cl: $('.js-cl'), cr: $('.js-cr'), shade: $('.js-shade'), area: $('.js-area'), grey: $('.js-grey'), dash: $('.js-dash'),
      glint: $('.js-glint'), white: $('.js-white'),
      label: $('.w02-label'), value: $('.w02-value'), val: $('.js-val'), sub: $('.w02-sub'), word: $('.js-word'), unitW: $('.js-unit'),
      marker: $('.w02-marker'), ripple: $('.w02-ripple'), tip: $('.w02-tip'), tipIn: $('.w02-tip-in'), chip: $('.w02-chip'), chipT: $('.js-chip'),
      scrub: $('.w02-scrub'), kebab: $('.w02-kebab'), dots: $$('.w02-kebab i'), menu: $('.w02-menu'), items: $$('.w02-menu button'),
      live: $('.js-live'),
    };
    const odo = { val: new Odo($('.js-val')), tip: new Odo($('.js-tip')), sub: new Odo($('.js-subpct')) };

    const S = {
      t: 0, unit: 1, running: false, idle: 1, draw: 1, fore: 1, dashOff: 0, glint: { next: 2.4, run: -1 },
      set: 'quarter', now: SETS.quarter.now, pick: null, pressed: false, keyFocus: false, forecast: true, menuOpen: false, live: false, liveT: 0,
      ptr: { inside: false, mouse: false, nx: 0, ny: 0, x: -999, y: -999 },
      split: mkSpring(VX[4], 210, 22), tipX: mkSpring(VX[4], 150, 19), tipRot: mkSpring(0, 210, 13), bump: mkSpring(0, 380, 14),
      tiltX: mkSpring(0, 110, 17), tiltY: mkSpring(0, 110, 17), lean: mkSpring(0, 80, 15), leanY: mkSpring(0, 80, 15), hover: mkSpring(0, 120, 20),
      chip: mkSpring(0, 160, 22), fit: mkSpring(1, 170, 20), chipHalf: 24, lastTone: null, lastVal: 12,
    };
    const D = {};                                    // displayed values (tweened)
    let T = SETS.quarter.values.slice();             // target values
    T.forEach((v, i) => { D['v' + i] = v; });
    let geo = null, geoDirty = true, lineLen = 0, geoVer = 0;

    /* ── value → y ── */
    function ys() {
      const v = T.map((_, i) => D['v' + i]);
      const mn = Math.min(...v), mx = Math.max(...v);
      return v.map(x => Y_MIN - (x - mn) / ((mx - mn) || 1) * (Y_MIN - Y_MAX));
    }
    function applyGeometry() {
      geo = curve(ys());
      const area = `${geo.d}L${VX[VX.length - 1]},${CH + 30}L${VX[0]},${CH + 30}Z`;
      el.white.setAttribute('d', geo.d); el.grey.setAttribute('d', geo.d); el.glint.setAttribute('d', geo.d); el.area.setAttribute('d', area);
      lineLen = el.white.getTotalLength();
      geoVer++;
      geoDirty = false;
    }
    function lengthAtX(x) {   // path length from the start to x (binary search)
      let lo = 0, hi = lineLen;
      for (let k = 0; k < 22; k++) { const mid = (lo + hi) / 2; if (el.white.getPointAtLength(mid).x < x) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    }

    /* ── numbers ── */
    const shown = () => (S.pick ?? S.now);
    function syncNumbers(o = {}) {
      const set = SETS[S.set], i = shown(), v = T[i], prev = T[i - 1];
      const pct = (v - prev) / prev * 100, up = pct >= 0, fore = i > S.now;
      host.classList.toggle('is-picking', S.pick !== null);
      const txt = '$' + v.toFixed(1) + 'B';
      const hide = txt.endsWith('.0B') ? new Set([txt.length - 3, txt.length - 2]) : new Set();
      const dir = Math.sign(v - S.lastVal) || 1;
      odo.val.set(txt, { hide, dir, dur: o.dur ?? .9, stagger: .05, instant: o.instant });
      fitValue(o.instant);
      odo.tip.set(pctText(pct), { dir: up ? 1 : -1, dur: .8, instant: o.instant });
      odo.sub.set(pctText(pct), { dir: up ? 1 : -1, dur: .8, instant: o.instant });
      S.lastVal = v;
      const word = fore ? 'forecast' : (up ? 'increase' : 'decrease');
      if (el.word.textContent !== word) {
        el.word.textContent = word;
        if (!o.instant && !Lab.reduced) gsap.fromTo(el.word, { yPercent: 60 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out' });
      }
      if (el.unitW.textContent !== set.unit) el.unitW.textContent = set.unit;
      const tone = up ? 'up' : 'down';
      if (tone !== S.lastTone) { host.classList.remove(TONE.up, TONE.down); host.classList.add(TONE[tone]); S.lastTone = tone; }
      host.classList.toggle('is-fore', fore);
      el.chipT.textContent = set.labels[i] + (fore ? ' · est.' : '');
      S.chipHalf = el.chipT.getBoundingClientRect().width / (S.unit || 1) / 2 / Math.max(.6, .6 + .4 * S.chip.v);
      el.scrub.setAttribute('aria-valuenow', String(i));
      el.scrub.setAttribute('aria-valuetext', `${set.labels[i]}: $${v.toFixed(1)} billion, ${pctText(pct)} from the previous ${set.unit}${fore ? ' (forecast)' : ''}`);
      el.live.textContent = `${set.labels[i]}. Market size $${v.toFixed(1)} billion, ${pctText(pct)}.`;
    }

    // a value with a decimal ("$11.9B") is wider than "$12B": shrink it so it never runs into the chart
    const VALUE_FS = 87, VALUE_MAX = 214;
    function fitValue(instant) {
      S.fit.t = Math.min(1, VALUE_MAX / Math.max(1, odo.val.target * VALUE_FS));
      if (instant || Lab.reduced) { S.fit.v = S.fit.t; S.fit.vel = 0; }
    }

    function morphTo(values, o = {}) {
      T = values.slice();
      const to = {};
      T.forEach((v, i) => { to['v' + i] = v; });
      gsap.killTweensOf(D);
      if (Lab.reduced || o.instant) { Object.assign(D, to); geoDirty = true; }
      else gsap.to(D, { ...to, duration: o.dur ?? 1.1, ease: o.ease || 'elastic.out(1, 0.6)', onUpdate: () => { geoDirty = true; } });
      geoDirty = true;
      syncNumbers();
    }

    /* ── picking a point ── */
    function setPick(i) {
      const prev = shown();
      S.pick = i;
      const now = shown();
      S.split.t = VX[now];
      if (now !== prev) { if (!Lab.reduced) S.bump.vel += 7; syncNumbers(); }
    }
    const maxPick = () => (S.forecast ? 6 : S.now);
    function pickAt(cx) {
      let best = 1, bd = Infinity;
      PICK.forEach(i => { if (i > maxPick()) return; const d = Math.abs(VX[i] - cx); if (d < bd) { bd = d; best = i; } });
      return best;
    }

    /* ── pointer ── */
    let rect = null;
    const stageRect = () => rect || (rect = el.stage.getBoundingClientRect());
    const dropRect = () => { rect = null; };
    addEventListener('scroll', dropRect, { passive: true, capture: true });
    addEventListener('resize', dropRect, { passive: true });
    function cardPoint(e) { const r = stageRect(); return { x: (e.clientX - r.left) / r.width * CW, y: (e.clientY - r.top) / r.height * CH }; }

    host.addEventListener('pointerenter', dropRect);
    host.addEventListener('pointermove', e => {
      const r = stageRect(), c = cardPoint(e);
      S.ptr.inside = true; S.ptr.mouse = e.pointerType !== 'touch';
      S.ptr.nx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      S.ptr.ny = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      S.ptr.x = c.x; S.ptr.y = c.y;
      el.rim.style.setProperty('--mx', (c.x / CW * 100).toFixed(2) + '%');
      el.rim.style.setProperty('--my', (c.y / CH * 100).toFixed(2) + '%');
    });
    host.addEventListener('pointerleave', () => { S.ptr.inside = false; });

    let backTimer = 0;
    const backSoon = ms => { clearTimeout(backTimer); backTimer = setTimeout(() => { if (!S.pressed && !S.keyFocus) setPick(null); }, ms); };
    el.scrub.addEventListener('pointerdown', e => {
      if (S.menuOpen) { closeMenu(); return; }
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      clearTimeout(backTimer);
      S.pressed = true;
      el.scrub.setPointerCapture(e.pointerId);
      setPick(pickAt(cardPoint(e).x));
    });
    el.scrub.addEventListener('pointermove', e => {
      if (S.menuOpen) return;
      if (e.pointerType === 'mouse' || S.pressed) { clearTimeout(backTimer); setPick(pickAt(cardPoint(e).x)); }
    });
    const lift = e => { if (!S.pressed) return; S.pressed = false; backSoon(e && e.pointerType === 'mouse' ? 1400 : 1100); };
    el.scrub.addEventListener('pointerup', lift);
    el.scrub.addEventListener('pointercancel', () => { S.pressed = false; backSoon(300); });
    el.scrub.addEventListener('pointerleave', () => { if (!S.pressed) backSoon(650); });
    el.scrub.addEventListener('keydown', e => {
      const cur = shown();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPick(Math.max(1, cur - 1)); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPick(Math.min(maxPick(), cur + 1)); }
      else if (e.key === 'Home') { e.preventDefault(); setPick(1); }
      else if (e.key === 'End') { e.preventDefault(); setPick(maxPick()); }
      else if (e.key === 'Escape') { setPick(null); }
    });
    el.scrub.addEventListener('focus', () => { S.keyFocus = el.scrub.matches(':focus-visible'); });
    el.scrub.addEventListener('blur', () => { S.keyFocus = false; backSoon(200); });

    /* ── menu ── */
    function openMenu() {
      if (S.menuOpen) return;
      S.menuOpen = true;
      host.classList.add('is-menu');
      el.kebab.setAttribute('aria-expanded', 'true');
      setPick(null);
      const items = el.menu.querySelectorAll('button, hr');
      gsap.killTweensOf([el.menu, ...items]);
      gsap.set(el.menu, { visibility: 'visible' });
      if (Lab.reduced) { gsap.set(el.menu, { opacity: 1, scale: 1 }); gsap.set(items, { opacity: 1, x: 0 }); }
      else {
        gsap.fromTo(el.menu, { opacity: 0, scale: .82, y: -6 * S.unit }, { opacity: 1, scale: 1, y: 0, duration: .45, ease: 'back.out(1.8)', transformOrigin: '100% 0%' });
        gsap.fromTo(items, { opacity: 0, x: 10 * S.unit }, { opacity: 1, x: 0, duration: .4, ease: 'expo.out', stagger: .045, delay: .06 });
      }
      morphKebab(true);
      el.items[0].focus({ preventScroll: true });
    }
    function closeMenu(refocus) {
      if (!S.menuOpen) return;
      S.menuOpen = false;
      host.classList.remove('is-menu');
      el.kebab.setAttribute('aria-expanded', 'false');
      gsap.killTweensOf(el.menu);
      gsap.to(el.menu, { opacity: 0, scale: .9, y: -4 * S.unit, duration: Lab.reduced ? 0 : .22, ease: 'power3.in', transformOrigin: '100% 0%', onComplete: () => gsap.set(el.menu, { visibility: 'hidden' }) });
      morphKebab(false);
      if (refocus) el.kebab.focus({ preventScroll: true });
    }
    function morphKebab(open) {   // three dots ⇄ ×
      const d = Lab.reduced ? 0 : .5, gap = 8.75 * S.unit;
      gsap.to(el.dots[0], { y: open ? gap : 0, rotation: open ? 45 : 0, scaleX: open ? 3.6 : 1, scaleY: open ? .78 : 1, duration: d, ease: 'back.out(1.6)' });
      gsap.to(el.dots[2], { y: open ? -gap : 0, rotation: open ? -45 : 0, scaleX: open ? 3.6 : 1, scaleY: open ? .78 : 1, duration: d, ease: 'back.out(1.6)' });
      gsap.to(el.dots[1], { scale: open ? 0 : 1, opacity: open ? 0 : 1, duration: d * .6, ease: 'power2.out' });
    }
    el.kebab.addEventListener('click', e => { e.stopPropagation(); S.menuOpen ? closeMenu(true) : openMenu(); });
    el.menu.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.set) switchSet(b.dataset.set);
      else if (b.hasAttribute('data-forecast')) toggleForecast();
      setTimeout(() => closeMenu(e.detail === 0), 200);   // let the check animate, then show the chart
    });
    el.menu.addEventListener('keydown', e => {
      const list = el.items, i = list.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'Tab') closeMenu(false);
    });
    document.addEventListener('pointerdown', e => { if (S.menuOpen && !el.menu.contains(e.target) && !el.kebab.contains(e.target)) closeMenu(false); });

    function switchSet(name) {
      if (name === S.set) return;
      S.set = name;
      el.items.forEach(b => { if (b.dataset.set) b.setAttribute('aria-checked', String(b.dataset.set === name)); });
      el.scrub.setAttribute('aria-label', name === 'year' ? 'Year' : 'Quarter');
      S.now = SETS[name].now; S.pick = null;
      S.split.t = VX[S.now];
      morphTo(SETS[name].values, { dur: 1.3, ease: 'elastic.out(1, 0.55)' });
      if (!Lab.reduced) { gsap.fromTo(el.value, { y: 0 }, { y: -6 * S.unit, duration: .18, yoyo: true, repeat: 1, ease: 'power2.out' }); pulseGlow(); }
    }
    function toggleForecast() {
      S.forecast = !S.forecast;
      el.items.forEach(b => { if (b.hasAttribute('data-forecast')) b.setAttribute('aria-checked', String(S.forecast)); });
      if (S.pick && S.pick > S.now) setPick(null);
      gsap.killTweensOf(S, 'fore');
      gsap.to(S, { fore: S.forecast ? 1 : 0, duration: Lab.reduced ? 0 : (S.forecast ? .9 : .55), ease: S.forecast ? 'power2.out' : 'power3.in' });
    }

    function pulseGlow() {
      gsap.fromTo(el.glow, { opacity: 1 }, { opacity: .55, duration: .16, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    }

    /* ── live data ── */
    function liveStep() {
      const set = SETS[S.set], base = set.values, span = Math.max(...base) - Math.min(...base);
      const v = T.map((x, i) => {
        if (i === 0 || i === 7) return x;
        const drift = (Math.random() - .5) * span * (i >= S.now ? .12 : .04);
        return Math.round(clamp(x + drift, Math.min(...base) + span * .05, Math.max(...base) - span * .02) * 100) / 100;
      });
      morphTo(v, { dur: 1.1, ease: 'expo.out' });
      if (!Lab.reduced) S.bump.vel += 6;
    }

    /* ── per-frame render ── */
    const written = new WeakMap(), attrs = new WeakMap();
    function put(node, tf) { if (written.get(node) !== tf) { node.style.transform = tf; written.set(node, tf); } }
    function attr(node, name, val) { const m = attrs.get(node) || {}; if (m[name] !== val) { node.setAttribute(name, val); m[name] = val; attrs.set(node, m); } }
    // path length up to the split, cached per split position and geometry
    let lsKey = '', lsVal = 0;
    function splitLength(sx) { const key = r2(sx) + '|' + geoVer; if (key !== lsKey) { lsKey = key; lsVal = lengthAtX(sx); } return lsVal; }

    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const reduced = Lab.reduced, idle = reduced ? 0 : S.idle, k = S.unit, p = S.ptr;
      const mouseIn = p.inside && p.mouse && !reduced;

      S.tiltX.t = mouseIn ? -p.ny * 6 : 0;
      S.tiltY.t = mouseIn ? p.nx * 4.5 : 0;
      S.lean.t = mouseIn ? p.nx : 0; S.leanY.t = mouseIn ? p.ny : 0;
      S.hover.t = mouseIn ? 1 : 0;
      S.chip.t = (S.pick !== null) ? 1 : 0;
      S.tipX.t = S.split.v;
      [S.tiltX, S.tiltY, S.lean, S.leanY, S.hover, S.split, S.tipX, S.bump, S.chip, S.fit].forEach(s => stepSpring(s, dt));
      S.tipRot.t = clamp((S.split.v - S.tipX.v) * .35 + S.tipX.vel * .005, -14, 14);
      stepSpring(S.tipRot, dt);

      if (geoDirty) applyGeometry();
      const sx = S.split.v, sy = yAt(geo, sx);

      put(el.val, `scale(${S.fit.v.toFixed(4)})`);
      // card tilt
      put(el.tilt, `perspective(${(1400 * k).toFixed(1)}px) rotateX(${S.tiltX.v.toFixed(3)}deg) rotateY(${S.tiltY.v.toFixed(3)}deg)`);
      // the light: breathes, drifts and leans toward the pointer
      const br = idle * Math.sin(S.t * .9);
      put(el.gA, `translate3d(${((S.lean.v * 10 + br * 3) * k).toFixed(2)}px,${((S.leanY.v * 6) * k).toFixed(2)}px,0) scale(${(1 + br * .025).toFixed(4)})`);
      const cx = 185 + idle * Math.sin(S.t * .37) * 22 + S.lean.v * 34, cy = 200 + idle * Math.cos(S.t * .29) * 12 + S.leanY.v * 18;
      put(el.gC, `translate3d(${(cx * k).toFixed(2)}px,${(cy * k).toFixed(2)}px,0)`);
      put(el.sheen, `translate3d(${((p.x) * k).toFixed(1)}px,${((p.y) * k).toFixed(1)}px,0)`);
      el.sheen.style.opacity = (S.hover.v * .9).toFixed(3);
      el.rim.style.opacity = (S.hover.v).toFixed(3);

      // split between history (white) and the rest (grey)
      attr(el.cl, 'width', r2(sx + 20));
      attr(el.cr, 'x', r2(sx));
      attr(el.shade, 'x1', r2(sx - 170)); attr(el.shade, 'x2', r2(sx));

      // forecast draw / retract and the intro draw
      if (S.draw < 1 || S.fore < 1) {
        const Ls = splitLength(sx), L = lineLen;
        if (S.draw < 1) { el.white.style.strokeDasharray = `${(Ls * S.draw).toFixed(1)} ${L + 20}`; }
        else el.white.style.strokeDasharray = '';
        const vis = (L - Ls) * Math.min(S.fore, S.draw >= 1 ? 1 : 0);
        el.grey.style.strokeDasharray = `${Math.max(.01, vis).toFixed(1)} ${L + 20}`;
        el.grey.style.strokeDashoffset = (-Ls).toFixed(1);
        el.grey.style.opacity = vis < .5 ? 0 : 1;
      } else if (el.grey.style.strokeDasharray) {
        el.white.style.strokeDasharray = ''; el.grey.style.strokeDasharray = ''; el.grey.style.strokeDashoffset = ''; el.grey.style.opacity = '';
      }

      // dashed rule, marker, tooltip, quarter tag
      S.dashOff = (S.dashOff + dt * 9 * idle) % 8;
      attr(el.dash, 'x1', r2(sx)); attr(el.dash, 'x2', r2(sx)); attr(el.dash, 'y1', r2(sy + 10.5));
      el.dash.style.strokeDashoffset = (-S.dashOff).toFixed(2);
      const breathe = idle * Math.sin(S.t * 2.6) * .03;
      put(el.marker, `translate3d(${(sx * k).toFixed(2)}px,${(sy * k).toFixed(2)}px,0) scale(${(1 + S.bump.v * .07 + breathe).toFixed(4)})`);
      const tx = S.tipX.v, ty = yAt(geo, tx) - TIP_LIFT;
      put(el.tip, `translate3d(${(tx * k).toFixed(2)}px,${(ty * k).toFixed(2)}px,0) rotate(${S.tipRot.v.toFixed(2)}deg)`);
      const chx = clamp(sx, S.chipHalf + 7, CW - S.chipHalf - 7);   // keep the tag inside the card
      put(el.chip, `translate3d(${(chx * k).toFixed(2)}px,${((CH - 13) * k).toFixed(2)}px,0) scale(${(.6 + .4 * S.chip.v).toFixed(3)})`);
      el.chip.style.opacity = clamp(S.chip.v, 0, 1).toFixed(3);

      // a glow runs along the line into the marker every few seconds
      renderGlint(dt, idle, sx);

      if (S.live && !reduced) { S.liveT -= dt; if (S.liveT <= 0) { S.liveT = 2.3; liveStep(); } }
    }

    function renderGlint(dt, idle, sx) {
      const G = S.glint;
      if (idle <= 0 || S.draw < 1) { if (G.run >= 0) { G.run = -1; el.glint.setAttribute('opacity', '0'); } return; }
      if (G.run < 0) { G.next -= dt; if (G.next > 0) return; G.run = 0; }
      G.run += dt / 1.35;
      const Ls = splitLength(sx), seg = 46;
      const e = G.run < .5 ? 2 * G.run * G.run : 1 - Math.pow(-2 * G.run + 2, 2) / 2;
      const head = e * (Ls + seg * .3);
      el.glint.style.strokeDasharray = `${seg} ${lineLen + seg * 2}`;
      el.glint.style.strokeDashoffset = (-(head - seg)).toFixed(1);
      el.glint.setAttribute('opacity', (Math.min(1, G.run * 5, (1 - G.run) * 6) * .5 * idle).toFixed(3));
      if (G.run >= 1) {
        G.run = -1; G.next = 3.4 + Math.random() * 2.2; el.glint.setAttribute('opacity', '0');
        ripple();
      }
    }
    function ripple() {
      gsap.killTweensOf(el.ripple);
      gsap.fromTo(el.ripple, { scale: 1, opacity: .7 }, { scale: 3.2, opacity: 0, duration: .9, ease: 'power2.out' });
    }

    /* ── intro ── */
    let introTl = null;
    function resetRest() {
      gsap.killTweensOf(D); gsap.killTweensOf(S);
      S.set = 'quarter'; S.now = SETS.quarter.now; S.pick = null; S.forecast = true; S.fore = 1; S.draw = 1;
      T = SETS.quarter.values.slice(); T.forEach((v, i) => { D['v' + i] = v; });
      el.items.forEach(b => b.setAttribute('aria-checked', String(b.dataset.set ? b.dataset.set === 'quarter' : true)));
      S.split.v = S.split.t = S.tipX.v = S.tipX.t = VX[S.now]; S.split.vel = S.tipX.vel = 0;
      S.lastVal = T[S.now];
      if (S.menuOpen) closeMenu(false);
      geoDirty = true;
    }
    function finalState() {
      S.draw = 1; S.fore = 1; S.idle = 1;
      gsap.set([el.intro, el.label, el.value, el.sub, el.tipIn, el.glow, el.dash, ...el.dots], { clearProps: 'all' });
      gsap.set(el.marker, { clearProps: 'opacity' });
      el.sub.style.clipPath = '';
      el.intro.style.visibility = 'visible';
      syncNumbers({ instant: true });
    }
    function intro() {
      if (introTl) introTl.kill();
      resetRest();
      if (Lab.reduced) {
        applyGeometry(); finalState();
        gsap.fromTo(el.intro, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: 'power1.out' });
        return;
      }
      applyGeometry();
      S.draw = 0; S.fore = 0; S.idle = 0;
      odo.val.set('$00.0B', { instant: true, force: true, hide: new Set([3, 4]) });
      odo.tip.set('-0.0%', { instant: true, force: true });
      odo.sub.set('-0.0%', { instant: true, force: true });
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; S.draw = 1; S.fore = S.forecast ? 1 : 0; S.idle = 1; } });
      tl.fromTo(el.intro, { autoAlpha: 0, yPercent: 14, scale: .94, rotationX: 14, transformPerspective: 1200, transformOrigin: '50% 100%' },
        { autoAlpha: 1, yPercent: 0, scale: 1, rotationX: 0, duration: 1.15, ease: 'expo.out' }, 0);
      tl.fromTo(el.glow, { opacity: 0, clipPath: 'circle(0% at 0% 100%)' }, { opacity: 1, clipPath: 'circle(150% at 0% 100%)', duration: 1.6, ease: 'expo.out', clearProps: 'clipPath' }, .12);
      tl.fromTo(el.label, { autoAlpha: 0, x: -12 * S.unit }, { autoAlpha: 1, x: 0, duration: .8, ease: 'expo.out' }, .3);
      tl.fromTo(el.value, { autoAlpha: 0, y: 10 * S.unit }, { autoAlpha: 1, y: 0, duration: .9, ease: 'expo.out' }, .34);
      tl.call(() => odo.val.set('$12.0B', { fromZero: true, spin: 3, dur: 1.7, stagger: .09, order: 'ltr', hide: new Set([3, 4]) }), null, .38);
      tl.fromTo(el.sub, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .9, ease: 'power2.inOut', clearProps: 'clipPath' }, .62);
      tl.call(() => odo.sub.set('-2.4%', { fromZero: true, spin: 1, dur: 1.1, stagger: .06, order: 'ltr' }), null, .62);
      tl.fromTo(el.dots, { scale: 0 }, { scale: 1, duration: .5, ease: 'back.out(3)', stagger: .07 }, .5);
      tl.to(S, { draw: 1, duration: 1.05, ease: 'power2.inOut' }, .72);
      tl.fromTo(el.dash, { scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: .45, ease: 'power2.out' }, 1.62);
      tl.fromTo(el.marker, { opacity: 0 }, { opacity: 1, duration: .01 }, 1.62);
      tl.fromTo(S.bump, { v: -14 }, { v: 0, duration: .6, ease: 'back.out(3)' }, 1.62);
      tl.call(ripple, null, 1.66);
      tl.to(S, { fore: 1, duration: .9, ease: 'power2.out' }, 1.7);
      tl.fromTo(el.tipIn, { autoAlpha: 0, y: 10 * S.unit, scale: .55 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(2.2)' }, 1.78);
      tl.call(() => odo.tip.set('-2.4%', { fromZero: true, spin: 1, dur: 1, stagger: .06, order: 'ltr' }), null, 1.8);
      tl.to(S, { idle: 1, duration: 1.2, ease: 'sine.inOut' }, 2.2);
      tl.call(() => syncNumbers({ instant: true }), null, 3.2);
    }

    /* ── lifecycle ── */
    function resize() { const w = el.stage.clientWidth; if (w) S.unit = w / CW; }
    new ResizeObserver(() => { dropRect(); resize(); }).observe(el.stage);
    resize();
    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }

    resetRest(); applyGeometry(); finalState();
    if (!Lab.still) el.intro.style.visibility = 'hidden';
    gsap.set(el.menu, { visibility: 'hidden', opacity: 0 });
    start();
    Lab.fonts.then(() => Object.values(odo).forEach(o => o.remeasure()));

    return {
      id: 2,
      intro: () => { el.intro.style.visibility = ''; intro(); },
      replay: () => { el.intro.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; S.liveT = .5; },
      setVisible(v) { if (v) start(); else stop(); },
      _state: S, _data: () => T.slice(), _intro: () => introTl, setPick, switchSet, toggleForecast, openMenu, closeMenu,
    };
  }

  Lab.register({ id: 2, slug: 'market-size', mount });
})();
