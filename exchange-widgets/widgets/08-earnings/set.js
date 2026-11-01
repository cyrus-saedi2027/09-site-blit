/* ==========================================================================
   Set 08 · Live Earnings (one card)
   Exchange-app Widget Lab · uses WidgetLab.kit + GSAP 3.13

   Units: 1u = 1px of the shot. The card is 434 × 434 u (radius 80) at
   (53, 43) in a 540 × 520 u stage on the shot's pale grey.

   Motion map
   · live     the rewards count up all the time (the last digits roll); the
              chart scrolls on; the gallery's live button speeds both up
   · scrub    point along the chart: a cross-hair rides the line and the big
              number reads what had been earned by then
   · APR      drag the yellow knob (or use the arrow keys): the rate rolls,
              the totals follow and the count speeds up or slows down
   · period   the "24h" chip turns through 7d, 30d and 1y; the chart reshapes
   · lean     the card turns toward the pointer; a faint green light follows
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab || !Lab.kit) { console.warn('[set 08] lab.js / kit.js missing'); return; }
  const { clamp, lerp, r2, spring, step, writer, pointer, Odo, monotone } = Lab.kit;
  const NS = 'http://www.w3.org/2000/svg';
  const SVG = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const SW = 540, SH = 520, CARD = { x: 53, y: 43, w: 434, h: 434 };
  const U = n => `calc(${r2(n)} * var(--u))`;
  const IB = L => (L - 1.2109) / 2 + .96875;   // Inter: baseline below the top of a line box (em)

  /* the shot's line (card units), traced column by column */
  const TRACE = [[0, 188], [10, 183], [16, 179], [22, 175], [29, 174.1], [33, 174.3], [37, 171.9], [41, 168.3], [45, 170.3], [49, 174.3], [53, 177], [57, 175.7], [61, 175.1], [65, 176.9], [69, 178.8], [73, 180.4], [77, 180.6], [81, 181.1], [85, 181.4], [89, 182.5], [93, 184.4], [97, 183], [101, 178.5], [105, 175], [109, 175.8], [113, 178.2], [117, 178.4], [121, 178.7], [125, 180.1], [129, 182.3], [133, 182.3], [137, 180.9], [141, 182.3], [145, 186.9], [149, 191.1], [153, 193.1], [157, 196.4], [161, 206.9], [165, 216.1], [169, 223.7], [173, 226.4], [177, 228.4], [181, 229.5], [185, 229.7], [189, 228.8], [193, 227], [197, 222.2], [201, 218.4], [205, 220.5], [209, 224.6], [213, 226.9], [217, 228.2], [221, 229.6], [225, 231], [229, 230.2], [233, 226.3], [237, 222], [241, 217.7], [245, 214.4], [249, 212.2], [253, 211.9], [257, 214.4], [261, 218], [265, 219.5], [269, 218.6], [273, 219], [277, 221.4], [281, 223.3], [285, 222.9], [289, 221.9], [293, 218.7], [297, 214.9], [301, 212.2], [305, 209], [309, 208.4], [313, 209.7], [317, 209.3], [321, 206.2], [325, 202.5], [329, 198.8], [333, 196.7], [337, 194.2], [341, 192.6], [345, 194.2], [349, 198], [353, 201.4], [357, 204], [361, 205], [365, 204.3], [369, 203.6], [373, 204.4], [377, 206], [381, 210.8], [385, 216], [389, 220.4], [393, 223.8], [397, 225.7], [401, 227.1], [405, 228], [411, 226], [417, 227], [423, 231], [429, 221], [434, 216]];
  const N = 110, DX = 434 / (N - 1);   // the chart is kept as N evenly spaced samples
  const sampleTrace = x => { for (let i = 0; i < TRACE.length - 1; i++) if (x <= TRACE[i + 1][0]) return lerp(TRACE[i][1], TRACE[i + 1][1], (x - TRACE[i][0]) / (TRACE[i + 1][0] - TRACE[i][0])); return TRACE[TRACE.length - 1][1]; };
  const BASE = Array.from({ length: N }, (_, i) => sampleTrace(i * DX));
  // other periods: the same mood, reshaped (seeded, so they never change)
  function shapeFor(p) {
    if (p === 0) return BASE.slice();
    let seed = 7 + p * 13; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    let v = 186, vel = 0; const out = [];
    for (let i = 0; i < N; i++) { vel = vel * .86 + (rnd() - .5) * 4.2 - (v - [0, 200, 196, 192][p]) * .02 - (p === 3 ? .06 : 0); v = clamp(v + vel, 166, 232); out.push(v); }
    // a little smoothing
    return out.map((_, i) => (out[Math.max(0, i - 2)] + out[Math.max(0, i - 1)] + out[i] + out[Math.min(N - 1, i + 1)] + out[Math.min(N - 1, i + 2)]) / 5);
  }
  const PERIODS = [['24h', 12.311], ['7d', 86.177], ['30d', 369.33], ['1y', 1521.32]];
  const APR = { min: 2.63, ref: 6.42, max: 15.32, x0: 31, xr: 120.5, x1: 403 };
  const aprAt = x => x <= APR.xr ? lerp(APR.min, APR.ref, (x - APR.x0) / (APR.xr - APR.x0)) : lerp(APR.ref, APR.max, (x - APR.xr) / (APR.x1 - APR.xr));
  const xAt = a => a <= APR.ref ? lerp(APR.x0, APR.xr, (a - APR.min) / (APR.ref - APR.min)) : lerp(APR.xr, APR.x1, (a - APR.ref) / (APR.max - APR.ref));
  const PRINCIPAL = 22000.31, TOTAL_REWARDS = 1521.32;
  const money = (v, dp = 2) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });

  const CAL = '<svg viewBox="0 0 17 19" aria-hidden="true"><path d="M3.2 2.2h10.6A3.2 3.2 0 0 1 17 5.4v10.4a3.2 3.2 0 0 1-3.2 3.2H3.2A3.2 3.2 0 0 1 0 15.8V5.4a3.2 3.2 0 0 1 3.2-3.2zM1.8 7.6v8.2c0 .8.6 1.4 1.4 1.4h10.6c.8 0 1.4-.6 1.4-1.4V7.6z"/><rect x="4" y="0" width="2" height="4.4" rx="1"/><rect x="11" y="0" width="2" height="4.4" rx="1"/><rect x="1.8" y="7.6" width="13.4" height="9.6" rx="1.4"/></svg>';
  const HTML = `<div class="w08-stage">
  <div class="w08-back" aria-hidden="true"></div>
  <div class="w08-intro">
    <article class="w08-card" aria-label="Live earnings">
      <i class="w08-shadow" aria-hidden="true"></i>
      <div class="w08-in">
        <i class="w08-glow" aria-hidden="true"></i>
        <svg class="w08-svg" viewBox="0 0 434 434" aria-hidden="true" focusable="false"><defs></defs><g class="js-chart"></g><g class="js-track"></g></svg>
        <p class="w08-abs w08-label js-label" style="left:${U(30.8)};top:${U(63 - IB(1) * 20)}">Your Rewards:</p>
        <button type="button" class="w08-period" aria-label="Period: 24 hours. Change">${CAL}<span class="js-period">24h</span></button>
        <div class="w08-abs w08-big" style="left:${U(29.5)};top:${U(131.5 - IB(1.2) * 62)}"><span class="w08-int js-int"></span><span class="w08-dec js-dec"></span></div>
        <div class="w08-scrub" tabindex="0" role="slider" aria-label="Rewards over the period" aria-valuemin="0" aria-valuemax="100"></div>
        <p class="w08-abs w08-label" style="left:${U(30.6)};top:${U(270 - IB(1) * 20)}">APR:</p>
        <p class="w08-abs w08-value" style="right:${U(29.4)};top:${U(268 - IB(1) * 20)}"><span class="js-apr"></span></p>
        <div class="w08-track" tabindex="0" role="slider" aria-label="APR" aria-valuemin="2.63" aria-valuemax="15.32"></div>
        <i class="w08-knob" aria-hidden="true"></i>
        <p class="w08-abs w08-small" style="left:${U(31)};top:${U(307 - IB(1) * 13.5)}">2.63%</p>
        <p class="w08-abs w08-small" style="right:${U(32)};top:${U(307 - IB(1) * 13.5)}">15.32%</p>
        <p class="w08-abs w08-label" style="left:${U(30.6)};top:${U(348 - IB(1) * 20)}">Total Rewards:</p>
        <p class="w08-abs w08-value" style="right:${U(29.5)};top:${U(345.5 - IB(1) * 20)}"><span class="js-tr"></span></p>
        <p class="w08-abs w08-label" style="left:${U(30.6)};top:${U(390 - IB(1) * 20)}">Total Amount:</p>
        <p class="w08-abs w08-value" style="right:${U(30)};top:${U(388 - IB(1) * 20)}"><span class="js-ta"></span></p>
        <p class="w08-sr js-live" aria-live="polite"></p>
      </div>
    </article>
  </div>
</div>`;

  let counter = 0;
  function mount(host) {
    const uid = ++counter;
    host.classList.add('w08');
    host.setAttribute('dir', 'ltr'); host.setAttribute('lang', 'en');
    host.innerHTML = HTML;
    const $ = s => host.querySelector(s);
    const stage = $('.w08-stage'), introEl = $('.w08-intro'), card = $('.w08-card'), defs = $('defs');
    const W = writer(), P = pointer(stage, SW, SH);
    const S = {
      t: 0, unit: 1, running: false, idle: 1, live: false,
      period: 0, apr: APR.ref, earned: 0, data: BASE.slice(), from: null, morph: { k: 1 }, scroll: 0, pick: null,
      tiltX: spring(0, 90, 15), tiltY: spring(0, 90, 15), glow: spring(0, 90, 16),
      knob: spring(APR.xr, 260, 26), dragging: false, hot: spring(0, 160, 20), cross: spring(0, 200, 24), crossX: spring(300, 260, 26),
    };
    let introTl = null;
    const odo = { int: new Odo($('.js-int')), dec: new Odo($('.js-dec')), apr: new Odo($('.js-apr')), tr: new Odo($('.js-tr')), ta: new Odo($('.js-ta')) };

    /* ── chart ── */
    const fid = `w08f${uid}`, mid = `w08m${uid}`, gid = `w08g${uid}`;
    const fg = SVG('linearGradient', { id: fid, gradientUnits: 'userSpaceOnUse', x1: 0, y1: 166, x2: 0, y2: 252 }, defs);
    [[0, .17], [.55, .07], [1, 0]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#57fa87', 'stop-opacity': a }, fg));
    const mg = SVG('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1: 0, y1: 0, x2: 434, y2: 0 }, defs);
    [[0, .15], [.08, 1], [.92, 1], [1, .2]].forEach(([o, a]) => SVG('stop', { offset: o, 'stop-color': '#fff', 'stop-opacity': a }, mg));
    const mask = SVG('mask', { id: mid, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 434, height: 434 }, defs);
    const wipe = SVG('rect', { x: 0, y: 0, width: 434, height: 434, fill: `url(#${gid})` }, mask);
    const chart = $('.js-chart'), cg = SVG('g', { mask: `url(#${mid})` }, chart);
    const fill = SVG('path', { fill: `url(#${fid})` }, cg);
    const lines = [[12, .04], [6, .11], [2.6, 1]].map(([w, a]) => SVG('path', { fill: 'none', stroke: '#57fa87', 'stroke-width': w, 'stroke-opacity': a, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, cg));
    const crossL = SVG('rect', { y: 152, width: 1.2, height: 98, fill: '#fff', opacity: 0 }, chart);
    const crossD = SVG('circle', { r: 4.6, fill: '#57fa87', stroke: '#121212', 'stroke-width': 2, opacity: 0 }, chart);
    function series() {
      if (!S.from || S.morph.k >= 1) return S.data;
      return S.data.map((v, i) => lerp(S.from[i], v, S.morph.k));
    }
    function draw() {
      const d = series(), off = S.scroll * DX;
      const xs = d.map((_, i) => i * DX - off), ys = d;
      const path = monotone(xs, ys).d;
      lines.forEach(l => W.attr(l, 'd', path));
      W.attr(fill, 'd', `${path}L${r2(xs[xs.length - 1])},254L${r2(xs[0])},254Z`);
      return { xs, ys };
    }
    const yAtX = (geo, x) => { const i = clamp(Math.floor((x - geo.xs[0]) / DX), 0, N - 2), u = (x - geo.xs[i]) / DX; return lerp(geo.ys[i], geo.ys[i + 1], clamp(u, 0, 1)); };

    /* ── track ── */
    const tg = $('.js-track');
    const dashes = [];
    for (let x = 31; x < 404; x += 12) dashes.push(SVG('rect', { x: r2(x), y: 283, width: 6, height: 2, rx: 1, fill: '#707070' }, tg));

    /* ── values ── */
    const total = () => PERIODS[S.period][1] * S.apr / APR.ref;
    const rewardsAt = f => {   // what had been earned by fraction f of the period (follows the line's height)
      const d = S.data, k = Math.floor(f * (N - 1));
      let sum = 0, all = 0; d.forEach((y, i) => { const w = Math.max(.5, 252 - y); all += w; if (i <= k) sum += w; });
      return total() * sum / all;
    };
    function render(o = {}) {
      const v = S.pick === null ? total() + S.earned : rewardsAt(S.pick);
      const dp = 3, txt = v.toFixed(dp), [ip, fp] = txt.split('.');
      const quick = S.dragging ? .18 : null;   // while the knob moves, keep every figure legible
      odo.int.set('$' + Number(ip).toLocaleString('en-US'), { instant: o.instant, fromZero: o.fromZero, dur: quick ?? o.dur });
      odo.dec.set('.' + fp, { instant: o.instant, fromZero: o.fromZero, dur: quick ?? o.dur ?? .5, dir: o.dir });
      odo.apr.set(S.apr.toFixed(2) + '%', { instant: o.instant, fromZero: o.fromZero, dur: quick ?? .5 });
      const tr = TOTAL_REWARDS * S.apr / APR.ref;
      odo.tr.set(money(tr), { instant: o.instant, fromZero: o.fromZero, dur: quick ?? .6 });
      odo.ta.set(money(PRINCIPAL + tr), { instant: o.instant, fromZero: o.fromZero, dur: quick ?? .6 });
    }
    const label = $('.js-label');
    const timeAt = f => {
      const hrs = [24, 24 * 7, 24 * 30, 24 * 365][S.period], back = (1 - f) * hrs;
      if (S.period === 0) { const m = Math.round((18 * 60 - back * 60) / 5) * 5, mm = ((m % 1440) + 1440) % 1440; return `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`; }
      if (S.period === 3) return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Math.min(11, Math.floor(f * 12))];
      const days = Math.round(back / 24); return days ? `${days}d ago` : 'today';
    };

    /* ── scrub ── */
    const scrub = $('.w08-scrub');
    const pickAt = (x, o = {}) => {
      if (x === null) { if (S.pick === null) return; S.pick = null; S.cross.t = 0; label.textContent = 'Your Rewards:'; render(); return; }
      const f = clamp(x / 434, 0, 1); S.pick = f; S.cross.t = 1; S.crossX.t = x;
      if (S.cross.v < .05) { S.crossX.v = x; S.crossX.vel = 0; }
      label.textContent = `At ${timeAt(f)}:`; render({ dur: .4 });
      const said = `${timeAt(f)}: ${money(rewardsAt(f), 3)} earned`;
      scrub.setAttribute('aria-valuetext', said); scrub.setAttribute('aria-valuenow', Math.round(f * 100));
      if (o.announce) $('.js-live').textContent = said;
    };
    const cardX = e => { const r = card.getBoundingClientRect(); return (e.clientX - r.left) / r.width * 434; };
    let pressed = false, leave = 0;
    scrub.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; pressed = true; clearTimeout(leave); scrub.setPointerCapture(e.pointerId); pickAt(cardX(e)); });
    scrub.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || pressed) { clearTimeout(leave); pickAt(cardX(e)); } });
    scrub.addEventListener('pointerup', e => { pressed = false; if (e.pointerType !== 'mouse') leave = setTimeout(() => pickAt(null), 1400); });
    scrub.addEventListener('pointercancel', () => { pressed = false; pickAt(null); });
    scrub.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !pressed) { clearTimeout(leave); leave = setTimeout(() => pickAt(null), 300); } });
    scrub.addEventListener('keydown', e => {
      const cur = (S.pick ?? 1) * 434;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); pickAt(cur - 434 / 24, { announce: true }); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); pickAt(cur + 434 / 24, { announce: true }); }
      else if (e.key === 'Escape') pickAt(null);
    });
    scrub.addEventListener('blur', () => pickAt(null));

    /* ── APR slider ── */
    const track = $('.w08-track');
    const setApr = (a, o = {}) => {
      a = Math.round(clamp(a, APR.min, APR.max) * 100) / 100;
      if (a === S.apr && !o.force) return;
      S.apr = a; S.knob.t = xAt(a); render();
      track.setAttribute('aria-valuenow', a.toFixed(2)); track.setAttribute('aria-valuetext', `${a.toFixed(2)} percent a year`);
      if (o.announce) $('.js-live').textContent = `APR ${a.toFixed(2)} percent, total rewards ${money(TOTAL_REWARDS * a / APR.ref)}`;
    };
    track.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; track.setPointerCapture(e.pointerId); S.dragging = true; setApr(aprAt(clamp(cardX(e), APR.x0, APR.x1))); });
    track.addEventListener('pointermove', e => { if (S.dragging) setApr(aprAt(clamp(cardX(e), APR.x0, APR.x1))); });
    const drop = () => { if (!S.dragging) return; S.dragging = false; $('.js-live').textContent = `APR ${S.apr.toFixed(2)} percent`; };
    track.addEventListener('pointerup', drop); track.addEventListener('pointercancel', drop);
    track.addEventListener('keydown', e => {
      const stepA = e.shiftKey ? 1 : .1;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setApr(S.apr - stepA, { announce: true }); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setApr(S.apr + stepA, { announce: true }); }
      else if (e.key === 'Home') { e.preventDefault(); setApr(APR.min, { announce: true }); }
      else if (e.key === 'End') { e.preventDefault(); setApr(APR.max, { announce: true }); }
    });

    /* ── period chip ── */
    const periodBtn = $('.w08-period'), periodTxt = $('.js-period');
    periodBtn.addEventListener('click', () => {
      S.period = (S.period + 1) % PERIODS.length; S.earned = 0;
      const [name] = PERIODS[S.period];
      S.from = series(); S.data = shapeFor(S.period); S.scroll = 0;
      gsap.killTweensOf(S.morph);
      if (Lab.reduced) { S.morph.k = 1; periodTxt.textContent = name; }
      else {
        S.morph.k = 0; gsap.to(S.morph, { k: 1, duration: 1, ease: 'expo.out' });
        gsap.timeline().to(periodTxt, { yPercent: -70, opacity: 0, duration: .15, ease: 'power2.in' }).call(() => { periodTxt.textContent = name; }).fromTo(periodTxt, { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .45, ease: 'expo.out', clearProps: 'transform,opacity' });
        gsap.fromTo(periodBtn.querySelector('svg'), { rotationY: 0 }, { rotationY: 360, duration: .8, ease: 'expo.out', clearProps: 'transform' });
      }
      render({ dur: .9 });
      const long = { '24h': '24 hours', '7d': '7 days', '30d': '30 days', '1y': 'one year' }[name];
      periodBtn.setAttribute('aria-label', `Period: ${long}. Change`);
      $('.js-live').textContent = `Rewards over ${long}: ${money(total(), 3)}`;
    });

    /* ── frame ── */
    let tickT = 0, flowT = 0;
    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const k = S.unit, reduced = Lab.reduced, idle = reduced ? 0 : S.idle;
      // lean and light
      const cx = P.x - CARD.x, cy = P.y - CARD.y, inside = P.inside && cx >= 0 && cx <= CARD.w && cy >= 0 && cy <= CARD.h;
      const lean = inside && P.mouse && !reduced && !S.dragging;
      S.tiltX.t = lean ? -(cy / CARD.h * 2 - 1) * 3.4 : 0; S.tiltY.t = lean ? (cx / CARD.w * 2 - 1) * 4 : 0; S.glow.t = lean ? 1 : 0;
      step(S.tiltX, dt); step(S.tiltY, dt); step(S.glow, dt);
      if (!introTl) W.tf(card, `perspective(${(1400 * k).toFixed(0)}px) rotateX(${S.tiltX.v.toFixed(3)}deg) rotateY(${S.tiltY.v.toFixed(3)}deg)`);
      W.tf($('.w08-glow'), `translate3d(${(cx * k).toFixed(1)}px,${(cy * k).toFixed(1)}px,0)`); W.style($('.w08-glow'), 'opacity', clamp(S.glow.v, 0, 1).toFixed(3));
      // rewards accrue: the rate follows the APR; live mode runs faster
      if (!reduced && idle > 0) {
        tickT += dt * (S.live ? 3 : 1) * (S.apr / APR.ref);
        if (tickT >= .55) { tickT = 0; S.earned += total() * .00009; if (S.pick === null) render({ dur: .35 }); }
        // the chart flows: every couple of seconds a sample leaves on the left and a new one arrives
        flowT += dt * (S.live ? 2.2 : .5);
        S.scroll = clamp(flowT, 0, 1);
        if (flowT >= 1) {
          flowT = 0; S.scroll = 0;
          const d = S.data, last = d[N - 1], prev = d[N - 2];
          d.shift(); d.push(clamp(last + (last - prev) * .55 + (Math.random() - .52) * 4.5, 166, 232));
          if (S.from) S.from.shift(), S.from.push(d[N - 1]);
        }
      }
      const geo = draw();
      // cross-hair
      step(S.cross, dt); step(S.crossX, dt);
      const ca = clamp(S.cross.v, 0, 1).toFixed(3);
      W.attr(crossL, 'x', r2(S.crossX.v - .6)); W.attr(crossL, 'opacity', (ca * .45).toFixed(3));
      W.attr(crossD, 'cx', r2(S.crossX.v)); W.attr(crossD, 'cy', r2(yAtX(geo, S.crossX.v))); W.attr(crossD, 'opacity', ca);
      // knob and the lit part of the track
      if (reduced) { S.knob.v = S.knob.t; S.knob.vel = 0; } else step(S.knob, dt);
      S.hot.t = S.dragging || document.activeElement === track ? 1 : 0; step(S.hot, dt);
      W.tf($('.w08-knob'), `translate3d(${(S.knob.v * k).toFixed(2)}px,0,0) scale(${(1 + S.hot.v * .25).toFixed(3)})`);
      const hot = clamp(S.hot.v, 0, 1);
      dashes.forEach(dsh => { const on = +dsh.getAttribute('x') + 3 < S.knob.v; W.attr(dsh, 'fill', on && hot > .02 ? `rgb(${Math.round(lerp(112, 248, hot))},${Math.round(lerp(112, 225, hot))},${Math.round(lerp(112, 54, hot))})` : '#707070'); });
    }

    /* ── intro ── */
    function finalState() {
      if (introTl) { introTl.kill(); introTl = null; }
      S.idle = 1; S.period = 0; S.apr = APR.ref; S.earned = 0; S.data = BASE.slice(); S.from = null; S.morph.k = 1; S.scroll = 0; S.pick = null;
      S.knob.v = S.knob.t = APR.xr; periodTxt.textContent = '24h'; label.textContent = 'Your Rewards:';
      gsap.set([introEl, card, ...host.querySelectorAll('.w08-abs, .w08-period, .w08-knob')], { clearProps: 'opacity,visibility,transform' });
      wipe.setAttribute('width', 434);
      introEl.style.visibility = 'visible';
      render({ instant: true });
    }
    function intro() {
      finalState();
      if (Lab.reduced) { gsap.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5 }); return; }
      S.idle = 0;
      const u = S.unit;
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; } });
      tl.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, 0)
        .fromTo(card, { y: 56 * u, rotationX: 18, scale: .93, opacity: 0, transformPerspective: 1400 * u }, { y: 0, rotationX: 0, scale: 1, opacity: 1, duration: 1.3, ease: 'expo.out', clearProps: 'transform,opacity' }, .02)
        .fromTo(host.querySelectorAll('.w08-label, .w08-period'), { y: 10 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .06, ease: 'expo.out', clearProps: 'transform,opacity' }, .3)
        .call(() => render({ fromZero: true, dur: 1.4 }), null, .4)
        .fromTo(wipe, { attr: { width: 0 } }, { attr: { width: 434 }, duration: 1.4, ease: 'power2.inOut' }, .45)
        .fromTo(host.querySelectorAll('.w08-value, .w08-small'), { opacity: 0 }, { opacity: 1, duration: .6, stagger: .05, clearProps: 'opacity' }, .6)
        .fromTo(S.knob, { v: APR.x0 }, { v: APR.xr, duration: 1.2, ease: 'expo.out' }, .7)
        .fromTo(dashes, { opacity: 0 }, { opacity: 1, duration: .3, stagger: .012, clearProps: 'opacity' }, .6)
        .to(S, { idle: 1, duration: 1, ease: 'sine.inOut' }, 1.2);
    }

    /* ── lifecycle ── */
    function resize() { const w = stage.clientWidth; if (w) S.unit = w / SW; P.drop(); Object.values(odo).forEach(o => o.remeasure()); }
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
      id: 8,
      intro: () => { introEl.style.visibility = ''; intro(); },
      replay: () => { introEl.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; },
      setVisible(v) { if (v) start(); else stop(); },
      _state: S,
    };
  }

  Lab.register({ id: 8, slug: 'earnings', mount });
})();
