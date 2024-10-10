/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  reactStrictMode: false,
  env: { FIREBASE_API_KEY: process.env.FIREBASE_API_KEY },
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

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA(nextConfig);
