/** @type {import('next').NextConfig} */
const nextConfig = {
  //   basePath: "/portfolio", 
  //   assetPrefix: "/portfolio", 
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'], // Exclude test files from being treated as pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
