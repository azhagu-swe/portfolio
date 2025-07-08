import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { blogs } from "../../utils/blogData";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import { Twitter, LinkedIn, Link as LinkIcon } from "@mui/icons-material";
import { HERO_DATA } from "@/utils/heroData";

interface PostProps {
  post: {
    [key: string]: any;
  };
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  const router = useRouter(); // FIX 1: Moved to the top

  if (!post) {
    return <Typography>Post not found!</Typography>;
  }

  const { basePath } = router;
  const postUrl = `https://azhagu-swe.github.io/portfolio/blog/${post.slug}`;

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: "800px", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, sm: 4 }, backgroundColor: "transparent" }}
      >
        {/* Post Header */}
        <Box component="header">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            {post.title}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
          >
            <Chip label={post.category} color="primary" size="small" />
            <Typography variant="caption" color="text.secondary">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • {post.readTime}
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Post Content */}
        <Box component="article">
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {post.content}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Author Box & Social Share */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              alt="Azhagu"
              src={`${basePath}${HERO_DATA.images.profile}`}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Azhagu-swe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Full Stack Developer.
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Share:
            </Typography>
            <IconButton
              size="small"
              component="a"
              href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${post.title}`}
              target="_blank"
              aria-label="Share on Twitter"
            >
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component="a"
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${post.title}`}
              target="_blank"
              aria-label="Share on LinkedIn"
            >
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => navigator.clipboard.writeText(postUrl)}
              aria-label="Copy link"
            >
              <LinkIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PostPage;


export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogs.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = blogs.find((p) => p.slug === params?.slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
  };
};