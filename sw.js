const CACHE_NAME = "my-site-cache-v1"
const urlsToCache = [
    "/",
    "/style.[hash].css",
    "/index.[hash].js"
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
    console.log("service worker has been installed");
})

self.addEventListener('activate', evt => {
    let cacheWhiteList = [CACHE_NAME];

    evt.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
    console.log("service worker has been activated");
})

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request)
            .then(response => {
                if (response) return response;

                let fetchRequest = evt.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') return response;

                        let responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(evt.request, responseToCache)
                            });

                        return response;
                    });
            })
    )
    console.log("Ressource récupérée" + evt.request.url);
})