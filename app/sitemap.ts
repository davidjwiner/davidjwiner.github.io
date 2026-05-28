import type { MetadataRoute } from 'next';

import { getListedPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getListedPosts();
  const staticPages = ['', '/blog', '/resume', '/cs267-cyclades'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...posts.map((post) => ({
      url: `${site.url}${post.legacyPath}`,
      lastModified: post.date,
    })),
  ];
}
