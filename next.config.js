/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/my-v0-project",
  assetPrefix: "/my-v0-project/",
};

module.exports = nextConfig;
