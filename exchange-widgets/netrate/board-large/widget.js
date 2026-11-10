/* ==========================================================================
   N10 · board-large  ("Currency board", large)  — built from sample 06 (Insights, the first card)
   Same form as the sample: a dark card lit from above, a title and a period pill, a centred label, a very large
   thin figure with a small arrow, a line with dashed guides at every point and a marker, a note, and a pager of dashes.
   The six dashes are the six currencies; the pill switches the figure between the market average and the most toman
   (the sample's Weekly / Daily / Monthly menu). The light is the direction's colour (coral when the page's
   currency is down, blue when up, which is also what the sample's two cards show), and it changes with the page.
   Reads one answer object (NR_DATA shape): `board.currencies[]` (average, change, best, spark, posted, recorded_at).
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { title: 'تابلوی ارزها', avgM: 'میانگین', bestM: 'بیشترین تومان', pill: 'نمایش {name}؛ برای عوض کردن بزن', page: 'ارز {i} از {n}: {name}', note: 'میانگین بازار هر ارز به تومان؛ نقطه‌ها شش روز کاری اخیرن', gallery: 'تابلوی ارزها', galleryLine: 'میانگین هر ارز به تومان با خط شش‌روزه', posted: '{n} صرافی نرخ زده‌اند', chart: 'نمودار شش روز کاری اخیر', say: '{name}، {rate} تومان، {pct} {word} نسبت به روز کاری قبل، {posted}، {age}', sayBest: '{name}، بیشترین تومان، {rate} تومان، {office}، {age}',
      cur: { gbp: 'پوند', usdt: 'تتر', eur: 'یورو', usd: 'دلار', try: 'لیر', aed: 'درهم' }, per: { gbp: 'تومان برای هر پوند', usdt: 'تومان برای هر تتر', eur: 'تومان برای هر یورو', usd: 'تومان برای هر دلار', try: 'تومان برای هر لیر', aed: 'تومان برای هر درهم' } },
    en: { title: 'Currency board', avgM: 'Average', bestM: 'Most toman', pill: 'Showing {name}; tap to change', page: 'Currency {i} of {n}: {name}', note: 'Market average of each currency in toman; the dots are the last six working days', gallery: 'Currency board', galleryLine: 'Each currency in toman with a six-day line', posted: '{n} offices posted', chart: 'The last six working days', say: '{name}, {rate} toman, {word} {pct} against the last working day, {posted}, {age}', sayBest: '{name}, most toman, {rate} toman, {office}, {age}',
      cur: { gbp: 'Pound', usdt: 'Tether', eur: 'Euro', usd: 'Dollar', try: 'Lira', aed: 'Dirham' }, per: { gbp: 'toman per pound', usdt: 'toman per Tether', eur: 'toman per euro', usd: 'toman per dollar', try: 'toman per lira', aed: 'toman per dirham' } },
  };
  const G = { W: 364, x0: 34, x1: 330, top: 196 };
  let uid = 0;

  /* the six days of each currency: the file's line is a smooth ramp, so the preview gives every currency its own ups and downs
     (seeded, today pinned) and recomputes the change from them; a real server sends real days */
  function board(vm) {
    const B = NR.data.board, wob = NR._wob, jit = NR._jit;
    return B.currencies.map((c, k) => {
      const n = c.spark.length, w0 = wob(k * 3.7);
      const spark = c.spark.map((v, i) => (i === n - 1 ? NR.num(v) : NR.num(v) * (1 + 1.6 * (wob(n - 1 - i + k * 3.7) - w0) + 1.6 * jit((n - 1 - i) * 11 + k * 17 + 5) * .0019)));
      const avg = NR.num(c.average), prev = spark[n - 2], chg = avg - prev, pct = chg / prev * 100;
      return { asset: c.asset, avg, spark, pct, best: c.best, posted: c.posted, age: vm.ageOf(c.recorded_at), chg: NR.sign(pct) };
    });
  }
  const weekdayOf = vm => vm.week.days.map(d => d.weekday);

  function view(vm, lang, page, metric, pick) {
    const T = NR.text[lang], X = TEXT[lang], list = board(vm), c = list[page], i = pick == null ? c.spark.length - 1 : pick, best = metric === 'best';
    const wd = weekdayOf(vm);
    return {
      list, c, n: list.length, name: X.cur[c.asset], per: X.per[c.asset], code: c.asset.toUpperCase(), best,
      num: NR.int(best ? c.best.rate : c.spark[i], lang), pct: NR.pct(c.pct, lang, { noSign: true }), sign: c.chg > 0 ? '+' : c.chg < 0 ? '−' : '', word: NR.dirWord(c.chg, lang),
      office: NR.office(c.best.exchange.id, lang, c.best.exchange.name).name, posted: NR.fill(X.posted, { n: NR.digits(c.posted, lang) }), age: c.age, vals: c.spark,
      letters: wd.map(n => [...NR.weekday(n, lang)][0]), dayName: NR.weekday(wd[Math.min(i, wd.length - 1)], lang), metricName: best ? X.bestM : X.avgM,
    };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang], X = TEXT[lang], sep = lang === 'fa' ? '، ' : ', ';
    const base = v.best ? NR.fill(X.sayBest, { name: v.name, rate: v.num, office: v.office, age: v.age.text }) : NR.fill(X.say, { name: v.name, rate: v.num, pct: v.pct, word: v.word, posted: v.posted, age: v.age.text });
    return (vm.banner ? T.state[vm.banner] + sep : '') + base;
  };

  NR.register({
    id: 'board-large', no: 'N10', name: 'board-large', from: 'از روی ویجت ۰۶ · بینش (کارت اول)', size: 'large',
    names: { fa: 'تابلوی ارزها · بزرگ', en: 'Currency board · large' },
    desc: 'میانگین هر ارز به تومان، یکی‌یکی. کارت تیره با نور بالا، عنوان و قرص، برچسب وسط، عدد درشت و نازک با فلش کوچک، نمودار با خط‌چین‌های عمودی روی هر نقطه و نشانگر، یادداشت و ردیف خط‌های صفحه‌ها از «Insights» ویجت ۰۶ مونده. شش خط پایین شش ارز (پوند، تتر، یورو، دلار، لیر، درهم)ن و قرص عدد رو بین «میانگین» و «بیشترین تومان» عوض می‌کنه. نور کارت رنگ جهته: مرجانی برای ارزِ پایین‌رفته، آبی برای بالارفته (مثل دو کارت نمونه).',
    hints: [
      ['M5 12h14M12 5v14', '<b>خط‌های پایین</b> ارز بعدی رو می‌آرن؛ عدد می‌غلته، نمودار عوض می‌شه، نور به رنگ جهتِ اون ارز درمیاد (App Intent، هدف لمس ۴۴ × ۴۴).'],
      ['M7 8h10M7 12h10M7 16h10', '<b>قرص بالا</b> عدد رو بین میانگین بازار و بیشترین تومان عوض می‌کنه.'],
      ['M3 15l4-5 4 3 5-7 5 4', '<b>روی نمودار بکش</b> (فقط نمایش): نشانگر روی خط سُر می‌خوره و عدد همون روز میاد.'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> ویجت اپ رو روی تابلوی ارزها باز می‌کنه.'],
    ],
    init: () => ({ dir: 'send', page: 0, metric: 'avg' }),

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U, base = Math.round(H - 104), pageY = Math.round(H - 26);
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink nrg n10-card" role="group">
        <div class="nrg-glow js-glow" aria-hidden="true"><i class="a"></i><i class="b"></i><i class="c"></i></div>
        <h3 class="n10-title js-title"></h3>
        <button type="button" class="n10-pill js-pill"><span class="n10-pill-in"><b class="js-pillname"></b>${NR.chevron()}</span></button>
        <a class="n10-main" href="#">
          <p class="n10-lab js-lab"></p>
          <div class="n10-numrow"><div class="n10-num nr-dimmable is-big"><span class="js-num"></span></div><span class="n10-arrow js-arrow"></span></div>
          <p class="n10-chg js-chg"><span class="js-chgpct"></span><span class="js-chgword"></span></p>
          <span class="nr-banner js-banner n10-banner" hidden></span>
        </a>
        <svg class="n10-svg" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="n10a${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:rgb(var(--g1));stop-opacity:.42"/><stop offset=".6" style="stop-color:rgb(var(--g1));stop-opacity:.14"/><stop offset="1" style="stop-color:rgb(var(--g1));stop-opacity:0"/></linearGradient>
            <clipPath id="n10c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath>
          </defs>
          <g clip-path="url(#n10c${id})">
            <g class="n10-guides js-guides"></g>
            <path class="n10-area js-area" style="fill:url(#n10a${id})" d=""/>
            <path class="n10-line js-line" d=""/>
          </g>
          <g class="n10-mark js-mark"><line class="n10-mguide js-mguide" x1="0" x2="0" y1="0" y2="40"/><circle class="n10-halo" r="9"/><circle class="n10-dot js-dot" r="4.6"/></g>
          <g class="n10-days js-days"></g>
        </svg>
        <p class="n10-note"><span class="js-posted"></span><span class="nr-age js-age"></span></p>
        <div class="n10-pager js-pager" role="group">${Array.from({ length: 6 }, (_, i) => `<button type="button" class="n10-dash" data-i="${i}"><i></i></button>`).join('')}</div>

        <div class="n10-empty js-empty" hidden>
          ${NR.ph({ s: 22, t: 22, w: 112, h: 16, r: 7 })}${NR.ph({ e: 18, t: 18, w: 96, h: 30, r: 15 })}${NR.ph({ s: 130, e: 130, t: 70, h: 13, r: 6 })}${NR.ph({ s: 70, e: 70, t: 92, h: 52, r: 14 })}
          ${NR.ph({ s: 24, e: 24, t: 190, h: base - 190 + 8, r: 16 })}${NR.ph({ s: 90, e: 90, b: 18, h: 6, r: 3 })}
          <div class="n10-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;
      const $ = s => host.querySelector(s), $$ = s => [...host.querySelectorAll(s)], card = $('.n10-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = { title: $('.js-title'), pillname: $('.js-pillname'), pill: $('.js-pill'), lab: $('.js-lab'), arrow: $('.js-arrow'), chgpct: $('.js-chgpct'), chgword: $('.js-chgword'), chg: $('.js-chg'), banner: $('.js-banner'), glow: $('.js-glow'),
        guides: $('.js-guides'), area: $('.js-area'), line: $('.js-line'), mark: $('.js-mark'), mguide: $('.js-mguide'), days: $('.js-days'), reveal: $('.js-reveal'), posted: $('.js-posted'), age: $('.js-age'),
        dashes: $$('.n10-dash'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline') };
      const NS = 'http://www.w3.org/2000/svg', svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k])); parent && parent.appendChild(e); return e; };
      const rolls = { num: new NR.Roll($('.js-num')) };
      let lastNum = null, lastPage = null, XS = [], picked = null, markXY = [G.x1, G.top];

      function drawChart(v, animate) {
        const n = v.vals.length, dom = NR.domain(v.vals, .011, .3), step = (G.x1 - G.x0) / (n - 1), top = G.top + 14;
        XS = v.vals.map((_, i) => G.x0 + step * i); const Y = a => top + (base - top) * (1 - (a - dom[0]) / (dom[1] - dom[0])), ys = v.vals.map(Y);
        const f = NR.monotone(XS, ys), N = 40, px = [], py = []; for (let i = 0; i < N; i++) { const x = XS[0] + (XS[n - 1] - XS[0]) * i / (N - 1); px.push(x); py.push(f(x)); }
        const d = NR.smooth(px, py);
        els.line.setAttribute('d', d); els.area.setAttribute('d', `${d}L${r(XS[n - 1])},${base}L${r(XS[0])},${base}Z`);
        els.guides.textContent = ''; XS.forEach((x, i) => svgEl('line', { x1: r(x), x2: r(x), y1: r(ys[i]), y2: base, class: 'n10-guide' }, els.guides));
        els.days.textContent = ''; XS.forEach((x, i) => { const t = svgEl('text', { x: r(x), y: base + 20, 'text-anchor': 'middle' }, els.days); t.textContent = v.letters[i] || ''; });
        els.mark.dataset.ys = JSON.stringify(ys.map(r));
        placeMark(picked == null ? n - 1 : picked, ys, false);
        if (animate) { els.line.animate([{ opacity: .2 }, { opacity: 1 }], { duration: 420 / NR.scale(), easing: 'ease-out' }); els.area.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520 / NR.scale(), easing: 'ease-out' }); }
      }
      function placeMark(i, ys, smooth) {
        ys = ys || JSON.parse(els.mark.dataset.ys || '[]'); if (!ys.length) return;
        const x = XS[i], y = ys[i], my = G.top - 6;   // the marker rides above the chart, its guide runs down through the point to the baseline
        els.mark.style.transition = smooth ? 'transform .25s cubic-bezier(.3,1.4,.5,1)' : 'none';
        els.mark.style.transform = `translate(${r(x)}px, ${r(my)}px)`;
        els.mguide.setAttribute('y2', r(base - my));
        markXY = [x, y];
      }

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          els.emptyLine.textContent = gal ? X.galleryLine : ''; els.emptyLine.hidden = !gal;
          card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset); lastNum = null; lastPage = null; rolls.num.text = null; return;
        }
        const page = api.L.page, metric = api.L.metric, v = view(vm, lang, page, metric, picked);
        card.dataset.dir = v.c.chg > 0 ? 'up' : v.c.chg < 0 ? 'down' : 'flat'; card.classList.toggle('has-banner', !!vm.banner); card.classList.toggle('is-best', v.best);
        els.title.textContent = X.title; els.pillname.textContent = v.metricName; els.lab.innerHTML = `${v.name}<span class="n10-code">${v.code}</span>`;
        els.arrow.innerHTML = NR.dirIcon(v.c.chg);
        if (picked != null) { els.chgpct.textContent = v.dayName; els.chgword.textContent = ''; } else if (v.best) { els.chgpct.textContent = v.office; els.chgword.textContent = ''; } else { els.chgpct.innerHTML = NR.n(v.sign + v.pct); els.chgword.textContent = v.word; }
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner n10-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        const val = NR.num(v.best ? v.c.best.rate : v.vals[v.vals.length - 1]), up = lastNum == null || val >= lastNum ? 1 : -1; lastNum = val;
        rolls.num.set(v.num, { animate: anim || picked != null, dir: up });
        els.posted.textContent = v.posted; NR.setAge(els.age, v.age);
        els.pill.setAttribute('aria-label', NR.fill(X.pill, { name: v.metricName }));
        els.dashes.forEach((b, i) => { b.classList.toggle('is-on', i === page); b.setAttribute('aria-current', i === page ? 'true' : 'false'); b.setAttribute('aria-label', NR.fill(X.page, { i: NR.digits(i + 1, lang), n: NR.digits(v.n, lang), name: X.cur[v.list[i].asset] })); b.style.display = i < v.n ? '' : 'none'; });
        drawChart(v, anim && lastPage !== null && lastPage !== page); lastPage = page;
        $('.n10-main').setAttribute('href', NR.deeplink('board', api.L));
        card.setAttribute('aria-label', say(vm, view(vm, lang, page, metric, null), lang));
        $('.n10-svg').setAttribute('aria-label', X.chart);
      }
      host.addEventListener('click', e => {
        const pill = e.target.closest('.js-pill'), dash = e.target.closest('.n10-dash'), a = e.target.closest('a[href]');
        if (pill) { e.preventDefault(); api.set({ metric: api.L.metric === 'avg' ? 'best' : 'avg' }); return; }
        if (dash) { e.preventDefault(); picked = null; api.set({ page: +dash.dataset.i }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: display-only: drag over the chart to read a day, the lights lean toward the pointer and drift, the card leans, count-up on entry ── */
      let fx = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, gx = 0, gy = 0, tgx = 0, tgy = 0;
      const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; gx += (tgx - gx) * .07; gy += (tgy - gy) * .07; tilt.style.transform = `perspective(1100px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`; els.glow.style.transform = `translate3d(${(gx * 18).toFixed(1)}px,${(gy * 12).toFixed(1)}px,0)`; raf = (Math.abs(tx - cx) + Math.abs(ty - cy) + Math.abs(tgx - gx) + Math.abs(tgy - gy) > .01) ? requestAnimationFrame(loop) : 0; };
      const pickAt = e => {
        const b = root.getBoundingClientRect(), x = (e.clientX - b.left) / b.width * G.W, y = (e.clientY - b.top) / b.height * H;
        if (y < G.top - 18 || y > base + 26) return clearPick();
        let bi = 0, bd = 1e9; XS.forEach((xx, i) => { const d = Math.abs(xx - x); if (d < bd) { bd = d; bi = i; } });
        if (bi !== picked) { picked = bi; render({}); placeMark(bi, null, true); els.dot_ = 1; }
      };
      const clearPick = () => { if (picked == null) return; picked = null; render({}); placeMark(XS.length - 1, null, true); };
      const onMove = e => { if (!fx || e.pointerType === 'touch') return; const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1; tx = nx * 3; ty = -ny * 3.6; tgx = nx; tgy = ny; if (!raf) raf = requestAnimationFrame(loop); pickAt(e); };
      const onLeave = () => { tx = ty = tgx = tgy = 0; clearPick(); if (!raf) raf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) { tilt.style.transform = ''; els.glow.style.transform = ''; } }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const v = view(vm, lang, api.L.page, api.L.metric, null);
        rolls.num.text = null; rolls.num.set(v.num.replace(/\d/g, () => (lang === 'fa' ? '۰' : '0')), { animate: false }); setTimeout(() => rolls.num.set(v.num, { animate: true, dir: 1 }), 360 / NR.scale());
        els.reveal.setAttribute('width', 0); NR.tween(1300, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        setTimeout(() => card.classList.remove('is-intro'), 2800 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; rolls.num.text && rolls.num.set(NR.perturb(rolls.num.text), { animate: false }); if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); },
      };
      function r(n) { return Math.round(n * 100) / 100; }
    },
    qa: (vm, lang) => ({ number: NR.int(board(vm)[0].avg, lang), age: board(vm)[0].age.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang, 0, 'avg', null), lang); };
      return [
        { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
          ['کارت و نور', `${c('containerBackground')} تیره + چند ${c('RadialGradient')} (رنگ از جهت ارزِ صفحه: آبی بالا، مرجانی پایین)`, 'بیت‌مپ‌های پس‌زمینه (آبی / مرجانی / خاکستری) که اپ از قبل می‌کشه', A],
          ['عدد درشت', `${c('Text')} وزن ۳۰۰ + ${c('.contentTransition(.numericText())')}؛ فلش SF Symbol`, `${c('Text')}`, `${A} / ${B}`],
          ['نمودار', `Swift Charts: ${c('LineMark')} + ${c('AreaMark')} + ${c('RuleMark')} نقطه‌چین روی هر نقطه + ${c('PointMark')}؛ ۶ نقطه`, 'تصویر برداری که اپ می‌کشه', A],
          ['خط‌های صفحه', `شش ${c('Button(intent: GoToPageIntent(i))')}، هدف لمس هر کدوم ۴۴ × ۴۴`, c('actionRunCallback'), B],
          ['قرص', `${c('Button(intent: ToggleMetricIntent())')}`, c('actionRunCallback'), B],
          ['لمس', `${c('Link')}: ${c('netrate://board?cur=gbp&type=cash&dir=send')}`, c('actionStartActivity'), A],
          ['اندازه', 'بزرگ: ۳۶۴ × ۳۸۲ و ۳۳۸ × ۳۵۴', 'حدود ۳۳۶ × ۳۴۰dp (۴ × ۴)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['صفحه‌ی بعد: عدد می‌غلته، نمودار محو و جایگزین می‌شه، نور به رنگ جدید درمیاد', B, `iOS: ${c('.contentTransition')} و ${c('.transition(.opacity)')} هنگام App Intent؛ Android: فوری`],
          ['ورود: خط از چپ کشیده می‌شه، عدد می‌چرخه', C, 'ورود ساده هنگام تازه شدن (ب)'],
          ['روی نمودار بکشی: نشانگر سُر می‌خوره و عدد همون روز میاد', C, 'ندارد (گوشی کشیدن روی ویجت نداره)'],
          ['نور به سمت اشاره‌گر خم می‌شه و آروم جابه‌جا می‌شه، کارت خم می‌شه', C, 'نور و کارت ثابت'],
          ['حلقه‌ی نشانگر پلک می‌زنه', C, 'ثابت'],
        ]) },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('board.currencies[].asset'), 'برچسب و خط صفحه'], [c('…average'), 'عدد (قرص روی «میانگین»)'], [c('…best.rate / best.exchange'), 'عدد و نام صرافی (قرص روی «بیشترین تومان»)'], [c('…spark[]'), 'نمودار شش‌روزه'],
          [c('…average_change_pct'), 'تغییر زیر عدد و جهت نور (تو پیش‌نمایش از ' + c('spark') + ' دوباره حساب می‌شه)'], [c('…posted، recorded_at'), 'یادداشت و سن'], [c('board.status'), 'چیپ وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([
          `${c('board')} فقط برای ${c('direction=send')} هست؛ برای دریافت (و برای حالت‌های یکشنبه و پیش از نرخ) سرور باید بده. اینجا جهت قابل انتخاب نیست.`,
          `خط شش‌روزه‌ی فایل نمونه یه شیب صافه؛ پیش‌نمایش برای هر ارز بالا و پایین می‌سازه (روز آخر دست‌نخورده). سرور روزهای واقعی رو می‌ده.`,
          `${c('best')} روی تابلو تغییر ندارد؛ اگه ${c('best.change_pct')} هم بیاد، زیر عدد «بیشترین تومان» هم تغییر نشون می‌دیم.`,
        ]) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>«Insights / Revenue Growth / 75%»</b> شد «تابلوی ارزها / پوند / ۹۱٬۷۳۳». پیش‌بینی نمونه («Expect your revenue to rise…») ممنوعه؛ جاش یادداشت واقعیِ «تعداد صرافی + سن» نشسته.',
          '<b>منوی «Weekly ⌄»</b> شد قرص «میانگین ⌄ / بیشترین تومان ⌄».',
          '<b>خط‌های صفحه شش ارز شدن</b> (نمونه شش صفحه‌ی بینش داشت)، و نشانگر نارنجی نمونه همون نشانگر «امروزه».',
          '<b>رنگ نور:</b> نمونه نارنجی و آبی با هم داشت؛ اینجا رنگ نور جهتِ همون ارزه (مرجانی پایین، آبی بالا)، و فلش و علامت هم همراهشه.',
          '<b>کشیدن انگشت برای ورق زدن</b> رو نداریم؛ خط‌های پایین دکمه‌ان.',
        ]) },
      ];
    },
  });
})();
