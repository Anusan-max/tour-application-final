const cacheName = 'TourApp-v1';
const staticAssets = [
  './',
  './index.html',
  'accommodation.html',
  'attraction.html',
  'transport.html',
  'design1.html',
  'design2.html',
  'contactus.html',


];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const request = e.request;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(request));
  } else {
    e.respondWith(networkAndCache(request));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  return cached || fetch(request);
}

async function networkAndCache(request) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    await cache.put(request, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(request);
    return cached;
  }
}