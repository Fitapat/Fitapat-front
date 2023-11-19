/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // esmExternals: "loose",
  },
  webpack: (config) => {
    config.externals.push({ canvas: 'canvas' });
    return config;
  },
};

module.exports = nextConfig;
