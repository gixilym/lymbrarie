/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    API_KEY_BOOKS: process.env.API_KEY_BOOKS,
  },
  compiler: { removeConsole: process.env.NODE_ENV == "production" },
  images: {
    unoptimized: false,
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
      {
        protocol: "http",
        hostname: "books.google.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules",
          "**/.git",
          "**/.next",
          "**/C:\\DumpStack.log.tmp",
          "**/C:\\hiberfil.sys",
          "**/C:\\pagefile.sys",
          "**/C:\\swapfile.sys",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
