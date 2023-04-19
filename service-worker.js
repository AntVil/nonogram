const cacheName = "time-track";
const filesToCache = [
    "/nonogram/",
    "/nonogram/index.html",
    "/nonogram/global.css",
    "/nonogram/themes.css",
    "/nonogram/build/bundle.css",
    "/nonogram/build/bundle.js",
    "/nonogram/images/icons/back.svg",
    "/nonogram/images/icons/block.svg",
    "/nonogram/images/icons/cross.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(filesToCache)));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).then((response) => {
            let copy = response.clone();
            caches.open(cacheName).then((cache) => {
                cache.put(event.request, copy);
            });
            return response;
        }).catch(() => {
            return caches.match(event.request).then((response) => {
                return response;
            })
        })
    );
});
