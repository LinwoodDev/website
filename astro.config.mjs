import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import manifest from "./webmanifest.json";
import remarkCustomHeaderId from 'remark-custom-header-id';

// https://astro.build/config
export default defineConfig({
  site: "https://linwood.dev",
  image: {
    responsiveStyles: true,
    layout: "constrained",
    domains: ["avatars1.githubusercontent.com"],
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkCustomHeaderId],
    }),
    sitemap(),
    AstroPWA({
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: "/404",
        ignoreURLParametersMatching: [/./],
        globPatterns: [
          "**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}",
        ],
        maximumFileSizeToCacheInBytes: 3000000,
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      registerType: "autoUpdate",
      manifest,
    }),
  ],
});
