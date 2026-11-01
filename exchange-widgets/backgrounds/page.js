/* ==========================================================================
   Background Lab · page
   - a tile per background (engine.js SCENES): live frame + caption
   - one animation loop for the tiles in view (only the viewer while it's open)
   - pointer: move = swell and sweep · press = ripple · hold = pull · drag = stir
   - viewer: full window, previous / next, pause, real fullscreen, downloads
   - downloads: PNG at phone and desktop sizes, through the Artifact
     `downloads` capability inside claude.ai, else a plain download link
   ========================================================================== */
(() => {
  'use strict';
  const BG = window.BGLab;
  if (!BG) { console.warn('[bg] engine.js missing'); return; }
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const Lab = window.WidgetLab || { timeScale: 1, still: false, get reduced() { return mqReduce.matches; } };

  const SIZES = { phone: { w: 1179, h: 2556, fa: 'موبایل' }, desktop: { w: 2560, h: 1440, fa: 'دسکتاپ' } };
  const FA = '۰۱۲۳۴۵۶۷۸۹';
  const fa = s => String(s).replace(/\d/g, d => FA[d]);
  const two = n => String(n).padStart(2, '0');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const SVG = d => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
  const ICON = {
    open: SVG('<path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5"/>'),
    phone: SVG('<rect x="7" y="2.5" width="10" height="19" rx="2.6"/><path d="M11 18.6h2"/>'),
    desktop: SVG('<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M9 20.5h6M12 16.5v4"/>'),
  };

  let root, toastEl, toastTimer = 0, grainOn = true, raf = 0, last = 0, frameNo = 0;
  const items = [];
  const shown = new Set();

  /* a background's signature colour: its most vivid spot (for the number dot and the page glow) */
  function accentOf(scene) {
    const f = BG.compile(scene), [W, H] = scene.size, out = [0, 0, 0];
    f.prepare(12, null);
    let best = null, bestScore = -1;
    for (let j = 1; j < 12; j++) for (let i = 1; i < 16; i++) {
      f.color(i / 16 * W, j / 12 * H, out);
      const [L, a, b] = BG.rgb2lab(clamp(out[0], 0, 255), clamp(out[1], 0, 255), clamp(out[2], 0, 255));
      const score = Math.hypot(a, b) * (.35 + L);
      if (score > bestScore) { bestScore = score; best = out.map(v => clamp(Math.round(v), 0, 255)); }
    }
    return best;
  }
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

  /* ───────────── tiles ───────────── */
  // a set's card number (06·2) stays left to right, like the gallery writes it
  const wnum = n => (n.includes('·') ? `<bdi dir="ltr">${n}</bdi>` : fa(n));
  function fromText(s) {
    if (s.from === 'lab') return 'از پس‌زمینه‌ی گالری';
    if (s.from) return `از ویجت ${wnum(s.from)}`;
    return `تازه · هارمونی ${wnum(s.kin)}`;
  }
  function tileHTML(s, hero) {
    return `<article class="bgl-tile${hero ? ' is-hero' : ''}" data-id="${s.id}" aria-labelledby="bgl-t${s.id}">
  <div class="bgl-frame">
    <canvas class="bgl-field" role="img" aria-label="${s.fa} (${s.name})، بک‌گراند زنده"></canvas>
    ${s.overlay ? '<canvas class="bgl-over" aria-hidden="true"></canvas>' : ''}
    <i class="bgl-grain" aria-hidden="true"></i>
    <span class="bgl-num" aria-hidden="true"><i></i>BG·${two(s.id)}</span>
    <button class="bgl-open" type="button" aria-label="${s.fa}، تمام‌صفحه" title="تمام‌صفحه">${ICON.open}</button>
  </div>
  <div class="bgl-cap">
    <h3 class="bgl-title" id="bgl-t${s.id}"><b>${s.fa}</b><span lang="en" dir="ltr">${s.name}</span></h3>
    <p class="bgl-from${s.from ? '' : ' is-new'}">بک‌گراند ${fa(s.id)} · ${fromText(s)}</p>
    <p class="bgl-note">${s.note}</p>
    <div class="bgl-acts">
      <button class="bgl-btn js-dl" type="button" data-kind="phone" aria-label="دانلود ${s.fa} برای موبایل">${ICON.phone}<span>موبایل</span></button>
      <button class="bgl-btn js-dl" type="button" data-kind="desktop" aria-label="دانلود ${s.fa} برای دسکتاپ">${ICON.desktop}<span>دسکتاپ</span></button>
    </div>
  </div>
</article>`;
  }

  function buildTiles() {
    const groups = { from: root.querySelector('[data-group="from"]'), new: root.querySelector('[data-group="new"]') };
    let firstNew = true;
    BG.SCENES.forEach((s, i) => {
      const g = s.from ? groups.from : groups.new;
      const hero = i === 0 || (!s.from && firstNew);
      if (!s.from) firstNew = false;
      g.insertAdjacentHTML('beforeend', tileHTML(s, hero));
      const el = g.lastElementChild;
      const item = {
        scene: s, index: i, el, frame: el.querySelector('.bgl-frame'), field: el.querySelector('.bgl-field'), over: el.querySelector('.bgl-over'),
        painter: null, visible: false, played: false, introT: -1, phase: i % 2, accent: accentOf(s), dirty: true,
      };
      el.style.setProperty('--dot', rgba(item.accent, 1));
      item.painter = new BG.Painter(item.field, s, { div: 6, maxPx: hero ? 30000 : 16000, t0: Lab.still ? 12 : 8 + Math.random() * 40 });
      items.push(item);
    });
  }

  /* ───────────── sizing ───────────── */
  const DPR = () => Math.min(2, window.devicePixelRatio || 1);
  function sizeItem(item, w, h) {
    item.painter.resize(w, h);
    if (item.over) {
      const W = Math.round(w * DPR()), H = Math.round(h * DPR());
      if (item.over.width !== W || item.over.height !== H) { item.over.width = W; item.over.height = H; }
    }
    item.dirty = true;
  }
  function drawOverlay(item, painter = item.painter, canvas = item.over, scene = item.scene) {
    if (!canvas || !scene.overlay) return;
    const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const px = (painter.s.px.v * 2 - 1) * painter.s.on.v;
    BG.OVERLAYS[scene.overlay](ctx, W, H, painter.t, { scale: Math.min(W, H) / 900, px });
  }

  /* ───────────── pointer ───────────── */
  function bindPointer(el, getPainter, opt = {}) {
    let rect = null, down = null, leaveTimer = 0;
    const drop = () => { rect = null; };
    addEventListener('scroll', drop, { passive: true, capture: true });
    addEventListener('resize', drop, { passive: true });
    const pos = e => {
      if (opt.screen) return [e.clientX, e.clientY];   // the viewer fills the window
      const r = rect || (rect = el.getBoundingClientRect());
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const live = () => !Lab.reduced;
    el.addEventListener('pointerenter', () => { drop(); if (opt.enter) opt.enter(); });
    el.addEventListener('pointermove', e => {
      const P = getPainter();
      if (!P || !live()) return;
      clearTimeout(leaveTimer);
      const [x, y] = pos(e);
      P.move(x, y, e.pointerType !== 'touch');
      if (opt.move) opt.move(e);
    }, { passive: true });
    el.addEventListener('pointerdown', e => {
      if (e.button > 0 || e.target.closest('button')) return;
      const P = getPainter();
      if (!P || !live()) return;
      clearTimeout(leaveTimer);
      const [x, y] = pos(e);
      P.p.mouse = e.pointerType !== 'touch';
      P.press(x, y, 1.25);
      down = { x: e.clientX, y: e.clientY, t: performance.now(), type: e.pointerType };
      if (opt.down) opt.down(e);
    });
    const up = e => {
      const P = getPainter();
      if (!P) return;
      P.release();
      if (down && opt.swipe && down.type !== 'mouse') {
        const dx = e.clientX - down.x, dy = e.clientY - down.y, dt = performance.now() - down.t;
        if (dt < 380 && Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) opt.swipe(dx);
      }
      down = null;
      if (e.pointerType !== 'mouse') { clearTimeout(leaveTimer); leaveTimer = setTimeout(() => P.leave(), 1100); }
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', () => { const P = getPainter(); if (P) { P.release(); P.leave(); } down = null; });
    el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') { const P = getPainter(); if (P) P.leave(); if (opt.leave) opt.leave(); } });
  }

  /* the page glow takes the colour of the background under the pointer */
  let ambTimer = 0;
  function ambient(c) {
    clearTimeout(ambTimer);
    const el = root.querySelector('.bgl-ambient');
    if (!el) return;
    if (c) el.style.setProperty('--amb', rgba(c, .24));
    else ambTimer = setTimeout(() => el.style.removeProperty('--amb'), 500);
  }

  /* ───────────── the loop ───────────── */
  function tick(item, painter, dt, every, canvas, scene) {
    const motion = Lab.reduced ? 0 : 1;
    const busy = painter.step(dt, motion);
    if (item && item.introT >= 0) {
      item.introT += dt;
      painter.s.expo = easeOut(clamp(item.introT / 1.4, 0, 1));
      if (item.introT > 1.6) { item.introT = -1; painter.s.expo = 1; }
    }
    if (Lab.reduced && !(item ? item.dirty : V.dirty)) return;
    if (busy || every || (item && item.introT >= 0) || (frameNo + (item ? item.phase : 0)) % 2 === 0) {
      painter.draw();
      drawOverlay(item, painter, canvas, scene);
      if (item) item.dirty = false; else V.dirty = false;
    }
  }
  function loop(now) {
    raf = 0;
    const dt = Math.min(.05, (now - (last || now)) / 1000) * (Lab.timeScale || 1);
    last = now; frameNo++;
    if (V.open) {
      if (!V.paused || V.dirty) tick(null, V.painter, V.paused ? 0 : dt, true, V.over, V.scene);
    } else {
      shown.forEach(item => tick(item, item.painter, dt, false, item.over, item.scene));
    }
    if (!document.hidden && (V.open || shown.size)) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf && !document.hidden) { last = 0; raf = requestAnimationFrame(loop); } }

  /* ───────────── downloads ───────────── */
  let saverP = null;
  function getSaver() {
    if (saverP) return saverP;
    saverP = (async () => {
      const c = window.claude;
      if (c && typeof c.use === 'function') {
        let dl = null;
        try { dl = await c.use('downloads'); } catch (e) { dl = null; }
        if (dl) return { kind: 'claude', save: (filename, blob) => dl.save({ filename, data: blob }) };
        if (window.top !== window) return null;   // framed without the capability: nowhere to save
      }
      return {
        kind: 'link',
        save: async (filename, blob) => {
          const url = URL.createObjectURL(blob), a = document.createElement('a');
          a.href = url; a.download = filename; a.rel = 'noopener';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 8000);
          return { status: 'started' };
        },
      };
    })();
    return saverP;
  }
  let busyDl = false;
  async function download(scene, kind, btn, t) {
    if (busyDl) { toast('یکی دیگه در حال ساخته؛ یه لحظه صبر کن'); return; }
    const saver = await getSaver();
    if (!saver) { root.classList.add('no-dl'); toast('دانلود اینجا در دسترس نیست'); return; }
    const Z = SIZES[kind];
    busyDl = true;
    btn.classList.add('is-busy'); btn.style.setProperty('--p', '0'); btn.setAttribute('aria-busy', 'true');
    toast(`در حال ساختن نسخه‌ی ${Z.fa}…`, 0);
    try {
      const cv = await BG.render(scene, Z.w, Z.h, { t, grain: grainOn ? .035 : 0, progress: p => btn.style.setProperty('--p', p.toFixed(3)) });
      const blob = await new Promise((res, rej) => cv.toBlob(b => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/png'));
      const name = `bg-${two(scene.id)}-${scene.slug}-${kind}-${Z.w}x${Z.h}.png`;
      const r = await saver.save(name, blob);
      toast(r && r.status === 'saved' ? 'ذخیره شد' : r && r.status === 'started' ? 'دانلود شروع شد' : 'آماده شد');
    } catch (err) {
      const code = err && err.code;
      if (code === 'declined') toast('دانلود لغو شد');
      else if (code === 'rate_limited') toast('یه پنجره‌ی دانلود بازه؛ یه لحظه بعد دوباره بزن');
      else if (code === 'too_large') toast('این فایل برای این‌جا بزرگه');
      else if (code === 'bad_request' || code === 'transform_error') { toast('ساختن فایل نشد'); console.warn('[bg] download', err); }
      else if (code) { root.classList.add('no-dl'); toast('دانلود اینجا در دسترس نیست'); }
      else { toast('ساختن فایل نشد'); console.warn('[bg] download', err); }
    } finally {
      busyDl = false;
      btn.classList.remove('is-busy'); btn.removeAttribute('aria-busy'); btn.style.removeProperty('--p');
    }
  }

  function toast(msg, ms = 2600) {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    if (ms) toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), ms);
  }

  /* ───────────── the viewer ───────────── */
  const V = { open: false, paused: false, dirty: true, index: 0, scene: null, painter: null, el: null, field: null, prev: null, over: null, from: null, idleTimer: 0, hintTimer: 0, anim: null };
  function sizeViewer() {
    const w = innerWidth, h = innerHeight;
    V.painter.resize(w, h);
    const W = Math.round(w * DPR()), H = Math.round(h * DPR());
    if (V.over.width !== W || V.over.height !== H) { V.over.width = W; V.over.height = H; }
    V.dirty = true;
  }
  function paintViewerInfo() {
    const s = V.scene;
    V.el.querySelector('.js-vnum').innerHTML = `<i style="--dot:${rgba(items[V.index].accent, 1)}"></i>BG·${two(s.id)}`;
    V.el.querySelector('.js-vfa').textContent = s.fa;
    V.el.querySelector('.js-ven').textContent = s.name;
    V.el.setAttribute('aria-label', `${s.fa}، بک‌گراند ${fa(s.id)}`);
    const ctx = V.over.getContext('2d');
    ctx.clearRect(0, 0, V.over.width, V.over.height);
  }
  function wake() {
    V.el.classList.remove('is-idle');
    clearTimeout(V.idleTimer);
    V.idleTimer = setTimeout(() => {
      const f = document.activeElement;
      if (f && f !== V.el && V.el.contains(f) && f.matches(':focus-visible')) return;   // a key user on a button keeps the bar
      V.el.classList.add('is-idle');
    }, 2800);
  }
  function openViewer(i, fromEl) {
    const item = items[i];
    V.index = i; V.scene = item.scene; V.from = fromEl;
    V.painter.setScene(item.scene);
    V.painter.t = item.painter.t;
    V.painter.leave();
    V.open = true; V.dirty = true;
    V.el.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    sizeViewer();
    paintViewerInfo();
    V.painter.draw(); drawOverlay(null, V.painter, V.over, V.scene);
    const hint = V.el.querySelector('.bglv-hint');
    hint.textContent = matchMedia('(hover: none)').matches ? 'بکش · بزن · نگه دار' : 'اشاره‌گر رو تکون بده · کلیک کن · نگه دار';
    hint.classList.remove('is-gone');
    clearTimeout(V.hintTimer); V.hintTimer = setTimeout(() => hint.classList.add('is-gone'), 4200);
    wake();
    // grow out of the tile
    if (V.anim) V.anim.kill();
    const r = fromEl && fromEl.getBoundingClientRect();
    if (r && r.width && !Lab.reduced && window.gsap && gsap.fromTo) {
      const sx = r.width / innerWidth, sy = r.height / innerHeight;
      const ui = V.el.querySelector('.bglv-ui');
      V.anim = gsap.timeline({ onComplete: () => { V.anim = null; } })
        .fromTo(V.el, { x: r.left, y: r.top, scaleX: sx, scaleY: sy, transformOrigin: '0 0', borderRadius: `${26 / sx}px / ${26 / sy}px` },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, borderRadius: '0px / 0px', duration: .8, ease: 'expo.inOut', clearProps: 'transform,borderRadius' })
        .fromTo(ui, { opacity: 0 }, { opacity: 1, duration: .4, clearProps: 'opacity' }, .55);
    }
    V.el.focus({ preventScroll: true });   // keys go to the viewer: arrows, Space, Esc; Tab reaches the buttons
    kick();
  }
  function closeViewer() {
    if (!V.open) return;
    const item = items[V.index];
    const done = () => {
      V.open = false; V.el.hidden = true; V.anim = null;
      document.documentElement.style.overflow = '';
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      // carry the viewer's moment back to the tile
      item.painter.t = V.painter.t; item.dirty = true;
      const btn = item.el.querySelector('.bgl-open');
      if (btn) btn.focus({ preventScroll: true });
      kick();
    };
    if (V.anim) V.anim.kill();
    const r0 = item.frame.getBoundingClientRect();
    if (r0.bottom < 0 || r0.top > innerHeight) item.frame.scrollIntoView({ block: 'center' });
    const r = item.frame.getBoundingClientRect();
    if (!Lab.reduced && window.gsap && gsap.timeline && r.width && !document.fullscreenElement) {
      const sx = r.width / innerWidth, sy = r.height / innerHeight;
      V.anim = gsap.timeline({ onComplete: () => { gsap.set(V.el, { clearProps: 'transform,borderRadius' }); done(); } })
        .to(V.el.querySelector('.bglv-ui'), { opacity: 0, duration: .2, clearProps: 'opacity' }, 0)
        .to(V.el, { x: r.left, y: r.top, scaleX: sx, scaleY: sy, transformOrigin: '0 0', borderRadius: `${26 / sx}px / ${26 / sy}px`, duration: .65, ease: 'expo.inOut' }, 0);
    } else done();
  }
  function go(dir) {
    const n = (V.index + dir + items.length) % items.length;
    // the old frame fades out over the new one
    V.prev.width = V.painter.cw; V.prev.height = V.painter.ch;
    V.prev.getContext('2d').drawImage(V.field, 0, 0);
    V.index = n; V.scene = items[n].scene;
    V.painter.setScene(V.scene);
    V.painter.t = items[n].painter.t;
    V.dirty = true;
    paintViewerInfo();
    V.painter.draw(); drawOverlay(null, V.painter, V.over, V.scene);
    if (!Lab.reduced) {
      const x = dir > 0 ? V.painter.cssW * .12 : V.painter.cssW * .88;
      V.painter.ripple(x, V.painter.cssH * .5, 1.4);
      if (window.gsap && gsap.fromTo) gsap.fromTo(V.prev, { opacity: 1 }, { opacity: 0, duration: .9, ease: 'power2.out' });
    }
    wake();
  }
  function togglePause(force) {
    V.paused = force == null ? !V.paused : force;
    const b = V.el.querySelector('[data-v="pause"]');
    b.setAttribute('aria-pressed', String(V.paused));
    b.setAttribute('aria-label', V.paused ? 'ادامه‌ی حرکت' : 'نگه داشتن حرکت');
  }
  function setupViewer() {
    V.el = root.querySelector('.bgl-viewer');
    V.field = V.el.querySelector('.bgl-field'); V.prev = V.el.querySelector('.bglv-prev'); V.over = V.el.querySelector('.bgl-over');
    V.painter = new BG.Painter(V.field, BG.SCENES[0], { div: 5, maxPx: 56000, t0: 12 });
    bindPointer(V.el, () => (V.open && !V.anim ? V.painter : null), {
      screen: true,
      move: wake,
      down: () => { wake(); V.el.querySelector('.bglv-hint').classList.add('is-gone'); },
      swipe: dx => go(dx > 0 ? 1 : -1),   // right to left reading: a swipe to the right brings the next one
    });
    V.el.querySelector('.bglv-close').addEventListener('click', closeViewer);
    V.el.querySelector('[data-v="prev"]').addEventListener('click', () => go(-1));
    V.el.querySelector('[data-v="next"]').addEventListener('click', () => go(1));
    V.el.querySelector('[data-v="pause"]').addEventListener('click', () => togglePause());
    V.el.querySelectorAll('.js-dl').forEach(b => b.addEventListener('click', () => download(V.scene, b.dataset.kind, b, V.painter.t)));
    const fs = V.el.querySelector('.js-fs');
    if (!document.fullscreenEnabled || !V.el.requestFullscreen) root.classList.add('no-fs');
    fs.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else V.el.requestFullscreen().catch(() => root.classList.add('no-fs'));
    });
    document.addEventListener('keydown', e => {
      if (!V.open) return;
      if (e.key === 'Escape') { if (!document.fullscreenElement) { e.preventDefault(); closeViewer(); } return; }
      if (e.target.closest && e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) { wake(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(-1); }
      else if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePause(); }
      else if (e.key === 'f' && !root.classList.contains('no-fs')) fs.click();
      else if (e.key === 'Tab') {   // keep focus inside the viewer
        const f = [...V.el.querySelectorAll('button')].filter(b => b.offsetParent !== null);
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
      wake();
    });
    addEventListener('resize', () => { if (V.open) sizeViewer(); });
  }

  /* ───────────── setup ───────────── */
  function grainTexture() {
    const n = 192, c = document.createElement('canvas');
    c.width = c.height = n;
    const x = c.getContext('2d'), img = x.createImageData(n, n), d = img.data;
    for (let i = 0; i < d.length; i += 4) { const v = 128 + (Math.random() + Math.random() - 1) * 56; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    x.putImageData(img, 0, 0);
    root.style.setProperty('--bgl-grain', `url(${c.toDataURL('image/png')})`);
    root.style.setProperty('--bgl-grain-size', `${(n / DPR()).toFixed(1)}px`);
  }
  function setupGrain() {
    grainOn = false;   // off by default: smooth like the widgets (a faint dither stays, against banding)
    try { grainOn = localStorage.getItem('bg-lab-grain') === 'on'; } catch (e) { /* storage blocked */ }
    const b = root.querySelector('[data-tool="grain"]');
    const paint = () => { root.classList.toggle('no-grain', !grainOn); if (b) b.setAttribute('aria-pressed', String(grainOn)); };
    paint();
    if (b) b.addEventListener('click', () => {
      grainOn = !grainOn; paint();
      try { localStorage.setItem('bg-lab-grain', grainOn ? 'on' : 'off'); } catch (e) { /* ignore */ }
      toast(grainOn ? 'بافت روشن شد (روی فایل‌ها هم)' : 'بافت خاموش شد');
    });
  }

  function init() {
    root = document.querySelector('.bgl');
    if (!root) return;
    toastEl = root.querySelector('.bgl-toast');
    if (Lab.still) root.classList.add('is-still');
    grainTexture();
    setupGrain();
    buildTiles();
    setupViewer();
    getSaver().then(s => { if (!s) root.classList.add('no-dl'); });

    const ro = new ResizeObserver(entries => entries.forEach(en => {
      const item = items.find(it => it.frame === en.target);
      if (item) { sizeItem(item, en.contentRect.width, en.contentRect.height); if (Lab.reduced || Lab.still) { item.painter.draw(); drawOverlay(item); } }
    }));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      const item = items.find(it => it.frame === en.target);
      if (!item) return;
      item.visible = en.isIntersecting;
      if (en.isIntersecting) shown.add(item); else shown.delete(item);
      if (en.isIntersecting && !item.played && (en.intersectionRatio >= .3 || en.intersectionRect.height > innerHeight * .3)) {
        item.played = true;
        item.el.classList.add('is-in');
        if (!Lab.reduced && !Lab.still) {
          item.introT = 0; item.painter.s.expo = 0;
          item.painter.s.lens.v = -.5;
          setTimeout(() => item.painter.ripple(item.painter.cssW / 2, item.painter.cssH / 2, 1.3), 120);
        }
      }
      kick();
    }), { rootMargin: '80px 0px', threshold: [0, .15, .3, .5] });

    items.forEach(item => {
      ro.observe(item.frame);
      io.observe(item.frame);
      bindPointer(item.frame, () => item.painter, {
        enter: () => ambient(item.accent),
        leave: () => ambient(null),
      });
      item.frame.addEventListener('dblclick', e => { if (!e.target.closest('button')) openViewer(item.index, item.frame); });
      item.el.querySelector('.bgl-open').addEventListener('click', () => openViewer(item.index, item.frame));
      item.el.querySelectorAll('.js-dl').forEach(b => b.addEventListener('click', () => download(item.scene, b.dataset.kind, b, item.painter.t)));
    });
    if (Lab.still) items.forEach(it => { it.played = true; it.el.classList.add('is-in'); });

    document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
    mqReduce.addEventListener('change', () => { items.forEach(it => { it.dirty = true; }); V.dirty = true; kick(); });
    kick();
  }

  window.BGPage = { items, V, open: (i = 0) => openViewer(i, items[i].frame), close: closeViewer, go, download, getSaver };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
