import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { formatPostDate, getAllPosts, getPostByPath } from '@/lib/posts';
import { site } from '@/lib/site';

type Params = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    year: post.year,
    month: post.month,
    day: post.day,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, month, day, slug } = await params;
  const post = await getPostByPath(year, month, day, slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${site.url}${post.legacyPath}`,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { year, month, day, slug } = await params;
  const post = await getPostByPath(year, month, day, slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="post-meta">{formatPostDate(post.date)}</p>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
