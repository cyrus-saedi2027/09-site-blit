/* ==========================================================================
   Set 05 · Progress Report · weekly steps (one card)
   Exchange-app Widget Lab · uses WidgetLab.kit + GSAP 3.13

   Units: 1u = 1px of the reference shot. The card is 448 × 427 u and sits at
   (76, 66) in a 600 × 560 u stage: a dark tiled wall like the shot's, with
   room for the lean and the card's long shadow.

   Motion map
   · light    the panel's colours are a live 34 × 24 grid sampled from the
              shot, redrawn smooth every frame: they drift like liquid, swell
              under the pointer, follow its sweep and ring out when pressed
   · number   rolling digits: a count-up on entry, live ticks, each day
   · "+"      leans toward the pointer; turns into × and opens the week:
              seven goal capsules rise, scrub them for each day's steps
   · pill     flips between steps and percent; digits roll inside it
   · lean     the card turns toward the pointer and its layers part in depth
   · icon     the sneaker walks while the pointer is near; its glow breathes
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab || !Lab.kit) { console.warn('[set 05] lab.js / kit.js missing'); return; }
  const { clamp, lerp, r2, spring, step, writer, pointer, Odo } = Lab.kit;

  const SW = 600, SH = 560;
  const CARD = { x: 76, y: 66, w: 448, h: 427 };
  const PAN = { x: 12, y: 123.5, w: 425, h: 291 };    // the colour panel, in card units
  const PLUS = { x: 378.5, y: 45, r: 31 };            // the round button, in panel units
  const WEEKBOX = { x: 24, y: 22, w: 312, h: 106 };   // goal capsules, in panel units

  /* the panel's colours: the shot sampled on a 34 × 24 grid, text and buttons painted out */
  const GW = 34, GH = 24;
  const HEX = [
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
  const GRID = new Float32Array(GW * GH * 3);
  for (let i = 0; i < GRID.length; i++) GRID[i] = parseInt(HEX.substr(i * 2, 2), 16);

  /* sample data: this week (Monday → today, Friday) against last week */
  const WEEK = [
    { d: 'Monday', s: 2.1, last: 1.2 }, { d: 'Tuesday', s: 3.4, last: .9 }, { d: 'Wednesday', s: 1.8, last: 1.4 },
    { d: 'Thursday', s: 2.9, last: 1 }, { d: 'Friday', s: 2.5, last: 1.2, today: true },
    { d: 'Saturday', s: null, last: 1.6 }, { d: 'Sunday', s: null, last: 1.1 },
  ];
  const GOAL = 3.2;   // thousand steps a day
  const LAST_DAY = WEEK.findIndex(d => d.today);
  const sum = key => WEEK.slice(0, LAST_DAY + 1).reduce((a, d) => a + d[key], 0);
  const r1 = v => Math.round(v * 10) / 10;
  const fmtK = v => `${r1(v).toFixed(1)}K`;
  const fmtDiff = v => { const r = r1(v), a = Math.abs(r); return `${r < 0 ? '−' : '+'}${a % 1 === 0 ? a.toFixed(0) : a.toFixed(1)}K Steps`; };
  const fmtPct = (a, b) => { const p = Math.round((a / b - 1) * 100); return `${p < 0 ? '−' : '+'}${Math.abs(p)}%`; };

  /* ───────────── the colour field ───────────── */
  function Field(canvas) {
    const CW = 88, CH = 61, PAD = 16;   // canvas pixels; it covers the panel plus PAD u on every side
    canvas.width = CW; canvas.height = CH;
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = ctx.createImageData(CW, CH), px = img.data;
    const X = new Float32Array(CW), Y = new Float32Array(CH);
    for (let i = 0; i < CW; i++) X[i] = -PAD + (i + .5) / CW * (PAN.w + PAD * 2);
    for (let j = 0; j < CH; j++) Y[j] = -PAD + (j + .5) / CH * (PAN.h + PAD * 2);
    const ax = new Float32Array(CW), bx = new Float32Array(CW), ay = new Float32Array(CH), by = new Float32Array(CH);
    const wx = new Float32Array(4), wy = new Float32Array(4);
    const cubic = (t, o) => { const t2 = t * t, t3 = t2 * t; o[0] = (-t3 + 2 * t2 - t) * .5; o[1] = (3 * t3 - 5 * t2 + 2) * .5; o[2] = (-3 * t3 + 4 * t2 + t) * .5; o[3] = (t3 - t2) * .5; };
    let R = 0, G = 0, B = 0;
    function sample(sx, sy) {   // Catmull-Rom over the grid
      const gx = sx / PAN.w * GW - .5, gy = sy / PAN.h * GH - .5, ix = Math.floor(gx), iy = Math.floor(gy);
      cubic(gx - ix, wx); cubic(gy - iy, wy);
      R = G = B = 0;
      for (let m = 0; m < 4; m++) {
        const row = Math.min(GH - 1, Math.max(0, iy - 1 + m)) * GW, wm = wy[m];
        for (let n = 0; n < 4; n++) {
          const k = (row + Math.min(GW - 1, Math.max(0, ix - 1 + n))) * 3, w = wx[n] * wm;
          R += GRID[k] * w; G += GRID[k + 1] * w; B += GRID[k + 2] * w;
        }
      }
    }
    const S2 = 2 * 78 * 78;
    return {
      /* t: time; amp: idle drift (0…1); p: pointer { on, x, y, vx, vy, lens }; ring: { a, x, y, r } */
      draw(t, amp, p, ring) {
        for (let i = 0; i < CW; i++) { ax[i] = Math.sin(X[i] * .015 - t * .31) * 9 * amp; bx[i] = Math.cos(X[i] * .021 + t * .23) * 6 * amp; }
        for (let j = 0; j < CH; j++) { ay[j] = Math.sin(Y[j] * .019 + t * .37) * 10 * amp; by[j] = Math.cos(Y[j] * .013 - t * .27) * 7 * amp; }
        let o = 0;
        for (let j = 0; j < CH; j++) {
          const y = Y[j];
          for (let i = 0; i < CW; i++) {
            const x = X[i];
            let dx = ay[j] + bx[i], dy = ax[i] + by[j];
            if (p.on) {
              const ex = x - p.x, ey = y - p.y, d2 = ex * ex + ey * ey;
              if (d2 < S2 * 4) { const g = Math.exp(-d2 / S2); dx += (p.vx + ex * p.lens) * g; dy += (p.vy + ey * p.lens) * g; }
            }
            if (ring.a > .002) {
              const ex = x - ring.x, ey = y - ring.y, d = Math.sqrt(ex * ex + ey * ey) + .01, q = (d - ring.r) / 30;
              if (q > -3 && q < 3) { const f = ring.a * Math.exp(-q * q) * Math.sin(q * 2.4) * 16 / d; dx += ex * f; dy += ey * f; }
            }
            sample(x - dx, y - dy);
            px[o] = R; px[o + 1] = G; px[o + 2] = B; px[o + 3] = 255; o += 4;
          }
        }
        ctx.putImageData(img, 0, 0);
      },
    };
  }

  /* ───────────── markup ───────────── */
  const U = n => `calc(${n} * var(--u))`;
  const SHOE = '<g class="w05-shoe-g" transform="rotate(31 12.6 13.6)"><path d="M3.6 9.2c0-.9.8-1.5 1.7-1.3l3.1.8c.8.2 1.5.6 2.1 1.1l1.9 1.5c.7.6 1.6.9 2.5 1l3.7.5c2 .3 3.3 1.4 3.3 3v.6H3.6z" fill="#fff"/><path d="M3.3 17.6H22v.8c0 .9-.7 1.6-1.6 1.6H4.9c-.9 0-1.6-.7-1.6-1.6z" fill="#fff" opacity=".86"/><path d="M11.1 11.3l1.2-1.1M13.1 12.6l1.1-1M15.4 13.4l1-.8" stroke="#f39a68" stroke-width="1.15" stroke-linecap="round"/></g>';
  const CAPS = WEEK.map((d, i) => `<div class="w05-cap${d.s === null ? ' is-future' : ''}${d.today ? ' is-today' : ''}" style="left:${U(r2(i * (WEEKBOX.w - 28) / 6))}"><span class="w05-cap-clip"><i class="w05-cap-fill"></i></span><b>${d.d[0]}</b></div>`).join('');
  const HTML = `<div class="w05-stage">
  <div class="w05-back" aria-hidden="true"><i class="w05-spot"></i><i class="w05-gv" style="left:${U(CARD.x + 225)}"></i><i class="w05-gh" style="top:${U(CARD.y + 41.5)}"></i><i class="w05-gh" style="top:${U(CARD.y + 385.5)}"></i></div>
  <div class="w05-intro">
    <article class="w05-card" aria-label="Progress Report, weekly steps">
      <i class="w05-shadow" aria-hidden="true"></i>
      <div class="w05-in">
        <div class="w05-app" aria-hidden="true"><i class="w05-app-glow"></i><span class="w05-app-tile"><svg class="w05-shoe" viewBox="0 0 24 24">${SHOE}</svg></span></div>
        <h3 class="w05-title">Progress Report</h3>
        <p class="w05-subtitle">Your weekly steps goals</p>
        <div class="w05-panel">
          <div class="w05-depth js-field"><canvas class="w05-field" aria-hidden="true"></canvas></div>
          <i class="w05-veil" aria-hidden="true"></i>
          <div class="w05-week" id="w05-week-__N__" role="slider" tabindex="-1" aria-label="Steps per day this week" aria-valuemin="0" aria-valuemax="${LAST_DAY}" aria-hidden="true">${CAPS}</div>
          <div class="w05-depth is-front js-front">
            <p class="w05-label"><span class="js-label">Total Steps</span></p>
            <div class="w05-num"><span class="js-num"></span></div>
            <button type="button" class="w05-pill" aria-pressed="false" aria-label="Show the change in percent"><span class="w05-pill-face js-pillface"><span class="js-pill"></span></span></button>
            <p class="w05-cmp"><span class="js-cmp">Compare to Last week</span></p>
          </div>
          <button type="button" class="w05-plus" aria-expanded="false" aria-controls="w05-week-__N__" aria-label="Show each day"><i class="w05-plus-rim"></i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.5v11M6.5 12h11"/></svg></button>
          <p class="w05-sr js-live" aria-live="polite"></p>
        </div>
      </div>
    </article>
  </div>
</div>`;

  /* ───────────── the widget ───────────── */
  let counter = 0;
  function mount(host) {
    const n = ++counter;
    host.classList.add('w05');
    host.setAttribute('dir', 'ltr'); host.setAttribute('lang', 'en');
    host.innerHTML = HTML.replace(/__N__/g, n);
    const $ = s => host.querySelector(s);
    const stage = $('.w05-stage'), introEl = $('.w05-intro'), card = $('.w05-card'), panel = $('.w05-panel');
    const els = {
      field: $('.js-field'), front: $('.js-front'), veil: $('.w05-veil'), week: $('.w05-week'), caps: [...host.querySelectorAll('.w05-cap')],
      label: $('.js-label'), cmp: $('.js-cmp'), pill: $('.w05-pill'), pillFace: $('.js-pillface'), plus: $('.w05-plus'), plusSvg: $('.w05-plus svg'),
      live: $('.js-live'), app: $('.w05-app'), shoe: $('.w05-shoe'), glow: $('.w05-app-glow'), spot: $('.w05-spot'), shadow: $('.w05-shadow'),
      title: $('.w05-title'), subtitle: $('.w05-subtitle'),
    };
    const field = Field($('.w05-field'));
    const num = new Odo($('.js-num')), pillOdo = new Odo($('.js-pill'));
    const W = writer(), P = pointer(stage, SW, SH);
    const S = {
      t: 0, unit: 1, running: false, idle: 1, live: false, liveT: 0,
      open: false, pick: null, pct: false,
      tiltX: spring(0, 90, 15), tiltY: spring(0, 90, 15), near: spring(0, 60, 14), walk: 0,
      fx: spring(PAN.w * .3, 80, 16), fy: spring(PAN.h * .4, 80, 16), fvx: spring(0, 60, 13), fvy: spring(0, 60, 13), lens: spring(0, 70, 14),
      ring: { a: 0, x: 0, y: 0, r: 0 }, magX: spring(0, 160, 16), magY: spring(0, 160, 16), plusRot: spring(0, 170, 15), veil: spring(0, 90, 18),
      spotX: spring(SW / 2, 40, 12), spotY: spring(SH * .4, 40, 12), lastPX: null, lastPY: null, fieldEvery: 0,
    };
    const caps = els.caps.map((el, i) => ({ el, fill: el.querySelector('.w05-cap-fill'), h: spring(0, 120, 14), f: spring(0, 110, 13), on: spring(0, 160, 18) }));

    /* ── what the panel shows ── */
    function view() {
      if (S.pick === null) return { value: sum('s'), last: sum('last'), label: 'Total Steps', cmp: 'Compare to Last week', who: 'this week' };
      const d = WEEK[S.pick];
      return { value: d.s, last: d.last, label: d.d, cmp: `Compare to last ${d.d}`, who: d.d };
    }
    let lastLabel = '', lastCmp = '';
    function swapText(el, text, dir = 1) {
      if (el.textContent === text) return;
      if (Lab.reduced) { el.textContent = text; return; }
      gsap.killTweensOf(el);
      gsap.to(el, { yPercent: -60 * dir, opacity: 0, duration: .16, ease: 'power2.in', onComplete: () => { el.textContent = text; gsap.fromTo(el, { yPercent: 60 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .38, ease: 'expo.out' }); } });
    }
    function render(o = {}) {
      const v = view();
      num.set(fmtK(v.value), { dir: o.dir, instant: o.instant, fromZero: o.fromZero, dur: o.dur });
      pillOdo.set(S.pct ? fmtPct(v.value, v.last) : fmtDiff(v.value - v.last), { instant: o.instant, dur: .7 });
      if (v.label !== lastLabel) { o.instant ? (els.label.textContent = v.label) : swapText(els.label, v.label, o.dir || 1); lastLabel = v.label; }
      if (v.cmp !== lastCmp) { o.instant ? (els.cmp.textContent = v.cmp) : swapText(els.cmp, v.cmp, o.dir || 1); lastCmp = v.cmp; }
      const diff = r1(v.value - v.last);
      const said = `${v.label}: ${fmtK(v.value).replace('K', ' thousand')} steps, ${diff >= 0 ? 'up' : 'down'} ${Math.abs(diff)} thousand on last ${S.pick === null ? 'week' : WEEK[S.pick].d}`;
      els.week.setAttribute('aria-valuetext', said);
      if (S.pick !== null) els.week.setAttribute('aria-valuenow', S.pick);
      if (o.announce) els.live.textContent = said;
    }
    function paintCaps() {
      caps.forEach((c, i) => {
        const d = WEEK[i];
        c.f.t = S.open && d.s !== null ? Math.min(1, d.s / GOAL) : 0;
        c.on.t = S.pick === null ? 0 : S.pick === i ? 1 : -1;
      });
    }

    /* ── the round button: open / close the week ── */
    function setOpen(open) {
      if (S.open === open) return;
      S.open = open;
      host.classList.toggle('is-open', open);
      els.plus.setAttribute('aria-expanded', String(open));
      els.plus.setAttribute('aria-label', open ? 'Back to the week total' : 'Show each day');
      els.week.setAttribute('aria-hidden', String(!open));
      els.week.tabIndex = open ? 0 : -1;
      S.plusRot.t = open ? 1 : 0;
      S.veil.t = open ? 1 : 0;
      caps.forEach((c, i) => { c.delay = S.t + (Lab.reduced ? 0 : open ? .05 + i * .045 : (6 - i) * .02); c.target = open ? 1 : 0; });
      if (!open && S.pick !== null) { S.pick = null; render({ dir: -1 }); }
      paintCaps();
      pulse(PLUS.x, PLUS.y, open ? 1 : .6);
      els.live.textContent = open ? 'Each day of this week. Move across the days to read them.' : 'Week total.';
    }
    els.plus.addEventListener('click', () => setOpen(!S.open));

    /* ── the week capsules: scrub for a day ── */
    const capX = i => WEEKBOX.x + i * (WEEKBOX.w - 28) / 6 + 14;
    function pickDay(i, o = {}) {
      if (i !== null) i = clamp(i, 0, LAST_DAY);
      if (i === S.pick) return;
      const dir = i === null ? -1 : S.pick === null ? 1 : (i > S.pick ? 1 : -1);
      S.pick = i;
      paintCaps();
      render({ dir, announce: o.announce });
    }
    let leave = 0, pressed = false;
    const dayAt = e => {
      const r = panel.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * PAN.w;
      let best = 0, bd = 1e9;
      for (let i = 0; i <= LAST_DAY; i++) { const d = Math.abs(capX(i) - x); if (d < bd) { bd = d; best = i; } }
      return best;
    };
    els.week.addEventListener('pointerdown', e => { if (!S.open) return; pressed = true; clearTimeout(leave); els.week.setPointerCapture(e.pointerId); pickDay(dayAt(e)); });
    els.week.addEventListener('pointermove', e => { if (!S.open) return; if (e.pointerType === 'mouse' || pressed) { clearTimeout(leave); pickDay(dayAt(e)); } });
    els.week.addEventListener('pointerup', e => { pressed = false; if (e.pointerType !== 'mouse') leave = setTimeout(() => pickDay(null), 1600); });
    els.week.addEventListener('pointercancel', () => { pressed = false; pickDay(null); });
    els.week.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !pressed) { clearTimeout(leave); leave = setTimeout(() => pickDay(null), 300); } });
    els.week.addEventListener('keydown', e => {
      const cur = S.pick ?? LAST_DAY;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); pickDay(cur - 1, { announce: true }); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); pickDay(Math.min(LAST_DAY, cur + (S.pick === null ? 0 : 1)), { announce: true }); }
      else if (e.key === 'Home') { e.preventDefault(); pickDay(0, { announce: true }); }
      else if (e.key === 'End') { e.preventDefault(); pickDay(LAST_DAY, { announce: true }); }
      else if (e.key === 'Escape') { pickDay(null, { announce: true }); if (S.pick === null) { setOpen(false); els.plus.focus(); } }
    });
    els.week.addEventListener('blur', () => pickDay(null));

    /* ── the pill: steps ⇄ percent ── */
    els.pill.addEventListener('click', () => {
      S.pct = !S.pct;
      els.pill.setAttribute('aria-pressed', String(S.pct));
      els.pill.setAttribute('aria-label', S.pct ? 'Show the change in steps' : 'Show the change in percent');
      if (Lab.reduced) { render({ announce: true }); return; }
      gsap.timeline()
        .to(els.pillFace, { rotationX: -90, duration: .2, ease: 'power2.in', transformPerspective: 300 * S.unit })
        .call(() => { const v = view(); pillOdo.set(S.pct ? fmtPct(v.value, v.last) : fmtDiff(v.value - v.last), { instant: true }); render({ announce: true }); })
        .fromTo(els.pillFace, { rotationX: 90 }, { rotationX: 0, duration: .55, ease: 'back.out(2.4)', transformPerspective: 300 * S.unit, clearProps: 'transform' });
      gsap.fromTo(els.pill, { scale: .94 }, { scale: 1, duration: .6, ease: 'elastic.out(1, .45)', clearProps: 'scale' });
      const r = els.pill.getBoundingClientRect(), pr = panel.getBoundingClientRect();
      pulse((r.left + r.width / 2 - pr.left) / pr.width * PAN.w, (r.top + r.height / 2 - pr.top) / pr.height * PAN.h, .7);
    });

    /* ── pointer on the panel: the light swells and follows ── */
    function pulse(x, y, a = 1) { if (Lab.reduced) return; S.ring.x = x; S.ring.y = y; S.ring.r = 0; S.ring.a = a; }
    panel.addEventListener('pointerdown', e => {
      if (e.target.closest('button')) return;
      const r = panel.getBoundingClientRect();
      pulse((e.clientX - r.left) / r.width * PAN.w, (e.clientY - r.top) / r.height * PAN.h, 1);
    });

    /* ── live ── */
    function liveStep() {
      if (Math.random() < .65) {
        WEEK[LAST_DAY].s = r1(WEEK[LAST_DAY].s + .1);
        if (S.pick === null || S.pick === LAST_DAY) render({ dir: 1 });
        paintCaps();
      }
    }

    /* ── frame ── */
    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const k = S.unit, reduced = Lab.reduced, idle = reduced ? 0 : S.idle;
      // pointer in card and panel units
      const cx = P.x - CARD.x, cy = P.y - CARD.y;
      const inCard = P.inside && cx >= 0 && cx <= CARD.w && cy >= 0 && cy <= CARD.h;
      const px = cx - PAN.x, py = cy - PAN.y;
      const inPanel = inCard && px >= 0 && px <= PAN.w && py >= 0 && py <= PAN.h;
      // lean
      const lean = inCard && P.mouse && !reduced;
      S.tiltX.t = lean ? -(cy / CARD.h * 2 - 1) * 4 : 0;
      S.tiltY.t = lean ? (cx / CARD.w * 2 - 1) * 5 : 0;
      step(S.tiltX, dt); step(S.tiltY, dt);
      if (!introTl) W.tf(card, `perspective(${(1500 * k).toFixed(0)}px) rotateX(${S.tiltX.v.toFixed(3)}deg) rotateY(${S.tiltY.v.toFixed(3)}deg)`);
      const lx = S.tiltY.v / 5, ly = -S.tiltX.v / 4;   // −1…1
      W.tf(els.field, `translate3d(${(-lx * 7 * k).toFixed(2)}px,${(-ly * 6 * k).toFixed(2)}px,0) scale(1.03)`);
      W.tf(els.front, `translate3d(${(lx * 3.5 * k).toFixed(2)}px,${(ly * 3 * k).toFixed(2)}px,0)`);
      W.tf(els.shadow, `translate3d(${(-lx * 14 * k).toFixed(2)}px,${(-ly * 10 * k).toFixed(2)}px,0)`);
      // the wall's light follows the pointer a little
      S.spotX.t = P.inside && !reduced ? P.x : SW * .42; S.spotY.t = P.inside && !reduced ? P.y : SH * .3;
      step(S.spotX, dt); step(S.spotY, dt);
      W.tf(els.spot, `translate3d(${(S.spotX.v * k).toFixed(1)}px,${(S.spotY.v * k).toFixed(1)}px,0)`);
      // the round button leans toward a near pointer and turns into ×
      const bx = PAN.x + PLUS.x, by = PAN.y + PLUS.y, ddx = cx - bx, ddy = cy - by, dist = Math.hypot(ddx, ddy);
      const pull = inCard && P.mouse && !reduced && dist < 70 ? (1 - dist / 70) : 0;
      S.magX.t = ddx * pull * .22; S.magY.t = ddy * pull * .22;
      step(S.magX, dt); step(S.magY, dt);
      if (reduced) { S.plusRot.v = S.plusRot.t; S.veil.v = S.veil.t; } else { step(S.plusRot, dt); step(S.veil, dt); }
      W.tf(els.plus, `translate3d(${(S.magX.v * k).toFixed(2)}px,${(S.magY.v * k).toFixed(2)}px,0)`);
      W.tf(els.plusSvg, `rotate(${(S.plusRot.v * 135).toFixed(2)}deg)`);
      W.style(els.veil, 'opacity', clamp(S.veil.v, 0, 1).toFixed(3));
      // capsules
      caps.forEach((c, i) => {
        if (c.delay !== undefined && S.t >= c.delay) { c.h.t = c.target; c.delay = undefined; }
        if (reduced) { c.h.v = c.h.t; c.f.v = c.f.t; c.on.v = c.on.t; }
        else { step(c.h, dt); step(c.f, dt); step(c.on, dt); }
        const h = Math.max(0, c.h.v), f = Math.max(0, c.f.v * Math.min(1, h)), on = c.on.v;
        W.tf(c.el, `translate3d(0,${((1 - Math.min(1, h)) * 26 * k).toFixed(2)}px,0) scale(${(.6 + .4 * Math.min(1.08, h) + Math.max(0, on) * .06).toFixed(4)})`);
        W.style(c.el, 'opacity', clamp(h * (on < 0 ? 1 + on * .5 : 1), 0, 1).toFixed(3));
        W.tf(c.fill, `translate3d(0,${((1 - f) * 101).toFixed(2)}%,0)`);
      });
      // the light: pointer swell and sweep, press rings, idle drift
      if (inPanel && !reduced) {
        if (S.lastPX !== null) { const vx = (px - S.lastPX) / dt, vy = (py - S.lastPY) / dt; S.fvx.t = clamp(vx * .05, -38, 38); S.fvy.t = clamp(vy * .05, -38, 38); }
        S.lastPX = px; S.lastPY = py; S.fx.t = px; S.fy.t = py; S.lens.t = .3;
      } else { S.lastPX = S.lastPY = null; S.lens.t = 0; S.fvx.t = 0; S.fvy.t = 0; }
      S.fvx.t *= .9; S.fvy.t *= .9;
      step(S.fx, dt); step(S.fy, dt); step(S.fvx, dt); step(S.fvy, dt); step(S.lens, dt);
      if (S.ring.a > .002) { S.ring.r += dt * 420; S.ring.a *= Math.pow(.18, dt); }
      const active = S.lens.v > .004 || Math.abs(S.fvx.v) + Math.abs(S.fvy.v) > .05 || S.ring.a > .002;
      if (!reduced && (idle > 0 || active)) {
        if (active || (S.fieldEvery = (S.fieldEvery + 1) % 2) === 0) {
          field.draw(S.t, idle, { on: S.lens.v > .004 || active, x: S.fx.v, y: S.fy.v, vx: S.fvx.v, vy: S.fvy.v, lens: S.lens.v }, S.ring);
        }
      }
      // the app icon: the sneaker walks while the pointer is near
      const nearIcon = inCard && P.mouse && !reduced && cy < PAN.y + 10;
      S.near.t = nearIcon ? 1 : 0; step(S.near, dt);
      S.walk += dt * (1.1 + S.near.v * 1.6);
      const wv = S.near.v, ph = S.walk * Math.PI * 2;
      W.tf(els.shoe, `translate3d(0,${(-Math.max(0, Math.sin(ph)) * 1.6 * wv).toFixed(2)}px,0) rotate(${(Math.sin(ph) * 9 * wv).toFixed(2)}deg)`);
      W.style(els.glow, 'opacity', (reduced ? .7 : .62 + .14 * Math.sin(S.t * 1.6) * idle + .22 * wv).toFixed(3));
      if (S.live && !reduced) { S.liveT -= dt; if (S.liveT <= 0) { S.liveT = 1.4; liveStep(); } }
    }

    /* ── intro ── */
    let introTl = null;
    function finalState() {
      if (introTl) { introTl.kill(); introTl = null; }
      S.idle = 1;
      gsap.set([introEl, card, els.app, els.title, els.subtitle, els.field, els.front, els.plus, els.pill, $('.w05-label'), $('.w05-num'), $('.w05-cmp')], { clearProps: 'opacity,visibility,transform' });
      introEl.style.visibility = 'visible';
      render({ instant: true });
      field.draw(S.t, 0, { on: false }, S.ring);
    }
    function intro() {
      if (introTl) introTl.kill();
      setOpen(false);
      if (Lab.reduced) { finalState(); gsap.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5 }); return; }
      S.idle = 0;
      num.set('0.0K', { instant: true }); pillOdo.set(S.pct ? '+0%' : '+0K Steps', { instant: true });
      const u = S.unit;
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; } });
      tl.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, 0)
        .fromTo(card, { y: 70 * u, rotationX: 22, scale: .92, transformPerspective: 1400 * u, opacity: 0 }, { y: 0, rotationX: 0, scale: 1, opacity: 1, duration: 1.35, ease: 'expo.out', clearProps: 'y,scale,rotationX,opacity,transformPerspective' }, .02)
        .fromTo(els.app, { scale: .3, rotation: -28, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: .9, ease: 'back.out(2.2)', clearProps: 'transform,opacity' }, .3)
        .fromTo([els.title, els.subtitle], { y: 12 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity' }, .38)
        .fromTo(els.field, { opacity: 0 }, { opacity: 1, duration: .9, ease: 'power2.out', clearProps: 'opacity' }, .45)
        .call(() => pulse(PAN.w * .12, PAN.h * .9, 1.3), null, .5)
        .fromTo($('.w05-label'), { y: 8 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', clearProps: 'transform,opacity' }, .72)
        .fromTo($('.w05-num'), { opacity: 0 }, { opacity: 1, duration: .3 }, .74)
        .call(() => render({ fromZero: true, dur: 1.5 }), null, .76)
        .fromTo(els.pill, { scale: .5, opacity: 0 }, { scale: 1, opacity: 1, duration: .8, ease: 'back.out(2)', clearProps: 'transform,opacity' }, .95)
        .fromTo($('.w05-cmp'), { y: 6 * u, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'expo.out', clearProps: 'transform,opacity' }, 1.05)
        .fromTo(els.plus, { scale: .4, rotation: -180, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity' }, .9)
        .to(S, { idle: 1, duration: 1.2, ease: 'sine.inOut' }, .6);
    }

    /* ── lifecycle ── */
    function resize() { const w = stage.clientWidth; if (w) { S.unit = w / SW; num.remeasure(); pillOdo.remeasure(); } }
    new ResizeObserver(() => { P.drop(); resize(); }).observe(stage);
    resize();
    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }
    const remeasure = () => { num.remeasure(); pillOdo.remeasure(); };
    Lab.fonts.then(remeasure);
    if (document.fonts) document.fonts.addEventListener('loadingdone', remeasure);
    finalState();
    if (!Lab.still) introEl.style.visibility = 'hidden';
    start();

    return {
      id: 5,
      intro: () => { introEl.style.visibility = ''; intro(); },
      replay: () => { introEl.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; S.liveT = .5; },
      setVisible(v) { if (v) start(); else stop(); },
      _state: S, _open: setOpen, _pick: pickDay,
    };
  }

  Lab.register({ id: 5, slug: 'progress', mount });
})();
