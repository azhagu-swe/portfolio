import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Typography, Grid } from "@mui/material";
import BlogCard from "@/components/blog/BlogCard";
import { useRouter } from "next/router";
import {
  getAllCategories,
  getPostsByCategory,
  PostFrontmatter,
} from "@/lib/blog";

interface CategoryPageProps {
  posts: (PostFrontmatter & { slug: string })[];
  category: string;
}

const CategoryPage = ({ posts, category }: CategoryPageProps) => {
  const router = useRouter();
  const formattedCategory = category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Posts in category
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            fontFamily: "Orbitron, sans-serif",
          }}>
          {formattedCategory}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <BlogCard post={post} basePath={router.basePath} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryPage;
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCategories();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.category || typeof params.category !== "string") {
    return { notFound: true };
  }

  const posts = getPostsByCategory(params.category);
  return { props: { posts, category: params.category } };
};
