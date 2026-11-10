/* ==========================================================================
   NetRate widgets · page runtime
   Builds the control bar and one stage per registered widget (NR.register), at
   real size (1 pt = 1 px) or inside a phone mock; applies the controls
   (language, theme, state, render, platform, view, volatile day, display-only
   motion) and hands every widget the same small api:
     api.S()        the controls          api.L        the widget's own settings (direction, range)
     api.model()    the answer object     api.set(p)   change a setting (what an App Intent button does)
     api.animate()  B transitions allowed  api.fx()     display-only (C) effects allowed
     api.link(url)  a tap that opens the app  api.t(path) text from the table
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) { console.warn('[netrate] kit.js missing'); return; }

  const DEFAULTS = { lang: 'fa', theme: 'sample', st: 'normal', render: 'color', platform: 'ios393', view: 'real', stress: 'calm', fx: true };
  const S = Object.assign({}, DEFAULTS);
  const KEY = 'netrate-widgets-v2';
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved) Object.keys(DEFAULTS).forEach(k => { if (saved[k] != null) S[k] = saved[k]; }); } catch (e) { /* storage blocked */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };
  // a URL can pin a control, e.g. ?lang=en&theme=white&st=closed (used by the tests)
  new URLSearchParams(location.search).forEach((v, k) => { if (k in DEFAULTS) S[k] = k === 'fx' ? v !== '0' : v; });
  NR.S = S;

  const CONTROLS = [
    { key: 'lang', label: 'زبان', opts: [['fa', 'فارسی'], ['en', 'English']] },
    { key: 'theme', label: 'تم', opts: [['sample', 'طرح نمونه'], ['white', 'سفید'], ['black', 'سیاه'], ['dawn', 'شفق']] },
    { key: 'st', label: 'حالت', opts: [['normal', 'عادی'], ['not_posted', 'پیش از نرخ'], ['closed', 'یکشنبه'], ['expired', 'منقضی'], ['offline', 'آفلاین'], ['unset', 'تنظیم‌نشده'], ['gallery', 'پیش‌نمایش گالری']] },
    { key: 'render', label: 'رندر', opts: [['color', 'رنگی'], ['tinted', 'تک‌رنگ iOS ۱۸']] },
    { key: 'platform', label: 'پلتفرم', opts: [['ios393', 'iOS ۳۹۳'], ['ios390', 'iOS ۳۹۰'], ['android', 'Android']] },
    { key: 'view', label: 'نما', opts: [['real', 'اندازه‌ی واقعی'], ['phone', 'در قاب گوشی']] },
    { key: 'stress', label: 'نمونه‌ی داده', opts: [['calm', 'نوسان طبیعی'], ['raw', 'فایل نمونه (هموار)'], ['down', 'پرنوسان ↓'], ['up', 'پرنوسان ↑']] },
  ];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  /* ── helpers the widgets' notes use ── */
  NR.lab = l => `<span class="nrs-lab${l === 'C' ? ' is-c' : ''}" title="${{ A: 'همین‌طور که هست ساخته می‌شود', B: 'با دکمه یا تازه شدن ساخته می‌شود', C: 'روی گوشی واقعی نمی‌شود؛ فقط نمایش' }[l]}">${l}</span>`;
  NR.tbl = (head, rows) => `<table><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  NR.ul = items => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  NR.p = t => `<p>${t}</p>`;
  NR.code = t => `<code>${esc(t)}</code>`;
  /* netrate://rates?cur=gbp&type=cash&dir=send — a tap carries the widget's own settings into the app */
  NR.deeplink = (route, L, extra) => {
    const q = NR.data.query, p = [`cur=${q.cur}`, `type=${q.type}`, `dir=${L.dir || q.dir}`];
    if (extra) Object.keys(extra).forEach(k => p.push(`${k}=${extra[k]}`));
    return `netrate://${route}?${p.join('&')}`;
  };

  /* the pre-delivery checklist (brief section 12), the same for every widget; each line is checked by tests/netrate-qa */
  NR.checklist = def => ({
    title: 'چک‌لیست پیش از تحویل',
    html: NR.ul([
      '<b>هر عدد سن دارد:</b> سن عدد اصلی کنارش نوشته می‌شه، هر برگه یا ردیف سن خودش رو داره و تغییر نمودار هم با دکمه‌ی بازه‌ش معلومه. سن از <code>recorded_at</code> و ساعت خود ویجت حساب می‌شه؛ از ۹۰ دقیقه به بعد کهربایی با ساعت.',
      '<b>«تنظیم‌نشده» و «پیش‌نمایش گالری» هیچ رقمی ندارن</b> (فقط شکل‌های خاکستری و یه جمله).',
      '<b>هیچ سبزی نیست</b> و جهت همیشه با فلش و علامت (+ / −) هم خونده می‌شه؛ رتبه با عدد و جای ردیفه، نه رنگ.',
      '<b>هر دو زبان و هر سه تم کامل‌ان:</b> فارسی (راست‌به‌چپ، ارقام فارسی، <code>٬</code> <code>٫</code> <code>٪</code>) و English؛ محور زمان نمودار تو هر دو زبان چپ‌به‌راسته.',
      '<b>تک‌رنگ (iOS ۱۸) خوانا است</b> و کنتراست AA روی همه‌ی ترکیب‌های زبان × تم × رندر × حالت پایین‌تر از ۴٫۵ : ۱ نمی‌ره (متن‌های بزرگ ۳ : ۱).',
      '<b>هیچ پرچم، علامت پول (£ $ ﷼) و ایموجی نیست</b>؛ هیچ داده‌ی شخصی (اسم، نشان‌شده، هشدار، مکان) نیست.',
      '<b>همه‌ی صرافی‌ها برابرن:</b> سه برگه یک‌اندازه، یک‌رنگ و یک‌سایه‌ان و فقط شماره‌ی رتبه فرق می‌کنه (تست می‌کنه که سبک‌هاشون یکیه).',
      '<b>هر جلوه برچسب الف / ب / ج داره</b> (جدول «حرکت‌ها»).',
      '<b>هدف لمس دکمه‌ها ≥ ۴۴ × ۴۴</b> و هر ویجت برای VoiceOver / TalkBack یه جمله‌ی کامله (مثال بالا، جدول «داده»).',
    ]),
  });

  /* ── toast ── */
  let toastEl, toastTimer = 0;
  NR.toast = (html, ms = 3200) => {
    if (!toastEl) return;
    clearTimeout(toastTimer); toastEl.innerHTML = html; toastEl.classList.add('is-on');
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), ms);
  };

  /* ── sizes ── */
  const sizeOf = (def, platform) => (NR.SIZES[platform] || NR.SIZES.ios393)[def.size] || null;
  const phoneW = platform => (platform === 'android' ? 412 : platform === 'ios390' ? 390 : 393);
  const clockText = () => NR.localTime(NR.model(S, { dir: 'send' }).now || Date.parse(NR.data.snapshot.generated_at));

  /* ── a stage ── */
  const stages = [];
  function buildStage(def) {
    const st = { def, L: def.init ? def.init() : {}, inst: null, played: false };
    const art = el('article', 'nrs'); art.id = def.no.toLowerCase();
    art.setAttribute('aria-labelledby', art.id + '-h');
    art.innerHTML = `
      <header class="nrs-head">
        <div class="nrs-id"><span class="nrs-no" aria-hidden="true">${esc(def.no)}</span><div><b id="${art.id}-h">${esc(def.names.fa)}</b><i>${esc(def.name)}</i></div></div>
        <p class="nrs-from">${def.from}</p>
      </header>
      <div class="nrs-body">
        <div class="nrs-show"><div class="nrs-fitbox"><div class="nrs-fit"><div class="nrx js-scope"></div></div></div><p class="nrs-cap js-cap"></p></div>
        <div class="nrs-side">
          <p class="nrs-desc">${def.desc}</p>
          <ul class="nrs-hints">${def.hints.map(h => `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${h[0]}"/></svg><span>${h[1]}</span></li>`).join('')}</ul>
          <ul class="nrs-legend" aria-label="برچسب ساخت‌پذیری"><li>${NR.lab('A')}همین‌طور که هست ساخته می‌شود</li><li>${NR.lab('B')}با دکمه یا تازه شدن</li><li>${NR.lab('C')}فقط نمایش</li></ul>
          <div class="nrs-actions"><button class="nrc-act js-refresh" type="button">تازه‌سازی این ویجت</button>${(def.actions || []).map((a, i) => `<button class="nrc-act js-action" data-i="${i}" type="button">${a.label}</button>`).join('')}${def.config && def.config.dir ? `<div class="nrc-g" role="group" aria-label="ویرایش ویجت: جهت"><b>ویرایش ویجت · جهت</b><div class="nrc-seg">${[['send', 'ارسال به ایران'], ['recv', 'دریافت از ایران']].map(o => `<button type="button" data-cfg-dir="${o[0]}" aria-pressed="${st.L.dir === o[0]}">${o[1]}</button>`).join('')}</div></div>` : ''}</div>
        </div>
      </div>
      <div class="nrs-notes">${(typeof def.notes === 'function' ? def.notes() : def.notes).concat([NR.checklist(def)]).map((n, i) => `<details${i === 0 ? ' open' : ''}><summary>${n.title}</summary><div class="nrs-sec">${n.html}</div></details>`).join('')}</div>`;
    st.art = art; st.scope = art.querySelector('.js-scope'); st.cap = art.querySelector('.js-cap');
    st.fit = art.querySelector('.nrs-fit'); st.fitbox = art.querySelector('.nrs-fitbox'); st.show = art.querySelector('.nrs-show');
    st.root = el('div', 'nrw');
    st.in = el('div', 'nrw-in'); st.root.appendChild(st.in);
    art.querySelector('.js-refresh').addEventListener('click', () => refresh(st));
    art.querySelectorAll('.js-action').forEach(b => b.addEventListener('click', () => { const a = (def.actions || [])[+b.dataset.i]; if (a && st.inst && st.inst[a.fn]) st.inst[a.fn](); }));
    art.querySelectorAll('[data-cfg-dir]').forEach(b => b.addEventListener('click', () => {   // the widget's own setting ("Edit widget"), not a button on it
      st.L.dir = b.dataset.cfgDir; art.querySelectorAll('[data-cfg-dir]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      if (st.inst) st.inst.update({ animate: true });
    }));
    stages.push(st);
    return st;
  }

  function makeApi(st) {
    const api = {
      S: () => S, L: st.L, stage: st,
      model: () => NR.model(S, st.L),
      t: path => NR.t(S.lang, path),
      animate: () => !NR.reduced() && S.platform !== 'android',   // B: transitions iOS runs at a refresh or a button press
      fx: () => S.fx && !NR.reduced(),                               // C: display-only effects
      set(patch, opt) { Object.assign(st.L, patch); if (st.inst) st.inst.update(Object.assign({ animate: true, button: true }, opt)); },
      link(url) { NR.toast(`${S.lang === 'fa' ? 'ویجت اپ را باز می‌کند' : 'Opens the app'}: <code>${esc(url)}</code>`); },
      toast: NR.toast,
      size: () => sizeOf(st.def, S.platform),
    };
    return api;
  }

  function mount(st, opt = {}) {
    const size = sizeOf(st.def, S.platform);
    if (st.inst && st.inst.destroy) st.inst.destroy();
    const fresh = el('div', 'nrw-in'); st.in.replaceWith(fresh); st.in = fresh;   // a new host: no listeners from the previous mount survive
    st.root.className = 'nrw'; st.root.setAttribute('dir', S.lang === 'fa' ? 'rtl' : 'ltr'); st.root.setAttribute('lang', S.lang);
    if (!size) { st.root.style.width = '300px'; st.root.style.height = '120px'; st.in.innerHTML = `<div class="nrw-card" style="display:grid;place-items:center;padding:20px;text-align:center;font-size:13px;color:var(--ink3)">این اندازه روی ${S.platform === 'android' ? 'Android' : 'iOS'} وجود ندارد</div>`; st.inst = null; layout(st); return; }
    st.root.style.width = size[0] + 'px'; st.root.style.height = size[1] + 'px';
    st.api = makeApi(st);
    st.inst = st.def.mount(st.in, st.api);
    if (st.inst.fx) st.inst.fx(S.fx);
    st.inst.update({ animate: false, first: true });
    layout(st);
    if (opt.intro && st.inst.intro) st.inst.intro();
  }

  /* the frame around the widget: real size on the home-screen colour, or inside a phone */
  function layout(st) {
    const sc = st.scope;
    sc.dataset.theme = S.theme; sc.dataset.skin = st.def.id; sc.dataset.render = S.render; sc.dataset.platform = S.platform.startsWith('ios') ? 'ios' : 'android'; sc.dataset.lang = S.lang; sc.dataset.view = S.view; sc.dataset.lock = st.def.lock ? '1' : '0';
    const size = sizeOf(st.def, S.platform), root = st.root;
    sc.textContent = '';
    if (S.view === 'phone' && size) {
      const w = phoneW(S.platform), and = S.platform === 'android';
      const phone = el('div', 'nrp' + (st.def.lock ? ' is-lock' : '')); phone.style.width = w + 'px';
      const iconRows = and ? 2 : 2;
      if (st.def.lock) {
        const nowMs = NR.model(S, { dir: 'send' }).now || Date.parse(NR.data.snapshot.generated_at), wd = new Date(nowMs).getUTCDay();
        phone.innerHTML = `<div class="nrp-status"><span></span><i></i></div><div class="nrp-island"></div>
          <div class="nrp-lock"><p class="nrp-lockdate">${NR.weekday(wd === 0 ? 7 : wd, S.lang)}</p>${st.def.size === 'lock-inline' ? '<div class="js-slot"></div>' : ''}<p class="nrp-lockclock">${clockText()}</p>${st.def.size === 'lock-inline' ? '' : '<div class="js-slot"></div>'}</div>
          <div class="nrp-lockbtns"><i></i><i></i></div>`;
        phone.querySelector('.js-slot').appendChild(root); sc.appendChild(phone);
      } else
      phone.innerHTML = `<div class="nrp-status"><span>${clockText()}</span><i></i></div><div class="nrp-island${and ? ' is-hole' : ''}"></div>
        <div class="nrp-body">${and ? '<div class="nrp-search"></div>' : ''}<div class="js-slot"></div>
        <div class="nrp-icons${and ? ' is-and' : ''}">${Array.from({ length: iconRows * 4 }, () => '<div><b></b><i></i></div>').join('')}</div></div><div class="nrp-fade"></div>`;
      phone.querySelector('.js-slot').appendChild(root);
      sc.appendChild(phone);
    } else {
      const real = el('div', 'nrr' + (st.def.lock ? ' is-lock' : '')); real.appendChild(root); sc.appendChild(real);
    }
    st.cap.textContent = size ? `${S.platform.startsWith('ios') ? 'iOS' : 'Android'} · ${size[0]} × ${size[1]} ${S.platform.startsWith('ios') ? 'pt' : 'dp'} · 1 : 1` : '';
    fit(st);
  }
  function fit(st) {
    st.fit.style.transform = ''; st.fitbox.style.height = '';
    const cs = getComputedStyle(st.show), avail = st.show.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), w = st.fit.offsetWidth, h = st.fit.offsetHeight;
    if (!avail || !w) return;
    const f = Math.min(1, avail / w);
    if (f < 1) { st.fit.style.transform = `scale(${f.toFixed(4)})`; st.fitbox.style.height = Math.ceil(h * f) + 'px'; st.fit.dataset.scaled = f.toFixed(2); }
    else delete st.fit.dataset.scaled;
  }

  function refresh(st) {
    if (st.inst && st.inst.refresh) st.inst.refresh();
    else if (st.inst) st.inst.update({ animate: true });
  }

  /* ── controls ── */
  function buildControls(host) {
    host.innerHTML = CONTROLS.map(c => `<div class="nrc-g" role="group" aria-label="${c.label}"><b>${c.label}</b><div class="nrc-seg">${c.opts.map(o => `<button type="button" data-k="${c.key}" data-v="${o[0]}" aria-pressed="${S[c.key] === o[0]}">${o[1]}</button>`).join('')}</div></div>`).join('')
      + `<div class="nrc-g nrc-fx"><button class="nrc-act js-fx" type="button" aria-pressed="${S.fx}" title="حرکت‌هایی که طرح نمونه دارد ولی روی گوشی واقعی ساخته نمی‌شوند (برچسب ج)">حرکت‌های فقط‌نمایشی (ج)</button><button class="nrc-act js-refresh-all" type="button">تازه‌سازی همه</button></div>`;
    host.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.k) { set(b.dataset.k, b.dataset.v); return; }
      if (b.classList.contains('js-fx')) { S.fx = !S.fx; b.setAttribute('aria-pressed', String(S.fx)); save(); stages.forEach(st => st.inst && st.inst.fx && st.inst.fx(S.fx)); if (S.fx) stages.forEach(refresh); }
      if (b.classList.contains('js-refresh-all')) stages.forEach(refresh);
    });
  }
  function set(k, v) {
    if (S[k] === v) return;
    S[k] = v; save();
    document.querySelectorAll(`.nrc-seg button[data-k="${k}"]`).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
    if (k === 'lang' || k === 'platform') stages.forEach(st => { mount(st); });
    else if (k === 'theme' || k === 'render' || k === 'view') stages.forEach(layout);
    else stages.forEach(st => st.inst && st.inst.update({ animate: true, state: true }));
    if (k === 'view') stages.forEach(layout);
    document.documentElement.lang = 'fa';
  }
  NR.setControl = set;

  /* ── start ── */
  function init() {
    const host = document.getElementById('nr-stages'), bar = document.getElementById('nr-controls');
    if (!host || !bar) return;
    toastEl = document.querySelector('.nr-toast');
    buildControls(bar);
    NR.widgets.forEach(def => { const st = buildStage(def); host.appendChild(st.art); });
    const idx = document.getElementById('nr-index');
    if (idx) idx.innerHTML = NR.widgets.map(d => `<a href="#${d.no.toLowerCase()}"><b>${d.no}</b>${esc(d.names.fa)}</a>`).join('');
    const start = () => {
      stages.forEach(st => { layout(st); mount(st); });
      const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(en => {
        const st = stages.find(s => s.art === en.target); if (!st) return;
        if (st.inst && st.inst.setVisible) st.inst.setVisible(en.isIntersecting);
        if (en.isIntersecting && !st.played && en.intersectionRatio > .25) { st.played = true; if (S.fx && st.inst && st.inst.intro && !NR.reduced()) st.inst.intro(); }
      }), { threshold: [0, .25, .5] }) : null;
      stages.forEach(st => { if (io) io.observe(st.art); else st.played = true; });
      addEventListener('resize', () => stages.forEach(fit));
      document.fonts && document.fonts.ready && document.fonts.ready.then(() => stages.forEach(fit));
    };
    (document.fonts && document.fonts.load ? Promise.all(['300 40px Vazirmatn', '400 14px Vazirmatn', '600 14px Vazirmatn'].map(f => document.fonts.load(f, '۰۱۲۳۴۵۶۷۸۹ابپ0123'))).catch(() => {}) : Promise.resolve()).then(() => setTimeout(start, 0));
    // the slow-motion switch also stretches the CSS animations
    document.addEventListener('lab:timescale', e => document.documentElement.style.setProperty('--nr-ts', String(1 / (e.detail || 1))));
  }
  NR.stages = stages;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
