import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router"; // Import useRouter
import { PostFrontmatter } from "@/lib/blog";

interface BlogCardProps {
  post: PostFrontmatter & { slug: string };
  basePath: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BlogCard = ({ post, basePath }: BlogCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${basePath}${post.coverImage}`;

  const handleCategoryClick = (e: React.MouseEvent, cat: string) => {
    e.stopPropagation();
    router.push(`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    router.push(`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    // <Link
    //   href={`/blog/${post.slug}`}
    //   passHref
    //   style={{ textDecoration: "none", height: "100%" }}>
      <motion.div variants={itemVariants} style={{ height: "100%" }}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.02)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
            },
          }}>
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={post.title}
          />
          <CardContent
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1 }}>
              {(Array.isArray(post.category) ? post.category : [post.category]).map((cat: string) => (
                <Chip
                  key={cat}
                  label={cat}
                  color="primary"
                  size="small"
                  variant="outlined"
                  clickable
                  onClick={(e) => handleCategoryClick(e, cat)}
                />
              ))}
              <Typography variant="caption" color="text.secondary">
                {post.readTime}
              </Typography>
            </Stack>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", flexGrow: 1, mt: 1 }}>
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {post.excerpt}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: "auto", mb: 2 }}>
              {post.tags.map((tag: string) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  variant="filled"
                  clickable
                  sx={{ backgroundColor: "action.hover" }}
                  onClick={(e) => handleTagClick(e, tag)} // Use the new handler
                />
              ))}
            </Stack>
          </CardContent>
          <Box sx={{ p: 2, pt: 0, mt: "auto" }}>
            <Button fullWidth variant="contained" color="secondary">
              Read More
            </Button>
          </Box>
        </Card>
      </motion.div>
    // </Link>
  );
};

export default BlogCard;
