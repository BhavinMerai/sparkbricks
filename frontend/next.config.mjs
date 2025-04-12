/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ipynb$/,
      use: "null-loader",
    });
    return config;
  },
};

export default nextConfig;
