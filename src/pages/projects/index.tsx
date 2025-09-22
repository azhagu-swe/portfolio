import React from "react";
import { GetStaticProps } from "next";
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
import { getSortedProjectsData, ProjectFrontmatter } from "@/lib/projects";
import { useRouter } from "next/router";
import Link from "next/link";
import { OpenInNew, Code } from "@mui/icons-material";

interface ProjectPageProps {
  allProjectsData: (ProjectFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ProjectPage = ({ allProjectsData }: ProjectPageProps) => {
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

  const filteredProjects = allProjectsData
    .filter((project) =>
      filter === "All" ? true : project.technologies.includes(filter)
    )
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const featuredProject = filteredProjects[0];
  const otherProjects = filteredProjects.slice(1);

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
      }}>
      <Box
        sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}
        component={motion.div}
        variants={itemVariants}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
            fontFamily: "Orbitron, sans-serif",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mb: 1
          }}>
          My Projects
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
          A showcase of innovation, creativity, and technical expertise.
        </Typography>
      </Box>

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
              aria-label="Project filter tabs"
              sx={{
                minHeight: 48,
                '& .MuiTabs-scrollButtons': {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}>
              <Tab label="All" value="All" sx={{ minHeight: 48 }} />
              <Tab label="Java" value="Java" sx={{ minHeight: 48 }} />
              <Tab label="Next.js" value="Next.js" sx={{ minHeight: 48 }} />
              <Tab label="React.js" value="React.js" sx={{ minHeight: 48 }} />
              <Tab label="PostgreSQL" value="PostgreSQL" sx={{ minHeight: 48 }} />
            </Tabs>
          </Grid>
        </Grid>
      </Box>

      {featuredProject && (
        <Box sx={{ mb: { xs: 4, md: 6 } }} component={motion.div} variants={itemVariants}>
          <Typography
            variant="h4"
            sx={{ 
              mb: 2, 
              fontFamily: "Orbitron, sans-serif",
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" }
            }}>
            Featured Project
          </Typography>
          <Link
            href={`/projects/${featuredProject.slug}`}
            passHref
            style={{ textDecoration: "none" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: "16px",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-5px)" },
                  boxShadow: `0 10px 20px ${theme.palette.primary.light}44`,
                },
              }}>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 400 },
                  height: { xs: 250, md: "auto" },
                  objectFit: "cover",
                }}
                image={
                  featuredProject.thumbnail.startsWith("http")
                    ? featuredProject.thumbnail
                    : `${basePath}${featuredProject.thumbnail}`
                }
                alt={featuredProject.title}
              />
              <CardContent
                sx={{
                  p: { xs: 2, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: { xs: "100%", md: "auto" },
                }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", mb: 1 }}>
                  {featuredProject.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}>
                  {featuredProject.description}
                </Typography>
                <Button variant="contained">View Case Study</Button>
              </CardContent>
            </Card>
          </Link>
        </Box>
      )}

      <Grid container spacing={4}>
        {otherProjects.map((project) => {
          const imageUrl = project.thumbnail.startsWith("http")
            ? project.thumbnail
            : `${basePath}${project.thumbnail}`;

          return (
            <Grid item xs={12} sm={6} md={4} key={project.slug}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: 2,
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-8px)" },
                    boxShadow: 3,
                  },
                }}>
                <CardMedia
                  component="img"
                  sx={{ 
                    height: { xs: 200, sm: 180 },
                    objectFit: "cover" 
                  }}
                  image={imageUrl}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
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

export const getStaticProps: GetStaticProps = async () => {
  const allProjectsData = getSortedProjectsData();
  return {
    props: {
      allProjectsData,
    },
  };
};
