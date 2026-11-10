/* NetRate AA contrast audit:  node tools/netrate/aa.js <page> [n01,n02] [states] ; then  python3 tools/netrate/aa.py
   Renders every widget with its text hidden, samples the real background behind each text box, and
   writes a screenshot and a JSON of the text boxes per combination (language × theme × colour/tinted × state)
   into ./aa/ ; aa.py computes the contrast of each box (4.5 : 1, large text 3 : 1). Needs playwright, Pillow. */
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const wids = (process.argv[3] || 'n01,n02').split(',');
  const out = 'aa'; fs.mkdirSync(out, { recursive: true });
  const url = process.argv[2];
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2 });
  await ctx.route('**/*', r => (/^(file|data|blob):/.test(r.request().url()) ? r.continue() : r.abort()));
  const page = await ctx.newPage(), logs = [];
  page.on('console', m => m.type() === 'error' && logs.push(m.text()));
  await page.goto(url + (url.includes('?') ? '&' : '?') + 'still&fx=0');
  await page.waitForTimeout(1500);
  await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important} .nrc,.nr-toast{display:none!important}' });
  const idx = [];
  const states = (process.argv[4] || 'normal,not_posted,closed,expired,offline').split(',');
  for (const lang of ['fa', 'en']) for (const theme of ['sample', 'black', 'white', 'dawn']) for (const render of ['color', 'tinted']) for (const st of states) {
    await page.evaluate(([l, t, r, s]) => { NR.setControl('lang', l); NR.setControl('theme', t); NR.setControl('render', r); NR.setControl('st', s); }, [lang, theme, render, st]);
    await page.waitForTimeout(120);
    for (const w of wids) {
      const h = await page.$(`#${w} .nrw`); await h.scrollIntoViewIfNeeded();
      const info = await page.evaluate(sel => {
        const root = document.querySelector(sel), rb = root.getBoundingClientRect(), res = [];
        const walk = el => {
          const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          if (own) {
            const cs = getComputedStyle(el), b = el.getBoundingClientRect();
            let op = 1, e = el; while (e && e !== root.parentNode) { op *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; }
            if (b.width > 0 && b.height > 0 && cs.visibility !== 'hidden') res.push({ t: el.textContent.trim().slice(0, 24), cls: el.className && el.className.baseVal === undefined ? el.className : '', x: b.left - rb.left, y: b.top - rb.top, w: b.width, h: b.height, color: cs.color, fs: parseFloat(cs.fontSize), fw: parseInt(cs.fontWeight) || 400, op });
          }
          [...el.children].forEach(walk);
        };
        walk(root);
        return { w: rb.width, h: rb.height, els: res };
      }, `#${w} .nrw`);
      await page.addStyleTag({ content: '.nrw *{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}' }).then(async tag => {
        const f = `${out}/${w}_${lang}_${theme}_${render}_${st}.png`;
        await h.screenshot({ path: f });
        await tag.evaluate(n => n.remove());
        fs.writeFileSync(f.replace('.png', '.json'), JSON.stringify(info));
        idx.push(f);
      });
    }
  }
  fs.writeFileSync(`${out}/index.json`, JSON.stringify(idx));
  console.log(idx.length, 'shots', logs.join('|') || 'no logs');
  await browser.close();
})();
