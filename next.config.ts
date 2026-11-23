import type { NextConfig } from "next";

// When hosted under a sub-path (GitHub Pages: /<repo>), the build sets
// NEXT_PUBLIC_BASE_PATH. On Vercel or a custom domain, leave it unset.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Fully static: `next build` writes the whole site to /out.
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    // Static export has no image optimizer; photos should be pre-sized
    // (see README → Image slots).
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
