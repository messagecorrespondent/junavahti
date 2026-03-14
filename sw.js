// ============================================================
// RailWatch — Service Worker
// Offline cache + push notification handler
// ============================================================

const CACHE = 'railwatch-v1';
const STATIC = ['/', '/index.html', '/manifest.json'];

// ── Install: cache shell ──────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC))
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: network-first for API, cache-first for assets ──────
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Digitraffic API → network only (live data)
  if (url.hostname.includes('digitraffic.fi')) return;

  // Map tiles → cache first (bandwidth heavy)
  if (url.hostname.includes('tile.openstreetmap.org')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE + '-tiles').then(c => c.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // App shell → cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached =>
      cached || fetch(e.request).catch(() => caches.match('/index.html'))
    )
  );
});

// ── Push notifications ────────────────────────────────────────
self.addEventListener('push', e => {
  let data = { title: 'RailWatch', body: 'Uusi hälytys' };
  try { data = e.data?.json() || data; } catch {}

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'railwatch',
      data: data.data || {},
      vibrate: [200, 100, 200],
    })
  );
});

// ── Notification click → focus or open app ────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length) return clients[0].focus();
      return self.clients.openWindow('/');
    })
  );
});
