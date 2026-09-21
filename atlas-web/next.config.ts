import type { NextConfig } from "next";

const isSitesStaticExport =
  process.env.SITES_MANAGED_LINUX_CONTAINER === "1";

const nextConfig: NextConfig = isSitesStaticExport
  ? {
      output: "export",
    }
  : {
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
