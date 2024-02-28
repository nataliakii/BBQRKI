/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_LOCAL_API_BASE_URL: "http://localhost:3000",
    NEXT_PUBLIC_API_BASE_URL: "https://www.bbqr.site",
  },
};

module.exports = nextConfig;
