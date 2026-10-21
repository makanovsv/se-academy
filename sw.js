// Minimal service worker: makes the site installable and shows a plain notice when offline. No content caching.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(() => new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font:16px system-ui;padding:32px">No connection. Нет сети.</body>', { headers: { "Content-Type": "text/html; charset=utf-8" } })));
});
