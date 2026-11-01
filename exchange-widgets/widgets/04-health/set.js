/* ==========================================================================
   Set 04 · Daily health (five dot-matrix cards)
   Exchange-app Widget Lab · uses WidgetLab.kit + GSAP 3.13

   Units: 1u = 1px of the reference shot. The set is 460 × 736 u. The cards
   keep the shot's sizes (207 × 205, the heart card 422 × 204) and its 8 u
   between columns; the rows sit 34 u apart to leave room for the numbers.
     04·1 Activity · 04·2 Sleep time · 04·3 Heart Rate · 04·4 Stress · 04·5 Energy

   Motion map
   · digits   5 × 7 dot matrix read off the shot dot by dot; every change
              ripples from where it starts (a count-up on entry), dots swell
              under the pointer, digits slide when the number gets wider
   · scrub    every chart: pointer, touch or arrow keys pick a moment; the
              number shows that moment and the chart after it dims behind a
              moving edge
   · pills    the side pill switches the measure (min ⇄ kcal, asleep ⇄ in
              bed, bpm ⇄ HRV, now ⇄ day average)
   · life     the heart icon beats at the shown bpm, a light sweeps the heart
              bars, the stress dots breathe, cards lean toward the pointer,
              the wallpaper drifts
   · live     a new heart-rate bar every 1.6 s, small drifts elsewhere
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab || !Lab.kit) { console.warn('[set 04] lab.js / kit.js missing'); return; }
  const { clamp, lerp, r2, spring, step, writer, pointer } = Lab.kit;
  const NS = 'http://www.w3.org/2000/svg';
  const SVG = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };

  /* ───────────── 5 × 7 dot font, read off the shot (0 and 9 drawn to match) ───────────── */
  const FONT = {
    0: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    1: ['00100', '01100', '10100', '00100', '00100', '00100', '11111'],
    2: ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
    3: ['11111', '00001', '00010', '00110', '00001', '10001', '01110'],
    4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
    5: ['11111', '10000', '10110', '11001', '00001', '10001', '01110'],
    6: ['00110', '01000', '10000', '10110', '11001', '10001', '01110'],
    7: ['11111', '00001', '00010', '00010', '00100', '01000', '01000'],
    8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
    9: ['01110', '10001', '10011', '01101', '00001', '00010', '01100'],
    ':': ['00000', '00000', '00100', '00000', '00100', '00000', '00000'],
  };
  const BLANK = ['00000', '00000', '00000', '00000', '00000', '00000', '00000'];
  const PITCH = 6.8, DOT_R = 2.85;

  /* a dot-matrix number. The group's origin is the centre of the top-left dot
     (or the top-right one when right-aligned). Every dot has its own size
     spring and slides on an x spring when the layout changes. */
  class Dots {
    constructor(group, slots, align) {
      this.align = align; this.text = null; this.slots = []; this.cells = [];
      for (let s = 0; s < slots; s++) {
        const g = SVG('g', {}, group), cells = [];
        for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) {
          const cell = { el: SVG('circle', { cy: r2(r * PITCH), r: 0 }, g), r, c, y: r * PITCH, on: 0, at: 0, s: spring(0, 260, 20), xs: null, last: -1, lastX: NaN };
          cells.push(cell); this.cells.push(cell);
        }
        this.slots.push(cells);
      }
    }
    static layout(text) {   // first column of each character; a colon is a narrow slot
      const starts = []; let col = 0, last = 0;
      for (const ch of text) { starts.push(col); last = col + (ch === ':' ? .2 : 4); col += ch === ':' ? 2.4 : 6; }
      return { starts, last };
    }
    set(text, o = {}) {
      text = String(text).slice(-this.slots.length);
      if (text === this.text && !o.force) return;
      const { starts, last } = Dots.layout(text);
      const base = this.align === 'right' ? -last : 0;
      const from = o.from || { x: base * PITCH, y: 3 * PITCH };
      const now = o.now ?? 0, wave = o.wave ?? .006;
      this.slots.forEach((cells, i) => {
        const has = i < text.length, ch = has ? text[i] : ' ';
        const map = FONT[ch] || BLANK, colOff = ch === ':' ? -1.8 : 0;
        const start = has ? starts[i] : (text.length ? starts[text.length - 1] : 0) + 6 * (i - text.length + 1);
        for (const cell of cells) {
          const x = (base + start + cell.c + colOff) * PITCH;
          if (!cell.xs) cell.xs = spring(x, 210, 26);
          cell.xs.t = x;
          if (o.instant || cell.s.v < .03) { cell.xs.v = x; cell.xs.vel = 0; }   // dark dots jump, lit ones slide
          const on = has && map[cell.r][cell.c] === '1' ? 1 : 0;
          if (on !== cell.on || o.force) {
            cell.on = on;
            cell.at = now + (o.instant ? 0 : wave * Math.hypot(x - from.x, cell.y - from.y) + (o.jitter ? Math.random() * o.jitter : 0));
            if (o.instant) { cell.s.v = cell.s.t = on; cell.s.vel = 0; }
          }
        }
      });
      this.text = text;
    }
    tick(t, dt, lens) {
      for (const cell of this.cells) {
        const s = cell.s, xs = cell.xs;
        if (t >= cell.at) s.t = cell.on;
        if (Math.abs(s.v - s.t) > .001 || Math.abs(s.vel) > .001) step(s, dt);
        if (xs) { if (Math.abs(xs.v - xs.t) > .01 || Math.abs(xs.vel) > .01) step(xs, dt); else { xs.v = xs.t; xs.vel = 0; } }
        const x = xs ? r2(xs.v) : 0;
        if (x !== cell.lastX) { cell.el.setAttribute('cx', x); cell.lastX = x; }
        let k = Math.max(0, s.v);
        if (lens && k > .01) { const d2 = (x - lens.x) ** 2 + (cell.y - lens.y) ** 2; k *= 1 + .42 * Math.exp(-d2 / 320); }
        const r = Math.round(DOT_R * Math.min(k, 1.6) * 100) / 100;
        if (r !== cell.last) { cell.el.setAttribute('r', r); cell.last = r; }
      }
    }
  }

  /* ───────────── sample data, traced from the shot ───────────── */
  const GRID = { x0: 18.2, x1: 188, n: 15 };   // the small cards' tick row: 01 AM → 01 PM (9 PM → 9 AM for sleep)
  const gx = k => GRID.x0 + k * (GRID.x1 - GRID.x0) / (GRID.n - 1);
  const STEP5 = 5 / 720 * (GRID.x1 - GRID.x0);   // five minutes, in u
  const TICK_Y = [154.5, 166.5];
  const ACT = [{ x: 91.2, min: 18 }, { x: 106, min: 24 }, { x: 128.7, min: 10 }];   // minutes of movement, 52 in all
  const actW = b => b.min * .43;
  const SLEEP = {   // the sleep stages skyline: edges and tops, bottom at 164
    x: [44, 56.2, 62.3, 76.3, 83.9, 86.3, 91.7, 105.8, 120.7, 135.2, 144.4, 146.3, 152.3, 159.5],
    top: [159.3, 155.4, 151.4, 155.4, 159.4, 154.9, 151.4, 154.8, 151.4, 154.8, 159.4, 157.1, 159.3],
    base: 164, asleep: 465, bed: 510,
  };
  const HEART = [[53, 58], [53, 63], [62, 71], [70, 75], [74, 80], [80, 90], [94, 104], [95, 104], [92, 99], [85, 94], [78, 85], [81, 86], [81, 85], [83, 87], [77, 87], [76, 82], [88, 100], [97, 105], [98, 110], [90, 102], [79, 90], [79, 84], [82, 86], [82, 86], [82, 86], [84, 93], [93, 100], [98, 102], [86, 100], [82, 88], [88, 96], [95, 105], [93, 104], [79, 92], [69, 84], [83, 95], [83, 95], [70, 81], [76, 84], [82, 105], [94, 106], [92, 100], [91, 96], [88, 94], [92, 106], [87, 105], [86, 98], [94, 105], [89, 104], [88, 97], [86, 96], [86, 101], [95, 105], [97, 103], [92, 98], [85, 92], [82, 86], [80, 84], [77, 81], [71, 78], [66, 72], [60, 66], [61, 72], [71, 80]];
  const HX = i => 46.3 + i * 5.66, HY = v => 94.5 + (130 - v) * .8375, HBW = 2.2;
  const STRESS = [10, 10, 10, 20, 27, 10, 10, 13];   // one dot per tick, k = 0…7
  const stressR = v => .4 + v * .115;
  const ENERGY = [[19, 31, 25], [31, 61, 49], [61, 101, 68], [101, 128.5, 86]];   // x0, x1, %
  const energyH = v => v / 86 * 8;

  const pad = n => String(n).padStart(2, '0');
  const hhmm = mins => { const m = Math.round(mins); return `${Math.floor(m / 60)}:${pad(m % 60)}`; };
  const clock = mins => { const m = ((Math.round(mins / 5) * 5) % 1440 + 1440) % 1440, h = Math.floor(m / 60); return `${((h + 11) % 12) + 1}:${pad(m % 60)} ${h >= 12 ? 'PM' : 'AM'}`; };

  const CARDS = [
    { id: 'act', n: '04·1', title: 'Activity', x: 19, y: 34, w: 207, h: 205, slots: 3, origin: [21.75, 90],
      metrics: [{ unit: 'min', sub: 'above average' }, { unit: 'kcal', sub: 'burned so far' }] },
    { id: 'sleep', n: '04·2', title: 'Sleep time', x: 234, y: 34, w: 207, h: 205, slots: 4, origin: [22, 90],
      metrics: [{ unit: 'asleep', sub: 'recovered' }, { unit: 'in bed', sub: 'time in bed' }] },
    { id: 'heart', n: '04·3', title: 'Heart Rate', x: 19, y: 273, w: 422, h: 204, slots: 3, origin: [366.6, 29], align: 'right',
      metrics: [{ unit: 'bpm', sub: 'resting' }, { unit: 'ms', sub: 'variability' }] },
    { id: 'stress', n: '04·4', title: 'Stress', x: 19, y: 511, w: 207, h: 205, slots: 2, origin: [21.75, 90],
      metrics: [{ unit: '%', sub: 'low' }, { unit: 'avg', sub: 'day average' }] },
    { id: 'energy', n: '04·5', title: 'Energy', x: 234, y: 511, w: 207, h: 205, slots: 3, origin: [21.75, 90],
      metrics: [{ unit: '%', sub: 'high' }, { unit: 'avg', sub: 'day average' }] },
  ];
  const ICON = {
    bolt: '<path d="M14.4 1.8 4.9 13.7h6.3L9.5 22.2l9.6-12.5h-6.5z"/>',
    moon: '<path d="M19 15.1A7.5 7.5 0 0 1 8.9 5a7.7 7.7 0 1 0 10.1 10.1z"/>',
    clock: '<circle cx="12" cy="12" r="7.7" fill="none" stroke="currentColor" stroke-width="2.3"/><path d="M12 7.6v4.8l3.1 2" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>',
    heart: '<path d="M12 20.8 3.7 12.8a5.3 5.3 0 0 1 7.5-7.5l.8.8.8-.8a5.3 5.3 0 0 1 7.5 7.5z"/>',
    pulse: '<path class="s04-pulse" d="M1.8 12.4h4.1l1.8-4.6 2.6 9 2.6-11.2 2.1 6.8h2.3" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/><circle cx="20.3" cy="12.4" r="2"/>',
    toggle: '<rect x="2" y="6.6" width="20" height="10.8" rx="5.4"/><rect class="s04-knob" x="5.6" y="10" width="4.4" height="4" rx="1.2"/>',
  };
  const PILL = {
    act: { icon: 'bolt', labels: ['min', 'kcal'] },
    heart: { icon: 'heart', labels: ['bpm', 'hrv'] },
    stress: { icon: 'pulse', labels: ['%', 'avg'] },
    energy: { icon: 'toggle', labels: ['%', 'avg'] },
  };

  /* ───────────── markup ───────────── */
  const U = n => `calc(${n} * var(--u))`;
  function cardHTML(c) {
    const p = PILL[c.id];
    const pill = c.id === 'sleep'
      ? `<div class="s04-pill is-two" role="group" aria-label="Sleep measure"><button type="button" class="s04-pb is-on" data-m="0" aria-label="Time asleep" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON.moon}</svg></button><button type="button" class="s04-pb" data-m="1" aria-label="Time in bed" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON.clock}</svg></button></div>`
      : `<button type="button" class="s04-pill" aria-label="Show ${p.labels[1]}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[p.icon]}</svg><b class="js-unit${p.labels[0] === '%' ? ' is-pct' : ''}">${p.labels[0]}</b></button>`;
    return `<article class="s04-card s04-${c.id}${c.id === 'heart' ? ' is-wide' : ''}" style="left:${U(c.x)};top:${U(c.y)};width:${U(c.w)};height:${U(c.h)}" aria-label="${c.title}">
  <span class="s04-tag" aria-hidden="true">${c.n}</span>
  <div class="s04-in">
    <i class="s04-glare" aria-hidden="true"></i>
    <h3 class="s04-title">${c.title}</h3>
    <p class="s04-sub js-sub">${c.metrics[0].sub}</p>
    <svg class="s04-svg" viewBox="0 0 ${c.w} ${c.h}" aria-hidden="true" focusable="false"><defs></defs><g class="js-chart"></g><g class="js-dots s04-dots" transform="translate(${c.origin[0]} ${c.origin[1]})"></g></svg>
    ${pill}
    <div class="s04-scrub" tabindex="0" role="slider" aria-label="${c.title} through the day" aria-valuemin="0" aria-valuemax="100"></div>
    <p class="s04-sr js-live" aria-live="polite"></p>
  </div>
</article>`;
  }

  /* ───────────── the set ───────────── */
  let counter = 0;
  function mount(host) {
    const uid = ++counter;
    host.classList.add('s04');
    host.setAttribute('dir', 'ltr'); host.setAttribute('lang', 'en');
    host.innerHTML = `<div class="s04-stage"><div class="s04-back" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="s04-intro">${CARDS.map(cardHTML).join('')}</div></div>`;
    const stage = host.querySelector('.s04-stage'), introEl = host.querySelector('.s04-intro');
    const blobs = [...host.querySelectorAll('.s04-back i')];
    const W = writer(), P = pointer(stage, 460, 736);
    const S = { t: 0, unit: 1, running: false, idle: 1, live: false, liveT: 0, focus: null, px: spring(0, 40, 12), py: spring(0, 40, 12) };

    const cards = CARDS.map(def => {
      const el = host.querySelector('.s04-' + def.id);
      const c = {
        def, el, svg: el.querySelector('.s04-svg'), chart: el.querySelector('.js-chart'), defs: el.querySelector('defs'),
        sub: el.querySelector('.js-sub'), live: el.querySelector('.js-live'), scrubEl: el.querySelector('.s04-scrub'),
        pill: el.querySelector('.s04-pill'), glare: el.querySelector('.s04-glare'),
        m: 0, pick: null, wipe: 1, beat: 0, items: [],
        tiltX: spring(0, 120, 18), tiltY: spring(0, 120, 18), lift: spring(0, 140, 20), glow: spring(0, 90, 16),
        edge: spring(def.w + 10, 220, 26), markA: spring(0, 200, 24), markX: spring(0, 260, 26),
      };
      c.dots = new Dots(el.querySelector('.js-dots'), def.slots, def.align || 'left');
      c.origin = { x: def.origin[0], y: def.origin[1] };
      buildChart(c);
      return c;
    });
    const byId = id => cards.find(c => c.def.id === id);

    /* ── charts ── */
    function buildChart(c) {
      const d = c.def, id = d.id;
      const clipId = `s04c${uid}${id}`, tickId = `s04t${uid}${id}`;
      const clip = SVG('clipPath', { id: clipId }, c.defs);
      c.clipRect = SVG('rect', { x: -10, y: 0, width: d.w + 20, height: d.h }, clip);
      const lg = SVG('linearGradient', { id: tickId, gradientUnits: 'userSpaceOnUse', x1: 0, y1: TICK_Y[0], x2: 0, y2: TICK_Y[1] }, c.defs);
      [[0, 0], [.5, 1], [1, 0]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#fff', 'stop-opacity': r2(a * .26) }, lg));
      const gTicks = SVG('g', { class: 's04-ticks', stroke: `url(#${tickId})` }, c.chart);
      const gDim = SVG('g', { class: 's04-marks is-dim' }, c.chart);
      const gHi = SVG('g', { class: 's04-marks', 'clip-path': `url(#${clipId})` }, c.chart);
      c.gTicks = gTicks; c.gDim = gDim; c.gHi = gHi;
      const mark = (tag, attrs) => {
        const el = SVG(tag, attrs, gHi), dim = SVG(tag, attrs, gDim);
        return { el, dim, set(a) { for (const k in a) { el.setAttribute(k, a[k]); dim.setAttribute(k, a[k]); } } };
      };
      const tick = x => SVG('line', { x1: r2(x), x2: r2(x), y1: TICK_Y[0], y2: TICK_Y[1] }, gTicks);
      const label = (t, x, y, anchor, cls = '') => { const n = SVG('text', { x, y, class: 's04-lab' + cls, 'text-anchor': anchor }, c.chart); n.textContent = t; return n; };
      const ticksExcept = covered => { for (let k = 0; k < GRID.n; k++) if (!covered(gx(k))) tick(gx(k)); };

      if (id === 'act') {
        ticksExcept(x => ACT.some(b => Math.abs(x - b.x) < actW(b) / 2 + .6));
        c.blocks = ACT.map(b => mark('rect', { x: r2(b.x - actW(b) / 2), y: 156.8, width: r2(actW(b)), height: 9.25, class: 's04-blk' }));
        label('01 AM', 17.8, 181.5, 'start'); label('01 PM', 188.8, 181.5, 'end');
        c.range = [GRID.x0, GRID.x1]; c.start = 60;
      } else if (id === 'sleep') {
        ticksExcept(x => x > SLEEP.x[0] - 2 && x < SLEEP.x[SLEEP.x.length - 1] + 2);
        let p = `M${SLEEP.x[0]},${SLEEP.base}`;
        SLEEP.top.forEach((t, i) => { p += `V${t}H${SLEEP.x[i + 1]}`; });
        p += `V${SLEEP.base}Z`;
        mark('path', { d: p, class: 's04-blk' });
        label('9 PM', 18.4, 181.5, 'start'); label('9 AM', 188.8, 181.5, 'end');
        c.range = [GRID.x0, GRID.x1]; c.start = 21 * 60;
      } else if (id === 'heart') {
        for (let j = 0; j < 29; j++) SVG('circle', { cx: 56 + j * 12, cy: 164.5, r: .75, class: 's04-base' }, c.chart);
        label('130', 17.2, 99, 'start'); label('90', 17.2, 132, 'start', ' is-mid'); label('50', 17.6, 166, 'start');
        c.bars = HEART.map(([lo, hi], i) => mark('rect', { x: r2(HX(i) - HBW / 2), y: r2(HY(hi)), width: HBW, height: r2(HY(lo) - HY(hi)), rx: HBW / 2, class: 's04-bar' }));
        label('1 AM', 44, 182, 'start'); label('6 AM', 210, 182, 'middle'); label('1 PM', 403, 182, 'end');
        c.newest = c.bars[c.bars.length - 1].el;   // the latest reading swells with each beat
        c.newest.classList.add('is-newest');
        c.range = [0, HEART.length - 1];
      } else if (id === 'stress') {
        ticksExcept(x => x < gx(STRESS.length - 1) + 2);
        c.dotsArr = STRESS.map((v, k) => mark('circle', { cx: r2(gx(k)), cy: 159.8, r: r2(stressR(v)), class: 's04-dot' }));
        label('01 AM', 17.8, 181.5, 'start'); label('01 PM', 188.8, 181.5, 'end');
        c.range = [GRID.x0, gx(STRESS.length - 1)]; c.start = 60;
      } else if (id === 'energy') {
        ticksExcept(x => x < ENERGY[ENERGY.length - 1][1] + 2);
        let p = `M${ENERGY[0][0]},166`;
        ENERGY.forEach(([, x1, v]) => { p += `V${r2(166 - energyH(v))}H${x1}`; });
        p += 'V166Z';
        c.energyPath = mark('path', { d: p, class: 's04-blk' });
        label('01 AM', 17.8, 181.5, 'start'); label('01 PM', 188.8, 181.5, 'end');
        c.range = [ENERGY[0][0], ENERGY[ENERGY.length - 1][1]]; c.start = 60;
      }
      c.mark = SVG('rect', { x: 0, y: id === 'heart' ? 102 : 147, width: 1.2, height: id === 'heart' ? 66 : 24, rx: .6, class: 's04-pickmark', opacity: 0 }, c.chart);
    }

    /* ── values ── */
    const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
    const bpmOf = i => Math.round((HEART[i][0] + HEART[i][1]) / 2);
    const hrvOf = i => Math.round(clamp(78 - (bpmOf(i) - 50) * .55 + (HEART[i][1] - HEART[i][0]) * .4, 22, 90));
    const RESTING = { bpm: 61, hrv: 48 };
    function valueAt(c, x) {   // x: a chart position in u (a bar index for the heart card)
      const id = c.def.id, m = c.m;
      if (id === 'act') {
        const mins = ACT.reduce((s, b) => s + b.min * clamp((x - (b.x - actW(b) / 2)) / actW(b), 0, 1), 0);
        return m ? Math.round(mins * 6.1) : Math.round(mins);
      }
      if (id === 'sleep') return m ? hhmm(SLEEP.bed * clamp((x - 40) / 124, 0, 1)) : hhmm(SLEEP.asleep * clamp((x - SLEEP.x[0]) / (SLEEP.x[SLEEP.x.length - 1] - SLEEP.x[0]), 0, 1));
      if (id === 'heart') return m ? hrvOf(x) : bpmOf(x);
      if (id === 'stress') { const k = Math.round((x - GRID.x0) / (gx(1) - GRID.x0)); return m ? Math.round(avg(STRESS.slice(0, k + 1))) : STRESS[k]; }
      if (id === 'energy') {
        if (!m) return (ENERGY.find(s => x <= s[1]) || ENERGY[ENERGY.length - 1])[2];
        let sum = 0, len = 0;
        ENERGY.forEach(([a, b, v]) => { const e = Math.min(b, x); if (e > a) { sum += (e - a) * v; len += e - a; } });
        return Math.round(len ? sum / len : ENERGY[0][2]);
      }
    }
    function current(c) {
      if (c.def.id === 'heart') return c.m ? RESTING.hrv : RESTING.bpm;
      return valueAt(c, c.range[1]);
    }
    function timeAt(c, x) {
      if (c.def.id === 'heart') return clock(60 + (HX(x) - 44) * 2);
      return clock(c.start + (x - GRID.x0) / (GRID.x1 - GRID.x0) * 720);
    }
    function show(c, o = {}) {
      const val = c.pick === null ? current(c) : valueAt(c, c.pick);
      c.dots.set(String(val), { now: S.t, from: o.from, wave: o.wave ?? .007, instant: o.instant || Lab.reduced, jitter: o.jitter });
      const sub = c.pick === null ? c.def.metrics[c.m].sub : `at ${timeAt(c, c.pick)}`;
      if (c.sub.textContent !== sub) c.sub.textContent = sub;
      const unit = c.def.metrics[c.m].unit;
      const text = `${c.def.title}: ${val} ${unit === '%' ? 'percent' : unit}${c.pick === null ? '' : ', at ' + timeAt(c, c.pick)}`;
      c.scrubEl.setAttribute('aria-valuetext', text);
      if (c.pick !== null) c.scrubEl.setAttribute('aria-valuenow', Math.round((c.pick - c.range[0]) / (c.range[1] - c.range[0]) * 100));
      if (o.announce) c.live.textContent = text;
      // the edge that dims what comes after the picked moment
      if (c.pick === null) { c.edge.t = c.def.w + 10; c.markA.t = 0; }
      else {
        const x = c.def.id === 'heart' ? HX(c.pick) : c.pick;
        c.edge.t = x + (c.def.id === 'heart' ? HBW / 2 + .4 : c.def.id === 'stress' ? stressR(STRESS[STRESS.length - 1]) + 4 : 0);
        c.markX.t = x; c.markA.t = 1;
        if (c.markA.v < .05) { c.markX.v = x; c.markX.vel = 0; }
      }
    }

    /* ── interaction ── */
    cards.forEach(c => {
      const id = c.def.id;
      const snap = x => {
        const [a, b] = c.range;
        if (id === 'heart') return clamp(Math.round((x - HX(0)) / (HX(1) - HX(0))), a, b);
        if (id === 'stress') return gx(clamp(Math.round((x - GRID.x0) / (gx(1) - GRID.x0)), 0, STRESS.length - 1));
        return clamp(a + Math.round((x - a) / STEP5) * STEP5, a, b);
      };
      const toX = e => { const r = c.scrubEl.getBoundingClientRect(), el = c.scrubEl; return (e.clientX - r.left) / r.width * (el.offsetWidth / S.unit) + el.offsetLeft / S.unit; };
      let pressed = false, leave = 0;
      const pick = (x, o = {}) => {
        if (x === c.pick && !o.force) return;
        const was = c.pick; c.pick = x;
        const from = id === 'heart' ? { x: -40, y: 3 * PITCH } : { x: 20, y: 3 * PITCH };
        show(c, { from, wave: .0035, announce: o.announce });
        if (was === null && x !== null) c.lift.t = 1;
        if (x === null) c.lift.t = 0;
      };
      c.pickAt = pick;
      c.scrubEl.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; pressed = true; clearTimeout(leave); c.scrubEl.setPointerCapture(e.pointerId); pick(snap(toX(e))); });
      c.scrubEl.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || pressed) { clearTimeout(leave); pick(snap(toX(e))); } });
      c.scrubEl.addEventListener('pointerup', e => { pressed = false; if (e.pointerType !== 'mouse') leave = setTimeout(() => pick(null), 1400); });
      c.scrubEl.addEventListener('pointercancel', () => { pressed = false; pick(null); });
      c.scrubEl.addEventListener('pointerleave', () => { if (!pressed) { clearTimeout(leave); leave = setTimeout(() => pick(null), 260); } });
      c.scrubEl.addEventListener('keydown', e => {
        const [a, b] = c.range, cur = c.pick ?? b;
        const unit = id === 'heart' ? 1 : id === 'stress' ? gx(1) - GRID.x0 : STEP5 * (e.shiftKey ? 12 : 3);
        let next = null;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = cur - unit;
        else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = cur + unit;
        else if (e.key === 'Home') next = a;
        else if (e.key === 'End') next = b;
        else if (e.key === 'Escape') { pick(null, { announce: true }); return; }
        if (next === null) return;
        e.preventDefault();
        pick(id === 'heart' ? clamp(Math.round(next), a, b) : snap(clamp(next, a, b)), { announce: true });
      });
      c.scrubEl.addEventListener('blur', () => pick(null));

      // the side pill switches the measure
      if (id === 'sleep') {
        c.el.querySelectorAll('.s04-pb').forEach(b => b.addEventListener('click', () => {
          const m = +b.dataset.m; if (m === c.m) return;
          setMetric(c, m);
          c.el.querySelectorAll('.s04-pb').forEach(x => { const on = +x.dataset.m === m; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
          pop(b.querySelector('svg'));
        }));
      } else {
        c.pill.addEventListener('click', () => {
          setMetric(c, 1 - c.m);
          const labels = PILL[id].labels, u = c.pill.querySelector('.js-unit');
          u.textContent = labels[c.m]; u.classList.toggle('is-pct', labels[c.m] === '%');
          c.pill.setAttribute('aria-label', `Show ${labels[1 - c.m]}`);
          if (!Lab.reduced) gsap.fromTo(u, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'expo.out' });
          if (id === 'stress' && !Lab.reduced) { const p = c.pill.querySelector('.s04-pulse'), len = 30; gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: .7, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }); }
          pop(c.pill);
        });
      }
    });
    function setMetric(c, m) {
      c.m = m;
      c.el.classList.toggle('is-m1', m === 1);
      show(c, { from: c.def.align === 'right' ? { x: 0, y: 3 * PITCH } : { x: 120, y: 3 * PITCH }, wave: .0045, announce: true });
    }
    function pop(node) { if (!Lab.reduced) gsap.fromTo(node, { scale: .82 }, { scale: 1, duration: .55, ease: 'back.out(3)', transformOrigin: '50% 50%' }); }

    /* ── live ── */
    function liveStep() {
      const h = byId('heart');
      const lastMid = (HEART[HEART.length - 1][0] + HEART[HEART.length - 1][1]) / 2;
      const mid = clamp(lastMid + (Math.random() - .5) * 10, 58, 104), span = 4 + Math.random() * 8;
      HEART.shift(); HEART.push([Math.round(mid - span / 2), Math.round(mid + span / 2)]);
      h.bars.forEach((b, i) => { const [lo, hi] = HEART[i]; gsap.to([b.el, b.dim], { attr: { y: r2(HY(hi)), height: r2(HY(lo) - HY(hi)) }, duration: Lab.reduced ? 0 : .55, ease: 'expo.out', overwrite: true }); });
      RESTING.bpm = clamp(RESTING.bpm + Math.round((Math.random() - .5) * 2.4), 58, 64);
      RESTING.hrv = clamp(RESTING.hrv + Math.round((Math.random() - .5) * 2.4), 44, 54);
      if (h.pick === null) show(h, { from: { x: 0, y: 3 * PITCH }, wave: .005 });
      if (Math.random() < .35) {
        const a = byId('act'), b = ACT[ACT.length - 1];
        b.min = Math.min(b.min + 1, 26);
        a.blocks[a.blocks.length - 1].set({ x: r2(b.x - actW(b) / 2), width: r2(actW(b)) });
        if (a.pick === null) show(a, { wave: .005 });
      }
    }

    /* ── frame ── */
    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const k = S.unit, reduced = Lab.reduced, idle = reduced ? 0 : S.idle;
      // wallpaper: slow drift plus a little parallax
      S.px.t = P.inside && !reduced ? P.nx : 0; S.py.t = P.inside && !reduced ? P.ny : 0;
      step(S.px, dt); step(S.py, dt);
      blobs.forEach((b, i) => {
        const a = S.t * (.11 + i * .025) + i * 1.7;
        const x = (Math.sin(a) * 14 + S.px.v * (8 + i * 3)) * idle, y = (Math.cos(a * .8) * 10 + S.py.v * (6 + i * 2)) * idle;
        W.tf(b, `translate3d(${(x * k).toFixed(1)}px,${(y * k).toFixed(1)}px,0)`);
      });
      cards.forEach((c, ci) => {
        const d = c.def;
        const inside = P.inside && P.x >= d.x && P.x <= d.x + d.w && P.y >= d.y && P.y <= d.y + d.h;
        const lx = (P.x - d.x) / d.w * 2 - 1, ly = (P.y - d.y) / d.h * 2 - 1;
        const lean = inside && P.mouse && !reduced;
        c.tiltX.t = lean ? -ly * 3.5 : 0;
        c.tiltY.t = lean ? lx * (d.id === 'heart' ? 2.6 : 4.5) : 0;
        c.glow.t = lean ? 1 : 0;
        const focus = S.focus === ci ? 1 : 0;
        step(c.tiltX, dt); step(c.tiltY, dt); step(c.lift, dt); step(c.glow, dt);
        const lift = reduced ? 0 : Math.max(c.lift.v, focus);
        W.tf(c.el, `perspective(${(1000 * k).toFixed(0)}px) rotateX(${c.tiltX.v.toFixed(3)}deg) rotateY(${c.tiltY.v.toFixed(3)}deg) translate3d(0,${(-lift * 3 * k).toFixed(2)}px,0)`);
        if (c.glow.v > .002 || c.glow.t > 0) {
          W.tf(c.glare, `translate3d(${((P.x - d.x) * k).toFixed(1)}px,${((P.y - d.y) * k).toFixed(1)}px,0)`);
          W.style(c.glare, 'opacity', c.glow.v.toFixed(3));
        }
        // the dimming edge, the pick line and the intro wipe
        if (reduced) [c.edge, c.markA, c.markX].forEach(sp => { sp.v = sp.t; sp.vel = 0; });
        else { step(c.edge, dt); step(c.markA, dt); step(c.markX, dt); }
        W.attr(c.clipRect, 'width', r2(Math.max(0, Math.min(c.edge.v + 10, c.wipe * (d.w + 20)))));
        W.attr(c.mark, 'x', r2(c.markX.v - .6)); W.attr(c.mark, 'opacity', clamp(c.markA.v, 0, 1).toFixed(3));
        // pointer lens over the digits (in the digits' own units)
        let lens = null;
        if (inside && !reduced && P.mouse) lens = { x: P.x - d.x - c.origin.x, y: P.y - d.y - c.origin.y };
        c.dots.tick(S.t, dt, lens);
        if (d.id === 'heart') {
          const bpm = c.pick === null ? RESTING.bpm : bpmOf(c.pick);
          c.beat = (c.beat + dt * (bpm / 60)) % 1;
          const b = idle && c.m === 0 ? (c.beat < .16 ? Math.sin(c.beat / .16 * Math.PI) : 0) + (c.beat > .2 && c.beat < .32 ? .45 * Math.sin((c.beat - .2) / .12 * Math.PI) : 0) : 0;
          W.tf(c.pill.querySelector('svg'), `scale(${(1 + b * .2).toFixed(3)})`);
          W.tf(c.newest, `scaleY(${(1 + b * (c.pick === null ? .35 : 0)).toFixed(3)})`);
        } else if (d.id === 'stress' && idle) {
          c.dotsArr.forEach((m, i) => m.set({ r: r2(stressR(STRESS[i]) * (1 + .1 * Math.sin(S.t * 2.2 - i * .6))) }));
        }
      });
      if (S.live && !reduced) { S.liveT -= dt; if (S.liveT <= 0) { S.liveT = 1.6; liveStep(); } }
    }

    /* ── intro ── */
    let introTl = null;
    function finalState() {
      if (introTl) { introTl.kill(); introTl = null; }
      S.idle = 1;
      gsap.set([introEl, ...cards.map(c => c.el), ...cards.flatMap(c => [c.gTicks, c.gDim, ...c.chart.querySelectorAll('.s04-lab, .s04-base')])], { clearProps: 'opacity,visibility,transform' });
      introEl.style.visibility = 'visible';
      cards.forEach(c => { c.pick = null; c.wipe = 1; show(c, { instant: true }); });
    }
    function intro() {
      if (introTl) introTl.kill();
      if (Lab.reduced) { finalState(); gsap.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5 }); return; }
      cards.forEach(c => { c.pick = null; c.edge.v = c.edge.t = c.def.w + 10; c.markA.v = c.markA.t = 0; c.dots.set('', { instant: true, force: true }); c.wipe = 0; });
      S.idle = 0;
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; S.idle = 1; } });
      tl.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .35 }, 0);
      cards.forEach((c, i) => {
        const at = .06 + [0, .08, .2, .32, .4][i];
        tl.fromTo(c.el, { opacity: 0, y: 46 * S.unit, scale: .9, rotationX: 14, transformPerspective: 900 * S.unit }, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.15, ease: 'expo.out', clearProps: 'transform,opacity' }, at);
        const ticks = [...c.gTicks.children], labs = [...c.chart.querySelectorAll('.s04-lab, .s04-base')];
        if (ticks.length) tl.fromTo(ticks, { opacity: 0 }, { opacity: 1, duration: .4, stagger: .025, ease: 'power1.out', clearProps: 'opacity' }, at + .35);
        tl.fromTo(labs, { opacity: 0 }, { opacity: 1, duration: .5, stagger: .01, ease: 'power1.out', clearProps: 'opacity' }, at + .4);
        tl.fromTo(c.gDim, { opacity: 0 }, { opacity: .22, duration: .5, ease: 'power1.out', clearProps: 'opacity' }, at + .4);
        tl.to(c, { wipe: 1, duration: 1.1, ease: 'power3.inOut' }, at + .55);
        // count up, scoreboard style
        const target = current(c), isTime = typeof target === 'string';
        const end = isTime ? (+target.split(':')[0]) * 60 + (+target.split(':')[1]) : target;
        const prox = { v: 0 };
        tl.to(prox, { v: end, duration: 1.35, ease: 'power3.out', onUpdate: () => c.dots.set(isTime ? hhmm(prox.v) : String(Math.round(prox.v)), { now: S.t, wave: .0025, jitter: .04 }) }, at + .3);
        tl.call(() => show(c, { jitter: .02 }), null, at + 1.7);
      });
      tl.to(S, { idle: 1, duration: 1, ease: 'sine.inOut' }, 1.7);
    }

    /* ── lifecycle ── */
    function resize() { const w = stage.clientWidth; if (w) S.unit = w / 460; }
    new ResizeObserver(() => { P.drop(); resize(); }).observe(stage);
    resize();
    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }
    finalState();
    if (!Lab.still) introEl.style.visibility = 'hidden';
    start();

    return {
      id: 4,
      intro: () => { introEl.style.visibility = ''; intro(); },
      replay: () => { introEl.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; S.liveT = .4; },
      setVisible(v) { if (v) start(); else stop(); },
      /* the gallery's sub-number chips point at one card (index, or null) */
      focus(i) {
        S.focus = i;
        host.classList.toggle('has-focus', i !== null);
        cards.forEach((c, ci) => c.el.classList.toggle('is-focus', ci === i));
      },
      subs: CARDS.map(c => ({ n: c.n, title: c.title })),
      _cards: cards,
    };
  }

  Lab.register({ id: 4, slug: 'health', mount });
})();
