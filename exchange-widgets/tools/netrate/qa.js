/* NetRate QA:  node tools/netrate/qa.js <page> [widgets=all or n01,n02,…] [quick]
   <page> is a built file (node tools/bundle.mjs dist; then file:///…/dist/netrate.html or …/dist/netrate/<widget>.html).
   Needs `playwright`. Every network request is blocked, so a page that passes also has no external resources.
   Checks the brief's hard rules on the rendered widgets, across language × state × direction × volatile day
   (black, colour, iOS 393) and theme × render × platform (normal and not-posted):
     no digits in the empty states · no flags / currency signs / emoji · digits follow the language · no green ·
     one aria sentence with the figure, the age and the state · every figure has an age · text never collides,
     leaves the widget or is clipped · every button's hit area is at least 44 × 44 · sizes per platform ·
     the buttons really change the figures · the three slips share one style · no animation runs with the
     display-only switch off or with reduced motion · no console errors.
   Prints the failures; exit code 1 if there are any. */
const { chromium } = require('playwright');
const url = process.argv[2];
const wids = (process.argv[3] || 'all').split(',');
const quick = process.argv[4] === 'quick';
const fs = require('fs');

// everything the page evaluates: collects facts about one widget
function scan(sel, expect) {
  const root = document.querySelector(sel); root.scrollIntoView({ block: 'center' });
  const rb = root.getBoundingClientRect(), out = { fails: [] };
  const fail = m => out.fails.push(m);
  const visible = el => { for (let e = el; e && e !== root.parentNode; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return false; } return true; };
  const all = [...root.querySelectorAll('*')].filter(visible);
  // text of everything visible
  const texts = [];
  all.forEach(el => {
    [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).forEach(n => {
      const rg = document.createRange(); rg.selectNodeContents(n);
      const fs = parseFloat(getComputedStyle(el).fontSize) || 12;
      // the glyph body: the middle 0.64 em of the line box (the font's line box is much taller than its ink)
      const rects = [...rg.getClientRects()].filter(r => r.width > 0.5 && r.height > 0.5).map(r => { const c = (r.top + r.bottom) / 2; return { left: r.left, right: r.right, top: c - .32 * fs, bottom: c + .32 * fs }; });
      if (rects.length) texts.push({ el, t: n.textContent.trim(), rects, cls: String(el.className && el.className.baseVal === undefined ? el.className : '') });
    });
  });
  const visText = texts.map(x => x.t).join(' ');
  // 1. unset / gallery: no digits at all
  if (expect.empty && /[0-9۰-۹]/.test(visText)) fail('digits in an empty-state widget: ' + visText.slice(0, 80));
  if (expect.empty && !visText.trim()) fail('empty state has no sentence');
  // 2. no flags, currency signs, emoji
  if (/[£$€¥﷼￡₹]/.test(visText) || /\p{Extended_Pictographic}|[\u{1F1E6}-\u{1F1FF}]/u.test(visText)) fail('currency/emoji/flag in text: ' + visText.slice(0, 80));
  // 3. digits follow the language
  if (!expect.empty) {
    if (expect.lang === 'fa' && /[0-9]/.test(visText.replace(/[A-Za-z]+[0-9]*/g, ''))) fail('latin digits in a Persian widget: ' + visText.slice(0, 120));
    if (expect.lang === 'en' && /[۰-۹٬٫٪]/.test(visText)) fail('Persian digits/separators in an English widget');
    if (root.getAttribute('dir') !== (expect.lang === 'fa' ? 'rtl' : 'ltr')) fail('dir attribute');
  }
  // 4. no green anywhere (computed colours, fills, strokes, backgrounds, gradient stops)
  const hueOf = css => {
    const m = css.match(/rgba?\(([\d.]+)[, ]+([\d.]+)[, ]+([\d.]+)(?:[,/ ]+([\d.]+))?/); if (!m) return null;
    const [r, g, b] = [m[1], m[2], m[3]].map(v => v / 255), a = m[4] == null ? 1 : +m[4];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (d < .001 || a < .08) return null;
    const l = (mx + mn) / 2, s = d / (1 - Math.abs(2 * l - 1)); let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360;
    return { h, s, l };
  };
  const greens = [];
  [...root.querySelectorAll('*')].forEach(el => {
    const cs = getComputedStyle(el);
    ['color', 'backgroundColor', 'borderTopColor', 'fill', 'stroke', 'stopColor', 'outlineColor'].forEach(p => {
      const v = cs[p]; if (!v || v === 'none') return; const c = hueOf(v);
      if (c && c.h > 70 && c.h < 175 && c.s > .12 && c.l > .06 && c.l < .96) greens.push(`${el.tagName}.${String(el.className.baseVal != null ? el.className.baseVal : el.className).slice(0, 20)} ${p}=${v}`);
    });
    const bi = cs.backgroundImage; if (bi && bi !== 'none') (bi.match(/rgba?\([^)]+\)/g) || []).forEach(v => { const c = hueOf(v); if (c && c.h > 70 && c.h < 175 && c.s > .12) greens.push(`${el.tagName} bg-gradient ${v}`); });
  });
  if (greens.length) fail('green found: ' + greens.slice(0, 3).join(' | '));
  // 5. aria: one complete sentence on the card
  const card = root.querySelector('.nrw-card');
  const al = card && card.getAttribute('aria-label') || '';
  if (!al) fail('no aria-label on the card');
  if (!expect.empty && expect.number && !al.includes(expect.number)) fail(`aria-label lacks the number ${expect.number}: ${al}`);
  if (!expect.empty && expect.age && !al.includes(expect.age)) fail(`aria-label lacks the age "${expect.age}": ${al}`);
  if (!expect.empty && expect.banner && !al.includes(expect.banner)) fail(`aria-label lacks the state "${expect.banner}": ${al}`);
  // 6. every figure has an age on screen (a clock-less age text is still an .nr-age)
  if (!expect.empty) { const ages = root.querySelectorAll('.nr-age'); if (!ages.length) fail('no age element'); [...ages].filter(visible).forEach(a => { if (!a.textContent.trim()) fail('empty age'); }); }
  // 7. text must not collide with other text, and must stay inside the card
  const inner = texts.filter(x => !x.el.closest('.nr-ph'));
  for (let i = 0; i < inner.length; i++) {
    const A = inner[i];
    A.rects.forEach(r => { if (r.left < rb.left - 1 || r.right > rb.right + 1 || r.top < rb.top - 1 || r.bottom > rb.bottom + 1) fail(`text outside the widget: "${A.t.slice(0, 20)}"`); });
    for (let j = i + 1; j < inner.length; j++) {
      const B = inner[j]; if (A.el.contains(B.el) || B.el.contains(A.el) || A.el === B.el) continue;
      if (A.el.closest('.nr-roll') && A.el.closest('.nr-roll') === B.el.closest('.nr-roll')) continue;
      for (const a of A.rects) for (const b of B.rects) {
        const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (w > 2 && h > 2) { fail(`text overlap: "${A.t.slice(0, 18)}" × "${B.t.slice(0, 18)}" (${w.toFixed(1)}×${h.toFixed(1)})`); }
      }
    }
  }
  // 8. no clipped text (ellipsis or hidden overflow)
  all.forEach(el => { const cs = getComputedStyle(el); if ((cs.overflow === 'hidden' || cs.textOverflow === 'ellipsis') && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !el.classList.contains('rc') && el.scrollWidth > el.clientWidth + 1) fail(`clipped text: "${el.textContent.trim().slice(0, 24)}"`); });
  // 9. hit targets >= 44 x 44 (probed with elementFromPoint, in px = pt at 1:1)
  if (expect.hit) {
    [...root.querySelectorAll('button')].filter(visible).forEach(b => {
      const r = b.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const hits = (x, y) => { const e = document.elementFromPoint(x, y); return !!e && (e === b || b.contains(e)); };
      let l = 0, rr = 0, u = 0, d = 0;
      while (l < 80 && hits(cx - l - 1, cy)) l++; while (rr < 80 && hits(cx + rr + 1, cy)) rr++;
      while (u < 80 && hits(cx, cy - u - 1)) u++; while (d < 80 && hits(cx, cy + d + 1)) d++;
      const w = l + rr + 1, h = u + d + 1;
      if (w < 43.5 || h < 43.5) fail(`hit target ${w}×${h} < 44: ${b.textContent.trim().slice(0, 14) || b.className}`);
    });
  }
  out.size = [Math.round(rb.width), Math.round(rb.height)];
  out.animations = document.getAnimations().filter(a => a.playState === 'running' && root.contains(a.effect && a.effect.target)).length;
  return out;
}

(async () => {
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 1 });
  const requests = [], logs = [];
  await ctx.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('file:') || u.startsWith('data:') || u.startsWith('blob:')) return r.continue();
    requests.push(u);
    return r.abort();
  });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', e => logs.push('[pageerror] ' + e.message));
  await page.goto(url + (url.includes('?') ? '&' : '?') + 'still&fx=0');
  await page.waitForTimeout(1800);
  const present = await page.evaluate(() => NR.widgets.map(w => w.no.toLowerCase()));
  const W = wids[0] === 'all' ? present : wids.filter(w => present.includes(w));
  console.log('widgets on the page:', present.join(','), '| testing', W.join(','));
  const fails = []; let combos = 0;
  const setCtl = (k, v) => page.evaluate(([k, v]) => NR.setControl(k, v), [k, v]);
  const setDir = (w, d) => page.evaluate(([w, d]) => { const st = NR.stages.find(s => s.def.no.toLowerCase() === w); st.L.dir = d; st.inst.update({ animate: false }); }, [w, d]);
  const facts = (w, expectOverrides = {}) => page.evaluate(([sel, e]) => document.querySelector(sel) ? scanFn(sel, e) : null, [`#${w} .nrw`, expectOverrides]);
  await page.addScriptTag({ content: `window.scanFn = ${scan.toString()};` });
  await page.addStyleTag({ content: '.nrc{display:none!important}' });

  const exp = await page.evaluate(() => {   // the numbers the sentence must contain, per state and direction
    const mk = (lang, st, dir, w) => {
      const vm = NR.model({ lang, st, stress: 'calm' }, { dir }); if (vm.empty) return { empty: true };
      const def = NR.widgets.find(x => x.no.toLowerCase() === w), banner = vm.banner ? NR.t(lang, 'state.' + vm.banner) : null;
      if (def && def.qa) return Object.assign({ banner }, def.qa(vm, lang));   // a widget states what its sentence must contain
      const n2 = w === 'n02'; return { number: n2 ? NR.int(vm.market.average, lang) : NR.int(vm.top.rate, lang), age: (n2 ? vm.mktAge : vm.topAge).text, banner };
    };
    const o = {}; for (const w of NR.widgets.map(x => x.no.toLowerCase())) for (const l of ['fa', 'en']) for (const s of ['normal', 'not_posted', 'closed', 'expired', 'offline', 'unset', 'gallery']) for (const d of ['send', 'recv']) o[`${w}|${l}|${s}|${d}`] = mk(l, s, d, w); return o;
  });
  const states = ['normal', 'not_posted', 'closed', 'expired', 'offline', 'unset', 'gallery'];
  const sizes = await page.evaluate(() => { const o = {}; for (const p of Object.keys(NR.SIZES)) { o[p] = {}; NR.widgets.forEach(w => { o[p][w.no.toLowerCase()] = NR.SIZES[p][w.size] || null; }); } return o; });
  // sweep A: language × state × direction × volatile day (black theme, colour, iOS 393)
  await setCtl('theme', 'black'); await setCtl('render', 'color'); await setCtl('platform', 'ios393');
  for (const lang of ['fa', 'en']) {
    await setCtl('lang', lang);
    for (const st of states) { await setCtl('st', st);
      for (const dir of ['send', 'recv']) for (const stress of (quick ? ['calm'] : ['calm', 'down', 'up'])) {
        await setCtl('stress', stress);
        for (const w of W) {
          await setDir(w, dir);
          const e = Object.assign({ lang, hit: true }, exp[`${w}|${lang}|${st}|${dir}`] || {});
          if (stress !== 'calm') { delete e.number; }
          const r = await facts(w, e); if (!r) continue; combos++;
          r.fails.forEach(f => fails.push(`[${w} ${lang} ${st} ${dir} ${stress}] ${f}`));
        }
      }
    }
  }
  await setCtl('stress', 'calm');
  for (const w of W) await setDir(w, 'send');
  // sweep B: theme × render × platform (normal and not_posted)
  if (!quick) for (const theme of ['sample', 'black', 'white', 'dawn']) for (const render of ['color', 'tinted']) for (const platform of ['ios393', 'ios390', 'android']) {
    await setCtl('theme', theme); await setCtl('render', render); await setCtl('platform', platform);
    for (const lang of ['fa', 'en']) { await setCtl('lang', lang);
      for (const st of ['normal', 'not_posted']) { await setCtl('st', st);
        for (const w of W) {
          const e = Object.assign({ lang, hit: true }, exp[`${w}|${lang}|${st}|send`]);
          const r = await facts(w, e); if (!r) continue; combos++;
          r.fails.forEach(f => fails.push(`[${w} ${theme}/${render}/${platform} ${lang} ${st}] ${f}`));
          const want = sizes[platform][w];
          if (want && (Math.abs(r.size[0] - want[0]) > 1 || Math.abs(r.size[1] - want[1]) > 1)) fails.push(`[${w} ${platform}] size ${r.size} != ${want}`);
        }
      }
    }
  }
  // behaviour: the buttons really work
  await setCtl('theme', 'black'); await setCtl('render', 'color'); await setCtl('platform', 'ios393'); await setCtl('lang', 'fa'); await setCtl('st', 'normal');
  const beh = await page.evaluate(async has => {
    const res = []; const txt = s => document.querySelector(s).textContent.replace(/\s+/g, ' ').trim();
    const click = async s => { document.querySelector(s).click(); await new Promise(r => setTimeout(r, 80)); };
    const D = NR.data, M = NR.model({ lang: 'fa', st: 'normal', stress: 'calm' }, { dir: 'send' });   // the numbers the widget is handed (natural wobble included)
    if (has.n01) {
    const before = txt('#n01 .js-num'), title0 = txt('#n01 .js-title');
    await click('#n01 .n1-segb[data-dir="recv"]');
    res.push(['n01 recv number', txt('#n01 .js-num'), NR.int(D.snapshot_receive.best[0].rate, 'fa')]);
    res.push(['n01 recv title', txt('#n01 .js-title'), NR.t('fa', 'title.recv')]);
    res.push(['n01 recv first slip', txt('#n01 .n1-slip[data-i="0"] .js-name'), NR.office(D.snapshot_receive.best[0].exchange.id, 'fa').name]);
    await click('#n01 .n1-segb[data-dir="send"]');
    res.push(['n01 back to send', txt('#n01 .js-num'), before]);
    await click('#n01 .n1-rng[data-range="1w"]');
    res.push(['n01 range 1w pill', txt('#n01 .js-pillpct'), NR.pct(M.series['1w'].best_change_pct, 'fa')]);
    res.push(['n01 range pressed', document.querySelector('#n01 .n1-rng[data-range="1w"]').getAttribute('aria-pressed'), 'true']);
    await click('#n01 .n1-rng[data-range="1y"]');
    res.push(['n01 range 1y pill', txt('#n01 .js-pillpct'), NR.pct(M.series['1y'].best_change_pct, 'fa')]);
    }
    // N02: the cycle button
    if (has.n02) {
    const order = []; for (let i = 0; i < 5; i++) { order.push(txt('#n02 .js-rangelabel')); await click('#n02 .js-cycle'); }
    res.push(['n02 cycle order', order.join('|'), ['1w', '1m', '3m', '1y', '1w'].map(r => NR.t('fa', 'range.' + r)).join('|')]);
    res.push(['n02 pill after five taps (1m)', txt('#n02 .js-pillpct'), NR.pct(M.series['1m'].average_change_pct, 'fa')]);
    document.querySelector('#n02 [data-cfg-dir="recv"]').click(); await new Promise(r => setTimeout(r, 80));
    res.push(['n02 recv average', txt('#n02 .js-num'), NR.int(D.snapshot_receive.market.average, 'fa')]);
    document.querySelector('#n02 [data-cfg-dir="send"]').click(); await new Promise(r => setTimeout(r, 80));
    }
    // N03: direction and the compare switch
    if (has.n03) {
      const r1 = txt('#n03 .js-num'); await click('#n03 .js-dir');
      const rv = NR.model({ lang: 'fa', st: 'normal', stress: 'calm' }, { dir: 'recv' });
      res.push(['n03 recv average', txt('#n03 .js-num'), NR.int(rv.week.this_average, 'fa')]);
      res.push(['n03 recv pct', txt('#n03 .js-bpct'), NR.pct(rv.week.change_pct, 'fa', { noSign: true }).replace(/^/, NR.sign(rv.week.change_pct) > 0 ? '+' : NR.sign(rv.week.change_pct) < 0 ? '−' : '')]);
      await click('#n03 .js-dir'); res.push(['n03 back to send', txt('#n03 .js-num'), r1]);
      const card = document.querySelector('#n03 .n3-card'), more = document.querySelector('#n03 .js-more');
      res.push(['n03 compare on by default', card.classList.contains('no-compare') + '|' + more.getAttribute('aria-pressed'), 'false|true']);
      await click('#n03 .js-more'); await new Promise(r => setTimeout(r, 450)); res.push(['n03 compare off', card.classList.contains('no-compare') + '|' + more.getAttribute('aria-pressed') + '|' + getComputedStyle(document.querySelector('#n03 .js-ghost')).opacity, 'true|false|0']);
      await click('#n03 .js-more'); res.push(['n03 compare on again', card.classList.contains('no-compare'), 'false']);
      res.push(['n03 day labels left to right', [...document.querySelectorAll('#n03 .js-xlab text')].map(t => t.textContent).join('|'), M.week.days.map(d => NR.weekday(d.weekday, 'fa')).join('|')]);
    }
    // a tap that opens the app shows its link
    if (has.n01) {
    document.querySelector('#n01 .n1-slip[data-i="1"]').click(); await new Promise(r => setTimeout(r, 60));
    res.push(['n01 slip link', document.querySelector('.nr-toast').textContent.includes('netrate://office/pars?cur=gbp&type=cash&dir=send'), true]);
    }
    return res;
  }, { n01: W.includes('n01'), n02: W.includes('n02'), n03: W.includes('n03') });
  beh.forEach(([name, got, want]) => { if (String(got) !== String(want)) fails.push(`[behaviour] ${name}: got "${got}", want "${want}"`); });
  // the three slips are one style (no featured office): compare computed styles
  const slipStyles = !W.includes('n01') ? ['x'] : await page.evaluate(() => { const g = i => { const e = document.querySelector(`#n01 .n1-slip[data-i="${i}"] .n1-slip-in`), c = getComputedStyle(e); return ['backgroundImage', 'boxShadow', 'borderRadius', 'opacity', 'filter', 'width', 'height', 'outline'].map(p => c[p]).join('|'); }; return [0, 1, 2].map(g); });
  if (new Set(slipStyles).size !== 1) fails.push('[rule 4] the three slips differ in style: ' + JSON.stringify(slipStyles));
  // motion: with the display-only switch off, nothing runs on its own
  await page.goto(url + (url.includes('?') ? '&' : '?') + 'fx=0'); await page.waitForTimeout(1800);
  const anims = await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running' && !a.effect.target.closest('.bg, .nrc, .top')).length);
  if (anims) fails.push(`[motion] ${anims} animations running with display-only motion off`);
  // reduced motion: same, even with the switch on
  const rctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, reducedMotion: 'reduce' });
  await rctx.route('**/*', r => { const u = r.request().url(); return (u.startsWith('file:') || u.startsWith('data:')) ? r.continue() : r.abort(); });
  const rp = await rctx.newPage(); await rp.goto(url); await rp.waitForTimeout(1800);
  const ranims = await rp.evaluate(() => document.getAnimations().filter(a => a.playState === 'running' && !a.effect.target.closest('.bg, .nrc, .top')).length);
  if (ranims) fails.push(`[reduced motion] ${ranims} animations running`);
  // external requests (the fonts of the page chrome are the only ones the combined page may ask for)
  // the combined page may ask Google Fonts for its own chrome type; a widget file may ask for nothing at all
  const ext = requests.filter(u => !/^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(u));
  if (ext.length) fails.push('[offline] requests made: ' + ext.slice(0, 3).join(', '));
  // a blocked Google Fonts request logs a console error; that is the test's own doing, not the page's
  logs.filter(l => !(ext.length === 0 && /Failed to load resource/.test(l))).forEach(l => fails.push('[console] ' + l));
  console.log(`${combos} combinations scanned; ${fails.length} failures`);
  const seen = new Set(); fails.forEach(f => { const k = f.replace(/\[[^\]]*\]/, '').slice(0, 90); if (!seen.has(k)) { seen.add(k); console.log(f); } });
  await browser.close();
  process.exit(fails.length ? 1 : 0);
})();
