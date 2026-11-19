// ============ NAV: fixed bar + dropdown ============
(function () {
  'use strict';

  const nav      = document.querySelector('.hero__nav');
  const toggle   = document.querySelector('.hero__menu');
  const dropdown = document.querySelector('.hero__dropdown');
  const close    = document.querySelector('.hero__close');
  if (!nav || !toggle || !dropdown || !close) return;

  // ---- Solid background once the page has scrolled a little ----
  const SCROLL_POINT = 60;                       // CUSTOMISE: px scrolled before it turns solid

  function updateNav() {
    nav.classList.toggle('hero__nav--scrolled', window.scrollY > SCROLL_POINT);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();                                   // run once, in case the page loads already scrolled

  // ---- Dropdown ----
  const isOpen = () => dropdown.classList.contains('is-open');

  function openMenu() {
    dropdown.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    close.focus();                               // keyboard users land inside the menu
  }

  function closeMenu(returnFocus = true) {
    dropdown.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', () => closeMenu());

  // Escape key closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) closeMenu();
  });

  // clicking anywhere outside the panel closes it
  document.addEventListener('click', (e) => {
    if (isOpen() && !dropdown.contains(e.target) && !toggle.contains(e.target)) closeMenu(false);
  });

  // clicking a link closes it (so it isn't still open after jumping to a section)
  dropdown.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu(false));
  });
})();