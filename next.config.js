/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"]
    }
  },
  typescript: {
    ignoreBuildErrors: false
  },
  reactStrictMode: true
}

module.exports = nextConfig