// Service worker do Gerador de Test Patterns: deixa instalar como app e abrir sem internet.
// A pagina vai SEMPRE primeiro a rede (para uma correcao chegar logo, sem esperar pela cache do GitHub Pages) e a cache
// e' so' a rede de seguranca. As fontes do Google ficam em cache na primeira vez; sem elas usa as do sistema.
const VERSAO = "tp-v1";
const CASCA = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png",
               "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSAO).then(c => Promise.all(CASCA.map(u => c.add(new Request(u, { cache: "reload" })).catch(() => {})))));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const pedido = e.request;
  if (pedido.method !== "GET") return;
  const url = new URL(pedido.url);
  const dasFontes = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== self.location.origin && !dasFontes) return;

  if (dasFontes) {                 // fontes: cache primeiro, atualiza em segundo plano
    e.respondWith(caches.open(VERSAO).then(async c => {
      const guardado = await c.match(pedido);
      const daRede = fetch(pedido).then(r => { if (r && (r.ok || r.type === "opaque")) c.put(pedido, r.clone()); return r; }).catch(() => guardado);
      return guardado || daRede;
    }));
    return;
  }
  e.respondWith(                   // o resto: rede primeiro, cache de seguranca
    fetch(pedido).then(r => {
      if (r && r.ok) { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(pedido, copia)); }
      return r;
    }).catch(() => caches.match(pedido).then(r => r || caches.match("./index.html")))
  );
});
