/* ==========================================================================
   N01 · rate-large  ("Rate today", large)  — built from sample 01 (Budget)
   Same form as the sample: a thin big number, a change chip, a fan of objects at the
   top corner, a line with an arrowhead and a soft area under it. The bills become
   office slips (ranks 1–3), the day columns become the range buttons.
   Reads one answer object (NR_DATA shape) and computes nothing.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  /* ── texts specific to this widget (fa / en); the shared words live in i18n.js ── */
  const TEXT = {
    fa: { gallery: 'نرخ امروز', galleryLine: 'بیشترین تومان، سه صرافی اول و نمودار بازار', dirLabel: 'جهت', rangeLabel: 'بازه‌ی نمودار', chartLabel: 'نمودار بیشترین تومان' },
    en: { gallery: 'Rate today', galleryLine: 'Most toman, the first three offices and a market chart', dirLabel: 'Direction', rangeLabel: 'Chart range', chartLabel: 'Most-toman chart' },
  };
  const RANGES = ['1w', '1m', '3m', '1y'];
  let uid = 0;

  /* ── the geometry, in design units (364 wide; 1 u = 1 pt on an iPhone 393) ── */
  const G = { W: 364, padX: 18, plotTop: 234, baseGap: 54, slipW: 152, slipH: 56, band: 40, N: 56 };

  /* a grey placeholder block in design units: s = start, e = end, t = top, b = bottom */
  function ph(o) {
    const u = n => `calc(${n} * var(--u))`, st = [];
    if (o.s != null) st.push(`inset-inline-start:${u(o.s)}`); if (o.e != null) st.push(`inset-inline-end:${u(o.e)}`);
    if (o.t != null) st.push(`top:${u(o.t)}`); if (o.b != null) st.push(`bottom:${u(o.b)}`);
    if (o.w != null) st.push(`width:${u(o.w)}`); if (o.h != null) st.push(`height:${u(o.h)}`); if (o.r != null) st.push(`border-radius:${u(o.r)}`);
    return `<i class="nr-ph" style="${st.join(';')}"></i>`;
  }

  /* ── pure: the answer → the strings and numbers the widget draws ── */
  function view(vm, lang) {
    const T = NR.text[lang], top = vm.top, mkt = vm.market;
    const rangeKey = vm._range, ser = vm.series[rangeKey], pts = ser.points;
    const chg = NR.sign(top.change_pct), rchg = NR.sign(ser.best_change_pct);
    const lastDay = vm.banner === 'closed' || vm.banner === 'notPosted' || vm.banner === 'expired';
    const o = NR.office(top.exchange.id, lang, top.exchange.name);
    return {
      title: T.title[vm.dir], unit: T.unit, num: NR.int(top.rate, lang),
      chg, chipPct: NR.pct(top.change_pct, lang, { noSign: true }), chipSign: chg > 0 ? '+' : chg < 0 ? '−' : '',
      dayWord: lastDay ? T.lastDay : T.today,
      who: o.name, age: vm.topAge, posted: NR.fill(T.posted, { n: NR.digits(mkt.posted, lang) }),
      slips: vm.best.slice(0, 3).map(b => ({
        id: b.exchange.id, rank: NR.digits(b.rank, lang), name: NR.office(b.exchange.id, lang, b.exchange.name).name,
        rate: NR.int(b.rate, lang), age: vm.ageOf(b.recorded_at),
      })),
      rchg, pillPct: NR.pct(ser.best_change_pct, lang, { noSign: true }), pillSign: rchg > 0 ? '+' : rchg < 0 ? '−' : '',
      pts: NR.pts(pts, 'best'), range: rangeKey,
    };
  }
  /* the one sentence VoiceOver / TalkBack reads for the whole widget */
  function say(vm, v, lang) {
    const T = NR.text[lang], word = T.word[v.chg > 0 ? 'up' : v.chg < 0 ? 'down' : 'flat'];
    const base = NR.fill(vm.dir === 'recv' ? T.say.rateRecv : T.say.rate, { rate: v.num, office: v.who, pct: NR.pct(vm.top.change_pct, lang, { noSign: true }), word, age: v.age.text });
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + base;
  }

  const MARK = {
    seg: (lang, T) => ['send', 'recv'].map(d => `<button type="button" class="n1-segb" data-dir="${d}" aria-pressed="false" aria-label="${NR.text[lang].dir[d]}">${NR.text[lang].dir[d + 'Short']}</button>`).join(''),
    ranges: lang => RANGES.map(r => `<button type="button" class="n1-rng" data-range="${r}" aria-pressed="false" aria-label="${NR.text[lang].rangeSay[r]}"><span>${NR.text[lang].range[r]}</span></button>`).join(''),
    slip: i => `<a class="n1-slip" data-i="${i}" href="#" style="--i:${i}"><span class="n1-slip-in"><span class="n1-stub nr-roll-wrap"><i class="js-rank"></i></span><span class="n1-sbody"><span class="n1-sname"><b class="js-name"></b><span class="nr-age js-sage"></span></span><span class="n1-srate nr-dimmable js-rate"></span></span></span></a>`,
  };

  NR.register({
    id: 'rate-large', no: 'N01', name: 'rate-large', from: 'از روی ویجت ۰۱ · بودجه‌ی هفتگی', size: 'large',
    names: { fa: 'نرخ امروز · بزرگ', en: 'Rate today · large' },
    desc: 'بیشترین تومان برای هر پوند، نزد کدام صرافی، چند دقیقه پیش، به‌علاوه‌ی سه صرافی اول به ترتیب و نمودار بازار. فرم، چیدمان و حال‌وهوای ویجت ۰۱ مونده: عدد بزرگ و نازک، حباب تغییر، دسته‌ای از اشیا گوشه‌ی بالا، خط با سرفلش و سطح نرم زیرش. اسکناس‌ها شدن «برگه‌ی صرافی» (رتبه ۱ تا ۳) و ستون‌های روز شدن دکمه‌های بازه.',
    hints: [
      ['M7 7h10M7 12h10M7 17h6', '<b>«ارسال | دریافت»</b> واقعاً کار می‌کنه: عدد می‌غلته، برگه‌ها و نمودار عوض می‌شن (کنش App Intent، بدون باز شدن اپ).'],
      ['M4 18l5-6 4 3 7-9', '<b>۱ هفته تا ۱ سال</b> بازه‌ی نمودار رو عوض می‌کنه؛ حباب روی نوک فلش تغییر همون بازه‌ست.'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> هر جای ویجت اپ رو باز می‌کنه؛ روی هر برگه همون صرافی. آدرس تو یه پیام کوتاه نشون داده می‌شه.'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حالت‌ها</b> رو از نوار بالا عوض کن: پیش از نرخ، یکشنبه، منقضی، آفلاین، تنظیم‌نشده و پیش‌نمایش گالری.'],
    ],
    init: () => ({ dir: 'send', range: '1m' }),

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], W = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U;          // the widget's height in design units
      const base = H - G.baseGap, pw = G.W - 2 * G.padX;
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card n1-card" role="group">
        <svg class="n1-svg nr-dimmable" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="n1g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--area,var(--dir));stop-opacity:var(--ao,.34)"/><stop offset=".72" style="stop-color:var(--area,var(--dir));stop-opacity:calc(var(--ao,.34) * .22)"/><stop offset="1" style="stop-color:var(--area,var(--dir));stop-opacity:0"/></linearGradient>
            <linearGradient id="n1f${id}" gradientUnits="userSpaceOnUse" x1="${G.padX}" y1="0" x2="${G.padX + 90}" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
            <mask id="n1m${id}"><rect x="0" y="0" width="${G.W}" height="${r(H)}" fill="url(#n1f${id})"/></mask>
            <clipPath id="n1c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath>
          </defs>
          <g class="n1-grid">${[0, 1, 2, 3, 4].map(i => `<line x1="${r(G.padX + pw * i / 4)}" x2="${r(G.padX + pw * i / 4)}" y1="${G.plotTop - 6}" y2="${r(base)}"/>`).join('')}<line class="n1-base" x1="${G.padX}" x2="${G.W - G.padX}" y1="${r(base)}" y2="${r(base)}"/></g>
          <g clip-path="url(#n1c${id})"><g mask="url(#n1m${id})" class="js-chart">
            <path class="n1-area js-area" style="fill:url(#n1g${id})" d=""/>
            <g class="n1-dots js-dots"></g>
            <path class="n1-line js-line" d=""/>
            <path class="n1-comet js-comet" d="" pathLength="1000"/>
          </g></g>
          <g class="js-end">
            <circle class="n1-ping js-ping" r="9"/>
            <path class="n1-head-arrow js-arrow" d="M-9 -7.5 0 0-9 7.5"/>
          </g>
        </svg>

        <div class="n1-top">
          <div class="n1-seg" role="group" aria-label="${W.dirLabel}">${MARK.seg(lang, T)}</div>
          <span class="n1-posted js-posted"></span>
          <span class="nr-banner js-banner" hidden></span>
        </div>

        <a class="n1-headblk" href="#" data-go="rates">
          <p class="n1-title js-title"></p>
          <div class="n1-num nr-dimmable is-big"><span class="js-num"></span></div>
          <p class="n1-unit js-unit"></p>
          <div class="n1-chiprow"><div class="n1-chip nr-dimmable js-chip"><span class="js-chipicon"></span><span class="js-chippct"></span></div><span class="n1-day js-day"></span></div>
          <p class="n1-who"><b class="js-who"></b><span class="nr-age js-age"></span></p>
        </a>

        <div class="n1-slips js-slips">${[0, 1, 2].map(MARK.slip).join('')}</div>

        <div class="n1-pill js-pill"><span class="js-pillicon"></span><span class="js-pillpct"></span></div>
        <div class="n1-rngs" role="group" aria-label="${W.rangeLabel}">${MARK.ranges(lang)}</div>

        <div class="n1-empty js-empty" hidden>
          ${ph({ s: 18, t: 62, w: 92, h: 11 })}${ph({ s: 18, t: 84, w: 150, h: 42, r: 12 })}${ph({ s: 18, t: 134, w: 96, h: 12 })}${ph({ s: 18, t: 158, w: 88, h: 28, r: 99 })}
          ${[0, 1, 2].map(i => ph({ e: 16, t: 56 + i * 40, w: 152, h: 54, r: 11 })).join('')}
          ${ph({ s: 18, e: 18, t: G.plotTop + 14, h: base - G.plotTop - 14, r: 14 })}
          ${[0, 1, 2, 3].map(i => ph({ s: 18 + i * 82, b: 20, w: 56, h: 24, r: 99 })).join('')}
          <div class="n1-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;

      /* ── references ── */
      const $ = s => host.querySelector(s), $$ = s => [...host.querySelectorAll(s)];
      const card = $('.n1-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = {
        svg: $('.n1-svg'), area: $('.js-area'), line: $('.js-line'), comet: $('.js-comet'), dots: $('.js-dots'), reveal: $('.js-reveal'), chart: $('.js-chart'),
        end: $('.js-end'), arrow: $('.js-arrow'), ping: $('.js-ping'), pill: $('.js-pill'), pillIcon: $('.js-pillicon'), pillPct: $('.js-pillpct'),
        posted: $('.js-posted'), banner: $('.js-banner'), title: $('.js-title'), unit: $('.js-unit'), chip: $('.js-chip'), chipIcon: $('.js-chipicon'), chipPct: $('.js-chippct'),
        day: $('.js-day'), who: $('.js-who'), age: $('.js-age'), slips: $('.js-slips'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline'),
      };
      const rolls = { num: new NR.Roll($('.js-num')), chip: new NR.Roll(els.chipPct), pill: new NR.Roll(els.pillPct) };
      const slips = $$('.n1-slip').map(a => ({ a, rank: a.querySelector('.js-rank'), name: a.querySelector('.js-name'), rate: new NR.Roll(a.querySelector('.js-rate')), age: a.querySelector('.js-sage') }));
      card.style.setProperty('--H', r(H) + 'px');

      /* ── chart state: the sampled curve in pixels, so a range change can morph ── */
      const N = G.N, xs = Array.from({ length: N }, (_, i) => G.padX + pw * i / (N - 1));
      let ys = null, curRange = null, curDir = 0, endX = G.W - G.padX, tweenStop = null;
      const dotsMade = { done: false };
      function target(v) {
        const dom = NR.domain(v.pts.vs, .011, .18), top = G.plotTop, h = base - top - 4;
        const s = NR.sample(v.pts, v.pts.ts[0], v.pts.ts[v.pts.ts.length - 1], N);
        return s.map(x => top + 4 + h * (1 - (x - dom[0]) / (dom[1] - dom[0])));
      }
      function paint(arr) {
        const d = NR.smooth(xs, arr);
        els.line.setAttribute('d', d); els.comet.setAttribute('d', d);
        els.area.setAttribute('d', `${d}L${r(xs[N - 1])},${r(base)}L${r(xs[0])},${r(base)}Z`);
        const ex = xs[N - 1], ey = arr[N - 1];
        endX = ex;
        const tan = Math.atan2(ey - arr[N - 4], ex - xs[N - 4]) * 180 / Math.PI, want = curDir;
        els.arrow.setAttribute('transform', `rotate(${want > 0 ? Math.min(tan, -22) : want < 0 ? Math.max(tan, 22) : 0})`);
        els.end.setAttribute('transform', `translate(${r(ex + 1.5)} ${r(ey)})`);
      }
      function dots(arr) {   // display-only sparkles under the line (C): positions fixed per widget, kept inside the area
        els.dots.innerHTML = '';
        let s = 7 + id * 13; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
        for (let i = 0; i < 26; i++) {
          const k = Math.floor(rnd() * (N - 8)) + 4, y0 = arr[k] + 10 + rnd() * Math.max(6, base - arr[k] - 22);
          const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          c.setAttribute('cx', r(xs[k])); c.setAttribute('cy', r(y0)); c.setAttribute('r', (1.1 + rnd() * 1.1).toFixed(2));
          c.style.setProperty('--d', (2.2 + rnd() * 3.6).toFixed(2) + 's'); c.style.setProperty('--w', (-rnd() * 6).toFixed(2) + 's'); c.style.setProperty('--h', (6 + rnd() * 9).toFixed(1) + 'px');
          els.dots.appendChild(c);
        }
      }
      function setChart(v, o) {
        const next = target(v), changed = curRange !== null && curRange !== v.range;
        curRange = v.range; curDir = v.rchg;
        if (tweenStop) { tweenStop.stop(); tweenStop = null; }
        if (!ys || !o.animate || !changed) { ys = next; paint(ys); dots(ys); return; }
        const from = ys;
        if (api.fx()) {   // C: the line morphs (iOS cannot; the nearest build is the cross-fade below)
          tweenStop = NR.tween(780, e => { ys = from.map((y, i) => y + (next[i] - y) * e); paint(ys); }, NR.ease.expo);
          tweenStop.then(() => { dots(next); });
        } else {          // B: a cross-fade between the two states
          const ghost = els.chart.parentNode.cloneNode(true); ghost.removeAttribute('clip-path');
          els.chart.parentNode.parentNode.insertBefore(ghost, els.chart.parentNode);
          ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260 / NR.scale(), easing: 'ease-out' }).onfinish = () => ghost.remove();
          ys = next; paint(ys); dots(ys);
          els.chart.parentNode.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 / NR.scale(), easing: 'ease-out' });
        }
      }

      /* ── render: one pass from the answer ── */
      let first = true, lastNum = null;
      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        $('.n1-card').classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) { renderEmpty(vm); return; }
        vm._range = api.L.range;
        const v = view(vm, lang);
        card.classList.remove('is-up', 'is-down', 'is-flat'); card.classList.add(v.rchg > 0 ? 'is-up' : v.rchg < 0 ? 'is-down' : 'is-flat');
        els.chip.classList.remove('is-up', 'is-down', 'is-flat'); els.chip.classList.add(v.chg > 0 ? 'is-up' : v.chg < 0 ? 'is-down' : 'is-flat');
        // buttons
        $$('.n1-segb').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.dir === api.L.dir)));
        $$('.n1-rng').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.range === api.L.range)));
        // head
        els.title.textContent = v.title; els.unit.textContent = v.unit; els.who.textContent = v.who;
        setAge(els.age, v.age);
        els.day.textContent = v.dayWord;
        const dirUp = lastNum == null ? 1 : (NR.num(vm.top.rate) >= lastNum ? 1 : -1); lastNum = NR.num(vm.top.rate);
        rolls.num.set(v.num, { animate: anim, dir: dirUp });
        els.chipIcon.innerHTML = NR.dirIcon(v.chg);
        els.chipPct.setAttribute('data-sign', v.chipSign);
        rolls.chip.set(v.chipSign + v.chipPct, { animate: anim, dir: v.chg || 1 });
        // the status chip or the trust line
        if (vm.banner) {
          els.banner.hidden = false; els.posted.hidden = true;
          els.banner.className = 'nr-banner js-banner' + (vm.banner === 'offline' || vm.banner === 'expired' || vm.banner === 'notPosted' ? ' is-warn' : '');
          els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`;
        } else { els.banner.hidden = true; els.posted.hidden = false; els.posted.textContent = v.posted; }
        // slips
        slips.forEach((s, i) => {
          const d = v.slips[i]; s.a.dataset.id = d.id;
          s.rank.textContent = d.rank; s.name.textContent = d.name; s.rate.set(d.rate, { animate: anim, dir: dirUp }); setAge(s.age, d.age);
          s.a.setAttribute('aria-label', `${NR.fill(T.rank, { n: d.rank })}, ${d.name}, ${d.rate} ${lang === 'fa' ? 'تومان' : 'toman'}, ${d.age.text}`);
          s.a.setAttribute('href', NR.deeplink('office/' + d.id, api.L));
        });
        // chart
        setChart(v, { animate: anim });
        els.pillIcon.innerHTML = NR.dirIcon(v.rchg); rolls.pill.set(v.pillSign + v.pillPct, { animate: anim, dir: v.rchg || 1 });
        els.pill.className = 'n1-pill js-pill ' + (v.rchg > 0 ? 'is-up' : v.rchg < 0 ? 'is-down' : 'is-flat');
        placePill();
        // the head link and the label for assistive tech
        $('.n1-headblk').setAttribute('href', NR.deeplink('rates', api.L));
        card.setAttribute('aria-label', say(vm, v, lang));
        $('.n1-svg').setAttribute('aria-label', NR.fill(T.say.chart, { range: T.rangeSay[v.range], pct: NR.pct(vm.series[v.range].best_change_pct, lang, { noSign: true }), word: T.word[v.rchg > 0 ? 'up' : v.rchg < 0 ? 'down' : 'flat'], low: NR.int(vm.series[v.range].stats.low, lang), high: NR.int(vm.series[v.range].stats.high, lang) }));
        first = false;
      }
      function setAge(node, a) {
        node.className = 'nr-age ' + node.className.split(' ').filter(c => c.startsWith('js-')).join(' ') + (a.tier !== 'fresh' ? ' is-warn' : '');
        node.innerHTML = NR.icon.clock() + `<span>${a.text}</span>`;
      }
      /* the pill goes where it hides no part of the line: above the arrow, else beside it, else below */
      function placePill() {
        const ex = endX, ey = ys[N - 1], w = (els.pill.offsetWidth / U) || 64, h = 25, half = w / 2;   // design units
        const hits = b => ys.some((y, i) => xs[i] > b[0] - 5 && xs[i] < b[2] + 5 && y > b[1] - 5 && y < b[3] + 5);
        const cx = Math.min(ex, G.W - 12 - half);
        const cand = [
          { at: 'above', x: cx - half, y: ey - 37, nib: clampN(ex - (cx - half), 12, w - 12) },
          { at: 'left', x: ex - 20 - w, y: ey - h / 2, nib: h / 2 },
          { at: 'below', x: cx - half, y: ey + 14, nib: clampN(ex - (cx - half), 12, w - 12) },
        ];
        const pick = cand.find(c => !hits([c.x, c.y, c.x + w, c.y + h]) && c.y + h < base + 18 && c.y > 40) || cand[0];
        els.pill.dataset.at = pick.at;
        els.pill.style.setProperty('--px', r(pick.x)); els.pill.style.setProperty('--py', r(pick.y)); els.pill.style.setProperty('--nib', r(pick.nib));
      }
      const clampN = (v, a, b) => Math.min(b, Math.max(a, v));
      function renderEmpty(vm) {
        const gal = vm.st === 'gallery';
        els.emptyBanner.innerHTML = gal ? `<b>${W.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`;
        els.emptyBanner.classList.toggle('is-gal', gal);
        els.emptyLine.textContent = gal ? W.galleryLine : '';
        els.emptyLine.hidden = !gal;
        els.empty.hidden = false;
        card.setAttribute('aria-label', gal ? `${W.gallery}. ${W.galleryLine}` : T.state.unset);
        lastNum = null; curRange = null; ys = null;
        ['num', 'chip', 'pill'].forEach(k => { rolls[k].text = null; });
        slips.forEach(s => { s.rate.text = null; });
      }
      const origRender = render;
      /* when the card is not empty the placeholder layer is hidden */
      const renderAll = o => { els.empty.hidden = true; origRender(o); };

      /* ── buttons (App Intent on iOS, Action on Android): state changes, no app launch ── */
      host.addEventListener('click', e => {
        const seg = e.target.closest('.n1-segb'), rng = e.target.closest('.n1-rng'), a = e.target.closest('a[href]');
        if (seg) { e.preventDefault(); if (seg.dataset.dir !== api.L.dir) api.set({ dir: seg.dataset.dir }); return; }
        if (rng) { e.preventDefault(); if (rng.dataset.range !== api.L.range) api.set({ range: rng.dataset.range }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: display-only motion (the sample's life: tilt, fan, float, sparkles, light along the line, intro) ── */
      let fx = false, tiltRaf = 0, tx = 0, ty = 0, cx = 0, cy = 0, visible = true;
      const tiltLoop = () => {
        cx += (tx - cx) * .12; cy += (ty - cy) * .12;
        tilt.style.transform = `perspective(${r(1100)}px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
        tiltRaf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .02) ? requestAnimationFrame(tiltLoop) : 0;
      };
      const onMove = e => {
        if (!fx || e.pointerType === 'touch') return;
        const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1;
        tx = nx * 5; ty = -ny * 4; if (!tiltRaf) tiltRaf = requestAnimationFrame(tiltLoop);
      };
      const onLeave = () => { tx = ty = 0; if (!tiltRaf) tiltRaf = requestAnimationFrame(tiltLoop); };
      root.addEventListener('pointermove', onMove, { passive: true });
      root.addEventListener('pointerleave', onLeave);
      els.slips.addEventListener('pointerenter', () => { if (fx) els.slips.classList.add('is-fan'); });
      els.slips.addEventListener('pointerleave', () => els.slips.classList.remove('is-fan'));
      function setFx(on) {
        fx = !!on && !NR.reduced();
        root.classList.toggle('is-fx', fx);
        if (!fx) { tilt.style.transform = ''; els.slips.classList.remove('is-fan'); }
      }
      /* the sample's intro, rebuilt: the slips fly in, the number spins up, the line draws, the arrow opens */
      function intro() {
        if (!fx || vm0().empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const vm = api.model(); if (vm.empty) return;
        const v = view(Object.assign(vm, { _range: api.L.range }), lang);
        rolls.num.text = null; rolls.num.set(v.num.replace(/\d/g, d => (lang === 'fa' ? '۰' : '0')), { animate: false });
        setTimeout(() => rolls.num.set(v.num, { animate: true, dir: 1 }), 330 / NR.scale());
        els.reveal.setAttribute('width', 0);
        NR.tween(1250, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        setTimeout(() => card.classList.remove('is-intro'), 3600 / NR.scale());
      }
      const vm0 = () => api.model();
      function refresh() {   // B: what the system does when it re-draws the widget: the changed digits roll
        const vm = api.model(); if (vm.empty) return;
        [rolls.num, rolls.chip, rolls.pill, ...slips.map(s => s.rate)].forEach(x => { if (x.text) x.set(NR.perturb(x.text), { animate: false }); });
        if (api.fx()) intro();
        requestAnimationFrame(() => renderAll({ animate: true }));
      }

      return {
        update: o => { renderAll(o || {}); },
        refresh, intro, fx: setFx,
        setVisible: v => { visible = v; },
        destroy: () => { cancelAnimationFrame(tiltRaf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); if (tweenStop) tweenStop.stop(); },
        _init: () => { setFx(api.S().fx); },
      };

      function r(n) { return Math.round(n * 100) / 100; }
    },
    notes: () => {
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send', range: '1m' }); vm._range = '1m'; return say(vm, view(vm, lang), lang); };
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      return [
        {
          title: 'ساخت · WidgetKit و Glance',
          html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
            ['کارت، تم و رنگ‌ها', `${c('containerBackground(for: .widget)')} با توکن‌های تم اپ (سیاه / سفید / شفق)، گوشه حدود ۲۲`, `${c('GlanceModifier.background(ColorProvider)')}، گوشه حدود ۲۸dp؛ اگه Material You روشن بود فقط رنگ‌ها عوض می‌شن، چیدمان و فلش‌ها می‌مونن`, A],
            ['عدد بزرگ', `${c('Text')} وزن ۳۰۰، ارقام فارسی با عرض طبیعی (نه ستونی)، هر عدد داخل یه جعبه‌ی جدا (${c('unicode-bidi: isolate')} روی وب؛ تو SwiftUI هر عدد یه ${c('Text')} جدا)`, `${c('Text')} با وزن ثابت؛ بدون انیمیشن`, A],
            ['حباب تغییر', 'فلش و علامت با شکل برداری خودمون (نه SF Symbols)، متن با رنگ ثابت و فقط فلش رنگ جهت', `${c('Image(ImageProvider(R.drawable.arrow_up))')} و ${c('Text')}`, A],
            ['سه برگه', `سه ${c('HStack')} هم‌اندازه تو یه ${c('ZStack')} با ${c('rotationEffect')} و ${c('offset')}؛ هر سه یه سبک و یه سایه`, 'Glance چرخش نداره: برگه‌ها صاف و پله‌ای، یا یه بیت‌مپ که اپ می‌کشه', `${A} iOS · نزدیک‌ترین نسخه برای Android`],
            ['نمودار', `Swift Charts: ${c('LineMark')} + ${c('AreaMark')} + ${c('RuleMark')}؛ سرفلش و حباب با ${c('chartOverlay')}`, `تصویری که اپ با ${c('Canvas')} می‌کشه و با ${c('Image')} می‌ذاره (برداری، سبک)`, A],
            ['دکمه‌های جهت و بازه', `${c('Button(intent:)')} (iOS ۱۷ به بعد)`, `${c('actionRunCallback')}`, B],
            ['لمس', `${c('Link(destination:)')} برای سر ویجت، هر برگه و نمودار (ویجت بزرگ چند مقصد داره)`, `${c('actionStartActivity')} با آدرس هر ناحیه`, A],
            ['اندازه', 'بزرگ: ۳۶۴ × ۳۸۲ (آیفون ۳۹۳) و ۳۳۸ × ۳۵۴ (آیفون ۳۹۰)؛ همه‌چیز نسبیه', 'حدود ۳۳۶ × ۳۴۰dp (۴ × ۴ خانه، روی دستگاه تأیید شه)', A],
          ]),
        },
        {
          title: 'حرکت‌ها · الف / ب / ج',
          html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی واقعی / نزدیک‌ترین نسخه'], [
            ['رقم‌ها می‌غلتن (عدد بزرگ، درصد، نرخ برگه‌ها، حباب)', B, `iOS: ${c('.contentTransition(.numericText())')} هنگام تازه شدن ویجت یا زدن دکمه. Android: بدون حرکت، عدد عوض می‌شه.`],
            ['نمودار با دکمه‌ی بازه محو و جایگزین می‌شه', B, `iOS: ${c('.transition(.opacity)')} هنگام App Intent. Android: فوری.`],
            ['برگه‌ها هنگام تازه شدن یه جابه‌جایی ساده دارن', B, 'حداکثر محو شدن یا جابه‌جایی ساده؛ Android ندارد.'],
            ['خط بین دو بازه نرم تغییر شکل می‌ده', C, 'نزدیک‌ترین نسخه: همون محو شدن بالا (ب).'],
            ['ورود: برگه‌ها می‌پرن تو، خط از چپ کشیده می‌شه، سرفلش باز می‌شه، حباب می‌افته', C, 'نزدیک‌ترین نسخه: ورود ساده هنگام تازه شدن (ب).'],
            ['کارت به سمت اشاره‌گر کج می‌شه', C, 'گوشی اشاره‌گر نداره؛ ثابت.'],
            ['برگه‌ها شناورن و با ماوس بادبزنی باز می‌شن', C, 'ثابت.'],
            ['ذره‌های ریز زیر خط', C, 'حذف می‌شه.'],
            ['نور از روی خط رد می‌شه و دور سرفلش موج می‌خوره', C, 'خط ساده.'],
          ]) + NR.p('کلید «حرکت‌های فقط‌نمایشی (ج)» تو نوار بالا همه‌ی ردیف‌های ج رو خاموش می‌کنه، تا دقیقاً ببینی گوشی چی نشون می‌ده. زیر پلتفرم Android حتی حرکت‌های ب هم خاموشن.'),
        },
        {
          title: 'دکمه‌ها و لمس · App Intent و Action',
          html: NR.tbl(['کنترل', 'iOS', 'Android', 'نتیجه'], [
            ['ارسال | دریافت', `${c('SetDirectionIntent')} (App Intent)`, `${c('SetDirectionAction')}`, 'انتخاب تو ذخیره‌ی همون ویجت می‌مونه؛ اپ باز نمی‌شه؛ بی‌اینترنت هم کار می‌کنه (از داده‌ی ذخیره‌شده دوباره کشیده می‌شه).'],
            ['۱ هفته · ۱ ماه · ۳ ماه · ۱ سال', `${c('SetRangeIntent')}`, `${c('SetRangeAction')}`, 'مثل بالا. دو ویجت هم‌نوع هر کدوم انتخاب خودشون رو نگه می‌دارن (پارامتر AppIntent هر نمونه).'],
            ['سر ویجت و عدد بزرگ', 'Link', 'actionStartActivity', c('netrate://rates?cur=gbp&type=cash&dir=send')],
            ['هر برگه', 'Link', 'actionStartActivity', c('netrate://office/pars?cur=gbp&type=cash&dir=send')],
            ['نمودار', 'Link', 'actionStartActivity', c('netrate://chart?cur=gbp&type=cash&dir=send&range=30')],
          ]) + NR.p('آدرس تنظیم همون ویجت (ارز، نوع نرخ، جهت و بازه) رو با خودش می‌بره. تو پیش‌نمایش، لمس یه پیام با همین آدرس نشون می‌ده.'),
        },
        {
          title: 'داده، جمله‌ی VoiceOver و درخواست داده',
          html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
            [c('query.direction'), 'جهت (دکمه‌ها) و عنوان: «بیشترین تومان» یا «کمترین تومان»'],
            [c('best[0].rate'), 'عدد بزرگ؛ ' + c('best[0].change_pct') + ' حباب تغییر؛ ' + c('best[0].recorded_at') + ' سن زیر عدد'],
            [c('best[0..2]'), 'سه برگه: ' + c('rank') + '، ' + c('exchange.id') + ' (اسم و شهر از جدول ' + c('offices') + ')، ' + c('rate') + '، ' + c('recorded_at')],
            [c('market.posted'), '«۹ صرافی نرخ زده‌اند» (نشانه‌ی اعتماد)'],
            [c('market.status'), c('open') + ' / ' + c('closed') + ' / ' + c('not_posted') + ': برچسب سر ویجت و «آخرین روز کاری»'],
            [c('series[range].points[].best'), 'خط نمودار (هر نقطه یه روز کاری؛ نقطه‌ی آخر = عدد بزرگ)'],
            [c('series[range].best_change_pct'), 'حباب روی سرفلش (تغییر کل بازه)'],
            [c('series[range].stats'), 'فقط جمله‌ی دسترس‌پذیری نمودار (کف و سقف)'],
          ]) + NR.p(`جمله‌ی VoiceOver / TalkBack (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`)
            + '<p><b>درخواست داده</b></p>' + NR.ul([
              `برای ${c('direction=recv')} تو فایل نمونه ${c('series')} و ${c('week')} نیست. پیش‌نمایش تاریخچه‌ی «دریافت» رو (فقط برای نشون دادن چیدمان) از تاریخچه‌ی «ارسال» می‌سازه؛ سرور باید خودش بده.`,
              `نمونه‌های یکشنبه و «پیش از نرخ» ${c('series')} و ${c('week')} ندارن؛ فرض کردم سرور اون‌ها رو هم می‌ده (اینجا از نمونه‌ی عادی قرض می‌گیرم).`,
              `${c('exchange.name')} و ${c('city')} باید به زبان خواننده بیاد (نمونه‌ی ${c('snapshot')} انگلیسیه؛ پیش‌نمایش از جدول ${c('offices')} می‌خونه).`,
              `تأیید: برای دریافت، ${c('series.points[].best')} یعنی کمترین نرخ اون روز.`,
              `اختیاری: ${c('change')} (تومان) کنار ${c('change_pct')} برای هر صرافی، تا حباب بتونه مثل نمونه‌ی ۰۱ بین درصد و تومان عوض بشه.`,
            ]),
        },
        {
          title: 'تفاوت‌ها با نمونه و چرا',
          html: NR.ul([
            '<b>اسکناس‌ها شدن برگه‌ی صرافی (رتبه ۱ تا ۳):</b> قاعده‌ی «صرافی نیستیم» تصویر پول رو نمی‌خواد. سه برگه یک‌اندازه، یک‌رنگ و یک‌سایه‌ان تا هیچ ردیفی ویژه نباشه؛ حتی بادبزن هم فقط ترتیب رتبه‌ست.',
            '<b>ستون‌های روز و اسکرابِ نمودار شدن دکمه‌های بازه:</b> ویجت کشیدن نداره. ستون‌ها فقط شبکه‌ی ریز نمودارن.',
            '<b>تولتیپ مقدار شد حباب تغییر بازه:</b> فلش + علامت + درصد، روی نوک فلش، و اگه خط رو بپوشونه جاش عوض می‌شه.',
            '<b>خط ایندیگوی ثابت شد رنگ جهت</b> (آبی بالا، مرجانی پایین، هرگز سبز) و هر جا رنگ هست فلش و علامت هم هست.',
            '<b>«+ $317» که با ضربه به درصد عوض می‌شد</b> شد «تغییر امروز» با فلش و درصد (داده‌ی تومانی صرافی نداریم؛ تو درخواست داده).',
            '<b>سینی خاکستری و قاب نمونه حذف شد:</b> خود کارت ویجته.',
            '<b>مشکل نمودار آرام و پرنوسان:</b> محور مقدار از صفر نمی‌شه و حداقل ۲٪ سطح قیمت رو نشون می‌ده، تا حرکت ۰٫۲٪ شبیه سقوط نشه؛ «پرنوسان ↓ ↑» ۵٪ رو امتحان می‌کنه.',
          ]),
        },
      ];
    },
  });
})();
