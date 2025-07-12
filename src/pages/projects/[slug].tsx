import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { PROJECTS_DATA } from "@/utils/projectData";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// --- TYPE DEFINITIONS ---
interface Project {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  liveDemo?: string;
  github: string;
}

interface ProjectCaseStudyPageProps {
  project: Project | null;
}

// --- MAIN COMPONENT ---
const ProjectCaseStudyPage = ({ project }: ProjectCaseStudyPageProps) => {
  if (!project) {
    return <Typography>Project not found.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "900px", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, sm: 4 }, backgroundColor: "transparent" }}>
        <Box component="header" sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            {project.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Case Study
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* You can add more detailed content here */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            The Problem
          </Typography>
          <Typography variant="body1" paragraph>
            This is where you would describe the challenge or opportunity that
            led to the creation of this project. For example, for FarmConnect,
            the problem might have been the disconnect between local farmers and
            consumers in the digital marketplace.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            My Solution
          </Typography>
          <Typography variant="body1" paragraph>
            {`Here, you can detail the architecture, key features, and the steps you took to build the application. Mention specific technologies and why you chose them. For example: "I architected a full-stack solution using Spring Boot for the backend to ensure robustness and React for the frontend to create a dynamic user experience."`}
          </Typography>
        </Box>

        <Box component="section">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Tech Stack
          </Typography>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {project.technologies.map((tech) => (
              <Chip key={tech} label={tech} color="primary" />
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "center" }}>
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            startIcon={<ArrowBackIcon />}>
            Back to All Projects
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectCaseStudyPage;


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PROJECTS_DATA.projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return {
      props: { project: null },
    };
  }

  const project =
    PROJECTS_DATA.projects.find((p) => p.slug === params.slug) || null;

  return {
    props: { project },
  };
};
