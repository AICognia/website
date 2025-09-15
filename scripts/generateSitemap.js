const fs = require('fs');
const path = require('path');

// Define your website routes
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/solutions', priority: '0.9', changefreq: 'weekly' },
  { path: '/platform', priority: '0.8', changefreq: 'weekly' },
  { path: '/company', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' }
];

// Define supported languages
const languages = ['tr', 'en'];
const defaultLanguage = 'en';
const baseUrl = 'https://cogniaai.com';

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

// Generate sitemap XML
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  routes.forEach(route => {
    xml += `  
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>`;
    
    // Add hreflang tags for multilingual support
    languages.forEach(lang => {
      const langParam = lang === defaultLanguage ? '' : `?lang=${lang}`;
      xml += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${route.path}${langParam}"/>`;
    });
    
    // Add x-default hreflang
    xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${route.path}"/>`;
    
    xml += `
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
};

// Generate robots.txt content
const generateRobotsTxt = () => {
  return `# Cognia AI Robots.txt
# Allow all bots to crawl the site

User-agent: *
Allow: /
Crawl-delay: 0

# Explicitly allow AI and search engine bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml`;
};

// Write sitemap to public directory
const writeSitemap = () => {
  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');
  
  try {
    // Write sitemap.xml
    fs.writeFileSync(sitemapPath, generateSitemap());
    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    
    // Write robots.txt
    fs.writeFileSync(robotsPath, generateRobotsTxt());
    console.log('✅ Robots.txt generated successfully at:', robotsPath);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Run the script
writeSitemap();
