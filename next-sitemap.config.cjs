/** @type {import('next-sitemap').IConfig} */
const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/policies-sitemap.xml', '/pages-sitemap.xml', '/*', '/policies/*'],
  robotsTxtOptions: {
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/policies-sitemap.xml`],
  },
}
