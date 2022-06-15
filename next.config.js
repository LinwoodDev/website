const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const redirects = require("./redirects");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  // Prefer loading of ES Modules over CommonJS
  experimental: { esmExternals: true },
  // Support MDX files as pages:
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  redirects() {
    return redirects;
  },
  images: {
    domains: ["avatars1.githubusercontent.com", "github.com"],
  },

  rules: [
    {
      test: /\.mdx?$/,
      use: [
        // `babel-loader` is optional:
        { loader: "babel-loader", options: {} },
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            /* jsxImportSource: …, otherOptions… */
          },
        },
      ],
    },
  ],
  reactStrictMode: true,
});
