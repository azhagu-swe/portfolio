import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ProjectFrontmatter } from "@/lib/projects";

interface ProjectPreviewModalProps {
  open: boolean;
  onClose: () => void;
  project: (ProjectFrontmatter & { slug: string }) | null;
  basePath: string;
}

const ProjectPreviewModal = ({ open, onClose, project, basePath }: ProjectPreviewModalProps) => {
  if (!project) return null;

  const handleLiveDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveDemo) {
      window.open(project.liveDemo, "_blank");
    }
  };

  const handleGitHub = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.github, "_blank");
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          backgroundColor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          m: 0,
          p: 2 
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {project.title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent 
        dividers
        sx={{ 
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 0 
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={
            project.thumbnail.startsWith("http")
              ? project.thumbnail
              : `${basePath}${project.thumbnail}`
          }
          alt={project.title}
        />
        
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            {project.description}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              Technologies Used
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.technologies.map((tech, idx) => (
                <Chip
                  key={idx}
                  label={tech}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 28,
                    fontSize: "0.8rem",
                  }}
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {project.liveDemo && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<OpenInNewIcon />}
                onClick={handleLiveDemo}
                sx={{ flex: 1, py: 1.5 }}
              >
                Live Demo
              </Button>
            )}
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<GitHubIcon />}
              onClick={handleGitHub}
              sx={{ flex: 1, py: 1.5 }}
            >
              GitHub Repository
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPreviewModal;