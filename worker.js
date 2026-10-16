export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase().replace(/\/$/, "");

    // Health Check Endpoint
    if (pathname === "/api/health") {
      return Response.json({ status: "ok", app: "sistema-winners", v: "2.1", timestamp: new Date().toISOString() });
    }

    // 1. Redirección canónica de www a dominio principal
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.replace(/^www\./, "");
      return Response.redirect(url.toString(), 301);
    }

    // 2. Atajos directos a WhatsApp Oficial (+57 314 869 1001)
    if (pathname === "/wa" || pathname === "/whatsapp") {
      return Response.redirect(
        "https://wa.me/573148691001?text=Hola%20Sistema%20Winners,%20quiero%20informaci%C3%B3n%20sobre%20mi%20afiliaci%C3%B3n%20y%20los%20planes%20disponibles",
        302
      );
    }

    // 3. Atajos de Marketing
    if (pathname === "/motos" || pathname === "/moto") {
      return Response.redirect(new URL("/#motocicletas", request.url), 301);
    }
    if (pathname === "/celular" || pathname === "/celulares" || pathname === "/samsung" || pathname === "/plan70k" || pathname === "/smartphone") {
      return Response.redirect(new URL("/#celulares", request.url), 301);
    }
    if (pathname === "/referidos") {
      return Response.redirect(new URL("/#como-funciona", request.url), 301);
    }
    if (pathname === "/simulador" || pathname === "/membresia") {
      return Response.redirect(new URL("/#simulador", request.url), 301);
    }
    if (pathname === "/contacto" || pathname === "/registro") {
      return Response.redirect(new URL("/#contacto", request.url), 301);
    }

    // 4. Atajos de Gestión y Módulo del Gerente
    if (pathname === "/admin" || pathname === "/gerente" || pathname === "/login") {
      return Response.redirect(new URL("/gerente.html", request.url), 302);
    }

    // 5. Servir archivos estáticos a través de env.ASSETS
    // Cloudflare Assets resuelve automáticamente URLs limpias (ej. /consulta-devoluciones -> consulta-devoluciones.html)
    return env.ASSETS.fetch(request);
  }
};
