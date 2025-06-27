/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lymbrarie.gixi.dev",
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
    "/reader/**",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://lymbrarie.gixi.dev/sitemap.xml",
      "https://lymbrarie.gixi.dev/sitemap-0.xml",
    ],
  },
};
