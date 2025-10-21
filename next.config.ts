import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // TikTok CDN domains - comprehensive list
      { protocol: "https", hostname: "p16-sign-sg.tiktokcdn-us.com" },
      { protocol: "https", hostname: "p16-sign.tiktokcdn-us.com" },
      { protocol: "https", hostname: "p16-sign-sg.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign.tiktokcdn.com" },
      { protocol: "https", hostname: "p77-sign.tiktokcdn-us.com" },
      { protocol: "https", hostname: "p77-sign.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn-us.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
      // Additional TikTok CDN domains
      { protocol: "https", hostname: "p16-pu-sign-no.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p16-pu-sign.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p16-pu-sign-no.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-pu-sign.tiktokcdn.com" },
      { protocol: "https", hostname: "p77-pu-sign-no.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p77-pu-sign.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p16-pu-sign-va.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p16-pu-sign-va.tiktokcdn.com" },
      // More TikTok CDN variations
      { protocol: "https", hostname: "p16-sign-no.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p16-sign-no.tiktokcdn.com" },
      { protocol: "https", hostname: "p77-sign-no.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p77-sign-no.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign-sg.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p77-sign-sg.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn-eu.com" },
      { protocol: "https", hostname: "p77-sign-va.tiktokcdn-eu.com" },
    ],
  },
};

export default nextConfig;
