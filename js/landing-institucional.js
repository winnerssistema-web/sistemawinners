/**
 * SISTEMA WINNERS — LOGICA INSTITUCIONAL (MÓDULO 01 - LANDING)
 * 100% Desacoplada de lógica de financiación y tablas de amortización.
 * Interactividad de UI, animaciones, modales, contadores y widgets.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initModals();
  initShareAction();
  initCounters();
  initScrollTop();
});

/* ==========================================================================
   1. STICKY HEADER CON SOMBRA DINÁMICA
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MENÚ MÓVIL (DRAWER LATERAL)
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. MODALES DE BÚSQUEDA Y SOPORTE
   ========================================================================== */
function initModals() {
  // Modal de búsqueda
  const searchBtn = document.getElementById('btn-search-trigger');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('search-modal-input');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('is-open');
      if (searchInput) setTimeout(() => searchInput.focus(), 150);
    });

    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchModal.classList.remove('is-open');
      });
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('is-open');
    });
  }

  // Modal de chat/soporte rápido (Widget inferior izquierdo)
  const chatBtn = document.getElementById('floating-chat-trigger');
  const chatModal = document.getElementById('chat-modal');
  const chatClose = document.getElementById('chat-modal-close');

  if (chatBtn && chatModal) {
    chatBtn.addEventListener('click', () => {
      chatModal.classList.add('is-open');
    });

    if (chatClose) {
      chatClose.addEventListener('click', () => {
        chatModal.classList.remove('is-open');
      });
    }

    chatModal.addEventListener('click', (e) => {
      if (e.target === chatModal) chatModal.classList.remove('is-open');
    });
  }

  // Cerrar cualquier modal con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.is-open').forEach(m => m.classList.remove('is-open'));
    }
  });
}

/* ==========================================================================
   4. ACCIÓN DE COMPARTIR (SHARE API & CLIPBOARD TOAST)
   ========================================================================== */
function initShareAction() {
  const shareBtn = document.getElementById('btn-share-trigger');
  const toast = document.getElementById('share-toast');

  if (!shareBtn) return;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-active');
    setTimeout(() => {
      toast.classList.remove('is-active');
    }, 3200);
  };

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Sistema Winners | Landing Institucional',
      text: 'Conquista tu meta o proyecto con los mejores beneficios. Conoce el modelo institucional de Sistema Winners.',
      url: window.location.href
    };

    if (navigator.share && window.isSecureContext) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('✓ ¡Enlace copiado al portapapeles!'))
      .catch(() => showToast('✓ sistemawinners.com copiado'));
  }
}

/* ==========================================================================
   5. CONTADORES DE IMPACTO ANIMADOS (SECCIÓN 6: ADJUDICADOS)
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.metric-number[data-target]');
  if (!counterElements.length) return;

  let hasAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const prefix = el.getAttribute('data-prefix') || '+';
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(ease * target);

        el.textContent = `${prefix}${currentVal.toLocaleString('es-CO')}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${prefix}${target.toLocaleString('es-CO')}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    const resultsSection = document.getElementById('resultados');
    if (resultsSection) {
      observer.observe(resultsSection);
    }
  } else {
    animateCounters();
  }
}

/* ==========================================================================
   6. BOTÓN VOLVER ARRIBA (SCROLL TO TOP)
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('floating-scroll-top');
  if (!scrollTopBtn) return;

  const checkScroll = () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
