// // snakepoop video scrolltrigger animation //


// gsap.registerPlugin(ScrollTrigger);

// const video = document.querySelector("#video");

// function setupScrollVideo() {

//   // Make sure video doesn't play independently
//   video.pause();

//   // Set video to the beginning
//   video.currentTime = 0;

//   gsap.to(video, {
//     currentTime: video.duration,
//     ease: "none",

//     scrollTrigger: {
//       trigger: ".video-section",
//       start: "top top",
//       end: "+=3000",
//       scrub: 1,
//       pin: true,
//       anticipatePin: 1
//     }
//   });
// }

// // Wait for video metadata
// if (video.readyState >= 1) {
//   setupScrollVideo();
// } else {
//   video.addEventListener("loadedmetadata", setupScrollVideo, {
//     once: true
//   });
// }





(function () {
  'use strict';

  const HSCROLL_SPEED = 1;
  const DEBUG = true;                // set to false once it works

  const section = document.querySelector('.hscroll');
  if (!section) { console.warn('[hscroll] no .hscroll section found'); return; }
  const track = section.querySelector('.hscroll__track');

  gsap.registerPlugin(ScrollTrigger);

  const query = '(min-width: 769px) and (prefers-reduced-motion: no-preference)';
  console.log('[hscroll] horizontal mode?', window.matchMedia(query).matches);

  gsap.matchMedia().add(query, () => {
    const getDistance = () => track.scrollWidth - section.clientWidth;
    console.log('[hscroll] distance to travel:', getDistance(), 'px');

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
        invalidateOnRefresh: true,
        
      },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts.ready.then(() => ScrollTrigger.refresh());
})();