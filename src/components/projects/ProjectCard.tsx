import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ProjectFrontmatter } from "@/lib/projects";

interface ProjectCardProps {
  project: ProjectFrontmatter & { slug: string };
  basePath: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectCard = ({ project, basePath }: ProjectCardProps) => {
  const theme = useTheme();
  const router = useRouter();
  const imageUrl = project.thumbnail.startsWith("http")
    ? project.thumbnail
    : `${basePath}${project.thumbnail}`;

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <motion.div variants={itemVariants} style={{ height: "100%" }}>
      <Card
        onClick={handleCardClick}
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
          cursor: "pointer",
          "&:hover": {
            transform: { xs: "none", sm: "translateY(-8px)" },
            boxShadow: `0 15px 30px ${theme.palette.primary.main}55`,
          },
        }}>
        <CardMedia
          component="img"
          sx={{ 
            height: { xs: 200, sm: 180, md: 200 },
            objectFit: "cover" 
          }}
          image={imageUrl}
          alt={project.title}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: { xs: 2, sm: 3 },
          }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", flexGrow: 1, mt: 1, fontSize: { xs: "1rem", sm: "1.1rem" } }}>
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            {project.description}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: "auto", mb: 2 }}>
            {project.technologies.map((tech: string) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{ 
                  backgroundColor: "action.hover",
                  height: { xs: 20, sm: 24 },
                  fontSize: { xs: "0.65rem", sm: "0.75rem" }
                }}
              />
            ))}
          </Stack>
        </CardContent>
        <Box sx={{ p: { xs: 1.5, sm: 2 }, pt: 0, mt: "auto" }}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            sx={{
              px: { xs: 1, sm: 2 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: "0.85rem", sm: "0.95rem" }
            }}>
            View Case Study
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;