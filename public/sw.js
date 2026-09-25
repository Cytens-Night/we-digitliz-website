// A basic pass-through service worker to satisfy PWA install requirements.
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Pass through all requests to network
  e.respondWith(fetch(e.request));
});
