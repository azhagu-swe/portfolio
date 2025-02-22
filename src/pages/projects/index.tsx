import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

// Mock project data
const projects = [
  {
    title: "Portfolio Website",
    description:
      "A responsive personal portfolio showcasing skills, projects, and branding with a modern design.",
    technologies: ["Next.js", "TypeScript", "Material-UI"],
    thumbnail: "https://via.placeholder.com/400x200",
    liveDemo: "https://portfolio.example.com",
    github: "https://github.com/user/portfolio",
  },
  {
    title: "E-Commerce Application",
    description:
      "A feature-rich e-commerce platform simplifying online shopping with a seamless user experience.",
    technologies: ["React.js", "Redux", "Node.js", "MongoDB"],
    thumbnail: "https://via.placeholder.com/400x200",
    liveDemo: "https://ecommerce.example.com",
    github: "https://github.com/user/ecommerce",
  },
  {
    title: "Proximity Hash Algorithm",
    description:
      "An innovative proximity-based hashing system for efficient spatial data storage and retrieval.",
    technologies: ["Java", "Geohash"],
    thumbnail: "https://via.placeholder.com/400x200",
    liveDemo: "https://proximityhash.example.com",
    github: "https://github.com/user/proximity-hash",
  },
];

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease",
  boxShadow: theme.shadows[4],
  ":hover": {
    transform: "scale(1.03)",
  },
}));

const ProjectPage = () => {
  const [filter, setFilter] = React.useState("All");

  const handleFilterChange = (event:any, newValue:any) => {
    setFilter(newValue);
  };

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.technologies.includes(filter));

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" align="center" gutterBottom>
        My Projects
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        A showcase of innovation, creativity, and technical expertise.
      </Typography>

      {/* Search and Filter Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}>
        <TextField
          variant="outlined"
          placeholder="Search projects..."
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          }}
          sx={{ width: "50%" }}
        />
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          aria-label="Project filter tabs">
          <Tab label="All" value="All" />
          <Tab label="Next.js" value="Next.js" />
          <Tab label="React.js" value="React.js" />
          <Tab label="Java" value="Java" />
        </Tabs>
      </Box>

      {/* Projects Grid */}
      <Grid container spacing={4}>
        {filteredProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard>
              <CardMedia
                component="img"
                height="140"
                image={project.thumbnail}
                alt={project.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ marginY: 2, flexWrap: "wrap" }}>
                  {project.technologies.map((tech, i) => (
                    <Chip
                      key={i}
                      label={tech}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer">
                    Live Demo
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer">
                    GitHub
                  </Button>
                </Stack>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectPage;
