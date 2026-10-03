// Page templates. Every page is rendered once per language from content.mjs,
// so English and Arabic can never drift apart structurally.
import { site, foods } from './content.mjs';
import { esc, num, dish, icon, mealRow, mealCard, phone, foodName, foodAlt } from './components.mjs';

const THEMES = ['matcha', 'lilac', 'peach', 'ocean'];

// ---------------------------------------------------------------- layout

const storeCta = (t, { size = '', id = '' } = {}) => {
  const idAttr = id ? ` id="${id}"` : '';
  if (site.appStoreUrl) {
    return `<a class="btn btn--primary ${size}"${idAttr} href="${esc(site.appStoreUrl)}" rel="noopener">${icon('phone')}<span>${esc(t.cta.download)}</span></a>`;
  }
  if (site.testflightUrl) {
    return `<a class="btn btn--primary ${size}"${idAttr} href="${esc(site.testflightUrl)}" rel="noopener">${icon('phone')}<span>${esc(t.cta.beta)}</span></a>`;
  }
  return `<span class="btn btn--primary btn--static ${size}"${idAttr}>${icon('phone')}<span>${esc(t.cta.soonLong)}</span></span>`;
};

const header = (t, { home, altHref }) => {
  const h = home ? '' : t.path;
  const links = [['how', t.nav.how], ['ledger', t.nav.ledger], ['privacy', t.nav.privacy], ['faq', t.nav.faq]]
    .map(([id, label]) => `<a href="${h}#${id}">${esc(label)}</a>`).join('');
  return `<header class="nav" data-nav>
  <div class="wrap nav__inner">
    <a class="brand" href="${t.path}" aria-label="${esc(t.nav.home)}">
      <img class="brand__icon" src="/assets/img/icon-matcha.jpg" data-theme-icon alt="" width="30" height="30">
      <span class="brand__word">${esc(t.brand)}</span>
    </a>
    <nav class="nav__links" aria-label="${esc(t.nav.primary)}">${links}</nav>
    <div class="nav__end">
      <a class="nav__lang" href="${altHref}" hreflang="${t.other.lang}" lang="${t.other.lang}">${icon('globe')}<span>${esc(t.other.label)}</span></a>
      <a class="btn btn--small" href="${h}#get">${esc(site.appStoreUrl ? t.cta.download.split(' ')[0] : t.cta.soon)}</a>
      <button class="nav__menu" type="button" aria-expanded="false" aria-controls="mnav" aria-label="${esc(t.nav.menu)}" data-menu-toggle><span></span><span></span></button>
    </div>
  </div>
  <div class="mnav" id="mnav" hidden data-menu>
    <nav class="wrap mnav__inner" aria-label="${esc(t.nav.menu)}">
      ${links}
      ${storeCta(t, { size: 'btn--lg' })}
    </nav>
  </div>
</header>`;
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
<script>document.documentElement.classList.add('js');try{var s=localStorage.getItem('leen-theme');if(s&&/^(matcha|lilac|peach|ocean)$/.test(s))document.documentElement.dataset.theme=s}catch(e){}</script>
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

// ---------------------------------------------------------------- home

const sectionHead = (s, extra = '') => `<header class="section__head ${extra}">
  ${s.kicker ? `<p class="kicker reveal">${esc(s.kicker)}</p>` : ''}
  <h2 class="h2 reveal">${s.title}</h2>
  ${s.lede ? `<p class="lede reveal">${esc(s.lede)}</p>` : ''}
</header>`;

function hero(t) {
  const lang = t.lang;
  const goal = t.app.goal;
  const first = t.app.scenes[0];
  const total = first.items.reduce((sum, it) => sum + foods[it.key].kcal * it.servings, 0);
  const left = `<span data-left>${num(goal - total, lang)}</span>`;
  const app = `<div class="app">
      <div class="app__bar"><span class="app__circle">${icon('grid')}</span><span class="app__circle">${icon('more')}</span></div>
      <div class="app__head">
        <div class="app__today">${esc(t.app.today)}</div>
        <div class="app__day" data-weekday>${lang === 'ar' ? 'السبت' : 'Saturday'}</div>
      </div>
      <div class="kpill">
        <svg class="ring" viewBox="0 0 36 36" aria-hidden="true"><circle class="ring__track" cx="18" cy="18" r="14.5"/><circle class="ring__fill" data-ring cx="18" cy="18" r="14.5" pathLength="100" style="stroke-dashoffset:${(100 - (total / goal) * 100).toFixed(1)}"/></svg>
        <span class="kpill__val"><b data-total>${num(total, lang)}</b> ${esc(t.app.of)} ${num(goal, lang)} ${esc(t.app.kcal)}</span>
        <span class="kpill__left">${lang === 'ar' ? `${esc(t.app.left)} ${left}` : `${left} ${esc(t.app.left)}`} ${icon('chevDown')}</span>
      </div>
      <div class="thread" data-thread>
        <p class="msg msg--agent msg--greeting">${esc(t.app.greeting)}</p>
        <div class="msg msg--user"><span>${esc(first.text)}</span></div>
        <p class="msg msg--agent">${esc(first.reply)}</p>
        ${mealCard(t, first.items)}
      </div>
      <div class="composer">
        <div class="composer__field"><span class="composer__text" data-typed></span><span class="composer__caret" aria-hidden="true"></span><span class="composer__ph" data-ph>${esc(t.app.placeholder)}</span></div>
        <div class="composer__row">
          <span class="cbtn">${icon('camera')} ${esc(t.app.photo)}</span>
          <span class="cbtn cbtn--speak">${icon('wave')} ${esc(t.app.speak)}</span>
        </div>
      </div>
    </div>`;

  // Everything the demo loop needs, pre-formatted so the script stays tiny.
  let running = 0;
  const demo = {
    goal,
    goalText: num(goal, lang),
    greeting: t.app.greeting,
    scenes: t.app.scenes.map((s) => {
      const sceneTotal = s.items.reduce((sum, it) => sum + foods[it.key].kcal * it.servings, 0);
      running += sceneTotal;
      return {
        text: s.text,
        reply: s.reply,
        total: running,
        card: mealCard(t, s.items),
      };
    }),
  };

  return `<section class="hero">
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <p class="eyebrow reveal">${esc(t.hero.eyebrow)}</p>
      <h1 class="display reveal">${t.hero.title}</h1>
      <p class="lede lede--hero reveal">${esc(t.hero.lede)}</p>
      <div class="hero__ctas reveal">
        ${storeCta(t)}
        <a class="btn btn--ghost" href="#how">${esc(t.hero.secondary)} ${icon('arrowDown')}</a>
      </div>
      <ul class="hero__notes reveal">${t.hero.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    </div>
    <div class="hero__visual reveal reveal--late">
      <div class="float float--a" data-parallax="-0.06">${dish('karak')}</div>
      <div class="float float--b" data-parallax="0.05">${dish('kabsa')}</div>
      <div class="float float--c" data-parallax="-0.03">${dish('dates')}</div>
      ${phone(app, { cls: 'phone--hero', attrs: `data-demo role="img" aria-label="${esc(t.hero.demoLabel)}"` })}
    </div>
  </div>
  <script type="application/json" id="demo-data">${JSON.stringify(demo).replace(/</g, '\\u003c')}</script>
</section>`;
}

function ways(t) {
  const w = t.ways;
  return `<section class="section ways" id="how">
  <div class="wrap">
    ${sectionHead(w, 'section__head--center')}
    <div class="ways__grid">
      <article class="way reveal">
        <div class="way__stage way__stage--type" aria-hidden="true">
          <div class="mini-composer"><span class="mini-composer__text">${esc(w.type.demo)}</span><span class="composer__caret"></span><span class="mini-send">${icon('arrowUp')}</span></div>
          <div class="mini-result">
            <span class="mini-chip">${dish('kabsa')}<span>${esc(foodName('kabsa', t.lang))}</span><b>${num(650, t.lang)}</b></span>
            <span class="mini-chip">${dish('milkTea')}<span>${esc(foodName('milkTea', t.lang))}</span><b>${num(70, t.lang)}</b></span>
          </div>
        </div>
        <h3 class="way__title"><span class="way__icon">${icon('chat')}</span>${esc(w.type.title)}</h3>
        <p class="way__body">${esc(w.type.body)}</p>
      </article>
      <article class="way reveal">
        <div class="way__stage way__stage--say" aria-hidden="true">
          <div class="voice">
            <span class="voice__mic">${icon('mic')}</span>
            <span class="voice__bars">${Array.from({ length: 21 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</span>
          </div>
          <p class="voice__words">${w.say.demo.map((word, i) => `<span style="--w:${i}">${esc(word)}</span>`).join(' ')}</p>
          <p class="voice__state">${esc(w.say.listening)}</p>
        </div>
        <h3 class="way__title"><span class="way__icon">${icon('mic')}</span>${esc(w.say.title)}</h3>
        <p class="way__body">${esc(w.say.body)}</p>
      </article>
      <article class="way reveal">
        <div class="way__stage way__stage--snap" aria-hidden="true">
          <div class="viewfinder">
            ${dish('biryani', 'dish--photo')}
            <span class="viewfinder__corners"></span>
            <span class="viewfinder__scan"></span>
          </div>
          <span class="snap__pill">${icon('sparkle')} ${esc(w.snap.reading)}</span>
        </div>
        <h3 class="way__title"><span class="way__icon">${icon('camera')}</span>${esc(w.snap.title)}</h3>
        <p class="way__body">${esc(w.snap.body)}</p>
        <p class="way__fine">${esc(w.snap.fine)}</p>
      </article>
    </div>
  </div>
</section>`;
}

function food(t) {
  const f = t.food;
  const chip = (key) => `<span class="fchip">${dish(key)}<span class="fchip__text"><span class="fchip__name">${esc(foodName(key, t.lang))}</span><span class="fchip__alt" lang="${t.other.lang}">${esc(foodAlt(key, t.lang))}</span></span><span class="fchip__kcal">${num(foods[key].kcal, t.lang)} <small>${esc(t.app.kcal)}</small></span></span>`;
  const row = (keys, rev) => `<div class="marquee ${rev ? 'marquee--rev' : ''}" aria-hidden="true"><div class="marquee__track">${keys.map(chip).join('')}${keys.map(chip).join('')}</div></div>`;
  const all = [...f.marqueeA, ...f.marqueeB].map((k) => foodName(k, t.lang)).join(t.lang === 'ar' ? '، ' : ', ');
  return `<section class="section food" id="food">
  <div class="wrap food__grid">
    ${sectionHead(f)}
    <div class="food__demo reveal">
      <div class="msg msg--user msg--float"><span>${esc(f.mixed.text)}</span></div>
      ${mealCard(t, f.mixed.items.map((key) => ({ key, servings: 1 })), 'mcard--float')}
      <p class="food__caption">${icon('globe')} ${esc(f.mixed.caption)}</p>
    </div>
  </div>
  <div class="food__marquees">
    ${row(f.marqueeA, false)}
    ${row(f.marqueeB, true)}
    <p class="visually-hidden">${esc(all)}</p>
  </div>
</section>`;
}

function correct(t) {
  const c = t.correct;
  return `<section class="section correct" id="correct">
  <div class="wrap split">
    <div class="split__copy">
      ${sectionHead(c)}
      <div class="honest reveal">
        <h3 class="honest__title">${esc(c.honestTitle)}</h3>
        <p>${esc(c.honestBody)}</p>
      </div>
    </div>
    <div class="split__stage reveal">
      <div class="convo" data-correct aria-hidden="true">
        <div class="mcard mcard--float">
          <div class="mcard__head"><span class="mcard__saved">${icon('check')} ${esc(t.app.saved)}</span><span class="mcard__undo">${icon('undo', 'flip-rtl')} ${esc(t.app.undo)}</span></div>
          ${mealRow(t, 'eggs', 2)}
          <div class="mcard__rule"></div>
          ${mealRow(t, 'toast', 1)}
        </div>
        <div class="msg msg--user msg--float" data-fix><span>${esc(c.fix)}</span></div>
        <p class="msg msg--agent msg--float" data-fix-reply>${esc(c.reply)}</p>
        <div class="mcard mcard--float mcard--estimate">
          ${mealRow(t, 'kabsa', 1, { estimate: true })}
          <p class="estimate-hint">${icon('sparkle')} ${esc(c.estimate)}</p>
        </div>
      </div>
      <script type="application/json" id="correct-data">${JSON.stringify({
        before: { serv: t.app.servings(1), kcal: foods.toast.kcal },
        after: { serv: t.app.servings(2), kcal: foods.toast.kcal * 2 },
      }).replace(/</g, '\\u003c')}</script>
    </div>
  </div>
</section>`;
}

function ledger(t) {
  const l = t.ledger;
  const m = l.mock;
  const lang = t.lang;
  const plate = (p) => `<div class="lplate">${dish(p.key, 'dish--square')}<div class="lplate__body"><div class="lplate__name">${esc(foodName(p.key, lang))}</div><div class="lplate__meta"><span class="lplate__meal">${esc(p.meal)}</span><span class="lplate__kcal">${num(foods[p.key].kcal, lang)} ${esc(t.app.kcal)}</span></div></div></div>`;
  // Seven days ending today-ish; the last day is "today" (ringed).
  const dates = [27, 28, 29, 30, 1, 2, 3];
  const logged = [true, true, false, true, false, true, true];
  const inner = `<div class="ledger-screen"><div class="ledger" data-ledger>
    <div class="ledger__top"><span class="ledger__done">${lang === 'ar' ? 'تم' : 'Done'}</span></div>
    <div class="ledger__title">${esc(m.title)}</div>
    <div class="ledger__search">${icon('search')} ${esc(m.search)}</div>
    <p class="ledger__stats">${esc(m.stats)}</p>
    <div class="wcard">
      <div class="wcard__head"><span class="wcard__title">${esc(m.week)}</span></div>
      <div class="wcard__days">${m.days.map((d, i) => `<span class="wday ${logged[i] ? 'is-logged' : ''} ${i === 6 ? 'is-today' : ''}"><small>${esc(d)}</small><b>${num(dates[i], lang)}</b></span>`).join('')}</div>
      <p class="wcard__sum">${esc(m.summary)}</p>
      <div class="wcard__top">${m.top.map((x) => `<div class="wtop">${dish(x.key)}<b>${esc(foodName(x.key, lang))}</b><small>${esc(x.times)}</small></div>`).join('')}</div>
    </div>
    <div class="lday"><span class="lday__title">${esc(m.today)}</span><span class="lday__kcal">${esc(m.todayKcal)} ${icon('chev', 'flip-rtl')}</span></div>
    <div class="lgrid">${m.plates.map(plate).join('')}</div>
    <div class="lday"><span class="lday__title">${esc(m.yesterday)}</span><span class="lday__kcal">${esc(m.yesterdayKcal)} ${icon('chev', 'flip-rtl')}</span></div>
    <div class="lgrid">${m.plates2.map(plate).join('')}</div>
  </div></div>`;
  return `<section class="section ledger-section" id="ledger">
  <div class="wrap split split--rev">
    <div class="split__copy">
      ${sectionHead(l)}
      <ul class="checks reveal">${l.points.map((p) => `<li>${icon('check')}<span>${esc(p)}</span></li>`).join('')}</ul>
    </div>
    <div class="split__stage ledger__stage reveal">
      <div class="float float--d" data-parallax="0.07">${dish('mandi')}</div>
      <div class="float float--e" data-parallax="-0.05">${dish('spanish')}</div>
      ${phone(inner, { cls: 'phone--ledger', attrs: 'aria-hidden="true"' })}
    </div>
  </div>
</section>`;
}

function gentle(t) {
  const g = t.gentle;
  const lang = t.lang;
  return `<section class="section gentle" id="gentle" data-gentle>
  <div class="wrap split">
    <div class="split__copy">
      ${sectionHead(g)}
      <div class="gentle__controls reveal">
        <button class="say-chip" type="button" role="switch" aria-checked="false" data-gentle-toggle data-on="${esc(g.show)}" data-off="${esc(g.hide)}">
          <span class="say-chip__q">“</span><span data-gentle-label>${esc(g.hide)}</span><span class="say-chip__q">”</span>
        </button>
        <p class="gentle__hint">${esc(g.try)}</p>
        <p class="gentle__promise">${esc(g.promise)}</p>
      </div>
    </div>
    <div class="split__stage reveal">
      <div class="gcard">
        <div class="gcard__head">
          <span class="gcard__day">${esc(g.day)}</span>
          <span class="gcard__total"><span class="g-num">${esc(g.totalKcal)}</span><span class="g-soft">${esc(g.totalGentle)}</span></span>
        </div>
        ${g.rows.map((r) => `<div class="grow">${dish(r.key)}<div class="grow__main"><div class="grow__name">${esc(foodName(r.key, lang))}</div><div class="grow__meal">${esc(r.meal)}</div></div><div class="grow__end"><span class="g-num">${num(foods[r.key].kcal, lang)} ${esc(t.app.kcal)}</span><span class="g-soft">${esc(r.protein)}</span></div></div>`).join('')}
        <div class="gcard__bar" aria-hidden="true"><span style="--w:.39"></span></div>
      </div>
    </div>
  </div>
</section>`;
}

function smart(t) {
  const s = t.smart;
  const lang = t.lang;
  const [ask, beyond, usual, week, health, widget] = s.items;
  const card = (it, visual, cls = '') => `<article class="bento__card ${cls} reveal">
    <div class="bento__visual" aria-hidden="true">${visual}</div>
    <h3 class="bento__title"><span class="bento__icon">${icon(it.icon)}</span>${esc(it.title)}</h3>
    <p class="bento__body">${esc(it.body)}</p>
  </article>`;
  const askVisual = `<div class="ask">
    <div class="msg msg--user msg--sm"><span>${esc(ask.q)}</span></div>
    <p class="msg msg--agent msg--sm">${esc(ask.a)}</p>
    <div class="ask__receipts">${['karak', 'spanish', 'gahwa'].map((k) => `<span class="mini-chip">${dish(k)}<span>${esc(foodName(k, lang))}</span></span>`).join('')}</div>
  </div>`;
  const bars = [
    { k: 'protein', v: lang === 'ar' ? '٨٢ غ' : '82 g', w: 0.68, label: lang === 'ar' ? 'بروتين' : 'Protein' },
    { k: 'carbs', v: lang === 'ar' ? '١٩٠ غ' : '190 g', w: 0.74, label: lang === 'ar' ? 'كارب' : 'Carbs' },
    { k: 'fat', v: lang === 'ar' ? '٦١ غ' : '61 g', w: 0.58, label: lang === 'ar' ? 'دهون' : 'Fat' },
    { k: 'caffeine', v: lang === 'ar' ? '٢٤٠ ملغ' : '240 mg', w: 0.6, label: lang === 'ar' ? 'كافيين' : 'Caffeine' },
  ];
  const beyondVisual = `<div class="macros">${bars.map((b) => `<div class="macro macro--${b.k}"><span class="macro__label">${esc(b.label)}</span><span class="macro__track"><i style="--w:${b.w}"></i></span><span class="macro__val">${esc(b.v)}</span></div>`).join('')}</div>`;
  const usualVisual = `<div class="usual">
    <span class="usual__pill">${icon('repeat')} ${lang === 'ar' ? 'فطوري المعتاد' : 'My usual breakfast'}</span>
    <span class="usual__stack">${dish('eggs')}${dish('toast')}${dish('karak')}</span>
  </div>`;
  const weekVisual = `<div class="weekplates">${['eggs', 'kabsa', 'karak', 'shawarma', 'dates', 'mandi', 'spanish'].map((k, i) => `<span style="--i:${i}">${dish(k)}</span>`).join('')}</div>`;
  const healthVisual = `<div class="health"><span class="health__app">${dish('toast')}</span><span class="health__flow"><i></i><i></i><i></i></span><span class="health__heart">${icon('heart')}</span></div>`;
  const widgetVisual = `<div class="widget-mock">
    <svg class="ring ring--lg" viewBox="0 0 36 36"><circle class="ring__track" cx="18" cy="18" r="14.5"/><circle class="ring__fill" cx="18" cy="18" r="14.5" pathLength="100" style="stroke-dashoffset:53"/></svg>
    <div><b>${num(1035, lang)}</b><small>${esc(t.app.of)} ${num(2200, lang)} ${esc(t.app.kcal)}</small></div>
  </div>`;
  const themes = `<article class="bento__card bento__card--themes reveal">
    <div class="themes" role="radiogroup" aria-label="${esc(t.themes.label)}">
      ${THEMES.map((th) => `<button class="theme-opt" type="button" role="radio" aria-checked="${th === 'matcha'}" data-set-theme="${th}"><img src="/assets/img/icon-${th}.jpg" alt="" width="72" height="72" loading="lazy"><span>${esc(t.themes.names[th])}</span></button>`).join('')}
    </div>
    <h3 class="bento__title bento__title--lg">${esc(t.themes.title)}</h3>
    <p class="bento__body">${esc(t.themes.lede)}</p>
  </article>`;
  return `<section class="section smart" id="smart">
  <div class="wrap">
    ${sectionHead(s, 'section__head--center')}
    <div class="bento">
      ${card(ask, askVisual, 'bento__card--wide')}
      ${card(beyond, beyondVisual)}
      ${card(usual, usualVisual)}
      ${card(week, weekVisual)}
      ${card(health, healthVisual)}
      ${card(widget, widgetVisual)}
      ${themes}
    </div>
  </div>
</section>`;
}

function privacy(t) {
  const p = t.privacy;
  const icons = ['user', 'chip', 'offline', 'cloud', 'shield'];
  return `<section class="section privacy" id="privacy">
  <div class="wrap split">
    <div class="split__copy">
      ${sectionHead(p)}
      <a class="text-link reveal" href="${t.lang === 'ar' ? '/ar' : ''}/privacy/">${esc(p.link)} ${icon('chev', 'flip-rtl')}</a>
    </div>
    <ul class="privacy__list">
      ${p.points.map((pt, i) => `<li class="reveal"><span class="privacy__icon">${icon(icons[i])}</span><div><h3>${esc(pt.title)}</h3><p>${esc(pt.body)}</p></div></li>`).join('')}
    </ul>
  </div>
</section>`;
}

function story(t) {
  const s = t.story;
  return `<section class="section story" id="story">
  <div class="wrap story__grid">
    <figure class="story__mark reveal">
      <img src="/assets/img/mark.jpg" alt="${esc(s.alt)}" width="360" height="360" loading="lazy">
    </figure>
    <div class="story__copy">
      <p class="kicker reveal">${esc(s.kicker)}</p>
      <h2 class="h2 reveal">${s.title}</h2>
      <p class="lede reveal">${esc(s.body)}</p>
    </div>
  </div>
</section>`;
}

function faq(t) {
  const f = t.faq;
  return `<section class="section faq" id="faq">
  <div class="wrap split split--top">
    <div class="split__copy">${sectionHead(f)}</div>
    <div class="faq__list">
      ${f.items.map((it) => `<details class="qa reveal"><summary><span>${esc(it.q)}</span><span class="qa__plus" aria-hidden="true"></span></summary><div class="qa__a"><p>${esc(it.a)}</p></div></details>`).join('')}
    </div>
  </div>
</section>`;
}

function finalCta(t) {
  const f = t.final;
  return `<section class="section final" id="get">
  <div class="wrap final__inner">
    <img class="final__icon reveal" src="/assets/img/icon-matcha.jpg" data-theme-icon alt="" width="112" height="112" loading="lazy">
    <h2 class="display display--final reveal">${f.title}</h2>
    <p class="lede reveal">${esc(site.appStoreUrl ? f.ledeLive : f.lede)}</p>
    <div class="final__ctas reveal">${storeCta(t, { size: 'btn--lg' })}</div>
  </div>
</section>`;
}

export function homePage(t, assets) {
  const body = [hero(t), ways(t), food(t), correct(t), ledger(t), gentle(t), smart(t), privacy(t), story(t), faq(t), finalCta(t)].join('\n');
  return layout(t, {
    pagePath: t.path,
    altPath: t.other.path,
    title: t.meta.title,
    description: t.meta.description,
    body,
    assets,
    home: true,
    bodyClass: 'page-home',
  });
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
