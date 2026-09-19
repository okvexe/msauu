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

  // 2. Mobile Menu Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Dynamic Shrink & Diminish Effect on Hero Logo
  const heroLogo = document.getElementById('hero-logo');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // As user scrolls from 0px to 400px down:
    if (heroLogo && scrollY < 500) {
      const scaleValue = Math.max(0.7, 1 - scrollY * 0.0008); // Scale down from 1.0 to 0.7
      const opacityValue = Math.max(0.3, 1 - scrollY * 0.0015); // Fade opacity slightly
      const translateYValue = scrollY * 0.3; // Parallax push upward

      heroLogo.style.transform = `scale(${scaleValue}) translateY(-${translateYValue}px)`;
      heroLogo.style.opacity = opacityValue;
    }
  });

  // 4. Sticky Navbar Styling
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-[#070709]/95', 'shadow-2xl');
    } else {
      navbar.classList.remove('bg-[#070709]/95', 'shadow-2xl');
    }
  });

});
