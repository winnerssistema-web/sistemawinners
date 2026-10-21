# ESPECIFICACIONES Y REQUISITOS TÉCNICOS ESTRICTOS — SISTEMA WINNERS

Este documento establece la arquitectura obligatoria, reglas de corrección y flujo quirúrgico de **Sistema Winners** (`index.html` e `inmersivo.html`). Cualquier modificación futura debe adherirse estrictamente a estas directrices.

---

## 0. REGLAS CRÍTICAS DE CORRECCIÓN (PROHIBICIONES ESTRICTAS)

1. **PROHIBIDO USAR IMÁGENES EXTERNAS DE TECLADOS O PLACEHOLDERS:**
   - Está terminantemente prohibido usar imágenes de Unsplash, teclados o demos genéricos de Aceternity.
   - Todo elemento visual debe utilizar exclusivamente los recursos locales de la carpeta `images/`.

2. **PROHIBIDO EL CARRUSEL MÓVIL:**
   - NO usar carruseles tipo slider o swiper para las imágenes `1`, `2`, `3`, `4`, `5`.

3. **REGLA ESTRICTA DE FONDOS (DESKTOP VS MÓVIL):**
   - **En Desktop (`>= 768px`):** Se mantienen los videos locales (`images/1.mp4` a `images/2.mp4`) en el stage de fondo fullscreen para garantizar el impacto visual cinematográfico en pantallas grandes.
   - **En Móvil (`< 768px`):** **NO** se cargan ni reproducen videos `.mp4` (0 MB de descarga en celulares, ahorrando datos, batería y evitando autobloqueos).
   - En su lugar, se utilizan como **FONDO INMERSIVO (`.m-section-bg` / `.m-bg-img`)** las imágenes locales de `D:\sistemawinners\images`:
     - **Hero / Portada:** `images/1.jpg` (+ Hero Parallax 3D)
     - **Sección 2 (Productos y Servicios):** `images/2.jpg`
     - **Sección 3 (Odómetro & Testimonios):** `images/3.jpg`
     - **Paso 01 (Inscribirte):** `images/4.jpg`
     - **Paso 02 (¿Qué bien necesitas?):** `images/5.jpg`
     - **Paso 03 (Documentos / Formulario):** `images/1.jpg`
     - **Comunidad (PulseHeart):** `images/2.jpg`

4. **REGLA ESTRICTA: CERO EMOJIS EN TODO EL PROYECTO:**
   - **PROHIBIDO** el uso de emojis Unicode (`🚗`, `🏡`, `📈`, `✨`, `❤️`, `✓`, `→`, etc.) en cualquier parte del código, HTML, CSS, JS o textos de WhatsApp.
   - **OBLIGATORIO:** Utilizar vectores **SVG puros, escalables y limpios** para todos los iconos e indicadores.

---

## 1. NUEVO ORDEN Y FLUJO EXACTO DE SECCIONES

1. **SECCIÓN 1: Portada / Hero**
   - Título: *"¿Quieres ser parte del proceso? Sigue nuestros pasos, solo déjate llevar."*
   - **En Móvil:** Efecto **Aceternity Hero Parallax** (inclinación 3D con `perspective: 1000px`, `rotateX(12deg)`, `rotateZ(-6deg)`, `scale(1.08)` y desplazamiento suave con GSAP ScrollTrigger) utilizando como tarjetas visuales exclusivamente las imágenes locales `images/1.jpg` a `images/5.jpg`.

2. **SECCIÓN 2: Productos y Servicios (Multifinanciamiento vs. Autofinanciamiento)**
   - Ubicación: Inmediatamente después del Hero.
   - **Bloque 1 (Dorado #EEAA2B):** SISTEMA MULTIFINANCIAMIENTO
     - Subtítulo: *A través de este sistema te permite obtener:*
     - Íconos SVG dorados:
       - Los productos comunales.
       - Promover tus emprendimientos.
       - Obtener apalancamientos para tus ideas.
       - Participar en otras iniciativas productivas y comerciales.
   - **Bloque 2 (Contraste con borde sutil rojizo):** DIFERENTE A SISTEMA DE AUTOFINANCIAMIENTO
     - Íconos SVG de cruce/alerta:
       - Te ofrecen productos y servicios propios.
       - No diversifican opciones ni jamás impulsan emprendimientos o te dan un espacio para crecer.
   - **Bloque 3 (Cierre de Poder):**
     - Título Brillante (*ShinyText*): `EMPRENDER ES EL CAMINO`
     - Subtítulo: *Seamos socios y empecemos a construir tus proyectos o reactivamos tus ideas.*

3. **SECCIÓN 3: Contador Odometer de Alta Velocidad + Testimonios**
   - **3A: Contador Odometer Vertical (Efecto Slot Machine):**
     - Carriles numéricos `[0,1,2,3,4,5,6,7,8,9,0,...]` con `translateY` rápido y desenfoque `filter: blur(1px)` durante el giro de aceleración.
     - Métricas clave: `+1,500` Emprendimientos Impulsados, `+5,300` Sueños y Bienes Adjudicados, `100%` Apalancamiento Colectivo.
     - Activación sincronizada: En desktop al entrar a la escena 2, y en móvil vía `IntersectionObserver` al llegar a `#m-testimonios`.
   - **3B: Testimonios con Fotos Reales Locales:**
     - **Aceternity Animated Tooltip:** Fila de 5 avatares circulares superpuestos con borde dorado `#EEAA2B` (`celular-plan.jpg`, `hero-slide1.jpg`, `hero-slide2.jpg`, `moto-familia.jpg`, `moto-referidos.jpg`).
     - Al pasar el cursor o hacer tap, emerge un Tooltip flotante con física de resorte mostrando el Nombre del Socio, su Proyecto/Bien adjudicado y etiqueta dorada.
     - **Tarjetas de Reseña Uiverse (`breezy-eagle-39`):** Contenedor Glassmorphism (`rgba(15, 18, 25, 0.65)`, `backdrop-filter: blur(14px)`, borde sutil `#EEAA2B`).
     - **Estrellas Interactivas Uiverse (`clever-elephant-35`):** SVGs dorados `#ffc73a` con escalado y resplandor al interactuar o seleccionar.

4. **SECCIÓN 4: El Proceso en 3 Pasos**
   - **Paso 1: Inscribirte** — Inicio del viaje, 100% digital, sin trámites bancarios ni usura.
   - **Paso 2: ¿Qué bien necesitas?** — Tarjetas interactivas de selección (Vehículo, Inmueble, Proyecto).
   - **Paso 3: Documentos (Formulario Oficial)** — Envío estructurado hacia WhatsApp Oficial (+57 311 7795935).
   - **Comunidad (PulseHeart ReactBits):** Botón con física de resorte `swellOf(t, overshoot)` y **persistencia garantizada en localStorage** (`winners_liked_state` y `winners_likes_count`).

---

## 2. REGLA DE DESPLIEGUE EN PRODUCCIÓN (CLOUDFLARE PAGES)

- `index.html` e `inmersivo.html` deben ser **100% idénticos en todo momento**.
- Todo cambio se compila directamente en el repositorio local y se publica en la rama `main` mediante `git push origin main`.
