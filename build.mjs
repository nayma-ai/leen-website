#!/usr/bin/env node
// Zero-dependency static build: src/ + static/ → site/
//   node build.mjs          build once
//   node build.mjs --watch  rebuild on change (for local preview)
import { readFile, writeFile, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { watch } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'site');

async function write(rel, data) {
  const file = join(out, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, data);
}

const hash = async (rel) =>
  createHash('sha256').update(await readFile(join(root, 'static', rel))).digest('hex').slice(0, 10);

async function build() {
  // Fresh module instances so --watch picks up template/content edits.
  const v = `?t=${Date.now()}`;
  const { content, site } = await import(pathToFileURL(join(root, 'src/content.mjs')).href + v);
  const { homePage, legalPage, notFoundPage } = await import(pathToFileURL(join(root, 'src/pages.mjs')).href + v);
  const { legal } = await import(pathToFileURL(join(root, 'src/legal.mjs')).href + v);

  await rm(out, { recursive: true, force: true });
  await cp(join(root, 'static'), out, { recursive: true });

  const assets = { css: await hash('assets/css/site.css'), js: await hash('assets/js/site.js') };
  const { en, ar } = content;

  await write('index.html', homePage(en, assets));
  await write('ar/index.html', homePage(ar, assets));
  for (const doc of ['privacy', 'terms']) {
    await write(`${doc}/index.html`, legalPage(en, legal.en[doc], { pagePath: `/${doc}/`, altPath: `/ar/${doc}/`, assets }));
    await write(`ar/${doc}/index.html`, legalPage(ar, legal.ar[doc], { pagePath: `/ar/${doc}/`, altPath: `/${doc}/`, assets }));
  }
  await write('404.html', notFoundPage(en, ar, assets));

  const host = new URL(site.origin).host;
  await write('CNAME', `${host}\n`);
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
  const pages = [['/', '/ar/'], ['/privacy/', '/ar/privacy/'], ['/terms/', '/ar/terms/']];
  const urls = pages.flatMap(([e, a]) => [e, a].map((loc) => `  <url>
    <loc>${site.origin}${loc}</loc>
    <lastmod>${site.updated}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${site.origin}${e}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${site.origin}${a}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.origin}${e}"/>
  </url>`));
  await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);
  // GitHub Pages: serve files as-is (no Jekyll processing).
  await write('.nojekyll', '');

  const files = await readdir(out, { recursive: true });
  console.log(`built ${files.filter((f) => f.endsWith('.html')).length} pages → site/`);
}

await build();

if (process.argv.includes('--watch')) {
  let timer;
  for (const dir of ['src', 'static']) {
    watch(join(root, dir), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => build().catch((e) => console.error(e)), 120);
    });
  }
  console.log('watching src/ and static/ …');
}
