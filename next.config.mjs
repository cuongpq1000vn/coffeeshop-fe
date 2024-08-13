/** @type {import('next').NextConfig} */
const COFFEE_SHOP_URL = process.env.COFFEE_SHOP_URL;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-coffeeshop.codezx.vn",
        pathname: "**",
      },
    ],
  },
};
// domains: [COFFEE_SHOP_URL.replace(/^http?:\/\//, '')],
export default nextConfig;
