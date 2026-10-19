(function () {
  // Número Oficial de WhatsApp (+57 311 7795935)
  var WA_NUMBER = "573117795935";

  // Cache de videos de fondo
  var vids = {};
  document.querySelectorAll('.stage video').forEach(function (v) {
    vids[v.dataset.key] = v;
  });

  var currentKey = 'hero';
  var chosenPaso2Video = 'proyecto';

  function loadVideo(v) {
    if (v && v.dataset.src && !v.src) {
      v.src = v.dataset.src;
      v.load();
    }
  }

  function switchVideo(key) {
    if (!vids[key] || key === currentKey) return;
    var next = vids[key];
    var prev = vids[currentKey];

    loadVideo(next);
    var playPromise = next.play();
    if (playPromise !== undefined) {
      playPromise.catch(function () {});
    }

    next.classList.add('on');
    if (prev) {
      prev.classList.remove('on');
      setTimeout(function () {
        if (!prev.classList.contains('on')) {
          prev.pause();
        }
      }, 950);
    }
    currentKey = key;
  }

  // Iniciar reproducción del video inicial
  if (vids.hero) {
    vids.hero.play().catch(function () {});
  }
  // Precargar video del paso 1 de forma inteligente
  setTimeout(function () { loadVideo(vids.paso1); }, 1200);

  // Inicializar Lenis Smooth Scroll si está disponible
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conectar Lenis con ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Smooth scroll en enlaces internos ancla (#hero, #paso1, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -20 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // GSAP ScrollTrigger para animaciones y cambio de video
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    var panels = gsap.utils.toArray('.panel');
    var navLinks = document.querySelectorAll('.steps-nav a');

    panels.forEach(function (panel) {
      var id = panel.id;
      var targetVideo = panel.dataset.video;

      // Animación de entrada de elementos dentro del panel
      var animElements = panel.querySelectorAll('h1, h2, .lead, .lead-text, .lead-sub, .pill-badge, .metrics-bar, .mini-card, .good-card, .req-item, .form-card, .btn-cta');
      if (animElements.length) {
        gsap.from(animElements, {
          y: 45,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      // Disparador de cambio de video de fondo por sección
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: function () {
          var v = (id === 'paso2') ? chosenPaso2Video : targetVideo;
          switchVideo(v);
          updateNav(id);
          preloadAdjacent(id);
        },
        onEnterBack: function () {
          var v = (id === 'paso2') ? chosenPaso2Video : targetVideo;
          switchVideo(v);
          updateNav(id);
        }
      });
    });

    function updateNav(activeId) {
      navLinks.forEach(function (link) {
        link.classList.toggle('active', link.dataset.nav === activeId);
      });
    }

    function preloadAdjacent(id) {
      if (id === 'hero') loadVideo(vids.paso1);
      if (id === 'paso1') {
        loadVideo(vids.proyecto);
        loadVideo(vids.vehiculo);
        loadVideo(vids.inmueble);
      }
      if (id === 'paso2') loadVideo(vids.docs);
    }
  } else {
    // Fallback IntersectionObserver si no carga el CDN
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = e.target.dataset.video;
        if (e.target.id === 'paso2') key = chosenPaso2Video;
        switchVideo(key);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.panel').forEach(function (p) { io.observe(p); });
  }

  // Barra de progreso lateral (Timeline)
  var tlFill = document.getElementById('tlFill');
  function updateProgress() {
    var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      var pct = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
      tlFill.style.height = pct + '%';
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Interacción de Tarjetas del Paso 2
  var selectBien = document.getElementById('bien');
  var goodCards = document.querySelectorAll('.good-card');

  goodCards.forEach(function (card) {
    var videoKey = card.dataset.video;
    var bienValue = card.dataset.bien;

    // Hover: Previsualiza el video
    card.addEventListener('mouseenter', function () {
      switchVideo(videoKey);
    });

    // Mouseleave: Vuelve al video seleccionado permanentemente
    card.addEventListener('mouseleave', function () {
      switchVideo(chosenPaso2Video);
    });

    // Click: Fija la elección, marca la tarjeta y baja al Paso 3
    card.addEventListener('click', function () {
      chosenPaso2Video = videoKey;
      switchVideo(chosenPaso2Video);

      goodCards.forEach(function (c) { c.classList.remove('sel'); });
      card.classList.add('sel');

      if (selectBien) {
        selectBien.value = bienValue;
      }

      // Desplazamiento fluido al formulario del Paso 3
      var paso3 = document.getElementById('paso3');
      if (paso3) {
        if (lenis) {
          lenis.scrollTo(paso3, { offset: 0 });
        } else {
          paso3.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Formulario Paso 3 -> Envío a WhatsApp
  var form = document.getElementById('form');
  var msg = document.getElementById('msg');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;
      var formData = new FormData(form);

      form.querySelectorAll('input[required]').forEach(function (input) {
        var val = input.value.trim();
        var empty = !val;
        input.classList.toggle('err', empty);
        if (empty) isValid = false;
      });

      if (!isValid) {
        msg.textContent = 'Por favor completa todos los campos requeridos.';
        return;
      }

      var text = 'Hola Sistema Winners, quiero solicitar mi registro institucional:\n\n' +
        '📌 Bien Elegido: ' + formData.get('bien') + '\n' +
        '👤 Nombre: ' + formData.get('nombre') + '\n' +
        '🪪 Cédula / ID: ' + formData.get('cedula') + '\n' +
        '📱 WhatsApp: ' + formData.get('whatsapp') + '\n' +
        '📍 Ciudad: ' + formData.get('ciudad') + '\n' +
        '✉️ Correo: ' + formData.get('email');

      msg.textContent = '¡Datos verificados! Abriendo WhatsApp Seguro…';

      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    });
  }

  // Botón flotante directo
  var waFloat = document.getElementById('wa');
  if (waFloat) {
    waFloat.href = 'https://wa.me/' + WA_NUMBER;
  }
})();
