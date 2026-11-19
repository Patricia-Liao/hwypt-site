gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector('#video');

if (video) {                                   // skip quietly if there's no video on the page
  function setupScrollVideo() {
    video.pause();
    video.currentTime = 0;

    gsap.to(video, {
      currentTime: video.duration,
      ease: 'none',
      scrollTrigger: {
        trigger: '.video-section',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 1,                    // NEW: measure this one first, since it sits above everything else
      },
    });

    ScrollTrigger.refresh();                   // NEW: re-measure everything now that the 3000px exists
  }

  if (video.readyState >= 1) setupScrollVideo();
  else video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
}