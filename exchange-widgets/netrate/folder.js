/* ==========================================================================
   NetRate · the folder card (sample 07) as an exchange-office list.  NR.registerOffices(cfg) registers one list widget.
   Sample 07's cards are black "folders": the top edge is raised on the start side (the tab holds the title) and lowered on the other
   side, where a small "•••" sits; a bright strip carries the content. Here the strip is a light panel with one row per office
   (rank, name and city, rate and age, change, and on the large size the distance from the market average); the "•••" button
   switches the direction (Send to Iran ⇄ Receive from Iran), which re-ranks the rows. Every row has one style: rank is a numeral only.
   Reads one answer object (NR_DATA shape): `best[]` (rank, exchange, rate, change_pct, better_than_average_pct, recorded_at), `market`.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const TEXT = {
    fa: { title: 'صرافی‌ها', toggle: 'جهت، {dir}؛ برای عوض کردن بزن', row: 'رتبه {n}، {name}، {rate} تومان', vsAvg: 'از میانگین', avgLine: 'میانگین بازار', gallery: 'صرافی‌ها', galleryLine: 'رتبه، نام، شهر، نرخ و تغییر', say: '{title}، {dir}؛ {rows}؛ {age}' },
    en: { title: 'Offices', toggle: 'Direction, {dir}; tap to change', row: 'rank {n}, {name}, {rate} toman', vsAvg: 'vs average', avgLine: 'Market average', gallery: 'Offices', galleryLine: 'Rank, name, city, rate and change', say: '{title}, {dir}; {rows}; {age}' },
  };
  let uid = 0;

  function view(vm, lang, rows) {
    const T = NR.text[lang], X = TEXT[lang], recv = vm.dir === 'recv', list = vm.best.slice(0, rows);
    return {
      rows: list.map((b, i) => {
        const chg = NR.sign(b.change_pct), vs = NR.num(b.better_than_average_pct), vsSign = vs === 0 ? '' : recv ? '−' : '+';
        return { rank: NR.digits(i + 1, lang), id: b.exchange.id, name: NR.office(b.exchange.id, lang, b.exchange.name).name, city: NR.office(b.exchange.id, lang).city, rate: NR.int(b.rate, lang), age: vm.ageOf(b.recorded_at),
          chg, pct: NR.pct(b.change_pct, lang, { noSign: true }), sign: chg > 0 ? '+' : chg < 0 ? '−' : '', vs: vsSign + NR.pct(b.better_than_average_pct, lang, { noSign: true }) };
      }),
      dir: T.dir[vm.dir], avg: NR.int(vm.market.average, lang), posted: NR.fill(T.posted, { n: NR.digits(vm.market.posted, lang) }), age: vm.topAge,
    };
  }
  const say = (vm, v, lang) => {
    const T = NR.text[lang], X = TEXT[lang], sep = lang === 'fa' ? '، ' : ', ';
    const rows = v.rows.map(r => NR.fill(X.row, { n: r.rank, name: r.name, rate: r.rate })).join(lang === 'fa' ? '؛ ' : '; ');
    return (vm.banner ? T.state[vm.banner] + sep : '') + NR.fill(X.say, { title: X.title, dir: v.dir, rows, age: v.age.text });
  };

  NR.registerOffices = cfg => {
    const rows = cfg.rows, large = !!cfg.large;
    NR.register({
      id: cfg.id, no: cfg.no, name: cfg.id, from: 'از روی ویجت ۰۷ · کارت‌های پوشه‌ای', size: cfg.size, names: cfg.names,
      desc: cfg.desc,
      hints: [
        ['M4 12h4M10 12h4M16 12h4', '<b>⋯</b> جهت رو بین «ارسال به ایران» و «دریافت از ایران» عوض می‌کنه؛ صرافی‌ها دوباره رتبه می‌گیرن (App Intent).'],
        ['M12 3v4M12 17v4M3 12h4M17 12h4', '<b>لمس هر ردیف</b> اپ رو روی همون صرافی باز می‌کنه؛ لمس بالا یا پایین فهرست کامل رو.'],
        ['M5 12a7 7 0 1 0 2-5M5 4v4h4', '<b>حرکت‌های فقط‌نمایشی:</b> ردیف‌ها با ماوس بالا میان، کارت به سمتت خم می‌شه، ورود ردیف‌به‌ردیف.'],
      ],
      init: () => ({ dir: 'send' }),

      mount(host, api) {
        const lang = api.S().lang, T = NR.text[lang], X = TEXT[lang];
        const size = api.size(), U = size[0] / 364, H = size[1] / U;
        host.innerHTML = `
        <div class="nrw-tilt js-tilt"><div class="nrw-card nrf-card ${large ? 'is-large' : 'is-medium'}" role="group" style="--H:${H.toFixed(1)}">
          <i class="nrf-tab" aria-hidden="true"></i><i class="nrf-fillet" aria-hidden="true"></i><i class="nrf-body" aria-hidden="true"></i><i class="nrf-floor" aria-hidden="true"></i>
          <div class="nrf-head"><h3 class="nrf-title js-title"></h3><span class="nrf-dir js-dir"></span><span class="nr-banner js-banner nrf-banner" hidden></span></div>
          <button type="button" class="nrf-more js-more" aria-label=""><i></i><i></i><i></i></button>
          <div class="nrf-strip js-strip">${Array.from({ length: rows }, (_, i) => `
            <a class="nrf-row" href="#" data-i="${i}">
              <b class="nrf-rank js-rank"></b>
              <span class="nrf-who"><b class="js-name"></b><i class="js-city"></i></span>
              <span class="nrf-rate"><b class="js-rate"></b><span class="nr-age js-rowage"></span></span>
              <span class="nrf-chg"><b class="js-chg"><span class="js-ci"></span><span class="js-cp"></span></b>${large ? '<i class="nrf-vs js-vs"></i>' : ''}</span>
            </a>`).join('')}</div>
          ${large ? '<a class="nrf-foot" href="#"><span class="js-avg"></span><span class="js-posted"></span></a>' : ''}
          <div class="nrf-empty js-empty" hidden>
            ${NR.ph({ s: 16, t: 14, w: 86, h: 15, r: 6 })}${NR.ph({ e: 22, t: 14, w: 30, h: 8, r: 4 })}
            ${NR.ph({ s: 12, e: 12, t: large ? 66 : 42, b: large ? 74 : 12, r: 16 })}
            <div class="nrf-emptytext"><span class="nr-banner is-lg js-emptybanner"></span><p class="js-emptyline"></p></div>
          </div>
        </div></div>`;
        const $ = s => host.querySelector(s), $$ = s => [...host.querySelectorAll(s)], card = $('.nrf-card'), tilt = $('.js-tilt'), root = host.parentNode;
        const els = { title: $('.js-title'), dir: $('.js-dir'), banner: $('.js-banner'), more: $('.js-more'), strip: $('.js-strip'), empty: $('.js-empty'), emptyBanner: $('.js-emptybanner'), emptyLine: $('.js-emptyline'), avg: $('.js-avg'), posted: $('.js-posted'), foot: $('.nrf-foot') };
        const rowEls = $$('.nrf-row').map(a => ({ a, rank: a.querySelector('.js-rank'), name: a.querySelector('.js-name'), city: a.querySelector('.js-city'), rate: a.querySelector('.js-rate'), age: a.querySelector('.js-rowage'), ci: a.querySelector('.js-ci'), cp: a.querySelector('.js-cp'), vs: a.querySelector('.js-vs') }));
        let prevRates = [];

        function render(o = {}) {
          const vm = api.model(), anim = !!o.animate && api.animate();
          root.classList.toggle('is-dim', !!vm.dim);
          els.empty.hidden = !vm.empty; card.classList.toggle('is-empty', !!vm.empty);
          if (vm.empty) {
            const gal = vm.st === 'gallery';
            els.emptyBanner.innerHTML = gal ? `<b>${X.gallery}</b>` : NR.bannerIcon('unset') + `<span>${T.state.unset}</span>`; els.emptyBanner.classList.toggle('is-gal', gal);
            els.emptyLine.textContent = gal ? X.galleryLine : ''; els.emptyLine.hidden = !gal;
            card.setAttribute('aria-label', gal ? `${X.gallery}. ${X.galleryLine}` : T.state.unset); prevRates = []; return;
          }
          const v = view(vm, lang, rows); card.classList.toggle('has-banner', !!vm.banner);
          els.title.textContent = X.title; els.dir.textContent = v.dir;
          if (vm.banner) { els.banner.hidden = false; els.banner.className = 'nr-banner nrf-banner js-banner' + (vm.banner === 'closed' ? '' : ' is-warn'); els.banner.innerHTML = NR.bannerIcon(vm.banner) + `<span>${T.state[vm.banner]}</span>`; } else els.banner.hidden = true;
          els.more.setAttribute('aria-label', NR.fill(X.toggle, { dir: v.dir }));
          rowEls.forEach((re, i) => {
            const r = v.rows[i]; if (!r) { re.a.hidden = true; return; } re.a.hidden = false;
            re.rank.textContent = r.rank; re.name.textContent = r.name; re.city.textContent = r.city; re.rate.textContent = r.rate; NR.setAge(re.age, r.age);
            re.ci.innerHTML = NR.dirIcon(r.chg); re.cp.innerHTML = NR.n(r.sign + r.pct); re.a.dataset.dir = r.chg > 0 ? 'up' : r.chg < 0 ? 'down' : 'flat';
            if (re.vs) re.vs.innerHTML = `${NR.n(r.vs)} ${X.vsAvg}`;
            re.a.setAttribute('href', NR.deeplink('office/' + r.id, api.L));
            if (anim && prevRates[i] != null && prevRates[i] !== r.rate) { re.a.animate([{ opacity: .15, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 380 / NR.scale(), delay: i * 50 / NR.scale(), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }); }
          });
          prevRates = v.rows.map(r => r.rate);
          if (els.avg) { els.avg.innerHTML = `${X.avgLine} ${NR.n(v.avg)}`; els.posted.textContent = v.posted; els.foot.setAttribute('href', NR.deeplink('rates', api.L)); }
          card.setAttribute('aria-label', say(vm, v, lang));
        }
        host.addEventListener('click', e => {
          const more = e.target.closest('.js-more'), a = e.target.closest('a[href]');
          if (more) { e.preventDefault(); api.set({ dir: api.L.dir === 'send' ? 'recv' : 'send' }); return; }
          if (a) { e.preventDefault(); api.link(a.getAttribute('href')); }
        });

        /* ── C: display-only: the card leans toward the pointer, the row under it lifts, rows slide in on entry ── */
        let fx = false, raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
        const loop = () => { cx += (tx - cx) * .12; cy += (ty - cy) * .12; tilt.style.transform = `perspective(1100px) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`; raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .01) ? requestAnimationFrame(loop) : 0; };
        const onMove = e => { if (!fx || e.pointerType === 'touch') return; const b = root.getBoundingClientRect(), nx = (e.clientX - b.left) / b.width * 2 - 1, ny = (e.clientY - b.top) / b.height * 2 - 1; tx = nx * 3.5; ty = -ny * 4; if (!raf) raf = requestAnimationFrame(loop); };
        const onLeave = () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(loop); };
        root.addEventListener('pointermove', onMove, { passive: true }); root.addEventListener('pointerleave', onLeave);
        function setFx(on) { fx = !!on && !NR.reduced(); root.classList.toggle('is-fx', fx); if (!fx) tilt.style.transform = ''; }
        function intro() { if (!fx) return; const vm = api.model(); if (vm.empty) return; card.classList.remove('is-intro'); void card.offsetWidth; card.classList.add('is-intro'); rowEls.forEach((re, i) => re.a.style.setProperty('--i', i)); setTimeout(() => card.classList.remove('is-intro'), 2400 / NR.scale()); }
        function refresh() { const vm = api.model(); if (vm.empty) return; if (api.fx()) intro(); requestAnimationFrame(() => render({ animate: true })); }
        return { update: o => render(o || {}), refresh, intro, fx: setFx, setVisible: () => {}, destroy: () => { cancelAnimationFrame(raf); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); root.classList.remove('is-fx'); } };
      },
      qa: (vm, lang) => ({ number: NR.int(vm.top.rate, lang), age: vm.topAge.text }),
      notes: () => {
        const A = NR.lab('A'), B = NR.lab('B'), C = NR.lab('C'), c = NR.code;
        const sample = lang => { const vm = NR.model({ lang, st: 'normal' }, { dir: 'send' }); return say(vm, view(vm, lang, rows), lang); };
        return [
          { title: 'ساخت · WidgetKit و Glance', html: NR.tbl(['بخش', 'iOS · SwiftUI + WidgetKit', 'Android · Glance', 'برچسب'], [
            ['شکل پوشه', `${c('containerBackground')} با رنگ پشت پوشه؛ خود پوشه یه ${c('Shape')} سفارشی (کمان‌های گوشه + زبانه) با ${c('.fill(.black)')}`, 'بیت‌مپ پس‌زمینه‌ی ثابت (اپ می‌کشه)', A],
            ['نوار روشن و ردیف‌ها', `یه ${c('VStack')} از ${rows} ردیف ${c('HStack')} (رتبه، نام و شهر، نرخ و سن، تغییر)؛ هر ردیف ${c('Link(destination:)')}`, `${c('Column')} از ${rows} ${c('Row')} با ${c('actionStartActivity')} جدا برای هر ردیف`, A],
            ['دکمه‌ی ⋯', `${c('Button(intent: ToggleDirectionIntent())')} (هدف لمس ۵۰ × ۵۰)`, c('actionRunCallback'), B],
            ['رقم‌ها', `${c('.contentTransition(.numericText())')} هنگام تازه شدن یا عوض شدن جهت`, 'فوری', B],
            ['اندازه', cfg.large ? 'بزرگ: ۳۶۴ × ۳۸۲ و ۳۳۸ × ۳۵۴' : 'متوسط: ۳۶۴ × ۱۷۰ و ۳۳۸ × ۱۵۸', cfg.large ? 'حدود ۳۳۶ × ۳۴۰dp (۴ × ۴)' : 'حدود ۳۳۶ × ۱۶۰dp (۴ × ۲)', A],
          ]) },
          { title: 'حرکت‌ها · الف / ب / ج', html: NR.tbl(['جلوه', 'برچسب', 'روی گوشی / نزدیک‌ترین نسخه'], [
            ['با ⋯ ردیف‌ها دوباره رتبه می‌گیرن؛ ردیف‌ها لغزان جایگزین می‌شن و رقم‌ها می‌غلتن', B, `iOS: ${c('.transition(.opacity)')} و ${c('.contentTransition')}؛ Android: فوری`],
            ['ورود: ردیف‌ها یکی‌یکی از پایین میان', C, 'ورود ساده هنگام تازه شدن (ب)'],
            ['کارت به سمت اشاره‌گر خم می‌شه', C, 'کارت صاف'],
            ['ردیف زیر ماوس بالا می‌آد', C, 'ندارد'],
          ]) },
          { title: 'داده، جمله‌ی VoiceOver و درخواست داده', html: NR.tbl(['فیلد', 'کجا استفاده می‌شه'], [
            [c('best[].rank'), 'ترتیب ردیف‌ها (فقط عدد)'], [c('best[].exchange'), 'نام (از جدول ' + c('offices') + ') و شهر'], [c('best[].rate'), 'نرخ'], [c('best[].change_pct'), 'تغییر'], [c('best[].recorded_at'), 'سن هر ردیف'],
            ...(cfg.large ? [[c('best[].better_than_average_pct'), 'فاصله از میانگین (علامت از جهت)'], [c('market.average / posted'), 'سطر پایین']] : []), [c('market.status'), 'چیپ وضعیت'],
          ]) + NR.p(`جمله‌ی VoiceOver (فارسی): <b>${sample('fa')}</b>`) + NR.p(`English: <b dir="ltr">${sample('en')}</b>`) + '<p><b>درخواست داده</b></p>' + NR.ul([`${c('best')} برای ${c('direction=recv')} هست و فقط ۵ ردیف داره؛ اگه بخوایم ردیف‌های بیشتری (مثلاً ۸) داشته باشیم باید بیاد.`]) },
          { title: 'تفاوت‌ها با نمونه و چرا', html: NR.ul([
            '<b>شش کارت پوشه‌ای نمونه (ساعت، پرواز، پیاده‌روی…) یه فهرست شد.</b> شکل پوشه (زبانه‌ی بلند سمت شروع، سمت دیگه پایین‌تر با ⋯)، کارت سیاه و نوار روشن مونده؛ محتوا صرافی‌هاست.',
            '<b>نوار نئونی سبز/زرد/نارنجی نمونه شد نوار روشن خنثی</b> (نقره‌ای): رنگ فقط جهته و سبز هرگز؛ فلش‌های تغییر روی نوار آبی و مرجانی با علامتن.',
            '<b>⋯ نمونه (منو) شد دکمه‌ی جهت.</b>',
            '<b>هیچ ردیفی ویژه نیست:</b> همه‌ی ردیف‌ها یک اندازه و یک‌رنگن؛ فقط شماره‌ی رتبه فرق می‌کنه. نور کف کارت (نمونه) فقط یه سایه‌ی خنثیه.',
            '<b>سن هر ردیف</b> کنار نرخشه (نمونه سن نداشت).',
          ]) },
        ];
      },
    });
  };
})();
