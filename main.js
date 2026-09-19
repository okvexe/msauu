/* ==========================================================================
   MSAUU INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Smooth Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -80px 0px'
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

  // 3. Hero Logo Shrink Effect
  const heroLogo = document.getElementById('hero-logo');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (heroLogo && scrollY < 500) {
      const scaleValue = Math.max(0.7, 1 - scrollY * 0.0008);
      const opacityValue = Math.max(0.2, 1 - scrollY * 0.0016);
      const translateYValue = scrollY * 0.3;

      heroLogo.style.transform = `scale(${scaleValue}) translateY(-${translateYValue}px)`;
      heroLogo.style.opacity = opacityValue;
    }
  });

  // 4. Sticky Navbar Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-black/95', 'shadow-2xl');
    } else {
      navbar.classList.remove('bg-black/95', 'shadow-2xl');
    }
  });

});
