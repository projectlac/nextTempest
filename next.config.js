/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n.config");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "imagedelivery.net",
      "upanh.tv",
      "img.upanh.tv",
    ],
  },
  i18n,
};

module.exports = nextConfig;
