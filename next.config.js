/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({ canvas: 'canvas' });
    config.resolve.alias['fabric'] = 'fabric-pure-browser';
    return config;
  },
};

module.exports = nextConfig;
