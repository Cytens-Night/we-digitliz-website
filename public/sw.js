// A basic pass-through service worker to satisfy PWA install requirements.
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Empty fetch handler to satisfy PWA installability criteria
  // without interfering with the browser's default network behavior
  // and avoiding unhandled promise rejections on network errors.
});
