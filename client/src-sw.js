// Import necessary Workbox modules and libraries
const { offlineFallback, warmStrategyCache } = require("workbox-recipes"); // Workbox Recipes
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies"); // Workbox Strategies
const { registerRoute } = require("workbox-routing"); // Workbox Routing
const { CacheableResponsePlugin } = require("workbox-cacheable-response"); // Workbox Cacheable Response Plugin
const { ExpirationPlugin } = require("workbox-expiration"); // Workbox Expiration Plugin
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute"); // Workbox Precaching

// Precache all assets using the Workbox precacheAndRoute() method
precacheAndRoute(self.__WB_MANIFEST);

// Define a CacheFirst strategy for pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Use the CacheableResponsePlugin to cache 0 and 200 HTTP responses
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),

    // Use the ExpirationPlugin to expire the cache after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the cache with the pages specified in the URLs array
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register a route for navigation requests
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Register a route for asset requests (stylesheets, scripts, and workers)
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  // Use the StaleWhileRevalidate strategy to return cached responses while fetching a new response
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      // Use the CacheableResponsePlugin to cache 0 and 200 HTTP responses
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
