import React from "react";
import { Container, Box } from "@mui/material";
import HeroSection from "../components/HeroSection";
import Head from "next/head";
import VisitorCounter from "@/components/VisitorsCounter";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
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
      <VisitorCounter /> 
    </Container>
  );
}