import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { ProjectFrontmatter } from "@/lib/projects";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background">
        <DialogHeader className="p-6 pb-2 border-b">
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="flex flex-col gap-6">
            <div className="relative w-full h-[300px] sm:h-[400px]">
              <Image
                src={
                  project.thumbnail.startsWith("http")
                    ? project.thumbnail
                    : `${basePath}${project.thumbnail}`
                }
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 pt-0">
              <p className="text-base leading-relaxed text-muted-foreground mb-6">
                {project.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-sm px-3 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.liveDemo && (
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={handleLiveDemo}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleGitHub}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectPreviewModal;