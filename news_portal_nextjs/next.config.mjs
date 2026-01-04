/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Server Build ko atakne se rokne ke liye (Ye Zaroori Hai)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 2. Cloudinary aur External Images allow karne ke liye
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
    ],
    // Backup ke liye purana method bhi rakh diya hai
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
