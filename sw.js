self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/static/css/styles.css',
                '/static/js/app.js',
                '/static/icons/icon-192x192.png',
                '/static/icons/icon-512x512.png',
                '/static/manifest.json',
                '/index.html'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
