const cacheName = "cachedAssets";
const assets = [
    "/offline.html",
    "assets/css/style.css",
    "assets/js/search.js",
    "assets/js/theme.js",
    "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
];
const offlinePage = "./offline.html";
self.addEventListener("install", (event) => {
    console.log("Service worker install event!");
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});
self.addEventListener("activate", () => console.log("Service worker activate event!"));
self.addEventListener("fetch", (event) => {
    event.respondWith(caches
        .match(event.request)
        .then((cachedResponse) => {
        if (cachedResponse) {
            return cachedResponse;
        }
        return fetch(event.request);
    })
        .catch(() => caches.match(offlinePage)));
});
