import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the site default; 90 is reserved for the homepage photography
    // (hero, branch), where softness is visible.
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/mahmoud",
        destination: "/studio",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
