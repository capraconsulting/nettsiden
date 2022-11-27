// The old website had a Service Worker running
// Service workers can live in the browser for a long time
// A visitor from years back can still potentionall have it.
// This killswitch worker removes it self after the installed service worker updates to it.
// Which the browser is supposed to do.
//
// https://medium.com/@nekrtemplar/self-destroying-serviceworker-73d62921d717
self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  self.registration
    .unregister()
    .then(function () {
      return self.clients.matchAll();
    })
    .then(function (clients) {
      clients.forEach((client) => client.navigate(client.url));
    });
});
