// Cache Name
const cacheName = "cachedAssets";
// Precached files
const assets = [
  "/offline.html",
  "assets/css/style.css",
  "assets/js/search.js",
  "assets/js/theme.js",
  "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
];
// Customize this with a different URL if needed.
const offlinePage = "./offline.html";

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event: any) => {
  console.log("Service worker install event!");
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

self.addEventListener("activate", () =>
  console.log("Service worker activate event!")
);

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener("fetch", (event: any) => {
  //console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches
    .match(event.request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
    .catch(() => caches.match(offlinePage))
  );
});