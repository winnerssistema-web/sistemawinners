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

  var isMobile = window.innerWidth <= 900;

  if (isMobile) {
    // EN VERSIÓN MÓVIL NO SE USAN VIDEOS: desconectar para ahorrar datos y batería
    Object.keys(vids).forEach(function (k) {
      if (vids[k]) {
        try {
          vids[k].pause();
          vids[k].removeAttribute('src');
          vids[k].load();
        } catch (e) {}
      }
    });
  } else {
    // Reproducir video inicial (Hero / Escena 0: "¿Quieres ser parte del proceso?")
    function startHeroVideo() {
      if (vids.hero) {
        vids.hero.muted = true;
        var p = vids.hero.play();
        if (p !== undefined) {
          p.catch(function () {});
        }
      }
    }

    startHeroVideo();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startHeroVideo);
    }

    // Desbloqueo garantizado en caso de políticas restrictivas de autoplay en escritorio
    var unlockEvents = ['click', 'touchstart', 'scroll', 'wheel', 'keydown'];
    function unlockHeroVideo() {
      startHeroVideo();
      unlockEvents.forEach(function (evt) {
        window.removeEventListener(evt, unlockHeroVideo);
      });
    }
    unlockEvents.forEach(function (evt) {
      window.addEventListener(evt, unlockHeroVideo, { passive: true, once: true });
    });

    // Precarga estratégica de videos secundarios en escritorio
    setTimeout(function () { if (vids.paso1) loadVideo(vids.paso1); }, 800);
    setTimeout(function () {
      if (vids.proyecto) loadVideo(vids.proyecto);
      if (vids.vehiculo) loadVideo(vids.vehiculo);
      if (vids.inmueble) loadVideo(vids.inmueble);
      if (vids.docs) loadVideo(vids.docs);
    }, 2500);
  }

  // =========================================================
  // MOTOR DE ESCENAS FULLSCREEN DECK (0, 1, 2, 3)
  // =========================================================
  var scenes = document.querySelectorAll('.scene');
  var totalScenes = scenes.length;
  var currentScene = 0;
  var isTransitioning = false;
  var COOLDOWN_MS = 1100;

  var navButtons = document.querySelectorAll('.steps-nav button');
  var sceneDots = document.querySelectorAll('.scene-dot');

  function updateIndicators(targetIndex) {
    // Nav del Header (1, 2, 3)
    navButtons.forEach(function (btn) {
      var goto = parseInt(btn.dataset.goto, 10);
      btn.classList.toggle('active', goto === targetIndex);
    });

    // Dots del lateral (0, 1, 2, 3)
    sceneDots.forEach(function (dot, idx) {
      dot.classList.toggle('active', idx === targetIndex);
    });
  }

  function getVideoForScene(index) {
    if (index === 0) return 'hero';
    if (index === 1) return 'paso1';
    if (index === 2) return chosenPaso2Video;
    if (index === 3) return 'docs';
    return 'hero';
  }

  function goToScene(nextIndex) {
    if (nextIndex < 0 || nextIndex >= totalScenes || nextIndex === currentScene || isTransitioning) {
      return;
    }

    isTransitioning = true;
    var currentEl = scenes[currentScene];
    var nextEl = scenes[nextIndex];
    var direction = nextIndex > currentScene ? 1 : -1;

    // Cambiar video correspondiente
    switchVideo(getVideoForScene(nextIndex));
    updateIndicators(nextIndex);

    // Activar visibilidad de la escena entrante antes de animar
    nextEl.style.visibility = 'visible';
    nextEl.classList.add('active');

    if (typeof gsap !== 'undefined') {
      // Transición cinematográfica exacta con GSAP
      gsap.to(currentEl, {
        y: direction * -60,
        scale: 0.94,
        filter: 'blur(12px)',
        opacity: 0,
        duration: 0.85,
        ease: 'power3.inOut',
        onComplete: function () {
          currentEl.classList.remove('active');
          currentEl.style.visibility = 'hidden';
          gsap.set(currentEl, { clearProps: 'all' });
        }
      });

      gsap.fromTo(
        nextEl,
        {
          y: direction * 60,
          scale: 1.06,
          filter: 'blur(12px)',
          opacity: 0
        },
        {
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.95,
          ease: 'power3.out',
          onComplete: function () {
            gsap.set(nextEl, { clearProps: 'filter,transform' });
            currentScene = nextIndex;
            setTimeout(function () {
              isTransitioning = false;
            }, 100);
          }
        }
      );
    } else {
      // Fallback si no está GSAP
      currentEl.classList.remove('active');
      nextEl.classList.add('active');
      currentScene = nextIndex;
      setTimeout(function () { isTransitioning = false; }, COOLDOWN_MS);
    }
  }

  function nextScene() {
    if (currentScene < totalScenes - 1) {
      goToScene(currentScene + 1);
    }
  }

  function prevScene() {
    if (currentScene > 0) {
      goToScene(currentScene - 1);
    }
  }

  // =========================================================
  // CONTROLADORES DE ENTRADA: WHEEL / TOUCH / KEYS
  // =========================================================

  // 1. Wheel (Rueda del Mouse con Cooldown para Escritorio)
  window.addEventListener('wheel', function (e) {
    if (isMobile || isTransitioning) return;
    if (e.deltaY > 25) {
      nextScene();
    } else if (e.deltaY < -25) {
      prevScene();
    }
  }, { passive: true });

  // 2. Touch (Swipe exclusivo en modo Escritorio/Tablet deck)
  var touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    if (isMobile) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (isMobile || isTransitioning) return;
    var touchEndY = e.changedTouches[0].clientY;
    var diff = touchStartY - touchEndY;
    if (diff > 50) {
      nextScene();
    } else if (diff < -50) {
      prevScene();
    }
  }, { passive: true });

  // 3. Teclado (Flechas Arriba / Abajo)
  window.addEventListener('keydown', function (e) {
    // Si el usuario está escribiendo en el formulario, no cambiar de escena
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'select' || tag === 'textarea') return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextScene();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      prevScene();
    }
  });

  // 4. Clics en elementos con [data-goto]
  document.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var target = parseInt(this.dataset.goto, 10);
      goToScene(target);
    });
  });

  // =========================================================
  // PASO 2: TARJETAS INTERACTIVAS
  // =========================================================
  var selectBien = document.getElementById('bien');
  var goodPills = document.querySelectorAll('.good-pill');

  goodPills.forEach(function (pill) {
    var videoKey = pill.dataset.video;
    var bienValue = pill.dataset.bien;

    // Hover: Previsualiza el video
    pill.addEventListener('mouseenter', function () {
      if (currentScene === 2) {
        switchVideo(videoKey);
      }
    });

    // Mouseleave: Vuelve al video seleccionado
    pill.addEventListener('mouseleave', function () {
      if (currentScene === 2) {
        switchVideo(chosenPaso2Video);
      }
    });

    // Click: Fija la elección y transiciona a la Escena 3
    pill.addEventListener('click', function () {
      chosenPaso2Video = videoKey;
      switchVideo(chosenPaso2Video);

      goodPills.forEach(function (p) { p.classList.remove('sel'); });
      pill.classList.add('sel');

      if (selectBien) {
        selectBien.value = bienValue;
      }

      // Avanzar suavemente a la Escena 3 (Documentos)
      setTimeout(function () {
        goToScene(3);
      }, 250);
    });
  });

  // =========================================================
  // PASO 3: FORMULARIO Y ENVÍO A WHATSAPP
  // =========================================================
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

  // =========================================================
  // MÓVIL: HERO PARALLAX 3D (ACETERNITY STYLE CON SCROLLTRIGGER)
  // =========================================================
  if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
    try {
      gsap.registerPlugin(ScrollTrigger);

      var pWrap = document.querySelector('.m-hero-parallax-wrap');
      if (pWrap) {
        gsap.to('.m-parallax-row-1', {
          x: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: pWrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });

        gsap.to('.m-parallax-row-2', {
          x: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: pWrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }

      // Animaciones suaves de entrada para componentes móviles
      gsap.utils.toArray('.m-feature-item, .m-good-card, .m-metric-pill, .m-form-card').forEach(function (el) {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    } catch (err) {}
  }

  // =========================================================
  // MÓVIL: PASO 02 - SELECCIÓN DE BIEN CON FOTOS 1, 3, 5
  // =========================================================
  var mCards = document.querySelectorAll('.m-good-card');
  var mSelect = document.getElementById('m_bien');
  var dSelect = document.getElementById('bien');

  mCards.forEach(function (c) {
    c.addEventListener('click', function () {
      var val = this.dataset.mBien;
      mCards.forEach(function (item) { item.classList.remove('sel'); });
      this.classList.add('sel');

      if (mSelect) mSelect.value = val;
      if (dSelect) dSelect.value = val;

      var paso3 = document.getElementById('m-paso3');
      if (paso3) {
        paso3.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =========================================================
  // MÓVIL: PASO 03 - FORMULARIO COMPACTO Y ENVÍO DIRECTO
  // =========================================================
  var mForm = document.getElementById('m_form');
  var mMsg = document.getElementById('m_msg');

  if (mForm) {
    mForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;
      var data = new FormData(mForm);

      mForm.querySelectorAll('input[required]').forEach(function (input) {
        var empty = !input.value.trim();
        input.style.borderColor = empty ? '#ef4444' : '';
        if (empty) isValid = false;
      });

      if (!isValid) {
        if (mMsg) mMsg.textContent = 'Por favor completa todos los campos requeridos.';
        return;
      }

      var text = 'Hola Sistema Winners, quiero solicitar mi registro institucional (Móvil):\n\n' +
        '📌 Bien Elegido: ' + data.get('bien') + '\n' +
        '👤 Nombre: ' + data.get('nombre') + '\n' +
        '🪪 Cédula / ID: ' + data.get('cedula') + '\n' +
        '📱 WhatsApp: ' + data.get('whatsapp') + '\n' +
        '📍 Ciudad: ' + data.get('ciudad') + '\n' +
        '✉️ Correo: ' + data.get('email');

      if (mMsg) mMsg.textContent = '¡Datos listos! Redirigiendo a WhatsApp…';

      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank');
    });
  }

  // =========================================================
  // REACTBITS: PULSE HEART MICRO-INTERACTION (VANILLA JS CON FÍSICA)
  // =========================================================
  var phBtn = document.getElementById('pulseHeartBtn');
  if (phBtn) {
    var OUT = 0.4;
    function back(k, c) {
      var u = k - 1;
      return 1 + (c + 1) * Math.pow(u, 3) + c * Math.pow(u, 2);
    }
    function swellOf(t, c) {
      return t <= 0 ? 0 : t < OUT ? 1 - Math.pow(1 - t / OUT, 3) : 1 - back((t - OUT) / (1 - OUT), c);
    }

    var liked = false;
    var duration = 560;
    var dotSize = 0.3;
    var overshoot = 1.7;
    var beat = 3;
    var rafId = 0;

    var pill = phBtn.querySelector('.pulse-heart__pill');
    var glyph = phBtn.querySelector('.pulse-heart__glyph');
    var rollEl = document.getElementById('phRoll');
    var digitA = document.getElementById('phDigitA');
    var digitB = document.getElementById('phDigitB');

    // Pointer feedback
    phBtn.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      phBtn.setAttribute('data-pressed', '');
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (evt) {
      phBtn.addEventListener(evt, function () {
        phBtn.removeAttribute('data-pressed');
      });
    });

    phBtn.addEventListener('click', function () {
      if (rafId) return;
      liked = !liked;

      // Haptic feedback en dispositivos táctiles
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(18);
      }

      phBtn.setAttribute('data-liked', String(liked));
      phBtn.setAttribute('aria-pressed', String(liked));

      // Rolling digit counter animation
      if (rollEl && digitA && digitB) {
        if (liked) {
          digitA.textContent = '2';
          digitB.textContent = '3';
          rollEl.style.transition = 'transform 350ms cubic-bezier(0.23, 1, 0.32, 1)';
          rollEl.style.transform = 'translateY(-1.1em)';
        } else {
          digitA.textContent = '3';
          digitB.textContent = '2';
          rollEl.style.transition = 'transform 350ms cubic-bezier(0.23, 1, 0.32, 1)';
          rollEl.style.transform = 'translateY(-1.1em)';
          setTimeout(function () {
            rollEl.style.transition = 'none';
            rollEl.style.transform = 'translateY(0)';
            digitA.textContent = '2';
            digitB.textContent = '3';
          }, 360);
        }
      }

      // Physics pulse animation loop
      var t0 = performance.now();
      function tick(now) {
        var t = Math.min(1, (now - t0) / duration);
        var s = swellOf(t, overshoot);
        var k = 1 - (1 - dotSize) * s;
        if (glyph) {
          glyph.setAttribute('transform', 'translate(12 12) scale(' + k + ') translate(-12 -12)');
        }
        if (pill) {
          pill.style.transform = 'scale(' + (1 - (beat / 100) * s) + ')';
        }
        if (t < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = 0;
          if (glyph) glyph.removeAttribute('transform');
          if (pill) pill.style.transform = '';
        }
      }
      rafId = requestAnimationFrame(tick);
    });
  }

  // Botón flotante de WhatsApp
  var waFloat = document.getElementById('wa');
  if (waFloat) {
    waFloat.href = 'https://wa.me/' + WA_NUMBER;
  }
})();
