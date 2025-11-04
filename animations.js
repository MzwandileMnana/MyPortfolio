// animations.js — adds reveal behaviour and small enhancements
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
    const selectors = ['header', 'nav', '.section', '.project', '.gallery img', 'footer'];
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
          // You can comment this line if you prefer reveal to stay once visible
          // entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  }

  function init() {
    addHelpers();
    setupObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
