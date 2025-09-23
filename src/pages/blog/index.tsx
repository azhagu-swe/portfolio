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
  Chip,
  TextField,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import BlogCard from "@/components/blog-page/BlogCard";

// --- TYPE DEFINITIONS ---
interface BlogIndexProps {
  allPostsData: (PostFrontmatter & { slug: string })[];
}

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BlogIndexPage = ({ allPostsData }: BlogIndexProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredPosts = allPostsData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
  );

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  const handleChipClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    router.push(path);
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ 
        p: { xs: 2, sm: 3, md: 4 }, 
        maxWidth: "1200px", 
        mx: "auto",
        width: "100%"
      }}
    >
      <Box
        sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 6 } }}
        component={motion.div}
        variants={itemVariants}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mb: 1
          }}
        >
          My Blog
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
        >
          Innovating Code, Sharing Thoughts
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
        <TextField
          variant="outlined"
          placeholder="Search articles by title or tag..."
          size="small"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
            ),
          }}
          sx={{ 
            width: { xs: "100%", sm: "80%", md: "60%" },
            maxWidth: "600px",
            "& .MuiInputBase-root": {
              fontSize: { xs: "0.9rem", sm: "1rem" }
            }
          }}
        />
      </Box>

      {featuredPost && (
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }} component={motion.div} variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" }
            }}
          >
            Featured Article
          </Typography>
          <Link href={`/blog/${featuredPost.slug}`} passHref>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-10px)" },
                  boxShadow: `0 20px 40px ${theme.palette.primary.main}44`,
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: "45%" },
                  height: { xs: 250, md: "auto" },
                  objectFit: "cover",
                }}
                image={
                  featuredPost.coverImage.startsWith("http")
                    ? featuredPost.coverImage
                    : `${basePath}${featuredPost.coverImage}`
                }
                alt={featuredPost.title}
              />
              <CardContent
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: { xs: "100%", md: "55%" },
                }}
              >
                <Stack direction="row" spacing={1} sx={{ mb: 2, alignSelf: "flex-start" }}>
                  {(Array.isArray(featuredPost.category) ? featuredPost.category : [featuredPost.category]).map((cat) => (
                    <Chip
                      key={cat}
                      label={cat}
                      color="primary"
                      size="small"
                      variant="outlined"
                      clickable
                      onClick={(e) => handleChipClick(e, `/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                      sx={{
                        height: { xs: 20, sm: 24 },
                        fontSize: { xs: "0.65rem", sm: "0.75rem" }
                      }}
                    />
                  ))}
                </Stack>

                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", mb: 1, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
                >
                  {featuredPost.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  {featuredPost.excerpt}
                </Typography>
                <Button 
                  variant="contained"
                  sx={{
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    alignSelf: "flex-start"
                  }}
                >
                  Start Reading
                </Button>
              </CardContent>
            </Card>
          </Link>
        </Box>
      )}

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {otherPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.slug}>
            <BlogCard post={post} basePath={router.basePath} />
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
