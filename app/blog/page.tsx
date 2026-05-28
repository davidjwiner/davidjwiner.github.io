import Link from 'next/link';

import { formatPostDate, getListedPosts } from '@/lib/posts';

export const metadata = {
  title: "David Winer's Blog",
  description: 'Posts by David Winer',
};

export default async function BlogPage() {
  const posts = await getListedPosts();

  return (
    <section>
      <h1>David Winer&apos;s Blog</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li className="post-list-item" key={post.legacyPath}>
            <div className="post-list-heading">
              <span className="post-date">{formatPostDate(post.date)}</span>
              <span aria-hidden="true">-</span>
              <Link className="post-title-link" href={post.legacyPath}>
                {post.title}
              </Link>
            </div>
            <div className="post-excerpt" dangerouslySetInnerHTML={{ __html: post.excerptHtml }} />
            <Link className="read-more" href={post.legacyPath}>
              Read more...
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
