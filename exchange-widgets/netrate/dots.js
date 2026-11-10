/* ==========================================================================
   NetRate · dot-matrix numbers (from sample 04)
   A 5 × 7 dot font for Latin digits (as read off the sample) and for Persian digits
   (drawn here: the sample has none). Every dot is a circle that scales in and out, so a
   change ripples through the number from where it starts (B: a refresh / a button press).
   C only: dots swell under a pointer ("lens"), a scoreboard count-up, a dim edge for scrubbing.
   ========================================================================== */
(() => {
  'use strict';
  const NR = window.NR;
  if (!NR) return;

  const FONT = {
    /* Latin digits: read off the sample */
    '0': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    '1': ['00100', '01100', '10100', '00100', '00100', '00100', '11111'],
    '2': ['01110', '10001', '00001', '00110', '01000', '10000', '11111'],
    '3': ['11111', '00001', '00010', '00110', '00001', '10001', '01110'],
    '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
    '5': ['11111', '10000', '10110', '11001', '00001', '10001', '01110'],
    '6': ['00110', '01000', '10000', '10110', '11001', '10001', '01110'],
    '7': ['11111', '00001', '00010', '00010', '00100', '01000', '01000'],
    '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
    '9': ['01110', '10001', '10011', '01101', '00001', '00010', '01100'],
    /* Persian digits: drawn for this app after the shapes of the app's own font (Vazirmatn) */
    '۰': ['00000', '00000', '00100', '01010', '00100', '00000', '00000'],
    '۱': ['01100', '00100', '00100', '00100', '00100', '00100', '00100'],
    '۲': ['10001', '10001', '01011', '01110', '01000', '01000', '01000'],
    '۳': ['10001', '10101', '10101', '11111', '10000', '10000', '10000'],
    '۴': ['01011', '01101', '01011', '01110', '01000', '01111', '01000'],
    '۵': ['00100', '01010', '01010', '10001', '10001', '10001', '01110'],
    '۶': ['01110', '10001', '10001', '01111', '00110', '01100', '11000'],
    '۷': ['10001', '10001', '10001', '01010', '01010', '00100', '00100'],
    '۸': ['00100', '00100', '01010', '01010', '10001', '10001', '10001'],
    '۹': ['01110', '10001', '10001', '01111', '00001', '00001', '00001'],
    /* signs and separators (narrow ones are two columns wide) */
    ',': ['00', '00', '00', '00', '01', '11', '10'], '٬': ['00', '00', '00', '00', '01', '11', '10'],
    '.': ['0', '0', '0', '0', '0', '0', '1'], '٫': ['0', '0', '0', '0', '0', '0', '1'],
    ':': ['00', '00', '10', '00', '10', '00', '00'],
    '%': ['11001', '11010', '00010', '00100', '01000', '01011', '10011'], '٪': ['11001', '11010', '00010', '00100', '01000', '01011', '10011'],
    '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'],
    '−': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'], '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
    ' ': ['00', '00', '00', '00', '00', '00', '00'],
  };
  NR.dotFont = FONT;
  const NS = 'http://www.w3.org/2000/svg';

  /* the width of a text in columns (a one-column gap between glyphs) */
  const cols = text => [...text].reduce((s, ch, i) => s + (FONT[ch] ? FONT[ch][0].length : 5) + (i ? 1 : 0), 0);

  /* a number made of dots.  new NR.Dots(svg, { pitch, r }) — the svg's viewBox is set to fit the widest text given to `fit()` */
  class Dots {
    constructor(svg, o = {}) {
      this.svg = svg; this.pitch = o.pitch || 6.8; this.r = o.r || 2.85;
      this.text = null; this.tokens = []; this.cells = []; this.g = document.createElementNS(NS, 'g'); svg.appendChild(this.g);
      this.lensOn = false; this.cut = null;
    }
    /* size the svg for a text (so a wider or narrower number later does not move the box) */
    fit(text) {
      const w = (cols(text) - 1) * this.pitch + this.r * 2, h = 6 * this.pitch + this.r * 2;
      this.W = w; this.H = h; this.svg.setAttribute('viewBox', `${-this.r} ${-this.r} ${w} ${h}`); this.svg.setAttribute('width', w); this.svg.setAttribute('height', h);
      return [w, h];
    }
    build(text) {
      this.g.textContent = ''; this.cells = []; this.tokens = [];
      let x = 0; [...text].forEach((ch, i) => {
        const gl = FONT[ch] || FONT['0'], w = gl[0].length, tok = { ch, x, w, cells: [] };
        for (let r = 0; r < 7; r++) for (let c = 0; c < w; c++) {
          const el = document.createElementNS(NS, 'circle'); el.setAttribute('cx', ((x + c) * this.pitch).toFixed(2)); el.setAttribute('cy', (r * this.pitch).toFixed(2)); el.setAttribute('r', this.r); el.setAttribute('class', 'nrd-dot');
          this.g.appendChild(el); const cell = { el, r, c, x: (x + c) * this.pitch, y: r * this.pitch, on: 0, k: 1 }; tok.cells.push(cell); this.cells.push(cell);
        }
        this.tokens.push(tok); x += w + 1;
      });
      this.built = text.length;
    }
    /* show a text. animate: ripple the dots that change; origin: [x, y] in svg units (default: the changed digit's centre) */
    set(text, o = {}) {
      if (text === this.text) return;
      const rebuilt = this.built !== text.length || this.tokens.some((t, i) => (FONT[text[i]] || FONT['0'])[0].length !== t.w);
      if (rebuilt) { this.build(text); this.fit(text); }
      const move = !rebuilt && this.text != null && o.animate !== false, ripple = o.animate !== false && !NR.reduced();
      this.svg.classList.toggle('is-still', !ripple);
      const changed = [];
      [...text].forEach((ch, i) => {
        const tok = this.tokens[i], gl = FONT[ch] || FONT['0'];
        tok.cells.forEach(cell => { const on = gl[cell.r][cell.c] === '1' ? 1 : 0; if (on !== cell.on || rebuilt) { changed.push([cell, on, tok]); } });
        tok.ch = ch;
      });
      let ox = o.origin ? o.origin[0] : null, oy = o.origin ? o.origin[1] : null;
      if (ox == null && changed.length) { const t = changed[0][2]; ox = (t.x + t.w / 2) * this.pitch; oy = 3 * this.pitch; }
      changed.forEach(([cell, on]) => {
        cell.on = on;
        const d = ripple && (move || o.ripple) ? Math.min(900, (Math.abs(cell.x - ox) + Math.abs(cell.y - oy)) * 6) : 0;
        cell.el.style.transitionDelay = d ? d.toFixed(0) + 'ms' : '';
        this.paint(cell);
      });
      this.text = text;
    }
    paint(cell) {
      cell.el.style.transform = cell.on && cell.k !== 1 ? `scale(${cell.k.toFixed(3)})` : '';
      cell.el.classList.toggle('is-on', !!cell.on);
    }
    /* C: dots within `radius` of a point (svg units) swell up to `gain`; null clears */
    lens(x, y, radius = 18, gain = 1.45) {
      if (x == null) { if (!this.lensOn) return; this.lensOn = false; this.svg.classList.remove('is-lens'); this.cells.forEach(c => { c.k = 1; this.paint(c); }); return; }
      this.lensOn = true; this.svg.classList.add('is-lens');
      this.cells.forEach(c => { if (!c.on) return; const d = Math.hypot(c.x - x, c.y - y), k = d < radius ? 1 + (gain - 1) * Math.pow(1 - d / radius, 1.4) : 1; if (k !== c.k) { c.k = k; this.paint(c); } });
    }
    /* C: dots to the right of x (svg units) fade out (the part of a scrubbed chart that comes after the picked moment) */
    dim(x) {
      this.cells.forEach(c => c.el.classList.toggle('is-dim', x != null && c.x > x));
    }
    /* C: a scoreboard count: `fmt(v)` gives the text; from → to in ms */
    count(from, to, fmt, ms = 1100) {
      const stop = NR.tween(ms, e => this.set(fmt(from + (to - from) * e), { animate: true }), NR.ease.out3);
      return stop;
    }
    destroy() { this.g.textContent = ''; }
  }
  NR.Dots = Dots;
  NR.dotCols = cols;
})();
