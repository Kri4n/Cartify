import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // 🚀 build won’t fail on lint errors
  },
};

export default nextConfig;
