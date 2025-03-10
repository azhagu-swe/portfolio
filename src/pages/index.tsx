import React from "react";
import { Container } from "@mui/material";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "@/components/ProjectSection";
import Head from "next/head";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Head><title>Azhagu-swe Portfolio</title></Head>
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <ProjectsSection /> */}
    </Container>
  );
}
