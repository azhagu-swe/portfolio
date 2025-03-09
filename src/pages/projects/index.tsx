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
import { PROJECTS_DATA } from "@/utils/projectData";
import { useRouter } from "next/router";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease",
  boxShadow: theme.shadows[4],
  height: "100%", // Ensure all cards have the same height
  display: "flex",
  flexDirection: "column",
  ":hover": {
    transform: "scale(1.03)",
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  flexGrow: 1, // Allow content to grow and fill the card
  display: "flex",
  flexDirection: "column",
}));

const ProjectPage = () => {
  const [filter, setFilter] = React.useState("All");
    const { basePath } = useRouter();
  

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const filteredProjects =
    filter === "All"
      ? PROJECTS_DATA.projects
      : PROJECTS_DATA.projects.filter((project) =>
          project.technologies.includes(filter)
        );

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" align="center" gutterBottom>
        {PROJECTS_DATA.header.title}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        {PROJECTS_DATA.header.subtitle}
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
          <Tab label="Java" value="Java" />
          <Tab label="Next.js" value="Next.js" />
          <Tab label="React.js" value="React.js" />
          <Tab label="PostgreSQL" value="PostgreSQL" />
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
                image={`${basePath}/`+project.thumbnail}
                alt={project.title}
                sx={{ objectFit: "cover" }} // Ensure images are uniformly sized
              />
              <CardContentWrapper>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }} // Allow description to grow and fill space
                >
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
                      size="small"
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={2}>
                  {project.liveDemo&&<Button
                    size="small"
                    variant="contained"
                    color="primary"
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer">
                    Live Demo
                  </Button>}
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
              </CardContentWrapper>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectPage;
