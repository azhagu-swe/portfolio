import React from "react";
import { GetStaticProps } from "next";
import { Container } from "@mui/material";
import HeroSection from "../components/HeroSection";
import SkillsShowcase from "../components/SkillsShowcase";
import ProjectsPreview from "../components/ProjectsPreview";
import ExperienceSection from "../components/ExperienceSection";
import CallToAction from "../components/CallToAction";
import Head from "next/head";
import VisitorCounter from "@/components/VisitorsCounter";
import { getSortedProjectsData, ProjectFrontmatter } from "@/lib/projects";

interface HomePageProps {
  projects: (ProjectFrontmatter & { slug: string })[];
}

export default function HomePage({ projects }: HomePageProps) {
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
      <VisitorCounter /> 
      <CallToAction />
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = getSortedProjectsData();
  return {
    props: {
      projects
    }
  };
};