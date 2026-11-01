/* ==========================================================================
   Set 06 · Insights pager (two cards)
   Exchange-app Widget Lab · uses WidgetLab.kit + GSAP 3.13

   The shot shows two pages of one swipeable insights deck: 06·1 Insights
   (orange, page 4 of 6) and 06·2 Conversion (blue, page 5 of 6). Each card
   here is its own six-page deck in its own colour.

   Units: 1u = 1px of the shot. Each card is 476 × 615 u. Side by side the
   set is 1098 × 731 u; in a narrow container the cards stack (556 × 1412 u).

   Motion map
   · light    each card's glow is five soft lights fitted to the shot; they
              lean toward the pointer and settle in a new place on every page
   · pages    dashes, swipe or arrow keys: the label and note slide, the
              number rolls, the chart morphs to the new page
   · range    the "Weekly" menu (Daily / Weekly / Monthly) reshapes the data
   · 06·1     drag the marker along the line: the number reads that week,
              the dashed guide follows, the fill brightens up to it
   · 06·2     drag the glowing dot along the wave; "Explore more +" opens a
              glass panel with where the conversions came from
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab || !Lab.kit) { console.warn('[set 06] lab.js / kit.js missing'); return; }
  const { clamp, lerp, r2, spring, step, writer, pointer, Odo } = Lab.kit;
  const NS = 'http://www.w3.org/2000/svg';
  const SVG = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const CW = 476, CH = 615;
  const setVar = (n, name, v) => { if (n['_v' + name] !== v) { n.style.setProperty(name, v); n['_v' + name] = v; } };
  const RANGES = ['Daily', 'Weekly', 'Monthly'];

  /* the glow: soft elliptical lights fitted to the shot (cx, cy, rx, ry, angle, r, g, b, alpha), bottom first */
  const GLOW = {
    ins: { top: [22, 1, 1], bottom: [0, 0, 0], blobs: [
      [272.6, 38.1, 132.1, 202.3, 74, 255, 66, 29, .678], [157.4, 159.8, 156.9, 116.5, -27.5, 210, 57, 15, .857],
      [111.8, 222.8, 204.4, 188, 20.3, 122, 25, 8, .868], [239.5, 172, 388.7, 147.4, 47.4, 147, 36, 6, .5],
      [353.3, -14.4, 153.8, 185.8, 3.4, 147, 55, 25, .68]] },
    conv: { top: [1, 18, 36], bottom: [1, 7, 14], blobs: [
      [260.1, 271.9, 163.8, 140.9, 15.5, 39, 146, 247, .883], [368.6, 355.2, 227.2, 195.6, 3.2, 3, 106, 198, .9],
      [130.8, 187.8, 219.5, 187.9, 29.9, 0, 95, 180, .831], [40.6, 98.8, 133.7, 78.5, -11.1, 2, 68, 121, .498],
      [453.2, 117.1, 202.4, 141.2, 103.1, 0, 72, 135, .684], [475, 253.7, 226.8, 295.1, -21.4, 0, 54, 106, .682]] },
  };

  /* sample pages; value = this period's figure at "now" */
  const INS_PAGES = [
    { label: 'Sales Volume', v: [9, 32, 88], note: ['Sales are climbing steadily', 'week over week.'] },
    { label: 'New Customers', v: [14, 48, 121], note: ['More first-time buyers', 'than any week this year.'] },
    { label: 'Average Order', v: [6, 21, 54], note: ['Baskets are getting a little', 'bigger every week.'] },
    { label: 'Revenue Growth', v: [18, 75, 168], note: ['Expect your revenue to rise and shine', 'before this month closes.'] },
    { label: 'Profit Margin', v: [4, 18, 41], note: ['Margins hold firm while', 'costs stay flat.'] },
    { label: 'Repeat Buyers', v: [19, 64, 132], note: ['Two in three customers', 'came back for more.'] },
  ];
  const CONV_PAGES = [
    { label: 'Visitors', v: [34, 120, 310], note: ['Traffic doubled since', 'the last campaign.'], src: [['Search', 46], ['Social', 32], ['Direct', 22]] },
    { label: 'Sign-ups', v: [22, 86, 204], note: ['Sign-ups are on track', 'for a record week.'], src: [['App store', 51], ['Web', 34], ['Invites', 15]] },
    { label: 'Click-through', v: [17, 64, 150], note: ['More people click through', 'from the first screen.'], src: [['Home', 44], ['Search', 38], ['Alerts', 18]] },
    { label: 'Retention', v: [28, 92, 214], note: ['Most new users stay', 'past their first week.'], src: [['Week 1', 62], ['Week 2', 24], ['Week 3', 14]] },
    { label: 'Conversion Rate', v: [64, 250, 590], note: ['Conversions set to', 'rise this month.'], src: [['Organic', 42], ['Paid ads', 31], ['Referral', 27]] },
    { label: 'Checkout', v: [11, 38, 96], note: ['Fewer carts are left', 'behind at checkout.'], src: [['Cards', 58], ['Wallets', 29], ['Bank', 13]] },
  ];

  /* 06·1: points of the line. The shot's weekly page: (158.5, 40) → (240.5, 75) → (317.5, 75), now = the middle one */
  const INS_Y = v => 286.5 - (v - 40) * (45 / 35);
  function insSeries(page, range) {
    const now = INS_PAGES[page].v[range];
    const n = [4, 3, 5][range], span = [[120, 356], [158.5, 317.5], [80, 396]][range];
    const xs = Array.from({ length: n }, (_, i) => span[0] + (span[1] - span[0]) * i / (n - 1));
    const ref = now / INS_PAGES[3].v[range];     // shape relative to the shot's page
    const base = [[.62, .82, 1, 1], [.533, 1, 1], [.29, .52, .76, 1, 1]][range];
    const wob = (i, k) => (page === 3 && range === 1 ? 1 : 1 + .07 * Math.sin(page * 2.3 + i * 1.7 + k));   // the shot's page stays exact
    const vs = base.map((b, i) => i >= n - 2 ? now : now * b * wob(i, range));
    return { xs, vs, now: n - 2, scale: ref };
  }
  // values map to y with a soft cap so tall pages still fit under the number
  const insY = (v, page, range) => { const top = INS_PAGES[page].v[range]; const k = top > 0 ? 75 / top : 1; return INS_Y(40 + (v * k - 40) * 1); };

  /* 06·2: the wave. y(x) = 330 − Σ amp·exp(−|x − c|^p / σ^p): flat-topped peaks, fitted to the shot —
     a small bump, the big peak under the dot (top at y 217), a rise at the right edge */
  const g = (x, c, s, p) => Math.exp(-(Math.abs((x - c) / s) ** p));
  function waveParams(page, range) {
    const shift = [-46, 0, 40, -22, 0, 28][page] + [-18, 0, 14][range];
    const peak = 288 + shift;
    return { peak, bumps: [[128 + shift * .4, 27, 40, 2.2], [peak, 113, 58, 2.8], [487 + shift * .2, 113, 58, 2.8]] };
  }
  const waveY = (x, P, t = 0, breath = 0) => 330 - P.bumps.reduce((s, [c, a, w, p], i) => s + a * (1 + breath * .035 * Math.sin(t * 1.3 + i * 2.1)) * g(x, c + (i === 0 ? breath * 6 * Math.sin(t * .7) : 0), w, p), 0);

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

  /* ───────────── markup ───────────── */
  const U = n => `calc(${n} * var(--u))`;
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${(+a).toFixed(3)})`;
  const blobHTML = b => { const [cx, cy, rx, ry, th, r, gg, bb, a] = b, c = [r, gg, bb]; return `<i style="left:${U(cx - rx)};top:${U(cy - ry)};width:${U(rx * 2)};height:${U(ry * 2)};transform:rotate(${th}deg);background:radial-gradient(closest-side,${rgba(c, a)},${rgba(c, a * .88)} 25%,${rgba(c, a * .56)} 50%,${rgba(c, a * .19)} 75%,${rgba(c, 0)})"></i>`; };
  const CHEV = '<svg class="s06-chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.3 6 7.7l3.5-3.4"/></svg>';
  const ARROW = '<svg class="s06-arrow" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8 8 2M3.4 2H8v4.6"/></svg>';
  function cardHTML(kind, uid) {
    const G = GLOW[kind], isIns = kind === 'ins';
    const pages = isIns ? INS_PAGES : CONV_PAGES, page = isIns ? 3 : 4;
    const dots = pages.map((p, i) => `<button type="button" role="tab" class="s06-dash${i === page ? ' is-on' : ''}" aria-selected="${i === page}" aria-label="${p.label}" tabindex="${i === page ? 0 : -1}"><i></i></button>`).join('');
    const menu = RANGES.map((r, i) => `<button type="button" role="menuitemradio" aria-checked="${i === 1}" data-r="${i}">${r}</button>`).join('');
    return `<article class="s06-card s06-${kind}" aria-label="${isIns ? 'Insights' : 'Conversion'}">
  <span class="s06-tag" aria-hidden="true">${isIns ? '06·1' : '06·2'}</span>
  <i class="s06-shadow" aria-hidden="true"></i>
  <div class="s06-in" style="background:linear-gradient(180deg,${rgba(G.top, 1)},${rgba(G.bottom, 1)})">
    <div class="s06-glow" aria-hidden="true">${G.blobs.map(blobHTML).join('')}</div>
    <i class="s06-fade" aria-hidden="true"></i>
    <h3 class="s06-title">${isIns ? 'Insights' : 'Conversion'}</h3>
    <div class="s06-range-wrap">
      <button type="button" class="s06-range" aria-haspopup="menu" aria-expanded="false" aria-controls="s06m${uid}${kind}"><span class="js-range">Weekly</span>${CHEV}</button>
      <div class="s06-menu" id="s06m${uid}${kind}" role="menu" aria-label="Period">${menu}</div>
    </div>
    <div class="s06-body">
      <p class="s06-label"><span class="js-label">${pages[page].label}</span></p>
      <p class="s06-num"><span class="s06-numw"><span class="js-num"></span>${ARROW}</span></p>
      <svg class="s06-chart" viewBox="0 0 ${CW} ${CH}" aria-hidden="true" focusable="false"><defs></defs><g class="js-chart"></g></svg>
      ${isIns ? `<p class="s06-note"><span class="js-note">${pages[page].note.join('<br>')}</span></p>` : ''}
      <div class="s06-scrub" tabindex="0" role="slider" aria-label="${isIns ? 'Revenue growth over time' : 'Conversion rate over the week'}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    ${isIns ? '' : `<div class="s06-glass">
      <p class="s06-gtext"><span class="js-note">${pages[page].note.join('<br>')}</span></p>
      <button type="button" class="s06-explore" aria-expanded="false">Explore more <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1.8v8.4M1.8 6h8.4"/></svg></button>
      <div class="s06-more" aria-hidden="true"><p class="s06-more-h">Where they came from</p><ul class="js-src"></ul></div>
    </div>`}
    <div class="s06-dots" role="tablist" aria-label="Pages">${dots}</div>
    <p class="s06-sr js-live" aria-live="polite"></p>
  </div>
</article>`;
  }

  /* ───────────── the set ───────────── */
  let counter = 0;
  function mount(host) {
    const uid = ++counter;
    host.classList.add('s06');
    host.setAttribute('dir', 'ltr'); host.setAttribute('lang', 'en');
    host.innerHTML = `<div class="s06-stage"><div class="s06-back" aria-hidden="true"></div><div class="s06-intro">${cardHTML('ins', uid)}${cardHTML('conv', uid)}</div></div>`;
    const stage = host.querySelector('.s06-stage'), introEl = host.querySelector('.s06-intro');
    const W = writer();
    const S = { t: 0, running: false, idle: 1, live: false, liveT: 0 };
    let introTl = null;

    const cards = ['ins', 'conv'].map(kind => {
      const el = host.querySelector('.s06-' + kind), $ = s => el.querySelector(s);
      const c = {
        kind, el, isIns: kind === 'ins', pages: kind === 'ins' ? INS_PAGES : CONV_PAGES,
        page: kind === 'ins' ? 3 : 4, range: 1, pick: null, open: false,
        P: pointer(el, CW, CH), unit: 1,
        blobs: [...el.querySelectorAll('.s06-glow i')].map((n, i) => ({ n, b: GLOW[kind].blobs[i], x: spring(0, 26, 9), y: spring(0, 26, 9), px: spring(0, 40, 12), py: spring(0, 40, 12) })),
        tiltX: spring(0, 90, 15), tiltY: spring(0, 90, 15),
        chart: $('.js-chart'), defs: $('defs'), num: new Odo($('.js-num')), label: $('.js-label'), note: $('.js-note'),
        rangeBtn: $('.s06-range'), rangeTxt: $('.js-range'), menu: $('.s06-menu'), scrub: $('.s06-scrub'), dashes: [...el.querySelectorAll('.s06-dash')],
        live: $('.js-live'), arrow: $('.s06-arrow'), body: $('.s06-body'),
        explore: $('.s06-explore'), glass: $('.s06-glass'), src: $('.js-src'),
        morph: { k: 1 }, from: null, to: null, markX: spring(240.5, 200, 24), markOn: spring(0, 160, 20), glassK: spring(0, 150, 17), swX: spring(0, 220, 24),
      };
      return c;
    });

    /* ── 06·1 chart: fill, line, dashed guides, marker ── */
    function buildIns(c) {
      const gid = `s06f${uid}`, lg = SVG('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1: 0, y1: 230, x2: 0, y2: 478 }, c.defs);
      [[0, .34], [.45, .14], [1, 0]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#ff5a24', 'stop-opacity': a }, lg));
      const hid = `s06h${uid}`, hg = SVG('linearGradient', { id: hid, gradientUnits: 'userSpaceOnUse', x1: 0, y1: 230, x2: 0, y2: 478 }, c.defs);
      [[0, .28], [.5, .1], [1, 0]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#ff7a3c', 'stop-opacity': a }, hg));
      const cid = `s06c${uid}`, clip = SVG('clipPath', { id: cid }, c.defs);
      c.hiClip = SVG('rect', { x: 0, y: 0, width: 0, height: CH }, clip);
      c.fill = SVG('path', { fill: `url(#${gid})` }, c.chart);
      c.fillHi = SVG('path', { fill: `url(#${hid})`, 'clip-path': `url(#${cid})`, opacity: 0 }, c.chart);
      c.guides = SVG('g', { class: 's06-guides' }, c.chart);
      c.line = SVG('path', { class: 's06-line' }, c.chart);
      c.mLine = SVG('line', { class: 's06-mline', y1: 185, y2: 478 }, c.chart);
      c.mHalo = SVG('circle', { class: 's06-mhalo', cy: 185, r: 4.5 }, c.chart);
      c.mDot = SVG('circle', { class: 's06-mdot', cy: 185, r: 4.6 }, c.chart);
      c.shape = insSeries(c.page, c.range);
    }
    function drawIns(c, t) {
      const A = c.from, B = c.to, k = c.morph.k;
      const n = Math.max(A.xs.length, B.xs.length);
      // resample both to n points along their own spans so the morph is smooth
      const pts = [];
      for (let i = 0; i < n; i++) {
        const fa = i / (n - 1);
        const pa = sampleAt(A, fa), pb = sampleAt(B, fa);
        pts.push([lerp(pa[0], pb[0], k), lerp(pa[1], pb[1], k)]);
      }
      c.pts = pts.map(([x, v]) => [x, insY(v, c.page, c.range)]);
      const d = c.pts.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)},${r2(y)}`).join('');
      W.attr(c.line, 'd', d);
      const f = `${d}L${r2(c.pts[c.pts.length - 1][0])},478L${r2(c.pts[0][0])},478Z`;
      W.attr(c.fill, 'd', f); W.attr(c.fillHi, 'd', f);
      // dashed guides at the points of the target shape (rebuilt when the count changes)
      const gx = B.xs.map((x, i) => [lerp(sampleAt(A, i / (B.xs.length - 1))[0], x, k), i]);
      if (c.guides.childElementCount !== gx.length) { c.guides.textContent = ''; gx.forEach(() => SVG('line', { y2: 478 }, c.guides)); }
      [...c.guides.children].forEach((ln, i) => { const x = r2(gx[i][0]); W.attr(ln, 'x1', x); W.attr(ln, 'x2', x); W.attr(ln, 'y1', r2(yOnLine(c, gx[i][0]))); });
    }
    function sampleAt(Sh, f) {   // a point at fraction f of the series' own index range (linear in index)
      const p = f * (Sh.xs.length - 1), i = Math.min(Sh.xs.length - 2, Math.floor(p)), u = p - i;
      return [lerp(Sh.xs[i], Sh.xs[i + 1], u), lerp(Sh.vs[i], Sh.vs[i + 1], u)];
    }
    function yOnLine(c, x) {
      const P = c.pts; if (!P) return 241.5;
      if (x <= P[0][0]) return P[0][1];
      for (let i = 0; i < P.length - 1; i++) if (x <= P[i + 1][0]) { const u = (x - P[i][0]) / Math.max(1e-6, P[i + 1][0] - P[i][0]); return lerp(P[i][1], P[i + 1][1], u); }
      return P[P.length - 1][1];
    }
    function valueAtIns(c, x) {
      const Sh = c.to; if (x <= Sh.xs[0]) return Sh.vs[0];
      for (let i = 0; i < Sh.xs.length - 1; i++) if (x <= Sh.xs[i + 1]) return lerp(Sh.vs[i], Sh.vs[i + 1], (x - Sh.xs[i]) / (Sh.xs[i + 1] - Sh.xs[i]));
      return Sh.vs[Sh.vs.length - 1];
    }

    /* ── 06·2 chart: glowing wave and its dot ── */
    function buildConv(c) {
      const fid = `s06w${uid}`, lg = SVG('linearGradient', { id: fid, gradientUnits: 'userSpaceOnUse', x1: 36, y1: 0, x2: 446, y2: 0 }, c.defs);
      [[0, 0], [.08, .12], [.3, .7], [.46, 1], [.84, 1], [.97, 0]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#fff', 'stop-opacity': a }, lg));
      const mid = `s06wm${uid}`, mask = SVG('mask', { id: mid, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: CW, height: CH }, c.defs);
      SVG('rect', { x: 0, y: 0, width: CW, height: CH, fill: `url(#${fid})` }, mask);
      const rid = `s06r${uid}`, rg = SVG('radialGradient', { id: rid }, c.defs);
      [[0, '#b8f0ff', .95], [.3, '#4fc2ff', .45], [1, '#2a7fff', 0]].forEach(([o, col, a]) => SVG('stop', { offset: o, 'stop-color': col, 'stop-opacity': a }, rg));
      const did = `s06d${uid}`, dg = SVG('radialGradient', { id: did, cx: .42, cy: .38, r: .62 }, c.defs);
      [[0, '#f6feff'], [.5, '#c9f2ff'], [1, '#6fd0ff']].forEach(([o, col]) => SVG('stop', { offset: o, 'stop-color': col }, dg));
      c.dotFill = `url(#${did})`;
      const wg = SVG('g', { mask: `url(#${mid})` }, c.chart);
      // a soft light-blue tube: glow layers, the tube, and a highlight that only shows near the dot
      c.waves = [[30, '#1e6fd0', .07], [17, '#2f8de0', .15], [9.5, '#5fb4f0', .34], [4.4, '#a4d5f6', .95]].map(([w, col, a]) => SVG('path', { fill: 'none', stroke: col, 'stroke-width': w, 'stroke-opacity': a, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, wg));
      const hid = `s06hl${uid}`, hg = SVG('radialGradient', { id: hid, gradientUnits: 'userSpaceOnUse', cx: 288, cy: 220, r: 70 }, c.defs);
      [[0, 1], [.6, .45], [1, 0]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#fff', 'stop-opacity': a }, hg));
      c.hlGrad = hg;
      const hm = `s06hm${uid}`, hmask = SVG('mask', { id: hm, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: CW, height: CH }, c.defs);
      SVG('rect', { x: 0, y: 0, width: CW, height: CH, fill: `url(#${hid})` }, hmask);
      c.waves.push(SVG('path', { fill: 'none', stroke: '#f2fbff', 'stroke-width': 2, 'stroke-opacity': .85, 'stroke-linecap': 'round', mask: `url(#${hm})` }, wg));
      c.dGlow = SVG('circle', { r: 30, fill: `url(#${rid})` }, c.chart);
      c.dRing = SVG('circle', { r: 11, class: 's06-wring' }, c.chart);
      c.dDot = SVG('circle', { r: 10.5, class: 's06-wdot', fill: c.dotFill }, c.chart);
      c.dShine = SVG('circle', { r: 5, class: 's06-wshine' }, c.chart);
    }
    function wavePath(P, t, breath) {
      let d = '';
      for (let x = 36; x <= 446; x += 6) d += `${x === 36 ? 'M' : 'L'}${x},${r2(waveY(x, P, t, breath))}`;
      return d;
    }
    function drawConv(c, t, breath) {
      const A = c.from, B = c.to, k = c.morph.k;
      const P = { peak: lerp(A.peak, B.peak, k), bumps: A.bumps.map((b, i) => b.map((v, j) => lerp(v, B.bumps[i][j], k))) };
      c.wave = P;
      const d = wavePath(P, t, breath);
      c.waves.forEach(p => W.attr(p, 'd', d));
      const x = c.pick === null ? P.peak : c.pick;
      const y = waveY(x, P, t, breath) + (c.pick === null ? 3 : 0);
      [c.dGlow, c.dRing, c.dDot].forEach(n => { W.attr(n, 'cx', r2(x)); W.attr(n, 'cy', r2(y)); });
      W.attr(c.hlGrad, 'cx', r2(x)); W.attr(c.hlGrad, 'cy', r2(y));
      W.attr(c.dShine, 'cx', r2(x - 2.5)); W.attr(c.dShine, 'cy', r2(y - 3));
    }
    const convValue = (c, x) => Math.round(c.pages[c.page].v[c.range] * (.16 + .84 * clamp((330 - waveY(x, c.to)) / c.to.bumps[1][1], 0, 1)));

    /* ── shared: what the card shows ── */
    const fmt = v => `${Math.round(v)}%`;
    function shown(c) {
      if (c.isIns) return c.pick === null ? c.pages[c.page].v[c.range] : valueAtIns(c, c.pick);
      return c.pick === null ? c.pages[c.page].v[c.range] : convValue(c, c.pick);
    }
    function when(c, x) {
      if (c.isIns) { const Sh = c.to, i = clamp(Math.round((x - Sh.xs[0]) / ((Sh.xs[Sh.xs.length - 1] - Sh.xs[0]) / (Sh.xs.length - 1))), 0, Sh.xs.length - 1); return c.range === 0 ? DAYS[i] : c.range === 1 ? WEEKS[i] : ['Jan', 'Feb', 'Mar', 'Apr', 'May'][i]; }
      const f = clamp((x - 40) / 400, 0, 1); return c.range === 2 ? WEEKS[Math.min(4, Math.floor(f * 5))] : c.range === 0 ? `${String(Math.round(f * 23)).padStart(2, '0')}:00` : DAYS[Math.min(6, Math.floor(f * 7))];
    }
    function render(c, o = {}) {
      c.num.set(fmt(shown(c)), { instant: o.instant || Lab.reduced, fromZero: o.fromZero, dur: o.dur });
      const label = c.pick === null ? c.pages[c.page].label : `${c.pages[c.page].label} · ${when(c, c.pick)}`;
      if (c.label.textContent !== label) { if (o.instant || Lab.reduced || !o.slide) c.label.textContent = label; else slideText(c.label, label, o.slide); }
      const said = `${c.pages[c.page].label}${c.pick === null ? '' : ', ' + when(c, c.pick)}: ${fmt(shown(c))}, ${RANGES[c.range].toLowerCase()}`;
      c.scrub.setAttribute('aria-valuetext', said);
      if (o.announce) c.live.textContent = said;
    }
    function slideText(el, text, dir) {
      gsap.killTweensOf(el);
      gsap.to(el, { x: -26 * dir * cards[0].unit, opacity: 0, duration: .18, ease: 'power2.in', onComplete: () => { el.innerHTML = text; gsap.fromTo(el, { x: 26 * dir * cards[0].unit, opacity: 0 }, { x: 0, opacity: 1, duration: .5, ease: 'expo.out', clearProps: 'transform,opacity' }); } });
    }
    function target(c) { return c.isIns ? insSeries(c.page, c.range) : waveParams(c.page, c.range); }
    function morphTo(c, instant) {
      const now = c.isIns ? snapshotIns(c) : (c.wave || target(c));
      c.from = now; c.to = target(c);
      gsap.killTweensOf(c.morph);
      if (instant || Lab.reduced) { c.morph.k = 1; return; }
      c.morph.k = 0;
      gsap.to(c.morph, { k: 1, duration: .95, ease: 'expo.out' });
    }
    function snapshotIns(c) {
      if (!c.from || !c.to) return target(c);
      const n = Math.max(c.from.xs.length, c.to.xs.length), xs = [], vs = [];
      for (let i = 0; i < n; i++) { const a = sampleAt(c.from, i / (n - 1)), b = sampleAt(c.to, i / (n - 1)); xs.push(lerp(a[0], b[0], c.morph.k)); vs.push(lerp(a[1], b[1], c.morph.k)); }
      return { xs, vs };
    }

    /* ── pages ── */
    function setPage(c, i, o = {}) {
      i = clamp(i, 0, c.pages.length - 1);
      if (i === c.page) return;
      const dir = i > c.page ? 1 : -1;
      c.page = i; c.pick = null;
      c.dashes.forEach((d, j) => { const on = j === i; d.classList.toggle('is-on', on); d.setAttribute('aria-selected', String(on)); d.tabIndex = on ? 0 : -1; });
      morphTo(c);
      render(c, { slide: dir, announce: true });
      if (c.note) { const txt = c.pages[i].note.join('<br>'); if (Lab.reduced) c.note.innerHTML = txt; else slideText(c.note, txt, dir); }
      if (c.src) fillSources(c);
      if (!Lab.reduced) {
        gsap.fromTo(c.arrow, { y: 6 * c.unit, x: -6 * c.unit, opacity: 0 }, { y: 0, x: 0, opacity: 1, duration: .6, ease: 'back.out(2.5)', delay: .25, clearProps: 'transform,opacity' });
        // the lights drift somewhere new
        c.blobs.forEach((b, j) => { b.x.t = Math.sin(i * 1.9 + j * 1.3) * 26 * dir; b.y.t = Math.cos(i * 1.4 + j * 2.1) * 18; });
      }
    }
    function fillSources(c) {
      const src = c.pages[c.page].src;
      c.src.innerHTML = src.map(([n, v]) => `<li><span>${n}</span><b>${v}%</b><i style="--w:${v / 100}"></i></li>`).join('');
    }

    /* ── interaction ── */
    cards.forEach(c => {
      // range menu
      const items = [...c.menu.querySelectorAll('[role="menuitemradio"]')];
      const openMenu = open => {
        c.menuOpen = open;
        c.el.classList.toggle('is-menu', open);
        c.rangeBtn.setAttribute('aria-expanded', String(open));
        if (open) {
          if (!Lab.reduced) gsap.fromTo(items, { y: -6 * c.unit, opacity: 0 }, { y: 0, opacity: 1, duration: .35, stagger: .04, ease: 'expo.out', clearProps: 'transform,opacity' });
          (items[c.range] || items[0]).focus({ preventScroll: true });
        }
      };
      c.rangeBtn.addEventListener('click', () => openMenu(!c.menuOpen));
      items.forEach((it, i) => {
        it.addEventListener('click', () => {
          openMenu(false); c.rangeBtn.focus({ preventScroll: true });
          if (i === c.range) return;
          c.range = i; c.pick = null;
          items.forEach((x, j) => x.setAttribute('aria-checked', String(j === i)));
          if (Lab.reduced) c.rangeTxt.textContent = RANGES[i]; else slideText(c.rangeTxt, RANGES[i], i > 1 ? 1 : -1);
          morphTo(c); render(c, { announce: true });
        });
        it.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus(); }
          else if (e.key === 'Escape' || e.key === 'Tab') { openMenu(false); if (e.key === 'Escape') c.rangeBtn.focus(); }
        });
      });
      document.addEventListener('pointerdown', e => { if (c.menuOpen && !c.menu.contains(e.target) && !c.rangeBtn.contains(e.target)) openMenu(false); });

      // pages: dashes, keys, swipe
      c.dashes.forEach((d, i) => {
        d.addEventListener('click', () => setPage(c, i));
        d.addEventListener('keydown', e => {
          let j = null;
          if (e.key === 'ArrowRight') j = c.page + 1; else if (e.key === 'ArrowLeft') j = c.page - 1; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = c.pages.length - 1;
          if (j === null) return;
          e.preventDefault(); setPage(c, j); c.dashes[c.page].focus();
        });
      });
      let sw = null;
      c.el.addEventListener('pointerdown', e => {
        if (e.target.closest('button, .s06-scrub, .s06-menu')) return;
        sw = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
      });
      c.el.addEventListener('pointermove', e => {
        if (!sw || e.pointerId !== sw.id) return;
        const dx = (e.clientX - sw.x) / c.unit;
        if (!sw.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - sw.y) / c.unit) { sw.moved = true; try { c.el.setPointerCapture(e.pointerId); } catch (_) {} }
        if (sw.moved && !Lab.reduced) c.swX.t = clamp(dx * .35, -60, 60);
      });
      const endSwipe = e => {
        if (!sw) return;
        const dx = (e.clientX - sw.x) / c.unit, moved = sw.moved; sw = null;
        c.swX.t = 0;
        if (moved && Math.abs(dx) > 50) setPage(c, c.page + (dx < 0 ? 1 : -1));
      };
      c.el.addEventListener('pointerup', endSwipe);
      c.el.addEventListener('pointercancel', () => { sw = null; c.swX.t = 0; });

      // chart scrub
      const xOf = e => { const r = c.el.getBoundingClientRect(); return (e.clientX - r.left) / r.width * CW; };
      const pickAt = x => {
        if (c.isIns) { const Sh = c.to; x = clamp(x, Sh.xs[0], Sh.xs[Sh.xs.length - 1]); }
        else x = clamp(x, 48, 432);
        if (c.pick === x) return;
        c.pick = x; render(c);
        c.markOn.t = 1;
      };
      const release = () => { c.pick = null; c.markOn.t = 0; render(c); };
      let pressed = false, leave = 0;
      c.scrub.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; pressed = true; clearTimeout(leave); c.scrub.setPointerCapture(e.pointerId); pickAt(xOf(e)); });
      c.scrub.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || pressed) { clearTimeout(leave); pickAt(xOf(e)); } });
      c.scrub.addEventListener('pointerup', e => { pressed = false; if (e.pointerType !== 'mouse') leave = setTimeout(release, 1400); });
      c.scrub.addEventListener('pointercancel', () => { pressed = false; release(); });
      c.scrub.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !pressed) { clearTimeout(leave); leave = setTimeout(release, 320); } });
      c.scrub.addEventListener('keydown', e => {
        const lo = c.isIns ? c.to.xs[0] : 48, hi = c.isIns ? c.to.xs[c.to.xs.length - 1] : 432;
        const nowX = c.isIns ? c.to.xs[c.to.now] : c.to.peak, cur = c.pick ?? nowX, stepU = (hi - lo) / (c.isIns ? 24 : 28);
        let x = null;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') x = cur - stepU; else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') x = cur + stepU;
        else if (e.key === 'Home') x = lo; else if (e.key === 'End') x = hi; else if (e.key === 'Escape') { release(); return; }
        if (x === null) return;
        e.preventDefault(); pickAt(x); render(c, { announce: true });
      });
      c.scrub.addEventListener('blur', () => { if (c.pick !== null) release(); });

      // explore more (06·2)
      if (c.explore) {
        fillSources(c);
        c.explore.addEventListener('click', () => {
          c.open = !c.open;
          c.el.classList.toggle('is-open', c.open);
          c.explore.setAttribute('aria-expanded', String(c.open));
          c.glass.querySelector('.s06-more').setAttribute('aria-hidden', String(!c.open));
          c.glassK.t = c.open ? 1 : 0;
          if (c.open && !Lab.reduced) gsap.fromTo(c.src.children, { y: 10 * c.unit, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .06, delay: .12, ease: 'expo.out', clearProps: 'transform,opacity' });
          c.live.textContent = c.open ? 'Sources: ' + c.pages[c.page].src.map(([n, v]) => `${n} ${v}%`).join(', ') : '';
        });
      }
    });

    /* ── live ── */
    function liveStep() {
      cards.forEach(c => {
        if (Math.random() < .6) {
          const p = c.pages[c.page], d = Math.random() < .7 ? 1 : -1;
          p.v[c.range] = Math.max(1, p.v[c.range] + d);
          if (c.isIns) { c.to = insSeries(c.page, c.range); } else c.to = waveParams(c.page, c.range);
          if (c.pick === null) render(c);
        }
      });
    }

    /* ── frame ── */
    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const reduced = Lab.reduced, idle = reduced ? 0 : S.idle;
      cards.forEach(c => {
        const P = c.P, k = c.unit, lean = P.inside && P.mouse && !reduced;
        c.tiltX.t = lean ? -P.ny * 3 : 0; c.tiltY.t = lean ? P.nx * 3.6 : 0;
        step(c.tiltX, dt); step(c.tiltY, dt);
        if (!introTl) W.tf(c.el, `perspective(${(1400 * k).toFixed(0)}px) rotateX(${c.tiltX.v.toFixed(3)}deg) rotateY(${c.tiltY.v.toFixed(3)}deg)`);
        if (reduced) { c.swX.v = c.swX.t; c.swX.vel = 0; } else step(c.swX, dt);
        W.tf(c.body, `translate3d(${(c.swX.v * k).toFixed(2)}px,0,0)`);
        // lights: lean toward the pointer, drift, and the page offset
        c.blobs.forEach((b, j) => {
          const depth = .05 + j * .025;
          b.px.t = P.inside && !reduced ? (P.x - b.b[0]) * depth : 0; b.py.t = P.inside && !reduced ? (P.y - b.b[1]) * depth : 0;
          step(b.px, dt); step(b.py, dt); step(b.x, dt); step(b.y, dt);
          const dx = b.x.v + b.px.v + Math.sin(S.t * (.21 + j * .04) + j) * 9 * idle, dy = b.y.v + b.py.v + Math.cos(S.t * (.17 + j * .05) + j * 2) * 7 * idle;
          W.tf(b.n, `translate3d(${(dx * k).toFixed(1)}px,${(dy * k).toFixed(1)}px,0) rotate(${b.b[4]}deg)`);
        });
        // charts
        if (c.isIns) {
          drawIns(c, S.t);
          step(c.markOn, dt);
          const fNow = c.to.now / (c.to.xs.length - 1), nowX = lerp(sampleAt(c.from, fNow)[0], c.to.xs[c.to.now], c.morph.k);
          c.markX.t = c.pick === null ? nowX : c.pick;
          if (reduced) { c.markX.v = c.markX.t; c.markX.vel = 0; } else step(c.markX, dt);
          const mx = r2(c.markX.v);
          W.attr(c.mLine, 'x1', mx); W.attr(c.mLine, 'x2', mx); W.attr(c.mDot, 'cx', mx); W.attr(c.mHalo, 'cx', mx);
          const pulse = (S.t % 2.4) / 2.4;
          W.attr(c.mHalo, 'r', r2(4.6 + pulse * 10 * idle)); W.attr(c.mHalo, 'opacity', (idle * (1 - pulse) * .55).toFixed(3));
          W.attr(c.hiClip, 'width', r2(c.markX.v)); W.attr(c.fillHi, 'opacity', clamp(c.markOn.v, 0, 1).toFixed(3));
        } else {
          drawConv(c, S.t, idle);
          if (reduced) { c.glassK.v = c.glassK.t; } else step(c.glassK, dt);
          setVar(c.glass, '--k', clamp(c.glassK.v, 0, 1.08).toFixed(4));
          const pulse = (S.t % 2.2) / 2.2;
          W.attr(c.dRing, 'r', r2(11 + pulse * 14 * idle)); W.attr(c.dRing, 'opacity', (idle * (1 - pulse) * .5).toFixed(3));
        }
      });
      if (S.live && !reduced) { S.liveT -= dt; if (S.liveT <= 0) { S.liveT = 1.8; liveStep(); } }
    }

    /* ── intro ── */
    function finalState() {
      if (introTl) { introTl.kill(); introTl = null; }
      S.idle = 1;
      cards.forEach(c => {
        gsap.set([c.el, c.el.querySelector('.s06-glow'), c.el.querySelector('.s06-title'), c.el.querySelector('.s06-range-wrap'), c.el.querySelector('.s06-label'), c.el.querySelector('.s06-num'), c.el.querySelector('.s06-chart'), c.el.querySelector('.s06-note'), c.glass, c.el.querySelector('.s06-dots')].filter(Boolean), { clearProps: 'opacity,visibility,transform' });
        c.pick = null; c.from = target(c); c.to = target(c); c.morph.k = 1;
        render(c, { instant: true });
      });
      introEl.style.visibility = 'visible';
    }
    /* back to the shot: pages 4 and 5, weekly, glass closed */
    function resetState() {
      cards.forEach(c => {
        c.page = c.isIns ? 3 : 4; c.range = 1; c.pick = null; c.markOn.v = c.markOn.t = 0;
        c.dashes.forEach((d, j) => { const on = j === c.page; d.classList.toggle('is-on', on); d.setAttribute('aria-selected', String(on)); d.tabIndex = on ? 0 : -1; });
        c.menu.querySelectorAll('[role="menuitemradio"]').forEach((x, j) => x.setAttribute('aria-checked', String(j === 1)));
        gsap.killTweensOf([c.label, c.note, c.rangeTxt].filter(Boolean));
        gsap.set([c.label, c.note, c.rangeTxt].filter(Boolean), { clearProps: 'transform,opacity' });
        c.rangeTxt.textContent = RANGES[1];
        c.label.textContent = c.pages[c.page].label;
        if (c.note) c.note.innerHTML = c.pages[c.page].note.join('<br>');
        if (c.open) { c.open = false; c.el.classList.remove('is-open'); c.explore.setAttribute('aria-expanded', 'false'); c.glass.querySelector('.s06-more').setAttribute('aria-hidden', 'true'); c.glassK.t = 0; }
        if (c.src) fillSources(c);
        c.blobs.forEach(b => { b.x.t = 0; b.y.t = 0; });
      });
    }
    function intro() {
      if (introTl) introTl.kill();
      resetState();
      if (Lab.reduced) { finalState(); gsap.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5 }); return; }
      S.idle = 0;
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; } });
      tl.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, 0);
      cards.forEach((c, i) => {
        const at = i * .16, u = c.unit, q = s => c.el.querySelector(s);
        c.pick = null; c.from = target(c); c.to = target(c); c.morph.k = 1;
        c.num.set('0%', { instant: true });
        tl.fromTo(c.el, { y: 60 * u, rotationX: 16, scale: .94, opacity: 0, transformPerspective: 1400 * u }, { y: 0, rotationX: 0, scale: 1, opacity: 1, duration: 1.3, ease: 'expo.out', clearProps: 'transform,opacity' }, at)
          .fromTo(q('.s06-glow'), { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out', clearProps: 'transform,opacity' }, at + .1)
          .fromTo([q('.s06-title'), q('.s06-range-wrap')], { y: -10 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'expo.out', stagger: .06, clearProps: 'transform,opacity' }, at + .35)
          .fromTo(q('.s06-label'), { y: 8 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', clearProps: 'transform,opacity' }, at + .45)
          .call(() => render(c, { fromZero: true, dur: 1.4 }), null, at + .5)
          .fromTo(q('.s06-chart'), { opacity: 0 }, { opacity: 1, duration: .5, clearProps: 'opacity' }, at + .55)
          .fromTo(c.morph, { k: 0 }, { k: 1, duration: 1.2, ease: 'expo.out', onStart: () => { c.from = flatFrom(c); } }, at + .55)
          .fromTo(q('.s06-dots').children, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: .6, stagger: .05, ease: 'expo.out', clearProps: 'transform,opacity' }, at + .7);
        if (c.isIns) tl.fromTo(q('.s06-note'), { y: 10 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'expo.out', clearProps: 'transform,opacity' }, at + .85);
        else tl.fromTo(c.glass, { y: 30 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'expo.out', clearProps: 'transform,opacity' }, at + .8);
      });
      tl.to(S, { idle: 1, duration: 1.2, ease: 'sine.inOut' }, .9);
    }
    // where the intro morphs from: a flat line on the floor / a calm wave
    function flatFrom(c) {
      const T = target(c);
      if (c.isIns) return { xs: T.xs.slice(), vs: T.xs.map(() => 40 - 75 * .9) };
      return { peak: T.peak, bumps: T.bumps.map(([cx, , w, p]) => [cx, 0, w, p]) };
    }

    /* ── lifecycle ── */
    cards.forEach(c => { c.isIns ? buildIns(c) : buildConv(c); });
    function resize() { cards.forEach(c => { const w = c.el.clientWidth; if (w) c.unit = w / CW; c.num.remeasure(); c.P.drop(); }); }
    new ResizeObserver(resize).observe(stage);
    resize();
    Lab.fonts.then(resize);
    if (document.fonts) document.fonts.addEventListener('loadingdone', resize);
    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }
    finalState();
    if (!Lab.still) introEl.style.visibility = 'hidden';
    start();

    return {
      id: 6,
      intro: () => { introEl.style.visibility = ''; intro(); },
      replay: () => { introEl.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; S.liveT = .5; },
      setVisible(v) { if (v) start(); else stop(); },
      focus(i) {
        host.classList.toggle('has-focus', i !== null);
        cards.forEach((c, ci) => c.el.classList.toggle('is-focus', ci === i));
      },
      _cards: cards, _page: setPage,
    };
  }

  Lab.register({ id: 6, slug: 'insights', mount });
})();
