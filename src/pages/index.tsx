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
      </Head>
      <HeroSection />
      <VisitorCounter /> 
    </Container>
  );
}