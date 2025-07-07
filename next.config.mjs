/** @type {import('next').NextConfig} */
const nextConfig = {
  // your config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig