var cacheName = 'v000';
var cacheFiles = [
  './',
  './index.html',
  './css/bootstrap.min.css',
  './css/style.css',
  './js/main.js'
  ];


self.addEventListener('install', function(event) {
    console.log('serviceWorker Installed');
    event.waitUntil(
	    caches.open(cacheName).then(function(cache) {
			console.log('serviceWorker Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});

self.addEventListener('activate', function(event) {
  console.log('serviceWorker Activated');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log('serviceWorker Removing Cached Files from Cache - ', thisCacheName);
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('serviceWorker Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              console.log("serviceWorker Found in Cache", event.request.url, response);
              return response;
            }

            var responseToCache = response.clone();

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
              console.log('serviceWorker New Data Cached', event.request.url);

            return response;
          }
        );
      })
    );
});
