import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cover images come pre-sized from the Pexels/Unsplash/Pixabay CDNs
    // (w=1600&h=900). Skip Vercel's Image Optimization so the site doesn't hit
    // the Hobby-plan optimization quota (which returns HTTP 402 and breaks every
    // image); the source CDNs serve the already-cropped files directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;
