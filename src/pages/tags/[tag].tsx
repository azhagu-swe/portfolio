// File: src/pages/tags/[tag].tsx
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Typography, Grid } from "@mui/material";
import BlogCard from "@/components/blog/BlogCard";
import { useRouter } from "next/router";
import { getAllTags, getPostsByTag, PostFrontmatter } from "@/lib/blog";

interface TagPageProps {
  posts: (PostFrontmatter & { slug: string })[];
  tag: string;
}

const TagPage = ({ posts, tag }: TagPageProps) => {
  const router = useRouter();
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Posts tagged with
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            fontFamily: "Orbitron, sans-serif",
          }}>
          #{tag.replace(/-/g, " ")}
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

export default TagPage;

// FIX: Renamed from getStaticPaths_Category to getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags();
  return { paths, fallback: false };
};

// FIX: Renamed from getStaticProps_Category to getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.tag) return { notFound: true };
  const posts = getPostsByTag(params.tag as string);
  return { props: { posts, tag: params.tag } };
};
