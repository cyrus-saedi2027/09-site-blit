#!/usr/bin/env node
/* Builds single-file copies of the Widget Lab (no dependencies):
     node tools/bundle.mjs [outDir]          (default: dist/)
   → widget-lab.html  standalone page: open or send it anywhere
   → artifact.html    the same content without <html>/<head>/<body>, for a claude.ai Artifact
   index.html marks what to inline with <!-- bundle:css|js|body --> blocks. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(process.argv[2] || join(root, 'dist'));
const html = readFileSync(join(root, 'index.html'), 'utf8');

const block = name => {
  const m = html.match(new RegExp(`<!-- bundle:${name} -->([\\s\\S]*?)<!-- /bundle:${name} -->`));
  if (!m) throw new Error(`index.html has no bundle:${name} block`);
  return m;
};
const files = (name, attr) => [...block(name)[1].matchAll(new RegExp(`${attr}="([^"]+)"`, 'g'))].map(m => m[1]);
const read = f => `/* ── ${f} ── */\n` + readFileSync(join(root, f), 'utf8').trim();
// keep "</script>" or "</style>" inside sources from closing the inline tag
const safe = (s, tag) => s.replace(new RegExp(`</${tag}`, 'gi'), `<\\/${tag}`);

const css = safe(files('css', 'href').map(read).join('\n\n'), 'style');
const js = safe(files('js', 'src').map(read).join('\n\n'), 'script');
const body = block('body')[1].trim();

let head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'));
head = head
  .replace(block('css')[0], `<style>\n${css}\n</style>`)
  .replace(block('js')[0], '')
  .replace(/<script defer src="(https:\/\/cdnjs[^"]+)"><\/script>/, '<script src="$1"></script>')
  .replace(/\n{2,}/g, '\n')
  .trim();

const standalone = `<!doctype html>\n<html lang="fa" dir="rtl">\n<head>\n${head}\n</head>\n<body>\n${body}\n<script>\n${js}\n</script>\n</body>\n</html>\n`;

// the Artifact host writes its own skeleton (charset, viewport): keep title, the sides meta, fonts, styles, GSAP
const artifactHead = head
  .replace(/<meta charset[^>]*>\n?/, '')
  .replace(/<meta name="viewport"[^>]*>\n?/, '')
  .replace(/<meta name="description"[^>]*>\n?/, '')
  .replace(/<link rel="preconnect"[^>]*>\n?/g, '')
  .trim();
const artifact = `${artifactHead}\n${body}\n<script>\n${js}\n</script>\n`;

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'widget-lab.html'), standalone);
writeFileSync(join(out, 'artifact.html'), artifact);
console.log(`wrote ${join(out, 'widget-lab.html')} (${(standalone.length / 1024).toFixed(1)} KB)`);
console.log(`wrote ${join(out, 'artifact.html')} (${(artifact.length / 1024).toFixed(1)} KB)`);
