// The gatsby site had the offline plugin service worker
// Get rid of it using this self-destructing service worker
//
// https://github.com/NekR/self-destroying-sw/blob/master/packages/gatsby-plugin-remove-serviceworker/sw.js
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
