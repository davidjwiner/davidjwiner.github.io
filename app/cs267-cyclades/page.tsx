import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import { markdownToHtml } from '@/lib/posts';

export const metadata = {
  title: 'Cyclades',
};

export default async function CycladesPage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'cyclades.md'), 'utf8');
  const { content } = matter(raw);
  const html = await markdownToHtml(content);

  return <article className="post-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
