# 🖥️ My Portfolio - Powered by Next.js 🚀

Welcome to my personal portfolio! This project showcases my skills, experiences, and projects in a clean, modern, and tech-savvy design. Built using cutting-edge technologies like **Next.js**, **TypeScript**, and **Material-UI**, this portfolio is not just a website—it's my digital identity.

**⚠️ Note on Testing**: This project currently has incomplete test coverage. See [Testing Improvements Summary](TEST_IMPROVEMENTS_SUMMARY.md) for details on the current status and improvement plan.

**⚠️ Note on Issues**: This project has several areas for improvement. See [Comprehensive Issues](COMPREHENSIVE_ISSUES.md) for a complete list of identified issues and drawbacks.

---

## ✨ Features

- **Responsive Design:** Seamlessly adapts to any device.
- **Dynamic Content:** Blogs, project highlights, and more are fetched dynamically.
- **Dark & Light Themes:** User-friendly theme switcher for modern aesthetics.
- **Optimized Performance:** Fast, scalable, and SEO-friendly.
- **Interactive Animations:** Subtle animations for an engaging user experience.
- **Comprehensive Testing:** Unit and integration tests with Jest and React Testing Library (improvement plan in progress).

---

## 🚀 Tech Stack

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| **Next.js**     | Framework for building the app |
| **TypeScript**  | Strongly typed JavaScript      |
| **Material-UI** | Design system and components   |

---

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/azhagu-swe/portfolio.git
   cd my-portfolio
   ```
2. **Install dependencies**

   ```bash
   yarn install
   ```
3. **Run the development server**

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your portfolio in action.
4. **Build for production**

   ```bash
   yarn build
   yarn start
   ```

   This will generate an optimized production build and serve it.
5. **Deploy to Vercel**

   - Install the [Vercel CLI](https://vercel.com/docs/cli) if you don’t have it:
     ```bash
     npm i -g vercel
     ```
   - Run the deployment command:
     ```bash
     vercel
     ```

     Follow the prompts to deploy your portfolio.

   Alternatively, you can deploy directly through the Vercel dashboard:

   1. Push your project to a GitHub repository.
   2. Connect your GitHub repository to Vercel.
   3. Vercel will automatically build and deploy your project.
6. **Deploy to Other Platforms**

   - **Netlify:**

     1. Install Netlify CLI:
        ```bash
        npm install netlify-cli -g
        ```
     2. Deploy:
        ```bash
        netlify deploy
        ```
     3. Follow the prompts to upload the production build.
   - **Custom Hosting (e.g., AWS, DigitalOcean):**

     1. Build the project:
        ```bash
        yarn build
        ```
     2. Serve the `/out` directory using your preferred hosting service.
7. Blog sample:


---
title: "My First Blog Post"
date: "2025-07-08"
excerpt: "This is a summary of my first post. Learning how to build a blog with Next.js is exciting!"
coverImage: "https://placehold.co/600x400/1E1E1E/32CD32?text=First+Post"
category: ["Personal Thoughts","",]
tags: ["Next.js", "React", "Web Dev"]
readTime: "3 min"
---

## Welcome to My Blog!

This is the main content of my first blog post. Writing in Markdown is simple and intuitive.

You can use all standard Markdown features, like:
- Lists
- **Bold text**
- *Italic text*
- `inline code`