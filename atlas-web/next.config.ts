import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const core = process.env.ATLAS_CORE_URL ?? "http://127.0.0.1:8000";
    return [
      {
        source: "/atlas-core/:path*",
        destination: `${core}/:path*`,
      },
    ];
  },
};

export default nextConfig;
