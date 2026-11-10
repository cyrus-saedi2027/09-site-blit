/* ==========================================================================
   N06 · lock-circle  ("Today's place in the month", circular)  — built from sample 04 (Daily health: the Stress card's dot row)
   The sample's row of dots with one bigger dot becomes a ring of dots: the lit ones run from the month's
   low to where today sits, and the big dot marks today. In the middle: how far up the month's range today is
   (a dot-matrix percent) with the direction of today's move above it; the age sits in the gap under the ring.
   Reads one answer object (NR_DATA shape): `series["1m"].stats` (low, high), `market.average`, `market.average_change_pct`.
   No buttons: a lock-screen widget only opens the app.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR || !NR.Dots) return;

  const TEXT = {
    fa: { gallery1: 'جای امروز', gallery2: 'در ماه', unset1: 'ویجت را', unset2: 'تنظیم کن', say: 'میانگین بازار، {rate} تومان برای هر پوند، {pos} از بازه‌ی یک ماه، از کف تا سقف، {word}، {age}' },
    en: { gallery1: 'Today', gallery2: 'in the month', unset1: 'Set up', unset2: 'the widget', say: "Market average, {rate} toman per pound, at {pos} of the one-month range from low to high, {word}, {age}" },
  };
  const N = 28, CX = 38, CY = 38, RING = 31.5, A0 = 145, SPAN = 250;
  const at = th => { const a = (A0 + SPAN * th) * Math.PI / 180; return [CX + RING * Math.cos(a), CY + RING * Math.sin(a)]; };

  function view(vm, lang) {
    const T = NR.text[lang], st = vm.series['1m'].stats, lo = NR.num(st.low), hi = NR.num(st.high), v = NR.num(vm.market.average);
    const pos = Math.min(1, Math.max(0, hi > lo ? (v - lo) / (hi - lo) : .5)), pct = Math.round(pos * 100), chg = NR.sign(vm.market.average_change_pct);
    return { pos, pctText: NR.digits(pct, lang) + (lang === 'fa' ? '٪' : '%'), pctSay: NR.digits(pct, lang) + (lang === 'fa' ? ' درصد' : ' percent'), chg, word: NR.dirWord(chg, lang), age: vm.mktAge, rate: NR.int(vm.market.average, lang) };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang];
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + NR.fill(TEXT[lang].say, { rate: v.rate, pos: v.pctSay, word: v.word, age: v.age.text });
  };

  NR.register({
    id: 'lock-circle', no: 'N06', name: 'lock-circle', lock: true, from: 'از روی ویجت ۰۴ · سلامت روزانه (ردیف نقطه‌های استرس)', size: 'lock-circle',
    names: { fa: 'جای امروز در ماه · دایره', en: "Today's place in the month · circular" },
    desc: 'حلقه‌ای از نقطه‌ها که جای امروز رو بین کف و سقف یک ماه نشون می‌ده: نقطه‌ها تا امروز روشن‌ان و نقطه‌ی بزرگ‌تر خود امروزه. وسط حلقه درصد جای امروز با عدد نقطه‌ای و فلش جهت تغییر امروز، و سن تو دهانه‌ی پایین حلقه. از ردیف نقطه‌های کارت «Stress» نمونه‌ی ۰۴ (نقطه‌ی بزرگ‌تر میان نقطه‌های کوچک‌تر) آمده.',
    hints: [
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو روی نمودار بازار با بازه‌ی یک ماه باز می‌کنه؛ دکمه نداره (صفحه‌ی قفل).'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> ورود: نقطه‌ها یکی‌یکی روشن می‌شن و نقطه‌ی امروز می‌پره.'],
    ],
    init: () => ({ dir: 'send' }),
    config: { dir: true },

    mount(host, api) {
      const lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      const dotsHtml = Array.from({ length: N }, (_, i) => { const [x, y] = at(i / (N - 1)); return `<circle class="l6-d" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.6"/>`; }).join('');
      host.innerHTML = `
      <div class="nrl l6" role="group">
        <a class="l6-a" href="#">
          <svg class="l6-ring" viewBox="0 0 76 76" aria-hidden="true" focusable="false">${dotsHtml}<g class="l6-mark js-mark"><circle class="l6-halo" r="5.2"/><circle class="l6-core" r="3"/></g></svg>
          <span class="l6-ic js-ic"></span>
          <svg class="l6-num nr-dimmable is-big js-num" aria-hidden="true" focusable="false"></svg>
          <span class="l6-age"><span class="nr-age js-age"></span></span>
        </a>
        <div class="l6-empty js-empty" hidden>
          <svg class="l6-ring" viewBox="0 0 76 76" aria-hidden="true">${Array.from({ length: N }, (_, i) => { const [x, y] = at(i / (N - 1)); return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.2" class="l6-ph"/>`; }).join('')}</svg>
          <p class="l6-emptytext js-emptytext"></p>
        </div>
      </div>`;
      const $ = s => host.querySelector(s), box = $('.nrl'), root = host.parentNode;
      const els = { ds: [...host.querySelectorAll('.l6-d')], mark: $('.js-mark'), ic: $('.js-ic'), num: $('.js-num'), age: $('.js-age'), empty: $('.js-empty'), emptyText: $('.js-emptytext') };
      const dots = new NR.Dots(els.num, { pitch: 2.1, r: .95 });
      const fitNum = text => { const [w, h] = dots.fit(text); els.num.style.width = `calc(${w.toFixed(2)} * var(--u))`; els.num.style.height = `calc(${h.toFixed(2)} * var(--u))`; };

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; box.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyText.innerHTML = gal ? `<b>${X.gallery1}</b><b>${X.gallery2}</b>` : `${NR.bannerIcon('unset')}<b>${X.unset1}</b><b>${X.unset2}</b>`;
          box.setAttribute('aria-label', gal ? `${X.gallery1} ${X.gallery2}` : T.state.unset); dots.text = null; dots.built = 0; return;
        }
        const v = view(vm, lang);
        els.ic.innerHTML = vm.banner ? NR.bannerIcon(vm.banner) : NR.dirIcon(v.chg);
        const [mx, my] = at(v.pos); els.mark.style.transform = `translate(${mx.toFixed(2)}px, ${my.toFixed(2)}px)`;
        els.mark.setAttribute('transform', `translate(${mx.toFixed(2)} ${my.toFixed(2)})`);
        els.ds.forEach((d, i) => d.classList.toggle('is-lit', i / (N - 1) <= v.pos + 1e-6));
        NR.setAge(els.age, v.age);
        fitNum(v.pctText); dots.set(v.pctText, { animate: anim });
        $('.l6-a').setAttribute('href', NR.deeplink('chart', api.L, { range: 30 }));
        box.setAttribute('aria-label', say(vm, v, lang));
      }
      host.addEventListener('click', e => { const a = e.target.closest('a[href]'); if (a) { e.preventDefault(); api.link(a.getAttribute('href')); } });

      let fx = false;
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        box.classList.remove('is-intro'); void box.offsetWidth; box.classList.add('is-intro');
        els.ds.forEach((d, i) => d.style.setProperty('--i', i));
        setTimeout(() => box.classList.remove('is-intro'), 2400 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { root.classList.remove('is-fx'); dots.destroy(); },
      };
    },
    qa: (vm, lang) => ({ number: NR.int(vm.market.average, lang), age: vm.mktAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang), lang); };
      return [
        { title: 'ساخت · WidgetKit', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android', 'برچسب'], [
          ['نوع', `${c('accessoryCircular')}؛ تک‌رنگ سیستم (${c('.vibrant')})`, 'ندارد (صفحه‌ی قفل فقط iOS)', A],
          ['حلقه', `${c('Gauge')} خود سیستم با ${c('.gaugeStyle(.accessoryCircular)')} هم ممکنه، ولی حلقه‌ی نقطه‌ای رو با ${c('Canvas')} می‌کشیم (۲۸ نقطه روی کمان ۲۷۰ درجه)`, '—', A],
          ['عدد وسط', `${c('Canvas')} با جدول ۵ × ۷؛ اگه جا کم بود ${c('Text')} ساده با ${c('.contentTransition(.numericText())')}`, '—', `${A} / ${B}`],
          ['فلش', `SF Symbol ${c('arrow.up')} / ${c('arrow.down')}`, '—', A],
          ['سن', `${c('Text')} ۱۰٫۵ نقطه تو دهانه‌ی پایین حلقه`, '—', A],
          ['لمس', `${c('widgetURL')}: ${c('netrate://chart?cur=gbp&type=cash&dir=send&range=30')}`, '—', A],
          ['اندازه', 'حدود ۷۶ × ۷۶ (آیفون ۳۹۳) و ۷۲ × ۷۲ (۳۹۰)', '—', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['نقطه‌ی امروز جابه‌جا می‌شه و نقطه‌های روشن عوض می‌شن، عدد وسط موج برمی‌داره', B, `${c('.transition(.opacity)')} هنگام تازه شدن`],
          ['ورود: نقطه‌ها یکی‌یکی روشن می‌شن و نقطه‌ی امروز می‌پره', C, 'ثابت (الف)'],
        ]) },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('series["1m"].stats.low / high'), 'ابتدا و انتهای کمان'], [c('market.average'), 'جای امروز روی کمان (درصد = (امروز − کف) ÷ (سقف − کف))'], [c('market.average_change_pct'), 'فلش'], [c('market.recorded_at'), 'سن'], [c('market.status'), 'آیکون وضعیت به‌جای فلش'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul(['هیچ. اگه سرور خودش «جای امروز در ماه» رو بده، محاسبه‌ی درصد از ویجت برداشته می‌شه.']) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>«ردیف نقطه‌های استرس» شد حلقه.</b> ردیف نقطه‌ها با یه نقطه‌ی درشت (نمونه) تو دایره‌ی ۷۶ نقطه‌ای جا نمی‌شه؛ همون ایده روی کمان ۲۷۰ درجه.',
          '<b>درصد جای امروز</b> جای «۱۳» (عدد استرس) نشسته. «٪» جزو عدد نقطه‌ایه.',
          '<b>رنگ نداره:</b> صفحه‌ی قفل تک‌رنگه. جهت فقط با فلش.',
          '<b>سن ۱۰٫۵ نقطه</b> تو دهانه‌ی ریزتر از بقیه‌ی ویجت‌هاست؛ فقط همین‌جا جا بود و کنار عدد نشسته.',
        ]) },
      ];
    },
  });
})();
