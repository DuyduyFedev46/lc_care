// Long Chau Care — PWA Service Worker
const CACHE = "lc-care-v17";
const ASSETS = ["/", "/index.html"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // For HTML pages/document navigation, use Network First to ensure new updates are immediate
  if (e.request.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith(".html")) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // For static assets, use Cache First
    e.respondWith(
      caches.match(e.request).then((cached) => {
        return (
          cached ||
          fetch(e.request).then((response) => {
            if (response.status === 200 && url.origin === self.location.origin) {
              const copy = response.clone();
              caches.open(CACHE).then((cache) => cache.put(e.request, copy));
            }
            return response;
          })
        );
      })
    );
  }
});

