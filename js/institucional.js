/* Sistema Winners — capa institucional (no toca la lógica de main.js) */
(() => {
  'use strict';
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Lenis: scroll inercial (carga diferida, degrada sin él) */
  if (!reduce) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';
    s.onload = () => {
      const lenis = new Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4) });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1 && document.querySelector(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -120 }); }
      }));
    };
    document.head.appendChild(s);
  }

  /* Header: sombra al hacer scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Reveal escalonado */
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target; el.classList.add('in'); io.unobserve(el);
        setTimeout(() => { el.classList.remove('rv', 'in'); el.style.removeProperty('--d'); }, 1400 + parseFloat(el.style.getPropertyValue('--d') || 0) * 1000);
      }
    }), { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    const groups = ['.section-header', '.stat-item', '.sitelink-card', '.comparison-table-container', '.comparison-callout',
      '.carousel-outer', '.simulator-box', '.ecosystem-card', '.lead-box-container', '.footer-col, .footer-col-about'];
    groups.forEach(sel => $$(sel).forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', (i % 4) * .08 + 's'); io.observe(el); }));
  }
})();
