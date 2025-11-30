import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  PenTool,
  Zap,
  Shield
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const skillsData = [
  {
    icon: <Code className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    title: "Backend Development",
    description: "Expert in Java, Spring Boot, and building scalable microservices architectures",
    technologies: ["Java", "Spring Boot", "Hibernate", "REST APIs"]
  },
  {
    icon: <Globe className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    title: "Frontend Development",
    description: "Creating responsive, interactive UIs with modern frameworks",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    icon: <Database className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    title: "Databases",
    description: "Designing efficient database schemas and optimizing queries",
    technologies: ["PostgreSQL", "MySQL", "Redis", "MongoDB"]
  },
  {
    icon: <Zap className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
    technologies: ["Caching", "Load Testing", "Profiling", "Monitoring"]
  },
  {
    icon: <Shield className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    title: "Security",
    description: "Implementing robust security measures and best practices",
    technologies: ["OAuth2", "JWT", "Encryption", "OWASP"]
  },
  {
    icon: <PenTool className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />,
    title: "DevOps",
    description: "Streamlining deployment and infrastructure management",
    technologies: ["Docker", "CI/CD", "AWS", "Monitoring"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const SkillsShowcase: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Technical Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-[700px] mx-auto text-base sm:text-lg md:text-xl"
        >
          I specialize in building robust, scalable applications with cutting-edge technologies
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="h-full"
          >
            <Card className={cn(
              "h-full flex flex-col border-border bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
              "dark:bg-secondary/10 dark:hover:bg-secondary/20"
            )}>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4 text-primary">
                  {skill.icon}
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  {skill.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center">
                <p className="text-muted-foreground mb-6 flex-grow">
                  {skill.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-auto">
                  {skill.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-secondary/50 hover:bg-secondary/70 dark:bg-secondary/30 dark:hover:bg-secondary/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsShowcase;