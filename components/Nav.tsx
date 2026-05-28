import Link from 'next/link';

export function Nav() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
