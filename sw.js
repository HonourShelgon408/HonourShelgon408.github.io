var cacheName = 'scheduler';
var filesToCache = [ /* array of filenames referenced by relativity */
  'index.html',
  'css/style.css',
  'js/main.js',
  'error.html'
];

let deferredPrompt;
self.addEventListener('beforeinstallprompt', (e) => {
// Prevent the mini-infobar from appearing on mobile
e.preventDefault();
// Stash the event so it can be triggered later.
deferredPrompt = e;
// Update UI notify the user they can install the PWA
showInstallPromotion();
});


/* install service worker and cache files needed in offline mode */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache).then(function(){
        console.log("Service Worker Installed: ", event);
      }); //need to handle addAll since if one fails they all fail
    })
  );
});

self.addEventListener('activate', function(){
  console.log('Service worker activated; now ready to handle fetches!');
});   //fired when the service worker has been installed
      //and again when  

/* 
helps with offline functionality
Service worker can intercept calls made from the site to serve
data from the cache instead of the server */
self.addEventListener('fetch', function(event) {
  console.log("fetched ", event.request.url);
  // event.respondWith(
  //   caches.match(event.request).then(function(response) {
  //     //console.log("fetched ", event.request.url);
  //     return response || fetch(event.request);
  //   })
  // );
});

// self.addEventListener('fetch', function(event) {
//   console.log("fetched ", event.request.url);
//   event.respondWith(
//     caches.match(event.request).then( response => {
//       //console.log("fetched ", event.request.url);
//       return response || fetch(event.request).then(fetchRes => {
//         return caches.open(filesToCache).then(cache => {
//           cache.put(event.request.url, fetchRes.clone());
//           limitCacheSize(filesToCache, 50);
//           return fetchRes;
//         })
//       })
//     }).catch(() => {
//       if(event.request.url.infexOf('.html') > -1){
//         return caches.match('/error.html');
//       }
//     })
//   );
// });