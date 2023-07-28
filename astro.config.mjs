import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import AstroPWA from "@vite-pwa/astro";
import swup from '@swup/astro';

// https://astro.build/config
export default defineConfig({
  site: "https://linwood.dev",
  integrations: [
    mdx(),
    sitemap(),
    swup({ theme: false, containers: ['#swup'] }),
    AstroPWA({
      workbox: { navigateFallback: "/404" },
      manifest: {
        name: "Linwood Development",
        short_name: "Linwood",
        description: "Simple to use software for everyone",
        theme_color: "#35EF53",
		icons: [
			{
			  src: 'android-chrome-192x192.png',
			  sizes: '192x192',
			  type: 'image/png'
			},
			{
			  src: 'android-chrome-512x512.png',
			  sizes: '512x512',
			  type: 'image/png'
			},
			{
			  src: 'android-chrome-512x512.png',
			  sizes: '512x512',
			  type: 'image/png',
			  purpose: 'any maskable'
			}
		  ]		  
      },
    }),
  ],
});
