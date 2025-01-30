import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "EBook Library",
                short_name: "EBookLib",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#000000",
                icons: [
                    { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
                    { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
                ]
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.destination === "document",
                        handler: "CacheFirst",
                        options: {
                            cacheName: "pages-cache",
                            expiration: { maxEntries: 10, maxAgeSeconds: 86400 }
                        }
                    },
                    {
                        urlPattern: ({ request }) => request.destination === "image",
                        handler: "CacheFirst",
                        options: {
                            cacheName: "image-cache",
                            expiration: { maxEntries: 50, maxAgeSeconds: 86400 }
                        }
                    },
                    {
                        urlPattern: ({ request }) => request.destination === "script",
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "js-cache",
                            expiration: { maxEntries: 20, maxAgeSeconds: 86400 }
                        }
                    },
                    {
                        urlPattern: ({ request }) => request.destination === "style",
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "css-cache",
                            expiration: { maxEntries: 20, maxAgeSeconds: 86400 }
                        }
                    },
                    {
                        urlPattern: ({ url }) => url.pathname.endsWith(".pdf"),
                        handler: "CacheFirst",
                        options: {
                            cacheName: "pdf-cache",
                            expiration: { maxEntries: 20, maxAgeSeconds: 86400 }
                        }
                    }
                ]
            }
        })
    ]
});
