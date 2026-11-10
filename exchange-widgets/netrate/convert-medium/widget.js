/* ==========================================================================
   N14 · convert-medium  ("Converter", medium)  — built from sample 08 (Live Earnings)
   Same form as the sample: a charcoal card, a grey label with a small chip, a big bold figure whose tail is muted, a full-width line with a soft area under it,
   and a row with a dashed slider and a dot between a low and a high. Here the figure is what an amount of pounds becomes at the first office
   (the last three digits muted, as the sample mutes its decimals), the chip steps through the amounts, the line is that amount's result over the last
   week and the slider is where today's rate sits between the month's low and high. No "live" ticking: we have one rate a day, so nothing moves on its own.
   Reads one answer object (NR_DATA shape): `convert.amounts[]`, `series["1w"]`, `series["1m"].stats`, `market`. Send only.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { label: '{amount} پوند نزد {office}:', chip: '{amount} پوند', chipA: 'مبلغ {amount} پوند؛ برای عوض کردن بزن', pos: 'جای نرخ امروز در ماه:', unit: 'تومان', gallery: 'مبدل', galleryLine: 'مبلغ پوند، نتیجه، خط هفته و جای نرخ در ماه', chart: 'نتیجه‌ی این مبلغ در هفته‌ی اخیر', say: 'اگر {amount} پوند بفرستی، نزد {office}، {result} تومان می‌رسد، {pct} {word} نسبت به روز کاری قبل، نرخ امروز در {pos} از بازه‌ی ماه، {age}' },
    en: { label: '{amount} pounds at {office}:', chip: '{amount} pounds', chipA: 'Amount {amount} pounds; tap to change', pos: "Today's rate in the month:", unit: 'toman', gallery: 'Converter', galleryLine: 'An amount in pounds, the result, the week line and the rate within the month', chart: 'The result for this amount over the last week', say: 'If you send {amount} pounds, at {office} you receive {result} toman, {word} {pct} against the last working day, today\'s rate at {pos} of the month range, {age}' },
  };
  const G = { W: 364, top: 92, base: 120 };
  let uid = 0;

  function view(vm, lang, k) {
    const T = NR.text[lang], C = NR.data.convert, a = C.amounts[k], off = a.offices[0], pts = vm.series['1w'].points, st = vm.series['1m'].stats;
    const res = NR.num(off.result), amt = a.amount, bestLast = NR.num(pts[pts.length - 1].best), scale = res / (amt * bestLast);
    const vals = pts.map(p => amt * NR.num(p.best) * scale);     // the same amount at the best rate of each day, ending on the figure
    const lo = NR.num(st.low), hi = NR.num(st.high), cur = NR.num(vm.market.average), pos = Math.min(1, Math.max(0, hi > lo ? (cur - lo) / (hi - lo) : .5));
    const chg = NR.sign(vm.market.average_change_pct), digits = NR.int(off.result, lang), cut = digits.lastIndexOf(lang === 'fa' ? '٬' : ',');
    return { k, n: C.amounts.length, amount: NR.int(amt, lang), office: NR.office(off.exchange.id, lang, off.exchange.name).name, link: 'office/' + off.exchange.id, head: cut > 0 ? digits.slice(0, cut) : digits, tail: cut > 0 ? digits.slice(cut) : '', result: digits,
      vals, pos, pct: NR.digits(Math.round(pos * 100), lang) + (lang === 'fa' ? '٪' : '%'), lo: NR.int(lo, lang), hi: NR.int(hi, lang), age: vm.ageOf(off.recorded_at), chgPct: NR.pct(vm.market.average_change_pct, lang, { noSign: true }), chg, word: NR.dirWord(chg, lang),
      amounts: C.amounts.map(x => NR.int(x.amount, lang)) };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang], sep = lang === 'fa' ? '، ' : ', ';
    return (vm.banner ? T.state[vm.banner] + sep : '') + NR.fill(TEXT[lang].say, { amount: v.amount, office: v.office, result: v.result, pct: v.chgPct, word: v.word, pos: v.pct, age: v.age.text });
  };

  NR.register({
    id: 'convert-medium', no: 'N14', name: 'convert-medium', from: 'از روی ویجت ۰۸ · درآمد زنده', size: 'medium',
    names: { fa: 'مبدل · متوسط', en: 'Converter · medium' },
    desc: 'اگر الان مثلاً ۱٬۰۰۰ پوند بفرستی نزد اولین ردیف چند تومان می‌رسه، با نمودار این مبلغ تو هفته‌ی اخیر و جای نرخ امروز بین کف و سقف ماه. کارت زغالی، برچسب خاکستری با چیپ، عدد درشتِ دم‌خاموش (سه رقم آخر کم‌رنگ مثل اعشار نمونه)، خط تمام‌عرض با سطح زیرش و اسلایدر نقطه‌چین با نقطه از «Live Earnings» ویجت ۰۸ مونده. «زنده» نیست: ما روزی یه نرخ داریم و هیچ عددی خودش حرکت نمی‌کنه. چیپ مبلغ رو می‌چرخونه.',
    hints: [
      ['M7 10l5 5 5-5', '<b>چیپ «۱٬۰۰۰ پوند ⌄»</b> مبلغ رو ۵۰۰ ← ۱٬۰۰۰ ← ۲٬۰۰۰ ← ۵٬۰۰۰ می‌چرخونه؛ عدد می‌غلته و خط عوض می‌شه (App Intent).'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو روی نتیجه‌ی همون صرافی با همین مبلغ باز می‌کنه.'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> خط کشیده می‌شه، نقطه‌ی اسلایدر می‌لغزه، کارت خم می‌شه، عدد با شمارنده وارد می‌شه.'],
    ],
    init: () => ({ dir: 'send', amt: 1 }),

    mount(host, api) {
      const id = ++uid, lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      const size = api.size(), U = size[0] / G.W, H = size[1] / U;
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink n14-card" role="group">
        <a class="n14-main" href="#">
          <p class="n14-lab js-lab"></p>
          <div class="n14-numrow"><div class="n14-num nr-dimmable is-big"><span class="js-num"></span></div><span class="n14-unit js-unit"></span></div>
          <p class="n14-age"><span class="nr-age js-age"></span></p>
          <span class="nr-banner js-banner n14-banner" hidden></span>
        </a>
        <button type="button" class="n14-chip js-chip"><span class="n14-chip-in"><b class="js-chiptext"></b>${NR.chevron()}</span></button>
        <svg class="n14-svg" viewBox="0 0 ${G.W} ${r(H)}" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="n14a${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--dirc);stop-opacity:.34"/><stop offset="1" style="stop-color:var(--dirc);stop-opacity:0"/></linearGradient>
            <clipPath id="n14c${id}"><rect class="js-reveal" x="0" y="0" width="${G.W}" height="${r(H)}"/></clipPath>
          </defs>
          <g clip-path="url(#n14c${id})"><path class="n14-area js-area" style="fill:url(#n14a${id})" d=""/><path class="n14-line js-line" d=""/></g>
          <line class="n14-track" x1="18" x2="346" y1="${r(H - 33)}" y2="${r(H - 33)}"/>
          <g class="n14-thumb js-thumb"><circle class="n14-thumb-halo" r="8"/><circle class="n14-thumb-dot" r="5"/></g>
        </svg>
        <p class="n14-slab"><span class="js-slabel"></span><b class="js-spos"></b></p>
        <p class="n14-minmax"><span class="js-lo"></span><span class="js-hi"></span></p>
        <div class="n14-empty js-empty" hidden>
          ${NR.ph({ s: 18, t: 14, w: 120, h: 13, r: 6 })}${NR.ph({ e: 18, t: 10, w: 86, h: 28, r: 14 })}${NR.ph({ s: 18, t: 36, w: 230, h: 42, r: 12 })}
          ${NR.ph({ s: 0, e: 0, t: 86, h: 34, r: 0 })}${NR.ph({ s: 18, t: 126, w: 120, h: 11, r: 5 })}${NR.ph({ s: 18, e: 18, t: 146, h: 4, r: 2 })}
          <div class="n14-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
        </div>
      </div></div>`;
      const $ = s => host.querySelector(s), card = $('.n14-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = { lab: $('.js-lab'), unit: $('.js-unit'), age: $('.js-age'), banner: $('.js-banner'), chip: $('.js-chip'), chiptext: $('.js-chiptext'), area: $('.js-area'), line: $('.js-line'), reveal: $('.js-reveal'), thumb: $('.js-thumb'), slabel: $('.js-slabel'), spos: $('.js-spos'), lo: $('.js-lo'), hi: $('.js-hi'),
        empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline') };
      const rolls = { head: new NR.Roll($('.js-num')) };
      let lastNum = null, lastAmt = null, X0 = 18, X1 = 346, thumbX = 18;

      function drawLine(v, animate) {
        const n = v.vals.length, dom = NR.domain(v.vals, .011, .2), top = G.top, base = Math.round(H - 52), Y = a => top + (base - top) * (1 - (a - dom[0]) / (dom[1] - dom[0]));
        const xs = v.vals.map((_, i) => i / (n - 1) * G.W), ys = v.vals.map(Y), f = NR.monotone(xs, ys), N = 48, px = [], py = [];
        for (let i = 0; i < N; i++) { const x = G.W * i / (N - 1); px.push(x); py.push(f(x)); }
        const d = NR.smooth(px, py); els.line.setAttribute('d', d); els.area.setAttribute('d', `${d}L${G.W},${base + 8}L0,${base + 8}Z`);
        if (animate) { els.line.animate([{ opacity: .2 }, { opacity: 1 }], { duration: 420 / NR.scale(), easing: 'ease-out' }); els.area.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 520 / NR.scale(), easing: 'ease-out' }); }
      }
      function moveThumb(pos, animate) {
        const x = X0 + (X1 - X0) * (lang === 'fa' ? 1 - pos : pos);   // the low is at the start of the line, so in Persian at the right
        const y = H - 33; els.thumb.style.transition = animate ? 'transform .6s cubic-bezier(.3,1.3,.5,1)' : 'none'; els.thumb.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`; thumbX = x;
      }
      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          els.emptyLine.textContent = gal ? X.galleryLine : ''; els.emptyLine.hidden = !gal;
          card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset); lastNum = null; lastAmt = null; rolls.head.text = null; return;
        }
        const k = api.L.amt, v = view(vm, lang, k);
        card.classList.remove('is-up', 'is-down', 'is-flat'); card.classList.add(v.chg > 0 ? 'is-up' : v.chg < 0 ? 'is-down' : 'is-flat'); card.classList.toggle('has-banner', !!vm.banner);
        els.lab.textContent = NR.fill(X.label, { amount: v.amount, office: v.office }); els.unit.textContent = X.unit;
        els.chiptext.textContent = NR.fill(X.chip, { amount: v.amount }); els.chip.setAttribute('aria-label', NR.fill(X.chipA, { amount: v.amount }));
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner n14-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        const val = NR.num(NR.data.convert.amounts[k].offices[0].result), up = lastNum == null || val >= lastNum ? 1 : -1; lastNum = val;
        rolls.head.set(v.result, { animate: anim, dir: up }); card.classList.toggle('has-tail', !!v.tail); $('.js-num').dataset.tail = String(v.tail.length);
        NR.setAge(els.age, v.age); els.slabel.textContent = X.pos; els.spos.textContent = v.pct; els.lo.textContent = lang === 'fa' ? v.hi : v.lo; els.hi.textContent = lang === 'fa' ? v.lo : v.hi;
        drawLine(v, anim && lastAmt !== null && lastAmt !== k); moveThumb(v.pos, anim); lastAmt = k;
        $('.n14-main').setAttribute('href', NR.deeplink(v.link, api.L, { amount: NR.data.convert.amounts[k].amount }));
        card.setAttribute('aria-label', say(vm, v, lang));
        $('.n14-svg').setAttribute('aria-label', X.chart);
      }
      host.addEventListener('click', e => {
        const chip = e.target.closest('.js-chip'), a = e.target.closest('a[href]');
        if (chip) { e.preventDefault(); api.set({ amt: (api.L.amt + 1) % NR.data.convert.amounts.length }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: the card leans toward the pointer; on entry the line draws, the dot slides in and the figure counts up ── */
      let fx = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
      const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; tilt.style.transform = `perspective(1100px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`; raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .01) ? requestAnimationFrame(loop) : 0; };
      const onMove = e => { if (!fx || e.pointerType === 'touch') return; const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1; tx = nx * 3.5; ty = -ny * 4.5; if (!raf) raf = requestAnimationFrame(loop); };
      const onLeave = () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) tilt.style.transform = ''; }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const v = view(vm, lang, api.L.amt);
        rolls.head.text = null; rolls.head.set(v.result.replace(/\d/g, () => (lang === 'fa' ? '۰' : '0')), { animate: false }); setTimeout(() => rolls.head.set(v.result, { animate: true, dir: 1 }), 320 / NR.scale());
        els.reveal.setAttribute('width', 0); NR.tween(1200, e => els.reveal.setAttribute('width', r(G.W * e)), NR.ease.inOut);
        moveThumb(lang === 'fa' ? 1 : 0, false); setTimeout(() => moveThumb(v.pos, true), 700 / NR.scale());
        setTimeout(() => card.classList.remove('is-intro'), 2400 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; rolls.head.text && rolls.head.set(NR.perturb(rolls.head.text), { animate: false }); if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); },
      };
      function r(n) { return Math.round(n * 100) / 100; }
    },
    qa: (vm, lang) => { const v = view(vm, lang, 1); return { number: v.result, age: v.age.text }; },
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang, 1), lang); };
      return [
        { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
          ['کارت', `${c('containerBackground')} زغالی؛ برچسب و عدد ${c('Text')} (سه رقم آخر عدد با ${c('.opacity(.4)')})`, c('Text'), A],
          ['عدد', `${c('.contentTransition(.numericText())')}`, 'فوری', B],
          ['خط تمام‌عرض', `Swift Charts: ${c('LineMark')} + ${c('AreaMark')} بدون محور و تمام‌عرض (${c('.chartXAxis(.hidden)')})`, 'تصویر برداری که اپ می‌کشه', A],
          ['اسلایدر نقطه‌چین', `${c('Gauge')} خود سیستم (${c('.gaugeStyle(.linearCapacity)')}) یا ${c('Canvas')} با خط نقطه‌چین و دایره`, 'تصویر برداری', A],
          ['چیپ مبلغ', `${c('Button(intent: NextAmountIntent())')}، هدف لمس ۵۰ × ۵۰`, c('actionRunCallback'), B],
          ['لمس', `${c('Link')}: ${c('netrate://office/pars?cur=gbp&type=cash&dir=send&amount=1000')}`, c('actionStartActivity'), A],
          ['اندازه', 'متوسط: ۳۶۴ × ۱۷۰ و ۳۳۸ × ۱۵۸', 'حدود ۳۳۶ × ۱۶۰dp (۴ × ۲)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['با چیپ: عدد می‌غلته، خط محو و جایگزین می‌شه، نقطه‌ی اسلایدر می‌لغزه', B, `iOS: ${c('.contentTransition')} و ${c('.transition(.opacity)')}؛ Android: فوری`],
          ['ورود: خط کشیده می‌شه، نقطه می‌لغزه، شمارنده', C, 'ورود ساده هنگام تازه شدن (ب)'],
          ['کارت به سمت اشاره‌گر خم می‌شه', C, 'کارت صاف'],
        ]) + NR.p('«زنده» (عددی که خودش هر ثانیه بالا می‌ره، مثل نمونه) نداریم و نمی‌سازیمش؛ نرخ‌ها روزی یه‌بارن.') },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('convert.amounts[].amount'), 'چیپ و برچسب'], [c('…offices[0].result / exchange / recorded_at'), 'عدد، نام و سن'], [c('series["1w"].points[].best'), 'شکل خط (ضرب در مبلغ، تا آخرش بشه همون عدد)'], [c('series["1m"].stats.low / high'), 'دو سر اسلایدر'], [c('market.average'), 'جای نقطه'], [c('market.average_change_pct'), 'رنگ خط و سطح'], [c('market.status'), 'چیپ وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([
          `${c('convert')} فقط برای ${c('direction=send')} و ${c('asset=gbp')} هست؛ برای دریافت و ارزهای دیگه داده نداریم.`,
          `خط هفته‌ی مبدل از ${c('series.best')} در مبلغ ساخته می‌شه (و برای یکی‌شدن با عدد، یه ضریب کوچیک می‌گیره چون ${c('convert')} و ${c('best')} تو فایل نمونه یه کم فرق دارن). اگه سرور ${c('convert.history')} (نتیجه‌ی همین مبلغ تو شش روز اخیر) بده، حدس لازم نیست.`,
        ]) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>«Your Rewards: $12.315 / 24h»</b> شد «۱٬۰۰۰ پوند نزد پارس: ۹۲٬۸۵۰٬۰۰۰ / چیپ مبلغ». سه رقم آخر کم‌رنگه، مثل اعشار نمونه.',
          '<b>خط سبز نمونه شد خط به رنگ جهت</b> (آبی بالا، مرجانی پایین)، هیچ سبزی نیست.',
          '<b>«APR: 6.42% با اسلایدر بین ۲٫۶۳٪ و ۱۵٫۳۲٪»</b> شد «جای نرخ امروز در ماه: ٪ با اسلایدر بین کف و سقف ماه»؛ نقطه‌ی زرد نمونه سفیده.',
          '<b>دو سطر «Total Rewards / Total Amount» نیستن:</b> تو ۱۷۰ نقطه جا نیست و داده‌اش (پاداش) هم نداریم.',
          '<b>«زنده» نیست:</b> عدد خودش بالا نمی‌ره (نرخ‌ها روزانه‌ان).',
        ]) },
      ];
    },
  });
})();
