var cacheName = 'scheduler';
var filesToCache = [ /* array of filenames referenced by relativity */
  'index.html',
  'css/style.css',
  'js/main.js',
  'error.html'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache).then(function(){
        console.log("installed");
      }); //need to handle addAll since if one fails they all fail
    })
  );
});

self.addEventListener('activate', function(){
  console.log('now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  console.log("fetched ", event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log("fetched ", event.request.url);
      return response || fetch(event.request);
    })
  );
});

/*

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if(response){
        console.log("fetching", e.request.url);
        return response; //|| fetch(e.request);
      }
      return fetch(e.request).then(function(response) {
        if (response.status === 404) {
          console.log("404 error");
          return null;
        }
        return caches.open(cached_urls).then(function(cache) {
         cache.put(e.request.url, response.clone());
          return response;
        });
      });
    }).catch(function(error){
      console.log("error on request");
      return caches.match('error.html');
    })
  );
});

*/