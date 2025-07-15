import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { PostFrontmatter } from "../../lib/blog";

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
}

const PostHeader = ({ frontmatter }: PostHeaderProps) => {
  return (
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
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {(Array.isArray(frontmatter.category)
            ? frontmatter.category
            : [frontmatter.category]
          ).map((cat) => (
            <Chip
              key={cat}
              label={cat}
              color="primary"
              sx={{
                backgroundColor: "rgba(50, 205, 50, 0.2)",
                color: "#76FF7A",
                border: "1px solid #76FF7A",
              }}
            />
          ))}
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
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {frontmatter.readTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostHeader;
