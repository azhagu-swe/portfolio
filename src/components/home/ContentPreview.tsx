import React from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { PostFrontmatter } from "@/lib/blog";
import { TutorialFrontmatter } from "@/lib/tutorials";
import { AccessTime, Book, School } from "@mui/icons-material";

interface ContentPreviewProps {
  posts: (PostFrontmatter & { slug: string })[];
  tutorials: (TutorialFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const ContentPreview: React.FC<ContentPreviewProps> = ({ posts, tutorials }) => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;

  const handleViewAllBlogPosts = () => {
    router.push("/blog");
  };

  const handleViewAllTutorials = () => {
    router.push("/tutorials");
  };

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 2, sm: 3, lg: 4 },
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {/* Blog Posts Section */}
      <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6, md: 8 } }}>
        <Typography
          variant="h3"
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            fontWeight: 800,
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" },
          }}
        >
          Latest Articles & Insights
        </Typography>
        <Typography
          variant="h6"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mx: "auto",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
          }}
        >
          Sharing knowledge through technical articles, tutorials, and industry insights
        </Typography>
      </Box>

      {/* Blog Posts Preview */}
      <Box sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
            }}
          >
            <Book sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" } }} />
            Blog Posts
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleViewAllBlogPosts}
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              fontWeight: 600,
              borderRadius: "50px",
              borderWidth: "2px",
              "&:hover": {
                borderWidth: "2px",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            View All Posts
          </Button>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={post.slug}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-8px)" },
                    boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 180, sm: 200, md: 220 },
                    objectFit: "cover",
                  }}
                  image={
                    post.coverImage.startsWith("http")
                      ? post.coverImage
                      : `${basePath}${post.coverImage}`
                  }
                  alt={post.title}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Chip
                      label={post.readTime}
                      size="small"
                      icon={<AccessTime sx={{ fontSize: "0.8rem" }} />}
                      sx={{
                        height: { xs: 20, sm: 24 },
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: 1, sm: 1.5 },
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                    }}
                  >
                    {post.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: { xs: 1.5, sm: 2 },
                      flexGrow: 1,
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    }}
                  >
                    {post.excerpt}
                  </Typography>

                  <Box sx={{ mt: "auto" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 0.5, sm: 1 },
                        mb: 2,
                      }}
                    >
                      {(Array.isArray(post.category)
                        ? post.category
                        : [post.category]
                      ).map((cat: string) => (
                        <Chip
                          key={cat}
                          label={cat}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            fontSize: { xs: "0.65rem", sm: "0.75rem" },
                            height: { xs: 20, sm: 24 },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/categories/${cat
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`
                            );
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tutorials Preview */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.secondary.main,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
            }}
          >
            <School sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" } }} />
            Tutorials
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleViewAllTutorials}
            sx={{
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              fontWeight: 600,
              borderRadius: "50px",
              borderWidth: "2px",
              "&:hover": {
                borderWidth: "2px",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            View All Tutorials
          </Button>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tutorials.map((tutorial) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={tutorial.slug}
              component={motion.div}
              variants={itemVariants}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-8px)" },
                    boxShadow: `0 15px 30px ${theme.palette.secondary.main}55`,
                    borderColor: theme.palette.secondary.main,
                  },
                }}
                onClick={() => router.push(`/tutorials/${tutorial.slug}`)}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 180, sm: 200, md: 220 },
                    objectFit: "cover",
                  }}
                  image={
                    tutorial.coverImage.startsWith("http")
                      ? tutorial.coverImage
                      : `${basePath}${tutorial.coverImage}`
                  }
                  alt={tutorial.title}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
                  >
                    <Chip
                      label={tutorial.difficulty}
                      size="small"
                      color={
                        tutorial.difficulty === "Beginner"
                          ? "success"
                          : tutorial.difficulty === "Intermediate"
                          ? "warning"
                          : "error"
                      }
                      sx={{
                        height: { xs: 20, sm: 24 },
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      }}
                    />
                    <Chip
                      label={tutorial.duration}
                      size="small"
                      icon={<AccessTime sx={{ fontSize: "0.8rem" }} />}
                      sx={{
                        height: { xs: 20, sm: 24 },
                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: { xs: 1, sm: 1.5 },
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                    }}
                  >
                    {tutorial.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: { xs: 1.5, sm: 2 },
                      flexGrow: 1,
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                    }}
                  >
                    {tutorial.excerpt}
                  </Typography>

                  <Box sx={{ mt: "auto" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 0.5, sm: 1 },
                        mb: 2,
                      }}
                    >
                      {tutorial.tags.map((tag: string) => (
                        <Chip
                          key={tag}
                          label={`#${tag}`}
                          size="small"
                          variant="filled"
                          sx={{
                            backgroundColor: "action.hover",
                            height: { xs: 20, sm: 24 },
                            fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`
                            );
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ContentPreview;