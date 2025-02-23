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
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// Mock blog data
const blogs = [
  {
    title: "Mastering Java Basics",
    category: "Java Tutorials",
    description: "A comprehensive guide to get started with Java programming.",
    thumbnail: "https://via.placeholder.com/400x200",
    date: "Feb 20, 2025",
    readTime: "5 min",
  },
  {
    title: "Tech Trends 2025",
    category: "Tech Tips",
    description: "Explore the latest trends shaping the tech world.",
    thumbnail: "https://via.placeholder.com/400x200",
    date: "Feb 18, 2025",
    readTime: "8 min",
  },
  {
    title: "Building Your Personal Brand",
    category: "Personal Thoughts",
    description: "Tips and strategies to create a strong online presence.",
    thumbnail: "https://via.placeholder.com/400x200",
    date: "Feb 15, 2025",
    readTime: "7 min",
  },
];

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  // background: "linear-gradient(to bottom right, #111827, #1e3a8a)",
  // color: theme.palette.common.white,
  // textAlign: "center",
  // padding: theme.spacing(6, 2),
  // position: "relative",
  // overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  border: `2px solid ${theme.palette.primary.main}`,
  transition:
    "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease",
  position: "relative",
  overflow: "hidden",
}));

const AnimatedBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  backgroundImage: `url('https://via.placeholder.com/1500x500?text=Background')`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  opacity: 0.2,
}));

const BlogCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease",
  boxShadow: theme.shadows[4],
  borderRadius: theme.spacing(2),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(5px)",
  ":hover": {
    transform: "scale(1.05)",
  },
}));

const BlogPage = () => {
  const theme = useTheme();
  const [category, setCategory] = React.useState("All");

  const handleCategoryChange = (event: any, newValue: any) => {
    setCategory(newValue);
  };

  const filteredBlogs =
    category === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === category);

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <AnimatedBackground />
        <Typography variant="h3" gutterBottom>
          Innovating Code, Sharing Thoughts
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover insights, tutorials, and personal experiences in tech.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 2 }}>
          Explore My Blogs
        </Button>
      </HeroSection>

      {/* Category Filter and Search */}
      <Box sx={{ padding: theme.spacing(4, 2), textAlign: "center" }}>
        <TextField
          variant="outlined"
          placeholder="Search blogs..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
          sx={{ width: "50%", marginBottom: theme.spacing(2) }}
        />
        <Tabs
          value={category}
          onChange={handleCategoryChange}
          centered
          sx={{ marginBottom: theme.spacing(4) }}>
          <Tab label="All" value="All" />
          <Tab label="Java Tutorials" value="Java Tutorials" />
          <Tab label="Tech Tips" value="Tech Tips" />
          <Tab label="Personal Thoughts" value="Personal Thoughts" />
        </Tabs>
      </Box>

      {/* Blog List */}
      <Grid container spacing={4} sx={{ padding: theme.spacing(4, 2) }}>
        {filteredBlogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BlogCard>
              <CardMedia
                component="img"
                height="140"
                image={blog.thumbnail}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ marginY: 2, flexWrap: "wrap" }}>
                  <Chip
                    label={blog.category}
                    color="primary"
                    variant="outlined"
                  />
                  <Typography variant="caption">
                    {blog.date} • {blog.readTime}
                  </Typography>
                </Stack>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ marginTop: 1 }}>
                  Read More
                </Button>
              </CardContent>
            </BlogCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogPage;
