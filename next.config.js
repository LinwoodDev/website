const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
});
const redirects = require("./redirects");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true },
  // Support MDX files as pages:
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  redirects() {
    return redirects;
  },
  images: {
    domains: ["avatars1.githubusercontent.com", "github.com"],
  },
  reactStrictMode: true,
});
