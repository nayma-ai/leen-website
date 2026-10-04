# Calmer marketing site — 2026-10-04

One introduction and app preview, the retained How it works section, the journal,
Free/Pro, a privacy note,
four FAQs and a compact closing invitation. Copy follows the current app:
local nutrient history/comparisons/reflections in Pro, optional Online help,
limited photo features, full free history and export. Store links and prices
remain unset until available; no release or deployment was performed.

## Visual review

- [English desktop](en-desktop.png)
- [Arabic desktop](ar-desktop.png)
- [English mobile](en-mobile.png)
- [Arabic mobile](ar-mobile.png)
- [Dark appearance](en-dark.png)
- [How it works — desktop](en-desktop-how.png)
- [How it works — mobile](en-mobile-how.png)
- [How it works — Arabic mobile](ar-mobile-how.png)
- [How it works — dark](en-dark-how.png)

These are unedited browser screenshots of the local build. The in-page app
and gallery illustrations are labeled previews, rather than live app captures.

## Verification

`npm run build` produced seven pages. Browser checks passed for English and
Arabic at 1440, 768, 390 and 320 pixels, plus desktop dark mode, with reduced motion.
Checks covered unclipped content in the hero iPhone frame, horizontal overflow, one main heading, calorie-preview toggling,
FAQ expansion, in-page targets, page errors and requests staying on the local
origin. The restored How it works section was checked for three cards and a
localized photo-feature note in every layout. Supporting privacy/terms/404 pages loaded. A build audit verified all
internal page and asset links and absence of undefined/NaN copy. Results are
recorded in [review.json](review.json). Both 1200×630 social previews were
regenerated and visually reviewed. No live subscription or analytics requests
were made.

## Live How it works demos

Typing reveals meal chips, voice waves accompany word-by-word transcription,
and the photo viewfinder scans before revealing a meal to review. These are
local illustrative animations. A shared pause/play control is available; demos
pause offscreen and in background tabs. Reduced motion starts with complete
still previews, with explicit play available.

English/Arabic desktop/mobile sequences, pause/resume, offscreen suspension,
and reduced-motion preference changes are recorded in [live-review.json](live-review.json).

- [Animated demo — English desktop](en-live-desktop.png)
- [Animated demo — Arabic desktop](ar-live-desktop.png)
- [Photo result — English mobile](en-live-photo-mobile.png)
- [Photo result — Arabic mobile](ar-live-photo-mobile.png)

## Hero iPhone and compact live demos

Only the hero uses the graphite iPhone frame, with side buttons, status bar,
Dynamic Island and home indicator. It types an entry, reveals two meal cards,
and resets the composer. How it works restores the compact typing, voice and
photo demo cards without phone frames. Shared pause controls, offscreen
suspension and reduced-motion behavior still apply to all live previews.
The browser review verifies one iPhone in the hero and none in How it works.

- [English tablet](en-tablet.png)
- [Arabic tablet](ar-tablet.png)
- [Live hero — English](en-live-hero-1440.png)
- [Live hero — Arabic mobile](ar-live-hero-390.png)

## Publisher and support contact

Leen is credited to NAYMA, linked to https://www.nayma.ai/, in the footer,
copyright, bilingual privacy/terms introductions and publisher metadata.
All seven generated pages use support@leen.fit for contact links. A browser
check verified the publisher name/URL, legal links, contact address and absence
of old public branding. The full-page review captures above were refreshed.

- [English NAYMA footer](en-nayma-footer.png)
- [Arabic NAYMA footer](ar-nayma-footer.png)
