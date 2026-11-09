import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },


//https://ecommerce.routemisr.com/api/v1/products

  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
