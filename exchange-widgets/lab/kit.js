/* ==========================================================================
   Widget Lab · shared kit for the widget sets (04 onwards)
   Widgets 01–03 carry their own copies of these helpers; the sets share them
   through WidgetLab.kit so each set file stays about its own design.
   - springs, clamp/lerp, a dirty style writer
   - Odo: rolling digits (rectangular cells, real glyph widths and kerning)
   - monotone(xs, ys): a d3-style monotone cubic path + y(x)
   - pointer(el, w, h): pointer position in an element's own units
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab) return;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const r2 = n => Math.round(n * 100) / 100;
  const spring = (v, k = 170, c = 22) => ({ v, t: v, vel: 0, k, c });
  function step(s, dt) {
    const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
    for (let i = 0; i < n; i++) { s.vel += (-s.k * (s.v - s.t) - s.c * s.vel) * h; s.v += s.vel * h; }
    return s.v;
  }
  const settled = (s, e = .002) => Math.abs(s.v - s.t) < e && Math.abs(s.vel) < e;
  const easeInOut = t => (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

  /* writes a style or attribute only when it changed */
  function writer() {
    const css = new WeakMap(), att = new WeakMap();
    return {
      tf(node, v) { if (css.get(node) !== v) { node.style.transform = v; css.set(node, v); } },
      style(node, prop, v) { const m = att.get(node) || {}; const k = 's:' + prop; if (m[k] !== v) { node.style[prop] = v; m[k] = v; att.set(node, m); } },
      attr(node, name, v) { const m = att.get(node) || {}; if (m[name] !== v) { node.setAttribute(name, v); m[name] = v; att.set(node, m); } },
    };
  }

  /* monotone cubic through knots: flat at every peak and trough, no overshoot */
  function monotone(xs, ys, ends = 'flat') {
    const n = xs.length, m = new Array(n).fill(0);
    for (let i = 1; i < n - 1; i++) {
      const h0 = xs[i] - xs[i - 1], h1 = xs[i + 1] - xs[i];
      const s0 = (ys[i] - ys[i - 1]) / h0, s1 = (ys[i + 1] - ys[i]) / h1;
      const p = (s0 * h1 + s1 * h0) / (h0 + h1);
      m[i] = (Math.sign(s0) + Math.sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), .5 * Math.abs(p)) || 0;
    }
    if (ends !== 'flat' && n > 1) { m[0] = (ys[1] - ys[0]) / (xs[1] - xs[0]); m[n - 1] = (ys[n - 1] - ys[n - 2]) / (xs[n - 1] - xs[n - 2]); }
    let d = `M${r2(xs[0])},${r2(ys[0])}`;
    for (let i = 0; i < n - 1; i++) {
      const dx = xs[i + 1] - xs[i];
      d += `C${r2(xs[i] + dx / 3)},${r2(ys[i] + m[i] * dx / 3)} ${r2(xs[i + 1] - dx / 3)},${r2(ys[i + 1] - m[i + 1] * dx / 3)} ${r2(xs[i + 1])},${r2(ys[i + 1])}`;
    }
    const yAt = x => {
      if (x <= xs[0]) return ys[0];
      if (x >= xs[n - 1]) return ys[n - 1];
      let i = 0;
      while (x > xs[i + 1]) i++;
      const dx = xs[i + 1] - xs[i], t = (x - xs[i]) / dx, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * dx * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * dx * m[i + 1];
    };
    return { d, yAt };
  }

  /* rolling digits */
  const STRIP = Array.from({ length: 60 }, (_, i) => i % 10).join('\n');
  const REST = 20, PADX = .1;
  const isDigit = ch => ch >= '0' && ch <= '9';
  function measurer(el) {
    const probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;left:0;top:0;visibility:hidden;white-space:pre;font-size:100px;line-height:1;pointer-events:none';
    const cs = getComputedStyle(el), ls = parseFloat(cs.letterSpacing) || 0, fs = parseFloat(cs.fontSize) || 1;
    probe.style.letterSpacing = (ls / fs * 100).toFixed(3) + 'px';   // inherited spacing is a fixed length: rescale it
    el.appendChild(probe);
    const w = t => { probe.textContent = t; return probe.getBoundingClientRect().width / 100; };
    const adv = {}, kern = {};
    return { adv: ch => adv[ch] ?? (adv[ch] = w(ch)), kern: (a, b) => kern[a + b] ?? (kern[a + b] = w(a + b) - w(a) - w(b)) };
  }
  class Odo {
    constructor(el) { this.el = el; this.cells = []; this.text = ''; this.m = null; el.classList.add('kit-odo'); el.setAttribute('aria-hidden', 'true'); }
    metrics() { return this.m || (this.m = measurer(this.el)); }
    remeasure() { this.m = null; this.cells.forEach((c, i) => { c.w = this.widthFor(this.text, i); this.paint(c); }); }
    make(ch) {
      const el = document.createElement('span'); el.className = 'odo-c';
      const s = document.createElement('span'); s.className = 'odo-s'; el.appendChild(s);
      const c = { el, s, ch: null, idx: 0, w: 0, o: 1, kind: '' };
      this.kind(c, ch);
      return c;
    }
    kind(c, ch) {
      const k = isDigit(ch) ? 'd' : 'g';
      if (c.kind !== k) {
        gsap.killTweensOf(c.s); gsap.set(c.s, { clearProps: 'transform,opacity' }); c.s.style.transform = '';
        c.kind = k; c.s.textContent = k === 'd' ? STRIP : ch;
        c.el.classList.toggle('is-glyph', k === 'g');
        c.idx = k === 'd' ? REST + +ch : 0;
      } else if (k === 'g') c.s.textContent = ch;
      c.ch = ch;
    }
    paint(c) {
      c.el.style.width = Math.max(0, c.w + PADX * 2).toFixed(4) + 'em';
      c.el.style.opacity = c.o;
      if (c.kind === 'd') c.s.style.transform = `translate3d(0,${(-c.idx * 1.2).toFixed(4)}em,0)`;
    }
    widthFor(text, i) { const m = this.metrics(); return m.adv(text[i]) + (i + 1 < text.length ? m.kern(text[i], text[i + 1]) : 0); }
    /* opts: dir (+1/-1), dur, stagger, fromZero, spin, order ('ltr'|'rtl'), instant */
    set(text, o = {}) {
      text = String(text);
      if (text === this.text && !o.fromZero && !o.force) return;
      const dur = o.dur ?? .85, stagger = o.stagger ?? .04, instant = o.instant || Lab.reduced;
      const old = this.cells, n = text.length, diff = n - old.length;
      let cells;
      if (diff < 0) { old.slice(0, -diff).forEach(c => this.exit(c, instant)); cells = old.slice(-diff); }
      else {
        const fresh = [];
        for (let i = 0; i < diff; i++) fresh.push(this.make(text[i]));
        const first = old[0] ? old[0].el : null;
        fresh.forEach(c => { this.el.insertBefore(c.el, first); c.w = -PADX * 2; c.o = 0; c.isNew = true; });
        cells = fresh.concat(old);
      }
      cells.forEach((c, i) => {
        const ch = text[i];
        const delay = instant ? 0 : (o.order === 'ltr' ? i : (n - 1 - i)) * stagger;
        const w = this.widthFor(text, i);
        gsap.killTweensOf(c);
        if (instant) { this.kind(c, ch); c.w = w; c.o = 1; c.isNew = false; if (c.kind === 'd') c.idx = REST + +ch; this.paint(c); return; }
        const was = c.ch;
        if (isDigit(ch) && c.kind === 'd' && !c.isNew) {
          const d = +ch;
          let start = c.idx, target = REST + d;
          if (o.fromZero) { start = 0; target = REST + d + 10 * Math.min(3, o.spin ?? 2); }
          else {
            const dir = o.dir || (target >= start ? 1 : -1);
            if (dir > 0) { while (target <= start && target + 10 < 60) target += 10; }
            else { while (target >= start && target - 10 >= 0) target -= 10; }
            if (target === start && was !== ch) target += dir > 0 ? 10 : -10;
          }
          c.idx = start; c.ch = ch;
          gsap.to(c, { idx: target, w, o: 1, duration: dur, delay, ease: o.ease || 'expo.out', onUpdate: () => this.paint(c), onComplete: () => { c.idx = REST + d; this.paint(c); } });
        } else {
          const dir = o.dir || 1;
          if (was !== ch || c.isNew) {
            this.kind(c, ch);
            if (c.kind === 'd') {
              const d = +ch;
              c.idx = o.fromZero ? 0 : REST + d - 3 * dir;
              gsap.to(c, { idx: o.fromZero ? REST + d + 10 * Math.min(3, o.spin ?? 2) : REST + d, duration: dur, delay, ease: 'expo.out', onUpdate: () => this.paint(c), onComplete: () => { c.idx = REST + d; this.paint(c); } });
            } else gsap.fromTo(c.s, { yPercent: 70 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: dur * .7, delay, ease: 'expo.out' });
          }
          c.isNew = false;
          gsap.to(c, { w, o: 1, duration: dur * .8, delay, ease: 'expo.out', onUpdate: () => this.paint(c) });
        }
      });
      this.cells = cells; this.text = text;
    }
    exit(c, instant) {
      gsap.killTweensOf(c);
      if (instant) { c.el.remove(); return; }
      gsap.to(c, { w: -PADX * 2, o: 0, duration: .45, ease: 'expo.out', onUpdate: () => this.paint(c), onComplete: () => c.el.remove() });
    }
  }

  /* pointer in an element's own units (w × h); the rect is cached until scroll / resize */
  function pointer(el, w, h) {
    const p = { inside: false, mouse: false, x: -9999, y: -9999, nx: 0, ny: 0, down: false };
    let rect = null;
    const drop = () => { rect = null; };
    addEventListener('scroll', drop, { passive: true, capture: true });
    addEventListener('resize', drop, { passive: true });
    el.addEventListener('pointerenter', drop);
    el.addEventListener('pointermove', e => {
      const r = rect || (rect = el.getBoundingClientRect());
      p.inside = true; p.mouse = e.pointerType !== 'touch';
      p.x = (e.clientX - r.left) / r.width * w; p.y = (e.clientY - r.top) / r.height * h;
      p.nx = clamp(p.x / w * 2 - 1, -1, 1); p.ny = clamp(p.y / h * 2 - 1, -1, 1);
    }, { passive: true });
    el.addEventListener('pointerleave', () => { p.inside = false; p.x = p.y = -9999; });
    p.drop = drop;
    return p;
  }

  Lab.kit = { clamp, lerp, r2, spring, step, settled, easeInOut, writer, monotone, Odo, pointer };
})();
