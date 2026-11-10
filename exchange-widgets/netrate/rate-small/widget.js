/* ==========================================================================
   N09 · rate-small  ("Today's rate", small)  — built from sample 05 (Progress Report)
   Same form as the sample: a dark card with a small app mark, a title and a line under it, and one big
   colour panel holding a label, a very large thin figure, a glossy pill with the change, a small
   "compared to" line and a round "+" button. The sample's red/blue colour field becomes the direction's
   field (blue lit when up, coral when down, grey when unchanged): the panel's colour is the only colour
   and it only says which way the rate moved. "+" opens this week's days as capsules (the sample's daily goal capsules).
   Reads one answer object (NR_DATA shape): `best[0]`, `week`. One tap destination: the office shown.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { title: 'نرخ امروز', weekLabel: 'این هفته', basis: 'از روز کاری قبل', open: 'نمایش روزهای این هفته', close: 'برگشت به نرخ امروز', gallery: 'نرخ امروز', galleryLine: 'کوچک', say: '{title}، {rate} تومان برای هر پوند، {office}، {pct} {word} نسبت به روز کاری قبل، {age}', sayWeek: 'میانگین این هفته، {avg} تومان برای هر پوند، {pct} {word} نسبت به هفته‌ی پیش، بهترین روز {day}، {age}', capsule: '{day}، {rate} تومان' },
    en: { title: "Today's rate", weekLabel: 'This week', basis: 'vs last day', open: "Show this week's days", close: "Back to today's rate", gallery: "Today's rate", galleryLine: 'small', say: '{title}, {rate} toman per pound, {office}, {word} {pct} against the last working day, {age}', sayWeek: "This week's average, {avg} toman per pound, {word} {pct} against last week, best day {day}, {age}", capsule: '{day}, {rate} toman' },
  };

  function view(vm, lang) {
    const T = NR.text[lang], X = TEXT[lang], t = vm.top, chg = NR.sign(t.change_pct), W = vm.week;
    const vals = W.days.map(d => NR.num(d.this)), dom = NR.domain(vals, .011, .22);
    const wchg = NR.sign(W.change_pct);
    return {
      label: T.title[vm.dir], num: NR.int(t.rate, lang), office: NR.office(t.exchange.id, lang, t.exchange.name).name, link: 'office/' + t.exchange.id,
      chg, pct: NR.pct(t.change_pct, lang, { noSign: true }), sign: chg > 0 ? '+' : chg < 0 ? '−' : '', word: NR.dirWord(chg, lang), age: vm.topAge, mktAge: vm.mktAge,
      week: { days: W.days, vals, fill: vals.map(v => Math.max(.1, (v - dom[0]) / (dom[1] - dom[0]))), letters: W.days.map(d => [...NR.weekday(d.weekday, lang)][0]), names: W.days.map(d => NR.weekday(d.weekday, lang)),
        avg: NR.int(W.this_average, lang), pct: NR.pct(W.change_pct, lang, { noSign: true }), word: NR.dirWord(wchg, lang), best: NR.weekday(W.best_day.weekday, lang) },
    };
  }
  const say = (vm, v, lang, mode) => {
    const T = NR.text[lang], X = TEXT[lang], sep = lang === 'fa' ? '، ' : ', ';
    const base = mode === 'week' ? NR.fill(X.sayWeek, { avg: v.week.avg, pct: v.week.pct, word: v.week.word, day: v.week.best, age: v.mktAge.text }) : NR.fill(X.say, { title: v.label, rate: v.num, office: v.office, pct: v.pct, word: v.word, age: v.age.text });
    return (vm.banner ? T.state[vm.banner] + sep : '') + base;
  };

  NR.register({
    id: 'rate-small', no: 'N09', name: 'rate-small', from: 'از روی ویجت ۰۵ · گزارش پیشرفت', size: 'small',
    names: { fa: 'نرخ امروز · کوچک', en: "Today's rate · small" },
    desc: 'بیشترین (ارسال) یا کمترین (دریافت) تومان با نام صرافی، تغییر و سن. کارت تیره با نشانک کوچک، عنوان، پنل رنگی بزرگ، عدد درشت و نازک، قرص براق تغییر و دکمه‌ی گرد «+» از «Progress Report» ویجت ۰۵ مونده. رنگ پنل جهت حرکت نرخه (آبی بالا، مرجانی پایین، خاکستری بدون تغییر) و «+» روزهای این هفته رو به شکل کپسول باز می‌کنه (کپسول‌های هدف روزانه‌ی نمونه).',
    hints: [
      ['M12 5v14M5 12h14', '<b>«+»</b> روزهای این هفته رو کپسولی نشون می‌ده؛ دوباره بزنی برمی‌گرده (App Intent). رقم‌ها می‌غلتن.'],
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو روی همون صرافی باز می‌کنه (یه ویجت کوچک فقط یه مقصد داره).'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> رنگ‌های پنل مثل مایع می‌لغزن و دنبال انگشت/ماوس می‌آن، کارت خم می‌شه، عدد با شمارنده وارد می‌شه.'],
    ],
    init: () => ({ dir: 'send', mode: 'rate' }),
    config: { dir: true },

    mount(host, api) {
      const lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      host.innerHTML = `
      <div class="nrw-tilt js-tilt"><div class="nrw-card nrw-ink n9-card" role="group">
        <a class="n9-a" href="#">
          <div class="n9-head">
            <span class="n9-mark" aria-hidden="true"><svg viewBox="0 0 28 28"><path d="M8.5 20.5V7.5l11 13v-13"/><circle cx="19.5" cy="7.5" r="1.4" class="d"/></svg></span>
            <div class="n9-hd"><h3 class="n9-title js-title"></h3><p class="n9-sub js-sub"></p><span class="nr-banner js-banner n9-banner" hidden></span></div>
          </div>
          <div class="n9-panel js-panel">
            <div class="n9-field" aria-hidden="true"><i class="f1"></i><i class="f2"></i><i class="f3"></i><i class="f4"></i><i class="f5 js-spot"></i></div>
            <div class="n9-v n9-v1 js-v1">
              <p class="n9-lab js-lab"></p>
              <div class="n9-num nr-dimmable is-big"><span class="js-num"></span></div>
              <div class="n9-pill js-pill"><span class="js-picon"></span><span class="js-ppct"></span></div>
            </div>
            <div class="n9-v n9-v2 js-v2" aria-hidden="true">
              <p class="n9-lab js-lab2"></p>
              <div class="n9-caps js-caps"></div>
            </div>
            <p class="n9-foot"><span class="n9-basis js-basis"></span><span class="nr-age js-age"></span></p>
          </div>
        </a>
        <button type="button" class="n9-plus js-plus" aria-pressed="false"><span class="n9-plus-in"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10"/></svg></span></button>
        <div class="n9-empty js-empty" hidden>
          ${NR.ph({ s: 12, t: 12, w: 28, h: 28, r: 8 })}${NR.ph({ s: 46, t: 14, w: 72, h: 13, r: 6 })}${NR.ph({ s: 46, t: 32, w: 50, h: 10, r: 5 })}
          ${NR.ph({ s: 8, e: 8, t: 48, b: 8, r: 18 })}
          <div class="n9-emptytext"><span class="nr-banner is-lg js-emptybanner"></span></div>
        </div>
      </div></div>`;
      const $ = s => host.querySelector(s), card = $('.n9-card'), tilt = $('.js-tilt'), root = host.parentNode;
      const els = { title: $('.js-title'), sub: $('.js-sub'), banner: $('.js-banner'), panel: $('.js-panel'), lab: $('.js-lab'), lab2: $('.js-lab2'), picon: $('.js-picon'), ppct: $('.js-ppct'), caps: $('.js-caps'), basis: $('.js-basis'), age: $('.js-age'),
        plus: $('.js-plus'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), spot: $('.js-spot'), v1: $('.js-v1'), v2: $('.js-v2') };
      const rolls = { num: new NR.Roll($('.js-num')), pct: new NR.Roll(els.ppct) };
      let lastNum = null, capsFor = '';

      function drawCaps(v, animate) {
        const key = v.week.vals.join('|');
        if (capsFor !== key) {
          els.caps.innerHTML = v.week.vals.map((val, i) => `<div class="n9-cap" data-i="${i}"><i style="--h:${(v.week.fill[i] * 100).toFixed(1)}%;--d:${i * 55}ms"></i><b>${v.week.letters[i]}</b></div>`).join('');
          capsFor = key;
        }
        els.caps.classList.toggle('is-grow', !!animate);
      }
      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b><span class="n9-gl">${X.galleryLine}</span>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          card.setAttribute('aria-label', gal ? `${X.gallery}، ${X.galleryLine}` : T.state.unset); lastNum = null; rolls.num.text = null; rolls.pct.text = null; return;
        }
        const v = view(vm, lang), mode = api.L.mode;
        card.dataset.dir = v.chg > 0 ? 'up' : v.chg < 0 ? 'down' : 'flat'; card.classList.toggle('has-banner', !!vm.banner); card.classList.toggle('is-week', mode === 'week');
        els.title.textContent = X.title; els.sub.textContent = v.office; els.lab.textContent = v.label; els.lab2.textContent = X.weekLabel; els.basis.textContent = X.basis;
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner n9-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        const val = NR.num(vm.top.rate), up = lastNum == null || val >= lastNum ? 1 : -1; lastNum = val;
        rolls.num.set(v.num, { animate: anim, dir: up });
        els.picon.innerHTML = NR.dirIcon(v.chg); rolls.pct.set(v.sign + v.pct, { animate: anim, dir: v.chg || 1 });
        NR.setAge(els.age, mode === 'week' ? v.mktAge : v.age);
        drawCaps(v, anim && mode === 'week');
        els.plus.setAttribute('aria-pressed', String(mode === 'week')); els.plus.setAttribute('aria-label', mode === 'week' ? X.close : X.open);
        els.v1.setAttribute('aria-hidden', String(mode === 'week')); els.v2.setAttribute('aria-hidden', String(mode !== 'week'));
        $('.n9-a').setAttribute('href', NR.deeplink(v.link, api.L));
        card.setAttribute('aria-label', say(vm, v, lang, mode));
        els.caps.querySelectorAll('.n9-cap').forEach((c, i) => c.setAttribute('title', NR.fill(X.capsule, { day: v.week.names[i], rate: NR.int(v.week.vals[i], lang) })));
      }
      host.addEventListener('click', e => {
        const plus = e.target.closest('.js-plus'), a = e.target.closest('a[href]');
        if (plus) { e.preventDefault(); api.set({ mode: api.L.mode === 'rate' ? 'week' : 'rate' }); return; }
        if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
      });

      /* ── C: the sample's life: the colour field drifts and follows the pointer, the card leans, a count-up on entry ── */
      let fx = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
      const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; tilt.style.transform = `perspective(900px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`; raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .01) ? requestAnimationFrame(loop) : 0; };
      const onMove = e => {
        if (!fx || e.pointerType === 'touch') return; const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width, ny = (e.clientY - b.top) / b.height;
        tx = (nx * 2 - 1) * 5; ty = -(ny * 2 - 1) * 5; els.panel.style.setProperty('--sx', (nx * 100).toFixed(1) + '%'); els.panel.style.setProperty('--sy', (ny * 100).toFixed(1) + '%'); els.panel.classList.add('is-spot');
        if (!raf) raf = requestAnimationFrame(loop);
      };
      const onLeave = () => { tx = ty = 0; els.panel.classList.remove('is-spot'); if (!raf) raf = requestAnimationFrame(loop); };
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) { tilt.style.transform = ''; els.panel.classList.remove('is-spot'); } }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const v = view(vm, lang);
        rolls.num.text = null; rolls.num.set(v.num.replace(/\d/g, () => (lang === 'fa' ? '۰' : '0')), { animate: false }); setTimeout(() => rolls.num.set(v.num, { animate: true, dir: 1 }), 420 / NR.scale());
        setTimeout(() => card.classList.remove('is-intro'), 2600 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; [rolls.num, rolls.pct].forEach(x => { if (x.text) x.set(NR.perturb(x.text), { animate: false }); }); if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); },
      };
    },
    qa: (vm, lang) => ({ number: NR.int(vm.top.rate, lang), age: vm.topAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang), lang, 'rate'); };
      return [
        { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
          ['کارت و پنل رنگی', `${c('containerBackground')} تیره؛ پنل یه ${c('RoundedRectangle')} با چند ${c('RadialGradient')} (آبی روشن بالا / مرجانی پایین؛ رنگ از جهت تغییر)`, 'بیت‌مپ پنل که اپ می‌کشه (برای هر سه جهت از قبل)', A],
          ['عدد درشت و قرص', `${c('Text')} وزن ۳۰۰ با ${c('.contentTransition(.numericText())')}؛ قرص یه ${c('Capsule')} با گرادیان جهت`, `${c('Text')} و ${c('Image')}`, `${A} / ${B}`],
          ['دکمه‌ی +', `${c('Button(intent: ToggleWeekIntent())')} (هدف لمس ۴۸ × ۴۸)؛ کپسول‌ها ${c('Capsule')} با ارتفاع نسبی`, c('actionRunCallback'), B],
          ['لمس', `${c('Link')} یا ${c('widgetURL')}: ${c('netrate://office/<id>?cur=gbp&type=cash&dir=send')}`, c('actionStartActivity'), A],
          ['اندازه', 'کوچک: ۱۷۰ × ۱۷۰ و ۱۵۸ × ۱۵۸', 'حدود ۱۶۰ × ۱۶۰dp (۲ × ۲)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['رقم‌ها می‌غلتن (نرخ، درصد)', B, `iOS: ${c('.contentTransition(.numericText())')}؛ Android: فوری`],
          ['«+» می‌چرخه و کپسول‌ها پر می‌شن', B, `${c('.transition')} هنگام App Intent؛ Android: فوری`],
          ['رنگ‌های پنل مثل مایع می‌لغزن و نور زیر انگشت/ماوس جمع می‌شه', C, 'پنل ثابت (الف)'],
          ['کارت به سمت اشاره‌گر خم می‌شه', C, 'کارت صاف'],
          ['ورود با شمارنده‌ی رقم‌ها', C, 'ورود ساده هنگام تازه شدن'],
        ]) },
        { title: 'دکمه‌ها و لمس', html: NR.tbl(['کنترل', 'iOS', 'Android', 'نتیجه'], [
          ['+', c('ToggleWeekIntent'), c('ToggleWeekAction'), 'نرخ امروز ⇄ شش روز این هفته؛ تو ذخیره‌ی همون ویجت'],
          ['لمس ویجت', 'Link', 'actionStartActivity', c('netrate://office/aria?cur=gbp&type=cash&dir=send')],
        ]) },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('best[0].rate'), 'عدد'], [c('best[0].exchange'), 'نام صرافی زیر عنوان'], [c('best[0].change_pct'), 'قرص'], [c('best[0].recorded_at'), 'سن'],
          [c('week.days[].this'), 'کپسول‌ها'], [c('week.this_average / change_pct / best_day'), 'جمله‌ی نمای هفته'], [c('market.status'), 'چیپ وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([`${c('week')} برای دریافت و برای یکشنبه / پیش از نرخ تو فایل نمونه نیست؛ سرور باید بده.`]) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>آیکون نارنجی کفش شد نشانک خنثی با حرف N</b> (جای‌خالی؛ نشان واقعی رو شما می‌ذارید). پول و صرافی تصویر نمی‌شه.',
          '<b>«Total Steps / 12.7K / +7K Steps» شد «بیشترین تومان / ۹۲٬۹۰۰ / +۰٫۰۶٪».</b> «Compare to last week» شد «از روز کاری قبل».',
          '<b>پنل رنگی:</b> نمونه آبی و قرمز با هم داره. این‌جا رنگ پنل فقط جهته (آبی روشن بالا، مرجانی پایین، خاکستری بدون تغییر)، و قرص هم با همون رنگ و با فلش و علامت. گوشه‌ی روشن پنل سمت دکمه‌ست تا متن‌ها روی تیره بمونن (AA).',
          '<b>کپسول‌های هدف روزانه شدن شش کپسول روزهای کاری این هفته</b> با ارتفاع نسبی (بدون صفر)؛ نمونه هفت روز و هدف داشت.',
          '<b>رنگ‌های زنده‌ی پنل و پاسخ به ماوس</b> فقط نمایشیه (ج)؛ روی گوشی پنل ثابته.',
        ]) },
      ];
    },
  });
})();
