import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Work,
  School,
} from "@mui/icons-material";
import { EXPERIENCE_DATA } from "@/utils";

const experienceData = [
  ...EXPERIENCE_DATA.roles.map(role => ({
    year: role.duration,
    title: role.title,
    company: role.company,
    responsibilities: role.responsibilities,
    icon: <Work sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
  }))
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const ExperienceSection: React.FC = () => {
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
          {EXPERIENCE_DATA.header.title}
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
          {EXPERIENCE_DATA.header.subtitle}
        </Typography>
      </Box>

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box 
          sx={{ 
            position: "relative",
            pl: { xs: 2, sm: 3, md: 5 },
            "&:before": {
              content: '""',
              position: "absolute",
              left: { xs: 8, sm: 12, md: 16 },
              top: 0,
              bottom: 0,
              width: { xs: "2px", sm: "3px", md: "4px" },
              background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: "2px"
            }
          }}
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{ marginBottom: index !== experienceData.length - 1 ? "30px" : "0" }}
            >
              <Box
                sx={{
                  position: "relative",
                  pl: { xs: 3, sm: 4, md: 5 }
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: -25, sm: -35, md: -50 },
                    top: 0,
                    width: { xs: 40, sm: 48, md: 64 },
                    height: { xs: 40, sm: 48, md: 64 },
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.primary.contrastText,
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}40`
                  }}
                >
                  {exp.icon}
                </Box>
                
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 3 },
                    borderRadius: "12px",
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(255, 255, 255, 0.05)" 
                      : "rgba(0, 0, 0, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${theme.palette.divider}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: { xs: "none", sm: "translateX(5px)" },
                      boxShadow: `0 5px 15px ${theme.palette.mode === "dark" 
                        ? "rgba(0, 0, 0, 0.3)" 
                        : "rgba(0, 0, 0, 0.1)"}`,
                      border: `1px solid ${theme.palette.primary.main}`
                    }
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mb: 0.5,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
                    }}
                  >
                    {exp.year}
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }
                    }}
                  >
                    {exp.title}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.secondary.main,
                      mb: { xs: 1, sm: 1.5 },
                      fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" }
                    }}
                  >
                    {exp.company}
                  </Typography>
                  
                  <Box sx={{ mt: 1 }}>
                    {exp.responsibilities.map((responsibility, idx) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", mb: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.primary.main,
                            mr: 1,
                            mt: "4px",
                            fontSize: "1rem"
                          }}
                        >
                          •
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                            flex: 1,
                            "& strong": {
                              fontWeight: 600,
                              color: theme.palette.text.primary
                            }
                          }}
                          dangerouslySetInnerHTML={{ __html: responsibility }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ExperienceSection;