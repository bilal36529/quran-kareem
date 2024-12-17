/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://myquran.so',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://myquran.so/server-sitemap.xml',
    ],
  },
}