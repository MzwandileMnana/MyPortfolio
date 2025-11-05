// animations.js — adds reveal behaviour, carousel and small enhancements
(function () {
  function addHelpers() {
    // Float the main profile image if present
    const profile = document.querySelector('.profile-img');
    if (profile) profile.classList.add('float');

    // Pulse primary CTAs
    const ctas = document.querySelectorAll('.btn');
    ctas.forEach((btn, i) => {
      // add a subtle pulse only to the primary call-to-action(s)
      if (btn.closest('.button-container') || btn.classList.contains('hireBtn')) {
        btn.classList.add('pulse');
      }
    });

    // Mark common blocks for reveal if they don't already have the class
    const selectors = ['header', 'nav', '.section', '.project', '.gallery img', 'footer', '.carousel'];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
      });
    });
  }

  function setupObserver() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          // leave in-view once visible (comment out the next line to make it toggle)
          // entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  }

  function setupCarousel() {
    const carousels = document.querySelectorAll('.carousel');
    if (!carousels.length) return;

    carousels.forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const slides = Array.from(track.children);
      const prev = carousel.querySelector('.carousel-btn.prev');
      const next = carousel.querySelector('.carousel-btn.next');
      let index = 0;
      let autoPlayTimer = null;

      const gap = parseFloat(getComputedStyle(track).gap) || 16;

      function getSlideWidth() {
        // compute the width of a single slide
        const rect = slides[0].getBoundingClientRect();
        return rect.width + gap;
      }

      function update() {
        if (!slides.length) return;
        const slideW = getSlideWidth();
        // keep index in range
        index = Math.max(0, Math.min(index, slides.length - 1));
        track.style.transform = `translateX(${-(index * slideW)}px)`;
      }

      function goNext() { index = (index + 1) % slides.length; update(); }
      function goPrev() { index = (index - 1 + slides.length) % slides.length; update(); }

      // Attach events
      if (next) next.addEventListener('click', () => { goNext(); resetAutoPlay(); });
      if (prev) prev.addEventListener('click', () => { goPrev(); resetAutoPlay(); });

      // Auto-play (optional)
      function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(goNext, 4000);
      }
      function stopAutoPlay() { if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null; } }
      function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

      // Pause on hover
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);

      // Recalculate on resize or image load
      window.addEventListener('resize', () => { update(); });
      slides.forEach(img => {
        if (!img.complete) img.addEventListener('load', update);
      });

      // initial setup
      // set a small timeout to allow layout / fonts to settle
      setTimeout(() => {
        // ensure slides have sensible widths on small screens
        update();
        startAutoPlay();
      }, 80);
    });
  }

  function init() {
    addHelpers();
    setupObserver();
    setupCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
