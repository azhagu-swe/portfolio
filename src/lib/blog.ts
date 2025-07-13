import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostFrontmatter {
  date: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string[];
  tags: string[];
  readTime: string;
}


function getAllPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as PostFrontmatter),
    };
  });
  return allPostsData;
}

export function getSortedPostsData() {
  const allPosts = getAllPostsData();
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export function getAllTags() {
  const allPosts = getAllPostsData();
  const allTags = new Set(allPosts.flatMap(post => post.tags));
  return Array.from(allTags).map(tag => ({
    params: { tag: tag.toLowerCase().replace(/\s+/g, '-') },
  }));
}

export function getPostsByTag(tag: string) {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => 
    post.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')).includes(tag)
  );
}

export function getAllCategories() {
  const allPosts = getAllPostsData();

  const allCategories = new Set(
    allPosts.flatMap(post =>
      post.category.map(cat => cat.toLowerCase().replace(/\s+/g, "-"))
    )
  );

  return Array.from(allCategories).map(category => ({
    params: { category },
  }));
}

export function getPostsByCategory(category: string) {
  const allPosts = getSortedPostsData();

  return allPosts.filter(post =>
    post.category
      .map(c => c.toLowerCase().replace(/\s+/g, "-"))
      .includes(category)
  );
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

  const headingLines = content.split('\n').filter((line) => {
    return line.match(/^(##|###)\s/);
  });

  let h2Counter = 0;
  let h3Counter = 0;

  const headings = headingLines.map(line => {
    const text = line.replace(/^(##|###)\s/, '').replace(/^\d+\.\s*/, '').trim();
    const level = line.startsWith('###') ? 3 : 2;
    const slug = text.toLowerCase().replace(/\s/g, '-').replace(/[^\w-]+/g, '');
    
    let number = '';
    if (level === 2) {
      h2Counter++;
      h3Counter = 0;
      number = `${h2Counter}.`;
    } else if (level === 3) {
      h3Counter++;
      number = `${h2Counter}.${h3Counter}`;
    }
    
    return { text, level, slug, number };
  });

  const mdxSource = await serialize(content);

  return {
    slug,
    frontmatter: data,
    mdxSource,
    headings,
  };
}
