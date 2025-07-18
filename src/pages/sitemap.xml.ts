import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.href || 'https://portfolio.example.com/';
  
  // Get all blog posts and projects
  const [blogPosts, projects] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('projects')
  ]);

  // Static pages
  const staticPages = [
    '',
    'projects',
    'blog',
    'about'
  ];

  // Generate sitemap entries
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${blogPosts.map(post => `
  <url>
    <loc>${siteUrl}blog/${post.slug}</loc>
    <lastmod>${post.data.publishDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
  ${projects.map(project => `
  <url>
    <loc>${siteUrl}projects/${project.slug}</loc>
    <lastmod>${project.data.publishDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};