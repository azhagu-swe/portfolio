import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), '_posts');

// FIX: Define a type for your post frontmatter
export interface PostFrontmatter {
  date: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime: string;
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as PostFrontmatter), // Apply the type here
    };
  });

  // Sort posts by date, newest first. This now works without error.
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.mdx$/, '') },
  }));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  return {
    slug,
    frontmatter: data,
    mdxSource,
  };
}