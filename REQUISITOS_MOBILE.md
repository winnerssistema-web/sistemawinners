# Especificaciones y Requisitos Técnicos - Sistema Winners (Versión Móvil)

Este documento contiene la especificación obligatoria y reglas de diseño para la versión móvil de **Sistema Winners** (`inmersivo.html` e `index.html`). Cualquier modificación futura debe adherirse estrictamente a estas directrices.

---

## 1. Independencia Absoluta: Móvil (`≤ 900px`) vs. Escritorio (`> 900px`)

1. **Escritorio (`> 900px`)**:
   - Experiencia de deck fullscreen cinemático por escenas fijas con videos de fondo (`1.mp4`, `2.mp4`), control de scroll vertical por rueda/teclas y cambio suave entre pasos.
2. **Móvil (`≤ 900px`)**:
   - Experiencia independiente, táctil, compacta, fluida y 100% responsiva con scroll nativo optimizado.
   - **REGLA ESTRICTA - CERO VIDEOS**: Está **prohibido** reproducir o cargar videos en la versión móvil para evitar consumo innecesario de batería, ancho de banda móvil, retrasos de carga y políticas de autobloqueo de reproducción en navegadores móviles (iOS Safari, Android Chrome).

---

## 2. Asignación de Fondos Inmersivos con Imágenes Numeradas (1 a 5)

Las imágenes ubicadas en `images/` están asignadas como **fondos inmersivos de cobertura completa** (`.m-section-bg` con `.m-bg-img` y overlay oscuro degradado) para cada sección móvil:

| Sección Móvil | Imagen de Fondo Asignada | Concepto Visual |
| :--- | :--- | :--- |
| **Hero / Apertura Móvil** | `images/1.jpg` | Pareja en convertible clásico en carretera abierta (libertad, movilidad, meta alcanzada). |
| **Paso 01: Inscríbete (Inicio del Viaje)** | `images/2.jpg` | Amanecer dorado y visión de futuro (visión compartida, planificación inteligente). |
| **Paso 02: Tu Bien (Selección de Activo)** | `images/3.jpg` | Paisaje al amanecer sobre campo fértil (patrimonio seguro, hogar, bases sólidas). |
| **Paso 03: Documentos (Formulario Oficial)** | `images/4.jpg` | Martín pescador en pleno vuelo con agilidad (precisión, transparencia, sin demoras). |
| **Comunidad & Me Gusta (PulseHeart)** | `images/5.jpg` | Noche estrellada sobre montañas con fogata (comunidad cálida, libertad colectiva). |

Cada fondo cuenta con un overlay en degradado cinemático (`rgba(5, 7, 12, 0.75)` a `rgba(5, 7, 12, 0.96)`) garantizando legibilidad total del texto y un sutil efecto parallax al hacer scroll.

---

## 3. Regla Estricta: CERO EMOJIS en Todo el Proyecto

- **PROHIBIDO** el uso de emojis Unicode (por ejemplo: `🚗`, `🏡`, `📈`, `✨`, `❤️`, `✓`, `→`, `📌`, `👤`, `📱`, etc.) en cualquier parte del HTML, CSS, JavaScript o textos de WhatsApp.
- **OBLIGATORIO**: Todo icono o indicador debe ser un vector **SVG limpio, escalable y estilizado** con propiedades `fill`, `stroke`, `stroke-width` y `vector-effect="non-scaling-stroke"`.
- Los checkmarks deben ser polilíneas SVG (`<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`).
- Las flechas de acción deben ser líneas y polilíneas SVG (`<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>`).

---

## 4. Efectos Modernos de Referencia Implementados

### A. Aceternity UI - Hero Parallax (`https://ui.aceternity.com/components/hero-parallax`)
- Estructura 3D inclinada con perspectiva (`perspective: 1000px`, `transform: rotateX(15deg) rotateZ(-10deg)`).
- Filas de tarjetas de activos y beneficios que se desplazan horizontalmente en direcciones opuestas en respuesta al scroll del usuario mediante **GSAP ScrollTrigger** (`scrub: 0.8`).
- Cada tarjeta contiene fotografía, overlay de cristal esmerilado, etiquetas con iconos SVG y tipografía premium.

### B. Aceternity UI - Macbook Scroll (`https://ui.aceternity.com/components/macbook-scroll`)
- Mockup 3D realista de una laptop MacBook integrada en la sección móvil (Paso 01 / Demostración Digital):
  - **Tapa / Pantalla (Lid)** con muesca (notch), bisel estilizado, reflejo de cristal y captura de la plataforma digital en tiempo real (`images/celular-plan.jpg`).
  - **Base / Teclado** con chasis de aluminio oscuro, distribución detallada de teclas, barra espaciadora, trackpad táctil y resplandor ambiental.
  - **Badge SVG** con rotación `-12deg` (emblema de verificación e insignia oficial).
  - **Animación con ScrollTrigger**: Al scrollear, la tapa de la MacBook se abre/rota en 3D (`rotateX`) y escala suavemente en pantalla.

### C. ReactBits - Micro-Interacción PulseHeart (`https://reactbits.dev/micro/pulse-heart`)
- Botón interactivo con física hiperrealista:
  - Función de amortiguación con retroceso `swellOf(t, overshoot)` y curva cúbica `back(k, c)`.
  - Icono SVG de corazón con relleno reactivo y animación de latido (`beat: 3%`, `duration: 560ms`).
  - Contador numérico con animación de carrete rodante (`roll digit`).
  - Respuesta háptica con `navigator.vibrate(18)` en dispositivos compatibles.
- **PERSISTENCIA OBLIGATORIA (localStorage)**:
  - La clave `winners_liked_state` almacena el estado booleano (`true` o `false`).
  - La clave `winners_likes_count` almacena el contador numérico actualizado.
  - Al recargar la página o volver a entrar, el botón recupera inmediatamente el estado y número guardados del usuario.

---

## 5. Formulario y WhatsApp Oficial

- El número oficial de contacto y adjudicación es: **`+57 311 7795935`** (`573117795935`).
- El formulario valida en tiempo real los campos:
  1. Bien Seleccionado (`Vehículo (Auto / Moto)`, `Inmueble / Hogar`, `Proyecto / Capital Planificado`).
  2. Nombre Completo.
  3. Cédula / Documento de Identidad.
  4. WhatsApp / Teléfono.
  5. Ciudad.
  6. Correo Electrónico.
- El mensaje generado para WhatsApp utiliza formato limpio con viñetas asterisco (`*`) **sin emojis**.

---

## 6. Sincronización de Archivos para Cloudflare Pages

- Los archivos `index.html` e `inmersivo.html` deben mantenerse **100% idénticos** para garantizar consistencia total sin importar la ruta de entrada del usuario en el CDN de Cloudflare.
