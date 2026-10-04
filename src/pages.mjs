// Page templates. Every page is rendered once per language from content.mjs,
// so English and Arabic can never drift apart structurally.
import { site } from './content.mjs';
import { esc, num, dish, icon, foodName, phoneFrame } from './components.mjs';


// ---------------------------------------------------------------- layout

const storeCta = (t, { size = '', id = '' } = {}) => {
  const idAttr = id ? ` id="${id}"` : '';
  if (site.appStoreUrl) {
    return `<a class="btn btn--primary ${size}"${idAttr} href="${esc(site.appStoreUrl)}" rel="noopener">${icon('phone')}<span>${esc(t.cta.download)}</span></a>`;
  }
  if (site.testflightUrl) {
    return `<a class="btn btn--primary ${size}"${idAttr} href="${esc(site.testflightUrl)}" rel="noopener">${icon('phone')}<span>${esc(t.cta.beta)}</span></a>`;
  }
  return `<span class="btn btn--primary btn--static ${size}"${idAttr}>${icon('phone')}<span>${esc(t.cta.soon)}</span></span>`;
};

const header = (t, { home, altHref }) => {
  const h = home ? '' : t.path;
  return `<header class="nav"><div class="wrap nav__inner">
    <a class="brand" href="${t.path}" aria-label="${esc(t.nav.home)}"><img class="brand__icon" src="/assets/img/icon-matcha.jpg" alt="" width="30" height="30"><span class="brand__word">${esc(t.brand)}</span></a>
    <nav class="nav__links" aria-label="${esc(t.nav.primary)}"><a href="${h}#how">${esc(t.nav.how)}</a><a href="${h}#journal">${esc(t.nav.journal)}</a><a href="${h}#pro">${esc(t.nav.pro)}</a></nav>
    <div class="nav__end"><a class="nav__lang" href="${altHref}" hreflang="${t.other.lang}" lang="${t.other.lang}">${esc(t.other.label)}</a><a class="nav__get" href="${h}#get">${esc(site.appStoreUrl ? t.cta.download : site.testflightUrl ? t.cta.beta : t.cta.soon)}</a></div>
  </div></header>`;
};

const footer = (t, { altHref }) => {
  const p = t.lang === 'ar' ? '/ar' : '';
  return `<footer class="footer">
  <div class="wrap footer__inner">
    <div class="footer__brand">
      <a class="brand brand--lg" href="${t.path}" aria-label="${esc(t.nav.home)}">
        <img class="brand__icon" src="/assets/img/icon-matcha.jpg" data-theme-icon alt="" width="40" height="40">
        <span class="brand__word">${esc(t.brand)}</span>
      </a>
      <p class="footer__tagline">${esc(t.footer.tagline)}</p>
    </div>
    <nav class="footer__links" aria-label="${esc(t.nav.footer)}">
      <a href="${p}/privacy/">${esc(t.footer.privacy)}</a>
      <a href="${p}/terms/">${esc(t.footer.terms)}</a>
      <a href="mailto:${esc(site.contactEmail)}">${esc(t.footer.contact)}</a>
      <a href="${altHref}" hreflang="${t.other.lang}" lang="${t.other.lang}">${esc(t.other.label)}</a>
    </nav>
  </div>
  <div class="wrap footer__legal">
    <p>${esc(t.footer.madeIn)}</p>
    <p>© ${t.lang === 'ar' ? num(site.year, 'ar') : site.year} ${esc(site.company)}. ${esc(t.footer.legal)}</p>
    <p class="footer__tm">${esc(t.footer.trademarks)}</p>
  </div>
</footer>`;
};

export function layout(t, { pagePath, altPath, title, description, body, assets, home = false, bodyClass = '' }) {
  const url = site.origin + pagePath;
  const altUrl = site.origin + altPath;
  const enUrl = t.lang === 'en' ? url : altUrl;
  const arUrl = t.lang === 'ar' ? url : altUrl;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: t.lang === 'ar' ? 'لين' : 'Leen',
    alternateName: t.lang === 'ar' ? 'Leen' : 'لين',
    operatingSystem: 'iOS 18.1+',
    applicationCategory: 'HealthApplication',
    inLanguage: ['en', 'ar'],
    description: t.meta.description,
    url,
    image: site.origin + t.meta.ogImage,
    publisher: { '@type': 'Organization', name: site.company },
  };
  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}" data-theme="matcha">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${enUrl}">
<link rel="alternate" hreflang="ar" href="${arUrl}">
<link rel="alternate" hreflang="x-default" href="${enUrl}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#F7F4EF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#161412" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Leen | لين">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.origin}${t.meta.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${t.meta.ogLocale}">
<meta property="og:locale:alternate" content="${t.lang === 'ar' ? 'en_US' : 'ar_SA'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
${t.lang === 'ar' ? '<link rel="preload" href="/assets/fonts/markazi-arabic.woff2" as="font" type="font/woff2" crossorigin>\n' : ''}<link rel="stylesheet" href="/assets/css/site.css?v=${assets.css}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${esc(t.skip)}</a>
${header(t, { home, altHref: altPath })}
<main id="main">
${body}
</main>
${footer(t, { altHref: altPath })}
<script src="/assets/js/site.js?v=${assets.js}" defer></script>
</body>
</html>
`;
}

// Illustrative journal preview; the entry sequence is enhanced in the browser.
export function journalPreview(t) {
  const p = t.preview;
  const foodCard = (key, value) => `<div class="preview-meal">${dish(key)}<div><h3>${esc(foodName(key, t.lang))}</h3><p>${esc(p.serving)}</p></div><span class="preview-number">${esc(value)}</span>${icon('chev', 'flip-rtl')}</div>`;
  return `<div class="app-preview" data-preview>
    <div class="app-preview__nav"><span>${icon('grid')}</span><b>${esc(p.today)}</b><span>${icon('more')}</span></div>
    <p class="app-preview__date">${esc(p.date)}</p>
    <div class="app-preview__summary">${esc(p.summary)}</div>
    <div class="preview-thread"><p class="preview-message">${esc(p.message)}</p><div class="preview-result"><p class="preview-reply">${esc(p.reply)}</p>
      ${foodCard('kabsa', t.lang === 'ar' ? '~٦٥٠ سعرة' : '~650 kcal')}
      ${foodCard('karak', t.lang === 'ar' ? '~٧٠ سعرة' : '~70 kcal')}</div>
    </div>
    <div class="preview-composer"><span data-demo-text data-text="${esc(p.message)}" data-placeholder="${esc(p.prompt)}">${esc(p.prompt)}</span><span class="way-caret"></span><span class="preview-speak">${icon('wave')} ${esc(p.speak)}</span></div>
    <div class="preview-home" aria-hidden="true"></div>
  </div>`;
}

const sectionHead = (s) => `<header class="section-head"><p class="kicker">${esc(s.kicker)}</p><h2>${s.title}</h2><p class="lede">${esc(s.lede)}</p></header>`;

function hero(t) {
  return `<section class="hero wrap">
    <div class="hero__copy"><p class="kicker">${esc(t.hero.eyebrow)}</p><h1>${t.hero.title}</h1><p class="lede">${esc(t.hero.lede)}</p>
      <div class="hero__actions">${storeCta(t)}<a class="text-link" href="#how">${esc(t.cta.explore)} ${icon('chev', 'flip-rtl')}</a></div>
      <p class="hero__note">${esc(t.hero.note)}</p>
    </div>
    <figure class="hero__preview" data-way-demo="hero"><div role="img" aria-label="${esc(t.hero.demoLabel)}">${phoneFrame(journalPreview(t), 'iphone--hero')}</div>
      <figcaption><span>${esc(t.preview.caption)}</span><button type="button" data-preview-toggle aria-pressed="false" data-hide="${esc(t.preview.hide)}" data-show="${esc(t.preview.show)}">${esc(t.preview.hide)}</button><button type="button" data-demos-toggle data-pause="${esc(t.ways.pause)}" data-play="${esc(t.ways.play)}" aria-controls="how-demos" hidden>${esc(t.ways.pause)}</button></figcaption>
    </figure>
  </section>`;
}

function ways(t) {
  const w = t.ways;
  const visual = item => {
    if (item.kind === 'type') return `<div class="way-input"><span data-demo-text data-text="${esc(item.demo)}">${esc(item.demo)}</span><span class="way-caret"></span>${icon('arrowUp')}</div>
      <div class="way-results" data-demo-result>${['kabsa','karak'].map(key => `<span class="way-chip">${dish(key)}${esc(foodName(key,t.lang))}</span>`).join('')}</div>`;
    if (item.kind === 'say') return `<div class="way-voice"><span class="way-mic">${icon('mic')}</span><span class="way-bars">${Array.from({length:15},(_,i)=>`<i style="--bar:${i}"></i>`).join('')}</span></div>
      <p class="way-transcript" data-demo-text data-text="${esc(item.demo)}">${esc(item.demo)}</p><small class="way-state" data-demo-state data-working="${esc(w.listening)}" data-ready="${esc(w.ready)}">${esc(w.ready)}</small>`;
    return `<div class="way-viewfinder">${dish('kabsa')}<span class="way-scan"></span><span class="way-corners"></span></div>
      <small class="way-state" data-demo-state data-working="${esc(w.reading)}" data-ready="${esc(w.ready)}">${esc(w.ready)}</small>
      <div class="way-results" data-demo-result><span class="way-chip">${icon('check')}${esc(foodName('kabsa',t.lang))}</span></div>`;
  };
  return `<section class="section wrap ways-section" id="how">
    ${sectionHead(w)}
    <div class="ways-grid" id="how-demos">${w.items.map(item => `<article class="way way--${item.kind}" data-way-demo="${item.kind}">
      <div class="way-visual" aria-hidden="true">${visual(item)}</div>
      <h3><span class="way-icon">${icon(item.icon)}</span>${esc(item.title)}</h3>
      <p>${esc(item.body)}</p>
    </article>`).join('')}</div>
    <div class="ways-controls"><span>${esc(w.demoLabel)}</span><button type="button" data-demos-toggle data-pause="${esc(w.pause)}" data-play="${esc(w.play)}" aria-controls="how-demos" hidden>${esc(w.pause)}</button></div>
    <p class="ways-note">${esc(w.photoNote)}</p>
  </section>`;
}

function journal(t) {
  const j = t.journal;
  const plate = (key) => `<div class="gallery-plate">${dish(key)}<h3>${esc(foodName(key, t.lang))}</h3></div>`;
  return `<section class="section wrap journal-section" id="journal">
    <div class="journal-copy">${sectionHead(j)}<div class="journal-points">${j.points.map(p => `<div><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></div>`).join('')}</div></div>
    <figure class="journal-gallery"><div class="journal-gallery__nav"><span>${icon('search')}</span><b>${esc(t.nav.journal)}</b><span>${icon('more')}</span></div>
      <div class="favorite-row"><span>${esc(j.saved)}</span><div>${dish('toast')}<b>${esc(foodName('toast', t.lang))}</b>${icon('chev', 'flip-rtl')}</div></div>
      <div class="week-preview"><div><b>${esc(j.week)}</b><small>${esc(j.range)}</small>${icon('chevDown')}</div><p>${esc(j.summary)}</p>
        <div class="week-dates">${j.dates.map((day,i) => `<span><small>${esc(day)}</small><b class="${[0,3,5].includes(i) ? 'is-logged' : ''} ${i===6 ? 'is-today' : ''}">${num([28,29,30,1,2,3,4][i],t.lang)}</b></span>`).join('')}</div>
      </div>
      <h3 class="gallery-today">${esc(j.today)}</h3><div class="gallery-grid">${plate('banana')}${plate('toast')}</div>
      <figcaption>${esc(j.caption)}</figcaption>
    </figure>
  </section>`;
}

function pro(t) {
  const p = t.pro;
  return `<section class="section pro-section" id="pro"><div class="wrap">
    ${sectionHead(p)}
    <div class="pro-grid"><div class="question-card"><span class="question-icon">${icon('ask')}</span><p class="kicker">${esc(p.questionLabel)}</p><blockquote>“${esc(p.question)}”</blockquote><p>${esc(p.detail)}</p></div>
      <div class="plan-comparison"><div><h3>${esc(p.freeTitle)}</h3><p>${esc(p.freeBody)}</p></div><div><h3>${esc(p.proTitle)}</h3><ul>${p.benefits.map(b => `<li>${icon('check')}<span>${esc(b)}</span></li>`).join('')}</ul></div><p class="plan-fine">${esc(p.fine)}</p></div>
    </div>
  </div></section>`;
}

function privacy(t) {
  return `<aside class="privacy-note wrap" id="privacy"><span class="privacy-note__icon">${icon('shield')}</span><div><h2>${esc(t.privacy.title)}</h2><p>${esc(t.privacy.body)}</p><a class="text-link" href="${t.lang === 'ar' ? '/ar' : ''}/privacy/">${esc(t.privacy.link)} ${icon('chev', 'flip-rtl')}</a></div></aside>`;
}

function faq(t) {
  return `<section class="section wrap faq-section" id="faq"><h2>${esc(t.faq.title)}</h2><div>${t.faq.items.map(item => `<details><summary>${esc(item.q)}<span aria-hidden="true">+</span></summary><p>${esc(item.a)}</p></details>`).join('')}</div></section>`;
}

function finalCta(t) {
  return `<section class="final wrap" id="get"><div><h2>${esc(t.final.title)}</h2><p>${esc(t.final.body)}</p></div>${storeCta(t)}</section>`;
}

export function homePage(t, assets) {
  return layout(t, {pagePath:t.path,altPath:t.other.path,title:t.meta.title,description:t.meta.description,
    body:[hero(t),ways(t),journal(t),pro(t),privacy(t),faq(t),finalCta(t)].join('\n'),assets,home:true,bodyClass:'page-home'});
}

// ---------------------------------------------------------------- legal

export function legalPage(t, doc, { pagePath, altPath, assets }) {
  const updated = new Date(site.updated + 'T12:00:00Z').toLocaleDateString(t.lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-arab' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const body = `<article class="legal wrap">
  <a class="text-link legal__back" href="${t.path}">${icon('chev', 'flip-ltr')} ${esc(t.legalNav.back)}</a>
  <h1 class="display display--legal">${esc(doc.title)}</h1>
  <p class="legal__updated">${esc(t.legalNav.updated)}: ${esc(updated)}</p>
  <div class="prose">${doc.html}</div>
</article>`;
  return layout(t, {
    pagePath,
    altPath,
    title: `${doc.title} — ${t.lang === 'ar' ? 'لين' : 'Leen'}`,
    description: doc.description,
    body,
    assets,
    bodyClass: 'page-legal',
  });
}

export function notFoundPage(t, other, assets) {
  const body = `<section class="notfound wrap">
  <div class="notfound__plate">${dish('toast', 'dish--xl')}</div>
  <h1 class="display display--legal">${esc(t.notFound.title)}</h1>
  <p class="lede">${esc(t.notFound.body)}</p>
  <p class="notfound__links"><a class="btn btn--primary" href="${t.path}">${esc(t.notFound.home)}</a> <a class="btn btn--ghost" href="${other.path}" lang="${other.lang}">${esc(other.notFound.home)}</a></p>
</section>`;
  return layout(t, {
    pagePath: '/404.html',
    altPath: other.path,
    title: `404 — ${t.notFound.title}`,
    description: t.notFound.body,
    body,
    assets,
    bodyClass: 'page-404',
  });
}
