/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lymbrarie.com",
  generateRobotsTxt: true,
  exclude: [
    "/error",
    "/book/**",
    "/login",
    "/faq",
    "/privacypolicy",
    "/termsofuse",
    "/guest",
    "/404",
    "/guest",
    "/guest/**",
    "/recommendation/**",
    "/config",
    "/donations",
    "/profile",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://lymbrarie.com/sitemap.xml",
      "https://lymbrarie.com/sitemap-0.xml",
    ],
  },
};
