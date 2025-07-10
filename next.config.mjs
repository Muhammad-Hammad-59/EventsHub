/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //     pathname: "/dm0hq0cfy/image/upload/**", // Allow all paths under your Cloudinary account
    //   },
    // ],

    domains: [
      'res.cloudinary.com',
      'example.com',
      'images.unsplash.com',
      'cdn.sanity.io',
      // Add more trusted domains here
    ],
  },
};


export default nextConfig;
