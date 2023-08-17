/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
