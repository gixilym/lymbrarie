/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lymbrarie.com",
  generateRobotsTxt: true,
  exclude: ["/error", "/book/**", "/login", "/logout"],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://lymbrarie.com/sitemap.xml",
      "https://lymbrarie.com/sitemap-0.xml",
    ],
  },
};
