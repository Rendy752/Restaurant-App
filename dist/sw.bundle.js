if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,a)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let o={};const c=e=>n(e,s),f={module:{uri:s},exports:o,require:c};i[s]=Promise.all(r.map((e=>f[e]||c(e)))).then((e=>(a(...e),o)))}}define(["./workbox-3ca83693"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.bundle.js",revision:"4491e67f2bf3e5d686adc7c247f10cb1"},{url:"app.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app.webmanifest",revision:"4b39a692f880d2545fced5f717633ee5"},{url:"data/favorite-restaurant-idb.js",revision:"2df0a4fe0c6d2ce5bd3eb15594820131"},{url:"data/restaurantapp-source.js",revision:"46b30dc47fd5d479b68420ffae7cbffa"},{url:"icons/icon-128x128.png",revision:"fe3f7e8e13170fb00766bb8050116059"},{url:"icons/icon-144x144.png",revision:"dd85e046fab4d43099f73267ed814307"},{url:"icons/icon-152x152.png",revision:"32db8610bb5585ec50e897280e562ed5"},{url:"icons/icon-192x192.png",revision:"b2446491400b5a8f94cde1f832009055"},{url:"icons/icon-384x384.png",revision:"6992d65375274a3786b64b68fac9da23"},{url:"icons/icon-512x512.png",revision:"3e99fa6dd9f7dd168ad2ba0bc8753e55"},{url:"icons/icon-72x72.png",revision:"903332f014d5b1f3c8a4f8e98baabfd8"},{url:"icons/icon-96x96.png",revision:"9c2b49e3351efa3c8c3c6aedb2bcea7a"},{url:"images/heros/hero-image_2.jpg",revision:"49f78cae81de4f48caf1c2fe0271c828"},{url:"images/logo.png",revision:"efabfedf881c0839e1239711b8749fc9"},{url:"images/profile.png",revision:"99a0b04704147bb5ef88a4c4650e57e0"},{url:"index.html",revision:"b122a5940257dd0d2af99f4f53cae6b3"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/images/medium/")),new e.StaleWhileRevalidate({cacheName:"restaurantapp-image-api",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/")),new e.StaleWhileRevalidate({cacheName:"restaurantapp-api",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
