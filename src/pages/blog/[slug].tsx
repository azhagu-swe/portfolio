import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { getAllPostSlugs, getPostData, PostFrontmatter } from '../../lib/blog'; // Import the type
import { Box, Typography, Paper, Chip, Stack, Divider } from '@mui/material';

// FIX: Define the type for this page's props
interface PostPageProps {
  frontmatter: PostFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
}

const PostPage = ({ frontmatter, mdxSource }: PostPageProps) => { // Apply the type here
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: '800px', mx: 'auto' }}>
      <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, backgroundColor: 'transparent' }}>
        <Box component="header">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {frontmatter.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Chip label={frontmatter.category} color="primary" size="small" />
            <Typography variant="caption" color="text.secondary">
              {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • {frontmatter.readTime}
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box component="article" className="prose-styles">
          <MDXRemote {...mdxSource} />
        </Box>
      </Paper>
    </Box>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // FIX: Add a check to ensure params and params.slug exist
  if (!params?.slug) {
    return { notFound: true };
  }
  const postData = await getPostData(params.slug as string);
  return { props: { ...postData } };
};