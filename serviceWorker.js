var cacheName = 'Torah-cours';

var filesToCache = [

  '/',

  '/index.html',

  '/css/style.css',

   ...

];



/* Start the service worker and cache all of the app's content */

self.addEventListener('install', function(e) {

  e.waitUntil(

    caches.open(cacheName).then(function(cache) {

      return cache.addAll(filesToCache);

    })

  );

});



/* Serve cached content when offline */

self.addEventListener('fetch', function(e) {

  e.respondWith(

    caches.match(e.request).then(function(response) {

      return response || fetch(e.request);

    })

  );

});



self.addEventListener('activate', function(event) {

  var cacheKeeplist = ['cacheName'];



  event.waitUntil(

    caches.keys().then(function(keyList) {

      return Promise.all(keyList.map(function(key) {

        if (cacheKeeplist.indexOf(key) === -1) {

          return caches.delete(key);

        }

      }));

    })

  );

});
