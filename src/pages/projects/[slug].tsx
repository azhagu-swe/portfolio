import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  getAllProjectSlugs,
  getProjectData,
  ProjectFrontmatter,
} from "@/lib/projects";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  Button,
  useTheme,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { OpenInNew, Code } from "@mui/icons-material";
import { useRouter } from "next/router";
import CodeBlock from "@/components/mdx/CodeBlock";

// --- TYPE DEFINITIONS ---
interface ProjectCaseStudyProps {
  frontmatter: ProjectFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const generateSlug = (node: React.ReactNode): string => {
  if (typeof node === "string") {
    return node
      .toLowerCase()
      .replace(/^\d+\.\s/, "")
      .replace(/\s/g, "-")
      .replace(/[^\w-]+/g, "");
  }
  if (Array.isArray(node)) {
    const firstString = node.find((child) => typeof child === "string");
    if (firstString) {
      return generateSlug(firstString);
    }
  }
  return "";
};

const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(props.children);
  return <h2 id={slug} {...props}></h2>;
};

const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(props.children);
  return <h3 id={slug} {...props}></h3>;
};

const ProjectCaseStudyPage = ({
  frontmatter,
  mdxSource,
}: ProjectCaseStudyProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;

  const imageUrl = frontmatter.thumbnail.startsWith("http")
    ? frontmatter.thumbnail
    : `${basePath}${frontmatter.thumbnail}`;
  const components = {
    h2: H2,
    h3: H3,
    pre: CodeBlock,
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          position: "relative",
          height: { xs: "30vh", sm: "40vh" },
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
          mb: 6,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
            zIndex: 1,
          },
        }}>
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
            }}>
            {frontmatter.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 1, color: "rgba(255, 255, 255, 0.8)" }}>
            Case Study
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          md={8}
          component={motion.div}
          variants={itemVariants}>
          <Paper elevation={0} sx={{ backgroundColor: "transparent" }}>
            <Box
              component="article"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "1.1rem",
                "& h2, & h3": { scrollMarginTop: "80px" },
                "& h2": {
                  ...theme.typography.h4,
                  fontWeight: "bold",
                  mt: 5,
                  mb: 2,
                  color: theme.palette.primary.main,
                  borderLeft: `4px solid ${theme.palette.primary.dark}`,
                  paddingLeft: 2,
                },
                "& h3": {
                  ...theme.typography.h5,
                  fontWeight: "bold",
                  mt: 4,
                  mb: 1,
                  color: theme.palette.primary.light,
                },
                "& p": { ...theme.typography.body1, lineHeight: 1.8, mb: 2 },
                "& a": {
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                },
                "& ul, & ol": { pl: 3, mb: 2 },
                "& li": { mb: 1, lineHeight: 1.8 },
                "& pre": {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1A202C" : "#F7FAFC",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                  p: 2,
                  overflowX: "auto",
                  my: 3,
                },
                "& code": {
                  fontFamily: "monospace",
                  backgroundColor: "rgba(135, 131, 120, 0.15)",
                  px: "4px",
                  py: "2px",
                  borderRadius: "4px",
                  color: theme.palette.text.primary,
                },
                "& pre > code": { backgroundColor: "transparent", p: 0 },
              }}>
              <MDXRemote {...mdxSource} components={components} />
            </Box>
          </Paper>
        </Grid>

        {/* Sticky Sidebar */}
        <Grid
          item
          xs={12}
          md={4}
          component={motion.div}
          variants={itemVariants}>
          <Box sx={{ position: "sticky", top: "80px" }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: "12px",
                border: `1px solid ${theme.palette.divider}`,
              }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Project Info
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}>
                Tech Stack
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{ mb: 3 }}>
                {frontmatter.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}>
                Links
              </Typography>
              <Stack spacing={1}>
                {frontmatter.liveDemo && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    href={frontmatter.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<OpenInNew />}>
                    Live Demo
                  </Button>
                )}
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  href={frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Code />}>
                  GitHub
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Box sx={{ textAlign: "center" }}>
        <Button
          component={Link}
          href="/projects"
          variant="outlined"
          startIcon={<ArrowBackIcon />}>
          Back to All Projects
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectCaseStudyPage;

// --- DATA FETCHING FUNCTIONS ---
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProjectSlugs();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  const projectData = await getProjectData(params.slug as string);
  return {
    props: { ...projectData },
  };
};
