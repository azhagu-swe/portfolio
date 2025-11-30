import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import { ProjectFrontmatter } from "@/lib/projects";
import { Github, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  projects: (ProjectFrontmatter & { slug: string })[];
  basePath: string;
}

const ProjectGallery = ({ projects, basePath }: ProjectGalleryProps) => {
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
    <div className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8 font-orbitron">
        Interactive Project Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              className={cn(
                "rounded-xl overflow-hidden cursor-pointer transition-all duration-300 relative",
                "bg-white/5 dark:bg-white/5 backdrop-blur-md border-white/10",
                "hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
              )}
            >
              <div className="relative h-[140px] overflow-hidden">
                <Image
                  src={
                    project.thumbnail.startsWith("http")
                      ? project.thumbnail
                      : `${basePath}${project.thumbnail}`
                  }
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-1 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="default"
                      className="text-[0.7rem] px-2 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-[0.7rem] px-2 py-0.5"
                    >
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <AnimatePresence>
                  {(hoveredIndex === index) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2"
                    >
                      {project.liveDemo && (
                        <Button
                          size="sm"
                          variant="default"
                          className="flex-1 text-xs h-8"
                          onClick={(e) => handleLiveDemo(e, project.liveDemo)}
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          Live Demo
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-8"
                        onClick={(e) => handleGitHub(e, project.github)}
                      >
                        <Github className="w-3 h-3 mr-2" />
                        Code
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;