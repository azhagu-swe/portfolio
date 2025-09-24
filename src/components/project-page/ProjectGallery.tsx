import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ProjectFrontmatter } from "@/lib/projects";
import { COMMON_STYLES } from "@/utils/constants";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface ProjectGalleryProps {
  projects: (ProjectFrontmatter & { slug: string })[];
  basePath: string;
}

const ProjectGallery = ({ projects, basePath }: ProjectGalleryProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleProjectClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const handleLiveDemo = (e: React.MouseEvent, liveDemoUrl?: string) => {
    e.stopPropagation();
    if (liveDemoUrl) {
      window.open(liveDemoUrl, "_blank");
    }
  };

  const handleGitHub = (e: React.MouseEvent, githubUrl: string) => {
    e.stopPropagation();
    window.open(githubUrl, "_blank");
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: "bold", 
          mb: 4,
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        Interactive Project Gallery
      </Typography>
      
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <Card
              onClick={() => handleProjectClick(project.slug)}
              sx={{
                borderRadius: COMMON_STYLES.BORDER_RADIUS.CARD,
                boxShadow: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                overflow: "visible",
                position: "relative",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={
                  project.thumbnail.startsWith("http")
                    ? project.thumbnail
                    : `${basePath}${project.thumbnail}`
                }
                alt={project.title}
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
              
              <CardContent sx={{ p: 2 }}>
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: "bold", 
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </Typography>
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                  {project.technologies.length > 3 && (
                    <Box
                      sx={{
                        backgroundColor: theme.palette.grey[600],
                        color: theme.palette.common.white,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        fontSize: "0.7rem",
                      }}
                    >
                      +{project.technologies.length - 3}
                    </Box>
                  )}
                </Box>
                
                <AnimatePresence>
                  {(hoveredIndex === index) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", gap: 1 }}
                    >
                      {project.liveDemo && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<OpenInNewIcon />}
                          onClick={(e) => handleLiveDemo(e, project.liveDemo)}
                          sx={{ flex: 1, textTransform: "none", fontSize: "0.75rem" }}
                        >
                          Live Demo
                        </Button>
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        startIcon={<GitHubIcon />}
                        onClick={(e) => handleGitHub(e, project.github)}
                        sx={{ flex: 1, textTransform: "none", fontSize: "0.75rem" }}
                      >
                        Code
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectGallery;