import React from "react";
import { Container } from "@mui/material";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "@/components/ProjectSection";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <ProjectsSection /> */}
    </Container>
  );
}
