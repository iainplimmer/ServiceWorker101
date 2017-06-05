const version = 'v1';
let log = console.log.bind(console);

//  Event automatically called on registration of the service worker by 'navigator.serviceWorker.register'
self.addEventListener('install', function (event){
   
    log(`${version} installed at ${ new Date().toLocaleTimeString()}`);
   
    event.waitUntil(
        caches.open(version)
        .then(function(cache) {
            return cache.addAll(['offline.html']);
        }));
});

//  Event automatically called on activation of the service worker by 'skipWaiting'
self.addEventListener('activate', function (event){
   log(`${version} activated at ${ new Date().toLocaleTimeString()}`);
});


self.addEventListener('fetch', function (event) {

    //  IMPORTANT NOTE!
    // Getting fetch interception working seems to require that the registered service worker 
    // be at or above the level of the tree with the HTML file registering the worker. 
    // Below fails.

    //  IMPLEMENTATION OF A PASS THROUGH!
    // if (!navigator.onLine) {
    //     event.respondWith(new Response('hello!!!', {
    //         headers: { 'Content-Type': 'text/html'}
    //     }));
    // }
    // else {
    //     //  This is a pass through, that if online, just returns the resource
    //     event.respondWith(fetch(event.request));
    // }

    event.respondWith(
        caches.match(event.request)
        .then(function (res) {
            if (res) {
                return res;
            }

            if (!navigator.onLine) {
                return caches.match(new Request('offline.html'));
            }

            return fetch(event.request);
        })

    );


})