var cacheName = 'scheduler-v2';
var filesToCache = [ /* array of filenames referenced by relativity */
  '/', /* just the index page default - request urls */
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  'error.html',
  'images/favicon.png',
  'images/muse car.jpg',
  'https://cdn.onlinewebfonts.com/svg/img_305138.png'
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

/*  fired when the service worker has been installed
    and again when  */
self.addEventListener('activate', function(event){
  event.waitUntil(){
    caches.keys().then(keys => {  //caches.keys returns the keys of the caches in the browser
      console.log(keys);
      return Promise.all(keys /*takes array of promises (our keys), when each resolves the return is resolves - forces js to wait*/
        .filter(key => key !== cacheName) /* if the caches found dont match the name, it is kept in the array then we map the delete function to it */
        .map(key => caches.delete(key))) /* caches.delete is a promise to delete a cache */
    })
  }
  //console.log('Service worker activated; now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  if(event.request.url.indexOf('firestore.googleapis.com') === -1){ //dont want to store any googleapi calls from firebase
    event.respondWith(
      caches.match(event.request).then( response => { //response will be the matched file 
        return response || fetch(event.request).then(fetchRes => { //if cannot get file, return original request
          return caches.open(filesToCache).then(cache => {
            cache.put(event.request.url, fetchRes.clone());
            limitCacheSize(filesToCache, 5);
            console.log("fetched ", event.request.url);
            return fetchRes;
          })
        })
      }).catch((e) => {
        if(event.request.url.infexOf('.html') > -1){
          return caches.match('/error.html');
        }
      })
    );
  }
});