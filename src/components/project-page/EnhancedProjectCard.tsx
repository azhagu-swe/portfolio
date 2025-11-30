import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Github, ExternalLink } from "lucide-react";
import { ProjectFrontmatter } from "@/lib/projects";
import { ANIMATION_VARIANTS } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnhancedProjectCardProps {
  project: ProjectFrontmatter & { slug: string };
  basePath: string;
}

const EnhancedProjectCard = React.memo(({ project, basePath }: EnhancedProjectCardProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = project.thumbnail.startsWith("http")
    ? project.thumbnail
    : `${basePath}${project.thumbnail}`;

  const handleCardClick = () => {
    router.push(`/projects/${project.slug}`);
  };

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

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div variants={ANIMATION_VARIANTS.ITEM} className="h-full">
      <Card
        onClick={handleCardClick}
        className={cn(
          "h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300",
          "bg-white/5 dark:bg-white/5 backdrop-blur-md border-white/10",
          "hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
        )}
      >
        <div className="relative h-[200px] sm:h-[180px] md:h-[200px] overflow-hidden group">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardContent className="flex-grow flex flex-col p-4 sm:p-5 md:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-2 line-clamp-1">
            {project.title}
          </h2>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[0.65rem] sm:text-xs h-6 sm:h-7 min-w-[40px] justify-center"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-[0.65rem] sm:text-xs h-6 sm:h-7 min-w-[40px] justify-center"
              >
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 mt-2 mb-4">
                  {project.liveDemo && (
                    <Button
                      size="sm"
                      variant="default"
                      className="text-xs h-8 px-3"
                      onClick={handleLiveDemo}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 px-3"
                    onClick={handleGitHub}
                  >
                    <Github className="w-3 h-3 mr-2" />
                    Code
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpand}
              className="w-full sm:w-auto flex-1 min-h-[44px] sm:min-h-[36px]"
            >
              {isExpanded ? "Show Less" : "Details"}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </Button>

            {!isExpanded && (
              <Button
                variant="default"
                size="sm"
                onClick={handleCardClick}
                className="w-full sm:w-auto flex-1 min-h-[44px] sm:min-h-[36px]"
              >
                Learn More
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Add display name for debugging
EnhancedProjectCard.displayName = 'EnhancedProjectCard';

export default EnhancedProjectCard;