import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import Link from "next/link";
import { blogs } from "@/utils/blogData"; 

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 2),
  borderRadius: "12px",
  textAlign: "center",
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
}));

const AnimatedBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
  backgroundImage: `url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=tinysrgb&w=1500')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  opacity: theme.palette.mode === "dark" ? 0.15 : 0.05,
  filter: "blur(2px)",
}));

const BlogCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: theme.shadows[2],
  borderRadius: theme.shape.borderRadius,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const BlogIndexPage = () => {
  const theme = useTheme();
  const [category, setCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCategoryChange = (event: any, newValue: any) => {
    setCategory(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = category === "All" || blog.category === category;

    const matchesSearch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ p: 4 }}>
      {/* Hero Section */}
      <HeroSection>
        <AnimatedBackground />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h3" gutterBottom>
            Innovating Code, Sharing Thoughts
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Discover insights, tutorials, and personal experiences in tech.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: 2 }}>
            Explore My Blogs
          </Button>
        </Box>
      </HeroSection>

      {/* Category Filter and Search */}
      <Box sx={{ padding: theme.spacing(4, 0), textAlign: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search blogs..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
          sx={{
            maxWidth: "400px",
            width: "100%",
            marginBottom: theme.spacing(2),
          }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Tabs
          value={category}
          onChange={handleCategoryChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{ marginBottom: theme.spacing(4) }}>
          <Tab label="All" value="All" />
          <Tab label="Java Tutorials" value="Java Tutorials" />
          <Tab label="Tech Tips" value="Tech Tips" />
          <Tab label="Personal Thoughts" value="Personal Thoughts" />
        </Tabs>
      </Box>

      {/* Blog List */}
      <Grid container spacing={4}>
        {filteredBlogs.map(
          (
            blog // Changed key to blog.slug for a unique identifier
          ) => (
            <Grid item xs={12} sm={6} md={4} key={blog.slug}>
              <BlogCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.thumbnail}
                  alt={blog.title}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <Chip
                    label={blog.category}
                    color="primary"
                    variant="filled"
                    size="small"
                    sx={{ mb: 1, alignSelf: "flex-start" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}>
                    {blog.description}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2, flexWrap: "wrap", gap: 0.5 }}>
                    {blog.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, mt: "auto" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {blog.date} • {blog.readTime}
                    </Typography>
                    <IconButton size="small" aria-label="share">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                  {/* NEW: Updated Button to use Next.js Link for navigation */}
                  <Button
                    component={Link}
                    href={`/blog/${blog.slug}`}
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth>
                    Read More
                  </Button>
                </Box>
              </BlogCard>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default BlogIndexPage;
