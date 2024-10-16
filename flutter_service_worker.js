'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "0781ac593fb3c95bb0af9f015891210f",
"assets/AssetManifest.json": "667417795cc7408d664030c71c990163",
"assets/assets/fonts/Montserrat-Bold.ttf": "d3085f686df272f9e1a267cc69b2d24f",
"assets/assets/fonts/Montserrat-Regular.ttf": "07689d4eaaa3d530d58826b5d7f84735",
"assets/assets/images/and.png": "f0df1f11abf4ba60c68b40ea5d148e78",
"assets/assets/images/ar.png": "d46f5799d2cdc7ebbf30d6d782a133d8",
"assets/assets/images/background.jpg": "e09ed77042da7151a6374d85dfe45ece",
"assets/assets/images/br_logo_color.png": "1e01d040619af0d196cf5a0d541eb5e1",
"assets/assets/images/br_logo_color2.png": "707331e572194fc9e4291e2f980381bd",
"assets/assets/images/br_logo_grey.png": "5f7554cf67c4ba612a849d6e0e48c3af",
"assets/assets/images/delta.png": "54d643cbdae0c0bb1848ae274f15fcb2",
"assets/assets/images/es.png": "69bf7c3df4b222c445bf6ebffec278e6",
"assets/assets/images/fb.png": "a94b59c3ba7950e122684a7b4cceee33",
"assets/assets/images/fr.png": "fad3a40b9e95eed58c0b8dc450dcf1d9",
"assets/assets/images/ge.png": "85ca59c60c9179d7b3e9b6ab03b407c7",
"assets/assets/images/image1.jpg": "7caf3120172f754dd8c14e3f4d8582e8",
"assets/assets/images/image2.jpg": "9e46d6577bbf98636c73141a2f68c1f4",
"assets/assets/images/image3.jpg": "192315ae9fd2cb3d08657f65e0e6822e",
"assets/assets/images/in.png": "f0ecce575bcb99a590f20e026672698a",
"assets/assets/images/input_pet.png": "ea770d6258d1c56d46dace1dd18415b7",
"assets/assets/images/ins.png": "4ba1a256610f0311b654e6c634e97620",
"assets/assets/images/logo.png": "d8c3ef7e5db35ce7f9dbc3fe24297eb0",
"assets/assets/images/output_pet.png": "996c614462c96dc327e08da781320e08",
"assets/assets/images/pet.png": "126e3f3a7f480df0303882f12f250a92",
"assets/assets/images/pet_bottle.png": "bf46e73f4421b0d6cadbfdb2c6172318",
"assets/assets/images/recycl_logo.png": "c7db26ddf8dab10a7c817429f92774a4",
"assets/assets/images/recycl_pet.png": "af6310c2f730ccee998fcce2b2403cbf",
"assets/assets/images/tu.png": "7d0331378c1d6840f4a4623a90974fbe",
"assets/assets/images/uk.png": "aac0dfefc080856931658ea9c760534e",
"assets/assets/images/wts.png": "2b7d38b9141148d402f5c9d9e596d79c",
"assets/assets/images/yt.png": "33875db9d35b260b961e19aac7c09ab1",
"assets/FontManifest.json": "1a726564c73eb44d252c69c6eb91fd93",
"assets/fonts/MaterialIcons-Regular.otf": "0e6994dbf4ea07944a39473f8c3a605c",
"assets/NOTICES": "dc54efecfaef8b079e042dd439f8c2ef",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "9a213a3f785b825bcefd9ed8d994f8df",
"icons/Icon-512.png": "6633274d46c9b57660d109763d36140e",
"icons/Icon-maskable-192.png": "6a452ca9962671dd590168afd47f975c",
"icons/Icon-maskable-512.png": "fb609faebfa0b96f088ab81ca5138fea",
"index.html": "d9a0e14bc1ebe6a224cf324531cff4c2",
"/": "d9a0e14bc1ebe6a224cf324531cff4c2",
"logo.png": "d8c3ef7e5db35ce7f9dbc3fe24297eb0",
"main.dart.js": "6f5ef047e5ceb1eac795a40bcd8da028",
"manifest.json": "a877d23897829b8fece1ab2e9a512e7f",
"version.json": "c9584007b6a060961949b240c46db195"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
