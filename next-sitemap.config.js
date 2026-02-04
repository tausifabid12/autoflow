/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://getcreator.online/', 
  generateRobotsTxt: true, 
  sitemapSize: 5000, 
  changefreq: 'daily', 
  priority: 0.7, 
  exclude: ['/brand/*', '/influencer/*'], 
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      // { userAgent: '*', disallow: '/private' },
    ],
  },
}
