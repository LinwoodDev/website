const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    dest: 'public'
  },
  images: {
    domains: ['avatars1.githubusercontent.com'],
  },
  reactStrictMode: true,
})