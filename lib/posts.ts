import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type Post = {
  title: string;
  date: Date;
  slug: string;
  excerpt: string;
  excerptHtml: string;
  content: string;
  html: string;
  listed: boolean;
  published: boolean;
  legacyPath: string;
  sourcePath: string;
  year: string;
  month: string;
  day: string;
};

type Frontmatter = {
  title?: string;
  date?: string | Date;
  slug?: string;
  excerpt?: string;
  listed?: boolean;
  published?: boolean;
  legacyPath?: string;
};

function slugFromFilename(filename: string) {
  return filename.replace(/\.(md|markdown|mdx)$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function parseDate(value: string | Date | undefined, filename: string) {
  if (value instanceof Date) {
    return value;
  }

  const fallback = filename.slice(0, 10);
  const raw = value ?? fallback;
  const normalized = raw
    .replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}) ([+-]\d{2})(\d{2})$/, '$1T$2$3:$4')
    .replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})$/, '$1T$2');
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date in ${filename}: ${raw}`);
  }

  return date;
}

function formatDatePart(date: Date, part: 'year' | 'month' | 'day') {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: part === 'year' ? 'numeric' : undefined,
    month: part === 'month' ? '2-digit' : undefined,
    day: part === 'day' ? '2-digit' : undefined,
  });

  return formatter.format(date);
}

function legacyPathForPost(date: Date, slug: string) {
  const year = formatDatePart(date, 'year');
  const month = formatDatePart(date, 'month');
  const day = formatDatePart(date, 'day');

  return `/blog/${year}/${month}/${day}/${slug}`;
}

function excerptMarkdownFromContent(content: string, explicitExcerpt?: string) {
  const marker = '<!--more-->';
  const first = explicitExcerpt ?? (content.includes(marker) ? content.split(marker)[0] : content);

  return first
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[\s\S]*?<\/iframe>/gi, '')
    .replace(/<blockquote\b[\s\S]*?<\/blockquote>/gi, '')
    .replace(/<p\s+class=["']caption["'][\s\S]*?<\/p>/gi, '')
    .replace(/<img\b[^>]*>/gi, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .trim();
}

function textFromMarkdown(markdown: string) {
  return markdown
    .replace(/<[^>]*>/g, '')
    .replace(/\[[^\]]+\]\([^)]+\)/g, (match) => match.slice(1, match.indexOf(']')))
    .replace(/[#*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function markdownToHtml(markdown: string) {
  const normalizedMarkdown = normalizeTypography(markdown);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(normalizedMarkdown);

  return String(file);
}

function normalizeTypography(markdown: string) {
  return markdown
    .split('\n')
    .map((line) => {
      if (/^\s*-{3,}\s*$/.test(line) || /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)) {
        return line;
      }

      return line.replace(/---/g, '&mdash;');
    })
    .join('\n');
}

export async function getAllPosts() {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => /\.(md|markdown|mdx)$/.test(file));

  const posts = await Promise.all(
    files.map(async (filename): Promise<Post> => {
      const sourcePath = path.join(postsDirectory, filename);
      const raw = fs.readFileSync(sourcePath, 'utf8');
      const { data, content } = matter(raw);
      const frontmatter = data as Frontmatter;
      const date = parseDate(frontmatter.date, filename);
      const slug = frontmatter.slug ?? slugFromFilename(filename);
      const legacyPath = frontmatter.legacyPath ?? legacyPathForPost(date, slug);
      const excerptMarkdown = excerptMarkdownFromContent(content, frontmatter.excerpt);

      return {
        title: frontmatter.title ?? slug,
        date,
        slug,
        excerpt: textFromMarkdown(excerptMarkdown),
        excerptHtml: await markdownToHtml(excerptMarkdown),
        content,
        html: await markdownToHtml(content),
        listed: frontmatter.listed ?? true,
        published: frontmatter.published ?? true,
        legacyPath,
        sourcePath,
        year: formatDatePart(date, 'year'),
        month: formatDatePart(date, 'month'),
        day: formatDatePart(date, 'day'),
      };
    }),
  );

  return posts
    .filter((post) => post.published)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getListedPosts() {
  const posts = await getAllPosts();
  return posts.filter((post) => post.listed);
}

export async function getPostByPath(year: string, month: string, day: string, slug: string) {
  const posts = await getAllPosts();
  return posts.find(
    (post) => post.year === year && post.month === month && post.day === day && post.slug === slug,
  );
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  }).format(date);
}
