/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@simgateway/ui"],
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] }
};
module.exports = nextConfig;