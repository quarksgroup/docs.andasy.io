import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/docs/app-guides/redis-keydb",
        destination: "/app-guides/redis-keydb",
        permanent: true,
      },
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
