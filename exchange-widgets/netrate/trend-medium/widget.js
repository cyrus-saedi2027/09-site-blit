/* ==========================================================================
   N04 · trend-medium  ("Market trend", medium)  — built from sample 04 (Daily health: the Heart Rate card)
   Same form as the sample: a warm-charcoal card, a title with a small line under it, a
   dot-matrix number with a round pill beside it, vertical range bars (one per day: the
   day's lowest to highest rate) with a dotted baseline and three time labels.
   The heart icon pill that switched bpm / HRV becomes the pill that switches the number between the
   market average and the day's most (send) / least (receive) toman. Dragging over the bars (C) shows
   that day's number, as the sample's scrub does.
   Reads one answer object (NR_DATA shape): `series["1m"]`, `market`, `best[0]`.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR || !NR.Dots) return;

  const TEXT = {
    fa: { vs: 'از روز کاری قبل', pill: 'نمایش {name}؛ برای عوض کردن بزن', start: '۱ ماه پیش', mid: '۲ هفته پیش', today: 'امروز', chart: 'نمودار یک ماه: بازه‌ی هر روز از کف تا سقف', gallery: 'روند بازار', galleryLine: 'عدد نقطه‌ای و بازه‌ی هر روز در یک ماه', say: '{title}، {rate} تومان برای هر پوند، {pct} {word} نسبت به روز کاری قبل، {age}' },
    en: { vs: 'vs last working day', pill: 'Showing {name}; tap to change', start: '1 month ago', mid: '2 weeks ago', today: 'Today', chart: 'One month: each day from its low to its high', gallery: 'Market trend', galleryLine: 'A dot-matrix number and each day\'s range for a month', say: '{title}, {rate} toman per pound, {word} {pct} against the last working day, {age}' },
  };
  const G = { W: 364, x0: 62, x1: 346, top: 92 };
  const P = 4.4, R = 1.85;   // dot pitch and radius of the number (design units)
  let uid = 0;

  const weekdayOf = date => { const d = new Date(date + 'T12:00:00Z').getUTCDay(); return d === 0 ? 7 : d; };

  function view(vm, lang, metric, pick) {
    const T = NR.text[lang], X = TEXT[lang], pts = vm.series['1m'].points, n = pts.length;
    const best = metric === 'best', i = pick == null ? n - 1 : pick;
    const value = pick == null ? (best ? vm.top.rate : vm.market.average) : pts[pick][best ? 'best' : 'average'];
    const cpct = best ? vm.top.change_pct : vm.market.average_change_pct, chg = NR.sign(cpct);
    const ts = pts.map(p => Date.parse(p.date + 'T12:00:00Z')), last = ts[n - 1];
    const daysAgo = Math.round((last - ts[i]) / 86400000);
    return {
      n, pts, title: best ? T.title[vm.dir] : T.avg, unit: T.unit, num: NR.int(value, lang),
      chg, pct: NR.pct(cpct, lang, { noSign: true }), sign: chg > 0 ? '+' : chg < 0 ? '−' : '', word: NR.dirWord(chg, lang),
      age: best ? vm.topAge : vm.mktAge,
      lows: pts.map(p => NR.num(p.low)), highs: pts.map(p => NR.num(p.high)), ts,
      dayName: NR.weekday(weekdayOf(pts[i].date), lang), dayAgo: daysAgo ? NR.fill(T.age.days, { n: NR.digits(daysAgo, lang) }) : X.today,
      pillName: best ? T.title[vm.dir] : T.avg,
    };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang], X = TEXT[lang];
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + NR.fill(X.say, { title: v.title, rate: v.num, pct: v.pct, word: v.word, age: v.age.text });
  };

  NR.register({
    id: 'trend-medium', no: 'N04', name: 'trend-medium', from: 'از روی ویجت ۰۴ · سلامت روزانه (کارت ضربان قلب)', size: 'medium',
    names: { fa: 'روند بازار · متوسط', en: 'Market trend · medium' },
    desc: 'میانگین بازار امروز با عدد نقطه‌ای، و برای هر روزِ یک ماه یه میله از کف تا سقفِ همون روز. کارت زغالی گرم، عدد نقطه‌ای، قرص گرد کنار عدد، میله‌های عمودی با برچسب‌های محور و خط نقطه‌چین پایین از کارت «Heart Rate» ویجت ۰۴ مونده. قرصِ «ضربان ⇄ HRV» شده قرصِ «میانگین ⇄ بیشترین (ارسال) / کمترین (دریافت) تومان». ارقام فارسی نقطه‌ای رو خودم کشیدم چون نمونه فقط لاتین داشت.',
    hints: [
      ['M7 8h10M7 12h10M7 16h10', '<b>قرص کنار عدد</b> عدد رو بین میانگین بازار و بیشترین (یا کمترین) تومان عوض می‌کنه؛ نقطه‌ها موج برمی‌دارن (App Intent).'],
      ['M3 15l4-5 4 3 5-7 5 4', '<b>روی میله‌ها بکش</b> (فقط نمایش): عدد همون روز رو نشون می‌ده و بقیه‌ی میله‌ها کم‌رنگ می‌شن.'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> ویجت اپ رو روی نمودار بازار با بازه‌ی یک ماه باز می‌کنه.'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> نقطه‌های زیر ماوس درشت می‌شن، کارت به سمتت خم می‌شه، ورود با شمارنده‌ی تابلویی.'],
    ],
    init: () => ({ dir: 'send', metric: 'avg' }),
    config: { dir: true },

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U, base = Math.round(H - 30), labY = Math.round(H - 7);
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink n4-card" role="group">
        <i class="n4-glare js-glare" aria-hidden="true"></i>
        <div class="n4-head">
          <h3 class="n4-title js-title"></h3>
          <p class="n4-chg js-chg"><span class="js-chgicon"></span><span class="js-chgpct"></span><span class="js-chgword"></span></p>
          <p class="n4-vs js-vs"></p>
          <span class="nr-banner js-banner n4-banner" hidden></span>
        </div>
        <a class="n4-main" href="#">
          <svg class="n4-num nr-dimmable is-big js-num" aria-hidden="true" focusable="false"></svg>
          <p class="n4-unit js-unit"></p>
          <p class="n4-age"><span class="nr-age js-age"></span></p>
        </a>
        <button type="button" class="n4-pill js-pill" aria-pressed="false"><span class="n4-pill-in"><svg viewBox="0 0 16 16" aria-hidden="true"><rect class="b1" x="2" y="2.6" width="12" height="2.2" rx="1.1"/><rect class="b2" x="2" y="6.9" width="12" height="2.2" rx="1.1"/><rect class="b3" x="2" y="11.2" width="12" height="2.2" rx="1.1"/></svg></span></button>
        <svg class="n4-svg" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false">
          <defs><clipPath id="n4c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath></defs>
          <g class="n4-axis js-ylab"></g>
          <line class="n4-dots js-dots" x1="${G.x0}" x2="${G.x1 + 4}" y1="${base + 8}" y2="${base + 8}"/>
          <g class="n4-axis n4-xax js-xlab">
            <text x="${G.x0 - 2}" y="${labY}" text-anchor="start">${X.start}</text><text x="${r((G.x0 + G.x1) / 2)}" y="${labY}" text-anchor="middle">${X.mid}</text><text x="${G.x1 + 2}" y="${labY}" text-anchor="end">${X.today}</text>
          </g>
          <g clip-path="url(#n4c${id})"><g class="n4-bars js-bars"></g></g>
          <line class="n4-pick js-pickline" x1="0" x2="0" y1="${G.top - 4}" y2="${base + 4}" opacity="0"/>
        </svg>
        <div class="n4-scrub js-scrub" aria-hidden="true"></div>

        <div class="n4-empty js-empty" hidden>
          ${NR.ph({ s: 18, t: 14, w: 104, h: 17, r: 7 })}${NR.ph({ s: 18, t: 42, w: 70, h: 11 })}${NR.ph({ s: 18, t: 60, w: 84, h: 10 })}
          ${NR.ph({ e: 52, t: 16, w: 148, h: 30, r: 6 })}${NR.ph({ e: 14, t: 14, w: 30, h: 46, r: 15 })}${NR.ph({ e: 52, t: 50, w: 90, h: 11 })}
          ${NR.ph({ s: 18, e: 18, t: G.top, h: base - G.top + 12, r: 12 })}
          <div class="n4-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;

      const $ = s => host.querySelector(s), card = $('.n4-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = { title: $('.js-title'), chg: $('.js-chg'), chgIcon: $('.js-chgicon'), chgPct: $('.js-chgpct'), chgWord: $('.js-chgword'), vs: $('.js-vs'), banner: $('.js-banner'), unit: $('.js-unit'), age: $('.js-age'), pill: $('.js-pill'),
        bars: $('.js-bars'), ylab: $('.js-ylab'), reveal: $('.js-reveal'), pick: $('.js-pickline'), scrub: $('.js-scrub'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline'), glare: $('.js-glare'), num: $('.js-num') };
      const dots = new NR.Dots(els.num, { pitch: P, r: R });
      const NS = 'http://www.w3.org/2000/svg', svgEl = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k])); parent && parent.appendChild(e); return e; };
      let X0 = [], barEls = [], lastV = null, picked = null, drawnN = 0;

      function sizeNum(text) {
        const [w, h] = dots.fit('0'.repeat(0) + text); els.num.style.width = `calc(${r(w)} * var(--u))`; els.num.style.height = `calc(${r(h)} * var(--u))`;
      }
      function drawBars(v, o) {
        const dom = NR.domain([...v.lows, ...v.highs], .02, .12), Y = a => G.top + (base - G.top) * (1 - (a - dom[0]) / (dom[1] - dom[0]));
        const n = v.n, pitch = (G.x1 - G.x0) / (n - 1);
        X0 = v.pts.map((_, i) => G.x0 + pitch * i);
        els.bars.textContent = ''; barEls = [];
        v.pts.forEach((p, i) => {
          const y0 = Y(v.highs[i]), y1 = Y(v.lows[i]), last = i === n - 1;
          const ln = svgEl('line', { class: 'n4-bar' + (last ? ' is-last' : ''), x1: r(X0[i]), x2: r(X0[i]), y1: r(y0), y2: r(Math.max(y1, y0 + .01)) }, els.bars); barEls.push(ln);
        });
        els.ylab.textContent = '';
        NR.ticks(dom[0], dom[1], 3).forEach(t => { const y = Y(t); if (y > G.top - 2 && y < base + 2) svgEl('text', { x: 18, y: r(y + 4), 'text-anchor': 'start' }, els.ylab).textContent = NR.int(t, lang); });
        if (o.animate && drawnN === n) els.bars.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 300 / NR.scale(), easing: 'ease-out' });
        drawnN = n;
      }
      function setAge(a, text) { NR.setAge(els.age, a); if (text != null) els.age.innerHTML = `<span>${text}</span>`; }

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          els.emptyLine.textContent = gal ? X.galleryLine : ''; els.emptyLine.hidden = !gal;
          card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset);
          dots.text = null; dots.built = 0; lastV = null; return;
        }
        const metric = api.L.metric, v = view(vm, lang, metric, picked);
        card.classList.remove('is-up', 'is-down', 'is-flat'); card.classList.add(v.chg > 0 ? 'is-up' : v.chg < 0 ? 'is-down' : 'is-flat'); card.classList.toggle('has-banner', !!vm.banner);
        card.dataset.metric = metric;
        els.title.textContent = v.title; els.unit.textContent = v.unit; els.vs.textContent = X.vs;
        els.chgIcon.innerHTML = NR.dirIcon(v.chg); els.chgPct.innerHTML = NR.n(v.sign + v.pct); els.chgWord.textContent = v.word;
        if (picked != null) { els.chg.classList.add('is-pick'); els.chgIcon.innerHTML = ''; els.chgPct.textContent = v.dayName; els.chgWord.textContent = ''; els.vs.textContent = ''; } else els.chg.classList.remove('is-pick');
        if (picked != null) setAge({ tier: 'fresh', text: v.dayAgo }, v.dayAgo); else setAge(v.age);
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner n4-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        els.pill.setAttribute('aria-pressed', String(metric === 'best'));
        els.pill.setAttribute('aria-label', NR.fill(X.pill, { name: v.pillName }));
        els.pill.dataset.hl = metric === 'avg' ? 'mid' : vm.dir === 'send' ? 'top' : 'bot';
        sizeNum(v.num);
        dots.set(v.num, { animate: anim || picked != null });
        drawBars(v, { animate: anim });
        $('.n4-main').setAttribute('href', NR.deeplink('chart', api.L, { range: 30 }));
        card.setAttribute('aria-label', say(vm, view(vm, lang, metric, null), lang));
        $('.n4-svg').setAttribute('aria-label', X.chart);
      }

      host.addEventListener('click', e => {
        const pill = e.target.closest('.js-pill'), a = e.target.closest('a[href]');
        if (pill) { e.preventDefault(); api.set({ metric: api.L.metric === 'avg' ? 'best' : 'avg' }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: display-only (the sample's life): drag over the bars to read a day, a lens under the pointer, the card leans, scoreboard count-up ── */
      let fx = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
      const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; tilt.style.transform = `perspective(1100px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`; raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .01) ? requestAnimationFrame(loop) : 0; };
      const rel = e => { const b = root.getBoundingClientRect(); return [(e.clientX - b.left) / b.width * G.W, (e.clientY - b.top) / b.height * H, b]; };
      const pickAt = e => {
        const [x, y] = rel(e); if (y < G.top - 8 || y > base + 14) return pickAt.clear();
        let bi = 0, bd = 1e9; X0.forEach((xx, i) => { const d = Math.abs(xx - x); if (d < bd) { bd = d; bi = i; } });
        if (bi !== picked) { picked = bi; render({}); els.pick.setAttribute('x1', r(X0[bi])); els.pick.setAttribute('x2', r(X0[bi])); els.pick.setAttribute('opacity', '.5'); barEls.forEach((b, i) => b.classList.toggle('is-dim', i > bi)); }
      };
      pickAt.clear = () => { if (picked == null) return; picked = null; els.pick.setAttribute('opacity', '0'); barEls.forEach(b => b.classList.remove('is-dim')); render({}); };
      const onMove = e => {
        if (!fx || e.pointerType === 'touch') return;
        const [x, y, b] = rel(e), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1;
        tx = nx * 3.5; ty = -ny * 4.5; els.glare.style.opacity = '1'; els.glare.style.setProperty('--gx', ((e.clientX - b.left) / b.width * 100).toFixed(1) + '%'); els.glare.style.setProperty('--gy', ((e.clientY - b.top) / b.height * 100).toFixed(1) + '%');
        if (!raf) raf = requestAnimationFrame(loop);
        const nb = els.num.getBoundingClientRect();
        if (e.clientX > nb.left - 12 && e.clientX < nb.right + 12 && e.clientY > nb.top - 12 && e.clientY < nb.bottom + 12) { const k = els.num.viewBox.baseVal; dots.lens((e.clientX - nb.left) / nb.width * k.width + k.x, (e.clientY - nb.top) / nb.height * k.height + k.y, 17, 1.5); } else dots.lens(null);
        pickAt(e);
      };
      const onLeave = () => { tx = ty = 0; els.glare.style.opacity = '0'; dots.lens(null); pickAt.clear(); if (!raf) raf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) { tilt.style.transform = ''; els.glare.style.opacity = '0'; dots.lens(null); } }
      let countStop = null;
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const target = NR.num(api.L.metric === 'best' ? vm.top.rate : vm.market.average);
        if (countStop) countStop.stop && countStop.stop();
        countStop = dots.count(target * .62, target, x => NR.int(x, lang), 1300);
        els.reveal.setAttribute('width', 0); NR.tween(1250, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        setTimeout(() => card.classList.remove('is-intro'), 2600 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); dots.destroy(); },
      };
      function r(n) { return Math.round(n * 100) / 100; }
    },
    qa: (vm, lang) => ({ number: NR.int(vm.market.average, lang), age: vm.mktAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang, 'avg', null), lang); };
      return [
        { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
          ['کارت', `${c('containerBackground')} با گرادیان زغالی گرم؛ لبه‌ی بالایی روشن با یه ${c('strokeBorder')} نازک`, 'بیت‌مپ پس‌زمینه‌ی ثابت', A],
          ['عدد نقطه‌ای', `${c('Canvas')} که ${c('۳۵')} نقطه برای هر رقم رو از یه جدول ۵ × ۷ می‌کشه (جدول فارسی و لاتین تو ${c('dots.js')})؛ ${c('accessibilityLabel')} خود عدده`, 'تصویری که اپ با همون جدول می‌کشه', A],
          ['تغییر عدد', `نقطه‌ها با ${c('.transition(.opacity)')} و ${c('.animation')} هنگام تازه شدن عوض می‌شن (موجِ جدول‌به‌جدول فقط نمایشیه)`, 'فوری', B],
          ['میله‌ها', `Swift Charts: ${c('RuleMark(x:, yStart:, yEnd:)')} گرد برای هر روز (کف تا سقف) + ${c('RuleMark')} نقطه‌چین پایین؛ برچسب‌ها ${c('AxisMarks')}`, 'تصویر برداری که اپ می‌کشه', A],
          ['قرص', `${c('Button(intent:)')}، هدف لمس ۵۰ × ۵۴`, c('actionRunCallback'), B],
          ['لمس', `${c('Link')} روی عدد و میله‌ها`, c('actionStartActivity'), A],
          ['اندازه', 'متوسط: ۳۶۴ × ۱۷۰ و ۳۳۸ × ۱۵۸', 'حدود ۳۳۶ × ۱۶۰dp (۴ × ۲)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['با قرص، نقطه‌های عدد موج برمی‌دارن و عنوان عوض می‌شه', B, `iOS: ${c('.transition(.opacity)')} هنگام App Intent؛ Android: فوری`],
          ['شمارنده‌ی تابلویی هنگام ورود، میله‌ها از چپ کشیده می‌شن', C, 'ورود ساده هنگام تازه شدن (ب)'],
          ['روی میله‌ها بکشی: عدد همون روز، بقیه کم‌رنگ، خط باریک روی روز', C, 'گوشی کشیدن روی ویجت نداره؛ فقط لمس و باز شدن اپ'],
          ['نقطه‌های زیر ماوس درشت می‌شن', C, 'ثابت'],
          ['کارت به سمت اشاره‌گر خم می‌شه و نور ملایمی دنبالش می‌آد', C, 'کارت صاف (الف)'],
          ['آخرین میله آروم نفس می‌کشه', C, 'ثابت'],
        ]) },
        { title: 'دکمه‌ها و لمس', html: NR.tbl(['کنترل', 'iOS', 'Android', 'نتیجه'], [
          ['قرص کنار عدد', c('ToggleMetricIntent'), c('ToggleMetricAction'), 'میانگین بازار ⇄ بیشترین (ارسال) / کمترین (دریافت) تومان؛ تو ذخیره‌ی همون ویجت می‌مونه'],
          ['لمس ویجت', 'Link', 'actionStartActivity', c('netrate://chart?cur=gbp&type=cash&dir=send&range=30')],
          ['جهت', 'ویرایش ویجت', 'صفحه‌ی تنظیم', 'ارسال / دریافت'],
        ]) },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('market.average'), 'عدد نقطه‌ای (قرص روی «میانگین»)'], [c('best[0].rate'), 'عدد نقطه‌ای (قرص روی «بیشترین / کمترین تومان»)'],
          [c('market.average_change_pct'), 'تغییر زیر عنوان (قرص روی میانگین)'], [c('best[0].change_pct'), 'تغییر زیر عنوان (قرص روی بیشترین / کمترین)'],
          [c('series["1m"].points[].low / high'), 'میله‌ی هر روز'], [c('series["1m"].points[].average / best'), 'عدد روزِ انتخاب‌شده هنگام کشیدن (ج)'],
          [c('market.recorded_at / best[0].recorded_at'), 'سن'], [c('market.status'), 'برچسب وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([
          `هیچ. ${c('series["1m"]')} با ${c('low')} و ${c('high')} هر روز کافیه؛ بازه‌ی دیگه‌ای لازم نداریم.`,
        ]) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>«Heart Rate / resting» شد «میانگین بازار» و تغییرش.</b> ضربان قلب موضوع نمونه‌ست و اینجا جایی نداره.',
          '<b>قرص «ضربان ⇄ HRV» شد قرص «میانگین ⇄ بیشترین / کمترین تومان».</b> آیکون قلب شد سه خط که خط وسط (میانگین) یا بالا (بیشترین) یا پایین (کمترین) پررنگ می‌شه. فلش نیست تا با جهت تغییر قاطی نشه.',
          '<b>۶۴ میله‌ی ضربان شد میله‌ی هر روز کاری یک ماه</b> (حدود ۲۶ تا)، هر کدوم از کف تا سقف همون روز.',
          '<b>ارقام فارسی نقطه‌ای</b> رو خودم کشیدم (نمونه فقط لاتین داشت)؛ شکلشون از فونت اپ (وزیرمتن) گرفته شده ولی روی جدول ۵ × ۷ ساده‌ان.',
          '<b>رنگ:</b> نمونه فقط سفید روی زغال بود و همین‌طور مونده؛ فقط فلش و علامت تغییر به رنگ جهت (آبی بالا، مرجانی پایین) هست.',
          '<b>عدد پنج‌رقمیه</b> (۹۱٬۷۳۳)، نمونه دو رقمی بود؛ نقطه‌ها ریزتر شدن (فاصله ۴٫۶ به‌جای ۶٫۸).',
          '<b>سنِ عدد</b> زیر واحد نوشته شده (نمونه سن نداشت).',
        ]) },
      ];
    },
  });
})();
