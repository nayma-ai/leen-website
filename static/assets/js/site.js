// leen.fit — small, dependency-free interactions.
(() => {
  const doc = document.documentElement;
  const lang = doc.lang === 'ar' ? 'ar' : 'en';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nf = new Intl.NumberFormat(lang === 'ar' ? 'ar-SA-u-nu-arab' : 'en-US');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  // ------------------------------------------------------------ header
  const nav = $('[data-nav]');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ------------------------------------------------------------ mobile menu
  const menuBtn = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  if (menuBtn && menu) {
    const setMenu = (open) => {
      menuBtn.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-menu-open', open);
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add('is-open'));
      } else {
        menu.classList.remove('is-open');
        menu.hidden = true;
      }
    };
    menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
    });
    matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  // ------------------------------------------------------------ reveal
  const revealIO = new IntersectionObserver((entries) => {
    let i = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.style.setProperty('--d', `${Math.min(i++ * 0.08, 0.4)}s`);
      e.target.classList.add('is-in');
      revealIO.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach((el) => revealIO.observe(el));

  // ------------------------------------------------------------ weekday
  const weekday = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US', { weekday: 'long' }).format(new Date());
  $$('[data-weekday]').forEach((el) => { el.textContent = weekday; });

  // ------------------------------------------------------------ themes
  const icons = $$('[data-theme-icon]');
  const themeButtons = $$('[data-set-theme]');
  const applyTheme = (name) => {
    doc.dataset.theme = name;
    icons.forEach((img) => { img.src = `/assets/img/icon-${name}.jpg`; });
    themeButtons.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.setTheme === name)));
  };
  applyTheme(doc.dataset.theme || 'matcha');
  themeButtons.forEach((b) => b.addEventListener('click', () => {
    applyTheme(b.dataset.setTheme);
    store.set('leen-theme', b.dataset.setTheme);
  }));
  // Arrow keys move through the radio group.
  themeButtons.forEach((b, i) => b.addEventListener('keydown', (e) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const step = doc.dir === 'rtl' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') ? -dir : dir;
    const next = themeButtons[(i + step + themeButtons.length) % themeButtons.length];
    next.focus();
    next.click();
  }));

  // ------------------------------------------------------------ gentle mode
  const gentle = $('[data-gentle]');
  const gentleToggle = $('[data-gentle-toggle]');
  if (gentle && gentleToggle) {
    const label = $('[data-gentle-label]', gentleToggle);
    gentleToggle.addEventListener('click', () => {
      const on = gentleToggle.getAttribute('aria-checked') !== 'true';
      gentleToggle.setAttribute('aria-checked', String(on));
      gentle.classList.toggle('is-gentle', on);
      label.textContent = on ? gentleToggle.dataset.on : gentleToggle.dataset.off;
    });
  }

  // ------------------------------------------------------------ parallax
  const floats = $$('[data-parallax]');
  if (floats.length && !reduceMotion) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = innerHeight;
      for (const el of floats) {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const delta = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        el.style.translate = `0 ${delta.toFixed(1)}px`;
      }
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // A promise that resolves while `el` is on screen and the tab is visible,
  // so the demos never burn cycles in the background.
  const watchVisible = (el) => {
    let visible = false;
    let waiters = [];
    const flush = () => {
      if (visible && !document.hidden) { waiters.forEach((r) => r()); waiters = []; }
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; flush(); }, { threshold: 0.25 }).observe(el);
    document.addEventListener('visibilitychange', flush);
    return () => new Promise((r) => { waiters.push(r); flush(); });
  };

  const countUp = (el, from, to, ms = 900) => {
    if (!el) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = nf.format(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // ------------------------------------------------------------ hero demo
  const demoEl = $('[data-demo]');
  const demoData = $('#demo-data');
  if (demoEl && demoData && !reduceMotion) {
    const data = JSON.parse(demoData.textContent);
    const thread = $('[data-thread]', demoEl);
    const typed = $('[data-typed]', demoEl);
    const composer = $('.composer', demoEl);
    const totalEl = $('[data-total]', demoEl);
    const leftEl = $('[data-left]', demoEl);
    const ring = $('[data-ring]', demoEl);
    const ready = watchVisible(demoEl);
    let total = data.scenes[0].total;

    const el = (html) => {
      const t = document.createElement('template');
      t.innerHTML = html.trim();
      return t.content.firstElementChild;
    };
    const escapeHTML = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    // Older messages glide up as new ones land (FLIP), like the real thread.
    const flip = (mutate) => {
      const kids = [...thread.children];
      const before = kids.map((k) => k.getBoundingClientRect().top);
      mutate();
      kids.forEach((k, i) => {
        const dy = before[i] - k.getBoundingClientRect().top;
        if (Math.abs(dy) > 0.5) k.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      });
      while (thread.children.length > 7) thread.firstElementChild.remove();
    };
    const append = (node, cls = 'is-arriving') => { node.classList.add(cls); flip(() => thread.append(node)); return node; };
    const setTotal = (next) => {
      countUp(totalEl, total, next);
      countUp(leftEl, data.goal - total, data.goal - next);
      ring.style.strokeDashoffset = (100 - Math.min(next / data.goal, 1) * 100).toFixed(1);
      total = next;
    };
    const clearThread = async () => {
      const kids = [...thread.children];
      kids.forEach((k) => { k.classList.remove('is-arriving'); k.classList.add('is-leaving'); });
      await wait(450);
      kids.forEach((k) => k.remove());
    };
    const type = async (text) => {
      composer.classList.add('is-typing');
      typed.textContent = '';
      for (const ch of text) {
        await ready();
        typed.textContent += ch;
        await wait(ch === ' ' ? 70 : 38 + Math.random() * 55);
      }
      await wait(380);
    };

    const play = async () => {
      await wait(2600); // let the first, server-rendered scene breathe
      for (let i = 1; ; i = (i + 1) % data.scenes.length) {
        await ready();
        const scene = data.scenes[i];
        if (i === 0) {
          // A new day: the page starts blank again.
          await clearThread();
          setTotal(0);
          append(el(`<p class="msg msg--agent msg--greeting">${escapeHTML(data.greeting)}</p>`));
          await wait(900);
        }
        await type(scene.text);
        typed.textContent = '';
        composer.classList.remove('is-typing');
        append(el(`<div class="msg msg--user"><span>${escapeHTML(scene.text)}</span></div>`));
        await wait(450);
        const dots = append(el('<p class="msg msg--agent"><span class="typing"><i></i><i></i><i></i></span></p>'));
        await wait(1000);
        flip(() => dots.remove());
        append(el(`<p class="msg msg--agent">${escapeHTML(scene.reply)}</p>`), 'is-settling');
        await wait(420);
        append(el(scene.card));
        await wait(250);
        setTotal(scene.total);
        await wait(4200);
      }
    };
    play();
  }

  // ------------------------------------------------------------ correction demo
  const convo = $('[data-correct]');
  const correctData = $('#correct-data');
  if (convo && correctData) {
    const data = JSON.parse(correctData.textContent);
    const row = $('[data-row="toast"]', convo);
    const serv = $('[data-serv]', row);
    const kcal = $('[data-kcal]', row);
    const set = (state) => { serv.textContent = state.serv; kcal.textContent = nf.format(state.kcal); };
    if (reduceMotion) {
      convo.classList.add('is-fixed', 'is-replied');
      set(data.after);
    } else {
      const ready = watchVisible(convo);
      (async () => {
        for (;;) {
          await ready();
          await wait(900);
          convo.classList.add('is-fixed');
          await wait(900);
          serv.textContent = data.after.serv;
          countUp(kcal, data.before.kcal, data.after.kcal, 700);
          row.classList.remove('is-updated');
          void row.offsetWidth;
          row.classList.add('is-updated');
          await wait(500);
          convo.classList.add('is-replied');
          await wait(4800);
          await ready();
          convo.classList.remove('is-fixed', 'is-replied');
          await wait(600);
          set(data.before);
          await wait(1200);
        }
      })();
    }
  }
})();
