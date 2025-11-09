export const GET = async ({ url }: { url: URL }) => {
	const baseUrl = url.origin;
	
	// Static pages
	const pages = [
		{ url: '', priority: '1.0', changefreq: 'daily' },  // Home page
		{ url: '/random', priority: '0.8', changefreq: 'daily' },
		{ url: '/about', priority: '0.7', changefreq: 'monthly' },
		{ url: '/villages', priority: '0.6', changefreq: 'weekly' },
	];
	
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="ne" href="${baseUrl}${page.url}" />
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
