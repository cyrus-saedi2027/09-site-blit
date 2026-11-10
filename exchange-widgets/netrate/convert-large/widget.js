/* ==========================================================================
   N11 · convert-large  ("Converter", large)  — built from sample 06 (Conversion, the second card)
   Same form as the sample: a dark card lit from above, a title and a small chip, a centred label, a very large thin figure, a glowing
   tube-like wave with a dot, a glass pill with a note and an "Explore more +" button, and a pager of dashes.
   Here the figure is what an amount of pounds becomes at the first office, the wave is the result at each of the five offices
   (in order, every dot alike) against a dashed line for the market average, the glass pill says how much more than the average the first
   office gives, and "+" steps to the next amount. The four dashes are the four amounts.
   Reads one answer object (NR_DATA shape): `convert.amounts[]` (offices, average_result, best_vs_average). Send only.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { title: 'مبدل', chip: 'پوند', label: '{amount} پوند نزد {office}', avg: 'میانگین بازار', gapNum: '{n} تومان', above: 'بیشتر از میانگین بازار', below: 'کمتر از میانگین بازار', next: 'مبلغ بعدی', nextA: 'مبلغ بعدی، {amount} پوند', amountA: 'مبلغ {i} از {n}: {amount} پوند', chart: 'نتیجه‌ی هر پنج صرافی برای همین مبلغ', rank: 'رتبه {n}', gallery: 'مبدل', galleryLine: 'مبلغ پوند، نتیجه به تومان و فاصله از میانگین بازار', unit: 'تومان', say: 'اگر {amount} پوند بفرستی، نزد {office}، {result} تومان می‌رسد، {gap} تومان بیشتر از میانگین بازار، {age}' },
    en: { title: 'Converter', chip: 'Pound', label: '{amount} pounds at {office}', avg: 'Market average', gapNum: '{n} toman', above: 'above the market average', below: 'below the market average', next: 'Next amount', nextA: 'Next amount, {amount} pounds', amountA: 'Amount {i} of {n}: {amount} pounds', chart: 'The result at each of the five offices for this amount', rank: 'Rank {n}', gallery: 'Converter', galleryLine: 'An amount in pounds, the result in toman and the gap to the market average', unit: 'toman', say: 'If you send {amount} pounds, at {office} you receive {result} toman, {gap} toman above the market average, {age}' },
  };
  const G = { W: 364, x0: 40, x1: 324, top: 156 };
  let uid = 0;

  function view(vm, lang, k, pick) {
    const T = NR.text[lang], X = TEXT[lang], C = NR.data.convert, a = C.amounts[k], o = a.offices, i = pick == null ? 0 : pick;
    const off = o[i];
    return {
      k, n: C.amounts.length, amount: NR.int(a.amount, lang), results: o.map(x => NR.num(x.result)), avgRes: NR.num(a.average_result), rankIdx: i,
      office: NR.office(off.exchange.id, lang, off.exchange.name).name, result: NR.int(off.result, lang), gap: NR.int(a.best_vs_average, lang), gapBest: NR.int(o[0].result - a.average_result, lang),
      gapHere: NR.num(off.result) - NR.num(a.average_result), age: vm.ageOf(off.recorded_at), unit: X.unit, amounts: C.amounts.map(x => NR.int(x.amount, lang)), link: 'office/' + off.exchange.id,
    };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang], X = TEXT[lang], sep = lang === 'fa' ? '، ' : ', ';
    return (vm.banner ? T.state[vm.banner] + sep : '') + NR.fill(X.say, { amount: v.amount, office: v.office, result: v.result, gap: v.gap, age: v.age.text });
  };

  NR.register({
    id: 'convert-large', no: 'N11', name: 'convert-large', from: 'از روی ویجت ۰۶ · نرخ تبدیل (کارت دوم)', size: 'large',
    names: { fa: 'مبدل · بزرگ', en: 'Converter · large' },
    desc: 'اگر الان مثلاً ۱٬۰۰۰ پوند بفرستی، نزد اولین ردیف چند تومان می‌رسه و چقدر بیشتر از میانگین بازاره. کارت تیره با نور بالا، برچسب وسط، عدد درشت و نازک، موج لوله‌ای نورانی، قرص شیشه‌ای با یادداشت و دکمه‌ی «+» و ردیف خط‌های صفحه از «Conversion» ویجت ۰۶ مونده. موج نتیجه‌ی هر پنج صرافیه (همه‌ی نقطه‌ها یک‌شکل؛ نور و قاب ویژه‌ای برای ردیف اول نیست) با خط‌چین میانگین بازار. چهار خط پایین چهار مبلغ (۵۰۰ / ۱٬۰۰۰ / ۲٬۰۰۰ / ۵٬۰۰۰) و «+» مبلغ بعدیه.',
    hints: [
      ['M12 5v14M5 12h14', '<b>«مبلغ بعدی +»</b> مبلغ رو می‌چرخونه؛ عدد می‌غلته و موج عوض می‌شه (App Intent).'],
      ['M5 12h14', '<b>خط‌های پایین</b> مستقیم مبلغ رو انتخاب می‌کنن (هدف لمس ۴۶ × ۴۶).'],
      ['M3 15l4-5 4 3 5-7 5 4', '<b>روی نقطه‌ها بکش</b> (فقط نمایش): عدد و نام همون صرافی میاد.'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو روی نتیجه‌ی همون صرافی باز می‌کنه.'],
    ],
    init: () => ({ dir: 'send', amt: 1 }),

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U, pillTop = Math.round(H - 118), base = pillTop - 36;
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink nrg n11-card" role="group">
        <div class="nrg-glow js-glow" aria-hidden="true"><i class="a"></i><i class="b"></i><i class="c"></i></div>
        <h3 class="n11-title js-title"></h3>
        <span class="n11-chip js-chip"></span>
        <a class="n11-main" href="#">
          <p class="n11-lab js-lab"></p>
          <div class="n11-num nr-dimmable is-big"><span class="js-num"></span></div>
          <p class="n11-unit js-unit"></p>
          <span class="nr-banner js-banner n11-banner" hidden></span>
        </a>
        <svg class="n11-svg" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="n11f${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${G.W}" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".1" stop-color="#fff"/><stop offset=".9" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
            <mask id="n11m${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${G.W}" height="${r(H)}"><rect width="${G.W}" height="${r(H)}" fill="url(#n11f${id})"/></mask>
            <clipPath id="n11c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath>
          </defs>
          <g clip-path="url(#n11c${id})">
            <g mask="url(#n11m${id})" class="js-tube"><path class="t1 js-t1" d=""/><path class="t2 js-t2" d=""/><path class="t3 js-t3" d=""/><path class="t4 js-t4" d=""/></g>
            <line class="n11-avg js-avgline" x1="${G.x0 - 10}" x2="${G.x1 + 10}" y1="0" y2="0"/>
            <text class="n11-avglab js-avglab" x="${G.x0 - 8}" y="0"></text>
            <g class="n11-pts js-pts"></g>
          </g>
          <g class="n11-ranks js-ranks"></g>
        </svg>
        <div class="n11-glass js-glass">
          <div class="n11-gnote"><p class="n11-gnum js-gapnum"></p><p class="n11-glab js-gaplab"></p><p class="n11-gage"><span class="nr-age js-age"></span></p></div>
          <button type="button" class="n11-next js-next"><span class="n11-next-in"><b class="js-nexttext"></b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg></span></button>
        </div>
        <div class="n11-pager js-pager" role="group">${Array.from({ length: 4 }, (_, i) => `<button type="button" class="n11-dash" data-i="${i}"><i></i></button>`).join('')}</div>

        <div class="n11-empty js-empty" hidden>
          ${NR.ph({ s: 24, t: 22, w: 70, h: 16, r: 7 })}${NR.ph({ e: 18, t: 18, w: 84, h: 30, r: 15 })}${NR.ph({ s: 100, e: 100, t: 62, h: 13, r: 6 })}${NR.ph({ s: 52, e: 52, t: 84, h: 52, r: 14 })}
          ${NR.ph({ s: 24, e: 24, t: 150, h: base - 150 + 28, r: 16 })}${NR.ph({ s: 22, e: 22, t: pillTop, h: 70, r: 35 })}
          <div class="n11-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;
      const $ = s => host.querySelector(s), $$ = s => [...host.querySelectorAll(s)], card = $('.n11-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = { title: $('.js-title'), chip: $('.js-chip'), lab: $('.js-lab'), unit: $('.js-unit'), banner: $('.js-banner'), glow: $('.js-glow'), t: [$('.js-t1'), $('.js-t2'), $('.js-t3'), $('.js-t4')], avgline: $('.js-avgline'), avglab: $('.js-avglab'), pts: $('.js-pts'), ranks: $('.js-ranks'),
        reveal: $('.js-reveal'), gapnum: $('.js-gapnum'), gaplab: $('.js-gaplab'), age: $('.js-age'), next: $('.js-next'), nexttext: $('.js-nexttext'), dashes: $$('.n11-dash'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline') };
      const NS = 'http://www.w3.org/2000/svg', svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k])); parent && parent.appendChild(e); return e; };
      const rolls = { num: new NR.Roll($('.js-num')) };
      let lastNum = null, lastAmt = null, XS = [], picked = null;

      function drawWave(v, animate) {
        const n = v.results.length, dom = NR.domain([...v.results, v.avgRes], .02, .2), step = (G.x1 - G.x0) / (n - 1), top = G.top + 6;
        XS = v.results.map((_, i) => G.x0 + step * i); const Y = a => top + (base - top) * (1 - (a - dom[0]) / (dom[1] - dom[0])), ys = v.results.map(Y);
        const f = NR.monotone(XS, ys), N = 56, px = [], py = []; for (let i = 0; i < N; i++) { const x = XS[0] + (XS[n - 1] - XS[0]) * i / (N - 1); px.push(x); py.push(f(x)); }
        // the tube runs a little past the first and last dot, level with them
        const d = NR.smooth([XS[0] - 22, ...px, XS[n - 1] + 22], [ys[0], ...py, ys[n - 1]]);
        els.t.forEach(p => p.setAttribute('d', d));
        const ya = Y(v.avgRes); els.avgline.setAttribute('y1', r(ya)); els.avgline.setAttribute('y2', r(ya)); els.avglab.textContent = X.avg;
        // the label sits at the end of the line, on whichever side the wave is not (it must not run into the wave)
        const near = []; for (let x = G.x1 - 90; x <= G.x1 + 4; x += 6) near.push(f(Math.min(x, XS[n - 1])));
        const above = near.reduce((s, y) => s + y, 0) / near.length > ya; els.avglab.setAttribute('x', G.x1 + 10); els.avglab.setAttribute('text-anchor', 'end'); els.avglab.setAttribute('y', r(above ? ya - 7 : ya + 17));
        els.pts.textContent = ''; els.ranks.textContent = '';
        XS.forEach((x, i) => {
          const g = svgEl('g', { class: 'n11-pt' + (i === (picked == null ? 0 : picked) ? ' is-cur' : ''), transform: `translate(${r(x)} ${r(ys[i])})` }, els.pts);
          svgEl('circle', { class: 'n11-halo', r: 9 }, g); svgEl('circle', { class: 'n11-dotr', r: 5 }, g);
          const t = svgEl('text', { x: r(x), y: base + 20, 'text-anchor': 'middle' }, els.ranks); t.textContent = NR.digits(i + 1, lang);
        });
        if (animate) { els.t.forEach(p => p.animate([{ opacity: .1 }, { opacity: 1 }], { duration: 480 / NR.scale(), easing: 'ease-out' })); }
      }

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          els.emptyLine.textContent = gal ? X.galleryLine : ''; els.emptyLine.hidden = !gal;
          card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset); lastNum = null; lastAmt = null; rolls.num.text = null; return;
        }
        const k = api.L.amt, v = view(vm, lang, k, picked), v0 = view(vm, lang, k, null), chg = NR.sign(vm.market.average_change_pct);
        card.dataset.dir = chg > 0 ? 'up' : chg < 0 ? 'down' : 'flat'; card.classList.toggle('has-banner', !!vm.banner);
        els.title.textContent = X.title; els.chip.textContent = X.chip; els.lab.textContent = NR.fill(X.label, { amount: v.amount, office: v.office }); els.unit.textContent = v.unit;
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner n11-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        const val = NR.num(NR.data.convert.amounts[k].offices[v.rankIdx].result), up = lastNum == null || val >= lastNum ? 1 : -1; lastNum = val;
        rolls.num.set(v.result, { animate: anim || picked != null, dir: up });
        const below = picked != null && v.gapHere < 0; els.gapnum.textContent = NR.fill(X.gapNum, { n: picked != null ? NR.int(Math.abs(v.gapHere), lang) : v.gap }); els.gaplab.textContent = below ? X.below : X.above;
        NR.setAge(els.age, v.age);
        const nk = (k + 1) % v.n; els.nexttext.textContent = X.next; els.next.setAttribute('aria-label', NR.fill(X.nextA, { amount: v.amounts[nk] }));
        els.dashes.forEach((b, i) => { b.classList.toggle('is-on', i === k); b.setAttribute('aria-current', i === k ? 'true' : 'false'); b.setAttribute('aria-label', NR.fill(X.amountA, { i: NR.digits(i + 1, lang), n: NR.digits(v.n, lang), amount: v.amounts[i] })); });
        drawWave(v, anim && lastAmt !== null && lastAmt !== k); lastAmt = k;
        $('.n11-main').setAttribute('href', NR.deeplink(v.link, api.L, { amount: NR.data.convert.amounts[k].amount }));
        card.setAttribute('aria-label', say(vm, v0, lang));
        $('.n11-svg').setAttribute('aria-label', X.chart);
      }
      host.addEventListener('click', e => {
        const nx = e.target.closest('.js-next'), dash = e.target.closest('.n11-dash'), a = e.target.closest('a[href]');
        if (nx) { e.preventDefault(); picked = null; api.set({ amt: (api.L.amt + 1) % NR.data.convert.amounts.length }); return; }
        if (dash) { e.preventDefault(); picked = null; api.set({ amt: +dash.dataset.i }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: drag over the dots to read another office, the lights lean and breathe, the card leans, count-up on entry ── */
      let fx = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0, gx = 0, gy = 0, tgx = 0, tgy = 0;
      const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; gx += (tgx - gx) * .07; gy += (tgy - gy) * .07; tilt.style.transform = `perspective(1100px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`; els.glow.style.transform = `translate3d(${(gx * 18).toFixed(1)}px,${(gy * 12).toFixed(1)}px,0)`; raf = (Math.abs(tx - cx) + Math.abs(ty - cy) + Math.abs(tgx - gx) + Math.abs(tgy - gy) > .01) ? requestAnimationFrame(loop) : 0; };
      const pickAt = e => {
        const b = root.getBoundingClientRect(), x = (e.clientX - b.left) / b.width * G.W, y = (e.clientY - b.top) / b.height * H;
        if (y < G.top - 14 || y > base + 28) return clearPick();
        let bi = 0, bd = 1e9; XS.forEach((xx, i) => { const d = Math.abs(xx - x); if (d < bd) { bd = d; bi = i; } });
        if (bi !== picked) { picked = bi; render({}); }
      };
      const clearPick = () => { if (picked == null) return; picked = null; render({}); };
      const onMove = e => { if (!fx || e.pointerType === 'touch') return; const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1; tx = nx * 3; ty = -ny * 3.6; tgx = nx; tgy = ny; if (!raf) raf = requestAnimationFrame(loop); pickAt(e); };
      const onLeave = () => { tx = ty = tgx = tgy = 0; clearPick(); if (!raf) raf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) { tilt.style.transform = ''; els.glow.style.transform = ''; } }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const v = view(vm, lang, api.L.amt, null);
        rolls.num.text = null; rolls.num.set(v.result.replace(/\d/g, () => (lang === 'fa' ? '۰' : '0')), { animate: false }); setTimeout(() => rolls.num.set(v.result, { animate: true, dir: 1 }), 360 / NR.scale());
        els.reveal.setAttribute('width', 0); NR.tween(1400, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        setTimeout(() => card.classList.remove('is-intro'), 2800 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; rolls.num.text && rolls.num.set(NR.perturb(rolls.num.text), { animate: false }); if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); },
      };
      function r(n) { return Math.round(n * 100) / 100; }
    },
    qa: (vm, lang) => { const v = view(vm, lang, 1, null); return { number: v.result, age: v.age.text }; },
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang, 1, null), lang); };
      return [
        { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
          ['کارت و نور', `${c('containerBackground')} تیره + ${c('RadialGradient')}ها (رنگ از جهت میانگین بازار)`, 'بیت‌مپ پس‌زمینه‌ی ثابت', A],
          ['عدد درشت', `${c('Text')} وزن ۳۰۰ + ${c('.contentTransition(.numericText())')}`, c('Text'), `${A} / ${B}`],
          ['موج و نقطه‌ها', `Swift Charts: ${c('LineMark(interpolationMethod: .catmullRom)')} با چند لایه‌ی ضخیم و کم‌رنگ برای درخشش + ${c('PointMark')} برای پنج صرافی + ${c('RuleMark')} نقطه‌چین برای میانگین`, 'تصویر برداری که اپ می‌کشه', A],
          ['قرص شیشه‌ای', `${c('Text')} روی ${c('.background(.ultraThinMaterial)')} (یا یه ${c('Capsule')} نیمه‌شفاف)`, 'نیمه‌شفاف ساده', A],
          ['«مبلغ بعدی +» و خط‌ها', `${c('Button(intent: NextAmountIntent())')} و چهار ${c('Button(intent: SetAmountIntent(i))')} (هدف لمس ۴۶ × ۴۶)`, c('actionRunCallback'), B],
          ['لمس', `${c('Link')}: ${c('netrate://office/pars?cur=gbp&type=cash&dir=send&amount=1000')}`, c('actionStartActivity'), A],
          ['اندازه', 'بزرگ: ۳۶۴ × ۳۸۲ و ۳۳۸ × ۳۵۴', 'حدود ۳۳۶ × ۳۴۰dp (۴ × ۴)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['مبلغ بعدی: عدد می‌غلته، موج محو و جایگزین می‌شه', B, `iOS: ${c('.contentTransition')} و ${c('.transition(.opacity)')} هنگام App Intent؛ Android: فوری`],
          ['ورود: موج از چپ کشیده می‌شه، عدد می‌چرخه', C, 'ورود ساده هنگام تازه شدن (ب)'],
          ['روی نقطه‌ها بکشی: عدد و نام همون صرافی', C, 'ندارد'],
          ['نور به سمت اشاره‌گر خم می‌شه و آروم نفس می‌کشه، کارت خم می‌شه', C, 'ثابت'],
        ]) },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('convert.amounts[].amount'), 'برچسب، خط‌های پایین و مبلغ بعدی'], [c('…offices[0].result / exchange / recorded_at'), 'عدد، نام صرافی و سن'], [c('…offices[].result'), 'پنج نقطه‌ی موج'], [c('…average_result'), 'خط‌چین میانگین'], [c('…best_vs_average'), 'قرص شیشه‌ای'], [c('market.average_change_pct'), 'رنگ نور'], [c('market.status'), 'چیپ وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([
          `${c('convert')} فقط برای ${c('direction=send')} و ${c('asset=gbp')} هست. برای دریافت از ایران (نتیجه‌ی پوند برای مبلغ تومان) و ارزهای دیگه داده‌ای نداریم؛ این ویجت فعلاً جهت و ارز قابل انتخاب نداره.`,
          `${c('convert')} برای حالت‌های یکشنبه و پیش از نرخ تو نمونه نیست؛ همون داده با سنِ قدیمی‌تر نشون داده می‌شه.`,
        ]) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>«Conversion / Conversion Rate / 250%»</b> شد «مبدل / ۱٬۰۰۰ پوند نزد پارس / ۹۲٬۸۵۰٬۰۰۰ تومان». درصدهای رشدِ نمونه نمی‌خوریم.',
          '<b>موج نمونه (قله‌ی نورانی با نقطه‌ی درخشان روی بالاترین)</b> شد موج نتیجه‌ی پنج صرافی. نقطه‌ی درخشان روی ردیف اول <b>نیست</b>: همه‌ی نقطه‌ها یک‌شکل‌ان (قاعده‌ی «همه‌ی صرافی‌ها برابرن»)؛ رتبه فقط عدد زیر نقطه‌ست.',
          '<b>قرص شیشه‌ای «Explore more +»</b> شد «مبلغ بعدی +» با جمله‌ی «… تومان بیشتر از میانگین بازار».',
          '<b>منوی «Weekly ⌄»</b> شد یه چیپ ثابت «پوند» (فقط پوند داریم)؛ دکمه نیست.',
          '<b>رنگ نور:</b> جهت میانگین بازاره (آبی بالا، مرجانی پایین)، نه رنگ ثابت.',
        ]) },
      ];
    },
  });
})();
