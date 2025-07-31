import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs/getting-started/quick-start",
        permanent: false,
      },
    ];
  },
  // if used turbopack
  // transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
