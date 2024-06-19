
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    unoptimized: true,
  }
};

const config = nextConfig;

export default config;
