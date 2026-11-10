/* ==========================================================================
   Widget Lab · gallery runtime
   - WidgetLab.register({ id, slug, mount(host) → api }) — each widget file
     registers itself; the lab mounts it into [data-mount="<id>"].
   - api: intro(), replay(), setLive(bool), setVisible(bool)
   - flags: ?still (final frame, no motion: for screenshots), reduced motion,
     slow motion (×0.25 for every GSAP tween and every widget loop)
   ========================================================================== */
(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqLight = window.matchMedia('(prefers-color-scheme: light)');

  const Lab = {
    defs: new Map(),
    apis: new Map(),
    timeScale: 1,
    still: params.has('still'),
    get reduced() { return this.still || mqReduce.matches; },
    register(def) { this.defs.set(def.id, def); },
    fonts: null,
  };
  window.WidgetLab = Lab;

  /* fonts the widgets measure with (rolling digits need real glyph widths) */
  Lab.fonts = new Promise(resolve => {
    if (!document.fonts || !document.fonts.load) { resolve(); return; }
    const faces = ['400 40px Outfit', '500 40px Outfit', '600 40px Outfit', '300 40px Inter', '400 40px Inter', '500 40px Inter'];
    Promise.all(faces.map(f => document.fonts.load(f))).then(() => resolve(), () => resolve());
    setTimeout(resolve, 2200);
  });

  /* if the GSAP CDN is unreachable, jump every tween to its end so nothing breaks */
  function gsapShim() {
    const apply = (targets, vars) => {
      const list = targets == null ? [] : (Array.isArray(targets) || targets instanceof NodeList ? Array.from(targets) : [targets]);
      list.forEach(t => {
        Object.keys(vars).forEach(k => {
          if (['duration', 'delay', 'ease', 'stagger', 'onUpdate', 'onComplete', 'onStart', 'repeat', 'yoyo', 'overwrite', 'transformOrigin', 'svgOrigin', 'transformPerspective', 'clearProps'].includes(k)) return;
          if (k === 'attr') { Object.entries(vars.attr).forEach(([a, v]) => t.setAttribute && t.setAttribute(a, v)); return; }
          if (t instanceof Element) { if (k === 'autoAlpha' || k === 'opacity') t.style.opacity = vars[k]; }
          else t[k] = vars[k];
        });
      });
      ['onStart', 'onUpdate', 'onComplete'].forEach(cb => vars[cb] && vars[cb]());
    };
    const tl = () => {
      const api = {
        to: (t, v) => { apply(t, v); return api; },
        fromTo: (t, a, b) => { apply(t, b); return api; },
        call: fn => { fn(); return api; },
        set: (t, v) => { apply(t, v); return api; },
        kill() {}, play() { return api; },
      };
      return api;
    };
    const ticks = new Set();
    let last = performance.now();
    const loop = now => { const d = now - last; last = now; ticks.forEach(fn => fn(now / 1000, d)); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
    return {
      to: (t, v) => apply(t, v), fromTo: (t, a, b) => apply(t, b), set: (t, v) => apply(t, v),
      timeline: vars => { const x = tl(); if (vars && vars.onComplete) setTimeout(vars.onComplete, 0); return x; },
      killTweensOf() {}, ticker: { add: fn => ticks.add(fn), remove: fn => ticks.delete(fn) },
      globalTimeline: { timeScale() {} },
    };
  }

  /* ── theme ── */
  function effectiveTheme() {
    const t = document.documentElement.dataset.theme;
    return t === 'light' || t === 'dark' ? t : (mqLight.matches ? 'light' : 'dark');
  }
  function paintTheme() {
    const now = effectiveTheme();
    document.documentElement.dataset.themeNow = now;
    const btn = document.querySelector('[data-tool="theme"]');
    if (btn) {
      const label = now === 'dark' ? 'روشن' : 'تیره';
      btn.setAttribute('aria-label', `پس‌زمینه‌ی ${label}`);
      const l = btn.querySelector('.label');
      if (l) l.textContent = label;
    }
  }
  function setupTheme() {
    try {
      const saved = localStorage.getItem('widget-lab-theme');
      if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
    } catch (e) { /* storage blocked: follow the system */ }
    paintTheme();
    mqLight.addEventListener('change', paintTheme);
    new MutationObserver(paintTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const btn = document.querySelector('[data-tool="theme"]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('widget-lab-theme', next); } catch (e) { /* ignore */ }
      paintTheme();
    });
  }

  /* ── slow motion ── */
  function setupSlowmo() {
    const btn = document.querySelector('[data-tool="slow"]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      Lab.timeScale = on ? .25 : 1;
      if (window.gsap) gsap.globalTimeline.timeScale(Lab.timeScale);
      document.dispatchEvent(new CustomEvent('lab:timescale', { detail: Lab.timeScale }));
    });
  }

  /* ── background: the market line and the pointer light ── */
  function mulberry(seed) {
    return () => {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function marketSVG(seed, cls) {
    // a periodic curve (sum of whole-period sines) so two copies tile seamlessly
    const W = 1200, H = 300, N = 260, rnd = mulberry(seed);
    const comps = Array.from({ length: 26 }, (_, i) => ({ k: i + 1, a: 46 / Math.pow(i + 1, .78) * (.45 + rnd() * .9), p: rnd() * Math.PI * 2 }));
    let d = '';
    for (let j = 0; j <= N * 2; j++) {
      const x = j / N * W;
      let y = H * .52;
      comps.forEach(c => { y += Math.sin((x / W) * Math.PI * 2 * c.k + c.p) * c.a; });
      d += (j ? 'L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1);
    }
    return `<svg class="${cls}" viewBox="0 0 ${W * 2} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path class="m-fill" d="${d}L${W * 2},${H}L0,${H}Z"/><path class="m-line" d="${d}"/></svg>`;
  }
  function setupBackground() {
    const host = document.querySelector('.bg-market');
    if (host) {
      host.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
        <linearGradient id="lab-market-fill" x1="0" y1="0" x2="0" y2="1"><stop class="m-stop-a" offset="0"/><stop class="m-stop-b" offset="1"/></linearGradient>
      </defs></svg>` + marketSVG(7, 'back') + marketSVG(19, 'front');
    }
    const spot = document.querySelector('.bg-spot');
    if (!spot || Lab.reduced || !window.matchMedia('(hover: hover)').matches) return;
    let x = innerWidth / 2, y = innerHeight * .28, tx = x, ty = y, raf = 0;
    const tick = () => {
      x += (tx - x) * .08; y += (ty - y) * .08;
      spot.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > .5 ? requestAnimationFrame(tick) : 0;
    };
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(tick); }, { passive: true });
  }

  /* ── widgets ── */
  function setupWidgets() {
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
      entries.forEach(en => {
        const api = Lab.apis.get(en.target);
        if (!api) return;
        api.setVisible(en.isIntersecting);
        // half the widget in view, or enough of a short screen
        const enough = en.isIntersecting && (en.intersectionRatio >= .5 || en.intersectionRect.height >= innerHeight * .35);
        if (enough && !en.target.dataset.played) {
          en.target.dataset.played = '1';
          Lab.fonts.then(() => api.intro());
        }
      });
    }, { threshold: [0, .1, .2, .3, .4, .5, .75, 1] }) : null;

    document.querySelectorAll('[data-mount]').forEach(host => {
      const def = Lab.defs.get(Number(host.dataset.mount));
      if (!def) return;
      let api;
      try { api = def.mount(host, Lab); } catch (err) { console.error(`[lab] widget ${def.id} failed to mount`, err); return; }
      Lab.apis.set(host, api);
      if (Lab.still) host.dataset.played = '1';
      else if (io) io.observe(host);
      else Lab.fonts.then(() => api.intro());

      const stage = host.closest('.stage');
      if (!stage) return;
      const replay = stage.querySelector('[data-act="replay"]');
      if (replay) replay.addEventListener('click', () => api.replay());
      const live = stage.querySelector('[data-act="live"]');
      if (live) live.addEventListener('click', () => {
        const on = live.getAttribute('aria-pressed') !== 'true';
        live.setAttribute('aria-pressed', String(on));
        api.setLive(on);
      });
      // a set's sub-number chips point at one of its cards
      if (api.focus) {
        let hold = 0;
        const point = i => { clearTimeout(hold); api.focus(i); stage.querySelectorAll('[data-sub]').forEach(b => b.classList.toggle('is-on', Number(b.dataset.sub) === i)); };
        const release = delay => { clearTimeout(hold); hold = setTimeout(() => point(null), delay); };
        stage.querySelectorAll('[data-sub]').forEach(chip => {
          const i = Number(chip.dataset.sub);
          chip.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') point(i); });
          chip.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') release(90); });
          chip.addEventListener('focus', () => point(i));
          chip.addEventListener('blur', () => release(90));
          chip.addEventListener('click', e => {
            point(i);
            const r = host.getBoundingClientRect();
            if (r.top < 0 || r.bottom > innerHeight) host.scrollIntoView({ behavior: Lab.reduced ? 'auto' : 'smooth', block: 'center' });
            if (e.pointerType !== 'mouse') release(2400);   // touch and keyboard: show it for a moment
          });
        });
      }
    });

    document.addEventListener('visibilitychange', () => {
      Lab.apis.forEach((api, host) => {
        if (document.hidden) api.setVisible(false);
        else if (!io) api.setVisible(true);
        else { const r = host.getBoundingClientRect(); api.setVisible(r.bottom > 0 && r.top < innerHeight); }
      });
    });
  }

  function init() {
    // only pages that mount GSAP widgets need it (the NetRate page draws with its own tweens)
    if (!window.gsap && document.querySelector('[data-mount]')) { console.warn('[lab] GSAP did not load; showing final frames'); window.gsap = gsapShim(); Lab.still = true; }
    setupTheme();
    setupSlowmo();
    setupBackground();
    setupWidgets();
  }
  // deferred or inline, run once the whole page (and every widget file) is parsed
  let booted = false;
  const boot = () => { if (!booted) { booted = true; init(); } };
  if (document.readyState === 'complete') boot();
  else { document.addEventListener('DOMContentLoaded', boot); window.addEventListener('load', boot); }
})();
