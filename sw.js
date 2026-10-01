const V='pillpal-v1',F=['app.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(!F.includes(u.pathname.split('/').pop()))return;
 e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{c.put(e.request,x.clone());return x}).catch(()=>r||c.match('app.html'));return r||n})))});
