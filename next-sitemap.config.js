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
    "/credits",
    "/404",
    "/guest/**",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://lymbrarie.com/sitemap.xml",
      "https://lymbrarie.com/sitemap-0.xml",
    ],
  },
};
