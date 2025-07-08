export interface Blog {
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  date: string;
  readTime: string;
  tags: string[];
  // Add a new field for the full content
  content: string; 
}

export const blogs: Blog[] = [
  {
    slug: "mastering-java-basics",
    title: "Mastering Java Basics",
    category: "Java Tutorials",
    description: "A comprehensive guide to get started with Java programming.",
    thumbnail: "https://placehold.co/600x400/1E1E1E/32CD32?text=Java+Basics",
    date: "Feb 20, 2025",
    readTime: "5 min",
    tags: ["Java", "Core Concepts", "Beginner"],
    content: `
## Introduction to Java
Java is a versatile, object-oriented programming language known for its "write once, run anywhere" capability. In this post, we'll explore the absolute fundamentals.

### Your First Java Program
Let's start with the classic "Hello, World!" application. This simple program demonstrates a class and the main method, which is the entry point for any Java application.
    `,
  },
  {
    slug: "tech-trends-2025",
    title: "Tech Trends 2025",
    category: "Tech Tips",
    description: "Explore the latest trends shaping the tech world, from AI to quantum computing.",
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFC107?text=Tech+Trends",
    date: "Feb 18, 2025",
    readTime: "8 min",
    tags: ["AI", "DevOps", "Future Tech"],
    content: `
## The Future is Now
Technology is evolving at an unprecedented pace. In 2025, we're seeing major shifts in AI, cloud infrastructure, and quantum computing that will redefine our digital landscape.
    `,
  },
  {
    slug: "building-your-personal-brand",
    title: "Building Your Personal Brand",
    category: "Personal Thoughts",
    description: "Tips and strategies to create a strong online presence as a developer.",
    thumbnail: "https://placehold.co/600x400/1E1E1E/FFFFFF?text=Personal+Brand",
    date: "Feb 15, 2025",
    readTime: "7 min",
    tags: ["Career", "Branding", "Networking"],
    content: `
## Why Your Brand Matters
As a developer, your personal brand is your reputation. It's how you showcase your skills, share your knowledge, and connect with opportunities.
    `,
  },
];