(function () {
  'use strict';

  const HSCROLL_SPEED = 1;   // CUSTOMISE: 2 = takes twice as much scrolling
  const DEBUG = false;       // true = log what's happening to the console

  const log = (...args) => { if (DEBUG) console.log('[hscroll]', ...args); };

  const section = document.querySelector('.hscroll');
  if (!section) { log('no .hscroll section found'); return; }

  const track = section.querySelector('.hscroll__track');
  if (!track) { log('no .hscroll__track found'); return; }

  gsap.registerPlugin(ScrollTrigger);

  const query = '(min-width: 769px) and (prefers-reduced-motion: no-preference)';
  log('horizontal mode?', window.matchMedia(query).matches);

  gsap.matchMedia().add(query, () => {
    // how far the track has to move so its right edge meets the screen's right edge
    const getDistance = () => track.scrollWidth - section.clientWidth;
    log('distance to travel:', getDistance(), 'px');

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + getDistance() * HSCROLL_SPEED,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,   // re-measures on resize
      },
    });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts.ready.then(() => ScrollTrigger.refresh());
})();