/* ==========================================================================
   Set 07 · Folder cards (six black widgets)
   Exchange-app Widget Lab · uses WidgetLab.kit + GSAP 3.13

   07·1 Clock & sleep · 07·2 Flight · 07·3 Walking · 07·4 Stock
   07·5 Recorder · 07·6 Radio

   Units: 1u = 1px of the shot; every card is 340 × 320 u, a folder: a
   raised tab on the left, an S-step down to the right where "•••" sits.

   Motion map
   · 07·1  the clock runs (digits roll); Wi-Fi / Bluetooth toggle; scrub the
           sleep strip for the time and stage; tap the weather for °F
   · 07·2  drag the plane along the route; the plane up top swaps the
           direction (codes cross over); live mode flies it
   · 07·3  steps and heart rate tick; point at a walk on the strip to read
           it; tap a figure to change its unit; the walker walks
   · 07·4  the price ticks and the chart grows; scrub it; "10 Sec" sets the
           pace, "USD" converts the currency, "Key Events" marks the chart
   · 07·5  a working recorder: stop / record, pause / resume, flag; the
           waveform scrolls, the size grows, the strip dips under a press
   · 07·6  drag the dial to tune (it glides to stations), ⏮ ⏭ seek, ⏸ stops
           the song line, ☆ keeps a favourite, AM / FM switch the band
   ========================================================================== */
(() => {
  'use strict';
  const Lab = window.WidgetLab;
  if (!Lab || !Lab.kit) { console.warn('[set 07] lab.js / kit.js missing'); return; }
  const { clamp, lerp, r2, spring, step, writer, pointer, Odo } = Lab.kit;
  const NS = 'http://www.w3.org/2000/svg';
  const SVG = (tag, attrs = {}, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const CW = 340, CH = 320;
  const U = n => `calc(${r2(n)} * var(--u))`;
  const pos = (x, y, extra = '') => `style="left:${U(x)};top:${U(y)};${extra}"`;
  const IB = L => (L - 1.2109) / 2 + .96875;   // Inter: baseline below the top of a line box (em)
  const OB = L => (L - 1.482) / 2 + 1.193;     // Oswald
  const pad = n => String(n).padStart(2, '0');

  /* the card and its panels */
  const SHAPE = 'M0,31A31,31 0 0 1 31,0H193C215,0 228,31 250,31H309A31,31 0 0 1 340,62V289A31,31 0 0 1 309,320H31A31,31 0 0 1 0,289Z';
  const tabPanel = (y0, yt, s0, s1, y1, x0 = 17.5, x1 = 322.5, r = 14) => `M${x0},${y0 + r}A${r},${r} 0 0 1 ${x0 + r},${y0}H${s0}C${r2(s0 + (s1 - s0) * .45)},${y0} ${r2(s1 - (s1 - s0) * .45)},${yt} ${s1},${yt}H${x1 - r}A${r},${r} 0 0 1 ${x1},${yt + r}V${y1 - r}A${r},${r} 0 0 1 ${x1 - r},${y1}H${x0 + r}A${r},${r} 0 0 1 ${x0},${y1 - r}Z`;
  const rectPanel = (y0, y1, x0 = 17.5, x1 = 322.5, r = 14) => `M${x0},${y0 + r}A${r},${r} 0 0 1 ${x0 + r},${y0}H${x1 - r}A${r},${r} 0 0 1 ${x1},${y0 + r}V${y1 - r}A${r},${r} 0 0 1 ${x1 - r},${y1}H${x0 + r}A${r},${r} 0 0 1 ${x0},${y1 - r}Z`;

  const I = {
    wifi: '<svg viewBox="0 0 24 24"><path d="M4.5 9.6a11 11 0 0 1 15 0M7.4 12.7a6.8 6.8 0 0 1 9.2 0M10.2 15.7a2.6 2.6 0 0 1 3.6 0"/><circle cx="12" cy="18.6" r=".6"/></svg>',
    bt: '<svg viewBox="0 0 24 24"><path d="m7.5 8 9 8-4.5 4V4l4.5 4-9 8"/></svg>',
    cloud: '<svg viewBox="0 0 24 24"><path d="M7.4 17.5a4.4 4.4 0 0 1-.4-8.8 5.6 5.6 0 0 1 10.6 1.6 3.6 3.6 0 0 1 .4 7.2z"/><rect x="2" y="13.6" width="7" height="1.6" rx=".8" fill="#000"/><rect x="3.6" y="16.4" width="6" height="1.6" rx=".8" fill="#000"/></svg>',
    plane: '<svg viewBox="0 0 24 24"><path d="M21.6 12c0-.8-.7-1.3-1.5-1.3h-5.2L10.5 3.6H8.3l2.3 7.1H5.9L4.1 8.5H2.5l1.2 3.5-1.2 3.5h1.6l1.8-2.2h4.7l-2.3 7.1h2.2l4.4-7.1h5.2c.8 0 1.5-.5 1.5-1.3z"/></svg>',
    walker: '<svg viewBox="0 0 24 24"><circle cx="13.2" cy="4.6" r="1.7" fill="#d9d9d9" stroke="none"/><path class="w-body" d="M12.4 8.2 11 13.8"/><path class="w-arm1" d="M12.2 9.2 9.2 11.4"/><path class="w-arm2" d="M12.2 9.2 15 11.6"/><path class="w-leg1" d="M11 13.8l-2.4 5.6"/><path class="w-leg2" d="M11 13.8l2.8 2.6.6 3.2"/></svg>',
    feet: '<svg viewBox="0 0 24 24"><path d="M8.2 3c2 0 3 2.4 2.8 5.2-.2 2.2-1 3.3-2.6 3.3S5.6 10.4 5.4 8C5.2 5.4 6.2 3 8.2 3zM6 13.2l4.4-.4c.2 1.6.1 3.2-1.8 3.4-1.8.2-2.5-1.3-2.6-3z"/><path d="M15.8 7.6c2 0 3 2.4 2.8 5.2-.2 2.2-1 3.3-2.6 3.3s-2.8-1.1-3-3.5c-.2-2.6.8-5 2.8-5zm-2.2 10.2 4.4-.4c.2 1.6.1 3.2-1.8 3.4-1.8.2-2.5-1.3-2.6-3z"/></svg>',
    route: '<svg viewBox="0 0 24 24"><path d="M5 19V9.5a3 3 0 0 1 6 0v5a3 3 0 0 0 6 0V5"/><path d="m14.5 7.4 2.5-2.6 2.5 2.6"/></svg>',
    alarm: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7.2" fill="currentColor" stroke="none"/><path d="M12 9.6V13l2.2 1.6" stroke="#000"/><path d="M4.2 6.2 7 3.6M19.8 6.2 17 3.6"/></svg>',
    flame: '<svg viewBox="0 0 24 24"><path d="M12.6 2.6c.4 3.2 4.9 5.2 4.9 10.3a5.5 5.5 0 0 1-11 0c0-2.6 1.4-4.4 2.8-5.6.2 1.9.9 3 2.1 3.4-.6-2.9.2-5.7 1.2-8.1z"/></svg>',
    chip: '<svg viewBox="0 0 24 24"><rect x="6.5" y="6.5" width="11" height="11" rx="2"/><rect x="9.6" y="9.6" width="4.8" height="4.8" rx=".8"/><path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M5.4 18.6 7 17M17 7l1.6-1.6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    coin: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="currentColor"/><text x="12" y="16.6" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="12.5" font-weight="800" fill="#000" class="js-coin">$</text></svg>',
    stop: '<svg viewBox="0 0 24 24"><rect class="js-stopi" x="7.2" y="7.2" width="9.6" height="9.6" rx="1.2"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.6" fill="currentColor" opacity=".28"/><g class="js-pausei"><rect x="9.3" y="8.6" width="2" height="6.8" rx=".7"/><rect x="12.7" y="8.6" width="2" height="6.8" rx=".7"/></g><path class="js-playi" d="M10 8.4v7.2l6-3.6z" opacity="0"/></svg>',
    flag: '<svg viewBox="0 0 24 24"><path d="M6.8 20V4.6h9.4l-1.6 3.2 1.6 3.2H8.6" /><rect x="6.8" y="4.6" width="1.8" height="15.4" rx=".6"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="m12 4.2 2.3 4.8 5.2.7-3.8 3.6.9 5.2L12 16l-4.6 2.5.9-5.2-3.8-3.6 5.2-.7z"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><rect x="6.2" y="6.6" width="2.2" height="10.8" rx=".7"/><path d="M17.6 6.8v10.4L9.8 12z"/></svg>',
    next: '<svg viewBox="0 0 24 24"><rect x="15.6" y="6.6" width="2.2" height="10.8" rx=".7"/><path d="M6.4 6.8v10.4l7.8-5.2z"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6.5V12l3.6 2.2" stroke="#6f6f6e" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
    up: '<svg viewBox="0 0 10 10"><path d="M5 7.6V2.6M2.8 4.6 5 2.4l2.2 2.2"/></svg>',
  };
  const more = label => `<button type="button" class="s07-more" aria-label="Replay ${label}"><i></i><i></i><i></i></button>`;

  /* ───────────── data (sample) ───────────── */
  const SLEEP = { x0: 29, x1: 311, t0: 7 * 60 + 23, perU: 261 / 140, rem: [[61, 102.5], [201, 262.5]] };
  const FLIGHTS = [
    { code: 'EK426', from: ['LHR', 'London'], to: ['JFK', 'New York'], dep: '15:00', arr: '22:19', date: ['08 Jun, 2026', '08 Jun, 2026'], via: ['19:22', 'HALIFAX'], start: 'LONDON', mins: 439 },
    { code: 'EK427', from: ['JFK', 'New York'], to: ['LHR', 'London'], dep: '18:30', arr: '07:45', date: ['09 Jun, 2026', '10 Jun, 2026'], via: ['21:40', 'HALIFAX'], start: 'NEW YORK', mins: 435 },
  ];
  const ROUTE = { x0: 30, legEnd: 102.5, legStart: 150, x1: 312, plane: 231 };
  const WALKS = [{ t: '08:00', x0: 60, x1: 135, n: 2251 }, { t: '16:10', x0: 152.5, x1: 179, n: 841 }, { t: '20:34', x0: 218, x1: 267.5, n: 1340 }];
  const STOCK_LINE = [[32.5, 220], [47.5, 226], [60, 219], [75, 216.5], [86, 205.5], [92.5, 211], [102.5, 209], [114, 216], [125, 236], [134, 231], [142.5, 235], [152.5, 221.5], [170, 219], [192.5, 212.5], [204, 216.5], [216, 215], [227.5, 221.5], [230, 220.5]];
  const PRICE_AT = y => 160.08 + (220.5 - y) / 6;     // the dotted base line is the current price
  const CURRENCIES = [['USD', '$', 1], ['EUR', '€', .92], ['GBP', '£', .79], ['JPY', '¥', 151.4]];
  const PACES = [['10', 'Sec', 1.6], ['1', 'Min', 3.2], ['5', 'Min', 6]];
  const FM = [{ f: 98.7, name: 'Night Drive', song: 'NOVA LANE - AFTERGLOW' }, { f: 99.4, name: 'Blue Hour', song: 'THE PALE COAST - TIDES' }, { f: 101.1, name: 'City Talk', song: 'MORNING DESK - LIVE' },
    { f: 102.6, name: 'Radio Hard™', song: 'LANA DEL REY - SUMMERTIME SADNESS' }, { f: 104.3, name: 'Neon FM', song: 'KIDS OF JUNE - NEON LIGHTS' }, { f: 105.8, name: 'Jazz Loft', song: 'MARA VOSS - CITY RAIN' }];
  const AM = [{ f: 540, name: 'Morning Talk', song: 'THE MORNING SHOW' }, { f: 880, name: 'City News', song: 'NEWS ON THE HOUR' }, { f: 1080, name: 'Sports Line', song: 'MATCH DAY - LIVE' }, { f: 1310, name: 'Classic Gold', song: 'OLDIES ALL DAY' }];
  const BANDS = { FM: { list: FM, min: 87.5, max: 108, unit: 'MHz', per: 41, stepF: .1, label: f => f.toFixed(1), major: 1 }, AM: { list: AM, min: 530, max: 1700, unit: 'kHz', per: .41, stepF: 10, label: f => String(Math.round(f)), major: 100 } };

  /* ───────────── markup ───────────── */
  function clockHTML() {
    return `${more('the clock')}
  <svg class="s07-svg" viewBox="0 0 340 320" aria-hidden="true">
    <text class="s07-t-title" x="26" y="40.5"><tspan class="js-day">Saturday</tspan><tspan class="s07-t-sup" dx="4" dy="-7.4">17</tspan></text>
    <text class="s07-t-caps" x="24" y="188">SLEEP</text>
    <path class="s07-panel" d="${tabPanel(201, 181, 236, 267, 262)}" fill="#00ff37"/>
    <g class="js-tl"></g>
  </svg>
  <i class="s07-halo" style="top:${U(246)};height:${U(64)};background:radial-gradient(closest-side, rgba(0,255,55,.5), rgba(0,255,55,0))"></i>
  <div class="s07-abs s07-big" ${pos(24, 119 - OB(1.2) * 74.4)}><span class="js-hm"></span><span class="s07-supnum js-sec"></span></div>
  <button type="button" class="s07-sq js-wifi" ${pos(250, 54)} aria-pressed="false" aria-label="Wi-Fi">${I.wifi}</button>
  <button type="button" class="s07-sq is-on js-bt" ${pos(290, 54)} aria-pressed="true" aria-label="Bluetooth">${I.bt}</button>
  <p class="s07-abs s07-tabtxt js-tab" style="right:${U(32.5)};top:${U(197 - IB(1) * 12)}">8H 42M</p>
  <div class="s07-hit js-hit" style="left:${U(20)};top:${U(204)};width:${U(300)};height:${U(56)}" tabindex="0" role="slider" aria-label="Sleep through the night" aria-valuemin="0" aria-valuemax="100"></div>
  <button type="button" class="s07-tap s07-temp js-temp" style="left:${U(24)};top:${U(282)}" aria-label="Temperature, switch unit">${I.cloud}<span class="js-deg">19 °C</span></button>`;
  }
  function flightHTML() {
    return `${more('the flight')}
  <svg class="s07-svg" viewBox="0 0 340 320" aria-hidden="true">
    <text class="s07-t-title is-17 js-code" x="26.6" y="39.5">EK426</text>
    <g class="s07-dots-l"></g>
    <text class="s07-t-city js-c1" x="27" y="120">London</text>
    <text class="s07-t-city js-c2" x="313" y="120" text-anchor="end">New York</text>
    <path class="s07-panel" d="${rectPanel(153, 213.5)}" fill="#02fe71"/>
    <g class="js-route"></g>
    <text class="s07-t-date js-d1" x="27" y="293.5">08 Jun, 2026</text>
    <text class="s07-t-date js-d2" x="313.5" y="293.5" text-anchor="end">08 Jun, 2026</text>
    <text class="s07-t-with" x="170.5" y="274" text-anchor="middle"><tspan class="js-w1">With</tspan><tspan class="js-w2" x="170.5" dy="16">transfer</tspan></text>
  </svg>
  <i class="s07-halo" style="top:${U(198)};height:${U(64)};background:radial-gradient(closest-side, rgba(2,254,113,.5), rgba(2,254,113,0))"></i>
  <p class="s07-abs s07-code js-from" style="left:${U(24.2)};top:${U(103 - OB(1.2) * 54.9)}">LHR</p>
  <p class="s07-abs s07-code js-to" style="right:${U(26.5)};top:${U(103 - OB(1.2) * 54.9)}">JFK</p>
  <button type="button" class="s07-swap" aria-label="Show the return flight">${I.plane}</button>
  <p class="s07-abs s07-dur js-dur" style="left:0;right:0;text-align:center;top:${U(119.5 - IB(1) * 12)}"><span class="js-h">7</span><small>hrs</small><span class="js-m">19</span><small>mins</small></p>
  <p class="s07-abs s07-mid js-dep" style="left:${U(26.7)};top:${U(278 - OB(1.2) * 31.7)}">15:00</p>
  <p class="s07-abs s07-mid js-arr" style="right:${U(25.5)};top:${U(278 - OB(1.2) * 31.7)}">22:19</p>
  <div class="s07-hit js-hit" style="left:${U(20)};top:${U(156)};width:${U(300)};height:${U(56)}" tabindex="0" role="slider" aria-label="Flight progress" aria-valuemin="0" aria-valuemax="100"></div>`;
  }
  function walkHTML() {
    return `<p class="s07-abs s07-time js-now" style="left:${U(244)};top:${U(4)}">${I.clock}<span class="js-clk">8:46</span><small class="js-ampm">PM</small></p>
  <div class="s07-badge-ic js-walker" style="left:${U(18)};top:${U(17.5)};width:${U(46)};height:${U(46)}">${I.walker}</div>
  <svg class="s07-svg" viewBox="0 0 340 320" aria-hidden="true">
    <text class="s07-t-title is-wide" x="74.8" y="41">Walking</text>
    <text class="s07-t-sub" x="75" y="56">5 Days</text>
    <path class="s07-panel" d="${rectPanel(94, 136.5)}" fill="#dbfe01"/>
    <g class="js-walks"></g>
    <g class="js-feet" transform="translate(165 185.5) scale(.62)" fill="#dbfe01">${I.feet.replace(/<\/?svg[^>]*>/g, '')}</g>
    <text class="s07-t-sub is-steps" x="166" y="218.5"><tspan class="js-st1">Steps</tspan><tspan class="js-st2" x="166" dy="15.5">Today</tspan></text>
    <defs><linearGradient id="s07bpm" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#dbfe01" stop-opacity=".42"/><stop offset="1" stop-color="#dbfe01" stop-opacity="0"/></linearGradient></defs>
    <path class="js-bpmfill" fill="url(#s07bpm)"/>
    <path class="js-bpmline" fill="none" stroke="#dbfe01" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
    <circle class="js-bpmdot" r="3.2" fill="#dbfe01"/>
  </svg>
  <div class="s07-abs s07-steps js-steps" style="left:${U(18.5)};top:${U(228 - OB(1.2) * 72)}"></div>
  <div class="s07-abs s07-mini" style="left:${U(226)};top:${U(194 - OB(1.2) * 29.3)}"><span class="js-bpm"></span><small>BPM</small></div>
  <div class="s07-hit js-hit" style="left:${U(20)};top:${U(96)};width:${U(300)};height:${U(39)}" tabindex="0" role="slider" aria-label="Walks today" aria-valuemin="0" aria-valuemax="2"></div>
  ${[['route', 20, 'km', 0], ['alarm', 105, 'min', 1], ['flame', 185, 'kCal', 2]].map(([ic, x, unit, i]) => `<span class="s07-stat-ic${ic === 'flame' ? ' is-fill' : ''}" style="left:${U(x - 2)};top:${U(274.5)}">${I[ic].replace('<svg', `<svg style="width:100%;height:100%;${ic === 'alarm' ? 'color:#dbfe01;' : ''}"`)}</span><button type="button" class="s07-tap" data-stat="${i}" style="left:${U(x + 19)};top:${U(268)}" aria-label="Change unit"><span class="s07-stat js-stat" style="display:block"></span><span class="s07-unit js-unit" style="display:block;margin-top:${U(1.5)}">${unit}</span></button>`).join('')}`;
  }
  function stockHTML() {
    return `${more('the stock')}
  <div class="s07-badge-ic" style="left:${U(16)};top:${U(17.5)};width:${U(45)};height:${U(45)}">${I.chip}</div>
  <svg class="s07-svg" viewBox="0 0 340 320" aria-hidden="true">
    <text class="s07-t-title" x="71.4" y="39.5">Nvidia</text>
    <text class="s07-t-sub is-ticker" x="73" y="56">NVDA</text>
    <text class="s07-t-rate js-rate" x="20" y="184">Strong Buy<tspan class="s07-t-sup" dx="3.5" dy="-6.5">Rating</tspan></text>
    <path class="s07-panel" d="${tabPanel(196, 176, 251, 282, 256)}" fill="#fdf703"/>
    <g class="js-chart"></g>
    <text class="s07-t-tab" x="281.5" y="192.5"><tspan class="js-pace">10</tspan><tspan class="s07-t-sup is-ink js-paceu" dx="2.5" dy="-5">Sec</tspan></text>
  </svg>
  <i class="s07-halo" style="top:${U(240)};height:${U(62)};background:radial-gradient(closest-side, rgba(253,247,3,.42), rgba(253,247,3,0))"></i>
  <div class="s07-abs s07-price" style="left:${U(19)};top:${U(132 - OB(1.2) * 56.1)}"><small class="js-cur">$</small><span class="js-price"></span></div>
  <p class="s07-abs s07-chip" style="left:${U(180)};top:${U(86.5)}"><span class="js-chg"></span></p>
  <p class="s07-abs s07-pct" style="left:${U(181.5)};top:${U(113.5)}"><i>${I.up}</i><span class="js-pct"></span></p>
  <div class="s07-hit js-hit" style="left:${U(20)};top:${U(199)};width:${U(300)};height:${U(55)}" tabindex="0" role="slider" aria-label="Price today" aria-valuemin="0" aria-valuemax="100"></div>
  <button type="button" class="s07-tap js-pacebtn" style="left:${U(272)};top:${U(176)};width:${U(48)};height:${U(22)}" aria-label="Update every 10 seconds, change"></button>
  <p class="s07-abs s07-row" style="left:${U(20)};top:${U(281)}"><span style="color:#fdf703;display:flex" class="js-sun">${I.sun}</span>Open</p>
  <button type="button" class="s07-tap s07-row js-curbtn" style="left:${U(106.5)};top:${U(281)}" aria-label="Currency, change"><span style="color:#fdf703;display:flex">${I.coin}</span><span class="js-curname">USD</span></button>
  <button type="button" class="s07-tap s07-row js-evbtn" style="left:${U(238.5)};top:${U(281)}" aria-pressed="true" aria-label="Key event alerts"><span class="s07-toggle"></span>Key Events</button>`;
  }
  function recHTML() {
    return `${more('the recorder')}
  <i class="s07-dot js-dot" style="left:${U(25.5)};top:${U(29.5)}"></i>
  <svg class="s07-svg" viewBox="0 0 340 320" aria-hidden="true">
    <text class="s07-t-title is-wide js-rect" x="44.6" y="43">Recording</text>
    <text class="s07-t-caps is-wav" x="26" y="226">.WAV</text>
    <path class="s07-panel js-wpanel" fill="#fd4b05"/>
    <g class="js-wave"></g>
  </svg>
  <i class="s07-halo" style="top:${U(180)};height:${U(90)};left:${U(70)};background:radial-gradient(closest-side, rgba(253,75,5,.34), rgba(253,75,5,0))"></i>
  <i class="s07-halo" style="top:${U(292)};height:${U(34)};background:radial-gradient(closest-side, rgba(253,75,5,.5), rgba(253,75,5,0))"></i>
  <div class="s07-abs s07-big" ${pos(24, 120 - OB(1.2) * 74.4)}><span class="js-ms"></span><span class="s07-supnum js-cs">26</span></div>
  <p class="s07-abs s07-mb" style="left:${U(274)};top:${U(59)}"><span class="js-mb">2.4</span><span>MB</span></p>
  <p class="s07-abs s07-toast js-toast" style="right:${U(23)};top:${U(84)}"></p>
  <button type="button" class="s07-round js-stop" style="left:${U(139.5)};top:${U(193)}" aria-label="Stop">${I.stop}</button>
  <button type="button" class="s07-round js-pause" style="left:${U(199.5)};top:${U(193)}" aria-label="Pause" aria-pressed="false">${I.pause}</button>
  <button type="button" class="s07-round js-flag" style="left:${U(259.5)};top:${U(193)}" aria-label="Add a flag">${I.flag}</button>`;
  }
  function radioHTML() {
    return `${more('the radio')}
  <i class="s07-dot js-dot" style="left:${U(25.5)};top:${U(29.5)}"></i>
  <svg class="s07-svg" viewBox="0 0 340 320" aria-hidden="true">
    <text class="s07-t-title is-18 js-station" x="44.6" y="40">Radio Hard™</text>
    <defs>
      <clipPath id="s07rclip"><path d="${tabPanel(169, 150, 268, 297, 229)}"/></clipPath>
      <mask id="s07rmask" maskUnits="userSpaceOnUse" x="0" y="0" width="340" height="320"><rect width="340" height="320" fill="#fff"/><rect class="js-needle" x="167" y="160" width="6" height="80" rx="1.5" fill="#000"/></mask>
    </defs>
    <g mask="url(#s07rmask)">
      <path class="s07-panel" d="${tabPanel(169, 150, 268, 297, 229)}" fill="#ff0149"/>
      <g clip-path="url(#s07rclip)"><g class="js-scale"></g></g>
    </g>
    <text class="s07-t-tab js-dec" x="296" y="167.5">.6</text>
  </svg>
  <i class="s07-halo" style="top:${U(214)};height:${U(62)};background:radial-gradient(closest-side, rgba(255,1,73,.46), rgba(255,1,73,0))"></i>
  <div class="s07-abs s07-freq js-freq" style="left:${U(24)};top:${U(105 - OB(1.2) * 57.3)}"></div>
  <p class="s07-abs s07-mhz js-unitf" style="left:${U(137)};top:${U(103.5 - IB(1) * 15)}">MHz</p>
  <button type="button" class="s07-sq is-band js-am" style="left:${U(244)};top:${U(56)};width:${U(31.5)};height:${U(31.5)};border-radius:${U(8)}" aria-pressed="false"><b>AM</b></button>
  <button type="button" class="s07-sq is-band is-on js-fm" style="left:${U(284)};top:${U(56)};width:${U(31.5)};height:${U(31.5)};border-radius:${U(8)}" aria-pressed="true"><b>FM</b></button>
  <div class="s07-marq"><span class="js-song">LANA DEL REY - SUMMERTIME SADNESS</span></div>
  <div class="s07-hit js-hit" style="left:${U(18)};top:${U(152)};width:${U(304)};height:${U(76)};cursor:grab" tabindex="0" role="slider" aria-label="Tuning" aria-valuemin="87.5" aria-valuemax="108"></div>
  <button type="button" class="s07-round js-star" style="left:${U(23)};top:${U(248)}" aria-pressed="false" aria-label="Favourite station">${I.star}</button>
  <button type="button" class="s07-round js-prev" style="left:${U(145.5)};top:${U(248)}" aria-label="Previous station">${I.prev}</button>
  <button type="button" class="s07-round js-play" style="left:${U(205.5)};top:${U(248)}" aria-label="Pause" aria-pressed="false">${I.pause}</button>
  <button type="button" class="s07-round js-next" style="left:${U(265.5)};top:${U(248)}" aria-label="Next station">${I.next}</button>`;
  }
  const CARDS = [
    { id: 'clock', n: '07·1', title: 'Clock and sleep', html: clockHTML },
    { id: 'flight', n: '07·2', title: 'Flight EK426', html: flightHTML },
    { id: 'walk', n: '07·3', title: 'Walking', html: walkHTML },
    { id: 'stock', n: '07·4', title: 'Stock', html: stockHTML },
    { id: 'rec', n: '07·5', title: 'Recorder', html: recHTML },
    { id: 'radio', n: '07·6', title: 'Radio', html: radioHTML },
  ];

  /* ───────────── the set ───────────── */
  let counter = 0;
  function mount(host) {
    const uid = ++counter;
    host.classList.add('s07');
    host.setAttribute('dir', 'ltr'); host.setAttribute('lang', 'en');
    const cardsHTML = CARDS.map(c => `<article class="s07-card s07-${c.id}" aria-label="${c.title}">
  <span class="s07-tag" aria-hidden="true">${c.n}</span>
  <svg class="s07-shape" viewBox="0 0 340 320" aria-hidden="true"><path d="${SHAPE}" fill="url(#s07-cardfill)"/><path d="${SHAPE}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="1"/></svg>
  ${c.html()}
  <p class="s07-sr js-live" aria-live="polite"></p>
</article>`).join('');
    host.innerHTML = `<div class="s07-stage"><svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="s07-cardfill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#101010"/><stop offset=".45" stop-color="#050505"/><stop offset="1" stop-color="#000"/></linearGradient></defs></svg><div class="s07-grid s07-intro">${cardsHTML}</div></div>`.replace(/id="(s07[a-z-]+)"/g, `id="$1${uid}"`).replace(/url\(#(s07[a-z-]+)\)/g, `url(#$1${uid})`);
    const stage = host.querySelector('.s07-stage'), introEl = host.querySelector('.s07-intro');
    const W = writer();
    const S = { t: 0, running: false, idle: 1, live: false };
    let introTl = null;
    const els = [...host.querySelectorAll('.s07-card')];
    const cards = CARDS.map((def, i) => {
      const el = els[i];
      return { def, el, $: s => el.querySelector(s), $$: s => [...el.querySelectorAll(s)], P: pointer(el, CW, CH), unit: 1, tiltX: spring(0, 90, 15), tiltY: spring(0, 90, 15), live: el.querySelector('.js-live') };
    });
    const card = id => cards.find(c => c.def.id === id);
    const say = (c, text) => { c.live.textContent = text; };
    const pop = (n, k = .86) => { if (!Lab.reduced && n) gsap.fromTo(n, { scale: k }, { scale: 1, duration: .55, ease: 'back.out(3)', transformOrigin: '50% 50%' }); };
    const hitX = (c, e) => { const r = c.el.getBoundingClientRect(); return (e.clientX - r.left) / r.width * CW; };
    /* a scrub surface: pointer, touch (holds after a tap) and keys */
    function scrubber(c, onPick, keys) {
      const hit = c.$('.js-hit');
      let pressed = false, leave = 0;
      hit.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; pressed = true; clearTimeout(leave); hit.setPointerCapture(e.pointerId); onPick(hitX(c, e), 'down'); });
      hit.addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || pressed) { clearTimeout(leave); onPick(hitX(c, e), pressed ? 'drag' : 'hover'); } });
      hit.addEventListener('pointerup', e => { pressed = false; onPick(hitX(c, e), 'up'); if (e.pointerType !== 'mouse') leave = setTimeout(() => onPick(null, 'end'), 1400); });
      hit.addEventListener('pointercancel', () => { pressed = false; onPick(null, 'end'); });
      hit.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !pressed) { clearTimeout(leave); leave = setTimeout(() => onPick(null, 'end'), 260); } });
      hit.addEventListener('keydown', e => { if (keys(e) !== false) e.preventDefault(); });
      hit.addEventListener('blur', () => onPick(null, 'end'));
      return hit;
    }

    /* ═════════ 07·1 clock & sleep ═════════ */
    const C1 = card('clock');
    {
      const c = C1;
      c.hm = new Odo(c.$('.js-hm')); c.sec = new Odo(c.$('.js-sec'));
      c.secs = 9 * 3600 + 34 * 60 + 53; c.lastShown = -1; c.unitF = false;
      const tl = c.$('.js-tl');
      for (let x = SLEEP.x0; x <= SLEEP.x1; x += 3.5) SVG('circle', { cx: r2(x), cy: 231.5, r: .85, fill: '#000' }, tl);
      c.bars = SLEEP.rem.map(([a, b]) => SVG('rect', { x: a, y: 229.7, width: r2(b - a), height: 3.6, rx: .6, fill: '#000' }, tl));
      c.labels = SVG('g', { class: 's07-fadeable' }, tl);
      SLEEP.rem.forEach(([a], i) => {
        const tt = SVG('text', { x: a, y: 220, class: 's07-t-panel' }, c.labels); tt.textContent = ['08:23', '12:44'][i];
        const s = SVG('text', { x: a, y: 248.5, class: 's07-t-psmall' }, c.labels); s.textContent = 'REM';
      });
      c.cur = SVG('rect', { x: 0, y: 204, width: 1.4, height: 50, fill: '#000', opacity: 0 }, tl);
      c.curT = SVG('text', { x: 0, y: 213, class: 's07-t-psmall', 'text-anchor': 'middle', opacity: 0 }, tl);
      c.curX = spring(0, 260, 26); c.curA = spring(0, 200, 24); c.pick = null;
      const timeAt = x => { const m = Math.round(SLEEP.t0 + (x - SLEEP.x0) * SLEEP.perU); return `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`; };
      const stageAt = x => SLEEP.rem.some(([a, b]) => x >= a && x <= b) ? 'REM' : (Math.floor((x - SLEEP.x0) / 26) % 2 ? 'DEEP' : 'LIGHT');
      const tab = c.$('.js-tab');
      const setTab = txt => { if (tab.textContent === txt) return; tab.textContent = txt; };
      c.pickAt = x => {
        if (x === null) { c.pick = null; c.curA.t = 0; setTab('8H 42M'); c.bars.forEach(b => { b.setAttribute('height', 3.6); b.setAttribute('y', 229.7); }); return; }
        x = clamp(x, SLEEP.x0, SLEEP.x1); c.pick = x; c.curX.t = x; c.curA.t = 1;
        if (c.curA.v < .05) { c.curX.v = x; c.curX.vel = 0; }
        setTab(timeAt(x)); c.curT.textContent = stageAt(x);
        c.bars.forEach((b, i) => { const [a, bb] = SLEEP.rem[i], on = x >= a && x <= bb; b.setAttribute('height', on ? 5.4 : 3.6); b.setAttribute('y', on ? 228.8 : 229.7); });
        c.$('.js-hit').setAttribute('aria-valuetext', `${timeAt(x)}, ${stageAt(x).toLowerCase()} sleep`);
      };
      scrubber(c, (x, kind) => c.pickAt(x), e => {
        const cur = c.pick ?? SLEEP.x0, d = (SLEEP.x1 - SLEEP.x0) / 40;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') c.pickAt(cur + d); else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') c.pickAt(cur - d);
        else if (e.key === 'Home') c.pickAt(SLEEP.x0); else if (e.key === 'End') c.pickAt(SLEEP.x1); else if (e.key === 'Escape') c.pickAt(null); else return false;
        say(c, c.$('.js-hit').getAttribute('aria-valuetext'));
      });
      [['.js-wifi', 'Wi-Fi'], ['.js-bt', 'Bluetooth']].forEach(([sel, name]) => {
        const b = c.$(sel);
        b.addEventListener('click', () => { const on = !b.classList.contains('is-on'); b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); pop(b.querySelector('svg'), .6); say(c, `${name} ${on ? 'on' : 'off'}`); });
      });
      const deg = c.$('.js-deg');
      c.$('.js-temp').addEventListener('click', () => {
        c.unitF = !c.unitF; const txt = c.unitF ? '66 °F' : '19 °C';
        if (Lab.reduced) deg.textContent = txt;
        else gsap.timeline().to(deg, { yPercent: -70, opacity: 0, duration: .16, ease: 'power2.in' }).call(() => { deg.textContent = txt; }).fromTo(deg, { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .45, ease: 'expo.out' });
        say(c, txt.replace('°', ' degrees '));
      });
      c.frame = (dt, idle) => {
        c.secs += dt;
        const s = Math.floor(c.secs) % 86400;
        if (s !== c.lastShown) {
          const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60;
          c.hm.set(`${pad(h)}:${pad(m)}`, { dur: .9 }); c.sec.set(pad(s % 60), { dur: .7 });
          c.lastShown = s;
        }
        step(c.curX, dt); step(c.curA, dt);
        W.attr(c.cur, 'x', r2(c.curX.v - .7)); W.attr(c.cur, 'opacity', clamp(c.curA.v, 0, 1).toFixed(3));
        W.attr(c.curT, 'x', r2(clamp(c.curX.v, 40, 300))); W.attr(c.curT, 'opacity', clamp(c.curA.v, 0, 1).toFixed(3));
        W.attr(c.labels, 'opacity', (1 - .78 * clamp(c.curA.v, 0, 1)).toFixed(3));
        W.tf(c.$('.s07-temp svg'), `translate3d(${(Math.sin(S.t * .9) * 1.4 * idle * c.unit).toFixed(2)}px,0,0)`);
      };
      c.reset = () => { c.secs = 9 * 3600 + 34 * 60 + 53; c.lastShown = -1; c.pickAt(null); };
    }

    /* ═════════ 07·2 flight ═════════ */
    const C2 = card('flight');
    {
      const c = C2;
      c.dir = 0; c.p = spring((ROUTE.plane - ROUTE.x0) / (ROUTE.x1 - ROUTE.x0), 120, 20); c.base = c.p.v; c.pick = null;
      const dl = c.$('.s07-dots-l');
      [[132, 147], [193, 207]].forEach(([a, b]) => { for (let x = a; x <= b; x += 4) SVG('circle', { cx: x, cy: 81, r: .95, fill: '#7a7a7a' }, dl); });
      const g = c.$('.js-route');
      c.solid1 = SVG('rect', { y: 182.4, height: 3.2, rx: .6, fill: '#000' }, g);
      c.solid2 = SVG('rect', { y: 182.4, height: 3.2, rx: .6, fill: '#000' }, g);
      c.dots = SVG('g', {}, g);
      const dot = x => SVG('circle', { cx: r2(x), cy: 184, r: .9, fill: '#000' }, c.dots);
      for (let x = ROUTE.legEnd + 3; x < ROUTE.legStart; x += 3.6) dot(x);
      c.rest = SVG('g', {}, g);
      c.planeG = SVG('g', {}, g);
      c.planeG.innerHTML = '<path d="M7.8 0c0-.4-.3-.6-.7-.6H4.6L2.4-3.9H1.3l1.1 3.3H.2L-.7-1.6h-.8l.6 1.6-.6 1.6h.8L.2.6h2.2L1.3 3.9h1.1L4.6.6h2.5c.4 0 .7-.2.7-.6z" fill="#000" transform="translate(-3.6 0) scale(1.15)"/>';
      const T = (x, y, cls, txt) => { const n = SVG('text', { x, y, class: cls }, g); n.textContent = txt; return n; };
      c.tDep = T(30, 171, 's07-t-panel is-11', '15:00'); c.tVia = T(154, 171, 's07-t-panel is-11', '19:22');
      c.tStart = T(30, 200, 's07-t-psmall', 'LONDON'); c.tViaN = T(154, 200, 's07-t-psmall', 'HALIFAX');
      c.planeLabel = T(0, 176, 's07-t-psmall', ''); c.planeLabel.setAttribute('text-anchor', 'middle'); c.planeLabel.setAttribute('opacity', 0);
      const F = () => FLIGHTS[c.dir];
      const xAt = p => lerp(ROUTE.x0, ROUTE.x1, p);
      const fmtDur = mins => [Math.floor(mins / 60), pad(Math.round(mins % 60))];
      const durH = c.$('.js-h'), durM = c.$('.js-m'), w1 = c.$('.js-w1'), w2 = c.$('.js-w2');
      const status = p => { const x = xAt(p); return x < ROUTE.legEnd ? ['First', 'leg'] : x < ROUTE.legStart ? ['At', 'Halifax'] : p > .97 ? ['Landing', 'soon'] : ['Second', 'leg']; };
      c.drawRoute = () => {
        const x = xAt(clamp(c.p.v, 0, 1));
        const a1 = Math.min(x, ROUTE.legEnd), a2 = x - ROUTE.legStart;
        W.attr(c.solid1, 'x', ROUTE.x0); W.attr(c.solid1, 'width', r2(Math.max(0, a1 - ROUTE.x0)));
        W.attr(c.solid2, 'x', ROUTE.legStart); W.attr(c.solid2, 'width', r2(Math.max(0, a2 - 7)));
        const key = Math.round(x * 2);
        if (c.restKey !== key) { c.restKey = key; c.rest.textContent = ''; for (let xx = x + 9; xx <= ROUTE.x1; xx += 3.6) SVG('circle', { cx: r2(xx), cy: 184, r: .9, fill: '#000' }, c.rest); }
        W.attr(c.planeG, 'transform', `translate(${r2(x)} 184)`);
        W.attr(c.planeLabel, 'x', r2(clamp(x, 40, 300)));
      };
      c.pickAt = (x, kind) => {
        if (x === null) { c.pick = null; c.p.t = c.base; c.planeLabel.setAttribute('opacity', 0); durH.textContent = fmtDur(F().mins)[0]; durM.textContent = fmtDur(F().mins)[1]; w1.textContent = 'With'; w2.textContent = 'transfer'; return; }
        const p = clamp((x - ROUTE.x0) / (ROUTE.x1 - ROUTE.x0), 0, 1); c.pick = p; c.p.t = p;
        const [h, m] = fmtDur(F().mins * p); durH.textContent = h; durM.textContent = m;
        const [s1, s2] = status(p); w1.textContent = s1; w2.textContent = s2;
        c.planeLabel.textContent = `${Math.round(p * 100)}%`; c.planeLabel.setAttribute('opacity', 1);
        c.$('.js-hit').setAttribute('aria-valuetext', `${h} hours ${m} minutes flown, ${Math.round(p * 100)} percent`);
      };
      scrubber(c, (x, kind) => c.pickAt(x, kind), e => {
        const cur = c.pick ?? c.base;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') c.pickAt(xAt(cur + .04)); else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') c.pickAt(xAt(cur - .04));
        else if (e.key === 'Escape') c.pickAt(null); else return false;
        say(c, c.$('.js-hit').getAttribute('aria-valuetext'));
      });
      const setFlight = (instant) => {
        const f = F();
        const txt = [['.js-code', f.code], ['.js-c1', f.from[1]], ['.js-c2', f.to[1]], ['.js-d1', f.date[0]], ['.js-d2', f.date[1]]];
        txt.forEach(([s, v]) => { c.$(s).textContent = v; });
        c.tDep.textContent = f.dep; c.tVia.textContent = f.via[0]; c.tStart.textContent = f.start; c.tViaN.textContent = f.via[1];
        c.$('.js-dep').textContent = f.dep; c.$('.js-arr').textContent = f.arr;
        const [h, m] = fmtDur(f.mins); durH.textContent = h; durM.textContent = m;
        const fromEl = c.$('.js-from'), toEl = c.$('.js-to');
        if (instant || Lab.reduced) { fromEl.textContent = f.from[0]; toEl.textContent = f.to[0]; return; }
        const span = (toEl.getBoundingClientRect().left - fromEl.getBoundingClientRect().left);
        gsap.timeline()
          .to(fromEl, { x: span, opacity: 0, duration: .45, ease: 'power3.in' }, 0)
          .to(toEl, { x: -span, opacity: 0, duration: .45, ease: 'power3.in' }, 0)
          .call(() => { fromEl.textContent = f.from[0]; toEl.textContent = f.to[0]; })
          .fromTo(fromEl, { x: -24 * c.unit, opacity: 0 }, { x: 0, opacity: 1, duration: .6, ease: 'expo.out', clearProps: 'transform,opacity' })
          .fromTo(toEl, { x: 24 * c.unit, opacity: 0 }, { x: 0, opacity: 1, duration: .6, ease: 'expo.out', clearProps: 'transform,opacity' }, '<');
        c.p.v = 0; c.p.vel = 0; c.p.t = c.base;
      };
      c.$('.s07-swap').addEventListener('click', () => {
        c.dir = 1 - c.dir; c.el.classList.toggle('is-back', c.dir === 1);
        c.$('.s07-swap').setAttribute('aria-label', c.dir ? 'Show the outbound flight' : 'Show the return flight');
        setFlight(false); say(c, `${F().code}, ${F().from[1]} to ${F().to[1]}`);
      });
      c.frame = (dt, idle) => {
        if (S.live && c.pick === null) { c.base += dt * .012; if (c.base > 1.04) c.base = 0; c.p.t = Math.min(1, c.base); }
        if (Lab.reduced) { c.p.v = c.p.t; c.p.vel = 0; } else step(c.p, dt);
        c.drawRoute();
        W.tf(c.$('.s07-swap svg'), `translate3d(${(Math.sin(S.t * 1.7) * 1.6 * idle * c.unit).toFixed(2)}px,${(Math.sin(S.t * 3.4) * .8 * idle * c.unit).toFixed(2)}px,0)`);
      };
      c.reset = () => { if (c.dir) { c.dir = 0; c.el.classList.remove('is-back'); setFlight(true); } c.base = (ROUTE.plane - ROUTE.x0) / (ROUTE.x1 - ROUTE.x0); c.pickAt(null); };
    }

    /* ═════════ 07·3 walking ═════════ */
    const C3 = card('walk');
    {
      const c = C3;
      c.steps = 4432; c.pick = null; c.stat = [0, 0, 0];
      c.stepsOdo = new Odo(c.$('.js-steps')); c.bpmOdo = new Odo(c.$('.js-bpm'));
      c.statOdo = c.$$('.js-stat').map(n => new Odo(n));
      const g = c.$('.js-walks');
      for (let x = 30; x <= 310; x += 3.5) SVG('circle', { cx: r2(x), cy: 115, r: .85, fill: '#000' }, g);
      c.bars = WALKS.map(w => SVG('rect', { x: w.x0, y: 113.2, width: w.x1 - w.x0, height: 3.6, rx: .6, fill: '#000' }, g));
      WALKS.forEach(w => { const a = SVG('text', { x: w.x0, y: 109.5, class: 's07-t-panel' }, g); a.textContent = w.t; const b = SVG('text', { x: w.x0, y: 126.5, class: 's07-t-psmall' }, g); b.textContent = w.n.toLocaleString('en-US'); });
      // heart rate: 26 points over x 231 → 320
      c.hr = [72.5, 74.5, 77.5, 81, 84, 86, 86.5, 85, 84.5, 86.5, 89.5, 91.5, 92, 90.5, 87, 83, 80.5];   // traced from the shot, x 231 → 320
      c.hrK = 12; c.hrShift = 0;
      const fmt = n => n.toLocaleString('en-US');
      const st1 = c.$('.js-st1'), st2 = c.$('.js-st2');
      c.pickAt = x => {
        if (x === null) { if (c.pick === null) return; c.pick = null; c.stepsOdo.set(fmt(c.steps), { dir: -1 }); st2.textContent = 'Today'; c.bars.forEach(b => { b.setAttribute('height', 3.6); b.setAttribute('y', 113.2); }); return; }
        let best = 0, bd = 1e9; WALKS.forEach((w, i) => { const d = x < w.x0 ? w.x0 - x : x > w.x1 ? x - w.x1 : 0; if (d < bd) { bd = d; best = i; } });
        if (best === c.pick) return;
        c.pick = best; const w = WALKS[best];
        c.stepsOdo.set(fmt(w.n), { dir: -1 }); st2.textContent = `at ${w.t}`;
        c.bars.forEach((b, i) => { b.setAttribute('height', i === best ? 5.6 : 3.6); b.setAttribute('y', i === best ? 112.2 : 113.2); });
        c.$('.js-hit').setAttribute('aria-valuetext', `${fmt(w.n)} steps on the walk at ${w.t}`);
      };
      scrubber(c, x => c.pickAt(x), e => {
        const cur = c.pick ?? -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') c.pickAt(WALKS[Math.min(2, cur + 1)].x0 + 1); else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') c.pickAt(WALKS[Math.max(0, cur - 1)].x0 + 1);
        else if (e.key === 'Escape') c.pickAt(null); else return false;
        say(c, c.$('.js-hit').getAttribute('aria-valuetext'));
      });
      const STATS = [[['7.20', 'km'], ['4.47', 'mi']], [['320', 'min'], ['5:20', 'hours']], [['2,340', 'kCal'], ['9,790', 'kJ']]];
      c.$$('[data-stat]').forEach((b, i) => b.addEventListener('click', () => {
        c.stat[i] = 1 - c.stat[i]; const [v, u] = STATS[i][c.stat[i]];
        c.statOdo[i].set(v); const un = b.querySelector('.js-unit');
        if (Lab.reduced) un.textContent = u; else gsap.timeline().to(un, { opacity: 0, y: -4 * c.unit, duration: .15 }).call(() => { un.textContent = u; }).fromTo(un, { opacity: 0, y: 4 * c.unit }, { opacity: 1, y: 0, duration: .4, ease: 'expo.out', clearProps: 'transform,opacity' });
        say(c, `${v} ${u}`);
      }));
      c.drawHR = () => {
        const n = c.hr.length, x0 = 231, x1 = 320, y = v => 225 - (v - 70) * 1.35;
        const shift = c.hrShift * (x1 - x0) / (n - 1);
        const pts = c.hr.map((v, i) => [x0 + i * (x1 - x0) / (n - 1) - shift, y(v)]);
        const d = Lab.kit.monotone(pts.map(q => q[0]), pts.map(q => q[1])).d;
        W.attr(c.$('.js-bpmline'), 'd', d);
        W.attr(c.$('.js-bpmfill'), 'd', `${d}L${r2(pts[n - 1][0])},228L${r2(pts[0][0])},228Z`);
        const k = c.hrK, px = x0 + k * (x1 - x0) / (n - 1) - shift;
        W.attr(c.$('.js-bpmdot'), 'cx', r2(px)); W.attr(c.$('.js-bpmdot'), 'cy', r2(y(c.hr[k])));
      };
      c.hrT = 0; c.stepT = 0; c.clockMin = 20 * 60 + 46; c.clockAcc = 0;
      const walker = c.$('.js-walker svg');
      [['.w-leg1', '11px 13.8px'], ['.w-leg2', '11px 13.8px'], ['.w-arm1', '12.2px 9.2px'], ['.w-arm2', '12.2px 9.2px']].forEach(([s, o]) => { walker.querySelector(s).style.transformOrigin = o; });
      c.near = spring(0, 60, 14); c.gait = 0;
      c.frame = (dt, idle) => {
        // heart rate scrolls along, one sample a second (faster when live)
        c.hrT += dt * (S.live ? 1.6 : .8) * idle;
        c.hrShift = c.hrT % 1;
        if (c.hrT >= 1) {
          c.hrT -= 1; c.hr.shift();
          const n2 = c.hr.length, last = c.hr[n2 - 1], prev = c.hr[n2 - 2]; c.hr.push(clamp(last + (last - prev) * .6 + (Math.random() - .5) * 3.2, 72, 96));
          c.bpmOdo.set(String(Math.round(c.hr[c.hrK])), { dur: .6 });
        }
        c.drawHR();
        // steps creep up while live
        if (S.live && !Lab.reduced) { c.stepT += dt; if (c.stepT > 1.1) { c.stepT = 0; c.steps += 1 + Math.floor(Math.random() * 4); if (c.pick === null) c.stepsOdo.set(fmt(c.steps), { dur: .7 }); } }
        // the clock above the card
        c.clockAcc += dt; if (c.clockAcc >= 60) { c.clockAcc -= 60; c.clockMin = (c.clockMin + 1) % 1440; const h = Math.floor(c.clockMin / 60); c.$('.js-clk').textContent = `${((h + 11) % 12) + 1}:${pad(c.clockMin % 60)}`; c.$('.js-ampm').textContent = h >= 12 ? 'PM' : 'AM'; }
        // the walker walks while the pointer is on the card
        c.near.t = c.P.inside && !Lab.reduced ? 1 : 0; step(c.near, dt);
        c.gait += dt * 5.2 * (.25 + c.near.v);
        const sw = Math.sin(c.gait) * 26 * (.15 + .85 * c.near.v) * idle;
        [['.w-leg1', sw], ['.w-leg2', -sw], ['.w-arm1', -sw * .8], ['.w-arm2', sw * .8]].forEach(([s, a]) => W.tf(walker.querySelector(s), `rotate(${a.toFixed(1)}deg)`));
        W.tf(walker, `translate3d(0,${(-Math.abs(Math.sin(c.gait)) * 1.2 * c.near.v * c.unit).toFixed(2)}px,0)`);
      };
      c.reset = () => { c.steps = 4432; c.pick = null; c.stepsOdo.set(fmt(c.steps), { instant: true }); st2.textContent = 'Today'; };
    }

    /* ═════════ 07·4 stock ═════════ */
    const C4 = card('stock');
    {
      const c = C4;
      c.line = STOCK_LINE.map(([x, y]) => [x, PRICE_AT(y)]);
      c.price = 160.08; c.open = 158.12; c.lastClose = 159.76; c.cur = 0; c.pace = 0; c.events = true; c.pick = null; c.tickT = 0;
      c.el.classList.add('is-events');
      c.priceOdo = new Odo(c.$('.js-price')); c.chgOdo = new Odo(c.$('.js-chg')); c.pctOdo = new Odo(c.$('.js-pct'));
      const g = c.$('.js-chart');
      const yOf = p => 220.5 - (p - c.price) * 6;   // re-based on the current price at the dotted line
      c.base = SVG('g', {}, g);
      for (let x = 32.5; x <= 305; x += 3.6) SVG('circle', { cx: r2(x), cy: 220.5, r: .8, fill: '#000', opacity: .75 }, c.base);
      c.fill = SVG('path', { fill: 'rgba(0,0,0,.09)' }, g);
      c.path = SVG('path', { fill: 'none', stroke: '#000', 'stroke-width': 1.7, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, g);
      c.now = SVG('rect', { y: 205, width: 2, height: 32, rx: .8, fill: '#000' }, g);
      [['10', 'AM', 31.5, 0], ['11', 'AM', 87.5, 0], ['12', 'PM', 142.5, 0], ['1', 'PM', 197.5, 0], ['2', 'PM', 247.5, 1], ['3', 'PM', 298.5, 1]].forEach(([h, ap, x, dim]) => {
        const t = SVG('text', { x, y: 249, class: 's07-t-panel is-axis', opacity: dim ? .35 : 1 }, g); t.textContent = h;
        const s = SVG('tspan', { class: 's07-t-sup is-ink', dx: 1, dy: -3.4 }, t); s.textContent = ap;
      });
      c.evs = SVG('g', { class: 's07-ev' }, g);
      [[86, 'Earnings'], [192.5, 'Guidance']].forEach(([x, label]) => { const gg = SVG('g', { class: 'js-evm', 'data-x': x }, c.evs); SVG('circle', { r: 3.2, fill: '#000' }, gg); SVG('circle', { r: 6, fill: 'none', stroke: '#000', 'stroke-width': .8, opacity: .5 }, gg); const t = SVG('text', { y: -8.5, 'text-anchor': 'middle', class: 's07-t-psmall' }, gg); t.textContent = label; });
      c.crossL = SVG('rect', { y: 203, width: 1.2, height: 36, fill: '#000', opacity: 0 }, g);
      c.crossD = SVG('circle', { r: 3, fill: '#fdf703', stroke: '#000', 'stroke-width': 1.4, opacity: 0 }, g);
      c.crossA = spring(0, 200, 24);
      const money = (v, sym) => { const fixed = v.toFixed(sym === '¥' ? 0 : 2).replace('.', ','); return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
      c.render = (o = {}) => {
        const [, sym, rate] = CURRENCIES[c.cur];
        const shownP = c.pick === null ? c.price : c.pickPrice;
        c.priceOdo.set(money(shownP * rate, sym), { dur: o.dur ?? .8, instant: o.instant });
        const chg = (c.price - c.lastClose) * rate;
        c.chgOdo.set(`${chg >= 0 ? '+' : '−'}${sym}${money(Math.abs(chg), sym)}`, { instant: o.instant });
        const pct = (c.price / c.open - 1) * 100;
        c.pctOdo.set(`${Math.abs(pct).toFixed(2).replace('.', ',')}%`, { instant: o.instant });
        c.el.classList.toggle('is-down', pct < 0);
        c.$('.js-cur').textContent = sym; c.$('.js-coin').textContent = sym; c.$('.js-curname').textContent = CURRENCIES[c.cur][0];
      };
      c.draw = () => {
        const pts = c.line.map(([x, p]) => [x, yOf(p)]);
        const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)},${r2(y)}`).join('');
        W.attr(c.path, 'd', d);
        W.attr(c.fill, 'd', `${d}L${r2(pts[pts.length - 1][0])},240L${r2(pts[0][0])},240Z`);
        const nx = pts[pts.length - 1][0]; W.attr(c.now, 'x', r2(nx - 1));
        c.evs.querySelectorAll('.js-evm').forEach(m => { const x = +m.dataset.x; const i = c.line.findIndex(q => q[0] >= x); const y = i < 0 ? 220.5 : yOf(c.line[i][1]); m.setAttribute('transform', `translate(${x} ${r2(y)})`); });
      };
      const priceAtX = x => { const L = c.line; if (x <= L[0][0]) return L[0][1]; for (let i = 0; i < L.length - 1; i++) if (x <= L[i + 1][0]) return lerp(L[i][1], L[i + 1][1], (x - L[i][0]) / (L[i + 1][0] - L[i][0])); return L[L.length - 1][1]; };
      const timeAtX = x => { const m = Math.round(10 * 60 + (x - 31.5) / (298.5 - 31.5) * 300); const h = Math.floor(m / 60); return `${((h + 11) % 12) + 1}:${pad(m % 60)} ${h >= 12 ? 'PM' : 'AM'}`; };
      const rate = c.$('.js-rate');
      c.pickAt = x => {
        if (x === null) { if (c.pick === null) return; c.pick = null; c.crossA.t = 0; rate.firstChild.textContent = 'Strong Buy'; rate.lastChild.style.display = ''; c.render(); return; }
        const L = c.line; x = clamp(x, L[0][0], L[L.length - 1][0]); c.pick = x; c.pickPrice = priceAtX(x); c.crossA.t = 1;
        rate.firstChild.textContent = timeAtX(x); rate.lastChild.style.display = 'none'; c.render({ dur: .5 });
        c.$('.js-hit').setAttribute('aria-valuetext', `${timeAtX(x)}: ${c.pickPrice.toFixed(2)} dollars`);
      };
      scrubber(c, x => c.pickAt(x), e => {
        const L = c.line, cur = c.pick ?? L[L.length - 1][0], d = 6;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') c.pickAt(cur + d); else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') c.pickAt(cur - d);
        else if (e.key === 'Escape') c.pickAt(null); else return false;
        say(c, c.$('.js-hit').getAttribute('aria-valuetext'));
      });
      c.$('.js-pacebtn').addEventListener('click', () => {
        c.pace = (c.pace + 1) % PACES.length; const [n, u] = PACES[c.pace];
        c.$('.js-pace').textContent = n; c.$('.js-paceu').textContent = u;
        c.$('.js-pacebtn').setAttribute('aria-label', `Update every ${n} ${u === 'Sec' ? 'seconds' : 'minutes'}, change`);
        pop(c.$('.js-pace').parentNode, .8); say(c, `Every ${n} ${u === 'Sec' ? 'seconds' : 'minutes'}`);
      });
      c.$('.js-curbtn').addEventListener('click', () => { c.cur = (c.cur + 1) % CURRENCIES.length; c.render(); pop(c.$('.js-curbtn svg'), .6); say(c, `Prices in ${CURRENCIES[c.cur][0]}`); });
      c.$('.js-evbtn').addEventListener('click', () => {
        c.events = !c.events; c.el.classList.toggle('is-events', c.events); c.$('.js-evbtn').setAttribute('aria-pressed', String(c.events));
        // switching alerts on shows, for a moment, where today's events sit on the chart
        if (c.events && !Lab.reduced) gsap.timeline().set(c.evs, { opacity: 1 }).fromTo(c.evs.querySelectorAll('.js-evm'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: .6, stagger: .08, ease: 'back.out(3)' }).to(c.evs, { opacity: 0, duration: .5, delay: 1.6 });
        say(c, `Key event alerts ${c.events ? 'on' : 'off'}`);
      });
      c.tick = () => {
        const drift = (Math.random() - .47) * .34;
        c.price = Math.max(140, c.price + drift);
        const L = c.line, lastX = L[L.length - 1][0];
        if (lastX < 296) L.push([lastX + 3.2, c.price]);
        else { L.forEach(q => { q[0] -= 3.2; }); while (L.length && L[0][0] < 31) L.shift(); L.push([lastX, c.price]); }
        if (c.pick === null) c.render();
      };
      c.frame = (dt, idle) => {
        if (S.live && !Lab.reduced) { c.tickT += dt; if (c.tickT >= PACES[c.pace][2]) { c.tickT = 0; c.tick(); } }
        c.draw();
        step(c.crossA, dt);
        const a = clamp(c.crossA.v, 0, 1).toFixed(3);
        if (c.pick !== null) { W.attr(c.crossL, 'x', r2(c.pick - .6)); W.attr(c.crossD, 'cx', r2(c.pick)); W.attr(c.crossD, 'cy', r2(yOf(priceAtX(c.pick)))); }
        W.attr(c.crossL, 'opacity', a); W.attr(c.crossD, 'opacity', a);
        W.tf(c.$('.js-sun svg'), `rotate(${(S.t * 14 * idle) % 360}deg)`);
      };
      c.reset = () => { c.line = STOCK_LINE.map(([x, y]) => [x, PRICE_AT(y)]); c.price = 160.08; c.cur = 0; c.pick = null; c.crossA.t = 0; c.events = true; c.el.classList.add('is-events'); c.$('.js-evbtn').setAttribute('aria-pressed', 'true'); gsap.set(c.evs, { opacity: 0 }); c.render({ instant: true }); };
    }

    /* ═════════ 07·5 recorder ═════════ */
    const C5 = card('rec');
    {
      const c = C5;
      c.t = 172.26; c.rec = true; c.paused = false; c.mb = 2.4; c.flags = [];
      c.ms = new Odo(c.$('.js-ms'));
      const cs = c.$('.js-cs'), mb = c.$('.js-mb'), dotEl = c.$('.js-dot');
      const BTN = [166.5, 226.5, 286.5];
      c.dip = BTN.map(() => spring(0, 180, 12));
      const panelPath = () => {
        let d = 'M17.5,261A14,14 0 0 1 31.5,247';
        for (let x = 32; x <= 308; x += 3) { const y = 247 + BTN.reduce((s, b, i) => s + (7 + c.dip[i].v * 6) * Math.exp(-(((x - b) / 16) ** 2)), 0); d += `L${x},${r2(y)}`; }
        return d + 'L308.5,247A14,14 0 0 1 322.5,261V289.5A14,14 0 0 1 308.5,303.5H31.5A14,14 0 0 1 17.5,289.5Z';
      };
      const wg = c.$('.js-wave');
      c.bars = SVG('path', { stroke: '#000', 'stroke-width': 1.7, 'stroke-linecap': 'round', fill: 'none' }, wg);
      c.fut = SVG('g', {}, wg); c.flagG = SVG('g', {}, wg);
      // the shot's recorded part: 41 bars from x 30 to 175
      const seed = [5, 9, 14, 7, 18, 11, 6, 15, 21, 12, 8, 4, 3, 10, 16, 9, 13, 20, 11, 7, 5, 12, 17, 22, 14, 8, 6, 11, 19, 15, 9, 13, 18, 10, 7, 12, 16, 9, 6, 4, 3];
      c.levels = seed.slice(); c.pitch = 3.6; c.headX = 175; c.scroll = 0; c.barT = 0;
      c.drawWave = () => {
        const n = c.levels.length, x0 = c.headX - (n - 1) * c.pitch;
        let d = '';
        c.levels.forEach((h, i) => { const x = r2(x0 + i * c.pitch); const hh = Math.max(.6, h * .5); d += `M${x},${r2(274 - hh)}V${r2(274 + hh)}`; });
        W.attr(c.bars, 'd', d);
        const key = Math.round(c.headX);
        if (c.futKey !== key) { c.futKey = key; c.fut.textContent = ''; for (let x = c.headX + 4; x <= 310; x += 3.5) SVG('circle', { cx: r2(x), cy: 274, r: .85, fill: '#000' }, c.fut); }
      };
      c.setBtnIcons = () => {
        const stopI = c.$('.js-stopi'); const st = c.$('.js-stop');
        if (c.rec) { stopI.setAttribute('rx', 1.2); stopI.setAttribute('x', 7.2); stopI.setAttribute('y', 7.2); stopI.setAttribute('width', 9.6); stopI.setAttribute('height', 9.6); st.setAttribute('aria-label', 'Stop'); st.classList.remove('is-on'); }
        else { stopI.setAttribute('rx', 5.2); stopI.setAttribute('x', 6.8); stopI.setAttribute('y', 6.8); stopI.setAttribute('width', 10.4); stopI.setAttribute('height', 10.4); st.setAttribute('aria-label', 'Record'); st.classList.add('is-on'); }
        const pb = c.$('.js-pause'); c.$('.js-pausei').setAttribute('opacity', c.paused ? 0 : 1); c.$('.js-playi').setAttribute('opacity', c.paused ? 1 : 0);
        pb.setAttribute('aria-pressed', String(c.paused)); pb.setAttribute('aria-label', c.paused ? 'Resume' : 'Pause');
      };
      const show = () => { const s = Math.floor(c.t); c.ms.set(`${pad(Math.floor(s / 60))}:${pad(s % 60)}`, { dur: .7 }); };
      const press = i => { c.dip[i].vel += 9; pop(c.$$('.s07-round')[i], .9); };
      c.$('.js-stop').addEventListener('click', () => {
        press(0);
        if (c.rec) {
          c.rec = false; c.paused = false;
          if (!Lab.reduced) gsap.to(c.levels, { endArray: c.levels.map(() => 0), duration: .5, ease: 'power2.in', onUpdate: () => c.drawWave() });
          setTimeout(() => { c.levels = []; c.headX = 30; c.flagG.textContent = ''; c.flags = []; c.drawWave(); }, Lab.reduced ? 0 : 520);
          c.t = 0; c.mb = 0; c.ms.set('00:00', { dir: -1 }); cs.textContent = '00'; mb.textContent = '0.0';
          say(c, 'Recording stopped');
        } else { c.rec = true; c.paused = false; say(c, 'Recording'); }
        c.setBtnIcons();
      });
      c.$('.js-pause').addEventListener('click', () => { press(1); if (!c.rec) return; c.paused = !c.paused; c.setBtnIcons(); say(c, c.paused ? 'Paused' : 'Recording'); });
      const toast = c.$('.js-toast');
      c.$('.js-flag').addEventListener('click', () => {
        press(2); if (!c.rec) return;
        c.flags.push(c.t);
        const f = SVG('g', { 'data-i': c.flags.length }, c.flagG);
        SVG('rect', { x: -.6, y: 256, width: 1.2, height: 36, fill: '#000' }, f);
        SVG('path', { d: 'M.6 256h7l-1.6 2.6L7.6 261H.6z', fill: '#000' }, f);
        f.setAttribute('transform', `translate(${r2(c.headX + 2)} 0)`); f.dataset.x = c.headX + 2;
        const s = Math.floor(c.t); toast.textContent = `Flag ${c.flags.length} · ${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
        if (!Lab.reduced) gsap.timeline().fromTo(toast, { opacity: 0, y: 6 * c.unit }, { opacity: 1, y: 0, duration: .35, ease: 'expo.out' }).to(toast, { opacity: 0, y: -4 * c.unit, duration: .4, delay: 1.3 });
        say(c, toast.textContent);
      });
      c.frame = (dt, idle) => {
        const going = c.rec && !c.paused;
        if (going) {
          c.t += dt; c.mb += dt * .014;
          cs.textContent = pad(Math.floor((c.t % 1) * 100));
          if (Math.floor(c.t) !== c.lastS) { c.lastS = Math.floor(c.t); show(); mb.textContent = c.mb.toFixed(1); }
          c.barT += dt;
          if (c.barT >= .25) {
            c.barT -= .25;
            const lvl = Math.max(2, Math.min(24, 4 + Math.abs(Math.sin(c.t * 2.1) * 12 + Math.sin(c.t * 7.3) * 6 + (Math.random() - .5) * 10)));
            c.levels.push(lvl);
            if (c.headX < 302) c.headX += c.pitch;
            else { c.levels.shift(); c.flagG.querySelectorAll('g').forEach(f => { f.dataset.x = +f.dataset.x - c.pitch; f.setAttribute('transform', `translate(${r2(+f.dataset.x)} 0)`); if (+f.dataset.x < 26) f.remove(); }); }
          }
        }
        c.drawWave();
        c.dip.forEach(s => step(s, dt));
        W.attr(c.$('.js-wpanel'), 'd', panelPath());
        const blink = going ? (.55 + .45 * Math.cos(S.t * Math.PI * 2 * .8)) : c.rec ? .35 : .18;
        W.style(dotEl, 'opacity', (Lab.reduced ? (going ? 1 : .35) : blink).toFixed(3));
      };
      c.reset = () => { c.t = 172.26; c.rec = true; c.paused = false; c.mb = 2.4; c.levels = seed.slice(); c.headX = 175; c.flagG.textContent = ''; c.flags = []; c.lastS = -1; c.setBtnIcons(); cs.textContent = '26'; mb.textContent = '2.4'; };
      c.setBtnIcons();
    }

    /* ═════════ 07·6 radio ═════════ */
    const C6 = card('radio');
    {
      const c = C6;
      c.band = 'FM'; c.f = 102.6; c.playing = true; c.favs = new Set(); c.drag = null; c.vel = 0; c.glide = null;
      c.freqOdo = new Odo(c.$('.js-freq'));
      const scale = c.$('.js-scale');
      const B = () => BANDS[c.band];
      c.buildScale = () => {
        scale.textContent = '';
        const b = B();
        if (c.band === 'FM') {
          for (let f = 87; f <= 109; f = Math.round((f + .1) * 10) / 10) {
            const x = f * b.per;
            if (Math.abs(f - Math.round(f)) < .001) { SVG('rect', { x: r2(x - .6), y: 193, width: 1.2, height: 8, fill: '#000' }, scale); const t = SVG('text', { x: r2(x), y: 219, 'text-anchor': 'middle', class: 's07-scale-t' }, scale); t.textContent = String(Math.round(f)); }
            else SVG('circle', { cx: r2(x), cy: 198.5, r: .75, fill: '#000' }, scale);
          }
        } else {
          for (let f = 520; f <= 1710; f += 10) {
            const x = f * b.per;
            if (f % 100 === 0) { SVG('rect', { x: r2(x - .6), y: 193, width: 1.2, height: 8, fill: '#000' }, scale); const t = SVG('text', { x: r2(x), y: 219, 'text-anchor': 'middle', class: 's07-scale-t' }, scale); t.textContent = String(f); }
            else SVG('circle', { cx: r2(x), cy: 198.5, r: .75, fill: '#000' }, scale);
          }
        }
      };
      const station = () => B().list.find(s => Math.abs(s.f - c.f) < B().stepF * .5) || null;
      const label = c.$('.js-station'), song = c.$('.js-song'), dotEl = c.$('.js-dot');
      let shownF = null, shownSt;
      c.render = (o = {}) => {
        const b = B(), q = Math.round(c.f / b.stepF) * b.stepF;
        const txt = b.label(q);
        if (txt !== shownF) { c.freqOdo.set(txt, { dur: .45, instant: o.instant }); shownF = txt; c.$('.js-dec').textContent = c.band === 'FM' ? `.${txt.split('.')[1]}` : 'kHz'; c.$('.js-hit').setAttribute('aria-valuetext', `${txt} ${b.unit}${station() ? ', ' + station().name : ''}`); }
        const st = station();
        if (st !== shownSt) {
          shownSt = st;
          label.textContent = st ? st.name : (c.band === 'FM' ? 'Searching…' : 'Searching…');
          song.textContent = st ? st.song : '· · ·';
          c.$('.js-star').classList.toggle('is-on', !!st && c.favs.has(c.band + st.f));
          c.$('.js-star').setAttribute('aria-pressed', String(!!st && c.favs.has(c.band + st.f)));
          c.marqX = 0; c.songW = null;
        }
      };
      const glideTo = f => { const b = B(); c.glide = clamp(f, b.min, b.max); };
      c.render({ instant: true });
      c.buildScale();
      // drag to tune, with a throw
      const hit = c.$('.js-hit');
      hit.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; hit.setPointerCapture(e.pointerId); c.drag = { x: hitX(c, e), f: c.f, t: performance.now() }; c.glide = null; c.vel = 0; hit.style.cursor = 'grabbing'; });
      hit.addEventListener('pointermove', e => {
        if (!c.drag) return;
        const x = hitX(c, e), now = performance.now(), b = B();
        const f = clamp(c.drag.f - (x - c.drag.x) / b.per, b.min, b.max);
        const dtm = Math.max(1, now - c.drag.t) / 1000;
        c.vel = lerp(c.vel, (f - c.f) / dtm, .4); c.f = f; c.drag.t = now; c.render();
      });
      const release = () => { if (!c.drag) return; c.drag = null; hit.style.cursor = 'grab'; if (Lab.reduced) { c.vel = 0; settle(); } };
      hit.addEventListener('pointerup', release); hit.addEventListener('pointercancel', release);
      const settle = () => { const b = B(); const near = b.list.reduce((best, s) => Math.abs(s.f - c.f) < Math.abs(best.f - c.f) ? s : best, b.list[0]); glideTo(Math.abs(near.f - c.f) <= b.stepF * 10 ? near.f : Math.round(c.f / b.stepF) * b.stepF); };
      hit.addEventListener('keydown', e => {
        const b = B(); let f = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') f = c.f + b.stepF; else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') f = c.f - b.stepF;
        else if (e.key === 'PageUp') seek(1); else if (e.key === 'PageDown') seek(-1); else return;
        e.preventDefault(); if (f !== null) { glideTo(Math.round(f / b.stepF) * b.stepF); } setTimeout(() => say(c, hit.getAttribute('aria-valuetext')), 400);
      });
      const seek = dir => { const b = B(), list = b.list; const nxt = dir > 0 ? list.find(s => s.f > c.f + b.stepF * .5) || list[0] : [...list].reverse().find(s => s.f < c.f - b.stepF * .5) || list[list.length - 1]; glideTo(nxt.f); setTimeout(() => say(c, `${nxt.name}, ${b.label(nxt.f)} ${b.unit}`), 300); };
      c.$('.js-prev').addEventListener('click', () => { seek(-1); pop(c.$('.js-prev')); });
      c.$('.js-next').addEventListener('click', () => { seek(1); pop(c.$('.js-next')); });
      c.$('.js-play').addEventListener('click', () => {
        c.playing = !c.playing; const b = c.$('.js-play');
        b.querySelector('.js-pausei').setAttribute('opacity', c.playing ? 1 : 0); b.querySelector('.js-playi').setAttribute('opacity', c.playing ? 0 : 1);
        b.setAttribute('aria-pressed', String(!c.playing)); b.setAttribute('aria-label', c.playing ? 'Pause' : 'Play'); pop(b); say(c, c.playing ? 'Playing' : 'Paused');
      });
      c.$('.js-star').addEventListener('click', () => {
        const st = station(); if (!st) return; const k = c.band + st.f;
        if (c.favs.has(k)) c.favs.delete(k); else c.favs.add(k);
        const on = c.favs.has(k); c.$('.js-star').classList.toggle('is-on', on); c.$('.js-star').setAttribute('aria-pressed', String(on));
        pop(c.$('.js-star svg'), .5); say(c, `${st.name} ${on ? 'saved' : 'removed'}`);
      });
      const setBand = band => {
        if (band === c.band) return;
        c.band = band;
        c.$('.js-am').classList.toggle('is-on', band === 'AM'); c.$('.js-fm').classList.toggle('is-on', band === 'FM');
        c.$('.js-am').setAttribute('aria-pressed', String(band === 'AM')); c.$('.js-fm').setAttribute('aria-pressed', String(band === 'FM'));
        c.$('.js-unitf').textContent = B().unit; hit.setAttribute('aria-valuemin', B().min); hit.setAttribute('aria-valuemax', B().max);
        c.f = band === 'FM' ? 102.6 : 1080; c.glide = null; shownF = null; shownSt = undefined;
        if (!Lab.reduced) gsap.fromTo(scale, { opacity: 0 }, { opacity: 1, duration: .5 });
        c.buildScale(); c.render(); say(c, `${band}, ${station() ? station().name : ''}`);
      };
      c.$('.js-am').addEventListener('click', () => setBand('AM'));
      c.$('.js-fm').addEventListener('click', () => setBand('FM'));
      c.marqX = 0;
      c.frame = (dt, idle) => {
        const b = B();
        if (!c.drag) {
          if (c.glide !== null) { const d = c.glide - c.f; c.f += d * Math.min(1, dt * 9); if (Math.abs(d) < b.stepF * .02) { c.f = c.glide; c.glide = null; } c.render(); }
          else if (Math.abs(c.vel) > b.stepF * .3) { c.f = clamp(c.f + c.vel * dt, b.min, b.max); c.vel *= Math.pow(.04, dt); c.render(); if (Math.abs(c.vel) <= b.stepF * .3) settle(); }
        }
        // the dial: the current frequency sits under the needle (x 170)
        W.attr(scale, 'transform', `translate(${r2(170 - c.f * b.per)} 0)`);
        const st = station();
        // the song line runs while playing on a station
        if (c.songW == null) c.songW = song.getBoundingClientRect().width / Math.max(.001, c.unit);
        const span = c.songW, box = 176;
        if (st && c.playing && !Lab.reduced && span > box * .78) { c.marqX = (c.marqX + dt * 26) % (span + 40); }
        W.tf(song, `translate3d(${(-c.marqX * c.unit).toFixed(1)}px,0,0)`);
        W.style(dotEl, 'opacity', (!st ? .18 : !c.playing ? .35 : Lab.reduced ? 1 : .55 + .45 * Math.cos(S.t * 2.4)).toFixed(3));
        // off station: the needle flickers
        W.attr(c.$('.js-needle'), 'x', r2(167 + (!st && !Lab.reduced ? (Math.random() - .5) * .9 : 0)));
      };
      c.reset = () => { if (c.band !== 'FM') setBand('FM'); c.f = 102.6; c.glide = null; c.vel = 0; c.render({ instant: true }); if (!c.playing) c.$('.js-play').click(); };
    }

    /* ── "•••": replay that card ── */
    cards.forEach(c => { const m = c.$('.s07-more'); if (m) m.addEventListener('click', () => {
      if (c.reset) c.reset();
      if (Lab.reduced) return;
      gsap.fromTo(m.children, { y: 0 }, { y: -4 * c.unit, duration: .16, stagger: .05, yoyo: true, repeat: 1, ease: 'power2.out' });
      c.anim = true; cardIntro(c, gsap.timeline({ onComplete: () => { c.anim = false; c.lastTf = null; } }), 0);
    }); });

    /* ── frame ── */
    function frame(time, deltaMS) {
      const dt = Math.min(.05, deltaMS / 1000) * Lab.timeScale;
      if (dt <= 0) return;
      S.t += dt;
      const reduced = Lab.reduced, idle = reduced ? 0 : S.idle;
      cards.forEach(c => {
        const P = c.P, lean = P.inside && P.mouse && !reduced;
        c.tiltX.t = lean ? -P.ny * 3.2 : 0; c.tiltY.t = lean ? P.nx * 3.8 : 0;
        step(c.tiltX, dt); step(c.tiltY, dt);
        if (!introTl && !c.anim) { const tf = `perspective(${(1200 * c.unit).toFixed(0)}px) rotateX(${c.tiltX.v.toFixed(3)}deg) rotateY(${c.tiltY.v.toFixed(3)}deg)`; if (tf !== c.lastTf) { c.el.style.transform = tf; c.lastTf = tf; } }
        c.frame(dt, idle);
      });
    }

    /* ── intro ── */
    function cardIntro(c, tl, at) {
      const u = c.unit, all = s => [...c.el.querySelectorAll(s)];
      const q = s => { const l = all(s); return l.length ? l : [document.createElement('i')]; };   // never hand GSAP an empty list
      tl.fromTo(c.el, { y: 50 * u, scale: .94, rotationX: 12, opacity: 0, transformPerspective: 1200 * u }, { y: 0, scale: 1, rotationX: 0, opacity: 1, duration: 1.15, ease: 'expo.out', clearProps: 'transform,opacity' }, at);
      tl.fromTo(q('.s07-panel'), { scaleX: .2, opacity: 0, transformOrigin: '50% 50%' }, { scaleX: 1, opacity: 1, duration: .9, ease: 'expo.out', clearProps: 'transform,opacity' }, at + .25);
      tl.fromTo(q('.s07-halo'), { opacity: 0 }, { opacity: .9, duration: .9, clearProps: 'opacity' }, at + .45);
      tl.fromTo(q('.s07-sq, .s07-round, .s07-badge-ic, .s07-swap'), { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, stagger: .05, ease: 'back.out(2.2)', clearProps: 'transform,opacity' }, at + .35);
      tl.fromTo(q('.s07-more i'), { scale: 0 }, { scale: 1, duration: .5, stagger: .05, ease: 'back.out(3)', clearProps: 'transform' }, at + .5);
      tl.call(() => {
        if (c === C1) { c.hm.set(c.hm.text || '09:34', { fromZero: true, dur: 1.3, force: true }); c.sec.set(c.sec.text || '53', { fromZero: true, dur: 1.1, force: true }); }
        if (c === C3) { c.stepsOdo.set(c.stepsOdo.text, { fromZero: true, dur: 1.4, force: true }); c.bpmOdo.set(c.bpmOdo.text, { fromZero: true, dur: 1.1, force: true }); c.statOdo.forEach(o => o.set(o.text, { fromZero: true, dur: 1.2, force: true })); }
        if (c === C4) { c.priceOdo.set(c.priceOdo.text, { fromZero: true, dur: 1.4, force: true }); }
        if (c === C5) { c.ms.set(c.ms.text, { fromZero: true, dur: 1.2, force: true }); }
        if (c === C6) { c.freqOdo.set(c.freqOdo.text, { fromZero: true, dur: 1.2, force: true }); }
      }, null, at + .3);
    }
    function finalState() {
      if (introTl) { introTl.kill(); introTl = null; }
      S.idle = 1;
      cards.forEach(c => { gsap.set([c.el, ...c.el.querySelectorAll('.s07-panel, .s07-halo, .s07-sq, .s07-round, .s07-badge-ic, .s07-swap, .s07-more i')], { clearProps: 'transform,opacity' }); c.lastTf = null; c.anim = false; if (c.reset) c.reset(); });
      // first paint of every number
      C1.frame(0, 0); C3.stepsOdo.set('4,432', { instant: true }); C3.bpmOdo.set('92', { instant: true });
      C3.statOdo.forEach((o, i) => o.set(['7.20', '320', '2,340'][i], { instant: true }));
      C4.render({ instant: true }); C5.ms.set('02:52', { instant: true }); C6.render({ instant: true });
      introEl.style.visibility = 'visible';
    }
    function intro() {
      if (introTl) introTl.kill();
      finalState();
      if (Lab.reduced) { gsap.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5 }); return; }
      S.idle = 0;
      const tl = introTl = gsap.timeline({ onComplete: () => { introTl = null; } });
      tl.fromTo(introEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: .3 }, 0);
      cards.forEach((c, i) => cardIntro(c, tl, .05 + (i % 3) * .1 + Math.floor(i / 3) * .16));
      tl.to(S, { idle: 1, duration: 1, ease: 'sine.inOut' }, 1);
    }

    /* ── lifecycle ── */
    const odos = () => [C1.hm, C1.sec, C3.stepsOdo, C3.bpmOdo, ...C3.statOdo, C4.priceOdo, C4.chgOdo, C4.pctOdo, C5.ms, C6.freqOdo];
    function resize() { cards.forEach(c => { const w = c.el.clientWidth; if (w) c.unit = w / CW; c.P.drop(); c.lastTf = null; }); C6.songW = null; odos().forEach(o => o.remeasure()); }
    new ResizeObserver(resize).observe(stage);
    resize();
    Lab.fonts.then(resize);
    if (document.fonts) document.fonts.addEventListener('loadingdone', resize);
    function start() { if (!S.running) { S.running = true; gsap.ticker.add(frame); } }
    function stop() { if (S.running) { S.running = false; gsap.ticker.remove(frame); } }
    finalState();
    if (!Lab.still) introEl.style.visibility = 'hidden';
    start();

    return {
      id: 7,
      intro: () => { introEl.style.visibility = ''; intro(); },
      replay: () => { introEl.style.visibility = ''; intro(); },
      setLive(on) { S.live = !!on; },
      setVisible(v) { if (v) start(); else stop(); },
      focus(i) { host.classList.toggle('has-focus', i !== null); cards.forEach((c, ci) => c.el.classList.toggle('is-focus', ci === i)); },
      _cards: cards,
    };
  }

  Lab.register({ id: 7, slug: 'folders', mount });
})();
