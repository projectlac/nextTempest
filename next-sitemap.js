const siteUrl = "https://www.tempest.vn";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dashboard",
      },
    ],

    additionalPaths: async (config) => [
      await config.transform(config, "/comments"),
    ],
    additionalSitemaps: ["http://localhost:6969/serversite.xml"],
  },
};
