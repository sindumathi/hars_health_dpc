import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false, // set to true if it's a permanent 308 redirect
      },
    ];
  },
};

export default nextConfig;
