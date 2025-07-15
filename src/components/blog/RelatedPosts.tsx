import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { PostFrontmatter } from "../../lib/blog";

type PostWithSlug = PostFrontmatter & { slug: string };

interface RelatedPostsProps {
  posts: PostWithSlug[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}>
        Related Posts
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} md={4} key={post.slug}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
              <CardActionArea component={Link} href={`/blog/${post.slug}`}>
                <CardMedia
                  component="img"
                  height="160"
                  image={post.coverImage}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.excerpt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedPosts;
