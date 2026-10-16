export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.toLowerCase().replace(/\/$/, "");

    // Canonical Redirect: www.sistemawinners.com -> sistemawinners.com
    if (url.hostname.startsWith("www.")) {
      url.hostname = url.hostname.replace(/^www\./, "");
      return Response.redirect(url.toString(), 301);
    }

    // 1. WhatsApp Redirects
    if (pathname === "/wa" || pathname === "/whatsapp") {
      return Response.redirect(
        "https://wa.me/573148691001?text=Hola%20Sistema%20Winners,%20quiero%20mi%20motocicleta%20con%20200.000%20pesos%20y%203%20referidos",
        302
      );
    }

    // 2. Marketing Shortcuts
    if (pathname === "/motos" || pathname === "/moto") {
      return Response.redirect(new URL("/#motocicletas", request.url), 301);
    }
    if (pathname === "/celular" || pathname === "/celulares" || pathname === "/plan70k" || pathname === "/smartphone") {
      return Response.redirect(new URL("/#celulares", request.url), 301);
    }
    if (pathname === "/referidos") {
      return Response.redirect(new URL("/#como-funciona", request.url), 301);
    }
    if (pathname === "/simulador" || pathname === "/membresia") {
      return Response.redirect(new URL("/#simulador", request.url), 301);
    }
    if (pathname === "/asambleas" || pathname === "/asamblea") {
      return Response.redirect(new URL("/resultados-asamblea.html", request.url), 301);
    }
    if (pathname === "/pagos" || pathname === "/pago") {
      return Response.redirect(new URL("/tu-pago-en-linea.html", request.url), 301);
    }
    if (pathname === "/oficina" || pathname === "/socios") {
      return Response.redirect(new URL("/zona-clientes.html", request.url), 301);
    }

    // 3. Google Sitelinks Clean URL Rewrites (serve .html without redirection)
    const sitelinks = [
      "/consulta-devoluciones",
      "/zona-clientes",
      "/tu-pago-en-linea",
      "/devoluciones",
      "/resultados-asamblea"
    ];
    if (sitelinks.includes(pathname)) {
      url.pathname = `${pathname}.html`;
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // 4. Default: Serve Static Assets
    return env.ASSETS.fetch(request);
  }
};
