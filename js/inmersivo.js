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

  // Reproducir video inicial
  if (vids.hero) {
    vids.hero.play().catch(function () {});
  }
  // Precarga estratégica de videos
  setTimeout(function () { loadVideo(vids.paso1); }, 1000);
  setTimeout(function () {
    loadVideo(vids.proyecto);
    loadVideo(vids.vehiculo);
    loadVideo(vids.inmueble);
    loadVideo(vids.docs);
  }, 3000);

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

  // 1. Wheel (Rueda del Mouse con Cooldown)
  window.addEventListener('wheel', function (e) {
    if (isTransitioning) return;
    if (e.deltaY > 25) {
      nextScene();
    } else if (e.deltaY < -25) {
      prevScene();
    }
  }, { passive: true });

  // 2. Touch (Swipe en Móviles)
  var touchStartY = 0;
  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (isTransitioning) return;
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

  // Botón flotante de WhatsApp
  var waFloat = document.getElementById('wa');
  if (waFloat) {
    waFloat.href = 'https://wa.me/' + WA_NUMBER;
  }
})();
