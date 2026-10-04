#!/usr/bin/env node
// Regenerate bilingual social cards from the current homepage copy and styling.
import { writeFile, readFile, mkdtemp, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { content } from '../src/content.mjs';
import { esc, dish } from '../src/components.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const css = pathToFileURL(join(root, 'site/assets/css/site.css')).href;
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const page = t => `<!doctype html><html lang="${t.lang}" dir="${t.dir}" data-theme="matcha"><head><meta charset="utf-8"><meta name="color-scheme" content="light"><link rel="stylesheet" href="${css}"><style>
html,body { width:1200px; height:630px; overflow:hidden; color-scheme:light; }
.og { display:grid; grid-template-columns:1.7fr 1fr; align-items:center; gap:40px; height:100%; padding:70px; }
.og .brand__word { font-size:42px; }.og h1 { font-size:72px; margin-top:32px; }.og p { margin-top:28px; color:var(--ink-2); font-size:22px; }
.og-art { display:grid; grid-template-columns:1fr 1fr; gap:18px; transform:rotate(-6deg); }.og-art .dish { width:145px; height:145px; border-radius:30px; }.og-art .dish__food { font-size:66px; }
:lang(ar) .og h1 { font-size:80px; }:lang(ar) .og-art { transform:rotate(6deg); }
</style></head><body><div class="og"><div><span class="brand__word">${esc(t.brand)}</span><h1>${t.hero.title}</h1><p>${esc(t.hero.eyebrow)} · ${esc(t.hero.note)}</p></div><div class="og-art">${['kabsa','karak','banana','toast'].map(key=>dish(key)).join('')}</div></div></body></html>`;
const dir = await mkdtemp(join(tmpdir(), 'leen-og-'));
try {
  for (const lang of ['en', 'ar']) {
    const html = join(dir,`${lang}.html`);
    await writeFile(html,page(content[lang]));
    const target=join(root,'static','og-'+lang+'.png');
    await rm(target,{force:true});
    const child=spawn(chrome,['--headless=new','--disable-gpu','--hide-scrollbars','--force-device-scale-factor=1',
      `--user-data-dir=${join(dir, 'profile-'+lang)}`,'--window-size=1200,630','--virtual-time-budget=3000',
      '--blink-settings=preferredColorScheme=1',`--screenshot=${target}`,pathToFileURL(html).href],{stdio:'ignore'});
    let launchError;
    child.on('error',error=>{launchError=error;});
    let complete=false;
    try {
      for(let i=0;i<150;i++) {
        if(launchError)throw launchError;
        const png=await readFile(target).catch(()=>null);
        if(png&&png.length>24&&png.subarray(1,4).toString()==='PNG'
          &&png.readUInt32BE(16)===1200&&png.readUInt32BE(20)===630
          &&png.subarray(-8,-4).toString()==='IEND') {complete=true;break;}
        await new Promise(resolve=>setTimeout(resolve,100));
      }
      if(!complete)throw new Error('Chrome did not produce a complete social image: '+lang);
    } finally {
      // Some Chrome versions stay alive after --screenshot. Stop our own process.
      if(child.exitCode===null&&child.signalCode===null) {
        child.kill('SIGTERM');
        await Promise.race([new Promise(resolve=>child.once('exit',resolve)),new Promise(resolve=>setTimeout(resolve,1000))]);
        if(child.exitCode===null&&child.signalCode===null)child.kill('SIGKILL');
      }
    }
    console.log(`Updated static/og-${lang}.png`);
  }
} finally { await rm(dir,{recursive:true,force:true}); }
