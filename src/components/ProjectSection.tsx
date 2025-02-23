import React from "react";
import { Grid, Typography } from "@mui/material";
import { CustomizeBox } from "./style/CustomizeBox";

const ProjectsSection: React.FC = () => {
  const projects = [
    { title: "Project 1", description: "Description of Project 1." },
    { title: "Project 2", description: "Description of Project 2." },
    { title: "Project 3", description: "Description of Project 3." },
  ];

  return (
    <Grid container spacing={4} id="projects">
      {projects.map((project, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <CustomizeBox>
            <Typography variant="h6" component="h4" gutterBottom>
              {project.title}
            </Typography>
            <Typography paragraph>{project.description}</Typography>
          </CustomizeBox>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsSection;
