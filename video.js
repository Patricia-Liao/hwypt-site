gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector('#video');

if (video) {                                   // skip quietly if there's no video on the page
  function setupScrollVideo() {
    video.pause();
    video.currentTime = 0;

    const lines = document.querySelectorAll('.video-section__line');

    // ONE timeline drives both the video and the text, so they stay in sync
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.video-section',
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 1,                    // measure this one first, since it sits above everything else
      },
    });

    // the video runs the whole length of the timeline (0 → 1)
    tl.to(video, { currentTime: video.duration, duration: 1, ease: 'none' }, 0);

    // each line fades up at its own point along the way
    // CUSTOMISE: the last number is WHEN it starts (0 = start of scroll, 1 = end)
    tl.from(lines[0], { opacity: 0, y: 30, duration: 0.15, ease: 'power1.out' }, 0.10);
    tl.from(lines[1], { opacity: 0, y: 30, duration: 0.15, ease: 'power1.out' }, 0.40);
    tl.from(lines[2], { opacity: 0, y: 30, duration: 0.15, ease: 'power1.out' }, 0.70);

    ScrollTrigger.refresh();                   // re-measure everything now that the 3000px exists
  }

  if (video.readyState >= 1) setupScrollVideo();
  else video.addEventListener('loadedmetadata', setupScrollVideo, { once: true });
}