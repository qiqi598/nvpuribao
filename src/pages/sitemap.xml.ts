import { readFileSync, existsSync } from 'fs';

export async function GET() {
  const base = 'https://nvpuribao.com';
  const now = new Date().toISOString().split('T')[0];

  // 静态页面
  const staticPages = ['', '/gossip', '/schedule', '/shops', '/reviews'];

  // 店铺详情页
  let shopUrls: string[] = [];
  try {
    const csv = readFileSync('data/shops.csv', 'utf-8').replace(/^\uFEFF/, '');
    const lines = csv.split('\n').filter(l => l.trim());
    for (let i = 1; i < lines.length; i++) {
      const vals = lines[i].split(',');
      const name = vals[0]?.trim();
      if (name) shopUrls.push(`/shops/${encodeURIComponent(name)}`);
    }
  } catch {}

  // 区域页面
  const districts = ['上城区', '拱墅区', '西湖区', '滨江区', '余杭区', '钱塘区', '萧山区'];
  const districtUrls = districts.map(d => `/shops/${encodeURIComponent(d)}`);

  const allUrls = [...staticPages, ...districtUrls, ...shopUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${base}${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url === '' ? 'daily' : url.includes('/shops/') ? 'weekly' : 'daily'}</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/shops/') ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
