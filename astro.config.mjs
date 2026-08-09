import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import manifest from "./webmanifest.json";

const customHeadingIds = {
  name: "custom-heading-ids",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, context) {
      const lastChild = node.children.at(-1);
      if (lastChild?.type !== "text") return;

      const match = lastChild.value.match(/\s+\{\s*#([\w-]+)\s*\}$/);
      if (!match) return;

      context.setProperty(
        lastChild,
        "value",
        lastChild.value.slice(0, match.index),
      );
      context.setProperty(node, "id", match[1]);
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://www.linwood.dev",
  experimental: {
    incrementalBuild: true,
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
    domains: ["avatars1.githubusercontent.com"],
  },
  markdown: {
    processor: satteri({
      hastPlugins: [customHeadingIds],
    }),
  },
  integrations: [
    mdx(),
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
