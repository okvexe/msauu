/* ==========================================================================
   MSAUU INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Smooth Intersection Observer with Early Viewport Trigger
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Unobserve after trigger to optimize memory
      }
    });
  }, {
    root: null,
    threshold: 0.08, // Trigger early as the user approaches
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Mobile Menu Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Dynamic Sticky Navbar Effect on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-[#070709]/95', 'shadow-2xl', 'py-1');
    } else {
      navbar.classList.remove('bg-[#070709]/95', 'shadow-2xl', 'py-1');
    }
  });

});
