import React from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { 
  Code, 
  Storage, 
  Web, 
  DesignServices,
  Speed,
  Security
} from "@mui/icons-material";

const skillsData = [
  {
    icon: <Code sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />,
    title: "Backend Development",
    description: "Expert in Java, Spring Boot, and building scalable microservices architectures",
    technologies: ["Java", "Spring Boot", "Hibernate", "REST APIs"]
  },
  {
    icon: <Web sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />,
    title: "Frontend Development",
    description: "Creating responsive, interactive UIs with modern frameworks",
    technologies: ["React", "Next.js", "TypeScript", "Material-UI"]
  },
  {
    icon: <Storage sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />,
    title: "Databases",
    description: "Designing efficient database schemas and optimizing queries",
    technologies: ["PostgreSQL", "MySQL", "Redis", "MongoDB"]
  },
  {
    icon: <Speed sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />,
    title: "Performance",
    description: "Optimizing applications for speed and efficiency",
    technologies: ["Caching", "Load Testing", "Profiling", "Monitoring"]
  },
  {
    icon: <Security sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />,
    title: "Security",
    description: "Implementing robust security measures and best practices",
    technologies: ["OAuth2", "JWT", "Encryption", "OWASP"]
  },
  {
    icon: <DesignServices sx={{ fontSize: { xs: 32, sm: 36, md: 40 } }} />,
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
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        py: { xs: 4, sm: 6, md: 10 },
        px: { xs: 2, sm: 3, lg: 4 },
        maxWidth: "1200px",
        mx: "auto"
      }}
    >
      <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 6, md: 8 } }}>
        <Typography
          variant="h3"
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            fontWeight: 800,
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" }
          }}
        >
          Technical Expertise
        </Typography>
        <Typography
          variant="h6"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mx: "auto",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" }
          }}
        >
          I specialize in building robust, scalable applications with cutting-edge technologies
        </Typography>
      </Box>

      <Grid 
        container 
        spacing={{ xs: 2, sm: 3, md: 4 }}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {skillsData.map((skill, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={index}
            component={motion.div}
            variants={itemVariants}
          >
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: "16px",
                backgroundColor: theme.palette.mode === "dark" 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "rgba(0, 0, 0, 0.03)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.divider}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "translateY(-5px)" },
                  boxShadow: `0 10px 20px ${theme.palette.mode === "dark" 
                    ? "rgba(0, 0, 0, 0.3)" 
                    : "rgba(0, 0, 0, 0.1)"}`,
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              <Box 
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: { xs: 2, sm: 3 },
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {skill.icon}
              </Box>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 1.5, sm: 2 }, 
                  textAlign: "center",
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.5rem" }
                }}
              >
                {skill.title}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: "text.secondary",
                  mb: { xs: 2, sm: 3 },
                  textAlign: "center",
                  minHeight: { xs: 60, sm: 70, md: 80 },
                  fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" }
                }}
              >
                {skill.description}
              </Typography>
              
              <Box sx={{ mt: "auto" }}>
                <Box 
                  sx={{ 
                    display: "flex",
                    flexWrap: "wrap",
                    gap: { xs: 0.5, sm: 1 },
                    justifyContent: "center"
                  }}
                >
                  {skill.technologies.map((tech, techIndex) => (
                    <Box
                      key={techIndex}
                      sx={{
                        backgroundColor: theme.palette.mode === "dark" 
                          ? "rgba(255, 255, 255, 0.1)" 
                          : "rgba(0, 0, 0, 0.05)",
                        color: theme.palette.mode === "dark" 
                          ? "rgba(255, 255, 255, 0.8)" 
                          : "rgba(0, 0, 0, 0.7)",
                        px: { xs: 1, sm: 1.5 },
                        py: { xs: 0.3, sm: 0.5 },
                        borderRadius: "20px",
                        fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                        fontWeight: 500
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsShowcase;