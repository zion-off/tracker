/** @type {import('next').NextConfig} */

const result = require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: result.parsed,
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
