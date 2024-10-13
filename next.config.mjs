/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: { FIREBASE_API_KEY: process.env.FIREBASE_API_KEY },
  compiler: { removeConsole: process.env.NODE_ENV == "production" },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
