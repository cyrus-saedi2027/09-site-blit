/* ==========================================================================
   NetRate widgets · kit (window.NR)
   A widget reads ONE answer object (data.js) and computes nothing: every number,
   change, rank and gap arrives ready. This kit only formats (digits, separators,
   ages), draws (scales, paths), and — for the preview only — turns the page's
   controls (state, direction, volatile day) into the answer a widget would get.
   Everything marked "demo" is preview machinery and does not ship in the app.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR = { widgets: [], data: window.NR_DATA, text: window.NR_TEXT };
  const D = NR.data;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const r2 = n => Math.round(n * 100) / 100;
  const clone = o => JSON.parse(JSON.stringify(o));
  Object.assign(NR, { clamp, lerp, r2, clone });

  /* ── motion helpers ── */
  const mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  NR.scale = () => (window.WidgetLab && WidgetLab.timeScale) || 1;            // the slow-motion switch
  NR.reduced = () => mqReduce.matches || !!(window.WidgetLab && WidgetLab.still) || /[?&]still\b/.test(location.search);
  NR.ease = {
    out3: t => 1 - Math.pow(1 - t, 3),
    expo: t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    inOut: t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    back: t => { const s = 1.7, c = s + 1; return 1 + c * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2); },
  };
  /* tween(ms, fn(t 0…1 eased), ease) → promise; cancel via the returned .stop() */
  NR.tween = (ms, fn, ease = NR.ease.out3) => {
    let stop = false, raf = 0;
    const p = new Promise(res => {
      const t0 = performance.now();
      const frame = now => {
        if (stop) { res(false); return; }
        const t = clamp((now - t0) * NR.scale() / ms, 0, 1);
        fn(ease(t));
        if (t < 1) raf = requestAnimationFrame(frame); else res(true);
      };
      raf = requestAnimationFrame(frame);
    });
    p.stop = () => { stop = true; cancelAnimationFrame(raf); };
    return p;
  };

  /* ── numbers and text ── */
  const FA = '۰۱۲۳۴۵۶۷۸۹';
  const SEP = {
    fa: { th: '٬', dec: '٫', pct: '٪' },       // Persian thousands separator, decimal mark and percent sign
    en: { th: ',', dec: '.', pct: '%' },
  };
  const group = (s, th) => s.replace(/\B(?=(\d{3})+(?!\d))/g, th);
  const num = v => (v == null || v === '' ? NaN : parseFloat(v));
  NR.num = num;
  NR.digits = (s, lang) => (lang === 'fa' ? String(s).replace(/\d/g, d => FA[+d]) : String(s));
  NR.int = (v, lang) => NR.digits(group(String(Math.round(Math.abs(num(v)))), SEP[lang].th), lang);
  NR.fixed = (v, d, lang) => {
    const [i, f] = Math.abs(num(v)).toFixed(d).split('.');
    return NR.digits(group(i, SEP[lang].th) + (f ? SEP[lang].dec + f : ''), lang);
  };
  /* -1 / 0 / 1; a move under half a basis point of a percent reads as flat */
  NR.sign = v => { const n = num(v); return !isFinite(n) || Math.abs(n) < .005 ? 0 : n > 0 ? 1 : -1; };
  NR.pct = (v, lang, o = {}) => {
    const s = NR.sign(v), body = NR.fixed(v, o.dec == null ? 2 : o.dec, lang) + SEP[lang].pct;
    return (o.noSign || !s ? '' : s > 0 ? '+' : '−') + body;
  };
  /* a toman amount with a sign, whole numbers: "+210" */
  NR.signedInt = (v, lang) => { const s = NR.sign(v); return (s > 0 ? '+' : s < 0 ? '−' : '') + NR.int(v, lang); };
  /* long gaps in the short form: 1.1 million toman (the brief: "۱٫۱ میلیون تومان") */
  NR.short = (v, lang) => {
    const n = Math.abs(num(v));
    if (n >= 1e6) return lang === 'fa' ? `${NR.fixed(n / 1e6, 1, lang)} میلیون تومان` : `${NR.fixed(n / 1e6, 1, lang)}M toman`;
    return lang === 'fa' ? `${NR.int(n / 1e3, lang)} هزار تومان` : `${NR.int(n / 1e3, lang)}K toman`;
  };
  /* demo: the same number with its last digits changed, so a refresh has something to roll from */
  NR.perturb = s => { let n = 0; return [...String(s)].reverse().map(ch => { const i = '0123456789'.indexOf(ch), j = FA.indexOf(ch), d = i >= 0 ? i : j; if (d < 0 || n >= 3) return ch; n++; const nd = (d + 2 + n * 3) % 10; return i >= 0 ? String(nd) : FA[nd]; }).reverse().join(''); };
  NR.fill = (tpl, vars) => tpl.replace(/\{(\w+)\}/g, (m, k) => (vars[k] == null ? m : vars[k]));
  NR.t = (lang, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), NR.text[lang]);
  /* a number is always its own isolated left-to-right run, so it never jumps around in right-to-left text */
  NR.n = s => `<bdi class="nr-n">${s}</bdi>`;

  /* ── ages ──
     demo: London in September is UTC+1; the app uses the device's own zone. */
  const TZ_MIN = 60;
  const localDay = ms => Math.floor((ms + TZ_MIN * 60000) / 86400000);
  NR.localTime = ms => {   // "09:41"
    const m = Math.floor((ms + TZ_MIN * 60000) / 60000) % 1440;
    return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  };
  /* tier is only a hint for colour and the "expired" label; the words come from the time itself */
  NR.age = (iso, nowMs, lang) => {
    const t = Date.parse(iso), mins = Math.max(0, (nowMs - t) / 60000), T = NR.text[lang].age;
    const tier = mins <= 90 ? 'fresh' : mins <= 360 ? 'aging' : mins <= 1440 ? 'stale' : 'expired';
    let text;
    if (mins < 1) text = T.now;
    else if (mins < 60) text = NR.fill(T.min, { n: NR.digits(Math.floor(mins), lang) });
    else {
      const dd = localDay(nowMs) - localDay(t);
      if (dd <= 0) text = NR.fill(T.hour, { n: NR.digits(Math.floor(mins / 60), lang) });
      else if (dd === 1) text = T.yday;
      else text = NR.fill(T.days, { n: NR.digits(dd, lang) });
    }
    return { text, tier, mins };
  };
  NR.office = (id, lang, fallback) => {
    const o = D.offices.find(x => x.id === id);
    return o ? { name: o['name_' + lang], city: o['city_' + lang] } : { name: fallback || id, city: '' };
  };

  /* ── series helpers (monotone cubic: flat at peaks, no overshoot) ── */
  NR.monotone = (xs, ys) => {
    const n = xs.length, m = new Array(n).fill(0);
    for (let i = 1; i < n - 1; i++) {
      const h0 = xs[i] - xs[i - 1], h1 = xs[i + 1] - xs[i], s0 = (ys[i] - ys[i - 1]) / h0, s1 = (ys[i + 1] - ys[i]) / h1;
      const p = (s0 * h1 + s1 * h0) / (h0 + h1);
      m[i] = (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), .5 * Math.abs(p)) || 0;
    }
    if (n > 1) { m[0] = (ys[1] - ys[0]) / (xs[1] - xs[0]); m[n - 1] = (ys[n - 1] - ys[n - 2]) / (xs[n - 1] - xs[n - 2]); }
    return x => {
      if (n === 1) return ys[0];
      if (x <= xs[0]) return ys[0];
      if (x >= xs[n - 1]) return ys[n - 1];
      let i = 0; while (x > xs[i + 1]) i++;
      const dx = xs[i + 1] - xs[i], t = (x - xs[i]) / dx, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * dx * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * dx * m[i + 1];
    };
  };
  /* points → { ts (ms), vs }, one value per working day / bucket, last point = the latest day */
  NR.pts = (points, key) => ({ ts: points.map(p => Date.parse(p.date + 'T12:00:00Z')), vs: points.map(p => num(p[key])) });
  /* value domain with room: never from zero, and a quiet day never looks like a crash
     (the visible span is at least `minSpan` of the price level) */
  NR.domain = (vs, minSpan = .018, pad = .14) => {
    let lo = Math.min(...vs), hi = Math.max(...vs); const mid = (lo + hi) / 2, min = mid * minSpan;
    if (hi - lo < min) { lo = mid - min / 2; hi = mid + min / 2; }
    const p = (hi - lo) * pad;
    return [lo - p, hi + p];
  };
  /* N evenly spaced samples of the smooth curve between t0 and t1 */
  NR.sample = (s, t0, t1, N) => {
    const f = NR.monotone(s.ts, s.vs), out = new Array(N);
    for (let i = 0; i < N; i++) out[i] = f(t0 + (t1 - t0) * i / (N - 1));
    return out;
  };
  /* Catmull-Rom → cubic Béziers through (xs, ys) */
  NR.smooth = (xs, ys) => {
    const n = xs.length; let d = `M${r2(xs[0])},${r2(ys[0])}`;
    for (let i = 0; i < n - 1; i++) {
      const i0 = Math.max(0, i - 1), i3 = Math.min(n - 1, i + 2);
      d += `C${r2(xs[i] + (xs[i + 1] - xs[i0]) / 6)},${r2(ys[i] + (ys[i + 1] - ys[i0]) / 6)} ${r2(xs[i + 1] - (xs[i3] - xs[i]) / 6)},${r2(ys[i + 1] - (ys[i3] - ys[i]) / 6)} ${r2(xs[i + 1])},${r2(ys[i + 1])}`;
    }
    return d;
  };

  /* ── rolling digits: the numeric-text transition (iOS contentTransition(.numericText())) ──
     Digits that changed roll vertically, last digit first. Label B: only at a refresh or a button press. */
  NR.Roll = class {
    constructor(el) { this.el = el; this.text = null; el.classList.add('nr-roll'); }
    set(text, o = {}) {
      const el = this.el, prev = this.text; this.text = text;
      if (prev === text) return;
      const animate = o.animate && prev !== null && !NR.reduced();
      el.setAttribute('data-text', text);
      el.textContent = '';
      const n = text.length, m = prev ? prev.length : 0, dir = o.dir || 1, k = 1 / NR.scale();
      for (let i = 0; i < n; i++) {
        const cell = document.createElement('span'), nv = document.createElement('span');
        cell.className = 'rc'; nv.className = 'rc-v'; nv.textContent = text[i]; cell.appendChild(nv);
        if (animate) {
          const j = m - (n - i), oc = j >= 0 ? prev[j] : null, delay = (n - 1 - i) * 55 * k;
          const opt = { duration: 520 * k, delay, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' };
          if (oc !== text[i]) {
            if (oc !== null) {
              const ov = document.createElement('span'); ov.className = 'rc-o'; ov.textContent = oc; cell.appendChild(ov);
              const a = ov.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: `translateY(${-dir * 75}%)`, opacity: 0 }], { ...opt, fill: 'both' });
              a.onfinish = () => ov.remove();
            }
            nv.animate([{ transform: `translateY(${dir * 75}%)`, opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], opt);
          }
        }
        el.appendChild(cell);
      }
    }
  };

  /* ── the demo's answer builder ──
     Turns the preview controls into the answer object a widget would be handed.
     state: normal | not_posted | closed | expired | offline | unset | gallery
     dir:   send | recv       stress: calm | down | up (a volatile day, about 5 %) */
  const TIME_KEYS = ['recorded_at', 'oldest_at', 'generated_at', 'next_refresh_at'];
  function shiftTimes(o, ms) {
    if (Array.isArray(o)) { o.forEach(x => shiftTimes(x, ms)); return o; }
    if (o && typeof o === 'object') {
      Object.keys(o).forEach(k => {
        if (TIME_KEYS.includes(k) && typeof o[k] === 'string') o[k] = new Date(Date.parse(o[k]) + ms).toISOString().replace('.000Z', 'Z');
        else shiftTimes(o[k], ms);
      });
    }
    return o;
  }
  const money = v => (Math.round(v * 100) / 100).toFixed(2);
  const pctOf = (a, b) => ((a / b - 1) * 100).toFixed(2);
  /* demo only: the sample file has no history for the "receive" direction, so it is derived from the send history */
  function synthRecv(send, recv) {
    const f = num(recv.market.average) / num(send.market.average), f2 = num(recv.best[0].rate) / num(send.market.lowest);
    const series = clone(send.series);
    Object.keys(series).forEach(k => {
      const S = series[k];
      S.points.forEach(p => {
        const low = num(p.low);
        p.average = money(num(p.average) * f); p.best = money(low * f2); p.low = money(low * f); p.high = money(num(p.high) * f);
      });
      fixStats(S);
    });
    const week = clone(send.week);
    week.days.forEach(d => { d.this = money(num(d.this) * f); d.last = money(num(d.last) * f); });
    fixWeek(week, true);
    return { series, week };
  }
  function fixStats(S) {
    const a = S.points.map(p => num(p.average)), b = S.points.map(p => num(p.best));
    S.points.forEach((p, i) => { p.change_pct = i ? pctOf(a[i], a[i - 1]) : null; });
    S.average_change_pct = pctOf(a[a.length - 1], a[0]); S.best_change_pct = pctOf(b[b.length - 1], b[0]);
    S.stats = { high: money(Math.max(...a)), low: money(Math.min(...a)), mean: money(a.reduce((s, x) => s + x, 0) / a.length) };
  }
  function fixWeek(W, lowIsBest) {
    const t = W.days.map(d => num(d.this)), l = W.days.map(d => num(d.last));
    W.this_average = money(t.reduce((s, x) => s + x, 0) / t.length); W.last_average = money(l.reduce((s, x) => s + x, 0) / l.length);
    W.change_pct = pctOf(num(W.this_average), num(W.last_average));
    const i = t.indexOf(lowIsBest ? Math.min(...t) : Math.max(...t)); const d = W.days[i];
    W.best_day = { date: d.date, weekday: d.weekday, value: d.this };
  }
  function volatile(vm, kind) {   // demo: today's numbers move about 5 %
    const k = kind === 'down' ? .953 : 1.047, S = vm.snap, M = S.market, avg0 = num(M.average), chg0 = num(M.average_change);
    const prevAvg = avg0 - chg0;
    M.average = money(avg0 * k); M.average_change = money(avg0 * k - prevAvg); M.average_change_pct = pctOf(avg0 * k, prevAvg);
    M.highest = money(num(M.highest) * k); M.lowest = money(num(M.lowest) * k);
    S.best.forEach(b => {
      const prev = num(b.rate) / (1 + num(b.change_pct) / 100);
      b.rate = money(num(b.rate) * k); b.change_pct = pctOf(num(b.rate), prev);
      b.spark[b.spark.length - 1] = b.rate;
    });
    Object.values(S.series).forEach(sr => {
      const p = sr.points[sr.points.length - 1];
      ['average', 'best', 'low', 'high'].forEach(key => { p[key] = money(num(p[key]) * k); });
      fixStats(sr);
    });
    const days = S.week.days; days[days.length - 1].this = money(num(days[days.length - 1].this) * k); fixWeek(S.week, vm.better === 'lower');
  }
  /* demo: the sample file's history is a smooth uptrend. A real market goes up and down, so the preview adds
     a seeded, day-aligned wobble (waves of 2 to 300 days plus a little daily jitter) to every point of every series.
     Today's point is never touched (the headline and the end of the line stay equal); every change, high, low and
     mean is recomputed. The server sends real days; "sample file (smooth)" in the controls shows the raw file. */
  const WAVES = [[2.3, .9], [3.7, 1.7], [6.1, 2.6], [9.4, 4.1], [15, 5.3], [26, .8], [41, 2.2], [67, 4.0], [110, 1.1], [180, 3.5], [300, 5.0]];
  const wob = u => WAVES.reduce((s, [T, ph]) => s + .0011 * Math.pow(T, .45) * Math.sin(2 * Math.PI * u / T + ph), 0);
  const jit = n => { n = Math.imul(n ^ n >>> 15, 0x2c1b3c6d); n = Math.imul(n ^ n >>> 12, 0x297a2d39); return ((n ^ n >>> 15) >>> 0) / 4294967296 - .5; };
  NR._wob = wob; NR._jit = jit;   // shared with the widgets that need more history of their own (the board)
  const dayMs = d => Date.parse(d + 'T12:00:00Z');
  function natural(snap) {
    const s = clone(snap), last = dayMs(s.series['1w'].points[s.series['1w'].points.length - 1].date), w0 = wob(0);
    const f = (ms, shift = 0) => { const u = (last - ms) / 86400000 + shift; return u < .01 ? 0 : (wob(u) - w0) + jit(Math.round(ms / 86400000) + shift * 7) * .0019; };
    /* the day's spread is not constant either: high (= best when sending) and low move on their own a little; today's point is left alone */
    Object.values(s.series).forEach(sr => { sr.points.forEach((p, i) => {
      const k = 1 + f(dayMs(p.date)), d = Math.round(dayMs(p.date) / 86400000), last = i === sr.points.length - 1;
      const kh = last ? 1 : 1 + .016 * jit(d * 5 + 3), kl = last ? 1 : 1 + .026 * jit(d * 5 + 4);
      p.average = money(num(p.average) * k); p.high = money(num(p.high) * k * kh); p.best = money(num(p.best) * k * kh); p.low = money(num(p.low) * k * kl);
    }); fixStats(sr); });
    s.week.days.forEach(d => { const ms = dayMs(d.date); d.this = money(num(d.this) * (1 + 1.5 * f(ms))); d.last = money(num(d.last) * (1 + 1.5 * f(ms, 7))); });   // six days only: a larger swing so the week reads as days, not a ramp
    fixWeek(s.week, false);
    return s;
  }
  NR.model = (S, L) => {
    const lang = S.lang, st = S.st, dir = L.dir || 'send', recv = dir === 'recv';
    if (st === 'unset' || st === 'gallery') return { st, lang, dir, empty: true, banner: st === 'unset' ? 'unset' : null };
    let snap, now, shift = 0;
    const sendFull = S.stress === 'raw' ? D.snapshot : (NR._nat || (NR._nat = natural(D.snapshot)));
    if (recv) { snap = clone(D.snapshot_receive); const x = synthRecv(sendFull, snap); snap.series = x.series; snap.week = x.week; }
    else snap = clone(sendFull);
    now = Date.parse(snap.generated_at);
    if (st === 'not_posted' || st === 'closed') {
      const sample = st === 'not_posted' ? D.snapshot_morning_not_posted : D.snapshot_sunday;
      if (!recv) { const s2 = clone(sample); s2.series = clone(sendFull.series); s2.week = clone(sendFull.week); snap = s2; }
      else { shift = Date.parse(sample.market.recorded_at) - Date.parse(sendFull.market.recorded_at); shiftTimes(snap, shift); snap.market.status = sample.market.status; }
      now = Date.parse(sample.generated_at) + (recv && st === 'not_posted' ? 0 : 0);
      if (recv && st === 'closed') now = Date.parse(sample.generated_at);
    } else if (st === 'expired') now += 27 * 3600000;
    else if (st === 'offline') now += (2 * 60 + 10) * 60000;
    const vm = { st, lang, dir, now, snap, better: snap.better, market: snap.market, best: snap.best, series: snap.series, week: snap.week, synth: recv };
    if (S.stress === 'down' || S.stress === 'up') volatile(vm, S.stress);
    const top = vm.best[0];
    vm.top = top;
    const raw = NR.age(top.recorded_at, now, lang);
    vm.banner = st === 'offline' ? 'offline' : vm.market.status === 'closed' ? 'closed' : vm.market.status === 'not_posted' ? 'notPosted' : raw.tier === 'expired' ? 'expired' : null;
    vm.dim = vm.banner === 'notPosted' || vm.banner === 'expired';
    /* an age as the widget shows it: on a Sunday "yesterday" is expected, so it is not flagged as old */
    vm.ageOf = iso => { const a = NR.age(iso, now, lang); if (vm.banner === 'closed') a.tier = 'fresh'; return a; };
    vm.topAge = vm.ageOf(top.recorded_at);
    vm.mktAge = vm.ageOf(vm.market.recorded_at);
    return vm;
  };

  /* ── sizes (points on iOS, dp on Android; approximate, to be confirmed on real devices) ── */
  NR.SIZES = {
    ios393: { small: [170, 170], medium: [364, 170], large: [364, 382], 'lock-rect': [172, 76], 'lock-circle': [76, 76], 'lock-inline': [172, 24] },
    ios390: { small: [158, 158], medium: [338, 158], large: [338, 354], 'lock-rect': [160, 72], 'lock-circle': [72, 72], 'lock-inline': [160, 24] },
    android: { small: [160, 160], medium: [336, 160], large: [336, 340], strip: [336, 72] },
  };
  NR.register = def => NR.widgets.push(def);

  /* ── helpers the later widgets share ── */
  /* weekday names (data: 1 = Monday … 7 = Sunday) */
  NR.weekday = (n, lang) => (lang === 'fa' ? ['', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه', 'یکشنبه'] : ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])[n];
  /* round tick values inside [lo, hi]: about n of them, on a 1-2-5 step */
  NR.ticks = (lo, hi, n = 3) => {
    const raw = (hi - lo) / n, p = Math.pow(10, Math.floor(Math.log10(raw))), step = [1, 2, 2.5, 5, 10].map(m => m * p).find(s => s >= raw) || raw;
    const out = []; for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(v);
    return out;
  };
  /* a grey placeholder block in design units: s = start, e = end, t = top, b = bottom */
  NR.ph = o => {
    const u = n => `calc(${n} * var(--u))`, st = [];
    if (o.s != null) st.push(`inset-inline-start:${u(o.s)}`); if (o.e != null) st.push(`inset-inline-end:${u(o.e)}`);
    if (o.t != null) st.push(`top:${u(o.t)}`); if (o.b != null) st.push(`bottom:${u(o.b)}`);
    if (o.w != null) st.push(`width:${u(o.w)}`); if (o.h != null) st.push(`height:${u(o.h)}`); if (o.r != null) st.push(`border-radius:${u(o.r)}`);
    return `<i class="nr-ph" style="${st.join(';')}"></i>`;
  };
  /* an age node: clock + words; amber and with the clock only when the figure is getting old */
  NR.setAge = (node, a) => {
    const keep = node.className.split(' ').filter(c => c.startsWith('js-')).join(' ');
    node.className = ('nr-age ' + keep + (a.tier !== 'fresh' ? ' is-warn' : '')).trim();
    node.innerHTML = NR.icon.clock() + `<span>${a.text}</span>`;
  };
  NR.dirWord = (s, lang) => NR.text[lang].word[s > 0 ? 'up' : s < 0 ? 'down' : 'flat'];
  /* a chevron for "this is a button with a choice" (not the two-arrows exchange symbol) */
  NR.chevron = cls => `<svg class="nr-i ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.6 4.6 6 8l3.4-3.4"/></svg>`;

  /* ── small shared drawings ── */
  const svg = (d, o = {}) => `<svg class="nr-i${o.cls ? ' ' + o.cls : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
  NR.icon = {
    up: cls => `<svg class="nr-i nr-arrow ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 10.2V2.4M2.6 5.6 6 2.2l3.4 3.4"/></svg>`,
    down: cls => `<svg class="nr-i nr-arrow ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M6 1.8v7.8M2.6 6.4 6 9.8l3.4-3.4"/></svg>`,
    flat: cls => `<svg class="nr-i nr-arrow ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.4 6h7.2"/></svg>`,
    clock: cls => `<svg class="nr-i ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><circle cx="6" cy="6" r="4.6"/><path d="M6 3.4V6l1.9 1.2"/></svg>`,
    pause: cls => `<svg class="nr-i ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M4.2 2.8v6.4M7.8 2.8v6.4"/></svg>`,
    offline: cls => `<svg class="nr-i ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M1.8 5.2a6 6 0 0 1 8.4 0M3.6 7a3.4 3.4 0 0 1 4.8 0M6 9.3h.01M2 2l8 8"/></svg>`,
    gear: cls => `<svg class="nr-i ${cls || ''}" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><circle cx="6" cy="6" r="1.7"/><path d="M6 1.4v1.3M6 9.3v1.3M1.4 6h1.3M9.3 6h1.3M2.8 2.8l.9.9M8.3 8.3l.9.9M9.2 2.8l-.9.9M3.7 8.3l-.9.9"/></svg>`,
  };
  NR.dirIcon = (s, cls) => (s > 0 ? NR.icon.up(cls) : s < 0 ? NR.icon.down(cls) : NR.icon.flat(cls));
  /* the status chip in a widget's head: icon + short label (the label always says it; colour never has to) */
  NR.bannerIcon = b => (b === 'offline' ? NR.icon.offline() : b === 'closed' ? NR.icon.pause() : b === 'unset' ? NR.icon.gear() : NR.icon.clock());
})();
