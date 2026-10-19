(function () {
  // Número de WhatsApp (formato internacional, sin +). Ej: "573001234567"
  var WA_NUMBER = "573117795935";

  var vids = {};
  document.querySelectorAll('.stage video').forEach(function (v) { vids[v.dataset.key] = v; });
  var current = 'hero';
  var chosenVideo = 'proyecto';

  function load(v) {
    if (v.dataset.src && !v.src) { v.src = v.dataset.src; v.load(); }
  }
  function show(key) {
    if (!vids[key] || key === current) return;
    var next = vids[key], prev = vids[current];
    load(next);
    next.play().catch(function () {});
    next.classList.add('on');
    prev.classList.remove('on');
    var old = prev;
    setTimeout(function () { if (!old.classList.contains('on')) old.pause(); }, 1200);
    current = key;
  }
  vids.hero.play().catch(function () {});
  // Precarga ligera del siguiente video
  setTimeout(function () { load(vids.paso1); }, 1500);

  // Secciones
  var panels = document.querySelectorAll('.panel');
  var navs = document.querySelectorAll('[data-nav]');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelector('.content').classList.add('in');
      var key = e.target.dataset.video;
      if (e.target.id === 'paso2') key = chosenVideo;
      show(key);
      var id = e.target.id;
      navs.forEach(function (n) { n.classList.toggle('active', n.dataset.nav === id); });
      if (id === 'paso2') { load(vids.vehiculo); load(vids.inmueble); load(vids.proyecto); }
      if (id === 'paso1') load(vids.proyecto);
    });
  }, { threshold: 0.55 });
  panels.forEach(function (p) { io.observe(p); });

  // Timeline
  var fill = document.getElementById('tlFill');
  function prog() {
    var m = document.documentElement.scrollHeight - innerHeight;
    fill.style.height = Math.min(100, (scrollY / m) * 100) + '%';
  }
  addEventListener('scroll', prog, { passive: true }); prog();

  // Tarjetas del Paso 2
  var sel = document.getElementById('bien');
  document.querySelectorAll('.card').forEach(function (c) {
    function pick(persist) {
      show(c.dataset.video);
      if (persist) {
        chosenVideo = c.dataset.video;
        document.querySelectorAll('.card').forEach(function (x) { x.classList.remove('sel'); });
        c.classList.add('sel');
        sel.value = c.dataset.bien;
      }
    }
    c.addEventListener('mouseenter', function () { pick(false); });
    c.addEventListener('focus', function () { pick(false); });
    c.addEventListener('click', function () { pick(true); });
    c.addEventListener('mouseleave', function () { show(chosenVideo); });
  });

  // Formulario → WhatsApp
  var form = document.getElementById('form'), msg = document.getElementById('msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, d = new FormData(form);
    form.querySelectorAll('input[required]').forEach(function (i) {
      var bad = !i.value.trim(); i.classList.toggle('err', bad); if (bad) ok = false;
    });
    if (!ok) { msg.textContent = 'Completa todos los campos.'; return; }
    var text = 'Hola, quiero información en Sistema Winners.\nBien: ' + d.get('bien') +
      '\nNombre: ' + d.get('nombre') + '\nCédula: ' + d.get('cedula') +
      '\nWhatsApp: ' + d.get('whatsapp') + '\nCiudad: ' + d.get('ciudad');
    msg.textContent = '¡Gracias! Te estamos redirigiendo a WhatsApp…';
    window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
  });
  document.getElementById('wa').href = 'https://wa.me/' + WA_NUMBER;
})();
