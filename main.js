/* ==========================================================================
   MSAUU SCROLL REVEAL & MOBILE NAV ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Slow & Smooth Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Unobserve after trigger
      }
    });
  }, {
    root: null,
    threshold: 0.1, // Trigger slightly earlier for seamless scrolling
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
