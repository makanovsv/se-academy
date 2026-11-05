// Minimal service worker: makes the site installable and shows a plain notice when offline.
// Only the AI assistant page is kept for offline use (network first), so the app opens without a connection.
const AI = "sea-ai-1";
const isAI = (u) => /^\/(ru\/)?ai\/$/.test(new URL(u).pathname);
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return;
  const ai = isAI(e.request.url);
  e.respondWith(fetch(e.request).then((r) => {
    if (ai && r.ok) { const c = r.clone(); caches.open(AI).then((k) => k.put(new URL(e.request.url).pathname, c)); }
    return r;
  }).catch(() => (ai ? caches.open(AI).then((k) => k.match(new URL(e.request.url).pathname)) : Promise.resolve(null))
    .then((hit) => hit || new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font:16px system-ui;padding:32px">No connection. Нет сети.</body>', { headers: { "Content-Type": "text/html; charset=utf-8" } }))));
});
