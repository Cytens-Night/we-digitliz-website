import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      }
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
