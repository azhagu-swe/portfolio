import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedPostsData, PostFrontmatter } from "../../lib/blog";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

interface BlogIndexProps {
  allPostsData: (PostFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BlogIndexPage = ({ allPostsData }: BlogIndexProps) => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 } }}>
      <Box
        sx={{ textAlign: "center", mb: 6 }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
          }}>
          Blog
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Innovating Code, Sharing Thoughts
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {allPostsData.map((post) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={post.slug}
            component={motion.div}
            variants={itemVariants}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 10px 20px ${theme.palette.primary.light}44`,
                },
              }}>
              <CardMedia
                component="img"
                height="200"
                image={post.coverImage}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, mt: "auto" }}>
                <Button
                  component={Link}
                  href={`/blog/${post.slug}`}
                  fullWidth
                  variant="contained"
                  sx={{ "&:hover": { transform: "translateY(-2px)" } }}>
                  Read More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogIndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
};
