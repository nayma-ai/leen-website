// Optional preview control; the page and all content work without JavaScript.
const toggle = document.querySelector('[data-preview-toggle]');
const preview = document.querySelector('[data-preview]');
if (toggle && preview) {
  toggle.addEventListener('click', () => {
    const hide = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', String(hide));
    toggle.textContent = hide ? toggle.dataset.show : toggle.dataset.hide;
    preview.classList.toggle('is-gentle', hide);
  });
}

// Local illustrative demos: no microphone, camera, upload or service calls.
const demoButtons = [...document.querySelectorAll('[data-demos-toggle]')];
const demoButton = demoButtons[0];
const demoCards = [...document.querySelectorAll('[data-way-demo]')].map(el => ({
  el, text: el.querySelector('[data-demo-text]'), state: el.querySelector('[data-demo-state]'),
  visible: false, elapsed: 0,
}));
if (demoButton && demoCards.length) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !motion.matches;
  let frame = null;
  let previous = 0;
  const write = (el, value) => { if (el && el.textContent !== value) el.textContent = value; };
  const render = (card, complete = false) => {
    const time = complete ? 4000 : card.elapsed % 9000;
    const working = time < 3200;
    card.el.classList.toggle('is-demo-working', working);
    if (card.text) {
      const full = card.text.dataset.text;
      if (['type','hero'].includes(card.el.dataset.wayDemo)) {
        const chars = Array.from(full);
        write(card.text, card.text.dataset.placeholder && !working ? card.text.dataset.placeholder : chars.slice(0, Math.floor(chars.length * Math.max(0, Math.min(1, (time - 400) / 2300)))).join(''));
      } else {
        const words = full.split(' ');
        write(card.text, words.slice(0, Math.ceil(words.length * Math.max(0, Math.min(1, (time - 700) / 2100)))).join(' '));
      }
    }
    if (card.state) write(card.state, working ? card.state.dataset.working : card.state.dataset.ready);
  };
  const tick = now => {
    frame = null;
    const delta = previous ? now - previous : 0;
    previous = now;
    for (const card of demoCards) {
      if (playing && card.visible && !document.hidden) { card.elapsed += delta; render(card); }
    }
    update();
  };
  const update = () => {
    let active = false;
    for (const card of demoCards) {
      const running = playing && card.visible && !document.hidden;
      card.el.classList.toggle('is-demo-playing', running);
      active ||= running;
    }
    demoButtons.forEach(button => write(button, playing ? button.dataset.pause : button.dataset.play));
    if (active && frame === null) frame = requestAnimationFrame(tick);
    if (!active) {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null; previous = 0;
    }
  };
  demoCards.forEach(card => render(card, !playing));
  demoButtons.forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => {
    playing = !playing;
    if (playing) demoCards.forEach(card => { card.elapsed = 0; render(card); });
    update();
  });
  });
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) demoCards.find(card => card.el === entry.target).visible = entry.isIntersecting;
    update();
  }, { threshold: .2 });
  demoCards.forEach(card => observer.observe(card.el));
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', () => {
    if (motion.matches) {
      playing = false;
      demoCards.forEach(card => { card.elapsed = 4000; render(card, true); });
    }
    update();
  });
}
