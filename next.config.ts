const MillionLint = require("@million/lint");
/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = MillionLint.next({
  enabled: true,
  rsc: true
})(withBundleAnalyzer(nextConfig));