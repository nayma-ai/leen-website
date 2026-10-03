#!/usr/bin/env node
// Renders the social preview images (static/og-en.png, static/og-ar.png)
// with headless Chrome, reusing the site's own CSS and components.
//   node build.mjs && node scripts/og.mjs
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { content } from '../src/content.mjs';
import { mealCard, dish, esc } from '../src/components.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const css = pathToFileURL(join(root, 'site/assets/css/site.css')).href;
const icon = pathToFileURL(join(root, 'static/assets/img/icon-matcha.jpg')).href;
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const page = (t) => {
  const scene = t.app.scenes[1];
  const title = t.lang === 'ar' ? 'وجباتك،<br><em>نفهمها بكل عناية.</em>' : 'Your meals,<br><em>beautifully understood.</em>';
  const sub = t.lang === 'ar' ? 'يوميات طعام للآيفون · عربي و English' : 'A food journal for iPhone · English & العربية';
  return `<!doctype html><html lang="${t.lang}" dir="${t.dir}" data-theme="matcha"><head><meta charset="utf-8">
<meta name="color-scheme" content="light">
<link rel="stylesheet" href="${css}">
<style>
  html, body { width: 1200px; height: 630px; overflow: hidden; color-scheme: light; }
  body::after { opacity: .05; filter: none; }
  .og { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; align-items: center; gap: 40px; height: 100%; padding: 0 72px; }
  .og::before { content: ""; position: absolute; inset-inline-end: -120px; top: -160px; width: 760px; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(closest-side, rgba(95,112,82,.2), transparent); }
  .og__brand { display: flex; align-items: center; gap: 14px; color: var(--accent-deep); }
  .og__brand img { width: 56px; height: 56px; border-radius: 22.5%; box-shadow: var(--shadow-1); }
  .og__brand span { font-family: var(--font-display); font-size: 46px; font-weight: 600; letter-spacing: -.03em; }
  :lang(ar) .og__brand span { font-size: 54px; letter-spacing: 0; }
  .og h1 { margin-top: 34px; font-size: 76px; }
  :lang(ar) .og h1 { font-size: 82px; }
  .og p { margin-top: 26px; font-size: 24px; color: var(--ink-2); }
  .og__stage { position: relative; display: grid; gap: 14px; --u: 1.25px; }
  .og__stage .msg--user, .og__stage .mcard { --u: 1.25px; }
  .og__tile { position: absolute; width: 104px; }
  .og__tile .dish { width: 100%; border-radius: 26%; box-shadow: 0 30px 50px -22px rgba(42,36,30,.45); }
  .og__tile--a { top: -96px; inset-inline-start: -40px; rotate: -8deg; }
  .og__tile--b { bottom: -90px; inset-inline-end: -30px; rotate: 7deg; width: 120px; }
</style></head><body>
<div class="og">
  <div>
    <div class="og__brand"><img src="${icon}" alt=""><span>${esc(t.brand)}</span></div>
    <h1 class="display">${title}</h1>
    <p>${esc(sub)}</p>
  </div>
  <div class="og__stage">
    <div class="og__tile og__tile--a">${dish('karak')}</div>
    <div class="og__tile og__tile--b">${dish('dates')}</div>
    <div class="msg msg--user"><span>${esc(scene.text)}</span></div>
    ${mealCard(t, scene.items)}
  </div>
</div></body></html>`;
};

const dir = await mkdtemp(join(tmpdir(), 'leen-og-'));
try {
  for (const lang of ['en', 'ar']) {
    const html = join(dir, `${lang}.html`);
    await writeFile(html, page(content[lang]));
    execFileSync(chrome, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
      '--window-size=1200,630', '--virtual-time-budget=3000', '--blink-settings=preferredColorScheme=1',
      `--screenshot=${join(root, 'static', `og-${lang}.png`)}`, pathToFileURL(html).href,
    ], { stdio: 'ignore' });
    console.log(`static/og-${lang}.png`);
  }
} finally {
  await rm(dir, { recursive: true, force: true });
}
