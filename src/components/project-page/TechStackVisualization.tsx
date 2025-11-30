import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ProjectFrontmatter } from "@/lib/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="py-8 mb-8">
      <h2 className="text-3xl font-bold text-center mb-8 font-orbitron">
        Technology Stack Insights
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 h-[300px]">
          <Pie data={pieData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>

        <div className="w-full md:w-1/2">
          <Card className="h-full bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Technologies Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {allTechnologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-3 py-1 text-sm rounded-full"
                  >
                    {tech}
                    <span className="ml-2 text-xs opacity-70">
                      ({techCounts[tech]})
                    </span>
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-bold mb-2">Project Statistics</h4>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Projects: <strong className="text-foreground">{projects.length}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  Unique Technologies: <strong className="text-foreground">{allTechnologies.length}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechStackVisualization;