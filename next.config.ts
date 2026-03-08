import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: { remotePatterns: [
            { protocol: 'https', hostname: 'covers.openlibrary.org' },
            { protocol: 'https', hostname: 'yi2tn6wkw5l2e6fd.public.blob.vercel-storage.com' },
        ],},
  /* config options here */
};

export default nextConfig;
