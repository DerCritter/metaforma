import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://metaforma-ai.com';

// Define static routes
const staticRoutes = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: 'contact', priority: 0.8, changefreq: 'monthly' },
  { path: 'impressum', priority: 0.3, changefreq: 'yearly' },
  { path: 'privacy', priority: 0.3, changefreq: 'yearly' },
  { path: 'blog', priority: 0.9, changefreq: 'daily' },
];

function generateSitemap() {
  const date = new Date().toISOString().split('T')[0];
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  const addUrl = (route, priority, changefreq) => {
    const enUrl = `${BASE_URL}/${route}`.replace(/\/$/, '');
    const deUrl = `${BASE_URL}/de/${route}`.replace(/\/$/, '');
    const defaultUrl = enUrl || BASE_URL;

    const createEntry = (url) => `
  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl || BASE_URL}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${deUrl || BASE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl || BASE_URL}"/>
    <lastmod>${date}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

    sitemapContent += createEntry(enUrl || BASE_URL);
    sitemapContent += createEntry(deUrl || `${BASE_URL}/de/`);
  };

  // Add static routes
  staticRoutes.forEach(r => addUrl(r.path, r.priority, r.changefreq));

  // Extract dynamic blog routes
  try {
    const articlesPath = path.resolve('content/articles.ts');
    if (fs.existsSync(articlesPath)) {
      const content = fs.readFileSync(articlesPath, 'utf8');
      
      // Simple regex to find slug properties. e.g. slug: 'how-to-elevate-real-estate-assets',
      const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
      let match;
      while ((match = slugRegex.exec(content)) !== null) {
        if (match[1]) {
          addUrl(`blog/${match[1]}`, 0.8, 'monthly');
        }
      }
    } else {
      console.warn('articles.ts not found at', articlesPath);
    }
  } catch (err) {
    console.error('Error generating dynamic blog routes for sitemap:', err);
  }

  sitemapContent += `\n</urlset>`;

  const publicPath = path.resolve('public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }
  
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemapContent);
  console.log('Sitemap successfully generated at public/sitemap.xml');
}

generateSitemap();
