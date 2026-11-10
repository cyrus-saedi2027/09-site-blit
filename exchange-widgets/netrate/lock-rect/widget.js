/* ==========================================================================
   N05 · lock-rect  ("Rate on the lock screen", rectangular)  — built from sample 04 (Daily health: the Activity card)
   The sample's small black card: a label, a dot-matrix number, a row of ticks. On the lock screen the
   system draws every widget in one colour on the wallpaper, so there is no card: the label (with the change
   beside it), the number in dots, its unit, and under it the age and the direction.
   Reads one answer object (NR_DATA shape): `best[0]` (the office with the most toman when sending, the least when receiving).
   No buttons: a lock-screen widget only opens the app.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR || !NR.Dots) return;

  const TEXT = {
    fa: { gallery: 'نرخ روی صفحه‌ی قفل', say: '{title}، {rate} تومان برای هر پوند، {pct} {word}، {dir}، {age}' },
    en: { gallery: 'Rate on the lock screen', say: '{title}, {rate} toman per pound, {word} {pct}, {dir}, {age}' },
  };
  const P = 3.1, R = 1.3;

  function view(vm, lang) {
    const T = NR.text[lang], t = vm.top, chg = NR.sign(t.change_pct);
    return { title: T.title[vm.dir], num: NR.int(t.rate, lang), unit: lang === 'fa' ? 'تومان' : 'toman', dir: T.dir[vm.dir + 'Short'],
      chg, pct: NR.pct(t.change_pct, lang, { noSign: true }), sign: chg > 0 ? '+' : chg < 0 ? '−' : '', word: NR.dirWord(chg, lang), age: vm.topAge };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang];
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + NR.fill(TEXT[lang].say, { title: v.title, rate: v.num, pct: v.pct, word: v.word, dir: v.dir, age: v.age.text });
  };

  NR.register({
    id: 'lock-rect', no: 'N05', name: 'lock-rect', lock: true, from: 'از روی ویجت ۰۴ · سلامت روزانه (کارت فعالیت)', size: 'lock-rect',
    names: { fa: 'نرخ روی صفحه‌ی قفل · مستطیل', en: 'Lock screen rate · rectangular' },
    desc: 'بیشترین تومان (ارسال) یا کمترین تومان (دریافت) با فلش و علامت تغییر، عدد نقطه‌ای، واحد، سن و جهت. روی صفحه‌ی قفل سیستم همه‌چیز رو تک‌رنگ می‌کشه؛ برای همین کارت و رنگ نداره و فقط همون کارت کوچک «Activity» نمونه‌ی ۰۴ رو به شکل نقطه‌ای و بی‌کارت نگه داشته.',
    hints: [
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو روی فهرست صرافی‌ها با همین تنظیم باز می‌کنه؛ دکمه نداره (صفحه‌ی قفل).'],
      ['M12 3a9 9 0 1 0 9 9M12 7v5l3 2', '<b>سن</b> همیشه هست؛ وقتی عدد کهنه بشه ساعت کنارش میاد (تک‌رنگ، پس رنگ کهربایی نداره).'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> نقطه‌های زیر ماوس درشت می‌شن، ورود با شمارنده‌ی تابلویی.'],
    ],
    init: () => ({ dir: 'send' }),
    config: { dir: true },

    mount(host, api) {
      const lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      host.innerHTML = `
      <div class="nrl l5" role="group">
        <a class="l5-a" href="#">
          <div class="l5-r1"><span class="l5-lab js-label"></span><span class="l5-chg js-chg"><span class="js-chgicon"></span><span class="js-chgpct"></span></span><span class="l5-state js-state" hidden></span></div>
          <div class="l5-r2"><svg class="l5-num nr-dimmable is-big js-num" aria-hidden="true" focusable="false"></svg><span class="l5-unit js-unit"></span></div>
          <div class="l5-r3"><span class="nr-age js-age"></span><span class="l5-dir js-dir"></span></div>
        </a>
        <div class="l5-empty js-empty" hidden>
          ${NR.ph({ s: 8, t: 9, w: 64, h: 11, r: 5 })}${NR.ph({ s: 8, t: 27, w: 98, h: 21, r: 5 })}${NR.ph({ s: 8, t: 56, w: 70, h: 10, r: 5 })}
          <span class="l5-emptychip js-emptybanner"></span>
        </div>
      </div>`;
      const $ = s => host.querySelector(s), box = $('.nrl'), root = host.parentNode;
      const els = { label: $('.js-label'), chg: $('.js-chg'), chgIcon: $('.js-chgicon'), chgPct: $('.js-chgpct'), state: $('.js-state'), unit: $('.js-unit'), age: $('.js-age'), dir: $('.js-dir'), num: $('.js-num'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner') };
      const dots = new NR.Dots(els.num, { pitch: P, r: R });
      const fitNum = text => { const [w, h] = dots.fit(text); els.num.style.width = `calc(${w.toFixed(2)} * var(--u))`; els.num.style.height = `calc(${h.toFixed(2)} * var(--u))`; };

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; box.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`;
          box.setAttribute('aria-label', gal ? X.gallery : T.state.unset); dots.text = null; dots.built = 0; return;
        }
        const v = view(vm, lang);
        box.classList.toggle('has-banner', !!vm.banner);
        els.label.textContent = v.title; els.unit.textContent = v.unit; els.dir.textContent = v.dir;
        els.chgIcon.innerHTML = NR.dirIcon(v.chg); els.chgPct.innerHTML = NR.n(v.sign + v.pct);
        if (vm.banner) { els.state.hidden = false; els.state.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.state.hidden = true;
        NR.setAge(els.age, v.age);
        fitNum(v.num); dots.set(v.num, { animate: anim });
        $('.l5-a').setAttribute('href', NR.deeplink('rates', api.L));
        box.setAttribute('aria-label', say(vm, v, lang));
      }
      host.addEventListener('click', e => { const a = e.target.closest('a[href]'); if (a) { e.preventDefault(); api.link(a.getAttribute('href')); } });

      /* C: dots swell under the pointer; scoreboard count-up on entry */
      let fx = false, countStop = null;
      const onMove = e => {
        if (!fx || e.pointerType === 'touch') return; const nb = els.num.getBoundingClientRect(), k = els.num.viewBox.baseVal;
        if (e.clientX > nb.left - 8 && e.clientX < nb.right + 8 && e.clientY > nb.top - 8 && e.clientY < nb.bottom + 8) dots.lens((e.clientX - nb.left) / nb.width * k.width + k.x, (e.clientY - nb.top) / nb.height * k.height + k.y, 11, 1.55); else dots.lens(null);
      };
      const onLeave = () => dots.lens(null);
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) dots.lens(null); }
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        box.classList.remove('is-intro'); void box.offsetWidth; box.classList.add('is-intro');
        const target = NR.num(vm.top.rate); if (countStop && countStop.stop) countStop.stop();
        countStop = dots.count(target * .62, target, x => NR.int(x, lang), 1200);
        setTimeout(() => box.classList.remove('is-intro'), 2200 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {},
        destroy: () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); dots.destroy(); },
      };
    },
    qa: (vm, lang) => ({ number: NR.int(vm.top.rate, lang), age: vm.topAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang), lang); };
      return [
        { title: 'ساخت · WidgetKit', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android', 'برچسب'], [
          ['نوع', `${c('accessoryRectangular')}؛ سیستم همه‌چیز رو تک‌رنگ می‌کشه (${c('widgetRenderingMode')} = ${c('.vibrant')})، پس رنگ و کارت نداره`, 'ندارد (صفحه‌ی قفل فقط iOS)', A],
          ['عدد نقطه‌ای', `${c('Canvas')} با جدول ۵ × ۷ (${c('dots.js')})؛ ${c('accessibilityLabel')} خود عدده`, '—', A],
          ['فلش تغییر', 'SF Symbol ‏‏' + c('arrow.up') + ' / ' + c('arrow.down') + ' / ' + c('minus') + ' کنار درصد با علامت', '—', A],
          ['تغییر عدد', `${c('.transition(.opacity)')} هنگام تازه شدن`, '—', B],
          ['لمس', `${c('widgetURL')}: ${c('netrate://rates?cur=gbp&type=cash&dir=send')}`, '—', A],
          ['اندازه', 'حدود ۱۷۲ × ۷۶ (آیفون ۳۹۳) و ۱۶۰ × ۷۲ (۳۹۰)', '—', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['نقطه‌های عدد هنگام تازه شدن عوض می‌شن', B, `${c('.transition(.opacity)')}`],
          ['شمارنده‌ی تابلویی هنگام ورود، نقطه‌ها زیر ماوس درشت می‌شن', C, 'ثابت (الف)'],
        ]) + NR.p('صفحه‌ی قفل دکمه و حرکت دائمی نداره؛ فقط لمس و باز شدن اپ.') },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('best[0].rate'), 'عدد نقطه‌ای'], [c('best[0].change_pct'), 'فلش و درصد کنار برچسب'], [c('best[0].recorded_at'), 'سن'], [c('query.direction'), 'برچسب و سطر جهت'], [c('market.status'), 'آیکون وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul(['هیچ.']) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>کارت و رنگ حذف شد:</b> صفحه‌ی قفل همه‌چیز رو تک‌رنگ می‌کشه و کارت و سایه قبول نمی‌کنه. جهت فقط با فلش و علامت (+ / −) گفته می‌شه.',
          '<b>«Activity / above average» شد «بیشترین تومان» با تغییرش.</b>',
          '<b>آیکون قرص کنار عدد (رعد) حذف شد؛ جاش واحد «تومان»</b> کنار عدد نشسته و جهت (ارسال به ایران) تو سطر پایینه.',
          '<b>ردیف نقطه‌چین و میله‌های ساعت</b> نمونه نیست چون جا نیست؛ سن و جهت جاشون رو گرفتن.',
          '<b>حالت‌های وضعیت:</b> یه چیپ کوچک (ساعت / مکث / آفلاین) به‌جای برچسب می‌آد؛ عدد و سن می‌مونن.',
        ]) },
      ];
    },
  });
})();
