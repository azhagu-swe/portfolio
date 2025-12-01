/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  //   basePath: "/portfolio",
  //   assetPrefix: "/portfolio",
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'], // Exclude test files from being treated as pages
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Enable PWA in production only
  // Custom SW configuration
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

export default withPWAConfig(nextConfig);
