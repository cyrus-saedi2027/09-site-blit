/* ==========================================================================
   Backgrounds · engine (window.BGLab)
   Exchange-app Widget Lab · no dependencies

   Every background is a colour field drawn in its own design units: the
   units of the widget it came from (1u = 1px of that widget's shot).
   · grid    a colour grid smoothed with Catmull-Rom (widget 05's panel and
             its re-tints)
   · layers  soft lights and CSS-style gradients composited in order
             (widgets 02, 03, 04, 06 and the gallery's own aurora)

   The painter fits a design to any frame (part stretch, part crop, around a
   focus point), then samples it after a liquid displacement:
   idle flow · the pointer's swell and sweep · press-and-hold · ripples.
   The frame is small (about a sixth of its CSS size); the browser scales it
   up smooth. Exports render the same field at full size, dithered.
   ========================================================================== */
(() => {
  'use strict';
  const D2R = Math.PI / 180;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const spring = (v, k = 170, c = 22) => ({ v, t: v, vel: 0, k, c });
  function step(s, dt) {
    const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
    for (let i = 0; i < n; i++) { s.vel += (-s.k * (s.v - s.t) - s.c * s.vel) * h; s.v += s.vel * h; }
    return s.v;
  }

  /* ───────────── colour ───────────── */
  const toLin = c => { c /= 255; return c <= .04045 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); };
  const toSrgb = l => 255 * (l <= .0031308 ? l * 12.92 : 1.055 * Math.pow(l, 1 / 2.4) - .055);
  function rgb2lab(r, g, b) {   // sRGB 0…255 → OKLab
    const R = toLin(r), G = toLin(g), B = toLin(b);
    const l = Math.cbrt(.4122214708 * R + .5363325363 * G + .0514459929 * B);
    const m = Math.cbrt(.2119034982 * R + .6806995451 * G + .1073969566 * B);
    const s = Math.cbrt(.0883024619 * R + .2817188376 * G + .6299787005 * B);
    return [.2104542553 * l + .793617785 * m - .0040720468 * s, 1.9779984951 * l - 2.428592205 * m + .4505937099 * s, .0259040371 * l + .7827717662 * m - .808675766 * s];
  }
  function lab2lin(L, a, b) {
    const l = (L + .3963377774 * a + .2158037573 * b) ** 3, m = (L - .1055613458 * a - .0638541728 * b) ** 3, s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + .2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - .3413193965 * s, -.0041960863 * l - .7034186147 * m + 1.707614701 * s];
  }
  const inGamut = c => c[0] > -1e-4 && c[0] < 1.0001 && c[1] > -1e-4 && c[1] < 1.0001 && c[2] > -1e-4 && c[2] < 1.0001;
  function lab2rgb(L, a, b) {   // OKLab → sRGB 0…255, chroma pulled in until it fits
    let c = lab2lin(L, a, b);
    if (!inGamut(c)) {
      let lo = 0, hi = 1;
      for (let i = 0; i < 14; i++) { const k = (lo + hi) / 2; if (inGamut(lab2lin(L, a * k, b * k))) lo = k; else hi = k; }
      c = lab2lin(L, a * lo, b * lo);
    }
    return [toSrgb(clamp(c[0], 0, 1)), toSrgb(clamp(c[1], 0, 1)), toSrgb(clamp(c[2], 0, 1))];
  }
  /* turn a colour's hue by dh degrees in OKLCH, scale its chroma, nudge its lightness */
  function turn(rgb, dh, kc = 1, dl = 0) {
    const [L, a, b] = rgb2lab(rgb[0], rgb[1], rgb[2]), c = Math.hypot(a, b) * kc, h = Math.atan2(b, a) + dh * D2R;
    return lab2rgb(L + dl, c * Math.cos(h), c * Math.sin(h)).map(Math.round);
  }
  const hexOf = c => '#' + c.map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('');

  /* ───────────── widget 05's panel: the shot sampled on a 34 × 24 grid ───────────── */
  const GW = 34, GH = 24;
  const HEX05 = [
    'e2e4e3c5c7c6dae1e1ddeaecd6eaefc9e7f2b4e3f398d9f473cdf54cbbef30a0de1b85c80e67a80c4d860a3b6d082e59072549052041051d3e051c3e061c3f061b3b08193708173106142c071327071222071120080f1c080e1a080e19090e190a1017080f18',
    'c5c7c5e2e4e3e2eaebddeaecd2e9f0bee5f2a4def280d3f357c3f137ace31f91cf1077b60c5b9409447308355f062b4f072446062243072144062043072043061d3d07193607173005142b071227061122081120080f1d080e1b080e1a070e1a080f180a0f16',
    'dfdfdde7e9e8e2e9ebdae9edcbe6eeb0dfee8dd4ef63c7ed3fb3e22699ce1581b810679c0d4f7d0b3c6309305408294909254609254909254a092348082142091c3a081a3307172e06152607132407132108121e08101c080f1a080e18080d17090d150a0d13',
    'e9e8e7e6e9e8e1e8ead6e6ecbedfeb9bd5ea72cae84cb7df319fcc1c87b9146f9f1158850f456a0d36580c2e4e0b2b4a0d2a4b0d294e0d284d0c25490a2140091c3708192f07172907142407132309132009121d08101b080e19080d17080d15080c13090b12',
    'eae8e7e5e8e8dde5e7cce0e6acd6e580c9e25bb8da3da3c8288bb61d759f186086144e72113f5f1035530f304f113050122f53122e53112b4d0f25450d203b0b1b3308182a0915270814240914220a112009101c080f19080e17090d15090c13090b12090a10',
    'e8e7e5e2e4e6d6dfe3c0d7df98cadc6db9d44fa4c63690b5287aa121658a1c5475184766163c5a15375515365519365919355b173154142a4a1125400f1f360c1b2e0a17260915240a14220a121f0a101d09101a080e17090d15090c13090c110a0b100a0b0f',
    'e7e3e5dddee2cbd6ddaecad686bacf63a5c14992b2367ea12d6a8c265a79214c6a1d435f1d3e5b1e3d5b213d5f213d6020375b1c304e1828431323380f1d300c19280a16250a15220b131f0b101c0a0f1a080f17090e14090d12090c110a0b100b0c110c0c10',
    'e2dee0d5d4dabcc9d29dbccb7ba8be5d93ae48819f3b6e8f325f7d2d526e2949652745612944622b44642c4466293f602537561f2e4919263b142032101c2b0e18250c15210b141e0b111b0a0f180a0f160b0e160a0d13090d110a0c100b0c100c0d120e0c11',
    'dbd4d7c9c9ceaebac493a9bc7695ac5c819d4d708e42617f3a5672354e6a334a67334a68364b6b384b6b354767303e5a28354d212b3f1b2334161d2d121a260f17220d151e0b121b0b0f170b0e150b0e150a0d130b0d120b0d120c0d110e0e120f0d12100e12',
    'd1c7ccbdb9c1a4a9b58d97aa74849c60728e5563804b597545526d41506a424f6d445271465373434e6d3c4460343a512d30432327371c202e161b281219230e151e0d121a0b10160b0e150b0e150a0d130a0d120c0d120e0d12110e14110e13120e14130e12',
    'c7b7bdb4a9b3a097a78b879977768d6765815d5b7757557052546d535572545876555a775357744b4c66424055393547302c3a2724311e1e2917192313161e10131a0e10170c0f140d0e130d0e140d0e130f0e13100e13110f14140e13140f13150f13160f11',
    'bfa8aeaf97a39e87978c798c7c6981715d766a5771655670645972655d7a66617d64607a5d556d52455a48394a3e2f3d3427332a212a1f1b2318171d14131a1111170f0f160e0f14100f14100f15120f15130f15150f14180f141a0f131a0e131a0e131b0f12',
    'ba979eae87949e798a906d818462787d5a73795972755b7476607876647d75667d6f5e73644e5f583e4c4e323e432a3537232c2a1d2521181f1a151b151219131117131016131016151015161016190f161b0f151c10151f0f14200f14200f131f0e13200e12',
    'b78991ae7d8aa37383986b7c8f6376885d71845b70815c70805d717f5f727d60717856666c45515e3641532d3647262d3b1f252d1a1e23171a1d14191912181912171912151b11161e1115201216241115261014271014291014280f13270f13260f12250e12',
    'b77c86af7480a86f7ca06a78986373925e6e8e5b6b8b5a698859688658668557637f4d56733c4566303759272d4c22273d1c222f171b2715182114172012162013162412152812172b12152f1217321017341116331116331016310f152f0f142c0e132a0f13',
    'b7727cb36e78ad6c76a76873a1636f9b5e6a975a6693576390545f8e515b8c4e558643487b363b6c2b2f5e24294f1e2240191e34171b2e15172b14172c14162f14173413173913173c13163f12174011174110164010153d1015391015370f15320f152f0f14',
    'bb6b74b86b73b36a72ae686fa8636ba35d659f59619b545c985057954b5191454a8b3d4080323674292c672326591d214b191c3e171a3b16173b15183e14174514184913184b13174c12164d12164c11164b1016491015450f15400f153c0f15380f15340f15',
    'be6a70bc6b71b86b70b4686daf6368ab5d61a7575ba35156a04c509c464997404291393b8930327e292b742325681e215b1a1d4f161a4d16175014185615185f15186114185f13185d13175b12175911165610165210154d0f15470f15420f153d0f14380f14',
    'c26c70c16e71be6e6fbb6a6cb76465b25c5daf5656ab4f4fa84849a342429f3b3c993535922e2f892728812224781e206e1a1c6516196716186d16187316197916197815197314186e13176a12176511166110165b1015550f154e0f15480f14420f143c0f14',
    'c77575c77674c57472c16e6cbe6664ba5c5ab65451b34c49af4442ab3d3ba73735a231309c2b2b9526269022228a1e1f831b1c7e171983171889171a8e181a92171b8d15198614187f13187912177211166c10166510155e0f15550f144e0f14470f14400f14',
    'cf837ecf817ccb7c77c8746fc56963c15d56be524cbb4943b8403bb43834af322fab2d2aa62826a123229e21209c1e1e9a1c1c9a191aa0191aa41a1ba8191aa9171aa116199815198f1418871217801117781016700f15660f155c0f14540e144c0e14450e14',
    'ce8d86d68f87d2877fce7d73cb6d63c75d52c65046c4443bc13b33bd332cb82c27b32724b02421ad211fad1f1ead1e1daf1d1db21c1cb71d1cba1d1cbb1b1dba1a1cb31819a816199f14189612178d11178410167a0f156f0e14630e145a0e14510e14490f15',
    'bb887fd79c91d79689d48679d07163cd5c4dcd4c3ecd3e31cb3429c62b23c0251eba211db71e1bb71e1bba1d1bbe1f1cc1201dc6201fca201eca1f1ec91e1dc71b1dbf191ab71719ae1419a412189911188f0f16840f15770e13690e14600e15550e14490e13',
    'd79c91ba897fcc9083d28376ce6d5ecc584acd473ace3b2dcc3024c7291fc2231cbd201bbd1f1dbf211ec2221ec72420ca2623cd2622ce2421ce221fcd201fc81e1ec01b1bb8181aaf151aa513199a11198f0f17840f15770f156a0e155d0f154c0d12550e14',
  ].join('');
  const GRID05 = new Float32Array(GW * GH * 3);
  for (let i = 0; i < GRID05.length; i++) GRID05[i] = parseInt(HEX05.substr(i * 2, 2), 16);
  /* the panel's rounded corners bled the dark card into the cells beside each
     corner; the widget clips them, a full-bleed background must not show them */
  (function fixCorners(g) {
    const at = (i, j) => (j * GW + i) * 3;
    const avg = (dst, cells) => { for (let c = 0; c < 3; c++) g[dst + c] = cells.reduce((s, k) => s + g[k + c], 0) / cells.length; };
    [[0, 0, 1, 1], [GW - 1, 0, -1, 1], [0, GH - 1, 1, -1], [GW - 1, GH - 1, -1, -1]].forEach(([ci, cj, di, dj]) => {
      const h = at(ci + di, cj), v = at(ci, cj + dj), d = at(ci + di, cj + dj);
      avg(h, [at(ci + 2 * di, cj), d, at(ci + 2 * di, cj + dj)]);
      avg(v, [at(ci, cj + 2 * dj), d, at(ci + di, cj + 2 * dj)]);
      avg(at(ci, cj), [h, v, d]);
    });
  })(GRID05);

  /* re-tint a grid in widget 05's harmony: keep every cell's lightness and its
     mix of the two families — cool (the cyan → navy side) and warm (the coral
     → red side) — and give each family new hues, which may change with
     lightness (light, mid, dark: a dark gold would turn to mud, a dark wine
     does not). Hues are OKLCH degrees; `lift` remaps lightness. */
  const COOL0 = 238, WARM0 = 27;
  function hueAt(table, L) {
    if (L <= table[0][0]) return table[0][1];
    for (let i = 1; i < table.length; i++) {
      if (L <= table[i][0]) {
        const [l0, h0] = table[i - 1], [l1, h1] = table[i], t = (L - l0) / (l1 - l0);
        let d = ((h1 - h0 + 540) % 360) - 180;   // the short way round
        return h0 + d * t;
      }
    }
    return table[table.length - 1][1];
  }
  function retint(grid, pal) {
    const c0x = Math.cos(COOL0 * D2R), c0y = Math.sin(COOL0 * D2R), w0x = Math.cos(WARM0 * D2R), w0y = Math.sin(WARM0 * D2R);
    const det = c0x * w0y - c0y * w0x, out = new Float32Array(grid.length);
    for (let i = 0; i < grid.length; i += 3) {
      const [L, a, b] = rgb2lab(grid[i], grid[i + 1], grid[i + 2]);
      const al = (a * w0y - b * w0x) / det, be = (b * c0x - a * c0y) / det;   // a·c0 + b·w0
      const hc = hueAt(pal.cool, L) * D2R, hw = hueAt(pal.warm, L) * D2R, kc = pal.kc || 1, kw = pal.kw || 1;
      const L2 = pal.lift ? pal.lift(L) : L;
      const A = al * kc * Math.cos(hc) + be * kw * Math.cos(hw), B = al * kc * Math.sin(hc) + be * kw * Math.sin(hw);
      const k = pal.chroma ? pal.chroma(L) : 1, c = lab2rgb(L2, A * k, B * k);
      out[i] = c[0]; out[i + 1] = c[1]; out[i + 2] = c[2];
    }
    return out;
  }
  function flipGrid(grid, gw, gh, fx, fy) {
    const out = new Float32Array(grid.length);
    for (let j = 0; j < gh; j++) for (let i = 0; i < gw; i++) {
      const s = ((fy ? gh - 1 - j : j) * gw + (fx ? gw - 1 - i : i)) * 3, d = (j * gw + i) * 3;
      out[d] = grid[s]; out[d + 1] = grid[s + 1]; out[d + 2] = grid[s + 2];
    }
    return out;
  }

  /* Catmull-Rom over the grid (the same sampler as widget 05) into an 8× texture */
  function upsample(grid, gw, gh, tw, th) {
    const tex = new Float32Array(tw * th * 3), wx = new Float32Array(4), wy = new Float32Array(4);
    const cubic = (t, o) => { const t2 = t * t, t3 = t2 * t; o[0] = (-t3 + 2 * t2 - t) * .5; o[1] = (3 * t3 - 5 * t2 + 2) * .5; o[2] = (-3 * t3 + 4 * t2 + t) * .5; o[3] = (t3 - t2) * .5; };
    let o = 0;
    for (let j = 0; j < th; j++) {
      const gy = (j + .5) / th * gh - .5, iy = Math.floor(gy);
      cubic(gy - iy, wy);
      for (let i = 0; i < tw; i++) {
        const gx = (i + .5) / tw * gw - .5, ix = Math.floor(gx);
        cubic(gx - ix, wx);
        let R = 0, G = 0, B = 0;
        for (let m = 0; m < 4; m++) {
          const row = clamp(iy - 1 + m, 0, gh - 1) * gw, wm = wy[m];
          for (let n = 0; n < 4; n++) {
            const k = (row + clamp(ix - 1 + n, 0, gw - 1)) * 3, w = wx[n] * wm;
            R += grid[k] * w; G += grid[k + 1] * w; B += grid[k + 2] * w;
          }
        }
        tex[o++] = R; tex[o++] = G; tex[o++] = B;
      }
    }
    return tex;
  }

  /* ───────────── fields ───────────── */
  const mirror = (v, p) => { const m = ((v % (2 * p)) + 2 * p) % (2 * p); return m < p ? m : 2 * p - m; };

  /* grid field: bilinear over the 8× texture; an optional warp bends the design (Silk) */
  function gridField(def) {
    const [Wd, Hd] = def.size, tw = def.gw * 8, th = def.gh * 8;
    const tex = upsample(def.grid, def.gw, def.gh, tw, th), kx = tw / Wd, ky = th / Hd;
    const warp = def.warp || null;
    let T = 0;
    const W = [0, 0];
    return {
      size: def.size,
      prepare(t) { T = t; },
      color(x, y, out) {
        if (warp) { warp(x, y, T, W); x = mirror(W[0], Wd); y = mirror(W[1], Hd); }
        let gx = x * kx - .5, gy = y * ky - .5;
        gx = gx < 0 ? 0 : gx > tw - 1.001 ? tw - 1.001 : gx;
        gy = gy < 0 ? 0 : gy > th - 1.001 ? th - 1.001 : gy;
        const ix = gx | 0, iy = gy | 0, fx = gx - ix, fy = gy - iy;
        const k0 = (iy * tw + ix) * 3, k1 = k0 + tw * 3;
        const a = (1 - fx) * (1 - fy), b = fx * (1 - fy), c = (1 - fx) * fy, d = fx * fy;
        out[0] = tex[k0] * a + tex[k0 + 3] * b + tex[k1] * c + tex[k1 + 3] * d;
        out[1] = tex[k0 + 1] * a + tex[k0 + 4] * b + tex[k1 + 1] * c + tex[k1 + 4] * d;
        out[2] = tex[k0 + 2] * a + tex[k0 + 5] * b + tex[k1 + 2] * c + tex[k1 + 5] * d;
      },
    };
  }

  /* gradient stops [t, r, g, b, a] → premultiplied, for lookups */
  function premul(stops) { return stops.map(([t, r, g, b, a = 1]) => [t, r * a, g * a, b * a, a]); }
  function stopAt(S, t, o) {   // o = [r, g, b, a] premultiplied
    if (t <= S[0][0]) { const s = S[0]; o[0] = s[1]; o[1] = s[2]; o[2] = s[3]; o[3] = s[4]; return; }
    for (let i = 1; i < S.length; i++) {
      const s1 = S[i];
      if (t <= s1[0]) {
        const s0 = S[i - 1], f = (t - s0[0]) / (s1[0] - s0[0] || 1);
        o[0] = s0[1] + (s1[1] - s0[1]) * f; o[1] = s0[2] + (s1[2] - s0[2]) * f; o[2] = s0[3] + (s1[3] - s0[3]) * f; o[3] = s0[4] + (s1[4] - s0[4]) * f;
        return;
      }
    }
    const s = S[S.length - 1]; o[0] = s[1]; o[1] = s[2]; o[2] = s[3]; o[3] = s[4];
  }

  /* layers field. Layer kinds (design units; listed bottom first):
       blob   soft rotated ellipse, alpha·(1 − d²)²  — the widgets' fitted lights
       rad    ellipse with CSS-style stops (radial-gradient)
       lin    CSS-angle gradient with stops (linear-gradient), over an optional box
       planet a dark disc with a lit rim, glow outside and haze inside (Eclipse)
     A layer's `m` moves it: drift (ax, ay, fx, fy, p), breathing scale (as, fs),
     lean toward the pointer (lean), or following it (follow). */
  function layersField(def) {
    const [Wd, Hd] = def.size;
    const base = premul(def.base.map(s => (s.length === 4 ? [...s, 1] : s)));
    const L = def.layers.map(l => {
      const o = { ...l, x: l.cx, y: l.cy, s: 1 };
      if (l.stops) { o.S = premul(l.stops); o.end = o.S[o.S.length - 1][0]; o.endA = o.S[o.S.length - 1][4]; }
      if (l.t === 'blob') { o.cr = l.c[0] * l.a; o.cg = l.c[1] * l.a; o.cb = l.c[2] * l.a; }
      if (l.t === 'lin') {
        o.cx = o.x = 0; o.cy = o.y = 0;
        const [bx, by, bw, bh] = l.box || [0, 0, Wd, Hd], th = l.deg * D2R;
        o.dx = Math.sin(th); o.dy = -Math.cos(th); o.len = Math.abs(bw * Math.sin(th)) + Math.abs(bh * Math.cos(th));
        o.ox = bx + bw / 2; o.oy = by + bh / 2;
      }
      const r = (l.rot || 0) * D2R; o.co = Math.cos(r); o.si = Math.sin(r);
      return o;
    });
    const st = [0, 0, 0, 0];
    let PX = 0, PY = 0, PON = 0, T = 0, ROT = false;
    return {
      size: def.size,
      layers: L,
      prepare(t, P) {
        T = t; PX = P ? P.x : Wd / 2; PY = P ? P.y : Hd / 2; PON = P ? P.on : 0; ROT = !!(P && P.rot);
        for (let i = 0; i < L.length; i++) {
          const l = L[i], m = l.m;
          let x = l.cx, y = l.cy, s = 1;
          if (m) {
            if (m.ax) x += Math.sin(t * m.fx + m.p) * m.ax;
            if (m.ay) y += Math.cos(t * m.fy + m.p * 1.7) * m.ay;
            if (m.as) s += Math.sin(t * (m.fs || .2) + m.p * .7) * m.as;
            if (m.lean) { x += (PX - l.cx) * m.lean * PON; y += (PY - l.cy) * m.lean * PON; }
            if (m.leanX) x += (PX / Wd * 2 - 1) * m.leanX * PON;
            if (m.leanY) y += (PY / Hd * 2 - 1) * m.leanY * PON;
          }
          l.x = x; l.y = y; l.s = s;
          if (l.t === 'planet') l.hl = (l.light || 0) + Math.sin(t * .09) * 8 * D2R + (PX / Wd * 2 - 1) * 26 * D2R * PON;
        }
      },
      color(x, y, out) {
        // the base: opaque, vertical
        stopAt(base, y / Hd, st);
        let r = st[0], g = st[1], b = st[2];
        for (let i = 0; i < L.length; i++) {
          const l = L[i];
          if (ROT && l.flat) continue;   // e.g. a card's top sheen: meaningless once the design turns
          switch (l.t) {
            case 'blob': {
              const ex = x - l.x, ey = y - l.y;
              const u = (ex * l.co + ey * l.si) / (l.rx * l.s), v = (-ex * l.si + ey * l.co) / (l.ry * l.s), d2 = u * u + v * v;
              if (d2 < 1) { const k = (1 - d2) * (1 - d2), a = l.a * k, f = k; r = r * (1 - a) + l.cr * f; g = g * (1 - a) + l.cg * f; b = b * (1 - a) + l.cb * f; }
              break;
            }
            case 'rad': {
              const ex = x - l.x, ey = y - l.y;
              const u = (ex * l.co + ey * l.si) / (l.rx * l.s), v = (-ex * l.si + ey * l.co) / (l.ry * l.s), d = Math.sqrt(u * u + v * v);
              if (d < l.end || l.endA > 0) { stopAt(l.S, d, st); r = r * (1 - st[3]) + st[0]; g = g * (1 - st[3]) + st[1]; b = b * (1 - st[3]) + st[2]; }
              break;
            }
            case 'lin': {
              const t = ((x - l.ox - l.x) * l.dx + (y - l.oy - l.y) * l.dy) / l.len + .5;
              stopAt(l.S, t, st); r = r * (1 - st[3]) + st[0]; g = g * (1 - st[3]) + st[1]; b = b * (1 - st[3]) + st[2];
              break;
            }
            case 'planet': {
              const ex = x - l.x, ey = y - l.y, d = Math.sqrt(ex * ex + ey * ey), e = d - l.r;
              // where the light falls on the rim: brightest at angle hl from the top
              const ang = Math.atan2(ex, -ey) - l.hl, cf = Math.cos(ang), f = cf > 0 ? Math.pow(cf, l.fall) : 0;
              if (e < 0) {   // the body, with the atmosphere's haze along the lit edge
                const a = clamp(-e / l.aa, 0, 1);
                r = r * (1 - a) + l.body[0] * a; g = g * (1 - a) + l.body[1] * a; b = b * (1 - a) + l.body[2] * a;
                const h = l.haze[3] * Math.exp(e / l.haze[4]) * f;
                r = r * (1 - h) + l.haze[0] * h; g = g * (1 - h) + l.haze[1] * h; b = b * (1 - h) + l.haze[2] * h;
              } else {   // the glow beyond the edge
                const h = l.glow[3] * Math.exp(-e / l.glow[4]) * (.25 + .75 * f);
                r = r * (1 - h) + l.glow[0] * h; g = g * (1 - h) + l.glow[1] * h; b = b * (1 - h) + l.glow[2] * h;
              }
              const q = e / l.core[4], c = l.core[3] * Math.exp(-q * q) * f;   // the thin bright rim
              r = r * (1 - c) + l.core[0] * c; g = g * (1 - c) + l.core[1] * c; b = b * (1 - c) + l.core[2] * c;
              break;
            }
          }
        }
        out[0] = r; out[1] = g; out[2] = b;
      },
    };
  }

  /* ───────────── fitting a design to a frame ─────────────
     Positions stretch a little and the rest is cropped around the focus point:
     stretch 1 = fill exactly (distorts), 0 = crop only. A very wide design can
     turn a quarter on tall frames (portrait: 'rotate'): its left edge becomes
     the frame's bottom. */
  function fit(scene, W, H) {
    const rot = scene.portrait === 'rotate' && W / H < .8;
    if (rot) [W, H] = [H, W];
    const [Wd, Hd] = scene.size, sig = scene.stretch == null ? .5 : scene.stretch, f = scene.focus || [.5, .5];
    const ax = W / Wd, ay = H / Hd, c = Math.max(ax, ay);
    const sx = Math.pow(ax, sig) * Math.pow(c, 1 - sig), sy = Math.pow(ay, sig) * Math.pow(c, 1 - sig);
    return { sx, sy, ox: f[0] * (Wd - W / sx), oy: f[1] * (Hd - H / sy), W, H, rot };
  }

  /* ───────────── the liquid displacement (shared by painter and export) ─────────────
     in frame pixels, S = the frame's short side:
       dx = A·(sin(5.3y + .31t) + .66·cos(3.9x − .23t) + .5·sin(4.7(x + y) + .19t))
       dy = A·(sin(4.6x − .27t) + .7·cos(3.4y + .37t) + .5·sin(5.1(x − y) − .21t))   (x, y in S units)
     The cross terms split into column × row factors, so a frame costs W + H sines. */
  function flowTables(W, H, S, t, F) {
    if (!F || F.W !== W || F.H !== H) {
      F = { W, H };
      ['c1', 's3', 'c3', 's4', 's6', 'c6'].forEach(k => { F[k] = new Float32Array(W); });
      ['y1', 'yc3', 'ys3', 'y5', 'yc6', 'ys6'].forEach(k => { F[k] = new Float32Array(H); });
    }
    for (let i = 0; i < W; i++) {
      const x = (i + .5) / S;
      F.c1[i] = .66 * Math.cos(x * 3.9 - t * .23); F.s3[i] = Math.sin(x * 4.7); F.c3[i] = Math.cos(x * 4.7);
      F.s4[i] = Math.sin(x * 4.6 - t * .27); F.s6[i] = Math.sin(x * 5.1); F.c6[i] = Math.cos(x * 5.1);
    }
    for (let j = 0; j < H; j++) {
      const y = (j + .5) / S;
      F.y1[j] = Math.sin(y * 5.3 + t * .31); F.yc3[j] = Math.cos(y * 4.7 + t * .19); F.ys3[j] = Math.sin(y * 4.7 + t * .19);
      F.y5[j] = .7 * Math.cos(y * 3.4 + t * .37); F.yc6[j] = Math.cos(y * 5.1 + t * .21); F.ys6[j] = Math.sin(y * 5.1 + t * .21);
    }
    return F;
  }

  /* noise for exports: a triangular dither (±1 level) and a larger film-grain tile */
  const DITH = new Float32Array(256 * 256), GRAIN = new Int8Array(512 * 512);
  (() => {
    let seed = 20261101;
    const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    for (let i = 0; i < DITH.length; i++) DITH[i] = rnd() - rnd();
    for (let i = 0; i < GRAIN.length; i++) GRAIN[i] = Math.round((rnd() + rnd() - 1) * 127);
  })();

  /* ───────────── overlays: crisp line work drawn at full resolution ───────────── */
  function mulberry(seed) {
    return () => {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  /* the gallery's market line: a periodic curve so two copies tile seamlessly (lab.js) */
  function marketCurve(seed) {
    const W = 1200, H = 300, N = 260, rnd = mulberry(seed);
    const comps = Array.from({ length: 26 }, (_, i) => ({ k: i + 1, a: 46 / Math.pow(i + 1, .78) * (.45 + rnd() * .9), p: rnd() * Math.PI * 2 }));
    const ys = new Float32Array(N + 1);
    for (let j = 0; j <= N; j++) {
      const x = j / N * W;
      let y = H * .52;
      comps.forEach(c => { y += Math.sin((x / W) * Math.PI * 2 * c.k + c.p) * c.a; });
      ys[j] = y / H;
    }
    return ys;
  }
  const MARKET = [marketCurve(7), marketCurve(19)];
  function drawMarket(ctx, W, H, t, ys, hFrac, period, alpha, scale) {
    // one period spans 1200 / 1440 of the frame width at the gallery's size; scrolls right to left
    const h = H * .42 * hFrac, top = H - h, pw = W * 1200 / 1440 * 1.0, off = -((t / period) % 1) * pw, N = ys.length - 1;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    for (let rep = 0; rep * pw + off < W + pw; rep++) {
      for (let j = 0; j <= N; j++) {
        const x = off + rep * pw + j / N * pw, y = top + ys[j] * h;
        if (rep === 0 && j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    }
    const last = off + Math.ceil((W - off) / pw + 1) * pw;
    ctx.lineTo(last, H); ctx.lineTo(off, H); ctx.closePath();
    const g = ctx.createLinearGradient(0, top, 0, H);
    g.addColorStop(0, 'rgba(91,97,246,.12)'); g.addColorStop(1, 'rgba(91,97,246,0)');
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath();
    for (let rep = 0; rep * pw + off < W + pw; rep++) {
      for (let j = 0; j <= N; j++) {
        const x = off + rep * pw + j / N * pw, y = top + ys[j] * h;
        if (rep === 0 && j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = 'rgba(150,156,255,.38)'; ctx.lineWidth = 1.5 * scale; ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();
  }
  const OVERLAYS = {
    /* the gallery: a 56px grid fading out from the top, the two market lines */
    aurora(ctx, W, H, t, o) {
      const step = 56 * o.scale;
      ctx.save();
      ctx.strokeStyle = 'rgba(165,172,255,.07)'; ctx.lineWidth = Math.max(1, o.scale);
      ctx.beginPath();
      for (let x = (W / 2) % step; x < W; x += step) { ctx.moveTo(Math.round(x) + .5, 0); ctx.lineTo(Math.round(x) + .5, H); }
      for (let y = 0; y < H; y += step) { ctx.moveTo(0, Math.round(y) + .5); ctx.lineTo(W, Math.round(y) + .5); }
      ctx.stroke();
      // mask: ellipse 85% 65% at 50% 22%, solid to 25%, gone at 78%
      ctx.globalCompositeOperation = 'destination-in';
      ctx.translate(W / 2, H * .22); ctx.scale(W * .85, H * .65);
      const m = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      m.addColorStop(.25, '#000'); m.addColorStop(.78, 'rgba(0,0,0,0)');
      ctx.fillStyle = m; ctx.fillRect(-2, -2, 4, 4);
      ctx.restore();
      drawMarket(ctx, W, H, t, MARKET[0], .82, 170, .55, o.scale);
      drawMarket(ctx, W, H, t, MARKET[1], 1, 110, 1, o.scale);
    },
    /* widget 03: the glass's diagonal gloss, sliding with the pointer */
    gloss(ctx, W, H, t, o) {
      const bw = W * 1.24, th = 118 * D2R, dx = Math.sin(th), dy = -Math.cos(th), len = Math.abs(bw * dx) + Math.abs(H * dy);
      const cx = W / 2 - o.px * W * .035 + Math.sin(t * .13) * W * .01, cy = H / 2;
      const g = ctx.createLinearGradient(cx - dx * len / 2, cy - dy * len / 2, cx + dx * len / 2, cy + dy * len / 2);
      g.addColorStop(.24, 'rgba(255,255,255,0)'); g.addColorStop(.35, 'rgba(160,150,255,.045)');
      g.addColorStop(.416, 'rgba(190,182,255,.085)'); g.addColorStop(.421, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    },
  };

  /* ───────────── scene helpers ───────────── */
  const rgbOf = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  /* the widgets' lights: [cx, cy, rx, ry, angle, r, g, b, alpha], with drift and lean like set 06 */
  function lights(list, o = {}) {
    const k = o.drift == null ? 2.4 : o.drift, s = o.s || 1, dx = o.dx || 0, dy = o.dy || 0, W = o.W || 0, H = o.H || 0;
    return list.map(([cx, cy, rx, ry, th, r, g, b, a], j) => {
      const x = o.flipX ? W - cx : cx, y = o.flipY ? H - cy : cy, rot = (o.flipX ? -1 : 1) * (o.flipY ? -1 : 1) * th;
      const c = o.tint ? o.tint([r, g, b], j) : [r, g, b];
      return {
        t: 'blob', cx: dx + x * s, cy: dy + y * s, rx: rx * s, ry: ry * s, rot, c, a: a * (o.alpha || 1),
        m: { ax: 9 * k * s, ay: 7 * k * s, fx: .21 + j * .04, fy: .17 + j * .05, p: j * 1.3 + (o.phase || 0), lean: (.05 + j * .025) * (o.lean == null ? 1 : o.lean) },
      };
    });
  }
  const FADE06 = { t: 'lin', deg: 180, stops: [[.7, 0, 0, 0, 0], [.92, 0, 0, 0, .55], [1, 0, 0, 0, 1]] };

  /* set 06's fitted lights (cx, cy, rx, ry, angle, r, g, b, alpha), bottom first */
  const INS = [[272.6, 38.1, 132.1, 202.3, 74, 255, 66, 29, .678], [157.4, 159.8, 156.9, 116.5, -27.5, 210, 57, 15, .857],
    [111.8, 222.8, 204.4, 188, 20.3, 122, 25, 8, .868], [239.5, 172, 388.7, 147.4, 47.4, 147, 36, 6, .5],
    [353.3, -14.4, 153.8, 185.8, 3.4, 147, 55, 25, .68]];
  const CONV = [[260.1, 271.9, 163.8, 140.9, 15.5, 39, 146, 247, .883], [368.6, 355.2, 227.2, 195.6, 3.2, 3, 106, 198, .9],
    [130.8, 187.8, 219.5, 187.9, 29.9, 0, 95, 180, .831], [40.6, 98.8, 133.7, 78.5, -11.1, 2, 68, 121, .498],
    [453.2, 117.1, 202.4, 141.2, 103.1, 0, 72, 135, .684], [475, 253.7, 226.8, 295.1, -21.4, 0, 54, 106, .682]];

  /* widget 05's harmony in other hues: [lightness, hue] tables for each family */
  const PALETTES = {
    amber: { cool: [[.2, 352], [.36, 18], [.55, 42], [.72, 62], [.88, 80]], warm: [[.25, 276], [.5, 286], [.75, 300]], kc: 1.12 },
    lagoon: { cool: [[.2, 222], [.4, 205], [.62, 192], [.85, 182]], warm: [[.25, 322], [.5, 338], [.75, 352]], kc: 1.05, kw: 1.05 },
    royal: { cool: [[.2, 280], [.45, 288], [.7, 296], [.9, 304]], warm: [[.2, 24], [.4, 38], [.6, 52], [.8, 68]], kc: 1.15, kw: 1.08 },
    quartz: { cool: [[.2, 276], [.5, 290], [.9, 306]], warm: [[.3, 10], [.6, 24], [.9, 46]], lift: L => .6 + .37 * L, chroma: L => .62 + 1.1 * Math.max(0, .55 - L) },
  };

  /* ───────────── the backgrounds ─────────────
     from: the widget it was built from ('lab' = the gallery page), or null for the new series */
  const SCENES = [
    {
      id: 1, slug: 'prism', name: 'Prism', fa: 'منشور', from: '05',
      note: 'پنل رنگی ویجت ۰۵: گوشه‌ی روشن، فیروزه‌ای، سرمه‌ای و قرمز، مثل مایع روون.',
      size: [425, 291], focus: [.26, .5], stretch: .55, flow: 1,
      field: { kind: 'grid', grid: GRID05, gw: GW, gh: GH },
    },
    {
      id: 2, slug: 'deep-current', name: 'Deep Current', fa: 'جریان عمیق', from: '06·2',
      note: 'نور آبی کارت Conversion: شش نور نرم روی سرمه‌ای که پایینش سیاه می‌شه.',
      size: [476, 615], focus: [.5, .36], stretch: .5, flow: .55,
      field: { kind: 'layers', base: [[0, 1, 18, 36], [1, 1, 7, 14]], layers: [...lights(CONV), FADE06] },
    },
    {
      id: 3, slug: 'ember', name: 'Ember', fa: 'اخگر', from: '06·1',
      note: 'نور نارنجی کارت Insights: رگه‌ی آتشی بالا و سرخیِ گرم روی سیاه.',
      size: [476, 615], focus: [.5, .3], stretch: .5, flow: .55,
      field: { kind: 'layers', base: [[0, 22, 1, 1], [1, 0, 0, 0]], layers: [...lights(INS), FADE06] },
    },
    {
      id: 4, slug: 'violet-glass', name: 'Violet Glass', fa: 'شیشه‌ی بنفش', from: '03',
      note: 'شیشه‌ی کارت ۰۳: نور بنفش گوشه‌ها، برق مورب شیشه و نور روشن روی زمین.',
      size: [700, 520], focus: [.5, .5], stretch: .55, flow: .5, edge: { s: .04, c: [124, 92, 255], a: .2 },
      overlay: 'gloss',
      field: {
        kind: 'layers', base: [[0, 13, 12, 38], [.26, 8, 9, 27], [1, 6, 7, 26]], layers: [
          { t: 'rad', cx: 700, cy: 0, rx: 252, ry: 129, stops: [[0, 110, 90, 230, .22], [1, 110, 90, 230, 0]], m: { ax: 14, ay: 10, fx: .13, fy: .11, p: 1, as: .06, fs: .21 } },
          { t: 'rad', cx: 350, cy: 520, rx: 420, ry: 95, stops: [[0, 96, 62, 236, .3], [1, 96, 62, 236, 0]], m: { ax: 20, fx: .09, p: 2, as: .05, fs: .17, leanX: 30 } },
          { t: 'rad', cx: 0, cy: 520, rx: 238, ry: 172, stops: [[0, 112, 70, 255, .42], [.72, 112, 70, 255, 0]], m: { ax: 16, ay: 12, fx: .12, fy: .15, p: 3, as: .07, fs: .19 } },
          { t: 'rad', cx: 0, cy: 0, rx: 294, ry: 198, stops: [[0, 132, 98, 255, .5], [.7, 132, 98, 255, 0]], m: { ax: 18, ay: 14, fx: .1, fy: .13, p: 4, as: .07, fs: .15, lean: .04 } },
          // the light the card's violet chart threw on the glass (#6b4be3), without the chart
          { t: 'rad', cx: 400, cy: 330, rx: 360, ry: 150, rot: -8, stops: [[0, 107, 75, 227, .2], [.6, 80, 50, 200, .08], [1, 58, 37, 150, 0]], m: { ax: 24, ay: 10, fx: .08, fy: .12, p: 5, as: .06, fs: .14, lean: .05 } },
          // the light on the floor and its bright streak
          { t: 'rad', cx: 350, cy: 470, rx: 320, ry: 35, stops: [[0, 255, 252, 255, 1], [.1, 214, 196, 255, .85], [.3, 150, 110, 255, .6], [.58, 112, 72, 255, .26], [1, 96, 60, 240, 0]], m: { as: .04, fs: .9, p: 0, leanX: 40 } },
          { t: 'rad', cx: 350, cy: 470, rx: 179, ry: 7, stops: [[0, 255, 255, 255, 1], [.45, 232, 222, 255, .8], [1, 190, 160, 255, 0]], m: { as: .05, fs: .9, p: 0, leanX: 40 } },
        ],
      },
    },
    {
      id: 5, slug: 'blue-hour', name: 'Blue Hour', fa: 'ساعت آبی', from: '02',
      note: 'نور کارت ۰۲: نوار آبی سمت چپ، لکه‌ی فیروزه‌ای و نوری که دنبال اشاره‌گر میاد.',
      size: [500, 203], focus: [0, .5], stretch: .7, flow: .5, spot: { r: .3, a: .085 }, portrait: 'rotate',
      field: {
        kind: 'layers', base: [[0, 42, 42, 43], [.16, 29, 29, 30], [.38, 22, 22, 23], [.74, 17, 17, 18], [.93, 20, 20, 21], [1, 27, 27, 28]], layers: [
          { t: 'lin', deg: 90, box: [-10, 0, 520, 203], stops: [[0, 116, 185, 254, 1], [.07, 90, 143, 254, 1], [.13, 82, 130, 254, 1], [.195, 76, 114, 254, 1], [.255, 65, 91, 251, 1], [.315, 52, 70, 196, 1], [.375, 42, 50, 135, .55], [.44, 36, 42, 110, .16], [.5, 36, 42, 110, 0]], m: { ax: 5, fx: .9, p: 0, leanX: 16 } },
          { t: 'rad', cx: 250, cy: 125.9, rx: 176.8, ry: 152.25, stops: [[0, 34, 39, 112, .86], [.55, 33, 38, 104, .46], [1, 33, 38, 104, 0]], m: { ax: 5, fx: .9, p: 0, leanX: 16, leanY: 10, as: .04, fs: .9 } },
          { t: 'rad', cx: -8.4, cy: 127.9, rx: 60, ry: 131.95, stops: [[0, 130, 216, 255, .74], [.5, 112, 192, 255, .3], [.76, 100, 170, 255, 0]], m: { ay: 14, fy: .23, p: 1, as: .06, fs: .3 } },
          { t: 'rad', cx: 185, cy: 200, rx: 200, ry: 130, stops: [[0, 95, 140, 255, 1], [.45, 86, 120, 253, .92], [.7, 51, 65, 200, .7], [.85, 30, 36, 120, .32], [1, 30, 36, 120, 0]], m: { ax: 35, ay: 19, fx: .37, fy: .29, p: 0, leanX: 54, leanY: 29 } },
          { t: 'lin', deg: 180, stops: [[0, 255, 255, 255, .1], [.22, 255, 255, 255, 0]], flat: true },
        ],
      },
    },
    {
      id: 6, slug: 'night-aurora', name: 'Night Aurora', fa: 'شفق شب', from: 'lab',
      note: 'پس‌زمینه‌ی خود گالری: سه شفق آبی، بنفش و فیروزه‌ای، شبکه و خط بازار.',
      size: [1440, 900], focus: [.5, .4], stretch: .45, flow: .4, overlay: 'aurora',
      field: {
        kind: 'layers', base: [[0, 12, 15, 33], [.5, 7, 8, 18], [1, 5, 6, 13]], layers: [
          { t: 'rad', cx: 259, cy: 28, rx: 518, ry: 518, stops: [[0, 66, 80, 255, .5], [.72, 66, 80, 255, 0]], m: { ax: 100, ay: 45, fx: .157, fy: .131, p: 0, as: .09, fs: .16 } },
          { t: 'rad', cx: 1324, cy: 144, rx: 518, ry: 518, stops: [[0, 144, 92, 246, .34], [.72, 144, 92, 246, 0]], m: { ax: 100, ay: 45, fx: .131, fy: .109, p: 2.1, as: .09, fs: .13 } },
          { t: 'rad', cx: 735, cy: 760, rx: 418, ry: 418, stops: [[0, 30, 190, 255, .17], [.72, 30, 190, 255, 0]], m: { ax: 100, ay: 45, fx: .112, fy: .094, p: 4.2, as: .09, fs: .11 } },
          // the gallery's pointer light: rests at 50% / 28%, follows the pointer
          { t: 'rad', cx: 720, cy: 252, rx: 450, ry: 450, stops: [[0, 110, 118, 255, .17], [1, 110, 118, 255, 0]], m: { lean: .92 } },
        ],
      },
    },
    {
      id: 7, slug: 'fog', name: 'Fog', fa: 'مه', from: '04',
      note: 'دیوار پشت کارت‌های سلامتی ۰۴: خاکستری گرم، زیتونی و بادمجونی، مثل مه.',
      size: [460, 736], focus: [.5, .4], stretch: .5, flow: .6,
      field: {
        kind: 'layers', base: [[0, 138, 134, 129], [1, 138, 134, 129]], layers: [
          { t: 'rad', cx: 110.4, cy: 103, rx: 414, ry: 382.7, stops: [[0, 184, 179, 176, 1], [.74, 184, 179, 176, 0]] },
          { t: 'rad', cx: -27.6, cy: 750.7, rx: 294.4, ry: 250.2, stops: [[0, 140, 132, 106, .95], [.72, 140, 132, 106, 0]] },
          { t: 'rad', cx: 423.2, cy: 544.6, rx: 248.4, ry: 220.8, stops: [[0, 66, 72, 74, .9], [.72, 66, 72, 74, 0]] },
          { t: 'rad', cx: 478.4, cy: 765.4, rx: 340.4, ry: 294.4, stops: [[0, 46, 37, 52, .96], [.72, 46, 37, 52, 0]] },
          { t: 'rad', cx: 487.6, cy: 309.1, rx: 266.8, ry: 250.2, stops: [[0, 100, 99, 62, .95], [.74, 100, 99, 62, 0]] },
          { t: 'rad', cx: 478.4, cy: -14.7, rx: 285.2, ry: 220.8, stops: [[0, 58, 62, 60, .95], [.72, 58, 62, 60, 0]] },
          // the four drifting lights
          { t: 'rad', cx: 110.4, cy: 81, rx: 211.6, ry: 169.3, stops: [[0, 204, 199, 195, .5], [1, 204, 199, 195, 0]], m: { ax: 22, ay: 16, fx: .11, fy: .088, p: 0, lean: .04 } },
          { t: 'rad', cx: 395.6, cy: 338.6, rx: 193.2, ry: 147.2, stops: [[0, 112, 110, 62, .5], [1, 112, 110, 62, 0]], m: { ax: 22, ay: 16, fx: .135, fy: .108, p: 1.7, lean: .055 } },
          { t: 'rad', cx: 368, cy: 684.5, rx: 202.4, ry: 169.3, stops: [[0, 50, 38, 60, .55], [1, 50, 38, 60, 0]], m: { ax: 22, ay: 16, fx: .16, fy: .128, p: 3.4, lean: .07 } },
          { t: 'rad', cx: 59.8, cy: 677.1, rx: 188.6, ry: 147.2, stops: [[0, 150, 142, 110, .45], [1, 150, 142, 110, 0]], m: { ax: 22, ay: 16, fx: .185, fy: .148, p: 5.1, lean: .085 } },
        ],
      },
    },

    /* ── the new series: the same harmonies, new gradients ── */
    {
      id: 8, slug: 'prism-silk', name: 'Prism Silk', fa: 'ابریشم منشوری', from: null, kin: '05',
      note: 'همون رنگ‌های ۰۵، تاخورده مثل ابریشم: نوارهای سفید و فیروزه‌ای و قرمز که موج می‌خورن.',
      size: [425, 291], focus: [.5, .5], stretch: .6, flow: .7,
      field: {
        kind: 'grid', grid: GRID05, gw: GW, gh: GH,
        warp(x, y, t, o) {
          const u = x / 425, v = y / 291;
          o[0] = x + 92 * Math.sin(v * 5.2 + u * 2.1 + t * .23) + 36 * Math.sin(v * 11.3 - t * .31);
          o[1] = y + 70 * Math.sin(u * 4.4 - v * 1.3 - t * .19) + 24 * Math.cos(u * 9.1 + t * .27);
        },
      },
    },
    {
      id: 9, slug: 'amber-tide', name: 'Amber Tide', fa: 'مد کهربایی', from: null, kin: '05',
      note: 'هارمونی ۰۵ با رنگ غروب: کرم و طلایی و شرابی بالا، بنفش و نیلی پایین.',
      size: [425, 291], focus: [.74, .5], stretch: .55, flow: 1,
      field: { kind: 'grid', grid: flipGrid(retint(GRID05, PALETTES.amber), GW, GH, true, false), gw: GW, gh: GH },
    },
    {
      id: 10, slug: 'lagoon', name: 'Lagoon', fa: 'تالاب', from: null, kin: '05',
      note: 'هارمونی ۰۵ با رنگ آب: فیروزه‌ای و سبزآبی، با سرخابی و آلبالویی.',
      size: [425, 291], focus: [.26, .5], stretch: .55, flow: 1,
      field: { kind: 'grid', grid: retint(GRID05, PALETTES.lagoon), gw: GW, gh: GH },
    },
    {
      id: 11, slug: 'royal', name: 'Royal', fa: 'شاهانه', from: null, kin: '05',
      note: 'هارمونی ۰۵ با بنفش و نارنجی: یاسی روشن، بنفش عمیق و نارنجیِ گرم.',
      size: [425, 291], focus: [.5, .5], stretch: .55, flow: 1,
      field: { kind: 'grid', grid: flipGrid(retint(GRID05, PALETTES.royal), GW, GH, true, true), gw: GW, gh: GH },
    },
    {
      id: 12, slug: 'rose-quartz', name: 'Rose Quartz', fa: 'رزکوارتز', from: null, kin: '05',
      note: 'هارمونی ۰۵ روشن و پاستلی: یاسی، صورتی و هلویی. برای تم روشن.',
      size: [425, 291], focus: [.26, .5], stretch: .55, flow: 1,
      field: { kind: 'grid', grid: retint(GRID05, PALETTES.quartz), gw: GW, gh: GH },
    },
    {
      id: 13, slug: 'emerald-current', name: 'Emerald Current', fa: 'جریان زمردی', from: null, kin: '06·2',
      note: 'نورهای Conversion به رنگ زمرد: سبزآبی روشن روی سبزِ خیلی تیره.',
      size: [476, 615], focus: [.5, .36], stretch: .5, flow: .55,
      field: { kind: 'layers', base: [[0, ...turn([1, 18, 36], -88)], [1, ...turn([1, 7, 14], -88)]], layers: [...lights(CONV, { tint: c => turn(c, -86, 1.04) }), FADE06] },
    },
    {
      id: 14, slug: 'fuchsia-ember', name: 'Fuchsia Ember', fa: 'اخگر سرخابی', from: null, kin: '06·1',
      note: 'نورهای Insights به رنگ سرخابی: صورتیِ داغ و آلبالویی روی سیاه.',
      size: [476, 615], focus: [.5, .3], stretch: .5, flow: .55,
      field: { kind: 'layers', base: [[0, ...turn([22, 1, 1], -40)], [1, 0, 0, 0]], layers: [...lights(INS, { tint: c => turn(c, -42, 1.05) }), FADE06] },
    },
    {
      id: 15, slug: 'twin-flame', name: 'Twin Flame', fa: 'دو شعله', from: null, kin: '06',
      note: 'دو کارت ۰۶ کنار هم: آتش نارنجی از بالا، جریان آبی از پایین، که وسط به هم می‌رسن.',
      size: [720, 720], focus: [.5, .5], stretch: .5, flow: .55,
      field: {
        kind: 'layers', base: [[0, 14, 2, 4], [.5, 3, 4, 12], [1, 1, 9, 20]], layers: [
          ...lights(CONV, { flipX: true, flipY: true, W: 476, H: 615, s: 1.05, dx: -40, dy: 120, phase: 2 }),
          ...lights(INS, { flipX: true, W: 476, H: 615, s: 1.05, dx: 250, dy: -10 }),
        ],
      },
    },
    {
      id: 16, slug: 'eclipse', name: 'Eclipse', fa: 'کسوف', from: null, kin: '03',
      note: 'نور بنفش ۰۳ پشت یه سیاره: لبه‌ی روشن، هاله‌ی بنفش و نوری که با اشاره‌گر دور لبه می‌چرخه.',
      size: [1000, 700], focus: [.5, .5], stretch: .45, flow: .35,
      field: {
        kind: 'layers', base: [[0, 9, 7, 30], [.55, 12, 10, 40], [1, 5, 4, 16]], layers: [
          { t: 'rad', cx: 0, cy: 0, rx: 470, ry: 330, stops: [[0, 132, 98, 255, .42], [.7, 132, 98, 255, 0]], m: { ax: 26, ay: 18, fx: .1, fy: .13, p: 0, as: .07, fs: .15 } },
          { t: 'rad', cx: 1000, cy: 40, rx: 380, ry: 260, stops: [[0, 110, 90, 230, .26], [1, 110, 90, 230, 0]], m: { ax: 22, ay: 14, fx: .12, fy: .1, p: 2, as: .06, fs: .19 } },
          { t: 'rad', cx: 500, cy: 470, rx: 640, ry: 190, stops: [[0, 120, 80, 255, .36], [.55, 96, 62, 236, .14], [1, 96, 62, 236, 0]], m: { as: .05, fs: .5, p: 1 } },
          {
            t: 'planet', cx: 500, cy: 1290, r: 820, aa: 2.2, fall: 2.2, light: 0,
            body: [6, 5, 16], haze: [118, 80, 255, .55, 70], glow: [140, 104, 255, .62, 46], core: [246, 240, 255, .95, 4.5],
            m: { ay: 9, fy: .11, p: 0 },
          },
          { t: 'rad', cx: 500, cy: 470, rx: 300, ry: 9, stops: [[0, 255, 255, 255, .9], [.45, 232, 222, 255, .55], [1, 190, 160, 255, 0]], m: { ay: 9, fy: .11, p: 0, leanX: 120 } },
        ],
      },
    },
  ];

  /* compile each scene's field once */
  function compile(scene) {
    if (scene.compiled) return scene.compiled;
    const def = { ...scene.field, size: scene.size };
    scene.compiled = def.kind === 'grid' ? gridField(def) : layersField(def);
    return scene.compiled;
  }

  /* ───────────── the painter: one small canvas, redrawn every frame ───────────── */
  class Painter {
    constructor(canvas, scene, o = {}) {
      this.cv = canvas;
      this.ctx = canvas.getContext('2d', { alpha: false });
      this.scene = scene;
      this.field = compile(scene);
      this.div = o.div || 6;
      this.maxPx = o.maxPx || 26000;
      this.t = o.t0 == null ? Math.random() * 60 : o.t0;
      this.flowAmp = 1;
      this.p = { in: false, x: 0, y: 0, down: false, lx: null, ly: null, mouse: true };
      this.s = {
        lens: spring(0, 110, 7), vx: spring(0, 60, 13), vy: spring(0, 60, 13), on: spring(0, 40, 12),
        px: spring(.5, 70, 15), py: spring(.5, 70, 15), expo: 1,
      };
      this.rip = [];
      this.cw = 0; this.ch = 0; this.cssW = 0; this.cssH = 0;
      this.tmp = [0, 0, 0]; this.F = null;
    }
    resize(w, h) {
      if (w < 2 || h < 2) return false;
      let cw = Math.max(16, Math.round(w / this.div)), ch = Math.max(16, Math.round(h / this.div));
      if (cw * ch > this.maxPx) { const f = Math.sqrt(this.maxPx / (cw * ch)); cw = Math.round(cw * f); ch = Math.round(ch * f); }
      this.cssW = w; this.cssH = h;
      if (cw === this.cw && ch === this.ch) return false;
      this.cw = cw; this.ch = ch;
      this.cv.width = cw; this.cv.height = ch;
      this.img = this.ctx.createImageData(cw, ch);
      this.map = fit(this.scene, cw, ch);
      return true;
    }
    setScene(scene) {
      this.scene = scene; this.field = compile(scene);
      if (this.cw) this.map = fit(scene, this.cw, this.ch);
    }
    /* pointer input in CSS pixels of the canvas box */
    move(x, y, mouse = true) {
      const p = this.p;
      p.in = true; p.mouse = mouse; p.x = x; p.y = y;
    }
    leave() { this.p.in = false; this.p.down = false; this.p.lx = this.p.ly = null; }
    press(x, y, a = 1) { this.p.down = true; this.move(x, y, this.p.mouse); this.ripple(x, y, a); }
    release() { this.p.down = false; }
    ripple(x, y, a = 1) {
      if (this.rip.length > 4) this.rip.shift();
      this.rip.push({ x: x / this.cssW * this.cw, y: y / this.cssH * this.ch, r: 0, a });
    }
    /* advance springs and time; returns true while something is moving fast (draw every frame) */
    step(dt, motion = 1) {
      const p = this.p, s = this.s, k = this.cw / (this.cssW || 1), S = Math.min(this.cw, this.ch);
      this.t += dt * motion;
      this.flowAmp = motion;
      const on = p.in ? 1 : 0;
      s.on.t = on;
      s.lens.t = !p.in ? 0 : p.down ? .72 : .17;
      if (p.in) {
        const x = p.x * k, y = p.y * k;
        if (p.lx !== null && dt > 0) {
          const lim = S * .3;
          const f = .045 / Math.max(dt, 1 / 240);
          s.vx.t = clamp((x - p.lx) * f, -lim, lim); s.vy.t = clamp((y - p.ly) * f, -lim, lim);
        }
        p.lx = x; p.ly = y;
        s.px.t = x / this.cw; s.py.t = y / this.ch;
      } else { s.vx.t = 0; s.vy.t = 0; s.px.t = .5; s.py.t = .5; }
      step(s.lens, dt); step(s.vx, dt); step(s.vy, dt); step(s.on, dt); step(s.px, dt); step(s.py, dt);
      const fade = Math.pow(.82, dt * 60); s.vx.t *= fade; s.vy.t *= fade;   // the sweep dies away when the pointer rests
      for (const r of this.rip) { r.r += dt * S * .95; r.a *= Math.pow(.2, dt); }
      this.rip = this.rip.filter(r => r.a > .01);
      return p.in || this.rip.length > 0 || Math.abs(s.lens.v) > .004 || Math.abs(s.lens.vel) > .01;
    }
    draw() {
      const { cw, ch, img, map, s, p } = this;
      if (!cw) return;
      const px = img.data, S = Math.min(cw, ch), t = this.t, out = this.tmp, field = this.field, sc = this.scene;
      const F = this.F = flowTables(cw, ch, S, t, this.F);
      const { c1, s3, c3, s4, s6, c6, y1, yc3, ys3, y5, yc6, ys6 } = F;
      // the pointer, in frame pixels and in design units (for lights that lean)
      const k = cw / this.cssW, pxx = s.px.v * cw, pyy = s.py.v * ch;
      field.prepare(t, map.rot ? { x: map.ox + (ch - pyy) / map.sx, y: map.oy + pxx / map.sy, on: s.on.v, rot: true } : { x: map.ox + pxx / map.sx, y: map.oy + pyy / map.sy, on: s.on.v });
      const A = .032 * S * (sc.flow == null ? 1 : sc.flow) * this.flowAmp;
      const sig2 = 2 * (S * .21) * (S * .21), lens = s.lens.v, vx = s.vx.v, vy = s.vy.v;
      const ptrOn = Math.abs(lens) > .002 || Math.abs(vx) + Math.abs(vy) > .02;
      const pxp = p.in ? p.x * k : pxx, pyp = p.in ? p.y * k : pyy;
      const rips = this.rip, rw = S * .075, rk = S * .045;
      const spot = sc.spot && s.on.v > .01 ? sc.spot : null, spR = spot ? spot.r * S : 0, spA = spot ? spot.a * s.on.v : 0, spC = spot && spot.c ? spot.c : [255, 255, 255];
      const edge = sc.edge || null, eS = edge ? edge.s * S : 0;
      // slow breathing of the whole composition
      const z = 1 + .022 * Math.sin(t * .11), ox = map.ox + Math.sin(t * .07) * .018 * sc.size[0], oy = map.oy + Math.cos(t * .059) * .018 * sc.size[1];
      const iz = 1 / z, rot = map.rot, cx0 = (rot ? ch : cw) / 2, cy0 = (rot ? cw : ch) / 2;
      const expo = s.expo;
      let o = 0;
      for (let j = 0; j < ch; j++) {
        const y = j + .5, a1 = y1[j], a3 = yc3[j], b3 = ys3[j], a5 = y5[j], a6 = yc6[j], b6 = ys6[j];
        for (let i = 0; i < cw; i++) {
          const x = i + .5;
          let dx = A * (a1 + c1[i] + .5 * (s3[i] * a3 + c3[i] * b3)), dy = A * (s4[i] + a5 + .5 * (s6[i] * a6 - c6[i] * b6));
          if (ptrOn) {
            const ex = x - pxp, ey = y - pyp, d2 = ex * ex + ey * ey;
            if (d2 < sig2 * 4.5) { const g = Math.exp(-d2 / sig2); dx += (vx + ex * lens) * g; dy += (vy + ey * lens) * g; }
          }
          for (let r = 0; r < rips.length; r++) {
            const R = rips[r], ex = x - R.x, ey = y - R.y, d = Math.sqrt(ex * ex + ey * ey) + .01, q = (d - R.r) / rw;
            if (q > -3 && q < 3) { const f = R.a * Math.exp(-q * q) * Math.sin(q * 2.4) * rk / d; dx += ex * f; dy += ey * f; }
          }
          let sx = x - dx, sy = y - dy;
          if (rot) { const k = sx; sx = ch - sy; sy = k; }
          field.color(ox + (cx0 + (sx - cx0) * iz) / map.sx, oy + (cy0 + (sy - cy0) * iz) / map.sy, out);
          let R = out[0], G = out[1], B = out[2];
          if (spot) {
            const ex = x - pxp, ey = y - pyp, d = Math.sqrt(ex * ex + ey * ey);
            if (d < spR) { const a = spA * (1 - d / spR); R += (spC[0] - R) * a; G += (spC[1] - G) * a; B += (spC[2] - B) * a; }
          }
          if (edge) {
            const d = Math.min(x, y, cw - x, ch - y) / eS, a = edge.a * Math.exp(-d * d * .5);
            R += (edge.c[0] - R) * a; G += (edge.c[1] - G) * a; B += (edge.c[2] - B) * a;
          }
          px[o] = R * expo; px[o + 1] = G * expo; px[o + 2] = B * expo; px[o + 3] = 255; o += 4;
        }
      }
      this.ctx.putImageData(img, 0, 0);
    }
  }

  /* ───────────── export: the same field at full size ─────────────
     grain: film grain blended like CSS `overlay` (none in deep black or white);
     every pixel is dithered so dark gradients don't band. */
  async function render(scene, W, H, o = {}) {
    const field = compile(scene), t = o.t == null ? 12 : o.t, grain = o.grain == null ? .045 : o.grain;
    const cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d', { alpha: false });
    const map = fit(scene, W, H), S = Math.min(W, H);
    field.prepare(t, map.rot ? { x: scene.size[0] / 2, y: scene.size[1] / 2, on: 0, rot: true } : null);
    const A = o.exact ? 0 : .032 * S * (scene.flow == null ? 1 : scene.flow), out = [0, 0, 0];
    const { c1, s3, c3, s4, s6, c6, y1, yc3, ys3, y5, yc6, ys6 } = flowTables(W, H, S, t, null);
    const gk = grain * 2 / 127 * 255 / 127.5;
    // exact: the design as drawn, without the flow and the slow breathing (for comparisons)
    const z = o.exact ? 1 : 1 + .022 * Math.sin(t * .11), ox = map.ox + (o.exact ? 0 : Math.sin(t * .07) * .018 * scene.size[0]), oy = map.oy + (o.exact ? 0 : Math.cos(t * .059) * .018 * scene.size[1]);
    const rot = map.rot, cx0 = (rot ? H : W) / 2, cy0 = (rot ? W : H) / 2, edge = scene.edge || null, eS = edge ? edge.s * S : 0;
    const band = Math.max(1, Math.floor(160000 / W));
    for (let y0 = 0; y0 < H; y0 += band) {
      const rows = Math.min(band, H - y0), img = ctx.createImageData(W, rows), px = img.data;
      let p = 0;
      for (let j = 0; j < rows; j++) {
        const jj = y0 + j, y = jj + .5, a1 = y1[jj], a3 = yc3[jj], b3 = ys3[jj], a5 = y5[jj], a6 = yc6[jj], b6 = ys6[jj];
        const drow = (jj & 255) << 8, grow = (jj & 511) << 9;
        for (let i = 0; i < W; i++) {
          const x = i + .5;
          const dx = A * (a1 + c1[i] + .5 * (s3[i] * a3 + c3[i] * b3)), dy = A * (s4[i] + a5 + .5 * (s6[i] * a6 - c6[i] * b6));
          let X = x - dx, Y = y - dy;
          if (rot) { const k = X; X = H - Y; Y = k; }
          field.color(ox + (cx0 + (X - cx0) / z) / map.sx, oy + (cy0 + (Y - cy0) / z) / map.sy, out);
          let R = out[0], G = out[1], B = out[2];
          if (edge) {
            const d = Math.min(x, y, W - x, H - y) / eS, a = edge.a * Math.exp(-d * d * .5);
            R += (edge.c[0] - R) * a; G += (edge.c[1] - G) * a; B += (edge.c[2] - B) * a;
          }
          if (grain) {   // overlay-style: strongest in the mid tones, none in black or white
            const n = GRAIN[grow | (i & 511)] * gk;
            R += n * (R < 127.5 ? R : 255 - R); G += n * (G < 127.5 ? G : 255 - G); B += n * (B < 127.5 ? B : 255 - B);
          }
          const d = DITH[drow | (i & 255)];   // triangular dither, ±1 level
          px[p] = R + d; px[p + 1] = G + d; px[p + 2] = B + d; px[p + 3] = 255; p += 4;
        }
      }
      ctx.putImageData(img, 0, y0);
      if (o.progress) o.progress(Math.min(1, (y0 + rows) / H));
      await new Promise(r => setTimeout(r, 0));
    }
    if (scene.overlay && OVERLAYS[scene.overlay]) OVERLAYS[scene.overlay](ctx, W, H, t, { scale: Math.min(W, H) / 900, px: 0 });
    return cv;
  }

  window.BGLab = { SCENES, Painter, render, compile, fit, OVERLAYS, hexOf, rgb2lab, lab2rgb, turn, retint, GRID05 };
})();
