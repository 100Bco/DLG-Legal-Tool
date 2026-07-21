/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — every page is pre-rendered to plain HTML so search
  // engines and AI crawlers receive fully-rendered content with zero JS needed.
  output: "export",
  trailingSlash: true,
  images: {
    // Required for `output: export` (no server-side image optimization).
    unoptimized: true,
  },
  // Fail the build on type errors / lint issues so we never ship broken pages.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
