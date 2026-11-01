#!/usr/bin/env node
/* Builds single-file copies of the Widget Lab pages (no dependencies):
     node tools/bundle.mjs [outDir] [--link widgets=<url>] [--link backgrounds=<url>]
   (default outDir: dist/)
     index.html              → widget-lab.html    and artifact.html
     backgrounds/index.html  → backgrounds.html   and backgrounds-artifact.html
   The plain .html files are standalone pages: open or send them anywhere (kept
   side by side, their section switches link to each other). The *artifact.html
   files are the same content without <html>/<head>/<body>, for a claude.ai
   Artifact; --link points their section switch at the published artifacts.
   Each page marks what to inline with <!-- bundle:css|js|body --> blocks. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const links = {};
let outArg = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--link') { const [k, ...v] = String(args[++i] || '').split('='); if (k && v.length) links[k] = v.join('='); }
  else if (!outArg) outArg = args[i];
}
const out = resolve(outArg || join(root, 'dist'));

const PAGES = [
  { src: 'index.html', section: 'widgets', standalone: 'widget-lab.html', artifact: 'artifact.html' },
  { src: 'backgrounds/index.html', section: 'backgrounds', standalone: 'backgrounds.html', artifact: 'backgrounds-artifact.html' },
];

function build(page) {
  const file = join(root, page.src), dir = dirname(file), html = readFileSync(file, 'utf8');
  const block = name => {
    const m = html.match(new RegExp(`<!-- bundle:${name} -->([\\s\\S]*?)<!-- /bundle:${name} -->`));
    if (!m) throw new Error(`${page.src} has no bundle:${name} block`);
    return m;
  };
  const files = (name, attr) => [...block(name)[1].matchAll(new RegExp(`${attr}="([^"]+)"`, 'g'))].map(m => m[1]);
  const read = f => { const p = join(dir, f); return `/* ── ${relative(root, p)} ── */\n` + readFileSync(p, 'utf8').trim(); };
  // keep "</script>" or "</style>" inside sources from closing the inline tag
  const safe = (s, tag) => s.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`);

  const css = safe(files('css', 'href').map(read).join('\n\n'), 'style');
  const js = safe(files('js', 'src').map(read).join('\n\n'), 'script');
  const body = block('body')[1].trim();

  // the section switch: sibling files when standalone, the published artifacts (new tab) when given
  const switchTo = (s, mode) => s.replace(/<a href="[^"]*"( data-section="(\w+)")/g, (m, attr, sec) => {
    if (sec === page.section) return m;
    const sib = PAGES.find(p => p.section === sec);
    if (!sib) return m;
    if (mode === 'artifact') return links[sec] ? `<a href="${links[sec]}" target="_blank" rel="noopener"${attr}` : `<a href="#top"${attr}`;
    return `<a href="${sib.standalone}"${attr}`;
  });

  let head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'));
  head = head
    .replace(block('css')[0], `<style>\n${css}\n</style>`)
    .replace(block('js')[0], '')
    .replace(/<script defer src="(https:\/\/cdnjs[^"]+)"><\/script>/, '<script src="$1"></script>')
    .replace(/\n{2,}/g, '\n')
    .trim();

  const standalone = `<!doctype html>\n<html lang="fa" dir="rtl">\n<head>\n${head}\n</head>\n<body>\n${switchTo(body, 'standalone')}\n<script>\n${js}\n</script>\n</body>\n</html>\n`;

  // the Artifact host writes its own skeleton (charset, viewport): keep title, the sides meta, fonts, styles, GSAP
  const artifactHead = head
    .replace(/<meta charset[^>]*>\n?/, '')
    .replace(/<meta name="viewport"[^>]*>\n?/, '')
    .replace(/<meta name="description"[^>]*>\n?/, '')
    .replace(/<link rel="preconnect"[^>]*>\n?/g, '')
    .trim();
  const artifact = `${artifactHead}\n${switchTo(body, 'artifact')}\n<script>\n${js}\n</script>\n`;

  writeFileSync(join(out, page.standalone), standalone);
  writeFileSync(join(out, page.artifact), artifact);
  console.log(`wrote ${join(out, page.standalone)} (${(standalone.length / 1024).toFixed(1)} KB)`);
  console.log(`wrote ${join(out, page.artifact)} (${(artifact.length / 1024).toFixed(1)} KB)`);
}

mkdirSync(out, { recursive: true });
PAGES.forEach(build);
