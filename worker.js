export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase().replace(/\/$/, "");

    // Health Check Endpoint
    if (pathname === "/api/health") {
      return Response.json({ status: "ok", app: "sistema-winners", v: "3.0", timestamp: new Date().toISOString() });
    }

    // 1. Redirección canónica: forzar www.sistemawinners.com
    if (url.hostname === "sistemawinners.com") {
      url.hostname = "www.sistemawinners.com";
      return Response.redirect(url.toString(), 301);
    }

    // 2. Servir la página de inicio (index.html) en la raíz
    if (url.pathname === "/" || pathname === "" || pathname === "/index") {
      return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }

    // 3. Atajos directos a WhatsApp Oficial (+57 314 869 1001)
    if (pathname === "/wa" || pathname === "/whatsapp") {
      return Response.redirect(
        "https://wa.me/573148691001?text=Hola%20Sistema%20Winners,%20quiero%20informaci%C3%B3n%20sobre%20mi%20afiliaci%C3%B3n%20y%20los%20planes%20disponibles",
        302
      );
    }

    // 4. Redirecciones limpias y modulares hacia vistas desacopladas
    if (pathname === "/simulador") {
      return Response.redirect(new URL("/cotizador.html", request.url), 301);
    }
    if (pathname === "/ubicaciones") {
      return Response.redirect(new URL("/contacto.html", request.url), 301);
    }
    if (pathname === "/portal-clientes" || pathname === "/zona-socios") {
      return Response.redirect(new URL("/zona-clientes.html", request.url), 301);
    }
    if (pathname === "/motos" || pathname === "/moto" || pathname === "/celular" || pathname === "/celulares" || pathname === "/samsung" || pathname === "/plan70k" || pathname === "/smartphone") {
      return Response.redirect(new URL("/productos.html", request.url), 301);
    }
    if (pathname === "/referidos") {
      return Response.redirect(new URL("/index.html#paso-a-paso", request.url), 301);
    }

    // 5. Atajos de Gestión y Módulo del Gerente
    if (pathname === "/admin" || pathname === "/gerente" || pathname === "/login") {
      return Response.redirect(new URL("/zona-clientes.html", request.url), 302);
    }

    // 6. Soporte para URLs limpias sin extensión .html
    const cleanPages = [
      "cotizador",
      "productos",
      "contacto",
      "consulta-devoluciones",
      "zona-clientes",
      "tu-pago-en-linea",
      "devoluciones",
      "resultados-asamblea",
      "politicas"
    ];
    const cleanName = pathname.replace(/^\//, "");
    if (cleanPages.includes(cleanName)) {
      const assetUrl = new URL(`/${cleanName}.html`, request.url);
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    // 7. Servir archivos estáticos a través de env.ASSETS
    return env.ASSETS.fetch(request);
  }
};
