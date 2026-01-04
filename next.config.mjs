/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        pathname: "/coins/image/**",
      },
       {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
