import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {
  getAllTutorialSlugs,
  getTutorialData,
  TutorialFrontmatter,
} from "../../lib/tutorials";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Divider,
  useTheme,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import CodeBlock from "@/components/mdx/CodeBlock";

// --- TYPE DEFINITIONS ---
interface Heading {
  text: string;
  level: number;
  slug: string;
  number: string; // NEW: Added to hold the number like "1." or "1.1"
}

interface TutorialPageProps {
  frontmatter: TutorialFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  headings: Heading[];
}

// --- READING PROGRESS BAR COMPONENT ---
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #FFC107, #32CD32)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 1000,
      }}
    />
  );
};

// --- TABLE OF CONTENTS COMPONENT ---
const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  const theme = useTheme();
  return (
    <Box sx={{ position: "sticky", top: "80px" }}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
        }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Table of Contents
        </Typography>
        <List dense>
          {headings.map((heading) => (
            <ListItem key={heading.slug} disablePadding>
              <ListItemButton
                component="a"
                href={`#${heading.slug}`}
                sx={{ pl: heading.level === 3 ? 4 : 2 }}>
                <ListItemText primary={`${heading.number} ${heading.text}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
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

const TutorialPage = ({
  frontmatter,
  mdxSource,
  headings,
}: TutorialPageProps) => {
  const theme = useTheme();

 const components = {
    h2: H2,
    h3: H3,
    pre: CodeBlock,
  };
  return (
    <>
      <ReadingProgressBar />
      <Box sx={{ maxWidth: "1200px", mx: "auto", p: { xs: 2, sm: 4 } }}>
        <Box
          sx={{
            position: "relative",
            height: "45vh",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 4,
            mb: 4,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${frontmatter.coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.4)",
              zIndex: 1,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%)",
              zIndex: 1,
            },
          }}>
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1 }}>
              <Chip
                label={frontmatter.difficulty}
                color="primary"
                sx={{
                  backgroundColor: "rgba(50, 205, 50, 0.2)",
                  color: "#76FF7A",
                  border: "1px solid #76FF7A",
                }}
              />
              <Chip
                label={frontmatter.duration}
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
              />
            </Stack>
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
              variant="body1"
              sx={{ mt: 1, color: "rgba(255, 255, 255, 0.8)" }}>
              Published on{" "}
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
        </Box>

        {/* --- TWO-COLUMN LAYOUT --- */}
        <Grid container spacing={5}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
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
            sx={{ display: { xs: "none", md: "block" } }}>
            <TableOfContents headings={headings} />
          </Grid>
        </Grid>

        {/* Back to Tutorials Button */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            component={Link}
            href="/tutorials"
            variant="outlined"
            startIcon={<ArrowBack />}>
            Back to All Tutorials
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TutorialPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTutorialSlugs();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  const tutorialData = await getTutorialData(params.slug as string);
  return { props: { ...tutorialData } };
};
