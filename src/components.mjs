// Small HTML building blocks shared by every page.
import { foods } from './content.mjs';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const formatters = {
  en: new Intl.NumberFormat('en-US'),
  ar: new Intl.NumberFormat('ar-SA-u-nu-arab'),
};
export const num = (n, lang) => formatters[lang].format(n);

/** Name of a food in the page language, and in the other one. */
export const foodName = (key, lang) => foods[key][lang];
export const foodAlt = (key, lang) => foods[key][lang === 'ar' ? 'en' : 'ar'];

/** The app's procedural food art: pastel backdrop, ceramic plate, the dish. */
export const dish = (key, extra = '') => {
  const f = foods[key];
  return `<span class="dish dish--${f.pal} ${extra}" aria-hidden="true"><span class="dish__plate"><span class="dish__food">${f.emoji}</span></span></span>`;
};

const paths = {
  check: '<circle cx="12" cy="12" r="10" fill="currentColor" stroke="none"/><path d="m7.5 12.2 3 3 6-6.4" stroke="var(--on-check, #fff)" stroke-width="2"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
  chev: '<path d="m9 6 6 6-6 6"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  camera: '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.6l1.4-2h7l1.4 2h1.6A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.6"/>',
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
  chat: '<path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20l1.1-4.2A7.5 7.5 0 1 1 20 12.5z"/><path d="M8.5 11h7M8.5 14h4.5"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  more: '<circle cx="5.5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="18.5" cy="12" r="1.4" fill="currentColor"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="3"/><path d="M10.5 5.5h3"/>',
  ask: '<path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20l1.1-4.2A7.5 7.5 0 1 1 20 12.5z"/><path d="M10 10a2.2 2.2 0 1 1 3 2c-.6.3-1 .8-1 1.5M12 16.3v.1"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/><path d="M9.2 14.5a2.8 2.8 0 0 0 2.8 2.8"/>',
  repeat: '<path d="M17 3.5 20.5 7 17 10.5"/><path d="M3.5 12V10a3 3 0 0 1 3-3h14"/><path d="M7 20.5 3.5 17 7 13.5"/><path d="M20.5 12v2a3 3 0 0 1-3 3h-14"/>',
  week: '<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="8.5" cy="14.5" r="1" fill="currentColor"/><circle cx="12" cy="14.5" r="1" fill="currentColor"/><circle cx="15.5" cy="14.5" r="1" fill="currentColor"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
  widget: '<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="3.5" y="13" width="17" height="7.5" rx="2"/>',
  user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  chip: '<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2.5V5M15 2.5V5M9 19v2.5M15 19v2.5M2.5 9H5M2.5 15H5M19 9h2.5M19 15h2.5"/>',
  offline: '<path d="M2.5 8.5a14 14 0 0 1 4.3-2.6M10.5 5.1a14 14 0 0 1 11 3.4M5.5 12a9.5 9.5 0 0 1 3.3-2M13.8 9.7A9.5 9.5 0 0 1 18.5 12M9 15.5a4.5 4.5 0 0 1 6 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/><path d="m3 3 18 18"/>',
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.5 1.6A3.8 3.8 0 0 1 17.5 18.5z"/><path d="m9.5 13.5 2 2 3.5-3.6"/>',
  shield: '<path d="M12 3 5 5.8v5.4c0 4.4 3 8.2 7 9.8 4-1.6 7-5.4 7-9.8V5.8z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z"/>',
  sparkle: '<path d="M12 3.5 13.8 10 20.5 12l-6.7 2-1.8 6.5-1.8-6.5L3.5 12l6.7-2z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
};

export const icon = (name, cls = '') =>
  `<svg class="i i--${name} ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;

/** Shared front-facing iPhone frame for illustrative app screens. */
export const phoneFrame = (body, cls = '') => `<div class="iphone ${cls}">
  <div class="iphone-screen">
    <div class="iphone-status" aria-hidden="true"><span>9:41</span><span class="iphone-island"></span><svg viewBox="0 0 50 14" width="42" height="12" fill="currentColor"><path d="M1 9h3v4H1zM6 6h3v7H6zM11 3h3v10h-3zM16 0h3v13h-3z"/><path d="M23 4q6-6 12 0l-2 2q-4-4-8 0zm3 3q3-3 6 0l-2 2q-1-1-2 0zm2 3h2v2h-2z"/><rect x="38" y="2" width="10" height="10" rx="2" fill="none" stroke="currentColor"/><rect x="40" y="4" width="6" height="6" rx="1"/><path d="M49 5h1v4h-1z"/></svg></div>
    <div class="iphone-content">${body}</div><span class="iphone-home" aria-hidden="true"></span>
  </div>
</div>`;
