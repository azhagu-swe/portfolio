import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ProjectFrontmatter } from "@/lib/projects";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TechStackVisualizationProps {
  projects: (ProjectFrontmatter & { slug: string })[];
}

const TechStackVisualization = ({ projects }: TechStackVisualizationProps) => {
  // Count technology usage across all projects
  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
    });
    
    return counts;
  }, [projects]);

  // Prepare data for the pie chart
  const pieData = useMemo(() => {
    const sortedTechList = Object.entries(techCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8); // Limit to top 8 technologies

    return {
      labels: sortedTechList.map(([tech]) => tech),
      datasets: [
        {
          data: sortedTechList.map(([, count]) => count),
          backgroundColor: [
            "#3498db", "#e74c3c", "#2ecc71", "#f1c40f", 
            "#9b59b6", "#1abc9c", "#34495e", "#e67e22"
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [techCounts]);

  // Prepare list of all unique technologies
  const allTechnologies = useMemo(() => {
    const allTechs = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => allTechs.add(tech));
    });
    return Array.from(allTechs).sort();
  }, [projects]);

  return (
    <Box sx={{ py: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        align="center" 
        sx={{ 
          fontWeight: "bold", 
          mb: 4,
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        Technology Stack Insights
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, alignItems: "center" }}>
        <Box sx={{ width: { xs: "100%", md: "50%" }, height: 300 }}>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </Box>
        
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: "100%", 
              display: "flex", 
              flexDirection: "column",
              backgroundColor: "background.paper",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
              Technologies Used
            </Typography>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {allTechnologies.map((tech, index) => (
                <Box
                  key={tech}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    fontSize: "0.8rem",
                  }}
                >
                  {tech}
                  <Typography component="span" sx={{ ml: 1, fontSize: "0.7rem", opacity: 0.8 }}>
                    ({techCounts[tech]})
                  </Typography>
                </Box>
              ))}
            </Box>
            
            <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", mb: 1 }}>
                Project Statistics
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Total Projects: <strong>{projects.length}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Unique Technologies: <strong>{allTechnologies.length}</strong>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default TechStackVisualization;