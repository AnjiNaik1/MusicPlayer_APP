const CACHE_NAME = "music-cache-v1";
const FILES_TO_CACHE = [
    "index.html",
    "styles.css",
    "script.js",
    "manifest.json",
    "songs/s1.mp3",
    "songs/s2.mp3",
    "songs/s3.mp3",
    "songs/s4.mp3",
    "songs/s5.mp3",
    "songs/s6.mp3",
    "songs/s7.mp3",
    "songs/s8.mp3",
    "songs/s9.mp3",
    "icon-192.png",
    "icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});
