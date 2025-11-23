/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable the experimental Turbopack dev server to avoid ENOENT build‑manifest errors
  experimental: {
    turbo: false
  }
};

module.exports = nextConfig;
