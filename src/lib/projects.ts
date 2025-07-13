import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const projectsDirectory = path.join(process.cwd(), '_projects');

export interface ProjectFrontmatter {
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  liveDemo?: string;
  github: string;
}

export function getSortedProjectsData() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data } = matter(fileContents);

    return {
      slug,
      ...(data as ProjectFrontmatter),
    };
  });
  
  return allProjectsData;
}

export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.mdx$/, '') },
  }));
}

export async function getProjectData(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content);

  return {
    slug,
    frontmatter: data,
    mdxSource,
  };
}
