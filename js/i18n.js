/**
 * SISTEMA WINNERS — MÓDULO DE INTERNACIONALIZACIÓN (i18n)
 * Soporte Bilingüe Español (ES) / Inglés (EN)
 * Cambio instantáneo en cliente con persistencia en localStorage.
 */
(function () {
  'use strict';

  var translations = {
    es: {
      meta: {
        title: "Sistema Winners | Multifinanciamiento y Socios Inversionistas",
        description: "10 años de trayectoria en el Área Andina y Latinoamérica. Sistema de Multifinanciamiento para vehículos, tecnología, bienestar y emprendimiento. Abre tu cuenta de Socio Inversionista."
      },
      topbar: {
        andina: "10 AÑOS EN EL ÁREA ANDINA Y LATINOAMÉRICA",
        horario: "ATENCIÓN A SOCIOS INVERSIONISTAS: 08:00 A 18:00"
      },
      nav: {
        subtitulo_logo: "Multifinanciamiento & Socios",
        quienes_somos: "Quiénes Somos",
        multifinanciamiento: "Multifinanciamiento",
        oferta: "Oferta y Marcas",
        sistema: "El Sistema",
        proceso_menu: "El Proceso",
        pasos: "Los 3 Pasos",
        proceso: "El Proceso (3 Pasos)",
        testimonios: "Testimonios",
        cta: "Abre tu Cuenta"
      },
      hero: {
        badge: "Sistema Winners &bull; 10 Años de Solidez",
        title_1: "Los sueños",
        title_2: "SI SE CUMPLEN",
        title_3: "solo déjate",
        title_4: "LLEVAR!!",
        firma: "&ldquo; SOCIOS INVERSIONISTAS &rdquo;",
        subtitulo: "¿Quieres ser parte del proceso? Sigue nuestros pasos, solo déjate llevar.",
        cta: "¡Quiero Ser Socio Ahora!",
        m1_unit: "Años",
        m1_label: "Trayectoria Andina",
        m2_label: "Cuentas Corporativas Legales",
        m3_unit: "Pasos",
        m3_label: "Proceso Simple",
        m4_label: "Metas Cumplidas"
      },
      multi: {
        pregunta: "¿Qué es y cómo funciona el Sistema Multifinanciamiento de Winners?",
        tag1: "10 Años de Respaldo",
        tag2: "Planificación Programada",
        tag3: "Área Andina y Latinoamérica",
        titulo_dorado: "PRODUCTOS Y SERVICIOS:<br>Mucho más que una compra programada",
        parrafo: "Si estás pensando en adquirir un vehículo, equipamiento tecnológico, bienestar o impulsar tu propio negocio, el <strong>Sistema Multifinanciamiento</strong> se convierte en la mejor opción para lograrlo a plazo, ya que <strong>te permitirá ahorrar dinero, apalancar tus ideas productivas y crecer en comunidad con cuotas justas y sin la rigidez de una entidad financiera tradicional.</strong>",
        col1_badge: "Nuestro Modelo Exclusivo",
        col1_title: "SISTEMA MULTIFINANCIAMIENTO",
        col1_sub: "A través de este sistema te permite obtener:",
        col1_i1: "<strong>Los productos comunales.</strong>",
        col1_i2: "<strong>Promover tus emprendimientos.</strong>",
        col1_i3: "<strong>Obtener apalancamientos para tus ideas.</strong>",
        col1_i4: "<strong>Participar en otras iniciativas productivas y comerciales.</strong>",
        col2_badge: "Esquema Tradicional Limitado",
        col2_title: "DIFERENTE A SISTEMA DE AUTOFINANCIAMIENTO",
        col2_sub: "Limitaciones de los sistemas convencionales:",
        col2_i1: "<strong>Te ofrecen únicamente productos y servicios propios.</strong>",
        col2_i2: "<strong>No diversifican opciones ni jamás impulsan emprendimientos o te dan un espacio para crecer.</strong>",
        cierre_title: "EMPRENDER ES EL CAMINO",
        cierre_sub: "&ldquo;Seamos socios y empecemos a construir tus proyectos o reactivamos tus ideas.&rdquo;",
        cierre_btn: "Iniciar mi Proceso como Socio"
      },
      oferta: {
        titulo: "Nuestra Oferta Integral de Productos y Servicios",
        subtitulo: "Trabajamos con productos tangibles y servicios reales que satisfacen necesidades fundamentales y elevan tu calidad de vida, respaldados por marcas líderes a nivel mundial.",
        col1_title: "Compra de Bienes Muebles y Movilidad",
        col1_i1: "Carros y Motos (<em>Honda</em>).",
        col1_i2: "Computadoras (<em>HP</em>) y Smartphones (<em>Samsung</em>).",
        col1_i3: "Electrodomésticos y línea hogar.",
        col2_title: "Diversificación de Dinero y Finanzas",
        col2_i1: "Generación de ingresos fijos o extras, más bonos e incentivos.",
        col2_i2: "Apoyo y capital para tu emprendimiento.",
        col2_i3: "Participación como <strong>Socio en las nuevas Fábricas Comunales</strong>.",
        col2_i4: "Opciones de financiamiento y créditos directos.",
        col3_title: "Industria del Bienestar y Estilo de Vida",
        col3_i1: "Financiamiento programado para <strong>viajes de distracción o laborales</strong>.",
        col3_i2: "Apoyo financiero para <strong>cirugías estéticas y tratamientos</strong> (<em>BBS-Esthetique</em>) que fortalecen tu seguridad e imagen personal.",
        col4_title: "Alimentos Básicos y Economía Familiar",
        col4_i1: "Abastecimiento de canasta básica de alimentos (<em>Ecu-Andino</em>) y suplementos alimenticios de primera calidad sin sobreprecios."
      },
      compania: {
        franja_title: "Nuestra Compañía",
        franja_sub: "Legalidad, Trayectoria y Compromiso Social",
        b1_t: "10 Años de Presencia Internacional",
        b1_d: "Sistema Winners cuenta con una década de trayectoria ininterrumpida operando en toda el <strong>Área Andina (Ecuador, Colombia, Perú) con extensión a Latinoamérica</strong>.",
        b2_t: "100% Legalidad y Transparencia Bancaria",
        b2_d: "Somos una empresa legalmente constituida en cada país donde operamos, con representante legal propio, declaración tributaria al día y operación exclusiva mediante <strong>cuentas bancarias corporativas autorizadas</strong> (jamás utilizamos paraísos fiscales ni esquemas informales).",
        b3_t: "Crecimiento Serio y Sostenible",
        b3_d: "Construimos una relación asertiva y de largo plazo entre la empresa y nuestros afiliados, fomentando liderazgo, educación financiera y resultados reales.",
        mision_t: "Misión",
        mision_d: "Promover la cultura del ahorro programado, el multifinanciamiento y el emprendimiento cooperativo, facilitando a nuestros socios el acceso a vehículos, tecnología, bienestar e industria libre de intereses abusivos.",
        vision_t: "Visión",
        vision_d: "Consolidarnos en toda Latinoamérica como el ecosistema líder de economía colaborativa y multifinanciamiento empresarial que transforma las ideas de nuestros socios en patrimonio real.",
        valores_t: "Valores Corporativos",
        v_servicio: "Servicio",
        v_etica: "Ética",
        v_honestidad: "Honestidad",
        v_integridad: "Integridad",
        v_respeto: "Respeto",
        v_liderazgo: "Liderazgo",
        social_t: "Aporte Social y Economía Naranja: <span class=\"text-[#C59B27]\">&ldquo;Todos se Benefician&rdquo;</span>",
        social_sub: "Iniciativas comunitarias oficiales de Sistema Winners que devuelven el valor a la sociedad.",
        social_c1_t: "Tiendas Comunitarias DOY-MAS",
        social_c1_d: "Impulso al comercio solidario y abastecimiento justo.",
        social_c2_t: "Academia Deportiva SOCIO WINNERS",
        social_c2_d: "Apoyo activo al deporte barrial, juventud y actividades lúdicas.",
        social_c3_t: "Desarrollo de Industrias y Empresas Comunales",
        social_c3_d: "Apalancamos propuestas productivas nacidas directamente de la comunidad."
      },
      proceso: {
        banner_1: "Asambleas y Eventos Públicos",
        banner_2: "Acompañamiento Paso a Paso",
        banner_3: "Adjudicación y Apalancamiento",
        titulo: "¡Conéctate a Nuestro Proceso en<br class=\"hidden md:block\"> 3 Simples Pasos!",
        subtitulo: "Sin trámites burocráticos engorrosos ni requisitos bancarios inaccesibles. Un sistema transparente diseñado por y para la comunidad.",
        p1_badge: "Paso Uno",
        p1_t: "¿Qué tienes que hacer? Inscribirte",
        p1_d: "Regístrate como Socio Inversionista y asegura tu posición en el sistema.",
        p2_badge: "Paso Dos",
        p2_t: "¿Qué bien o servicio necesitas?",
        p2_d: "Elige entre Vehículo (Carro/Moto), Tecnología, Emprendimiento/Fábricas Comunales o Bienestar/Viajes.",
        p3_badge: "Paso Tres",
        p3_t: "Documentos",
        p3_d: "Completa tus datos básicos en el formulario oficial a continuación para recibir asesoría inmediata.",
        callout_t: "Tu meta está a 3 pasos de distancia",
        callout_d: "Únete hoy a la comunidad de socios y comienza a construir tu patrimonio en comunidad.",
        callout_btn: "¡Inicia tu Proceso Ahora! &rarr;"
      },
      testimonios: {
        titulo: "Resultados que hablan por nosotros",
        m1_d: "Años de Trayectoria<br>en el Área Andina",
        m2_d: "Emprendimientos y<br>Proyectos Impulsados",
        m3_d: "Productos, Vehículos y<br>Servicios Adjudicados",
        avatars_t: "Socios reales, historias reales",
        avatars_sub: "Pasa el cursor o toca una foto para conocerlos.",
        tip_carlos: "&ldquo;Adjudiqué mi moto Honda para trabajar. El acompañamiento fue paso a paso.&rdquo;",
        tip_maria: "&ldquo;Con el apalancamiento abrí mi emprendimiento. Hoy ya tengo un punto de venta.&rdquo;",
        tip_andres: "&ldquo;Lidero eventos en mi ciudad. Las asambleas son abiertas y transparentes.&rdquo;",
        tip_valentina: "&ldquo;Mi familia logró su vehículo sin intereses bancarios ni rigidez del sistema tradicional.&rdquo;",
        tip_jorge: "&ldquo;Participé en las tiendas DOY-MAS y desde entonces todo es comunidad real.&rdquo;",
        quote_1: "&ldquo;Entré con cuotas justas y sin la rigidez de un banco. Hoy manejo un carro propio gracias al multifinanciamiento.&rdquo;",
        quote_2: "&ldquo;Recibí mi crédito productivo y mi smartphone Samsung en el mismo ciclo. El sistema me dio la espada para emprender.&rdquo;",
        quote_3: "&ldquo;Además de mi moto de trabajo, participé en la tienda comunal DOY-MAS. Todo es transparente y legal desde el día uno.&rdquo;"
      },
      form: {
        region: "Área Andina (ES)",
        heading: "Abre tu cuenta real de Socio",
        subheading: "Paso 3 (Documentos): Empodérate con el sistema de multifinanciamiento líder de la región.",
        lbl_nombre: "Primer nombre",
        ph_nombre: "Introduce tu nombre",
        lbl_apellido: "Apellido",
        ph_apellido: "Introduce tu apellido",
        lbl_doc: "Cédula / RUC / Documento de Identidad",
        ph_doc: "Introduce tu número de documento",
        lbl_celular: "Celular / WhatsApp",
        ph_celular: "Introduce tu número con código de país",
        lbl_email: "Email",
        ph_email: "Introduce tu email",
        lbl_bien: "¿Qué bien, producto o proyecto necesitas? (Paso 2)",
        opt_default: "Selecciona una opción",
        opt_vehiculo: "Vehículo (Carro o Moto Honda / Multimarca)",
        opt_tecnologia: "Tecnología y Electrodomésticos (Samsung / HP)",
        opt_emprendimiento: "Impulsar mi Emprendimiento / Crédito y Capital",
        opt_fabricas: "Ser Socio en Fábricas Comunales y Tiendas DOY-MAS",
        opt_bienestar: "Industria del Bienestar (Viajes o Cirugía Estética BBS-Esthetique)",
        opt_alimentos: "Canasta Básica y Suplementos (Ecu-Andino)",
        btn_submit: "Solicitar Asesoría e Iniciar Proceso",
        wa_pre: "¿Necesitas una respuesta inmediata?",
        wa_btn: "Escríbenos por WhatsApp Ahora"
      },
      footer: {
        desc: "10 años impulsando el multifinanciamiento, la economía naranja y el progreso colectivo en toda el Área Andina y Latinoamérica.",
        follow: "Síguenos",
        div_title: "Nuestras Divisiones",
        div_1: "Bienes Muebles y Vehículos",
        div_2: "Fábricas Comunales",
        div_3: "Tiendas DOY-MAS",
        div_4: "Academia Deportiva Socio Winners",
        div_5: "Bienestar y Estética",
        contact_title: "Legalidad y Contacto",
        contact_sub: "Cuentas corporativas autorizadas y representación legal en cada país.",
        hotline: "Línea de Socios:",
        rights: "Sistema Winners. Todos los derechos reservados."
      },
      bottom_nav: {
        inicio: "Inicio",
        bienes: "Bienes",
        pasos: "3 Pasos",
        whatsapp: "WhatsApp",
        cta: "Abre Cuenta"
      }
    },

    en: {
      meta: {
        title: "Sistema Winners | Multifinancing & Investing Partners",
        description: "10 years of solid track record across the Andean Region and Latin America. Multifinancing system for vehicles, technology, wellness, and entrepreneurship. Open your Investing Partner account."
      },
      topbar: {
        andina: "10 YEARS ACROSS THE ANDEAN REGION & LATIN AMERICA",
        horario: "INVESTING PARTNER SUPPORT: 08:00 TO 18:00"
      },
      nav: {
        subtitulo_logo: "Multifinancing & Partners",
        quienes_somos: "About Us",
        multifinanciamiento: "Multifinancing",
        oferta: "Offer & Brands",
        sistema: "The System",
        proceso_menu: "The Process",
        pasos: "The 3 Steps",
        proceso: "The Process (3 Steps)",
        testimonios: "Testimonials",
        cta: "Open Account"
      },
      hero: {
        badge: "Sistema Winners &bull; 10 Years of Proven Strength",
        title_1: "Dreams",
        title_2: "DO COME TRUE",
        title_3: "just let yourself",
        title_4: "BE GUIDED!!",
        firma: "&ldquo; INVESTING PARTNERS &rdquo;",
        subtitulo: "Want to be part of the journey? Follow our steps, just let yourself be guided.",
        cta: "Become a Partner Now!",
        m1_unit: "Years",
        m1_label: "Andean Track Record",
        m2_label: "Authorized Corporate Accounts",
        m3_unit: "Steps",
        m3_label: "Simple Process",
        m4_label: "Goals Achieved"
      },
      multi: {
        pregunta: "What is and how does the Winners Multifinancing System work?",
        tag1: "10 Years of Solid Backing",
        tag2: "Scheduled Planning",
        tag3: "Andean Region & Latin America",
        titulo_dorado: "PRODUCTS AND SERVICES:<br>Much more than a scheduled purchase",
        parrafo: "If you are planning to acquire a vehicle, tech equipment, wellness, or boost your own business, the <strong>Multifinancing System</strong> is your premier option over time, allowing you to <strong>save money, leverage your productive ideas, and grow as a community with fair installments without traditional banking rigidity.</strong>",
        col1_badge: "Our Exclusive Model",
        col1_title: "MULTIFINANCING SYSTEM",
        col1_sub: "Through this system you can access:",
        col1_i1: "<strong>Communal factory products.</strong>",
        col1_i2: "<strong>Promote your own business ventures.</strong>",
        col1_i3: "<strong>Secure funding and leverage for your ideas.</strong>",
        col1_i4: "<strong>Participate in other productive and commercial initiatives.</strong>",
        col2_badge: "Limited Traditional Scheme",
        col2_title: "DIFFERENT FROM AUTO-FINANCING SYSTEMS",
        col2_sub: "Conventional system limitations:",
        col2_i1: "<strong>They only offer their own restricted products and services.</strong>",
        col2_i2: "<strong>They do not diversify options, never fund your ventures, nor give you room to grow.</strong>",
        cierre_title: "ENTREPRENEURSHIP IS THE WAY",
        cierre_sub: "&ldquo;Let's partner up and start building your projects or revitalize your ideas.&rdquo;",
        cierre_btn: "Start My Journey as a Partner"
      },
      oferta: {
        titulo: "Our Comprehensive Offer of Products & Services",
        subtitulo: "We deliver tangible products and real services fulfilling essential needs and elevating your quality of life, backed by leading global brands.",
        col1_title: "Movable Assets & Mobility Acquisition",
        col1_i1: "Cars & Motorcycles (<em>Honda</em>).",
        col1_i2: "Computers (<em>HP</em>) & Smartphones (<em>Samsung</em>).",
        col1_i3: "Home appliances & home living line.",
        col2_title: "Wealth Diversification & Financial Growth",
        col2_i1: "Fixed or extra income generation, plus bonuses & performance incentives.",
        col2_i2: "Working capital and backing for your business venture.",
        col2_i3: "Ownership participation as a <strong>Partner in new Communal Factories</strong>.",
        col2_i4: "Direct financing options and community credit lines.",
        col3_title: "Wellness & Lifestyle Industry",
        col3_i1: "Scheduled financing for <strong>vacation trips or business travel</strong>.",
        col3_i2: "Financial support for <strong>aesthetic surgeries & cosmetic treatments</strong> (<em>BBS-Esthetique</em>) boosting your confidence and personal image.",
        col4_title: "Essential Groceries & Family Economy",
        col4_i1: "Essential grocery basket supply (<em>Ecu-Andino</em>) and premium-grade nutritional supplements without markups."
      },
      compania: {
        franja_title: "Our Company",
        franja_sub: "Legality, Proven Track Record & Social Impact",
        b1_t: "10 Years of International Presence",
        b1_d: "Sistema Winners features a decade of continuous operations across the <strong>Andean Region (Ecuador, Colombia, Peru) with active expansion throughout Latin America</strong>.",
        b2_t: "100% Legal Standing & Banking Transparency",
        b2_d: "We are a legally registered corporation in every operating country, with local legal representatives, fully compliant tax filings, and exclusive operations through <strong>authorized corporate bank accounts</strong> (never tax havens or informal mechanisms).",
        b3_t: "Solid & Sustainable Growth",
        b3_d: "We foster an assertive, long-term partnership between our enterprise and affiliates, empowering leadership, financial education, and tangible results.",
        mision_t: "Mission",
        mision_d: "Promote the culture of scheduled savings, multifinancing, and cooperative entrepreneurship, providing our partners access to vehicles, technology, wellness, and industry free from abusive interest rates.",
        vision_t: "Vision",
        vision_d: "Consolidate ourselves across Latin America as the leading collaborative economy and corporate multifinancing ecosystem that transforms partners' ideas into real wealth.",
        valores_t: "Corporate Values",
        v_servicio: "Service",
        v_etica: "Ethics",
        v_honestidad: "Honesty",
        v_integridad: "Integrity",
        v_respeto: "Respect",
        v_liderazgo: "Leadership",
        social_t: "Social Impact & Orange Economy: <span class=\"text-[#C59B27]\">&ldquo;Everyone Benefits&rdquo;</span>",
        social_sub: "Official community initiatives of Sistema Winners that return value to society.",
        social_c1_t: "DOY-MAS Community Stores",
        social_c1_d: "Promoting fair-trade commerce and ethical local food supplies.",
        social_c2_t: "SOCIO WINNERS Sports Academy",
        social_c2_d: "Active support for grassroots sports, youth development, and wellness.",
        social_c3_t: "Communal Manufacturing & Enterprise Development",
        social_c3_d: "Funding and scaling productive business ideas originating directly from the community."
      },
      proceso: {
        banner_1: "Public Assemblies & Community Events",
        banner_2: "Step-by-Step Dedicated Guidance",
        banner_3: "Asset Allocation & Leverage",
        titulo: "Connect with Our Process in<br class=\"hidden md:block\"> 3 Simple Steps!",
        subtitulo: "No cumbersome bureaucratic red tape or unattainable bank requirements. A transparent system engineered by and for the community.",
        p1_badge: "Step One",
        p1_t: "What do you do? Register",
        p1_d: "Enroll as an Investing Partner and secure your position in the system.",
        p2_badge: "Step Two",
        p2_t: "Which asset or service do you need?",
        p2_d: "Choose between Vehicles (Car/Bike), Tech, Entrepreneurship/Communal Factories, or Wellness/Travel.",
        p3_badge: "Step Three",
        p3_t: "Documentation",
        p3_d: "Fill in your basic information in the official form below to receive immediate personalized advisory.",
        callout_t: "Your goal is only 3 steps away",
        callout_d: "Join our partner community today and start building wealth collaboratively.",
        callout_btn: "Start Your Process Now! &rarr;"
      },
      testimonios: {
        titulo: "Proven Results That Speak for Themselves",
        m1_d: "Years of Track Record<br>in the Andean Region",
        m2_d: "Enterprises &<br>Ventures Funded",
        m3_d: "Vehicles, Goods &<br>Services Awarded",
        avatars_t: "Real Partners, Real Success Stories",
        avatars_sub: "Hover or tap a photo to discover their stories.",
        tip_carlos: "&ldquo;I received my Honda motorcycle for work. The support was step by step.&rdquo;",
        tip_maria: "&ldquo;With the funding, I started my venture. Today I already run my own storefront.&rdquo;",
        tip_andres: "&ldquo;I lead events in my city. Assemblies are open, welcoming, and transparent.&rdquo;",
        tip_valentina: "&ldquo;My family secured our car without bank interest rates or traditional system rigidity.&rdquo;",
        tip_jorge: "&ldquo;I joined the DOY-MAS stores initiative and ever since, it has been true collaborative community.&rdquo;",
        quote_1: "&ldquo;I started with fair installments and none of the banking rigidity. Today I drive my own car thanks to multifinancing.&rdquo;",
        quote_2: "&ldquo;I received my business credit and Samsung smartphone in the same cycle. The system gave me the leverage to build.&rdquo;",
        quote_3: "&ldquo;Besides my work motorcycle, I joined the DOY-MAS community store. Everything is transparent and legal from day one.&rdquo;"
      },
      form: {
        region: "Andean Region (EN)",
        heading: "Open Your Official Partner Account",
        subheading: "Step 3 (Documentation): Empower yourself with the region's leading multifinancing system.",
        lbl_nombre: "First Name",
        ph_nombre: "Enter your first name",
        lbl_apellido: "Last Name",
        ph_apellido: "Enter your last name",
        lbl_doc: "National ID / Tax ID / Passport",
        ph_doc: "Enter your identification number",
        lbl_celular: "Phone / WhatsApp",
        ph_celular: "Enter your number with country code",
        lbl_email: "Email",
        ph_email: "Enter your email address",
        lbl_bien: "What asset, product, or project do you need? (Step 2)",
        opt_default: "Select an option",
        opt_vehiculo: "Vehicle (Car or Honda / Multi-brand Motorcycle)",
        opt_tecnologia: "Technology & Home Appliances (Samsung / HP)",
        opt_emprendimiento: "Scale My Venture / Growth Credit & Working Capital",
        opt_fabricas: "Partner in Communal Factories & DOY-MAS Stores",
        opt_bienestar: "Wellness Industry (Travel or BBS-Esthetique Cosmetic Surgery)",
        opt_alimentos: "Essential Grocery Basket & Supplements (Ecu-Andino)",
        btn_submit: "Request Advisory & Start Process",
        wa_pre: "Need an immediate answer?",
        wa_btn: "Chat with Us on WhatsApp Now"
      },
      footer: {
        desc: "10 years promoting multifinancing, collaborative economy, and collective progress throughout the Andean Region and Latin America.",
        follow: "Follow Us",
        div_title: "Our Divisions",
        div_1: "Movable Assets & Vehicles",
        div_2: "Communal Manufacturing Hubs",
        div_3: "DOY-MAS Stores",
        div_4: "Socio Winners Sports Academy",
        div_5: "Wellness & Aesthetics",
        contact_title: "Legal Standing & Contact",
        contact_sub: "Authorized corporate accounts and legal representation in each country.",
        hotline: "Partner Hotline:",
        rights: "Sistema Winners. All rights reserved."
      },
      bottom_nav: {
        inicio: "Home",
        bienes: "Assets",
        pasos: "3 Steps",
        whatsapp: "WhatsApp",
        cta: "Join Now"
      }
    }
  };

  /**
   * Obtiene el valor traducido navegando por la clave de puntos ("hero.title_1")
   */
  function getProp(obj, path) {
    if (!obj || !path) return null;
    var parts = path.split('.');
    var curr = obj;
    for (var i = 0; i < parts.length; i++) {
      if (curr[parts[i]] !== undefined) {
        curr = curr[parts[i]];
      } else {
        return null;
      }
    }
    return curr;
  }

  /**
   * Aplica un idioma determinado al documento
   */
  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'es';
    var dict = translations[lang];

    // 1. Atributo lang en html
    document.documentElement.lang = lang;

    // 2. Metadatos SEO
    if (dict.meta) {
      if (dict.meta.title) document.title = dict.meta.title;
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && dict.meta.description) {
        metaDesc.setAttribute('content', dict.meta.description);
      }
    }

    // 3. Elementos con data-i18n
    var transEls = document.querySelectorAll('[data-i18n]');
    Array.prototype.forEach.call(transEls, function (el) {
      var key = el.getAttribute('data-i18n');
      var val = getProp(dict, key);
      if (val !== null) {
        el.innerHTML = val;
      }
    });

    // 4. Placeholders con data-i18n-placeholder
    var phEls = document.querySelectorAll('[data-i18n-placeholder]');
    Array.prototype.forEach.call(phEls, function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = getProp(dict, key);
      if (val !== null) {
        el.setAttribute('placeholder', val);
      }
    });

    // 5. Actualizar estado visual de los botones del selector
    var btns = document.querySelectorAll('.lang-btn');
    Array.prototype.forEach.call(btns, function (btn) {
      var btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active', 'text-[#EEAA2B]');
        btn.classList.remove('text-white/70');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active', 'text-[#EEAA2B]');
        btn.classList.add('text-white/70');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // 6. Persistir en localStorage
    try {
      localStorage.setItem('winners_lang', lang);
    } catch (e) {}
  }

  /**
   * Inicialización al cargar la página
   */
  function initI18n() {
    var savedLang = 'es';
    try {
      savedLang = localStorage.getItem('winners_lang') || 'es';
    } catch (e) {}

    // Delegación de eventos para clicks en botones de idioma
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.lang-btn') : null;
      if (btn) {
        e.preventDefault();
        var targetLang = btn.getAttribute('data-lang');
        if (targetLang) {
          applyLanguage(targetLang);
        }
      }
    });

    // Aplicar el idioma inicial (si es 'en' actualiza textos; si es 'es' sincroniza estados)
    if (savedLang === 'en') {
      applyLanguage('en');
    } else {
      applyLanguage('es');
    }
  }

  // Exponer inmediatamente para clicks directos (onclick)
  window.setLanguage = applyLanguage;
  window.WinnersI18n = {
    applyLanguage: applyLanguage,
    translations: translations
  };

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
  } else {
    initI18n();
  }
})();
