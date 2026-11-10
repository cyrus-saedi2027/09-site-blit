/* ==========================================================================
   N08 · strip-4x1  ("Rate ticker", Android 4 × 1)  — built from sample 04 (Daily health)
   The sample's black card with a dot-matrix number becomes a one-line ticker: four prepared frames that follow
   each other — the market average, then the first three offices by rate — each with its name, its change, its age and the
   number in dots; the row of ticks says which frame is showing (the sample's tick row).
   Offices are equal: the three frames share one layout, one size and one style; the rank is only a numeral.
   Reads one answer object (NR_DATA shape): `market`, `best[0..2]`. On Android only.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR || !NR.Dots) return;

  const TEXT = {
    fa: { gallery: 'تیکر نرخ', galleryLine: 'میانگین و سه صرافی اول', frame: 'فریم {i} از ۴', rank: 'رتبه {n}', say: '{title}، {rate} تومان برای هر پوند، {pct} {word}؛ سه نرخ اول: {list}؛ {age}', step: 'فریم بعدی' },
    en: { gallery: 'Rate ticker', galleryLine: 'The average and the first three offices', frame: 'Frame {i} of 4', rank: 'Rank {n}', say: '{title}, {rate} toman per pound, {word} {pct}; first three rates: {list}; {age}', step: 'Next frame' },
  };
  const P = 3.5, R = 1.5, EVERY = 4200;

  function frames(vm, lang) {
    const T = NR.text[lang], m = vm.market;
    const f = [{ kind: 'avg', title: T.avg, num: NR.int(m.average, lang), cp: m.average_change_pct, age: vm.mktAge, link: 'rates' }];
    vm.best.slice(0, 3).forEach((b, i) => f.push({ kind: 'office', rank: i + 1, title: NR.office(b.exchange.id, lang, b.exchange.name).name, num: NR.int(b.rate, lang), cp: b.change_pct, age: vm.ageOf(b.recorded_at), link: 'office/' + b.exchange.id }));
    f.forEach(x => { x.chg = NR.sign(x.cp); x.pct = NR.pct(x.cp, lang, { noSign: true }); x.sign = x.chg > 0 ? '+' : x.chg < 0 ? '−' : ''; x.word = NR.dirWord(x.chg, lang); });
    return f;
  }
  const say = (vm, f, lang) => {
    const T = NR.text[lang], X = TEXT[lang], sep = lang === 'fa' ? '، ' : ', ';
    return (vm.banner ? T.state[vm.banner] + sep : '') + NR.fill(X.say, { title: f[0].title, rate: f[0].num, pct: f[0].pct, word: f[0].word, list: f.slice(1).map(x => `${x.title} ${x.num}`).join(sep), age: f[0].age.text });
  };

  NR.register({
    id: 'strip-4x1', no: 'N08', name: 'strip-4x1', from: 'از روی ویجت ۰۴ · سلامت روزانه', size: 'strip',
    names: { fa: 'تیکر نرخ · نوار ۴×۱ اندروید', en: 'Rate ticker · Android 4×1' },
    desc: 'یه نوار باریک که چهار فریم آماده رو پشت هم نشون می‌ده: میانگین بازار و بعد سه صرافی اول (به ترتیب نرخ). هر فریم نام، تغییر، سن و عدد نقطه‌ای داره و ردیف نقطه‌های پایین (ردیف تیک نمونه‌ی ۰۴) می‌گه کدوم فریمه. سه صرافی دقیقاً یک‌شکل‌ان و فقط شماره‌ی رتبه فرق می‌کنه. فقط اندروید.',
    hints: [
      ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس</b> اپ رو باز می‌کنه: فریم میانگین روی فهرست صرافی‌ها، فریم هر صرافی روی همون صرافی.'],
      ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>فریم‌ها خودشون می‌چرخن</b> (هر چند ثانیه؛ با «فریم بعدی» زیر ویجت هم می‌تونی جلو ببری). روی گوشی RemoteViews با AdapterViewFlipper لازمه.'],
      ['M12 3a9 9 0 1 0 9 9M12 7v5l3 2', '<b>سن</b> هر فریم مال همون عدده؛ اگه کهنه بشه ساعت و رنگ کهربایی می‌گیره.'],
    ],
    actions: [{ label: 'فریم بعدی', fn: 'step' }],
    init: () => ({ dir: 'send', frame: 0 }),
    config: { dir: true },

    mount(host, api) {
      const lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
      host.innerHTML = `
      <div class="nrw-card nrw-ink s8-card" role="group">
        <a class="s8-a" href="#">
          <div class="s8-l js-l">
            <p class="s8-title js-title"></p>
            <p class="s8-r2"><span class="s8-rank js-rank" hidden></span><span class="s8-chg js-chg"><span class="js-chgicon"></span><span class="js-chgpct"></span><span class="js-chgword"></span></span><span class="nr-banner js-banner s8-banner" hidden></span></p>
            <p class="s8-age"><span class="nr-age js-age"></span></p>
          </div>
          <div class="s8-r">
            <svg class="s8-num nr-dimmable is-big js-num" aria-hidden="true" focusable="false"></svg>
            <p class="s8-unit js-unit"></p>
            <i class="s8-ticks js-ticks" aria-hidden="true"><u></u><u></u><u></u><u></u></i>
          </div>
        </a>
        <div class="s8-empty js-empty" hidden>
          ${NR.ph({ s: 16, t: 12, w: 100, h: 15, r: 6 })}${NR.ph({ s: 16, t: 34, w: 80, h: 11, r: 5 })}${NR.ph({ s: 16, t: 52, w: 60, h: 10, r: 5 })}${NR.ph({ e: 16, t: 12, w: 112, h: 24, r: 5 })}${NR.ph({ e: 16, t: 56, w: 50, h: 8, r: 4 })}
          <div class="s8-emptytext"><span class="nr-banner is-lg js-emptybanner"></span></div>
        </div>
      </div>`;
      const $ = s => host.querySelector(s), card = $('.s8-card'), root = host.parentNode;
      const els = { l: $('.js-l'), title: $('.js-title'), rank: $('.js-rank'), chg: $('.js-chg'), chgIcon: $('.js-chgicon'), chgPct: $('.js-chgpct'), chgWord: $('.js-chgword'), banner: $('.js-banner'), age: $('.js-age'), unit: $('.js-unit'), num: $('.js-num'),
        ticks: [...host.querySelectorAll('.js-ticks u')], empty: $('.js-empty'), emptyBanner: $('.js-emptybanner') };
      const dots = new NR.Dots(els.num, { pitch: P, r: R });
      const fitNum = text => { const [w, h] = dots.fit(text); els.num.style.width = `calc(${w.toFixed(2)} * var(--u))`; els.num.style.height = `calc(${h.toFixed(2)} * var(--u))`; };
      let shown = -1, timer = 0, visible = true, fx = false;

      function render(o = {}) {
        const vm = api.model(), anim = !!o.animate && api.animate();
        root.classList.toggle('is-dim', !!vm.dim);
        els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
        if (vm.empty) {
          const gal = vm.st === 'gallery';
          els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b><span class="s8-gl">${X.galleryLine}</span>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
          card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset); dots.text = null; dots.built = 0; shown = -1; return;
        }
        const f = frames(vm, lang), i = Math.min(api.L.frame || 0, f.length - 1), fr = f[i];
        card.classList.remove('is-up', 'is-down', 'is-flat'); card.classList.add(fr.chg > 0 ? 'is-up' : fr.chg < 0 ? 'is-down' : 'is-flat'); card.classList.toggle('has-banner', !!vm.banner);
        const swap = () => {
          els.title.textContent = fr.title;
          els.rank.hidden = fr.kind !== 'office'; els.rank.textContent = fr.kind === 'office' ? NR.digits(fr.rank, lang) : ''; els.rank.setAttribute('aria-label', fr.kind === 'office' ? NR.fill(X.rank, { n: NR.digits(fr.rank, lang) }) : '');
          els.chgIcon.innerHTML = NR.dirIcon(fr.chg); els.chgPct.innerHTML = NR.n(fr.sign + fr.pct); els.chgWord.textContent = fr.kind === 'avg' ? fr.word : '';
          NR.setAge(els.age, fr.age);
        };
        if (anim && shown !== -1 && shown !== i) {
          els.l.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-6px)' }], { duration: 160 / NR.scale(), easing: 'ease-in', fill: 'forwards' }).onfinish = () => { swap(); els.l.getAnimations().forEach(a => a.cancel()); els.l.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260 / NR.scale(), easing: 'cubic-bezier(.16,1,.3,1)' }); };
        } else swap();
        els.unit.textContent = T.unit;
        if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner s8-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
        els.ticks.forEach((u, k) => u.classList.toggle('is-on', k === i));
        fitNum(fr.num); dots.set(fr.num, { animate: anim || (o.step && api.animate()) });
        $('.s8-a').setAttribute('href', NR.deeplink(fr.link, api.L));
        $('.s8-a').setAttribute('data-frame', String(i));
        card.setAttribute('aria-label', say(vm, f, lang));
        shown = i;
      }
      host.addEventListener('click', e => { const a = e.target.closest('a[href]'); if (a) { e.preventDefault(); api.link(a.getAttribute('href')); } });

      function step() { const vm = api.model(); if (vm.empty) return; api.set({ frame: ((api.L.frame || 0) + 1) % 4 }, { step: true }); }
      function schedule() { clearInterval(timer); timer = 0; if (fx && visible && !NR.reduced()) timer = setInterval(step, EVERY / NR.scale()); }
      function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); schedule(); }

      /* C: dots swell under the pointer, scoreboard count on entry */
      const onMove = e => {
        if (!fx || e.pointerType === 'touch') return; const nb = els.num.getBoundingClientRect(), k = els.num.viewBox.baseVal;
        if (e.clientX > nb.left - 10 && e.clientX < nb.right + 10 && e.clientY > nb.top - 10 && e.clientY < nb.bottom + 10) dots.lens((e.clientX - nb.left) / nb.width * k.width + k.x, (e.clientY - nb.top) / nb.height * k.height + k.y, 15, 1.5); else dots.lens(null);
      };
      const onLeave = () => dots.lens(null);
      root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
      let countStop = null;
      function intro() {
        if (!fx) return; const vm = api.model(); if (vm.empty) return;
        card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro');
        const fr = frames(vm, lang)[api.L.frame || 0], target = NR.num(fr.kind === 'avg' ? vm.market.average : vm.best[fr.rank - 1].rate);
        if (countStop && countStop.stop) countStop.stop(); countStop = dots.count(target * .62, target, x => NR.int(x, lang), 1100);
        setTimeout(() => card.classList.remove('is-intro'), 2200 / NR.scale());
      }
      function refresh() { const vm = api.model(); if (vm.empty) return; if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
      return {
        update: o => render(o || {}), refresh, intro, step, fx: setFx, setVisible: v => { visible = v; schedule(); },
        destroy: () => { clearInterval(timer); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); dots.destroy(); },
      };
    },
    qa: (vm, lang) => ({ number: NR.int(vm.market.average, lang), age: vm.mktAge.text }),
    notes: () => {
      const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
      const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, frames(vm, lang), lang); };
      return [
        { title: 'ساخت · Android', html: NR.tbl(['بخش', 'iOS', 'Android', 'برچسب'], [
          ['نوع', 'ندارد (iOS نوار ۴×۱ نداره؛ ویجت متوسطِ «روند بازار» نزدیک‌ترینه)', `ویجت ۴ × ۱ (حدود ۳۳۶ × ۷۲dp)؛ چون فریم‌ها خودشون می‌چرخن، ${c('RemoteViews')} کلاسیک با ${c('AdapterViewFlipper')} / ${c('ViewFlipper')} لازمه؛ Glance خالص نمی‌تونه`, B],
          ['فریم‌ها', '—', `چهار فریم آماده (میانگین + ۳ صرافی اول) که اپ پیش‌تر می‌کشه؛ هر ${c('flipInterval')} (حدود ۴ ثانیه) عوض می‌شن`, B],
          ['عدد نقطه‌ای', '—', `تصویری که اپ با جدول ۵ × ۷ (${c('dots.js')}) می‌کشه، یا ${c('Text')} ساده اگه RemoteViews سنگین شد`, A],
          ['لمس', '—', `${c('setPendingIntentTemplate')} + ${c('setOnClickFillInIntent')}: فریم میانگین ← ${c('netrate://rates?…')}، فریم هر صرافی ← ${c('netrate://office/<id>?…')}`, A],
          ['اندازه', '—', 'حدود ۳۳۶ × ۷۲dp (۴ × ۱)', A],
        ]) },
        { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
          ['فریم‌ها خودشون عوض می‌شن، متن‌ها اسلاید می‌شن، نقطه‌های عدد موج برمی‌دارن', B, `${c('AdapterViewFlipper')} با انیمیشن ورود و خروج (ثابت تعریف‌شده). موج نقطه‌ها فقط نمایشیه.`],
          ['شمارنده‌ی تابلویی هنگام ورود، نقطه‌های زیر ماوس درشت می‌شن', C, 'ثابت'],
        ]) + NR.p('کلید «حرکت‌های فقط‌نمایشی» چرخش خودکار فریم‌ها رو هم خاموش می‌کنه (تا ببینی هر فریم تنهایی چطوره)؛ با «فریم بعدی» دستی هم جلو می‌ره.') },
        { title: 'داده، جمله‌ی TalkBack و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
          [c('market.average / average_change_pct'), 'فریم ۱'], [c('best[0..2].exchange.id، rate، change_pct، recorded_at'), 'فریم‌های ۲ تا ۴ (نام از جدول ' + c('offices') + ')'], [c('market.recorded_at'), 'سن فریم میانگین'], [c('market.status'), 'چیپ وضعیت روی هر فریم'],
        ]) + NR.p(`جمله‌ی TalkBack (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul(['هیچ.']) },
        { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
          '<b>پنج کارت نمونه‌ی ۰۴ یه نوار شد؛</b> ردیف تیک (کدوم فریم) و عدد نقطه‌ای مونده، آیکون قرص و نمودار رفته.',
          '<b>همه‌ی صرافی‌ها برابرن:</b> سه فریم صرافی یک‌شکل و یک‌اندازه‌ان؛ شماره‌ی رتبه فقط یه عدد داخل یه مربع ساده‌ست، نه نور و نه رنگ.',
          '<b>سه صرافی اول به ترتیب نرخه:</b> ارسال: بیشترین تومان اول؛ دریافت: کمترین تومان اول (از ' + c('best[]') + ').',
          '<b>رنگ:</b> فقط فلش و علامت تغییر به رنگ جهت؛ بقیه سفید روی زغال.',
          '<b>فریم‌ها خودشون می‌چرخن:</b> فقط روی اندروید و با RemoteViews ممکنه؛ تو iOS این ویجت وجود نداره.',
        ]) },
      ];
    },
  });
})();
