import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const tutorialsDirectory = path.join(process.cwd(), '_tutorials');

export interface TutorialFrontmatter {
  date: string;
  title: string;
  excerpt: string;
  coverImage: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  duration: string;
}

export function getSortedTutorialsData() {
  const fileNames = fs.readdirSync(tutorialsDirectory);
  const allTutorialsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(tutorialsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as TutorialFrontmatter),
    };
  });

  return allTutorialsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTutorialSlugs() {
  const fileNames = fs.readdirSync(tutorialsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.mdx$/, '') },
  }));
}

export async function getTutorialData(slug: string) {
  const fullPath = path.join(tutorialsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  return {
    slug,
    frontmatter: data,
    mdxSource,
  };
}
