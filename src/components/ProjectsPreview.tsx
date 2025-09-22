import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Code, OpenInNew } from "@mui/icons-material";
import { ProjectFrontmatter } from "@/lib/projects";

interface ProjectsPreviewProps {
  projects: (ProjectFrontmatter & { slug: string })[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const ProjectsPreview: React.FC<ProjectsPreviewProps> = ({ projects }) => {
  const theme = useTheme();
  const router = useRouter();
  const { basePath } = router;
  
  // Get only the first 3 projects for the preview
  const featuredProjects = projects.slice(0, 3);

  const handleViewAllProjects = () => {
    router.push("/projects");
  };

  return (
    <Box 
      sx={{ 
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 2, sm: 3, lg: 4 },
        maxWidth: "1200px",
        mx: "auto"
      }}
    >
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
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" }
          }}
        >
          Featured Projects
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
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" }
          }}
        >
          Check out some of my recent work showcasing my technical skills and creativity
        </Typography>
      </Box>

      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4 }}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {featuredProjects.map((project) => {
          const imageUrl = project.thumbnail.startsWith("http")
            ? project.thumbnail
            : `${basePath}${project.thumbnail}`;

          return (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4}
              key={project.slug}
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
                  backgroundColor: theme.palette.mode === "dark" 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "rgba(0, 0, 0, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-5px)" },
                    boxShadow: `0 10px 20px ${theme.palette.mode === "dark" 
                      ? "rgba(0, 0, 0, 0.3)" 
                      : "rgba(0, 0, 0, 0.1)"}`,
                    borderColor: theme.palette.primary.main
                  }
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    height: { xs: 180, sm: 200, md: 220 },
                    objectFit: "cover"
                  }}
                  image={imageUrl}
                  alt={project.title}
                />
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    p: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ 
                      fontWeight: 700, 
                      mb: { xs: 1, sm: 1.5 },
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" }
                    }}
                  >
                    {project.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      mb: { xs: 1.5, sm: 2 },
                      flexGrow: 1,
                      fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" }
                    }}
                  >
                    {project.description}
                  </Typography>
                  
                  <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: { xs: 0.5, sm: 1 },
                        minHeight: { xs: 30, sm: 35 }
                      }}
                    >
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                            height: { xs: 20, sm: 24, md: 28 }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box 
                    sx={{ 
                      mt: "auto",
                      display: "flex",
                      gap: { xs: 1, sm: 1.5 },
                      flexWrap: "wrap"
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => router.push(`/projects/${project.slug}`)}
                      sx={{
                        px: { xs: 1.5, sm: 2, md: 2.5 },
                        py: { xs: 0.8, sm: 1, md: 1.2 },
                        fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                        fontWeight: 600,
                        borderRadius: "12px",
                        minWidth: 0
                      }}
                    >
                      View Case Study
                    </Button>
                    
                    {project.github && (
                      <Button
                        variant="outlined"
                        size="small"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<Code sx={{ fontSize: "0.8rem" }} />}
                        sx={{
                          px: { xs: 1.5, sm: 2, md: 2.5 },
                          py: { xs: 0.8, sm: 1, md: 1.2 },
                          fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                          borderRadius: "12px",
                          minWidth: 0
                        }}
                      >
                        Code
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box 
        sx={{ 
          textAlign: "center", 
          mt: { xs: 4, sm: 6, md: 8 } 
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={handleViewAllProjects}
          sx={{
            px: { xs: 3, sm: 4, md: 6 },
            py: { xs: 1, sm: 1.5, md: 2 },
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
            fontWeight: 600,
            borderRadius: "50px",
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
              transform: "translateY(-3px)"
            },
            transition: "all 0.3s ease"
          }}
        >
          View All Projects
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectsPreview;