import { getListedPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getListedPosts();
  const items = posts
    .slice(0, 10)
    .map((post) => {
      const url = `${site.url}${post.legacyPath}`;

      return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <description>${escapeXml(post.excerpt)}</description>
        <pubDate>${post.date.toUTCString()}</pubDate>
        <link>${url}</link>
        <guid isPermaLink="true">${url}</guid>
      </item>`;
    })
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <description>${escapeXml(site.description)}</description>
    <link>${site.url}/</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
