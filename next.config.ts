import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the site default; 90 is reserved for the homepage photography
    // (hero, branch, founder portrait), where softness is visible.
    qualities: [75, 90],
  },
  // Force restart: theme update
};

export default nextConfig;
