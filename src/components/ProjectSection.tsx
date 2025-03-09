import React from "react";
import { Grid, Typography, Chip, Button, Box, Stack } from "@mui/material";
import { PROJECTS_DATA } from "@/utils/projectData";
import { CustomizeBox } from "./style/CustomizeBox";

const ProjectsSection: React.FC = () => {
  return (
    <Box id="projects" sx={{ padding: 4 }}>
      {/* Header Section */}
      <Typography variant="h4" align="center" gutterBottom>
        {PROJECTS_DATA.header.title}
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ marginBottom: 4 }}>
        {PROJECTS_DATA.header.subtitle}
      </Typography>

      {/* Projects Grid */}
      <Grid container spacing={4}>
        {PROJECTS_DATA.projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CustomizeBox>
              <Typography variant="h6" component="h4" gutterBottom>
                {project.title}
              </Typography>
              <Typography paragraph>{project.description}</Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
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
              </Box>
              <Button
                variant="outlined"
                color="primary"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer">
                View Project
              </Button>
            </CustomizeBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectsSection;
