import React from "react";
import { GetStaticProps } from "next";
import { Container } from "@mui/material";
import HeroSection from "@/components/home/HeroSection";
import SkillsShowcase from "@/components/home/SkillsShowcase";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ExperienceSection from "@/components/home/ExperienceSection";
import CallToAction from "@/components/home/CallToAction";
import Head from "next/head";
import VisitorsCounter from "@/components/home/VisitorsCounter";
import { getSortedProjectsData, ProjectFrontmatter } from "@/lib/projects";
import { getSortedPostsData, PostFrontmatter } from "@/lib/blog";
import { getSortedTutorialsData, TutorialFrontmatter } from "@/lib/tutorials";
import ContentPreview from "@/components/home/ContentPreview";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

interface HomePageProps {
  projects: (ProjectFrontmatter & { slug: string })[];
  posts: (PostFrontmatter & { slug: string })[];
  tutorials: (TutorialFrontmatter & { slug: string })[];
}

export default function HomePage({ projects, posts, tutorials }: HomePageProps) {
  return (
    <Container maxWidth={false} disableGutters>
      <Head>
        <title>Azhagu-swe Portfolio</title>
        <meta name="description" content="Software Engineer with 3+ years of hands-on experience in building scalable microservices and full-stack solutions using Java and Spring Boot. Passionate about leveraging modern technologies to solve complex problems and optimize system performance." />
        <meta name="keywords" content="Software Engineer, Java, Spring Boot, Full Stack Developer, Microservices, Web Development" />
        <meta property="og:title" content="Azhagu-swe Portfolio" />
        <meta property="og:description" content="Software Engineer with 3+ years of hands-on experience in building scalable microservices and full-stack solutions using Java and Spring Boot." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://azhagu-swe.github.io/portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Azhagu-swe Portfolio" />
        <meta name="twitter:description" content="Software Engineer with 3+ years of hands-on experience in building scalable microservices and full-stack solutions using Java and Spring Boot." />
        <link rel="canonical" href="https://azhagu-swe.github.io/portfolio" />
      </Head>
      <HeroSection />
      <ExperienceSection />
      <SkillsShowcase />
      <ProjectsPreview projects={projects} />
      <ContentPreview posts={posts.slice(0, 3)} tutorials={tutorials.slice(0, 3)} />
      <VisitorsCounter /> 
      <CallToAction />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = getSortedProjectsData();
  const posts = getSortedPostsData();
  const tutorials = getSortedTutorialsData();
  
  return {
    props: {
      projects,
      posts,
      tutorials
    }
  };
};