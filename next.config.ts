/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
  optimizePackageImports: ['firebase'],
},};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
