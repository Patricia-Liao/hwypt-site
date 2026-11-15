window.addEventListener('load', () => {
  gsap.timeline({ delay: 2 })                                    // wait 5 seconds
    .to('.hero__still', { autoAlpha: 1, duration: 0.5, ease: 'none' }, 0)  // still fades IN...
    .to('.hero__gif',   { autoAlpha: 0, duration: 1, ease: 'none' }, 0); // ...as the gif fades OUT
});


// text slide in //

gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  const lines = document.querySelectorAll('.awkward-weird [data-slide]');

  lines.forEach((line) => {
    const fromX = line.dataset.slide === 'left' ? '-100vw' : '100vw';

    gsap.from(line, {
      x: fromX,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,        // each line watches ITSELF
        start: 'top 80%',     // fires when the line's top reaches 90% down the screen
        once: true,
      },
    });
  });
});


// arc text Animation //

gsap.registerPlugin(ScrollTrigger);

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  const stage   = document.querySelector('.butt__stage');
  const letters = stage.querySelectorAll('.butt__word tspan');
  const words   = stage.querySelectorAll('.butt__caption tspan');
  const actions = 'play none none reverse';

  // BUTT: plays when the word reaches 85% down the screen
  gsap.timeline({ scrollTrigger: { trigger: '.butt__word', start: 'top 85%', toggleActions: actions } })
    .fromTo('#tp-top',
      { attr: { startOffset: '50%' } },
      { attr: { startOffset: '58%' }, duration: 1.2, ease: 'power2.out' }, 0)
    .to(letters, { fillOpacity: 1, duration: 0.4, stagger: 0.18, ease: 'none' }, 0);

  // caption: plays later, when IT reaches the bottom of the screen
  gsap.timeline({ scrollTrigger: { trigger: '.butt__caption', start: 'top 90%', toggleActions: actions } })
    .fromTo('#tp-bottom',
      { attr: { startOffset: '58%' } },
      { attr: { startOffset: '50%' }, duration: 1.2, ease: 'power2.out' }, 0)
    .to(words, { fillOpacity: 1, duration: 0.4, stagger: 0.25, ease: 'none' }, 0);
});




// section scrolling //
