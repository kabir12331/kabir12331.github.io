/* Simple service worker - generated for PWABuilder */
const CACHE_NAME = 'rewardmaster-cache-v1';
const toCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(toCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // prefer network, fallback to cache
  event.respondWith(
    fetch(event.request).then(res => {
      if(event.request.method === 'GET') {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      }
      return res;
    }).catch(() => caches.match(event.request).then(response => response || caches.match('/')))
  );
});
