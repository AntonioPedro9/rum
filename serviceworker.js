self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("static").then((cache) => {
      console.log("Offline ready.");
      return cache.addAll(["./", "./js/p5/p5.min.js", "./js/p5/p5.play.js", "./js/game.js", "./js/main.js"]);
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
