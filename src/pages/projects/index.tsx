import React, { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { getSortedProjectsData, ProjectFrontmatter } from "@/lib/projects";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Chip,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import EnhancedProjectCard from "@/components/project-page/EnhancedProjectCard";
import ProjectGallery from "@/components/project-page/ProjectGallery";
import TechStackVisualization from "@/components/project-page/TechStackVisualization";
import ProjectPreviewModal from "@/components/project-page/ProjectPreviewModal";

interface ProjectPageProps {
  allProjectsData: (ProjectFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ProjectPage = ({ allProjectsData }: ProjectPageProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "gallery">("grid");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (ProjectFrontmatter & { slug: string }) | null
  >(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Extract all unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(allProjectsData.flatMap((project) => project.technologies))
  ).sort();

  const handleFilterChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFilter(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewModeChange = (
    event: React.SyntheticEvent,
    newValue: "grid" | "gallery"
  ) => {
    setViewMode(newValue);
  };

  const handleProjectClick = (
    project: ProjectFrontmatter & { slug: string }
  ) => {
    setSelectedProject(project);
    setPreviewModalOpen(true);
  };

  const filteredProjects = allProjectsData
    .filter((project) =>
      filter === "All" ? true : project.technologies.includes(filter)
    )
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
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
        width: "100%",
        minHeight: "100vh",
      }}>
      {/* Header Section with Enhanced Animations */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}>
        <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              fontFamily: "Orbitron, sans-serif",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              mb: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                theme.palette.mode === "dark"
                  ? "0 0 10px rgba(103, 58, 183, 0.3)"
                  : "none",
            }}>
            My Innovation Lab
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              maxWidth: "700px",
              mx: "auto",
            }}>
            A showcase of innovation, creativity, and technical expertise.
          </Typography>
        </Box>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            gap: 2,
            mb: { xs: 3, sm: 4, md: 6 },
          }}>
          <TextField
            variant="outlined"
            placeholder="Search projects, technologies, or descriptions..."
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
            sx={{
              width: { xs: "100%", md: "60%" },
              maxWidth: "600px",
              "& .MuiInputBase-root": {
                fontSize: { xs: "0.9rem", sm: "1rem" },
              },
            }}
          />

          <Tabs
            value={viewMode}
            onChange={handleViewModeChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              width: { xs: "100%", md: "auto" },
              minHeight: "40px",
              "& .MuiTab-root": {
                minHeight: "40px",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              },
            }}>
            <Tab value="grid" label="Grid View" />
            <Tab value="gallery" label="Gallery View" />
          </Tabs>
        </Box>
      </motion.div>

      {/* Technology Filter Chips */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 3,
            justifyContent: "center",
          }}>
          <Chip
            label="All"
            variant={filter === "All" ? "filled" : "outlined"}
            color="primary"
            onClick={() => setFilter("All")}
            sx={{ cursor: "pointer" }}
          />
          {allTechnologies.slice(0, 10).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant={filter === tech ? "filled" : "outlined"}
              onClick={() => setFilter(tech)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Box>
      </motion.div>

      {/* Tech Stack Visualization */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}>
        <TechStackVisualization projects={allProjectsData} />
      </motion.div>

      {/* Featured Project */}
      {featuredProject && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.5 }}>
          <Box sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" },
                position: "relative",
                display: "inline-block",
                "&:after": {
                  content: "''",
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60px",
                  height: "3px",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "3px",
                },
              }}>
              Featured Project
            </Typography>
            <Link
              href={`/projects/${featuredProject.slug}`}
              passHref
              style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: "16px",
                    boxShadow: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                    overflow: "hidden",
                    "&:hover": {
                      transform: { xs: "none", md: "translateY(-5px)" },
                      boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
                    },
                  }}>
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", md: 400 },
                        height: { xs: 250, md: "100%" },
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      image={
                        featuredProject.thumbnail.startsWith("http")
                          ? featuredProject.thumbnail
                          : `${basePath}${featuredProject.thumbnail}`
                      }
                      alt={featuredProject.title}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      p: { xs: 2, sm: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: { xs: "100%", md: "auto" },
                    }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      }}>
                      {featuredProject.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                      {featuredProject.description}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mb: 2, flexWrap: "wrap" }}>
                      {featuredProject.technologies
                        .slice(0, 5)
                        .map((tech, idx) => (
                          <Chip
                            key={idx}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 28,
                              fontSize: "0.75rem",
                            }}
                          />
                        ))}
                      {featuredProject.technologies.length > 5 && (
                        <Chip
                          label={`+${featuredProject.technologies.length - 5}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 28,
                            fontSize: "0.75rem",
                          }}
                        />
                      )}
                    </Stack>
                    <Button
                      variant="contained"
                      sx={{
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        alignSelf: "flex-start",
                      }}>
                      View Case Study
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </Box>
        </motion.div>
      )}

      {/* Projects Grid/Gallery View */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {otherProjects.map((project) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={project.slug}
                component={motion.div}>
                <EnhancedProjectCard project={project} basePath={basePath} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      ) : (
        <ProjectGallery projects={filteredProjects} basePath={basePath} />
      )}

      {/* Preview Modal */}
      <ProjectPreviewModal
        open={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        project={selectedProject}
        basePath={basePath}
      />
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
