import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: '/shakur-proxy',
        destination: 'https://card.shakurfragrances.co.uk/',
      },
      {
        source: '/shakur-proxy/:path*',
        destination: 'https://card.shakurfragrances.co.uk/:path*',
      },
      {
        source: '/assets/:path*',
        destination: 'https://card.shakurfragrances.co.uk/assets/:path*',
      },
      {
        source: '/registerSW.js',
        destination: 'https://card.shakurfragrances.co.uk/registerSW.js',
      },
      {
        source: '/manifest.webmanifest',
        destination: 'https://card.shakurfragrances.co.uk/manifest.webmanifest',
      },
    ];
  },
};

export default nextConfig;
