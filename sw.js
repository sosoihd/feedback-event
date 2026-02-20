const CACHE_NAME = 'feedback-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Install: cache les fichiers puis prend le contrôle immédiatement
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: supprime les anciens caches et prend le contrôle des pages ouvertes
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: stratégie "network first"
// Essaie toujours le réseau en premier, met à jour le cache,
// et ne sert le cache que si le réseau est indisponible (hors ligne)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Met à jour le cache avec la nouvelle version
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // Hors ligne : sert depuis le cache
        return caches.match(e.request);
      })
  );
});
