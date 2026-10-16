/**
 * SISTEMA WINNERS - INTERACTIVIDAD Y LOGICA WEB
 * Sliders, Simulador de Multifinanciamiento, Modales y Navegación
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initStepsCarousel();
  initSimulator();
  initModals();
  initMobileMenu();
  initSearch();
});

/* ==========================================================================
   1. HERO SLIDER (SLIDER 1)
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const sliderContainer = document.querySelector('.hero-slider-section');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const autoPlayDelay = 6500;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetTimer();
    });
  });

  function startTimer() {
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopTimer() {
    if (slideInterval) clearInterval(slideInterval);
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopTimer);
    sliderContainer.addEventListener('mouseleave', startTimer);
  }

  startTimer();
}

/* ==========================================================================
   2. CAROUSEL DE PASOS (SLIDER 2 - CÓMO FUNCIONA EL MULTIFINANCIAMIENTO)
   ========================================================================== */
function initStepsCarousel() {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-step-card');
  const prevBtn = document.querySelector('.carousel-arrow-prev');
  const nextBtn = document.querySelector('.carousel-arrow-next');
  const dots = document.querySelectorAll('.carousel-dot');

  if (!track || !cards.length) return;

  let currentIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  }

  function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - cardsPerView);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cardWidthPercent = 100 / cardsPerView;
    const offset = currentIndex * (cardWidthPercent + (20 / track.clientWidth * 100));
    
    // Usamos desplazamiento directo por porcentaje
    track.style.transform = `translateX(-${currentIndex * (100 / cardsPerView + 1.5)}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updateCarousel();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateCarousel();
    });
  });

  window.addEventListener('resize', updateCarousel);
}

/* ==========================================================================
   3. SIMULADOR DE MULTIFINANCIAMIENTO INTERACTIVO
   ========================================================================== */
function initSimulator() {
  const goalRange = document.getElementById('sim-goal-range');
  const goalValDisplay = document.getElementById('sim-goal-val');
  const referralsRange = document.getElementById('sim-ref-range');
  const referralsValDisplay = document.getElementById('sim-ref-val');
  const membershipOptions = document.querySelectorAll('.membership-card-option');

  // Displays de resultados
  const resFondo = document.getElementById('res-fondo-comun');
  const resTiempo = document.getElementById('res-tiempo-entrega');
  const resAhorro = document.getElementById('res-ahorro-bancario');
  const resApalancamiento = document.getElementById('res-apalancamiento');

  if (!goalRange) return;

  let selectedMembershipCost = 200000; // Plan Moto Emprendedor oficial ($200.000 COP)

  membershipOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      membershipOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedMembershipCost = parseInt(opt.getAttribute('data-cost'), 10) || 200000;

      const minGoal = parseInt(opt.getAttribute('data-min-goal'), 10);
      const maxGoal = parseInt(opt.getAttribute('data-max-goal'), 10);
      const defGoal = parseInt(opt.getAttribute('data-default-goal'), 10);

      if (minGoal && maxGoal && goalRange) {
        goalRange.min = minGoal;
        goalRange.max = maxGoal;
        goalRange.value = defGoal || minGoal;
        if (goalValDisplay) {
          goalValDisplay.textContent = formatCOP(parseInt(goalRange.value, 10));
        }
      }

      calculateSimulation();
    });
  });

  if (goalRange) {
    goalRange.addEventListener('input', () => {
      const val = parseInt(goalRange.value, 10);
      if (goalValDisplay) {
        goalValDisplay.textContent = formatCOP(val);
      }
      calculateSimulation();
    });
  }

  if (referralsRange) {
    referralsRange.addEventListener('input', () => {
      const refCount = parseInt(referralsRange.value, 10);
      if (referralsValDisplay) {
        const metaTag = refCount >= 3 ? ' (¡Meta Oficial Cumplida!)' : '';
        referralsValDisplay.textContent = `${refCount} socios referidos${metaTag}`;
      }
      calculateSimulation();
    });
  }

  function calculateSimulation() {
    const goal = parseInt(goalRange.value, 10);
    const refs = parseInt(referralsRange.value, 10);

    const isCelular = selectedMembershipCost === 70000;
    const itemNombre = isCelular ? "SMARTPHONE" : "MOTOCICLETA";

    // Fondo acumulado en red: Membresía base * factor multiplicador por referidos
    const fondoGenerado = (selectedMembershipCost * refs * 2.8);
    
    // Tiempo de entrega con base en la regla oficial de 3 referidos:
    let tiempoTexto = "Faltan 2 referidos para entrega directa";
    if (refs >= 3) {
      tiempoTexto = `¡ENTREGA INMEDIATA DE TU ${itemNombre}!`;
    } else if (refs === 2) {
      tiempoTexto = `A 1 solo referido de tu entrega inmediata`;
    }

    // Ahorro frente a banco (intereses usurarios de crédito bancario tradicional)
    const interesBancarioAhorrado = Math.round(goal * 0.32);

    // Capacidad de apalancamiento para proyectos e ideas
    const apalancamientoMax = Math.round(goal * (1 + (refs * 0.15)));

    if (resFondo) resFondo.textContent = formatCOP(fondoGenerado);
    if (resTiempo) {
      resTiempo.textContent = tiempoTexto;
      if (refs >= 3) {
        resTiempo.classList.add('accent-green');
      } else {
        resTiempo.classList.remove('accent-green');
      }
    }
    if (resAhorro) resAhorro.textContent = `Ahorras ${formatCOP(interesBancarioAhorrado)} en intereses`;
    if (resApalancamiento) resApalancamiento.textContent = formatCOP(apalancamientoMax);
  }

  function formatCOP(num) {
    return '$' + num.toLocaleString('es-CO') + ' COP';
  }

  calculateSimulation();
}

/* ==========================================================================
   4. MODALES
   ========================================================================== */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modalOverlays.forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = '';
  }

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   5. MENU MOVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
      const isExpanded = nav.classList.contains('mobile-active');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });
  }
}

/* ==========================================================================
   6. BUSCADOR INTEGRADO
   ========================================================================== */
function initSearch() {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      if (query.includes('devolu') || query.includes('consulta')) {
        window.location.href = 'consulta-devoluciones.html';
      } else if (query.includes('pago') || query.includes('pse') || query.includes('linea')) {
        window.location.href = 'tu-pago-en-linea.html';
      } else if (query.includes('zona') || query.includes('cliente') || query.includes('socio') || query.includes('login')) {
        window.location.href = 'zona-clientes.html';
      } else if (query.includes('asamblea') || query.includes('resultado') || query.includes('sorteo')) {
        window.location.href = 'resultados-asamblea.html';
      } else if (query.includes('simula') || query.includes('calcul')) {
        const simSection = document.getElementById('simulador');
        if (simSection) simSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Redirigir o scroll a la sección relevante
        const compSection = document.getElementById('comparativa');
        if (compSection) compSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
