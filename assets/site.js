(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const syncTopbar = () => {
      topbar.classList.toggle('topbar--scrolled', window.scrollY > 8);
    };
    syncTopbar();
    window.addEventListener('scroll', syncTopbar, { passive: true });
  }

  const menuLinks = document.querySelectorAll('.menu a');
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  menuLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const revealElements = document.querySelectorAll(
    'h1, h2, h3, .card, .hero, .hero-visual, .site-footer, li, .timeline-step, .faq-item'
  );

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    document.documentElement.classList.add('motion-reduced');
    return;
  }

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(index * 35, 240)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  revealElements.forEach((el, index) => {
    if (index % 3 === 1) el.classList.add('reveal-left');
    if (index % 3 === 2) el.classList.add('reveal-right');
    observer.observe(el);
  });
})();
