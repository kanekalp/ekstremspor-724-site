import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server bundle so the Docker runtime stage
  // doesn't need node_modules or the full .next dir — just the standalone
  // output + the static assets we copy in.
  output: "standalone",

  // Permit dev requests from any private-range LAN address so the dev
  // server can be reached from phones/tablets on whichever network the
  // laptop currently sits on, with no per-network reconfiguration.
  // (Wildcards are supported as of Next.js 15.3.)
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "172.21.*.*",
    "172.22.*.*",
    "172.23.*.*",
    "172.24.*.*",
    "172.25.*.*",
    "172.26.*.*",
    "172.27.*.*",
    "172.28.*.*",
    "172.29.*.*",
    "172.30.*.*",
    "172.31.*.*",
  ],
};

export default nextConfig;
