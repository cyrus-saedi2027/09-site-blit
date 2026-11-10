/* ==========================================================================
   N07 · lock-inline  ("Rate on the lock screen", one line)  — built from sample 04 (Daily health)
   The inline slot above the lock-screen clock holds one line of text and one small icon, nothing else.
   So the sample's dot-matrix card shrinks to its content: the direction arrow, the number, its unit and its age.
   (The dot font itself does not fit a 24-pt line; the system draws this slot in its own font anyway.)
   Reads one answer object (NR_DATA shape): `best[0]`. No buttons.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { gallery: 'نرخ در یک خط', say: '{title}، {rate} تومان برای هر پوند، {word}، {age}' },
    en: { gallery: 'The rate in one line', say: '{title}, {rate} toman per pound, {word}, {age}' },
  };

  function view(vm, lang) {
    const T = NR.text[lang], t = vm.top, chg = NR.sign(t.change_pct);
    return { title: T.title[vm.dir], num: NR.int(t.rate, lang), unit: lang === 'fa' ? 'تومان' : 'toman', chg, word: NR.dirWord(chg, lang), age: vm.topAge };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang];
    return (vm.banner ? T.state[vm.banner] + (lang === 'fa' ? '، ' : ', ') : '') + NR.fill(TEXT[lang].say, { title: v.title, rate: v.num, word: v.word, age: v.age.text });
  };

  NR.register({
    id: 'lock-inline', no: 'N07', name: 'lock-inline', lock: true, from: 'از روی ویجت ۰۴ · سلامت روزانه', size: 'lock-inline',
    names: { fa: 'نرخ تو یک خط · صفحه‌ی قفل', en: 'Rate in one line · lock screen' },
    desc: 'فقط یک خط متن با یه آیکون کوچک: فلش جهت تغییر، بیشترین (ارسال) یا کمترین (دریافت) تومان، واحد و سن. جای ویجت inline بالای ساعت صفحه‌ی قفله و سیستم با فونت خودش می‌کشتش، پس از کارت نقطه‌ای نمونه‌ی ۰۴ فقط «عدد کنار آیکون» مونده.',
    hints: [
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو روی فهرست صرافی‌ها باز می‌کنه؛ دکمه نداره.'],
      ['M12 3a9 9 0 1 0 9 9M12 7v5l3 2', '<b>سن</b> همیشه تو همون خطه؛ آیکون وضعیت (مکث / ساعت / آفلاین) جای فلش می‌شینه.'],
    ],
    init: () => ({ dir: 'send' }),
    config: { dir: true },

    mount(host, api) {
      const lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      host.innerHTML = `
      <div class="nrl l7" role="group">
        <a class="l7-a" href="#"><span class="l7-ic js-ic"></span><b class="l7-num nr-dimmable js-num"></b><span class="l7-unit js-unit"></span><i class="l7-sep" aria-hidden="true"></i><span class="nr-age js-age"></span></a>
        <div class="l7-empty js-empty" hidden><span class="l7-emptytext js-emptytext"></span></div>
      </div>`;
      const $ = s => host.querySelector(s), box = $('.nrl'), root = host.parentNode;
      const els = { ic: $('.js-ic'), unit: $('.js-unit'), age: $('.js-age'), empty: $('.js-empty'), emptyText: $('.js-emptytext') };
      const roll = new NR.Roll($('.js-num')); let last = null;
      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; box.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyText.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`;
          box.setAttribute('aria-label', gal ? X.gallery : T.state.unset); roll.text = null; last = null; return;
        }
        const v = view(vm, lang);
        els.ic.innerHTML = vm.banner ? NR.bannerIcon(vm.banner) : NR.dirIcon(v.chg);
        const val = NR.num(vm.top.rate); roll.set(v.num, { animate: anim, dir: last == null || val >= last ? 1 : -1 }); last = val;
        els.unit.textContent = v.unit; NR.setAge(els.age, v.age);
        $('.l7-a').setAttribute('href', NR.deeplink('rates', api.L));
        box.setAttribute('aria-label', say(vm, v, lang));
      }
      host.addEventListener('click', e => { const a = e.target.closest('a[href]'); if (a) { e.preventDefault(); api.link(a.getAttribute('href')); } });
      function refresh() { const vm = api.model(); if (vm.empty) return; if (roll.text) roll.set(NR.perturb(roll.text), { animate: false }); requestAnimationFrame(() => render({ animate: true })); }
      return { update: o => render(o || {}), refresh, fx: () => {}, setVisible: () => {}, destroy: () => {} };
    },
    qa: (vm, lang) => ({ number: NR.int(vm.top.rate, lang), age: vm.topAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang), lang); };
      return [
        { title: 'ساخت · WidgetKit', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android', 'برچسب'], [
          ['نوع', `${c('accessoryInline')}؛ فقط ${c('Text')} و یه ${c('Image(systemName:)')} (سیستم فونت و تک‌رنگ رو خودش می‌ذاره)`, 'ندارد', A],
          ['عدد', `${c('Text')} با ${c('.contentTransition(.numericText())')} هنگام تازه شدن`, '—', B],
          ['آیکون', `SF Symbol ${c('arrow.up')} / ${c('arrow.down')} / ${c('minus')}؛ وضعیت: ${c('pause')} / ${c('clock')} / ${c('wifi.slash')}`, '—', A],
          ['لمس', `${c('widgetURL')}: ${c('netrate://rates?cur=gbp&type=cash&dir=send')}`, '—', A],
          ['اندازه', 'یه خط، حدود ۱۷۲ × ۲۴ (آیفون ۳۹۳) و ۱۶۰ × ۲۴ (۳۹۰)', '—', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی'], [['رقم‌ها هنگام تازه شدن می‌غلتن', B, c('.contentTransition(.numericText())')]]) + NR.p('حرکت فقط‌نمایشی ندارد؛ این جا فقط متنه.') },
        { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('best[0].rate'), 'عدد'], [c('best[0].change_pct'), 'جهت فلش'], [c('best[0].recorded_at'), 'سن'], [c('market.status'), 'آیکون وضعیت'],
        ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul(['هیچ.']) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>نقطه‌ها نیستن:</b> یه خط ۲۴ نقطه‌ای جا برای ماتریس ۵ × ۷ نداره و سیستم فونت خودش رو می‌خواد.',
          '<b>درصد تغییر نیست؛</b> فقط فلش (جهت) و سن. تک‌رنگه، پس رنگی هم نداره.',
          '<b>حالت‌های وضعیت</b> فقط با آیکون جای فلش و جمله‌ی VoiceOver گفته می‌شن (جا برای چیپ نیست). «امروز یکشنبه است» با سنِ «دیروز» هم معلومه.',
        ]) },
      ];
    },
  });
})();
