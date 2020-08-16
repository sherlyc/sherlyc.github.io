self.addEventListener('install', event => {
  console.log('V1 installing…');

  // cache a cat jpg
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('./images/cat.jpg'))
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});


self.addEventListener('installed', () => {
  console.log("v1 installed")
})

self.addEventListener('activated', event => {
  console.log("v1 activated")
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          console.log("deleting cache");
          return caches.delete(cacheName);
        })
      );
    })
  );
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat jpg from the cache if the request is
  // same-origin and the path is '/images/dog.jpg'
  if (url.origin == location.origin && url.pathname.endsWith("images/dog.jpg")) {
    event.respondWith(caches.match('./images/cat.jpg'));
  }
});
