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
