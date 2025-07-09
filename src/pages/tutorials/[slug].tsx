import { GetStaticPaths } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getAllTutorialSlugs, getTutorialData } from "../../lib/tutorials";
import { Divider, Paper, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { TutorialFrontmatter } from "../../lib/tutorials";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  useTheme,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";

interface TutorialPageProps {
  frontmatter: TutorialFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TutorialPage = ({ frontmatter, mdxSource }: TutorialPageProps) => {
  const theme = useTheme();
  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 0, sm: 2 }, mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: "background.paper",
          borderRadius: { xs: 0, sm: "16px" },
          boxShadow: {
            xs: "none",
            sm: `0 8px 30px ${theme.palette.primary.light}33`,
          },
        }}>
        <Box component="header" sx={{ textAlign: "center" }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 2 }}>
            <Chip label={frontmatter.difficulty} color="primary" />
            <Chip label={frontmatter.duration} variant="outlined" />
          </Stack>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: { xs: "2.2rem", sm: "3rem" } }}>
            {frontmatter.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Published on{" "}
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        <CardMedia
          component="img"
          image={frontmatter.coverImage}
          alt={frontmatter.title}
          sx={{
            height: { xs: 200, sm: 300, md: 400 },
            borderRadius: "12px",
            my: 4,
            width: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          component="article"
          sx={{
            color: theme.palette.text.primary,
            "& h2": {
              ...theme.typography.h4,
              fontWeight: "bold",
              mt: 5,
              mb: 2,
              color: theme.palette.primary.main,
            },
            "& h3": {
              ...theme.typography.h5,
              fontWeight: "bold",
              mt: 4,
              mb: 1,
            },
            "& p": {
              ...theme.typography.body1,
              lineHeight: 1.8,
              mb: 2,
              textAlign: "justify",
            },
            "& a": {
              color: theme.palette.primary.main,
              textDecoration: "underline",
              fontWeight: "bold",
            },
            "& ul, & ol": { pl: 3 },
            "& li": { mb: 1, lineHeight: 1.8 },
            "& blockquote": {
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              pl: 2,
              ml: 0,
              my: 3,
              fontStyle: "italic",
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover,
              py: 1,
            },
            "& pre": {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1A202C" : "#F7FAFC",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "8px",
              p: 2,
              overflowX: "auto",
            },
            "& code": {
              fontFamily: "monospace",
              backgroundColor: "rgba(135, 131, 120, 0.15)",
              px: "4px",
              py: "2px",
              borderRadius: "4px",
            },
            "& pre > code": { backgroundColor: "transparent", px: 0, py: 0 },
            "& img": { maxWidth: "100%", borderRadius: "8px" },
          }}>
          <MDXRemote {...mdxSource} />
        </Box>
        <Divider sx={{ my: 4, borderColor: theme.palette.divider }} />
        <Box sx={{ textAlign: "center" }}>
          <Button
            component={Link}
            href="/tutorials"
            variant="outlined"
            startIcon={<ArrowBackIcon />}>
            Back to Tutorials
          </Button>
        </Box>
      </Paper>
    </Box>
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
