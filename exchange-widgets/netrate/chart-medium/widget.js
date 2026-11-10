/* ==========================================================================
   N02 · chart-medium  ("Market chart", medium)  — built from sample 02 (Market Size)
   Same form as the sample: a dark ink card lit from the side, a big thin figure, a
   two-line change sentence, a white line with a marker and a change pill. The grey
   "forecast" half of the sample becomes the grey EARLIER period (we never forecast):
   the white line is the chosen range, the grey line the stretch before it, and the
   marker sits on today. The ⋮ menu becomes four range buttons.
   Reads one answer object (NR_DATA shape) and computes nothing.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { cycle: 'بازه‌ی نمودار، {range}؛ برای عوض کردن بزن', vsShort: 'نسبت به روز کاری قبل', rangeLabel: 'بازه‌ی نمودار', gallery: 'نمودار بازار', galleryLine: 'میانگین بازار، حرکت امروز و نمودار', chartLabel: 'نمودار میانگین بازار' },
    en: { cycle: 'Chart range, {range}; tap to change', vsShort: 'vs last working day', rangeLabel: 'Chart range', gallery: 'Market chart', galleryLine: 'Market average, the move today and a chart', chartLabel: 'Market average chart' },
  };
  const RANGES = ['1w', '1m', '3m', '1y'];
  const LONGER = { '1w': '1m', '1m': '3m', '3m': '1y', '1y': null };   // where the grey earlier period comes from
  const G = { W: 364, x0: 196, x1: 344, top: 56, base: 118 };
  let uid = 0;

  function view(vm, lang) {
    const T = NR.text[lang], m = vm.market, r = vm._range, ser = vm.series[r], pts = ser.points;
    const chg = NR.sign(m.average_change_pct), rchg = NR.sign(ser.average_change_pct);
    const win = NR.pts(pts, 'average');
    let ctx = null;
    const long = LONGER[r];
    if (long) {   // the grey part: the same length of history again (about 2/3 of it), from the next longer series
      const t0 = win.ts[0], t1 = win.ts[win.ts.length - 1], from = t0 - .67 * (t1 - t0);
      const sel = vm.series[long].points.filter(p => { const t = Date.parse(p.date + 'T12:00:00Z'); return t >= from && t < t0; });
      if (sel.length) ctx = NR.pts([...sel, pts[0]], 'average');
    }
    return {
      label: T.avg, unit: T.unit, num: NR.int(m.average, lang),
      chg, pct: NR.pct(m.average_change_pct, lang, { noSign: true }), sign: chg > 0 ? '+' : chg < 0 ? '−' : '',
      word: T.word[chg > 0 ? 'up' : chg < 0 ? 'down' : 'flat'], toman: NR.signedInt(m.average_change, lang), tomanWord: lang === 'fa' ? 'تومان' : 'toman',
      posted: NR.fill(T.posted, { n: NR.digits(m.posted, lang) }), age: vm.mktAge,
      rchg, pillPct: NR.pct(ser.average_change_pct, lang, { noSign: true }), pillSign: rchg > 0 ? '+' : rchg < 0 ? '−' : '',
      win, ctx, range: r,
    };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang];
    const base = NR.fill(T.say.avg, { rate: v.num, pct: v.pct, word: v.word, posted: v.posted, age: v.age.text });
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + base;
  };
  function ph(o) {
    const u = n => `calc(${n} * var(--u))`, st = [];
    if (o.s != null) st.push(`inset-inline-start:${u(o.s)}`); if (o.e != null) st.push(`inset-inline-end:${u(o.e)}`);
    if (o.t != null) st.push(`top:${u(o.t)}`); if (o.b != null) st.push(`bottom:${u(o.b)}`);
    if (o.w != null) st.push(`width:${u(o.w)}`); if (o.h != null) st.push(`height:${u(o.h)}`); if (o.r != null) st.push(`border-radius:${u(o.r)}`);
    return `<i class="nr-ph" style="${st.join(';')}"></i>`;
  }

  NR.register({
    id: 'chart-medium', no: 'N02', name: 'chart-medium', from: 'از روی ویجت ۰۲ · اندازه‌ی بازار', size: 'medium',
    names: { fa: 'نمودار بازار · متوسط', en: 'Market chart · medium' },
    desc: 'میانگین بازار امروز، حرکتش نسبت به روز کاری قبل و نمودار بازه‌ی انتخابی. کارت تیره با نور کناری، عدد بزرگ و نازک، جمله‌ی دوخطی و خط سفید با نشانگر و حباب تغییر از ویجت ۰۲ مونده. «پیش‌بینی» خاکستری نمونه ممنوعه؛ جاش خاکستری یعنی «دوره‌ی قبل از بازه» و نشانگر روی «امروز» نشسته. منوی ⋮ شده چهار دکمه‌ی بازه.',
    hints: [
      ['M4 18l5-6 4 3 7-9', '<b>۱ هفته / ۱ ماه / ۳ ماه / ۱ سال</b> بازه رو عوض می‌کنه؛ خط سفید خود بازه‌ست و خط خاکستری دوره‌ی قبلش. حباب تغییر کل بازه‌ست.'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> ویجت اپ رو روی نمودار بازار با همون بازه باز می‌کنه (آدرس تو یه پیام کوتاه).'],
      ['M12 3a9 9 0 1 0 9 9M12 7v5l3 2', '<b>سن</b> همیشه کنار عدده؛ اگه از ۹۰ دقیقه بگذره کهربایی می‌شه و ساعت کنارش میاد.'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>روز پرنوسان ↓ ↑</b> رو از نوار بالا بزن تا ببینی با ۵٪ حرکت نمودار چطور می‌شه.'],
    ],
    init: () => ({ dir: 'send', range: '1w' }),
    config: { dir: true },   // direction is a widget setting here (Edit widget), not a button

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], W = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U;
      /* the chart sits on the END side of the card; time still runs left to right in both languages */
      const geo = lang === 'fa' ? { x0: G.W - G.x1, x1: G.W - G.x0 } : { x0: G.x0, x1: G.x1 };
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink n2-card" role="group">
        <div class="n2-glow" aria-hidden="true"><i class="g-a"></i><i class="g-b"></i><i class="g-c js-gc"></i></div>
        <svg class="n2-svg nr-dimmable" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="n2a${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
            <linearGradient id="n2f${id}" gradientUnits="userSpaceOnUse" x1="${geo.x0}" y1="0" x2="${geo.x0 + 34}" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
            <mask id="n2m${id}"><rect width="${G.W}" height="${r(H)}" fill="url(#n2f${id})"/></mask>
            <linearGradient id="n2w${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
            <mask id="n2wm${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${G.W}" height="${r(H)}"><rect width="${G.W}" height="${r(H)}" fill="url(#n2w${id})"/></mask>
            <clipPath id="n2c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath>
          </defs>
          <g clip-path="url(#n2c${id})"><g mask="url(#n2m${id})" class="js-chart">
            <path class="n2-area js-area" style="fill:url(#n2a${id})" mask="url(#n2wm${id})" d=""/>
            <path class="n2-ctx js-ctx" d=""/>
            <path class="n2-line js-line" d=""/>
            <path class="n2-comet js-comet" d="" pathLength="1000"/>
          </g></g>
          <g class="js-endg">
            <line class="n2-rule js-rule" x1="0" y1="9" x2="0" y2="40"/>
            <circle class="n2-halo js-halo" r="7"/>
            <circle class="n2-ring js-ring" r="6.2"/>
            <circle class="n2-core" r="3.1"/>
          </g>
        </svg>
        <span class="n2-rim js-rim" aria-hidden="true"></span>

        <div class="n2-row0"><span class="nr-banner js-banner" hidden></span><span class="n2-label js-label"></span></div>
        <a class="n2-main" href="#" data-go="chart">
          <div class="n2-num nr-dimmable is-big"><span class="js-num"></span></div>
          <p class="n2-unit js-unit"></p>
          <p class="n2-chg"><span class="n2-chgmain nr-dimmable js-chgmain"><span class="js-chgicon"></span><span class="js-chgpct"></span><span class="js-chgword"></span></span><span class="n2-vs js-vs"></span></p>
          <p class="n2-age"><span class="js-posted"></span><span class="nr-age js-age"></span></p>
        </a>
        <div class="n2-pill js-pill"><span class="js-pillicon"></span><span class="js-pillpct"></span></div>
        <button type="button" class="n2-cycle js-cycle"><span class="n2-cycle-in"><b class="js-rangelabel"></b><i class="n2-dots" aria-hidden="true">${RANGES.map(() => '<u></u>').join('')}</i></span></button>

        <div class="n2-empty js-empty" hidden>
          ${ph({ s: 18, t: 16, w: 96, h: 11 })}${ph({ s: 18, t: 40, w: 128, h: 46, r: 12 })}${ph({ s: 18, t: 96, w: 98, h: 11 })}${ph({ s: 18, t: 114, w: 120, h: 12 })}${ph({ s: 18, t: 136, w: 112, h: 11 })}
          ${ph({ e: 18, t: 40, w: G.x1 - G.x0 + 8, h: 76, r: 14 })}${ph({ e: 50, b: 14, w: 100, h: 26, r: 99 })}
          <div class="n2-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;

      const $ = s => host.querySelector(s), $$ = s => [...host.querySelectorAll(s)];
      const card = $('.n2-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = {
        area: $('.js-area'), ctx: $('.js-ctx'), line: $('.js-line'), comet: $('.js-comet'), reveal: $('.js-reveal'), chart: $('.js-chart'),
        endg: $('.js-endg'), ring: $('.js-ring'), rule: $('.js-rule'), pill: $('.js-pill'), pillIcon: $('.js-pillicon'), pillPct: $('.js-pillpct'),
        label: $('.js-label'), banner: $('.js-banner'), unit: $('.js-unit'), chgIcon: $('.js-chgicon'), chgPct: $('.js-chgpct'), chgWord: $('.js-chgword'), vs: $('.js-vs'),
        posted: $('.js-posted'), age: $('.js-age'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline'), rim: $('.js-rim'), gc: $('.js-gc'),
      };
      const rolls = { num: new NR.Roll($('.js-num')), chg: new NR.Roll(els.chgPct), pill: new NR.Roll(els.pillPct) };
      const clampN = (v, a, b) => Math.min(b, Math.max(a, v));
      let lastNum = null, endX = G.x1, endY = G.top, tweenStop = null, curRange = null, allPts = [];

      /* ── the chart: time → x, value → y; the grey earlier period and the white range share one scale ── */
      function drawChart(v, o) {
        const tStart = v.ctx ? v.ctx.ts[0] : v.win.ts[0], tEnd = v.win.ts[v.win.ts.length - 1], t0 = v.win.ts[0];
        const X = t => geo.x0 + (geo.x1 - geo.x0) * (t - tStart) / (tEnd - tStart);
        const dom = NR.domain([...(v.ctx ? v.ctx.vs : []), ...v.win.vs], .016, .16), Y = a => G.top + (G.base - 4 - G.top) * (1 - (a - dom[0]) / (dom[1] - dom[0]));
        const sampleXY = (s, a, b, n) => { const vs = NR.sample(s, a, b, n); return { xs: vs.map((_, i) => X(a + (b - a) * i / (n - 1))), ys: vs.map(Y) }; };
        const nw = Math.max(18, Math.round(64 * (tEnd - t0) / (tEnd - tStart)));
        const w = sampleXY(v.win, t0, tEnd, nw), d = NR.smooth(w.xs, w.ys);
        const doFade = o.animate && curRange !== null && curRange !== v.range;
        let ghost = null;
        if (doFade) { ghost = els.chart.parentNode.cloneNode(true); ghost.removeAttribute('clip-path'); els.chart.parentNode.parentNode.insertBefore(ghost, els.chart.parentNode); }
        els.line.setAttribute('d', d); els.comet.setAttribute('d', d);
        els.area.setAttribute('d', `${d}L${r(w.xs[nw - 1])},${r(G.base)}L${r(w.xs[0])},${r(G.base)}Z`);
        const wg = host.querySelector(`#n2w${id}`); wg.setAttribute('x1', r(w.xs[0])); wg.setAttribute('x2', r(w.xs[0] + 44));
        allPts = w.xs.map((x, i) => [x, w.ys[i]]);
        if (v.ctx) { const c = sampleXY(v.ctx, tStart, t0, Math.max(10, 64 - nw)); els.ctx.setAttribute('d', NR.smooth(c.xs, c.ys)); els.ctx.style.display = ''; allPts = allPts.concat(c.xs.map((x, i) => [x, c.ys[i]])); }
        else els.ctx.style.display = 'none';
        endX = w.xs[nw - 1]; endY = w.ys[nw - 1];
        els.endg.setAttribute('transform', `translate(${r(endX)} ${r(endY)})`);
        els.rule.setAttribute('y2', r(Math.max(14, G.base - endY)));
        curRange = v.range;
        if (doFade) {
          ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260 / NR.scale(), easing: 'ease-out' }).onfinish = () => ghost.remove();
          els.chart.parentNode.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320 / NR.scale(), easing: 'ease-out' });
          els.endg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320 / NR.scale(), easing: 'ease-out' });
        }
        placePill();
      }
      /* above the marker; if the line runs through there (a sharp move), beside it, then below */
      function placePill() {
        const w = (els.pill.offsetWidth / U) || 62, h = 24, half = w / 2;
        const hits = b => allPts.some(p => p[0] > b[0] - 5 && p[0] < b[2] + 5 && p[1] > b[1] - 5 && p[1] < b[3] + 5);
        const cx = Math.min(endX, G.W - 10 - half), nibX = clampN(endX - (cx - half), 12, w - 12);
        const cand = [
          { at: 'above', x: cx - half, y: endY - 40, nib: nibX },
          { at: 'left', x: endX - 20 - w, y: endY - h / 2, nib: h / 2 },
          { at: 'below', x: cx - half, y: endY + 14, nib: nibX },
        ];
        const pick = cand.find(c => !hits([c.x, c.y, c.x + w, c.y + h]) && c.y > 6 && c.y + h < 168) || cand[0];
        els.pill.dataset.at = pick.at;
        els.pill.style.setProperty('--px', r(pick.x)); els.pill.style.setProperty('--py', r(pick.y)); els.pill.style.setProperty('--nib', r(pick.nib));
      }

      function setAge(node, a) {
        node.className = 'nr-age js-age' + (a.tier !== 'fresh' ? ' is-warn' : '');
        node.innerHTML = NR.icon.clock() + `<span>${a.text}</span>`;
      }
      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) { renderEmpty(vm); return; }
        vm._range = api.L.range;
        const v = view(vm, lang);
        card.classList.remove('is-up', 'is-down', 'is-flat'); card.classList.add(v.rchg > 0 ? 'is-up' : v.rchg < 0 ? 'is-down' : 'is-flat');
        $('.n2-chg').classList.remove('is-up', 'is-down', 'is-flat'); $('.n2-chg').classList.add(v.chg > 0 ? 'is-up' : v.chg < 0 ? 'is-down' : 'is-flat');
        $('.js-rangelabel').textContent = T.range[api.L.range];
        $$('.n2-dots u').forEach((d, i) => d.classList.toggle('is-on', RANGES[i] === api.L.range));
        $('.js-cycle').setAttribute('aria-label', NR.fill(W.cycle, { range: T.rangeSay[api.L.range] }));
        // head: the label, or a status chip (the label then moves to the unit line)
        els.label.textContent = v.label; els.unit.textContent = v.unit;
        if (vm.banner) {
          els.banner.hidden = false;
          els.banner.className = 'nr-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn');
          els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`;
        } else els.banner.hidden = true;
        const up = lastNum == null ? 1 : (NR.num(vm.market.average) >= lastNum ? 1 : -1); lastNum = NR.num(vm.market.average);
        rolls.num.set(v.num, { animate: anim, dir: up });
        els.chgIcon.innerHTML = NR.dirIcon(v.chg);
        rolls.chg.set(v.sign + v.pct, { animate: anim, dir: v.chg || 1 });
        els.chgWord.textContent = v.word;
        els.vs.innerHTML = `${NR.n(v.toman)} ${v.tomanWord} ${W.vsShort}`;
        els.posted.textContent = v.posted + (lang === 'fa' ? '،' : ',');
        setAge(els.age, v.age);
        drawChart(v, { animate: anim });
        els.pillIcon.innerHTML = NR.dirIcon(v.rchg); rolls.pill.set(v.pillSign + v.pillPct, { animate: anim, dir: v.rchg || 1 });
        els.pill.className = 'n2-pill js-pill ' + (v.rchg > 0 ? 'is-up' : v.rchg < 0 ? 'is-down' : 'is-flat');
        placePill();
        $('.n2-main').setAttribute('href', NR.deeplink('chart', api.L, { range: { '1w': 7, '1m': 30, '3m': 90, '1y': 365 }[api.L.range] }));
        card.setAttribute('aria-label', say(vm, v, lang));
        $('.n2-svg').setAttribute('aria-label', `${W.chartLabel}: ${T.rangeSay[v.range]}, ${NR.pct(vm.series[v.range].average_change_pct, lang, { noSign: true })} ${T.word[v.rchg > 0 ? 'up' : v.rchg < 0 ? 'down' : 'flat']}`);
      }
      function renderEmpty(vm) {
        const gal = vm.st === 'gallery';
        els.emptyBanner.innerHTML = gal ? `<b>${W.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`;
        els.emptyBanner.classList.toggle('is-gal', gal);
        els.emptyLine.textContent = gal ? W.galleryLine : ''; els.emptyLine.hidden = !gal;
        card.setAttribute('aria-label', gal ? `${W.gallery}. ${W.galleryLine}` : T.state.unset);
        lastNum = null; curRange = null; ['num', 'chg', 'pill'].forEach(k => { rolls[k].text = null; });
      }

      /* ── buttons (App Intent / Action) ── */
      host.addEventListener('click', e => {
        const cyc = e.target.closest('.js-cycle'), a = e.target.closest('a[href]');
        if (cyc) { e.preventDefault(); api.set({ range: RANGES[(RANGES.indexOf(api.L.range) + 1) % RANGES.length] }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: display-only motion (the sample's life): tilt, rim light under the pointer, the light that breathes and leans, a glint along the line, the dashes that run ── */
      let fx = false, tiltRaf = 0, tx = 0, ty = 0, cx = 0, cy = 0, lx = 0, ly = 0, tlx = 0, tly = 0, t = 0;
      const loop = () => {
        cx += (tx - cx) * .12; cy += (ty - cy) * .12; lx += (tlx - lx) * .08; ly += (tly - ly) * .08;
        tilt.style.transform = `perspective(1100px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
        els.gc.style.transform = `translate3d(${(lx * 34).toFixed(1)}px,${(ly * 18).toFixed(1)}px,0)`;
        tiltRaf = (Math.abs(tx - cx) + Math.abs(ty - cy) + Math.abs(tlx - lx) + Math.abs(tly - ly) > .01) ? requestAnimationFrame(loop) : 0;
      };
      const onMove = e => {
        if (!fx || e.pointerType === 'touch') return;
        const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1;
        tx = nx * 4.5; ty = -ny * 6; tlx = nx; tly = ny;
        els.rim.style.setProperty('--mx', ((e.clientX - b.left) / U / (b.width / U) * 100).toFixed(1) + '%'); els.rim.style.setProperty('--my', ((e.clientY - b.top) / b.height * 100).toFixed(1) + '%');
        els.rim.style.opacity = '1';
        if (!tiltRaf) tiltRaf = requestAnimationFrame(loop);
      };
      const onLeave = () => { tx = ty = tlx = tly = 0; els.rim.style.opacity = '0'; if (!tiltRaf) tiltRaf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true });
      root.addEventListener('pointerleave', onLeave);
      function setFx(on) {
        fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx);
        if (!fx) { tilt.style.transform = ''; els.gc.style.transform = ''; els.rim.style.opacity = '0'; }
      }
      function intro() {
        if (!fx) return;
        const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const v = view(Object.assign(vm, { _range: api.L.range }), lang);
        rolls.num.text = null; rolls.num.set(v.num.replace(/\d/g, () => (lang === 'fa' ? '۰' : '0')), { animate: false });
        setTimeout(() => rolls.num.set(v.num, { animate: true, dir: 1 }), 300 / NR.scale());
        els.reveal.setAttribute('width', 0);
        NR.tween(1300, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        setTimeout(() => card.classList.remove('is-intro'), 3400 / NR.scale());
      }
      function refresh() {
        const vm = api.model(); if (vm.empty) return;
        [rolls.num, rolls.chg, rolls.pill].forEach(x => { if (x.text) x.set(NR.perturb(x.text), { animate: false }); });
        if (api.fx()) intro();
        requestAnimationFrame(() => render({ animate: true }));
      }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(tiltRaf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); },
      };
      function r(n) { return Math.round(n * 100) / 100; }
    },
    notes: () => {
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send', range: '1w' }); vm._range = '1w'; return say(vm, view(vm, lang), lang); };
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      return [
        {
          title: 'ساخت · WidgetKit و Glance',
          html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
            ['کارت تیره و نور', `${c('containerBackground')} با گرادیان «جوهری» تم؛ نور کناری یه ${c('LinearGradient')} + ${c('RadialGradient')} با شفافیت کم (طوری که متن‌ها کنتراست AA رو نگه دارن)`, `بیت‌مپ پس‌زمینه‌ی ثابت با ${c('GlanceModifier.background(ImageProvider)')}`, A],
            ['عدد بزرگ و جمله‌ی دوخطی', `${c('Text')} وزن ۳۰۰ + ${c('.contentTransition(.numericText())')}؛ علامت و عدد هر کدوم جعبه‌ی جدا`, `${c('Text')}؛ بدون انیمیشن`, `${A} / ${B} (رقم‌ها)`],
            ['نمودار', `Swift Charts: دو ${c('LineMark')} (خاکستری = دوره‌ی قبل از بازه، سفید = خود بازه) + ${c('PointMark')} روی «امروز» + ${c('RuleMark')} خط‌چین؛ حباب با ${c('.annotation')}`, 'تصویر برداری که اپ می‌کشه', A],
            ['دکمه‌ی بازه', `یه ${c('Button(intent:)')} که ۱ هفته ← ۱ ماه ← ۳ ماه ← ۱ سال رو می‌چرخونه (هدف لمس ۴۸ × ۱۵۲)`, `${c('actionRunCallback')}`, B],
            ['لمس', `${c('Link')} روی کل ویجت: نمودار بازار با همون بازه`, `${c('actionStartActivity')}`, A],
            ['اندازه', 'متوسط: ۳۶۴ × ۱۷۰ (آیفون ۳۹۳) و ۳۳۸ × ۱۵۸ (آیفون ۳۹۰)', 'حدود ۳۳۶ × ۱۶۰dp (۴ × ۲)', A],
          ]),
        },
        {
          title: 'حرکت‌ها · الف / ب / ج',
          html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی واقعی / نزدیک‌ترین نسخه'], [
            ['رقم‌ها می‌غلتن (میانگین، درصد، حباب)', B, `iOS: ${c('.contentTransition(.numericText())')} هنگام تازه شدن یا زدن دکمه. Android: بدون حرکت.`],
            ['نمودار با دکمه‌ی بازه محو و جایگزین می‌شه', B, `iOS: ${c('.transition(.opacity)')} هنگام App Intent. Android: فوری.`],
            ['ورود: خط از چپ کشیده می‌شه، نشانگر و حباب می‌افتن، رقم‌ها می‌چرخن', C, 'نزدیک‌ترین نسخه: ورود ساده هنگام تازه شدن (ب).'],
            ['نور کناری نفس می‌کشه و به سمت اشاره‌گر خم می‌شه', C, 'نور ثابت.'],
            ['لبه‌ی کارت زیر نور اشاره‌گر روشن می‌شه', C, 'ندارد (گوشی اشاره‌گر نداره).'],
            ['کارت کج می‌شه', C, 'ثابت.'],
            ['نور از روی خط سفید رد می‌شه، خط‌چین آروم پایین می‌ره، دور نشانگر موج می‌خوره', C, 'خط و خط‌چین ثابت.'],
          ]) + NR.p('کلید «حرکت‌های فقط‌نمایشی (ج)» تو نوار بالا همه‌ی ردیف‌های ج رو خاموش می‌کنه.'),
        },
        {
          title: 'دکمه‌ها و لمس',
          html: NR.tbl(['کنترل', 'iOS', 'Android', 'نتیجه'], [
            ['دکمه‌ی بازه', `${c('CycleRangeIntent')}`, `${c('CycleRangeAction')}`, 'بازه ۱ هفته ← ۱ ماه ← ۳ ماه ← ۱ سال ← ۱ هفته؛ تو ذخیره‌ی همون ویجت می‌مونه، اپ باز نمی‌شه، آفلاین هم کار می‌کنه.'],
            ['لمس ویجت', 'Link', 'actionStartActivity', c('netrate://chart?cur=gbp&type=cash&dir=send&range=7')],
          ]) + NR.p('جهت (ارسال / دریافت) تنظیم خود ویجته (نگه داشتن و «ویرایش ویجت»)؛ این ویجت دکمه‌ی جهت نداره چون جا نیست. نمودار دکمه‌ی جهت رو تو «نرخ امروز · بزرگ» ببین.'),
        },
        {
          title: 'داده، جمله‌ی VoiceOver و درخواست داده',
          html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
            [c('market.average'), 'عدد بزرگ؛ ' + c('average_change') + ' و ' + c('average_change_pct') + ': جمله‌ی «بالا رفته / پایین آمده»'],
            [c('market.posted'), c('market.recorded_at') + ': «۹ صرافی نرخ زده‌اند، ۳ دقیقه پیش» (سن عدد = تازه‌ترین ثبت)'],
            [c('market.status'), 'برچسب سر ویجت (' + c('closed') + ' / ' + c('not_posted') + ')'],
            [c('series[range].points[].average'), 'خط سفید (خود بازه)'],
            [c('series[longer range].points[].average'), 'خط خاکستری: همون مدت (حدود دو سوم) قبل از بازه، از سری بلندتر بعدی'],
            [c('series[range].average_change_pct'), 'حباب روی نشانگر (تغییر کل بازه)'],
          ]) + NR.p(`جمله‌ی VoiceOver / TalkBack (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`)
            + '<p><b>درخواست داده</b></p>' + NR.ul([
              `برای ${c('1y')} دوره‌ی قبل‌تر نداریم، پس خط کامل سفیده. اگه دلتون می‌خواد، ${c('series')} یه سری ${c('2y')} (یا ${c('previous_period')} برای هر بازه) بدید.`,
              `${c('stats')} (کف و سقف و میانگین بازه) رو تو این اندازه نشون نمی‌دم (جا نیست)؛ تو «نمودار بازار · بزرگ» استفاده می‌شه.`,
              `${c('market.oldest_at')} رو برای نشان دادن «قدیمی‌ترین ثبت امروز» نیاز داریم (برای صداقت میانگین)؛ فعلاً سن = تازه‌ترین ثبت.`,
            ]),
        },
        {
          title: 'تفاوت‌ها با نمونه و چرا',
          html: NR.ul([
            '<b>پیش‌بینیِ خاکستری ممنوعه:</b> نمونه بعد از «اکنون» یه خط خاکستریِ آینده داشت. اینجا خاکستری یعنی «دوره‌ی قبل از بازه» و نشانگر روی «امروز» (انتهای خط) نشسته؛ هیچ‌جا پیش‌بینی نیست.',
            '<b>منوی ⋮ (فصلی/سالانه، پیش‌بینی روشن/خاموش) شد یه دکمه‌ی بازه:</b> ویجت منو و کشیدنی نداره؛ کلید پیش‌بینی هم با قاعده نمی‌خونه.',
            '<b>نور آبی شد نور کناری نئوترال (و شفق تو تم شفق):</b> آبی تو این پروژه «بالا رفتن» رو می‌رسونه، پس نور تزئینی نباید آبی باشه؛ شدتش هم کم شد تا متن‌ها AA بمونن.',
            '<b>حباب قرمز/سبز شد آبی/مرجانی با فلش و علامت:</b> سبز ممنوعه و رنگ فقط جهته؛ روی کارت تیره از جفت رنگ تم سیاه استفاده می‌شه تا کنتراست بمونه.',
            '<b>تگ فصل زیر خط‌چین حذف شد</b> (اسکرابی نیست) و خط‌چین فقط نشانگر «امروز» رو به پایین وصل می‌کنه.',
            '<b>عدد بزرگ ۱۲B شد میانگین ۹۱٬۷۳۳ با سنش:</b> «هیچ عددی بدون سنش نمی‌آد».',
          ]),
        },
      ];
    },
  });
})();
