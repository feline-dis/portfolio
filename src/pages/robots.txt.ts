import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href || 'https://portfolio.example.com/';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block access to admin or private areas (if any)
Disallow: /admin/
Disallow: /_astro/
Disallow: /api/

# Allow all search engines to index the site
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};