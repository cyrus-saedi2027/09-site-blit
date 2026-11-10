/* ==========================================================================
   N03 · week-large  ("This week against last week", large)  — built from sample 03 (Revenue Analytics)
   Same form as the sample: a dark glass card lit from its corners, a title with a
   small control under it, a thin big figure, a change badge, an area chart with a
   dashed "compare" line and a ringed end marker, labels on the value and day axes.
   "This Month" becomes "This week", the month comparison becomes last week
   (a dashed line you can switch off with the ⋯ button), "Apr 2025" becomes the direction.
   Reads one answer object (NR_DATA shape): `week` (this / last for each working day).
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { title: 'این هفته', sub: 'در برابر هفته‌ی پیش', vs: 'نسبت به هفته‌ی پیش', best: 'بهترین روز', thisW: 'این هفته', lastW: 'هفته‌ی پیش', cmp: 'مقایسه با هفته‌ی پیش', dirLabel: 'جهت', chart: 'نمودار این هفته و هفته‌ی پیش', gallery: 'این هفته در برابر هفته‌ی پیش', galleryLine: 'میانگین هفته، تغییرش و نمودار هر روز کاری', say: 'میانگین این هفته، {rate} تومان برای هر پوند، {pct} {word} نسبت به هفته‌ی پیش، بهترین روز {day}، {age}' },
    en: { title: 'This week', sub: 'vs last week', vs: 'vs last week', best: 'Best day', thisW: 'This week', lastW: 'Last week', cmp: 'Compare with last week', dirLabel: 'Direction', chart: 'This week and last week', gallery: 'This week vs last week', galleryLine: 'The week average, its change and each working day', say: "This week's average, {rate} toman per pound, {word} {pct} against last week, best day {day}, {age}" },
  };
  const G = { W: 364, x0: 24, x1: 300, top: 200, base: 312 };
  let uid = 0;

  function view(vm, lang) {
    const W = vm.week, T = NR.text[lang], X = TEXT[lang], chg = NR.sign(W.change_pct);
    const days = W.days, vals = days.flatMap(d => [NR.num(d.this), NR.num(d.last)]);
    const bd = W.best_day;
    return {
      title: X.title, sub: X.sub, unit: T.unit, num: NR.int(W.this_average, lang),
      chg, pct: NR.pct(W.change_pct, lang, { noSign: true }), sign: chg > 0 ? '+' : chg < 0 ? '−' : '', word: NR.dirWord(chg, lang),
      days, thisV: days.map(d => NR.num(d.this)), lastV: days.map(d => NR.num(d.last)), vals,
      labels: days.map(d => NR.weekday(d.weekday, lang)),
      bestDay: NR.weekday(bd.weekday, lang), bestVal: NR.int(bd.value, lang), age: vm.mktAge,
      dir: T.dir[vm.dir + 'Short'],
    };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang], X = TEXT[lang];
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + NR.fill(X.say, { rate: v.num, pct: v.pct, word: v.word, day: v.bestDay, age: v.age.text });
  };

  NR.register({
    id: 'week-large', no: 'N03', name: 'week-large', from: 'از روی ویجت ۰۳ · تحلیل درآمد', size: 'large',
    names: { fa: 'این هفته در برابر هفته‌ی پیش · بزرگ', en: 'This week vs last week · large' },
    desc: 'میانگین بازار این هفته، تغییرش نسبت به هفته‌ی پیش و نمودار هر روز کاری. کارت شیشه‌ای تیره با نور بنفش گوشه‌ها، عدد بزرگ و نازک، حباب تغییر، نمودار سطحی با خط‌چین «مقایسه» و نشانگر حلقه‌دار از ویجت ۰۳ مونده. «This Month» شده «این هفته»، مقایسه‌ی ماه شده هفته‌ی پیش (خط‌چین؛ با دکمه‌ی ⋯ خاموش می‌شه) و «Apr 2025» شده جهت. این همون ویجتیه که یکشنبه‌ها خلاصه‌ی هفته جای خالی رو پر می‌کنه.',
    hints: [
      ['M4 12h4M10 12h4M16 12h4', '<b>⋯</b> خط‌چین هفته‌ی پیش رو روشن و خاموش می‌کنه (مثل «مقایسه با ماه قبل» نمونه).'],
      ['M7 7h10M7 12h10M7 17h6', '<b>«ارسال ⌄»</b> جهت رو عوض می‌کنه؛ عدد می‌غلته و نمودار عوض می‌شه (App Intent).'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> ویجت اپ رو روی «نمودار بازار» با بازه‌ی هفته باز می‌کنه؛ آدرس تو یه پیام کوتاه می‌یاد.'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> کارت مثل شات نمونه کج وایمیسه و با ماوس صاف می‌شه، نور از روی خط رد می‌شه.'],
    ],
    init: () => ({ dir: 'send', compare: true }),

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U, base = Math.min(G.base, H - 66), top = G.top;
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink n3-card" role="group">
        <div class="n3-lights" aria-hidden="true"><i class="l1"></i><i class="l2"></i><i class="l3"></i></div>
        <i class="n3-gloss js-gloss" aria-hidden="true"></i>
        <svg class="n3-svg" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="n3a${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ar);stop-opacity:var(--ao,.9)"/><stop offset=".42" style="stop-color:var(--ar2,var(--ar));stop-opacity:calc(var(--ao,.9) * .8)"/><stop offset="1" style="stop-color:var(--ar3,var(--ar));stop-opacity:.1"/></linearGradient>
            <clipPath id="n3c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath>
            <filter id="n3b${id}" x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="3.2"/></filter>
          </defs>
          <g class="n3-grid js-grid"></g>
          <g class="n3-axis js-ylab"></g>
          <g class="n3-axis n3-xax js-xlab"></g>
          <g clip-path="url(#n3c${id})">
            <path class="n3-area js-area" style="fill:url(#n3a${id})" d=""/>
            <path class="n3-glowline js-glow" d="" filter="url(#n3b${id})"/>
            <path class="n3-ghost js-ghost" d=""/>
            <path class="n3-line js-line" d=""/>
            <path class="n3-comet js-comet" d="" pathLength="1000"/>
          </g>
          <g class="js-end"><circle class="n3-halo js-halo" r="8"/><circle class="n3-ring" r="6.4"/><circle class="n3-core" r="3.2"/></g>
        </svg>

        <div class="n3-head">
          <h3 class="n3-title js-title"></h3>
          <p class="n3-sub js-sub"></p>
        </div>
        <div class="n3-btns">
          <button type="button" class="n3-dir js-dir" aria-label="${X.dirLabel}"><span class="js-dirlabel"></span>${NR.chevron()}</button>
          <button type="button" class="n3-more js-more" aria-pressed="true" aria-label="${X.cmp}"><i></i><i></i><i></i></button>
        </div>
        <a class="n3-main" href="#">
          <div class="n3-num nr-dimmable is-big"><span class="js-num"></span></div>
          <p class="n3-unit js-unit"></p>
          <div class="n3-badge nr-dimmable js-badge"><span class="js-bicon"></span><span class="js-bpct"></span></div><span class="n3-vs js-vs"></span>
        </a>
        <div class="n3-foot"><span class="js-best"></span><span class="nr-age js-age"></span></div>
        <span class="nr-banner js-banner n3-banner" hidden></span>

        <div class="n3-empty js-empty" hidden>
          ${NR.ph({ s: 20, t: 24, w: 120, h: 18, r: 7 })}${NR.ph({ s: 20, t: 52, w: 92, h: 11 })}${NR.ph({ s: 20, t: 84, w: 190, h: 44, r: 12 })}${NR.ph({ s: 20, t: 150, w: 150, h: 26, r: 99 })}
          ${NR.ph({ e: 16, t: 20, w: 74, h: 30, r: 99 })}${NR.ph({ e: 96, t: 20, w: 30, h: 30, r: 99 })}
          ${NR.ph({ s: 20, e: 20, t: top, h: base - top + 6, r: 14 })}${NR.ph({ s: 20, b: 18, w: 140, h: 12 })}
          <div class="n3-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;

      const $ = s => host.querySelector(s), card = $('.n3-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = { area: $('.js-area'), glow: $('.js-glow'), ghost: $('.js-ghost'), line: $('.js-line'), comet: $('.js-comet'), reveal: $('.js-reveal'), end: $('.js-end'), grid: $('.js-grid'), ylab: $('.js-ylab'), xlab: $('.js-xlab'),
        title: $('.js-title'), sub: $('.js-sub'), unit: $('.js-unit'), vs: $('.js-vs'), best: $('.js-best'), age: $('.js-age'), banner: $('.js-banner'), badge: $('.js-badge'), bicon: $('.js-bicon'), dir: $('.js-dir'), dirlabel: $('.js-dirlabel'), more: $('.js-more'),
        empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline'), gloss: $('.js-gloss') };
      const rolls = { num: new NR.Roll($('.js-num')), pct: new NR.Roll($('.js-bpct')) };
      const NS = 'http://www.w3.org/2000/svg', svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k])); parent && parent.appendChild(e); return e; };
      let lastNum = null, endXY = [G.x1, base], tweenStop = null, drawn = null;

      function drawChart(v, o) {
        const n = v.days.length, X = i => G.x0 + (G.x1 - G.x0) * (n === 1 ? .5 : i / (n - 1));
        const dom = NR.domain(v.vals, .011, .22), Y = a => top + (base - top) * (1 - (a - dom[0]) / (dom[1] - dom[0]));
        const curve = vals => { const xs = vals.map((_, i) => X(i)), f = NR.monotone(xs, vals.map(Y)), N = 48, px = [], py = []; for (let i = 0; i < N; i++) { const x = xs[0] + (xs[n - 1] - xs[0]) * i / (N - 1); px.push(x); py.push(f(x)); } return { px, py, d: NR.smooth(px, py) }; };
        const th = curve(v.thisV), la = curve(v.lastV);
        const old = drawn; drawn = { th: th.d, la: la.d };
        const set = () => {
          els.line.setAttribute('d', th.d); els.glow.setAttribute('d', th.d); els.comet.setAttribute('d', th.d); els.ghost.setAttribute('d', la.d);
          els.area.setAttribute('d', `${th.d}L${r(th.px[th.px.length - 1])},${r(base)}L${r(th.px[0])},${r(base)}Z`);
        };
        // y labels, grid and the day labels
        els.grid.textContent = ''; els.ylab.textContent = ''; els.xlab.textContent = '';
        NR.ticks(dom[0], dom[1], 3).forEach(t => { const y = Y(t); svgEl('line', { x1: G.x0 - 4, x2: G.x1 + 4, y1: r(y), y2: r(y) }, els.grid); svgEl('text', { x: G.W - 14, y: r(y + 4), 'text-anchor': 'end' }, els.ylab).textContent = NR.int(t, lang); });
        svgEl('line', { class: 'n3-base', x1: G.x0 - 4, x2: G.x1 + 4, y1: r(base), y2: r(base) }, els.grid);
        v.labels.forEach((t, i) => { svgEl('text', { x: r(X(i)), y: r(base + 18), 'text-anchor': 'middle' }, els.xlab).textContent = t; });
        endXY = [th.px[th.px.length - 1], th.py[th.py.length - 1]];
        els.end.setAttribute('transform', `translate(${r(endXY[0])} ${r(endXY[1])})`);
        if (o.animate && old && old.th !== th.d) {
          const g = els.line.parentNode.parentNode; // cross-fade the lines (B)
          const ghost = g.cloneNode(true); ghost.removeAttribute('clip-path'); g.parentNode.insertBefore(ghost, g);
          ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260 / NR.scale(), easing: 'ease-out' }).onfinish = () => ghost.remove();
          set(); g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320 / NR.scale(), easing: 'ease-out' });
        } else set();
      }

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          els.emptyLine.textContent = gal ? X.galleryLine : ''; els.emptyLine.hidden = !gal;
          card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset);
          lastNum = null; drawn = null; rolls.num.text = null; rolls.pct.text = null; return;
        }
        const v = view(vm, lang);
        card.classList.remove('is-up', 'is-down', 'is-flat'); card.classList.add(v.chg > 0 ? 'is-up' : v.chg < 0 ? 'is-down' : 'is-flat'); card.classList.toggle('has-banner', !!vm.banner);
        els.title.textContent = v.title; els.sub.textContent = v.sub; els.unit.textContent = v.unit; els.vs.textContent = X.vs;
        els.dirlabel.textContent = v.dir;
        els.more.setAttribute('aria-pressed', String(!!api.L.compare)); card.classList.toggle('no-compare', !api.L.compare);
        const up = lastNum == null ? 1 : (NR.num(vm.week.this_average) >= lastNum ? 1 : -1); lastNum = NR.num(vm.week.this_average);
        rolls.num.set(v.num, { animate: anim, dir: up });
        els.bicon.innerHTML = NR.dirIcon(v.chg); rolls.pct.set(v.sign + v.pct, { animate: anim, dir: v.chg || 1 });
        els.best.textContent = `${X.best}${lang === 'fa' ? ':' : ':'} ${v.bestDay}${lang === 'fa' ? '،' : ','} ${v.bestVal}`;
        NR.setAge(els.age, v.age);
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner n3-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        drawChart(v, { animate: anim });
        $('.n3-main').setAttribute('href', NR.deeplink('chart', api.L, { range: 7 }));
        card.setAttribute('aria-label', say(vm, v, lang));
        $('.n3-svg').setAttribute('aria-label', `${X.chart}: ${NR.fill(T.say.chart, { range: lang === 'fa' ? 'هفته' : 'week', pct: v.pct, word: v.word, low: NR.int(Math.min(...v.vals), lang), high: NR.int(Math.max(...v.vals), lang) })}`);
      }
      host.addEventListener('click', e => {
        const dir = e.target.closest('.js-dir'), more = e.target.closest('.js-more'), a = e.target.closest('a[href]');
        if (dir) { e.preventDefault(); api.set({ dir: api.L.dir === 'send' ? 'recv' : 'send' }); return; }
        if (more) { e.preventDefault(); api.set({ compare: !api.L.compare }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: the sample's 3D card (it rests turned and faces you under the pointer), light along the line, a halo on the marker ── */
      let fx = false, raf = 0, rx = 0, ry = 0, tx = 0, ty = 0;
      const REST = { x: 4.5, y: -8 };   // the angle the shot keeps
      const loop = () => { rx += (tx - rx) * .1; ry += (ty - ry) * .1; tilt.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`; raf = (Math.abs(tx - rx) + Math.abs(ty - ry) > .02) ? requestAnimationFrame(loop) : 0; };
      const onMove = e => { if (!fx || e.pointerType === 'touch') return; const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1; tx = -ny * 3; ty = nx * 4; els.gloss.style.transform = `translate3d(${(-nx * 14).toFixed(1)}px,0,0)`; if (!raf) raf = requestAnimationFrame(loop); };
      const onLeave = () => { tx = REST.x; ty = REST.y; els.gloss.style.transform = ''; if (!raf) raf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (fx) { tx = REST.x; ty = REST.y; if (!raf) raf = requestAnimationFrame(loop); } else { tilt.style.transform = ''; tx = ty = rx = ry = 0; } }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const v = view(vm, lang);
        rolls.num.text = null; rolls.num.set(v.num.replace(/\d/g, () => (lang === 'fa' ? '۰' : '0')), { animate: false }); setTimeout(() => rolls.num.set(v.num, { animate: true, dir: 1 }), 320 / NR.scale());
        els.reveal.setAttribute('width', 0); NR.tween(1400, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        setTimeout(() => card.classList.remove('is-intro'), 3400 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; [rolls.num, rolls.pct].forEach(x => { if (x.text) x.set(NR.perturb(x.text), { animate: false }); }); if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); },
      };
      function r(n) { return Math.round(n * 100) / 100; }
    },
    qa: (vm, lang) => ({ number: NR.int(vm.week.this_average, lang), age: vm.mktAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang), lang); };
      return [
        { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
          ['کارت شیشه‌ای', `${c('containerBackground')} با ${c('RadialGradient')} بنفش گوشه‌ها روی ${c('LinearGradient')} تیره؛ لبه‌ی نورانی با ${c('strokeBorder')} روی یه ${c('RoundedRectangle')}`, 'بیت‌مپ پس‌زمینه‌ی ثابت (گرادیان‌ها از قبل کشیده)', A],
          ['عدد بزرگ و حباب', `${c('Text')} وزن ۳۰۰ با ${c('.contentTransition(.numericText())')}؛ حباب یه ${c('HStack')} با شکل برداری فلش`, `${c('Text')} و ${c('Image')} (بدون انیمیشن)`, `${A} / ${B}`],
          ['نمودار', `Swift Charts: ${c('AreaMark')} (گرادیان بنفش) + دو ${c('LineMark')} (این هفته پیوسته، هفته‌ی پیش خط‌چین با ${c('StrokeStyle(dash:)')}) + ${c('PointMark')} روی امروز؛ برچسب‌ها ${c('AxisMarks')}`, 'تصویر برداری که اپ می‌کشه', A],
          ['دکمه‌ها', `${c('Button(intent:)')}: جهت و «مقایسه»`, `${c('actionRunCallback')}`, B],
          ['لمس', `${c('Link')} روی عدد و نمودار`, `${c('actionStartActivity')}`, A],
          ['اندازه', 'بزرگ: ۳۶۴ × ۳۸۲ و ۳۳۸ × ۳۵۴', 'حدود ۳۳۶ × ۳۴۰dp (۴ × ۴)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['رقم‌ها می‌غلتن (میانگین، درصد)', B, `iOS: ${c('.contentTransition(.numericText())')}؛ Android: فوری`],
          ['نمودار با زدن جهت محو و جایگزین می‌شه؛ خط‌چین با ⋯ محو می‌شه', B, `${c('.transition(.opacity)')} هنگام App Intent؛ Android: فوری`],
          ['ورود: خط و سطح از چپ کشیده می‌شن، عدد می‌چرخه، حباب می‌پره', C, 'نزدیک‌ترین نسخه: ورود ساده هنگام تازه شدن (ب)'],
          ['کارت مثل شات نمونه کج وایمیسه و زیر ماوس صاف می‌شه، براق‌شدن شیشه', C, 'کارت صاف (الف)'],
          ['نور از روی خط رد می‌شه و دور نشانگر موج می‌خوره', C, 'خط و نشانگر ثابت'],
          ['نور روی «کف» زیر کارت', C, 'فقط اندروید و فقط زیر ویجت ممکنه؛ تو این نسخه نیست'],
        ]) },
        { title: 'دکمه‌ها و لمس', html: NR.tbl(['کنترل', 'iOS', 'Android', 'نتیجه'], [
          ['ارسال ⌄ / دریافت ⌄', c('CycleDirectionIntent'), c('CycleDirectionAction'), 'جهت رو عوض می‌کنه؛ تو ذخیره‌ی همون ویجت می‌مونه؛ اپ باز نمی‌شه'],
          ['⋯', c('ToggleCompareIntent'), c('ToggleCompareAction'), 'خط‌چین هفته‌ی پیش روشن / خاموش'],
          ['لمس ویجت', 'Link', 'actionStartActivity', c('netrate://chart?cur=gbp&type=cash&dir=send&range=7')],
        ]) },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('week.this_average'), 'عدد بزرگ'], [c('week.change_pct'), 'حباب نسبت به هفته‌ی پیش'],
          [c('week.days[].this / last'), 'خط این هفته و خط‌چین هفته‌ی پیش (هر نقطه یه روز کاری؛ محور روز چپ‌به‌راسته)'],
          [c('week.best_day'), 'سطر پایین: بهترین روز و مقدارش'], [c('market.recorded_at'), 'سن'], [c('market.status'), 'برچسب سر ویجت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([
          `${c('week')} برای ${c('direction=recv')} و برای حالت‌های یکشنبه و پیش از نرخ تو نمونه نیست؛ پیش‌نمایش از داده‌ی ارسال می‌سازه. سرور باید بده.`,
          `${c('week.days[].this')} هنوز برای روزهای نیامده‌ی همین هفته (مثلاً دوشنبه صبح) ${c('null')} باشه تا خط تا امروز بره.`,
        ]) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>«Revenue Analytics» شد «این هفته» و منوی «This Month» شد خط «در برابر هفته‌ی پیش»؛</b> ماه نداریم، هفته داریم.',
          '<b>خط‌چین «مقایسه با ماه قبل» (منوی ⋯ نمونه) شد خط‌چین هفته‌ی پیش با همون دکمه‌ی ⋯.</b>',
          '<b>«Apr 2025 ⌄» شد جهت (ارسال / دریافت).</b>',
          '<b>رنگ‌ها:</b> بنفش شیشه و سطح نمودار حال‌وهوای نموداره (تم «طرح نمونه»)؛ جهت با فلش، علامت و رنگ حباب (بنفش روشن بالا، صورتی مرجانی پایین) هم گفته می‌شه. سبز نمونه (برچسب کنار حباب) حذف شد.',
          '<b>برچسب‌های محور:</b> نمونه ۴ برچسب داشت؛ این‌جا ۳ برچسب گرد و روزها (حداقل ۱۱) تا خوانا بمونن. بزرگی عددها برای گوشی بیشتره.',
          '<b>کج بودن دائمی کارت (۳بعدی)</b> فقط نمایشه (ج)؛ روی گوشی کارت صافه.',
        ]) },
      ];
    },
  });
})();
