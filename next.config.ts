import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly enable App Router
  experimental: {
    appDir: true,
  },
  // Optimized for Vercel deployment
  trailingSlash: false,
  // Ensure proper page detection
  output: 'standalone',
};

export default nextConfig;
