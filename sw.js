var cacheName = 'scheduler-v6';
var dynamicCache = 'dynamic-v6';
var filesToCache = [ /* array of filenames referenced by relativity */
  '/', /* just the index page default - request urls */
  '/index.html',
  '/manifest.json',
  '/index2.html',
  '/css/style.css',
  '/css/tutorial.css',
  '/js/main.js',
  // 'error.html',
  'images/favicon.png',
  'images/muse car.jpg',
  // 'images/appIcon.png',
  // 'images/ss.png',
  'https://cdn.onlinewebfonts.com/svg/img_305138.png',/** icon for phone home screen and URL search */
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css', /** interesting css libraries */
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' /** just hamburger icon currently */
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

/*  fired when the service worker has been installed and again when  */
self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(keys => {  //caches.keys returns the keys of the caches in the browser - ie: dynamic-v5
      console.log(keys);
      return Promise.all(keys /*takes array of promises (our keys), when each resolves the return is resolves - forces js to wait*/
        .filter(key => key !== cacheName) /* if the caches found dont match the name, it is kept in the array then we map the delete function to it */
        .map(key => caches.delete(key))) /* caches.delete is a promise to delete a cache */
    })
  )
  //console.log('Service worker activated; now ready to handle fetches!');
});


self.addEventListener('fetch', event => {
  if(event.request.url.indexOf('firestore.googleapis.com') === -1){ //dont want to store any googleapi calls from firebase
    event.respondWith(
      caches.match(event.request).then( response => { //response will be the matched file 
        return response || fetch(event.request).then(fetchRes => { //if cannot get file from the cache, return original request and attempt to get from server - which once retrieved, carry on with alias "fetchRes"
          return caches.open(dynamicCache).then(cache => { //when response comes back, we take that response "fetchRes", open the dynamic cache and put the response for that new page, stored for the future
            const cacheClone = fetchRes.clone();
            cache.put(event.request.url, cacheClone); // add & addAll go to the server, get the resource and place it in the cache
            limitCacheSize(filesToCache, 15); //(above) clone fetchRes event object as we dont want to use up the return of the event without returning something to the user - we need to return fetchRes tot he user but also cache it
            console.log(event.request.url);
            return fetchRes;
          })
        })
      }).catch(e => {
        if(event.request.url.indexOf('.html') > -1){
          console.log({e});
          return caches.match('/error.html');
        }
      })
    );
  }
});