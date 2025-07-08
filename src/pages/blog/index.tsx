import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getSortedPostsData, PostFrontmatter } from '../../lib/blog'; // Import the type
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

// FIX: Define the type for the component's props
interface BlogIndexProps {
  allPostsData: (PostFrontmatter & { slug: string })[];
}

const BlogIndexPage = ({ allPostsData }: BlogIndexProps) => { // Apply the type here
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>Blog</Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 5 }}>
        Innovating Code, Sharing Thoughts
      </Typography>

      <Grid container spacing={4}>
        {allPostsData.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={post.coverImage}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">{post.excerpt}</Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button component={Link} href={`/blog/${post.slug}`} fullWidth variant="contained">
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