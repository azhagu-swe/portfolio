import React, { useState } from "react";
// Rebuild trigger
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSortedProjectsData, ProjectFrontmatter } from "@/lib/projects";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import EnhancedProjectCard from "@/components/project-page/EnhancedProjectCard";
import ProjectGallery from "@/components/project-page/ProjectGallery";
import TechStackVisualization from "@/components/project-page/TechStackVisualization";
import ProjectPreviewModal from "@/components/project-page/ProjectPreviewModal";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const ProjectPage = ({ allProjectsData }: ProjectPageProps) => {
  const router = useRouter();
  const { basePath } = router;
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "gallery">("grid");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (ProjectFrontmatter & { slug: string }) | null
  >(null);

  // Extract all unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(allProjectsData.flatMap((project) => project.technologies))
  ).sort();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewModeChange = (value: string) => {
    setViewMode(value as "grid" | "gallery");
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 md:p-8 max-w-[1200px] mx-auto w-full min-h-screen"
    >
      {/* Header Section with Enhanced Animations */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 md:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-orbitron mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(103,58,183,0.3)]">
          My Innovation Lab
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-[700px] mx-auto">
          A showcase of innovation, creativity, and technical expertise.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8 sm:mb-12"
      >
        <div className="relative w-full md:w-3/5 max-w-[600px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, technologies, or descriptions..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        <Tabs value={viewMode} onValueChange={handleViewModeChange} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="gallery">Gallery View</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Technology Filter Chips */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap gap-2 mb-8 justify-center"
      >
        <Badge
          variant={filter === "All" ? "default" : "outline"}
          className="cursor-pointer px-3 py-1 text-sm"
          onClick={() => setFilter("All")}
        >
          All
        </Badge>
        {allTechnologies.slice(0, 10).map((tech) => (
          <Badge
            key={tech}
            variant={filter === tech ? "default" : "outline"}
            className="cursor-pointer px-3 py-1 text-sm"
            onClick={() => setFilter(tech)}
          >
            {tech}
          </Badge>
        ))}
      </motion.div>

      {/* Tech Stack Visualization */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <TechStackVisualization projects={allProjectsData} />
      </motion.div>

      {/* Featured Project */}
      {featuredProject && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold relative inline-block pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[60px] after:h-[3px] after:bg-primary after:rounded-full">
              Featured Project
            </h2>
          </div>

          <Link href={`/projects/${featuredProject.slug}`} className="block group">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-border bg-card">
                <div className="relative w-full md:w-[400px] h-[250px] md:h-auto overflow-hidden group">
                  <Image
                    src={
                      featuredProject.thumbnail.startsWith("http")
                        ? featuredProject.thumbnail
                        : `${basePath}${featuredProject.thumbnail}`
                    }
                    alt={featuredProject.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="flex flex-col justify-center p-4 sm:p-6 md:p-8 w-full md:w-auto flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {featuredProject.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredProject.technologies.slice(0, 5).map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {featuredProject.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{featuredProject.technologies.length - 5}
                      </Badge>
                    )}
                  </div>

                  <Button className="self-start">
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Projects Grid/Gallery View */}
      {viewMode === "grid" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {otherProjects.map((project) => (
            <motion.div key={project.slug}>
              <EnhancedProjectCard project={project} basePath={basePath} />
            </motion.div>
          ))}
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
    </motion.div>
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
