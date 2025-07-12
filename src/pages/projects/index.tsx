import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  CardActions,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { PROJECTS_DATA } from "@/utils/projectData";
import { useRouter } from "next/router";
import Link from "next/link";
import { OpenInNew, Code } from "@mui/icons-material";

// --- ANIMATION VARIANTS ---
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

// --- MAIN COMPONENT ---
const ProjectPage = () => {
  const theme = useTheme();
  const [filter, setFilter] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");
  const { basePath } = useRouter();

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = PROJECTS_DATA.projects
    .filter((project) =>
      filter === "All" ? true : project.technologies.includes(filter)
    )
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ p: { xs: 2, sm: 4 }, maxWidth: "1200px", mx: "auto" }}>
      {/* --- HEADER --- */}
      <Box
        sx={{ textAlign: "center", mb: 6 }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
          }}>
          {PROJECTS_DATA.header.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {PROJECTS_DATA.header.subtitle}
        </Typography>
      </Box>

      {/* --- FILTER & SEARCH PANEL --- */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          mb: 5,
          p: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.2)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          border: `1px solid ${theme.palette.divider}`,
        }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search projects..."
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Tabs
              value={filter}
              onChange={handleFilterChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="Project filter tabs">
              <Tab label="All" value="All" />
              <Tab label="Java" value="Java" />
              <Tab label="Next.js" value="Next.js" />
              <Tab label="React.js" value="React.js" />
              <Tab label="PostgreSQL" value="PostgreSQL" />
            </Tabs>
          </Grid>
        </Grid>
      </Box>

      {/* --- PROJECTS GRID --- */}
      <Grid container spacing={4}>
        {filteredProjects.map((project) => {
          const imageUrl = project.thumbnail.startsWith("http")
            ? project.thumbnail
            : `${basePath}/${project.thumbnail}`;

          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={project.slug}
              component={motion.div}
              variants={itemVariants}>
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
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
                  },
                }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imageUrl}
                  alt={project.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1, minHeight: "60px" }}>
                    {project.description}
                  </Typography>
                </CardContent>
                <CardContent sx={{ pt: 0 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    sx={{ mb: 2 }}>
                    {project.technologies.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{
                    p: 2,
                    pt: 0,
                    mt: "auto",
                    justifyContent: "space-between",
                  }}>
                  <Button
                    component={Link}
                    href={`/projects/${project.slug}`}
                    size="small"
                    variant="contained">
                    Case Study
                  </Button>
                  <Stack direction="row" spacing={1}>
                    {project.liveDemo && (
                      <Button
                        size="small"
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<OpenInNew />}>
                        Demo
                      </Button>
                    )}
                    <Button
                      size="small"
                      variant="outlined"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<Code />}>
                      Code
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProjectPage;
