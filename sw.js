const version = 'v1';
let log = console.log.bind(console);

//  Event automatically called on registration of the service worker by 'navigator.serviceWorker.register'
self.addEventListener('install', function (event){
    log(`${version} installed at ${ new Date().toLocaleTimeString()}`);
   
   //   Creates the cache of offline files that we can defer to later when we lose connectivity.
    event.waitUntil(
        caches.open(version)
        .then(cache => {
            return cache.addAll([
                './offline/index.html',
                './offline/testing.js'
                ]);
        }));
});

//  Event automatically called on activation of the service worker by 'skipWaiting'
self.addEventListener('activate', function (event){
   log(`${version} activated at ${ new Date().toLocaleTimeString()}`);

   //   We can clean up any caches that do not match our version here
   event.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(keys.filter(function (key) {
                return key !== version;
            })
            .map(key => {
                log(`Cleaning up the cache key ${key}`);
                return caches.delete(key);
            }));
        }));
});


//  Event called that intercepts and responds to a classic fetch from the browser to the server.
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

    //  We intercept and respond to the fetch from the browser here
    event.respondWith(
        caches.match(event.request)
        .then(res => {
            
            //  Is there a response from the cache? If there is return it.
            if (res) {
                log(`${res.url} is actually coming from the cache now....`)
                return res;
            }

            //  Are we offline? If we are then let's return the offline version of our site
            if (!navigator.onLine) {
                return caches.match(new Request('offline/index.html'));
            }

            //  Otherwise we're online, so let's get our content from the server
            return _fetchAndUpdate(event.request);
        })

    );
});

//  The purpose of this function is to automatically take any reponse and put it into the
//  service worker cache, this means that any part of our site that has been navigated to
//  online will be accessible if the user is suddenly taken offline.
function _fetchAndUpdate(request) {
    return fetch (request)    
    .then(res => {
        if (res) {
            return caches.open(version)
            .then(cache => {
                return cache.put(request, res.clone())
                .then(() => {
                    return res;
                })
            })
        }
    });
}